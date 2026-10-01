import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, X, PhoneCall } from 'lucide-react';
import { INTERIOR_SERVICES, InteriorService, BRAND_DATA } from '../data/rajData';

interface InteriorSolutionsProps {
  onSelectServiceModal?: (service: InteriorService) => void;
}

export const InteriorSolutions: React.FC<InteriorSolutionsProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<InteriorService | null>(null);

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
    <section id="services-section" className="relative w-full py-24 bg-raj-bg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raj-gold/10 border border-raj-gold/30 text-xs font-mono text-raj-gold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TOTAL INTERIOR SOLUTION WITH EXPERT DESIGN</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-raj-cream">
              Comprehensive Interior Services
            </h2>
          </div>

          <p className="max-w-md text-sm text-raj-muted font-light">
            Every interior discipline executed in-house with master precision, unified architectural harmony, and dedicated quality control.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-raj-gold text-raj-bg font-bold shadow-lg shadow-raj-gold/20'
                  : 'bg-white/5 text-raj-muted hover:text-raj-cream border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-raj-gold/50 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-raj-gold/5 hover:-translate-y-1"
            >
              {/* Image Preview Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-raj-card via-raj-card/30 to-transparent" />

                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-raj-bg/85 backdrop-blur-md border border-white/15 flex items-center justify-center">
                  <span className="font-serif font-black text-sm text-raj-gold">
                    {service.number}
                  </span>
                </div>

                {/* Subtitle Badge */}
                {service.subTitle && (
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-raj-bg/90 backdrop-blur-md border border-white/10 text-[10px] font-mono text-raj-sand">
                      {service.subTitle}
                    </span>
                  </div>
                )}
              </div>

              {/* Service Info Content */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-raj-cream group-hover:text-raj-gold transition-colors duration-300 mb-3 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-raj-muted line-clamp-3 leading-relaxed font-light mb-6">
                    {service.summary}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-raj-sand group-hover:text-raj-gold">
                  <span>INSPECT SPECIFICATIONS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detailed Service Inspection Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl glass-panel-gold rounded-3xl overflow-hidden border border-raj-gold/40 shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-raj-bg/80 hover:bg-raj-bg text-raj-cream hover:text-raj-gold border border-white/10 transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-raj-card via-raj-card/40 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-mono text-raj-gold uppercase tracking-widest block mb-1">
                  SERVICE SPECIFICATION • {selectedService.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-raj-cream leading-tight">
                  {selectedService.title}
                </h3>
                {selectedService.subTitle && (
                  <span className="text-xs font-mono text-raj-sand mt-1 block">
                    {selectedService.subTitle}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-mono tracking-widest text-raj-muted uppercase mb-2">
                  ARCHITECTURAL SCOPE
                </h4>
                <p className="text-sm text-raj-cream/90 leading-relaxed font-light">
                  {selectedService.summary}
                </p>
              </div>

              {/* Verified Feature Checklist */}
              <div>
                <h4 className="text-xs font-mono tracking-widest text-raj-muted uppercase mb-3">
                  DELIVERY HIGHLIGHTS & CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-raj-gold flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-raj-sand font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Inquiry Box */}
              <div className="p-4 rounded-2xl bg-raj-gold/10 border border-raj-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-raj-gold block">
                    Direct Inquiry For {selectedService.title}
                  </span>
                  <span className="text-[11px] font-mono text-raj-muted">
                    Call: {BRAND_DATA.phones[0]} / {BRAND_DATA.phones[1]}
                  </span>
                </div>

                <a
                  href={`tel:${BRAND_DATA.phones[0]}`}
                  className="px-5 py-2.5 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-wider uppercase hover:bg-raj-gold-light transition-all flex items-center gap-2 flex-shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>CONSULT RAJ INTERIOR</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
