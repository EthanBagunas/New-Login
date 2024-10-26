const express = require('express');
const router = express.Router();

const ShowPurokController = require('../controllers/Settings/Purok/ShowPurokInfoController'); 

// Use GET method and handle ':name' parameter
router.get('/:purok', ShowPurokController.ShowPurokInfo);

module.exports = router;