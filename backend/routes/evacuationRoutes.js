var express = require('express');
const router= express.Router();

const {insertFamilyInfo, getAllOccupantIds, getFamilyInfo, getAllEvac, getFamilyInfoDetails}= require('../controllers/evacuation')


router.post('/faminfo/', insertFamilyInfo);

//View family details
router.get('/famdata/:location', getFamilyInfo);
router.get('/fammemberdata/:famid', getFamilyInfoDetails);

//Selection for some autocomplete
router.get('/occupantid', getAllOccupantIds);
router.get('/allevac', getAllEvac);

const EvacRoute = router;
module.exports = EvacRoute;