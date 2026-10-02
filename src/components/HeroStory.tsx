import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Box, ShieldCheck, PhoneCall } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';

interface HeroStoryProps {
  onExploreClick: () => void;
  onStudioClick: () => void;
}

export const HeroStory: React.FC<HeroStoryProps> = ({ onExploreClick, onStudioClick }) => {
  const [transitionPhase, setTransitionPhase] = useState<'raw' | 'transition' | 'complete'>('raw');

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionPhase(prev => {
        if (prev === 'raw') return 'transition';
        if (prev === 'transition') return 'complete';
        return 'raw';
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroImages = {
    raw: './assets/hero_empty_room.jpg',
    transition: './assets/scene_flooring_materials.jpg',
    complete: './assets/scene_completed_interior.jpg',
  };

  return (
    <section className="relative min-h-[92svh] sm:min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
      
      {/* Optimized Single Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          key={transitionPhase}
          src={heroImages[transitionPhase]}
          alt="Raj Interior Transformation"
          className="w-full h-full object-cover opacity-40 animate-in fade-in duration-1000 scale-102"
          style={{ transform: 'translateZ(0)' }}
        />
        {/* Deep dark architectural overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-raj-bg via-raj-bg/75 to-raj-bg/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F1012_85%)]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Architectural Phase Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-raj-gold animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-raj-sand uppercase">
            {BRAND_DATA.descriptor}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[9px] sm:text-[11px] font-mono text-raj-muted">
            {transitionPhase === 'raw' && 'PHASE 01: RAW SPACE'}
            {transitionPhase === 'transition' && 'PHASE 02: CRAFT TRANSFORMATION'}
            {transitionPhase === 'complete' && 'PHASE 03: BESPOKE LIVING'}
          </span>
        </div>

        {/* Main Brand Title */}
        <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight sm:leading-none mb-4 sm:mb-6">
          <span className="gold-text-gradient block drop-shadow-xl">
            {BRAND_DATA.name}
          </span>
        </h1>

        {/* Locked Main Tagline */}
        <div className="max-w-2xl mb-6 sm:mb-8">
          <p className="font-serif text-base sm:text-2xl md:text-3xl text-raj-cream tracking-wide font-light leading-snug">
            {BRAND_DATA.tagline}
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-raj-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Story Journey Description */}
        <p className="max-w-xl text-xs sm:text-base text-raj-muted leading-relaxed font-light mb-8 sm:mb-10 px-2">
          From raw structural concrete to masterfully executed living architecture. Complete turnkey interior execution and precision signage manufacturing.
        </p>

        {/* Action CTAs (Touch-friendly 48px min height on mobile) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={onExploreClick}
            className="h-12 px-7 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-widest uppercase hover:bg-raj-gold-light transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-raj-gold/20 active:scale-95"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStudioClick}
            className="h-12 px-6 rounded-full bg-white/5 hover:bg-white/10 text-raj-cream border border-white/15 text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Box className="w-4 h-4 text-raj-gold" />
            <span>3D STUDIO</span>
          </button>

          <a
            href="#contact-section"
            className="h-12 px-6 rounded-full bg-transparent hover:bg-white/5 text-raj-beige border border-white/10 text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5 text-raj-gold" />
            <span>CONTACT</span>
          </a>
        </div>

        {/* Story Phase Buttons */}
        <div className="mt-8 sm:mt-12 w-full max-w-3xl p-1.5 sm:p-2.5 rounded-2xl glass-panel border border-white/10 grid grid-cols-3 gap-1.5 text-center text-[10px] sm:text-xs font-mono">
          <button 
            onClick={() => setTransitionPhase('raw')}
            className={`py-2 px-1 rounded-xl transition-all ${
              transitionPhase === 'raw' 
                ? 'bg-raj-gold/25 text-raj-gold border border-raj-gold/40 font-bold' 
                : 'text-raj-muted hover:text-raj-cream hover:bg-white/5'
            }`}
          >
            <span className="block opacity-60 text-[9px]">01</span>
            <span className="truncate block">EMPTY SPACE</span>
          </button>

          <button 
            onClick={() => setTransitionPhase('transition')}
            className={`py-2 px-1 rounded-xl transition-all ${
              transitionPhase === 'transition' 
                ? 'bg-raj-gold/25 text-raj-gold border border-raj-gold/40 font-bold' 
                : 'text-raj-muted hover:text-raj-cream hover:bg-white/5'
            }`}
          >
            <span className="block opacity-60 text-[9px]">02</span>
            <span className="truncate block">TRANSFORMATION</span>
          </button>

          <button 
            onClick={() => setTransitionPhase('complete')}
            className={`py-2 px-1 rounded-xl transition-all ${
              transitionPhase === 'complete' 
                ? 'bg-raj-gold/25 text-raj-gold border border-raj-gold/40 font-bold' 
                : 'text-raj-muted hover:text-raj-cream hover:bg-white/5'
            }`}
          >
            <span className="block opacity-60 text-[9px]">03</span>
            <span className="truncate block">COMPLETED</span>
          </button>
        </div>

        {/* Verified Statutory Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-raj-muted font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-raj-gold" />
            <span>GSTIN: <span className="text-raj-cream font-medium">{BRAND_DATA.gstin}</span></span>
          </div>
          <div className="hidden sm:inline text-white/20">•</div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-raj-gold" />
            <span>CE NO: <span className="text-raj-cream font-medium">{BRAND_DATA.ceNo}</span></span>
          </div>
        </div>

      </div>

    </section>
  );
};
