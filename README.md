# NoSubsApps website

Static GitHub Pages website for `https://easyai.org.kz`.

No build tools are required. There is no npm, React, Vite, analytics, cookies, or tracking. Upload the files to GitHub Pages and the site works.

## File map

```text
index.html                    Main page structure
404.html                      Not-found page
CNAME                         GitHub Pages custom domain
robots.txt                    Search engine rules
sitemap.xml                   Sitemap
site.webmanifest              App/site manifest
assets/css/styles.css         All design, responsive layout, animation styling
assets/js/main.js             Rendering, language switcher, carousels, modal
assets/js/luxury-scene.js     Lightweight hero canvas effect
assets/js/data/site-content.js Main EN/RU site text
assets/js/data/apps.js        App portfolio data
assets/js/data/stories.js     Manifesto, story, roadmap cards
assets/images/                Logos and post images
assets/icons/                 SVG icons
```

## How to update text

Edit:

```text
assets/js/data/site-content.js
assets/js/data/apps.js
assets/js/data/stories.js
```

The visible page is generated from these files. You do not need to edit `index.html` for ordinary text changes.

## How to add a new app

Read `ADD_APPS.md`. Short version:

1. Put the app artwork into `assets/images/`.
2. Open `assets/js/data/apps.js`.
3. Copy the Pulse Monitor object.
4. Paste it after the last app object.
5. Change `id`, `image`, English text, Russian text, links, badges, and post text.
6. Save and upload.

The carousel updates automatically.

## How to add a new language later

1. Open `assets/js/data/site-content.js`.
2. Add the language to `languages`, for example `{ code: 'es', label: 'ES', name: 'Español' }`.
3. Copy the `en` block and rename it to `es`.
4. Translate the text.
5. In `apps.js` and `stories.js`, add `es: { ... }` blocks inside each app/story.

If a translation is missing, the site falls back to English.

## Local preview

From inside the site folder:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## GitHub Pages upload

Upload the contents of this folder to the root of the GitHub Pages repository. The root must contain `index.html`, `CNAME`, and the `assets/` folder.
