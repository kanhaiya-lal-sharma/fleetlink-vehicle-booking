const express = require('express');
const router = express.Router();
const { bookVehicle } = require('../controllers/bookingController');

router.post('/bookings', bookVehicle);

module.exports = router;
