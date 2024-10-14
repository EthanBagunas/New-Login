const express = require('express');
const router = express.Router();

const ShowElectedOfficialController = require('../controllers/Settings/LGU/ShowOfficialLguController'); 

// Use GET method and handle ':name' parameter
router.get('/:period_from', ShowElectedOfficialController.ShowElectedOfficial);

module.exports = router;