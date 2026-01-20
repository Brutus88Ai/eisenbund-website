import { Cpu, Disc, FileText, Users, ShoppingCart } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'schmiede', label: 'DIE SCHMIEDE', icon: <Cpu size={18} /> },
        { id: 'production', label: 'PRODUKTION', icon: <Disc size={18} /> },
        { id: 'manifest', label: 'MANIFEST', icon: <FileText size={18} /> },
        { id: 'bund', label: 'DER BUND', icon: <Users size={18} /> },
        { id: 'shop', label: 'MERCH SHOP', icon: <ShoppingCart size={18} /> },
    ];

    const handleTabClick = (tab) => {
        // Domain Redirect for Shop
        if (tab.id === 'shop') {
            const isProd = !window.location.hostname.includes('localhost');
            const isShopDomain = window.location.hostname.includes('eisenbund.shop');

            if (isProd && !isShopDomain) {
                window.location.href = 'https://eisenbund.shop';
                return;
            }
        }
        setActiveTab(tab.id);
    };

    return (
        <nav className="fixed bottom-0 left-0 w-full z-50 bg-stone-900 border-t-4 border-orange-900/50 md:top-0 md:bottom-auto md:border-t-0 md:border-b-4 shadow-2xl">
            <div className="flex justify-around md:justify-center md:gap-8 p-2 overflow-x-auto">
                {tabs.map((tab) => (
                    tab.isExternal ? (
                        <a
                            key={tab.id}
                            href={tab.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col md:flex-row items-center gap-2 p-3 font-industrial uppercase tracking-widest text-lg transition-colors text-stone-400 hover:text-orange-500 hover:bg-stone-800/50 min-w-fit"
                        >
                            {tab.icon}
                            <span className="text-sm md:text-xl whitespace-nowrap">{tab.label}</span>
                        </a>
                    ) : (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab)}
                            className={`flex flex-col md:flex-row items-center gap-2 p-3 font-industrial uppercase tracking-widest text-lg transition-colors min-w-fit
                  ${activeTab === tab.id
                                    ? 'text-orange-500 bg-stone-800 border border-orange-500/50 shadow-[0_0_10px_rgba(234,88,12,0.2)]'
                                    : 'text-stone-400 hover:text-stone-100'}`}
                        >
                            {tab.icon}
                            <span className="text-sm md:text-xl whitespace-nowrap">{tab.label}</span>
                        </button>
                    )
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
