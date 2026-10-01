import React, { useState } from 'react';
import { Phone, ShieldCheck, CheckCircle2, MessageSquare, Sparkles, Copy, Check } from 'lucide-react';
import { BRAND_DATA, INTERIOR_SERVICES } from '../data/rajData';

export const DirectContact: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['furniture-work', 'modular-kitchen']);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleWhatsAppConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceTitles = selectedServices
      .map(id => INTERIOR_SERVICES.find(s => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const message = `Hello Raj Interior, I am interested in interior consultation for: ${serviceTitles || 'Total Interior Solution'}.${clientName ? ` My name is ${clientName}.` : ''}${clientNotes ? ` Notes: ${clientNotes}` : ''}`;
    
    // WhatsApp direct link to first locked mobile number
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/91${BRAND_DATA.phones[0]}?text=${encodedMsg}`, '_blank');
  };

  return (
    <section id="contact-section" className="relative w-full py-24 bg-raj-bg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raj-gold/10 border border-raj-gold/30 text-xs font-mono text-raj-gold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT BUSINESS ACCESS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-raj-cream mb-4">
            Connect With Raj Interior
          </h2>
          <p className="text-sm sm:text-base text-raj-muted font-light">
            Speak directly with our expert team for complete interior solutions, site inspection consultations, and precision manufacturing inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Business Credentials & Verified Contact Card */}
          <div className="lg:col-span-5 glass-panel-gold rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-raj-gold/30 shadow-2xl">
            <div>
              {/* Brand Header */}
              <div className="mb-8">
                <span className="text-xs font-mono text-raj-gold tracking-widest uppercase block mb-1">
                  OFFICIAL BUSINESS RECORD
                </span>
                <h3 className="font-serif text-3xl font-black text-white">
                  {BRAND_DATA.name}
                </h3>
                <span className="text-xs font-mono text-raj-sand uppercase">
                  {BRAND_DATA.descriptor}
                </span>
                <p className="text-xs text-raj-muted font-mono mt-3">
                  "{BRAND_DATA.tagline}"
                </p>
              </div>

              {/* Direct Calling Hotlines */}
              <div className="space-y-4 mb-8">
                <span className="text-xs font-mono tracking-widest text-raj-muted uppercase block">
                  DIRECT PHONE NUMBERS
                </span>
                
                {BRAND_DATA.phones.map((phone, idx) => (
                  <div
                    key={phone}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-raj-gold/50 transition-all flex items-center justify-between group"
                  >
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center gap-3 font-mono text-base sm:text-lg font-bold text-raj-cream group-hover:text-raj-gold transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-raj-gold/10 border border-raj-gold/30 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-raj-gold" />
                      </div>
                      <span>+91 {phone}</span>
                    </a>

                    <button
                      onClick={() => copyToClipboard(phone, `phone-${idx}`)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-raj-muted hover:text-raj-cream text-xs"
                      title="Copy phone number"
                    >
                      {copiedField === `phone-${idx}` ? (
                        <Check className="w-4 h-4 text-raj-gold" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Verified Statutory Registrations */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <span className="text-xs font-mono tracking-widest text-raj-muted uppercase block">
                  STATUTORY REGISTRATIONS
                </span>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-raj-gold flex-shrink-0" />
                    <span className="text-raj-muted">GSTIN:</span>
                    <span className="text-raj-cream font-bold">{BRAND_DATA.gstin}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(BRAND_DATA.gstin, 'gstin')}
                    className="text-raj-sand hover:text-raj-gold text-[10px]"
                  >
                    {copiedField === 'gstin' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-raj-gold flex-shrink-0" />
                    <span className="text-raj-muted">CE NO:</span>
                    <span className="text-raj-cream font-bold">{BRAND_DATA.ceNo}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(BRAND_DATA.ceNo, 'ceno')}
                    className="text-raj-sand hover:text-raj-gold text-[10px]"
                  >
                    {copiedField === 'ceno' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="mt-8 pt-6 border-t border-white/10 text-[11px] font-mono text-raj-muted">
              Direct verification confirmed under commercial establishment & GST standards.
            </div>
          </div>

          {/* Interactive Consultation Scope Configurator Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl flex flex-col justify-between">
            <form onSubmit={handleWhatsAppConsult} className="space-y-6">
              
              <div>
                <span className="text-xs font-mono text-raj-gold uppercase tracking-widest block mb-1">
                  FAST CONSULTATION DISCOVERY
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Select Your Required Interior & Manufacturing Scope
                </h3>
                <p className="text-xs text-raj-muted">
                  Choose the specific crafts you need executed, and initiate direct consultation with our project lead.
                </p>
              </div>

              {/* Service Selection Pills */}
              <div>
                <span className="text-xs font-mono text-raj-sand uppercase block mb-3">
                  INTERIOR SERVICES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {INTERIOR_SERVICES.map((s) => {
                    const isSelected = selectedServices.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 border ${
                          isSelected
                            ? 'bg-raj-gold text-raj-bg font-bold border-raj-gold'
                            : 'bg-white/5 text-raj-cream hover:bg-white/10 border-white/10'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{s.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-raj-muted uppercase block mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Mr. Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-raj-gold text-sm text-raj-cream placeholder-raj-muted/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-raj-muted uppercase block mb-2">
                    Direct Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Your contact number"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-raj-gold text-sm text-raj-cream placeholder-raj-muted/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-raj-muted uppercase block mb-2">
                  Project Notes / Space Details
                </label>
                <textarea
                  rows={3}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Describe your property (Residential flat, Commercial office, Signage requirement...)"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-raj-gold text-sm text-raj-cream placeholder-raj-muted/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>START WHATSAPP CONSULTATION</span>
                </button>

                <a
                  href={`tel:${BRAND_DATA.phones[0]}`}
                  className="w-full sm:w-auto py-4 px-8 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-wider uppercase hover:bg-raj-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-raj-gold/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>DIRECT CALL</span>
                </a>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
