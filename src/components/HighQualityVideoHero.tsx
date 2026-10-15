import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, PhoneCall, Play, Pause, Eye, EyeOff, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';

interface HighQualityVideoHeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

interface CraftStage {
  id: string;
  stageNumber: string;
  range: [number, number, number, number]; // [start, peakStart, peakEnd, end]
  title: string;
  shortLabel: string;
  side: 'left' | 'right' | 'center';
}

const CRAFT_STAGES: CraftStage[] = [
  {
    id: 'stage-1',
    stageNumber: '01',
    range: [0.00, 0.02, 0.11, 0.15],
    title: 'Space Planning & Architecture',
    shortLabel: 'Planning',
    side: 'left',
  },
  {
    id: 'stage-2',
    stageNumber: '02',
    range: [0.15, 0.18, 0.25, 0.29],
    title: 'Concealed Electrical & Cabling',
    shortLabel: 'Electrical',
    side: 'right',
  },
  {
    id: 'stage-3',
    stageNumber: '03',
    range: [0.29, 0.32, 0.39, 0.43],
    title: 'Designer False Ceiling & Coves',
    shortLabel: 'Ceiling',
    side: 'left',
  },
  {
    id: 'stage-4',
    stageNumber: '04',
    range: [0.43, 0.46, 0.53, 0.57],
    title: 'Precision Wall Putty & Priming',
    shortLabel: 'Putty',
    side: 'right',
  },
  {
    id: 'stage-5',
    stageNumber: '05',
    range: [0.57, 0.60, 0.67, 0.71],
    title: 'Italian Marble Flooring',
    shortLabel: 'Marble',
    side: 'left',
  },
  {
    id: 'stage-6',
    stageNumber: '06',
    range: [0.71, 0.74, 0.81, 0.85],
    title: 'Precision Modular Kitchen',
    shortLabel: 'Kitchen',
    side: 'right',
  },
  {
    id: 'stage-7',
    stageNumber: '07',
    range: [0.85, 0.88, 0.93, 0.96],
    title: 'Bespoke Wardrobes & Louvers',
    shortLabel: 'Wardrobes',
    side: 'left',
  },
  {
    id: 'stage-8',
    stageNumber: '08',
    range: [0.96, 0.98, 1.00, 1.00],
    title: 'Complete Luxury Turnkey Delivery',
    shortLabel: 'Turnkey',
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
            src="./assets/hero_scrub_optimized.mp4"
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
        {/* Dynamic Bubble Glass Floating Story Elements
            SEQUENTIAL ALTERNATING: 
            - Stage 01: LEFT
            - Stage 02: RIGHT
            - Stage 03: LEFT
            - Stage 04: RIGHT
            - Stage 05: LEFT
            - Stage 06: RIGHT
            - Stage 07: LEFT
            - Stage 08: CENTER FINALE
            FEATURES:
            - Bubble Glass Font with Glowing Edge & Drop-Shadow
            - NO background card obscuring the video (100% video clarity!)
            - Glowing Liquid Bubble Pill Border
            - ONLY the Craft Title, no extra clutter words
            - Mobile-optimized: bottom-anchored, leaving video completely open */}
        <div className={`relative z-20 max-w-7xl mx-auto px-3 sm:px-8 w-full my-auto transition-opacity duration-300 pointer-events-none ${
          isCinemaMode ? 'opacity-0' : 'opacity-100'
        }`}>
          
          {CRAFT_STAGES.map((stage, idx) => {
            // Alternating desktop positioning classes
            const positionClasses = stage.side === 'left'
              ? 'sm:left-6 lg:left-14 sm:right-auto sm:items-start text-left'
              : stage.side === 'right'
              ? 'sm:right-6 lg:right-14 sm:left-auto sm:items-end text-left sm:text-right'
              : 'sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:items-center text-center max-w-2xl';

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
                className={`absolute left-3 right-3 sm:right-auto sm:left-auto bottom-18 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 flex flex-col pointer-events-none transition-all ${positionClasses}`}
              >
                {/* Genuine Bubble Glass Capsule:
                    - 98.5% Transparent (Zero dark box blocking the interior video!)
                    - Glowing gold specular bubble border with pulse
                    - 3D Bubble Glass Title typography with glowing outline
                    - Strictly ONLY Title, zero extra words */}
                <div className="relative inline-flex items-center gap-2.5 sm:gap-4 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full bubble-glass-capsule bubble-glow-active transition-transform duration-300 max-w-[94vw] sm:max-w-none">
                  
                  {/* Liquid Specular Top Rim Reflection */}
                  <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none rounded-full" />

                  {/* Stage Number Pill Badge */}
                  <span className="font-mono text-xs sm:text-sm font-black text-raj-gold tracking-wider px-2.5 py-0.5 rounded-full bg-raj-gold/15 border border-raj-gold/60 shadow-[0_0_12px_rgba(197,168,128,0.5)] flex-shrink-0">
                    {stage.stageNumber}
                  </span>

                  {/* Bubble Glass Font Title with Glowing Edge */}
                  <h2 className="font-serif text-sm xs:text-base sm:text-xl lg:text-2xl xl:text-3xl font-black tracking-wide bubble-glass-text whitespace-normal sm:whitespace-nowrap">
                    {stage.title}
                  </h2>
                </div>

                {/* Stage-8 Turnkey Finale Call-to-Action (Minimal, elegant, only on final stage) */}
                {stage.stageNumber === '08' && (
                  <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-4 pointer-events-auto">
                    <button
                      onClick={onExploreClick}
                      className="h-9 sm:h-10 px-5 rounded-full bg-gradient-to-r from-raj-gold to-raj-gold-light text-raj-bg font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(197,168,128,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>EXPLORE CRAFTS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={onContactClick}
                      className="h-9 sm:h-10 px-4 rounded-full bubble-glass-capsule text-white text-xs font-bold tracking-wider transition-all flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-raj-gold" />
                      <span>DIRECT INQUIRY</span>
                    </button>
                  </div>
                )}
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
                    <span className="hidden md:inline">{stg.shortLabel}</span>
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
