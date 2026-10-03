import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  pageType: 'privacy' | 'terms';
}

export const LegalPages: React.FC<LegalPageProps> = ({ pageType }) => {
  const { settings, setActiveView } = useApp();

  if (pageType === 'privacy') {
    return (
      <div className="py-12 bg-slate-50 min-h-[85vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold uppercase text-purple-900">LEGAL COMPLIANCE</span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">Privacy & Data Protection Policy</h1>
              <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026 · DANGO CARGO AIR SERVICES</p>
            </div>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                To issue authenticated Air Waybills (AWBs), process customs manifests, and execute door-to-door deliveries between Nigeria, the Democratic Republic of Congo (DRC), and international corridors, <strong>DANGO CARGO AIR SERVICES</strong> collects shipper and consignee names, telephone numbers, physical addresses, identification details, commercial invoices, and cargo descriptions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Utilization of Consignment Data</h2>
              <p>
                Your consignment information is strictly used for air cargo manifest generation, airport security screening, civil aviation regulatory compliance, customs clearance filings in Lagos and Kinshasa, real-time shipment milestone notifications, and invoicing. We do not sell or monetize client logistical data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Customs & Border Authorities Disclosures</h2>
              <p>
                In strict compliance with statutory aviation and border protection regulations in Nigeria (Nigeria Customs Service / FAAN) and the Democratic Republic of Congo (DGDA / RVA), cargo manifests and declared commercial values are filed with authorized airport security and customs authorities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. Physical & Document Security</h2>
              <p>
                Commercial invoices, airwaybill archives, and customer documents are safeguarded against unauthorized physical or electronic access in accordance with international logistics standards.
              </p>
            </section>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Official contact: {settings.supportEmail}</span>
              <button
                onClick={() => setActiveView('home')}
                className="text-purple-950 font-bold hover:underline"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold uppercase text-purple-900">CIVIL AVIATION & FREIGHT CONTRACT</span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Air Cargo Shipping Terms & Conditions</h1>
            <p className="text-xs text-slate-500 mt-1">Standard Conditions of Carriage · DANGO CARGO AIR SERVICES</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Principle of Chargeable Weight</h2>
            <p>
              Under international air transportation regulations (IATA conventions), all air cargo tariffs are assessed on the <strong>Chargeable Weight</strong>, defined as the greater of actual scale gross weight (kg) or volumetric weight (calculated via Length × Width × Height in cm divided by the standard divisor of 5,000).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>2. Strictly Prohibited & Restricted Dangerous Goods</span>
            </h2>
            <p>
              Shippers strictly warrant that consignments contain zero prohibited or hazardous items. Prohibited items include: explosives, fireworks, flammable liquids, pressurized gases, corrosive chemicals, lithium batteries without prior dangerous goods classification, perishable goods without refrigeration clearance, and contraband.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Customs Clearance & Tariffs</h2>
            <p>
              Standard tariffs cover airport-to-airport or door-to-door transportation. Applicable import duties, statutory destination taxes, or physical inspection fees assessed by customs bodies (Nigeria Customs Service / DGDA Congo) remain the responsibility of the cargo owner or consignee unless expressly included in an all-in corporate contract.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Inspection & Security Screening</h2>
            <p>
              All shipments presented to Dango Cargo Air Services terminals at Lagos (God's Favour Plaza Shop 5) or Kinshasa (Av Dodoma 54) are subject to mandatory X-ray security scanning, explosive trace detection, and physical cargo inspection by authorized aviation security personnel.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Limitation of Liability & Cargo Insurance</h2>
            <p>
              Liability for loss or damage during carriage is governed by international convention limits unless an enhanced declared commercial value and freight insurance premium has been confirmed on the face of the Air Waybill prior to aircraft departure.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Operating between Nigeria & DRC</span>
            <button
              onClick={() => setActiveView('home')}
              className="text-purple-950 font-bold hover:underline"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
