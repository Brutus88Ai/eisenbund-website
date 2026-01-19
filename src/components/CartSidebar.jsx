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
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Sidebar Panel */}
            <div className="relative w-full max-w-md bg-[#0d0d0d] border-l-2 border-[#8b0000] shadow-[-10px_0_30px_rgba(139,0,0,0.2)] flex flex-col h-full animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-[#333] flex items-center justify-between bg-black/50">
                    <h2 className="text-xl font-industrial text-white tracking-widest flex items-center gap-3">
                        <ShoppingCart size={20} className="text-[#8b0000]" />
                        WARENKORB
                    </h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-[#666] hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-[#555] mt-10 font-mono">
                            <p className="mb-4">LEERLAUF IM SYSTEM.</p>
                            <p className="text-xs">FÜGE AUSRÜSTUNG HINZU.</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 bg-[#1a1a1a] p-3 border border-[#333]">
                                <div className="w-20 h-20 bg-black border border-[#333] shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-white font-bold text-sm uppercase tracking-wide">{item.title}</h4>
                                        <div className="text-[#8b0000] font-mono text-sm mt-1">{item.price}</div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-black border border-[#333] px-2 py-1">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="text-[#666] hover:text-white"><Minus size={12} /></button>
                                            <span className="text-stone-300 font-mono text-xs w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="text-[#666] hover:text-white"><Plus size={12} /></button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-[#666] hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-[#333] bg-black/80 backdrop-blur-md">
                        <div className="flex justify-between items-center mb-6 font-industrial text-xl">
                            <span className="text-stone-400">GESAMT:</span>
                            <span className="text-[#8b0000]">{cartTotal.toFixed(2).replace('.', ',')} €</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full bg-[#8b0000] hover:bg-[#a00000] text-white py-4 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all"
                        >
                            ZUR KASSE <ArrowRight size={18} />
                        </button>
                        <p className="text-center text-[#444] text-[10px] mt-3 font-mono">
                            INKL. MWST. / ZZGL. VERSAND
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
