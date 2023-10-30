import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, component: Component, ...props}) => {
    return (
        <Route>
            {loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />}
        </Route>
    )
}

export default ProtectedRoute;