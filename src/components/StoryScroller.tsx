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
    if (distance > 45) {
      handleNext();
      setIsPlaying(false);
    } else if (distance < -45) {
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
      className="relative w-full py-16 sm:py-24 bg-black/40 backdrop-blur-xl border-y border-white/10 flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-raj-gold/15 border border-raj-gold/30 text-[10px] sm:text-xs font-mono tracking-widest text-raj-gold uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>THE VISUAL STORY</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Spatial Transformation Journey
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-[11px] font-mono text-raj-sand transition-colors cursor-pointer"
              title={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-raj-gold" /> : <Play className="w-3 h-3 text-raj-gold" />}
              <span>{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-raj-cream transition-colors active:scale-95 cursor-pointer"
                aria-label="Previous Scene"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-raj-cream transition-colors active:scale-95 cursor-pointer"
                aria-label="Next Scene"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Narrative Content Box & Side-by-Side Image Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-10">
          
          {/* Narrative Card (Left) */}
          <div className="lg:col-span-5 bg-black/50 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
            
            {/* Index & Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-black text-raj-gold">
                  {activeScene.sceneNumber}
                </span>
                <span className="text-xs font-mono text-white/50">
                  / {STORY_SCENES.length.toString().padStart(2, '0')}
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-raj-gold/15 border border-raj-gold/30 text-[10px] font-mono text-raj-sand uppercase font-bold">
                {activeScene.badge}
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="mb-3">
              <span className="text-xs font-mono tracking-widest text-raj-gold uppercase block">
                {activeScene.title}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white mt-1 leading-snug">
                {activeScene.tagline}
              </h3>
            </div>

            <div className="w-12 h-[2px] bg-raj-gold/60 my-4" />

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light mb-6">
              {activeScene.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {activeScene.serviceId && onSelectService && (
                <button
                  onClick={() => onSelectService(activeScene.serviceId!)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-raj-gold to-raj-gold-light text-raj-bg font-bold text-xs tracking-wider uppercase hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIEW DETAILS</span>
                </button>
              )}

              <a
                href="#services-section"
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-raj-cream border border-white/15 text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>ALL 11 CRAFTS</span>
                <ExternalLink className="w-3.5 h-3.5 text-raj-gold" />
              </a>
            </div>

          </div>

          {/* Framed Scene Visual Preview (Right) - Lets background video breathe behind */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/15 p-2 shadow-2xl relative group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#121418]">
              <img
                key={activeScene.id}
                src={activeScene.image}
                alt={activeScene.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  PHASE: {activeScene.badge}
                </span>
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-raj-gold font-bold">
                  SCENE {activeScene.sceneNumber} OF {STORY_SCENES.length}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Scene Thumbnail Navigator */}
        <div className="bg-black/50 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/15 shadow-xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {STORY_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                  idx === activeSceneIndex
                    ? 'bg-raj-gold text-raj-bg font-bold shadow-md shadow-raj-gold/20'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white border border-white/10'
                }`}
              >
                <span>{scene.sceneNumber}.</span>
                <span className="truncate max-w-[140px] sm:max-w-none">{scene.tagline.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
