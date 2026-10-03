import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Shipment, ShipmentStatus } from '../../types';
import { 
  Search, 
  MapPin, 
  Clock, 
  Package, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Plane,
  Building2,
  Truck
} from 'lucide-react';
import { InvoiceModal } from '../modals/InvoiceModal';

const ORDERED_STAGES: { key: ShipmentStatus; label: string; desc: string }[] = [
  { key: 'BOOKED', label: 'Booked', desc: 'Waybill generated' },
  { key: 'RECEIVED', label: 'Received', desc: 'Intake at terminal' },
  { key: 'PROCESSING', label: 'Processing', desc: 'Customs & security check' },
  { key: 'PACKED', label: 'Packed', desc: 'Staged on flight pallet' },
  { key: 'IN_TRANSIT', label: 'In Transit', desc: 'Air cargo flight airborne' },
  { key: 'ARRIVED_DESTINATION', label: 'Arrived at Destination', desc: 'Touchdown & ramp release' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Dispatch van active' },
  { key: 'DELIVERED', label: 'Delivered', desc: 'Signed by recipient' }
];

export const TrackingView: React.FC = () => {
  const { 
    shipments, 
    selectedTrackingNumber, 
    setSelectedTrackingNumber, 
    formatPrice, 
    language,
    setActiveView 
  } = useApp();

  const [inputVal, setInputVal] = useState(selectedTrackingNumber || '');
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showWaybillModal, setShowWaybillModal] = useState(false);

  useEffect(() => {
    if (selectedTrackingNumber) {
      setInputVal(selectedTrackingNumber);
      const found = shipments.find(s => s.trackingNumber.toUpperCase() === selectedTrackingNumber.toUpperCase());
      setActiveShipment(found || null);
      setHasSearched(true);
    }
  }, [selectedTrackingNumber, shipments]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const clean = inputVal.trim().toUpperCase();
    setSelectedTrackingNumber(clean);
    const found = shipments.find(s => s.trackingNumber.toUpperCase() === clean);
    setActiveShipment(found || null);
    setHasSearched(true);
  };

  const getStageIndex = (status: ShipmentStatus) => {
    const idx = ORDERED_STAGES.findIndex(s => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  const currentStageIdx = activeShipment ? getStageIndex(activeShipment.status) : 0;

  return (
    <div className="py-12 bg-slate-50 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tracking Header & Search Box */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-2">
            <Plane className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'SUIVI DE FRET EN TEMPS RÉEL' : 'REAL-TIME AIRWAYBILL CARGO TRACKING'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Suivre Votre Cargaison' : 'Track Your Shipment'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your official Dango Cargo Air Services Air Waybill (AWB) tracking number for authenticated milestone progress.
          </p>

          {/* Search Bar Form */}
          <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl mx-auto shadow-md rounded-2xl p-2 bg-white border border-slate-200">
            <div className="flex items-center gap-3 px-3 py-2 flex-1">
              <Search className="w-5 h-5 text-purple-900 shrink-0" />
              <input
                type="text"
                placeholder="e.g. DCA-2026-001089"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full text-sm font-mono font-bold uppercase outline-none text-slate-900 placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Track Waybill
            </button>
          </form>

          {/* Demo Tracking Number Pills */}
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-center gap-2 flex-wrap">
            <span>Sample records:</span>
            {shipments.slice(0, 3).map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setInputVal(s.trackingNumber);
                  setSelectedTrackingNumber(s.trackingNumber);
                }}
                className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 hover:bg-purple-100 hover:text-purple-900 font-mono text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {s.trackingNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          <>
            {activeShipment ? (
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                
                {/* Marquee Shipment Status Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-purple-950 font-bold bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                          AWB: {activeShipment.trackingNumber}
                        </span>
                        {activeShipment.isDemo && (
                          <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                            DEMO RECORD
                          </span>
                        )}
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Status: {activeShipment.status.replace(/_/g, ' ')}</span>
                        </span>
                      </div>
                      
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
                        {activeShipment.origin} ➔ {activeShipment.destination}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-900 shrink-0" />
                        <span>Current Physical Location: <strong className="text-slate-800">{activeShipment.currentLocation}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setShowWaybillModal(true)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer border border-slate-300"
                      >
                        <Printer className="w-4 h-4 text-purple-950" />
                        <span>Print Air Waybill</span>
                      </button>

                      <button
                        onClick={() => setActiveView('contact')}
                        className="px-4 py-2.5 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Contact Terminal Desk
                      </button>
                    </div>
                  </div>

                  {/* 8-Stage Visual Timeline Bar */}
                  <div className="py-8 overflow-x-auto">
                    <div className="min-w-[760px] relative px-2">
                      
                      {/* Connecting Line */}
                      <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 z-0">
                        <div 
                          className="h-full bg-purple-900 transition-all duration-500"
                          style={{ width: `${(currentStageIdx / (ORDERED_STAGES.length - 1)) * 100}%` }}
                        />
                      </div>

                      {/* 8 Stage Nodes */}
                      <div className="flex justify-between relative z-10">
                        {ORDERED_STAGES.map((stage, idx) => {
                          const isCompleted = idx < currentStageIdx;
                          const isCurrent = idx === currentStageIdx;
                          return (
                            <div key={stage.key} className="flex flex-col items-center text-center w-20">
                              <div 
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                  isCurrent 
                                    ? 'bg-amber-400 text-purple-950 ring-4 ring-purple-100 font-bold scale-110 shadow-md' 
                                    : isCompleted 
                                      ? 'bg-purple-900 text-white shadow-xs' 
                                      : 'bg-white border-2 border-slate-300 text-slate-400'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  <span className="text-xs font-mono font-bold">{idx + 1}</span>
                                )}
                              </div>
                              <span className={`text-[11px] font-bold mt-2.5 leading-tight ${
                                isCurrent ? 'text-purple-950 font-black' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                              }`}>
                                {stage.label}
                              </span>
                              <span className="text-[9px] text-slate-400 mt-0.5 leading-none">
                                {stage.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  </div>

                  {/* Shipment Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-semibold">Service Type</div>
                      <div className="font-bold text-slate-800 mt-0.5">{activeShipment.serviceType}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-semibold">Commodity Type</div>
                      <div className="font-bold text-slate-800 mt-0.5">{activeShipment.cargoType}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-semibold">Chargeable Weight / Pcs</div>
                      <div className="font-mono font-bold text-slate-900 mt-0.5">
                        {activeShipment.chargeableWeightKg} kg · {activeShipment.totalPieces} pkgs
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px] uppercase font-semibold">Est. Delivery Date</div>
                      <div className="font-bold text-purple-950 mt-0.5">
                        {new Date(activeShipment.estimatedDeliveryDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Sender, Receiver & Detailed Timeline Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Party Details & Cargo Manifest (5 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Parties Box */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                        Consignment Parties
                      </h3>

                      {/* Shipper / Sender */}
                      <div className="space-y-1 text-xs">
                        <div className="text-[10px] uppercase font-bold text-purple-900">Shipper / Sender</div>
                        <div className="font-bold text-slate-900">{activeShipment.sender.name}</div>
                        {activeShipment.sender.company && (
                          <div className="text-slate-600">{activeShipment.sender.company}</div>
                        )}
                        <div className="text-slate-500">{activeShipment.sender.address}, {activeShipment.sender.city}</div>
                        <div className="font-mono text-slate-600">{activeShipment.sender.phone}</div>
                      </div>

                      {/* Consignee / Receiver */}
                      <div className="space-y-1 text-xs pt-3 border-t border-slate-100">
                        <div className="text-[10px] uppercase font-bold text-purple-900">Consignee / Receiver</div>
                        <div className="font-bold text-slate-900">{activeShipment.receiver.name}</div>
                        {activeShipment.receiver.company && (
                          <div className="text-slate-600">{activeShipment.receiver.company}</div>
                        )}
                        <div className="text-slate-500">{activeShipment.receiver.address}, {activeShipment.receiver.city}</div>
                        <div className="font-mono text-slate-600">{activeShipment.receiver.phone}</div>
                      </div>
                    </div>

                    {/* Cargo Item Breakdown */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                        Manifested Packages ({activeShipment.items.length})
                      </h3>
                      <div className="space-y-2">
                        {activeShipment.items.map((item, idx) => (
                          <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between items-start">
                            <div>
                              <div className="font-bold text-slate-800">{item.description}</div>
                              <div className="text-slate-500 text-[11px]">Category: {item.category}</div>
                              {item.lengthCm && (
                                <div className="text-slate-400 font-mono text-[10px]">
                                  {item.lengthCm} × {item.widthCm} × {item.heightCm} cm
                                </div>
                              )}
                            </div>
                            <div className="text-right font-mono text-xs">
                              <span className="font-bold text-purple-950">{item.weightKg} kg</span>
                              <div className="text-slate-400 text-[10px]">{item.pieces} pc(s)</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {activeShipment.specialInstructions && (
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900">
                          <span className="font-bold">Handling Note: </span>
                          <span>{activeShipment.specialInstructions}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right Column: Verified Audit Timeline (7 cols) */}
                  <div className="lg:col-span-7">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Official Milestone Log ({activeShipment.timeline.length} updates)
                        </h3>
                        <span className="text-[11px] text-slate-400">Authenticated Terminal Records</span>
                      </div>

                      <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-100">
                        {activeShipment.timeline.map((evt, eIdx) => (
                          <div key={evt.id || eIdx} className="relative group">
                            {/* Milestone Dot */}
                            <div className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 bg-white ${
                              eIdx === 0 ? 'border-amber-400 ring-2 ring-amber-100' : 'border-purple-900'
                            }`} />

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 group-hover:border-purple-200 transition-colors">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                <span className="font-bold text-sm text-slate-900">
                                  {evt.title}
                                </span>
                                <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-purple-900" />
                                  <span>{evt.timestamp}</span>
                                </span>
                              </div>

                              <div className="text-xs font-semibold text-purple-900 flex items-center gap-1 mb-2">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span>{evt.location}</span>
                              </div>

                              <p className="text-xs text-slate-600 leading-relaxed">
                                {evt.description}
                              </p>

                              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                                <span>Station: {evt.updatedBy}</span>
                                <span className="text-emerald-600 font-semibold">Verified</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* Not Found State */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tracking Number Not Found
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  We could not find an active air freight waybill matching <strong className="font-mono text-purple-950 font-bold">{inputVal}</strong>. Please double-check your receipt or try one of our active demo codes below.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => {
                      setInputVal('DCA-2026-001089');
                      setSelectedTrackingNumber('DCA-2026-001089');
                    }}
                    className="px-4 py-2 bg-purple-50 text-purple-950 font-mono text-xs font-bold rounded-lg border border-purple-200 hover:bg-purple-100"
                  >
                    Load DCA-2026-001089 (In Transit)
                  </button>
                  <button
                    onClick={() => {
                      setInputVal('DCA-2026-001095');
                      setSelectedTrackingNumber('DCA-2026-001095');
                    }}
                    className="px-4 py-2 bg-purple-50 text-purple-950 font-mono text-xs font-bold rounded-lg border border-purple-200 hover:bg-purple-100"
                  >
                    Load DCA-2026-001095 (Delivered)
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* Printable Air Waybill & Official Invoice Modal */}
      {showWaybillModal && activeShipment && (
        <InvoiceModal 
          shipment={activeShipment} 
          onClose={() => setShowWaybillModal(false)} 
        />
      )}
    </div>
  );
};
