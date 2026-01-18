import React from 'react';
import { Play, Pause, Hammer, AlertTriangle, ExternalLink } from 'lucide-react';

// Cover als Platzhalter
const coverImg = 'https://via.placeholder.com/400x400/1c1917/ea580c?text=BETON+%26+BLUT';

const tracks = [
    { id: 1, title: "HOCHOFEN (INIT)", hardness: "4.5", duration: "03:42" },
    { id: 2, title: "KALTSCHMIEDE", hardness: "6.8", duration: "04:12" },
    { id: 3, title: "HYDRAULIK II", hardness: "8.9", duration: "03:15" },
    { id: 4, title: "NULLPUNKT", hardness: "10.0", duration: "05:01" },
];

const Production = ({ isPlaying, setIsPlaying }) => {
    return (
        <div className="max-w-4xl mx-auto pt-10 px-6 pb-24 text-stone-300">
            <h2 className="font-industrial text-5xl text-stone-200 mb-8 border-l-8 border-orange-600 pl-4 drop-shadow-lg">
                PRODUKTIONS-CHARGEN
            </h2>

            {/* --- NEW SECTION: BETON UND BLUT (COMING SOON) --- */}
            <div className="mb-16 border-2 border-orange-600 relative bg-stone-900/90 p-6 overflow-hidden group shadow-[0_0_50px_rgba(234,88,12,0.15)]">
                {/* Background stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(234,88,12,0.05)_10px,rgba(234,88,12,0.05)_20px)] pointer-events-none"></div>

                <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                    {/* Cover Image - ORIGINAL FULL COLOR */}
                    <div className="w-full md:w-64 h-64 bg-black border-4 border-stone-600 flex items-center justify-center relative shadow-2xl shrink-0 group-hover:border-orange-500 transition-all duration-300">
                        <img
                            src={coverImg}
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


            {/* Existing Releases Display - FULL COLOR NO FILTERS */}
            <div className="mb-12">
                <h3 className="text-stone-400 font-mono text-sm mb-6 tracking-widest uppercase border-b border-stone-800 pb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                    ARCHIV: BEREITS AUSGELIEFERT
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Release 1 */}
                    <div className="group relative transform hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://distrokid.com/promocards/image/?albumid=36567245&template=fire" target="_blank" rel="noopener noreferrer" className="block panel-border p-1 bg-stone-800 hover:border-orange-500 transition-colors duration-300 cursor-pointer shadow-lg">
                            <div className="relative overflow-hidden">
                                <div className="absolute top-2 left-2 bg-black/80 text-orange-500 text-[10px] px-2 py-1 font-mono z-10 border border-orange-500/30 backdrop-blur-md">
                                    CHARGE #36567245
                                </div>
                                {/* NO OVERLAYS OR FILTERS */}
                                <img
                                    src="https://distrokid.com/promocards/image/?albumid=36567245&template=fire"
                                    alt="Release 1"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </a>
                        <div className="mt-2 flex justify-between items-center font-mono text-xs text-stone-400">
                            <span className="text-stone-300">PROTOKOLL: FIRE_TEMPLATE</span>
                            <a href="https://distrokid.com/promocards/image/?albumid=36567245&template=fire" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold group-hover:underline cursor-pointer flex items-center gap-1">
                                ▶ DATEN LADEN <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>

                    {/* Release 2 */}
                    <div className="group relative transform hover:scale-[1.02] transition-transform duration-300">
                        <a href="https://distrokid.com/promocards/image/?albumid=36708484&template=highrise" target="_blank" rel="noopener noreferrer" className="block panel-border p-1 bg-stone-800 hover:border-orange-500 transition-colors duration-300 cursor-pointer shadow-lg">
                            <div className="relative overflow-hidden">
                                <div className="absolute top-2 left-2 bg-black/80 text-orange-500 text-[10px] px-2 py-1 font-mono z-10 border border-orange-500/30 backdrop-blur-md">
                                    CHARGE #36708484
                                </div>
                                {/* NO OVERLAYS OR FILTERS */}
                                <img
                                    src="https://distrokid.com/promocards/image/?albumid=36708484&template=highrise"
                                    alt="Release 2"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </a>
                        <div className="mt-2 flex justify-between items-center font-mono text-xs text-stone-400">
                            <span className="text-stone-300">PROTOKOLL: HIGHRISE</span>
                            <a href="https://distrokid.com/promocards/image/?albumid=36708484&template=highrise" target="_blank" rel="noopener noreferrer" className="text-orange-500 font-bold group-hover:underline cursor-pointer flex items-center gap-1">
                                ▶ DATEN LADEN <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-stone-500 font-mono text-sm mb-4 tracking-widest uppercase border-b border-stone-800 pb-2 mt-12">
        // INTERNE PROTOTYPEN (IN ARBEIT)
            </h3>

            <div className="space-y-4">
                {tracks.map((track) => (
                    <div key={track.id} className={`panel-border bg-stone-800/80 p-4 flex flex-col md:flex-row items-center justify-between group hover:bg-stone-800 transition-colors ${isPlaying === track.id ? 'border-orange-500 bg-stone-800' : ''}`}>

                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="font-industrial text-4xl text-stone-600 font-bold opacity-30">
                                0{track.id}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-stone-200 tracking-wider group-hover:text-white transition-colors">{track.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-stone-500 uppercase">Härtegrad:</span>
                                    <div className="h-2 w-24 bg-stone-900 rounded-full overflow-hidden border border-stone-700">
                                        <div
                                            className="h-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                                            style={{ width: `${parseFloat(track.hardness) * 10}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-orange-500 font-bold">{track.hardness}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-end">
                            <span className="font-mono text-stone-500 text-sm">{track.duration}</span>
                            <button
                                onClick={() => setIsPlaying(isPlaying === track.id ? null : track.id)}
                                className={`h-12 w-12 flex items-center justify-center btn-industrial rounded-sm ${isPlaying === track.id ? 'border-orange-500 text-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.4)]' : 'text-stone-300 hover:text-white hover:border-stone-400'}`}
                            >
                                {isPlaying === track.id ? <Pause size={20} className="flicker" /> : <Play size={20} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visualizer Simulation */}
            <div className="mt-12 panel-border bg-black p-4 h-32 flex items-end justify-between gap-1 opacity-90 shadow-inner">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="w-full bg-orange-600 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                        style={{
                            height: isPlaying ? `${Math.random() * 100}%` : '5%',
                            opacity: isPlaying ? 1 : 0.3
                        }}
                    ></div>
                ))}
            </div>
            <div className="text-right text-xs text-orange-500 mt-2 font-mono">AUDIO OUTPUT MONITORING // ACTIVE</div>
        </div>
    );
};

export default Production;
