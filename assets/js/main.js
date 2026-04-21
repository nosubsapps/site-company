(() => {
  'use strict';

  const site = window.NSA_SITE || {};
  const apps = window.NSA_APPS || [];
  const stories = window.NSA_STORIES || [];
  const storageKey = 'nosubsapps.language';
  const fallbackLang = site.defaultLanguage || 'en';
  const supported = new Set((site.languages || []).map((item) => item.code));

  const qs = (selector, parent = document) => parent.querySelector(selector);
  const qsa = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const state = {
    lang: getInitialLanguage(),
    carousels: []
  };

  document.addEventListener('DOMContentLoaded', () => {
    bindStaticEvents();
    render();
  });

  function getInitialLanguage() {
    const fromStorage = localStorage.getItem(storageKey);
    if (fromStorage && supported.has(fromStorage)) return fromStorage;

    const htmlLang = document.documentElement.lang;
    if (htmlLang && supported.has(htmlLang)) return htmlLang;

    const browser = (navigator.language || '').slice(0, 2).toLowerCase();
    if (supported.has(browser)) return browser;

    return fallbackLang;
  }

  function t(path) {
    const chunks = path.split('.');
    let value = site[state.lang] || site[fallbackLang] || {};

    for (const chunk of chunks) {
      if (!value || typeof value !== 'object') return path;
      value = value[chunk];
    }

    if (value === undefined || value === null) {
      let fallback = site[fallbackLang] || {};
      for (const chunk of chunks) {
        if (!fallback || typeof fallback !== 'object') return path;
        fallback = fallback[chunk];
      }
      return fallback ?? path;
    }

    return value;
  }

  function localized(entry) {
    return entry[state.lang] || entry[fallbackLang] || entry.en || entry.ru || {};
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function render() {
    document.documentElement.lang = state.lang;
    setMeta();
    setStaticText();
    renderLanguageSwitcher();
    renderTicker();
    renderPrinciples();
    renderApps();
    renderStories();
    updateCarouselLabels();
    initCarousels();
  }

  function setMeta() {
    document.title = t('meta.title');
    const description = qs('meta[name="description"]');
    if (description) description.content = t('meta.description');
    const ogTitle = qs('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = t('meta.title');
    const ogDescription = qs('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = t('meta.description');
  }

  function setStaticText() {
    const map = {
      navApps: t('nav.apps'),
      navManifesto: t('nav.manifesto'),
      navStory: t('nav.story'),
      navRoadmap: t('nav.roadmap'),
      navContact: t('nav.contact'),
      heroKicker: t('hero.kicker'),
      heroTitle: t('hero.title'),
      heroLead: t('hero.lead'),
      heroPrimary: t('hero.primaryAction'),
      heroSecondary: t('hero.secondaryAction'),
      heroVisualTitle: t('hero.visualTitle'),
      principlesKicker: t('principles.kicker'),
      principlesTitle: t('principles.title'),
      principlesLead: t('principles.lead'),
      appsKicker: t('apps.kicker'),
      appsTitle: t('apps.title'),
      appsLead: t('apps.lead'),
      journalKicker: t('journal.kicker'),
      journalTitle: t('journal.title'),
      journalLead: t('journal.lead'),
      contactKicker: t('contact.kicker'),
      contactTitle: t('contact.title'),
      contactLead: t('contact.lead'),
      contactEmailLabel: t('contact.emailLabel'),
      contactInstagramLabel: t('contact.instagramLabel'),
      contactPrivacyLabel: t('contact.privacyLabel'),
      contactCopyEmail: t('contact.copyEmail'),
      footerLegal: t('footer.legal'),
      footerPrivacy: t('footer.privacy'),
      modalClose: t('modal.close')
    };

    Object.entries(map).forEach(([id, value]) => {
      const element = qs(`#${id}`);
      if (element) element.textContent = value;
    });

    const emailLinks = qsa('[data-email-link]');
    emailLinks.forEach((link) => {
      link.textContent = site.shared.email;
      link.setAttribute('href', `mailto:${site.shared.email}`);
    });

    qsa('[data-instagram-link]').forEach((link) => link.setAttribute('href', site.shared.instagramUrl));
    qsa('[data-privacy-link]').forEach((link) => link.setAttribute('href', site.shared.privacyUrl));
  }

  function renderLanguageSwitcher() {
    const holder = qs('#languageSwitcher');
    if (!holder) return;

    holder.innerHTML = (site.languages || []).map((language) => `
      <button class="lang-button${language.code === state.lang ? ' is-active' : ''}" type="button" data-lang="${escapeHtml(language.code)}" aria-pressed="${language.code === state.lang}">
        ${escapeHtml(language.label)}
      </button>
    `).join('');

    qsa('[data-lang]', holder).forEach((button) => {
      button.addEventListener('click', () => {
        const next = button.dataset.lang;
        if (!next || next === state.lang) return;
        state.lang = next;
        localStorage.setItem(storageKey, next);
        render();
      });
    });
  }

  function renderTicker() {
    const holder = qs('#policyPills');
    if (!holder) return;

    const items = t('ticker') || [];
    holder.innerHTML = items.map((item) => `<span>${escapeHtml(item)}</span>`).join('');

    const heroChips = qs('#heroChips');
    if (heroChips) {
      heroChips.innerHTML = (t('hero.chips') || []).map((chip) => `<span>${escapeHtml(chip)}</span>`).join('');
    }
  }

  function renderPrinciples() {
    const holder = qs('#principlesGrid');
    if (!holder) return;

    const items = t('principles.items') || [];
    holder.innerHTML = items.map((item, index) => `
      <article class="principle-card">
        <span class="principle-number">${String(index + 1).padStart(2, '0')}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>
    `).join('');
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
      const badges = (content.badges || []).map((badge) => `<span>${escapeHtml(badge)}</span>`).join('');
      const privacyUrl = app.privacyUrl || site.shared.privacyUrl;
      const instagramUrl = app.instagramUrl || site.shared.instagramUrl;

      return `
        <article class="app-card snap-card" id="app-${escapeHtml(app.id)}" data-app-id="${escapeHtml(app.id)}">
          <div class="app-media">
            <img src="${escapeHtml(app.image)}" alt="${escapeHtml(content.imageAlt || content.title)}" loading="lazy" decoding="async">
          </div>
          <div class="app-copy">
            <p class="card-kicker">${escapeHtml(content.category || '')}</p>
            <h3>${escapeHtml(content.title || '')}</h3>
            <p class="app-text">${escapeHtml(content.text || '')}</p>
            <div class="mini-badges">${badges}</div>
            <p class="safety-note">${escapeHtml(content.safety || '')}</p>
            <div class="card-actions">
              <button class="button button-primary" type="button" data-open-app="${escapeHtml(app.id)}">${escapeHtml(content.primaryAction || t('journal.read'))}</button>
              <a class="button button-ghost" href="${escapeHtml(privacyUrl)}" target="_blank" rel="noreferrer">${escapeHtml(content.secondaryAction || t('footer.privacy'))}</a>
              <a class="icon-link" href="${escapeHtml(instagramUrl)}" target="_blank" rel="noreferrer" aria-label="Instagram">↗</a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    qsa('[data-open-app]', track).forEach((button) => {
      button.addEventListener('click', () => {
        const app = apps.find((item) => item.id === button.dataset.openApp);
        if (app) openAppModal(app);
      });
    });
  }

  function renderStories() {
    const track = qs('#storiesTrack');
    if (!track) return;

    track.innerHTML = stories.map((story) => {
      const content = localized(story);
      return `
        <article class="story-card snap-card" id="story-${escapeHtml(story.id)}" data-story-id="${escapeHtml(story.id)}">
          <div class="story-media">
            <img src="${escapeHtml(story.image)}" alt="${escapeHtml(content.imageAlt || content.title)}" loading="lazy" decoding="async">
          </div>
          <div class="story-copy">
            <p class="card-kicker">${escapeHtml(content.kicker || '')}</p>
            <h3>${escapeHtml(content.title || '')}</h3>
            <p>${escapeHtml(content.excerpt || '')}</p>
            <button class="button button-ghost" type="button" data-open-story="${escapeHtml(story.id)}">${escapeHtml(t('journal.read'))}</button>
          </div>
        </article>
      `;
    }).join('');

    qsa('[data-open-story]', track).forEach((button) => {
      button.addEventListener('click', () => {
        const story = stories.find((item) => item.id === button.dataset.openStory);
        if (story) openStoryModal(story);
      });
    });
  }

  function updateCarouselLabels() {
    qsa('[data-carousel-prev]').forEach((button) => button.setAttribute('aria-label', t('carousel.previous')));
    qsa('[data-carousel-next]').forEach((button) => button.setAttribute('aria-label', t('carousel.next')));
  }

  function initCarousels() {
    state.carousels.forEach((cleanup) => cleanup());
    state.carousels = [];

    state.carousels.push(setupCarousel('apps'));
    state.carousels.push(setupCarousel('stories'));
  }

  function setupCarousel(name) {
    const shell = qs(`[data-carousel="${name}"]`);
    if (!shell) return () => {};

    const track = qs('[data-carousel-track]', shell);
    const prev = qs('[data-carousel-prev]', shell);
    const next = qs('[data-carousel-next]', shell);
    const dots = qs('[data-carousel-dots]', shell);
    const cards = qsa('.snap-card', track);

    if (!track || !prev || !next || !dots || !cards.length) return () => {};

    const canSlide = cards.length > 1;
    shell.classList.toggle('is-single', !canSlide);
    prev.disabled = !canSlide;
    next.disabled = !canSlide;

    dots.innerHTML = cards.map((_, index) => `
      <button type="button" class="dot" aria-label="${escapeHtml(t('carousel.next'))} ${index + 1}" data-dot="${index}"></button>
    `).join('');

    const dotButtons = qsa('[data-dot]', dots);

    const getStep = () => {
      const card = cards[0];
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '16') || 16;
      return card.getBoundingClientRect().width + gap;
    };

    const getIndex = () => Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / getStep())));

    const scrollToIndex = (index) => {
      const target = Math.max(0, Math.min(cards.length - 1, index));
      track.scrollTo({ left: target * getStep(), behavior: 'smooth' });
    };

    const update = () => {
      const index = getIndex();
      prev.disabled = !canSlide || index <= 0;
      next.disabled = !canSlide || index >= cards.length - 1;
      dotButtons.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index));
    };

    const onPrev = () => scrollToIndex(getIndex() - 1);
    const onNext = () => scrollToIndex(getIndex() + 1);
    const onScroll = () => window.requestAnimationFrame(update);

    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    track.addEventListener('scroll', onScroll, { passive: true });
    dotButtons.forEach((dot) => dot.addEventListener('click', () => scrollToIndex(Number(dot.dataset.dot))));
    update();

    return () => {
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      track.removeEventListener('scroll', onScroll);
    };
  }

  function bindStaticEvents() {
    const copyEmail = qs('#copyEmail');
    if (copyEmail) {
      copyEmail.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(site.shared.email);
          copyEmail.textContent = t('ui.copied');
        } catch (error) {
          copyEmail.textContent = t('ui.copyFailed');
        }
        window.setTimeout(() => {
          copyEmail.textContent = t('contact.copyEmail');
        }, 1600);
      });
    }

    qsa('[data-story-nav]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const id = link.dataset.storyNav;
        qs('#journal')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => centerStory(id), 260);
      });
    });

    const dialog = qs('#detailModal');
    if (dialog) {
      dialog.addEventListener('click', (event) => {
        const box = qs('.modal-box', dialog);
        if (box && !box.contains(event.target)) closeModal();
      });
      qs('#modalClose')?.addEventListener('click', closeModal);
    }
  }

  function centerStory(id) {
    const track = qs('#storiesTrack');
    const card = qs(`#story-${CSS.escape(id)}`);
    if (!track || !card) return;
    const left = card.offsetLeft - track.offsetLeft;
    track.scrollTo({ left, behavior: 'smooth' });
  }

  function openAppModal(app) {
    const content = localized(app);
    const paragraphs = (content.post || []).map((line) => `<p>${escapeHtml(line)}</p>`).join('');
    openModal({
      kicker: t('modal.post'),
      title: content.postTitle || content.title,
      image: app.image,
      imageAlt: content.imageAlt || content.title,
      bodyHtml: paragraphs,
      actionsHtml: `
        <a class="button button-primary" href="${escapeHtml(app.instagramUrl || site.shared.instagramUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('ui.instagram'))}</a>
        <a class="button button-ghost" href="${escapeHtml(app.privacyUrl || site.shared.privacyUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('ui.privacy'))}</a>
      `
    });
  }

  function openStoryModal(story) {
    const content = localized(story);
    const paragraphs = (content.body || []).map((line, index) => {
      const isHeading = index === 0 || line.endsWith(':');
      return isHeading ? `<p class="modal-lead">${escapeHtml(line)}</p>` : `<p>${escapeHtml(line)}</p>`;
    }).join('');
    openModal({
      kicker: content.kicker,
      title: content.title,
      image: story.image,
      imageAlt: content.imageAlt || content.title,
      bodyHtml: paragraphs,
      actionsHtml: `<a class="button button-primary" href="${escapeHtml(site.shared.instagramUrl)}" target="_blank" rel="noreferrer">${escapeHtml(t('ui.instagram'))}</a>`
    });
  }

  function openModal({ kicker, title, image, imageAlt, bodyHtml, actionsHtml }) {
    const dialog = qs('#detailModal');
    if (!dialog) return;

    qs('#modalKicker').textContent = kicker || '';
    qs('#modalTitle').textContent = title || '';
    qs('#modalImage').src = image || '';
    qs('#modalImage').alt = imageAlt || '';
    qs('#modalBody').innerHTML = bodyHtml || '';
    qs('#modalActions').innerHTML = actionsHtml || '';

    document.body.classList.add('modal-open');
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeModal() {
    const dialog = qs('#detailModal');
    if (!dialog) return;
    document.body.classList.remove('modal-open');
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }
})();
