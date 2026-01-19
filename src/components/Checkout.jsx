import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, CreditCard, User, LogIn } from 'lucide-react';

const Checkout = ({ onBack }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Method, 2: Form, 3: Success
    const [authMethod, setAuthMethod] = useState(null); // 'guest' | 'login'

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        street: '',
        city: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3);
        clearCart();
    };

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen pt-32 px-6 text-center">
                <h2 className="text-2xl text-white font-industrial mb-4">WARENKORB LEER</h2>
                <button onClick={onBack} className="text-[#8b0000] underline">Zurück zum Shop</button>
            </div>
        );
    }

    /* --- STEP 3: SUCCESS --- */
    if (step === 3) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#0d0d0d]">
                <div className="max-w-md w-full bg-[#1a1a1a] border border-[#8b0000] p-8 text-center animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-[#8b0000] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(139,0,0,0.5)]">
                        <Check size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl text-white font-industrial mb-2 tracking-widest">AUFTRAG BESTÄTIGT</h2>
                    <p className="text-stone-400 font-mono text-sm mb-8">
                        Bestellnummer: #EB-{Math.floor(Math.random() * 90000) + 10000}<br />
                        Bestätigung wurde an {formData.email || 'deine E-Mail'} gesendet.
                    </p>
                    <button
                        onClick={onBack}
                        className="bg-stone-800 hover:bg-stone-700 text-white px-8 py-3 font-bold uppercase tracking-widest border border-stone-600"
                    >
                        Zurück zur Basis
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] pt-24 pb-12 px-6 font-mono text-stone-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT COLUMN: PROCESS */}
                <div>
                    <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} /> ZURÜCK
                    </button>

                    <h1 className="text-4xl text-white font-industrial mb-8 tracking-widest border-b border-[#333] pb-4">
                        KASSE <span className="text-[#8b0000]">///</span>
                    </h1>

                    {/* STEP 1: METHOD SELECTION */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-300">
                            <h3 className="text-stone-400 font-bold uppercase tracking-widest mb-4">1. Identifikation</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => { setAuthMethod('guest'); setStep(2); }}
                                    className="p-8 border border-[#333] bg-[#1a1a1a] hover:border-[#8b0000] hover:bg-black transition-all text-center group"
                                >
                                    <User size={32} className="mx-auto mb-4 text-stone-500 group-hover:text-[#8b0000]" />
                                    <span className="block text-white font-bold mb-2">ALS GAST BESTELLEN</span>
                                    <span className="text-xs text-stone-500">Kein Account notwendig. Schnelle Abwicklung.</span>
                                </button>

                                <button
                                    onClick={() => { setAuthMethod('login'); }}
                                    className="p-8 border border-[#333] bg-[#1a1a1a] hover:border-[#8b0000] hover:bg-black transition-all text-center group relative overflow-hidden"
                                >
                                    <div className="absolute top-2 right-2 bg-stone-800 text-[10px] px-2 py-1 uppercase text-stone-400">Coming Soon</div>
                                    <LogIn size={32} className="mx-auto mb-4 text-stone-500 group-hover:text-[#8b0000]" />
                                    <span className="block text-white font-bold mb-2">LOGIN</span>
                                    <span className="text-xs text-stone-500">Mit Eisenbund-ID anmelden.</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: FORM */}
                    {step === 2 && (
                        <div className="animate-in slide-in-from-left duration-300">
                            <h3 className="text-stone-400 font-bold uppercase tracking-widest mb-6">2. Lieferdaten ({authMethod === 'guest' ? 'Gast' : 'Account'})</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-stone-500 mb-1">E-MAIL ADRESSE *</label>
                                        <input required type="email"
                                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none transition-colors"
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-stone-500 mb-1">VOLLSTÄNDIGER NAME *</label>
                                        <input required type="text"
                                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none transition-colors"
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-stone-500 mb-1">STRASSE & HAUSNUMMER *</label>
                                    <input required type="text"
                                        className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none transition-colors"
                                        onChange={e => setFormData({ ...formData, street: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-stone-500 mb-1">PLZ *</label>
                                        <input required type="text"
                                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-stone-500 mb-1">STADT *</label>
                                        <input required type="text"
                                            className="w-full bg-black border border-[#333] p-3 text-white focus:border-[#8b0000] outline-none transition-colors"
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h3 className="text-stone-400 font-bold uppercase tracking-widest mb-4">3. ZAHLUNG</h3>
                                    <div className="p-4 border border-[#8b0000] bg-[#8b0000]/10 flex items-center gap-4 text-[#8b0000]">
                                        <CreditCard size={20} />
                                        <span className="font-bold">TEST-MODUS: VORKASSE / RECHNUNG</span>
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-8 bg-[#8b0000] hover:bg-[#a00000] text-white py-4 font-bold uppercase tracking-[0.2em] transition-all">
                                    ZAHLUNGSPFLICHTIG BESTELLEN
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: SUMMARY */}
                <div className="bg-[#1a1a1a] border border-[#333] p-6 h-fit sticky top-24">
                    <h3 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-[#333] pb-2">
                        BESTELLÜBERSICHT
                    </h3>
                    <div className="space-y-4 mb-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-start text-sm">
                                <div>
                                    <span className="block text-white font-bold">{item.quantity}x {item.title}</span>
                                    <span className="text-stone-500 text-xs">Artikel-Nr: EB-{item.id}00</span>
                                </div>
                                <span className="text-stone-300 font-mono">{(parseFloat(item.price.replace(',', '.').replace(' €', '')) * item.quantity).toFixed(2).replace('.', ',')} €</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-[#333] pt-4 flex justify-between items-center text-xl text-[#8b0000] font-industrial">
                        <span>SUMME</span>
                        <span>{cartTotal.toFixed(2).replace('.', ',')} €</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
