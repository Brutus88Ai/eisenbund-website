import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar = ({ onCheckout }) => {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar Panel */}
            <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border-l border-white/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] flex flex-col h-full animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
                    <h2 className="text-xl font-industrial text-white tracking-widest flex items-center gap-3">
                        <ShoppingCart size={20} className="text-[#8b0000]" />
                        WARENKORB
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-stone-400 hover:text-white transition-colors p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Schließen"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-stone-500 mt-10">
                            <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="font-mono mb-2">LEERLAUF IM SYSTEM.</p>
                            <p className="text-xs">Füge Ausrüstung hinzu.</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 rounded-lg bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition-colors">
                                <div className="w-20 h-20 bg-black/60 rounded-lg border border-white/10 shrink-0 overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-white font-bold text-sm uppercase tracking-wide">{item.title}</h4>
                                        <div className="text-[#8b0000] font-mono text-sm mt-1">{item.price}</div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        {/* Quantity Controls - Touch Optimized */}
                                        <div className="flex items-center gap-1 bg-black/60 rounded-lg border border-white/10 p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="text-stone-400 hover:text-white transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded hover:bg-white/10"
                                                aria-label="Menge verringern"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-white font-mono text-sm w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="text-stone-400 hover:text-white transition-colors p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded hover:bg-white/10"
                                                aria-label="Menge erhöhen"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-stone-500 hover:text-red-500 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                                            aria-label="Entfernen"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-black/60 backdrop-blur-lg">
                        <div className="flex justify-between items-center mb-6 font-industrial text-xl">
                            <span className="text-stone-400">GESAMT:</span>
                            <span className="text-[#8b0000] text-2xl">{cartTotal.toFixed(2).replace('.', ',')} €</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full rounded-lg bg-[#8b0000] hover:bg-[#a00000] text-white py-4 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all min-h-[52px] shadow-lg"
                        >
                            ZUR KASSE <ArrowRight size={18} />
                        </button>
                        <p className="text-center text-stone-500 text-[10px] mt-3 font-mono">
                            INKL. MWST. / ZZGL. VERSAND
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
