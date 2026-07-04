/* ============================================================================
   LATTICE — Creative Guide notes (formerly "Art Director").
   Ported verbatim from ArtDirectorNotes.tsx. Fully static — no AI calls.
   ============================================================================ */

const NOTES = {

  'typography:editorial': {
    why: `Newsreader earns its name — designed for long-form reading at screen sizes, with optical sizing that opens at small sizes and tightens at display scale. Source Serif 4 in the body shares its humanist warmth. The ALL CAPS Inter eyebrows at +120 tracking create a mode-shift from reading to navigation. Three voices, one clear intention.`,
    historical: `Newsreader (2021) fills the gap between system serifs and premium editorial faces, drawing on the Dutch optical-size tradition of the 17th century. Source Serif 4 continues Adobe's commitment to open-source type excellence. Together they define what literary digital typography looks like when it takes itself seriously.`,
    era: '17th c. tradition / 2021',
    principle: `Type personality shapes reader expectation before a single word is read.`,
    experiment: `Set your eyebrow in Inter ALL CAPS with 0.12em tracking. Compare with the same text in default casing and tracking. The combination creates a cognitive mode-shift — the reader switches from prose-reading to wayfinding. These are two genuinely different states of attention.`,
    movementName: 'Literary Editorial Typography',
    movement: `The tradition of editorial typographers who understood that the choice of serif — its warmth, its optical precision, its historical weight — was itself an editorial statement. The type of The New Yorker, Granta, The Atlantic. Faces that communicate before content does.`,
    fontPairing: `Newsreader display, Source Serif 4 body, Inter metadata. This is a rare all-serif editorial system — hierarchy comes from optical size and weight rather than serif/sans contrast. The Inter metadata introduces a clean, neutral counterpoint that makes the serifed text feel warmer by comparison.`,
    hierarchy: `Eyebrows in Inter ALL CAPS at +0.12em serve as mode-switches — from display to navigation. Newsreader light at display sizes. Source Serif 4 at body sizes. Three distinct typographic registers, each with its own cognitive function.`,
  },

  'typography:contemporary': {
    why: `Instrument Sans at the headline brings geometric precision without Futura's coldness — made for the screen and for contemporary brand contexts. Inter in the body is invisible in the best possible way. IBM Plex Mono in the metadata introduces a systematic, code-adjacent quality: this is structured data, not prose. Three typefaces, three clearly different cognitive registers.`,
    historical: `Instrument Sans (2022) was created for contemporary digital applications, drawing on geometric grotesque tradition with optical corrections for screens. IBM Plex, commissioned by IBM in 2017, brought mono metadata into the design mainstream. Together they define the typography of serious 2020s digital products.`,
    era: '2017 – present',
    principle: `The best tool disappears. Type that you don't notice is doing exactly its job.`,
    experiment: `Set your metadata labels in IBM Plex Mono with no tracking and no uppercase transform. Compare with traditional uppercase labels. The Plex Mono creates a data-reading mode that traditional labels can't achieve — it signals to readers that they're looking at a field, not a heading.`,
    movementName: 'Digital Systems Design',
    movement: `The tradition of technology companies commissioning typefaces that reflect systematic values — IBM Plex, GT Walsheim, Söhne. Type that feels institutional in the best sense: reliable, considered, built to last. Instrument Sans extends this tradition into open-source accessibility.`,
    fontPairing: `Instrument Sans for display, Inter for body, IBM Plex Mono for all metadata. Three distinct registers with clear purpose separation. Never use Plex Mono for body text — its mechanical rhythm becomes fatiguing over long passages. Keep it strictly for data and labels.`,
    hierarchy: `Without serif contrast, weight and size carry all the hierarchy. Instrument Sans at 600 weight for display, Inter Regular for body, IBM Plex Mono Regular for metadata. The monospaced metadata creates an almost system-level register below caption — like a database field.`,
  },

  'typography:fashion': {
    why: `Cormorant Garamond Light in ALL CAPS creates the exact graphic language of fashion houses — Celine, Jacquemus, A.P.C. The extreme high-contrast letterforms under tight tracking (-2%) produce a chic density that reads as refinement rather than compression. Manrope's warmth prevents it from feeling cold.`,
    historical: `Fashion editorial typography crystallized at Vogue and Harper's Bazaar in the 1950s and 60s — art directors like Alexander Liberman discovered that ALL CAPS serif headlines created a visual authority that no other type treatment could achieve. The editorial ALL CAPS headline became a signal of absolute seriousness.`,
    era: '1950s – present',
    principle: `Restraint in casing creates authority. ALL CAPS says: we don't need to shout.`,
    experiment: `Set your headline in Cormorant Garamond Light ALL CAPS at the largest size that fits comfortably. Then add -0.02em tracking. Then look at the same text in mixed case. Notice which version appears to cost more. This is what tracking does to perceived value.`,
    movementName: 'Fashion Editorial Typography',
    movement: `The tradition of fashion houses and their art directors — Fabien Baron at Harper's Bazaar, Peter Knapp at Elle, M/M Paris for Balenciaga — who elevated typography to the level of photography. Type as luxury object. The ALL CAPS serif headline as the primary signal of editorial authority.`,
    fontPairing: `Cormorant Garamond Light at display size, Manrope at body size. The contrast between a 17th-century-inspired high-contrast serif and a clean contemporary humanist creates productive tension. Old world authority, new world clarity. Never use both at similar weights.`,
    hierarchy: `Fashion editorial hierarchy is extreme: massive display type, then almost nothing, then tiny captions. Train yourself to make the jump from 72px to 11px without filling the gap with middle-sized elements. The whitespace between headline and caption is the luxury.`,
  },

  'typography:luxury': {
    why: `Bodoni Moda achieves something that very few typefaces can: extreme visual drama at any size. The hairline strokes are nearly invisible; the thick strokes are monumental. Against Newsreader body text — warm, comfortable, literary — this combination produces a reading experience of deliberate, considered quality.`,
    historical: `Giambattista Bodoni developed his extreme contrast designs in Parma in the 1780s, influenced by John Baskerville's precision printing. The style was considered too radical for books — too theatrical. It found its audience in fashion: Harper's Bazaar, Vogue, Vanity Fair — where drama was the editorial point.`,
    era: '1780s – present',
    principle: `Maximum typographic contrast communicates maximum quality. Restraint in everything else amplifies the type's authority.`,
    experiment: `Set your display headline in Bodoni Moda Regular at the largest size that fits on one line. Then set body text at 14px in Newsreader. Look at the size ratio. If it doesn't feel almost uncomfortably extreme, go bigger on the display. Luxury typography requires courage.`,
    movementName: 'Romantic Typography / Luxury Editorial',
    movement: `The tradition running from Bodoni through Alexey Brodovitch's Harper's Bazaar to contemporary luxury brands — the conviction that extreme typographic contrast communicates the same values as extreme material quality. The hairline serif is the typographic equivalent of gossamer silk.`,
    fontPairing: `Bodoni Moda for all display headings, Newsreader for all body text. Both are high-quality serifs from different traditions — Bodoni's geometric neoclassical formalism against Newsreader's warm, optical-size-aware humanist warmth. The body never competes; it reassures.`,
    hierarchy: `Luxury hierarchy maximizes the size differential between headline and body. If the headline is 68px, body text should be 14–15px. The whitespace between them should be vast and almost uncomfortable. The page must feel quiet until the headline arrives — then unmistakably loud.`,
  },

  'typography:mono': {
    why: `IBM Plex Mono in the headline and IBM Plex Sans in the body creates a sister-typeface relationship — the same underlying proportions, one monospaced, one proportional. Everything aligns to a monospaced rhythm at display size, then relaxes into readable proportional text for body. The result feels like a fashion archive, a technical journal, something that has a clear system behind it.`,
    historical: `IBM Plex was commissioned by IBM in 2017 — the first corporate custom typeface of the post-Helvetica era. Designer Mike Abbink created a family where mono and sans share DNA deliberately, so they could be used in dialogue. The result is the most sophisticated mono/sans pairing available without going custom.`,
    era: '2017 – present',
    principle: `Working within severe constraints produces the most distinctive, memorable character.`,
    experiment: `Set a section number in IBM Plex Mono at 4× the body size, then set the section title in IBM Plex Sans at normal size. The same-family relationship creates visual harmony; the mono/proportional contrast creates hierarchy. This is the Plex family's specific superpower.`,
    movementName: 'Systems Aesthetics',
    movement: `The tradition that found beauty in mechanical, systematic production — Sol LeWitt's instruction pieces, the Bell Labs design practice. IBM Plex is this tradition made into a typeface system: the idea that constraints imposed by a system are aesthetically valid, even beautiful.`,
    fontPairing: `IBM Plex Mono for all display and metadata, IBM Plex Sans for all body text. Resist the temptation to introduce a third typeface — the Plex family's internal contrast is all the variation you need. The system is closed by design.`,
    hierarchy: `Weight variation in monospaced type is limited. Use size and tracking to establish hierarchy instead. IBM Plex Mono Regular for display headlines at large sizes; IBM Plex Mono Medium for small labels. The mathematical spacing creates an almost grid-like quality — embrace it.`,
  },

  'layout:magazine': {
    why: `The asymmetric grid creates tension — an imbalance the eye wants to resolve. It moves across the spread searching for equilibrium and reads the content along the way. You're guiding attention by refusing to center it. This is a more sophisticated kind of control than symmetry.`,
    historical: `Jan Tschichold codified the editorial grid in Die Neue Typographie (1928). But it was at publications like Der Spiegel and The Sunday Times in the 1960s that the grid became a dynamic visual language rather than a rational constraint. Editorial grid plus photography: modern design.`,
    era: '1928 – 1970s',
    principle: `Asymmetry is a form of emphasis. What you refuse to center, you elevate.`,
    experiment: `Change the image column from 55% to 62% and see how the proportion shifts. The composition tips from dynamic to overwhelming very quickly. That tipping point is where the tension lives — your job is to find it and stay just inside it.`,
    movementName: 'Swiss International Style',
    movement: `Systematic grid use with photographic integration, developed at Basel and Zurich in the 1950s. Müller-Brockmann, Hofmann, Ruder — they formalized the idea that the grid wasn't a constraint but a professional responsibility. Systematic thinking as moral position.`,
    fontPairing: `Serif display with sans-serif body is the magazine convention for good reason. The contrast between expressive headline and neutral body mirrors the image-text contrast in the layout itself. Two expressive elements compete; one expressive element leads.`,
    hierarchy: `In magazine layouts, the entry point is always the image. From there: headline, deck, byline, body. Every element should feel like the next natural breath. If you find yourself adding visual devices to guide the reader, the hierarchy isn't strong enough without them.`,
  },

  'layout:minimal': {
    why: `Centered layouts communicate self-possession. They don't compete for attention — they've already claimed it. The discipline of centering is the point: nothing is here that isn't supposed to be here. The reader senses this before they start reading.`,
    historical: `Centered typography dominated Western printing for four hundred years. Tschichold's 1928 argument against it felt genuinely radical. The minimal revival we see now is a conscious choice to reclaim that pre-modernist stillness — but now with complete intentionality behind it, not tradition.`,
    era: '15th c. / 1990s revival',
    principle: `Restraint is not the absence of decisions. It is the decision.`,
    experiment: `Reduce your body copy by two point sizes. See if the layout can carry more silence. Often it can — we overcrowd because we're nervous, not because the content requires it. The right size is almost always smaller than your instinct suggests.`,
    movementName: 'Japanese Minimalism',
    movement: `The wabi-sabi tradition translated into editorial design, most clearly in Kenya Hara's work for Muji and his book Designing Design. The belief that emptiness is an active quality — that negative space makes a specific kind of argument about value.`,
    fontPairing: `A single typeface family at multiple weights and sizes. Minimal layouts reward the single-family approach completely — switching type families introduces noise that a minimal layout cannot absorb. Try one face, four weights. You'll find more range than you expect.`,
    hierarchy: `In centered layouts, vertical rhythm is everything. The distance between headline and subhead should feel as considered as the type itself. A rule of thumb: use 1.5× your line height as your default section spacing and adjust by feeling from there.`,
  },

  'layout:grid': {
    why: `Making the grid visible is a philosophical choice — the system itself is the content. There's no pretense of artlessness. Structure is honest about being structure, which is its own kind of elegance. The reader understands immediately that this is a designed thing.`,
    historical: `Josef Müller-Brockmann's Grid Systems in Graphic Design (1961) is still in print. He argued that the grid wasn't a constraint but a professional responsibility. His famous poster series for the Zurich Tonhalle — typography and geometry alone — remains the standard.`,
    era: '1950s – 1970s',
    principle: `When you commit to a system, you liberate yourself to work within it.`,
    experiment: `Remove all text and look at just the image grid as pure abstract composition. If it doesn't work as a purely visual arrangement, the hierarchy isn't strong enough. Good editorial grid design reads as composition before it reads as content.`,
    movementName: 'Swiss Grid Design',
    movement: `The mathematics-based approach to layout developed in Zurich and Basel in the 1950s. Müller-Brockmann and Ruder formalized what printers had intuited for centuries: that mathematical relationships produce visual harmony more reliably than aesthetic intuition.`,
    fontPairing: `Uniform grid layouts demand typographic consistency. One family, two weights maximum. The visual variation in a grid layout should come from image selection and scale — not typeface switching. The type is the grid's partner, not its competition.`,
    hierarchy: `In grid systems, width differential communicates editorial priority. The 2× wide item in the second row is saying: this matters more. Make sure the image you put there actually earns that emphasis. Hierarchy without justification is confusion.`,
  },

  'layout:feature': {
    why: `Full-bleed photography colonises peripheral vision. You can't skim it — you have to reckon with it. The typography becomes a guest in someone else's space, forced to behave differently: smaller, more deferential, or dramatically brave. Both approaches can work. Half-measures don't.`,
    historical: `The full-bleed cover is Alexey Brodovitch's legacy — his work at Harper's Bazaar from 1934 to 1958 established photography as editorial design's primary language. Type became caption to the image's statement. That inversion changed magazines permanently.`,
    era: '1934 – 1960s',
    principle: `When photography is strong, typography must be brave enough to get out of its way.`,
    experiment: `Try your headline in white at 70% opacity over the image rather than 100%. The transparency integrates text and image rather than layering them. The type should feel like it's emerging from the photograph, not sitting on top of it.`,
    movementName: 'Brodovitch Modernism',
    movement: `The editorial school that elevated photography to fine art and demanded that graphic design match that ambition. Brodovitch's influence at Harper's Bazaar spread to Art News, Portfolio, and eventually to nearly every serious magazine of the postwar period.`,
    fontPairing: `Condensed display type works best on full-bleed images — it claims scale without obscuring the photograph. Condensed grotesques (Helvetica Condensed, Roboto Condensed) or condensed editorial serifs maintain presence while treading lightly.`,
    hierarchy: `Over photography, establish hierarchy through position and scale rather than color. Dark text + light image or light text + dark image — pick one and commit. Mixed contrast (light text in some areas, dark in others) reads as accident, not design.`,
  },

  'colorStory:museum': {
    why: `Museum Paper's warm ivory-to-linen spectrum creates reading comfort at a biological level. The muted rose-brown text (#5D494B) is warmer than neutral black, creating a reading temperature that feels considered before a word is processed. The eye relaxes; reading slows in the productive sense.`,
    historical: `The museum paper aesthetic traces to Arts and Crafts printing of the 1890s — William Morris at Kelmscott Press chose warm handmade papers for their visual warmth. The digital revival through Kinfolk (2011) and Stripe Press (2019) proves these values travel across centuries without losing their authority.`,
    era: '1890s / 2011 digital revival',
    principle: `Color temperature is felt before it is seen. The reader's body responds before the mind does.`,
    experiment: `Compare the canvas against pure white (#FFFFFF). Notice the contrast fatigue white creates within thirty seconds. Then notice the reading relaxation that warm linen provides. You cannot articulate this precisely, but every reader feels it.`,
    movementName: 'Arts and Crafts Press Revival',
    movement: `The tradition from Kelmscott Press through the fine-press revival of the 1970s to Stripe Press today. The belief that paper color is a typographic decision — warm ground changes the character of every letterform placed on it.`,
    fontPairing: `Museum Paper is the natural home for Newsreader at light weight. The warm ground brings out amber undertones in high-contrast serifs — 300-weight type feels substantial rather than delicate. Avoid cool-toned sans-serifs; they fight the ground temperature.`,
    hierarchy: `On warm ground, pure black (#000000) reads as harsh and unintended. Full hierarchy is legible using warm darks (#5D494B and lighter). This is the secret of premium editorial design: restraint in hue, not contrast.`,
  },

  'colorStory:graphite': {
    why: `Graphite Night is dark mode at its most intentional. Near-black (#111111) with warm off-white text (#F4F1EC) — not pure white — eliminates the clinical quality of most dark interfaces. The bronze accent (#9C8B70) creates a sense of ambient candlelight rather than screen light.`,
    historical: `Luxury dark aesthetics trace through Aesop's retail design — where near-black surfaces created depth and focused attention — to Apple's dark mode guidelines (2019). The key discovery: pure black feels technical; near-black with warmth feels deliberate and premium.`,
    era: '2019 – present',
    principle: `True black is almost never the right black. Near-black with warmth reads as designed; pure black reads as default.`,
    experiment: `Compare #000000 with #111111 as background, then #FFFFFF with #F4F1EC as text. The warmer versions read as more considered in under ten seconds. The difference is barely measurable but universally felt.`,
    movementName: 'Luxury Dark Editorial',
    movement: `The tradition of using near-black to create depth and focus — visible in Aesop's stores, luxury fashion lookbooks, and the most carefully designed dark mode interfaces. Dark without being cold; intimate without being theatrical.`,
    fontPairing: `Dark backgrounds reward slightly wider letter-spacing on display type. Newsreader and Bodoni Moda gain drama in dark contexts. IBM Plex Mono reads as almost cinematic on near-black ground.`,
    hierarchy: `In dark atmospheres, hierarchy is created through opacity rather than hue. 100% for headlines, 60% for body, 40% for captions — all in the same warm off-white. The surface color (#1D1D1D) provides card separation without a visible border.`,
  },

  'colorStory:signal': {
    why: `A fully saturated background is rare in digital design — it signals that design itself is the content. Swiss International Style posters of the 1960s used red this way: not as accent but as the entire visual field. Everything else subordinates to the color. Text becomes figure against chromatic ground.`,
    historical: `Josef Müller-Brockmann's concert posters and Armin Hofmann's Basel School work used saturated backgrounds as primary design tools. The background wasn't behind the design — it was the design. Signal Red carries this tradition forward into digital contexts where chromatic grounds remain genuinely rare.`,
    era: '1950s Swiss posters – present',
    principle: `When the background is the statement, every element on it must justify its presence.`,
    experiment: `On Signal Red, increase your display type by 20% above normal. The red ground supports much larger type than neutral backgrounds — the chromatic energy elevates rather than competes. This is the Swiss poster relationship between ground and figure.`,
    movementName: 'Swiss International Poster',
    movement: `The tradition of Müller-Brockmann, Hofmann, and the Basel School that used color as primary compositional material. The saturated ground as typographic decision — made by a designer, not a brand guideline.`,
    fontPairing: `High-contrast serifs (Bodoni Moda, Newsreader at heavy weight) gain extreme legibility and drama on red grounds. The contrast of serif structure against the chromatic background is more powerful than any typographic contrast achievable on neutral ground.`,
    hierarchy: `Signal Red changes the hierarchy rules. Size and weight matter less; position matters more. Place your most important element where the eye naturally enters. Let the ground carry the emotional weight.`,
  },

  'colorStory:forest': {
    why: `Dark without being black. The muted forest green (#2E3B35) has chromatic richness that prevents the flatness of true neutral darks. It references natural materials — slate, lichen, old-growth bark — and carries their quality without imitating them directly. The sage accent echoes the ground's chromatic character.`,
    historical: `Patagonia's design language and architectural photography books of the 1990s established dark green as a premium color for nature-connected brands. It references forest canopy in fading light — deeply evocative of a specific quality of attention that values the physical world.`,
    era: '1990s outdoor brands – present',
    principle: `Nature-sourced colors carry emotional memory that synthetic colors cannot replicate, even in purely digital contexts.`,
    experiment: `Compare the same photographs in Deep Forest and Electric Blue. Notice how the image register shifts completely — Forest creates warmth and depth; Electric Blue creates clarity and precision. The atmosphere changes the reading of photography before any image treatment is applied.`,
    movementName: 'Architectural Nature Premium',
    movement: `The design tradition of brands that take their visual language from physical environments — Patagonia's earth tones, Kinfolk's forest light, architectural photography books that treat landscape as design system.`,
    fontPairing: `Light-weight serifs (Newsreader 300, Cormorant 300) float on dark green grounds more elegantly than heavy weights. Avoid geometric sans-serifs; their mechanical precision fights the organic ground.`,
    hierarchy: `Use warm off-white (#F5F2EC) at full opacity for primary text, reduced to 70–80% for body. The opacity variation creates hierarchy while maintaining atmospheric consistency. Pure white against forest green reads as too sharp.`,
  },

  'colorStory:electric': {
    why: `Electric Blue signals precision, capability, and optimism simultaneously — the feeling of a well-designed tool in morning light. The slightly saturated background (#EEF3FF) reads as systematic precision without the coldness of gray. The accent (#6077FF) has enough energy to function as a hierarchy signal at very small sizes.`,
    historical: `The Electric Blue design language crystallized with modern design systems — Figma's interface, Linear's application, Raycast's launcher. These tools chose blue-shifted backgrounds because they read as precise without the coldness of gray, and the saturated accent created a clear "this is interactive" signal.`,
    era: '2018 – present',
    principle: `Color communicates system capability before the design communicates its purpose.`,
    experiment: `Place the same content in Museum Paper and Electric Blue. Notice how the reading mode shifts: Museum Paper invites slow reading; Electric Blue invites efficient scanning. Same content, entirely different cognitive mode — created by atmospheric choice alone.`,
    movementName: 'Modern Product Design / Design Systems',
    movement: `The tradition of software design systems treating color as functional rather than decorative — Figma, Linear, Vercel, Stripe. The blue-shifted neutral background and saturated accent have become the visual language of serious, well-considered software.`,
    fontPairing: `Instrument Sans and Inter are Electric Blue's natural companions — the same DNA of clarity and precision. Contemporary sans-serifs create harmony; expressive serifs create productive tension that can work for editorial contexts within the system.`,
    hierarchy: `The accent (#6077FF) is extremely potent on Electric Blue ground — use for exactly one type of element. Any more creates competition rather than guidance. The strategy is: neutral for everything, saturated only for what matters most.`,
  },

  'colorStory:midnight': {
    why: `The most focused atmosphere in the system. Near-zero black (#090909) with pure white text creates maximum contrast and maximum focus. Where Graphite Night is editorial and warm, Midnight is digital and precise. The color language of serious tools — Framer, Figma dark mode, Linear. Nothing here exists without purpose.`,
    historical: `Midnight traces to the original Macintosh terminal (1984) — black screen, white text. Reinterpreted by Framer (2021) as the interface for creative professionals. The ultra-dark background with pure white and blue accent is now the visual signature of premium software products.`,
    era: '1984 origin / 2018 revival',
    principle: `Maximum contrast creates maximum focus. Remove everything that doesn't serve the task.`,
    experiment: `Switch from Graphite Night to Midnight. Notice the shift from editorial warmth to digital precision — same content, different cognitive frame. Graphite Night is a book; Midnight is a tool. The atmosphere determines what the reader thinks they are doing.`,
    movementName: 'Digital Tool Design',
    movement: `The tradition of productivity software that uses darkness as a focus signal — Final Cut Pro, Xcode, Figma. The near-black environment says: this is a professional space, distraction has been removed by design.`,
    fontPairing: `Midnight pairs most naturally with contemporary sans-serifs (Instrument Sans, Inter) and IBM Plex for metadata. The blue accent (#4D8EFF) creates hierarchy that barely needs size to work — pure contrast at high saturation does the job.`,
    hierarchy: `The accent (#4D8EFF) is a precision instrument. One primary button, one link color — deployed with absolute consistency. The high-value contrast between near-black and electric blue makes hierarchy almost self-evident. The risk is using it too often.`,
  },

  'colorStory:clay': {
    why: `Warm without being beige. Soft Clay (#E8D7C7) occupies the space between warm white and terracotta — the color of unglazed ceramics, linen in afternoon light, interior plaster. The warm brown text and burnt orange accent create a palette that references handcraft — materials you can imagine touching.`,
    historical: `The Soft Clay aesthetic crystallized around boutique hospitality design of the 2010s — Ace Hotel's design-studio approach, East Fork Pottery's brand language. The palette signals: made with care, by specific people, for specific purposes. It carries craft values into digital contexts without performing them.`,
    era: '2010s boutique hospitality – present',
    principle: `Material-reference color creates warmth that neutral "warm beige" cannot achieve — the chromatic specificity is what matters.`,
    experiment: `Compare Soft Clay with Museum Paper. Both are warm and light, but Soft Clay has more chromatic saturation — it reads as a material, not just a temperature. Notice how this shifts the reading of photography framed by each atmosphere.`,
    movementName: 'Boutique Hospitality Design',
    movement: `The design tradition of small luxury hotels, ceramics studios, and craft food brands that built identities around material warmth — clay, linen, timber, stone. Color as material reference rather than brand choice.`,
    fontPairing: `Soft Clay is the natural home for humanist letterforms — Cormorant Garamond at light weight, Newsreader at regular, Manrope. The organic quality of the palette reinforces the human warmth of letterforms with visible pen influence.`,
    hierarchy: `On Soft Clay, avoid cool accent colors — they break the material warmth. The burnt orange accent (#C98B66) is the single chromatic emphasis tool. Use it for exactly one type of element: the most important action on the page.`,
  },

  'spacing:generous': {
    why: `Generous space is the design equivalent of a pause before speaking. It tells the reader this is worth your full attention. Luxury brands figured this out long ago — the nearly empty shelf makes the single product feel precious. The logic applies directly to editorial design.`,
    historical: `Generous margins in book design trace to Aldus Manutius in 15th-century Venice — he understood that white space around type was as important as the type itself. The Italian scholarly tradition prized margins for annotation. Five hundred years later, they still signal quality.`,
    era: '15th century – present',
    principle: `White space is not empty. It is the weight assigned to content.`,
    experiment: `Double your current section padding. Then look at your design from across the room, or at 50% zoom. Does it feel luxurious or undercooked? The answer tells you exactly where your threshold is. Most designs are underspaced, not overspaced.`,
    movementName: 'Quiet Luxury',
    movement: `The contemporary design movement (in fashion, interiors, and publishing) that equates space with quality and restraint with sophistication. Visible in The Row's stores, Bottega Veneta's catalogs, Apartamento magazine. Space is how confidence is communicated without words.`,
    fontPairing: `Generous space makes delicate, light typefaces viable. Light and Thin weights only work with proper breathing room. Without it, they disappear. With it, they feel intentional — a whisper rather than an absence.`,
    hierarchy: `In generous layouts, proximity does the relational work. Elements that are close are related; elements that are far are separate. Don't add borders or dividers — let the space speak. If you need a rule to separate sections, the spacing isn't generous enough.`,
  },

  'spacing:compact': {
    why: `Dense layouts carry a different kind of authority — they say there's too much worth reading to waste space. Reference books, broadsheet newspapers, The Economist: density communicates seriousness. The reader has to work slightly, which makes them feel the work was worth the effort.`,
    historical: `British newspaper design of the 1970s and 80s pioneered information density as editorial value. Harold Evans' Newspaper Design (1973) codified the approach: every column inch earned, every rule a navigation aid. The FT and Guardian both descend from this tradition.`,
    era: '1970s – 1990s',
    principle: `Density earns reader investment by implying there is much worth finding here.`,
    experiment: `Reduce your body leading from 1.6× to 1.4×. See how much more you gain without losing legibility. You may find you were leaving more space than the content required — spacing is often set defensively rather than precisely.`,
    movementName: 'Tabloid Modernism',
    movement: `The design tradition of maximizing information density while maintaining grid discipline, developed in British editorial design. The Daily Telegraph redesigns of the 1980s, the original Guardian grid — proof that compact design could be both rigorous and readable.`,
    fontPairing: `In compact layouts, choose typefaces with generous counters (the white space inside letters) — they remain open under density where faces with tight counters close up. Georgia, Freight Text, Tiempos — all built for reading under pressure.`,
    hierarchy: `With reduced spacing, rules and dividers become critical hierarchy tools. A single 1px rule separates sections more clearly than a gap twice as wide. The constraint forces you to be precise about what is a section boundary and what is merely a pause.`,
  },

  'spacing:rhythmic': {
    why: `Rhythmic spacing creates a bass line under your content — you don't hear it consciously, but remove it and everything feels unsettled. The 8-point grid is a decision you make once so you can stop making it on every element. Systems thinking applied to space.`,
    historical: `The baseline grid was formalized in Swiss grid design of the 1950s, but its logic is much older — early typographers set type on fixed leading so pages would align when held to light. The grid was always about coherence. The Swiss just made it explicit.`,
    era: '1950s – present',
    principle: `Systems thinking applied to spacing produces coherence without uniformity.`,
    experiment: `Lay an 8px grid over your current design and try to align every element to it. Then compare. The version on the grid will feel more settled — less work for the eye. This is what rhythm does: it removes micro-decisions that accumulate into visual noise.`,
    movementName: 'Systems Design',
    movement: `The approach, formalized in the 1960s through Ulm and MIT, of designing the rules of a system rather than individual instances. Don Knuth's TeX, the Bell Labs design practice, IBM's grid systems. The grid as a prior commitment that makes better work possible.`,
    fontPairing: `Choose a typeface whose line height divides cleanly into your grid unit. At 16px type with 24px line height on an 8px grid, every line falls on a grid point. When type and grid share a mathematical relationship, the layout coheres at a level below conscious notice.`,
    hierarchy: `In rhythmic systems, hierarchy is established by multiples of the base unit. A heading gap of 32px (4 units) feels clearly more significant than a paragraph gap of 8px (1 unit). The reader's eye senses the ratio before the mind calculates it.`,
  },

  'contentFocus:editorial': {
    why: `Editorial design is fundamentally a trust contract. The reader commits time; the design must reward that commitment with clear guidance — where to enter, how to navigate, when to pause. Hierarchy is service. Every decision should answer: does this help the reader move forward?`,
    historical: `Modern editorial design was defined at Vogue under Mehemed Fehmy Agha from 1929 and at Fortune with Brodovitch consulting. The idea that a magazine page could be a designed artifact — not just a container for text — was genuinely new. It changed what publications thought they were.`,
    era: '1929 – 1960s',
    principle: `Every design element should either carry the reader forward or offer them a deliberate moment of rest.`,
    experiment: `Remove your byline and see what the design loses. Often we include editorial conventions — bylines, section numbers, issue dates — from habit rather than function. Test each element's necessity before trusting its presence.`,
    movementName: 'Golden Age Magazine Design',
    movement: `The tradition of American editorial design from the 1930s through 60s that established most of the conventions we still use. Agha at Vogue, Brodovitch at Harper's Bazaar, Leo Lionni at Fortune — they built the visual grammar of editorial publishing from scratch.`,
    fontPairing: `The classic editorial pairing: display serif for headlines, humanist sans for body. The serif provides voice; the sans provides clarity. The contrast mirrors the editorial function — attention-getting headline, sustained-reading body. Each serves a different mode of reading.`,
    hierarchy: `Editorial hierarchy has five levels: headline, deck, byline, body, caption. If your design needs more than five, you're adding complexity that doesn't serve the reader. Simplify the content structure before adding typographic levels.`,
  },

  'contentFocus:portfolio': {
    why: `Portfolio layouts invert normal hierarchy: image first, everything else second. The work must speak before the designer does. This requires confidence to let images dominate and discipline to make every other element genuinely subordinate, not just visually smaller.`,
    historical: `The portfolio as designed artifact became serious with design annuals in the 1950s. The Design and Art Direction annual (1962) set the standard for how work should be presented with intention. Before that, portfolios were functional documents. D&AD made them arguments.`,
    era: '1950s – 1970s',
    principle: `Presentation is argument. How you show the work makes a claim about what the work means.`,
    experiment: `Look at your portfolio layout with all text removed — just images. Does the sequence hold visually? If the images don't work as a curated arrangement, the curation needs work before the design does. Sequence is editorial opinion.`,
    movementName: 'Conceptual Photography Presentation',
    movement: `The tradition of presenting photographic and art work in a way that the sequence and hanging is itself a design act — visible in the Aperture Foundation's books from the 1960s, and in the way Phaidon presents contemporary art monographs today.`,
    fontPairing: `Ultra-minimal typography for portfolio: one sans family, one weight, very small. The image should always feel like the largest, most dominant element. Type that competes with the work is a failure of editorial judgment. The name of the work should whisper, not announce.`,
    hierarchy: `In portfolio layouts, scale is editorial opinion. Make your best work literally larger. Don't hide strong work in a grid of equals — that false modesty serves the designer's anxiety, not the viewer's experience. Hierarchy is how you direct attention to what matters.`,
  },

  'contentFocus:brand': {
    why: `The best design studios let work speak before they do. The portfolio is the argument — if you need to explain your taste, your work isn't doing its job. Typography becomes the primary signal of sensibility. The headline is the manifesto. Everything else is evidence.`,
    historical: `European design studios of the 1990s and 2000s — Bureau Borsche, Experimental Jetset, Base Design, Studio Dumbar — built identities rooted in typographic conviction rather than visual novelty. Their pages read like art journals, not marketing materials. That discipline still defines the field.`,
    era: '1990s – present',
    principle: `A studio's portfolio page is its most important piece of work.`,
    experiment: `Remove all images from your layout. If the typographic structure holds on its own, your hierarchy is working. If it feels broken, the type isn't doing enough. Studio Leichtfried and Experimental Jetset pass this test effortlessly — their pages work without a single image.`,
    movementName: 'European Studio Modernism',
    movement: `The Central European studio tradition — Basel-trained, grid-disciplined, typographically rigorous — that treats every project as an extension of a coherent visual philosophy. Studio Dumbar, Base Design, Experimental Jetset. The studio voice is always present, even when serving the client's.`,
    fontPairing: `High-contrast serif display (Cormorant Garamond, Bodoni Moda, Canela) paired with a neutral grotesk (Inter, Suisse Int'l, IBM Plex Sans). The serif carries personality; the grotesk carries information. Keep body sizes small — the headline should dominate by a factor of four or more.`,
    hierarchy: `Studio portfolio hierarchy: name → manifesto → project list → contact. Everything between manifesto and contact is evidence, not decoration. Project titles should be large enough to read from across the room. Metadata should require deliberate attention. Nothing in between should compete.`,
  },

  'contentFocus:product': {
    why: `Product layout is design in service of a decision moment. The reader is evaluating: do I want this? Everything serves that single question — honest photography, clear description, unambiguous price. Persuasion through clarity, not embellishment. The less the design does, the more the product can.`,
    historical: `Muji's design philosophy — developed with Kenya Hara from the 1980s — established a new standard for product presentation: absolute restraint so the object could speak entirely for itself. No-brand as brand. The aesthetic traveled from packaging to digital retail and is now the baseline expectation.`,
    era: '1980s – present',
    principle: `Clarity is the most effective, least trusted form of persuasion.`,
    experiment: `Remove one element from your product card. Then remove another. Keep removing until the card breaks. The last element you removed before it broke is the one you were closest to not needing. This is how you identify what's genuinely necessary.`,
    movementName: 'Muji Aesthetics',
    movement: `The Japanese design philosophy of 'no-brand' design: quality without advertising, clarity without decoration. Ryohin Keikaku's Muji practice — and Kenya Hara's articulation of it in Designing Design — changed what product design thought it was trying to do.`,
    fontPairing: `Product layouts need neutral, honest sans-serifs that don't compete with the object. The typeface should feel like good gallery lighting — present but not noticed. Inter, DM Sans, Work Sans. Expressive type in product design says the product isn't interesting enough on its own.`,
    hierarchy: `Image is always the largest element — always. Price and name form the second tier. Everything else follows. Any deviation from this hierarchy requires a specific justification. If you're doing something unusual, it should be because the product is genuinely unusual.`,
  },
};

const DEFAULT_NOTE = {
  why: `Start with any control on the left. Each choice triggers a full design briefing — historical context, design principles, font pairing advice, and specific experiments to try. This is not documentation. It's a conversation with someone who has made these choices a thousand times and learned from most of them.`,
  historical: `Design education used to require an apprenticeship — years of working alongside someone who could explain why things were done the way they were done. This panel tries to replicate a fraction of that. The knowledge here comes from practice, not theory.`,
  era: 'Ongoing',
  principle: `The best design decisions are the ones you can explain clearly to someone else.`,
  experiment: `Change the Typography System to Editorial and watch the canvas transform. Then read what the guide has to say about it. The explanation will change how you see the choice — and how you'll make the next one.`,
  movementName: 'Design Education',
  movement: `The tradition of learning design through proximity to practitioners — apprenticeship, crits, and the kind of direct feedback that doesn't arrive through documentation. This panel is an attempt to encode some of that directness into a tool.`,
  fontPairing: `For now: observe what typeface is being used in the canvas preview. Notice its weight, its personality, how it handles the headlines versus the body text. Type literacy starts with looking, not with knowing names.`,
  hierarchy: `Before you change anything: look at the preview canvas and trace the path your eye takes. Where does it enter? Where does it go next? That path is the hierarchy as it currently exists. Changes to the controls will reshape it.`,
};

const LABEL_MAP = {
  typography:   'Type System',
  layout:       'Layout',
  colorStory:   'Color',
  spacing:      'Spacing',
  contentFocus: 'Content',
};

const SECTIONS = [
  { key:'why',         label:'Why this works',       icon:'✦', kind:'primary'   },
  { key:'historical',  label:'Historical context',   icon:'◷', kind:'secondary' },
  { key:'principle',   label:'Design principle',     icon:'—', kind:'quote'     },
  { key:'experiment',  label:'Suggested experiment',  icon:'↳', kind:'action'    },
  { key:'movement',    label:'Related movement',      icon:'◈', kind:'tag'       },
  { key:'fontPairing', label:'Font pairing',          icon:'Aa',kind:'pair'      },
  { key:'hierarchy',   label:'Visual hierarchy',      icon:'↕', kind:'diagram'   },
];

/* ── "The Move" headline generator (deterministic, prebuilt fragments) ─────
   No AI calls — a small lookup table combined by a template, same spirit as
   the screenshot's "Clarity with conviction." synthesized line.            */

const TYPO_WORD = {
  editorial: 'Warmth', contemporary: 'Clarity', fashion: 'Elegance', luxury: 'Drama', mono: 'Precision',
};
const CONTENT_WORD = {
  editorial: 'attention', portfolio: 'discipline', brand: 'conviction', product: 'honesty',
};

function theMoveHeadline(design) {
  const a = TYPO_WORD[design.typography] || 'Clarity';
  const b = CONTENT_WORD[design.contentFocus] || 'purpose';
  return `${a} with ${b}.`;
}

function theMoveParagraph(design) {
  const typoLabel = TYPO_OPTIONS.find(t => t.value === design.typography).label.toLowerCase();
  const atm = ATMOSPHERES.find(a => a.value === design.colorStory);
  const layoutOpt = LAYOUT_OPTIONS.find(l => l.value === design.layout);
  const spacingOpt = SPACING_OPTIONS.find(s => s.value === design.spacing);
  const contentOpt = CONTENT_ARCHETYPES.find(c => c.value === design.contentFocus);
  const tones = contentOpt.tones.split(' · ').map(t => t.toLowerCase()).join(', ');

  return `This mix combines ${typoLabel} typography, the ${atm.dark ? 'dark' : 'light'} ${atm.name} palette, `
    + `${layoutOpt.label.toLowerCase()} structure, ${spacingOpt.label.toLowerCase()} spacing, and ${contentOpt.title.toLowerCase()}-led content `
    + `to create a ${tones} presence.`;
}

/* ── Go Deeper — reuses NOTES content under 3 fixed evergreen headings ───── */

const GO_DEEPER_SLOTS = [
  { title: 'Building a Modern Brand System', sub: 'Foundations for clarity, flexibility, and impact.', category: 'contentFocus' },
  { title: 'Editorial Layout That Works',      sub: 'Designing pages with purpose and rhythm.',          category: 'layout'       },
  { title: 'The Power of Considered Color',    sub: 'Why atmosphere drives focus and feeling.',          category: 'colorStory'   },
];

/* ── Inspiration — a fixed, static mood-board (not tied to current mix) ──── */

const INSPIRATION = [
  { kind:'image', src: IMG.birch, title:'Stillness, Framed', note:'A single subject, a lot of quiet air around it. This is what "let the work breathe" looks like when you actually commit to it — no crowding, no competing elements.' },
  { kind:'type',  glyph:'Aa', title:'Type as Voice', note:'Before color, before layout — the typeface is the first thing a visitor feels. Pick one that argues for your point of view, not just one that\'s legible.' },
  { kind:'quote', text:'Clarity Creates Impact', title:'Restraint as Strategy', note:'The best editorial and brand systems say less, more precisely. Every element you cut makes the ones that remain louder.' },
  { kind:'image', src: IMG.tintin, title:'Material Honesty', note:'Photography that shows texture and wear reads as trustworthy. Overly polished imagery can undercut the same brand voice it\'s meant to support.' },
  { kind:'wordmark', text:'FORMA', title:'The Logotype Test', note:'If your wordmark only works in one weight, at one size, on one background — it isn\'t finished yet. Test it small, test it reversed, test it alone.' },
  { kind:'image', src: IMG.golf, title:'Negative Space at Work', note:'The empty two-thirds of this frame is doing as much storytelling as the figure in it. Generous spacing in a layout works on the same principle.' },
];
