/* ============================================================================
   LATTICE — app logic. Vanilla JS, no build step, no framework, no AI calls.
   Ported from the Figma Make React source (App.tsx / CanvasPreview.tsx /
   DesignControls.tsx / ArtDirectorNotes.tsx) and restyled per the redesigned
   sidebar (collapsed pill, Design Controls / Creative Guide tabs, Current Mix
   chips, Inspiration grid + modal). Creative Guide content is driven by the
   matching engine in guide-data.js.
   ============================================================================ */

const state = {
  design: {
    typography:   'editorial',
    layout:       'magazine',
    colorStory:   'museum',
    spacing:      'generous',
    contentFocus: 'editorial',
  },
  drawerOpen: false,
  activeTab: 'controls', // 'controls' | 'guide'
  lastChanged: null,         // { category, value, label } — most recent control change
  guideUnseen: false,        // drives the Creative Guide tab dot + Design Controls CTA
  guideLastSeenDesign: null, // snapshot of design when Creative Guide was last opened
};

function px(n) { return `${n}px`; }
function clampNum(n, min, max) { return Math.min(Math.max(n, min), max); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ============================================================================
   CANVAS — full-bleed live preview
   ============================================================================ */

function buildCtx(design) {
  const colors  = COLORS[design.colorStory];
  const typo    = TYPO[design.typography];
  const space   = SPACE[design.spacing];
  const content = CONTENT[design.contentFocus];
  return {
    colors, typo, space, content,
    layout: design.layout,
    contentFocus: design.contentFocus,
    colorStory: design.colorStory,
    cardPhotos: CARD_PHOTOS[design.contentFocus],
    heroPhoto: HERO_PHOTOS[design.contentFocus],
    featureHero: FEATURE_HEROES[design.contentFocus],
  };
}

function mastheadUtility(layout, cf) {
  if (cf === 'editorial') return layout === 'minimal' ? { text:'Archive', bordered:false, arrow:true } : { text:'Subscribe', bordered:true, arrow:false };
  if (cf === 'portfolio') return { text:'Contact', bordered:false, arrow:true };
  if (cf === 'brand')     return layout === 'grid' ? { text:'Services', bordered:true, arrow:false } : { text:'Contact', bordered:false, arrow:true };
  if (cf === 'product')   return (layout === 'minimal' || layout === 'feature') ? { text:'Shop', bordered:false, arrow:false } : { text:'Cart', bordered:true, arrow:false };
  return { text:'Contact', bordered:false, arrow:false };
}

function labelHtml(typo, colors, text, accent) {
  return `<span style="font-family:${typo.ui};font-size:${typo.lSize};letter-spacing:${typo.lTracking};text-transform:${typo.lTransform};font-weight:${typo.lWeight};color:${accent ? colors.accent : colors.muted};line-height:1;">${esc(text)}</span>`;
}

function utilityHtml(utl, fg, navText) {
  if (utl.bordered) {
    return `<span style="font-family:system-ui,sans-serif;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${navText};border:1px solid ${navText};padding:5px 14px;cursor:pointer;opacity:.85;line-height:1;">${esc(utl.text)}</span>`;
  }
  return `<span style="font-family:system-ui,sans-serif;font-size:11px;color:${fg};cursor:pointer;opacity:.72;line-height:1;">${esc(utl.text)}${utl.arrow ? ' &rarr;' : ''}</span>`;
}

function logoHtml(ctx, fg) {
  const { typo, content } = ctx;
  return `<span style="font-family:${typo.heading};font-weight:${typo.dWeight};font-size:13px;color:${fg};line-height:1;letter-spacing:${typo.dTransform === 'uppercase' ? '0.2em' : '0.14em'};text-transform:uppercase;">${esc(content.brand)}</span>`;
}

function navItemsHtml(ctx, items, fg) {
  const { typo } = ctx;
  return `<div style="display:flex;gap:28px;">${items.map(item =>
    `<span style="font-family:${typo.ui};font-size:11px;color:${fg};letter-spacing:${typo.lTracking};text-transform:${typo.lTransform};cursor:pointer;line-height:1;">${esc(item)}</span>`
  ).join('')}</div>`;
}

function mastheadHtml(ctx, opts) {
  opts = opts || {};
  const { colors, typo, space, content, contentFocus, layout } = ctx;
  const effLayout = opts.ghost ? 'feature' : layout;
  const pH = px(space.sH);

  if (effLayout === 'feature') {
    const utl = mastheadUtility('feature', contentFocus);
    return `<div style="position:${opts.ghost ? 'absolute' : 'static'};top:0;left:0;right:0;z-index:10;padding:0 ${pH};height:${px(space.navH)};display:flex;align-items:center;justify-content:space-between;">
      ${logoHtml(ctx, 'rgba(255,255,255,0.92)')}
      ${navItemsHtml(ctx, content.navItems.slice(0,4), 'rgba(255,255,255,0.45)')}
      ${utilityHtml(utl, 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.88)')}
    </div>`;
  }
  if (effLayout === 'minimal') {
    const utl = mastheadUtility('minimal', contentFocus);
    const pV = px(Math.max(space.micro * 2, 18));
    return `<nav style="background:${colors.navBg};position:sticky;top:0;z-index:20;padding:${pV} ${pH};display:flex;align-items:center;justify-content:space-between;">
      ${logoHtml(ctx, colors.navText)}
      ${navItemsHtml(ctx, content.navItems.slice(0,4), colors.navMuted)}
      ${utilityHtml(utl, colors.navMuted, colors.navText)}
    </nav>`;
  }
  if (effLayout === 'grid') {
    const utl = mastheadUtility('grid', contentFocus);
    return `<nav style="background:${colors.navBg};position:sticky;top:0;z-index:20;border-bottom:1px solid ${colors.border};">
      <div style="padding:0 ${pH};height:${px(space.navH)};display:flex;align-items:center;">
        <div style="flex:0 0 22%;">${logoHtml(ctx, colors.navText)}</div>
        <div style="flex:1;display:flex;justify-content:center;gap:28px;">
          ${content.navItems.slice(0,4).map(item => `<span style="font-family:${typo.ui};font-size:11px;color:${colors.navMuted};letter-spacing:${typo.lTracking};text-transform:${typo.lTransform};cursor:pointer;">${esc(item)}</span>`).join('')}
        </div>
        <div style="flex:0 0 22%;display:flex;justify-content:flex-end;">${utilityHtml(utl, colors.navMuted, colors.navText)}</div>
      </div>
    </nav>`;
  }
  // magazine
  const utl = mastheadUtility('magazine', contentFocus);
  const showStrip = contentFocus === 'editorial' || contentFocus === 'portfolio';
  return `<nav style="background:${colors.bg};position:sticky;top:0;z-index:20;">
    ${showStrip ? `<div style="padding:7px ${pH};display:flex;justify-content:space-between;border-bottom:1px solid ${colors.borderFaint};">
      <span style="font-family:${typo.ui};font-size:9px;color:${colors.muted};letter-spacing:0.1em;text-transform:uppercase;">${esc(content.issue)}</span>
      <span style="font-family:${typo.ui};font-size:9px;color:${colors.muted};letter-spacing:0.04em;">${esc(content.category)}</span>
    </div>` : ''}
    <div style="padding:0 ${pH};height:${px(space.navH)};display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${colors.border};">
      ${logoHtml(ctx, colors.text)}
      ${navItemsHtml(ctx, content.navItems.slice(0,5), colors.muted)}
      ${utilityHtml(utl, colors.muted, colors.text)}
    </div>
  </nav>`;
}

function footerHtml(ctx) {
  const { colors, typo, space, content } = ctx;
  return `<footer style="border-top:1px solid ${colors.border};padding:${px(space.elem)} ${px(space.sH)};display:flex;justify-content:space-between;align-items:center;">
    <span style="font-family:${typo.heading};font-weight:${typo.dWeight};font-size:11px;letter-spacing:0.16em;color:${colors.text};">${esc(content.brand)}</span>
    <span style="font-family:${typo.ui};font-size:10px;color:${colors.muted};">${esc(content.issue)}</span>
    <span style="font-family:${typo.ui};font-size:10px;color:${colors.muted};">&copy; 2024</span>
  </footer>`;
}

function titleLinesHtml(title) {
  return title.split('\n').map(l => esc(l)).join('<br/>');
}

function magazineLayoutHtml(ctx) {
  const { colors, typo, space, content, cardPhotos } = ctx;
  const sH = px(space.sH), sV = px(space.sV), el = px(space.elem), mc = px(space.micro);
  return `<div>
    <div style="display:grid;grid-template-columns:52% 48%;min-height:70vh;">
      <div style="padding:${sV} ${sH};display:flex;flex-direction:column;justify-content:center;border-right:1px solid ${colors.border};">
        <div style="margin-bottom:${el};"><span style="font-family:${typo.ui};font-size:11px;letter-spacing:0.06em;color:${colors.text};line-height:1;">${esc(content.brand)} &middot; ${esc(content.issue)}</span></div>
        <h1 style="font-family:${typo.heading};font-size:${typo.dSize};line-height:${typo.dHeight};letter-spacing:${typo.dTracking};font-weight:${typo.dWeight};text-transform:${typo.dTransform};color:${colors.text};margin:0 0 ${el};white-space:pre-line;">${titleLinesHtml(content.title)}</h1>
        <p style="font-family:${typo.ui};font-size:14px;line-height:1.62;color:${colors.soft};margin:0 0 ${el};max-width:360px;">${esc(content.subtitle)}</p>
        <span style="font-family:${typo.ui};font-size:13px;color:${colors.text};text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;cursor:pointer;">Read the latest essay &rarr;</span>
      </div>
      <div style="overflow:hidden;position:relative;"><img src="${ctx.heroPhoto}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;border-top:1px solid ${colors.border};">
      ${content.cards.map((card,i) => `<div style="padding:${el} ${sH};border-right:1px solid ${colors.border};display:flex;flex-direction:column;">
        <span style="font-family:${typo.ui};font-size:10px;color:${colors.muted};margin-bottom:${mc};line-height:1;">0${i+1}</span>
        <h3 style="font-family:${typo.heading};font-size:${typo.cSize};font-weight:${typo.hWeight};line-height:${typo.cHeight};letter-spacing:${typo.hTracking};color:${colors.text};margin:0 0 ${mc};flex:1;">${esc(card.title)}</h3>
        <p style="font-family:${typo.ui};font-size:12px;line-height:1.58;color:${colors.muted};margin:0 0 ${el};">${esc(card.meta)}</p>
        <span style="font-family:${typo.ui};font-size:12px;color:${colors.text};cursor:pointer;">Explore &rarr;</span>
      </div>`).join('')}
      <div style="overflow:hidden;min-height:220px;"><img src="${cardPhotos[0]}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
    </div>
    <div style="padding:${sV} ${sH};background:${colors.surface};border-top:1px solid ${colors.border};text-align:center;">
      <p style="font-family:${typo.heading};font-size:clamp(18px,2.2vw,28px);font-style:italic;font-weight:${typo.dWeight};line-height:1.52;color:${colors.text};max-width:680px;margin:0 auto ${mc};">${esc(content.excerpt)}</p>
      <span style="font-family:${typo.ui};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${colors.muted};">&mdash; ${esc(content.author)}</span>
    </div>
  </div>`;
}

function minimalLayoutHtml(ctx) {
  const { colors, typo, space, content, cardPhotos } = ctx;
  const sH = px(space.sH), sV = px(space.sV), el = px(space.elem), mc = px(space.micro);
  return `<div>
    <div style="padding:${sV} ${sH};border-bottom:1px solid ${colors.border};">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:${px(space.gap)};">
        ${labelHtml(typo, colors, content.issue)}
        <div style="flex:1;height:1px;background:${colors.border};"></div>
        ${labelHtml(typo, colors, content.category)}
      </div>
      <h1 style="font-family:${typo.heading};font-size:${typo.dSize};line-height:${typo.dHeight};letter-spacing:${typo.dTracking};font-weight:${typo.dWeight};text-transform:${typo.dTransform};color:${colors.text};margin:0 0 ${el};white-space:pre-line;">${titleLinesHtml(content.title)}</h1>
      <p style="font-family:${typo.ui};font-size:14px;line-height:1.62;color:${colors.soft};margin:0;max-width:460px;">${esc(content.subtitle)}</p>
    </div>
    <div class="parallax-hero" style="height:54vh;overflow:hidden;position:relative;"><img class="parallax-img" src="${ctx.heroPhoto}" alt="" style="width:100%;height:118%;object-fit:cover;display:block;position:absolute;top:-9%;left:0;"/></div>
    <div style="border-top:1px solid ${colors.border};">
      <div style="display:flex;align-items:center;padding:${el} ${sH};border-bottom:1px solid ${colors.border};">
        ${labelHtml(typo, colors, 'Selected Work')}
        <div style="flex:1;height:1px;background:${colors.borderFaint};margin:0 16px;"></div>
        <span style="font-family:${typo.ui};font-size:${typo.lSize};color:${colors.muted};">${content.cards.length} Projects</span>
      </div>
      ${content.cards.map((card,i) => `<div style="display:flex;align-items:baseline;padding:${el} ${sH};border-bottom:1px solid ${colors.borderFaint};gap:${px(space.elem)};cursor:pointer;">
        <span style="font-family:${typo.ui};font-size:10px;color:${colors.muted};flex-shrink:0;min-width:20px;line-height:1;">0${i+1}</span>
        <span style="font-family:${typo.heading};font-size:${typo.cSize};font-weight:${typo.hWeight};line-height:${typo.cHeight};letter-spacing:${typo.hTracking};color:${colors.text};flex:1;">${esc(card.title)}</span>
        ${labelHtml(typo, colors, card.category)}
        <span style="color:${colors.border};font-size:10px;">&middot;</span>
        <span style="font-family:${typo.ui};font-size:${typo.lSize};color:${colors.muted};flex-shrink:0;">${esc(card.meta)}</span>
        <span style="font-family:${typo.ui};font-size:12px;color:${colors.text};flex-shrink:0;">&rarr;</span>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;">
      ${cardPhotos.slice(0,2).map((photo,i) => `<div style="aspect-ratio:4/3;overflow:hidden;${i===0?`border-right:1px solid ${colors.border};`:''}"><img src="${photo}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>`).join('')}
    </div>
    <div style="padding:${sV} ${sH};border-top:1px solid ${colors.border};">
      <p style="font-family:${typo.heading};font-size:clamp(18px,2.2vw,28px);font-style:italic;font-weight:${typo.dWeight};line-height:1.52;color:${colors.text};max-width:680px;margin:0 0 ${mc};">${esc(content.excerpt)}</p>
      <span style="font-family:${typo.ui};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${colors.muted};">&mdash; ${esc(content.author)}</span>
    </div>
  </div>`;
}

/* ── Grid layout → editorial collection composition ───────────────────────
   Calm, gallery-like: one dominant anchor, a modular cluster beside it, and
   a quiet band of studio/wide/detail/CTA content underneath. Images are the
   content — no card borders, no dark metadata bars, no grout-line grid.
   Sourced from the collection asset manifest (collection-data.js), which is
   how new photos dropped into assets/img rotate in automatically.         */

function collectionIntroHtml(ctx) {
  const { colors, typo, space, content, contentFocus } = ctx;
  const pH = px(space.sH), sV = px(space.sV);
  const count = collectionAssetCount(contentFocus);
  const statLabel = COLLECTION_STAT_LABEL[contentFocus] || 'Pieces';
  return `<div style="padding:${sV} ${pH} ${px(space.elem)};max-width:600px;">
    <div style="margin-bottom:${px(space.micro)};">${labelHtml(typo, colors, content.issue)}</div>
    <h1 style="font-family:${typo.heading};font-size:${typo.dSize};line-height:${typo.dHeight};letter-spacing:${typo.dTracking};font-weight:${typo.dWeight};text-transform:${typo.dTransform};color:${colors.text};margin:0 0 ${px(space.micro*1.6)};white-space:pre-line;">${titleLinesHtml(content.title)}</h1>
    <p style="font-family:${typo.ui};font-size:14px;line-height:1.62;color:${colors.soft};margin:0 0 ${px(space.gap)};max-width:440px;">${esc(content.subtitle)}</p>
    <div style="display:flex;align-items:center;gap:${px(space.gap)};flex-wrap:wrap;">
      <span class="lc-arrow" style="display:inline-flex;align-items:center;gap:8px;font-family:${typo.ui};font-size:12px;font-weight:600;letter-spacing:0.02em;color:${colors.accentFg};background:${colors.accent};padding:11px 20px;cursor:pointer;">Explore the Collection &rarr;</span>
      <span style="font-family:${typo.ui};font-size:11px;color:${colors.muted};"><strong style="color:${colors.text};font-weight:600;">${count}</strong> ${esc(statLabel)}</span>
    </div>
  </div>`;
}

function collectionImageCellHtml(ctx, slot) {
  const { colors, typo, space } = ctx;
  const asset = slot.asset;
  const gridArea = `grid-column:${slot.col};${slot.row ? `grid-row:${slot.row};` : ''}`;
  if (!asset) return `<div class="lc-item" style="${gridArea}background:${colors.surface};border-radius:6px;"></div>`;

  if (slot.role === 'feature') {
    return `<div class="lc-item" style="${gridArea}position:relative;cursor:pointer;overflow:hidden;border-radius:6px;">
      <img class="lc-img" src="${asset.src}" alt="${esc(asset.alt || '')}" style="width:100%;height:100%;object-fit:cover;display:block;"/>
      <div style="position:absolute;left:0;right:0;bottom:0;padding:${px(space.elem)} ${px(space.elem)} ${px(space.micro+8)};background:linear-gradient(to top, rgba(10,10,8,0.62), rgba(10,10,8,0) 68%);">
        <div style="font-family:${typo.ui};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.72);margin-bottom:${px(space.micro/2)};">Featured Artwork</div>
        <div style="font-family:${typo.heading};font-size:${typo.hSize};font-weight:${typo.hWeight};color:#fff;line-height:1.15;margin-bottom:4px;">${esc(asset.title)}</div>
        <div style="font-family:${typo.ui};font-size:11px;color:rgba(255,255,255,0.68);margin-bottom:${px(space.micro)};">${[asset.category, asset.year, asset.dimensions].filter(Boolean).map(esc).join(' &middot; ')}</div>
        <span class="lc-arrow" style="font-family:${typo.ui};font-size:12px;color:#fff;">View Artwork &rarr;</span>
      </div>
    </div>`;
  }

  return `<div class="lc-item" style="${gridArea}display:flex;flex-direction:column;cursor:pointer;">
    <div class="lc-img-wrap" style="flex:1;overflow:hidden;border-radius:6px;"><img class="lc-img" src="${asset.src}" alt="${esc(asset.alt || '')}" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
    <div style="padding-top:${px(space.micro)};">
      <div style="font-family:${typo.ui};font-size:9.5px;letter-spacing:0.1em;text-transform:uppercase;color:${colors.muted};margin-bottom:3px;">${esc(asset.category || '')}</div>
      <div style="font-family:${typo.heading};font-size:${typo.cSize};line-height:${typo.cHeight};font-weight:${typo.hWeight};color:${colors.text};">${esc(asset.title)}</div>
      ${asset.price ? `<div style="font-family:${typo.ui};font-size:11px;color:${colors.muted};margin-top:2px;">${esc(asset.price)}</div>` : ''}
    </div>
  </div>`;
}

function collectionTopGridHtml(ctx, topSlots) {
  const { space } = ctx;
  const gapPx = px(clampNum(space.gap * 0.65, 12, 32));
  // Spacing should mainly change the gap between images, not their scale —
  // keep the row unit in a narrow band so compact/rhythmic don't squish
  // the images into thin strips.
  const rowUnit = px(clampNum(space.gap * 2 + 96, 130, 185));
  return `<div class="lc-grid" style="display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:${rowUnit};gap:${gapPx};padding:0 ${px(space.sH)} ${px(space.elem)};">
    ${topSlots.map(slot => collectionImageCellHtml(ctx, slot)).join('')}
  </div>`;
}

function collectionBandHtml(ctx, bandSlots) {
  const { colors, typo, space, content } = ctx;
  const gapPx = px(clampNum(space.gap * 0.65, 12, 32));
  const jt = content.journalTeaser;

  const cell = slot => {
    if (slot.role === 'studio') {
      return `<div class="lc-item" style="grid-column:${slot.col};display:flex;flex-direction:column;justify-content:center;">
        <div style="font-family:${typo.ui};font-size:9.5px;letter-spacing:0.14em;text-transform:uppercase;color:${colors.muted};margin-bottom:${px(space.micro)};">${esc(jt.kicker)}</div>
        <p style="font-family:${typo.ui};font-size:12.5px;line-height:1.55;color:${colors.soft};margin:0 0 ${px(space.micro)};">${esc(jt.text)}</p>
        <span class="lc-arrow" style="font-family:${typo.ui};font-size:12px;color:${colors.text};cursor:pointer;">${esc(jt.cta)} &rarr;</span>
      </div>`;
    }
    if (slot.role === 'cta') {
      return `<div class="lc-item" style="grid-column:${slot.col};background:${colors.text};color:${colors.bg};padding:${px(space.elem)};display:flex;flex-direction:column;justify-content:space-between;">
        <p style="font-family:${typo.heading};font-size:${typo.hSize};font-weight:${typo.hWeight};line-height:1.28;margin:0;">${esc(content.collectionCta)}</p>
        <span class="lc-arrow" style="font-family:${typo.ui};font-size:12px;margin-top:${px(space.micro)};cursor:pointer;">Explore the Collection &rarr;</span>
      </div>`;
    }
    return collectionImageCellHtml(ctx, slot);
  };

  return `<div class="lc-grid" style="display:grid;grid-template-columns:repeat(12,1fr);gap:${gapPx};padding:${px(space.elem)} ${px(space.sH)};">
    ${bandSlots.map(cell).join('')}
  </div>`;
}

function gridLayoutHtml(ctx) {
  const layout = getCollectionLayout(ctx.contentFocus, ctx.colorStory, ctx.contentFocus);
  return `<div>
    ${collectionIntroHtml(ctx)}
    ${collectionTopGridHtml(ctx, layout.top)}
    ${collectionBandHtml(ctx, layout.band)}
  </div>`;
}

function featureLayoutHtml(ctx) {
  const { colors, typo, space, content, cardPhotos, contentFocus, featureHero } = ctx;
  const sH = px(space.sH), sV = px(space.sV), el = px(space.elem), mc = px(space.micro);
  const utl = mastheadUtility('feature', contentFocus);
  return `<div>
    <div style="position:relative;display:grid;grid-template-columns:50% 50%;min-height:90vh;">
      <div style="background:${colors.bg};display:flex;flex-direction:column;justify-content:flex-end;padding:${sV} ${sH};padding-top:calc(${px(space.navH)} + ${sV});">
        <h1 style="font-family:${typo.heading};font-size:clamp(36px,5.2vw,72px);line-height:1.04;font-weight:${typo.dWeight};text-transform:${typo.dTransform};letter-spacing:${typo.dTracking};color:${colors.text};margin:0 0 ${el};white-space:pre-line;">${titleLinesHtml(content.title)}</h1>
        <p style="font-family:${typo.ui};font-size:15px;line-height:1.62;color:${colors.soft};margin:0 0 ${px(space.gap)};max-width:380px;">${esc(content.subtitle)}</p>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-family:${typo.ui};font-size:14px;color:${colors.muted};line-height:1;">&darr;</span>
          <span style="font-family:${typo.ui};font-size:11px;color:${colors.muted};letter-spacing:0.1em;">Scroll</span>
        </div>
      </div>
      <div style="overflow:hidden;"><img src="${featureHero}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
      <div style="position:absolute;top:0;left:0;right:0;z-index:10;padding:0 ${sH};height:${px(space.navH)};display:flex;align-items:center;justify-content:space-between;">
        ${logoHtml(ctx, colors.text)}
        ${navItemsHtml(ctx, content.navItems.slice(0,4), colors.muted)}
        ${utilityHtml(utl, colors.muted, colors.text)}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;border-top:1px solid ${colors.border};">
      ${cardPhotos.slice(0,2).map((photo,i) => `<div style="padding:${el};${i===0?`border-right:1px solid ${colors.border};`:''}cursor:pointer;">
        <div style="aspect-ratio:16/10;overflow:hidden;margin-bottom:${mc};"><img src="${photo}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
        <div style="margin-bottom:${mc};">${labelHtml(typo, colors, (content.cards[i]?.category)||'', true)}</div>
        <h3 style="font-family:${typo.heading};font-size:${typo.hSize};line-height:${typo.hHeight};font-weight:${typo.hWeight};text-transform:${typo.dTransform};color:${colors.text};margin:0 0 ${mc};">${esc((content.cards[i]?.title)||'')}</h3>
        <p style="font-family:${typo.body};font-size:${typo.bSize};line-height:${typo.bHeight};color:${colors.muted};margin:0 0 ${mc};">${esc(content.excerpt.substring(0,100))}&hellip;</p>
        <span style="font-family:${typo.ui};font-size:11px;color:${colors.muted};">${esc((content.cards[i]?.meta)||'')}</span>
      </div>`).join('')}
    </div>
    <div style="border-top:1px solid ${colors.border};">
      ${cardPhotos.map((photo,i) => `<div style="display:flex;gap:${mc};align-items:flex-start;padding:${el} ${sH};${i<cardPhotos.length-1?`border-bottom:1px solid ${colors.borderFaint};`:''}cursor:pointer;">
        <div style="width:68px;height:68px;flex-shrink:0;overflow:hidden;"><img src="${photo}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
        <div>
          <div style="margin-bottom:4px;">${labelHtml(typo, colors, (content.cards[i]?.category)||'', true)}</div>
          <div style="font-family:${typo.heading};font-size:${typo.cSize};line-height:${typo.cHeight};font-weight:${typo.hWeight};text-transform:${typo.dTransform};color:${colors.text};">${esc((content.cards[i]?.title)||'')}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

function renderCanvas() {
  const ctx = buildCtx(state.design);
  const layer = document.getElementById('canvas-layer');
  layer.style.backgroundColor = ctx.colors.bg;

  let bodyHtml;
  if (ctx.layout === 'magazine') bodyHtml = magazineLayoutHtml(ctx);
  else if (ctx.layout === 'minimal') bodyHtml = minimalLayoutHtml(ctx);
  else if (ctx.layout === 'grid') bodyHtml = gridLayoutHtml(ctx);
  else bodyHtml = featureLayoutHtml(ctx);

  const masthead = ctx.layout !== 'feature' ? mastheadHtml(ctx) : '';

  const swapIn = () => {
    layer.innerHTML = `<div id="canvas-inner" style="opacity:0;transition:opacity .3s ease;">
      ${masthead}
      ${bodyHtml}
      ${footerHtml(ctx)}
    </div>`;
    requestAnimationFrame(() => {
      const inner = document.getElementById('canvas-inner');
      if (inner) inner.style.opacity = '1';
      applyParallax();
    });
  };

  // Cross-fade: ease the current view out before swapping in the new one,
  // instead of cutting straight to the new design.
  const existing = document.getElementById('canvas-inner');
  if (existing) {
    existing.style.transition = 'opacity .16s ease';
    existing.style.opacity = '0';
    setTimeout(swapIn, 160);
  } else {
    swapIn();
  }
}

/* Hero image drifts opposite the scroll so it reads as parallax, not a
   plain scroll — the image is oversized (118% height) so the shift never
   reveals an edge. Re-queried on every scroll tick rather than cached
   because renderCanvas() replaces #canvas-inner wholesale on design change. */
const PARALLAX_MAX_PX = 22;
let parallaxTicking = false;

function applyParallax() {
  parallaxTicking = false;
  const layer = document.getElementById('canvas-layer');
  if (!layer) return;
  const layerRect = layer.getBoundingClientRect();
  document.querySelectorAll('.parallax-img').forEach(img => {
    const rect = img.parentElement.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - layerRect.top;
    const viewCenter = layerRect.height / 2;
    const offset = clampNum((viewCenter - center) * 0.08, -PARALLAX_MAX_PX, PARALLAX_MAX_PX);
    img.style.transform = `translateY(${offset}px)`;
  });
}

function wireParallax() {
  const layer = document.getElementById('canvas-layer');
  if (!layer) return;
  layer.addEventListener('scroll', () => {
    if (parallaxTicking) return;
    parallaxTicking = true;
    requestAnimationFrame(applyParallax);
  }, { passive: true });
}

/* ============================================================================
   SIDEBAR — collapsed pill + expanded drawer (Design Controls / Creative Guide)
   ============================================================================ */

function miniAtmosphereHtml(atm) {
  const c = COLORS[atm.value];
  return `<div class="atm-swatch" style="background:${c.bg};border-color:${atm.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};">
    <div style="position:absolute;top:0;left:0;right:0;height:7px;background:${c.surface};"></div>
    <div style="position:absolute;top:11px;left:6px;width:26px;height:2.5px;border-radius:1.5px;background:${c.text};opacity:.7;"></div>
    <div style="position:absolute;top:16px;left:6px;width:34px;height:1.5px;border-radius:1px;background:${c.text};opacity:.3;"></div>
    <div style="position:absolute;top:19.5px;left:6px;width:22px;height:1.5px;border-radius:1px;background:${c.text};opacity:.2;"></div>
    <div style="position:absolute;bottom:5px;left:6px;width:16px;height:5px;border-radius:2px;background:${c.accent};opacity:.9;"></div>
  </div>`;
}

const LAYOUT_WIREFRAMES = {
  magazine: `<svg viewBox="0 0 80 58" fill="none" width="100%" height="100%"><rect x="0.5" y="0.5" width="79" height="57" rx="3" fill="transparent" stroke="#E0DDD8" stroke-width="0.75"/><rect x="4" y="4" width="32" height="34" rx="1.5" fill="#D2CEC8"/><rect x="40" y="6" width="14" height="1.5" rx="0.75" fill="#C5C0BB"/><rect x="40" y="11" width="32" height="2" rx="1" fill="#ADAAA4"/><rect x="40" y="15" width="23" height="2" rx="1" fill="#ADAAA4"/><rect x="40" y="20" width="11" height="1.5" rx="0.75" fill="#C4956A" opacity="0.65"/><rect x="40" y="24" width="32" height="1.5" rx="0.75" fill="#CFCBC6"/><rect x="40" y="27.5" width="27" height="1.5" rx="0.75" fill="#CFCBC6"/><rect x="40" y="31" width="19" height="1.5" rx="0.75" fill="#CFCBC6"/><rect x="40" y="36" width="21" height="1.5" rx="0.75" fill="#C5C0BB"/><rect x="4" y="43" width="22" height="11" rx="1.5" fill="#D2CEC8"/><rect x="29" y="43" width="22" height="11" rx="1.5" fill="#D2CEC8"/><rect x="54" y="43" width="22" height="11" rx="1.5" fill="#D2CEC8"/></svg>`,
  minimal: `<svg viewBox="0 0 80 58" fill="none" width="100%" height="100%"><rect x="0.5" y="0.5" width="79" height="57" rx="3" fill="transparent" stroke="#E0DDD8" stroke-width="0.75"/><rect x="26" y="5" width="28" height="1.5" rx="0.75" fill="#C8C4BE"/><rect x="9" y="9" width="62" height="4" rx="1" fill="#BEBAB5"/><rect x="15" y="15" width="50" height="4" rx="1" fill="#BEBAB5"/><rect x="20" y="22" width="40" height="2" rx="1" fill="#D0CCC8"/><rect x="7" y="27" width="66" height="0.75" rx="0.4" fill="#C4956A" opacity="0.7"/><rect x="11" y="30.5" width="58" height="1.5" rx="0.75" fill="#D4D0CB"/><rect x="14" y="33.5" width="52" height="1.5" rx="0.75" fill="#D4D0CB"/><rect x="17" y="36.5" width="46" height="1.5" rx="0.75" fill="#D4D0CB"/><rect x="20" y="39.5" width="40" height="1.5" rx="0.75" fill="#D4D0CB"/><rect x="4" y="45" width="33" height="10" rx="1.5" fill="#D2CEC8"/><rect x="43" y="45" width="33" height="10" rx="1.5" fill="#D2CEC8"/></svg>`,
  grid: `<svg viewBox="0 0 80 58" fill="none" width="100%" height="100%"><rect x="0.5" y="0.5" width="79" height="57" rx="3" fill="transparent" stroke="#E0DDD8" stroke-width="0.75"/><rect x="4" y="3" width="72" height="3" rx="1" fill="#D8D4CE"/><rect x="4" y="8" width="16" height="20" rx="1.5" fill="#D2CEC8"/><rect x="22" y="8" width="16" height="20" rx="1.5" fill="#D2CEC8"/><rect x="40" y="8" width="16" height="20" rx="1.5" fill="#D2CEC8"/><rect x="58" y="8" width="18" height="20" rx="1.5" fill="#D2CEC8"/><rect x="4" y="30" width="16" height="24" rx="1.5" fill="#D2CEC8"/><rect x="22" y="30" width="16" height="24" rx="1.5" fill="#D2CEC8"/><rect x="40" y="30" width="16" height="24" rx="1.5" fill="#D2CEC8"/><rect x="58" y="30" width="18" height="24" rx="1.5" fill="#D2CEC8"/></svg>`,
  feature: `<svg viewBox="0 0 80 58" fill="none" width="100%" height="100%"><rect x="0.5" y="0.5" width="79" height="57" rx="3" fill="transparent" stroke="#E0DDD8" stroke-width="0.75"/><rect x="4" y="4" width="32" height="50" rx="1.5" fill="#D2CEC8"/><rect x="40" y="5" width="32" height="3" rx="1" fill="#BEBAB5"/><rect x="40" y="10" width="26" height="3" rx="1" fill="#BEBAB5"/><rect x="40" y="16.5" width="14" height="1.5" rx="0.75" fill="#C4956A" opacity="0.65"/><rect x="40" y="21" width="32" height="1.5" rx="0.75" fill="#D4D0CB"/><rect x="40" y="24.5" width="27" height="1.5" rx="0.75" fill="#D4D0CB"/><rect x="40" y="28" width="21" height="1.5" rx="0.75" fill="#D4D0CB"/><rect x="40" y="44" width="32" height="9" rx="1.5" fill="#D2CEC8"/></svg>`,
};

const CONTENT_ICONS = {
  editorial: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="2" width="13" height="1.5" rx="0.75" fill="currentColor"/><rect x="1" y="5.5" width="13" height="1.5" rx="0.75" fill="currentColor"/><rect x="1" y="9" width="9" height="1.5" rx="0.75" fill="currentColor"/><rect x="1" y="12.5" width="6" height="1.5" rx="0.75" fill="currentColor"/></svg>`,
  portfolio: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="1" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="1" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/><rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" fill="currentColor"/></svg>`,
  brand: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.5"/><circle cx="7.5" cy="7.5" r="2.5" fill="currentColor"/></svg>`,
  product: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2" y="5.5" width="11" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 5.5V4a2.5 2.5 0 015 0v1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
};

/* A single quiet line under the direction title — same jump/pulse behavior
   as the old chip grid, but plain text instead of a card grid. Shared by
   both Design Controls ("Current Mix") and Creative Guide ("Current
   Direction") so the two tabs open on a matching masthead treatment.      */
function directionSummaryLineHtml(design) {
  const typoLabel = TYPO_OPTIONS.find(t => t.value === design.typography).label;
  const atm = ATMOSPHERES.find(a => a.value === design.colorStory);
  const layoutLabel = LAYOUT_OPTIONS.find(l => l.value === design.layout).label;
  const spacingLabel = SPACING_OPTIONS.find(s => s.value === design.spacing).label;
  const contentLabel = CONTENT_ARCHETYPES.find(c => c.value === design.contentFocus).title;

  const seg = (key, label) => `<button class="direction-seg" data-jump="${key}">${esc(label)}</button>`;
  const sep = `<span class="direction-sep">&middot;</span>`;

  return `<div class="direction-summary">
    ${[
      seg('typography', typoLabel),
      seg('colorStory', atm.name),
      seg('layout', layoutLabel),
      seg('spacing', spacingLabel),
      seg('contentFocus', contentLabel),
    ].join(sep)}
  </div>`;
}

function currentMixHtml(design) {
  return `<div id="current-mix">
    <div class="mix-label">Current Mix</div>
    <div class="direction-title">${esc(currentDirectionTitle(design))}</div>
    ${directionSummaryLineHtml(design)}
  </div>`;
}

function currentDirectionHtml(design) {
  return `<div id="current-direction">
    <div class="mix-label">Current Direction</div>
    <div class="direction-title">${esc(currentDirectionTitle(design))}</div>
    ${directionSummaryLineHtml(design)}
  </div>`;
}

function typographySelectorHtml(design) {
  return `<div class="row-list" id="section-typography">${TYPO_OPTIONS.map(opt => {
    const active = design.typography === opt.value;
    return `<button class="row-card ${active ? 'active' : ''}" data-key="typography" data-value="${opt.value}">
      <div class="accent-bar"></div>
      <div class="row-content typo-row">
        <span class="typo-preview" style="font-family:${opt.family};">${esc(opt.label)}</span>
        <div class="typo-meta"><div class="pairing">${esc(opt.meta)}</div></div>
      </div>
    </button>`;
  }).join('')}</div>`;
}

function atmosphereSelectorHtml(design) {
  return `<div class="row-list" id="section-colorStory">${ATMOSPHERES.map(atm => {
    const active = design.colorStory === atm.value;
    const c = COLORS[atm.value];
    const chips = [c.bg, c.surface, c.text, c.accent, c.border];
    return `<button class="row-card ${active ? 'active' : ''}" data-key="colorStory" data-value="${atm.value}">
      <div class="accent-bar"></div>
      <div class="row-content atm-row">
        ${miniAtmosphereHtml(atm)}
        <div class="atm-text"><div class="name">${esc(atm.name)}</div><div class="kw">${atm.keywords.join(' &middot; ')}</div></div>
        <div class="atm-dots">${chips.map(c2 => `<span style="background:${c2};"></span>`).join('')}</div>
      </div>
    </button>`;
  }).join('')}</div>`;
}

function layoutSelectorHtml(design) {
  return `<div class="layout-grid" id="section-layout">${LAYOUT_OPTIONS.map(opt => {
    const active = design.layout === opt.value;
    return `<button class="layout-card ${active ? 'active' : ''}" data-key="layout" data-value="${opt.value}">
      <div class="thumb">${LAYOUT_WIREFRAMES[opt.value]}</div>
      <div class="lbl">${esc(opt.label)}</div>
      <div class="sub">${esc(opt.sub)}</div>
    </button>`;
  }).join('')}</div>`;
}

function spacingSelectorHtml(design) {
  return `<div class="row-list" id="section-spacing">${SPACING_OPTIONS.map(opt => {
    const active = design.spacing === opt.value;
    return `<button class="row-card ${active ? 'active' : ''}" data-key="spacing" data-value="${opt.value}">
      <div class="accent-bar"></div>
      <div class="row-content spacing-row">
        <div class="spacing-viz" style="gap:${opt.gap}px;"><div></div><div></div><div></div></div>
        <div><div class="lbl">${esc(opt.label)}</div><div class="sub">${esc(opt.sub)}</div></div>
      </div>
    </button>`;
  }).join('')}</div>`;
}

function contentSelectorHtml(design) {
  return `<div class="content-list" id="section-contentFocus">${CONTENT_ARCHETYPES.map(opt => {
    const active = design.contentFocus === opt.value;
    return `<button class="content-card ${active ? 'active' : ''}" data-key="contentFocus" data-value="${opt.value}">
      <div class="content-icon">${CONTENT_ICONS[opt.value]}</div>
      <div class="content-body">
        <div class="title">${esc(opt.title)}</div>
        <div class="tagline">${esc(opt.tagline)}</div>
        ${active ? `<div class="desc">${esc(opt.description)}</div><div class="tones">${esc(opt.tones)}</div>` : ''}
      </div>
      <div class="content-radio">${active ? `<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4.5L3 6L6.5 2" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}</div>
    </button>`;
  }).join('')}</div>`;
}

function designControlsTabHtml(design) {
  return `
    ${currentMixHtml(design)}
    ${guideDividerHtml()}
    <div class="control-section">
      <div class="section-label">Typography</div>
      ${typographySelectorHtml(design)}
    </div>
    ${guideDividerHtml()}
    <div class="control-section">
      <div class="section-label">Atmosphere</div>
      ${atmosphereSelectorHtml(design)}
    </div>
    ${guideDividerHtml()}
    <div class="control-section">
      <div class="section-label">Layout</div>
      ${layoutSelectorHtml(design)}
    </div>
    ${guideDividerHtml()}
    <div class="control-section">
      <div class="section-label">Spacing</div>
      ${spacingSelectorHtml(design)}
    </div>
    ${guideDividerHtml()}
    <div class="control-section">
      <div class="section-label">Content</div>
      ${contentSelectorHtml(design)}
    </div>
  `;
}

/* ── Creative Guide tab ─────────────────────────────────────────────────── */

function theMoveHtml(design) {
  return `<div class="the-move" id="the-move">
    <div class="kicker">The Move</div>
    <h2>${esc(theMoveHeadline(design))}</h2>
    <p>${esc(theMoveParagraph(design))}</p>
  </div>`;
}

const RESOURCE_KIND_CLASS = { 'IN USE': 'in-use', PAIRING: 'pairing', 'GET THE FONT': 'get-the-font', SPECIMEN: 'specimen' };

// Inline (not <img>) so the icon can be recolored via currentColor — traced
// from assets/book_ribbon.svg, preview.svg, and serif.svg.
const RESOURCE_KIND_ICON = {
  'IN USE': `<svg viewBox="0 0 40 40" fill="none"><path d="M18.666 29.1948V11.8614C17.453 11.0836 16.1463 10.4864 14.746 10.0698C13.3457 9.65309 11.9302 9.44475 10.4993 9.44475C9.46241 9.44475 8.44157 9.56503 7.43685 9.80559C6.43213 10.0464 5.43449 10.3613 4.44393 10.7502V28.3056C5.34199 27.9353 6.31643 27.6623 7.36727 27.4864C8.41838 27.3103 9.46241 27.2223 10.4993 27.2223C11.9266 27.2223 13.3157 27.3867 14.6668 27.7156C16.0182 28.0442 17.3513 28.5373 18.666 29.1948ZM1.66602 29.7781V10.2223C1.66602 9.84281 1.75629 9.491 1.93685 9.16684C2.1174 8.84267 2.38824 8.59267 2.74935 8.41684C3.95296 7.82434 5.20657 7.38448 6.51018 7.09725C7.81379 6.81031 9.14352 6.66684 10.4993 6.66684C12.5735 6.66684 14.3652 6.92614 15.8743 7.44475C17.3835 7.96309 18.9714 8.73614 20.6381 9.76392C20.8881 9.91225 21.0849 10.1021 21.2285 10.3335C21.3721 10.5649 21.4439 10.8427 21.4439 11.1668V29.1948C22.7773 28.5373 24.0944 28.0442 25.3952 27.7156C26.696 27.3867 28.0641 27.2223 29.4993 27.2223C30.5363 27.2223 31.5895 27.3056 32.6589 27.4723C33.7284 27.6389 34.6937 27.8704 35.5548 28.1668V9.09725C35.5548 8.70392 35.6884 8.37406 35.9556 8.10767C36.2228 7.84156 36.5538 7.7085 36.9485 7.7085C37.3435 7.7085 37.673 7.84156 37.9369 8.10767C38.2007 8.37406 38.3327 8.70392 38.3327 9.09725V29.7781C38.3327 30.5075 38.0341 31.0625 37.4369 31.4431C36.8396 31.8236 36.24 31.8334 35.6381 31.4723C34.6659 31.0278 33.6662 30.676 32.6389 30.4168C31.6114 30.1577 30.5649 30.0281 29.4993 30.0281C28.036 30.0281 26.61 30.2479 25.2214 30.6877C23.8325 31.1274 22.5178 31.7361 21.2773 32.5139C21.092 32.6345 20.8952 32.7202 20.6868 32.771C20.4785 32.8218 20.2678 32.8473 20.0548 32.8473C19.842 32.8473 19.6314 32.8218 19.4231 32.771C19.2148 32.7202 19.018 32.6345 18.8327 32.5139C17.568 31.7306 16.2356 31.1204 14.8356 30.6835C13.4356 30.2466 11.9902 30.0281 10.4993 30.0281C9.43379 30.0281 8.38727 30.1623 7.35977 30.4306C6.33254 30.6992 5.32352 31.0464 4.33268 31.4723C3.71046 31.7778 3.11046 31.7454 2.53268 31.3752C1.9549 31.0049 1.66602 30.4725 1.66602 29.7781ZM25.6106 22.2502V6.29184C25.6106 5.98767 25.6967 5.71281 25.8689 5.46725C26.0412 5.2217 26.2652 5.05211 26.541 4.9585L30.0131 3.79184C30.3464 3.67156 30.6589 3.72003 30.9506 3.93725C31.2423 4.15447 31.3881 4.43475 31.3881 4.77809V20.7918C31.3881 21.096 31.2993 21.3709 31.1218 21.6164C30.9446 21.862 30.7139 22.0316 30.4298 22.1252L26.9577 23.2364C26.6244 23.3567 26.3164 23.3082 26.0339 23.091C25.7517 22.8735 25.6106 22.5932 25.6106 22.2502Z" fill="currentColor"/></svg>`,
  PAIRING: `<svg viewBox="0 0 40 40" fill="none"><path d="M7.77792 35C7.01403 35 6.36 34.7281 5.81583 34.1842C5.27194 33.64 5 32.986 5 32.2221V7.77792C5 7.01403 5.27194 6.36 5.81583 5.81583C6.36 5.27195 7.01403 5 7.77792 5H32.2221C32.986 5 33.64 5.27195 34.1842 5.81583C34.7281 6.36 35 7.01403 35 7.77792V32.2221C35 32.986 34.7281 33.64 34.1842 34.1842C33.64 34.7281 32.986 35 32.2221 35H7.77792ZM7.77792 32.2221H32.2221V11.1112H7.77792V32.2221ZM13.9929 26.3779C12.229 25.1665 10.9443 23.5947 10.1388 21.6625C10.9443 19.73 12.2288 18.1596 13.9921 16.9513C15.7551 15.7429 17.7574 15.1388 19.9988 15.1388C22.2404 15.1388 24.2432 15.7443 26.0071 16.9554C27.771 18.1668 29.0557 19.7386 29.8612 21.6708C29.0557 23.6033 27.7713 25.1738 26.0079 26.3821C24.2449 27.5904 22.2426 28.1946 20.0013 28.1946C17.7596 28.1946 15.7568 27.589 13.9929 26.3779ZM24.3321 24.8313C25.646 24.0707 26.6742 23.0158 27.4167 21.6667C26.6742 20.3175 25.646 19.2626 24.3321 18.5021C23.0182 17.7415 21.5742 17.3612 20 17.3612C18.4258 17.3612 16.9818 17.7415 15.6679 18.5021C14.354 19.2626 13.3258 20.3175 12.5833 21.6667C13.3258 23.0158 14.354 24.0707 15.6679 24.8313C16.9818 25.5918 18.4258 25.9721 20 25.9721C21.5742 25.9721 23.0182 25.5918 24.3321 24.8313ZM21.5763 23.2396C22.0068 22.8071 22.2221 22.2817 22.2221 21.6633C22.2221 21.0453 22.0057 20.521 21.5729 20.0904C21.1404 19.6599 20.615 19.4446 19.9967 19.4446C19.3786 19.4446 18.8543 19.661 18.4238 20.0938C17.9932 20.5263 17.7779 21.0517 17.7779 21.67C17.7779 22.2881 17.9943 22.8124 18.4271 23.2429C18.8596 23.6735 19.385 23.8888 20.0033 23.8888C20.6214 23.8888 21.1457 23.6724 21.5763 23.2396Z" fill="currentColor"/></svg>`,
  'GET THE FONT': `<svg viewBox="0 0 40 40" fill="none"><path d="M11.6673 29.4585H10.584L10.334 29.7502C10.334 29.8057 10.4173 29.8891 10.584 30.0002H14.6952L14.9452 29.7502C14.9452 29.6668 14.9244 29.5974 14.8827 29.5418C14.8411 29.4863 14.7786 29.4585 14.6952 29.4585H12.5423L14.6952 23.3335H20.8061L22.9173 29.4585H20.8894L20.6394 29.7502C20.6394 29.8057 20.7227 29.8891 20.8894 30.0002H29.4173L29.6673 29.7502C29.6673 29.6668 29.6465 29.5974 29.6048 29.5418C29.5632 29.4863 29.5007 29.4585 29.4173 29.4585H28.3757L21.5144 10.7918C21.4311 10.551 21.2852 10.3589 21.0769 10.2156C20.8686 10.072 20.6386 10.0002 20.3869 10.0002H19.4894C19.2377 10.0002 19.0008 10.0766 18.7786 10.2293C18.5563 10.3821 18.4036 10.5789 18.3202 10.8197L11.6673 29.4585ZM14.9173 22.7085L17.7786 14.5418L20.5977 22.7085H14.9173ZM6.1119 36.6668C5.3619 36.6668 4.71135 36.3914 4.16023 35.8406C3.6094 35.2895 3.33398 34.6389 3.33398 33.8889V6.11141C3.33398 5.36141 3.6094 4.71086 4.16023 4.15975C4.71135 3.60891 5.3619 3.3335 6.1119 3.3335H33.8894C34.6394 3.3335 35.29 3.60891 35.8411 4.15975C36.3919 4.71086 36.6673 5.36141 36.6673 6.11141V33.8889C36.6673 34.6389 36.3919 35.2895 35.8411 35.8406C35.29 36.3914 34.6394 36.6668 33.8894 36.6668H6.1119ZM6.1119 33.8889H33.8894V6.11141H6.1119V33.8889Z" fill="currentColor"/></svg>`,
};
RESOURCE_KIND_ICON.SPECIMEN = RESOURCE_KIND_ICON['GET THE FONT'];

function goDeeperCardHtml(r) {
  // Every Go Deeper resource is a real, external destination now — always
  // opens directly in a new tab, never an in-app modal.
  const icon = RESOURCE_KIND_ICON[r.kind] || RESOURCE_KIND_ICON['GET THE FONT'];
  return `<a class="go-deeper-card type-${RESOURCE_KIND_CLASS[r.kind] || 'specimen'}" href="${esc(r.href)}" target="_blank" rel="noopener noreferrer">
    <span class="go-deeper-icon">${icon}</span>
    <div class="go-deeper-body">
      <div class="kicker"><span class="type-tag">${esc(r.kind)}</span> &middot; ${esc(r.title)}</div>
      <div class="sub">${esc(r.description)}</div>
    </div>
    <span class="go-deeper-arrow">&#8599;</span>
  </a>`;
}

function goDeeperHtml(design) {
  const resources = pickGoDeeperResources(design);
  return `<div id="go-deeper-section">
    <div class="mix-label">Go Deeper</div>
    <div class="go-deeper-list">
      ${resources.map(goDeeperCardHtml).join('')}
    </div>
  </div>`;
}

function inspirationTileHtml(item) {
  if (item.kind === 'image') return `<button class="insp-tile" data-insp="${item.id}"><img src="${item.src}" alt=""/></button>`;
  if (item.kind === 'type') return `<button class="insp-tile type-tile" data-insp="${item.id}"><span>${esc(item.glyph)}</span></button>`;
  if (item.kind === 'quote') return `<button class="insp-tile quote-tile" data-insp="${item.id}"><span>${esc(item.text)}</span></button>`;
  if (item.kind === 'wordmark') return `<button class="insp-tile wordmark-tile" data-insp="${item.id}"><span>${esc(item.text)}</span></button>`;
  return '';
}

function inspirationHtml(design) {
  const items = pickInspiration(design);
  return `<div id="inspiration-section">
    <div class="mix-label">Inspiration</div>
    <div class="insp-grid">${items.map(inspirationTileHtml).join('')}</div>
  </div>`;
}

function guideDividerHtml() {
  return `<div class="guide-divider"></div>`;
}

function creativeGuideTabHtml(design) {
  return `
    ${currentDirectionHtml(design)}
    <div id="guide-toast"></div>
    ${guideDividerHtml()}
    ${theMoveHtml(design)}
    ${guideDividerHtml()}
    ${goDeeperHtml(design)}
    ${guideDividerHtml()}
    ${inspirationHtml(design)}
  `;
}

/* ── Drawer / pill shell ──────────────────────────────────────────────── */

function ctaButtonHtml() {
  return `<button class="guide-cta" id="guide-cta-btn">
    <span class="guide-cta-mark">&#10022;</span>
    <span class="guide-cta-text"><strong>Creative Guide updated</strong><br>See what ${esc(state.lastChanged.label)} changes &rarr;</span>
  </button>`;
}

function wireCtaButton() {
  const btn = document.getElementById('guide-cta-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    state.activeTab = 'guide';
    state.guideUnseen = false;
    state.guideLastSeenDesign = { ...state.design };
    renderSidebar();
  });
}

const PILL_ICONS = {
  controls: `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 2v4M4 14v-4M8 2v7M8 14v-1M12 2v2M12 14v-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="4" cy="8" r="1.6" fill="currentColor"/><circle cx="8" cy="10.5" r="1.6" fill="currentColor"/><circle cx="12" cy="6" r="1.6" fill="currentColor"/></svg>`,
  guide: `<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3.6C6.7 2.7 4.9 2.3 2.4 2.3v9.5c2.5 0 4.3.4 5.6 1.3 1.3-.9 3.1-1.3 5.6-1.3V2.3c-2.5 0-4.3.4-5.6 1.3Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 3.6v9.5" stroke="currentColor" stroke-width="1.3"/></svg>`,
};

function guideTabButtonHtml(active) {
  return `<button data-tab="guide" class="${active ? 'active' : ''}">Creative Guide<span class="tab-dot ${state.guideUnseen ? 'visible' : ''}" id="guide-tab-dot"></span></button>`;
}

function renderSidebar() {
  const root = document.getElementById('sidebar-root');
  if (!state.drawerOpen) {
    root.innerHTML = `<div class="lattice-pill">
      <button data-open-tab="controls"><span class="pill-icon">${PILL_ICONS.controls}</span>Controls</button>
      <div class="pill-divider"></div>
      <button data-open-tab="guide"><span class="pill-icon">${PILL_ICONS.guide}</span>Guide</button>
    </div>`;
    wirePillEvents();
    return;
  }

  const tab = state.activeTab;
  const showCta = tab === 'controls' && state.guideUnseen && state.lastChanged;
  root.innerHTML = `<div class="lattice-drawer">
    <div class="lattice-drawer-header">
      <div class="lattice-tabs">
        <button data-tab="controls" class="${tab === 'controls' ? 'active' : ''}">Design Controls</button>
        ${guideTabButtonHtml(tab === 'guide')}
      </div>
      <button class="lattice-close" id="drawer-close">&times;</button>
    </div>
    <div class="lattice-drawer-body" id="drawer-body">
      ${tab === 'controls' ? designControlsTabHtml(state.design) : creativeGuideTabHtml(state.design)}
    </div>
    <div class="lattice-cta-bar ${showCta ? 'visible' : ''}" id="controls-cta-bar">${showCta ? ctaButtonHtml() : ''}</div>
  </div>`;
  wireDrawerEvents();
}

function wirePillEvents() {
  document.querySelectorAll('[data-open-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.drawerOpen = true;
      state.activeTab = btn.getAttribute('data-open-tab');
      if (state.activeTab === 'guide') { state.guideUnseen = false; state.guideLastSeenDesign = { ...state.design }; }
      renderSidebar();
    });
  });
}

const DRAWER_CLOSE_MS = 180; // matches .lattice-drawer.is-closing's animation-duration

function closeDrawer() {
  const drawer = document.querySelector('.lattice-drawer');
  if (!drawer) { state.drawerOpen = false; renderSidebar(); return; }
  drawer.classList.add('is-closing');
  setTimeout(() => {
    state.drawerOpen = false;
    renderSidebar();
  }, DRAWER_CLOSE_MS);
}

function scrollToSection(key) {
  const el = document.getElementById(`section-${key}`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.add('lattice-pulse');
  setTimeout(() => el.classList.remove('lattice-pulse'), 900);
}

function openInspirationModal(id) {
  const item = INSPIRATION_POOL.find(i => i.id === id);
  if (!item) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal-card">
    <button class="modal-close" id="modal-close">&times;</button>
    <div class="modal-visual">
      ${item.kind === 'image' ? `<img src="${item.src}" alt=""/>` :
        item.kind === 'type' ? `<span style="font-size:64px;">${esc(item.glyph)}</span>` :
        item.kind === 'quote' ? `<span style="font-size:22px;text-align:center;padding:0 30px;">${esc(item.text)}</span>` :
        `<span style="font-size:26px;letter-spacing:.2em;text-transform:uppercase;">${esc(item.text)}</span>`}
    </div>
    <div class="modal-body">
      <div class="kicker">Inspiration Note</div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.note)}</p>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.querySelector('#modal-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function esc1(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc1); } });
}

const SECTION_HTML_BY_KEY = {
  typography:   typographySelectorHtml,
  colorStory:   atmosphereSelectorHtml,
  layout:       layoutSelectorHtml,
  spacing:      spacingSelectorHtml,
  contentFocus: contentSelectorHtml,
};

function fadeIn(el) {
  el.style.opacity = '0';
  el.style.transition = 'opacity .22s ease';
  requestAnimationFrame(() => { el.style.opacity = '1'; });
}

function firstElementFromHtml(html) {
  const wrap = document.createElement('div');
  wrap.innerHTML = html.trim();
  return wrap.firstElementChild;
}

function attachDesignKeyHandlers(container) {
  container.querySelectorAll('[data-key]').forEach(btn => {
    btn.addEventListener('click', () => handleDesignChange(btn.getAttribute('data-key'), btn.getAttribute('data-value')));
  });
}

function attachJumpHandlers(container) {
  container.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-jump');
      if (state.activeTab !== 'controls') { state.activeTab = 'controls'; renderSidebar(); requestAnimationFrame(() => scrollToSection(key)); return; }
      scrollToSection(key);
    });
  });
}

function attachInspirationHandlers(container) {
  container.querySelectorAll('[data-insp]').forEach(btn => {
    btn.addEventListener('click', () => openInspirationModal(btn.getAttribute('data-insp')));
  });
}

/* Patch a single id-tagged block of the Creative Guide in place — swaps its
   markup, rewires its own listeners, and fades it in. Keeps the drawer's
   scroll position steady and avoids a full-panel reload/flash. */
function patchGuideBlock(id, htmlFn, wireFn) {
  const el = document.getElementById(id);
  if (!el) return;
  const fresh = firstElementFromHtml(htmlFn());
  el.replaceWith(fresh);
  if (wireFn) wireFn(fresh);
  fadeIn(fresh);
}

function updateGuideInPlace() {
  patchGuideBlock('current-direction', () => currentDirectionHtml(state.design), attachJumpHandlers);
  patchGuideBlock('the-move', () => theMoveHtml(state.design));
  patchGuideBlock('go-deeper-section', () => goDeeperHtml(state.design));
  patchGuideBlock('inspiration-section', () => inspirationHtml(state.design), attachInspirationHandlers);
}

const CATEGORY_TOAST_LABEL = { typography:'TYPE', colorStory:'COLOR', layout:'LAYOUT', spacing:'SPACING', contentFocus:'CONTENT' };

function showGuideToast(changeInfo) {
  const el = document.getElementById('guide-toast');
  if (!el) return;
  const meta = OPTION_META[`${changeInfo.category}:${changeInfo.value}`];
  el.innerHTML = `<div class="guide-toast-inner">
    <div class="guide-toast-label">Updated from ${CATEGORY_TOAST_LABEL[changeInfo.category] || ''}</div>
    <div class="guide-toast-text">${esc(changeInfo.label)} ${esc(meta ? meta.contribution : '')}.</div>
  </div>`;
  const inner = el.firstElementChild;
  fadeIn(inner);

  clearTimeout(el._toastTimer);
  el._toastTimer = setTimeout(() => {
    if (!inner.isConnected) return;
    inner.style.transition = 'opacity .4s ease';
    inner.style.opacity = '0';
    setTimeout(() => { if (inner.isConnected) el.innerHTML = ''; }, 400);
  }, 4000);
}

function renderControlsCTA() {
  const bar = document.getElementById('controls-cta-bar');
  if (!bar) return;
  const show = state.activeTab === 'controls' && state.guideUnseen && state.lastChanged;
  if (!show) { bar.innerHTML = ''; bar.classList.remove('visible'); return; }
  bar.innerHTML = ctaButtonHtml();
  bar.classList.add('visible');
  fadeIn(bar.firstElementChild);
  wireCtaButton();
}

function renderGuideTabDot() {
  const dot = document.getElementById('guide-tab-dot');
  if (!dot) return;
  dot.classList.toggle('visible', !!state.guideUnseen);
}

function handleDesignChange(key, value) {
  if (state.design[key] === value) return;
  state.design[key] = value;
  state.lastChanged = { category: key, value, label: optionLabel(key, value) };
  state.guideUnseen = true;
  renderCanvas();

  if (state.activeTab === 'guide') {
    // Guide is the visible tab: update its content in place (no jump/flash)
    // and surface a brief "updated from X" note.
    updateGuideInPlace();
    showGuideToast(state.lastChanged);
    return;
  }

  // Controls tab: patch just the changed section + Current Mix chips,
  // keeping the drawer's scroll position steady.
  const sectionEl = document.getElementById(`section-${key}`);
  const mixEl = document.getElementById('current-mix');
  if (!sectionEl || !mixEl) { renderSidebar(); return; }

  const freshSection = firstElementFromHtml(SECTION_HTML_BY_KEY[key](state.design));
  sectionEl.replaceWith(freshSection);
  attachDesignKeyHandlers(freshSection);
  fadeIn(freshSection);

  const freshMix = firstElementFromHtml(currentMixHtml(state.design));
  mixEl.replaceWith(freshMix);
  attachJumpHandlers(freshMix);
  fadeIn(freshMix);

  renderControlsCTA();
  renderGuideTabDot();
}

function wireDrawerEvents() {
  document.querySelectorAll('.lattice-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.getAttribute('data-tab');
      if (state.activeTab === 'guide') { state.guideUnseen = false; state.guideLastSeenDesign = { ...state.design }; }
      renderSidebar();
    });
  });
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);

  attachDesignKeyHandlers(document);
  attachJumpHandlers(document);
  attachInspirationHandlers(document);
  wireCtaButton();
}

/* ── First-visit intro modal ──────────────────────────────────────────── */

const INTRO_SEEN_KEY = 'latticeIntroSeen';

const INTRO_STEPS = [
  { img: () => IMG.introControls, title:'1. Shape the mix',
    body:'Choose type, color, layout, spacing, and content. Nothing is precious. Click around.' },
  { img: () => IMG.introGuide, title:'2. Watch it move',
    body:'Every decision changes the page live, so you can feel the difference between “fine” and “oh, there it is.”' },
  { img: () => IMG.introDeeper, title:'3. Follow the thread',
    body:'Open Creative Guide for the references, type pairings, and visual breadcrumbs behind the direction you made.' },
];

function introModalHtml() {
  return `<div class="intro-modal-overlay" id="intro-modal-overlay">
    <div class="intro-modal-card">
      <button class="modal-close" id="intro-modal-close">&times;</button>
      <h2 class="intro-modal-title">Make a few choices.<br/>See what they do.</h2>
      <p class="intro-modal-lede">Pick a type voice, shift the atmosphere, rearrange the page, then watch the whole system respond. This is a place to test your instincts, make strange combinations, and learn why some choices click.</p>
      <div class="intro-steps">
        ${INTRO_STEPS.map(step => `<div class="intro-step">
          <div class="intro-step-visual"><img src="${step.img()}" alt=""/></div>
          <div class="intro-step-text">
            <h3>${esc(step.title)}</h3>
            <p>${esc(step.body)}</p>
          </div>
        </div>`).join('')}
      </div>
      <button class="intro-cta" id="intro-modal-cta">Start making things</button>
    </div>
  </div>`;
}

function closeIntroModal() {
  const overlay = document.getElementById('intro-modal-overlay');
  if (!overlay) return;
  overlay.classList.add('is-closing');
  setTimeout(() => overlay.remove(), 160);
  try { localStorage.setItem(INTRO_SEEN_KEY, '1'); } catch (e) { /* private mode — just skip persisting */ }
}

function showIntroModal() {
  const wrap = document.createElement('div');
  wrap.innerHTML = introModalHtml();
  document.body.appendChild(wrap.firstElementChild);
  const overlay = document.getElementById('intro-modal-overlay');
  overlay.querySelector('#intro-modal-close').addEventListener('click', closeIntroModal);
  overlay.querySelector('#intro-modal-cta').addEventListener('click', closeIntroModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeIntroModal(); });
  document.addEventListener('keydown', function esc1(e) {
    if (e.key === 'Escape') { closeIntroModal(); document.removeEventListener('keydown', esc1); }
  });
}

function maybeShowIntroModal() {
  let seen = false;
  try { seen = localStorage.getItem(INTRO_SEEN_KEY) === '1'; } catch (e) { /* private mode — always show */ }
  if (!seen) showIntroModal();
}

/* ── Boot ─────────────────────────────────────────────────────────────── */

function init() {
  renderCanvas();
  renderSidebar();
  wireParallax();
  maybeShowIntroModal();
}

document.addEventListener('DOMContentLoaded', init);
