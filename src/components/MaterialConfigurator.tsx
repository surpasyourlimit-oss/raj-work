import React, { useState } from 'react';
import { Sparkles, Check, SlidersHorizontal } from 'lucide-react';

interface MaterialSample {
  id: string;
  name: string;
  category: 'flooring' | 'wall' | 'ceiling' | 'feature';
  texture: string;
  finish: string;
  bestFor: string;
  colorGrade: string;
}

const MATERIAL_SAMPLES: MaterialSample[] = [
  {
    id: 'm-marble',
    name: 'Italian Statuario Marble',
    category: 'flooring',
    texture: 'Gleaming high-gloss mirror polish with grey feathered veins',
    finish: 'Mirror Polished / Honed',
    bestFor: 'Grand living halls & foyer entrances',
    colorGrade: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 50%, #ffffff 100%)'
  },
  {
    id: 'm-wood',
    name: 'Chevron Hardwood Parquet',
    category: 'flooring',
    texture: 'Natural European oak grain with deep matte tactile coating',
    finish: 'Matte Oil / Polyurethane',
    bestFor: 'Master suites, lounges & dining zones',
    colorGrade: 'linear-gradient(135deg, #5c4033 0%, #8b5a2b 50%, #4a2e18 100%)'
  },
  {
    id: 'm-tiles',
    name: 'Glazed Vitrified Porcelain Tiles',
    category: 'flooring',
    texture: 'Ultra-durable large format with seamless rectified joints',
    finish: 'Sugar Matte / High Gloss',
    bestFor: 'High-traffic zones, kitchens & corridors',
    colorGrade: 'linear-gradient(135deg, #8a8d91 0%, #b0b3b8 50%, #6c7075 100%)'
  },
  {
    id: 'm-pvc',
    name: 'Heavy-Duty SPC / PVC Flooring',
    category: 'flooring',
    texture: 'Waterproof multi-layered acoustic core with embossed wood finish',
    finish: 'Textured Anti-Skid',
    bestFor: 'Moisture-prone areas, modern offices',
    colorGrade: 'linear-gradient(135deg, #705848 0%, #997d66 50%, #594235 100%)'
  },
  {
    id: 'm-putty',
    name: 'Velvet-Matte Designer Paint Coat',
    category: 'wall',
    texture: '3-stage sanded fine putty surface with zero-glare royal emulsion',
    finish: 'Silken Velvet Matte',
    bestFor: 'Interior walls, accent alcoves & master bedrooms',
    colorGrade: 'linear-gradient(135deg, #ede6db 0%, #d8cdbf 50%, #c4b8a7 100%)'
  },
  {
    id: 'm-wallpaper',
    name: 'Customized Metallic Textured Wallpaper',
    category: 'wall',
    texture: 'Tactile organic gold leaf motifs on non-woven breathable backing',
    finish: 'Embossed Metallic',
    bestFor: 'Living feature walls, headboard backdrops',
    colorGrade: 'linear-gradient(135deg, #c5a880 0%, #dfc4a0 50%, #a68456 100%)'
  },
  {
    id: 'm-charcoal',
    name: 'Charcoal Acoustic Louvers & Gold Highlighters',
    category: 'feature',
    texture: 'Vertical fluted charcoal polymer slats with brushed brass T-profiles',
    finish: 'Deep Matte Charcoal + Brushed Brass',
    bestFor: 'TV backdrop walls, entrance partitions & luxury lounges',
    colorGrade: 'linear-gradient(135deg, #181a1f 0%, #2a2d34 60%, #c5a880 100%)'
  },
  {
    id: 'm-ceiling',
    name: 'Multi-Tier Gypsum False Ceiling with Cove Glow',
    category: 'ceiling',
    texture: 'Seamless jointed acoustic gypsum board with hidden LED warm trough',
    finish: 'Architectural Matte White + 3000K Warm Cove',
    bestFor: 'Living rooms, false ceiling drops & dining coves',
    colorGrade: 'linear-gradient(135deg, #252830 0%, #1e2126 50%, #ffa850 100%)'
  }
];

export const MaterialConfigurator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'flooring' | 'wall' | 'ceiling' | 'feature'>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSample>(MATERIAL_SAMPLES[0]);

  const filteredMaterials = MATERIAL_SAMPLES.filter(m => {
    if (activeTab === 'all') return true;
    return m.category === activeTab;
  });

  return (
    <section className="relative w-full py-20 bg-raj-card/30 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raj-gold/10 border border-raj-gold/30 text-xs font-mono text-raj-gold uppercase mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>TACTILE ARCHITECTURAL SPECIFICATIONS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-raj-cream">
              Material & Craft Library
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-raj-muted">
            Inspect authentic material grades across flooring, wall finishes, false ceilings, and charcoal highlighter accents.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeTab === 'all' ? 'bg-raj-gold text-raj-bg font-bold' : 'bg-white/5 text-raj-muted hover:text-raj-cream'
            }`}
          >
            ALL MATERIALS
          </button>
          <button
            onClick={() => setActiveTab('flooring')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeTab === 'flooring' ? 'bg-raj-gold text-raj-bg font-bold' : 'bg-white/5 text-raj-muted hover:text-raj-cream'
            }`}
          >
            FLOORING (MARBLE/WOOD/TILES/PVC)
          </button>
          <button
            onClick={() => setActiveTab('wall')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeTab === 'wall' ? 'bg-raj-gold text-raj-bg font-bold' : 'bg-white/5 text-raj-muted hover:text-raj-cream'
            }`}
          >
            WALL FINISH & WALLPAPER
          </button>
          <button
            onClick={() => setActiveTab('feature')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeTab === 'feature' ? 'bg-raj-gold text-raj-bg font-bold' : 'bg-white/5 text-raj-muted hover:text-raj-cream'
            }`}
          >
            CHARCOAL & HIGHLIGHTERS
          </button>
          <button
            onClick={() => setActiveTab('ceiling')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeTab === 'ceiling' ? 'bg-raj-gold text-raj-bg font-bold' : 'bg-white/5 text-raj-muted hover:text-raj-cream'
            }`}
          >
            FALSE CEILING
          </button>
        </div>

        {/* Showcase Grid + Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Material Samples Selection List */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                  selectedMaterial.id === mat.id
                    ? 'bg-raj-gold/15 border-raj-gold shadow-lg shadow-raj-gold/10'
                    : 'bg-raj-card/70 border-white/5 hover:border-white/20 hover:bg-raj-card'
                }`}
              >
                {/* Texture Swatch Orb */}
                <div
                  className="w-12 h-12 rounded-2xl flex-shrink-0 shadow-inner border border-white/20 relative flex items-center justify-center"
                  style={{ background: mat.colorGrade }}
                >
                  {selectedMaterial.id === mat.id && (
                    <Check className="w-4 h-4 text-raj-bg font-black" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-raj-gold uppercase tracking-wider">
                      {mat.category}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-raj-cream truncate mt-0.5">
                    {mat.name}
                  </h4>
                  <p className="text-xs text-raj-muted truncate mt-1">
                    {mat.finish}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Material Deep Inspection Card */}
          <div className="lg:col-span-5 glass-panel-gold rounded-3xl p-6 sm:p-8 border border-raj-gold/30 shadow-2xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-raj-gold/20 text-raj-gold text-[10px] font-mono uppercase tracking-widest">
                MATERIAL DOSSIER
              </span>
              <Sparkles className="w-4 h-4 text-raj-gold" />
            </div>

            {/* Visual Swatch Preview Box */}
            <div
              className="w-full h-36 rounded-2xl mb-6 shadow-2xl border border-white/20 flex flex-col justify-end p-4 relative overflow-hidden"
              style={{ background: selectedMaterial.colorGrade }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <span className="text-xs font-serif font-bold text-white uppercase drop-shadow-md">
                  {selectedMaterial.name}
                </span>
                <span className="text-[10px] font-mono text-white/80 block">
                  TEXTURE SPECIFICATION
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-raj-cream mb-4">
              {selectedMaterial.name}
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-raj-muted block text-[10px] uppercase mb-1">SURFACE TEXTURE & FEEL</span>
                <span className="text-raj-cream font-sans text-xs">{selectedMaterial.texture}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-raj-muted block text-[10px] uppercase mb-1">RECOMMENDED FINISH PROFILE</span>
                <span className="text-raj-sand font-sans text-xs">{selectedMaterial.finish}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-raj-muted block text-[10px] uppercase mb-1">IDEAL ARCHITECTURAL APPLICATION</span>
                <span className="text-raj-cream font-sans text-xs">{selectedMaterial.bestFor}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
