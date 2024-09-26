const express = require('express');
const router = express.Router();
const { UpdateProf, uploadProfilePicture } = require('../controllers/Profile/UpdateProfileController');

// Define the route
router.post('/updateProf', uploadProfilePicture, UpdateProf);

module.exports = router;
