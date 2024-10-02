const express = require('express');
const router = express.Router();

const InsertController = require('../controllers/Settings/LGU/Elected-officialController'); // Adjust the path as needed

router.post('/', InsertController.InsertElect);

module.exports = router;

