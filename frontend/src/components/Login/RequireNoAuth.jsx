import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const RequireNoAuth = () => {

    const { auth } = useAuth(); // Get auth context
    const location = useLocation();

    // Check if the user is authenticated
    const isAuthenticated = Boolean(auth?.roles);

    // If the user is authenticated, redirect them to the home page or any other page
    return isAuthenticated
        ? <Navigate to="/home" state={{ from: location }} replace />
        : <Outlet />;
};

export default RequireNoAuth;
