import React from 'react';

// Assets from public folder
const videoBg = '/assets/schmiede.mp4';
const logoVideo = '/assets/logo_video.mp4';

const HeroForge = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden p-6 text-stone-300">
        {/* Video Background */}
        <div className="absolute inset-0 pointer-events-none">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
            >
                <source src={videoBg} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-transparent to-stone-900"></div>
        </div>

        <div className="z-10 text-center relative flex flex-col items-center">
            <div className="mb-8 inline-block border border-orange-500 bg-black/40 px-6 py-2 text-orange-300 text-sm tracking-[0.5em] flicker backdrop-blur-sm">
                SYSTEM: ONLINE
            </div>

            {/* --- LIVING LOGO SECTION (VIDEO) --- */}
            <div className="relative mb-8 transform hover:scale-105 transition-transform duration-500">
                {/* Subtle glow just to make it pop, but not darken */}
                <div className="absolute inset-0 bg-orange-600/20 blur-[50px] rounded-full animate-pulse"></div>

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-64 md:w-96 h-auto object-contain living-logo relative z-10 rounded-lg shadow-[0_0_30px_rgba(234,88,12,0.3)]"
                >
                    <source src={logoVideo} type="video/mp4" />
                </video>
            </div>

            <div className="h-1 w-64 bg-gradient-to-r from-transparent via-orange-500 to-transparent my-4 shadow-[0_0_20px_rgba(234,88,12,1)]"></div>

            <h2 className="text-3xl md:text-5xl text-white font-industrial tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)] bg-black/20 backdrop-blur-sm px-4">
                STAHL WIRD KLANG
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-4 max-w-md mx-auto text-xs text-white">
                <div className="panel-border bg-black/60 p-3 backdrop-blur-sm border-orange-900/40">
                    <span className="block text-orange-500 mb-1 font-bold">KERN-STATUS</span>
                    <span className="animate-pulse font-mono">PULSIEREND (100%)</span>
                </div>
                <div className="panel-border bg-black/60 p-3 backdrop-blur-sm border-orange-900/40">
                    <span className="block text-orange-500 mb-1 font-bold">DRUCK</span>
                    <span className="font-mono">2400 BAR</span>
                </div>
            </div>
            {/* --- SPOTIFY PLAYER --- */}
            <div className="mt-12 w-full max-w-md mx-auto panel-border bg-black/80 p-1 shadow-[0_0_30px_rgba(234,88,12,0.3)]">
                <iframe
                    style={{ borderRadius: '0px' }}
                    src="https://open.spotify.com/embed/artist/50VTmE7iaxUVHGJgyNFEv6?utm_source=generator&theme=0&autoplay=1"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>

        </div>
    </div>
);

export default HeroForge;
