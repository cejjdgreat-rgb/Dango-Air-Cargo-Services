import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Plane, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const DestinationsView: React.FC = () => {
  const { settings, setActiveView, language } = useApp();

  const hubs = [
    {
      country: 'Nigeria',
      city: 'Lagos',
      airport: "Murtala Muhammed International Airport (LOS)",
      terminalName: "Dango Cargo Operations Hub - Trade Fair / Airport Terminal",
      address: settings.lagosAddress,
      phones: [settings.nigeriaOfficePhone, `OSSY: ${settings.ossyPhone}`, `EMEKA: ${settings.emekaPhone}`],
      transitTime: "Direct flight (approx. 24–48h release)",
      frequency: "3x Weekly Cargo Flights",
      specialties: ["Commercial Electronics", "Textiles", "Machinery", "Door Delivery Across Lagos"],
      badge: "Primary Nigerian Gateway"
    },
    {
      country: 'Democratic Republic of Congo (DRC)',
      city: 'Kinshasa',
      airport: "N'Djili International Airport (FIH)",
      terminalName: "Dango Cargo Central DRC Office - Barumbu / N'Djili Cargo Shed",
      address: settings.congoAddress,
      phones: settings.directorDrcPhones.map(p => `Director Desk: ${p}`),
      transitTime: "Direct flight reception & customs verification",
      frequency: "Scheduled Regular Corridor Flights",
      specialties: ["Import Brokerage", "Wholesale Distribution", "Secure Warehouse Staging", "Door-to-Door Delivery"],
      badge: "Primary DRC Gateway"
    },
    {
      country: 'Democratic Republic of Congo (DRC)',
      city: 'Lubumbashi',
      airport: "Luano International Airport (FBM)",
      terminalName: "Haut-Katanga Regional Transit Cargo Connection",
      address: "Luano Airport Freight Terminal, Lubumbashi, DRC",
      phones: settings.directorDrcPhones.slice(0, 1),
      transitTime: "Direct / Connecting Freight Service",
      frequency: "Weekly Regional Feeders",
      specialties: ["Industrial Equipment", "Mining Hardware", "Commercial Parcels"],
      badge: "Southern DRC Transit"
    },
    {
      country: 'Nigeria',
      city: 'Abuja',
      airport: "Nnamdi Azikiwe International Airport (ABV)",
      terminalName: "Federal Capital Territory Cargo Link",
      address: "Air Freight Forwarding Area, Abuja, Nigeria",
      phones: [settings.nigeriaOfficePhone],
      transitTime: "Domestic transfer to Lagos central international flight",
      frequency: "Daily Feeder Transfers",
      specialties: ["Diplomatic Documents", "Express Consignments", "Commercial Samples"],
      badge: "FCT Feeder Station"
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            <Plane className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'RÉSEAU DE DESTINATIONS' : 'AIR ROUTE DESTINATIONS & TERMINALS'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Nos Terminaux & Lignes Directes' : 'Operational Hubs & Freight Corridors'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Strategic aviation presence anchored in Lagos (Nigeria) and Kinshasa (DRC), providing end-to-end air freight connectivity.
          </p>
        </div>

        {/* Hub Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {hubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:border-purple-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-950 px-2.5 py-1 rounded-md">
                    {hub.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {hub.city.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {hub.city}, {hub.country}
                </h2>
                <div className="text-xs text-purple-900 font-semibold mt-0.5">
                  {hub.airport}
                </div>

                <div className="mt-5 space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-purple-900 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">{hub.terminalName}</strong>
                      <span>{hub.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 block">Verified Station Contacts:</strong>
                      {hub.phones.map((p, pIdx) => (
                        <div key={pIdx} className="font-mono text-slate-700">{p}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">Flight Frequency: </span>
                      <span>{hub.frequency}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-bold uppercase text-slate-700 mb-2">Accepted Cargo Types:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.specialties.map((sp, sIdx) => (
                      <span key={sIdx} className="text-[11px] px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveView('quote');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-purple-950 hover:underline"
                >
                  Calculate Rate to {hub.city}
                </button>
                <button
                  onClick={() => {
                    setActiveView('booking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <span>Book Consignment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Connection Notice */}
        <div className="bg-purple-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">Need Shipping to Other International Destinations?</h3>
            <p className="text-xs text-purple-200">
              In addition to our core Nigeria ⇄ DRC direct corridor, Dango Cargo arranges scheduled interline cargo transfers.
            </p>
          </div>
          <button
            onClick={() => setActiveView('contact')}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shrink-0"
          >
            Inquire With Cargo Desk
          </button>
        </div>

      </div>
    </div>
  );
};
