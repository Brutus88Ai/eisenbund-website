import React, { useState } from 'react';
import { Activity, ExternalLink, Cpu, Facebook, Music, Video } from 'lucide-react';

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

const videoBg = '/assets/sparks.mp4';

const IDCardGenerator = () => {
    const [name, setName] = useState('');
    const [generated, setGenerated] = useState(false);
    const [idNumber, setIdNumber] = useState('');

    const generateID = (e) => {
        e.preventDefault();
        if (!name) return;
        // Generate random industrial ID
        const randomID = Math.floor(1000 + Math.random() * 9000);
        setIdNumber(`#EB-${randomID}`);
        setGenerated(true);
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 pointer-events-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40"
                >
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-stone-900/70"></div>
            </div>

            <div className="max-w-md mx-auto pt-10 px-6 pb-24 text-stone-300 relative z-10">
                <h2 className="font-industrial text-4xl text-center text-stone-200 mb-2">DEM BUND BEITRETEN</h2>
                <p className="text-center text-stone-500 text-xs mb-8 uppercase tracking-widest">Registrierung für menschliches Personal</p>

                {/* NEW: Social Media Hub inside "Der Bund" */}
                <div className="mb-12">
                    <div className="border-b border-stone-800 pb-2 mb-6 flex items-center justify-between">
                        <span className="text-stone-500 font-mono text-xs tracking-widest uppercase flex items-center gap-2">
                            <Activity size={12} className="text-orange-500" /> NETZWERK-VERBINDUNGEN
                        </span>
                        <span className="text-[10px] text-stone-600 font-bold">EXTERN</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group panel-border bg-stone-900 p-4 flex items-center justify-between hover:bg-stone-800 transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(234,88,12,0.1)]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-orange-500 group-hover:bg-black transition-colors rounded-sm border border-stone-700">
                                        {link.icon}
                                    </div>
                                    <div>
                                        <div className="font-industrial text-xl text-stone-300 group-hover:text-white leading-none">{link.label}</div>
                                        <div className="text-[10px] text-stone-600 font-mono tracking-widest group-hover:text-orange-500/70">{link.subLabel}</div>
                                    </div>
                                </div>
                                <ExternalLink size={16} className="text-stone-600 group-hover:text-orange-500 transition-colors" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="border-b border-stone-800 pb-2 mb-6">
                    <span className="text-stone-500 font-mono text-xs tracking-widest uppercase">ID-KARTEN DRUCKER</span>
                </div>

                {!generated ? (
                    <form onSubmit={generateID} className="bg-stone-900 panel-border p-8 space-y-6">
                        <div>
                            <label className="block text-orange-500 text-xs uppercase mb-2 font-bold">Bezeichnung (Name)</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black border border-stone-700 p-3 text-stone-200 focus:outline-none focus:border-orange-500 font-mono uppercase focus:ring-1 focus:ring-orange-500/50"
                                placeholder="NAME EINGEBEN"
                            />
                        </div>
                        <button type="submit" className="w-full btn-industrial py-4 text-stone-200 font-bold hover:text-orange-500 uppercase tracking-widest flex items-center justify-center gap-2 hover:border-orange-500 transition-all">
                            <Activity size={16} />
                            ID Generieren
                        </button>
                    </form>
                ) : (
                    <div className="animate-in fade-in zoom-in duration-500">
                        <div className="metal-texture panel-border p-6 relative overflow-hidden shadow-2xl">
                            {/* Card Design */}
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-stone-900">
                                <Cpu size={80} />
                            </div>

                            <div className="flex justify-between items-start border-b border-stone-600/50 pb-4 mb-4">
                                <div>
                                    <h3 className="font-industrial text-3xl text-white drop-shadow-md">WERKSAUSWEIS</h3>
                                    <span className="text-orange-500 text-xs tracking-[0.3em] font-bold">EISENBUND</span>
                                </div>
                                <div className="h-12 w-12 bg-stone-800 border border-stone-600 flex items-center justify-center shadow-inner">
                                    <div className="w-8 h-8 bg-stone-900/50"></div>
                                </div>
                            </div>

                            <div className="space-y-4 font-mono text-sm relative z-10">
                                <div>
                                    <span className="block text-stone-400 text-[10px] uppercase">Einheit / Name</span>
                                    <span className="text-white text-xl uppercase font-bold text-shadow-sm">{name}</span>
                                </div>
                                <div>
                                    <span className="block text-stone-400 text-[10px] uppercase">Arbeiternummer</span>
                                    <span className="text-orange-500 text-2xl font-bold tracking-widest drop-shadow-sm">{idNumber}</span>
                                </div>
                                <div className="flex justify-between items-end mt-6">
                                    <div className="text-[10px] text-stone-500">
                                        ZUGRIFFSEBENE: <span className="text-white font-bold">STANDARD</span>
                                    </div>
                                    <div className="w-16 h-16 border border-stone-600 p-1 bg-white">
                                        <img src="/api/placeholder/64/64" alt="QR" className="w-full h-full" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 to-orange-800"></div>
                        </div>

                        <button
                            onClick={() => setGenerated(false)}
                            className="mt-6 w-full text-xs text-stone-500 hover:text-stone-300 uppercase tracking-widest hover:underline"
                        >
                            Neuen Ausweis beantragen
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default IDCardGenerator;
