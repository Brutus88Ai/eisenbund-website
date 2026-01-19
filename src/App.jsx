import React, { useState, useEffect } from 'react';
import HeroForge from './components/HeroForge';
import Production from './components/Production';
import Manifest from './components/Manifest';
import IDCardGenerator from './components/IDCardGenerator';
import Navigation from './components/Navigation';
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';
import CartSidebar from './components/CartSidebar';

const App = () => {
    const [activeTab, setActiveTab] = useState('schmiede');
    const [isPlaying, setIsPlaying] = useState(false);

    // Initial Sound (Interaction Required)
    const playSound = () => {
        if (!isPlaying) {
            const audio = new Audio('/assets/ambience.mp3');
            audio.volume = 0.3;
            // audio.play().catch(e => console.log("Auto-play blocked", e));
            setIsPlaying(true);
        }
    };

    // Domain Routing for Shop
    useEffect(() => {
        const hostname = window.location.hostname;
        if (hostname.includes('shop') || hostname.includes('store')) {
            setActiveTab('shop');
        }
    }, []);

    // Helper to switch to checkout
    const handleCheckout = () => {
        setActiveTab('checkout');
    };

    return (
        <CartProvider>
            <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-orange-500 selection:text-white" onClick={playSound}>

                {activeTab !== 'checkout' && (
                    <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                )}

                <CartSidebar onCheckout={handleCheckout} />

                <main>
                    {activeTab === 'schmiede' && <HeroForge />}
                    {activeTab === 'production' && <Production isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
                    {activeTab === 'manifest' && <Manifest />}
                    {activeTab === 'bund' && <IDCardGenerator />}
                    {activeTab === 'shop' && <Shop />}
                    {activeTab === 'checkout' && <Checkout onBack={() => setActiveTab('shop')} />}
                </main>
            </div>
        </CartProvider>
    );
};

export default App;
