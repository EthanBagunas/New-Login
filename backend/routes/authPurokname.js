const express = require('express');
const router = express.Router();

const GetPurokNamesController = require('../controllers/Settings/Purok/getPurokController');

router.get('/', GetPurokNamesController.GetPurok);

module.exports = router;
