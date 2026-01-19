import React, { useState } from 'react';
import { ShoppingCart, Filter, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Shop = ({ onNavigate }) => {
    const [category, setCategory] = useState('ALL');
    const { addToCart, cartCount, toggleCart } = useCart();
    const { user } = useAuth();

    const products = [
        {
            id: 1,
            title: 'HOODIE "ROST & STAHL"',
            price: '55,00 €',
            image: '/assets/shop/hoodie_rust.jpg',
            category: 'KLEIDUNG',
            desc: 'Schwerer Stoff. Industrieller Rost-Druck. Jeder Hoodie ein Unikat der Verwitterung.'
        },
        {
            id: 2,
            title: 'SHIRT "GLOBAL PROTOCOL"',
            price: '30,00 €',
            image: '/assets/shop/shirt_back.jpg',
            category: 'KLEIDUNG',
            desc: 'Rückseite bedruckt mit Server-Nodes. Frontseite: Minimalistisches Logo. 100% Baumwolle.'
        },
        {
            id: 3,
            title: 'BEANIE "MONOLITH"',
            price: '25,00 €',
            image: '/assets/shop/beanie_grey.jpg',
            category: 'ACCESSOIRES',
            desc: 'Gerippter Strick. Gesticktes EB-Emblem. Hält die Gedanken warm und fokussiert.'
        },
        {
            id: 4,
            title: 'PATCH "MACHINE ALLIANCE"',
            price: '12,00 €',
            image: '/assets/shop/patch.jpg',
            category: 'ACCESSOIRES',
            desc: 'Bestickter Aufnäher. Roboter-Motiv. Zum Aufbügeln auf Kutte oder Rucksack.'
        },
        {
            id: 5,
            title: 'TASSE "MECHANIC"',
            price: '20,00 €',
            image: '/assets/shop/mug_wrench.jpg',
            category: 'ACCESSOIRES',
            desc: 'Keramiktasse mit Griff in Schraubenschlüssel-Optik. Für das Schmieröl am Morgen.'
        },
        {
            id: 6,
            title: 'TASSE "MASCHINENMUSIK"',
            price: '18,00 €',
            image: '/assets/shop/mug_black.png',
            category: 'ACCESSOIRES',
            desc: 'Mattschwarze Tasse mit Eisenbund-Logo. Spülmaschinenfest. 300ml.'
        },
        {
            id: 7,
            title: 'KEYCHAIN "GEAR CODE"',
            price: '15,00 €',
            image: '/assets/shop/keychain_metal.jpg',
            category: 'ACCESSOIRES',
            desc: 'Massiver Edelstahlanhänger. Handgefertigt. Unverwüstlich.'
        },
        {
            id: 8,
            title: 'ALBUM "HÄRTEGRAD" (CD)',
            price: '15,00 €',
            image: '/assets/haertegrad.jpg',
            category: 'DATENTRÄGER',
            desc: 'Das Debütalbum. 12 Tracks pure industrielle Gewalt. Inklusive Booklet.'
        }
    ];

    const filteredProducts = category === 'ALL'
        ? products
        : products.filter(p => p.category === category);

    return (
        <div className="min-h-screen relative overflow-y-auto text-[#e0e0e0] font-mono selection:bg-[#8b0000] selection:text-white">

            {/* Background Video */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-40"
                >
                    <source src="/assets/shop_bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0d0d0d]/85"></div>
            </div>

            <div className="relative z-10 w-full">
                {/* Header */}
                <header className="bg-black/90 p-6 text-center border-b-2 border-[#8b0000] backdrop-blur-sm sticky top-0 z-50 shadow-2xl">
                    <h1 className="m-0 text-3xl md:text-5xl tracking-[8px] text-white font-industrial uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        ZEUGHAUS
                    </h1>
                    <nav className="mt-4 flex justify-center gap-8 text-xs md:text-sm font-bold uppercase tracking-widest">
                        <a href="https://www.eisenbund.de/" className="text-[#8b0000] hover:text-white transition-colors no-underline flex items-center gap-2">
                            &lt; BACK TO BASE
                        </a>
                        <span className="text-[#333]">|</span>

                        {/* AUTH BUTTON */}
                        <button
                            onClick={() => onNavigate(user ? 'account' : 'login')}
                            className="text-[#8b0000] hover:text-white transition-colors no-underline flex items-center gap-2"
                        >
                            <User size={14} /> {user ? 'ACCOUNT' : 'LOGIN'}
                        </button>

                        <span className="text-[#333]">|</span>
                        <button
                            onClick={toggleCart}
                            className="text-[#8b0000] hover:text-white transition-colors no-underline flex items-center gap-2"
                        >
                            WARENKORB ({cartCount})
                        </button>
                    </nav>
                </header>

                <div className="max-w-[1400px] mx-auto my-12 px-6 flex flex-col md:flex-row gap-12">

                    {/* Sidebar Categories */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-[#1a1a1a]/90 border border-[#333] p-6 backdrop-blur-md sticky top-40">
                            <h3 className="text-[#8b0000] font-bold uppercase tracking-widest mb-6 border-b border-[#333] pb-2 flex items-center gap-2">
                                <Filter size={16} /> KATEGORIEN
                            </h3>
                            <ul className="space-y-3 text-sm font-bold tracking-wider">
                                {['ALL', 'KLEIDUNG', 'ACCESSOIRES', 'DATENTRÄGER'].map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setCategory(cat)}
                                            className={`uppercase hover:text-[#8b0000] transition-colors text-left w-full ${category === cat ? 'text-[#8b0000] pl-2 border-l-2 border-[#8b0000]' : 'text-[#666]'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-[#1a1a1a]/80 border border-[#333] text-center transition-all duration-300 hover:border-[#8b0000] hover:-translate-y-1 group backdrop-blur-md flex flex-col h-full shadow-lg">
                                    <div className="w-full aspect-square bg-black flex items-center justify-center text-[#555] border-b border-[#333] relative overflow-hidden group-hover:border-[#8b0000] transition-colors">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                        />
                                        <div className="absolute top-0 right-0 bg-[#8b0000] text-white text-xs font-bold px-2 py-1">
                                            {product.category}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg mb-2 font-bold uppercase tracking-wider text-white group-hover:text-[#a00000] transition-colors">{product.title}</h3>
                                        <p className="text-xs text-[#888] mb-4 leading-relaxed font-sans">{product.desc}</p>

                                        <div className="mt-auto">
                                            <span className="block text-2xl text-[#8b0000] my-3 font-bold font-industrial tracking-widest">{product.price}</span>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full bg-[#333] text-white py-3 border border-[#8b0000] cursor-pointer hover:bg-[#8b0000] transition-all uppercase font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-2"
                                            >
                                                <ShoppingCart size={14} /> IN DEN WARENKORB
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="text-center p-12 mt-12 border-t border-[#333] text-[0.8rem] text-[#666] bg-black/90 backdrop-blur-sm tracking-widest">
                    &copy; 2026 EISENBUND LOGISTICS. <br />
                    ALLE PREISE INKL. MWST. ZZGL. VERSAND.
                </footer>
            </div>
        </div>
    );
};

export default Shop;
