var express = require('express');
const router= express.Router();

const {GetPosition, GetAllDetails, GetHistory, GetEvacPosition, InsertOccupant, getDeviceInfoByName}= require('../controllers/map');


router.get('/list/:level', GetAllDetails);
router.get('/marker/:level', GetPosition);  


router.get('/devmarker/:name', getDeviceInfoByName);

router.get('/evacmarker/:list', GetEvacPosition);

router.get('/history/:deviceId', GetHistory)
router.post('/insertoccupant', InsertOccupant);

const MapRoute = router;
module.exports = MapRoute;