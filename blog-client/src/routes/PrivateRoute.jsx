import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAuth from '../hooks/useAuth'; // Replace with your auth hook

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton height={40} />
        <Skeleton height={20} count={3} />
      </div>
    );
  }

  if (!user) {
    // Redirect to login and preserve where user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
