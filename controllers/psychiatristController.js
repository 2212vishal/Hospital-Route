const Psychiatrist = require('../models/psychiatrist');
const Hospital = require('../models/hospital');

const createPsychiatrist = async (req, res) => {
    try {
        const { name, hospitalID } = req.body;

        // Check if the hospitalID corresponds to an existing hospital
        const existingHospital = await Hospital.findById(hospitalID);
        if (!existingHospital) {
            return res.status(400).json({
                success: false,
                message: "Hospital not found for the provided ID."
            });
        }

        // Check if the psychiatrist name already exists
        const existingPsychiatrist = await Psychiatrist.findOne({ name });
        if (existingPsychiatrist) {
            return res.status(400).json({
                success: false,
                message: "This psychiatrist name already exists."
            });
        }

        // Create new Psychiatrist entry if it doesn't already exist
        const newPsychiatrist = new Psychiatrist({ name, hospitalID });
        await newPsychiatrist.save();

        // Update the corresponding hospital document
        const updatedHospital = await Hospital.findByIdAndUpdate(
            hospitalID,
            {
                $inc: { totalPsychiatrists: 1 },
                $push: { psychiatrists: newPsychiatrist._id }
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Psychiatrist created successfully.",
            data: newPsychiatrist
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


const getPsychiatristDetails = async (req, res) => {
    try {
        const id = req.params.id; // Assuming id is passed as a route parameter
        const PsychiatristData = await Psychiatrist.findById(id);
        
        if (!PsychiatristData) {
            return res.status(404).json({ success: false, message: "PsychiatristData not found" });
        }

        res.status(200).json({ success: true, data: PsychiatristData });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}



module.exports = { createPsychiatrist,getPsychiatristDetails };

