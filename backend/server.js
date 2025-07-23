const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const vehicleRoutes = require('./routes/vehicleRoutes');
app.use('/api', vehicleRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(' MongoDB Atlas Connected');
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB Connection Failed:', err));
