import React from 'react';
import {  Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, component: Component, ...props}) => {
    return (
        loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
    )
}

export default ProtectedRoute;