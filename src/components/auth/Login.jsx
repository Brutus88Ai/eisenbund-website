import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, UserPlus, FileWarning, Globe, Loader2 } from 'lucide-react';

const Login = ({ onNavigate, onBack }) => {
    const { login, loginWithGoogle } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
        setIsGoogleLoading(true);
        await loginWithGoogle();
        setIsGoogleLoading(false);
        onNavigate('shop');
    };

    return (
        <div className="min-h-screen pt-32 px-6 flex items-center justify-center bg-[#0d0d0d]">
            <div className="max-w-md w-full bg-[#1a1a1a] border border-[#333] p-8 animate-in zoom-in duration-300 relative shadow-2xl">

                <h2 className="text-3xl text-white font-industrial mb-6 tracking-[0.2em] text-center">
                    SYSTEM LOGIN
                </h2>

                {error && (
                    <div className="bg-red-900/20 border border-red-800 p-3 mb-6 text-red-500 text-xs flex items-center gap-2">
                        <FileWarning size={16} /> {error}
                    </div>
                )}

                {/* GOOGLE AUTH */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="w-full bg-white text-stone-900 py-3 font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors flex items-center justify-center gap-3 mb-6"
                >
                    {isGoogleLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        <Globe size={18} />
                    )}
                    Sign in with Google
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-[#333] flex-1"></div>
                    <span className="text-stone-500 text-xs uppercase">Oder</span>
                    <div className="h-px bg-[#333] flex-1"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">E-Mail</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none transition-colors"
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Passwort</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none transition-colors"
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#8b0000] hover:bg-[#a00000] text-white py-3 font-bold uppercase tracking-[0.2em] transition-all"
                    >
                        Authentifizieren
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-[#333] pt-4">
                    <button
                        onClick={() => onNavigate('register')}
                        className="text-stone-400 hover:text-white text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                        <UserPlus size={14} /> Kein Zugang? Registrieren
                    </button>
                    <button
                        onClick={onBack}
                        className="text-stone-600 hover:text-[#8b0000] text-xs uppercase tracking-widest mt-4 block mx-auto"
                    >
                        &lt; Abbrechen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
