import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return null; // Or you can return a loading spinner here
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
