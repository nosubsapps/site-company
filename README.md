# NoSubsApps static site

This site is fully static and works on GitHub Pages with no build step.

## Main files

- `index.html` — main page
- `assets/css/styles.css` — design and responsive layout
- `assets/js/main.js` — rendering, language switcher, carousels
- `assets/js/data/site-content.js` — shared English and Russian UI text
- `assets/js/data/apps.js` — portfolio apps
- `assets/js/data/stories.js` — manifesto, story, roadmap cards
- `ADD_APPS.md` — short guide for adding new apps

## Local preview

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deployment

Upload the repository root contents to GitHub Pages.

Required root files:

```text
index.html
404.html
CNAME
robots.txt
sitemap.xml
site.webmanifest
assets/
```
