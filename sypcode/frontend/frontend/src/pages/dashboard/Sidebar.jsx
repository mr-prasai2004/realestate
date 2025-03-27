// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaListAlt, FaPlusCircle, FaCalendarAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>A1 Real Estate</h2>
      </div>
      <nav className="menu">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <FaHome /> Dashboard
        </Link>
        <Link to="/properties" className={location.pathname === '/properties' ? 'active' : ''}>
          <FaListAlt /> My Properties
        </Link>
        <Link to="/add-property" className={location.pathname === '/add-property' ? 'active' : ''}>
          <FaPlusCircle /> Add Property
        </Link>
        <Link to="/bookings" className={location.pathname === '/bookings' ? 'active' : ''}>
          <FaCalendarAlt /> My Bookings
        </Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
          <FaUser /> Profile
        </Link>
      </nav>
      <div className="logout">
        <button>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;