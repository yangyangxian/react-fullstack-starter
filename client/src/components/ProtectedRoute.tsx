import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthContext } from '../hooks/useAuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = getAuthContext();
  const location = useLocation();

  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/home" replace />;
  }

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
