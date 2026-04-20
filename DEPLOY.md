# Деплой на GitHub Pages

## Самый простой способ через сайт GitHub

1. Скачайте архив `nosubsapps-site.zip`.
2. Распакуйте архив.
3. Откройте репозиторий GitHub Pages, который сейчас показывает сайт `easyai.org.kz`.
4. Нажмите **Add file → Upload files**.
5. Перетащите **содержимое папки** `nosubsapps-site`, а не саму папку. В корне репозитория должны лежать:
   - `index.html`
   - `CNAME`
   - `404.html`
   - `robots.txt`
   - `sitemap.xml`
   - `site.webmanifest`
   - папка `assets/`
6. Нажмите **Commit changes** прямо в `main`.
7. Откройте **Settings → Pages**.
8. В **Build and deployment** выберите:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
9. В **Custom domain** должно быть `easyai.org.kz`.
10. Когда станет доступно, включите **Enforce HTTPS**.

## Если репозиторий публикуется из папки `/docs`

Есть два варианта:

- проще: в **Settings → Pages** переключить Folder на **/root**;
- либо: перенести все файлы из архива в папку `docs/`, включая `CNAME`.

## Важно про CNAME

Файл `CNAME` уже есть в архиве и содержит только:

```text
easyai.org.kz
```

Не переименовывайте его и не добавляйте туда вторую строку.

## Что менять в будущем

- Тексты, языки, приложения, ссылки: `assets/js/content.js`
- Визуальный стиль: `assets/css/styles.css`
- Основная структура страницы: `index.html`
- WebGL-анимация в hero: `assets/js/webgl-orb.js`
- Картинки: `assets/images/`
- Иконки: `assets/icons/`

## Быстрая проверка перед публикацией

Локально:

```bash
cd nosubsapps-site
python3 -m http.server 8080
```

Откройте `http://localhost:8080` и проверьте:

- переключение EN/RU;
- ссылки на Instagram, email и privacy;
- мобильный вид;
- что в корне есть `CNAME`;
- что картинки открываются.
