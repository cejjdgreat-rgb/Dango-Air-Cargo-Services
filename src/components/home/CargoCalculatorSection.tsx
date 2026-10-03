import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export const CargoCalculatorSection: React.FC = () => {
  const { calculateShippingEstimate, formatPrice, setActiveView, language, settings } = useApp();

  const [actualWeight, setActualWeight] = useState<number>(25);
  const [lengthCm, setLengthCm] = useState<number>(50);
  const [widthCm, setWidthCm] = useState<number>(40);
  const [heightCm, setHeightCm] = useState<number>(40);
  const [serviceType, setServiceType] = useState<string>('Standard Air Cargo');
  const [pickup, setPickup] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<boolean>(true);

  const estimate = calculateShippingEstimate(
    actualWeight,
    lengthCm,
    widthCm,
    heightCm,
    serviceType,
    pickup,
    delivery
  );

  return (
    <section id="calculator" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Form: Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                <Calculator className="w-4 h-4 text-amber-500" />
                <span>{language === 'fr' ? 'CALCULATEUR DE POIDS VOLUMÉTRIQUE' : 'DIMENSIONAL WEIGHT & TARIFF CALCULATOR'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {language === 'fr' ? 'Estimez Instantanément Vos Frais de Fret' : 'Calculate Instant Air Cargo Shipping Estimate'}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                International air freight is charged on the greater of actual scale weight vs. volumetric weight (IATA standard). Enter your package dimensions for instant calculation.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
              
              {/* Route & Service Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Shipping Route
                  </label>
                  <select 
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-purple-800"
                    defaultValue="LOS-FIH"
                  >
                    <option value="LOS-FIH">Lagos (LOS) ➔ Kinshasa (FIH)</option>
                    <option value="FIH-LOS">Kinshasa (FIH) ➔ Lagos (LOS)</option>
                    <option value="INTL">International Connection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Service Speed
                  </label>
                  <select 
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 outline-none focus:border-purple-800"
                  >
                    <option value="Standard Air Cargo">Standard Air Cargo (${settings.standardRatePerKgUSD}/kg)</option>
                    <option value="Express Air Cargo">Express Air Cargo (${settings.expressRatePerKgUSD}/kg)</option>
                  </select>
                </div>
              </div>

              {/* Weight & Package Dimensions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Actual Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={actualWeight}
                    onChange={(e) => setActualWeight(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none focus:border-purple-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none focus:border-purple-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none focus:border-purple-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 outline-none focus:border-purple-800"
                  />
                </div>
              </div>

              {/* Extra Services: Pickup and Delivery */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={pickup}
                    onChange={(e) => setPickup(e.target.checked)}
                    className="w-4 h-4 text-purple-900 rounded accent-purple-900 cursor-pointer"
                  />
                  <span>Include Doorstep Cargo Pickup (+${settings.pickupFeeUSD})</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={delivery}
                    onChange={(e) => setDelivery(e.target.checked)}
                    className="w-4 h-4 text-purple-900 rounded accent-purple-900 cursor-pointer"
                  />
                  <span>Include Final Destination Doorstep Delivery (+${settings.deliveryFeeUSD})</span>
                </label>
              </div>

            </div>
          </div>

          {/* Right Card: Instant Calculation Breakdown (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-purple-900 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-purple-900 text-xs font-mono text-purple-300">
                <span>IATA FORMULA: (L×W×H)/{settings.volumetricDivisor}</span>
                <span className="text-amber-400 font-bold">ESTIMATE ONLY</span>
              </div>

              {/* Weights Comparison Grid */}
              <div className="grid grid-cols-3 gap-2 my-5 text-center">
                <div className="bg-purple-900/50 p-2.5 rounded-xl border border-purple-800/40">
                  <div className="text-[10px] text-purple-300 uppercase font-semibold">Scale Weight</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white mt-0.5">{estimate.actualWeight} kg</div>
                </div>

                <div className="bg-purple-900/50 p-2.5 rounded-xl border border-purple-800/40">
                  <div className="text-[10px] text-purple-300 uppercase font-semibold">Volumetric</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-amber-300 mt-0.5">{estimate.volumetricWeight} kg</div>
                </div>

                <div className="bg-purple-900/80 p-2.5 rounded-xl border border-amber-400/50">
                  <div className="text-[10px] text-amber-300 uppercase font-bold">Chargeable</div>
                  <div className="text-sm sm:text-base font-extrabold font-mono text-white mt-0.5">{estimate.chargeableWeight} kg</div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs py-3 border-y border-purple-900/80">
                <div className="flex justify-between text-slate-300">
                  <span>Base Air Freight ({estimate.chargeableWeight} kg @ standard):</span>
                  <span className="font-mono text-white">{formatPrice(estimate.baseRate)}</span>
                </div>
                {pickup && (
                  <div className="flex justify-between text-slate-300">
                    <span>Doorstep Collection Service:</span>
                    <span className="font-mono text-white">{formatPrice(estimate.pickupCost)}</span>
                  </div>
                )}
                {delivery && (
                  <div className="flex justify-between text-slate-300">
                    <span>Destination Delivery Service:</span>
                    <span className="font-mono text-white">{formatPrice(estimate.deliveryCost)}</span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <div className="text-xs font-semibold text-purple-200 uppercase">Estimated Total:</div>
                  <div className="text-[11px] text-slate-400">Excludes special clearance duty where applicable</div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
                  {formatPrice(estimate.totalUSD)}
                </div>
              </div>

              {/* Booking Action */}
              <button
                onClick={() => {
                  setActiveView('booking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-6 w-full py-3 bg-amber-400 hover:bg-amber-300 text-purple-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Book This Cargo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center">
                <button
                  onClick={() => {
                    setActiveView('quote');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs text-purple-300 hover:text-white underline"
                >
                  Need a custom commercial invoice quote? Submit formal RFP →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
