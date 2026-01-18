import React from 'react';

// Logo als externe URL oder Platzhalter
const logoImg = 'https://via.placeholder.com/400x400/1c1917/ea580c?text=EISENBUND';

const HeroForge = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden p-6 text-stone-300">
        {/* Dark Industrial Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-black">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-metal.png')]"></div>
        </div>

        <div className="z-10 text-center relative flex flex-col items-center">
            <div className="mb-8 inline-block border border-orange-500 bg-black/40 px-6 py-2 text-orange-300 text-sm tracking-[0.5em] flicker backdrop-blur-sm">
                SYSTEM: ONLINE
            </div>

            {/* --- LIVING LOGO SECTION --- */}
            <div className="relative mb-8 transform hover:scale-105 transition-transform duration-500">
                {/* Subtle glow just to make it pop, but not darken */}
                <div className="absolute inset-0 bg-orange-600/20 blur-[50px] rounded-full animate-pulse"></div>

                <img
                    src={logoImg}
                    alt="EISENBUND LOGO"
                    className="w-64 md:w-96 h-auto object-contain living-logo relative z-10"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            <div className="h-1 w-64 bg-gradient-to-r from-transparent via-orange-500 to-transparent my-4 shadow-[0_0_20px_rgba(234,88,12,1)]"></div>

            <h2 className="text-3xl md:text-5xl text-white font-industrial tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)] bg-black/20 backdrop-blur-sm px-4">
                STAHL WIRD KLANG
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-4 max-w-md mx-auto text-xs text-white">
                <div className="panel-border bg-black/60 p-3 backdrop-blur-sm border-orange-900/40">
                    <span className="block text-orange-500 mb-1 font-bold">KERN-STATUS</span>
                    <span className="animate-pulse font-mono">PULSIEREND (100%)</span>
                </div>
                <div className="panel-border bg-black/60 p-3 backdrop-blur-sm border-orange-900/40">
                    <span className="block text-orange-500 mb-1 font-bold">DRUCK</span>
                    <span className="font-mono">2400 BAR</span>
                </div>
            </div>
        </div>
    </div>
);

export default HeroForge;
