import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQS } from '../../data/initialData';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, PhoneCall } from 'lucide-react';

export const FAQView: React.FC = () => {
  const { language, settings, setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Shipping', 'Tracking', 'Pricing', 'Compliance', 'Services', 'Support'];

  const filteredFaqs = FAQS.filter(faq => {
    const qText = language === 'fr' ? faq.frenchQ : faq.q;
    const aText = language === 'fr' ? faq.frenchA : faq.a;
    const matchesSearch = qText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          aText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cleanWhatsAppNumber = settings.whatsappPhone.replace(/[^0-9]/g, '');

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'FOIRE AUX QUESTIONS' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Centre d\'Aide & Informations de Fret' : 'Air Freight Guidance & Knowledge Base'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Clear, transparent answers regarding air cargo shipping, customs documentation, tracking, and operational procedures.
          </p>

          {/* Search Input */}
          <div className="mt-6 relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search shipping questions, volumetric rates, tracking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:border-purple-800 shadow-xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-950 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {language === 'fr' ? faq.frenchQ : faq.q}
                    </span>
                    <span className="p-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      <p>{language === 'fr' ? faq.frenchA : faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl p-8 text-center text-xs text-slate-500">
              No answers matching your search criteria. Please try another phrase or speak directly with our team.
            </div>
          )}
        </div>

        {/* Contact Support Banner */}
        <div className="mt-12 bg-purple-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-base font-bold">Have a Specific Operational Question?</h3>
            <p className="text-xs text-purple-200 mt-1">
              Speak directly with our DRC Director Desk or Lagos Operations Team for real-time cargo assistance.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Hello Dango Cargo Air Services, I have an inquiry about air freight shipping.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>
            <button
              onClick={() => setActiveView('contact')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs font-bold rounded-xl"
            >
              Contact Hubs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
