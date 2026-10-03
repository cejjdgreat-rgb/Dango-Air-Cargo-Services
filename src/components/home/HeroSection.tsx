import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Plane, 
  ThumbsUp, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Calculator,
  ArrowUpRight
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveView, setSelectedTrackingNumber, language } = useApp();
  const [trackingInput, setTrackingInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      setSelectedTrackingNumber(trackingInput.trim().toUpperCase());
      setActiveView('tracking');
    }
  };

  const handleDemoTrack = (sampleCode: string) => {
    setSelectedTrackingNumber(sampleCode);
    setActiveView('tracking');
  };

  return (
    <section className="relative bg-purple-950 text-white overflow-hidden min-h-[620px] lg:min-h-[680px] flex items-center">
      {/* Background Hero Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_cargo_aircraft_1790954341802.jpg"
          alt="Dango Cargo commercial aircraft freight loading operations on airport tarmac at dusk"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-purple-950/85 to-indigo-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-transparent to-purple-950/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Marquee Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Corridor Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/80 border border-purple-700/60 backdrop-blur-xs text-xs font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{language === 'fr' ? 'Ligne Régulière' : 'Active Corridor'} : Lagos (LOS) ⇄ Kinshasa (FIH)</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-2xl">
              {language === 'fr' ? (
                <>FRET AÉRIEN MONDIAL. <br /><span className="text-amber-400">LIVRÉ AVEC CONFIANCE.</span></>
              ) : (
                <>GLOBAL CARGO. <br /><span className="text-amber-400">DELIVERED WITH CONFIDENCE.</span></>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-purple-100/90 leading-relaxed max-w-xl font-normal">
              {language === 'fr' 
                ? 'Solutions de fret aérien sûres, rapides et fiables reliant les entreprises et particuliers entre le Nigeria, la République Démocratique du Congo (RDC) et les marchés internationaux.'
                : 'Safe, fast and reliable air cargo and freight solutions connecting businesses and customers across Nigeria, the Democratic Republic of Congo (DRC) and beyond.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('booking')}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-extrabold text-sm rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'fr' ? 'RÉSERVER UN FRET' : 'BOOK A SHIPMENT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('quote')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>{language === 'fr' ? 'CALCULER UN DEVIS' : 'GET A QUOTE'}</span>
              </button>

              <button
                onClick={() => setActiveView('tracking')}
                className="px-4 py-3.5 text-purple-200 hover:text-white font-medium text-sm transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Suivre un envoi →' : 'Track Existing Shipment →'}
              </button>
            </div>

            {/* Quick Live Waybill Tracker Input Inside Hero */}
            <div className="pt-4 max-w-lg">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/15 shadow-2xl">
                <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-white/95 rounded-lg text-slate-800">
                    <Search className="w-4 h-4 text-purple-900 shrink-0" />
                    <input
                      type="text"
                      placeholder={language === 'fr' ? 'Ex: DCA-2026-001089' : 'Tracking Number (e.g. DCA-2026-001089)'}
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      className="w-full text-xs font-mono font-semibold uppercase bg-transparent outline-none placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 uppercase tracking-wider"
                  >
                    {language === 'fr' ? 'SUIVRE' : 'TRACK'}
                  </button>
                </form>
                <div className="flex items-center justify-between text-[11px] text-purple-200 px-2 pt-2">
                  <span>Try demo code:</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={() => handleDemoTrack('DCA-2026-001089')}
                      className="underline text-amber-300 hover:text-amber-200 font-mono"
                    >
                      DCA-2026-001089
                    </button>
                    <span>·</span>
                    <button 
                      type="button"
                      onClick={() => handleDemoTrack('DCA-2026-001092')}
                      className="underline text-amber-300 hover:text-amber-200 font-mono"
                    >
                      DCA-2026-001092
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3 Core Pillars Card Stack (Faithful to the reference artwork) (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/20 p-6 rounded-2xl shadow-2xl">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 flex items-center justify-between">
                <span>DANGO CARGO CORE PILLARS</span>
                <span className="text-purple-300">EST. 2026</span>
              </div>

              {/* 3 Iconic Cards faithful to flyer badges */}
              <div className="space-y-3">
                
                {/* 1. Cargo & Freight Solutions */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-purple-900/40 border border-purple-600/30 hover:border-amber-400/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-800 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                      CARGO & FREIGHT SOLUTIONS
                    </h2>
                    <p className="text-xs text-purple-200">
                      Air freight forwarding, heavy commercial pallets, consolidation & door dispatch.
                    </p>
                  </div>
                </div>

                {/* 2. Safe, Fast & Reliable Delivery */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-purple-900/40 border border-purple-600/30 hover:border-amber-400/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-800 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                      SAFE, FAST & RELIABLE DELIVERY
                    </h2>
                    <p className="text-xs text-purple-200">
                      High-frequency direct air cargo flights between Nigeria (LOS) & DRC (FIH).
                    </p>
                  </div>
                </div>

                {/* 3. Excellence in Every Shipment */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-purple-900/40 border border-purple-600/30 hover:border-amber-400/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-800 flex items-center justify-center shrink-0 text-amber-400 shadow-inner">
                    <ThumbsUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                      EXCELLENCE IN EVERY SHIPMENT
                    </h2>
                    <p className="text-xs text-purple-200">
                      Dedicated warehouse care, professional palletizing, and verified milestone logging.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Quote & Contact Callout from artwork */}
              <div className="mt-5 pt-4 border-t border-purple-800/60 text-xs text-purple-200 flex items-center justify-between">
                <span className="italic">“We deliver value, you receive excellence.”</span>
                <button
                  onClick={() => setActiveView('contact')}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Our Hubs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
