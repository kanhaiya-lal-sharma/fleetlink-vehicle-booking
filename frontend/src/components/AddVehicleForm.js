import React, { useState } from 'react';
import axios from 'axios';
import './AddVehicleForm.css';

function AddVehicleForm(){
  const [formData, setFormData] = useState({
    name: '',
    capacityKg: '',
    tyres: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange (e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e)  {
    e.preventDefault();

    try {
      setMessage('');
      setError('');

      const res = await axios.post('http://localhost:5000/api/vehicles', formData);
      setMessage(`Vehicle "${res.data.name}" added successfully!`);
      setFormData({ name: '', capacityKg: '', tyres: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2 className="add-vehicle-heading" >Add New Vehicle</h2>
      <form className="add-vehicle-form"  onSubmit={handleSubmit}>

        <input className="vehicle-input" type="text" name="name"  placeholder="Vehicle Name"

          value={formData.name}
          onChange={handleChange}
          required

        />
        <br />
        <input className="vehicle-input" type="number" name="capacityKg"  placeholder="Capacity (Kg)" 
          
          value={formData.capacityKg}
          onChange={handleChange}
          required

        />
        <br />
        <input   className="vehicle-input" type="number" name="tyres"  placeholder="Tyres"  value={formData.tyres} 
        
          onChange={handleChange}
          required

        />
        <br />
        <button type="submit" className="vehicle-submit-btn" >Add Vehicle</button>
      </form>
       
       {message && <p className="success-message">{message}</p>}
       {error && <p className="error-message">{error}</p>}

    </div>
  );
};

export default AddVehicleForm;
