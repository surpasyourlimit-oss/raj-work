import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight, Play, Pause, ChevronDown, PhoneCall, Volume2, VolumeX } from 'lucide-react';
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
  const rafIdRef = useRef<number | null>(null);
  
  const [progress, setProgress] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeMilestone, setActiveMilestone] = useState(0);

  // 4 Milestone points in the transformation sequence
  const milestones = [
    {
      id: 'm1',
      threshold: [0, 0.28],
      step: '01',
      badge: 'THE RAW CANVAS',
      title: BRAND_DATA.name,
      subtitle: BRAND_DATA.descriptor,
      tagline: BRAND_DATA.tagline,
      desc: 'Every master interior begins with raw structural space. An empty architectural canvas awaiting expert design, precision engineering, and complete turnkey execution.',
    },
    {
      id: 'm2',
      threshold: [0.28, 0.58],
      step: '02',
      badge: 'SURFACE & INFRASTRUCTURE',
      title: 'FOUNDATION TO FINISH',
      subtitle: 'FLOORING • PAINT & PUTTY • CEILING • ELECTRICAL',
      tagline: 'Flawless Structural Transformation',
      desc: 'Watch the space transform: Italian marble and chevron wood flooring, multi-tier cove false ceilings with ambient LED strip profiles, concealed electrical tracks, and velvet-matte putty walls.',
    },
    {
      id: 'm3',
      threshold: [0.58, 0.85],
      step: '03',
      badge: 'BESPOKE CRAFTSMANSHIP',
      title: 'MODULAR & FURNITURE',
      subtitle: 'KITCHENS • CUSTOM WOODWORK • FURNISHINGS • FINE ART',
      tagline: 'Tailored Luxury Living',
      desc: 'Precision modular kitchens with soft-close tandem systems, handcrafted residential and commercial woodwork, curated sheer drapery curtains, custom wallpapers, and hand-painted canvases.',
    },
    {
      id: 'm4',
      threshold: [0.85, 1.0],
      step: '04',
      badge: 'THE HARMONIOUS FINALE',
      title: 'COMPLETED RESIDENCE',
      subtitle: 'TOTAL INTERIOR SOLUTION DELIVERED',
      tagline: 'Architectural Perfection',
      desc: 'The complete luxury metamorphosis delivered under one roof. Complete turnkey execution without fragmented contractors, unexpected delays, or compromised quality.',
    },
  ];

  // Update active milestone
  useEffect(() => {
    const idx = milestones.findIndex(
      (m) => progress >= m.threshold[0] && progress <= m.threshold[1]
    );
    if (idx !== -1 && idx !== activeMilestone) {
      setActiveMilestone(idx);
    }
  }, [progress, activeMilestone, milestones]);

  // Performant requestAnimationFrame video frame updates
  const updateVideoFrame = useCallback(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      const diff = Math.abs(targetTimeRef.current - video.currentTime);
      if (diff > 0.02) {
        if ('fastSeek' in video && typeof (video as { fastSeek?: (t: number) => void }).fastSeek === 'function') {
          (video as { fastSeek: (t: number) => void }).fastSeek(targetTimeRef.current);
        } else {
          video.currentTime = targetTimeRef.current;
        }
      }
    }
  }, []);

  // Scroll listener for video scrubbing
  const handleScroll = useCallback(() => {
    if (isPlayingAuto) return;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || !video.duration) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable <= 0) return;

    // Calculate progress between 0 and 1
    const currentProgress = Math.min(
      Math.max(-rect.top / totalScrollable, 0),
      1
    );

    setProgress(currentProgress);

    // Scrub video time smoothly using rAF
    if (Number.isFinite(video.duration) && video.duration > 0) {
      targetTimeRef.current = currentProgress * video.duration;
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(() => {
          updateVideoFrame();
          rafIdRef.current = null;
        });
      }
    }
  }, [isPlayingAuto, updateVideoFrame]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  // Jump to specific milestone
  const jumpToMilestone = (milestoneIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    setIsPlayingAuto(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }

    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const totalScrollable = container.clientHeight - window.innerHeight;
    const targetProgress = milestones[milestoneIndex].threshold[0] + 0.05;

    const targetScrollY = scrollTop + rect.top + targetProgress * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Auto-play toggle
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

  const current = milestones[activeMilestone] || milestones[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[360vh] bg-raj-bg"
    >
      {/* Sticky Fullscreen Video Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Cinematic Video */}
        <div className="absolute inset-0 w-full h-full bg-[#0C0D0F]">
          <video
            ref={videoRef}
            src="./assets/hero_scroll_video.mp4"
            playsInline
            muted={isMuted}
            preload="auto"
            className="w-full h-full object-cover transform scale-102"
          />

          {/* Deep Architectural Dark Vignette Overlays for Maximum Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-raj-bg via-raj-bg/40 to-raj-bg/75 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-raj-bg/90 via-raj-bg/50 to-transparent lg:w-3/5 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(12,13,15,0.75)_85%)] pointer-events-none" />
        </div>

        {/* Top Controls Overlay */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-8 right-4 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-raj-bg/85 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono text-raj-sand shadow-lg">
            <span className="w-2 h-2 rounded-full bg-raj-gold animate-pulse" />
            <span className="uppercase tracking-widest">{current.badge}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {/* Auto play toggle */}
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-raj-bg/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-raj-cream hover:text-raj-gold transition-colors shadow-lg active:scale-95"
              title={isPlayingAuto ? 'Switch to Scroll Scrubbing' : 'Auto Play Video'}
            >
              {isPlayingAuto ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-raj-gold" />
                  <span className="hidden sm:inline">PAUSE VIDEO</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-raj-gold" />
                  <span className="hidden sm:inline">PLAY VIDEO</span>
                </>
              )}
            </button>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-raj-bg/85 backdrop-blur-md border border-white/10 text-raj-cream hover:text-raj-gold transition-colors shadow-lg active:scale-95"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-raj-gold" />
              )}
            </button>
          </div>
        </div>

        {/* Central Narrative Glass Card (Dynamic by Milestone) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl glass-panel-gold rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-500 transform backdrop-blur-md border border-raj-gold/30">
            
            {/* Milestone Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-black text-raj-gold">
                  {current.step}
                </span>
                <span className="text-xs font-mono text-raj-muted">
                  / 04 TRANSFORMATION PHASES
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-raj-gold/15 border border-raj-gold/30 text-[10px] sm:text-xs font-mono text-raj-sand uppercase">
                SCROLL TO SCRUB VIDEO
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="mb-4">
              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-raj-gold-light uppercase block mb-1">
                {current.subtitle}
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {current.title}
              </h1>
              <p className="font-serif text-sm sm:text-lg text-raj-sand font-light mt-1">
                "{current.tagline}"
              </p>
            </div>

            <div className="w-16 h-[2px] bg-raj-gold/60 my-4" />

            {/* Description */}
            <p className="text-xs sm:text-sm text-raj-cream/90 leading-relaxed font-light mb-6">
              {current.desc}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-widest uppercase hover:bg-raj-gold-light transition-all flex items-center gap-2 shadow-lg shadow-raj-gold/25 active:scale-95 cursor-pointer"
              >
                <span>EXPLORE 11 CRAFTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-raj-cream border border-white/15 text-xs font-semibold tracking-widest uppercase transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-raj-gold" />
                <span>DIRECT INQUIRY</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Timeline & Milestones Bar */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-20">
          <div className="max-w-4xl mx-auto glass-panel p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col gap-2.5 shadow-2xl">
            
            {/* Interactive Progress Bar */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light transition-all duration-150 rounded-full"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            {/* Milestones Buttons */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {milestones.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => jumpToMilestone(idx)}
                  className={`py-1.5 px-1 sm:px-2 rounded-xl text-[10px] sm:text-xs font-mono transition-all border cursor-pointer ${
                    activeMilestone === idx
                      ? 'bg-raj-gold text-raj-bg font-bold border-raj-gold shadow-md'
                      : 'bg-white/5 text-raj-muted hover:text-raj-cream border-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="block opacity-60 text-[9px]">PHASE {m.step}</span>
                  <span className="truncate block font-semibold">{m.badge.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Bottom Helper Hint */}
            <div className="flex items-center justify-between text-[10px] font-mono text-raj-muted pt-1 px-1">
              <div className="flex items-center gap-1.5 text-raj-sand">
                <ChevronDown className="w-3.5 h-3.5 text-raj-gold animate-bounce" />
                <span>SCROLL DOWN TO ADVANCE VIDEO ANIMATION</span>
              </div>
              <span className="text-raj-gold font-bold">
                {Math.round(progress * 100)}% COMPLETE
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
