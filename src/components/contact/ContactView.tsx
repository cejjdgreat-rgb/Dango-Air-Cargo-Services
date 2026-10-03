import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2,
  Plane
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, language, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Air Cargo Booking Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanWhatsAppNumber = settings.whatsappPhone.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    showToast('Your message has been sent to Dango Cargo operations desk!', 'success');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            <Plane className="w-4 h-4 text-amber-500" />
            <span>{language === 'fr' ? 'SERVICE CLIENTÈLE & TERMINAUX' : 'CONTACT & OPERATIONS HUBS'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'fr' ? 'Contactez les Équipes Dango Cargo' : 'Speak With Our Cargo Team'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Reach our leadership and dispatch desks directly in Lagos (Nigeria) and Kinshasa (DRC).
          </p>
        </div>

        {/* 2 Main Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Lagos Office Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-950 flex items-center justify-center font-bold">
                  🇳🇬
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">LAGOS, NIGERIA HUB</h3>
                  <div className="text-[11px] text-purple-900 font-semibold">West Africa Gateway</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                OPEN 08:00 – 18:00
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Physical Address:</strong>
                  <span>{settings.lagosAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900">Telephone Hotlines:</strong>
                  <div className="font-mono text-slate-800">
                    Office Main: <a href={`tel:${settings.nigeriaOfficePhone}`} className="hover:underline font-bold">{settings.nigeriaOfficePhone}</a>
                  </div>
                  <div className="font-mono text-slate-800">
                    OSSY: <a href={`tel:${settings.ossyPhone}`} className="hover:underline font-bold">{settings.ossyPhone}</a>
                  </div>
                  <div className="font-mono text-slate-800">
                    EMEKA: <a href={`tel:${settings.emekaPhone}`} className="hover:underline font-bold">{settings.emekaPhone}</a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Monday – Saturday: 08:00 – 18:00 (WAT)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`tel:${settings.nigeriaOfficePhone}`}
                className="px-4 py-2 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Lagos Office</span>
              </a>
              <a
                href={`https://wa.me/2348035507501?text=${encodeURIComponent('Hello OSSY at Dango Cargo Lagos, I would like to inquire about air cargo shipping.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with OSSY</span>
              </a>
            </div>
          </div>

          {/* Kinshasa DRC Office Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-950 flex items-center justify-center font-bold">
                  🇨🇩
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">KINSHASA, DRC HUB</h3>
                  <div className="text-[11px] text-purple-900 font-semibold">Central Africa Gateway</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                OPEN 08:00 – 18:00
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Physical Address:</strong>
                  <span>{settings.congoAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-slate-900">Director's DRC Lines:</strong>
                  {settings.directorDrcPhones.map((ph, idx) => (
                    <div key={idx} className="font-mono text-slate-800">
                      Director Desk {idx + 1}: <a href={`tel:${ph}`} className="hover:underline font-bold">{ph}</a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Monday – Saturday: 08:00 – 18:00 (CAT)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`tel:${settings.directorDrcPhones[0]}`}
                className="px-4 py-2 bg-purple-950 hover:bg-purple-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Director Desk</span>
              </a>
              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Bonjour Dango Cargo Kinshasa, je souhaite des informations sur le fret aérien.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp DRC Desk</span>
              </a>
            </div>
          </div>

        </div>

        {/* Business Enquiry Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Send an Official Cargo Enquiry
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Have questions regarding cargo reservations, customs brokerage, or corporate freight tariffs? Send a message directly to our desk.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for contacting Dango Cargo Air Services. An operations specialist will call you or reply to your inquiry shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-1.5 bg-purple-950 text-white text-xs font-semibold rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
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
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none"
                  >
                    <option value="Air Cargo Booking Inquiry">Air Cargo Booking Inquiry</option>
                    <option value="Customs & Clearance Inquiry">Customs & Clearance Inquiry</option>
                    <option value="Commercial Contract Rates">Commercial B2B Contract Rates</option>
                    <option value="Cargo Tracking Question">Cargo Tracking Question</option>
                    <option value="Pickup Request Assistance">Pickup Request Assistance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide cargo details, destination, and any specific requirements..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-purple-800"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-950 hover:bg-purple-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
