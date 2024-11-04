const express = require('express');
const router = express.Router();

const ChangePassController = require('../controllers/Profile/ChangePassController'); 


router.post('/', ChangePassController.ChangePasswordController);


module.exports = router;
