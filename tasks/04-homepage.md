# Task 4: Homepage

> Note (7.0): the working screenshots named in this file's Test report were removed from the repository in 6.0 (commit `de67a19`). They are still in git history: `git show de67a19^:tasks/screenshots/<file>`.

Build the Homepage at route `/` from the shared components, mobile-first: Mobile, then Tablet, then Desktop.

## Figma frames

| Section | Mobile `9:651` (375) | Tablet `9:434` (960) | Desktop `1:2` (1440) |
|---|---|---|---|
| Header | `9:1321` burger, `944:55` cart | `151:0` nav, `944:17` cart | `148:362` nav, `940:2` cart |
| Hero "Miss Cupcake" + image | `944:49`, `9:1329` | `944:18`, `9:1259` | `940:3`, `148:369` |
| "Simple sweet life" + images | `944:50`, `10:4` | `944:19` | `940:4`, `2:59`, `2:61` |
| Cupcakes: title + product grid | `944:51` | `944:22` | `2:78` + `Group 128/129, 31–39` (11 cards) |
| "Once upon a time" + CTA "Our story" + image | `944:52` | `944:20`, `10:201` | `940:7` |
| Footer | `944:54` | `944:21` | `940:8` |

"Registered completed" frames are out of scope (step 6).

## Steps

1. `get_screenshot` of all three frames; `get_design_context` per section (load skill `figma:figma-design-to-code` first).
2. Export the section images from Figma into `src/assets/images/home/` (WebP; keep PNG only if it has transparency and WebP is worse).
3. Put the cupcake list (name, description, image) in `src/data/cupcakes.ts`; the page maps over it.
4. Create `src/pages/Home/Home.tsx` + `Home.module.css`, one sub-component per section if a section is larger than ~60 lines (`src/pages/Home/sections/`).
5. Build Mobile first, commit; add Tablet `@media (min-width: 960px)`, commit; add Desktop `@media (min-width: 1440px)`, commit.
6. Test in the browser (see "Manual testing").

## Acceptance criteria

### Structure and code
- [x] `/` renders the Homepage; `/ui` still works.
- [x] Uses the shared `Header`, `Footer`, `ProductCard`, `Button`; no copy-pasted versions of them.
- [x] Sections in the Figma order; content (texts, cupcakes) matches the design word for word.
- [x] Product grid is CSS Grid driven by data from `src/data/cupcakes.ts`; 11 cards, same order as Figma.
- [x] Styles via tokens; raw values have a comment with the reason (same rule as Task 3).
- [x] Base styles are Mobile; Tablet/Desktop only override inside `@media (min-width: 960px)` / `(min-width: 1440px)`. No `max-width` media queries.
- [x] Desktop content is centered and limited by `--container-max-width`; wider screens (e.g. 1920) show no stretched or broken layout.

### Semantics and accessibility
- [x] Exactly one `<h1>` (hero title); section titles are `<h2>`, card names `<h3>`.
- [x] Each section is a `<section>` with an accessible name (`aria-labelledby` its heading).
- [x] Content images have meaningful `alt`; decorative images have `alt=""`.
- [x] CTA "Our story" is a link (`<a>` via `Button href`), not a button.

### Images and performance
- [x] Every `<img>` has `width` and `height` (no layout shift).
- [x] Hero image loads eagerly; everything below the first screen has `loading="lazy"`.
- [x] No image file over 300 KB; total page images under 2 MB.

### Responsive
- [x] No horizontal scroll at any width from 320 to 1920.
- [x] Between breakpoints (e.g. 600, 1200) the layout stays intact: nothing overlaps or overflows.

### Manual testing (agent, in the browser)
- [x] Agent opens `/` in Chrome (Chrome DevTools MCP or Claude in Chrome) at **375, 960, 1440**, plus **320, 600, 1200, 1920** for in-between behavior.
- [x] At 375 / 960 / 1440: full-page screenshot compared section by section with the Figma screenshot of the same frame; differences in size, spacing, color, font or order are fixed or listed.
- [x] Keyboard pass: Tab reaches header links, cart, every stepper and CTA, footer field and links, in visual order; focus is always visible.
- [x] Mobile burger opens and closes the menu; Escape closes it.
- [x] No errors or warnings in the browser console; no failed network requests (404 images).
- [x] A **Test report** section is appended to this file: date, widths, what passed, remaining deviations (with reason), screenshots folder if saved.

### Build and git
- [x] `yarn build` and `yarn lint` pass.
- [x] At least three commits: Mobile, Tablet, Desktop.

## Out of scope

Real cart logic (stepper and "add to cart" only change local state), "Registered completed" state, other screens' routes (links may point to future paths like `/our-story`).


## Test report

Date: 2026-10-12. Chrome (DevTools MCP emulation) at 375, 960, 1440 and 320, 600, 1200, 1920. Dev server for layout work, `vite preview` (production build) for console, network and the final Tablet pass. Screenshots are saved in `tasks/screenshots/` (`home-375.png`, `home-960.png`, `home-1440.png`, `home-1920.png`).

Figma reference: node JSON and PNG renders of frames `9:651`, `9:434`, `1:2` through the Figma REST API (MCP call limit was hit earlier). Section images were exported from the same nodes at 2x, converted to WebP with `cwebp -q 80` (alpha kept).

**Passed**
- `/` renders the Homepage, `/ui` still works (checked on the production build).
- Comparison, each Figma frame next to the page at the same width, section by section: Mobile (4 strips), Tablet (3 strips), Desktop (3 strips). Text, order, images and colors match; positions measured via `getBoundingClientRect` against Figma node geometry.
  - Tablet: hero, simple-life, cupcake grid (11 cards), once-upon and footer within 0-5px of Figma (e.g. card 11 y 4818 vs 4820, footer y 6476 vs 6478).
  - Desktop: header, hero, simple-life images, 3-column grid (x = 155 / 581 / 1007), once-upon within 0-10px; page height 6510 vs 6502.
  - Mobile: hero, simple-life, cards (card 11 y 7370 vs 7371), once-upon, footer within 1-8px; page height 9649 vs 9660.
- No horizontal scroll at 320, 375, 600, 960, 1200, 1440, 1920; no overlapping sections at 600 and 1200; at 1920 the content column is centered at 1440 and the hero image stays with the text.
- Semantics: one `<h1>`, four `<h2>` (each in a `<section aria-labelledby>`), eleven `<h3>` card names; "Our story" and the other CTAs are `<a>` links.
- Images: all 41 `<img>` have `width` and `height`; hero is eager with `fetchpriority="high"`, 15 below-the-fold images are `loading="lazy"`; largest file is `hero-d.webp` at 117 KB, total 836 KB for all variants.
- Keyboard: Tab order follows the page (header links, cart, hero CTA, each stepper and CTA, footer field and links); on Desktop the footer is the exception: the signup form comes before the link column in the DOM but sits to its right (CSS `order`); every one of the 40 focusable elements shows a visible outline.
- Mobile burger opens and closes the menu, Escape closes it; stepper "+" and "add to cart" update local state (cart 8 -> 10, stepper resets to 0).
- Console (production build): no errors, warnings or issues. Network: no failed requests (a missing favicon returned 404, fixed with an empty icon link).
- `yarn build` and `yarn lint` pass.

**Remaining deviations**
- Vertical positions drift by up to 10px on Desktop and 11px on Mobile: Figma places cards by hand (heights 465-480, bottom-aligned rows), the grid uses uniform gaps.
- Card descriptions wrap to 2 lines where Figma shows 3 (Fontsource Lato is slightly narrower); `min-height` keeps the 3-line block.
- Mobile hero/lead text is justified as in Figma; on Tablet/Desktop it is left-aligned as in Figma.
- Tablet footer is left-aligned in its container (Figma offsets it 31px; reproduced with extra padding).
- Header spans the full viewport width at 1920 (nav at the left edge, cart at the right) while content is centered; Figma has no frame wider than 1440.
- Page background: replaced in Task 4.1 by CSS bands with an SVG-mask wave (see `tasks/04.1-homepage-css-background.md`).
- On Desktop the hidden mobile `<img>` inside `<picture>` of "Simple life" still downloads the Tablet source (lazy, display:none); two extra files, no layout effect.
- "Registered completed" frames are out of scope. Cart and "add to cart" only change local state.
- Commits: the page was built and compared in one pass, so the three commits split the final code by breakpoint (Mobile base, + Tablet `@media`, + Desktop `@media`) rather than recording three separate builds.
