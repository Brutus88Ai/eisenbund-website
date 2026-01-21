import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Package, User, MapPin, Mail, Edit2 } from 'lucide-react';

const Account = ({ onNavigate }) => {
    const { user, logout } = useAuth();

    if (!user) {
        onNavigate('login');
        return null;
    }

    const handleLogout = async () => {
        await logout();
        onNavigate('shop');
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#0d0d0d] px-4 py-12 pt-24 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* SIDEBAR - User Card */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-center shadow-2xl">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-gradient-to-br from-[#8b0000] to-[#5a0000] rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg border-2 border-white/20">
                            <span className="text-3xl font-industrial text-white uppercase tracking-wider">
                                {user.name?.charAt(0) || 'R'}
                            </span>
                        </div>

                        <h2 className="text-white font-industrial uppercase text-xl tracking-widest mb-1 drop-shadow-lg">
                            {user.name}
                        </h2>
                        <p className="text-[#8b0000] text-xs tracking-[0.3em] font-mono mb-6">
                            REKRUT LEVEL 1
                        </p>

                        {/* User Info */}
                        <div className="text-left space-y-3 border-t border-white/20 pt-4 mb-6">
                            <div className="flex items-center gap-2 text-stone-400 text-xs">
                                <Mail size={14} className="text-[#8b0000]" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-stone-400 text-xs">
                                <MapPin size={14} className="text-[#8b0000]" />
                                <span>{user.street || 'Adresse nicht hinterlegt'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-stone-400 text-xs">
                                <User size={14} className="text-[#8b0000]" />
                                <span>{user.city || 'PLZ/Stadt nicht hinterlegt'}</span>
                            </div>
                        </div>

                        {/* Provider Badge */}
                        {user.provider && (
                            <div className="mb-4 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-stone-400">
                                {user.provider === 'google.com' ? '🔵 Google Account' : '📧 Email Account'}
                            </div>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full rounded-lg border border-white/20 hover:border-[#8b0000] hover:bg-[#8b0000]/10 py-3 text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-all flex items-center justify-center gap-2 min-h-[48px]"
                        >
                            <LogOut size={14} /> Abmelden
                        </button>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="md:col-span-2 space-y-6">
                    {/* Orders */}
                    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl">
                        <h3 className="text-white font-industrial uppercase tracking-widest mb-6 border-b border-white/20 pb-3 flex items-center gap-3 text-lg">
                            <Package size={20} className="text-[#8b0000]" />
                            BESTELLHISTORIE
                        </h3>

                        {(!user.orders || user.orders.length === 0) ? (
                            <div className="text-center py-12">
                                <Package size={48} className="mx-auto mb-4 text-stone-600" />
                                <p className="text-stone-500 text-sm mb-4">Keine aktiven Aufträge vorhanden.</p>
                                <button
                                    onClick={() => onNavigate('shop')}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b0000] hover:bg-[#a00000] text-white rounded-lg text-sm uppercase tracking-widest transition-all min-h-[48px]"
                                >
                                    Zum Merch Shop
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {user.orders.map(order => (
                                    <div
                                        key={order.id}
                                        className="rounded-lg bg-black/40 border border-white/10 p-4 flex justify-between items-center hover:border-[#8b0000]/50 transition-colors"
                                    >
                                        <div>
                                            <span className="text-white font-mono">#{order.id}</span>
                                            <span className="text-stone-500 text-xs ml-3">{order.date || 'Datum unbekannt'}</span>
                                        </div>
                                        <span className="text-[#8b0000] font-bold">{order.total} €</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => onNavigate('shop')}
                                className="flex-1 min-w-[140px] py-3 px-4 rounded-lg border border-white/20 hover:border-[#8b0000] text-stone-300 hover:text-white text-xs uppercase tracking-widest transition-all min-h-[48px]"
                            >
                                🛒 Shop
                            </button>
                            <button
                                onClick={() => onNavigate('bund')}
                                className="flex-1 min-w-[140px] py-3 px-4 rounded-lg border border-white/20 hover:border-[#8b0000] text-stone-300 hover:text-white text-xs uppercase tracking-widest transition-all min-h-[48px]"
                            >
                                🪪 ID-Card
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Account;
