import React from 'react';
import { X, Scale, FileWarning, Shield } from 'lucide-react';

const ShopLegal = ({ type, onClose }) => {
    if (!type) return null;

    const content = {
        'agb': {
            title: 'ALLGEMEINE GESCHÄFTSBEDINGUNGEN',
            icon: <Scale size={24} />,
            text: (
                <div className="space-y-4 text-stone-300 font-mono text-sm leading-relaxed">
                    <p><strong>1. Geltungsbereich</strong><br />Für die Geschäftsbeziehung zwischen Eisenbund Logistics (nachfolgend „Verkäufer“) und dem Besteller gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen.</p>

                    <p><strong>2. Vertragsschluss</strong><br />Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Bestellbuttons geben Sie eine verbindliche Bestellung ab.</p>

                    <p><strong>3. Fernabsatzrechtliche Hinweise</strong><br />Der Vertragstext wird nach dem Vertragsschluss vom Verkäufer gespeichert und dem Kunden nach Absendung der Bestellung in Textform übermittelt.</p>

                    <p><strong>4. Lieferung</strong><br />Sofern nicht anders vereinbart, erfolgt die Lieferung ab Lager an die vom Besteller angegebene Lieferadresse. Angaben über die Lieferfrist sind unverbindlich, soweit nicht ausnahmsweise der Liefertermin verbindlich zugesagt wurde.</p>

                    <p><strong>5. Eigentumsvorbehalt</strong><br />Bis zur vollständigen Begleichung aller gegen den Besteller bestehenden Ansprüche verbleibt die gelieferte Ware im Eigentum des Verkäufers.</p>
                </div>
            )
        },
        'widerruf': {
            title: 'WIDERRUFSBELEHRUNG',
            icon: <FileWarning size={24} />,
            text: (
                <div className="space-y-4 text-stone-300 font-mono text-sm leading-relaxed">
                    <p><strong>Widerrufsrecht</strong><br />Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>

                    <div className="border border-red-900 bg-red-900/10 p-4 my-4">
                        <strong className="text-red-500 uppercase tracking-widest block mb-2">WICHTIGER HINWEIS ZUM AUSSCHLUSS</strong>
                        <p>Das Widerrufsrecht besteht <strong>NICHT</strong> bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind (z.B. Print-on-Demand Produkte, personalisierte ID-Cards).</p>
                    </div>

                    <p><strong>Folgen des Widerrufs</strong><br />Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
                </div>
            )
        },
        'datenschutz': {
            title: 'DATENSCHUTZERKLÄRUNG',
            icon: <Shield size={24} />,
            text: (
                <div className="space-y-4 text-stone-300 font-mono text-sm leading-relaxed">
                    <p><strong>1. Erhebung und Speicherung</strong><br />Wir erheben, verarbeiten und nutzen Ihre Daten nur im Rahmen der gesetzlichen Bestimmungen. Diese Datenschutzerklärung gilt ausschließlich für die Nutzung der von uns angebotenen Webseiten.</p>

                    <div className="border border-[#8b0000] bg-[#8b0000]/10 p-4 my-4">
                        <strong className="text-[#8b0000] uppercase tracking-widest block mb-2">WEITERGABE AN DRITTE / DRUCKDIENSTLEISTER</strong>
                        <p>Zur Vertragserfüllung geben wir Ihre Daten (Name, Lieferadresse) an das mit der Lieferung beauftragte Versandunternehmen weiter. Zur Abwicklung von Print-on-Demand-Bestellungen (z.B. Shirts, Tassen) werden die notwendigen Auftragsdaten an unseren Druckdienstleister übermittelt. Eine weitergehende Übermittlung erfolgt nicht.</p>
                    </div>

                    <p><strong>3. Auskunftsrecht</strong><br />Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten sowie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</p>
                </div>
            )
        }
    };

    const activeContent = content[type];

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#1a1a1a] border border-[#333] w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative">

                {/* Header */}
                <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#333] p-6 flex justify-between items-center z-10">
                    <h2 className="text-xl text-white font-industrial tracking-widest flex items-center gap-3">
                        <span className="text-[#8b0000]">{activeContent.icon}</span>
                        {activeContent.title}
                    </h2>
                    <button onClick={onClose} className="text-stone-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {activeContent.text}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#333] bg-[#0d0d0d] text-center">
                    <button
                        onClick={onClose}
                        className="text-xs font-bold uppercase tracking-widest text-[#8b0000] hover:text-white transition-colors"
                    >
                        SCHLIESSEN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopLegal;
