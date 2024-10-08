const express = require('express');
const router = express.Router();

const ShowLguController = require('../controllers/Settings/LGU/ShowLguSetupController'); 

// Use GET method and handle ':name' parameter
router.get('/', ShowLguController.ShowLgu);

module.exports = router;
