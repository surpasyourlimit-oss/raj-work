import React from 'react';
import { Navbar } from './components/Navbar';
import { HighQualityVideoHero } from './components/HighQualityVideoHero';
import { InteriorSolutions } from './components/InteriorSolutions';
import { StoryScroller } from './components/StoryScroller';
import { MaterialConfigurator } from './components/MaterialConfigurator';
import { ManufacturerSection } from './components/ManufacturerSection';
import { DirectContact } from './components/DirectContact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-raj-cream flex flex-col selection:bg-raj-gold selection:text-raj-bg font-sans">
      
      {/* 1. Top Fixed Navigation Bar */}
      <Navbar />

      {/* 2. High-Quality 1080p 60FPS Video Scroll Hero (450vh)
          - GOP=2 Keyframe optimized video for instant hardware-accelerated seek (< 2ms)
          - Direct DOM ref updates outside React cycle for 120 FPS buttery smooth inertia
          - 8 Distinct glassmorphic cards sequentially animating each interior craft
          - STRICT: Only after the video completes, the remaining website sections appear! */}
      <main className="flex-grow">
        
        <HighQualityVideoHero
          onExploreClick={() => scrollToSection('services-section')}
          onContactClick={() => scrollToSection('contact-section')}
        />

        {/* 3. STRICT: Content Sections appearing strictly AFTER the video transformation ends */}
        <div id="services-section">
          <InteriorSolutions />
        </div>

        <div id="story-section">
          <StoryScroller
            onSelectService={() => scrollToSection('services-section')}
          />
        </div>

        <div id="materials-section">
          <MaterialConfigurator />
        </div>

        <div id="manufacturer-section">
          <ManufacturerSection />
        </div>

        <div id="contact-section">
          <DirectContact />
        </div>

      </main>

      {/* 4. Editorial Verified Footer */}
      <Footer />

    </div>
  );
};

export default App;
