import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, component: Component, ...otherprops}) => {
    return (
      
            loggedIn ? <Component {...otherprops} /> : <Navigate to="/sign-in" />
       
    )
}

export default ProtectedRoute;