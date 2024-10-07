var express = require('express');
const router= express.Router();

const {GetPosition, GetAllDetails, GetHistory, GetEvacPosition}= require('../controllers/map');


router.get('/list/:level', GetAllDetails);
router.get('/marker/:level', GetPosition);
router.get('/evacmarker', GetEvacPosition);

router.get('/history/:deviceId', GetHistory)

const MapRoute = router;
module.exports = MapRoute;