const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const InsertController = require('../controllers/Settings/LGU/LGU-setupController'); // Adjust the path as needed

router.post('/', upload.fields([{ name: 'logo1' }, { name: 'logo2' }]),InsertController.InsertLGU);

module.exports = router;

