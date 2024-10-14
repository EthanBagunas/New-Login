const express = require('express');
const router = express.Router();

const ShowBrgyOfficialController = require('../controllers/Settings/Barangay/ShowOfficialController'); 

// Use GET method and handle ':name' parameter
router.get('/:period_from', ShowBrgyOfficialController.ShowBrgyOfficial);

module.exports = router;
