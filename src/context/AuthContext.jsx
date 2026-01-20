import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for active session
        const session = localStorage.getItem('eb_session');
        if (session) {
            try {
                const users = JSON.parse(localStorage.getItem('eb_users') || '[]');
                const userData = users.find(u => u.email === session);
                if (userData) {
                    setUser(userData);
                }
            } catch (e) {
                console.error("Auth Error: Corrupted User Data", e);
                localStorage.removeItem('eb_users'); // Reset if corrupted
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

    const loginWithGoogle = async () => {
        console.log('[AuthContext] loginWithGoogle called (REAL FIREBASE)');
        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            console.log('[AuthContext] Firebase Login Success:', user);

            const googleUser = {
                id: user.uid,
                name: user.displayName || 'Google User',
                email: user.email,
                street: 'Noch nicht hinterlegt',
                city: 'Bitte ergänzen',
                provider: 'google',
                orders: []
            };

            // Sync with local storage to keep shop working
            let users = [];
            try {
                const stored = localStorage.getItem('eb_users');
                users = stored ? JSON.parse(stored) : [];
                if (!Array.isArray(users)) users = [];
            } catch (e) {
                users = [];
            }

            const existing = users.find(u => u.email === googleUser.email);

            // Only update if new, preserve existing orders/address
            const finalUser = existing ? { ...existing, id: user.uid } : googleUser;

            if (!existing) {
                users.push(finalUser);
                localStorage.setItem('eb_users', JSON.stringify(users));
            }

            setUser(finalUser);
            localStorage.setItem('eb_session', finalUser.email);

            setLoading(false);
            return { success: true };
        } catch (error) {
            console.error('[AuthContext] Firebase Login error:', error);
            setLoading(false);
            return { success: false, error: error.message };
        }
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
        <AuthContext.Provider value={{ user, login, register, logout, loginWithGoogle, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
