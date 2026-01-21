import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Check, CreditCard, User, LogIn, Globe, Loader2 } from 'lucide-react';

const Checkout = ({ onBack, onNavigate }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, loginWithGoogle, hasConfig } = useAuth();
    const [step, setStep] = useState(1);
    const [authMethod, setAuthMethod] = useState(null);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        street: '',
        city: '',
        zip: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                name: user.name || '',
                street: user.street || '',
                city: user.city || '',
                zip: ''
            });
            setStep(2);
            setAuthMethod('login');
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3);
        clearCart();
    };

    const handleGoogleCheckout = async () => {
        if (!hasConfig) return;
        setIsGoogleLoading(true);
        await loginWithGoogle();
        setIsGoogleLoading(false);
    };

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#0d0d0d] px-4">
                <div className="text-center">
                    <h2 className="text-2xl text-white font-industrial mb-4 tracking-widest">WARENKORB LEER</h2>
                    <button
                        onClick={onBack}
                        className="text-[#8b0000] hover:text-white underline transition-colors min-h-[48px]"
                    >
                        Zurück zum Shop
                    </button>
                </div>
            </div>
        );
    }

    /* --- STEP 3: SUCCESS --- */
    if (step === 3) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#0d0d0d]">
                <div className="max-w-md w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center shadow-2xl animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#8b0000] to-[#5a0000] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(139,0,0,0.4)]">
                        <Check size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl text-white font-industrial mb-3 tracking-widest drop-shadow-lg">AUFTRAG BESTÄTIGT</h2>
                    <p className="text-stone-400 font-mono text-sm mb-8">
                        Bestellnummer: <span className="text-[#8b0000]">#EB-{Math.floor(Math.random() * 90000) + 10000}</span><br />
                        Bestätigung wurde an {formData.email || 'deine E-Mail'} gesendet.
                    </p>
                    <button
                        onClick={onBack}
                        className="rounded-lg bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 font-bold uppercase tracking-widest border border-stone-600 transition-all min-h-[48px]"
                    >
                        Zurück zur Basis
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#0d0d0d] pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-mono text-stone-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT COLUMN: PROCESS */}
                <div>
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-stone-500 hover:text-white mb-8 transition-colors min-h-[44px]"
                    >
                        <ArrowLeft size={16} /> ZURÜCK
                    </button>

                    <h1 className="text-3xl sm:text-4xl text-white font-industrial mb-8 tracking-widest border-b border-white/20 pb-4">
                        KASSE <span className="text-[#8b0000]">///</span>
                    </h1>

                    {/* STEP 1: METHOD SELECTION */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-300">
                            <h3 className="text-stone-400 font-bold uppercase tracking-widest mb-4">1. Identifikation</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => { setAuthMethod('guest'); setStep(2); }}
                                    className="p-6 sm:p-8 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#8b0000] hover:bg-white/10 transition-all text-center group min-h-[140px]"
                                >
                                    <User size={32} className="mx-auto mb-4 text-stone-500 group-hover:text-[#8b0000] transition-colors" />
                                    <span className="block text-white font-bold mb-2">ALS GAST BESTELLEN</span>
                                    <span className="text-xs text-stone-500">Schnelle Abwicklung.</span>
                                </button>

                                <button
                                    onClick={() => onNavigate('login')}
                                    className="p-6 sm:p-8 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#8b0000] hover:bg-white/10 transition-all text-center group min-h-[140px]"
                                >
                                    <LogIn size={32} className="mx-auto mb-4 text-stone-500 group-hover:text-[#8b0000] transition-colors" />
                                    <span className="block text-white font-bold mb-2">LOGIN</span>
                                    <span className="text-xs text-stone-500">Mit Eisenbund-ID.</span>
                                </button>
                            </div>

                            {/* GOOGLE OPTION */}
                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-[#23272f] px-4 text-stone-500 text-xs uppercase">Oder</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleCheckout}
                                disabled={isGoogleLoading || !hasConfig}
                                className="w-full rounded-lg p-4 bg-white/90 text-stone-900 hover:bg-white transition-colors flex items-center justify-center gap-3 font-bold uppercase tracking-widest min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGoogleLoading ? <Loader2 className="animate-spin" size={20} /> : <Globe size={20} />}
                                Sign in with Google
                            </button>
                        </div>
                    )}

                    {/* STEP 2: FORM */}
                    {step === 2 && (
                        <div className="animate-in slide-in-from-left duration-300">
                            <h3 className="text-stone-400 font-bold uppercase tracking-widest mb-6">
                                2. Lieferdaten ({authMethod === 'guest' ? 'Gast' : 'Account'})
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="block text-xs text-stone-400">E-MAIL *</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            autoComplete="email"
                                            className="w-full rounded-lg bg-black/60 border border-white/20 px-4 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="block text-xs text-stone-400">NAME *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            autoComplete="name"
                                            className="w-full rounded-lg bg-black/60 border border-white/20 px-4 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="block text-xs text-stone-400">STRASSE & HAUSNUMMER *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.street}
                                        autoComplete="street-address"
                                        className="w-full rounded-lg bg-black/60 border border-white/20 px-4 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                                        onChange={e => setFormData({ ...formData, street: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="block text-xs text-stone-400">PLZ *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.zip}
                                            autoComplete="postal-code"
                                            className="w-full rounded-lg bg-black/60 border border-white/20 px-4 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                                            onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-1">
                                        <label className="block text-xs text-stone-400">STADT *</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.city}
                                            autoComplete="address-level2"
                                            className="w-full rounded-lg bg-black/60 border border-white/20 px-4 py-3 text-white focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] outline-none transition-all"
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h3 className="text-stone-400 font-bold uppercase tracking-widest mb-4">3. ZAHLUNG</h3>
                                    <div className="rounded-lg p-4 border border-[#8b0000]/50 bg-[#8b0000]/10 flex items-center gap-4 text-[#8b0000]">
                                        <CreditCard size={20} />
                                        <span className="font-bold text-sm">TEST-MODUS: VORKASSE / RECHNUNG</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-8 rounded-lg bg-[#8b0000] hover:bg-[#a00000] text-white py-4 font-bold uppercase tracking-[0.2em] transition-all min-h-[52px] shadow-lg"
                                >
                                    ZAHLUNGSPFLICHTIG BESTELLEN
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: SUMMARY */}
                <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 h-fit lg:sticky lg:top-24 shadow-2xl">
                    <h3 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-3">
                        BESTELLÜBERSICHT
                    </h3>
                    <div className="space-y-4 mb-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-start text-sm">
                                <div>
                                    <span className="block text-white font-bold">{item.quantity}x {item.title}</span>
                                    <span className="text-stone-500 text-xs">Artikel-Nr: EB-{item.id}00</span>
                                </div>
                                <span className="text-stone-300 font-mono">
                                    {(parseFloat(item.price.replace(',', '.').replace(' €', '')) * item.quantity).toFixed(2).replace('.', ',')} €
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-white/20 pt-4 flex justify-between items-center text-xl text-[#8b0000] font-industrial">
                        <span>SUMME</span>
                        <span>{cartTotal.toFixed(2).replace('.', ',')} €</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
