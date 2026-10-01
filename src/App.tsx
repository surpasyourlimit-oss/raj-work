import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroStory } from './components/HeroStory';
import { StoryScroller } from './components/StoryScroller';
import { ThreeStudio } from './components/ThreeStudio';
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
      
      {/* Floating Modern Header */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Story Landing Hero */}
        <HeroStory
          onExploreClick={() => scrollToSection('story-section')}
          onStudioClick={() => scrollToSection('studio-section')}
        />

        {/* 2. Visual Storytelling Scroller (12 Scenes: Empty Space to Complete Interior) */}
        <StoryScroller
          onSelectService={() => scrollToSection('services-section')}
        />

        {/* 3. Real-Time 3D Interactive Studio Configurator */}
        <ThreeStudio />

        {/* 4. Complete Interior Services (11 Verified Disciplines) */}
        <InteriorSolutions />

        {/* 5. Tactile Material & Craft Matrix */}
        <MaterialConfigurator />

        {/* 6. Also Manufacturer Of (16 Verified Products) */}
        <ManufacturerSection />

        {/* 7. Direct Contact & Statutory Verification */}
        <DirectContact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
