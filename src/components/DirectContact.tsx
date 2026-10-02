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
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleWhatsAppConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceTitles = selectedServices
      .map(id => INTERIOR_SERVICES.find(s => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const message = `Hello Raj Interior, I am interested in interior consultation for: ${serviceTitles || 'Total Interior Solution'}.${clientName ? ` My name is ${clientName}.` : ''}${clientNotes ? ` Notes: ${clientNotes}` : ''}`;
    
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/91${BRAND_DATA.phones[0]}?text=${encodedMsg}`, '_blank');
  };

  return (
    <section id="contact-section" className="relative w-full py-16 sm:py-24 bg-raj-bg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-raj-gold/10 border border-raj-gold/30 text-[11px] sm:text-xs font-mono text-raj-gold uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            <span>DIRECT BUSINESS ACCESS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-raj-cream mb-3">
            Connect With Raj Interior
          </h2>
          <p className="text-xs sm:text-sm text-raj-muted font-light max-w-lg mx-auto">
            Direct consultation for complete interior transformations and precision manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Credentials & Verified Contacts */}
          <div className="lg:col-span-5 glass-panel-gold rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between border border-raj-gold/30 shadow-xl">
            <div>
              <div className="mb-6">
                <span className="text-[10px] font-mono text-raj-gold tracking-widest uppercase block mb-0.5">
                  OFFICIAL BUSINESS RECORD
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                  {BRAND_DATA.name}
                </h3>
                <span className="text-[11px] font-mono text-raj-sand uppercase">
                  {BRAND_DATA.descriptor}
                </span>
                <p className="text-xs text-raj-muted font-mono mt-2">
                  "{BRAND_DATA.tagline}"
                </p>
              </div>

              {/* Direct Calling Buttons */}
              <div className="space-y-2.5 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-raj-muted uppercase block">
                  DIRECT PHONE NUMBERS
                </span>
                
                {BRAND_DATA.phones.map((phone, idx) => (
                  <div
                    key={phone}
                    className="p-3 sm:p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                  >
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold text-raj-cream hover:text-raj-gold transition-colors active:scale-98"
                    >
                      <div className="w-8 h-8 rounded-lg bg-raj-gold/10 border border-raj-gold/30 flex items-center justify-center">
                        <Phone className="w-3.5 h-3.5 text-raj-gold" />
                      </div>
                      <span>+91 {phone}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(phone, `phone-${idx}`)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-raj-muted hover:text-raj-cream text-xs active:scale-95"
                      title="Copy"
                    >
                      {copiedField === `phone-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-raj-gold" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Statutory Registrations */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-raj-muted uppercase block">
                  STATUTORY REGISTRATIONS
                </span>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-raj-gold flex-shrink-0" />
                    <span className="text-raj-muted text-[11px]">GSTIN:</span>
                    <span className="text-raj-cream font-bold text-[11px]">{BRAND_DATA.gstin}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(BRAND_DATA.gstin, 'gstin')}
                    className="text-raj-sand hover:text-raj-gold text-[10px] px-2 py-0.5 rounded bg-white/5 active:scale-95"
                  >
                    {copiedField === 'gstin' ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-raj-gold flex-shrink-0" />
                    <span className="text-raj-muted text-[11px]">CE NO:</span>
                    <span className="text-raj-cream font-bold text-[11px]">{BRAND_DATA.ceNo}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(BRAND_DATA.ceNo, 'ceno')}
                    className="text-raj-sand hover:text-raj-gold text-[10px] px-2 py-0.5 rounded bg-white/5 active:scale-95"
                  >
                    {copiedField === 'ceno' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[10px] font-mono text-raj-muted">
              Commercial Establishment & GST statutory records verified.
            </div>
          </div>

          {/* Interactive Consultation Form */}
          <div className="lg:col-span-7 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10 shadow-xl flex flex-col justify-between">
            <form onSubmit={handleWhatsAppConsult} className="space-y-4 sm:space-y-5">
              
              <div>
                <span className="text-[10px] font-mono text-raj-gold uppercase tracking-widest block mb-0.5">
                  FAST INQUIRY
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-white">
                  Select Scope & Initiate Consultation
                </h3>
              </div>

              {/* Service Selection Pills */}
              <div>
                <span className="text-[10px] font-mono text-raj-sand uppercase block mb-2">
                  SELECT REQUIRED SERVICES:
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1 no-scrollbar">
                  {INTERIOR_SERVICES.map((s) => {
                    const isSelected = selectedServices.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border active:scale-95 ${
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

              {/* Form inputs with 16px base font to prevent iOS auto-zoom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-raj-muted uppercase block mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Rahul Sen"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-raj-gold text-base sm:text-xs text-raj-cream placeholder-raj-muted/50 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-raj-muted uppercase block mb-1">
                    Direct Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Your mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-raj-gold text-base sm:text-xs text-raj-cream placeholder-raj-muted/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-raj-muted uppercase block mb-1">
                  Space / Project Scope Details
                </label>
                <textarea
                  rows={2}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="e.g. 3BHK flat interior, residential woodwork, office signage..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-raj-gold text-base sm:text-xs text-raj-cream placeholder-raj-muted/50 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Action Triggers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <button
                  type="submit"
                  className="py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-emerald-950/40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>START WHATSAPP CONSULTATION</span>
                </button>

                <a
                  href={`tel:${BRAND_DATA.phones[0]}`}
                  className="py-3 px-6 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-raj-gold/20"
                >
                  <Phone className="w-3.5 h-3.5" />
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
