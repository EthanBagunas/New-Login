var express = require('express');
const router= express.Router();

const {insertFamilyInfo, getAllOccupantIds, getFamilyInfo, getAllEvac}= require('../controllers/evacuation')


router.post('/faminfo/', insertFamilyInfo);

//View family details
router.get('/famdata/:location', getFamilyInfo);

//Selection for some autocomplete
router.get('/occupantid', getAllOccupantIds);
router.get('/allevac', getAllEvac);

const EvacRoute = router;
module.exports = EvacRoute;