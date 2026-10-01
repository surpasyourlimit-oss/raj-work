export interface InteriorService {
  id: string;
  number: string;
  title: string;
  subTitle?: string;
  category: 'core' | 'artisan' | 'structural' | 'finish';
  summary: string;
  features: string[];
  image: string;
  sceneIndex: number;
}

export interface ManufacturerItem {
  id: string;
  title: string;
  category: 'Signage & Structural' | 'Commercial Printing' | 'Branding & Apparel';
  desc: string;
  tag: string;
  spec: string;
}

export interface StoryScene {
  id: string;
  sceneNumber: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  image: string;
  serviceId?: string;
  ambientLight: string;
}

export const BRAND_DATA = {
  name: "RAJ INTERIOR",
  descriptor: "DESIGNER & DECORATION",
  tagline: "TOTAL INTERIOR SOLUTION WITH EXPERT DESIGN",
  phones: ["8420697944", "8514014887"],
  gstin: "19EKWPR3118E1ZN",
  ceNo: "003241015043",
};

export const STORY_SCENES: StoryScene[] = [
  {
    id: "scene-01",
    sceneNumber: "01",
    title: "THE RAW BEGINNING",
    tagline: "EMPTY / UNFINISHED SPACE",
    description: "Every bespoke interior begins with structural space. An empty canvas illuminated by natural light, awaiting master architectural vision and unified execution.",
    badge: "INITIAL PHASE",
    image: "./assets/hero_empty_room.jpg",
    ambientLight: "#C5A880"
  },
  {
    id: "scene-02",
    sceneNumber: "02",
    title: "FOUNDATION OF ELEGANCE",
    tagline: "ALL TYPES OF FLOORING",
    description: "Flawless transitions between premium Italian marble, glazed vitrified tiles, resilient PVC, and warm hardwood chevron parquet.",
    badge: "MARBLE • TILES • PVC • WOODEN ETC.",
    image: "./assets/scene_flooring_materials.jpg",
    serviceId: "flooring",
    ambientLight: "#DFC4A0"
  },
  {
    id: "scene-03",
    sceneNumber: "03",
    title: "SURFACE MASTERY",
    tagline: "ALL TYPES OF PAINT & PUTTY",
    description: "Meticulous surface preparation, velvet-smooth multi-coat putty application, and luxury designer paint coatings creating pure architectural warmth.",
    badge: "FLAWLESS FINISH",
    image: "./assets/scene_paint_putty.jpg",
    serviceId: "paint-putty",
    ambientLight: "#E6DEC9"
  },
  {
    id: "scene-04",
    sceneNumber: "04",
    title: "ARCHITECTURAL DIMENSION",
    tagline: "FALSE CEILING",
    description: "Multi-layered geometric gypsum drop ceilings with precision-concealed warm LED cove lighting and seamless magnetic track integration.",
    badge: "COVE & ACCENT LIGHTING",
    image: "./assets/scene_false_ceiling.jpg",
    serviceId: "false-ceiling",
    ambientLight: "#F4EFE6"
  },
  {
    id: "scene-05",
    sceneNumber: "05",
    title: "FUNCTIONAL SOPHISTICATION",
    tagline: "MODULAR KITCHEN & MODULAR FURNITURE",
    description: "Custom modular kitchen architecture with fluted wood textures, soft-close hardware, quartz countertops, and engineered storage solutions.",
    badge: "MODULAR CRAFTSMANSHIP",
    image: "./assets/scene_modular_kitchen.jpg",
    serviceId: "modular-kitchen",
    ambientLight: "#C5A880"
  },
  {
    id: "scene-06",
    sceneNumber: "06",
    title: "BESPOKE WOODWORK",
    tagline: "ALL TYPES OF FURNITURE WORK",
    description: "Tailored residential and commercial furniture execution. Hand-crafted console units, display cases, executive desks, and signature cabinetry.",
    badge: "RESIDENTIAL & COMMERCIAL",
    image: "./assets/scene_furniture_work.jpg",
    serviceId: "furniture-work",
    ambientLight: "#B8976C"
  },
  {
    id: "scene-07",
    sceneNumber: "07",
    title: "TACTILE COMFORT",
    tagline: "ALL TYPES OF FURNISHING WORK",
    description: "Handcrafted custom sofas, tailored floor-to-ceiling sheer and blackout curtains, and modern architectural motorized blinds.",
    badge: "SOFA • CURTAIN • BLINDS ETC.",
    image: "./assets/scene_furnishing_soft.jpg",
    serviceId: "furnishing-work",
    ambientLight: "#DFC4A0"
  },
  {
    id: "scene-08",
    sceneNumber: "08",
    title: "BESPOKE WALLCOVERINGS",
    tagline: "ALL TYPES OF WALLPAPER & CUSTOMIZE WALLPAPER",
    description: "Tactile imported textured wallpapers and customized architectural wall murals engineered to match exact spatial dimensions.",
    badge: "CUSTOMIZED DESIGNS",
    image: "./assets/scene_wallpaper_custom.jpg",
    serviceId: "wallpaper",
    ambientLight: "#E6DEC9"
  },
  {
    id: "scene-09",
    sceneNumber: "09",
    title: "ARTISTIC EXPRESSION",
    tagline: "HAND PAINTING & CANVAS PAINTING",
    description: "Original large-format canvas artworks, textured impasto compositions, and hand-painted bespoke murals created to elevate interior atmospheres.",
    badge: "FINE ART & CANVASES",
    image: "./assets/scene_hand_painting.jpg",
    serviceId: "hand-painting",
    ambientLight: "#C5A880"
  },
  {
    id: "scene-10",
    sceneNumber: "10",
    title: "FEATURE STATEMENT",
    tagline: "ALL TYPES OF HIGHLIGHTER & CHARCOAL WORK",
    description: "Dramatic vertical charcoal louvers, gold metallic highlighter profiles, and acoustic fluted panels creating focal depth.",
    badge: "CHARCOAL LOUVERS & HIGHLIGHTERS",
    image: "./assets/scene_highlighter_charcoal.jpg",
    serviceId: "highlighter-charcoal",
    ambientLight: "#DFC4A0"
  },
  {
    id: "scene-11",
    sceneNumber: "11",
    title: "PRECISION INFRASTRUCTURE",
    tagline: "ELECTRICAL WORK",
    description: "Concealed conduit distribution, luxury touch switchgear, architectural spotlights, magnetic low-voltage track lighting, and ambient balance.",
    badge: "CONCEALED & ARCHITECTURAL",
    image: "./assets/scene_electrical_work.jpg",
    serviceId: "electrical-work",
    ambientLight: "#F4EFE6"
  },
  {
    id: "scene-12",
    sceneNumber: "12",
    title: "THE HARMONIOUS FINALE",
    tagline: "COMPLETED TOTAL INTERIOR SOLUTION",
    description: "The complete transformation: seamless synergy of all interior works brought together under one expert design direction.",
    badge: "TOTAL INTERIOR SOLUTION",
    image: "./assets/scene_completed_interior.jpg",
    ambientLight: "#C5A880"
  }
];

export const INTERIOR_SERVICES: InteriorService[] = [
  {
    id: "furniture-work",
    number: "01",
    title: "All Types of Furniture Work",
    subTitle: "Residential & Commercial",
    category: "core",
    summary: "Precision-engineered bespoke wooden furniture tailored for living rooms, master bedrooms, executive cabins, reception lounges, and commercial spaces.",
    features: [
      "Residential furniture fabrication",
      "Commercial office furniture setups",
      "Custom display consoles & wardrobes",
      "Architectural wood paneling & joinery"
    ],
    image: "./assets/scene_furniture_work.jpg",
    sceneIndex: 5
  },
  {
    id: "modular-kitchen",
    number: "02",
    title: "Modular Kitchen & All Types of Modular Furniture",
    subTitle: "Modern Ergonomics & Storage",
    category: "core",
    summary: "State-of-the-art modular kitchen systems with soft-close mechanisms, quartz/granite tops, acrylic/matte shutters, and versatile modular furniture.",
    features: [
      "L-shaped, U-shaped & Island kitchen layouts",
      "Soft-close tandem drawers & pull-outs",
      "Water-resistant & termite-proof cabinetry",
      "Complete modular storage systems"
    ],
    image: "./assets/scene_modular_kitchen.jpg",
    sceneIndex: 4
  },
  {
    id: "paint-putty",
    number: "03",
    title: "All Types of Paint & Putty",
    subTitle: "Surface Preparation & Premium Finishes",
    category: "finish",
    summary: "Multi-stage wall preparation with fine acrylic putty sanding followed by luxury velvet-matte, satin, and textured designer paint applications.",
    features: [
      "Ultra-smooth putty application",
      "Interior royal emulsion & luxury finishes",
      "Damp-proof primer & base preparation",
      "Seamless spray and roller coats"
    ],
    image: "./assets/scene_paint_putty.jpg",
    sceneIndex: 2
  },
  {
    id: "hand-painting",
    number: "04",
    title: "Hand Painting & Canvas Painting",
    subTitle: "Bespoke Art & Wall Murals",
    category: "artisan",
    summary: "Fine artisanal canvas paintings, textured contemporary artworks, and direct hand-painted murals designed to complement the interior theme.",
    features: [
      "Custom textured acrylic & oil canvases",
      "Gold leaf & metallic pigment accents",
      "Architectural wall mural paintings",
      "Framed signature art pieces"
    ],
    image: "./assets/scene_hand_painting.jpg",
    sceneIndex: 8
  },
  {
    id: "electrical-work",
    number: "05",
    title: "Electrical Work",
    subTitle: "Architectural & Concealed Infrastructure",
    category: "structural",
    summary: "Complete concealed wiring, distribution board setup, luxury modular switchplates, ambient strip lighting channels, and spotlight fixtures.",
    features: [
      "Concealed copper wiring & safety breakers",
      "Magnetic track light installations",
      "Recessed LED profile channels & drivers",
      "Designer touch & modular switchgear"
    ],
    image: "./assets/scene_electrical_work.jpg",
    sceneIndex: 10
  },
  {
    id: "flooring",
    number: "06",
    title: "All Types of Flooring",
    subTitle: "Marble • Tiles • PVC • Wooden etc.",
    category: "finish",
    summary: "Comprehensive flooring solutions including polished Italian & Indian marble, vitrified tiles, heavy-duty PVC planks, and wooden parquet.",
    features: [
      "Italian & Indian marble laying and polishing",
      "Large-format vitrified tile installation",
      "High-density PVC & SPC flooring",
      "Engineered & laminated wooden flooring"
    ],
    image: "./assets/scene_flooring_materials.jpg",
    sceneIndex: 1
  },
  {
    id: "false-ceiling",
    number: "07",
    title: "False Ceiling",
    subTitle: "Gypsum, Grid & Ambient Cove Systems",
    category: "structural",
    summary: "Contemporary false ceiling designs with concealed peripheral cove illumination, sound dampening gypsum boards, and sleek geometric drops.",
    features: [
      "Multi-tier gypsum board false ceiling",
      "Concealed warm LED cove profiles",
      "Grid ceilings for commercial spaces",
      "Acoustic and thermal insulation"
    ],
    image: "./assets/scene_false_ceiling.jpg",
    sceneIndex: 3
  },
  {
    id: "furnishing-work",
    number: "08",
    title: "All Types of Furnishing Work",
    subTitle: "Sofa • Curtain • Blinds etc.",
    category: "finish",
    summary: "Tailored upholstery and soft furnishings including custom sofas, designer drapery curtains, blackout fabrics, and architectural window blinds.",
    features: [
      "Custom sofa manufacturing & re-upholstery",
      "Sheer, velvet, and blackout curtains",
      "Motorized & manual window roller blinds",
      "Decorative cushions & luxury headboards"
    ],
    image: "./assets/scene_furnishing_soft.jpg",
    sceneIndex: 6
  },
  {
    id: "wallpaper",
    number: "09",
    title: "All Types of Wallpaper",
    subTitle: "Imported & Textured Wallcoverings",
    category: "finish",
    summary: "Extensive library of textured, non-woven, vinyl, metallic, and embossed designer wallpapers for accent walls and luxury bedrooms.",
    features: [
      "Textured & metallic wallcoverings",
      "Washable & stain-resistant vinyls",
      "Seamless edge matching & professional paste",
      "Acoustic backing wallpapers"
    ],
    image: "./assets/scene_wallpaper_custom.jpg",
    sceneIndex: 7
  },
  {
    id: "customize-wallpaper",
    number: "10",
    title: "Customize Wallpaper",
    subTitle: "Bespoke Printed Murals & Sizing",
    category: "artisan",
    summary: "Tailor-made customized wallpapers printed precisely to your room's dimensions with personalized high-definition patterns, landscapes, or geometric motifs.",
    features: [
      "Scale-to-fit wall dimensions",
      "High-resolution UV print quality",
      "Custom color grading to match furniture",
      "Eco-friendly odorless ink technology"
    ],
    image: "./assets/scene_wallpaper_custom.jpg",
    sceneIndex: 7
  },
  {
    id: "highlighter-charcoal",
    number: "11",
    title: "All Types of Highlighter & Charcoal Work",
    subTitle: "Charcoal Louvers & Metallic Profiles",
    category: "artisan",
    summary: "Striking feature wall treatments using fluted charcoal louvers, acoustic panels, golden metal profiles, and backlit acrylic highlighters.",
    features: [
      "Fluted charcoal wall louvers & slats",
      "T & U profile brass/gold highlighters",
      "Backlit translucent highlighter sheets",
      "Textured 3D wall cladding panels"
    ],
    image: "./assets/scene_highlighter_charcoal.jpg",
    sceneIndex: 9
  }
];

export const MANUFACTURER_ITEMS: ManufacturerItem[] = [
  {
    id: "mfg-acp-board",
    title: "ACP Board",
    category: "Signage & Structural",
    desc: "Precision aluminum composite panel cladding and structural exterior/interior architectural boards.",
    tag: "Fabrication",
    spec: "Weather-resistant, metallic/solid finishes"
  },
  {
    id: "mfg-glazing",
    title: "Glazing",
    category: "Signage & Structural",
    desc: "Toughened structural glass glazing, spider fittings, and architectural partition systems.",
    tag: "Structural",
    spec: "Clear/tinted toughened safety glass"
  },
  {
    id: "mfg-led-signboard",
    title: "LED Signboard",
    category: "Signage & Structural",
    desc: "High-visibility illuminated LED signboards for storefronts, commercial buildings, and corporate facades.",
    tag: "Illumination",
    spec: "Energy-efficient waterproof LEDs"
  },
  {
    id: "mfg-glowsign-board",
    title: "Glowsign Board",
    category: "Signage & Structural",
    desc: "Durable backlit glowsign boards with vibrant translucent graphic printing and robust metal frames.",
    tag: "Backlit",
    spec: "Custom dimensions, vibrant day/night display"
  },
  {
    id: "mfg-acrylic-alphabet",
    title: "Acrylic Alphabet",
    category: "Signage & Structural",
    desc: "Laser-cut 3D solid acrylic lettering with polished edges for reception walls and identity branding.",
    tag: "3D Letters",
    spec: "Precision CNC/laser cut, high gloss"
  },
  {
    id: "mfg-led-alphabet-letter",
    title: "LED Alphabet Letter",
    category: "Signage & Structural",
    desc: "Channel-letter 3D signage with front-lit, back-lit (halo effect), or edge-lit LED configurations.",
    tag: "3D Signage",
    spec: "Halo & front-lit premium modules"
  },
  {
    id: "mfg-one-side-vision",
    title: "One Side Vision",
    category: "Signage & Structural",
    desc: "Perforated window graphic film allowing clear view from inside while displaying full graphics outside.",
    tag: "Window Film",
    spec: "Micro-perforated UV-cured vinyl"
  },
  {
    id: "mfg-standee",
    title: "Standee",
    category: "Commercial Printing",
    desc: "Portable roll-up standees with aluminum base mechanisms and high-definition graphic banners.",
    tag: "Display",
    spec: "Lightweight roll-up aluminum cassette"
  },
  {
    id: "mfg-flex-printing",
    title: "Flex Printing",
    category: "Commercial Printing",
    desc: "Large-format high-resolution flex banner printing with weather-proof inks and reinforced eyelets.",
    tag: "Large Format",
    spec: "High-DPI solvent/eco-solvent printing"
  },
  {
    id: "mfg-leaflet",
    title: "Leaflet",
    category: "Commercial Printing",
    desc: "Commercial flyers, product brochures, and promotional leaflets printed on premium coated art paper.",
    tag: "Offset Print",
    spec: "Gloss / matte art paper with fold options"
  },
  {
    id: "mfg-bill-challan",
    title: "Bill/Challan",
    category: "Commercial Printing",
    desc: "Numbered commercial invoice books, delivery challans, and multi-part carbonless NCR books.",
    tag: "Stationery",
    spec: "Duplicate/Triplicate carbonless NCR"
  },
  {
    id: "mfg-visiting-card",
    title: "Visiting Card",
    category: "Commercial Printing",
    desc: "Luxury business cards with velvet lamination, spot UV, gold foil stamping, and heavy cardstock.",
    tag: "Identity",
    spec: "350-450 GSM, velvet matte + foil"
  },
  {
    id: "mfg-letter-head",
    title: "Letter Head",
    category: "Commercial Printing",
    desc: "Corporate executive letterheads printed on high-grade bond and textured executive paper.",
    tag: "Corporate",
    spec: "100-120 GSM watermark/executive bond"
  },
  {
    id: "mfg-diary",
    title: "Diary",
    category: "Branding & Apparel",
    desc: "Custom debossed corporate executive diaries and planners with leatherette hardcover bindings.",
    tag: "Executive",
    spec: "Debossed logo, stitched binding"
  },
  {
    id: "mfg-t-shirt",
    title: "T-Shirt",
    category: "Branding & Apparel",
    desc: "Custom corporate and promotional round-neck T-shirts with screen printing or high-density embroidery.",
    tag: "Apparel",
    spec: "100% combed cotton, bio-washed"
  },
  {
    id: "mfg-shirt",
    title: "Shirt",
    category: "Branding & Apparel",
    desc: "Customized executive and uniform shirts featuring precision embroidered corporate insignia.",
    tag: "Apparel",
    spec: "Tailored fit, premium blended fabric"
  }
];
