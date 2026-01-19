import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Shop = () => {
    const products = [
        {
            id: 1,
            title: 'Shirt "Rost & Stahl"',
            price: '25,00 €',
            imageLabel: 'T-SHIRT FRONT'
        },
        {
            id: 2,
            title: 'Album "Schwerindustrie"',
            price: '15,00 €',
            imageLabel: 'CD COVER'
        },
        {
            id: 3,
            title: 'Kapuzenpullover Logo',
            price: '45,00 €',
            imageLabel: 'HOODIE VORNE'
        }
    ];

    return (
        <div className="min-h-screen relative overflow-y-auto text-[#e0e0e0] font-mono selection:bg-[#8b0000] selection:text-white">

            {/* Background Video (Persisted from previous request) */}
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
                <div className="absolute inset-0 bg-[#0d0d0d]/80"></div>
            </div>

            <div className="relative z-10 w-full">
                {/* User Provided Header Logic */}
                <header className="bg-black/90 p-5 text-center border-b-2 border-[#8b0000] backdrop-blur-sm sticky top-0 z-50">
                    <h1 className="m-0 text-[2.5rem] tracking-[5px] text-white font-industrial uppercase">EISENBUND</h1>
                    <nav className="mt-2.5 flex justify-center gap-8 text-sm font-bold uppercase">
                        <a href="https://www.eisenbund.de/" className="text-[#8b0000] hover:text-white transition-colors no-underline">
                            Zurück zur Band
                        </a>
                        <a href="#" className="text-[#8b0000] hover:text-white transition-colors no-underline">
                            Warenkorb (0)
                        </a>
                    </nav>
                </header>

                <div className="max-w-[1200px] mx-auto my-10 px-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
                        {products.map((product) => (
                            <div key={product.id} className="bg-[#1a1a1a]/90 border border-[#333] p-5 text-center transition-colors hover:border-[#8b0000] group backdrop-blur-md">
                                <div className="w-full h-[250px] bg-black flex items-center justify-center mb-5 text-[#555] border border-[#333] font-bold tracking-widest group-hover:text-[#8b0000] transition-colors">
                                    {product.imageLabel}
                                </div>
                                <h3 className="text-xl mb-2 font-bold uppercase">{product.title}</h3>
                                <span className="block text-[1.2rem] text-[#8b0000] my-2.5 font-bold">{product.price}</span>
                                <button className="inline-block bg-[#8b0000] text-white py-2.5 px-5 border-none cursor-pointer mt-2.5 hover:bg-[#a00000] transition-colors uppercase font-bold text-sm tracking-wider">
                                    In den Warenkorb
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="text-center p-10 mt-12 border-t border-[#333] text-[0.8rem] text-[#666] bg-black/80 backdrop-blur-sm">
                    &copy; 2026 Eisenbund. Alle Rechte vorbehalten. Impressum.
                </footer>
            </div>
        </div>
    );
};

export default Shop;
