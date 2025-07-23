const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Vehicle = require('../models/Vehicle');
const vehicleRoutes = require('../routes/vehicleRoutes');

const app = express();
app.use(express.json());
app.use('/api', vehicleRoutes);


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/vehicles', () => {
  it(' should create a vehicle with valid data', async () => {
    const res = await request(app).post('/api/vehicles').send({
      name: 'Test Vehicle',
      capacityKg: 500,
      tyres: 4
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Vehicle');
    expect(res.body.capacityKg).toBe(500);
  });

  it('should fail if required field is missing', async () => {
    const res = await request(app).post('/api/vehicles').send({
      name: 'No Capacity'
      
    });

    expect(res.statusCode).toBe(400);
  });
});
