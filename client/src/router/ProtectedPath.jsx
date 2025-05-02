import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';

export default function ProtectedPath({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    return isLoading ? <LoadingComponent /> : isAuthenticated ? children : <Navigate to="/" replace />;
}
