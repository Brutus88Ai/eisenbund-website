import React from 'react';
import { ExternalLink, Facebook, Music, Video } from 'lucide-react';

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
                <h2 className="font-industrial text-4xl text-center text-stone-200 mb-2">DER BUND</h2>
                <p className="text-center text-stone-500 text-xs mb-8 uppercase tracking-widest">Offizielle Kanäle</p>

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



                {/* LEGAL SECTION */}
                <div className="mt-16 border-t border-stone-800 pt-8">
                    <details className="group">
                        <summary className="cursor-pointer list-none flex items-center justify-between text-stone-600 hover:text-orange-500 transition-colors">
                            <span className="text-xs font-mono uppercase tracking-[0.2em]">/// RECHTLICHE PROTOKOLLE (IMPRESSUM & DATENSCHUTZ)</span>
                            <span className="text-xs font-mono group-open:rotate-180 transition-transform">▼</span>
                        </summary>

                        <div className="mt-4 text-xs text-stone-500 font-mono space-y-4 p-4 border border-stone-800 bg-stone-900/50">
                            <div>
                                <h4 className="text-stone-300 font-bold mb-1">IMPRESSUM (Angaben gemäß § 5 TMG)</h4>
                                <p>
                                    Verantwortlich:<br />
                                    Gegenwind Records<br />
                                    Bahnhofstr. 249<br />
                                    66793 Saarwellingen<br />
                                    Deutschland
                                </p>
                                <p className="mt-2">
                                    Kontakt:<br />
                                    E-Mail: pascalhares@gmail.com
                                </p>
                            </div>

                            <div>
                                <h4 className="text-stone-300 font-bold mb-1">DATENSCHUTZ</h4>
                                <p>
                                    1. Datenerfassung: Wir speichern keine persönlichen Daten auf unseren Servern.
                                    Die Nutzung des ID-Generators erfolgt rein lokal in Ihrem Browser (Client-Side).
                                    Es werden keine Eingaben an eine Datenbank übertragen.
                                </p>
                                <p className="mt-2">
                                    2. Hosting: Diese Seite wird über Vercel gehostet. Vercel erhebt temporäre Server-Logs (IP-Adressen) zur Gewährleistung der Sicherheit.
                                </p>
                                <p className="mt-2">
                                    3. Externe Dienste: Eingebettete Inhalte (Spotify, Videos) können Daten an die jeweiligen Anbieter übertragen (IP-Adresse, Browser-Daten), sobald sie geladen werden.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-stone-300 font-bold mb-1">DISCLAIMER</h4>
                                <p>
                                    Dies ist ein künstlerisches Projekt. Eisenbund ist eine fiktive Entität / Band.
                                </p>
                            </div>
                        </div>
                    </details>
                </div>

            </div>
        </div>
    );
};

export default IDCardGenerator;
