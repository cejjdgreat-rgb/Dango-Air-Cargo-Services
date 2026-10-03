import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Send, CheckCircle2, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

export const QuotePage: React.FC = () => {
  const { requestQuote, calculateShippingEstimate, formatPrice, settings, language, setActiveView } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [origin, setOrigin] = useState('Lagos (LOS), Nigeria');
  const [destination, setDestination] = useState('Kinshasa (FIH), DRC');
  const [cargoType, setCargoType] = useState('Commercial Goods');
  const [pieces, setPieces] = useState(2);
  const [weightKg, setWeightKg] = useState(45);
  const [lengthCm, setLengthCm] = useState(60);
  const [widthCm, setWidthCm] = useState(40);
  const [heightCm, setHeightCm] = useState(40);
  const [serviceLevel, setServiceLevel] = useState<'STANDARD_AIR' | 'EXPRESS_AIR' | 'CARGO_CONSOLIDATION'>('STANDARD_AIR');
  const [pickupRequired, setPickupRequired] = useState(false);
  const [deliveryRequired, setDeliveryRequired] = useState(true);
  const [notes, setNotes] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const estimate = calculateShippingEstimate(
    weightKg,
    lengthCm,
    widthCm,
    heightCm,
    serviceLevel === 'EXPRESS_AIR' ? 'Express Cargo' : 'Standard Air Cargo',
    pickupRequired,
    deliveryRequired
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const newQuote = requestQuote({
      customerName,
      phone,
      email: email || 'client@cargo.com',
      origin,
      destination,
      cargoType,
      pieces,
      weightKg,
      lengthCm,
      widthCm,
      heightCm,
      serviceLevel,
      pickupRequired,
      deliveryRequired,
      estimatedAmountUSD: estimate.totalUSD,
      adminNotes: notes || undefined
    });

    setSubmittedId(newQuote.id);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'DEMANDE DE DEVIS PERSONNALISÉ' : 'CUSTOM AIR FREIGHT QUOTE'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Obtenir un Devis de Fret Aérien' : 'Request an Official Freight Quote'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Get transparent tariff calculations for commercial cargo, consolidated freight, or personal items shipped across Nigeria and DRC.
          </p>
        </div>

        {submittedId ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Quote Request Submitted Successfully!
            </h2>
            <div className="inline-block bg-purple-50 text-purple-950 font-mono font-bold px-3 py-1 rounded-md text-xs border border-purple-200">
              REFERENCE NO: #{submittedId}
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Our freight pricing department in Lagos and Kinshasa has received your consignment specs. An agent will contact you shortly to confirm flight space availability.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveView('booking')}
                className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed Straight to Booking</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
              <button
                onClick={() => setSubmittedId(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Calculate Another Quote
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            
            {/* Contact Details */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                1. Your Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Aliko Usman"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234... or +243..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono outline-none focus:border-purple-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-800"
                  />
                </div>
              </div>
            </div>

            {/* Flight Sector & Cargo Type */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                2. Shipping Sector & Cargo Category
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Origin *</label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                  >
                    <option value="Lagos (LOS), Nigeria">Lagos (Murtala Muhammed LOS), Nigeria</option>
                    <option value="Kinshasa (FIH), DRC">Kinshasa (N'Djili FIH), DRC</option>
                    <option value="Abuja (ABV), Nigeria">Abuja (ABV), Nigeria</option>
                    <option value="Lubumbashi (FBM), DRC">Lubumbashi (FBM), DRC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Destination *</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                  >
                    <option value="Kinshasa (FIH), DRC">Kinshasa (N'Djili FIH), DRC</option>
                    <option value="Lagos (LOS), Nigeria">Lagos (Murtala Muhammed LOS), Nigeria</option>
                    <option value="Lubumbashi (FBM), DRC">Lubumbashi (FBM), DRC</option>
                    <option value="Abuja (ABV), Nigeria">Abuja (ABV), Nigeria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Cargo Category *</label>
                  <select
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                  >
                    <option value="Commercial Goods">Commercial Goods</option>
                    <option value="Clothing">Clothing & Textiles</option>
                    <option value="Electronics">Electronics & Hardware</option>
                    <option value="Machinery">Machinery & Spare Parts</option>
                    <option value="Household Items">Household Items</option>
                    <option value="Documents">Legal Documents</option>
                    <option value="Fragile Items">Fragile / Precision Equipment</option>
                    <option value="Food Items">Packaged Food Items</option>
                    <option value="Other">Other Commodities</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dimensional Specifications */}
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">
                3. Dimensions & Weight Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Packages</label>
                  <input
                    type="number"
                    min="1"
                    value={pieces}
                    onChange={(e) => setPieces(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Length (cm)</label>
                  <input
                    type="number"
                    min="1"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Width (cm)</label>
                  <input
                    type="number"
                    min="1"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Height (cm)</label>
                  <input
                    type="number"
                    min="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
              </div>

              {/* Service Level and Options */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setServiceLevel('STANDARD_AIR')}
                  className={`p-3 rounded-xl border cursor-pointer text-xs ${
                    serviceLevel === 'STANDARD_AIR' ? 'border-purple-900 bg-purple-50 font-bold' : 'border-slate-200'
                  }`}
                >
                  <div>Standard Air Cargo</div>
                  <div className="text-[10px] text-slate-500 font-normal">2–3 Days Scheduled Flight</div>
                </div>

                <div
                  onClick={() => setServiceLevel('EXPRESS_AIR')}
                  className={`p-3 rounded-xl border cursor-pointer text-xs ${
                    serviceLevel === 'EXPRESS_AIR' ? 'border-purple-900 bg-purple-50 font-bold' : 'border-slate-200'
                  }`}
                >
                  <div>Express Priority Air</div>
                  <div className="text-[10px] text-slate-500 font-normal">Next Departure Boarding</div>
                </div>

                <div
                  onClick={() => setServiceLevel('CARGO_CONSOLIDATION')}
                  className={`p-3 rounded-xl border cursor-pointer text-xs ${
                    serviceLevel === 'CARGO_CONSOLIDATION' ? 'border-purple-900 bg-purple-50 font-bold' : 'border-slate-200'
                  }`}
                >
                  <div>Freight Consolidation</div>
                  <div className="text-[10px] text-slate-500 font-normal">Maximized Economical Groupage</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pickupRequired}
                    onChange={(e) => setPickupRequired(e.target.checked)}
                    className="w-4 h-4 text-purple-900 rounded"
                  />
                  <span>Require Doorstep Cargo Pickup (+${settings.pickupFeeUSD})</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliveryRequired}
                    onChange={(e) => setDeliveryRequired(e.target.checked)}
                    className="w-4 h-4 text-purple-900 rounded"
                  />
                  <span>Require Doorstep Destination Delivery (+${settings.deliveryFeeUSD})</span>
                </label>
              </div>
            </div>

            {/* Live Calculation Preview Banner */}
            <div className="p-4 bg-purple-950 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-purple-200 font-mono">
                  Chargeable Weight: <strong>{estimate.chargeableWeight} kg</strong> (Volumetric: {estimate.volumetricWeight} kg)
                </div>
                <div className="text-xs text-slate-300">
                  Includes base air freight + selected logistics options
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-amber-300 font-semibold uppercase">Estimated Tariff</div>
                <div className="text-2xl font-black font-mono text-amber-400">
                  {formatPrice(estimate.totalUSD)}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Additional Consignment Details / Special Handling Requests
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention fragile contents, temperature requirements, or specific packaging..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official Freight Quote Request</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
