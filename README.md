# westmardev

Marketing site for **Westmar LLC** — a static, dependency-free build of the
"WESTMAR site redesign" boards from Claude Design (Main = light, Dark = dark).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Home — header, hero, lanes, apps lineup, proof band, FAQ, CTA, footer |
| `websites.html` | Websites for contractors — pricing, recent work, site care |
| `support.html`, `privacy.html`, `terms.html` | Support and legal pages |
| `styles.css` | All styling and design tokens, shared by every page |
| `app.js` | Theme toggle and FAQ accordion |
| `favicon.svg`, `apple-touch-icon.png` | Site icons — the W is the Anybody 900 outline as a path (no font needed) |

No build step, no dependencies. Fonts (Anybody for the wordmark and display
caps, Archivo for body text) load from Google Fonts; icons are inline SVGs.

## Run locally

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Theming

Colors are CSS custom properties at the top of `styles.css`. Light is the
default for everyone, regardless of OS setting. Dark mode overrides the same
tokens under `[data-theme="dark"]` on `<html>`:

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#FFFFFF` | `#000000` |
| `--band` | `#F2F2F0` | `#121212` |
| `--ink` (headings, 2px rules) | `#000000` | `#FFFFFF` |
| `--text` | `#262626` | `#E6E6E6` |
| `--body` | `#3D3D3D` | `#B5B5B5` |
| `--muted` | `#5E5E5E` | `#A3A3A3` |
| `--rule` | `#D9D9D9` | `#2B2B2B` |
| `--red` / `--red-hover` (fills) | `#C72020` / `#A51A1A` | same |
| `--red-text` (red type) | `#C72020` | `#D35151` |
| `--inverse` (inverse blocks) | `#000000` | `#FFFFFF` |

The header toggle stores the choice in `localStorage` (`theme`). Each page
has a one-line inline script in `<head>`, before the stylesheets, that
re-applies a saved dark choice so dark mode never flashes on load.

## Editing content

Apps, proof points, FAQ entries, pricing tiers and portfolio items are plain
markup. App status pills are `pill-beta`, `pill-dev` or `pill-soon`. The
TradeKit row in `index.html` is commented out until its copy exists.

## Deploying

Any static host works. For GitHub Pages: **Settings → Pages → Deploy from
branch → `main` / root**.
