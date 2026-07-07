import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import LoadingSpinner from './LoadingSpinner';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated, initialized } = useAppSelector(state => state.auth);

    if (!initialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark">
                <LoadingSpinner text="Carregando..." />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
