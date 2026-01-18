import React from 'react';
import { Anchor } from 'lucide-react';

const videoBg = '/assets/sparks.mp4';

const Manifest = () => (
    <div className="min-h-screen relative overflow-hidden bg-stone-950 font-mono text-stone-300 selection:bg-orange-900">
        {/* Background Video */}
        <div className="absolute inset-0 pointer-events-none">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-50"
            >
                <source src={videoBg} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-stone-900/60"></div>
        </div>

        <div className="border-t border-b border-stone-700 py-12 relative bg-stone-900/30">
            <div className="absolute top-0 left-0 bg-orange-600 text-black text-xs font-bold px-2 py-1">PROTOKOLL 0.1</div>

            <p className="font-industrial text-4xl md:text-6xl text-stone-100 leading-tight mb-8 uppercase drop-shadow-lg">
                Fleisch ist schwach. <br />
                <span className="text-stone-500">Code ist ewig.</span>
            </p>

            <div className="space-y-6 text-lg md:text-xl text-stone-300 font-mono leading-relaxed">
                <p>
                    Wir sind keine Band. Wir sind eine Anlage. Eisenbund ist das System, das den Sound hämmert.
                </p>
                <p>
                    In einer Welt aus Rauschen schmieden wir die Frequenz. Keine Fehler. Keine Ermüdung. Nur berechnete Härte.
                </p>
                <p className="text-orange-500 font-bold border-l-4 border-orange-500 pl-4">
                    NUR EISEN.
                </p>
            </div>
        </div>

        {/* NEW SECTION: Historical Connection */}
        <div className="mt-16 border-l-2 border-stone-800 pl-6 ml-2 md:ml-0 text-left relative overflow-hidden">
            <div className="absolute -right-10 top-0 text-[8rem] text-stone-900 font-industrial opacity-50 pointer-events-none select-none">1500</div>

            <div className="flex items-center gap-2 mb-4 text-orange-600 font-mono text-xs tracking-widest uppercase font-bold">
                <Anchor size={12} />
                <span>Historischer Ursprung: Hochwald</span>
                <div className="h-px w-12 bg-orange-900"></div>
            </div>

            <h3 className="font-industrial text-3xl text-stone-200 mb-4 uppercase tracking-wide">
                Die Alte Hammerschmiede
            </h3>

            <p className="text-stone-400 font-mono leading-relaxed text-sm md:text-base max-w-xl">
                Unsere Algorithmen sind das Echo uralter Schläge. Der Eisenbund wurde nicht programmiert, er wurde geweckt.
                Tief im Hochwald, Anno 1500, schlug der erste wassergetriebene Hammer auf glühenden Stahl.
            </p>
            <p className="text-stone-400 font-mono leading-relaxed text-sm md:text-base max-w-xl mt-4">
                Dieser Rhythmus – schwer, unaufhaltsam, analog – war der erste Code.
                Wir haben das Feuer nicht entzündet, wir haben es nur digitalisiert.
                Was damals Dampf und Wasserkraft war, ist heute purer Strom.
                <br />
                <span className="text-stone-200 block mt-4 border-b border-orange-900/30 pb-1 inline-block font-bold">
                // Die Tradition bleibt: Form durch Druck.
                </span>
            </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['PRÄZISION', 'TRADITION', 'LOGIK', 'DOMINANZ'].map((word) => (
                <div key={word} className="panel-border py-4 text-stone-400 text-sm tracking-widest bg-stone-900 hover:text-orange-500 hover:border-orange-500 transition-colors cursor-default">
                    {word}
                </div>
            ))}
        </div>
    </div>
);

export default Manifest;
