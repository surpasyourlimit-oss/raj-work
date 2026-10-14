import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles, Compass } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';
import { AmbienceAudio } from './AmbienceAudio';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'TRANSFORMATION', href: '#story-section' },
    { label: '11 SERVICES', href: '#services-section' },
    { label: 'MATERIALS', href: '#materials-section' },
    { label: 'MANUFACTURER', href: '#manufacturer-section' },
    { label: 'CONTACT', href: '#contact-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-raj-bg/92 backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'py-4 bg-gradient-to-b from-raj-bg/95 via-raj-bg/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-raj-card border border-raj-gold/30 flex items-center justify-center shadow-md group-hover:border-raj-gold transition-colors">
              <span className="font-serif font-black text-xl text-raj-gold">R</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-raj-cream group-hover:text-raj-gold transition-colors">
                {BRAND_DATA.name}
              </span>
              <span className="text-[9px] tracking-[0.22em] text-raj-gold uppercase font-medium">
                {BRAND_DATA.descriptor}
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest text-raj-beige/90">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-raj-gold transition-colors duration-200 relative py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Controls */}
          <div className="hidden lg:flex items-center gap-3.5">
            <AmbienceAudio />
            
            <a
              href={`tel:${BRAND_DATA.phones[0]}`}
              className="flex items-center gap-2 text-xs font-mono text-raj-cream/90 hover:text-raj-gold px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 transition-colors"
              title="Direct Inquiry"
            >
              <Phone className="w-3.5 h-3.5 text-raj-gold" />
              <span>{BRAND_DATA.phones[0]}</span>
            </a>

            <a
              href="#contact-section"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-raj-gold text-raj-bg font-semibold text-xs tracking-wider hover:bg-raj-gold-light transition-all shadow-md shadow-raj-gold/15"
            >
              <span>CONSULT EXPERT</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <AmbienceAudio />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-raj-cream hover:text-raj-gold transition-colors active:scale-95"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-raj-bg/98 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl bg-white/5 border border-white/5 text-raj-cream hover:text-raj-gold flex items-center justify-between text-sm tracking-wider font-medium active:bg-raj-gold/10"
              >
                <span>{link.label}</span>
                <Compass className="w-4 h-4 text-raj-gold/60" />
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="text-[11px] font-mono text-raj-muted">DIRECT CALL HOTLINES:</div>
            <div className="grid grid-cols-2 gap-2">
              {BRAND_DATA.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-raj-cream active:bg-raj-gold/20"
                >
                  <Phone className="w-3.5 h-3.5 text-raj-gold" />
                  <span>{phone}</span>
                </a>
              ))}
            </div>

            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-raj-gold text-raj-bg font-bold text-center tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-raj-gold/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>CONSULTATION INQUIRY</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
