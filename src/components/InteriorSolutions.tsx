import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, X, PhoneCall } from 'lucide-react';
import { INTERIOR_SERVICES, InteriorService, BRAND_DATA } from '../data/rajData';

export const InteriorSolutions: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<InteriorService | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedService]);

  const categories = [
    { id: 'all', label: 'ALL SERVICES (11)' },
    { id: 'core', label: 'FURNITURE & MODULAR' },
    { id: 'finish', label: 'SURFACES & FINISHES' },
    { id: 'structural', label: 'INFRASTRUCTURE & CEILING' },
    { id: 'artisan', label: 'ARTISAN & CUSTOM' },
  ];

  const filteredServices = INTERIOR_SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <section id="services-section" className="relative w-full py-16 sm:py-24 bg-black/50 backdrop-blur-xl border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-raj-gold/10 border border-raj-gold/30 text-[11px] sm:text-xs font-mono text-raj-gold uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              <span>TOTAL INTERIOR SOLUTION</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-raj-cream">
              Complete Interior Services
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-raj-muted font-light">
            Every interior discipline executed with in-house craftsmanship and unified quality control.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-raj-gold text-raj-bg font-bold shadow-md shadow-raj-gold/20'
                  : 'bg-white/5 text-raj-muted hover:text-raj-cream border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 hover:border-raj-gold/50 transition-all duration-300 flex flex-col justify-between active:scale-[0.99] shadow-xl"
            >
              <div className="relative h-48 sm:h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute top-3 left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-raj-bg/90 backdrop-blur-md border border-white/15 flex items-center justify-center">
                  <span className="font-serif font-black text-xs sm:text-sm text-raj-gold">
                    {service.number}
                  </span>
                </div>

                {service.subTitle && (
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-raj-bg/90 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-raj-sand">
                      {service.subTitle}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-raj-cream group-hover:text-raj-gold transition-colors duration-200 mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-raj-muted line-clamp-2 leading-relaxed font-light mb-4">
                    {service.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-raj-sand group-hover:text-raj-gold">
                  <span>VIEW SPECIFICATIONS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedService && (
        <div 
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass-panel-gold rounded-2xl sm:rounded-3xl overflow-hidden border border-raj-gold/40 shadow-2xl max-h-[88vh] flex flex-col"
          >
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-raj-bg/90 hover:bg-raj-bg text-raj-cream hover:text-raj-gold border border-white/15 transition-colors active:scale-95"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-44 sm:h-60 w-full overflow-hidden flex-shrink-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-raj-card via-raj-card/40 to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6">
                <span className="text-[10px] sm:text-xs font-mono text-raj-gold uppercase tracking-widest block mb-0.5">
                  SERVICE #{selectedService.number}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-raj-cream leading-tight">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div>
                <h4 className="text-[10px] sm:text-xs font-mono tracking-widest text-raj-muted uppercase mb-1">
                  SCOPE & DESCRIPTION
                </h4>
                <p className="text-xs sm:text-sm text-raj-cream/90 leading-relaxed font-light">
                  {selectedService.summary}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] sm:text-xs font-mono tracking-widest text-raj-muted uppercase mb-2">
                  HIGHLIGHTS & SPECS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-raj-gold flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-raj-sand font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-raj-gold/10 border border-raj-gold/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-raj-gold block">
                    Inquire for {selectedService.title}
                  </span>
                  <span className="text-[10px] font-mono text-raj-muted">
                    Call: {BRAND_DATA.phones[0]}
                  </span>
                </div>

                <a
                  href={`tel:${BRAND_DATA.phones[0]}`}
                  className="py-2.5 px-4 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>CALL DIRECT</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
