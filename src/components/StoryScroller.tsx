import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Layers, Sparkles, ExternalLink } from 'lucide-react';
import { STORY_SCENES } from '../data/rajData';

interface StoryScrollerProps {
  onSelectService?: (serviceId: string) => void;
}

export const StoryScroller: React.FC<StoryScrollerProps> = ({ onSelectService }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const activeScene = STORY_SCENES[activeSceneIndex];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSceneIndex(prev => (prev + 1) % STORY_SCENES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setActiveSceneIndex((prev) => (prev + 1) % STORY_SCENES.length);
  };

  const handlePrev = () => {
    setActiveSceneIndex((prev) => (prev - 1 + STORY_SCENES.length) % STORY_SCENES.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleNext();
      setIsPlaying(false);
    }
    if (isRightSwipe) {
      handlePrev();
      setIsPlaying(false);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section 
      id="story-section" 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[92svh] sm:min-h-[100svh] bg-raj-bg flex flex-col justify-between overflow-hidden border-t border-b border-white/5 py-8 sm:py-14"
    >
      
      {/* Dynamic Active Background Image (Single active element for 60fps mobile performance) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          key={activeScene.id}
          src={activeScene.image}
          alt={activeScene.title}
          className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700 ease-out"
          style={{ transform: 'translateZ(0)' }}
        />
        {/* Gradients for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-raj-bg/95 via-raj-bg/85 to-raj-bg/40 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-raj-bg via-raj-bg/60 to-raj-bg/70" />
      </div>

      {/* Header Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono tracking-widest text-raj-gold uppercase mb-0.5">
              <Layers className="w-3 h-3" />
              <span>THE VISUAL STORY</span>
            </div>
            <h2 className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-raj-cream">
              Spatial Transformation Journey
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] sm:text-xs font-mono text-raj-sand transition-colors"
              title={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-raj-gold" /> : <Play className="w-3 h-3 text-raj-gold" />}
              <span className="hidden sm:inline">{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-raj-cream transition-colors active:scale-95"
                aria-label="Previous Scene"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-raj-cream transition-colors active:scale-95"
                aria-label="Next Scene"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Narrative Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Narrative Card */}
          <div className="lg:col-span-6 xl:col-span-5 glass-panel-gold rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl">
            
            {/* Index & Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-black text-raj-gold">
                  {activeScene.sceneNumber}
                </span>
                <span className="text-[11px] font-mono text-raj-muted">
                  / {STORY_SCENES.length.toString().padStart(2, '0')}
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-raj-gold/15 border border-raj-gold/30 text-[9px] sm:text-[10px] font-mono text-raj-sand uppercase">
                {activeScene.badge}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="mb-3">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-raj-gold-light uppercase block">
                {activeScene.title}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-raj-cream mt-0.5 leading-snug">
                {activeScene.tagline}
              </h3>
            </div>

            <div className="w-12 h-[2px] bg-raj-gold/50 my-3" />

            {/* Description */}
            <p className="text-xs sm:text-sm text-raj-cream/90 leading-relaxed font-light mb-6">
              {activeScene.description}
            </p>

            {/* Mobile Swipe Hint */}
            <div className="sm:hidden text-[10px] font-mono text-raj-muted mb-4 flex items-center gap-1">
              <span>← SWIPE TO BROWSE SCENES →</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {activeScene.serviceId && onSelectService && (
                <button
                  onClick={() => onSelectService(activeScene.serviceId!)}
                  className="px-4 py-2 rounded-full bg-raj-gold text-raj-bg font-bold text-[11px] sm:text-xs tracking-wider uppercase hover:bg-raj-gold-light transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>VIEW DETAILS</span>
                </button>
              )}

              <a
                href="#services-section"
                className="px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-raj-cream border border-white/10 text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1"
              >
                <span>ALL 11 CRAFTS</span>
                <ExternalLink className="w-3 h-3 text-raj-gold" />
              </a>
            </div>

          </div>

          {/* Desktop Direct Step Selector */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pl-4">
            <div className="grid grid-cols-2 gap-2.5 max-w-lg ml-auto">
              {STORY_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`text-left p-3 rounded-xl transition-all duration-200 border ${
                    idx === activeSceneIndex
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-cream shadow-md scale-101'
                      : 'bg-raj-card/70 hover:bg-raj-card border-white/5 text-raj-muted hover:text-raj-cream'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                    <span className={idx === activeSceneIndex ? 'text-raj-gold font-bold' : 'text-raj-muted'}>
                      SCENE {scene.sceneNumber}
                    </span>
                    {idx === activeSceneIndex && (
                      <span className="w-1.5 h-1.5 rounded-full bg-raj-gold animate-ping" />
                    )}
                  </div>
                  <div className="text-xs font-semibold truncate text-raj-cream">
                    {scene.tagline}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Progress Bar & Horizontal Mobile Scroller */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2">
        <div className="glass-panel p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-white/10 flex flex-col gap-2">
          
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light transition-all duration-300"
              style={{ width: `${((activeSceneIndex + 1) / STORY_SCENES.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {STORY_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                  idx === activeSceneIndex
                    ? 'bg-raj-gold text-raj-bg font-bold'
                    : 'bg-white/5 text-raj-muted hover:text-raj-cream'
                }`}
              >
                <span>{scene.sceneNumber}. {scene.tagline.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};
