import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { publicRoutes, LOGIN_PATH, SIGNUP_PATH, HOME_PATH } from '../routes/routeConfig';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl text-slate-600">Loading...</div>
      </div>
    );
  }

  // If user is authenticated and tries to access login or signup page, redirect to home
  if (isAuthenticated && (location.pathname === LOGIN_PATH || location.pathname === SIGNUP_PATH)) {
    return <Navigate to={HOME_PATH} replace />;
  }

  // If user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to={LOGIN_PATH} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
