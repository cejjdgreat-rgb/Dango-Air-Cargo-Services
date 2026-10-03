import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shipment, ShipmentStatus, TimelineEvent, QuoteRequest, PickupRequest } from '../../types';
import { 
  LayoutDashboard, 
  Package, 
  Calculator, 
  Truck, 
  DollarSign, 
  Settings as SettingsIcon, 
  Plus, 
  Search, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Printer, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Save,
  Users,
  ShieldCheck,
  X
} from 'lucide-react';
import { InvoiceModal } from '../modals/InvoiceModal';

export const AdminDashboard: React.FC = () => {
  const { 
    shipments, 
    quotes, 
    pickups, 
    settings, 
    updateSettings, 
    updateShipmentStatus, 
    addTimelineEvent,
    updateQuoteStatus, 
    convertQuoteToShipment, 
    updatePickupStatus, 
    formatPrice,
    setSelectedTrackingNumber,
    setActiveView,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SHIPMENTS' | 'QUOTES' | 'PICKUPS' | 'FINANCE' | 'SETTINGS'>('OVERVIEW');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShipmentForModal, setSelectedShipmentForModal] = useState<Shipment | null>(null);
  const [statusUpdateModalShipment, setStatusUpdateModalShipment] = useState<Shipment | null>(null);

  // Status Update Modal State
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('IN_TRANSIT');
  const [newLocation, setNewLocation] = useState('');
  const [newNote, setNewNote] = useState('');

  // Editable settings copy
  const [editableSettings, setEditableSettings] = useState(settings);

  // KPIs
  const totalShipments = shipments.length;
  const activeShipments = shipments.filter(s => ['BOOKED', 'RECEIVED', 'PROCESSING', 'PACKED', 'IN_TRANSIT', 'ARRIVED_DESTINATION', 'OUT_FOR_DELIVERY'].includes(s.status)).length;
  const deliveredShipments = shipments.filter(s => s.status === 'DELIVERED').length;
  const pendingQuotes = quotes.filter(q => q.status === 'PENDING_REVIEW').length;
  const totalRevenue = shipments.reduce((acc, curr) => acc + (curr.paymentStatus === 'PAID' ? curr.totalAmountUSD : 0), 0);
  const pendingPayments = shipments.filter(s => s.paymentStatus === 'PENDING').reduce((acc, curr) => acc + curr.totalAmountUSD, 0);

  const handleApplyStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusUpdateModalShipment) return;

    updateShipmentStatus(
      statusUpdateModalShipment.trackingNumber,
      newStatus,
      newLocation || statusUpdateModalShipment.currentLocation,
      newNote
    );

    setStatusUpdateModalShipment(null);
    setNewNote('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(editableSettings);
  };

  const filteredShipments = shipments.filter(s => 
    s.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.receiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-8 bg-slate-100 min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Admin Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Operations & Freight Administration Console
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live manifest management for Nigeria (LOS) ⇄ Kinshasa (FIH) air corridors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('booking')}
              className="px-3.5 py-2 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Create AWB Waybill</span>
            </button>
            <button
              onClick={() => setActiveView('home')}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Public Site
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl mb-8 overflow-x-auto">
          {[
            { id: 'OVERVIEW', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'SHIPMENTS', label: `Shipments (${shipments.length})`, icon: Package },
            { id: 'QUOTES', label: `Quotes Queue (${quotes.length})`, icon: Calculator },
            { id: 'PICKUPS', label: `Doorstep Pickups (${pickups.length})`, icon: Truck },
            { id: 'FINANCE', label: 'Financial Ledger', icon: DollarSign },
            { id: 'SETTINGS', label: 'Tariff & Company Settings', icon: SettingsIcon },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-purple-950 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-8 animate-in fade-in-50 duration-150">
            
            {/* KPI Metrics Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Consignments</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-purple-950 mt-1">{totalShipments}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">Airwaybills logged</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active in Transit</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-blue-600 mt-1">{activeShipments}</div>
                <div className="text-[10px] text-blue-500 mt-1">Staged / Airborne / Hub</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Delivered & Signed</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 mt-1">{deliveredShipments}</div>
                <div className="text-[10px] text-emerald-500 mt-1">Destination verified</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Collected Revenue</div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-500 mt-1">{formatPrice(totalRevenue)}</div>
                <div className="text-[10px] text-slate-400 mt-1">Pending: {formatPrice(pendingPayments)}</div>
              </div>
            </div>

            {/* Recent Shipments Overview Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Recent Airwaybills on Manifest</h2>
                  <p className="text-xs text-slate-500">Live operational status across terminals.</p>
                </div>
                <button
                  onClick={() => setActiveTab('SHIPMENTS')}
                  className="text-xs font-bold text-purple-900 hover:underline"
                >
                  View All Shipments →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                      <th className="py-3 px-6">Tracking / AWB</th>
                      <th className="py-3 px-4">Sector</th>
                      <th className="py-3 px-4">Shipper / Consignee</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-6 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {shipments.slice(0, 5).map(s => (
                      <tr key={s.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-6 font-mono font-bold text-purple-950">
                          {s.trackingNumber}
                        </td>
                        <td className="py-3.5 px-4 text-slate-800 font-medium">
                          {s.origin.split(',')[0]} ➔ {s.destination.split(',')[0]}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <div className="font-semibold text-slate-800">{s.sender.name}</div>
                          <div className="text-[10px] text-slate-400">➔ {s.receiver.name}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-950 border border-purple-200">
                            {s.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 truncate max-w-[200px]">
                          {s.currentLocation}
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={() => {
                              setStatusUpdateModalShipment(s);
                              setNewStatus(s.status);
                              setNewLocation(s.currentLocation);
                            }}
                            className="px-2.5 py-1 bg-purple-950 hover:bg-purple-900 text-white rounded text-[11px] font-bold"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dual Grid: Pending Quotes & Pending Pickups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Quotes */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Pending Quotes ({pendingQuotes})
                  </h3>
                  <button onClick={() => setActiveTab('QUOTES')} className="text-xs text-purple-900 font-bold hover:underline">
                    Manage →
                  </button>
                </div>
                <div className="space-y-3">
                  {quotes.slice(0, 3).map(q => (
                    <div key={q.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{q.customerName} ({q.cargoType})</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {q.origin.split(',')[0]} ➔ {q.destination.split(',')[0]} · {q.weightKg} kg
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-purple-950">{formatPrice(q.estimatedAmountUSD)}</div>
                        <button
                          onClick={() => convertQuoteToShipment(q.id)}
                          className="mt-1 px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold"
                        >
                          Convert to AWB
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickups */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Scheduled Doorstep Collections ({pickups.length})
                  </h3>
                  <button onClick={() => setActiveTab('PICKUPS')} className="text-xs text-purple-900 font-bold hover:underline">
                    Manage →
                  </button>
                </div>
                <div className="space-y-3">
                  {pickups.slice(0, 3).map(p => (
                    <div key={p.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{p.customerName} ({p.city})</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{p.pickupAddress}</div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                          {p.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono">{p.preferredDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SHIPMENTS MANAGER */}
        {activeTab === 'SHIPMENTS' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden animate-in fade-in-50 duration-150">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Shipment Manifest Database</h2>
                <p className="text-xs text-slate-500">Edit milestones, change statuses, and print waybills.</p>
              </div>

              {/* Search */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter AWB, customer, route..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-800"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                    <th className="py-3 px-6">Air Waybill (AWB)</th>
                    <th className="py-3 px-4">Flight Route</th>
                    <th className="py-3 px-4">Shipper / Sender</th>
                    <th className="py-3 px-4">Consignee</th>
                    <th className="py-3 px-4">Weight</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredShipments.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/80">
                      <td className="py-4 px-6 font-mono font-bold text-purple-950">
                        <div>{s.trackingNumber}</div>
                        <div className="text-[10px] font-sans text-slate-400">
                          {new Date(s.bookingDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-800">
                        {s.origin.split(',')[0]} ➔ {s.destination.split(',')[0]}
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="font-bold">{s.sender.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{s.sender.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="font-bold">{s.receiver.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{s.receiver.phone}</div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-900">
                        {s.chargeableWeightKg} kg
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'DELIVERED' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : s.status === 'IN_TRANSIT'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                        }`}>
                          {s.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => {
                            setStatusUpdateModalShipment(s);
                            setNewStatus(s.status);
                            setNewLocation(s.currentLocation);
                          }}
                          className="px-2.5 py-1.5 bg-purple-950 text-white hover:bg-purple-900 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Update Status
                        </button>
                        <button
                          onClick={() => setSelectedShipmentForModal(s)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                          title="Print Air Waybill"
                        >
                          <Printer className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: QUOTES MANAGER */}
        {activeTab === 'QUOTES' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden animate-in fade-in-50 duration-150">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Customer Quote Requests</h2>
              <p className="text-xs text-slate-500">Approve, reject, or convert requests directly into live shipments.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                    <th className="py-3 px-6">Quote ID</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Sector</th>
                    <th className="py-3 px-4">Specs</th>
                    <th className="py-3 px-4">Estimated Tariff</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quotes.map(q => (
                    <tr key={q.id} className="hover:bg-slate-50/80">
                      <td className="py-4 px-6 font-mono font-bold text-purple-950">
                        #{q.id}
                        <div className="text-[10px] font-sans text-slate-400">{q.requestDate}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800">{q.customerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{q.phone}</div>
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-800">
                        {q.origin.split(',')[0]} ➔ {q.destination.split(',')[0]}
                      </td>
                      <td className="py-4 px-4 font-mono">
                        <div>{q.weightKg} kg · {q.pieces} pkgs</div>
                        <div className="text-[10px] text-slate-400">{q.cargoType}</div>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-purple-950">
                        {formatPrice(q.estimatedAmountUSD)}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'CONVERTED'
                            ? 'bg-emerald-50 text-emerald-700'
                            : q.status === 'APPROVED'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                        }`}>
                          {q.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {q.status !== 'CONVERTED' && (
                          <button
                            onClick={() => convertQuoteToShipment(q.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold"
                          >
                            Convert to AWB
                          </button>
                        )}
                        {q.status === 'PENDING_REVIEW' && (
                          <button
                            onClick={() => updateQuoteStatus(q.id, 'APPROVED')}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PICKUP REQUESTS */}
        {activeTab === 'PICKUPS' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden animate-in fade-in-50 duration-150">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Doorstep Collection Fleet Queue</h2>
              <p className="text-xs text-slate-500">Dispatch box vans across Lagos and Kinshasa.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                    <th className="py-3 px-6">ID & Date</th>
                    <th className="py-3 px-4">Client Contact</th>
                    <th className="py-3 px-4">City & Address</th>
                    <th className="py-3 px-4">Cargo & Weight</th>
                    <th className="py-3 px-4">Preferred Slot</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-6 text-right">Dispatch Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pickups.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80">
                      <td className="py-4 px-6 font-mono font-bold text-purple-950">
                        #{p.id}
                        <div className="text-[10px] font-sans text-slate-400">{p.requestDate}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-800">{p.customerName}</div>
                        <div className="text-[10px] font-mono text-slate-500">{p.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="font-bold text-purple-900">{p.city}, {p.country}</div>
                        <div className="text-[11px] text-slate-600 max-w-[200px] truncate">{p.pickupAddress}</div>
                      </td>
                      <td className="py-4 px-4 font-mono">
                        <div>~{p.estimatedWeightKg} kg</div>
                        <div className="text-[10px] text-slate-400">{p.packageCount} pkgs ({p.cargoType})</div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="font-semibold">{p.preferredDate}</div>
                        <div className="text-[10px] text-slate-500">{p.preferredTimeWindow}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-1.5">
                        {p.status === 'SCHEDULED' && (
                          <button
                            onClick={() => updatePickupStatus(p.id, 'DISPATCHED')}
                            className="px-2.5 py-1 bg-purple-950 text-white rounded text-[11px] font-semibold"
                          >
                            Dispatch Van
                          </button>
                        )}
                        {p.status === 'DISPATCHED' && (
                          <button
                            onClick={() => updatePickupStatus(p.id, 'COLLECTED')}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-semibold"
                          >
                            Mark Collected
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: FINANCIAL LEDGER */}
        {activeTab === 'FINANCE' && (
          <div className="space-y-6 animate-in fade-in-50 duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="text-xs uppercase font-bold text-slate-500">Collected Freight Revenue</div>
                <div className="text-2xl font-black font-mono text-emerald-600 mt-1">{formatPrice(totalRevenue)}</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="text-xs uppercase font-bold text-slate-500">Pending Customer Settlements</div>
                <div className="text-2xl font-black font-mono text-amber-600 mt-1">{formatPrice(pendingPayments)}</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="text-xs uppercase font-bold text-slate-500">Configured Standard Rate</div>
                <div className="text-2xl font-black font-mono text-purple-950 mt-1">${settings.standardRatePerKgUSD}/kg</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Freight Billing Summary by Waybill</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                      <th className="py-2.5 px-4">AWB Reference</th>
                      <th className="py-2.5 px-4">Customer</th>
                      <th className="py-2.5 px-4">Payment Status</th>
                      <th className="py-2.5 px-4 text-right">Freight Amount (USD)</th>
                      <th className="py-2.5 px-4 text-right">Local Conversion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {shipments.map(s => (
                      <tr key={s.id}>
                        <td className="py-3 px-4 font-mono font-bold text-purple-950">{s.trackingNumber}</td>
                        <td className="py-3 px-4 text-slate-800">{s.sender.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {s.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                          ${s.totalAmountUSD.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-600">
                          {formatPrice(s.totalAmountUSD)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'SETTINGS' && (
          <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in fade-in-50 duration-150">
            <div>
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Operational & Pricing Configurations
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Edit tariff rates, volumetric divisors, official phone numbers, and hub addresses without code edits.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Phone Numbers */}
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-purple-950 uppercase">Official Station Phone Numbers</div>
                
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nigeria Main Office Phone</label>
                  <input
                    type="text"
                    value={editableSettings.nigeriaOfficePhone}
                    onChange={(e) => setEditableSettings({ ...editableSettings, nigeriaOfficePhone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">OSSY (Nigeria Dispatch)</label>
                  <input
                    type="text"
                    value={editableSettings.ossyPhone}
                    onChange={(e) => setEditableSettings({ ...editableSettings, ossyPhone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">EMEKA (Nigeria Operations)</label>
                  <input
                    type="text"
                    value={editableSettings.emekaPhone}
                    onChange={(e) => setEditableSettings({ ...editableSettings, emekaPhone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Director DRC Line 1</label>
                  <input
                    type="text"
                    value={editableSettings.directorDrcPhones[0] || ''}
                    onChange={(e) => {
                      const updated = [...editableSettings.directorDrcPhones];
                      updated[0] = e.target.value;
                      setEditableSettings({ ...editableSettings, directorDrcPhones: updated });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Director DRC Line 2</label>
                  <input
                    type="text"
                    value={editableSettings.directorDrcPhones[1] || ''}
                    onChange={(e) => {
                      const updated = [...editableSettings.directorDrcPhones];
                      updated[1] = e.target.value;
                      setEditableSettings({ ...editableSettings, directorDrcPhones: updated });
                    }}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                  />
                </div>
              </div>

              {/* Tariffs & Exchange Rates */}
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-purple-950 uppercase">Tariff Rates & Currency Multipliers</div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Std Rate ($/kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editableSettings.standardRatePerKgUSD}
                      onChange={(e) => setEditableSettings({ ...editableSettings, standardRatePerKgUSD: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Express Rate ($/kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editableSettings.expressRatePerKgUSD}
                      onChange={(e) => setEditableSettings({ ...editableSettings, expressRatePerKgUSD: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Min Charge ($)</label>
                    <input
                      type="number"
                      value={editableSettings.minimumChargeUSD}
                      onChange={(e) => setEditableSettings({ ...editableSettings, minimumChargeUSD: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Volumetric Divisor</label>
                    <input
                      type="number"
                      value={editableSettings.volumetricDivisor}
                      onChange={(e) => setEditableSettings({ ...editableSettings, volumetricDivisor: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">1 USD = NGN</label>
                    <input
                      type="number"
                      value={editableSettings.exchangeRates.USD_TO_NGN}
                      onChange={(e) => setEditableSettings({
                        ...editableSettings,
                        exchangeRates: { ...editableSettings.exchangeRates, USD_TO_NGN: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">1 USD = CDF</label>
                    <input
                      type="number"
                      value={editableSettings.exchangeRates.USD_TO_CDF}
                      onChange={(e) => setEditableSettings({
                        ...editableSettings,
                        exchangeRates: { ...editableSettings.exchangeRates, USD_TO_CDF: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Lagos Hub Address</label>
                  <input
                    type="text"
                    value={editableSettings.lagosAddress}
                    onChange={(e) => setEditableSettings({ ...editableSettings, lagosAddress: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Congo / DRC Address</label>
                  <input
                    type="text"
                    value={editableSettings.congoAddress}
                    onChange={(e) => setEditableSettings({ ...editableSettings, congoAddress: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save All System & Pricing Settings</span>
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Modal: Update Status */}
      {statusUpdateModalShipment && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setStatusUpdateModalShipment(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              Update AWB Status: {statusUpdateModalShipment.trackingNumber}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Status changes immediately reflect on the public customer tracking portal.
            </p>

            <form onSubmit={handleApplyStatusUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Milestone Stage</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none font-bold"
                >
                  <option value="BOOKED">1. BOOKED</option>
                  <option value="RECEIVED">2. RECEIVED (At Terminal)</option>
                  <option value="PROCESSING">3. PROCESSING (Customs / Security)</option>
                  <option value="PACKED">4. PACKED (On Aircraft Pallet)</option>
                  <option value="IN_TRANSIT">5. IN TRANSIT (Flight Airborne)</option>
                  <option value="ARRIVED_DESTINATION">6. ARRIVED DESTINATION (Tarmac Released)</option>
                  <option value="OUT_FOR_DELIVERY">7. OUT FOR DELIVERY (Dispatch Van)</option>
                  <option value="DELIVERED">8. DELIVERED (Signed & Handed Over)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Physical Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Kinshasa N'Djili International Airport (FIH)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Milestone Description / Station Note</label>
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="e.g. Offloaded from flight DC-742 and cleared customs scan."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStatusUpdateModalShipment(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs"
                >
                  Apply & Log Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {selectedShipmentForModal && (
        <InvoiceModal
          shipment={selectedShipmentForModal}
          onClose={() => setSelectedShipmentForModal(null)}
        />
      )}

    </div>
  );
};
