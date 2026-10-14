import React from 'react';
import { ArrowRight, PhoneCall, Sparkles, ChevronDown, CheckCircle2, ShieldCheck, MessageSquare } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';

interface ScrollVideoHeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onMilestoneClick?: (percent: number) => void;
  activeMilestone?: number;
  isCinemaMode?: boolean;
}

export const ScrollVideoHero: React.FC<ScrollVideoHeroProps> = ({
  onExploreClick,
  onContactClick,
  onMilestoneClick,
  activeMilestone = 0,
  isCinemaMode = false,
}) => {
  const milestones = [
    { id: 'm1', percent: 0.0, step: '01', label: 'RAW CANVAS', desc: 'Bare structural concrete space' },
    { id: 'm2', percent: 0.32, step: '02', label: 'SURFACE & CEILING', desc: 'Flooring, POP ceiling & electrical' },
    { id: 'm3', percent: 0.65, step: '03', label: 'MODULAR & WOODWORK', desc: 'Modular kitchen, wardrobes & louvers' },
    { id: 'm4', percent: 1.0, step: '04', label: 'COMPLETED RESIDENCE', desc: 'Full turnkey luxury interior delivered' },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Floating Hero Content Overlay:
          NO SOLID POSTER BOX / NO CARD BLOCKING THE VIDEO.
          Uses pure, crystal-clear typography with high-contrast text shadows so the video shines 100% */}
      <div
        className={`max-w-7xl mx-auto w-full my-auto transition-all duration-500 ${
          isCinemaMode ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="max-w-3xl">
          
          {/* Top Verified Identity Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-xl border border-raj-gold/30 text-[11px] sm:text-xs font-mono text-raj-sand mb-4 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-raj-gold animate-ping" />
            <span className="font-bold tracking-wider text-raj-gold uppercase">{BRAND_DATA.name}</span>
            <span className="text-white/30">•</span>
            <span className="tracking-widest uppercase text-white/80">{BRAND_DATA.descriptor}</span>
          </div>

          {/* Grand Hero Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)]">
            Architectural <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light drop-shadow-sm">
              Metamorphosis
            </span>
          </h1>

          {/* Locked Tagline */}
          <p className="font-serif text-base sm:text-2xl text-raj-sand/95 font-light mt-3 sm:mt-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] max-w-2xl leading-snug">
            "{BRAND_DATA.tagline}"
          </p>

          {/* Turnkey Scope Description */}
          <p className="text-xs sm:text-sm md:text-base text-white/85 font-light mt-3 max-w-xl leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            Watch raw structural brick and concrete transform into a completed luxury residence. 
            All 11 interior disciplines executed under one unified roof with in-house fabrication.
          </p>

          {/* Quick Pillar Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 text-[10px] sm:text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-raj-gold" />
              11 In-House Crafts
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-raj-gold" />
              GST & Trade Registered
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-raj-gold" />
              16 Mfg Items Direct
            </span>
          </div>

          {/* Floating Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={onExploreClick}
              className="h-12 px-7 rounded-full bg-gradient-to-r from-raj-gold via-raj-gold-light to-raj-gold text-raj-bg font-black text-xs sm:text-sm tracking-widest uppercase transition-all flex items-center gap-2 shadow-2xl shadow-raj-gold/20 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>EXPLORE 11 SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContactClick}
              className="h-12 px-6 rounded-full bg-black/50 hover:bg-black/70 text-raj-cream border border-white/20 text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center gap-2 backdrop-blur-xl hover:border-raj-gold/50 active:scale-95 cursor-pointer shadow-xl"
            >
              <PhoneCall className="w-4 h-4 text-raj-gold" />
              <span>DIRECT INQUIRY</span>
            </button>

            <a
              href={`https://wa.me/91${BRAND_DATA.phones[0]}?text=${encodeURIComponent('Hello Raj Interior, I would like to consult about an interior project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center gap-2 backdrop-blur-xl active:scale-95 cursor-pointer shadow-xl"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">WHATSAPP CONSULT</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Floating Interactive Timeline Controller:
          Ultra-sleek, glassy dock that allows users to jump across 4 transformation phases */}
      <div
        className={`max-w-7xl mx-auto w-full transition-all duration-500 ${
          isCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="p-2 sm:p-3 rounded-2xl sm:rounded-full bg-black/60 backdrop-blur-2xl border border-white/15 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 px-2">
            
            {/* 4 Interactive Milestone Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              {milestones.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => onMilestoneClick && onMilestoneClick(m.percent)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-mono transition-all text-left sm:text-center cursor-pointer flex items-center gap-2 ${
                    activeMilestone === idx
                      ? 'bg-raj-gold text-raj-bg font-bold shadow-lg shadow-raj-gold/30'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/10'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeMilestone === idx ? 'bg-raj-bg' : 'bg-raj-gold'}`} />
                  <span className="font-bold">{m.step}.</span>
                  <span className="truncate">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Scroll Down Prompt */}
            <button
              onClick={onExploreClick}
              className="flex items-center gap-1.5 text-[11px] font-mono text-raj-sand hover:text-raj-gold transition-colors py-1 px-3 cursor-pointer"
            >
              <span className="hidden md:inline uppercase tracking-widest text-[10px]">SCROLL OR CLICK TO EXPLORE</span>
              <ChevronDown className="w-4 h-4 text-raj-gold animate-bounce" />
            </button>

          </div>
        </div>
      </div>

    </section>
  );
};
