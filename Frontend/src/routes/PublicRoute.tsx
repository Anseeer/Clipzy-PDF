import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { JSX } from 'react';
import type { RootState } from '../store';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useSelector(
        (state: RootState) => state.user
    );

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default PublicRoute;
