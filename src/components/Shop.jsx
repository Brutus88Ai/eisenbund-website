import React from 'react';
import { ShoppingCart, Hammer } from 'lucide-react';

const Shop = () => {
    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
            {/* Background Video */}
            <div className="absolute inset-0 pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-50"
                >
                    <source src="/assets/shop_bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-stone-900/60"></div>
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-stone-800 rounded-full flex items-center justify-center border-4 border-stone-700 shadow-[0_0_30px_rgba(234,88,12,0.2)]">
                        <ShoppingCart size={40} className="text-orange-500" />
                    </div>
                </div>

                <h2 className="font-industrial text-5xl md:text-7xl text-stone-200 mb-4 tracking-widest">ZEUGHAUS</h2>

                <div className="flex items-center justify-center gap-4 text-orange-500 mb-12 font-mono text-sm tracking-[0.3em]">
                    <span className="block w-12 h-[1px] bg-orange-900"></span>
                    <span>ZUGRIFF VERWEIGERT</span>
                    <span className="block w-12 h-[1px] bg-orange-900"></span>
                </div>

                {/* GRAPHIC PLACEHOLDER */}
                <div className="border-2 border-dashed border-stone-700 rounded-lg p-12 bg-black/30 backdrop-blur-sm mb-8">
                    <Hammer className="mx-auto text-stone-600 mb-4 animate-pulse" size={48} />
                    <p className="text-stone-400 font-mono uppercase tracking-widest">
                        AUSRÜSTUNG WIRD GESCHMIEDET.<br />
                        WARTEN AUF FREIGABE.
                    </p>
                </div>

                <p className="text-stone-600 text-xs font-mono">
                    ERROR: 404_SHOP_MODULE_NOT_FOUND
                </p>
            </div>
        </div>
    );
};

export default Shop;
