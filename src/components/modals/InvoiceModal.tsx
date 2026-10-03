import React from 'react';
import { Shipment } from '../../types';
import { useApp } from '../../context/AppContext';
import { DangoLogo } from '../brand/DangoLogo';
import { Printer, X, Download, ShieldCheck } from 'lucide-react';

interface InvoiceModalProps {
  shipment: Shipment;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ shipment, onClose }) => {
  const { settings, formatPrice } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl relative my-6 text-slate-900 animate-in zoom-in-95 duration-150">
        
        {/* Modal Controls - Hidden during print */}
        <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-950">Official Air Cargo Waybill Document</span>
            <span className="text-[11px] font-mono bg-purple-100 text-purple-950 px-2 py-0.5 rounded font-bold">
              {shipment.trackingNumber}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Air Waybill Document Body */}
        <div className="border-2 border-slate-800 p-6 rounded-xl bg-white text-xs leading-normal">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-800">
            <DangoLogo variant="invoice" />
            <div className="text-right sm:text-right w-full sm:w-auto">
              <div className="text-lg font-black tracking-tight text-purple-950 font-mono">
                AIR WAYBILL / LETTRE DE TRANSPORT
              </div>
              <div className="text-xs font-mono font-bold text-slate-700">
                AWB NO: {shipment.trackingNumber}
              </div>
              <div className="text-[10px] text-slate-500">
                Date Issued: {new Date(shipment.bookingDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Barcode & Routing Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 bg-slate-50 border-b border-slate-300 font-mono text-[11px]">
            <div className="px-2">
              <span className="text-slate-500 uppercase text-[9px] block">ORIGIN AIRPORT:</span>
              <strong className="text-slate-900">{shipment.origin}</strong>
            </div>
            <div className="px-2">
              <span className="text-slate-500 uppercase text-[9px] block">DESTINATION AIRPORT:</span>
              <strong className="text-slate-900">{shipment.destination}</strong>
            </div>
            <div className="px-2 text-right sm:text-right">
              <span className="text-slate-500 uppercase text-[9px] block">FLIGHT/CORRIDOR:</span>
              <strong className="text-purple-900">{shipment.flightOrTripNumber || 'DC-DIRECT'}</strong>
            </div>
          </div>

          {/* Simulated Vector Barcode */}
          <div className="py-2.5 flex flex-col items-center justify-center border-b border-slate-300 bg-white">
            <div className="h-10 flex items-stretch gap-1">
              {[4,2,6,1,3,5,2,4,7,1,3,2,6,4,2,5,3,6,1,4,2,5,3,4,6,2,3,5,1,4,6,2,5].map((w, i) => (
                <div key={i} className="bg-slate-900" style={{ width: `${w}px` }} />
              ))}
            </div>
            <span className="font-mono text-[10px] font-bold tracking-widest text-slate-700 mt-1">
              *{shipment.trackingNumber}*
            </span>
          </div>

          {/* Shipper & Consignee 2-Column Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b-2 border-slate-800">
            {/* Shipper */}
            <div className="p-3 border-b sm:border-b-0 sm:border-r border-slate-300">
              <div className="text-[10px] font-bold text-purple-950 uppercase mb-1">
                1. SHIPPER / EXPÉDITEUR
              </div>
              <div className="font-bold text-slate-900">{shipment.sender.name}</div>
              {shipment.sender.company && <div className="text-slate-700">{shipment.sender.company}</div>}
              <div className="text-slate-600">{shipment.sender.address}</div>
              <div className="text-slate-600">{shipment.sender.city}, {shipment.sender.country}</div>
              <div className="font-mono font-semibold text-slate-800 mt-1">Tel: {shipment.sender.phone}</div>
            </div>

            {/* Consignee */}
            <div className="p-3">
              <div className="text-[10px] font-bold text-purple-950 uppercase mb-1">
                2. CONSIGNEE / DESTINATAIRE
              </div>
              <div className="font-bold text-slate-900">{shipment.receiver.name}</div>
              {shipment.receiver.company && <div className="text-slate-700">{shipment.receiver.company}</div>}
              <div className="text-slate-600">{shipment.receiver.address}</div>
              <div className="text-slate-600">{shipment.receiver.city}, {shipment.receiver.country}</div>
              <div className="font-mono font-semibold text-slate-800 mt-1">Tel: {shipment.receiver.phone}</div>
            </div>
          </div>

          {/* Cargo Manifest Table */}
          <div className="py-3 border-b border-slate-300">
            <div className="text-[10px] font-bold text-purple-950 uppercase mb-2">
              3. CARGO SPECIFICATION & MANIFEST
            </div>
            <table className="w-full text-[11px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-mono text-[9px]">
                  <th className="py-1">Description of Goods</th>
                  <th className="py-1 text-center">Pkgs</th>
                  <th className="py-1 text-right">Actual Wt</th>
                  <th className="py-1 text-right">Vol. Wt</th>
                  <th className="py-1 text-right">Chargeable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipment.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 font-medium text-slate-800">
                      {it.description} <span className="text-slate-400 font-normal">({it.category})</span>
                    </td>
                    <td className="py-1.5 text-center font-mono">{it.pieces}</td>
                    <td className="py-1.5 text-right font-mono">{it.weightKg} kg</td>
                    <td className="py-1.5 text-right font-mono">
                      {it.lengthCm ? ((it.lengthCm * (it.widthCm || 0) * (it.heightCm || 0)) / 5000).toFixed(1) : '-'} kg
                    </td>
                    <td className="py-1.5 text-right font-mono font-bold">{it.weightKg} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charges and Totals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b border-slate-300">
            <div>
              <div className="text-[10px] font-bold text-purple-950 uppercase mb-1">
                Handling Notes & Instructions
              </div>
              <p className="text-[10px] text-slate-600 italic">
                {shipment.specialInstructions || 'Standard air cargo handling protocols apply. Dangerous goods strictly segregated.'}
              </p>
              <div className="mt-2 text-[10px] font-mono text-slate-500">
                Lagos Hub: {settings.lagosAddress}
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Kinshasa Hub: {settings.congoAddress}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Chargeable Weight:</span>
                <span className="font-bold text-slate-900">{shipment.chargeableWeightKg} kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tariff Rate:</span>
                <span>${settings.standardRatePerKgUSD}/kg</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Status:</span>
                <span className="font-bold text-emerald-700">{shipment.paymentStatus}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-300 font-bold text-sm text-purple-950">
                <span>Total Freight Amount:</span>
                <span>{formatPrice(shipment.totalAmountUSD)}</span>
              </div>
            </div>
          </div>

          {/* Signatures & Official Stamp */}
          <div className="pt-4 grid grid-cols-2 gap-6 text-[10px] text-slate-600">
            <div>
              <div className="border-b border-slate-400 h-8 mb-1" />
              <div>Shipper / Agent Authorized Signature</div>
            </div>
            <div className="text-right">
              <div className="border-b border-slate-400 h-8 mb-1" />
              <div>Dango Cargo Air Services Stamp & Verification</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
