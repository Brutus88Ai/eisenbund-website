import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, UserPlus, FileWarning, Globe, Loader2, KeyRound, Mail } from 'lucide-react';

const Login = ({ onNavigate, onBack }) => {
    const { login, loginWithGoogle, resetPassword, hasConfig } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetStatus, setResetStatus] = useState({ sent: false, error: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const res = await login(formData.email, formData.password);

        if (res.success) {
            onNavigate('shop');
        } else {
            setError(res.error);
        }
        setIsLoading(false);
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);
            setError('');
            const result = await loginWithGoogle();

            if (result?.success === true) {
                onNavigate('account');
            } else if (result?.success === 'redirect') {
                setIsRedirecting(true);
            } else {
                setError(result?.error || 'Google Login fehlgeschlagen.');
            }
        } catch (err) {
            setError('Google Login Fehler: ' + err.message);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setResetStatus({ sent: false, error: '' });

        const res = await resetPassword(resetEmail);

        if (res.success) {
            setResetStatus({ sent: true, error: '' });
        } else {
            setResetStatus({ sent: false, error: res.error });
        }
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
                    FIREBASE v4.0 ACTIVE
                </p>

                {!hasConfig && (
                    <div className="mb-4 rounded-lg border border-yellow-700 bg-yellow-900/10 p-3 text-xs text-yellow-200">
                        Firebase nicht konfiguriert. Login deaktiviert.
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
                    className={`w-full flex items-center justify-center gap-3 mb-6 rounded-lg py-3 font-bold uppercase tracking-widest text-stone-900 shadow-md transition-all min-h-[48px] ${isGoogleLoading || !hasConfig
                            ? 'bg-white/40 cursor-not-allowed'
                            : 'bg-white/80 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b0000]'
                        }`}
                    aria-label="Mit Google anmelden"
                >
                    {isGoogleLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        <Globe size={18} />
                    )}
                    <span>Sign in with Google</span>
                </button>

                {isRedirecting && (
                    <div className="mb-6 text-sm text-center text-stone-300">
                        Weiterleitung zu Google...
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
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowResetModal(true)}
                        className="text-xs text-stone-400 hover:text-[#8b0000] transition-colors"
                    >
                        Passwort vergessen?
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading || !hasConfig}
                        className="w-full rounded-lg bg-[#8b0000] py-3 font-bold uppercase tracking-[0.2em] text-white shadow-md hover:bg-[#a00000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b0000] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] flex items-center justify-center"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Authentifizieren'}
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-white/20 text-center flex flex-col gap-2">
                    <button
                        onClick={() => onNavigate('register')}
                        className="mx-auto flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors min-h-[44px]"
                    >
                        <UserPlus size={14} /> Kein Zugang? Registrieren
                    </button>
                    <button
                        onClick={onBack}
                        className="mx-auto mt-2 block text-xs uppercase tracking-widest text-stone-500 hover:text-[#8b0000] transition-colors min-h-[44px]"
                    >
                        &lt; Abbrechen
                    </button>
                </div>
            </div>

            {/* Password Reset Modal */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 animate-in zoom-in duration-200">
                        <div className="flex items-center gap-3 mb-4">
                            <KeyRound className="text-[#8b0000]" size={24} />
                            <h3 className="text-xl font-industrial text-white tracking-widest">PASSWORT RESET</h3>
                        </div>

                        {resetStatus.sent ? (
                            <div className="text-center py-4">
                                <Mail className="mx-auto mb-3 text-green-500" size={32} />
                                <p className="text-green-400 text-sm">Reset-Link wurde gesendet!</p>
                                <p className="text-stone-400 text-xs mt-2">Prüfe deinen Posteingang.</p>
                                <button
                                    onClick={() => { setShowResetModal(false); setResetStatus({ sent: false, error: '' }); }}
                                    className="mt-4 px-4 py-2 bg-[#8b0000] text-white rounded-lg text-sm"
                                >
                                    Schließen
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handlePasswordReset} className="space-y-4">
                                {resetStatus.error && (
                                    <div className="text-red-400 text-xs bg-red-900/20 p-2 rounded">{resetStatus.error}</div>
                                )}
                                <input
                                    type="email"
                                    required
                                    placeholder="E-Mail-Adresse"
                                    value={resetEmail}
                                    onChange={e => setResetEmail(e.target.value)}
                                    className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white placeholder:text-stone-400 focus:border-[#8b0000] outline-none"
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowResetModal(false)}
                                        className="flex-1 py-2 border border-white/20 text-white rounded-lg text-sm hover:bg-white/10"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2 bg-[#8b0000] text-white rounded-lg text-sm hover:bg-[#a00000]"
                                    >
                                        Link senden
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

