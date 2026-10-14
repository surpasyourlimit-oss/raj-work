import React, { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { BackgroundVideoScroller, BackgroundVideoRef } from './components/BackgroundVideoScroller';
import { ScrollVideoHero } from './components/ScrollVideoHero';
import { StoryScroller } from './components/StoryScroller';
import { InteriorSolutions } from './components/InteriorSolutions';
import { MaterialConfigurator } from './components/MaterialConfigurator';
import { ManufacturerSection } from './components/ManufacturerSection';
import { DirectContact } from './components/DirectContact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const videoScrollerRef = useRef<BackgroundVideoRef>(null);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [activeMilestone, setActiveMilestone] = useState<number>(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMilestoneClick = (percent: number) => {
    if (videoScrollerRef.current) {
      videoScrollerRef.current.seekToPercent(percent);
    }
  };

  const handleProgressUpdate = (_prog: number, activeM: number) => {
    setActiveMilestone(activeM);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-raj-cream flex flex-col selection:bg-raj-gold selection:text-raj-bg font-sans">
      
      {/* 1. Master Fixed 4K Background Video across the ENTIRE website */}
      <BackgroundVideoScroller
        ref={videoScrollerRef}
        isCinemaMode={isCinemaMode}
        onToggleCinemaMode={() => setIsCinemaMode(!isCinemaMode)}
        onProgressUpdate={handleProgressUpdate}
      />

      {/* 2. Top Luxury Navigation Bar */}
      <div className={`relative z-50 transition-opacity duration-500 ${isCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar />
      </div>

      {/* 3. Main Translucent Page Flow */}
      <main className={`relative z-10 flex-grow transition-opacity duration-500 ${isCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* HERO: Cinematic Open Headline & Interactive Transformation Milestone Dock */}
        <ScrollVideoHero
          onExploreClick={() => scrollToSection('services-section')}
          onContactClick={() => scrollToSection('contact-section')}
          onMilestoneClick={handleMilestoneClick}
          activeMilestone={activeMilestone}
          isCinemaMode={isCinemaMode}
        />

        {/* VISUAL TRANSFORMATION STORY SCROLLER */}
        <StoryScroller
          onSelectService={() => scrollToSection('services-section')}
        />

        {/* 11 COMPREHENSIVE INTERIOR SERVICES */}
        <InteriorSolutions />

        {/* TACTILE MATERIAL & CRAFT LIBRARY */}
        <div id="materials-section">
          <MaterialConfigurator />
        </div>

        {/* ALSO MANUFACTURER OF (16 PRODUCTS) */}
        <ManufacturerSection />

        {/* DIRECT INQUIRY & STATUTORY VERIFICATION */}
        <DirectContact />
      </main>

      {/* 4. Editorial Translucent Footer */}
      <div className={`relative z-10 transition-opacity duration-500 ${isCinemaMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Footer />
      </div>
    </div>
  );
};

export default App;
