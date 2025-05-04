import React, { createContext, useContext, useState, useEffect } from "react";
import { logoutApi, accessTokenApi } from "../apis/authApi";
import { injectTokenStore } from "../store/tokenStore";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);

    const logout = async () => {
        if (!isAuthenticated) return;
        await logoutApi();
        setIsAuthenticated(false);
        setAccessToken(null);
    };

    const login = async () => {
        try {
            const res = await accessTokenApi();
            setAccessToken(res.access_token);
            setIsAuthenticated(true);
        } catch (err) {
            setIsAuthenticated(false);
            setAccessToken(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (accessToken) {
            injectTokenStore(accessToken, setAccessToken, logout);
        }
    }, [accessToken]);

    useEffect(() => {
        login();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                accessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
