/* ============================================================================
   LATTICE — Creative Guide content model.
   Structured, hand-authored data (no AI calls) describing what each Design
   Control option *means*, plus a small matching engine that turns the current
   five-way combination into a named "direction", a curated set of Go Deeper
   resources (Browse / Study / Read / Reference), and a tag-scored Inspiration
   set. Fully static, deterministic.
   ============================================================================ */

/* ── Per-option metadata ──────────────────────────────────────────────────
   Keyed "`<designKey>:<value>`" so it lines up 1:1 with state.design.
   `tags` doubles as the matching signal for both Inspiration and Go Deeper.  */

const OPTION_META = {
  'typography:editorial':    { category:'type', traits:['literary','unhurried','warm'],
    contribution:'brings a literary, unhurried authority to every headline',
    tags:['editorial','print','serif','books'] },
  'typography:contemporary': { category:'type', traits:['clean','systematic','present-tense'],
    contribution:'gives the page a clean, present-tense voice',
    tags:['modern','systems','minimal','tech','contemporary'] },
  'typography:fashion':      { category:'type', traits:['couture','tight','confident'],
    contribution:'gives the page a sharp, composed silhouette',
    tags:['fashion','editorial','couture','texture'] },
  'typography:luxury':       { category:'type', traits:['dramatic','high-contrast','formal'],
    contribution:'adds a quiet sense of occasion to every headline',
    tags:['luxury','drama','print','jewelry'] },
  'typography:mono':         { category:'type', traits:['systematic','technical','precise'],
    contribution:'gives the system a systematic, almost technical calm',
    tags:['tech','systems','product','minimal','mono'] },

  'colorStory:museum':   { category:'color', traits:['warm','quiet','timeless'],
    contribution:'keeps the page warm and unhurried, like a printed page under good light',
    tags:['paper','print','warm','books'] },
  'colorStory:graphite': { category:'color', traits:['dark','considered','filmic'],
    contribution:'wraps the page in a considered, cinematic dark',
    tags:['dark','luxury','film','night'] },
  'colorStory:signal':   { category:'color', traits:['bold','graphic','urgent'],
    contribution:'adds energy and interruption without making the experience feel like a campaign page',
    tags:['red','graphic','poster','contrast'] },
  'colorStory:forest':   { category:'color', traits:['natural','grounded','organic'],
    contribution:'grounds the page in a natural, architectural quiet',
    tags:['nature','material','green','architecture'] },
  'colorStory:electric': { category:'color', traits:['precise','modern','optimistic'],
    contribution:'adds a clean, confident charge',
    tags:['tech','product','blue','systems'] },
  'colorStory:midnight': { category:'color', traits:['focused','digital','stark'],
    contribution:'strips the page down to contrast, hierarchy, and proportion',
    tags:['dark','tech','minimal','tool'] },
  'colorStory:clay':     { category:'color', traits:['handmade','warm','material'],
    contribution:'keeps the page tactile and warm, never precious',
    tags:['craft','ceramic','warm','material'] },

  'layout:magazine': { category:'layout', traits:['editorial','directional','asymmetric'],
    contribution:'creates a clear route between image and headline',
    tags:['editorial-grid','image-first','asymmetry'] },
  'layout:minimal':  { category:'layout', traits:['centered','still','deliberate'],
    contribution:'centers attention and asks nothing to compete',
    tags:['minimal','centered','stillness'] },
  'layout:grid':     { category:'layout', traits:['structured','systematic','honest'],
    contribution:'makes the structure itself visible',
    tags:['grid','systems','structure'] },
  'layout:feature':  { category:'layout', traits:['bold','image-first','immersive'],
    contribution:'lets one image hold the room',
    tags:['full-bleed','photography','poster','feature'] },

  'spacing:generous': { category:'spacing', traits:['open','airy','confident'],
    contribution:'slows the whole thing down, on purpose',
    tags:['space','quiet','luxury'] },
  'spacing:compact':  { category:'spacing', traits:['dense','efficient','busy'],
    contribution:'keeps everything close and worth digging into',
    tags:['dense','print','archive'] },
  'spacing:rhythmic': { category:'spacing', traits:['systematic','steady','precise'],
    contribution:'turns repetition into a steady, considered momentum',
    tags:['grid','systems','rhythm'] },

  'contentFocus:editorial': { category:'content', traits:['literary','slow','considered'],
    contribution:'makes the result feel considered, specific, and worth lingering with',
    tags:['editorial','print','books','quote'] },
  'contentFocus:portfolio': { category:'content', traits:['gallery','image-first','confident'],
    contribution:'lets the work speak before anything else does',
    tags:['gallery','art','photography','portfolio'] },
  'contentFocus:brand':     { category:'content', traits:['strategic','articulate','studio'],
    contribution:'gives the whole system a point of view',
    tags:['studio','identity','print','brand','content'] },
  'contentFocus:product':   { category:'content', traits:['honest','calm','minimal'],
    contribution:'keeps the focus on the object, not the pitch',
    tags:['product','object','ceramic','packaging'] },
};

function optionLabel(category, value) {
  if (category === 'typography')   return TYPO_OPTIONS.find(o => o.value === value).label;
  if (category === 'colorStory')   return ATMOSPHERES.find(o => o.value === value).name;
  if (category === 'layout')       return LAYOUT_OPTIONS.find(o => o.value === value).label;
  if (category === 'spacing')      return SPACING_OPTIONS.find(o => o.value === value).label;
  if (category === 'contentFocus') return CONTENT_ARCHETYPES.find(o => o.value === value).title;
  return value;
}

/* ── Go Deeper resource catalog ────────────────────────────────────────────
   Type-led: three real, external resources per typography choice. IN USE
   and PAIRING are curatorial — real deployed projects and live pairings in
   a similar mood, not necessarily built on this app's exact fonts. GET THE
   FONT is the one card kept literally accurate: it always points at the
   actual typeface the canvas renders for that option (see fontSpecimens),
   falling back to a fitting real-world alternative only where this app's
   font has no clean foundry/specimen link of its own. Every entry is a
   genuine external link, opened in a new tab.                            */

/* The exact typefaces this app renders, used as the GET THE FONT card so
   that card never contradicts what "The Move" says or what's on screen. */
const fontSpecimens = {
  newsreader: { id:'newsreader-production-type', kind:'GET THE FONT', title:'Newsreader — Production Type',
    description:'An open-source serif designed specifically for long-form reading on screens, with optical sizes for text and display use.',
    href:'https://productiontype.com/font/newsreader', external:true },
  cormorant: { id:'cormorant-google', kind:'GET THE FONT', title:'Cormorant Garamond — Google Fonts',
    description:'An expressive display family with a large range of stylistic cuts, useful when you want classical form with more theatrical presence.',
    href:'https://fonts.google.com/specimen/Cormorant+Garamond', external:true },
  instrumentSans: { id:'instrument-sans-google', kind:'GET THE FONT', title:'Instrument Sans — Google Fonts',
    description:'A warm, slightly rounded grotesk built for interfaces — the actual display face behind this app’s "Contemporary" system.',
    href:'https://fonts.google.com/specimen/Instrument+Sans', external:true },
  ibmPlex: { id:'ibm-plex-brand-story', kind:'SPECIMEN', title:'The Story of IBM Plex',
    description:'A closer look at how IBM designed a type system to balance the engineered and the human.',
    href:'https://www.ibm.com/design/impact/plex/', external:true },
  suisse: { id:'suisse-typefaces', kind:'GET THE FONT', title:'Suisse — Swiss Typefaces',
    description:'A large neo-grotesk superfamily with serif, mono, and condensed companions designed to work together as one system.',
    href:'https://www.swisstypefaces.com/fonts/suisse/', external:true },
};

const typeResources = {
  editorial: [
    { id:'editorial-new-4n', kind:'IN USE', title:'4N Magazine and Manifesto',
      description:'Editorial New carries both titles and body copy in a publication that feels art-school, cultural, and document-led.',
      href:'https://fontsinuse.com/uses/68947/4n-magazine-and-manifesto', external:true },
    { id:'editorial-new-versus-hotels', kind:'PAIRING', title:'Versus Hotels',
      description:'Editorial New + Space Grotesk. A sharp example of expressive serif display type balanced by a calm geometric sans.',
      href:'https://www.typewolf.com/site-of-the-day/versus-hotels', external:true },
    fontSpecimens.newsreader,
  ],
  contemporary: [
    { id:'graphik-typographics', kind:'IN USE', title:'Typographics 2017 Branding',
      description:'Graphik acts as the stabilizing voice in a bolder identity system, showing how a neutral sans can keep experimental work grounded.',
      href:'https://fontsinuse.com/uses/25799/typographics-2017-branding', external:true },
    { id:'bastien-allard', kind:'PAIRING', title:'Bastien Allard',
      description:'Editorial New + Neue Haas Unica. A good reference for contemporary restraint with just enough editorial character.',
      href:'https://www.typewolf.com/site-of-the-day/bastien-allard', external:true },
    fontSpecimens.instrumentSans,
  ],
  fashion: [
    { id:'nu-icons-magazine', kind:'IN USE', title:'Nu Icons Magazine Redesign',
      description:'Fashion and beauty editorial that pairs a more expressive display voice with Neue Haas Grotesk for text and Basel Grotesk Mono for captions.',
      href:'https://fontsinuse.com/uses/45844/nu-icons-magazine-redesign', external:true },
    { id:'tmbr-founders-grotesk', kind:'PAIRING', title:'TMBR',
      description:'Cambon + Founders Grotesk. A confident serif-and-grotesk pairing with enough contrast for cultural or fashion-forward work.',
      href:'https://www.typewolf.com/site-of-the-day/tmbr', external:true },
    fontSpecimens.cormorant,
  ],
  luxury: [
    { id:'simon-schuster-editorial-new', kind:'IN USE', title:'Simon & Schuster Redesign Concept',
      description:'Editorial New shifts from subtle subheads to dramatic display moments, showing how high-contrast serif type can feel both refined and modern.',
      href:'https://fontsinuse.com/uses/64711/simon-and-schuster-redesign-fictional', external:true },
    { id:'bodoni-eric-hu', kind:'PAIRING', title:'Eric Hu',
      description:'Bodoni + Neue Haas Grotesk. A classic high-contrast display face paired with a neutral sans for a sharper, more contemporary result.',
      href:'https://www.typewolf.com/bodoni', external:true },
    { id:'bodoni-moda-google', kind:'GET THE FONT', title:'Bodoni Moda — Google Fonts',
      description:'A digital-first Bodoni family with high contrast, italics, and a full range of weights for more dramatic editorial composition.',
      href:'https://fonts.google.com/specimen/Bodoni+Moda', external:true },
  ],
  mono: [
    { id:'raye-space-mono', kind:'IN USE', title:'Raye the Store',
      description:'Space Mono helps create a consistent, contemporary system across product editions without losing warmth or personality.',
      href:'https://fontsinuse.com/uses/62010/raye-the-store-10', external:true },
    { id:'paradise-studio-space-mono', kind:'PAIRING', title:'Paradise Studio',
      description:'Lausanne + Space Mono. A useful reference for mixing polished contemporary sans typography with technical utility details.',
      href:'https://www.typewolf.com/site-of-the-day/paradise-studio', external:true },
    { id:'ibm-plex-official', kind:'GET THE FONT', title:'IBM Plex',
      description:'IBM’s open-source type system, built across Sans, Serif, and Mono styles for interfaces, information, and expressive systems.',
      href:'https://www.ibm.com/plex/', external:true },
  ],
};

function pickGoDeeperResources(design) {
  return (typeResources[design.typography] || []).slice(0, 3);
}

/* ── Named directions — curated combinations worth a real title ──────────── */

const DIRECTIONS = [
  { id:'signal-clarity', title:'Signal Clarity',
    match:{ typography:['contemporary','mono'], colorStory:['signal','electric'], contentFocus:['editorial','brand'] },
    headline:'A bold signal in an editorial frame.' },
  { id:'midnight-precision', title:'Midnight Precision',
    match:{ typography:['mono','contemporary'], colorStory:['midnight','graphite'], layout:['feature','minimal'] },
    headline:'Precision that disappears into the dark.' },
  { id:'quiet-authority', title:'Quiet Authority',
    match:{ typography:['editorial','luxury'], colorStory:['museum','graphite'], spacing:['generous'] },
    headline:'A hush confident enough to demand your full attention.' },
  { id:'gallery-restraint', title:'Gallery Restraint',
    match:{ typography:['fashion','luxury'], colorStory:['museum','clay'], contentFocus:['portfolio'] },
    headline:'The work leads; the type steps back.' },
  { id:'structured-conviction', title:'Structured Conviction',
    match:{ typography:['contemporary','fashion'], contentFocus:['brand'], layout:['grid','magazine'] },
    headline:'A brand system that speaks in measured beats.' },
  { id:'natural-material', title:'Natural Material',
    match:{ colorStory:['forest','clay'], contentFocus:['product','brand'] },
    headline:'Design that borrows its authority from the physical world.' },
  { id:'campaign-signal', title:'Campaign Signal',
    match:{ colorStory:['signal'], layout:['feature','magazine'] },
    headline:'Color does the shouting so the type doesn’t have to.' },
  { id:'digital-instrument', title:'Digital Instrument',
    match:{ typography:['mono','contemporary'], colorStory:['midnight','electric'], layout:['grid','feature'] },
    headline:'A focused instrument, not a decoration.' },
  { id:'editorial-warmth', title:'Editorial Warmth',
    match:{ typography:['editorial'], colorStory:['museum','clay'], contentFocus:['editorial'] },
    headline:'A page built for slow, deliberate reading.' },
  { id:'fashion-authority', title:'Fashion Authority',
    match:{ typography:['fashion'], colorStory:['signal','graphite'], spacing:['compact','rhythmic'] },
    headline:'All caps, tight tracking, absolute confidence.' },
  { id:'luxury-drama', title:'Luxury Drama',
    match:{ typography:['luxury'], colorStory:['graphite','midnight'] },
    headline:'Maximum contrast, minimum noise.' },
  { id:'boutique-hospitality', title:'Boutique Hospitality',
    match:{ colorStory:['clay'], contentFocus:['product','brand'] },
    headline:'Warmth you can practically touch.' },
  { id:'swiss-structure', title:'Swiss Structure',
    match:{ layout:['grid'], spacing:['rhythmic'] },
    headline:'Structure becomes the visual argument.' },
  { id:'full-bleed-authority', title:'Full-Bleed Authority',
    match:{ layout:['feature'], contentFocus:['portfolio','brand'] },
    headline:'One image, full authority, nothing competing.' },
  { id:'centered-stillness-direction', title:'Centered Stillness',
    match:{ layout:['minimal'], spacing:['generous','rhythmic'] },
    headline:'Centered, still, entirely self-possessed.' },
  { id:'technical-precision', title:'Technical Precision',
    match:{ typography:['mono'], colorStory:['electric','midnight'], contentFocus:['brand','product'] },
    headline:'A system that reads like good engineering.' },
  { id:'quiet-luxury-object', title:'Quiet Luxury Object',
    match:{ typography:['luxury','editorial'], contentFocus:['product'], spacing:['generous'] },
    headline:'The object gets the whole room to itself.' },
  { id:'forest-focus', title:'Forest Focus',
    match:{ colorStory:['forest'], contentFocus:['editorial','portfolio'] },
    headline:'Dark green, deep focus, natural authority.' },
  { id:'quiet-drama', title:'Quiet Drama',
    match:{ typography:['luxury'], colorStory:['clay'] },
    headline:'Warm materiality, given room to speak.' },
  { id:'electric-poise', title:'Electric Poise',
    match:{ typography:['fashion'], colorStory:['electric'] },
    headline:'Precision with just enough voltage.' },
  { id:'dark-structure', title:'Dark Structure',
    match:{ colorStory:['midnight'], layout:['grid'], spacing:['rhythmic'], contentFocus:['brand','product'] },
    headline:'A system with nothing to hide behind.' },
];

function matchDirection(design) {
  let best = null;
  let bestSpecificity = -1;
  DIRECTIONS.forEach(dir => {
    const keys = Object.keys(dir.match);
    const allMatch = keys.every(k => dir.match[k].includes(design[k]));
    if (allMatch && keys.length > bestSpecificity) { best = dir; bestSpecificity = keys.length; }
  });
  return best;
}

/* ── Fallback title / headline generation (used when no named direction fits)
   Two words, no "X With Y" — describes the resulting character rather than
   repeating the ingredient names.                                          */

const TYPO_NOUN  = { editorial:'Warmth', contemporary:'Clarity', fashion:'Elegance', luxury:'Drama', mono:'Precision' };
const MOOD_ADJ   = {
  museum:'Quiet', graphite:'Considered', signal:'Bold', forest:'Grounded',
  electric:'Charged', midnight:'Focused', clay:'Handmade',
};
const COLOR_MOOD = {
  museum:   { adj:'quiet',      noun:'warmth' },
  graphite: { adj:'considered', noun:'dark'   },
  signal:   { adj:'bold',       noun:'signal' },
  forest:   { adj:'grounded',   noun:'calm'   },
  electric: { adj:'precise',    noun:'charge' },
  midnight: { adj:'focused',    noun:'hush'   },
  clay:     { adj:'handmade',   noun:'warmth' },
};
const CONTENT_FRAME = { editorial:'editorial', portfolio:'gallery', brand:'studio', product:'product' };

function fallbackTitle(design) {
  return `${MOOD_ADJ[design.colorStory]} ${TYPO_NOUN[design.typography]}`;
}

function fallbackHeadline(design) {
  const mood = COLOR_MOOD[design.colorStory];
  const frame = CONTENT_FRAME[design.contentFocus];
  const article = /^[aeiou]/i.test(frame) ? 'an' : 'a';
  return `A ${mood.adj} ${mood.noun} in ${article} ${frame} frame.`;
}

function currentDirectionTitle(design) {
  const dir = matchDirection(design);
  return dir ? dir.title : fallbackTitle(design);
}

function theMoveHeadline(design) {
  const dir = matchDirection(design);
  return dir ? dir.headline : fallbackHeadline(design);
}

/* ── The Move paragraph ────────────────────────────────────────────────────
   Always generated (never hand-authored per direction) — leads with type +
   color, credits layout + spacing together, then closes on a single content
   flavored line. Three sentences, ~45-65 words, never a five-item roll call. */

const CONTENT_CLOSER = {
  editorial: 'The result feels more editorial than promotional.',
  portfolio: 'The result feels like a gallery, not a pitch.',
  brand:     'The result feels designed to be remembered.',
  product:   'The result feels like a shelf, not a showroom.',
};

function theMoveParagraph(design) {
  const t = OPTION_META[`typography:${design.typography}`];
  const c = OPTION_META[`colorStory:${design.colorStory}`];
  const l = OPTION_META[`layout:${design.layout}`];
  const s = OPTION_META[`spacing:${design.spacing}`];

  const typoLabel    = optionLabel('typography', design.typography);
  const colorLabel   = optionLabel('colorStory', design.colorStory);
  const layoutLabel  = optionLabel('layout', design.layout);
  const spacingLabel = optionLabel('spacing', design.spacing);

  const sentence1 = `${typoLabel} typography ${t.contribution}, while ${colorLabel} ${c.contribution}.`;
  const sentence2 = `The ${layoutLabel.toLowerCase()} layout ${l.contribution}, while ${spacingLabel.toLowerCase()} spacing ${s.contribution}.`;
  const sentence3 = CONTENT_CLOSER[design.contentFocus];

  return `${sentence1} ${sentence2} ${sentence3}`;
}

/* ── Inspiration pool — tag-scored against the current direction ─────────── */

const INSPIRATION_POOL = [
  { id:'stillness-framed',      kind:'image',    src:IMG.featureVase,     tags:['nature','material','green','quiet','minimal','centered'],
    title:'Stillness, Framed', note:'A single subject, a lot of quiet air around it. This is what "let the work breathe" looks like when you actually commit to it — no crowding, no competing elements.' },
  { id:'type-as-voice',         kind:'type',     glyph:'Aa',              tags:['systems','minimal','editorial','tech'],
    title:'Type as Voice', note:'Before color, before layout — the typeface is the first thing a visitor feels. Pick one that argues for your point of view, not just one that’s legible.' },
  { id:'restraint-strategy',    kind:'quote',    text:'Clarity Creates Impact', tags:['minimal','editorial','quiet','structure'],
    title:'Restraint as Strategy', note:'The best editorial and brand systems say less, more precisely. Every element you cut makes the ones that remain louder.' },
  { id:'material-honesty',      kind:'image',    src:IMG.featureMaterials, tags:['nature','material','craft','texture','warm'],
    title:'Material Honesty', note:'Photography that shows texture and wear reads as trustworthy. Overly polished imagery can undercut the same brand voice it’s meant to support.' },
  { id:'logotype-test',         kind:'wordmark', text:'FORMA',            tags:['identity','studio','systems','print'],
    title:'The Logotype Test', note:'If your wordmark only works in one weight, at one size, on one background — it isn’t finished yet. Test it small, test it reversed, test it alone.' },
  { id:'negative-space',        kind:'image',    src:IMG.golf,            tags:['space','quiet','luxury','minimal'],
    title:'Negative Space at Work', note:'The empty two-thirds of this frame is doing as much storytelling as the figure in it. Generous spacing in a layout works on the same principle.' },
  { id:'red-as-argument',       kind:'quote',    text:'Color Is Argument', tags:['red','graphic','poster','contrast'],
    title:'Red as Argument', note:'Saturated color used as the entire field, not an accent, is a Swiss poster move. It tells the reader the color itself is the point.' },
  { id:'night-drive',           kind:'image',    src:IMG.car,             tags:['dark','night','film','luxury','drama'],
    title:'Night Drive', note:'Dark, glossy, and unhurried. This is the visual register that near-black atmospheres reach for — depth without coldness.' },
  { id:'archive-density',       kind:'quote',    text:'Every Inch Earned', tags:['dense','archive','print','structure'],
    title:'Archive Density', note:'Reference books and broadsheets pack the page because there’s genuinely a lot worth finding. Density reads as seriousness when the grid still holds.' },
  { id:'gallery-hang',          kind:'image',    src:IMG.darkSpheres,     tags:['gallery','art','photography','image-first'],
    title:'The Gallery Hang', note:'Sequence is an editorial opinion. Which image goes first, and why, says as much about the work as any of the pieces themselves.' },
  { id:'systems-thinking',      kind:'type',     glyph:'01',              tags:['systems','grid','tech','rhythm'],
    title:'Systems Thinking', note:'A number, set plainly, on a grid. Systems aesthetics find beauty in constraint — the rule you set once so you stop deciding on every element.' },
  { id:'object-first',          kind:'image',    src:IMG.cucTee,          tags:['product','object','packaging','minimal'],
    title:'Object, First', note:'The product fills the frame; nothing else competes. This is the visual grammar of a page built to answer one question: do I want this?' },
  { id:'made-by-hand',          kind:'image',    src:IMG.dinoTee,         tags:['craft','ceramic','warm','material'],
    title:'Made By Hand', note:'Imperfection reads as care. Objects photographed to show their making — not just their finish — build a different kind of trust with a buyer.' },
  { id:'structural-honesty',    kind:'image',    src:IMG.featureStudio,   tags:['architecture','structure','grid','systems'],
    title:'Structural Honesty', note:'When the system is visible, there’s no pretense of artlessness. The grid is the content, and that is its own kind of elegance.' },
  { id:'nearly-empty-shelf',    kind:'image',    src:IMG.featureVase,     tags:['luxury','object','quiet','material'],
    title:'The Nearly Empty Shelf', note:'One object, generously spaced, sells itself as precious. Luxury retail figured this out long before digital design caught up.' },
  { id:'texture-of-materials',  kind:'image',    src:IMG.featureMaterials,tags:['material','texture','craft','nature'],
    title:'The Texture of Materials', note:'Close, tactile, unstyled. This is photography that trusts the material to be interesting without a filter doing the work.' },
  { id:'interior-light',        kind:'image',    src:IMG.featureInterior, tags:['architecture','quiet','warm','minimal'],
    title:'Interior Light', note:'Natural light and empty rooms read as calm confidence. The absence of clutter is doing more work here than any single object could.' },
  { id:'field-notes',           kind:'quote',    text:'Precision Is a Feeling', tags:['tech','systems','blue','product'],
    title:'Field Notes', note:'Well-designed tools feel precise before a user reads a single label. Color and spacing communicate capability before content does.' },
  { id:'monochrome-editorial',  kind:'image',    src:IMG.cap,             tags:['fashion','editorial','texture','print'],
    title:'Monochrome Editorial', note:'Stripped of color, composition and type have to carry everything. This is the discipline fashion editorial built its authority on.' },
  { id:'the-quiet-cover',       kind:'wordmark', text:'ISSUE 04',         tags:['print','books','editorial','quote'],
    title:'The Quiet Cover', note:'A cover that under-promises typographically often over-delivers on trust. Restraint on the cover is a signal about what’s inside.' },
];

function pickInspiration(design, limit) {
  limit = limit || 6;
  const activeTags = new Set();
  ['typography', 'colorStory', 'layout', 'spacing', 'contentFocus'].forEach(cat => {
    const meta = OPTION_META[`${cat}:${design[cat]}`];
    if (meta) meta.tags.forEach(t => activeTags.add(t));
  });

  return INSPIRATION_POOL
    .map((item, idx) => ({ item, idx, score: item.tags.filter(t => activeTags.has(t)).length }))
    .sort((a, b) => b.score - a.score || a.idx - b.idx)
    .slice(0, limit)
    .map(x => x.item);
}
