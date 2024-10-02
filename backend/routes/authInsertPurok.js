
const express = require('express');
const router = express.Router();

const InsertController = require('../controllers/Settings/Purok/Purok_setupController'); // Adjust the path as needed

router.post('/', InsertController.InsertPurok);

module.exports = router;

