# westmardev

Marketing site for **Westmar LLC** — a static, dependency-free build of the
"Apple-inspired website redesign" boards from Claude Design (Home, Websites,
Support, Privacy, Terms, plus the shared SiteNav and SiteFooter).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Home — TestFlight ribbon, hero, app tiles, why, websites promo, FAQ, contact |
| `websites.html` | Websites for contractors — pricing, recent work, what $99 covers |
| `support.html` | Support — what to include, common questions |
| `privacy.html`, `terms.html` | Legal pages with an "On this page" list on wide screens |
| `styles.css` | Design tokens and all styling, shared by every page |
| `app.js` | Mobile menu, FAQ accordion, Home's live numbers |
| `img/westmar-logo.svg` | The logo; inlined in every page's header and footer |
| `favicon.svg`, `apple-touch-icon.png` | The logo's own W on white |

No build step, no dependencies. Geist (400–700) loads from Google Fonts; the
wordmark is the inline logo SVG, not type.

## Run locally

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Design tokens

Light only. Colours are CSS custom properties at the top of `styles.css`, taken
from the export; sizes keep the export's `clamp()` values and auto-fit grids,
so layouts follow the boards at every width.

| Token | Value | Used for |
| --- | --- | --- |
| `--ink` | `#121212` | Headings, body text, the logo's LLC |
| `--red` / `--red-hover` | `#C72020` / `#A51A1A` | Links, buttons, the logo's WESTMAR |
| `--tile` | `#f4f4f2` | Tiles, ribbon, footer |
| `--muted` / `--muted-2` | `#5c5c57` / `#6b6b66` | Secondary text |
| `--dark` / `--darker` | `#111111` / `#0c0c0c` | ShiftJar, Full site, Voyager tiles |
| `--red-on-dark` | `#E35D5A` | Links and focus rings on dark tiles |

## Shared header and footer

The header (SiteNav) and footer (SiteFooter) are the same markup on every page,
logo included. When you change one, change all five pages. Only Home adds the
footer's status note.

In the inline logo, the WESTMAR path is `#C72020` and the LLC path is
`fill="currentColor"`, coloured `#121212` by the surrounding CSS.

## Behaviour (`app.js`)

- **Menu** (under 760px): full-screen panel. The page behind it is inert and
  locked, Tab stays inside, and Escape or any link closes it.
- **FAQ**: one answer open at a time, the first open on load.
- **Live numbers** (Home): Voyager's odometer counts 370 km/s since the page
  loaded and YourBPM's reading wobbles around 148. They pause while the tab is
  hidden. With reduced motion they show fixed values (22,200 km, 147 BPM).

## Legal pages

The policy text is authoritative and kept exactly as written. Section numbers
are CSS counters, and the `id`s on each `<h2>` feed the "On this page" list, so
edits to the text never need matching edits elsewhere.

## Deploying

Any static host works. For GitHub Pages: **Settings → Pages → Deploy from
branch → `main` / root**.
