import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddVehiclePage from './pages/AddVehiclePage';
import SearchVehiclePage from './pages/SearchVehiclePage';
import Navbar from './components/Navbar'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddVehiclePage />} />
        <Route path="/search" element={<SearchVehiclePage />} />
      </Routes>
    </Router>
  );
}

export default App;
