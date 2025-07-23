const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

 async function bookVehicle (req, res){
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const start = new Date(startTime);

    
    const rideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
    const end = new Date(start.getTime() + rideDurationHours * 60 * 60 * 1000);

    
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    
    const overlappingBooking = await Booking.findOne({
      vehicleId,
      startTime: { $lt: end },
      endTime: { $gt: start }
    });

    if (overlappingBooking) {
      return res.status(409).json({ message: 'Vehicle already booked in this time slot' });
    }

    
    const booking = new Booking({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId
    });

    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bookVehicle =bookVehicle;