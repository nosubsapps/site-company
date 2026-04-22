# How to add a new app

You do not need to edit `index.html` or `assets/css/styles.css` to add another app.

## 1. Add the image

Put the new image into:

```text
assets/images/
```

Example:

```text
assets/images/my-new-app.jpg
```

## 2. Open the data file

Edit:

```text
assets/js/data/apps.js
```

## 3. Copy an existing app object

Copy the whole `pulse-monitor` object and paste it below the last app.

## 4. Change only these fields

```js
id: 'my-new-app',
image: 'assets/images/my-new-app.jpg',
icon: 'assets/images/pulse-icon.png',
appStoreUrl: '',
instagramUrl: 'https://www.instagram.com/no_subs_apps',
privacyUrl: 'https://privacy.easyai.org.kz',
```

Then replace the English and Russian text blocks:

```js
en: {
  title: 'My New App',
  category: 'Category',
  imageAlt: 'Description of the image',
  text: 'Short one-paragraph app description.',
  post: [
    'Paragraph 1.',
    'Paragraph 2.'
  ]
},
ru: {
  title: 'Моё новое приложение',
  category: 'Категория',
  imageAlt: 'Описание изображения',
  text: 'Короткое описание приложения.',
  post: [
    'Абзац 1.',
    'Абзац 2.'
  ]
}
```

## 5. Save and upload

After saving `apps.js` and uploading the new image, the app appears automatically in the portfolio carousel.
