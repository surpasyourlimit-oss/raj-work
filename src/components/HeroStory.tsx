import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Box, ShieldCheck, PhoneCall } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';

interface HeroStoryProps {
  onExploreClick: () => void;
  onStudioClick: () => void;
}

export const HeroStory: React.FC<HeroStoryProps> = ({ onExploreClick, onStudioClick }) => {
  const [transitionPhase, setTransitionPhase] = useState<'raw' | 'transition' | 'complete'>('raw');

  // Automatic gentle phase preview indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionPhase(prev => {
        if (prev === 'raw') return 'transition';
        if (prev === 'transition') return 'complete';
        return 'raw';
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const heroImages = {
    raw: './assets/hero_empty_room.jpg',
    transition: './assets/scene_flooring_materials.jpg',
    complete: './assets/scene_completed_interior.jpg',
  };

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      
      {/* Dynamic Background Image Crossfade Layers */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 scale-105 transform ease-out"
          style={{ 
            backgroundImage: `url(${heroImages[transitionPhase]})`,
            opacity: 0.42
          }}
        />
        {/* Radial Dark Vignette and Gradient overlays for maximum editorial text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-raj-bg via-raj-bg/70 to-raj-bg/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F1012_85%)]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Architectural Phase Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-float">
          <span className="w-2 h-2 rounded-full bg-raj-gold animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-raj-sand uppercase">
            {BRAND_DATA.descriptor}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[11px] font-mono text-raj-muted">
            {transitionPhase === 'raw' && 'PHASE 01: RAW STRUCTURAL SPACE'}
            {transitionPhase === 'transition' && 'PHASE 02: CRAFT TRANSFORMATION'}
            {transitionPhase === 'complete' && 'PHASE 03: BESPOKE COMPLETION'}
          </span>
        </div>

        {/* Main Brand Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
          <span className="gold-text-gradient block drop-shadow-2xl">
            {BRAND_DATA.name}
          </span>
        </h1>

        {/* Locked Main Tagline */}
        <div className="max-w-3xl mb-8">
          <p className="font-serif text-lg sm:text-2xl md:text-3xl text-raj-cream/95 tracking-wide font-light leading-snug">
            {BRAND_DATA.tagline}
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-raj-gold to-transparent mx-auto mt-6" />
        </div>

        {/* Story Journey Description */}
        <p className="max-w-2xl text-sm sm:text-base text-raj-muted leading-relaxed font-light mb-10">
          Experience the complete metamorphosis from raw structural canvas to masterfully executed living architecture. Full-spectrum interior execution and precision manufacturing.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-widest uppercase hover:bg-raj-gold-light transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-raj-gold/20 hover:scale-105 active:scale-95 group"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={onStudioClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-raj-cream border border-white/15 hover:border-raj-gold/40 text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
          >
            <Box className="w-4 h-4 text-raj-gold" />
            <span>INTERACTIVE 3D STUDIO</span>
          </button>

          <a
            href="#contact-section"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-white/5 text-raj-beige border border-white/10 hover:border-white/20 text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-raj-gold" />
            <span>CONTACT</span>
          </a>
        </div>

        {/* Story Sequence Pill Bar */}
        <div className="mt-14 w-full max-w-4xl p-3 sm:p-4 rounded-2xl glass-panel border border-white/10 grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-[10px] sm:text-xs font-mono">
          <div 
            onClick={() => setTransitionPhase('raw')}
            className={`cursor-pointer py-2 px-2 rounded-xl transition-all ${
              transitionPhase === 'raw' 
                ? 'bg-raj-gold/20 text-raj-gold border border-raj-gold/40' 
                : 'text-raj-muted hover:text-raj-cream hover:bg-white/5'
            }`}
          >
            <span className="block opacity-60">01</span>
            <span className="font-semibold uppercase truncate">EMPTY SPACE</span>
          </div>

          <div 
            onClick={() => setTransitionPhase('transition')}
            className={`cursor-pointer py-2 px-2 rounded-xl transition-all ${
              transitionPhase === 'transition' 
                ? 'bg-raj-gold/20 text-raj-gold border border-raj-gold/40' 
                : 'text-raj-muted hover:text-raj-cream hover:bg-white/5'
            }`}
          >
            <span className="block opacity-60">02</span>
            <span className="font-semibold uppercase truncate">DESIGN PROCESS</span>
          </div>

          <div 
            onClick={() => setTransitionPhase('complete')}
            className={`cursor-pointer py-2 px-2 rounded-xl transition-all ${
              transitionPhase === 'complete' 
                ? 'bg-raj-gold/20 text-raj-gold border border-raj-gold/40' 
                : 'text-raj-muted hover:text-raj-cream hover:bg-white/5'
            }`}
          >
            <span className="block opacity-60">03</span>
            <span className="font-semibold uppercase truncate">COMPLETED SPACE</span>
          </div>

          <a 
            href="#services-section"
            className="hidden sm:block py-2 px-2 rounded-xl text-raj-muted hover:text-raj-cream hover:bg-white/5 transition-all"
          >
            <span className="block opacity-60">04</span>
            <span className="font-semibold uppercase truncate">11 CRAFTS</span>
          </a>

          <a 
            href="#manufacturer-section"
            className="hidden sm:block py-2 px-2 rounded-xl text-raj-muted hover:text-raj-cream hover:bg-white/5 transition-all"
          >
            <span className="block opacity-60">05</span>
            <span className="font-semibold uppercase truncate">MANUFACTURER</span>
          </a>
        </div>

        {/* Verified Business Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-raj-muted font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-raj-gold" />
            <span>GSTIN: <span className="text-raj-cream">{BRAND_DATA.gstin}</span></span>
          </div>
          <div className="hidden sm:inline text-white/20">•</div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-raj-gold" />
            <span>CE NO: <span className="text-raj-cream">{BRAND_DATA.ceNo}</span></span>
          </div>
        </div>

      </div>

    </section>
  );
};
