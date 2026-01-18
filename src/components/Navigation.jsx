import React from 'react';
import { Cpu, Disc, FileText, Users } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'forge', label: 'DIE SCHMIEDE', icon: <Cpu size={18} /> },
        { id: 'production', label: 'PRODUKTION', icon: <Disc size={18} /> },
        { id: 'manifest', label: 'MANIFEST', icon: <FileText size={18} /> },
        { id: 'union', label: 'DER BUND', icon: <Users size={18} /> },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full z-50 bg-stone-900 border-t-4 border-orange-900/50 md:top-0 md:bottom-auto md:border-t-0 md:border-b-4 shadow-2xl">
            <div className="flex justify-around md:justify-center md:gap-8 p-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col md:flex-row items-center gap-2 p-3 font-industrial uppercase tracking-widest text-lg transition-colors
              ${activeTab === tab.id
                                ? 'text-orange-500 bg-stone-800 border border-orange-500/50 shadow-[0_0_10px_rgba(234,88,12,0.2)]'
                                : 'text-stone-400 hover:text-stone-100'}`}
                    >
                        {tab.icon}
                        <span className="text-sm md:text-xl">{tab.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
