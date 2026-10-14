import React from 'react';
import { Navbar } from './components/Navbar';
import { ScrollVideoHero } from './components/ScrollVideoHero';
import { StoryScroller } from './components/StoryScroller';
import { InteriorSolutions } from './components/InteriorSolutions';
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
    <div className="min-h-screen bg-raj-bg text-raj-cream flex flex-col selection:bg-raj-gold selection:text-raj-bg font-sans">
      {/* Top Fixed Header */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. HERO: Scroll-Based Video Animation */}
        <ScrollVideoHero
          onExploreClick={() => scrollToSection('services-section')}
          onContactClick={() => scrollToSection('contact-section')}
        />

        {/* 2. Visual Transformation Story Scroller */}
        <StoryScroller
          onSelectService={() => scrollToSection('services-section')}
        />

        {/* 3. 11 Comprehensive Interior Services */}
        <InteriorSolutions />

        {/* 4. Tactile Material & Craft Library */}
        <div id="materials-section">
          <MaterialConfigurator />
        </div>

        {/* 5. Also Manufacturer Of (16 Products) */}
        <ManufacturerSection />

        {/* 6. Direct Inquiry & Statutory Verification */}
        <DirectContact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
