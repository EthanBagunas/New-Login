const express = require('express');
const router = express.Router();
const ControllerProfile = require('../../controllers/Profile/ControllerProfile'); // Adjust the path as needed

router.get('/:id', ControllerProfile.Profile);


module.exports = router;
