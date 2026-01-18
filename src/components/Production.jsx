import React from 'react';
import { Play, Pause, Hammer, AlertTriangle, ExternalLink } from 'lucide-react';

// Assets from public/assets
const coverImg = '/assets/sp.png';
const videoBg = '/assets/cathedral.mp4';
const comingSoonImg = '/assets/sp.png';



const Production = ({ isPlaying, setIsPlaying }) => {
    return (
        <div className="max-w-4xl mx-auto pt-10 px-6 pb-24 text-stone-300 relative overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50 fixed top-0 left-0 h-screen"
                >
                    <source src={videoBg} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-stone-900/60 fixed top-0 left-0 h-screen"></div>
            </div>

            <h2 className="font-industrial text-5xl text-stone-200 mb-8 border-l-8 border-orange-600 pl-4 drop-shadow-lg relative z-10">
                PRODUKTIONS-CHARGEN
            </h2>

            {/* --- NEW SECTION: BETON UND BLUT (COMING SOON) --- */}
            <div className="mb-16 border-2 border-orange-600 relative bg-stone-900/90 p-6 overflow-hidden group shadow-[0_0_50px_rgba(234,88,12,0.15)]">
                {/* Background stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(234,88,12,0.05)_10px,rgba(234,88,12,0.05)_20px)] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                    {/* Cover Image */}
                    <div className="w-full md:w-64 h-64 bg-black border-4 border-stone-600 flex items-center justify-center relative shadow-2xl shrink-0 group-hover:border-orange-500 transition-all duration-300">
                        <img
                            src={comingSoonImg}
                            alt="Beton und Blut Cover"
                            className="w-full h-full object-cover"
                        />

                        {/* "Coming Soon" Tape */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <div className="bg-orange-600 text-black font-bold px-8 py-2 transform -rotate-12 border-y-2 border-black shadow-[0_5px_15px_rgba(0,0,0,0.5)] tracking-widest text-xl font-industrial whitespace-nowrap">
                                COMING SOON
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="text-center md:text-left flex-1 w-full">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-orange-500 mb-4 animate-pulse">
                            <AlertTriangle size={18} />
                            <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold">Status: In der Gussform</span>
                        </div>

                        <h2 className="font-industrial text-6xl md:text-7xl text-white leading-none mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            BETON <span className="text-red-600">&</span> BLUT
                        </h2>

                        <p className="font-mono text-stone-300 text-sm md:text-base max-w-lg mb-8 mx-auto md:mx-0 leading-relaxed">
                            Die nächste Legierung wird gehärtet. Maximale Dichte. Industrielle Gewalt.<br />
                            <span className="text-orange-500 font-bold block mt-2">
                        // Bereiten Sie die Systeme vor.
                            </span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                            <button className="btn-industrial px-8 py-3 text-stone-200 hover:text-orange-500 flex items-center justify-center gap-3 uppercase tracking-widest text-sm font-bold border border-stone-600 hover:border-orange-500 transition-all bg-stone-800 hover:bg-black">
                                <Hammer size={16} />
                                Vormerken
                            </button>
                        </div>
                    </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-orange-500"></div>
            </div>


            {/* Existing Releases Display */}
            <div className="mb-12">
                <h3 className="text-stone-400 font-mono text-sm mb-6 tracking-widest uppercase border-b border-stone-800 pb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                    ARCHIV: BEREITS AUSGELIEFERT
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Release 1: HÄRTEGRAD (Neu) */}
                    <div className="group relative transform hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://open.spotify.com/intl-de/album/6o37GdO6nf17l0MRMtHuww?si=kxidmpneQamBsScu6mYv5Q" target="_blank" rel="noopener noreferrer" className="block panel-border p-1 bg-stone-800 hover:border-orange-500 transition-colors duration-300 cursor-pointer shadow-lg h-full flex flex-col">
                            <div className="relative overflow-hidden aspect-square">
                                <div className="absolute top-2 left-2 bg-black/80 text-orange-500 text-[10px] px-2 py-1 font-mono z-10 border border-orange-500/30 backdrop-blur-md">
                                    NEU: DEBÜT
                                </div>
                                <img
                                    src="/assets/haertegrad.jpg"
                                    alt="Härtegrad Album"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-3 p-2 flex-grow flex flex-col justify-end">
                                <span className="text-stone-300 text-sm font-bold block mb-1">HÄRTEGRAD</span>
                                <div className="flex justify-between items-center font-mono text-xs text-stone-400">
                                    <span className="text-orange-500 font-bold flex items-center gap-1 group-hover:underline">
                                        ▶ SPOTIFY <ExternalLink size={10} />
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Release 2: DER KLEINE MANN */}
                    <div className="group relative transform hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://open.spotify.com/intl-de/album/4Dqm0yx76lsq2W99dDQfqB?si=hduxliXtT-2pLF1TqqlNjA" target="_blank" rel="noopener noreferrer" className="block panel-border p-1 bg-stone-800 hover:border-orange-500 transition-colors duration-300 cursor-pointer shadow-lg h-full flex flex-col">
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src="https://distrokid.com/promocards/image/?albumid=36567245&template=fire"
                                    alt="Der Kleine Mann"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div className="mt-3 p-2 flex-grow flex flex-col justify-end">
                                <span className="text-stone-300 text-sm font-bold block mb-1">DER KLEINE MANN</span>
                                <div className="flex justify-between items-center font-mono text-xs text-stone-400">
                                    <span className="text-orange-500 font-bold flex items-center gap-1 group-hover:underline">
                                        ▶ SPOTIFY <ExternalLink size={10} />
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Release 3: KINDER DES BETONS */}
                    <div className="group relative transform hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://open.spotify.com/intl-de/album/1PVjR4JTZMxpj7otJ7vqVp?si=gBZGsKawToWSohk45jKijA" target="_blank" rel="noopener noreferrer" className="block panel-border p-1 bg-stone-800 hover:border-orange-500 transition-colors duration-300 cursor-pointer shadow-lg h-full flex flex-col">
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src="https://distrokid.com/promocards/image/?albumid=36708484&template=highrise"
                                    alt="Kinder des Betons"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div className="mt-3 p-2 flex-grow flex flex-col justify-end">
                                <span className="text-stone-300 text-sm font-bold block mb-1">KINDER DES BETONS</span>
                                <div className="flex justify-between items-center font-mono text-xs text-stone-400">
                                    <span className="text-orange-500 font-bold flex items-center gap-1 group-hover:underline">
                                        ▶ SPOTIFY <ExternalLink size={10} />
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Spotify Player Section */}
            <div className="mt-12">
                <h3 className="text-stone-500 font-mono text-sm mb-4 tracking-widest uppercase border-b border-stone-800 pb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 animate-pulse rounded-full"></div>
                    // PRODUKTIONS-STROM (AUDIO_OUTPUT)
                </h3>

                <div className="panel-border bg-stone-900/80 p-1 shadow-[0_0_30px_rgba(234,88,12,0.1)]">
                    <iframe
                        style={{ borderRadius: '0px' }}
                        src="https://open.spotify.com/embed/artist/50VTmE7iaxUVHGJgyNFEv6?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>


        </div>
    );
};

export default Production;
