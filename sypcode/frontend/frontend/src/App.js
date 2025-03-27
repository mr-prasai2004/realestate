import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './Layouts/MainLayout';
import DashboardLayout from './Layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import PropertyListing from './pages/PropertyListing';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import MyProperties from './pages/dashboard/MyProperties';
import AddProperty from './pages/dashboard/AddProperty';
import EditProperty from './pages/dashboard/EditProperty';
import MyBookings from './pages/dashboard/MyBookings';
import Profile from './pages/dashboard/Profile';

// Error Pages
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="properties" element={<PropertyListing />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="my-properties" element={<MyProperties />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="edit-property/:id" element={<EditProperty />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;