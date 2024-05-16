const Hospital = require('../models/hospital');

const createHospital = async (req, res) => {
    try {
        const { name } = req.body;
        const existingHospital = await Hospital.findOne({ name });
        if (existingHospital) {
            return res.status(400).json({
                success: false,
                message: "This hospital name already exists."
            });
        }

        // Create new hospital entry if it doesn't already exist
        const newHospital = new Hospital({ name });
        await newHospital.save();

        res.status(201).json({
            success: true,
            message: "Hospital created successfully.",
            data: newHospital
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllDetails = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json({ success: true, data: hospitals });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const getSpecificDetails = async (req, res) => {
    try {
        const id = req.params.id; // Assuming id is passed as a route parameter
        const hospitalData = await Hospital.findById(id).populate('psychiatrists');
        
        if (!hospitalData) {
            return res.status(404).json({ success: false, message: "Hospital not found" });
        }

        const response = {
            hospitalName: hospitalData.name,
            totalPsychiatristCount: hospitalData.totalPsychiatrists,
            totalPatientsCount: hospitalData.totalPatients,
            psychiatristDetails: hospitalData.psychiatrists.map(psychiatrist => ({
                id: psychiatrist._id,
                name: psychiatrist.name,
                patientsCount: psychiatrist.totalPatients
            }))
        }

        res.status(200).json({ success: true, response });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { createHospital, getSpecificDetails, getAllDetails };

