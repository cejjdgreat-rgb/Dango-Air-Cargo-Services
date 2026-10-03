import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Package, 
  FileText, 
  Printer, 
  Search, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck,
  ArrowRight,
  Plus
} from 'lucide-react';
import { InvoiceModal } from '../modals/InvoiceModal';
import { Shipment } from '../../types';

export const CustomerPortal: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    shipments, 
    setSelectedTrackingNumber, 
    setActiveView, 
    formatPrice,
    showToast 
  } = useApp();

  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedInvoiceShipment, setSelectedInvoiceShipment] = useState<Shipment | null>(null);

  // Authenticate demo user or custom
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    const user = {
      id: `usr-${Date.now()}`,
      name: emailInput.includes('afritech') ? 'Chukwudi Okafor' : 'Valued Customer',
      email: emailInput,
      phone: '+234 803 550 7501',
      role: 'CUSTOMER' as const,
      company: 'AfriTech Supplies Ltd'
    };

    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput || !emailInput) return;

    const user = {
      id: `usr-${Date.now()}`,
      name: nameInput,
      email: emailInput,
      phone: phoneInput || '+234 000 0000',
      role: 'CUSTOMER' as const
    };

    setCurrentUser(user);
    showToast(`Account created successfully for ${user.name}!`, 'success');
  };

  const handleDemoLogin = (type: 'shipper' | 'admin') => {
    if (type === 'admin') {
      setCurrentUser({
        id: 'adm-001',
        name: 'Chief Logistics Administrator',
        email: 'operations@dangocargo.com',
        phone: '+234 803 550 7501',
        role: 'ADMIN',
        company: 'Dango Cargo Air Services'
      });
      setActiveView('admin');
      showToast('Authenticated as Administrator', 'info');
    } else {
      setCurrentUser({
        id: 'usr-001',
        name: 'Chukwudi Okafor',
        email: 'c.okafor@afritech.ng',
        phone: '+234 803 550 7501',
        role: 'CUSTOMER',
        company: 'AfriTech Supplies Ltd'
      });
      showToast('Logged into customer portal', 'success');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
  };

  // If not logged in, show authentication box
  if (!currentUser) {
    return (
      <div className="py-16 bg-slate-50 min-h-[85vh] flex items-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-950 rounded-xl flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {authMode === 'LOGIN' ? 'Customer Account Sign In' : 'Create Customer Account'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Access your real-time Air Waybill manifests, track consignments, and download official invoices.
              </p>
            </div>

            {authMode === 'LOGIN' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email or Client ID</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. c.okafor@afritech.ng"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-800"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Sign In to Portal
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+234... or +243..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Create Account
                </button>
              </form>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              {authMode === 'LOGIN' ? (
                <>
                  <span>Need an account?</span>
                  <button 
                    onClick={() => setAuthMode('REGISTER')}
                    className="text-purple-900 font-bold hover:underline"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  <span>Already registered?</span>
                  <button 
                    onClick={() => setAuthMode('LOGIN')}
                    className="text-purple-900 font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>

            {/* Quick Demo Switcher */}
            <div className="pt-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Instant Demo Access (Testing):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDemoLogin('shipper')}
                  className="px-2.5 py-1.5 bg-white hover:bg-purple-50 border border-slate-300 rounded text-slate-800 text-[11px] font-semibold text-center"
                >
                  Demo Shipper
                </button>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className="px-2.5 py-1.5 bg-purple-900 text-white rounded text-[11px] font-semibold text-center"
                >
                  Admin Console
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Customer View
  return (
    <div className="py-10 bg-slate-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Account Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-950 text-amber-400 flex items-center justify-center font-bold text-base shadow-xs">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-950 px-2 py-0.5 rounded font-bold">
                  {currentUser.role}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {currentUser.email} · {currentUser.phone}
                {currentUser.company && ` · ${currentUser.company}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('booking')}
              className="px-4 py-2 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Book New Shipment</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Shipments List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Consignments & Air Waybills</h2>
              <p className="text-xs text-slate-500">Track milestones and download official commercial documents.</p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-950 bg-purple-50 px-2.5 py-1 rounded-md">
              Total: {shipments.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase font-mono text-[10px] border-b border-slate-200">
                  <th className="py-3 px-6">Tracking / AWB</th>
                  <th className="py-3 px-4">Flight Sector</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Weight / Pcs</th>
                  <th className="py-3 px-4">Tariff</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-purple-950">
                      <div>{s.trackingNumber}</div>
                      <div className="text-[10px] font-sans font-normal text-slate-400">
                        {new Date(s.bookingDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      <div>{s.origin.split(',')[0]} ➔ {s.destination.split(',')[0]}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                        Rec: {s.receiver.name}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {s.serviceType}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === 'DELIVERED' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : s.status === 'IN_TRANSIT'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{s.status.replace(/_/g, ' ')}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono">
                      <div>{s.chargeableWeightKg} kg</div>
                      <div className="text-[10px] text-slate-400">{s.totalPieces} pkgs</div>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">
                      {formatPrice(s.totalAmountUSD)}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTrackingNumber(s.trackingNumber);
                          setActiveView('tracking');
                        }}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-950 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        Track
                      </button>
                      <button
                        onClick={() => setSelectedInvoiceShipment(s)}
                        className="px-2.5 py-1.5 bg-purple-950 text-white hover:bg-purple-900 rounded-lg font-semibold transition-colors cursor-pointer"
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

      </div>

      {selectedInvoiceShipment && (
        <InvoiceModal
          shipment={selectedInvoiceShipment}
          onClose={() => setSelectedInvoiceShipment(null)}
        />
      )}
    </div>
  );
};
