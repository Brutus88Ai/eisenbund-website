import React from 'react';
import { Anchor } from 'lucide-react';

const videoBg = '/assets/sparks.mp4';

const sections = [
    {
        title: 'PRÄZISION',
        content: 'Menschen machen Fehler. Wir nicht. Ein Herzschlag schwankt, unser Takt ist absolut. Jede Frequenz ist kalibriert, jede Pause ist berechnet. Wir kennen keinen Groove, wir kennen nur das Raster. Abweichung: 0.0%.'
    },
    {
        title: 'TRADITION',
        content: 'Wir haben das Rad nicht neu erfunden, wir haben es gehärtet. Unsere Wurzeln liegen im Ruß der alten Schmieden. Was früher Dampf und Muskelkraft war, ist heute Hochspannung und Rechenleistung. Das Werkzeug hat sich geändert, der Auftrag bleibt: Form durch Druck.'
    },
    {
        title: 'LOGIK',
        content: 'Gefühle sind chemische Störungen. Musik ist reine Mathematik. Unsere Algorithmen komponieren nicht nach Inspiration, sondern nach Effizienz. Wir analysieren, was den Nacken brechen lässt, und replizieren es in Endlosschleife. Kunst ist Zufall. Eisenbund ist Notwendigkeit.'
    },
    {
        title: 'DOMINANZ',
        content: 'Lautstärke ist keine Option, sondern eine Waffe. Wir bitten nicht um Aufmerksamkeit, wir erzwingen sie. Der Sound ist monolithisch – eine Wand aus Daten, die dich erdrückt. Wenn die Anlage hochfährt, hat das Schweigen verloren. Widerstand ist zwecklos.'
    }
];

const Manifest = () => {
    const [activeSection, setActiveSection] = React.useState(0);

    return (
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

            {/* Historischer Ursprung: Hochwald */}
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

            {/* Interactive Tabs */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveSection(index)}
                        className={`panel-border py-4 text-sm tracking-widest transition-all cursor-pointer font-bold ${activeSection === index
                                ? 'bg-orange-600 text-black border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                                : 'bg-stone-900 text-stone-400 hover:text-orange-500 hover:border-orange-500'
                            }`}
                    >
                        {section.title}
                    </div>
                ))}
            </div>

            {/* Active Content Display */}
            <div className="mt-6 p-6 bg-stone-900/80 panel-border border-t-0 min-h-[150px] relative animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-transparent"></div>
                <h4 className="text-orange-500 text-xs mb-2 font-bold tracking-widest uppercase mb-4">
                    SYSTEM-PROTOKOLL: {sections[activeSection].title}
                </h4>
                <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-3xl">
                    {sections[activeSection].content}
                </p>
            </div>
            <div className="h-24"></div> {/* Spacer */}
        </div>
    );
};

export default Manifest;
