import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Import dashboard components
import ClientDashboard from '../pages/Client/Dashboard';
import VendorDashboard from '../pages/Vendor/Dashboard';
import AdminDashboard from '../pages/Admin/Dashboard';

const DashboardRouter = () => {
  const { userRole, isAuthenticated } = useSelector(state => ({
    userRole: state.user.userRole,
    isAuthenticated: state.user.isAuthenticated
  }));

  // If not authenticated, redirect to login
  

  // Route to appropriate dashboard based on user role
  switch (userRole) {
    case 'admin':
      return <AdminDashboard />;
    case 'vendor':
      return <VendorDashboard />;
    case 'customer':
      return <ClientDashboard />;
 
  }
};

export default DashboardRouter;
