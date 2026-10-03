import React from 'react';
import { DangoLogo } from '../brand/DangoLogo';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock, 
  Mail,
  Plane
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, language, settings } = useApp();

  const handleNav = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsAppNumber = settings.whatsappPhone.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-purple-950 text-slate-300 pt-16 pb-12 border-t border-purple-900 relative overflow-hidden">
      {/* Subtle background ambient graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Kicker Banner */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-950 border border-purple-800/80 rounded-2xl p-6 sm:p-8 mb-14 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                {language === 'fr' ? 'Engagement Officiel' : 'Our Brand Commitment'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                {language === 'fr' 
                  ? 'SÛR. RAPIDE. FIABLE. Solutions de Fret Aérien & Marchandises.' 
                  : 'SAFE. FAST. RELIABLE. Cargo & Freight Solutions.'}
              </h3>
              <p className="text-purple-200 text-sm mt-1 italic">
                “We deliver value, you receive excellence. Thank you for trusting DANGO CARGO AIR SERVICES.”
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Dango Cargo Air Services, I would like to inquire about cargo shipping between Nigeria and DRC.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <button
                onClick={() => handleNav('booking')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs sm:text-sm font-bold rounded-lg shadow transition-all cursor-pointer"
              >
                <span>Book Air Cargo</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-900/60">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <DangoLogo variant="footer" theme="dark" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Premier international air cargo and freight forwarding specialist maintaining a dedicated, high-frequency logistics corridor between the Federal Republic of Nigeria, the Democratic Republic of Congo (DRC), and global trade routes.
            </p>
            <div className="pt-2 text-xs text-amber-400 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Manifest Integrity & Cargo Care</span>
            </div>
          </div>

          {/* Column 2: Lagos & Nigeria Operations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>LAGOS, NIGERIA OFFICE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {settings.lagosAddress}
            </p>
            <div className="pt-2 space-y-1.5 text-xs">
              <div className="text-slate-400 text-[11px] font-semibold uppercase">Official Phone Lines:</div>
              <div className="text-white font-mono flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-amber-400" />
                <span>Office: {settings.nigeriaOfficePhone}</span>
              </div>
              <div className="text-purple-200 font-mono text-[11px]">
                OSSY: <span className="text-white">{settings.ossyPhone}</span>
              </div>
              <div className="text-purple-200 font-mono text-[11px]">
                EMEKA: <span className="text-white">{settings.emekaPhone}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Kinshasa & DRC Operations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>KINSHASA, DRC OFFICE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {settings.congoAddress}
            </p>
            <div className="pt-2 space-y-1.5 text-xs">
              <div className="text-slate-400 text-[11px] font-semibold uppercase">Director's DRC Lines:</div>
              {settings.directorDrcPhones.map((ph, idx) => (
                <div key={idx} className="text-white font-mono flex items-center gap-1.5 text-xs">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>{ph}</span>
                </div>
              ))}
              <div className="text-purple-200 text-[11px] mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Mon – Sat: 08:00 – 18:00 (WAT / CAT)</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Navigation & Portals */}
          <div className="space-y-3">
            <div className="text-white font-bold text-sm tracking-wide">
              {language === 'fr' ? 'ACCÈS RAPIDE' : 'QUICK NAVIGATION'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'fr' ? 'Tous les Services de Fret' : 'Air Cargo & Freight Services'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('tracking')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'fr' ? 'Suivre un Colis (Waybill)' : 'Track Shipment by Airwaybill'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('quote')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'fr' ? 'Calculateur de Tarif de Fret' : 'Cargo Rate Calculator & Quote'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('destinations')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'fr' ? 'Destinations Nigeria & RDC' : 'Nigeria & DRC Flight Routes'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('faq')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'fr' ? 'Questions Fréquentes (FAQ)' : 'Frequently Asked Questions'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('portal')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left font-medium text-amber-300"
                >
                  {language === 'fr' ? 'Portail Client & Factures' : 'Customer Account & Invoices'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('admin')} 
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left text-slate-400"
                >
                  Admin Operations Console
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="text-white font-semibold">DANGO CARGO AIR SERVICES</span>. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms & Shipping Conditions
            </button>
            <span>·</span>
            <button onClick={() => handleNav('faq')} className="hover:text-white transition-colors cursor-pointer">
              Restricted Items Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
