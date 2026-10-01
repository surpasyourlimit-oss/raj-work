import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Layers, Sparkles, ArrowDown, ExternalLink } from 'lucide-react';
import { STORY_SCENES } from '../data/rajData';

interface StoryScrollerProps {
  onSelectService?: (serviceId: string) => void;
}

export const StoryScroller: React.FC<StoryScrollerProps> = ({ onSelectService }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeScene = STORY_SCENES[activeSceneIndex];

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSceneIndex(prev => (prev + 1) % STORY_SCENES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setActiveSceneIndex((prev) => (prev + 1) % STORY_SCENES.length);
  };

  const handlePrev = () => {
    setActiveSceneIndex((prev) => (prev - 1 + STORY_SCENES.length) % STORY_SCENES.length);
  };

  return (
    <section id="story-section" className="relative w-full min-h-[100svh] bg-raj-bg flex flex-col justify-between overflow-hidden border-t border-b border-white/5 py-12 lg:py-16">
      
      {/* Background Architectural Canvas with Crossfade */}
      <div className="absolute inset-0 z-0">
        {STORY_SCENES.map((scene, idx) => (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSceneIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${scene.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transitionProperty: 'opacity, transform',
              transitionDuration: '1000ms'
            }}
          >
            {/* Deep architectural overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-raj-bg/95 via-raj-bg/80 to-transparent lg:w-3/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-raj-bg via-raj-bg/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-raj-bg/60 via-transparent to-raj-bg/90" />
          </div>
        ))}
      </div>

      {/* Top Header & Section Title */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-raj-gold uppercase mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>THE VISUAL STORYTELLING JOURNEY</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-raj-cream">
              From Raw Canvas to Master Living Space
            </h2>
          </div>

          {/* Playback Controls & Progress Status */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-raj-sand transition-colors"
              title={isPlaying ? "Pause visual walkthrough" : "Auto-play visual walkthrough"}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-raj-gold" /> : <Play className="w-3 h-3 text-raj-gold" />}
              <span>{isPlaying ? 'AUTO PLAYING' : 'PAUSED'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-raj-cream transition-colors"
                aria-label="Previous Scene"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-raj-cream transition-colors"
                aria-label="Next Scene"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scene Content Narrator Box */}
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-8 lg:my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Narrative Glass Card */}
          <div className="lg:col-span-6 xl:col-span-5 glass-panel-gold rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl">
            
            {/* Scene Index & Badge */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-black text-raj-gold">
                  {activeScene.sceneNumber}
                </span>
                <span className="text-xs font-mono text-raj-muted">
                  / {STORY_SCENES.length.toString().padStart(2, '0')}
                </span>
              </div>

              <span className="px-3 py-1 rounded-full bg-raj-gold/10 border border-raj-gold/30 text-[10px] sm:text-xs font-mono text-raj-sand uppercase">
                {activeScene.badge}
              </span>
            </div>

            {/* Tagline / Service Header */}
            <div className="mb-2">
              <span className="text-xs font-mono tracking-widest text-raj-gold-light uppercase block">
                {activeScene.title}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-raj-cream mt-1 leading-tight">
                {activeScene.tagline}
              </h3>
            </div>

            <div className="w-16 h-[2px] bg-raj-gold/50 my-5" />

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-raj-muted leading-relaxed font-light mb-8">
              {activeScene.description}
            </p>

            {/* Actions for this specific craft */}
            <div className="flex flex-wrap items-center gap-3">
              {activeScene.serviceId && onSelectService && (
                <button
                  onClick={() => onSelectService(activeScene.serviceId!)}
                  className="px-5 py-2.5 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-wider uppercase hover:bg-raj-gold-light transition-all flex items-center gap-2 shadow-lg shadow-raj-gold/15"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIEW SERVICE SPECS</span>
                </button>
              )}

              <a
                href="#services-section"
                className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-raj-cream border border-white/10 text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5"
              >
                <span>ALL 11 CRAFTS</span>
                <ExternalLink className="w-3 h-3 text-raj-gold" />
              </a>
            </div>

          </div>

          {/* Quick Step Indicators Panel */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pl-6">
            <div className="grid grid-cols-2 gap-3 max-w-lg ml-auto">
              {STORY_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`text-left p-3.5 rounded-2xl transition-all duration-300 border ${
                    idx === activeSceneIndex
                      ? 'bg-raj-gold/20 border-raj-gold text-raj-cream shadow-lg shadow-raj-gold/10 scale-102'
                      : 'bg-raj-card/60 hover:bg-raj-card border-white/5 text-raj-muted hover:text-raj-cream'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={idx === activeSceneIndex ? 'text-raj-gold font-bold' : 'text-raj-muted'}>
                      SCENE {scene.sceneNumber}
                    </span>
                    {idx === activeSceneIndex && (
                      <span className="w-2 h-2 rounded-full bg-raj-gold animate-ping" />
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

      {/* Bottom Timeline Scrubber Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="glass-panel p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col gap-3">
          
          {/* Progress track */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-raj-sand via-raj-gold to-raj-gold-light transition-all duration-500 rounded-full"
              style={{ width: `${((activeSceneIndex + 1) / STORY_SCENES.length) * 100}%` }}
            />
          </div>

          {/* Mobile Scene Selector Scrollable Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {STORY_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  idx === activeSceneIndex
                    ? 'bg-raj-gold text-raj-bg font-bold'
                    : 'bg-white/5 text-raj-muted hover:text-raj-cream hover:bg-white/10'
                }`}
              >
                <span>{scene.sceneNumber}. {scene.tagline.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Scroll down prompt */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-raj-muted mt-4">
          <ArrowDown className="w-3.5 h-3.5 text-raj-gold animate-bounce" />
          <span>SCROLL DOWN TO EXPLORE 3D STUDIO & DETAILED SERVICES</span>
        </div>
      </div>

    </section>
  );
};
