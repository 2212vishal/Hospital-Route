const express = require('express');
const router = express.Router();


// ****HOSPITAL ROUTE
const {createHospital,getSpecificDetails,getAllDetails} = require('../controllers/hospitalController');
router.post('/hospital',createHospital );
router.get('/hospital/:id',getSpecificDetails );
router.get('/hospital',getAllDetails)


// *******PATIENT ROUTE
const {createPatient,getPatientDetails} = require('../controllers/patientController')
router.post('/Patient',createPatient );
router.get('/Patient',getPatientDetails);

// *****PSYCHIATRIST ROUTE
const {createPsychiatrist,getPsychiatristDetails} = require('../controllers/psychiatristController')
router.post('/psychiatrist',createPsychiatrist );
router.get('/psychiatrist/:id',getPsychiatristDetails);


module.exports = router;
