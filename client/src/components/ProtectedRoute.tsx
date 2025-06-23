import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { publicRoutes, LOGIN_PATH, SIGNUP_PATH, DOCS_PATH } from '@/routes/routeConfig';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isPublicRoute = publicRoutes.includes(location.pathname);

  // If user is authenticated and tries to access login or signup page, redirect to docs
  if (isAuthenticated && (location.pathname === LOGIN_PATH || location.pathname === SIGNUP_PATH)) {
    return <Navigate to={DOCS_PATH} replace />;
  }

  // If user is not authenticated and trying to access a protected route, redirect to login
  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate to={LOGIN_PATH} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
