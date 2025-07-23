import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">FleetLink</h2>
      <div className="nav-links">
        <Link to="/">Add Vehicle</Link>
        <Link to="/search">Search & Book</Link>
      </div>
    </nav>
  );
};

export default Navbar;
