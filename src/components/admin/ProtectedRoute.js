import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';

const ProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, isLoading, loginAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <AdminLogin onLogin={loginAdmin} />;
  }

  return children;
};

export default ProtectedRoute;
