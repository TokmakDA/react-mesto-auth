import React from 'react';
import { Navigate, Route } from 'react-router-dom';

// const ProtectedRoute = ({ element: Component, isLoggedIn, ...props }) => {
//   return isLoggedIn ? <Component {...props} /> : <Navigate to="../sign-up" />;
// };

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="../sign-up" replace />;
  }
  return children;
};

export default ProtectedRoute;
