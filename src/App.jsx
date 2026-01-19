import React, { useState, useEffect } from 'react';
import { Facebook, Music, Video } from 'lucide-react';
import Navigation from './components/Navigation';
import HeroForge from './components/HeroForge';
import Production from './components/Production';
import Manifest from './components/Manifest';
import IDCardGenerator from './components/IDCardGenerator';
import Shop from './components/Shop';

const socialLinks = [
    {
        id: 'facebook',
        label: 'PROFIL-DATENBANK',
        subLabel: 'FACEBOOK',
        url: 'https://www.facebook.com/profile.php?id=61585323460566',
        icon: <Facebook size={20} />
    },
    {
        id: 'spotify',
        label: 'AUDIO-STROM',
        subLabel: 'SPOTIFY ARTIST',
        url: 'https://open.spotify.com/intl-de/artist/50VTmE7iaxUVHGJgyNFEv6?si=ldn9NvbcQdiCyWcLq0VcqA',
        icon: <Music size={20} />
    },
    {
        id: 'tiktok',
        label: 'VISUELLE FREQUENZ',
        subLabel: 'TIKTOK',
        url: 'https://www.tiktok.com/@eisenbund',
        icon: <Video size={20} />
    }
];

const App = () => {
    const [activeTab, setActiveTab] = useState('forge');
    const [isPlaying, setIsPlaying] = useState(null);

    // Domain Routing: If coming from eisenbund.shop, go to Shop
    useEffect(() => {
        if (window.location.hostname.includes('shop')) {
            setActiveTab('shop');
        }
    }, []);

    // Main container vibe logic
    const containerClass = isPlaying
        ? "min-h-screen bg-stone-950 text-stone-200 font-mono selection:bg-orange-900 bass-vibrate"
        : "min-h-screen bg-stone-950 text-stone-200 font-mono selection:bg-orange-900";

    // Simulate looping mechanical sound/vibes via CSS animation state
    useEffect(() => {
        if (isPlaying) {
            // Logic for track changes or continuous animations could go here
        }
    }, [isPlaying]);

    return (
        <div className={containerClass}>

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-50 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>

            {/* Top Header / Status Bar */}
            <header className="border-b border-stone-800 bg-stone-950/95 p-4 sticky top-0 z-40 backdrop-blur-sm flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-orange-500 animate-ping' : 'bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.8)]'}`}></div>
                    <span className="text-xs text-stone-400 tracking-widest font-bold">NETZWERK: <span className={isPlaying ? "text-orange-500" : "text-green-600"}>{isPlaying ? "LASTBETRIEB" : "STABIL"}</span></span>
                </div>
                <div className="font-industrial text-xl text-stone-400 tracking-widest">
                    EB<span className="text-orange-600">-</span>2026
                </div>
            </header>

            {/* Main Content Area */}
            <main className="pb-20 md:pb-0 md:pt-4">
                {activeTab === 'forge' && <HeroForge />}
                {activeTab === 'production' && <Production isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
                {activeTab === 'manifest' && <Manifest />}
                {activeTab === 'union' && <IDCardGenerator />}
                {activeTab === 'shop' && <Shop />}
            </main>

            {/* Navigation */}
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Footer / Industrial markings */}
            <footer className="hidden md:flex fixed bottom-4 w-full px-6 justify-between items-end pointer-events-none z-30">
                {/* LEFT: Social Mini-Links */}
                <div className="pointer-events-auto flex gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-600 hover:text-orange-500 transition-colors bg-black/50 p-2 rounded-full border border-stone-800 hover:border-orange-500/50"
                            title={link.subLabel}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* RIGHT: Industrial Info */}
                <div className="text-right opacity-50">
                    <div className="text-[10px] text-stone-600 font-mono leading-tight">
                        INDUSTRIE-STANDARD ISO-9001<br />
                        SCHMIEDE-SEKTOR 7G
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
