import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, PhoneCall, Volume2, VolumeX, Play, Pause, Eye, EyeOff } from 'lucide-react';
import { BRAND_DATA } from '../data/rajData';

interface ScrollVideoHeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const ScrollVideoHero: React.FC<ScrollVideoHeroProps> = ({
  onExploreClick,
  onContactClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const [progress, setProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(16.17);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);

  // Smooth lerped video seek loop
  useEffect(() => {
    const loop = () => {
      const video = videoRef.current;
      if (video && Number.isFinite(video.duration) && video.duration > 0 && !isPlayingAuto) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.015) {
          // Smooth 25% damping lerp step for buttery motion
          const step = diff * 0.25;
          const nextTime = Math.abs(diff) < 0.03 ? targetTimeRef.current : video.currentTime + step;
          if ('fastSeek' in video && typeof (video as { fastSeek?: (t: number) => void }).fastSeek === 'function') {
            (video as { fastSeek: (t: number) => void }).fastSeek(nextTime);
          } else {
            video.currentTime = nextTime;
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlayingAuto]);

  // Handle scroll progress through the 450vh container
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const rect = container.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;

    // Progress 0.0 -> 1.0 strictly through this section
    const currentProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
    setProgress(currentProgress);

    if (!isPlayingAuto) {
      const duration = video.duration || videoDuration;
      targetTimeRef.current = currentProgress * duration;
    }
  }, [isPlayingAuto, videoDuration]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Video metadata and initial setup
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
      video.muted = isMuted;
      // Seek slightly to 0.05s to bypass any blank first frame
      video.currentTime = 0.05;
    }
  };

  // Jump smoothly to a specific milestone
  const jumpToMilestone = (milestonePercent: number) => {
    const container = containerRef.current;
    if (!container) return;

    setIsPlayingAuto(false);
    if (videoRef.current) videoRef.current.pause();

    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const totalScrollable = container.clientHeight - window.innerHeight;
    const targetScrollY = scrollTop + rect.top + milestonePercent * totalScrollable;

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

  // Helper function to calculate clean floating text opacity and translateY
  const getStageOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (progress < start || progress > end) return { opacity: 0, translateY: 24, pointerEvents: 'none' as const };
    if (progress < peakStart) {
      const factor = (progress - start) / (peakStart - start);
      return { opacity: factor, translateY: 20 * (1 - factor), pointerEvents: 'auto' as const };
    }
    if (progress > peakEnd) {
      const factor = (end - progress) / (end - peakEnd);
      return { opacity: factor, translateY: -20 * (1 - factor), pointerEvents: 'none' as const };
    }
    return { opacity: 1, translateY: 0, pointerEvents: 'auto' as const };
  };

  const s1 = getStageOpacity(0.00, 0.03, 0.18, 0.24);
  const s2 = getStageOpacity(0.24, 0.29, 0.44, 0.50);
  const s3 = getStageOpacity(0.50, 0.55, 0.70, 0.76);
  const s4 = getStageOpacity(0.76, 0.81, 0.98, 1.00);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#0A0B0E]"
    >
      {/* Sticky Fullscreen 4K Video Viewport:
          Pins for 450vh while scrolling smoothly scrubs the video.
          Strictly when progress hits 100%, continuing to scroll reveals the rest of the website! */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Master Fullscreen 4K Video Element */}
        <div className="absolute inset-0 w-full h-full bg-[#0A0B0E] pointer-events-none select-none">
          <video
            ref={videoRef}
            src="/assets/hero_scroll_video.mp4"
            playsInline
            loop={isPlayingAuto}
            muted={isMuted}
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover scale-[1.01] will-change-transform"
          />

          {/* Minimalist Translucent Vignettes:
              Ensures the video is 100% visible, bright, and vibrant, while guaranteeing crisp text readability */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/80 via-transparent to-[#0A0B0E]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E]/60 via-transparent to-transparent sm:w-2/3 pointer-events-none" />
        </div>

        {/* Top Controls Bar */}
        <div className="relative z-30 pt-20 sm:pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
          
          {/* Scroll Status Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-xl border border-white/20 text-[11px] sm:text-xs font-mono text-raj-sand shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-raj-gold animate-pulse" />
            <span className="font-bold text-raj-gold uppercase tracking-wider">{BRAND_DATA.name}</span>
            <span className="text-white/25">|</span>
            <span className="uppercase text-white/80">TRANSFORMATION</span>
            <span className="text-raj-gold font-bold">{Math.round(progress * 100)}%</span>
          </div>

          {/* Floating Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Cinema Mode Toggle: Hides all UI text for pure video viewing */}
            <button
              onClick={() => setIsCinemaMode(!isCinemaMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-xl border border-white/20 text-[11px] font-mono text-raj-cream hover:text-raj-gold transition-colors shadow-2xl active:scale-95 cursor-pointer"
              title={isCinemaMode ? 'Show Text' : 'Hide Text for Pure Video'}
            >
              {isCinemaMode ? <Eye className="w-3.5 h-3.5 text-raj-gold" /> : <EyeOff className="w-3.5 h-3.5 text-raj-gold" />}
              <span className="hidden sm:inline font-bold tracking-wider">{isCinemaMode ? 'SHOW TEXT' : 'PURE VIDEO'}</span>
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
                  <span className="hidden sm:inline">PLAY</span>
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

        {/* Floating Typography Stages (NO SOLID POSTER BOX, NO OPAQUE CARDS)
            Text floats in gently so 100% of the transformation video remains visible */}
        <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto transition-opacity duration-500 ${
          isCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>

          {/* STAGE 1: RAW CANVAS (0% - 25%) */}
          <div
            style={{
              opacity: s1.opacity,
              transform: `translateY(${s1.translateY}px)`,
              pointerEvents: s1.pointerEvents,
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 max-w-2xl transition-all duration-200"
          >
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-raj-gold/30 text-[11px] font-mono text-raj-sand">
              <span className="text-raj-gold font-bold">PHASE 01</span>
              <span>•</span>
              <span className="uppercase tracking-wider">RAW STRUCTURAL CANVAS</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
              Architectural <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light">
                Metamorphosis
              </span>
            </h1>

            <p className="font-serif text-base sm:text-2xl text-raj-sand font-light mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              "{BRAND_DATA.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light mt-3 max-w-md drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Raw concrete and bare structural walls awaiting turnkey architectural vision. 
              Scroll down to witness the continuous living transformation.
            </p>

            <div className="flex items-center gap-2 mt-5 text-[11px] font-mono text-raj-sand">
              <ChevronDown className="w-4 h-4 text-raj-gold animate-bounce" />
              <span className="tracking-widest uppercase">SCROLL TO ADVANCE TRANSFORMATION</span>
            </div>
          </div>

          {/* STAGE 2: SURFACE & CEILING (25% - 50%) */}
          <div
            style={{
              opacity: s2.opacity,
              transform: `translateY(${s2.translateY}px)`,
              pointerEvents: s2.pointerEvents,
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 max-w-2xl transition-all duration-200"
          >
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-raj-gold/30 text-[11px] font-mono text-raj-sand">
              <span className="text-raj-gold font-bold">PHASE 02</span>
              <span>•</span>
              <span className="uppercase tracking-wider">SURFACES & CEILING</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
              Infrastructure & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light">
                Surface Perfection
              </span>
            </h2>

            <p className="font-serif text-base sm:text-xl text-raj-sand font-light mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Italian Marble • Chevron Hardwood • POP False Ceiling
            </p>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light mt-3 max-w-md drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Structural leveling, concealed electrical wiring, multi-tier cove LED lighting channels, and seamless mirror-polished flooring.
            </p>

            <div className="flex items-center gap-2 mt-5 text-[11px] font-mono text-raj-sand">
              <ChevronDown className="w-4 h-4 text-raj-gold animate-bounce" />
              <span className="tracking-widest uppercase">KEEP SCROLLING FOR WOODWORK</span>
            </div>
          </div>

          {/* STAGE 3: MODULAR & WOODWORK (50% - 75%) */}
          <div
            style={{
              opacity: s3.opacity,
              transform: `translateY(${s3.translateY}px)`,
              pointerEvents: s3.pointerEvents,
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 max-w-2xl transition-all duration-200"
          >
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-raj-gold/30 text-[11px] font-mono text-raj-sand">
              <span className="text-raj-gold font-bold">PHASE 03</span>
              <span>•</span>
              <span className="uppercase tracking-wider">BESPOKE CRAFTSMANSHIP</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
              Modular Kitchen & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light">
                Custom Woodwork
              </span>
            </h2>

            <p className="font-serif text-base sm:text-xl text-raj-sand font-light mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Precision Cabinetry • Charcoal Louvers • Velvet Texture Wallpapers
            </p>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light mt-3 max-w-md drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Ergonomic German-hardware modular kitchen, custom wardrobes, artistic murals, and fluted acoustic charcoal wall panels.
            </p>

            <div className="flex items-center gap-2 mt-5 text-[11px] font-mono text-raj-sand">
              <ChevronDown className="w-4 h-4 text-raj-gold animate-bounce" />
              <span className="tracking-widest uppercase">SCROLL FOR COMPLETED FINALE</span>
            </div>
          </div>

          {/* STAGE 4: COMPLETED RESIDENCE (75% - 100%) */}
          <div
            style={{
              opacity: s4.opacity,
              transform: `translateY(${s4.translateY}px)`,
              pointerEvents: s4.pointerEvents,
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 max-w-2xl transition-all duration-200"
          >
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-raj-gold/30 text-[11px] font-mono text-raj-sand">
              <span className="text-raj-gold font-bold">PHASE 04</span>
              <span>•</span>
              <span className="uppercase tracking-wider">COMPLETED MASTERPIECE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
              Turnkey Luxury <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light">
                Delivered
              </span>
            </h2>

            <p className="font-serif text-base sm:text-xl text-raj-sand font-light mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              11 In-House Disciplines • One Unified Guarantee
            </p>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light mt-3 max-w-md drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              The spatial transformation is complete. Scroll down past the video to explore all 11 disciplines, materials, and statutory records.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={onExploreClick}
                className="h-11 px-6 rounded-full bg-gradient-to-r from-raj-gold to-raj-gold-light text-raj-bg font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>EXPLORE 11 SERVICES</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="h-11 px-5 rounded-full bg-black/50 hover:bg-black/70 text-raj-cream border border-white/20 text-xs font-semibold tracking-wider transition-all flex items-center gap-2 backdrop-blur-xl active:scale-95 cursor-pointer shadow-xl"
              >
                <PhoneCall className="w-3.5 h-3.5 text-raj-gold" />
                <span>DIRECT INQUIRY</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Minimal Interactive Progress Dock */}
        <div className="relative z-30 pb-5 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl mx-auto flex flex-col gap-2">
            
            {/* Slim Scrub Track */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden relative backdrop-blur-md">
              <div
                className="h-full bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light transition-all duration-75 rounded-full"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            {/* Discreet Milestone Tabs */}
            <div className="flex items-center justify-between gap-1 text-[10px] sm:text-xs font-mono">
              <button
                onClick={() => jumpToMilestone(0.0)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  progress < 0.25
                    ? 'bg-raj-gold text-raj-bg font-bold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                01. RAW
              </button>

              <button
                onClick={() => jumpToMilestone(0.35)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  progress >= 0.25 && progress < 0.50
                    ? 'bg-raj-gold text-raj-bg font-bold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                02. STRUCTURE
              </button>

              <button
                onClick={() => jumpToMilestone(0.62)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  progress >= 0.50 && progress < 0.75
                    ? 'bg-raj-gold text-raj-bg font-bold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                03. WOODWORK
              </button>

              <button
                onClick={() => jumpToMilestone(0.88)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  progress >= 0.75
                    ? 'bg-raj-gold text-raj-bg font-bold shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                04. COMPLETE
              </button>

              <div className="hidden sm:flex items-center gap-1 text-raj-sand text-[10px]">
                <ChevronDown className="w-3 h-3 text-raj-gold animate-bounce" />
                <span>SCROLL TO ADVANCE</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
