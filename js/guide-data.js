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
   Four distinct jobs: BROWSE (galleries/showcases), STUDY (design systems /
   documentation), READ (a specific idea tied to the selected direction), and
   REFERENCE (archives, typography libraries, foundational material). Real,
   currently-active external destinations are linked directly; the bespoke
   READ essays are internal (no url) and open the in-app detail modal.       */

const RESOURCES = {
  // READ — specific, bespoke, tied to individual options.
  'literary-serif':    { type:'READ', title:'Newsreader and the literary serif revival',    sub:'Why optical-size serifs read as considered, not decorative.',        tags:['editorial','print','serif','books'] },
  'bodoni-drama':      { type:'READ', title:'Bodoni and typographic drama',                 sub:'Extreme contrast as a signal of quality, not decoration.',           tags:['luxury','drama','print','jewelry'] },
  'museum-paper':      { type:'READ', title:'Museum paper and reading comfort',             sub:'Why warm ivory grounds slow readers down in a good way.',            tags:['paper','print','warm','books'] },
  'material-color':    { type:'READ', title:'Color as material reference',                  sub:'Why clay and forest tones feel touchable on screen.',               tags:['craft','ceramic','warm','material','nature'] },
  'generous-space':    { type:'READ', title:'Quiet luxury and generous space',              sub:'Why the emptiest layouts often feel the most expensive.',            tags:['space','quiet','luxury'] },
  'density-authority':  { type:'READ', title:'British newspaper density as editorial value', sub:'How tight columns signal there’s a lot worth reading.',              tags:['dense','print','archive'] },
  'editorial-trust':   { type:'READ', title:'Editorial design as a trust contract',          sub:'Every design choice should carry the reader forward.',               tags:['editorial','print','books','quote'] },
  'muji-restraint':    { type:'READ', title:'Muji and product restraint',                   sub:'Absolute clarity so the object can speak for itself.',               tags:['product','object','ceramic','packaging'] },
  'centered-stillness': { type:'READ', title:'Kenya Hara and centered stillness',            sub:'Why restraint is a decision, not an absence of one.',                tags:['minimal','centered','stillness'] },
  'brodovitch':        { type:'READ', title:'Alexey Brodovitch and magazine pacing',        sub:'How image crop, scale, and asymmetry create momentum.',              tags:['editorial-grid','image-first','asymmetry','full-bleed','photography'] },

  // BROWSE — visual inspiration and real-world examples.
  'mobbin-sites':  { type:'BROWSE', title:'Mobbin · Latest Sites',       sub:'Real product and website patterns worth studying.',              url:'https://mobbin.com/discover/sites/latest', tags:['layout','product','contemporary','ui'] },
  'typewolf':      { type:'BROWSE', title:'Typewolf · Typography Resources', sub:'Pairings, type trends, and strong web typography.',          url:'https://www.typewolf.com/resources',       tags:['type','fashion','luxury','contemporary'] },
  'mindsparkle':   { type:'BROWSE', title:'Mindsparkle · Design Projects', sub:'Brand, web, packaging, and visual identity case studies.',      url:'https://mindsparklemag.com/',              tags:['brand','editorial','color','creative'] },
  'siteinspire':   { type:'BROWSE', title:'Siteinspire',                sub:'Curated creative websites organized by style and type.',         url:'https://www.siteinspire.com/',             tags:['layout','brand','portfolio','editorial'] },
  'awwwards':      { type:'BROWSE', title:'Awwwards · Interaction Design', sub:'High-craft sites with ambitious visual and interaction ideas.', url:'https://www.awwwards.com/websites/interaction-design/', tags:['interaction','brand','experimental','feature'] },

  // STUDY — systems, frameworks, and foundational references.
  'carbon':    { type:'STUDY', title:'IBM Carbon Design System',              sub:'A rigorous system for typography, components, and product consistency.', url:'https://carbondesignsystem.com/',    tags:['system','grid','contemporary','mono'] },
  'spectrum':  { type:'STUDY', title:'Adobe Spectrum',                        sub:'How a large creative platform makes a coherent visual language.',        url:'https://spectrum.adobe.com/',        tags:['system','creative','color','product'] },
  'material':  { type:'STUDY', title:'Material Design 3',                    sub:'A modern system for adaptable interaction, color, and components.',      url:'https://m3.material.io/',            tags:['system','color','product','contemporary'] },
  'apple-hig': { type:'STUDY', title:'Apple Human Interface Guidelines',      sub:'Clarity, hierarchy, and platform-level interaction principles.',         url:'https://developer.apple.com/design/human-interface-guidelines', tags:['system','hierarchy','minimal','product'] },
  'atlassian': { type:'STUDY', title:'Atlassian Design System',              sub:'A useful reference for scalable systems and content structure.',         url:'https://atlassian.design/',          tags:['system','content','product','brand'] },

  // REFERENCE — archives and foundational libraries.
  'fonts-in-use': { type:'REFERENCE', title:'Fonts In Use', sub:'Real-world typography indexed by typeface and format.', url:'https://fontsinuse.com/', tags:['type','editorial','print','fashion'] },
};

const RESOURCE_TYPE_PENALTY = 0.4; // multiplicative — softly discourages repeating a job type

function directionTagSet(design) {
  const tags = new Set(['color', 'layout', 'type']);
  ['typography', 'colorStory', 'layout', 'spacing', 'contentFocus'].forEach(cat => {
    tags.add(design[cat]);
    const meta = OPTION_META[`${cat}:${design[cat]}`];
    if (meta) meta.tags.forEach(t => tags.add(t));
  });
  return tags;
}

function pickGoDeeperResources(design, lastChangedCategory, limit) {
  limit = limit || 3;
  const tagSet = directionTagSet(design);
  const lastChangedValue = lastChangedCategory ? design[lastChangedCategory] : null;

  const scored = Object.keys(RESOURCES).map((id, idx) => {
    const r = { id, ...RESOURCES[id] };
    let score = r.tags.filter(t => tagSet.has(t)).length;
    if (lastChangedValue && r.tags.includes(lastChangedValue)) score += 1;
    return { r, idx, score };
  });

  const picked = [];
  const usedTypes = new Set();
  for (let i = 0; i < limit && i < scored.length; i++) {
    let best = null;
    scored.forEach(entry => {
      if (picked.includes(entry.r)) return;
      const effScore = usedTypes.has(entry.r.type) ? entry.score * RESOURCE_TYPE_PENALTY : entry.score;
      if (!best || effScore > best.effScore || (effScore === best.effScore && entry.idx < best.idx)) {
        best = { r: entry.r, idx: entry.idx, effScore };
      }
    });
    if (!best) break;
    picked.push(best.r);
    usedTypes.add(best.r.type);
  }
  return picked;
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
  { id:'stillness-framed',      kind:'image',    src:IMG.birch,           tags:['nature','material','green','quiet','minimal','centered'],
    title:'Stillness, Framed', note:'A single subject, a lot of quiet air around it. This is what "let the work breathe" looks like when you actually commit to it — no crowding, no competing elements.' },
  { id:'type-as-voice',         kind:'type',     glyph:'Aa',              tags:['systems','minimal','editorial','tech'],
    title:'Type as Voice', note:'Before color, before layout — the typeface is the first thing a visitor feels. Pick one that argues for your point of view, not just one that’s legible.' },
  { id:'restraint-strategy',    kind:'quote',    text:'Clarity Creates Impact', tags:['minimal','editorial','quiet','structure'],
    title:'Restraint as Strategy', note:'The best editorial and brand systems say less, more precisely. Every element you cut makes the ones that remain louder.' },
  { id:'material-honesty',      kind:'image',    src:IMG.tintin,          tags:['nature','material','craft','texture','warm'],
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
  { id:'gallery-hang',          kind:'image',    src:IMG.sunset,          tags:['gallery','art','photography','image-first'],
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
