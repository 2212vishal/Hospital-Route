const Psychiatrist = require('../models/psychiatrist');
const Hospital = require('../models/hospital');
const Patient=require('../models/patient');
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const sharp = require('sharp')
const fs = require("fs");
const bcrypt = require('bcrypt');



const createPatient = async (req, res) => {
    try {
        const { name, address, email, phone, password, psychiatristID, hospitalID } = req.body;
        if (!name || !address || !email || !phone || !password || !psychiatristID || !hospitalID ) {
            throw new Error('Missing required fields');
        }

        // Check for required files
        const photo = req.files.photo;
        if (!photo || !photo.mimetype.startsWith('image/')) {
            throw new Error('Missing or invalid photo file');
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
        if (!passwordRegex.test(password)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and be between 8 and 15 characters long');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Read primary image file
        const imageData = fs.readFileSync(photo.tempFilePath);

        // Compress primary image to WebP format
        const PrimaryWebPimage = await sharp(imageData)
            .webp({ quality: 100 })
            .toBuffer();

        // Upload primary image to Cloudinary
        const photoImageUrl = await uploadImageToCloudinary(
            PrimaryWebPimage,
            process.env.FOLDER_NAME
        );

        
        // Save product data to database, including image URLs and hashed password
        const newPatient = new Patient({
            name,
            address,
            email,
            password: hashedPassword,
            phone,
            photo: photoImageUrl.secure_url,
            psychiatristID,
            hospitalID
        });
        await newPatient.save();

        // Update psychiatrist and hospital data
        await Psychiatrist.findByIdAndUpdate(
            psychiatristID,
            { $inc: { totalPatients: 1 }, $push: { patients: newPatient._id } },
            { new: true }
        );

        await Hospital.findByIdAndUpdate(
            hospitalID,
            { $inc: { totalPatients: 1 } },
            { new: true }
        );

        res.status(201).json({ success: true, message: 'Patient created successfully', newPatient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


const getPatientDetails = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}




module.exports = {createPatient,getPatientDetails };

