const express = require('express');
const router = express.Router();

const InsertAdminController = require('../controllers/registerAdminController');

router.post('/', InsertAdminController.InsertAdmin);

module.exports = router;
