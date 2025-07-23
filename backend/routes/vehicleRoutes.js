const express = require('express');
const router = express.Router();
const { addVehicle } = require('../controllers/vehicleController');
const { getAvailableVehicles } = require('../controllers/vehicleController');

router.get('/vehicles/available', getAvailableVehicles);


router.post('/vehicles', addVehicle);

module.exports = router;


