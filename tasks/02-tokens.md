# Task 2.1: Design tokens

Collect the design's colors, typography, spacing, radii and shadows into `src/styles/tokens.css` as CSS variables.

## Context

- The Figma file has **no variables or styles** (`get_variable_defs` returns `{}`), so tokens must be gathered from raw values in the frames.
- Frames: Desktop 1440, Tablet 960, Mobile 375. Key nodes: Homepage `1:2` / `9:434` / `9:651`, Checkout Payment `148:184`, Our Story `148:27`.

## Steps

1. Pull raw values from the desktop frames of every screen, then from the Tablet and Mobile Homepage (`get_design_context`, `get_screenshot`).
2. Deduplicate: merge near-identical values (e.g. `#F9F9F9` and `#FAFAFA`) and note each merge.
3. Name tokens by role, not by value: `--color-primary`, `--color-text`, `--color-bg-muted`, not `--pink-500`.
4. Write `src/styles/tokens.css` and import it once in `src/main.tsx`.

## Acceptance criteria

- [ ] `src/styles/tokens.css` exists, declares all variables on `:root`, and is imported once in `main.tsx`.
- [ ] **Colors:** every distinct fill, text and border color used across the screens has a token; each token has a comment listing where it is used.
- [ ] **Typography:** font families, weights, and font-size / line-height pairs for every text style (headings, body, button, caption, price) at all 3 breakpoints.
- [ ] **Spacing:** a scale that covers the gaps and paddings in the design (e.g. 4/8/12/16/24/32/48/64/96).
- [ ] **Radii and shadows:** every radius and shadow from buttons, cards, inputs and modals.
- [ ] **Layout:** container max width and side padding per breakpoint, and the breakpoints themselves (`960px`, `1440px`) documented in a comment (`@media` cannot read variables).
- [ ] Names are semantic and kebab-case with a group prefix (`--color-`, `--font-`, `--space-`, `--radius-`, `--shadow-`).
- [ ] No orphan values: every token is used in at least one frame. Values used only once are listed in a comment, not tokenized.
- [ ] A short "merged values" comment lists which raw values were rounded into which token.
- [ ] `yarn build` and `yarn lint` pass.

## Out of scope

Reset, global typography, loading font files (Task 2.2); breakpoints in `@media` (Task 2.3).

Что доустановить (рекомендую):

Stylelint с stylelint-config-standard и stylelint-declaration-strict-value. Сборка будет падать, если в *.module.css вместо var(--...) записан жёсткий цвет или отступ. Тогда правило «no hardcoded repeats» из CLAUDE.md проверяется автоматически, а не на глаз.
Переменные в Figma (по желанию): можно завести их в самом файле через плагин вроде Tokens Studio. Тогда get_variable_defs будет отдавать токены напрямую. Но для учебного проекта полезнее собрать их руками, как в задании.
