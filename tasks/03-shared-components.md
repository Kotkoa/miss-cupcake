# Task 3: Shared components

Build the components that repeat across screens and show them on a demo page, at Mobile / Tablet / Desktop.

## Prerequisites

- Task 2.1 tokens done. Task 2.2 (reset, global typography, fonts Wendy One + Lato) done, otherwise text won't match.

## Components

| Component | What it includes | Figma reference (Desktop Homepage `1:2` unless noted) |
|---|---|---|
| `Button` | Filled ("add to cart", "SHOP NOW", "Place order", "send") and outlined variants, as found in the design | buttons inside `Group 31` (`7:278`), Footer `940:8` |
| `QuantityStepper` | − / count / + control | inside the product card `7:278` |
| `Input` | Label + field (+ error text slot) | Footer email field `940:8`; checkout form `148:184` |
| `Header` | Logo, nav links, cart icon with count badge; Mobile layout from `9:651` | `148:362` (nav), `940:2` (cart) |
| `Footer` | Brand, links, email signup, © | `940:8` |
| `ProductCard` | Image, name, description, price, `QuantityStepper`, `Button` | `7:278` (336×470) |

The Figma file has no components or variants (only groups), so take variants from what is actually drawn; do not invent new ones.

## Steps

1. For each component: `get_design_context` + `get_screenshot` on the node at all 3 breakpoints (load skill `figma:figma-design-to-code` first).
2. Export icons (cart, −, +, arrows) from Figma as SVG into `src/assets/icons/`.
3. Create `src/components/<Name>/<Name>.tsx` + `<Name>.module.css`, styles only via tokens.
4. Add a demo page at route `/ui` (`src/pages/UiKit/`) and set up `BrowserRouter` with just this route plus `/`.
5. Check every component in the browser (see "Manual testing").

## Acceptance criteria

### Code
- [x] Each component lives in `src/components/<Name>/` with its own `.module.css`; camelCase classes.
- [x] Props are typed; variants are props (`variant="filled" | "outlined"`), not separate components.
- [x] Styles use only `var(--...)` from `tokens.css`; any raw value is commented with the reason.
- [x] Components set no outer `margin`; spacing between them is the parent's job.
- [x] Icons are SVG files from Figma, not PNG, not hand-drawn.
- [x] No component contains page-specific text or data: content comes through props/children.

### Accessibility
- [x] `Button` renders `<button type="button">` by default (or `<a>` when given `href`).
- [x] `Input` has a `<label>` linked to the field; error text is linked via `aria-describedby`.
- [x] Icon-only controls (cart, −, +) have `aria-label`; cart badge count is readable by screen readers.
- [x] `Header` uses `<header>` + `<nav>`, `Footer` uses `<footer>`.
- [x] Every interactive element has a visible `:focus-visible` style and is reachable with Tab.

### Demo page `/ui`
- [x] `yarn dev` → `http://localhost:5173/ui` shows every component with every variant and state: default, hover, focus, disabled (if in the design), Input with an error, QuantityStepper at 1 and at a higher count, Header with an empty and a non-empty cart.
- [x] Each block has a heading with the component name and the Figma node id.
- [x] Demo page is not linked from the site navigation.

### Manual testing (agent, in the browser)
- [x] Agent opens `/ui` in Chrome (Chrome DevTools MCP or Claude in Chrome) at widths **375, 960, 1440**.
- [x] At each width: screenshot of every component compared side by side with the Figma screenshot of the same node; differences in size, spacing, color or font are fixed or listed.
- [x] Keyboard pass: Tab through the page, Enter/Space on buttons and stepper, focus is always visible.
- [x] Hover checked on Button, nav links, cart.
- [x] No errors or warnings in the browser console.
- [x] A short **Test report** section is appended to this file: date, widths checked, what passed, remaining deviations (with reason).

### Build
- [x] `yarn build` and `yarn lint` pass.

## Out of scope

Real cart state, routing for the screens, form submission (later tasks).


## Test report

Date: 2026-10-12. Widths checked in Chrome (DevTools MCP emulation): 375, 960, 1440 at `http://localhost:5173/ui`.

Figma reference: after the MCP call limit was hit, node JSON and PNG renders were read through the Figma REST API (token in `.env.local`, git-ignored). "Compared" below means measured DOM geometry vs Figma node geometry, not pixel overlays.

**Passed**
- Footer vs Figma (944:54 Mobile, 944:21 Tablet, 940:8 Desktop): Tablet and Desktop within 0-4px for brand, title, field (394 x 43), send (106 x 43), link columns and the © row; Mobile within 2-8px (drift from 52px link pitch vs 51-53px in Figma).
- ProductCard vs 7:278: 336 x 470 exactly; image 223 x 235, name y 281, description y 349, stepper y 427 all match.
- Input (checkout) vs 148:184 and the Mobile checkout frame: Desktop 449 x 60, 2px outline, label gap 20, text inset 24; Mobile 334 x 39, 1px outline, gap 24.
- Header: Desktop/Tablet cart 52 x 45 at y 16, links start at x 40 (Figma 39-43), cart ends 40px from the edge (Figma 38); Mobile burger 30 x 18 at x = 20, menu opens and closes (aria-expanded, Escape).
- Keyboard: every focusable element shows a visible `:focus-visible` outline (cream in the footer, purple elsewhere); Enter and Space on `+` changed the count 1 -> 3; disabled `-` at 0 is skipped by Tab.
- Hover: Button opacity 0.85, cart link 0.7.
- Console: no errors, warnings or issues. No horizontal scroll at 375 / 960 / 1440.
- `yarn build` and `yarn lint` pass.

**Remaining deviations**
- Figma "auto" line height is the font's intrinsic height (Wendy One 1.055, Avenir 1.366), not the browser's `normal` (~1.5 for Wendy One): tokens now use these ratios.
- Tablet footer is left-aligned in its container (Figma offsets it by 31px); link rows within 2px.
- Tablet cart node (944:17) is an 82 x 82 frame with a pink circle behind the icon; the circle has the page background colour and is not rendered.
- No outlined Button exists in the design (CTAs are purple-filled or cream-filled "send"), so `variant` is `"filled" | "light"`.
- ProductCard has no price in the design, so none is rendered.
- Input error state, hover and disabled states are not drawn in Figma: error = thicker outline + note text; hover = opacity 0.85 (Button) / 0.7 (cart, nav links).
- ProductCard description wraps to 2 lines where Figma shows 3: Fontsource Lato is slightly narrower than Figma's Lato. `min-height` keeps the 3-line height.
- Cart badge SVG keeps Figma's `#FCEFD2` (merged into `--color-surface` in tokens, but the exported file is untouched).
- Radio icons (`radio-empty.svg`, `radio-filled.svg`) and `arrow-left.svg` are exported but no shared component uses them yet.
