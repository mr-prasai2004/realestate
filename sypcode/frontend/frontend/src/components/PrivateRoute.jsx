import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

/**
 * A wrapper for <Outlet> that redirects to the login page
 * if the user is not authenticated.
 */
const PrivateRoute = () => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to in the 'from' property of the location state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If the user is authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute;