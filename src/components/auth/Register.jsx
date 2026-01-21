import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, Loader2, ArrowLeft } from 'lucide-react';

const Register = ({ onNavigate, onBack }) => {
    const { register, hasConfig } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        street: '',
        city: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const res = await register(formData);

        if (res.success) {
            onNavigate('shop');
        } else {
            setError(res.error);
        }
        setIsLoading(false);
    };

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#0d0d0d] px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 sm:p-10 animate-in zoom-in duration-300">

                <h2 className="text-3xl font-industrial text-white text-center tracking-[0.2em] mb-2 drop-shadow-lg">
                    NEUER REKRUT
                </h2>
                <p className="text-xs text-center mb-8 font-mono tracking-widest text-[#8b0000]">
                    REGISTRIERUNG IM EISENBUND-NETZWERK
                </p>

                {!hasConfig && (
                    <div className="mb-6 rounded-lg border border-yellow-700 bg-yellow-900/10 p-3 text-xs text-yellow-200">
                        Firebase nicht konfiguriert. Registrierung deaktiviert.
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-lg border border-red-800 bg-red-900/30 px-4 py-3 text-sm text-red-400 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="block text-xs font-mono uppercase text-stone-300">E-Mail *</label>
                            <input
                                required
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange('email')}
                                className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="block text-xs font-mono uppercase text-stone-300">Passwort *</label>
                            <input
                                required
                                type="password"
                                autoComplete="new-password"
                                minLength={6}
                                value={formData.password}
                                onChange={handleChange('password')}
                                className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                            />
                            <span className="text-xs text-stone-500">Min. 6 Zeichen</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="block text-xs font-mono uppercase text-stone-300">Voller Name *</label>
                        <input
                            required
                            type="text"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange('name')}
                            className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="block text-xs font-mono uppercase text-stone-300">Straße & Hausnr.</label>
                        <input
                            type="text"
                            autoComplete="street-address"
                            value={formData.street}
                            onChange={handleChange('street')}
                            placeholder="Optional – kann später ergänzt werden"
                            className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white placeholder:text-stone-500 focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="block text-xs font-mono uppercase text-stone-300">PLZ & Stadt</label>
                        <input
                            type="text"
                            autoComplete="address-level2"
                            value={formData.city}
                            onChange={handleChange('city')}
                            placeholder="Optional – kann später ergänzt werden"
                            className="w-full rounded-lg bg-black/60 border border-white/20 px-3 py-3 text-white placeholder:text-stone-500 focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !hasConfig}
                        className="w-full mt-6 rounded-lg bg-[#8b0000] hover:bg-[#a00000] text-white py-3 font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                <UserCheck size={18} /> Profil erstellen
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-white/20 text-center flex flex-col gap-2">
                    <button
                        onClick={() => onNavigate('login')}
                        className="text-stone-300 hover:text-white text-xs uppercase tracking-widest transition-colors min-h-[44px]"
                    >
                        Bereits registriert? Login
                    </button>
                    <button
                        onClick={onBack}
                        className="flex items-center justify-center gap-1 text-stone-500 hover:text-[#8b0000] text-xs uppercase tracking-widest transition-colors min-h-[44px]"
                    >
                        <ArrowLeft size={12} /> Abbrechen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
