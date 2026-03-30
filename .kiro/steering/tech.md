# Tech Stack & Tooling

## Stack
- Vanilla HTML5, CSS3, JavaScript (ES5-compatible, no transpilation)
- No build system, bundler, or package manager — files are served as-is
- Google Fonts: Poppins (weights 300–700)
- Font Awesome 6.4.0 (CDN)
- Devicon 2.15.1 (CDN) for tech skill icons
- AOS (Animate On Scroll) library loaded on the main page

## CSS Architecture
- CSS custom properties for theming (light/dark) defined in `:root` and `html[data-theme='dark']`
- Single `style.css` for the main site; separate `redirects/redirect-style.css` for redirect pages
- Each redirect page has a body class (e.g. `.ai-twin`, `.manga-ocr`) that sets `--project-accent` color
- Responsive breakpoints: 1024px, 860px, 640px (main site); 768px, 560px (redirect pages)
- `prefers-reduced-motion` respected with animation disabling

## JavaScript
- All JS is vanilla, ES5-style (var, forEach, no arrow functions, no modules)
- `theme.js` — loaded synchronously in `<head>` to prevent flash of wrong theme; uses localStorage key `kp-theme-preference`; supports light/dark/system
- `app.js` — DOMContentLoaded entry point; initializes AOS, navigation (hamburger, smooth scroll, active link highlighting), and 404 page background animation
- `redirects/redirect-page.js` — auto-redirects to the primary link URL after 3 seconds

## Hosting & Deployment
- Cloudflare Pages with automatic deploys from main branch
- `_redirects` file for Cloudflare Pages routing (friendly URLs → redirect HTML pages, 404 fallback)
- `.htaccess` included for Apache compatibility (domain redirect, HTTPS, compression, caching, security headers)
- Deploy hook available via Cloudflare API webhook

## SEO
- Extensive meta tags (Open Graph, Twitter Card, WhatsApp)
- JSON-LD structured data (Person, BreadcrumbList, WebSite, ProfilePage)
- `sitemap.xml`, `robots.txt`, `humans.txt`, canonical URL

## Local Development
```bash
# Serve from the main/ directory
python3 -m http.server 8000 -d main
```
No install, build, or compile steps required.
