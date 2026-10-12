# Miss Cupcake

Pixel-accurate website build from a Figma design.

## Stack

React + Vite + TypeScript + React Router + CSS Modules.

Screens (each in Desktop / Tablet / Mobile): Homepage (+ Registered completed), Our Story, Why Miss Cupcake, Cart, Check out, Payment, Payment confirmed.

## Figma

- File: _link TBD_
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
