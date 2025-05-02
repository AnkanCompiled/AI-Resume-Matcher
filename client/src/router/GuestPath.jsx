import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent';

export default function GuestPath({ children }) {
    const { isAuthenticated, isLoading } = useAuth()
    return isLoading ? <LoadingComponent fullscreen={true} /> : isAuthenticated ? <Navigate to="/home" replace /> : children
}
