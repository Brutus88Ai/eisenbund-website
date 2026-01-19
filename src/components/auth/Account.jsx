import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Package, User } from 'lucide-react';

const Account = ({ onNavigate }) => {
    const { user, logout } = useAuth();

    if (!user) {
        onNavigate('login');
        return null;
    }

    return (
        <div className="min-h-screen pt-32 px-6 flex justify-center bg-[#0d0d0d] text-stone-300 font-mono">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* SIDEBAR */}
                <div className="md:col-span-1">
                    <div className="bg-[#1a1a1a] border border-[#333] p-6 text-center">
                        <div className="w-24 h-24 bg-[#0d0d0d] border-2 border-[#8b0000] rounded-full mx-auto flex items-center justify-center mb-4">
                            <span className="text-2xl font-bold text-white uppercase">{user.name.charAt(0)}</span>
                        </div>
                        <h2 className="text-white font-bold uppercase text-lg mb-1">{user.name}</h2>
                        <p className="text-[#8b0000] text-xs tracking-widest mb-6">REKRUT LEVEL 1</p>

                        <div className="text-left space-y-2 text-xs text-stone-500 border-t border-[#333] pt-4 mb-6">
                            <p>{user.email}</p>
                            <p>{user.street}</p>
                            <p>{user.city}</p>
                        </div>

                        <button
                            onClick={() => { logout(); onNavigate('shop'); }}
                            className="w-full border border-[#333] hover:border-[#8b0000] hover:text-white py-2 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        >
                            <LogOut size={12} /> Abmelden
                        </button>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="md:col-span-2">
                    <div className="bg-[#1a1a1a]/50 p-6 border border-[#333] mb-8">
                        <h3 className="text-white font-bold uppercase tracking-widest mb-6 border-b border-[#333] pb-2 flex items-center gap-2">
                            <Package size={18} className="text-[#8b0000]" /> BESTELLHISTORIE
                        </h3>

                        {(!user.orders || user.orders.length === 0) ? (
                            <div className="text-center py-12 text-stone-600">
                                <p>KEINE AKTIVEN AUFTRÄGE.</p>
                                <button onClick={() => onNavigate('shop')} className="text-[#8b0000] underline mt-2 text-xs uppercase">
                                    Zum Zeughaus
                                </button>
                            </div>
                        ) : (
                            // Placeholder logic if we add orders later
                            <div className="space-y-4">
                                {user.orders.map(order => (
                                    <div key={order.id} className="bg-black p-4 border border-[#333] flex justify-between items-center">
                                        <span>#{order.id}</span>
                                        <span className="text-[#8b0000]">{order.total} €</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Account;
