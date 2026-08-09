# AGENTS.md

Guidance for AI agents and contributors working on this repository.

## Project Overview

Static portfolio website for Kaushik Paul, hosted on **Cloudflare Pages** at
https://projects.kaushikpaul.co.in/. Plain HTML/CSS/JavaScript, no build step.
The publishable site root is `main/`.

## Repository Layout

```
main/
├── index.html            # Landing page with the projects grid
├── style.css             # Landing page styles
├── app.js                # Landing page scripts (nav, AOS init)
├── theme.js              # Light/dark/system theme handling
├── 404.html              # Custom not-found page
├── _redirects            # Cloudflare Pages redirect rules
├── robots.txt            # Crawler rules, points to sitemap
├── sitemap.xml           # SEO sitemap
├── humans.txt            # humans.txt metadata
├── redirects/            # Per-project interstitial redirect pages
│   ├── <slug>.html
│   ├── redirect-page.js  # Auto-redirects to .redirect-button.primary href after 3s
│   └── redirect-style.css
└── resources/            # Per-project SVG artwork (<slug>.svg)
```

## Adding a New Project (full checklist)

When asked to "add a project" (given its GitHub URL and hosted URL), first read
the project's README to write an accurate one-line description, then update ALL
of the following. Pick a short kebab-case `<slug>` (e.g. `hf-drive`).

1. **`main/resources/<slug>.svg`** (new file)
   - 160x160 viewBox, `fill="none"` on the root.
   - Follow `manga-ocr.svg`: gradient background rounded rect
     (`x=20 y=18 width=120 height=124 rx=30`) with a subtle stroke, dark app
     shell (`x=34 y=32 width=92 height=96 rx=22`, `#1B2434` to `#101826`), top
     bar (`#263247`) with three dots (`#FB7185`, `#FBBF24`, `#4ADE80`), then
     project-specific accent artwork with a unique gradient id prefix.
   - Pick an accent color family not already used by a nearby card.

2. **`main/redirects/<slug>.html`** (new file)
   - Copy an existing page (e.g. `manga-ocr.html`) as the template.
   - Set `<title>Redirecting to <Name></title>`, `body class="<slug>"`, the
     inline stroke `.logo` SVG (24x24 viewBox), `<h1>`, description `<p>`,
     the `<img src="../resources/<slug>.svg">`, and BOTH hrefs
     (`.redirect-button.primary` and the "click here" link) to the hosted URL.
   - Keep `<meta name="robots" content="noindex, follow">`.

3. **`main/redirects/redirect-style.css`**
   - Add a `.<slug> { --project-accent: <color>; }` rule in the accent block
     (near `.manga-ocr`), matching the SVG accent color.

4. **`main/index.html`**
   - Add a `.project-card` inside `.projects-grid` at the requested position
     (default: after the most recent project). Copy an existing card; update
     the `img src`/`alt`, `<h3>`, description, link `href`/`aria-label`.
   - `data-aos-delay` values are cosmetic stagger only; reusing values is fine.

5. **`main/_redirects`**
   - Add `/<slug> /redirects/<slug>.html 302` in the "Specific redirects"
     section, above the `/redirect/*` splat rule.

6. **`main/sitemap.xml`**
   - Add a `<url>` entry for
     `https://projects.kaushikpaul.co.in/redirects/<slug>.html` with the
     current date as `<lastmod>`, `monthly` changefreq, priority `0.8`.
   - Bump the homepage `<lastmod>` to the current date.

7. **`README.md`**
   - Add an entry under "Projects Showcased" (list uses `1.` auto-numbering)
     with a bullet description and `Live at https://projects.kaushikpaul.co.in/<slug>`.

8. **`main/humans.txt`**
   - Bump `Last update:` to the current date (YYYY/MM/DD).

No changes needed for: `robots.txt` (already allows all and references the
sitemap), `404.html`, `app.js`, `theme.js`.

## Conventions

- 4-space indentation in HTML/CSS/JS, matching existing files.
- Redirect pages share `redirect-page.js`; never inline redirect logic.
- External project links belong only in redirect pages; `index.html` cards
  always link to the local `redirects/<slug>.html`.
- All public URLs use the production domain `https://projects.kaushikpaul.co.in/`.

## Local Development

```bash
cd main && python3 -m http.server 8080
```

Open http://localhost:8080. Serve from `main/` so paths match production.
Note: `_redirects` clean slugs (e.g. `/hf-drive`) only work on Cloudflare
Pages; locally use `/redirects/<slug>.html` directly.

## Deployment

Push to the repository; Cloudflare Pages builds and deploys automatically.
Production deploys come from the default branch, PRs get preview deployments.
