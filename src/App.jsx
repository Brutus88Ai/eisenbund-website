import React, { useState, useEffect, Suspense, lazy } from 'react';
import HeroForge from './components/HeroForge';
import Navigation from './components/Navigation';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartSidebar from './components/CartSidebar';
import { Loader2 } from 'lucide-react';

// Lazy Load Heavy Components
const Production = lazy(() => import('./components/Production'));
const Manifest = lazy(() => import('./components/Manifest'));
const IDCardGenerator = lazy(() => import('./components/IDCardGenerator'));
const Shop = lazy(() => import('./components/Shop'));
const Checkout = lazy(() => import('./components/Checkout'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const Account = lazy(() => import('./components/auth/Account'));

const LoadingFallback = () => (
    <div className="h-screen w-full flex items-center justify-center bg-stone-950 text-[#8b0000]">
        <div className="flex flex-col items-center gap-4">
            <Loader2 size={48} className="animate-spin" />
            <span className="font-industrial tracking-[0.2em] animate-pulse">LADE SYSTEM...</span>
        </div>
    </div>
);

const App = () => {
    // Initialize state from hash or default to 'schmiede'
    const getInitialTab = () => {
        const hash = window.location.hash.replace('#', '');
        if (window.location.hostname.includes('shop') || window.location.hostname.includes('store')) {
            return 'shop';
        }
        return hash || 'schmiede';
    };

    const [activeTab, setActiveTab] = useState(getInitialTab());
    const [isPlaying, setIsPlaying] = useState(false);

    // Initial Sound
    const playSound = () => {
        if (!isPlaying) {
            const audio = new Audio('/assets/ambience.mp3');
            audio.volume = 0.3;
            setIsPlaying(true);
        }
    };

    // Sync State -> URL Hash
    useEffect(() => {
        const hash = `#${activeTab}`;
        if (window.location.hash !== hash) {
            window.history.pushState(null, '', hash);
        }
    }, [activeTab]);

    // Browser Back Button
    useEffect(() => {
        const handlePopState = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && hash !== activeTab) {
                setActiveTab(hash);
            } else if (!hash) {
                setActiveTab('schmiede');
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [activeTab]);

    const handleCheckout = () => {
        setActiveTab('checkout');
    };

    return (
        <AuthProvider>
            <CartProvider>
                <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-orange-500 selection:text-white" onClick={playSound}>

                    {['login', 'register', 'account', 'checkout'].indexOf(activeTab) === -1 && (
                        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
                    )}

                    <CartSidebar onCheckout={handleCheckout} />

                    <main>
                        <Suspense fallback={<LoadingFallback />}>
                            {activeTab === 'schmiede' && <HeroForge />}
                            {activeTab === 'production' && <Production isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
                            {activeTab === 'manifest' && <Manifest />}
                            {activeTab === 'bund' && <IDCardGenerator />}

                            {activeTab === 'shop' && <Shop onNavigate={setActiveTab} />}

                            {activeTab === 'checkout' && <Checkout onBack={() => setActiveTab('shop')} onNavigate={setActiveTab} />}

                            {activeTab === 'login' && <Login onNavigate={setActiveTab} onBack={() => setActiveTab('shop')} />}
                            {activeTab === 'register' && <Register onNavigate={setActiveTab} onBack={() => setActiveTab('login')} />}
                            {activeTab === 'account' && <Account onNavigate={setActiveTab} />}
                        </Suspense>
                    </main>
                </div>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
