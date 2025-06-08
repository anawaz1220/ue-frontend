// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ROUTES from '../../constants/routes';

// Component for routes that require authentication
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can replace with a proper spinner component
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the location they were trying to go to for later redirect
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // If authenticated, show the route
  return <Outlet />;
};

// Component for routes that require specific roles
export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // Check if user role is allowed
  const userHasRequiredRole = allowedRoles.includes(user.role);

  if (!userHasRequiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectTo = user.role === 'CUSTOMER' 
      ? ROUTES.CUSTOMER_PROFILE 
      : user.role === 'BUSINESS' 
        ? ROUTES.BUSINESS_PROFILE 
        : ROUTES.HOME;
    
    return <Navigate to={redirectTo} replace />;
  }

  // If user has allowed role, show the route
  return <Outlet />;
};

// Component for routes that should not be accessible when authenticated
// For example, login and register pages
export const UnauthenticatedRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Get the intended destination from location state, or use default based on role
  const from = location.state?.from?.pathname || 
    (user?.role === 'CUSTOMER' 
      ? ROUTES.CUSTOMER_PROFILE 
      : user?.role === 'BUSINESS' 
        ? ROUTES.BUSINESS_PROFILE 
        : ROUTES.HOME);

  // Show loading spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to appropriate dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // If not authenticated, show the route
  return <Outlet />;
};

// Default export for backward compatibility
export default { ProtectedRoute, RoleProtectedRoute, UnauthenticatedRoute };