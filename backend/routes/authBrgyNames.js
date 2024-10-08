const express = require('express');
const router = express.Router();

const GetBrgyNamesController = require('../controllers/Settings/Barangay/getBrgyNames');

router.get('/', GetBrgyNamesController.GetBrgyNames);

module.exports = router;
