import React, { useState } from 'react';
import { Factory, Sparkles, Layers, Printer, Shirt, ExternalLink, ShieldCheck } from 'lucide-react';
import { MANUFACTURER_ITEMS, BRAND_DATA } from '../data/rajData';

export const ManufacturerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'ALL PRODUCTS (16)', icon: Layers },
    { id: 'Signage & Structural', label: 'SIGNAGE & GLAZING (7)', icon: Factory },
    { id: 'Commercial Printing', label: 'COMMERCIAL PRINTING (6)', icon: Printer },
    { id: 'Branding & Apparel', label: 'BRANDING & APPAREL (3)', icon: Shirt },
  ];

  const filteredItems = MANUFACTURER_ITEMS.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="manufacturer-section" className="relative w-full py-16 sm:py-24 bg-[#090A0C] border-b border-white/5 overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-raj-sand uppercase mb-2">
              <Factory className="w-3 h-3 text-raj-gold" />
              <span>FABRICATION & PRINT DIVISION</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              ALSO MANUFACTURER OF
            </h2>
            <div className="w-16 h-[2px] bg-raj-gold mt-3" />
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-raj-muted font-light leading-relaxed mb-3">
              Direct in-house manufacturing for architectural signages, structural glass glazing, and commercial corporate printing.
            </p>
            <div className="flex items-center gap-3 text-[11px] font-mono text-raj-sand">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-raj-gold" />
                GSTIN: {BRAND_DATA.gstin}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Hero Banner */}
        <div className="mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-white/10 relative h-52 sm:h-72 shadow-xl">
          <img
            src="./assets/mfg_signage_boards.jpg"
            alt="Signage & Manufacturing Facility"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0C] via-[#090A0C]/80 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center p-5 sm:p-10 max-w-lg">
            <span className="text-[10px] font-mono text-raj-gold uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>DIRECT IN-HOUSE FABRICATION</span>
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mb-2 leading-tight">
              Architectural Signage, ACP Cladding & Glazing
            </h3>
            <p className="text-xs text-raj-muted font-light line-clamp-2">
              Precision CNC acrylic 3D lettering, backlit LED signboards, and facade glazing installations.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-raj-gold text-raj-bg font-bold shadow-md shadow-raj-gold/20'
                    : 'bg-white/5 text-raj-muted hover:text-white border border-white/10'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#131518] hover:bg-[#181B20] border border-white/5 hover:border-raj-gold/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[9px] font-mono text-raj-gold px-2 py-0.5 rounded bg-raj-gold/10 border border-raj-gold/20 uppercase">
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono text-raj-muted">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-white mb-1.5">
                  {item.title}
                </h4>

                <p className="text-xs text-raj-muted leading-relaxed font-light mb-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2.5 border-t border-white/5">
                <div className="text-[10px] font-mono text-raj-sand/90 truncate">
                  {item.spec}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Callout */}
        <div className="mt-10 p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-panel-gold border border-raj-gold/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base sm:text-lg font-bold text-raj-cream mb-0.5">
              Need Commercial Signage or Corporate Print Solutions?
            </h4>
            <p className="text-xs text-raj-muted">
              Connect directly with our manufacturing unit for custom quotes and specs.
            </p>
          </div>

          <a
            href={`tel:${BRAND_DATA.phones[0]}`}
            className="py-3 px-5 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-1.5 active:scale-95 flex-shrink-0"
          >
            <span>CALL MANUFACTURING UNIT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
