const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');



async function addVehicle(req, res) {
  try {
    const { name, capacityKg, tyres } = req.body;

  
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newVehicle = new Vehicle({ name, capacityKg, tyres });
    const savedVehicle = await newVehicle.save();

    return res.status(201).json(savedVehicle);
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



async function getAvailableVehicles(req, res) {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: 'All query parameters are required' });
    }

    const start = new Date(startTime);


    
    if (isNaN(start.getTime())) {
      return res.status(400).json({ message: 'Invalid startTime format' });
    }

    
    const rideDurationHours = Math.abs(Number(toPincode) - Number(fromPincode)) % 24;

    
    if (isNaN(rideDurationHours)) {
      return res.status(400).json({ message: 'Invalid pincode values' });
    }

    const end = new Date(start.getTime() + rideDurationHours * 60 * 60 * 1000);

    

    
    const candidates = await Vehicle.find({ capacityKg: { $gte: parseInt(capacityRequired) } });

    
    const bookings = await Booking.find({
      $or: [
        {
          startTime: { $lt: end },
          endTime: { $gt: start }
        }
      ]
    });

    const bookedVehicleIds = bookings.map(b => b.vehicleId.toString());

    
    const available = candidates.filter(v => !bookedVehicleIds.includes(v._id.toString()));

    
    res.status(200).json({
      estimatedRideDurationHours: rideDurationHours,
      availableVehicles: available
    });

  } catch (error) {
    console.error('Error fetching available vehicles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.addVehicle = addVehicle;
exports.getAvailableVehicles=getAvailableVehicles;