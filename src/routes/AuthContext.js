import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null to indicate loading state
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    useEffect(() => {
        const token = cookies.token;
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [cookies.token]);

    const login = (token) => {
        setCookie('token', token, { path: '/' });
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeCookie('token', { path: '/' });
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
