const express = require('express');
const router = express.Router();

const ShowCameraController = require('../controllers/Camera/ViewFeedWithCVController'); 

// Use GET method and handle ':name' parameter
router.post('/', ShowCameraController.startCameraStreams );

module.exports = router;
