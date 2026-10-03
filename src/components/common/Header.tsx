import React, { useState } from 'react';
import { DangoLogo } from '../brand/DangoLogo';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  PhoneCall, 
  ChevronDown
} from 'lucide-react';
import { SupportedLanguage, SupportedCurrency } from '../../types';

export const Header: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    currentUser, 
    selectedTrackingNumber,
    setSelectedTrackingNumber,
    settings 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');
  const [showQuickTrack, setShowQuickTrack] = useState(false);

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      setSelectedTrackingNumber(quickTrackInput.trim().toUpperCase());
      setActiveView('tracking');
      setShowQuickTrack(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: language === 'fr' ? 'Accueil' : 'Home' },
    { id: 'services', label: language === 'fr' ? 'Services' : 'Services' },
    { id: 'tracking', label: language === 'fr' ? 'Suivi' : 'Tracking' },
    { id: 'quote', label: language === 'fr' ? 'Devis' : 'Get Quote' },
    { id: 'destinations', label: language === 'fr' ? 'Destinations' : 'Destinations' },
    { id: 'about', label: language === 'fr' ? 'À Propos' : 'About' },
    { id: 'contact', label: language === 'fr' ? 'Contact' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top utility strip for official communication channels */}
      <div className="bg-purple-950 text-purple-100 text-xs py-1.5 px-4 sm:px-8 border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <span>✈</span> {language === 'fr' ? 'Corridor Direct Aérien' : 'Direct Air Corridor'} : Lagos (LOS) ⇄ Kinshasa (FIH)
            </span>
            <span className="hidden md:inline-block text-purple-400">·</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>NGR: {settings.nigeriaOfficePhone}</span>
              <span className="text-purple-400 ml-1">·</span>
              <span className="ml-1">DRC: {settings.directorDrcPhones[0]}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px] sm:text-xs">
            {/* Currency Switcher */}
            <div className="flex items-center gap-1 bg-purple-900/80 px-2 py-0.5 rounded text-amber-300 font-mono">
              <span>Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                aria-label="Currency"
                className="bg-transparent text-white font-semibold cursor-pointer outline-none text-xs"
              >
                <option value="USD" className="text-slate-900">USD ($)</option>
                <option value="NGN" className="text-slate-900">NGN (₦)</option>
                <option value="CDF" className="text-slate-900">CDF (FC)</option>
              </select>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-colors ${language === 'en' ? 'bg-amber-400 text-purple-950 font-bold' : 'text-purple-200 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-purple-400">/</span>
              <button 
                onClick={() => setLanguage('fr')}
                className={`px-1.5 py-0.5 rounded transition-colors ${language === 'fr' ? 'bg-amber-400 text-purple-950 font-bold' : 'text-purple-200 hover:text-white'}`}
              >
                FR
              </button>
            </div>

            {/* Admin or Portal Quick Access */}
            <button
              onClick={() => handleNavClick(currentUser?.role === 'ADMIN' ? 'admin' : 'portal')}
              className="text-purple-200 hover:text-amber-300 transition-colors flex items-center gap-1 ml-2 font-medium"
            >
              <User className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">
                {currentUser ? (currentUser.role === 'ADMIN' ? 'Admin Hub' : currentUser.name.split(' ')[0]) : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Primary CTAs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Lockup Wordmark */}
        <button 
          onClick={() => handleNavClick('home')}
          className="text-left focus-visible:outline-2 focus-visible:outline-purple-800 rounded-md"
        >
          <DangoLogo variant="header" />
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-purple-950 font-semibold' 
                    : 'text-slate-600 hover:text-purple-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Quick Track & Book Shipment) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Quick Track Input Bar Button */}
          <div className="relative">
            {showQuickTrack ? (
              <form onSubmit={handleQuickTrackSubmit} className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-300">
                <input
                  type="text"
                  placeholder="DCA-2026-..."
                  value={quickTrackInput}
                  onChange={(e) => setQuickTrackInput(e.target.value)}
                  className="w-32 sm:w-38 px-2 py-1 text-xs font-mono bg-transparent outline-none uppercase placeholder:normal-case"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-xs font-semibold bg-purple-950 text-white rounded hover:bg-purple-900 transition-colors"
                >
                  Go
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickTrack(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowQuickTrack(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Quick Track"
              >
                <Search className="w-3.5 h-3.5 text-purple-900" />
                <span className="font-mono">Track</span>
              </button>
            )}
          </div>

          {/* Book A Shipment Primary CTA */}
          <button
            onClick={() => handleNavClick('booking')}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-purple-950 hover:bg-purple-900 active:bg-purple-950 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border border-purple-900"
          >
            <span>{language === 'fr' ? 'RÉSERVER UN FRET' : 'BOOK A SHIPMENT'}</span>
            <span className="text-amber-400">→</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('tracking')}
            className="p-2 text-slate-700 bg-slate-100 rounded-lg"
            title="Track"
          >
            <Search className="w-4 h-4 text-purple-950" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-purple-950 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl px-4 py-5 animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleQuickTrackSubmit} className="mb-4">
            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg border border-slate-300">
              <Search className="w-4 h-4 text-purple-900 shrink-0" />
              <input
                type="text"
                placeholder={language === 'fr' ? 'Numéro de suivi (ex: DCA-2026-001089)' : 'Enter tracking number (e.g. DCA-2026-001089)'}
                value={quickTrackInput}
                onChange={(e) => setQuickTrackInput(e.target.value)}
                className="w-full text-xs font-mono uppercase bg-transparent outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold bg-purple-950 text-white rounded shrink-0"
              >
                Track
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === link.id
                    ? 'bg-purple-50 text-purple-950 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full py-3 text-center text-sm font-bold text-white bg-purple-950 rounded-lg shadow-sm"
            >
              {language === 'fr' ? 'RÉSERVER UN FRET AÉRIEN' : 'BOOK A SHIPMENT'}
            </button>

            <button
              onClick={() => handleNavClick('pickup')}
              className="w-full py-2.5 text-center text-xs font-semibold text-purple-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              {language === 'fr' ? 'Demander un Enlèvement à Domicile' : 'Request Doorstep Cargo Pickup'}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
              <span>{language === 'fr' ? 'Espace Client' : 'Portal'}:</span>
              <button 
                onClick={() => handleNavClick('portal')}
                className="text-purple-900 font-semibold underline"
              >
                {currentUser ? currentUser.name : 'Customer Login / Register'}
              </button>
              <button 
                onClick={() => handleNavClick('admin')}
                className="text-slate-600 font-mono text-[11px] underline"
              >
                Admin Hub
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
