# Miss Cupcake

Pixel-accurate website build from a Figma design.

## Stack

React + Vite + TypeScript + React Router + CSS Modules.

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
- [ ] Decide split: you write the CSS, Claude reviews against the design

### 2. Styles foundation
- [ ] Extract tokens from Figma into `src/styles/tokens.css`
- [ ] Add reset and global typography
- [ ] Define breakpoints from the Tablet/Desktop frames

### 3. Shared components
- [ ] Button
- [ ] Input
- [ ] Header
- [ ] Footer
- [ ] Product card

### 4. Homepage (mobile-first)
- [ ] Mobile
- [ ] Tablet (`@media`)
- [ ] Desktop (`@media`)
- [ ] Compared with the Figma screenshot

### 5. Remaining screens (simple to complex)
- [ ] Our Story (video & map)
- [ ] Why Miss Cupcake
- [ ] Cart
- [ ] Check out
- [ ] Payment
- [ ] Payment confirmed

### 6. States and polish
- [ ] Registered completed state
- [ ] Hover and focus states
- [ ] Form errors
- [ ] Accessibility check
- [ ] Lighthouse check

### 7. Publish
- [ ] Push to GitHub
- [ ] (Optional) Deploy to Vercel
