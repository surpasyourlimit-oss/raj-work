import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, PhoneCall, Play, Pause, Eye, EyeOff, CheckCircle2, Volume2, VolumeX, Sparkles } from 'lucide-react';
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
  side: 'left' | 'right' | 'center';
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
    specs: ['Site Survey & Laser Leveling', 'Wall Demolition & Clearance', 'Column Reinforcement'],
    status: 'IN-HOUSE CRAFT',
    side: 'left',
  },
  {
    id: 'stage-2',
    stageNumber: '02',
    range: [0.15, 0.18, 0.25, 0.29],
    badge: 'PHASE 02 • SAFETY & CABLING',
    discipline: 'CONCEALED ELECTRICAL',
    title: 'Concealed Conduits & Fire-Resistant Wiring',
    tagline: 'FR-LSH copper wiring, concealed wall channelling & modular gang-boxes.',
    specs: ['Fire-Resistant Multi-Strand Wire', 'Concealed PVC Channelling', 'Heavy-Load HVAC Circuits'],
    status: 'IN-HOUSE CRAFT',
    side: 'right',
  },
  {
    id: 'stage-3',
    stageNumber: '03',
    range: [0.29, 0.32, 0.39, 0.43],
    badge: 'PHASE 03 • CEILING & COVE LIGHTS',
    discipline: 'POP & GYPSUM CEILING',
    title: 'Multi-Tier False Ceiling & Ambient Coves',
    tagline: 'Anti-sag GI framework, Saint-Gobain boards & magnetic track light channels.',
    specs: ['Architectural Drop Coves', 'Concealed Ambient LED Slots', 'Magnetic Track Cutouts'],
    status: 'IN-HOUSE CRAFT',
    side: 'left',
  },
  {
    id: 'stage-4',
    stageNumber: '04',
    range: [0.43, 0.46, 0.53, 0.57],
    badge: 'PHASE 04 • SURFACE INTEGRITY',
    discipline: 'WALL PUTTY & PRIMING',
    title: '3-Stage Putty Sanding & Silk Base Coats',
    tagline: 'Machine sanding with zero-undulation laser check & waterproofing primer sealant.',
    specs: ['3-Layer Polymer Putty', 'Rotary Dustless Sanding', 'Moisture-Barrier Primer'],
    status: 'IN-HOUSE CRAFT',
    side: 'right',
  },
  {
    id: 'stage-5',
    stageNumber: '05',
    range: [0.57, 0.60, 0.67, 0.71],
    badge: 'PHASE 05 • FLOORING & STONEWORK',
    discipline: 'ITALIAN MARBLE & TILES',
    title: 'Statuario Marble Laying & Seamless Joints',
    tagline: 'High-gloss mirror-polished marble slabs, vitrified tiles & herringbone parquet.',
    specs: ['Italian Statuario Book-Match', 'Diamond-Pad Mirror Polish', 'Seamless Epoxy Joint Infills'],
    status: 'IN-HOUSE CRAFT',
    side: 'left',
  },
  {
    id: 'stage-6',
    stageNumber: '06',
    range: [0.71, 0.74, 0.81, 0.85],
    badge: 'PHASE 06 • MODULAR ERGONOMICS',
    discipline: 'MODULAR KITCHEN',
    title: 'Precision Modular Kitchen & Quartz Counters',
    tagline: 'BWR marine ply, anti-scratch acrylic shutters & Blum soft-close fittings.',
    specs: ['BWR Marine Grade Carcass', 'High-Gloss Acrylic Shutters', '18mm Quartz Stone Counter'],
    status: 'IN-HOUSE CRAFT',
    side: 'right',
  },
  {
    id: 'stage-7',
    stageNumber: '07',
    range: [0.85, 0.88, 0.93, 0.96],
    badge: 'PHASE 07 • BESPOKE WOODWORK',
    discipline: 'FURNITURE & LOUVERS',
    title: 'Custom Wardrobes & Charcoal Highlighters',
    tagline: 'Full-height floor-to-ceiling wardrobes, fluted charcoal louvers & brass inlays.',
    specs: ['Floor-to-Ceiling Wardrobes', 'Fluted Acoustic Charcoal Walls', 'PVD Gold Brass Inlays'],
    status: 'IN-HOUSE CRAFT',
    side: 'left',
  },
  {
    id: 'stage-8',
    stageNumber: '08',
    range: [0.96, 0.98, 1.00, 1.00],
    badge: 'PHASE 08 • THE GRAND FINALE',
    discipline: 'COMPLETED MASTERPIECE',
    title: 'Complete Turnkey Metamorphosis Delivered',
    tagline: '11 in-house crafts unified into an architectural masterpiece ready for luxury living.',
    specs: ['100% In-House Factory Fabrication', 'Zero Middlemen • Unified Warranty', 'Turnkey Statutory Handover'],
    status: 'READY FOR LUXURY LIVING',
    side: 'center',
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

  // High-performance scroll tracking refs (Zero React re-render churn during scroll)
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

  // High-performance rAF loop: drives video seek and liquid glass left/right alternating animations
  useEffect(() => {
    const loop = () => {
      const video = videoRef.current;

      if (!isPlayingAuto) {
        // Smooth lerp progress damping (25% step)
        const pDiff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(pDiff) > 0.0004) {
          currentProgressRef.current += pDiff * 0.25;
        }

        const p = currentProgressRef.current;

        // Video seeking: instantaneous hardware GOP=2 jump
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

        // Direct DOM Liquid Glass Left/Right Alternating Animation (Zero React re-renders!)
        let activeIdx = 0;
        const isMobile = window.innerWidth < 640;

        CRAFT_STAGES.forEach((stage, idx) => {
          const el = cardRefs.current[idx];
          if (!el) return;

          const [start, peakStart, peakEnd, end] = stage.range;
          let opacity = 0;
          let translateX = 0;
          let translateY = 20;
          let scale = 0.98;

          if (p >= start && p <= end) {
            activeIdx = idx;

            if (p < peakStart) {
              // ENTRANCE: Slide in from its assigned side (Left or Right)
              const f = (p - start) / (peakStart - start);
              opacity = f;
              const baseOffset = isMobile ? 0 : (stage.side === 'left' ? -38 : stage.side === 'right' ? 38 : 0);
              translateX = baseOffset * (1 - f);
              translateY = 16 * (1 - f);
              scale = 0.96 + 0.04 * f;
            } else if (p > peakEnd) {
              // EXIT: Slide out smoothly
              const f = (end - p) / (end - peakEnd);
              opacity = f;
              const exitOffset = isMobile ? 0 : (stage.side === 'left' ? 24 : stage.side === 'right' ? -24 : 0);
              translateX = exitOffset * (1 - f);
              translateY = -16 * (1 - f);
              scale = 0.96 + 0.04 * f;
            } else {
              // PEAK ACTIVE: Fully visible at target position
              opacity = 1;
              translateX = 0;
              translateY = 0;
              scale = 1;
            }
          }

          // Apply directly to DOM without causing React state reconciliation
          el.style.opacity = String(opacity);
          el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
          el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
        });

        // Update progress bar and percentage directly
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.round(p * 100)}%`;
        }
        if (percentTextRef.current) {
          percentTextRef.current.innerText = `${Math.round(p * 100)}%`;
        }

        // Only update active stage index state when it actually changes
        setActiveStageIndex(prev => prev !== activeIdx ? activeIdx : prev);

      } else {
        // Continuous auto-play loop
        if (video && Number.isFinite(video.duration) && video.duration > 0) {
          const p = video.currentTime / video.duration;
          currentProgressRef.current = p;
          targetProgressRef.current = p;
          currentVideoTimeRef.current = video.currentTime;

          let activeIdx = 0;
          CRAFT_STAGES.forEach((stage, idx) => {
            const el = cardRefs.current[idx];
            if (!el) return;
            const [start, peakStart, peakEnd, end] = stage.range;
            let opacity = 0;
            let translateY = 20;

            if (p >= start && p <= end) {
              activeIdx = idx;
              if (p < peakStart) {
                const f = (p - start) / (peakStart - start);
                opacity = f;
                translateY = 16 * (1 - f);
              } else if (p > peakEnd) {
                const f = (end - p) / (end - peakEnd);
                opacity = f;
                translateY = -16 * (1 - f);
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
      {/* Sticky Fullscreen 1080p 60fps Video Viewport:
          - Pins for 450vh while scroll smoothly scrubs the video
          - Liquid glass panels let 100% of the room and lights show through!
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

          {/* Ultra-Lightweight ambient gradient: NO heavy dark boxes blocking the video! */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/70 via-transparent to-[#0A0B0E]/30 pointer-events-none" />
        </div>

        {/* Top Floating Controls Bar */}
        <div className="relative z-30 pt-18 sm:pt-22 px-3 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Scroll Status Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/20 text-[10px] sm:text-xs font-mono text-raj-sand shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-raj-gold animate-pulse" />
            <span className="font-bold text-raj-gold uppercase tracking-wider">{BRAND_DATA.name}</span>
            <span className="text-white/25 hidden xs:inline">|</span>
            <span className="uppercase text-white/80 hidden xs:inline">TRANSFORMATION</span>
            <span ref={percentTextRef} className="text-raj-gold font-bold">0%</span>
          </div>

          {/* Floating Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Cinema Mode Toggle: Hides all UI text for 100% pure video viewing */}
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/20 text-[10px] sm:text-[11px] font-mono text-raj-cream hover:text-raj-gold transition-colors shadow-2xl active:scale-95 cursor-pointer"
              title={isCinemaMode ? 'Show Text' : 'Pure Video Mode (Hide Text)'}
            >
              {isCinemaMode ? <Eye className="w-3.5 h-3.5 text-raj-gold" /> : <EyeOff className="w-3.5 h-3.5 text-raj-gold" />}
              <span className="hidden sm:inline font-bold tracking-wider">{isCinemaMode ? 'SHOW DETAILS' : 'PURE VIEW'}</span>
            </button>

            {/* Play/Pause Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/20 text-[10px] sm:text-[11px] font-mono text-raj-cream hover:text-raj-gold transition-colors shadow-2xl active:scale-95 cursor-pointer"
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
              className="p-1.5 sm:p-2 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/20 text-raj-cream hover:text-raj-gold transition-colors shadow-2xl active:scale-95 cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-raj-gold animate-pulse" />}
            </button>

          </div>

        </div>

        {/* Dynamic Liquid Glass Floating Story Elements
            SEQUENTIAL ALTERNATING: 
            - Stage 01: LEFT
            - Stage 02: RIGHT
            - Stage 03: LEFT
            - Stage 04: RIGHT
            - Stage 05: LEFT
            - Stage 06: RIGHT
            - Stage 07: LEFT
            - Stage 08: CENTER FINALE
            MOBILE OPTIMIZED: Compact, bottom-anchored, leaves top 65% open for video! */}
        <div className={`relative z-20 max-w-7xl mx-auto px-3 sm:px-8 w-full my-auto transition-opacity duration-300 pointer-events-none ${
          isCinemaMode ? 'opacity-0' : 'opacity-100'
        }`}>
          
          {CRAFT_STAGES.map((stage, idx) => {
            // Alternating desktop positioning classes
            const positionClasses = stage.side === 'left'
              ? 'sm:left-6 lg:left-14 sm:right-auto sm:text-left'
              : stage.side === 'right'
              ? 'sm:right-6 lg:right-14 sm:left-auto sm:text-left'
              : 'sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:text-center max-w-2xl';

            return (
              <div
                key={stage.id}
                ref={el => { cardRefs.current[idx] = el; }}
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                  pointerEvents: idx === 0 ? 'auto' : 'none',
                  willChange: 'opacity, transform',
                }}
                className={`absolute left-3 right-3 sm:right-auto sm:left-auto bottom-18 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-lg w-auto transition-all ${positionClasses}`}
              >
                {/* Genuine Liquid Glass Lens:
                    - Almost 100% transparent (bg-white/[0.04])
                    - Real glass specular rim highlight (inset 0 1px 1px rgba(255,255,255,0.3))
                    - Zero dark black fill: the video shows through completely! */}
                <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/20 hover:border-raj-gold/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.25)] transition-colors duration-300 overflow-hidden">
                  
                  {/* Liquid Specular Top Rim */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  
                  {/* Subtle Gold Pulse Aura for active craft */}
                  <div className="absolute -top-12 -left-12 w-28 h-28 bg-raj-gold/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Header Row: Stage Number, Discipline & Status */}
                  <div className={`flex items-center gap-2 mb-2 ${stage.side === 'center' ? 'sm:justify-center' : 'justify-between'}`}>
                    <div className="inline-flex items-center gap-2">
                      <span className="font-serif text-xl sm:text-2xl font-black text-raj-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {stage.stageNumber}
                      </span>
                      <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-raj-sand drop-shadow-md">
                        / 08 • {stage.discipline}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[8px] sm:text-[9px] font-mono text-raj-gold uppercase font-bold tracking-wider backdrop-blur-md">
                      {stage.status}
                    </span>
                  </div>

                  {/* Craft Title with High-Contrast Text-Shadow (Readable on any frame!) */}
                  <h2 className="font-serif text-lg sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    {stage.title}
                  </h2>

                  {/* Tagline */}
                  <p className="font-serif text-[11px] sm:text-xs text-raj-sand font-light mt-1 sm:mt-1.5 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    "{stage.tagline}"
                  </p>

                  {/* Liquid Glass Specifications Badges */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mt-3 pt-2.5 border-t border-white/10 text-[9px] sm:text-[10px] font-mono text-white/90 ${stage.side === 'center' ? 'max-w-md mx-auto' : ''}`}>
                    {stage.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-white/[0.05] px-2 py-1 rounded-lg border border-white/15 backdrop-blur-md">
                        <CheckCircle2 className="w-3 h-3 text-raj-gold flex-shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stage-8 Turnkey Finale Call-to-Action */}
                  {stage.stageNumber === '08' && (
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4 pt-3 border-t border-white/10">
                      <button
                        onClick={onExploreClick}
                        className="h-9 sm:h-10 px-5 rounded-full bg-gradient-to-r from-raj-gold to-raj-gold-light text-raj-bg font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>EXPLORE 11 CRAFTS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={onContactClick}
                        className="h-9 sm:h-10 px-4 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-raj-gold" />
                        <span>DIRECT INQUIRY</span>
                      </button>
                    </div>
                  )}

                  {/* Scroll Down Prompt for earlier stages */}
                  {stage.stageNumber !== '08' && (
                    <div className={`flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-raj-sand mt-2.5 ${stage.side === 'center' ? 'justify-center' : ''}`}>
                      <ChevronDown className="w-3 h-3 text-raj-gold animate-bounce" />
                      <span className="uppercase tracking-widest">SCROLL FOR NEXT CRAFT ({stage.side === 'left' ? '→ RIGHT' : '← LEFT'})</span>
                    </div>
                  )}

                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom Interactive Milestone Navigation Dock
            Mobile Optimized with horizontal scroll bar and compact buttons */}
        <div className="relative z-30 pb-3 sm:pb-5 px-3 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl mx-auto flex flex-col gap-1.5 sm:gap-2">
            
            {/* Slim Scrub Track */}
            <div className="w-full bg-white/20 h-1 sm:h-1.5 rounded-full overflow-hidden relative backdrop-blur-md">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light transition-all duration-75 rounded-full"
                style={{ width: '0%' }}
              />
            </div>

            {/* 8 Discrete Craft Stage Tabs */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 no-scrollbar text-[9px] sm:text-[10px] font-mono">
              {CRAFT_STAGES.map((stg, i) => {
                const isActive = activeStageIndex === i;
                return (
                  <button
                    key={stg.id}
                    ref={el => { tabRefs.current[i] = el; }}
                    onClick={() => jumpToStage(stg.range[0] + 0.01)}
                    className={`flex-shrink-0 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      isActive
                        ? 'bg-raj-gold text-raj-bg font-bold shadow-md scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{stg.stageNumber}.</span>
                    <span className="hidden md:inline">{stg.discipline.split(' ')[0]}</span>
                    <span className="hidden sm:inline md:hidden text-[8px]">{stg.side === 'left' ? 'L' : stg.side === 'right' ? 'R' : 'C'}</span>
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
