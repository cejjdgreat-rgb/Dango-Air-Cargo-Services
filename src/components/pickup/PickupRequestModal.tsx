import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, CheckCircle2, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';

export const PickupRequestPage: React.FC = () => {
  const { requestPickup, settings, language, setActiveView } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<'Nigeria' | 'DRC'>('Nigeria');
  const [city, setCity] = useState('Lagos');
  const [pickupAddress, setPickupAddress] = useState('');
  const [cargoType, setCargoType] = useState('Commercial Goods');
  const [estimatedWeightKg, setEstimatedWeightKg] = useState(30);
  const [packageCount, setPackageCount] = useState(2);
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTimeWindow, setPreferredTimeWindow] = useState('Morning (09:00 - 12:00)');
  const [notes, setNotes] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !pickupAddress) return;

    const newPickup = requestPickup({
      customerName,
      phone,
      email: email || undefined,
      country,
      city,
      pickupAddress,
      cargoType,
      estimatedWeightKg,
      packageCount,
      preferredDate,
      preferredTimeWindow,
      notes: notes || undefined
    });

    setSubmittedId(newPickup.id);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            <Truck className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'SERVICE D\'ENLÈVEMENT À DOMICILE' : 'DOORSTEP CARGO COLLECTION'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Demander un Enlèvement de Colis' : 'Request a Cargo Pickup'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Our dedicated dispatch box vans collect directly from your store, warehouse, or residence in Lagos and Kinshasa.
          </p>
        </div>

        {submittedId ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Pickup Request Dispatched to Operations!
            </h2>
            <div className="inline-block bg-purple-50 text-purple-950 font-mono font-bold px-3 py-1 rounded-md text-xs border border-purple-200">
              REQUEST ID: #{submittedId}
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Our {city} field dispatch team has queued your collection for <strong>{preferredDate} ({preferredTimeWindow})</strong>. A driver will call you to confirm your address.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => setActiveView('home')}
                className="px-6 py-2.5 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-xl"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Emmanuel Adekunle"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234... or +243..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono outline-none focus:border-purple-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Operating Country *</label>
                <select
                  value={country}
                  onChange={(e) => {
                    const c = e.target.value as 'Nigeria' | 'DRC';
                    setCountry(c);
                    setCity(c === 'Nigeria' ? 'Lagos' : 'Kinshasa');
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                >
                  <option value="Nigeria">Nigeria (Lagos Hub)</option>
                  <option value="DRC">Democratic Republic of Congo (Kinshasa Hub)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City / Region *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Full Collection Street Address *
              </label>
              <textarea
                rows={2}
                required
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Shop number, plaza name, street, nearby landmark..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cargo Type</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                >
                  <option value="Commercial Goods">Commercial Goods</option>
                  <option value="Textiles">Textiles & Garments</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Household Items">Household Goods</option>
                  <option value="Machinery">Machinery Parts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Package Count</label>
                <input
                  type="number"
                  min="1"
                  value={packageCount}
                  onChange={(e) => setPackageCount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Est. Weight (kg)</label>
                <input
                  type="number"
                  min="1"
                  value={estimatedWeightKg}
                  onChange={(e) => setEstimatedWeightKg(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Pickup Date *</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time Slot *</label>
                <select
                  value={preferredTimeWindow}
                  onChange={(e) => setPreferredTimeWindow(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                >
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 – 12:00)</option>
                  <option value="Afternoon (13:00 - 16:00)">Afternoon (13:00 – 16:00)</option>
                  <option value="Late Afternoon (16:00 - 18:30)">Late Afternoon (16:00 – 18:30)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Access Instructions / Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Call 15 mins prior, ground floor loading bay available"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
              >
                Schedule Doorstep Cargo Pickup
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
