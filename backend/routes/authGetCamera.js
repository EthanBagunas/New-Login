const express = require('express');
const router = express.Router();

const GetCameraController = require('../controllers/Camera/getCamController'); 

// Use GET method and handle ':name' parameter
router.get('/:devicename', GetCameraController.getCamera );

module.exports = router;
