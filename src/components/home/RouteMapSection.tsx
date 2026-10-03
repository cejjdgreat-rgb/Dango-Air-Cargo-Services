import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plane, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const RouteMapSection: React.FC = () => {
  const { setActiveView, language, settings } = useApp();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-purple-950">
      {/* Background World Map Vector Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            <Plane className="w-4 h-4" />
            <span>{language === 'fr' ? 'CORRIDOR STRATÉGIQUE NIGERIA – RDC' : 'STRATEGIC NIGERIA – DRC AIR CORRIDOR'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {language === 'fr' 
              ? 'Liaison Directe de Fret Aérien Lagos ⇄ Kinshasa' 
              : 'Direct Air Cargo Flight Link Between Lagos & Kinshasa'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            {language === 'fr'
              ? 'Accélérez vos échanges commerciaux avec notre ligne directe de fret régulier et nos terminaux dédiés dans les deux capitales économiques.'
              : 'Empowering bilateral commerce with prioritized air freight capacity, fast-track tarmac clearance, and bonded facilities in both economic powerhouses.'}
          </p>
        </div>

        {/* Interactive Flight Route Visualization Card */}
        <div className="bg-purple-950/70 border border-purple-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Route Graphic (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-6 border border-purple-800/40 relative">
              <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-6 pb-2 border-b border-purple-900/60">
                <span>FLIGHT SECTOR: LOS-FIH</span>
                <span className="text-amber-400">NON-STOP CARGO AIRLINK</span>
              </div>

              {/* Graphic schematic with flight arc */}
              <div className="relative py-8">
                {/* SVG Route Arch */}
                <svg viewBox="0 0 500 160" className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="50%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>

                  {/* Flight Curve */}
                  <path
                    d="M 50 120 Q 250 10 450 120"
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="3.5"
                    strokeDasharray="6 4"
                  />

                  {/* Lagos Origin Beacon */}
                  <circle cx="50" cy="120" r="10" fill="#3B0764" stroke="#F59E0B" strokeWidth="3" />
                  <circle cx="50" cy="120" r="4" fill="#FFFFFF" />

                  {/* Kinshasa Destination Beacon */}
                  <circle cx="450" cy="120" r="10" fill="#1E3A8A" stroke="#F59E0B" strokeWidth="3" />
                  <circle cx="450" cy="120" r="4" fill="#FFFFFF" />

                  {/* Midflight Aircraft Marker */}
                  <g transform="translate(240, 52) rotate(6)">
                    <circle cx="10" cy="10" r="14" fill="#F59E0B" fillOpacity="0.2" className="animate-ping" />
                    <circle cx="10" cy="10" r="8" fill="#F59E0B" />
                    <path d="M10 4 L14 16 L10 14 L6 16 Z" fill="#3B0764" />
                  </g>
                </svg>

                {/* City Markers Below Graph */}
                <div className="flex items-start justify-between mt-4">
                  {/* Lagos Hub */}
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm sm:text-base">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>LAGOS (LOS)</span>
                    </div>
                    <div className="text-xs text-white font-medium">Murtala Muhammed Int'l</div>
                    <div className="text-[11px] text-slate-400 mt-1 max-w-[180px]">
                      {settings.lagosAddress}
                    </div>
                    <div className="text-[11px] font-mono text-purple-300 mt-1">
                      Tel: {settings.nigeriaOfficePhone}
                    </div>
                  </div>

                  {/* Kinshasa Hub */}
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-amber-400 font-bold text-sm sm:text-base">
                      <span>KINSHASA (FIH)</span>
                      <MapPin className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="text-xs text-white font-medium">N'Djili International</div>
                    <div className="text-[11px] text-slate-400 mt-1 max-w-[180px] ml-auto">
                      {settings.congoAddress}
                    </div>
                    <div className="text-[11px] font-mono text-purple-300 mt-1">
                      Tel: {settings.directorDrcPhones[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Corridor Highlights & Details (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-3">
                
                <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Turnaround Time</div>
                      <div className="text-xs text-slate-300">Fast-tracked scheduled flights with 24–48h airport release.</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Customs & Regulatory Escort</div>
                      <div className="text-xs text-slate-300">Assistance with bilateral commercial documentation and customs verification.</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Multi-Commodity Acceptance</div>
                      <div className="text-xs text-slate-300">Commercial merchandise, electronic units, textiles, spare parts & personal effects.</div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setActiveView('booking')}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>{language === 'fr' ? 'Expédier sur ce Vol' : 'Book Cargo on this Route'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
