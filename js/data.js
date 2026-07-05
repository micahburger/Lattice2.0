/* ============================================================================
   LATTICE — design tokens & content data
   Ported 1:1 from the Figma Make source (src/app/components/CanvasPreview.tsx
   and DesignControls.tsx). No AI calls anywhere in this file — every string
   here is prebuilt, static content.
   ============================================================================ */

/* Paths encode mood on purpose — assets/img/<light|dark|colorful>/... — so
   the collection engine (collection-data.js) can derive an asset's mood
   straight from its folder instead of hand-tagging every entry. Drop a new
   photo into the matching folder and it's already correctly moody.        */
const IMG = {
  cucTee: 'assets/img/light/cuc-tee.jpg',
  dinoTee: 'assets/img/light/dino-tee.jpg',
  cap: 'assets/img/colorful/cap.jpg',
  sneakers: 'assets/img/light/sneakers.jpg',
  car: 'assets/img/colorful/car.jpg',
  golf: 'assets/img/light/golf.jpg',
  featureVase: 'assets/img/light/feature-vase.jpg',
  featureStudio: 'assets/img/light/feature-studio.jpg',
  featureMaterials: 'assets/img/light/feature-materials.jpg',
  featureInterior: 'assets/img/light/feature-interior.jpg',
  bookLandscapes: 'assets/img/colorful/12.jpg',
  bookDutch: 'assets/img/light/13.jpeg',
  journalSpread: 'assets/img/colorful/14.jpg',
  lamp: 'assets/img/colorful/lamp1.jpg',
  shelf: 'assets/img/light/shelf.jpg',
  storage: 'assets/img/light/storage.jpg',
  clock1: 'assets/img/light/clock1.jpg',
  clock2: 'assets/img/colorful/clock2.jpg',
  darkGradient: 'assets/img/dark/gradient-study.jpg',
  darkSpheres: 'assets/img/dark/sphere-study.jpg',
  mediaConsole: 'assets/img/colorful/media-console.jpg',
  studioMonitor: 'assets/img/dark/studio-monitor.jpg',
  darkAlarmClock: 'assets/img/dark/alarm-clock.jpg',
  quadroDesignBook: 'assets/img/light/quadro-book.jpg',
  architectureBook: 'assets/img/dark/architecture-book.jpg',
  wideArchitecture: 'assets/img/light/wide1.jpg',
  wideLiving:       'assets/img/light/wide2.jpg',
  wideBar:          'assets/img/dark/wide.png',
  wideLounge:       'assets/img/dark/wide3.png',
};

/* ── Colors (Atmosphere) ─────────────────────────────────────────────────── */

const COLORS = {
  museum: {
    bg:'#F6F2EE', surface:'#EFE9E4', text:'#5D494B', soft:'#7A6668', muted:'#8D807C',
    accent:'#D5B998', accentFg:'#fff', border:'#DDD5CE', borderFaint:'#E8E2DC',
    navBg:'#5D494B', navText:'#F6F2EE', navMuted:'rgba(246,242,238,0.5)',
  },
  graphite: {
    bg:'#111111', surface:'#1D1D1D', text:'#F4F1EC', soft:'#D0C9C1', muted:'#B7B0A8',
    accent:'#9C8B70', accentFg:'#111', border:'#303030', borderFaint:'#242424',
    navBg:'#1D1D1D', navText:'#F4F1EC', navMuted:'rgba(244,241,236,0.45)',
  },
  signal: {
    bg:'#F4512F', surface:'#E84827', text:'#111111', soft:'#2A1010', muted:'#FFF2E8',
    accent:'#FFF8F2', accentFg:'#111', border:'rgba(17,17,17,0.15)', borderFaint:'rgba(17,17,17,0.08)',
    navBg:'#111111', navText:'#F4512F', navMuted:'rgba(244,81,47,0.6)',
  },
  forest: {
    bg:'#2E3B35', surface:'#3C4943', text:'#F5F2EC', soft:'#DBD5C8', muted:'#C7C1B7',
    accent:'#95A38C', accentFg:'#2E3B35', border:'#536058', borderFaint:'#435450',
    navBg:'#1E2B25', navText:'#F5F2EC', navMuted:'rgba(245,242,236,0.45)',
  },
  electric: {
    bg:'#EEF3FF', surface:'#DCE6FF', text:'#22304B', soft:'#3D4F6E', muted:'#6579A5',
    accent:'#6077FF', accentFg:'#fff', border:'#C7D4F4', borderFaint:'#DDE5F7',
    navBg:'#22304B', navText:'#EEF3FF', navMuted:'rgba(238,243,255,0.5)',
  },
  midnight: {
    bg:'#090909', surface:'#181818', text:'#FFFFFF', soft:'#CCCCCC', muted:'#A7A7A7',
    accent:'#4D8EFF', accentFg:'#fff', border:'#2A2A2A', borderFaint:'#1E1E1E',
    navBg:'#181818', navText:'#FFFFFF', navMuted:'rgba(255,255,255,0.4)',
  },
  clay: {
    bg:'#E8D7C7', surface:'#DCC8B7', text:'#4D3A33', soft:'#6B5247', muted:'#8C6F60',
    accent:'#C98B66', accentFg:'#fff', border:'#CDB8A8', borderFaint:'#D9C9BB',
    navBg:'#4D3A33', navText:'#E8D7C7', navMuted:'rgba(232,215,199,0.5)',
  },
};

const ATMOSPHERES = [
  { value:'museum',   name:'Museum Paper',  dark:false, keywords:['Quiet','Editorial','Timeless'] },
  { value:'graphite', name:'Graphite Night', dark:true,  keywords:['Luxury','Film','Editorial'] },
  { value:'signal',   name:'Signal Red',    dark:false, keywords:['Swiss','Campaign','Bold'] },
  { value:'forest',   name:'Deep Forest',   dark:true,  keywords:['Natural','Architectural','Organic'] },
  { value:'electric', name:'Electric Blue', dark:false, keywords:['Modern','Precise','Technical'] },
  { value:'midnight', name:'Midnight',      dark:true,  keywords:['Digital','Focus','Premium'] },
  { value:'clay',     name:'Soft Clay',     dark:false, keywords:['Hospitality','Interior','Boutique'] },
];

/* ── Typography ──────────────────────────────────────────────────────────── */

const TYPO = {
  editorial: {
    heading:"'Newsreader','Playfair Display',Georgia,serif",
    body:"'Source Serif 4',Georgia,serif",
    ui:"'Inter',system-ui,sans-serif",
    dSize:'clamp(42px,5.5vw,76px)', dHeight:'1.04', dTracking:'-0.01em', dWeight:'300', dTransform:'none',
    hSize:'clamp(20px,2.2vw,30px)', hHeight:'1.18', hWeight:'400', hTracking:'0em',
    bSize:'16px', bHeight:'1.78',
    lSize:'10px', lTracking:'0.12em', lTransform:'uppercase', lWeight:'500',
    cSize:'19px', cHeight:'1.22',
  },
  contemporary: {
    heading:"'Instrument Sans',system-ui,sans-serif",
    body:"'Inter','Helvetica Neue',sans-serif",
    ui:"'IBM Plex Mono','Courier New',monospace",
    dSize:'clamp(30px,3.6vw,54px)', dHeight:'1.04', dTracking:'0em', dWeight:'600', dTransform:'none',
    hSize:'clamp(18px,1.8vw,26px)', hHeight:'1.12', hWeight:'600', hTracking:'0em',
    bSize:'15px', bHeight:'1.65',
    lSize:'10px', lTracking:'0em', lTransform:'none', lWeight:'400',
    cSize:'16px', cHeight:'1.22',
  },
  fashion: {
    heading:"'Cormorant Garamond','Playfair Display',Georgia,serif",
    body:"'Manrope','DM Sans',sans-serif",
    ui:"'Inter',system-ui,sans-serif",
    dSize:'clamp(40px,5.2vw,72px)', dHeight:'1.0', dTracking:'-0.02em', dWeight:'300', dTransform:'uppercase',
    hSize:'clamp(14px,1.4vw,18px)', hHeight:'1.14', hWeight:'400', hTracking:'0.08em',
    bSize:'14px', bHeight:'1.92',
    lSize:'10px', lTracking:'0.14em', lTransform:'uppercase', lWeight:'500',
    cSize:'16px', cHeight:'1.1',
  },
  luxury: {
    heading:"'Bodoni Moda','Playfair Display',Georgia,serif",
    body:"'Newsreader',Georgia,serif",
    ui:"'Inter',system-ui,sans-serif",
    dSize:'clamp(38px,4.8vw,68px)', dHeight:'1.06', dTracking:'-0.01em', dWeight:'400', dTransform:'none',
    hSize:'clamp(18px,2vw,26px)', hHeight:'1.18', hWeight:'400', hTracking:'0em',
    bSize:'15px', bHeight:'1.74',
    lSize:'10px', lTracking:'0.1em', lTransform:'uppercase', lWeight:'400',
    cSize:'18px', cHeight:'1.2',
  },
  mono: {
    heading:"'IBM Plex Mono','Courier New',monospace",
    body:"'IBM Plex Sans',system-ui,sans-serif",
    ui:"'IBM Plex Mono','Courier New',monospace",
    dSize:'clamp(22px,2.6vw,40px)', dHeight:'1.35', dTracking:'0em', dWeight:'400', dTransform:'none',
    hSize:'clamp(15px,1.5vw,20px)', hHeight:'1.38', hWeight:'500', hTracking:'0em',
    bSize:'14px', bHeight:'1.8',
    lSize:'10px', lTracking:'0.06em', lTransform:'none', lWeight:'400',
    cSize:'14px', cHeight:'1.38',
  },
};

const TYPO_OPTIONS = [
  { value:'editorial',    label:'Editorial',    meta:'Newsreader · Source Serif 4',    family:"'Newsreader', Georgia, serif" },
  { value:'contemporary', label:'Contemporary', meta:'Instrument Sans · IBM Plex Mono', family:"'Instrument Sans', system-ui, sans-serif" },
  { value:'fashion',      label:'Fashion',      meta:'Cormorant Garamond · Manrope',    family:"'Cormorant Garamond', Georgia, serif" },
  { value:'luxury',       label:'Luxury',       meta:'Bodoni Moda · Newsreader',        family:"'Bodoni Moda', Georgia, serif" },
  { value:'mono',         label:'Mono',         meta:'IBM Plex Mono · IBM Plex Sans',   family:"'IBM Plex Mono', monospace" },
];

/* ── Spacing ─────────────────────────────────────────────────────────────── */

const SPACE = {
  generous: { navH:64, sV:72, sH:60, gap:44, elem:28, micro:18 },
  compact:  { navH:44, sV:24, sH:24, gap:12, elem:12, micro:6  },
  rhythmic: { navH:56, sV:48, sH:40, gap:24, elem:16, micro:8  },
};

const SPACING_OPTIONS = [
  { value:'generous', label:'Generous', sub:'Open & airy',  gap:9 },
  { value:'compact',  label:'Compact',  sub:'Dense & rich', gap:2 },
  { value:'rhythmic', label:'Rhythmic', sub:'8pt grid',      gap:5 },
];

const LAYOUT_OPTIONS = [
  { value:'magazine', label:'Magazine', sub:'Asymmetric' },
  { value:'minimal',  label:'Minimal',  sub:'Centered'   },
  { value:'grid',     label:'Grid',     sub:'Structured' },
  { value:'feature',  label:'Feature',  sub:'Full-bleed' },
];

/* ── Content archetypes ──────────────────────────────────────────────────── */

const CONTENT_ARCHETYPES = [
  { value:'editorial', title:'Editorial', tagline:'Ideas worth reading',
    description:'Essays, journals, magazines, and thoughtful storytelling.',
    tones:'Quiet · Literary · Slow Publishing' },
  { value:'portfolio', title:'Portfolio', tagline:'The work speaks first',
    description:'Artists, photographers, architects, and creative practitioners.',
    tones:'Gallery · Minimal · Image-first' },
  { value:'brand', title:'Brand', tagline:'A studio with a point of view',
    description:'Agencies, consultancies, and creative studios with conviction.',
    tones:'Confident · Strategic · Articulate' },
  { value:'product', title:'Product', tagline:'Objects designed to be lived with',
    description:'Makers, e-commerce, furniture, and independent brands.',
    tones:'Calm · Honest · Minimal' },
];

const CONTENT = {
  editorial: {
    brand:'FORMA', issue:'Vol. 12, No. 04', category:'Design & Culture',
    title:'A Quiet Life.\nWell Made.',
    subtitle:'Essays on design, culture, architecture, craft, and the details that quietly shape everyday life.',
    author:'Helena Marsh',
    excerpt:'"Good writing doesn\'t shout. It rewards attention."',
    cards:[
      { title:'Objects of Consideration', category:'Essay',   meta:'Design & Material Culture · 8 min' },
      { title:'Mindful Routines',          category:'Journal', meta:'On Daily Practice · 6 min'         },
      { title:'Places We Return To',       category:'Essay',   meta:'Architecture & Memory · 10 min'    },
    ],
    navItems:['Home','Stories','Journal','Archive','About'],
    journalTeaser: { kicker:'From the Desk', text:'Notes, drafts, and the stories that didn\'t make the issue.', cta:'Visit the Archive' },
    collectionCta: 'Stories worth returning to.',
  },
  portfolio: {
    brand:'STUDIO', issue:'Archive 2021–24', category:'Selected Works',
    title:'Painted Light.',
    subtitle:'A collection of projects spanning exhibitions, commissions, research, and independent practice.',
    author:'Studio Archive',
    excerpt:'"Presentation is part of the work."',
    cards:[
      { title:'Sunset Field No. 3', category:'Oil on Canvas', meta:'2023 · 80 × 80 cm'   },
      { title:'Birch with Cloud',   category:'Oil on Canvas', meta:'2024 · 90 × 70 cm'   },
      { title:'Forms in Motion',    category:'Drawing',       meta:'2022 · Series of 12' },
    ],
    navItems:['Work','Archive','Process','About','Contact'],
    journalTeaser: { kicker:'From the Studio', text:'Works in progress, process notes, and ideas in development.', cta:'Visit the Journal' },
    collectionCta: 'Work that speaks for itself.',
  },
  brand: {
    brand:'FORMA', issue:'Est. 2018 · Berlin', category:'Creative Studio',
    title:'Design With\nConviction.',
    subtitle:'Independent creative studio crafting identities, digital experiences, editorial systems, and visual communication.',
    author:'Forma Studio',
    excerpt:'"Consistency isn\'t repetition. It\'s recognition."',
    cards:[
      { title:'Maison Identity System', category:'Brand Identity', meta:'Global Luxury · 2023'         },
      { title:'Volta Digital',          category:'Digital Design', meta:'Technology Studio · 2024'     },
      { title:'Bureau Communications',  category:'Editorial',      meta:'Cultural Institution · 2023'  },
    ],
    navItems:['Studio','Work','Thinking','Services','Contact'],
    journalTeaser: { kicker:'From the Studio', text:'Process notes, client work, and the thinking behind the system.', cta:'Visit the Journal' },
    collectionCta: 'A system built with intention.',
  },
  product: {
    brand:'ATELIER', issue:'Collection 2025', category:'Everyday Objects',
    title:'Everyday Objects.',
    subtitle:'Objects designed for everyday use through careful material selection, thoughtful construction, and timeless utility.',
    author:'The Workshop',
    excerpt:'"The best products disappear into your routine."',
    cards:[
      { title:'Linen Tote',  category:'Carry',   meta:'$240' },
      { title:'Cedar Stool', category:'Seating', meta:'$580' },
      { title:'Stone Mug',   category:'Kitchen', meta:'$65'  },
    ],
    navItems:['Collection','Journal','Materials','About','Cart'],
    journalTeaser: { kicker:'From the Studio', text:'Works in progress, process notes, and ideas from the studio.', cta:'Visit Journal' },
    collectionCta: 'Curated pieces for living with intention.',
  },
};

const COLLECTION_STAT_LABEL = { editorial:'Stories', portfolio:'Works', brand:'Projects', product:'Pieces' };

const CARD_PHOTOS = {
  editorial: [IMG.journalSpread,  IMG.bookDutch,        IMG.darkSpheres],
  portfolio: [IMG.golf,           IMG.darkSpheres,      IMG.car        ],
  brand:     [IMG.studioMonitor,  IMG.architectureBook, IMG.quadroDesignBook],
  product:   [IMG.storage,        IMG.shelf,            IMG.cap        ],
};
const HERO_PHOTOS = {
  editorial: IMG.wideArchitecture,
  portfolio: IMG.wideLounge,
  brand:     IMG.wideBar,
  product:   IMG.wideLiving,
};
const FEATURE_HEROES = {
  editorial: IMG.featureInterior,
  portfolio: IMG.featureVase,
  brand:     IMG.featureStudio,
  product:   IMG.featureMaterials,
};
