const express = require('express');
const router = express.Router();

const GetBrgyNamesController = require('../controllers/Settings/Purok/getBrgyController');

router.get('/', GetBrgyNamesController.GetBrgyPurok);

module.exports = router;
