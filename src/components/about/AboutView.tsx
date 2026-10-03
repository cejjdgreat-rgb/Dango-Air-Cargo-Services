import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Plane, ThumbsUp, Truck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setActiveView, language, settings } = useApp();

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            <Plane className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'À PROPOS DE NOTRE COMPAGNIE' : 'ABOUT DANGO CARGO AIR SERVICES'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Safe, Fast & Reliable Air Freight Solutions
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Connecting Nigerian commerce, the Democratic Republic of Congo, and international trade routes with uncompromised security, dedicated cargo space, and operational transparency.
          </p>
        </div>

        {/* Feature Split Image + Text Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[460px]">
              <img
                src="/src/assets/images/air_cargo_fleet_sky_1790954375635.jpg"
                alt="Dango Cargo commercial air cargo operations above flight routes"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                    OFFICIAL BRAND MOTTO
                  </div>
                  <div className="text-lg font-bold">
                    “We deliver value, you receive excellence.”
                  </div>
                </div>
              </div>
            </div>

            {/* Content (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6 flex flex-col justify-center">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-purple-900">WHO WE ARE & WHAT WE DO</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Excellence in Every Shipment
                </h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>DANGO CARGO AIR SERVICES</strong> is a dedicated international cargo, freight forwarding, and shipping enterprise built to bridge the operational gap between West and Central Africa. With established operational terminals in Lagos (Nigeria) and Kinshasa (Democratic Republic of Congo), we streamline commercial logistics, import/export clearance, and expedited cargo transit.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Air Connectivity</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Scheduled cargo corridors directly between Lagos Murtala Muhammed (LOS) and Kinshasa N'Djili (FIH).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Commercial & Personal Freight</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Tailored solutions for wholesale merchants, industrial suppliers, electronics dealers, and private senders.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setActiveView('booking')}
                  className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Book Consignment Now</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
                <button
                  onClick={() => setActiveView('contact')}
                  className="px-4 py-3 text-slate-700 hover:text-purple-950 text-xs font-bold"
                >
                  Visit Our Offices →
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mission, Vision & Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-950 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To provide African businesses and international traders with dependable, high-speed, and secure air freight solutions that foster regional prosperity and cross-border commercial growth.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-950 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To stand as the most trusted and efficient bilateral air cargo corridor between Nigeria, the Democratic Republic of Congo, and wider continental trade networks.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-950 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Service Commitment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Safe handling, transparent milestone logging, fair volumetric pricing, and direct communication through our operational directors and dispatch leads at every stage.
            </p>
          </div>

        </div>

        {/* Why Choose Us Section with Truck Fleet Graphic */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase font-mono text-amber-400">WHY BUSINESSES CHOOSE DANGO CARGO</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Safe. Fast. Reliable. Every Single Flight.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you are transporting heavy industrial components, urgent commercial inventory, or personal belongings to family, our teams on the ground in Lagos and Kinshasa inspect, weigh, and manifest every single piece with utmost discipline.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Physical verification and weight certification at cargo intake</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Secure strapping, pallet consolidation, and weather-proof wrapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Accessible leadership: direct telephone access to DRC Directors & Lagos Dispatch</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-purple-800 shadow-xl">
                <img
                  src="/src/assets/images/cargo_delivery_truck_1790954364202.jpg"
                  alt="Dango Cargo delivery box truck"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
