import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCp7sh-nw4Y2fJx1JjoZtzS4orqhhpHqgU",
    authDomain: "brutusai-43b25.firebaseapp.com",
    projectId: "brutusai-43b25",
    storageBucket: "brutusai-43b25.firebasestorage.app",
    messagingSenderId: "208486508282",
    appId: "1:208486508282:web:0e1bb5b9b57046488b0b43",
    measurementId: "G-F8QWZFT7DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
