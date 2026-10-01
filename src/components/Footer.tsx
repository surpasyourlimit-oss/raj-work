import React from 'react';
import { Phone, ShieldCheck, ArrowUp, Sparkles } from 'lucide-react';
import { BRAND_DATA, INTERIOR_SERVICES, MANUFACTURER_ITEMS } from '../data/rajData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0B0D] border-t border-white/10 text-raj-cream pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-raj-card border border-raj-gold/40 flex items-center justify-center">
                <span className="font-serif font-bold text-xl text-raj-gold">R</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold tracking-wider text-white">
                  {BRAND_DATA.name}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-raj-gold uppercase block">
                  {BRAND_DATA.descriptor}
                </span>
              </div>
            </div>

            <p className="text-xs text-raj-sand font-mono leading-relaxed max-w-sm">
              "{BRAND_DATA.tagline}"
            </p>

            {/* Direct Phone Numbers */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono text-raj-muted uppercase block">
                DIRECT INQUIRY CONTACTS:
              </span>
              {BRAND_DATA.phones.map(p => (
                <a
                  key={p}
                  href={`tel:${p}`}
                  className="flex items-center gap-2 text-xs font-mono text-raj-cream hover:text-raj-gold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-raj-gold" />
                  <span>+91 {p}</span>
                </a>
              ))}
            </div>

            {/* Statutory Registrations */}
            <div className="pt-2 space-y-1 text-[11px] font-mono text-raj-muted">
              <div>GSTIN: <span className="text-raj-sand">{BRAND_DATA.gstin}</span></div>
              <div>CE NO: <span className="text-raj-sand">{BRAND_DATA.ceNo}</span></div>
            </div>
          </div>

          {/* 11 Interior Services Index */}
          <div className="lg:col-span-5">
            <h4 className="font-serif text-sm font-bold text-raj-gold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERIOR SERVICES (11)</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-raj-muted font-light">
              {INTERIOR_SERVICES.map(s => (
                <li key={s.id} className="hover:text-raj-cream transition-colors flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-raj-gold/60">{s.number}.</span>
                  <a href="#services-section" className="truncate">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 16 Manufacturer Items Index */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-raj-gold uppercase tracking-wider mb-4">
              MANUFACTURER OF
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-raj-muted">
              {MANUFACTURER_ITEMS.map(m => (
                <a
                  key={m.id}
                  href="#manufacturer-section"
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 hover:text-raj-cream transition-colors border border-white/5"
                >
                  {m.title}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-raj-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-raj-gold" />
            <span>© {new Date().getFullYear()} RAJ INTERIOR. All Rights Reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-raj-sand hover:text-raj-gold border border-white/10 transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
