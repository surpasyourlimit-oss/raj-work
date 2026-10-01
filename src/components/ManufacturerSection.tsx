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
    <section id="manufacturer-section" className="relative w-full py-28 bg-[#090A0C] border-b border-white/5 overflow-hidden">
      
      {/* Background Architectural Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e2126_0%,#090A0C_70%)] opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-raj-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-raj-sand uppercase mb-3">
              <Factory className="w-3.5 h-3.5 text-raj-gold" />
              <span>COMMERCIAL FABRICATION & PRINT DIVISION</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              ALSO MANUFACTURER OF
            </h2>
            <div className="w-20 h-[2px] bg-raj-gold mt-4" />
          </div>

          <div className="max-w-md">
            <p className="text-sm text-raj-muted font-light leading-relaxed mb-4">
              In addition to complete interior solutions, Raj Interior operates dedicated precision manufacturing and commercial printing divisions delivering corporate identity signage, structural glazing, and branding essentials.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-raj-sand">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-raj-gold" />
                GSTIN: {BRAND_DATA.gstin}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Hero Showcase Banner */}
        <div className="mb-14 rounded-3xl overflow-hidden glass-panel border border-white/10 relative h-72 sm:h-80 shadow-2xl">
          <img
            src="./assets/mfg_signage_boards.jpg"
            alt="Signage & Manufacturing Facility"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0C] via-[#090A0C]/75 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-12 max-w-xl">
            <span className="text-xs font-mono text-raj-gold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT IN-HOUSE FABRICATION</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Architectural Signage, ACP Cladding & Structural Glazing
            </h3>
            <p className="text-xs sm:text-sm text-raj-muted font-light">
              State-of-the-art CNC acrylic letter routing, illuminated 3D LED alphabet fabrication, and architectural facade glazing systems.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-raj-gold text-raj-bg font-bold shadow-lg shadow-raj-gold/20'
                    : 'bg-white/5 text-raj-muted hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Products Showcase Grid (16 Exact Verified Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="group p-6 rounded-2xl bg-[#131518] hover:bg-[#181B20] border border-white/5 hover:border-raj-gold/40 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-raj-gold/5 hover:-translate-y-1"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono text-raj-gold px-2 py-0.5 rounded-md bg-raj-gold/10 border border-raj-gold/20 uppercase">
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-mono text-raj-muted">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Product Title */}
                <h4 className="font-serif text-lg font-bold text-white group-hover:text-raj-gold transition-colors duration-200 mb-2">
                  {item.title}
                </h4>

                {/* Factual Description */}
                <p className="text-xs text-raj-muted leading-relaxed font-light mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Technical Spec Box */}
              <div className="pt-4 border-t border-white/5 mt-2">
                <div className="text-[11px] font-mono text-raj-sand/90 flex items-center justify-between">
                  <span className="truncate">{item.spec}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call for Manufacturing Consultation */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-panel-gold border border-raj-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-xl font-bold text-raj-cream mb-1">
              Need Commercial Signage, Glazing or Corporate Print Solutions?
            </h4>
            <p className="text-xs text-raj-muted">
              Connect directly with our manufacturing unit for custom sizing, material samples, and execution timelines.
            </p>
          </div>

          <a
            href={`tel:${BRAND_DATA.phones[0]}`}
            className="px-6 py-3 rounded-full bg-raj-gold text-raj-bg font-bold text-xs tracking-wider uppercase hover:bg-raj-gold-light transition-all flex items-center gap-2 flex-shrink-0 shadow-lg shadow-raj-gold/20"
          >
            <span>CALL MANUFACTURING UNIT</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
