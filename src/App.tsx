import React from 'react';
import { Navbar } from './components/Navbar';
import { ScrollVideoHero } from './components/ScrollVideoHero';
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

      {/* 2. Scroll-Pinned 4K Video Transformation Hero (450vh)
          - Video scrubs smoothly with scrolling (0% to 100%)
          - Only typography floats in and out gracefully over the video
          - Strict: Only when the video ends (progress 100%), the remaining sections appear below! */}
      <main className="flex-grow">
        
        <ScrollVideoHero
          onExploreClick={() => scrollToSection('services-section')}
          onContactClick={() => scrollToSection('contact-section')}
        />

        {/* 3. STRICT: Content Sections that appear ONLY AFTER the video finishes */}
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
