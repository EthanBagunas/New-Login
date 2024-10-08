const express = require('express');
const router = express.Router();

const ShowBrgyController = require('../controllers/Settings/Barangay/ShowBrgyInfo'); 

// Use GET method and handle ':name' parameter
router.get('/:name', ShowBrgyController.ShowBrgy);

module.exports = router;
