/* ============================================================================
   LATTICE — app logic. Vanilla JS, no build step, no framework, no AI calls.
   Ported from the Figma Make React source (App.tsx / CanvasPreview.tsx /
   DesignControls.tsx / ArtDirectorNotes.tsx) and restyled per the redesigned
   sidebar (collapsed pill, Design Controls / Creative Guide tabs, Current Mix
   chips, Inspiration grid + modal).
   ============================================================================ */

const state = {
  design: {
    typography:   'editorial',
    layout:       'magazine',
    colorStory:   'museum',
    spacing:      'generous',
    contentFocus: 'editorial',
  },
  lastChanged: null,
  drawerOpen: false,
  activeTab: 'controls', // 'controls' | 'guide'
};

function px(n) { return `${n}px`; }
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
    cardPhotos: CARD_PHOTOS[design.contentFocus],
    heroPhoto: HERO_PHOTOS[design.contentFocus],
    extraPhotos: GRID_EXTRA[design.contentFocus],
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
    <div style="height:54vh;overflow:hidden;"><img src="${ctx.heroPhoto}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
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

function gridLayoutHtml(ctx) {
  const { colors, typo, space, content, cardPhotos, heroPhoto, extraPhotos } = ctx;
  const pH = px(space.sH);
  const gapPx = px(Math.max(space.gap / 4, 2));
  const row1 = [heroPhoto, ...cardPhotos];
  const row2 = extraPhotos;
  return `<div>
    <div style="padding:${px(space.elem)} ${pH};border-bottom:1px solid ${colors.border};display:flex;align-items:baseline;justify-content:space-between;">
      <div>
        ${labelHtml(typo, colors, content.issue)}
        <h2 style="font-family:${typo.heading};font-size:${typo.hSize};font-weight:${typo.hWeight};text-transform:${typo.dTransform};letter-spacing:${typo.hTracking};line-height:${typo.hHeight};color:${colors.text};margin:${px(space.micro)} 0 0;">${esc(content.title)}</h2>
      </div>
      <div style="text-align:right;">
        ${labelHtml(typo, colors, content.category)}
        <div style="font-family:${typo.ui};font-size:11px;color:${colors.muted};margin-top:2px;">${row1.length + row2.length} stories</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:${gapPx};background:${colors.border};">
      ${row1.map((photo,i) => `<div style="background:${colors.bg};cursor:pointer;">
        <div style="aspect-ratio:3/4;overflow:hidden;"><img src="${photo}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
        <div style="padding:${px(space.micro)} ${px(space.micro+2)};">
          <div style="margin-bottom:2px;">${labelHtml(typo, colors, (content.cards[i]?.category) || content.category, true)}</div>
          <div style="font-family:${typo.heading};font-size:${typo.cSize};line-height:${typo.cHeight};font-weight:${typo.hWeight};text-transform:${typo.dTransform};letter-spacing:${typo.hTracking};color:${colors.text};">${esc((content.cards[i]?.title) || content.title)}</div>
        </div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:${gapPx};background:${colors.border};">
      ${row2.map((photo,i) => `<div style="background:${colors.bg};cursor:pointer;">
        <div style="aspect-ratio:${i===0?'16/9':'4/3'};overflow:hidden;"><img src="${photo}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"/></div>
        <div style="padding:${px(space.micro)} ${px(space.micro+2)};">
          <div style="font-family:${typo.heading};font-size:${typo.cSize};line-height:${typo.cHeight};font-weight:${typo.hWeight};text-transform:${typo.dTransform};color:${colors.text};">${esc((content.cards[i%3]?.title) || content.title)}</div>
          <div style="font-family:${typo.ui};font-size:10px;color:${colors.muted};margin-top:2px;">${esc((content.cards[i%3]?.meta) || '')}</div>
        </div>
      </div>`).join('')}
    </div>
    <div style="padding:${px(space.elem)} ${pH};">
      <p style="font-family:${typo.body};font-size:${typo.bSize};line-height:${typo.bHeight};color:${colors.muted};max-width:520px;margin:0;">${esc(content.excerpt)}</p>
    </div>
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

  layer.innerHTML = `<div id="canvas-inner" style="opacity:0;transition:opacity .28s ease;">
    ${masthead}
    ${bodyHtml}
    ${footerHtml(ctx)}
  </div>`;

  requestAnimationFrame(() => {
    const inner = document.getElementById('canvas-inner');
    if (inner) inner.style.opacity = '1';
  });
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

function mixSwatchHtml(key, design) {
  if (key === 'typography') return `<div class="mix-swatch" style="background:#1A1A1A;color:#fff;">Ag</div>`;
  if (key === 'colorStory') { const c = COLORS[design.colorStory]; return `<div class="mix-swatch" style="background:${c.bg};border:1px solid rgba(0,0,0,0.1);"></div>`; }
  if (key === 'layout') return `<div class="mix-swatch" style="background:#EDEAE4;">${LAYOUT_WIREFRAMES[design.layout].replace('width="100%" height="100%"','width="14" height="10"')}</div>`;
  if (key === 'spacing') return `<div class="mix-swatch" style="background:#EDEAE4;color:#1A1A1A;font-size:13px;">&#8942;</div>`;
  if (key === 'contentFocus') return `<div class="mix-swatch" style="background:#1A1A1A;color:#fff;">${CONTENT_ICONS[design.contentFocus]}</div>`;
  return '';
}

function currentMixHtml(design, opts) {
  opts = opts || {};
  const typoLabel = TYPO_OPTIONS.find(t => t.value === design.typography).label;
  const atm = ATMOSPHERES.find(a => a.value === design.colorStory);
  const layoutLabel = LAYOUT_OPTIONS.find(l => l.value === design.layout).label;
  const spacingLabel = SPACING_OPTIONS.find(s => s.value === design.spacing).label;
  const contentLabel = CONTENT_ARCHETYPES.find(c => c.value === design.contentFocus).title;

  const chip = (key, label, value) => `<button class="mix-chip" data-jump="${key}">
    ${mixSwatchHtml(key, design)}
    <div class="mix-text"><div class="mix-key">${esc(label)}</div><div class="mix-val">${esc(value)}</div></div>
  </button>`;

  return `<div class="mix-label">Current Mix</div>
  <div class="mix-grid">
    ${chip('typography', 'Type', typoLabel)}
    ${chip('colorStory', 'Color', atm.name)}
    ${chip('layout', 'Layout', layoutLabel)}
    ${chip('spacing', 'Spacing', spacingLabel)}
    ${chip('contentFocus', 'Content', contentLabel)}
  </div>`;
}

function typographySelectorHtml(design) {
  return `<div class="row-list" id="section-typography">${TYPO_OPTIONS.map(opt => {
    const active = design.typography === opt.value;
    return `<button class="row-card ${active ? 'active' : ''}" data-key="typography" data-value="${opt.value}">
      <div class="accent-bar"></div>
      <div class="row-content typo-row">
        <span class="typo-preview" style="font-family:${opt.family};">Form &amp; space</span>
        <div class="typo-meta"><div class="lbl">${esc(opt.label)}</div><div class="sub">${esc(opt.meta)}</div></div>
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
    <div class="control-section">
      <div class="section-label">Typography</div>
      ${typographySelectorHtml(design)}
    </div>
    <div class="control-section">
      <div class="section-label">Atmosphere</div>
      ${atmosphereSelectorHtml(design)}
    </div>
    <div class="control-section">
      <div class="section-label">Layout</div>
      ${layoutSelectorHtml(design)}
    </div>
    <div class="control-section">
      <div class="section-label">Spacing</div>
      ${spacingSelectorHtml(design)}
    </div>
    <div class="control-section">
      <div class="section-label">Content</div>
      ${contentSelectorHtml(design)}
    </div>
  `;
}

/* ── Creative Guide tab ─────────────────────────────────────────────────── */

function creativeGuideNoteHtml(design, lastChanged) {
  const noteKey = lastChanged ? `${lastChanged}:${design[lastChanged]}` : null;
  const note = noteKey ? (NOTES[noteKey] || DEFAULT_NOTE) : DEFAULT_NOTE;
  const label = lastChanged ? LABEL_MAP[lastChanged] : null;

  const sectionHtml = ({ key, label: sLabel, icon, kind }) => {
    const tag = key === 'historical' ? note.era : key === 'movement' ? note.movementName : null;
    let body;
    if (kind === 'quote') {
      body = `<div class="quote-body"><div class="quote-bar"></div><p>&ldquo;${esc(note[key])}&rdquo;</p></div>`;
    } else if (kind === 'action') {
      body = `<div class="action-body"><span class="arrow">&rsaquo;</span><p>${esc(note[key])}</p></div>`;
    } else {
      body = `<p>${esc(note[key])}</p>`;
    }
    return `<div class="cg-note ${kind}">
      <div class="cg-head">
        <div class="cg-head-left"><span class="cg-icon">${icon}</span><span class="cg-label">${esc(sLabel)}</span></div>
        ${tag ? `<span class="cg-tag">${esc(tag)}</span>` : ''}
      </div>
      ${body}
    </div>`;
  };

  return `
    ${label ? `<div class="cg-context-tag"><span style="opacity:.5;font-size:8px;">&#9670;</span>${esc(label)}</div>` : ''}
    ${SECTIONS.map(sectionHtml).join('')}
  `;
}

function goDeeperHtml(design) {
  return `<div class="mix-label" style="margin-top:4px;">Go Deeper</div>
  <div class="go-deeper-list">
    ${GO_DEEPER_SLOTS.map(slot => {
      const key = `${slot.category}:${design[slot.category]}`;
      return `<button class="go-deeper-card" data-go-deeper="${key}" data-title="${esc(slot.title)}">
        <div class="go-deeper-thumb"></div>
        <div class="go-deeper-body"><div class="title">${esc(slot.title)}</div><div class="sub">${esc(slot.sub)}</div></div>
        <span class="go-deeper-arrow">&rarr;</span>
      </button>`;
    }).join('')}
  </div>`;
}

function inspirationTileHtml(item, idx) {
  if (item.kind === 'image') return `<button class="insp-tile" data-insp="${idx}"><img src="${item.src}" alt=""/></button>`;
  if (item.kind === 'type') return `<button class="insp-tile type-tile" data-insp="${idx}"><span>${esc(item.glyph)}</span></button>`;
  if (item.kind === 'quote') return `<button class="insp-tile quote-tile" data-insp="${idx}"><span>${esc(item.text)}</span></button>`;
  if (item.kind === 'wordmark') return `<button class="insp-tile wordmark-tile" data-insp="${idx}"><span>${esc(item.text)}</span></button>`;
  return '';
}

function inspirationHtml() {
  return `<div class="mix-label" style="margin-top:26px;">Inspiration</div>
  <div class="insp-grid">${INSPIRATION.map(inspirationTileHtml).join('')}</div>`;
}

function creativeGuideTabHtml(design, lastChanged) {
  return `
    ${currentMixHtml(design)}
    <div class="the-move">
      <div class="kicker">The Move</div>
      <h2>${esc(theMoveHeadline(design))}</h2>
      <p>${esc(theMoveParagraph(design))}</p>
    </div>
    ${goDeeperHtml(design)}
    ${inspirationHtml()}
    <div class="mix-label" style="margin-top:26px;">What changed last</div>
    ${creativeGuideNoteHtml(design, lastChanged)}
  `;
}

/* ── Drawer / pill shell ──────────────────────────────────────────────── */

function renderSidebar() {
  const root = document.getElementById('sidebar-root');
  if (!state.drawerOpen) {
    root.innerHTML = `<div class="lattice-pill">
      <button data-open-tab="controls">Design Controls <span class="chevron">&#10094;</span></button>
      <div class="pill-divider"></div>
      <button data-open-tab="guide">Creative Guide <span class="chevron">&#10094;</span></button>
    </div>`;
    wirePillEvents();
    return;
  }

  const tab = state.activeTab;
  root.innerHTML = `<div class="lattice-drawer">
    <div class="lattice-drawer-header">
      <div class="lattice-tabs">
        <button data-tab="controls" class="${tab === 'controls' ? 'active' : ''}">Design Controls</button>
        <button data-tab="guide" class="${tab === 'guide' ? 'active' : ''}">Creative Guide</button>
      </div>
      <button class="lattice-close" id="drawer-close">&times;</button>
    </div>
    <div class="lattice-drawer-body" id="drawer-body">
      ${tab === 'controls' ? designControlsTabHtml(state.design) : creativeGuideTabHtml(state.design, state.lastChanged)}
    </div>
  </div>`;
  wireDrawerEvents();
}

function wirePillEvents() {
  document.querySelectorAll('[data-open-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.drawerOpen = true;
      state.activeTab = btn.getAttribute('data-open-tab');
      renderSidebar();
    });
  });
}

function scrollToSection(key) {
  const el = document.getElementById(`section-${key}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openInspirationModal(idx) {
  const item = INSPIRATION[idx];
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

function openGoDeeperModal(key, title) {
  const note = NOTES[key] || DEFAULT_NOTE;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal-card">
    <button class="modal-close" id="modal-close">&times;</button>
    <div class="modal-body" style="padding-top:26px;">
      <div class="kicker">Go Deeper</div>
      <h3>${esc(title)}</h3>
      <p style="margin-bottom:14px;">${esc(note.why)}</p>
      <p style="font-style:italic; color:#8A8780;">${esc(note.historical)}</p>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.querySelector('#modal-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function esc1(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc1); } });
}

function wireDrawerEvents() {
  document.querySelectorAll('.lattice-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.getAttribute('data-tab');
      renderSidebar();
    });
  });
  document.getElementById('drawer-close').addEventListener('click', () => {
    state.drawerOpen = false;
    renderSidebar();
  });

  document.querySelectorAll('[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      const value = btn.getAttribute('data-value');
      state.design[key] = value;
      state.lastChanged = key;
      renderCanvas();
      renderSidebar();
    });
  });

  document.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-jump');
      if (state.activeTab !== 'controls') { state.activeTab = 'controls'; renderSidebar(); }
      requestAnimationFrame(() => scrollToSection(key));
    });
  });

  document.querySelectorAll('[data-insp]').forEach(btn => {
    btn.addEventListener('click', () => openInspirationModal(parseInt(btn.getAttribute('data-insp'), 10)));
  });

  document.querySelectorAll('[data-go-deeper]').forEach(btn => {
    btn.addEventListener('click', () => openGoDeeperModal(btn.getAttribute('data-go-deeper'), btn.getAttribute('data-title')));
  });
}

/* ── Boot ─────────────────────────────────────────────────────────────── */

function init() {
  renderCanvas();
  renderSidebar();
}

document.addEventListener('DOMContentLoaded', init);
