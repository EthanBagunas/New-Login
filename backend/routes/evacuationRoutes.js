var express = require('express');
const router= express.Router();

const {insertFamilyInfo, getFamilyInfo}= require('../controllers/evacuation')

router.post('/faminfo', insertFamilyInfo);
router.get('/getfaminfo', getFamilyInfo);

const EvacRoute = router;
module.exports = EvacRoute;