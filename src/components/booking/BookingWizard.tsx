import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plane, 
  Package, 
  User, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  ShieldCheck, 
  Calculator,
  Printer
} from 'lucide-react';
import { InvoiceModal } from '../modals/InvoiceModal';
import { Shipment } from '../../types';

export const BookingWizard: React.FC = () => {
  const { 
    createShipment, 
    calculateShippingEstimate, 
    formatPrice, 
    services, 
    settings, 
    language,
    setActiveView,
    setSelectedTrackingNumber 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [confirmedShipment, setConfirmedShipment] = useState<Shipment | null>(null);
  const [showWaybill, setShowWaybill] = useState<boolean>(false);

  // Form State
  const [serviceType, setServiceType] = useState<string>('Air Cargo Services');
  const [origin, setOrigin] = useState<string>('Lagos (LOS), Nigeria');
  const [destination, setDestination] = useState<string>('Kinshasa (FIH), DRC');
  
  // Cargo Details
  const [cargoCategory, setCargoCategory] = useState<string>('Commercial Goods');
  const [description, setDescription] = useState<string>('Assorted commercial goods');
  const [pieces, setPieces] = useState<number>(2);
  const [weightKg, setWeightKg] = useState<number>(35);
  const [lengthCm, setLengthCm] = useState<number>(50);
  const [widthCm, setWidthCm] = useState<number>(40);
  const [heightCm, setHeightCm] = useState<number>(40);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Sender Details
  const [senderName, setSenderName] = useState<string>('');
  const [senderCompany, setSenderCompany] = useState<string>('');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [senderAddress, setSenderAddress] = useState<string>('');

  // Receiver Details
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverCompany, setReceiverCompany] = useState<string>('');
  const [receiverPhone, setReceiverPhone] = useState<string>('');
  const [receiverEmail, setReceiverEmail] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState<string>('');

  // Service toggles
  const [pickupRequired, setPickupRequired] = useState<boolean>(false);
  const [deliveryRequired, setDeliveryRequired] = useState<boolean>(true);

  // Documents
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [paymentOption, setPaymentOption] = useState<'BANK_TRANSFER' | 'CARD' | 'PAY_AT_OFFICE'>('PAY_AT_OFFICE');

  const estimate = calculateShippingEstimate(
    weightKg,
    lengthCm,
    widthCm,
    heightCm,
    serviceType,
    pickupRequired,
    deliveryRequired
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFiles(prev => [...prev, file.name]);
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const newShipment = createShipment({
      origin,
      destination,
      sender: {
        name: senderName || 'Valued Client',
        company: senderCompany,
        phone: senderPhone || settings.nigeriaOfficePhone,
        email: senderEmail,
        address: senderAddress || 'Terminal Dropoff',
        city: origin.split(',')[0].trim(),
        country: origin.includes('Nigeria') ? 'Nigeria' : 'DRC'
      },
      receiver: {
        name: receiverName || 'Consignee',
        company: receiverCompany,
        phone: receiverPhone || settings.directorDrcPhones[0],
        email: receiverEmail,
        address: receiverAddress || 'Terminal Pickup',
        city: destination.split(',')[0].trim(),
        country: destination.includes('Nigeria') ? 'Nigeria' : 'DRC'
      },
      serviceType,
      cargoType: cargoCategory,
      items: [
        {
          description,
          category: cargoCategory,
          pieces,
          weightKg,
          lengthCm,
          widthCm,
          heightCm
        }
      ],
      totalPieces: pieces,
      actualWeightKg: weightKg,
      volumetricWeightKg: estimate.volumetricWeight,
      chargeableWeightKg: estimate.chargeableWeight,
      status: 'BOOKED',
      currentLocation: origin,
      flightOrTripNumber: 'DC-SCHEDULED',
      estimatedDeliveryDate: new Date(Date.now() + 3 * 86400000).toISOString(),
      paymentStatus: paymentOption === 'CARD' ? 'PAID' : 'PENDING',
      totalAmountUSD: estimate.totalUSD,
      specialInstructions: specialInstructions || undefined
    });

    setConfirmedShipment(newShipment);
    setCurrentStep(5);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            <Plane className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'RÉSERVATION DE FRET EN LIGNE' : 'ONLINE AIR CARGO BOOKING ENGINE'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Réserver Votre Expédition Aérienne' : 'Book Your Air Cargo Consignment'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Submit your shipment specifications to instantly reserve cargo hold capacity and generate an authenticated Air Waybill.
          </p>
        </div>

        {/* Step Progress Bar (1 to 4) */}
        {currentStep <= 4 && (
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 z-0" />
              
              {[
                { step: 1, label: 'Route & Service' },
                { step: 2, label: 'Cargo Specs' },
                { step: 3, label: 'Parties Details' },
                { step: 4, label: 'Review & Pay' },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    currentStep === s.step 
                      ? 'bg-amber-400 text-purple-950 ring-4 ring-amber-100'
                      : currentStep > s.step 
                        ? 'bg-purple-900 text-white'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}>
                    {currentStep > s.step ? '✓' : s.step}
                  </div>
                  <span className={`text-[11px] font-bold mt-1.5 ${
                    currentStep === s.step ? 'text-purple-950' : 'text-slate-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          
          {/* STEP 1: ROUTE & SERVICE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Step 1: Select Flight Route & Service Level
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Origin Airport / City
                  </label>
                  <select 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-purple-800"
                  >
                    <option value="Lagos (LOS), Nigeria">Lagos (Murtala Muhammed LOS), Nigeria</option>
                    <option value="Kinshasa (FIH), DRC">Kinshasa (N'Djili FIH), DRC</option>
                    <option value="Abuja (ABV), Nigeria">Abuja (Nnamdi Azikiwe ABV), Nigeria</option>
                    <option value="Lubumbashi (FBM), DRC">Lubumbashi (FBM), DRC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Destination Airport / City
                  </label>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-purple-800"
                  >
                    <option value="Kinshasa (FIH), DRC">Kinshasa (N'Djili FIH), DRC</option>
                    <option value="Lagos (LOS), Nigeria">Lagos (Murtala Muhammed LOS), Nigeria</option>
                    <option value="Lubumbashi (FBM), DRC">Lubumbashi (FBM), DRC</option>
                    <option value="Abuja (ABV), Nigeria">Abuja (Nnamdi Azikiwe ABV), Nigeria</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  Select Air Service Classification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {services.slice(0, 6).map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setServiceType(srv.title)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        serviceType === srv.title
                          ? 'border-purple-900 bg-purple-50 ring-2 ring-purple-100'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{srv.title}</div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{srv.tagline}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continue to Cargo Specifications</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CARGO SPECS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Step 2: Enter Cargo Weights & Packaging Dimensions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Cargo Commodity Category
                  </label>
                  <select
                    value={cargoCategory}
                    onChange={(e) => setCargoCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option value="Commercial Goods">Commercial Goods & Retail Wholesale</option>
                    <option value="Electronics">Electronics, Mobile & Telecommunication</option>
                    <option value="Machinery">Industrial Machinery & Heavy Spare Parts</option>
                    <option value="Clothing">Clothing, Fabrics, Textiles & Garments</option>
                    <option value="Household Items">Household Goods & Personal Effects</option>
                    <option value="Documents">Legal Documents & Contractual Papers</option>
                    <option value="Fragile Items">Fragile / Precision Instrumentation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Package Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. 5 boxes containing garments and textiles"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Physical Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Packages
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={pieces}
                    onChange={(e) => setPieces(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Total Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
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
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
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
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
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
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
              </div>

              {/* Live Weight Calculation Banner */}
              <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-950">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-purple-900" />
                  <span>
                    Chargeable Weight: <strong>{estimate.chargeableWeight} kg</strong> (Scale: {weightKg} kg vs Volumetric: {estimate.volumetricWeight} kg)
                  </span>
                </div>
                <span className="font-mono font-bold text-sm text-purple-900">
                  Est. Base: {formatPrice(estimate.baseRate)}
                </span>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Special Handling Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Keep dry, top load only, fragile glassware"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 outline-none"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Continue to Shipper & Consignee</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SHIPPER & CONSIGNEE DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Step 3: Shipper (Sender) & Consignee (Receiver) Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipper */}
                <div className="space-y-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-purple-950 uppercase">
                    Shipper / Sender Information
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Chukwuma Obi"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={senderCompany}
                      onChange={(e) => setSenderCompany(e.target.value)}
                      placeholder="e.g. Lagos Commercial Hub Ltd"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="+234..."
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="shipper@email.com"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Origin Street Address</label>
                    <input
                      type="text"
                      value={senderAddress}
                      onChange={(e) => setSenderAddress(e.target.value)}
                      placeholder="Street, District, Shop number"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Consignee */}
                <div className="space-y-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-purple-950 uppercase">
                    Consignee / Receiver Information
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      placeholder="e.g. Jean-Marc Ilunga"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={receiverCompany}
                      onChange={(e) => setReceiverCompany(e.target.value)}
                      placeholder="e.g. Kinshasa Distribution Sarl"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={receiverPhone}
                        onChange={(e) => setReceiverPhone(e.target.value)}
                        placeholder="+243..."
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        placeholder="consignee@email.cd"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Destination Delivery Address</label>
                    <input
                      type="text"
                      value={receiverAddress}
                      onChange={(e) => setReceiverAddress(e.target.value)}
                      placeholder="Avenue, Commune, Quartier"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Logistics Collection & Delivery Options */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-700 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={pickupRequired}
                    onChange={(e) => setPickupRequired(e.target.checked)}
                    className="w-4 h-4 text-purple-900 rounded accent-purple-900"
                  />
                  <span>Dispatch courier to collect from Shipper address (+${settings.pickupFeeUSD})</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={deliveryRequired}
                    onChange={(e) => setDeliveryRequired(e.target.checked)}
                    className="w-4 h-4 text-purple-900 rounded accent-purple-900"
                  />
                  <span>Direct doorstep delivery to Consignee address (+${settings.deliveryFeeUSD})</span>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Review & Complete Booking</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW, DOCUMENT UPLOAD & CONFIRMATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Step 4: Consignment Audit, Documents & Confirmation
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Summary Table */}
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="text-xs font-bold text-purple-950 uppercase border-b border-slate-200 pb-1.5">
                    Consignment Summary
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sector:</span>
                    <span className="font-bold text-slate-900">{origin} ➔ {destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-bold text-slate-900">{serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Packages:</span>
                    <span className="font-mono font-bold text-slate-900">{pieces} pkgs ({weightKg} kg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chargeable Weight:</span>
                    <span className="font-mono font-bold text-purple-950">{estimate.chargeableWeight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipper:</span>
                    <span className="font-medium text-slate-900">{senderName || 'Shipper'} ({senderPhone || 'Phone'})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Consignee:</span>
                    <span className="font-medium text-slate-900">{receiverName || 'Consignee'} ({receiverPhone || 'Phone'})</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-purple-950">
                    <span>Total Freight:</span>
                    <span className="font-mono text-base text-amber-600">{formatPrice(estimate.totalUSD)}</span>
                  </div>
                </div>

                {/* Document Upload & Payment Selector */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Upload Supporting Shipping Documents (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-purple-800 transition-colors">
                      <Upload className="w-6 h-6 text-purple-900 mx-auto mb-1" />
                      <div className="text-xs text-slate-700 font-medium">Commercial invoice, packing list or ID</div>
                      <div className="text-[10px] text-slate-400 mt-1">PDF, JPG, PNG up to 10MB</div>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="booking-doc-upload"
                      />
                      <label
                        htmlFor="booking-doc-upload"
                        className="mt-2 inline-block px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                      >
                        Choose File
                      </label>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedFiles.map((fn, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{fn}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Preferred Settlement Method
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentOption('PAY_AT_OFFICE')}
                        className={`p-2.5 rounded-lg border font-semibold text-center cursor-pointer ${
                          paymentOption === 'PAY_AT_OFFICE'
                            ? 'border-purple-900 bg-purple-50 text-purple-950 font-bold'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        Pay at Office
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentOption('BANK_TRANSFER')}
                        className={`p-2.5 rounded-lg border font-semibold text-center cursor-pointer ${
                          paymentOption === 'BANK_TRANSFER'
                            ? 'border-purple-900 bg-purple-50 text-purple-950 font-bold'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        Bank Transfer
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentOption('CARD')}
                        className={`p-2.5 rounded-lg border font-semibold text-center cursor-pointer ${
                          paymentOption === 'CARD'
                            ? 'border-purple-900 bg-purple-50 text-purple-950 font-bold'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        Instant Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleCompleteBooking}
                  className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-purple-950 font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Issue Air Waybill & Confirm Booking</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS / WAYBILL ISSUED CONFIRMATION */}
          {currentStep === 5 && confirmedShipment && (
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  CONSIGNMENT RESERVED
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  Air Cargo Consignment Successfully Booked!
                </h2>
                <p className="text-xs text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                  Your booking reference has been registered into the Dango Cargo Air Services system. Keep your Air Waybill number safe for tracking and pickup verification.
                </p>
              </div>

              {/* Waybill Badge */}
              <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl max-w-md mx-auto">
                <div className="text-[11px] font-bold uppercase tracking-widest text-purple-900">
                  OFFICIAL AIR WAYBILL (AWB) NUMBER
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-purple-950 mt-1 tracking-wider">
                  {confirmedShipment.trackingNumber}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Sector: {confirmedShipment.origin} ➔ {confirmedShipment.destination}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => setShowWaybill(true)}
                  className="px-5 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>View & Print Official Air Waybill</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedTrackingNumber(confirmedShipment.trackingNumber);
                    setActiveView('tracking');
                  }}
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Track Consignment Live</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {showWaybill && confirmedShipment && (
        <InvoiceModal
          shipment={confirmedShipment}
          onClose={() => setShowWaybill(false)}
        />
      )}
    </div>
  );
};
