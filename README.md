# Baptist Initiative — Cloudflare Pages

Static multi-page site for The Baptist Initiative for Biblical Counseling & Evangelism, deployable as **Cloudflare Pages**.

## Deploy: drag-and-drop (60 seconds)

1. Cloudflare dashboard → **Workers & Pages → Create application → Pages → Upload assets**.
2. Project name: `baptist-initiative`.
3. Drag this entire folder (or its zip) into the upload area.
4. Click **Deploy site**. You get a `*.pages.dev` URL within ~30 seconds.

## Deploy: Git-connected (recommended for ongoing edits)

1. Push this folder to a GitHub or GitLab repo.
2. **Cloudflare Pages → Create application → Pages → Connect to Git**.
3. Build settings:
   - **Build command:** *(leave blank — no build step)*
   - **Build output directory:** `/` (folder root)
4. Every push to `main` auto-deploys.

## Deploy: Wrangler CLI

```bash
npx wrangler pages deploy . --project-name=baptist-initiative
```

## Connect your custom domain

In **Cloudflare Pages → your project → Custom domains**:
1. Add `baptistinitiative.org`.
2. Add `www.baptistinitiative.org`.
3. Cloudflare provisions SSL in a few minutes.

## What's in here

```
site/
├── index.html                          Home
├── about/                              Mission, board, statement of faith, A&D
├── membership/                         Associate & Certified
├── training/                           Training pathways + 3 levels
├── certification/                      3-phase process + full reading list
├── resources/                          Articles, podcasts, books
├── affiliations/                       Sister initiatives + partners
├── find-a-counselor/                   Searchable counselor directory
├── 404.html                            Custom 404
├── assets/
│   ├── css/main.css                    All styles (Jay's tokens at top)
│   ├── js/main.js                      Scroll reveal, mobile nav, accordions
│   ├── fonts/                          Wakerobin, Bookman Old Style, Gotham
│   ├── img/                            Photos
│   └── logos/                          Baptist Initiative FINALS artwork
├── _headers                            Cache + security headers
├── _redirects                          301s from legacy WP URLs
├── robots.txt
├── sitemap.xml
└── wrangler.toml                       Pages CLI config
```

## Brand specification (Jay Dean)

**Typography:**
- **Wakerobin Bold** — all titles, h1–h5, eyebrow subtitles
- **Bookman Old Style** — body, paragraphs, leads, Scripture references
- **Gotham Medium** — buttons, UI labels (uppercase with tracking)

All three font families are bundled in `assets/fonts/` and self-hosted.

**Palette:**

| Hex | Role |
|---|---|
| `#821E1E` | Primary maroon (headlines, buttons, accents) |
| `#B19568` | Brand gold (eyebrows, gold rules) |
| `#404041` | Body text dark gray |
| `#6D6E70` | Muted gray (secondary text) |
| `#F8EFDC` | Primary cream (section backgrounds) |
| `#FFF5E6` | Light cream (alternate surfaces) |

CSS variables are at the top of `assets/css/main.css` — change there to propagate everywhere.

**Logos:** Official artwork from `Baptist Initiative FINALS.zip` is in `assets/logos/`:
- `baptist-initiative-logo.png` — the 1A square seal (3600×3600), used everywhere
- `baptist-initiative-1a-final.png` through `6a-final.png` — additional lockup variants
- `baptist-initiative-5c-final.png` — the wide horizontal lockup (5400×934)

## Editing content

Plain HTML — no build step, no framework. Common edits:

- **Page text** — open the relevant `.html` file and edit. CSS classes (`.section`, `.card`, `.feature-row`, `.reveal`) are documented in `assets/css/main.css`.
- **Image** — drop a new file into `assets/img/` and update the `<img src>` reference.
- **New counselor** — copy any `<article class="counselor-card">` block in `find-a-counselor/index.html`, update the text and the `data-counselor=` attribute (used by the search filter).
- **New board member** — duplicate a `<div class="roster-card">` block in `about/board.html` or `about/advisory-board.html`.
- **New book** — find the right `<ul class="book-list">` in `certification/index.html` and add an `<li>`.

After any edit, re-deploy (drag the folder again, or push to Git).

## Scroll effects

- `.reveal` fades + lifts when scrolled in. Variants: `.reveal-left`, `.reveal-right`, `.reveal-scale`.
- `.delay-1` through `.delay-4` stagger child reveals.
- `.parallax` for fixed-attachment background bands.
- Respects `prefers-reduced-motion`.

## Local preview

```bash
cd site
python3 -m http.server 8000
# Open http://localhost:8000
```
