# Design

The site is the web version of the CV designed in Figma: file "ТовПред" (`APmRwM5tdB6sCAhsPuC8w6`), frame **"ddzgoev CV"**, node `2651:7` (canvas 47980, -22843). That frame is the source of truth for the look: when the site and the frame disagree, the frame wins, except for content (see "Content rules").

Soft UI (neumorphism): one colour for the ground and every surface, raised elements with a white highlight top-left and a blue shadow bottom-right, dark teal section labels.

## Tokens

From the frame, defined once in `src/index.css` (`:root`, `--cv-*`). Do not hard-code them in components.

| Token | Value | Use |
|---|---|---|
| `--cv-bg` | `#f0f0f3` | ground, sheet, every card and pill |
| `--cv-ink` | `#252525` | text |
| `--cv-muted` | `#252525` at 75% | team, company note, levels |
| `--cv-teal` | `#326469` | section labels and bars, city outlines |
| `--cv-glow` | `rgba(129,186,242,.5)` | the blue part of every shadow |

Type: SF Pro (system stack), body **Light 300**, emphasised terms **Medium 500**, titles Regular 400. Figma sizes at 1920 px are scaled by ~0.6: body 25 → 15 px, notes 20 → 12 px, name 50 → 30 px, tagline 35 → 21 px, contacts 30 → 18 px, section labels 35 → 21 px.

## Surfaces

Classes in `src/index.css`. Figma shadow → site shadow (scaled ~0.6):

| Class | Figma | Used for |
|---|---|---|
| `.cv-raised-lg` | `-5 -5 16 white, 15 15 16 glow` | sheet, name, contacts, experience cards |
| `.cv-raised` | `-5 -5 16 white, 10 10 16 glow` | tagline, social pills, soft skills, projects, education rows, languages |
| `.cv-raised-sm` | `-5 -5 16 white, 5 5 16 glow` | 36 px tiles (logos, calendar, city), icon circles, tech skill pills |
| `.cv-inset` | `inset -5 -5 16 white, inset 5 5 16 glow` | tech skills panel |

Radii: cards and tiles 6 px (Figma 10), large pills 22 px (Figma 35), short pills and circles fully round.

Section heading (`SectionHeading`): the Figma "Union", one shape: a 26 px teal tab with the lowercase title joined to a 12 px bar along its bottom (radius 6, round bar end), with the design's two inner shadows (dark `#213739` from the top-left, teal at 50% from the bottom-right). It is drawn as a single SVG path sized to the measured title, so there is no seam between tab and bar. Never build it from two boxes.

One shadow per surface. No gradients, coloured borders or new shadow variants.

## Assets

- Logos and social icons are taken from the Figma frame and live in `public/logos/` and `public/social/`. Makersite and Renault are not in the frame and come from the companies' own websites.
- Logos sit in a 36 px raised tile inside an inner 29 px box (48 of 60 px in Figma, so an even margin to the tile edge) with a 5 px radius, at 80% opacity. A logo is a mark on the tile's own background, never a square with its own backing colour: Makersite and Renault were converted to their marks on a transparent background for this. Mazars shows only the "m" of the wordmark and CROC is zoomed into its green square: both crops are the `fit` classes in `Index.tsx`, copied from the frame and applied inside the inner box.
- University logos sit in a 32 px raised circle without a white backing, at 80% opacity; education is listed newest first, as in the frame.
- Contact and calendar icons are emoji (📫 📞 🏠 🗓️), exactly as in the frame. Do not replace them with an icon set.
- Location is the city's silhouette, not a pin or a map: the administrative boundary from OpenStreetMap (Nominatim), largest polygon, thin appendages removed (negative then positive buffer of ~4.5% of the city's size), simplified, smoothed (Chaikin, 2 passes) and fitted to a 60 × 60 box (`cityOutlines` in `Index.tsx`). Drawn as a solid teal shape at 80% opacity in the same 29 px box as a logo, so it reads like one. A new city needs a new silhouette built the same way. The footer credits OpenStreetMap; keep it while the silhouettes are on the page.

## Layout

Order as in the frame: header, summary, experience, then pet projects (not in the frame, added for content), soft and tech skills (864 : 896), education and languages.

Experience: only the two latest jobs are shown (`VISIBLE_JOBS` in `Index.tsx`), as full cards. Earlier jobs are hidden behind one centred raised pill under the list, "show N earlier positions ▾", which reveals them as full cards (and becomes "hide earlier positions ▴"). The pill is a real `button` with `aria-expanded`. Cards themselves never collapse.

## Motion

- No entrance animation on page load: the page appears at once.
- "Show earlier positions": the hidden cards stay mounted in a grid row animated from `0fr` to `1fr` (`.cv-expand`, 0.6 s), so the rest of the page rolls down; the revealed cards start flat, fused with the canvas, and rise out of it one after another (`.cv-replay`, `cv-rise`, 1.1 s, 110 ms apart). While closed the block is `inert`, so keyboard and screen readers skip it. Shadows are clipped only while the row moves.
- `prefers-reduced-motion: reduce` turns all of it off.

## Mobile

Everything fits 360 px without horizontal scroll: the header stacks and centres, experience cards stack (role, company, dates and city in one row, bullets), two-column blocks become one column, languages stay two per row.

Headless Chrome cannot make a window narrower than ~500 px, so check 390 px by rendering the page inside a 390 px iframe.

## Content rules

- The text follows the MBA CV (`~/Downloads/David_Dzgoev_CV_MBA.docx`) and the work history in Obsidian (`работа/опыт работы.md`), not the older text in the Figma frame. Numbers must match the CV: 50k updates a day, 99% accuracy, a week to a day, ~2 days to ~2 hours, 90% test coverage, 228k contests, 69.4% vs 64.3%.
- The site is read on a phone in seconds, so its bullets are shorter than the CV's: each bullet and the "Achievements" line fit in about 2–3 lines at 390 px. Keep every number and key technology, cut the retelling. No justified text on a phone: narrow justified lines open gaps between words.
- Never present unfinished studies as a degree: HSE is "Master's studies (not completed)", MSU is "Bachelor's studies (transferred)".
- Dates `MM/YYYY`, `from … to …`; English only.

## Checking

```bash
npm run dev      # http://127.0.0.1:8080
npm run build    # must pass before publishing
```

Compare desktop (≥1240 px) and mobile (390 px) screenshots with the frame before pushing.
