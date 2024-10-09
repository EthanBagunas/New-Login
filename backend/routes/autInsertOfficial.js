
const express = require('express');
const router = express.Router();

const InsertController = require('../controllers/Settings/Barangay/insertBrgyOfficialController'); // Adjust the path as needed

router.post('/', InsertController.InsertOfficial);

module.exports = router;

