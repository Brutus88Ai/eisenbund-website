import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, UserCheck } from 'lucide-react';

const Register = ({ onNavigate, onBack }) => {
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        street: '',
        city: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = register(formData);
        if (res.success) {
            onNavigate('shop'); // Go to shop/account
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen pt-32 px-6 flex items-center justify-center bg-[#0d0d0d]">
            <div className="max-w-lg w-full bg-[#1a1a1a] border border-[#333] p-8 animate-in zoom-in duration-300 shadow-2xl">

                <h2 className="text-3xl text-white font-industrial mb-2 tracking-[0.2em] text-center">
                    NEUER REKRUT
                </h2>
                <p className="text-center text-stone-500 text-xs font-mono uppercase mb-8">
                    Registrierung im Eisenbund-Netzwerk
                </p>

                {error && (
                    <div className="bg-red-900/20 border border-red-800 p-3 mb-6 text-red-500 text-xs text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">E-Mail *</label>
                            <input required type="email"
                                className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none"
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Passwort *</label>
                            <input required type="password"
                                className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none"
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Voller Name *</label>
                        <input required type="text"
                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none"
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">Straße & Hausnr. *</label>
                        <input required type="text"
                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none"
                            onChange={e => setFormData({ ...formData, street: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-stone-500 mb-1 font-mono uppercase">PLZ & Stadt *</label>
                        <input required type="text"
                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none"
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-[#8b0000] hover:bg-[#a00000] text-white py-3 font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                    >
                        <UserCheck size={18} /> Profil erstellen
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => onNavigate('login')}
                        className="text-stone-500 hover:text-white text-xs uppercase tracking-widest underline"
                    >
                        Bereits registriert? Login
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

export default Register;
