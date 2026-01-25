import { Cpu, Disc, FileText, Users, ShoppingCart } from 'lucide-react';

// Domain Configuration
const DOMAINS = {
    main: 'https://eisenbund.de',
    shop: 'https://eisenbund.shop'
};

// Tabs that belong to the MAIN domain (eisenbund.de)
const MAIN_DOMAIN_TABS = ['schmiede', 'production', 'manifest', 'bund'];

// Tabs that belong to the SHOP domain (eisenbund.shop)
const SHOP_DOMAIN_TABS = ['shop', 'checkout', 'login', 'register', 'account'];

const Navigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'schmiede', label: 'DIE SCHMIEDE', icon: <Cpu size={18} /> },
        { id: 'production', label: 'PRODUKTION', icon: <Disc size={18} /> },
        { id: 'manifest', label: 'MANIFEST', icon: <FileText size={18} /> },
        { id: 'bund', label: 'DER BUND', icon: <Users size={18} /> },
        { id: 'shop', label: 'MERCH SHOP', icon: <ShoppingCart size={18} /> },
    ];

    const handleTabClick = (tab) => {
        const hostname = window.location.hostname;
        const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
        const isShopDomain = hostname.includes('eisenbund.shop');
        const isMainDomain = hostname.includes('eisenbund.de');

        // Skip domain logic in development
        if (isLocalhost) {
            setActiveTab(tab.id);
            return;
        }

        const targetIsMainTab = MAIN_DOMAIN_TABS.includes(tab.id);
        const targetIsShopTab = SHOP_DOMAIN_TABS.includes(tab.id);

        // CASE 1: On SHOP domain, clicking a MAIN tab → Redirect to eisenbund.de
        if (isShopDomain && targetIsMainTab) {
            window.location.href = `${DOMAINS.main}#${tab.id}`;
            return;
        }

        // CASE 2: On MAIN domain, clicking a SHOP tab → Redirect to eisenbund.shop
        if (isMainDomain && targetIsShopTab) {
            window.location.href = DOMAINS.shop;
            return;
        }

        // CASE 3: Same domain navigation → Just update state
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
