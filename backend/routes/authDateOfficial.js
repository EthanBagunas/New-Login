const express = require('express');
const router = express.Router();

const GetDateController = require('../controllers/Settings/Barangay/getBrgyDate');

router.get('/:name', GetDateController.GetDateOfficial);

module.exports = router;
