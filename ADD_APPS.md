# Adding new apps to the portfolio

The website is designed so that new apps are added by editing one data file, not by rewriting the page.

Main file:

```text
assets/js/data/apps.js
```

## Step-by-step

### 1. Add the image

Put the app image into:

```text
assets/images/
```

Recommended file style:

```text
my-app-post.jpg
my-app-icon.png
```

Use a clear square or vertical artwork. The site crops it automatically for desktop and mobile cards.

### 2. Open `apps.js`

Inside you will see:

```js
window.NSA_APPS = [
  {
    id: 'pulse-monitor',
    image: 'assets/images/pulse-post.jpg',
    icon: 'assets/images/pulse-icon.png',
    ...
  }
];
```

### 3. Copy the full Pulse Monitor block

Copy from the opening `{` before `id: 'pulse-monitor'` to the closing `}` of that app.

### 4. Paste after the last app

If there is already one app, add a comma after it and paste the new one:

```js
window.NSA_APPS = [
  {
    id: 'pulse-monitor',
    ...
  },
  {
    id: 'new-app',
    ...
  }
];
```

### 5. Change these fields

```js
id: 'new-app'
image: 'assets/images/new-app-post.jpg'
icon: 'assets/images/new-app-icon.png'
appStoreUrl: ''
instagramUrl: 'https://www.instagram.com/no_subs_apps'
privacyUrl: 'https://privacy.easyai.org.kz'
```

Then change the language blocks:

```js
en: {
  title: 'New App',
  category: 'Category',
  imageAlt: 'Description of the image',
  text: 'Short description for the card.',
  badges: ['Badge 1', 'Badge 2', 'Badge 3'],
  safety: 'Optional note.',
  primaryAction: 'Read post',
  secondaryAction: 'Privacy policy',
  postTitle: 'Post title',
  post: [
    'Paragraph 1.',
    'Paragraph 2.'
  ]
},
ru: {
  title: 'Новое приложение',
  category: 'Категория',
  imageAlt: 'Описание картинки',
  text: 'Короткое описание для карточки.',
  badges: ['Бейдж 1', 'Бейдж 2', 'Бейдж 3'],
  safety: 'Дополнительная заметка.',
  primaryAction: 'Читать пост',
  secondaryAction: 'Политика приватности',
  postTitle: 'Заголовок поста',
  post: [
    'Абзац 1.',
    'Абзац 2.'
  ]
}
```

### 6. Rules that prevent errors

- Every app must have a unique `id`.
- Use only lowercase English letters, numbers, and hyphens in `id`.
- Keep commas between app objects.
- Keep quotation marks around text.
- Do not remove `window.NSA_APPS = [` at the top or `];` at the bottom.
- If you do not have an App Store link yet, leave `appStoreUrl: ''`.

## What updates automatically

After saving `apps.js`, the site automatically updates:

- app carousel;
- app card;
- badges;
- modal with full post;
- language switcher content;
- privacy and Instagram links.

No HTML changes are needed.
