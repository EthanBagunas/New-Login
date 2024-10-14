const express = require('express');
const router = express.Router();

const GetLguDatesController = require('../controllers/Settings/LGU/getLguDate');

router.get('/', GetLguDatesController.GetDateLgu);

module.exports = router;
