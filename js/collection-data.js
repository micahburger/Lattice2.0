/* ============================================================================
   LATTICE — Collection asset manifest + layout assignment engine.

   This is a static, buildless site (no bundler, no server, no framework) —
   so there is no way to literally scan assets/img at runtime. This file is
   the honest equivalent: a small, hand-maintained manifest that stands in
   for a real asset pipeline. Dropping a new photo into assets/img still
   only takes one entry here (id, src, aspect, a couple of tags) — from
   that point on it's in rotation automatically, no layout code to touch.
   ============================================================================ */

/* ── Seeded PRNG (mulberry32) — deterministic "shuffle" from a string seed.
   Same contentFocus + seed always produces the same layout; change the
   seed to rotate which assets and positions get used.                     */
function seedFromString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function rand() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h = (h ^= h >>> 16) >>> 0;
    return h / 4294967296;
  };
}

function seededShuffle(arr, seed) {
  const rand = seedFromString(String(seed));
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = out[i]; out[i] = out[j]; out[j] = tmp;
  }
  return out;
}

/* ── Collection asset manifest ───────────────────────────────────────────
   aspect is hand-set (landscape / portrait / square) rather than measured
   at runtime — the honest buildless substitute for reading image
   dimensions off disk. `contexts` says which content archetypes an asset
   is relevant to; `priority` is a soft preference for the more prominent
   (feature/medium) slots.                                                 */
const COLLECTION_ASSETS = [
  { id:'cap',        src: IMG.cap,             alt:'Green cap on a plain background',            aspect:'portrait',  priority:3, contexts:['product'],          category:'Objects',   title:'Retired Cap',            price:'$45'  },
  { id:'cuc-tee',    src: IMG.cucTee,          alt:'T-shirt with a cucumber print',               aspect:'square',    priority:3, contexts:['product'],          category:'Wear',       title:'Cucumber Tee',           price:'$58'  },
  { id:'dino-tee',   src: IMG.dinoTee,         alt:'T-shirt with a dinosaur print',                aspect:'square',    priority:2, contexts:['product'],          category:'Wear',       title:'Dino Tee',               price:'$58'  },
  { id:'sneakers',   src: IMG.sneakers,        alt:'Blue and white sneakers',                      aspect:'portrait',  priority:4, contexts:['product'],          category:'Footwear',   title:'Old Skool',              price:'$95'  },
  { id:'vase',       src: IMG.featureVase,     alt:'Ceramic vase still life',                      aspect:'landscape', priority:3, contexts:['product'],          category:'Objects',   title:'Ceramic Vase',           price:'$120' },
  { id:'materials',  src: IMG.featureMaterials,alt:'Close-up of raw materials',                    aspect:'landscape', priority:2, contexts:['product','brand'],  category:'Materials', title:'Material Study'                        },
  { id:'book-1',     src: IMG.bookLandscapes,  alt:'Orange hardcover book, Emotional Landscapes',  aspect:'landscape', priority:4, contexts:['product','brand'],  category:'Books',     title:'Emotional Landscapes',   price:'$68'  },
  { id:'book-2',     src: IMG.bookDutch,       alt:'Stack of Best Dutch Book Designs annuals',     aspect:'landscape', priority:2, contexts:['product','brand'],  category:'Books',     title:'Best Dutch Book Designs',price:'$42'  },
  { id:'lamp',       src: IMG.lamp,            alt:'Mid-century brass table lamp, lit',            aspect:'portrait',  priority:5, contexts:['product'],          category:'Lighting',  title:'Brass Table Lamp',       price:'$340' },
  { id:'shelf',      src: IMG.shelf,           alt:'Detail of modular wood shelving',              aspect:'portrait',  priority:4, contexts:['product','brand'],  category:'Furniture', title:'Modular Shelving',       price:'$780' },
  { id:'storage',    src: IMG.storage,         alt:'Stacked modular wood storage cubes',           aspect:'square',    priority:3, contexts:['product'],          category:'Storage',   title:'Storage System',         price:'$960' },

  { id:'sunset',     src: IMG.sunset,          alt:'Painting of a golf course at sunset',          aspect:'landscape', priority:4, contexts:['editorial','portfolio'], category:'Painting', title:'Sunset Field No. 3', year:'2023', dimensions:'80 × 80 cm' },
  { id:'birch',      src: IMG.birch,           alt:'Painting of a birch tree with clouds',         aspect:'square',    priority:5, contexts:['editorial','portfolio'], category:'Painting', title:'Birch with Cloud',   year:'2024', dimensions:'90 × 70 cm' },
  { id:'golf',       src: IMG.golf,            alt:'Painting of two figures on a fairway',         aspect:'landscape', priority:3, contexts:['editorial','portfolio'], category:'Painting', title:'Fairway Study',      year:'2022' },
  { id:'tintin',     src: IMG.tintin,          alt:'Painting of a boat on the water',              aspect:'portrait',  priority:4, contexts:['portfolio','editorial'], category:'Print',    title:'Painted Light',      dimensions:'Series of 12' },
  { id:'car',        src: IMG.car,             alt:'Restored off-road vehicle with the doors open',aspect:'portrait',  priority:3, contexts:['brand','portfolio'],     category:'Vehicle',  title:'Expedition Build',   year:'2024' },
  { id:'studio',     src: IMG.featureStudio,   alt:'Wide shot of a design studio',                 aspect:'landscape', priority:3, contexts:['brand','editorial'],     category:'Studio',   title:'The Studio' },
  { id:'interior',   src: IMG.featureInterior, alt:'Sunlit interior corner',                       aspect:'landscape', priority:3, contexts:['editorial','brand'],     category:'Interior', title:'Studio Interior' },
  { id:'journal',    src: IMG.journalSpread,   alt:'Open magazine spread with a forest photograph',aspect:'landscape', priority:4, contexts:['editorial','brand'],     category:'Journal',  title:'Field Journal Vol. 2' },
];

/* ── Composition slots ────────────────────────────────────────────────────
   A 12-column grid, expressed as CSS grid-column / grid-row spans. `top` is
   the asymmetric collage (one tall anchor + a modular cluster); `band` is
   the single-row strip underneath (journal teaser, wide image, detail
   image, CTA panel). studio/cta carry no image — they're static content
   slots the renderer fills directly from CONTENT.                         */
const COLLECTION_SLOTS = {
  top: [
    { role:'feature', col:'1 / span 5',  row:'1 / span 3' },
    { role:'medium',  col:'6 / span 3',  row:'1 / span 2' },
    { role:'medium',  col:'9 / span 4',  row:'1 / span 2' },
    { role:'small',   col:'6 / span 3',  row:'3 / span 1' },
    { role:'small',   col:'9 / span 2',  row:'3 / span 1' },
    { role:'small',   col:'11 / span 2', row:'3 / span 1' },
  ],
  band: [
    { role:'studio', col:'1 / span 3'  },
    { role:'wide',   col:'4 / span 4'  },
    { role:'detail', col:'8 / span 2'  },
    { role:'cta',    col:'10 / span 3' },
  ],
};

const WANTED_ASPECT = { feature:'portrait', medium:'portrait', small:'square', wide:'landscape', detail:'square' };

function assetsForContext(contentFocus) {
  const pool = COLLECTION_ASSETS.filter(a => a.contexts.includes(contentFocus));
  return pool.length ? pool : COLLECTION_ASSETS;
}

function collectionAssetCount(contentFocus) {
  return assetsForContext(contentFocus).length;
}

/* Picks the best asset for a role: prefers the wanted aspect ratio within
   the context pool, then falls back through the next-nearest aspects, then
   — if the context pool is too small to fill every slot without repeating —
   borrows an unused asset from the full catalog (any context) before ever
   duplicating one already shown in this view. Only if the *entire* manifest
   is smaller than the number of slots does a literal repeat happen, and
   even then it cycles through the pool instead of collapsing onto one item.
   Also softly avoids repeating the immediately-previous slot's category so
   similar items don't land directly beside each other. */
function pickAsset(contextPool, fullPool, role, used, avoidCategory, repeatCursor) {
  const wanted = WANTED_ASPECT[role] || 'square';
  const rank = ({
    landscape: ['landscape', 'square', 'portrait'],
    portrait:  ['portrait', 'square', 'landscape'],
    square:    ['square', 'landscape', 'portrait'],
  })[wanted];

  const search = (pool, allowSameCategory) => {
    for (const aspect of rank) {
      const candidates = pool.filter(a =>
        a.aspect === aspect && !used.has(a.id) && (allowSameCategory || a.category !== avoidCategory)
      );
      if (candidates.length) return candidates.sort((a, b) => (b.priority || 1) - (a.priority || 1))[0];
    }
    return null;
  };

  const found = search(contextPool, false) || search(contextPool, true)
    || search(fullPool, false) || search(fullPool, true)
    || fullPool.find(a => !used.has(a.id));
  if (found) return found;

  // Every asset in the manifest is already in use this view — cycle through
  // the pool by position rather than always returning the same one.
  return fullPool[repeatCursor.n++ % fullPool.length];
}

/* getCollectionLayout(contentFocus, seed)
   Returns { top: [{...slot, asset}], band: [{...slot, asset}] } — a stable,
   deterministic assignment. Same contentFocus + seed always produces the
   same layout; pass a different seed (e.g. a shuffle timestamp) to rotate
   which assets land in which slots. */
function getCollectionLayout(contentFocus, seed) {
  seed = seed || `${contentFocus}-default`;
  const contextPool = seededShuffle(assetsForContext(contentFocus), seed);
  const fullPool = seededShuffle(COLLECTION_ASSETS, `${seed}-all`);
  const used = new Set();
  const repeatCursor = { n: 0 };
  let prevCategory = null;

  const top = COLLECTION_SLOTS.top.map(slot => {
    const asset = pickAsset(contextPool, fullPool, slot.role, used, prevCategory, repeatCursor);
    if (asset) { used.add(asset.id); prevCategory = asset.category; }
    return Object.assign({}, slot, { asset });
  });

  const band = COLLECTION_SLOTS.band.map(slot => {
    if (slot.role !== 'wide' && slot.role !== 'detail') return Object.assign({}, slot, { asset: null });
    const asset = pickAsset(contextPool, fullPool, slot.role, used, prevCategory, repeatCursor);
    if (asset) { used.add(asset.id); prevCategory = asset.category; }
    return Object.assign({}, slot, { asset });
  });

  return { top, band };
}
