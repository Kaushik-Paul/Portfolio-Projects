# Project Structure

```
main/                       # Document root — all served files live here
├── index.html              # Main portfolio page (hero, projects grid, about, footer)
├── style.css               # Main site styles (theming, layout, components, responsive)
├── app.js                  # Main site JS (AOS init, navigation, 404 page logic)
├── theme.js                # Theme switcher (light/dark/system), loaded in <head> to avoid FOUC
├── 404.html                # Custom 404 page with animated background
├── _redirects              # Cloudflare Pages redirect rules
├── .htaccess               # Apache rewrite/caching/security rules
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Crawler directives
├── humans.txt              # Site credits
├── deployment-hook.txt     # Cloudflare deploy hook URL (gitignored)
│
├── redirects/              # Per-project redirect/launch pages
│   ├── redirect-style.css  # Shared styles for all redirect pages
│   ├── redirect-page.js    # Shared auto-redirect logic (3s delay)
│   ├── ai-agents.html      # One HTML file per project
│   ├── ai-coder.html
│   ├── ai-twin.html
│   ├── alex-agent.html
│   ├── career-conversation.html
│   ├── cyber-security-agent.html
│   ├── healthcare-saas.html
│   ├── manga-ocr.html
│   ├── price-is-right.html
│   ├── stock-market-agent.html
│   └── stock-picker.html
│
└── resources/              # SVG illustrations used as project card images
    ├── rocket-blue.svg     # Favicon / 404 icon
    └── *.svg               # One SVG per project (named to match redirect HTML)
```

## Conventions

### Adding a new project
1. Add a `.project-card` block in `index.html` inside `.projects-grid`
2. Create a matching SVG in `resources/`
3. Create a redirect HTML page in `redirects/` following the existing template (body class for accent color, shared CSS/JS)
4. Add the accent color class in `redirect-style.css`
5. Add a friendly URL rule in `_redirects`
6. Add the URL to `sitemap.xml`
7. Update `README.md` project list

### File references
- Main page assets use relative paths (`resources/`, `redirects/`)
- 404 and redirect pages use root-relative paths (`/style.css`, `/theme.js`, `../resources/`)
- External assets (fonts, icons, images) are loaded from CDNs or Google Cloud Storage
