# Task 1: Project setup

Create a clean React + TypeScript + Vite project in the repo root, ready for layout work.

## Steps

1. In the repo root, run `yarn create vite . --template react-ts` (keep `CLAUDE.md` and `tasks/`).
2. Run `yarn` and `yarn add react-router-dom`.
3. Remove Vite demo content: logo assets, `App.css`, demo markup and counter in `App.tsx`, demo styles in `index.css`.
4. Add the Figma file link to `CLAUDE.md` (replace `_link TBD_`).
5. Add `.gitignore` entries if missing (`node_modules`, `dist`, `.env*`).

## Acceptance criteria

- [x] `package.json` is in the repo root; `CLAUDE.md` and `tasks/` are untouched in place.
- [x] Template is React + TypeScript (`tsconfig.json`, `src/main.tsx`, `src/App.tsx`).
- [x] `react-router-dom` is listed in `dependencies` (installed, not configured: no routes yet).
- [x] The package manager is yarn: `yarn.lock` exists, no `package-lock.json`.
- [x] `yarn dev` starts without errors and the page opens in the browser.
- [x] The page shows only an empty `App` (no Vite/React logos, no counter, no demo text).
- [x] No unused demo files remain in `src/` (`App.css`, `assets/react.svg`, `public/vite.svg`).
- [x] `yarn build` and `yarn lint` finish with no errors.
- [x] `node_modules`, `dist` and `.env*` are in `.gitignore`.
- [x] `CLAUDE.md` contains the real Figma link instead of `_link TBD_`.
