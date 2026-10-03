import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { RouteMapSection } from './components/home/RouteMapSection';
import { ServicesSection } from './components/home/ServicesSection';
import { CargoCalculatorSection } from './components/home/CargoCalculatorSection';
import { TrackingView } from './components/tracking/TrackingView';
import { QuotePage } from './components/quote/QuotePage';
import { BookingWizard } from './components/booking/BookingWizard';
import { PickupRequestPage } from './components/pickup/PickupRequestModal';
import { DestinationsView } from './components/destinations/DestinationsView';
import { AboutView } from './components/about/AboutView';
import { FAQView } from './components/faq/FAQView';
import { ContactView } from './components/contact/ContactView';
import { CustomerPortal } from './components/portal/CustomerPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LegalPages } from './components/legal/LegalPages';
import { 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  Plane, 
  ShieldCheck, 
  Clock, 
  Truck,
  MessageSquare,
  PackageCheck
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, toasts, removeToast, language, settings } = useApp();

  const cleanWhatsAppNumber = settings.whatsappPhone.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-purple-900 selection:text-white">
      {/* Universal Header */}
      <Header />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* 1. Full Hero Section */}
            <HeroSection />

            {/* 2. Direct Corridor Route Map (Lagos ⇄ Kinshasa) */}
            <RouteMapSection />

            {/* 3. Dimensional Weight & Tariff Calculator */}
            <CargoCalculatorSection />

            {/* 4. Complete Services (14 Air Freight Services) */}
            <ServicesSection />

            {/* 5. Warehouse & Freight Pallet Operational Showcase */}
            <section className="py-20 bg-white border-y border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  <div className="lg:col-span-6 relative">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                      <img
                        src="/src/assets/images/warehouse_freight_pallets_1790954352505.jpg"
                        alt="Dango Cargo modern freight pallets and warehouse storage terminal"
                        className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Floating Operational Badge */}
                    <div className="absolute -bottom-6 -right-4 sm:right-6 bg-purple-950 text-white p-4 rounded-2xl shadow-xl border border-purple-800 max-w-xs">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Bonded Freight Handling</span>
                      </div>
                      <p className="text-[11px] text-purple-200 mt-1">
                        Professional strapping, pallet netting, and climate-controlled staging in Lagos & Kinshasa.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-900">
                        {language === 'fr' ? 'SÉCURITÉ & CAPACITÉ DE FRET' : 'CARGO INTEGRITY & WAREHOUSE CARE'}
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1 tracking-tight">
                        Excellence in Every Pallet, Box & Consignment
                      </h2>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      At Dango Cargo Air Services, every package receives rigorous verification. From standard cartons and personal luggage to heavy industrial machinery and fragile electronics, our cargo handlers ensure exact scale calibration, anti-tamper security sealing, and balanced aircraft loading.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <PackageCheck className="w-5 h-5 text-purple-950 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Calibrated Scale & Volumetric Audits</h4>
                          <p className="text-[11px] text-slate-500">Every piece is measured and weighed accurately to guarantee fair, transparent billing.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <Truck className="w-5 h-5 text-purple-950 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Doorstep Collection Box Vans</h4>
                          <p className="text-[11px] text-slate-500">Avoid terminal congestion with our rapid doorstep pickup fleet in commercial districts.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => {
                          setActiveView('booking');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>Book Consignment Space</span>
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      </button>

                      <button
                        onClick={() => {
                          setActiveView('pickup');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-sm"
                      >
                        Request Door Pickup
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* 6. Quick FAQ Preview on Homepage */}
            <section className="py-16 bg-slate-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-900">COMMON QUESTIONS</span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <strong className="text-slate-900 block text-sm">How do I track my air freight consignment?</strong>
                    <p className="text-slate-600">Enter your official Air Waybill number (e.g. DCA-2026-001089) on our Track page for verified 8-stage progress from Lagos to Kinshasa.</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                    <strong className="text-slate-900 block text-sm">Where are Dango Cargo terminals located?</strong>
                    <p className="text-slate-600">In Nigeria: God's Favour Plaza Shop 5, opposite Zone C Block 8 Shop 21, Lagos. In DRC: Av Dodoma 54 C/ Barumbu, Kinshasa.</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setActiveView('faq');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-purple-950 hover:underline"
                  >
                    View All Answers & Prohibited Items Policy →
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Dynamic Pages */}
        {activeView === 'tracking' && <TrackingView />}
        {activeView === 'services' && <ServicesSection />}
        {activeView === 'quote' && <QuotePage />}
        {activeView === 'booking' && <BookingWizard />}
        {activeView === 'pickup' && <PickupRequestPage />}
        {activeView === 'destinations' && <DestinationsView />}
        {activeView === 'about' && <AboutView />}
        {activeView === 'faq' && <FAQView />}
        {activeView === 'contact' && <ContactView />}
        {activeView === 'portal' && <CustomerPortal />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'privacy' && <LegalPages pageType="privacy" />}
        {activeView === 'terms' && <LegalPages pageType="terms" />}
      </main>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Dango Cargo Air Services, I would like to inquire about air cargo services.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all group border-2 border-white"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold">
          Chat on WhatsApp
        </span>
      </a>

      {/* Universal Footer */}
      <Footer />

      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-2.5 p-3.5 rounded-xl shadow-xl text-xs font-medium border animate-in slide-in-from-right-4 duration-150 ${
              toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-800'
                : toast.type === 'info'
                  ? 'bg-purple-950 text-white border-purple-900'
                  : 'bg-emerald-950 text-white border-emerald-900'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 -mr-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
