import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import { 
  Plane, 
  Boxes, 
  Globe, 
  Truck, 
  Building2, 
  ArrowLeftRight, 
  Warehouse, 
  ShieldCheck, 
  Briefcase, 
  Layers, 
  Compass, 
  ShieldAlert, 
  Zap, 
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  X,
  Package
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, setActiveView, language } = useApp();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'air' | 'commercial' | 'delivery'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane': return <Plane className="w-6 h-6" />;
      case 'Boxes': return <Boxes className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'ArrowLeftRight': return <ArrowLeftRight className="w-6 h-6" />;
      case 'Warehouse': return <Warehouse className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
    }
  };

  const filteredServices = services.filter(srv => {
    if (activeFilter === 'air') {
      return ['air-cargo', 'express-cargo', 'airport-to-airport', 'international-shipping'].includes(srv.id);
    }
    if (activeFilter === 'commercial') {
      return ['cargo-freight', 'commercial-cargo', 'business-cargo', 'import-export', 'freight-consolidation'].includes(srv.id);
    }
    if (activeFilter === 'delivery') {
      return ['door-to-door', 'cargo-pickup-delivery', 'special-fragile', 'personal-cargo', 'logistics-distribution'].includes(srv.id);
    }
    return true;
  });

  return (
    <section id="services" className="py-20 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
              {language === 'fr' ? 'NOS PRESTATIONS DE FRET' : 'COMPREHENSIVE LOGISTICS SOLUTIONS'}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {language === 'fr' ? 'Services de Fret Aérien & Marchandises' : 'Air Cargo, Freight & Logistics Services'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              {language === 'fr' 
                ? 'Une gamme complète de solutions sur mesure pour les entreprises, importateurs, commerçants et particuliers entre le Nigeria, la RDC et l\'international.'
                : 'Specialized air freight, customs handling, and local delivery engineered for commercial traders, industrial importers, and private senders.'}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl shrink-0 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all' ? 'bg-white text-purple-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (14)
            </button>
            <button
              onClick={() => setActiveFilter('air')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'air' ? 'bg-white text-purple-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Air Lines
            </button>
            <button
              onClick={() => setActiveFilter('commercial')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'commercial' ? 'bg-white text-purple-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Commercial & Freight
            </button>
            <button
              onClick={() => setActiveFilter('delivery')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'delivery' ? 'bg-white text-purple-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pickup & Delivery
            </button>
          </div>
        </div>

        {/* 14 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center group-hover:bg-purple-950 group-hover:text-amber-400 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1.5 group-hover:text-purple-950 transition-colors">
                  {language === 'fr' ? service.frenchTitle : service.title}
                </h3>
                
                <p className="text-xs text-purple-900 font-semibold mb-3">
                  {service.tagline}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'fr' ? service.frenchDescription : service.description}
                </p>

                <div className="space-y-1.5 mb-5">
                  {service.benefits.slice(0, 2).map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-purple-900 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  View Details & Process
                </button>
                <button
                  onClick={() => {
                    setActiveView('booking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-purple-950 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3 h-3 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-950 text-amber-400 flex items-center justify-center shrink-0">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {language === 'fr' ? selectedService.frenchTitle : selectedService.title}
                </h3>
                <p className="text-xs text-purple-900 font-semibold">
                  {selectedService.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {language === 'fr' ? selectedService.frenchDescription : selectedService.description}
            </p>

            {/* Key Benefits */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Operational Advantages:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Process Steps */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Standard Handling Workflow:
              </h4>
              <ol className="space-y-2 text-xs text-slate-700">
                {selectedService.process.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-950 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {sIdx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Recommended for */}
            <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-100 mb-6 text-xs text-purple-950">
              <span className="font-bold">Recommended for: </span>
              <span>{selectedService.recommendedFor}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  setActiveView('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm"
              >
                <span>Request This Service Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
