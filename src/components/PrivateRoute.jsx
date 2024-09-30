import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth, checkPermissions } from '../utils/authUtil'; // Suponiendo que está en utils/authUtil

const PrivateRoute = ({ element, requiredPermission }) => (
  <>
    {
      checkAuth() && checkPermissions(requiredPermission) ? (
        element
      ) : (
        <Navigate to="/" replace />
      )
    }
  </>
);

export default PrivateRoute;
