const express = require('express');
const router = express.Router();

const ShowPurokController = require('../controllers/Settings/Purok/ShowPurokController'); 

// Use GET method and handle ':brgy' parameter
router.get('/:brgy', ShowPurokController.ShowPurok);

module.exports = router;
