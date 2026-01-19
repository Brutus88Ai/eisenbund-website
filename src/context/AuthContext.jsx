import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for active session
        const session = localStorage.getItem('eb_session');
        if (session) {
            const userData = JSON.parse(localStorage.getItem('eb_users') || '[]').find(u => u.email === session);
            if (userData) {
                setUser(userData);
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('eb_users') || '[]');
        const validUser = users.find(u => u.email === email && u.password === password);

        if (validUser) {
            setUser(validUser);
            localStorage.setItem('eb_session', email);
            return { success: true };
        }
        return { success: false, error: 'Zugangsdaten ungültig.' };
    };

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('eb_users') || '[]');

        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'E-Mail bereits registriert.' };
        }

        const newUser = {
            ...userData,
            id: Date.now(),
            orders: []
        };

        users.push(newUser);
        localStorage.setItem('eb_users', JSON.stringify(users));

        // Auto-login
        setUser(newUser);
        localStorage.setItem('eb_session', newUser.email);

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eb_session');
    };

    const updateUser = (updatedData) => {
        const users = JSON.parse(localStorage.getItem('eb_users') || '[]');
        const updatedUsers = users.map(u => u.email === user.email ? { ...u, ...updatedData } : u);
        localStorage.setItem('eb_users', JSON.stringify(updatedUsers));
        setUser({ ...user, ...updatedData });
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
