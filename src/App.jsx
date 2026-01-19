import React, { useState, useEffect } from 'react';
import HeroForge from './components/HeroForge';
import Production from './components/Production';
import Manifest from './components/Manifest';
import IDCardGenerator from './components/IDCardGenerator';
import Navigation from './components/Navigation';
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Account from './components/auth/Account';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
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
        <AuthProvider>
            <CartProvider>
                <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-orange-500 selection:text-white" onClick={playSound}>

                    {/* Hide Main Navigation on Auth/Checkout Pages to keep focus */}
                    {['login', 'register', 'account', 'checkout'].indexOf(activeTab) === -1 && (
                        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}

                    <CartSidebar onCheckout={handleCheckout} />

                    <main>
                        {activeTab === 'schmiede' && <HeroForge />}
                        {activeTab === 'production' && <Production isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
                        {activeTab === 'manifest' && <Manifest />}
                        {activeTab === 'bund' && <IDCardGenerator />}

                        {activeTab === 'shop' && <Shop onNavigate={setActiveTab} />}

                        {activeTab === 'checkout' && <Checkout onBack={() => setActiveTab('shop')} onNavigate={setActiveTab} />}

                        {activeTab === 'login' && <Login onNavigate={setActiveTab} onBack={() => setActiveTab('shop')} />}
                        {activeTab === 'register' && <Register onNavigate={setActiveTab} onBack={() => setActiveTab('login')} />}
                        {activeTab === 'account' && <Account onNavigate={setActiveTab} />}
                    </main>
                </div>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
