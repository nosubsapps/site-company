(() => {
  'use strict';

  const site = window.NSA_SITE || {};
  const apps = window.NSA_APPS || [];
  const stories = window.NSA_STORIES || [];

  const state = {
    language: site.defaultLanguage || 'en',
    cleanups: []
  };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const has = (value) => value !== undefined && value !== null;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function localized(entry) {
    return entry?.[state.language] || entry?.[site.defaultLanguage] || entry?.en || entry || {};
  }

  function t(path) {
    const branch = site[state.language] || site[site.defaultLanguage] || site.en || {};
    return path.split('.').reduce((current, key) => current?.[key], branch) ?? '';
  }

  function init() {
    renderLanguageSwitcher();
    renderStaticContent();
    renderApps();
    renderStories();
    bindStaticLinks();
    initCarousels();
  }

  function rerender() {
    cleanupAll();
    renderLanguageSwitcher();
    renderStaticContent();
    renderApps();
    renderStories();
    bindStaticLinks();
    initCarousels();
  }

  function cleanupAll() {
    state.cleanups.forEach((fn) => {
      if (typeof fn === 'function') fn();
    });
    state.cleanups = [];
  }

  function renderLanguageSwitcher() {
    const root = qs('#languageSwitcher');
    if (!root) return;

    root.innerHTML = (site.languages || []).map((language) => `
      <button class="lang-button ${language.code === state.language ? 'is-active' : ''}" type="button" data-lang="${escapeHtml(language.code)}" aria-label="${escapeHtml(language.name || language.label)}">
        ${escapeHtml(language.label || language.code)}
      </button>
    `).join('');

    qsa('[data-lang]', root).forEach((button) => {
      button.addEventListener('click', () => {
        state.language = button.dataset.lang || state.language;
        rerender();
      });
    });
  }

  function renderStaticContent() {
    const langBranch = site[state.language] || site[site.defaultLanguage] || site.en || {};
    document.documentElement.lang = state.language;
    document.title = langBranch.meta?.title || document.title;
    const metaDescription = qs('meta[name="description"]');
    if (metaDescription && langBranch.meta?.description) metaDescription.setAttribute('content', langBranch.meta.description);

    setText('#navApps', t('nav.apps'));
    setText('#navStudio', t('nav.studio'));
    setText('#navContact', t('nav.contact'));

    setText('#heroKicker', t('hero.kicker'));
    setText('#heroTitle', t('hero.title'));
    setText('#heroLead', t('hero.lead'));

    setText('#appsKicker', t('apps.kicker'));
    setText('#appsTitle', t('apps.title'));

    setText('#journalKicker', t('studio.kicker'));
    setText('#journalTitle', t('studio.title'));

    setText('#contactKicker', t('contact.kicker'));
    setText('#contactTitle', t('contact.title'));
    setText('#contactInstagramLabel', t('contact.instagramLabel'));
    setText('#contactEmailLabel', t('contact.emailLabel'));

    setText('#footerLegal', t('footer.legal'));

    qsa('[data-instagram-link]').forEach((link) => link.setAttribute('href', site.shared?.instagramUrl || '#'));
    qsa('[data-email-link]').forEach((link) => link.setAttribute('href', `mailto:${site.shared?.email || ''}`));
  }

  function setText(selector, value) {
    const node = qs(selector);
    if (node && has(value)) node.textContent = value;
  }

  function renderApps() {
    const track = qs('#appsTrack');
    if (!track) return;

    if (!apps.length) {
      track.innerHTML = `<p class="empty-state">${escapeHtml(t('apps.empty'))}</p>`;
      return;
    }

    track.innerHTML = apps.map((app) => {
      const content = localized(app);
      const storeLabel = t('apps.store');
      const readLabel = t('apps.readMore');
      const closeLabel = t('apps.close');
      const paragraphs = (content.post || []).map((line) => `<p>${escapeHtml(line)}</p>`).join('');
      const storeButton = app.appStoreUrl
        ? `<a class="button button-store" href="${escapeHtml(app.appStoreUrl)}" target="_blank" rel="noreferrer">${escapeHtml(storeLabel)}</a>`
        : `<span class="button button-store is-disabled" aria-disabled="true">${escapeHtml(storeLabel)}</span>`;

      return `
        <article class="app-card snap-card" id="app-${escapeHtml(app.id)}">
          <div class="app-media">
            <img src="${escapeHtml(app.image)}" alt="${escapeHtml(content.imageAlt || content.title || '')}" loading="lazy" decoding="async">
          </div>
          <div class="app-copy">
            <p class="card-kicker">${escapeHtml(content.category || '')}</p>
            <h3>${escapeHtml(content.title || '')}</h3>
            <p class="app-summary" data-summary>${escapeHtml(content.text || '')}</p>
            <div class="detail-panel" data-detail>${paragraphs}</div>
            <div class="card-actions">
              <button class="button button-primary" type="button" data-toggle-detail data-open-label="${escapeHtml(readLabel)}" data-close-label="${escapeHtml(closeLabel)}">${escapeHtml(readLabel)}</button>
              ${storeButton}
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindExpandableCards(track);
  }

  function renderStories() {
    const track = qs('#storiesTrack');
    if (!track) return;

    track.innerHTML = stories.map((story) => {
      const content = localized(story);
      const readLabel = t('studio.readMore');
      const closeLabel = t('studio.close');
      const paragraphs = (content.body || []).map((line) => `<p>${escapeHtml(line)}</p>`).join('');

      return `
        <article class="story-card snap-card" id="story-${escapeHtml(story.id)}">
          <div class="story-media">
            <img src="${escapeHtml(story.image)}" alt="${escapeHtml(content.imageAlt || content.title || '')}" loading="lazy" decoding="async">
          </div>
          <div class="story-copy">
            <p class="card-kicker">${escapeHtml(content.kicker || '')}</p>
            <h3>${escapeHtml(content.title || '')}</h3>
            <p class="story-summary" data-summary>${escapeHtml(content.excerpt || '')}</p>
            <div class="detail-panel" data-detail>${paragraphs}</div>
            <div class="card-actions">
              <button class="button button-store" type="button" data-toggle-detail data-open-label="${escapeHtml(readLabel)}" data-close-label="${escapeHtml(closeLabel)}">${escapeHtml(readLabel)}</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindExpandableCards(track);
  }

  function bindExpandableCards(root) {
    qsa('[data-toggle-detail]', root).forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest('.app-card, .story-card');
        if (!card) return;
        const summary = qs('[data-summary]', card);
        const detail = qs('[data-detail]', card);
        const isOpen = detail?.classList.contains('is-visible');

        if (detail) detail.classList.toggle('is-visible', !isOpen);
        if (summary) summary.hidden = !isOpen;
        button.textContent = isOpen ? button.dataset.openLabel : button.dataset.closeLabel;
        if (!isOpen && detail) detail.scrollTop = 0;
      });
    });
  }

  function bindStaticLinks() {
    qsa('[data-instagram-link]').forEach((link) => link.setAttribute('href', site.shared?.instagramUrl || '#'));
    qsa('[data-email-link]').forEach((link) => link.setAttribute('href', `mailto:${site.shared?.email || ''}`));
  }

  function initCarousels() {
    state.cleanups.push(setupCarousel('apps', { autoplay: true, loop: true }));
    state.cleanups.push(setupCarousel('stories', { autoplay: false, loop: false }));
  }

  function setupCarousel(name, options = {}) {
    const shell = qs(`[data-carousel="${name}"]`);
    if (!shell) return () => {};

    const track = qs('[data-carousel-track]', shell);
    const prev = qs('[data-carousel-prev]', shell);
    const next = qs('[data-carousel-next]', shell);
    const dots = qs('[data-carousel-dots]', shell);
    const cards = qsa('.snap-card', track);
    if (!track || !prev || !next || !dots || !cards.length) return () => {};

    const controlWrap = qs('.carousel-controls', shell);

    function usesGridLayout() {
      return window.getComputedStyle(track).display === 'grid';
    }

    function canScroll() {
      if (usesGridLayout()) return false;
      return track.scrollWidth - track.clientWidth > 4;
    }

    function getStep() {
      const first = cards[0];
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '16') || 16;
      return first.getBoundingClientRect().width + gap;
    }

    function getIndex() {
      if (!canScroll()) return 0;
      return Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / getStep())));
    }

    function scrollToIndex(index, behavior = 'smooth') {
      if (!canScroll()) return;
      const bounded = Math.max(0, Math.min(cards.length - 1, index));
      track.scrollTo({ left: bounded * getStep(), behavior });
    }

    function rebuildDots() {
      dots.innerHTML = cards.map((_, index) => `
        <button type="button" class="dot" aria-label="${escapeHtml((t('carousel.next') || 'Next'))} ${index + 1}" data-dot="${index}"></button>
      `).join('');

      qsa('[data-dot]', dots).forEach((dot) => {
        dot.addEventListener('click', () => scrollToIndex(Number(dot.dataset.dot)));
      });
    }

    function update() {
      const scrollable = canScroll() && cards.length > 1;
      shell.classList.toggle('is-static', !scrollable);
      if (controlWrap) controlWrap.hidden = !scrollable;
      prev.disabled = !scrollable || getIndex() <= 0;
      next.disabled = !scrollable || getIndex() >= cards.length - 1;

      const index = getIndex();
      qsa('[data-dot]', dots).forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === index);
      });
    }

    function onPrev() {
      scrollToIndex(getIndex() - 1);
    }

    function onNext() {
      const index = getIndex();
      if (index >= cards.length - 1) {
        if (options.loop) scrollToIndex(0);
        return;
      }
      scrollToIndex(index + 1);
    }

    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);

    rebuildDots();
    update();

    let interval = 0;
    const autoplayDelay = 6500;

    function stopAutoplay() {
      if (interval) {
        window.clearInterval(interval);
        interval = 0;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (!options.autoplay || !canScroll() || cards.length <= 1) return;
      interval = window.setInterval(() => {
        const index = getIndex();
        if (index >= cards.length - 1) scrollToIndex(0);
        else scrollToIndex(index + 1);
      }, autoplayDelay);
    }

    if (options.autoplay) {
      shell.addEventListener('mouseenter', stopAutoplay);
      shell.addEventListener('mouseleave', startAutoplay);
      shell.addEventListener('focusin', stopAutoplay);
      shell.addEventListener('focusout', startAutoplay);
      startAutoplay();
    }

    return () => {
      stopAutoplay();
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      window.removeEventListener('resize', update);
    };
  }

  init();
})();
