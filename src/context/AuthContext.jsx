import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db, googleProvider, hasConfig } from '../lib/firebase';
import {
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Konstanten
const USERS_COLLECTION = 'users';
const DEFAULT_ADDRESS = { street: 'Noch nicht hinterlegt', city: 'Bitte ergänzen' };

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Firebase User zu lokalem User-Objekt konvertieren
    const firebaseUserToLocal = async (firebaseUser) => {
        if (!firebaseUser) return null;

        const baseUser = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Rekrut',
            email: firebaseUser.email,
            provider: firebaseUser.providerData?.[0]?.providerId || 'email',
            ...DEFAULT_ADDRESS,
            orders: []
        };

        // Versuche zusätzliche Daten aus Firestore zu laden
        if (hasConfig && db) {
            try {
                const userDoc = await getDoc(doc(db, USERS_COLLECTION, firebaseUser.uid));
                if (userDoc.exists()) {
                    const firestoreData = userDoc.data();
                    return { ...baseUser, ...firestoreData, id: firebaseUser.uid };
                }
            } catch (e) {
                console.warn('[AuthContext] Firestore read failed:', e);
            }
        }

        return baseUser;
    };

    // User-Daten in Firestore speichern
    const saveUserToFirestore = async (uid, userData) => {
        if (!hasConfig || !db) return;
        try {
            await setDoc(doc(db, USERS_COLLECTION, uid), {
                name: userData.name,
                email: userData.email,
                street: userData.street || DEFAULT_ADDRESS.street,
                city: userData.city || DEFAULT_ADDRESS.city,
                orders: userData.orders || [],
                updatedAt: new Date().toISOString()
            }, { merge: true });
        } catch (e) {
            console.warn('[AuthContext] Firestore write failed:', e);
        }
    };

    useEffect(() => {
        console.log('[v4.0] Firebase Auth System Initializing...');

        let unsubscribe = null;

        // Check for OAuth redirect result
        const checkRedirect = async () => {
            if (!hasConfig || !auth) return;
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    const localUser = await firebaseUserToLocal(result.user);
                    setUser(localUser);
                }
            } catch (e) {
                console.error('[AuthContext] getRedirectResult error:', e);
            }
        };

        checkRedirect();

        // Listen to firebase auth state changes
        if (hasConfig && auth) {
            unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    const localUser = await firebaseUserToLocal(firebaseUser);
                    setUser(localUser);
                } else {
                    setUser(null);
                }
                setLoading(false);
            }, (err) => {
                console.error('[AuthContext] onAuthStateChanged error:', err);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    // Email/Passwort Login
    const login = async (email, password) => {
        if (!hasConfig || !auth) {
            return { success: false, error: 'Firebase nicht konfiguriert.' };
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const localUser = await firebaseUserToLocal(result.user);
            setUser(localUser);
            return { success: true };
        } catch (error) {
            console.error('[AuthContext] Login error:', error);
            const errorMessages = {
                'auth/user-not-found': 'Kein Account mit dieser E-Mail gefunden.',
                'auth/wrong-password': 'Falsches Passwort.',
                'auth/invalid-email': 'Ungültige E-Mail-Adresse.',
                'auth/too-many-requests': 'Zu viele Versuche. Bitte später erneut versuchen.',
                'auth/invalid-credential': 'Zugangsdaten ungültig.'
            };
            return {
                success: false,
                error: errorMessages[error.code] || 'Login fehlgeschlagen.',
                code: error.code
            };
        }
    };

    // Email/Passwort Registrierung
    const register = async (userData) => {
        if (!hasConfig || !auth) {
            return { success: false, error: 'Firebase nicht konfiguriert.' };
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

            // Display Name setzen
            await updateProfile(result.user, { displayName: userData.name });

            // User-Daten in Firestore speichern
            await saveUserToFirestore(result.user.uid, userData);

            const localUser = {
                id: result.user.uid,
                name: userData.name,
                email: userData.email,
                street: userData.street || DEFAULT_ADDRESS.street,
                city: userData.city || DEFAULT_ADDRESS.city,
                provider: 'email',
                orders: []
            };

            setUser(localUser);
            return { success: true };
        } catch (error) {
            console.error('[AuthContext] Register error:', error);
            const errorMessages = {
                'auth/email-already-in-use': 'Diese E-Mail ist bereits registriert.',
                'auth/weak-password': 'Passwort muss mindestens 6 Zeichen haben.',
                'auth/invalid-email': 'Ungültige E-Mail-Adresse.'
            };
            return {
                success: false,
                error: errorMessages[error.code] || 'Registrierung fehlgeschlagen.',
                code: error.code
            };
        }
    };

    // Passwort-Reset
    const resetPassword = async (email) => {
        if (!hasConfig || !auth) {
            return { success: false, error: 'Firebase nicht konfiguriert.' };
        }

        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            console.error('[AuthContext] Password reset error:', error);
            const errorMessages = {
                'auth/user-not-found': 'Kein Account mit dieser E-Mail gefunden.',
                'auth/invalid-email': 'Ungültige E-Mail-Adresse.'
            };
            return {
                success: false,
                error: errorMessages[error.code] || 'Passwort-Reset fehlgeschlagen.',
                code: error.code
            };
        }
    };

    // Google Login
    const loginWithGoogle = async () => {
        if (!hasConfig || !auth) {
            return { success: false, error: 'Firebase nicht konfiguriert.' };
        }

        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const localUser = await firebaseUserToLocal(result.user);

            // User-Daten in Firestore speichern (merge für bestehende Daten)
            await saveUserToFirestore(result.user.uid, localUser);

            setUser(localUser);
            setLoading(false);
            return { success: true };
        } catch (error) {
            console.error('[AuthContext] Google Login error:', error);

            // Fallback zu Redirect bei Popup-Problemen
            const popupErrorCodes = [
                'auth/popup-blocked',
                'auth/popup-closed-by-user',
                'auth/cancelled-popup-request'
            ];

            if (popupErrorCodes.includes(error.code)) {
                try {
                    await signInWithRedirect(auth, googleProvider);
                    return { success: 'redirect' };
                } catch (redirectErr) {
                    setLoading(false);
                    return { success: false, error: redirectErr.message };
                }
            }

            setLoading(false);
            return { success: false, error: error.message, code: error.code };
        }
    };

    // Logout
    const logout = async () => {
        setUser(null);
        if (hasConfig && auth) {
            try {
                await signOut(auth);
            } catch (e) {
                console.warn('[AuthContext] signOut failed:', e);
            }
        }
    };

    // User-Daten aktualisieren
    const updateUser = async (updatedData) => {
        if (!user) return;

        const newUser = { ...user, ...updatedData };
        setUser(newUser);

        // In Firestore speichern
        await saveUserToFirestore(user.id, newUser);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loginWithGoogle,
            resetPassword,
            updateUser,
            loading,
            hasConfig
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
