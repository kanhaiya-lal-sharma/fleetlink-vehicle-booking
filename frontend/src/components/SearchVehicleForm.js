import React, { useState } from 'react';
import axios from 'axios';
import './SearchVehicleForm.css';

function SearchVehicleForm(){
  const [formData, setFormData] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: ''
  });

  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSearch (e) {
    e.preventDefault();
    setResults([]);
    setMessage('');
    setError('');

       try {
          const query = new URLSearchParams(formData).toString();
      
          const res = await axios.get(`http://localhost:5000/api/vehicles/available?${query}`);
          setResults(res.data.availableVehicles);
          setMessage(`Estimated Ride Duration: ${res.data.estimatedRideDurationHours} hours`);
          } catch (err) {
           console.error(err);
           setError(err.response?.data?.message || 'Search failed');
        }
         
       setFormData({  capacityRequired: '',
                     fromPincode: '',
                      toPincode: '',
                       startTime: ''
                    })
  };

  async function handleBooking(vehicleId) {
    try {
      const bookingBody = {
        vehicleId,
        fromPincode: formData.fromPincode,
        toPincode: formData.toPincode,
        startTime: formData.startTime,
        customerId: 'customer-001' // Hardcoded as per PDF
      };

      await axios.post('http://localhost:5000/api/bookings', bookingBody);
      alert(' Booking successful!');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Booking failed');
    }

      setResults([]);
      setMessage('');
  };

  return (
    <div className="search-form-container">
      <h2 className="form-heading">Search & Book Vehicle</h2>
      <form onSubmit={handleSearch} className="vehicle-search-form">
        <input className="vehicle-input" type="number"  name="capacityRequired" placeholder="Capacity Required (Kg)"
          
          value={formData.capacityRequired}
          onChange={handleChange}
          required

        /><br />

        <input className="vehicle-input" type="text" name="fromPincode"  placeholder="From Pincode"

          value={formData.fromPincode}
          onChange={handleChange}
          required
        /><br />

        <input className="vehicle-input"  type="text"  name="toPincode" placeholder="To Pincode"

          value={formData.toPincode}
          onChange={handleChange}
          required
        /><br />

        <input className="vehicle-input" type="datetime-local"  name="startTime"

          value={formData.startTime}
          onChange={handleChange}
          required
        /><br />

        <button type="submit"  className="search-btn">Search Availability</button>
      </form>

   

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}


      { 
        results.length > 0 && (
        <div className="vehicle-results">
          <h3 className="results-heading">Available Vehicles:</h3>
          { 
              results.map((v) => (
              <div key={v._id} className="vehicle-card">
              <p><strong>Name:</strong> {v.name}</p>
              <p><strong>Capacity:</strong> {v.capacityKg} Kg</p>
              <p><strong>Tyres:</strong> {v.tyres}</p>
              <button onClick={() => handleBooking(v._id)} className="book-btn">Book Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchVehicleForm;
