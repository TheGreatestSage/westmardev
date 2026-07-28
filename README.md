# westmardev

Marketing site for **WestMar LLC** — a static, dependency-free build of the
`Westmar.dc.html` design from Claude Design.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Full page markup — nav, hero, app showcase, why, FAQ, CTA, footer |
| `styles.css` | All styling and design tokens (the design's inline styles, extracted) |
| `app.js` | FAQ accordion behavior |

No build step, no dependencies. Fonts (Space Grotesk, IBM Plex Mono, Material
Symbols Rounded) load from Google Fonts.

## Run locally

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

Opening `index.html` directly also works.

## Theming

The design exposes one knob: the accent color. Change `--accent` in
`styles.css`:

```css
:root { --accent: #7cc4ff; }  /* alternates: #4ade80, #fbbf24, #a78bfa */
```

## Editing content

Apps, proof points, and FAQ entries are plain markup in `index.html` — the
design's `sc-for` loops are expanded inline. Each app card sets its icon
gradient and status color through two custom properties:

```html
<article class="app-card" style="--icon-bg:linear-gradient(...);--status-color:#fbbf24">
```

Icon names are [Material Symbols Rounded](https://fonts.google.com/icons) ligatures.

## Deploying

Any static host works. For GitHub Pages: **Settings → Pages → Deploy from
branch → `main` / root**.

## Source design

[Westmar.dc.html](https://claude.ai/design/p/e19056e0-9693-4901-9041-fb01a8aab711?file=Westmar.dc.html)
— keep it in sync by hand; there is no automated codegen from the `.dc.html`.
