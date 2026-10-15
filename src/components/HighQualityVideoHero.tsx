import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, PhoneCall, Play, Pause, Eye, EyeOff, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';

interface HighQualityVideoHeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

interface CraftStage {
  id: string;
  stageNumber: string;
  range: [number, number, number, number]; // [start, peakStart, peakEnd, end]
  badge: string;
  discipline: string;
  title: string;
  tagline: string;
  specs: string[];
  status: string;
}

const CRAFT_STAGES: CraftStage[] = [
  {
    id: 'stage-1',
    stageNumber: '01',
    range: [0.00, 0.02, 0.11, 0.15],
    badge: 'PHASE 01 • DEMOLITION & LAYOUT',
    discipline: 'STRUCTURAL ARCHITECTURE',
    title: 'Raw Concrete Canvas & Space Planning',
    tagline: 'Precision laser leveling, structural column assessment & spatial CAD layout.',
    specs: ['Site Survey & Laser Leveling', 'Wall Demolition & Debris Clearance', 'Structural Column Reinforcement'],
    status: 'COMPLETED IN-HOUSE',
  },
  {
    id: 'stage-2',
    stageNumber: '02',
    range: [0.15, 0.18, 0.25, 0.29],
    badge: 'PHASE 02 • SAFETY & CABLING',
    discipline: 'CONCEALED ELECTRICAL',
    title: 'Concealed Conduits & Fire-Resistant Wiring',
    tagline: 'FR-LSH copper wiring, concealed wall channelling & modular gang-boxes.',
    specs: ['Fire-Resistant Multi-Strand Wire', 'Concealed PVC Conduit Channelling', 'Heavy-Load HVAC & Kitchen Circuits'],
    status: 'COMPLETED IN-HOUSE',
  },
  {
    id: 'stage-3',
    stageNumber: '03',
    range: [0.29, 0.32, 0.39, 0.43],
    badge: 'PHASE 03 • CEILING & COVE LIGHTS',
    discipline: 'POP & GYPSUM CEILING',
    title: 'Multi-Tier False Ceiling & Ambient Coves',
    tagline: 'Anti-sag GI framework, Saint-Gobain boards & magnetic track light channels.',
    specs: ['Multi-Tier Architectural Drop Coves', 'Concealed Ambient LED Strip Channels', 'Magnetic Track & Spotlight Cutouts'],
    status: 'COMPLETED IN-HOUSE',
  },
  {
    id: 'stage-4',
    stageNumber: '04',
    range: [0.43, 0.46, 0.53, 0.57],
    badge: 'PHASE 04 • SURFACE INTEGRITY',
    discipline: 'WALL PUTTY & PRIMING',
    title: '3-Stage Putty Sanding & Silk Base Coats',
    tagline: 'Machine sanding with zero-undulation laser check & waterproofing primer sealant.',
    specs: ['3-Layer Acrylic Polymer Putty', 'Rotary Machine Dustless Sanding', 'Moisture-Barrier Anti-Damp Primer'],
    status: 'COMPLETED IN-HOUSE',
  },
  {
    id: 'stage-5',
    stageNumber: '05',
    range: [0.57, 0.60, 0.67, 0.71],
    badge: 'PHASE 05 • FLOORING & STONEWORK',
    discipline: 'ITALIAN MARBLE & TILES',
    title: 'Statuario Marble Laying & Seamless Joints',
    tagline: 'High-gloss mirror-polished marble slabs, vitrified tiles & herringbone parquet.',
    specs: ['Italian Statuario Slab Book-Matching', 'Diamond-Pad Mirror Buffing & Polish', 'Seamless Epoxy Joint Infills'],
    status: 'COMPLETED IN-HOUSE',
  },
  {
    id: 'stage-6',
    stageNumber: '06',
    range: [0.71, 0.74, 0.81, 0.85],
    badge: 'PHASE 06 • MODULAR ERGONOMICS',
    discipline: 'MODULAR KITCHEN',
    title: 'Precision Modular Kitchen & Quartz Counters',
    tagline: 'BWR marine ply, anti-scratch acrylic shutters & Blum soft-close fittings.',
    specs: ['BWR Marine Grade Ply Carcass', 'High-Gloss Acrylic Seamless Shutters', 'Stain-Resistant 18mm Quartz Counters'],
    status: 'COMPLETED IN-HOUSE',
  },
  {
    id: 'stage-7',
    stageNumber: '07',
    range: [0.85, 0.88, 0.93, 0.96],
    badge: 'PHASE 07 • BESPOKE WOODWORK',
    discipline: 'FURNITURE & LOUVERS',
    title: 'Custom Wardrobes & Charcoal Highlighters',
    tagline: 'Full-height floor-to-ceiling wardrobes, fluted charcoal louvers & brass inlays.',
    specs: ['Full-Height Floor-to-Ceiling Wardrobes', 'Acoustic Fluted Charcoal Wall Louvers', 'PVD Gold-Coated Brass Profile Inlays'],
    status: 'COMPLETED IN-HOUSE',
  },
  {
    id: 'stage-8',
    stageNumber: '08',
    range: [0.96, 0.98, 1.00, 1.00],
    badge: 'PHASE 08 • THE GRAND FINALE',
    discipline: 'COMPLETED MASTERPIECE',
    title: 'Complete Turnkey Metamorphosis Delivered',
    tagline: '11 in-house crafts unified into an architectural masterpiece ready for luxury living.',
    specs: ['100% In-House Factory Fabrication', 'Zero Middlemen • Unified Craft Warranty', 'Turnkey Handover with Statutory Compliance'],
    status: 'READY FOR LUXURY LIVING',
  },
];

export const HighQualityVideoHero: React.FC<HighQualityVideoHeroProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Performance references (avoiding React re-renders during high-frequency scroll)
  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentVideoTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  // Initialize and ensure video starts ready
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.currentTime = 0.04;
    }
  }, []);

  // High-performance rAF loop (Runs outside of React render cycle for 120 FPS buttery smoothness)
  useEffect(() => {
    const loop = () => {
      const video = videoRef.current;

      if (!isPlayingAuto) {
        // Interpolate progress with 25% damping
        const pDiff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(pDiff) > 0.0005) {
          currentProgressRef.current += pDiff * 0.25;
        }

        const p = currentProgressRef.current;

        // Video seeking: seek with fast lerp
        if (video && Number.isFinite(video.duration) && video.duration > 0) {
          const targetTime = p * video.duration;
          const tDiff = targetTime - currentVideoTimeRef.current;
          if (Math.abs(tDiff) > 0.015) {
            currentVideoTimeRef.current += tDiff * 0.32;
            if ('fastSeek' in video && typeof (video as { fastSeek?: (t: number) => void }).fastSeek === 'function') {
              (video as { fastSeek: (t: number) => void }).fastSeek(currentVideoTimeRef.current);
            } else {
              video.currentTime = currentVideoTimeRef.current;
            }
          }
        }

        // Direct DOM updates for the 8 Glassmorphic Craft Cards (Zero React state churn!)
        let activeIdx = 0;
        CRAFT_STAGES.forEach((stage, idx) => {
          const el = cardRefs.current[idx];
          if (!el) return;

          const [start, peakStart, peakEnd, end] = stage.range;
          let opacity = 0;
          let translateY = 24;
          let scale = 0.98;

          if (p >= start && p <= end) {
            activeIdx = idx;
            if (p < peakStart) {
              const f = (p - start) / (peakStart - start);
              opacity = f;
              translateY = 20 * (1 - f);
              scale = 0.98 + 0.02 * f;
            } else if (p > peakEnd) {
              const f = (end - p) / (end - peakEnd);
              opacity = f;
              translateY = -20 * (1 - f);
              scale = 0.98 + 0.02 * f;
            } else {
              opacity = 1;
              translateY = 0;
              scale = 1;
            }
          }

          el.style.opacity = String(opacity);
          el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        });

        // Direct DOM update for progress bar and percentage text
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.round(p * 100)}%`;
        }
        if (percentTextRef.current) {
          percentTextRef.current.innerText = `${Math.round(p * 100)}%`;
        }

        // Only trigger React state change when active milestone actually switches
        setActiveStageIndex(prev => prev !== activeIdx ? activeIdx : prev);

      } else {
        // Continuous auto-play mode
        if (video && Number.isFinite(video.duration) && video.duration > 0) {
          const p = video.currentTime / video.duration;
          currentProgressRef.current = p;
          targetProgressRef.current = p;
          currentVideoTimeRef.current = video.currentTime;

          // Update cards and progress directly
          let activeIdx = 0;
          CRAFT_STAGES.forEach((stage, idx) => {
            const el = cardRefs.current[idx];
            if (!el) return;
            const [start, peakStart, peakEnd, end] = stage.range;
            let opacity = 0;
            let translateY = 24;

            if (p >= start && p <= end) {
              activeIdx = idx;
              if (p < peakStart) {
                const f = (p - start) / (peakStart - start);
                opacity = f;
                translateY = 20 * (1 - f);
              } else if (p > peakEnd) {
                const f = (end - p) / (end - peakEnd);
                opacity = f;
                translateY = -20 * (1 - f);
              } else {
                opacity = 1;
                translateY = 0;
              }
            }

            el.style.opacity = String(opacity);
            el.style.transform = `translate3d(0, ${translateY}px, 0)`;
            el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
          });

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.round(p * 100)}%`;
          }
          if (percentTextRef.current) {
            percentTextRef.current.innerText = `${Math.round(p * 100)}%`;
          }
          setActiveStageIndex(prev => prev !== activeIdx ? activeIdx : prev);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlayingAuto]);

  // High-frequency scroll listener: only sets targetProgressRef (Zero React setState!)
  const handleScroll = useCallback(() => {
    if (isPlayingAuto) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    const p = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
    targetProgressRef.current = p;
  }, [isPlayingAuto]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Jump to specific craft stage
  const jumpToStage = (stageRangeStart: number) => {
    const container = containerRef.current;
    if (!container) return;

    setIsPlayingAuto(false);
    if (videoRef.current) videoRef.current.pause();

    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const totalScrollable = container.clientHeight - window.innerHeight;
    const targetScrollY = scrollTop + rect.top + stageRangeStart * totalScrollable;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const toggleAutoPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingAuto) {
      video.pause();
      setIsPlayingAuto(false);
    } else {
      video.play().then(() => {
        setIsPlayingAuto(true);
      }).catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#0A0B0E]"
    >
      {/* Sticky Fullscreen 1080p 60fps Fast-Seek Video Viewport:
          - Hardware accelerated decoding with GOP=2 keyframes for instantaneous seeking
          - Pins for 450vh while scroll smoothly scrubs the video without stutter
          - Strictly when progress hits 100%, continuing to scroll reveals the rest of the website! */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Master Full-HD 60FPS Video Element */}
        <div className="absolute inset-0 w-full h-full bg-[#0A0B0E] pointer-events-none select-none">
          <video
            ref={videoRef}
            src="/assets/hero_scrub_optimized.mp4"
            playsInline
            loop={isPlayingAuto}
            muted={isMuted}
            preload="auto"
            className="w-full h-full object-cover scale-[1.008] will-change-transform"
          />

          {/* Minimalist edge vignettes:
              100% video clarity, crisp colors, zero obscuring boxes */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/85 via-transparent to-[#0A0B0E]/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E]/65 via-transparent to-transparent sm:w-3/5 pointer-events-none" />
        </div>

        {/* Top Floating Controls Bar */}
        <div className="relative z-30 pt-20 sm:pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Scroll Status Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-xl border border-white/20 text-[11px] sm:text-xs font-mono text-raj-sand shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-raj-gold animate-pulse" />
            <span className="font-bold text-raj-gold uppercase tracking-wider">{BRAND_DATA.name}</span>
            <span className="text-white/25">|</span>
            <span className="uppercase text-white/80">TRANSFORMATION</span>
            <span ref={percentTextRef} className="text-raj-gold font-bold">0%</span>
          </div>

          {/* Floating Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Cinema Mode Toggle: Hides all UI cards for pure video viewing */}
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-xl border border-white/20 text-[11px] font-mono text-raj-cream hover:text-raj-gold transition-colors shadow-2xl active:scale-95 cursor-pointer"
              title={isCinemaMode ? 'Show Glassmorphic Cards' : 'Hide Cards for Pure Video'}
            >
              {isCinemaMode ? <Eye className="w-3.5 h-3.5 text-raj-gold" /> : <EyeOff className="w-3.5 h-3.5 text-raj-gold" />}
              <span className="hidden sm:inline font-bold tracking-wider">{isCinemaMode ? 'SHOW DETAILS' : 'PURE VIEW'}</span>
            </button>

            {/* Play/Pause Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-xl border border-white/20 text-[11px] font-mono text-raj-cream hover:text-raj-gold transition-colors shadow-2xl active:scale-95 cursor-pointer"
              title={isPlayingAuto ? 'Switch to Scroll Scrub' : 'Play Video Automatically'}
            >
              {isPlayingAuto ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-raj-gold" />
                  <span className="hidden sm:inline font-bold">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-raj-gold" />
                  <span className="hidden sm:inline">AUTO PLAY</span>
                </>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-black/55 backdrop-blur-xl border border-white/20 text-raj-cream hover:text-raj-gold transition-colors shadow-2xl active:scale-95 cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-raj-gold animate-pulse" />}
            </button>

          </div>

        </div>

        {/* Dynamic Glassmorphic Floating Story Cards for ALL 8 Transformation Craft Stages
            Hardware-accelerated transforms via direct DOM references for 120 FPS performance */}
        <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto transition-opacity duration-300 ${
          isCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          
          {CRAFT_STAGES.map((stage, idx) => (
            <div
              key={stage.id}
              ref={el => { cardRefs.current[idx] = el; }}
              style={{
                opacity: idx === 0 ? 1 : 0,
                transform: idx === 0 ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
                pointerEvents: idx === 0 ? 'auto' : 'none',
                willChange: 'opacity, transform',
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 max-w-xl w-full"
            >
              {/* Ultra-Luxury Glassmorphic Floating Panel */}
              <div className="bg-black/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-raj-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden group">
                
                {/* Subtle Top Glowing Light Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-raj-gold to-transparent opacity-80" />

                {/* Header Row: Stage Number & Status Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-black text-raj-gold drop-shadow-md">
                      {stage.stageNumber}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-raj-sand">
                      / 08 • {stage.discipline}
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-raj-gold/15 border border-raj-gold/40 text-[9px] sm:text-[10px] font-mono text-raj-gold-light uppercase font-bold tracking-wider">
                    {stage.status}
                  </span>
                </div>

                {/* Craft Title */}
                <h2 className="font-serif text-xl sm:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  {stage.title}
                </h2>

                {/* Tagline */}
                <p className="font-serif text-xs sm:text-sm text-raj-sand font-light mt-1.5 leading-snug drop-shadow-md">
                  "{stage.tagline}"
                </p>

                {/* 3 Specifications Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mt-4 pt-3 border-t border-white/10 text-[10px] sm:text-[11px] font-mono text-white/85">
                  {stage.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                      <CheckCircle2 className="w-3 h-3 text-raj-gold flex-shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Stage-8 Final Call to Action */}
                {stage.stageNumber === '08' && (
                  <div className="flex flex-wrap items-center gap-3 mt-5 pt-3 border-t border-white/10">
                    <button
                      onClick={onExploreClick}
                      className="h-10 px-5 rounded-full bg-gradient-to-r from-raj-gold to-raj-gold-light text-raj-bg font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>EXPLORE ALL 11 CRAFTS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onContactClick}
                      className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer"
                    >
                      <PhoneCall className="w-3 h-3 text-raj-gold" />
                      <span>DIRECT INQUIRY</span>
                    </button>
                  </div>
                )}

                {/* Scroll Down Prompt for earlier stages */}
                {stage.stageNumber !== '08' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-raj-sand mt-4">
                    <ChevronDown className="w-3.5 h-3.5 text-raj-gold animate-bounce" />
                    <span className="uppercase tracking-widest">SCROLL TO ADVANCE TO NEXT CRAFT</span>
                  </div>
                )}

              </div>
            </div>
          ))}

        </div>

        {/* Bottom Interactive Milestone Navigation Dock */}
        <div className="relative z-30 pb-5 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl mx-auto flex flex-col gap-2">
            
            {/* Slim Scrub Track */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden relative backdrop-blur-md">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light transition-all duration-75 rounded-full"
                style={{ width: '0%' }}
              />
            </div>

            {/* 8 Discrete Craft Stage Tabs */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 no-scrollbar text-[10px] font-mono">
              {CRAFT_STAGES.map((stg, i) => {
                const isActive = activeStageIndex === i;
                return (
                  <button
                    key={stg.id}
                    ref={el => { tabRefs.current[i] = el; }}
                    onClick={() => jumpToStage(stg.range[0] + 0.01)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-raj-gold text-raj-bg font-bold shadow-md scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{stg.stageNumber}.</span>
                    <span className="hidden md:inline">{stg.discipline.split(' ')[0]}</span>
                  </button>
                );
              })}

              <div className="hidden lg:flex items-center gap-1 text-raj-sand text-[10px]">
                <ChevronDown className="w-3 h-3 text-raj-gold animate-bounce" />
                <span>SCROLL DOWN</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
