import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider, hasConfig } from '../lib/firebase';
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('[v3.3] Auth System Initializing...');
        // v3.3 MIGRATION: Purge Legacy Data
        const session = localStorage.getItem('eb_session');
        if (session) {
            try {
                const users = JSON.parse(localStorage.getItem('eb_users') || '[]');
                const userData = users.find(u => u.email === session);

                // DETECT LEGACY/FAKE USER
                if (userData && (userData.name === 'Google User' || (userData.id && userData.id.toString().startsWith('google_')))) {
                    console.log('[v3.3] Legacy User detected. Purging data.');
                    localStorage.removeItem('eb_session');
                    localStorage.removeItem('eb_users');
                    setUser(null);
                } else if (userData) {
                    setUser(userData);
                }
            } catch (e) {
                console.error("Auth Error v3.3: Corrupted User Data", e);
                localStorage.removeItem('eb_users');
            }
        }

        let unsubscribe = null;

        // After purge, check if we returned from an OAuth redirect flow
        const checkRedirect = async () => {
            if (!hasConfig || !auth) return;
            try {
                const result = await getRedirectResult(auth);
                if (result && result.user) {
                    // Reuse popup-success flow to normalize user data
                    const firebaseUser = result.user;
                    handleFirebaseSignIn(firebaseUser);
                }
            } catch (e) {
                console.error('[AuthContext] getRedirectResult error:', e);
                try { localStorage.setItem('eb_last_auth_error', JSON.stringify({ time: Date.now(), source: 'getRedirectResult', code: e && e.code, message: e && e.message })); } catch (e2) {}
            }
        };

        checkRedirect();

        // Listen to firebase auth state changes to keep local storage in sync
        if (hasConfig && auth) {
            try {
                unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                    if (firebaseUser) {
                        handleFirebaseSignIn(firebaseUser);
                    } else {
                        // If firebase sign-out occurs, and our local user was a google user, clear it
                        setUser(prev => {
                            if (prev && prev.provider === 'google') {
                                localStorage.removeItem('eb_session');
                                return null;
                            }
                            return prev;
                        });
                    }
                }, (err) => {
                    console.error('[AuthContext] onAuthStateChanged error:', err);
                });
            } catch (e) {
                console.error('[AuthContext] Failed to attach auth listener:', e);
            }
        }

        // initial load finished
        setLoading(false);

        return () => {
            if (unsubscribe) unsubscribe();
        };
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

    // Helper to handle a Firebase user object (from popup or redirect)
    const handleFirebaseSignIn = (user) => {
        if (!user) return;

        const googleUser = {
            id: user.uid,
            name: user.displayName || 'Google User',
            email: user.email,
            street: 'Noch nicht hinterlegt',
            city: 'Bitte ergänzen',
            provider: (user.providerData && user.providerData[0] && user.providerData[0].providerId) ? user.providerData[0].providerId : 'google',
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
        const finalUser = existing ? { ...existing, id: user.uid } : googleUser;

        if (!existing) {
            users.push(finalUser);
            localStorage.setItem('eb_users', JSON.stringify(users));
        }

        setUser(finalUser);
        localStorage.setItem('eb_session', finalUser.email);
    };

    const loginWithGoogle = async () => {
        console.log('[AuthContext] loginWithGoogle called (REAL FIREBASE)');
        if (!hasConfig || !auth) {
            const msg = 'Firebase nicht konfiguriert. Bitte prüfen Sie VITE_FIREBASE_* Variablen.';
            try { localStorage.setItem('eb_last_auth_error', JSON.stringify({ time: Date.now(), source: 'no-config', message: msg })); } catch (e) {}
            return { success: false, error: msg };
        }

        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('[AuthContext] Firebase Login Success (popup):', user);
            handleFirebaseSignIn(user);
            setLoading(false);
            return { success: true };
        } catch (error) {
            // Provide richer logging and fallback to redirect flow for deployed websites
            console.error('[AuthContext] Firebase Login error (popup):', error && error.code, error && error.message, error);
            try {
                localStorage.setItem('eb_last_auth_error', JSON.stringify({
                    time: Date.now(),
                    source: 'popup',
                    code: error && error.code,
                    message: error && error.message,
                    stack: error && error.stack ? String(error.stack) : null
                }));
            } catch (e) {
                // ignore storage errors
            }

            // Common popup issues — fallback to redirect-based OAuth
            const popupErrorCodes = [
                'auth/popup-blocked',
                'auth/popup-closed-by-user',
                'auth/cancelled-popup-request',
                'auth/web-storage-unsupported'
            ];

            if (error && popupErrorCodes.includes(error.code)) {
                try {
                    console.warn('[AuthContext] Falling back to signInWithRedirect due to popup error:', error.code);
                    await signInWithRedirect(auth, googleProvider);
                    // Note: signInWithRedirect will redirect away — the result will be handled on return via getRedirectResult
                    try { localStorage.setItem('eb_last_auth_error', JSON.stringify({ time: Date.now(), source: 'redirect-fallback', code: error.code, message: error.message })); } catch (e) {}
                    return { success: 'redirect' };
                } catch (redirectErr) {
                    console.error('[AuthContext] signInWithRedirect failed:', redirectErr);
                    try {
                        localStorage.setItem('eb_last_auth_error', JSON.stringify({
                            time: Date.now(),
                            source: 'redirect',
                            code: redirectErr && redirectErr.code,
                            message: redirectErr && redirectErr.message,
                            stack: redirectErr && redirectErr.stack ? String(redirectErr.stack) : null
                        }));
                    } catch (e) {}
                    setLoading(false);
                    return { success: false, error: redirectErr.message, code: redirectErr.code };
                }
            }

            setLoading(false);
            return { success: false, error: error.message, code: error.code };
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

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('eb_session');
        // If a firebase user exists, sign them out as well
        if (hasConfig && auth) {
            try {
                await signOut(auth);
            } catch (e) {
                console.warn('[AuthContext] signOut failed:', e);
            }
        }
    };

    const updateUser = (updatedData) => {
        const users = JSON.parse(localStorage.getItem('eb_users') || '[]');
        const updatedUsers = users.map(u => u.email === user.email ? { ...u, ...updatedData } : u);
        localStorage.setItem('eb_users', JSON.stringify(updatedUsers));
        setUser({ ...user, ...updatedData });
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loginWithGoogle, updateUser, loading, hasConfig }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
