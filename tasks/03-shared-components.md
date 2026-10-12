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
- [ ] Each component lives in `src/components/<Name>/` with its own `.module.css`; camelCase classes.
- [ ] Props are typed; variants are props (`variant="filled" | "outlined"`), not separate components.
- [ ] Styles use only `var(--...)` from `tokens.css`; any raw value is commented with the reason.
- [ ] Components set no outer `margin`; spacing between them is the parent's job.
- [ ] Icons are SVG files from Figma, not PNG, not hand-drawn.
- [ ] No component contains page-specific text or data: content comes through props/children.

### Accessibility
- [ ] `Button` renders `<button type="button">` by default (or `<a>` when given `href`).
- [ ] `Input` has a `<label>` linked to the field; error text is linked via `aria-describedby`.
- [ ] Icon-only controls (cart, −, +) have `aria-label`; cart badge count is readable by screen readers.
- [ ] `Header` uses `<header>` + `<nav>`, `Footer` uses `<footer>`.
- [ ] Every interactive element has a visible `:focus-visible` style and is reachable with Tab.

### Demo page `/ui`
- [ ] `yarn dev` → `http://localhost:5173/ui` shows every component with every variant and state: default, hover, focus, disabled (if in the design), Input with an error, QuantityStepper at 1 and at a higher count, Header with an empty and a non-empty cart.
- [ ] Each block has a heading with the component name and the Figma node id.
- [ ] Demo page is not linked from the site navigation.

### Manual testing (agent, in the browser)
- [ ] Agent opens `/ui` in Chrome (Chrome DevTools MCP or Claude in Chrome) at widths **375, 960, 1440**.
- [ ] At each width: screenshot of every component compared side by side with the Figma screenshot of the same node; differences in size, spacing, color or font are fixed or listed.
- [ ] Keyboard pass: Tab through the page, Enter/Space on buttons and stepper, focus is always visible.
- [ ] Hover checked on Button, nav links, cart.
- [ ] No errors or warnings in the browser console.
- [ ] A short **Test report** section is appended to this file: date, widths checked, what passed, remaining deviations (with reason).

### Build
- [ ] `yarn build` and `yarn lint` pass.

## Out of scope

Real cart state, routing for the screens, form submission (later tasks).
