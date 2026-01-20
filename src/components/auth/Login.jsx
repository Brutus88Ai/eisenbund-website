import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, UserPlus, FileWarning, Globe, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const Login = ({ onNavigate, onBack }) => {
    const { login, loginWithGoogle, hasConfig } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [lastAuthError, setLastAuthError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = login(formData.email, formData.password);
        if (res.success) {
            onNavigate('shop'); // Go to shop/account
        } else {
            setError(res.error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);
            setError('');
            console.log('Starting Google Login...');
            const result = await loginWithGoogle();
            console.log('Google Login Result:', result);

            if (result && result.success === true) {
                console.log('Login successful, navigating to account...');
                onNavigate('account'); // Go directly to account page
            } else if (result && result.success === 'redirect') {
                // The app will redirect to the provider; show a friendly message
                console.log('Redirecting to provider for authentication...');
                setIsRedirecting(true);
            } else {
                setError(result && result.error ? result.error : 'Google Login fehlgeschlagen. Bitte erneut versuchen.');
            }
        } catch (err) {
            console.error('Google Login Error:', err);
            setError('Google Login Fehler: ' + err.message);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    useEffect(() => {
        try {
            const raw = localStorage.getItem('eb_last_auth_error');
            if (raw) setLastAuthError(JSON.parse(raw));
        } catch (e) {
            // ignore
        }
    }, []);

    const copyError = async () => {
        try {
            await navigator.clipboard.writeText(JSON.stringify(lastAuthError, null, 2));
        } catch (e) {
            // ignore
        }
    };

    const clearError = () => {
        try {
            localStorage.removeItem('eb_last_auth_error');
            setLastAuthError(null);
        } catch (e) {}
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#0d0d0d] px-4 py-12 sm:px-6 lg:px-8">
            <div
                className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 sm:p-10 animate-in zoom-in duration-300 relative"
                role="main"
                aria-label="Login-Bereich"
            >
                <h2 className="text-3xl font-industrial text-white text-center tracking-[0.2em] mb-2 drop-shadow-lg">
                    SYSTEM LOGIN
                </h2>
                <p className="text-xs text-center mb-6 font-mono tracking-widest leading-loose text-[#8b0000]">
                    SYSTEM v4.0 (LEAD DEV SYNC ACTIVE)
                </p>

                {!hasConfig && (
                    <div className="mb-4 rounded-lg border border-yellow-700 bg-yellow-900/10 p-3 text-xs text-yellow-200">
                        Firebase nicht konfiguriert. Google-Login deaktiviert. Bitte VITE_FIREBASE_* Variablen prüfen.
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 mb-6 rounded-lg border border-red-800 bg-red-900/30 px-3 py-2 text-xs text-red-400" role="alert">
                        <FileWarning size={16} aria-hidden="true" />
                        <span>{error}</span>
                    </div>
                )}

                {/* GOOGLE AUTH */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading || !hasConfig}
                    aria-disabled={!hasConfig}
                    className={`w-full flex items-center justify-center gap-3 mb-6 rounded-lg py-3 font-bold uppercase tracking-widest text-stone-900 shadow-md transition-all ${isGoogleLoading || !hasConfig ? 'bg-white/40 cursor-not-allowed' : 'bg-white/80 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b0000] focus-visible:ring-offset-2'}`}
                    aria-label="Mit Google anmelden"
                >
                    {isGoogleLoading ? (
                        <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                    ) : (
                        <Globe size={18} aria-hidden="true" />
                    )}
                    <span>Sign in with Google</span>
                </button>

                {isRedirecting && (
                    <div className="mb-6 text-sm text-center text-stone-300">
                        Weiterleitung zu Google... Bitte Popup erlauben oder das Fenster nicht schließen.
                    </div>
                )}

                {lastAuthError && (
                    <div className="mb-6 rounded-lg border border-yellow-600 bg-yellow-900/10 p-3 text-xs text-yellow-200">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <strong>Letzter Auth-Fehler (Debug):</strong>
                                <div className="text-[11px] text-yellow-200/90">{new Date(lastAuthError.time).toLocaleString()} — {lastAuthError.source}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={copyError} className="px-2 py-1 bg-yellow-700/70 rounded text-[11px]">Kopieren</button>
                                <button onClick={clearError} className="px-2 py-1 bg-transparent border border-yellow-700 rounded text-[11px]">Löschen</button>
                            </div>
                        </div>
                        <pre className="mt-2 text-[11px] whitespace-pre-wrap break-words text-yellow-100/90">{lastAuthError.code}: {lastAuthError.message}</pre>
                    </div>
                )}

                <div className="flex items-center gap-4 mb-6" aria-hidden="true">
                    <div className="flex-1 h-px bg-white/20" />
                    <span className="text-xs uppercase text-stone-400">Oder</span>
                    <div className="flex-1 h-px bg-white/20" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="block text-xs font-mono uppercase text-stone-300">E-Mail</label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white placeholder:text-stone-400 focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            aria-label="E-Mail-Adresse"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block text-xs font-mono uppercase text-stone-300">Passwort</label>
                        <input
                            id="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white placeholder:text-stone-400 focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            aria-label="Passwort"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#8b0000] py-3 font-bold uppercase tracking-[0.2em] text-white shadow-md hover:bg-[#a00000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b0000] focus-visible:ring-offset-2 transition-all"
                        aria-label="Authentifizieren"
                    >
                        Authentifizieren
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-white/20 text-center flex flex-col gap-2">
                    <button
                        onClick={() => onNavigate('register')}
                        className="mx-auto flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b0000] focus-visible:ring-offset-2"
                        aria-label="Registrieren"
                    >
                        <UserPlus size={14} aria-hidden="true" /> Kein Zugang? Registrieren
                    </button>
                    <button
                        onClick={onBack}
                        className="mx-auto mt-2 block text-xs uppercase tracking-widest text-stone-500 hover:text-[#8b0000] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b0000] focus-visible:ring-offset-2"
                        aria-label="Abbrechen"
                    >
                        &lt; Abbrechen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
