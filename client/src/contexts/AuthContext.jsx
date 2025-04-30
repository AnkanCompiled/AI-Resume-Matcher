import React, { createContext, useContext, useState, useEffect } from "react";
import { logoutApi, verifyLoginApi } from "../apis/authApi";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            await verifyLoginApi();
            setIsAuthenticated(true);
        } catch (err) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = async () => {
        if (!isAuthenticated) return;
        await logoutApi()
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};