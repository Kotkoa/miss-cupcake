# Miss Cupcake

Pixel-accurate website build from a Figma design.

## Stack

React + Vite + TypeScript + React Router + CSS Modules + Jotai (cart state).

Screens (each in Desktop / Tablet / Mobile): Homepage (+ Registered completed), Our Story, Why Miss Cupcake, Cart, Check out, Payment, Payment confirmed.

## Figma

- File: https://www.figma.com/design/cdK7lnOsfixA9OqNe17CrJ/Miss-Cupcake-Prototype--Copy-?node-id=0-1&p=f&t=yQkYrxvMF2FxCL9w-0
- Read via Figma MCP (`get_design_context`, `get_screenshot`, `get_variable_defs`); load skill `figma:figma-design-to-code` first.
- Treat its output as a reference to adapt, not final code. Verify against the screenshot.

## Rules

- One `Component.module.css` per component; camelCase class names.
- Design tokens (colors, fonts, radii, spacing) live in `src/styles/tokens.css` as CSS variables; use `var(--...)`, no hardcoded repeats.
- Mobile-first `@media`; breakpoints taken from the Tablet/Desktop frames.
- Semantic HTML, meaningful `alt`, visible focus states.
- Reuse components; don't add anything absent from the design.
- Download assets from Figma; SVG for icons.
- Small commits, one section per commit; never commit secrets.

---

## Plan

Goal: refresh layout skills from scratch. Static markup first; cart/payment logic last. One commit per screen.

### 1. Setup (see [tasks/01-setup.md](tasks/01-setup.md))
- [x] Create project: `yarn create vite . --template react-ts`, add `react-router-dom`
- [x] Add the Figma link to this file

### 2. Styles foundation
- [x] Extract tokens from Figma into `src/styles/tokens.css` (see [tasks/02-tokens.md](tasks/02-tokens.md))
- [x] Add reset and global typography
- [x] Define breakpoints from the Tablet/Desktop frames

### 3. Shared components (see [tasks/03-shared-components.md](tasks/03-shared-components.md))
- [x] Button
- [x] Quantity stepper
- [x] Input
- [x] Header
- [x] Footer
- [x] Product card

### 4. Homepage (mobile-first, see [tasks/04-homepage.md](tasks/04-homepage.md))
- [x] Mobile
- [x] Tablet (`@media`)
- [x] Desktop (`@media`)
- [x] Compared with the Figma screenshot
- [x] Background in CSS instead of images (see [tasks/04.1-homepage-css-background.md](tasks/04.1-homepage-css-background.md))

### 5. Remaining screens (simple to complex)
- [x] Architecture decisions: cart state, routes, modals, forms (see [tasks/05.0-architecture.md](tasks/05.0-architecture.md))
- [x] Our Story (video & map) ([tasks/05.1-our-story.md](tasks/05.1-our-story.md))
- [x] Why Miss Cupcake ([tasks/05.2-why-miss-cupcake.md](tasks/05.2-why-miss-cupcake.md))
- [x] Cart / My Bag ([tasks/05.3-cart.md](tasks/05.3-cart.md))
- [x] Check out ([tasks/05.4-checkout.md](tasks/05.4-checkout.md))
- [x] Payment ([tasks/05.5-payment.md](tasks/05.5-payment.md))
- [x] Payment confirmed ([tasks/05.6-payment-confirmed.md](tasks/05.6-payment-confirmed.md))

### 6. States and polish
- [ ] Clean-up from the 5.x code review ([tasks/06.0-review-cleanup.md](tasks/06.0-review-cleanup.md))
- [x] Registered completed state: newsletter banner ([tasks/06.1-registered-banner.md](tasks/06.1-registered-banner.md))
- [ ] Hover and focus states ([tasks/06.2-hover-focus.md](tasks/06.2-hover-focus.md))
- [ ] Form errors ([tasks/06.3-form-errors.md](tasks/06.3-form-errors.md))
- [ ] Accessibility check ([tasks/06.4-accessibility.md](tasks/06.4-accessibility.md))
- [ ] Lighthouse check ([tasks/06.5-lighthouse.md](tasks/06.5-lighthouse.md))

### 7. Publish
- [ ] Push to GitHub
- [ ] (Optional) Deploy to Vercel
