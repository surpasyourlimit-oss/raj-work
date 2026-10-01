import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles, Compass } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';
import { AmbienceAudio } from './AmbienceAudio';

interface NavbarProps {
  onSelectStoryScene?: (index: number) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'THE STORY', href: '#story-section' },
    { label: 'SERVICES', href: '#services-section' },
    { label: '3D STUDIO', href: '#studio-section' },
    { label: 'MANUFACTURER', href: '#manufacturer-section' },
    { label: 'CONTACT', href: '#contact-section' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-raj-bg/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-5 bg-gradient-to-b from-raj-bg/90 via-raj-bg/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Descriptor */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-raj-card to-raj-surface border border-raj-gold/30 flex items-center justify-center shadow-lg group-hover:border-raj-gold transition-colors duration-300">
              <span className="font-serif font-black text-xl text-raj-gold tracking-tighter">R</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-raj-cream group-hover:text-raj-gold transition-colors duration-300">
                {BRAND_DATA.name}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-raj-gold uppercase font-medium">
                {BRAND_DATA.descriptor}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest text-raj-beige/90">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-raj-gold transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-raj-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Audio, Phone Direct, Explore */}
          <div className="hidden lg:flex items-center gap-4">
            <AmbienceAudio />
            
            <a
              href={`tel:${BRAND_DATA.phones[0]}`}
              className="flex items-center gap-2 text-xs font-mono text-raj-cream/90 hover:text-raj-gold px-3 py-1.5 rounded-full border border-white/10 hover:border-raj-gold/40 bg-white/5 transition-all duration-300"
              title="Direct Business Call"
            >
              <Phone className="w-3.5 h-3.5 text-raj-gold" />
              <span>{BRAND_DATA.phones[0]}</span>
            </a>

            <a
              href="#contact-section"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-raj-gold text-raj-bg font-semibold text-xs tracking-wider hover:bg-raj-gold-light transition-all duration-300 shadow-md shadow-raj-gold/10 hover:shadow-raj-gold/25"
            >
              <span>GET IN TOUCH</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-3">
            <AmbienceAudio />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-raj-cream hover:text-raj-gold transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-raj-card/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all">
          <div className="flex flex-col gap-5 text-sm tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 text-raj-cream hover:text-raj-gold flex items-center justify-between"
              >
                <span>{link.label}</span>
                <Compass className="w-4 h-4 text-raj-gold/50" />
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <div className="text-xs text-raj-muted font-mono">DIRECT INQUIRY HOTLINES:</div>
              <div className="flex flex-col gap-2">
                {BRAND_DATA.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-raj-cream font-mono text-sm"
                  >
                    <Phone className="w-4 h-4 text-raj-gold" />
                    <span>+91 {phone}</span>
                  </a>
                ))}
              </div>

              <a
                href="#contact-section"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full py-3 rounded-xl bg-raj-gold text-raj-bg font-bold text-center tracking-wider text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>EXPLORE CONSULTATION</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
