
const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const InsertController = require('../controllers/Settings/Barangay/InsertBrgyInfoController'); // Adjust the path as needed

router.post('/', upload.fields([{ name: 'logo1' }, { name: 'logo2' }]),InsertController.InsertBrgy);

module.exports = router;

