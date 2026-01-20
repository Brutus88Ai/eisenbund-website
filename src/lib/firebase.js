import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Basic runtime validation of critical config values
const hasConfig = Boolean(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId);

let app = null;
let auth = null;
let googleProvider = null;

if (hasConfig) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    // Prefer persistent local sessions for the shop
    setPersistence(auth, browserLocalPersistence).catch(err => {
        console.warn('[firebase] setPersistence failed:', err && err.code ? err.code : err);
    });
    googleProvider = new GoogleAuthProvider();
} else {
    console.warn('[firebase] Missing Firebase configuration (VITE_FIREBASE_*). Auth/Google login disabled.');
}

export { app, auth, googleProvider, hasConfig };
