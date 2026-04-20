# NoSubsApps website

Static GitHub Pages website for **NoSubsApps**, the product brand operated by Individual Entrepreneur EasyAI.

## What is inside

- No build step, no npm, no framework.
- Pure HTML, CSS, and JavaScript.
- Custom raw WebGL hero animation written from scratch.
- English and Russian content with a language switcher.
- No analytics, cookies, forms, or tracking scripts.
- Ready for GitHub Pages at `easyai.org.kz`.

## File structure

```text
/
├── index.html                  # Page shell and SEO/meta tags
├── 404.html                    # Redirect fallback to home
├── CNAME                       # Custom domain for GitHub Pages
├── robots.txt                  # Search crawler settings
├── sitemap.xml                 # Sitemap for easyai.org.kz
├── site.webmanifest            # Install/share metadata
└── assets/
    ├── css/styles.css          # Full visual design and responsiveness
    ├── js/content.js           # All texts, links, apps, languages
    ├── js/main.js              # Rendering, language switcher, interactions
    ├── js/webgl-orb.js         # Procedural WebGL animation
    ├── icons/                  # SVG icons
    └── images/                 # Logo, app images, post covers, OG image
```

## Editing content

Most future edits should be made in:

```text
assets/js/content.js
```

### Add a new app

1. Upload the new images into `assets/images/`.
2. Open `assets/js/content.js`.
3. In each language, find:

```js
portfolio: {
  apps: [
    ...
  ]
}
```

4. Copy the existing Pulse Monitor object, paste it under the first object, and change:
   - `name`
   - `category`
   - `icon`
   - `postImage`
   - `text`
   - `badges`
   - `safety`
   - `post`
   - `links`

### Add a new language

1. Add the language to the top list:

```js
languages: [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'es', label: 'ES', name: 'Español' }
]
```

2. Copy the full `en: { ... }` content block.
3. Paste it as `es: { ... }` and translate the strings.
4. The switcher appears automatically.

## Local preview

Because the site uses JavaScript modules, open it through a local server, not by double-clicking `index.html`.

```bash
cd nosubsapps-site
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploy

Read `DEPLOY.md` for the simplest GitHub Pages workflow.
