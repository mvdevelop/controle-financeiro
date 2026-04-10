
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import LoadingSpinner from './LoadingSpinner';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <LoadingSpinner />;
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
