import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isLoggedIn, ...props }) => {
  return isLoggedIn ? <Component {...props} /> : <Navigate to="../sign-up" />;
};

export default ProtectedRoute;
