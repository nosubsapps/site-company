import { siteContent } from './content.js';

const SELECTORS = {
  header: '[data-header]',
  nav: '[data-nav]',
  navToggle: '[data-nav-toggle]',
  navLink: '[data-nav-link]',
  languageSwitcher: '[data-language-switcher]',
  backToTop: '[data-back-to-top]'
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const html = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const isExternalUrl = (href = '') => /^https?:\/\//i.test(href);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let revealObserver;

function getInitialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  if (siteContent.languages.some((lang) => lang.code === queryLanguage)) return queryLanguage;

  try {
    const savedLanguage = localStorage.getItem('nosubsapps-language');
    if (siteContent.languages.some((lang) => lang.code === savedLanguage)) return savedLanguage;
  } catch (_) {
    // Local storage may be unavailable in private browsing modes.
  }

  return siteContent.defaultLanguage;
}

let currentLanguage = getInitialLanguage();

function t() {
  return siteContent[currentLanguage] ?? siteContent[siteContent.defaultLanguage];
}

function getByPath(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

function linkAttrs(item) {
  const external = item.external || isExternalUrl(item.href);
  return external ? ' target="_blank" rel="noopener noreferrer"' : '';
}

function renderTextBindings(content) {
  $$('[data-render]').forEach((element) => {
    const value = getByPath(content, element.dataset.render);
    if (typeof value === 'string') element.textContent = value;
  });
}

function renderNavigation(content) {
  Object.entries(content.nav).forEach(([key, label]) => {
    const link = $(`[data-nav-key="${key}"]`);
    if (link) link.textContent = label;
  });
}

function renderLanguageSwitcher() {
  const switcher = $(SELECTORS.languageSwitcher);
  if (!switcher) return;

  switcher.innerHTML = siteContent.languages.map((language) => `
    <button class="language-button" type="button" data-language="${html(language.code)}" aria-pressed="${language.code === currentLanguage}">
      ${html(language.label)}
    </button>
  `).join('');

  $$('[data-language]', switcher).forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language, { save: true, updateUrl: true }));
  });
}

function updateLanguageButtons() {
  $$('[data-language]').forEach((button) => {
    const isActive = button.dataset.language === currentLanguage;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderHero(content) {
  const actions = $('[data-hero-actions]');
  if (actions) {
    actions.innerHTML = content.hero.actions.map((action) => `
      <a class="button ${action.style === 'primary' ? 'button-primary' : 'button-ghost'}" href="${html(action.href)}"${linkAttrs(action)}>
        ${html(action.label)}
      </a>
    `).join('');
  }

  const stats = $('[data-stats]');
  if (stats) {
    stats.innerHTML = content.stats.map((stat) => `
      <div class="stat-card">
        <strong>${html(stat.value)}</strong>
        <span>${html(stat.label)}</span>
      </div>
    `).join('');
  }

  const ticker = $('[data-ticker]');
  if (ticker) {
    const items = [...content.ticker, ...content.ticker];
    ticker.innerHTML = `<div class="ticker-track">${items.map((item) => `<span>${html(item)}</span>`).join('')}</div>`;
  }
}

function renderPrinciples(content) {
  const grid = $('[data-principles-grid]');
  if (!grid) return;

  grid.innerHTML = content.principles.items.map((item, index) => `
    <article class="principle-card reveal" data-tilt style="--delay: ${index * 70}ms">
      <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
      <h3>${html(item.title)}</h3>
      <p>${html(item.text)}</p>
    </article>
  `).join('');
}

function renderDetails(summaryLabel, paragraphs, className = 'read-more') {
  return `
    <details class="${className}">
      <summary>
        <span>${html(summaryLabel)}</span>
        <span class="summary-icon" aria-hidden="true"></span>
      </summary>
      <div class="details-body">
        ${paragraphs.map((paragraph) => `<p>${html(paragraph)}</p>`).join('')}
      </div>
    </details>
  `;
}

function renderApps(content) {
  const grid = $('[data-apps-grid]');
  if (!grid) return;

  grid.innerHTML = content.portfolio.apps.map((app, index) => `
    <article class="app-card reveal" style="--delay: ${index * 90}ms">
      <div class="app-visual" data-tilt>
        <div class="app-icon-wrap">
          <img class="app-icon" src="${html(app.icon)}" alt="${html(app.name)} icon" width="220" height="220" loading="lazy" decoding="async">
        </div>
        <img class="app-post-image" src="${html(app.postImage)}" alt="${html(app.alt)}" width="853" height="1280" loading="lazy" decoding="async">
      </div>
      <div class="app-content">
        <p class="eyebrow">${html(app.category)}</p>
        <h3>${html(app.name)}</h3>
        <p class="app-description">${html(app.text)}</p>
        <div class="badge-row">
          ${app.badges.map((badge) => `<span>${html(badge)}</span>`).join('')}
        </div>
        <p class="safety-note">${html(app.safety)}</p>
        <div class="post-excerpt">
          <h4>${html(app.post.title)}</h4>
          <p>${html(app.post.intro)}</p>
          ${renderDetails(app.post.summaryLabel, app.post.paragraphs)}
        </div>
        <div class="inline-actions">
          ${app.links.map((link) => `
            <a class="text-link" href="${html(link.href)}"${linkAttrs(link)}>${html(link.label)}</a>
          `).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function renderManifesto(content) {
  const lines = $('[data-manifesto-lines]');
  if (!lines) return;

  lines.innerHTML = `
    <p class="panel-intro">${html(content.manifesto.intro)}</p>
    <div class="manifesto-bullets">
      ${content.manifesto.bullets.map((bullet) => `<span>${html(bullet)}</span>`).join('')}
    </div>
    ${renderDetails(content.manifesto.summaryLabel, content.manifesto.paragraphs, 'read-more read-more-open')}
  `;
}

function renderStory(content) {
  const container = $('[data-story-content]');
  if (!container) return;

  container.innerHTML = `
    <p class="panel-intro">${html(content.story.intro)}</p>
    ${renderDetails(content.story.summaryLabel, content.story.paragraphs, 'read-more read-more-open')}
  `;
}

function renderRoadmap(content) {
  const cards = $('[data-roadmap-cards]');
  if (!cards) return;

  cards.innerHTML = content.roadmap.cards.map((card, index) => `
    <article class="roadmap-card reveal" style="--delay: ${index * 80}ms">
      <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
      <h3>${html(card.title)}</h3>
      <ul>
        ${card.items.map((item) => `<li>${html(item)}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

function renderContact(content) {
  const cards = $('[data-contact-cards]');
  if (!cards) return;

  cards.innerHTML = content.contact.cards.map((card) => {
    const isEmail = card.href.startsWith('mailto:');
    return `
      <article class="contact-card">
        <span>${html(card.label)}</span>
        <a href="${html(card.href)}"${linkAttrs(card)}>${html(card.value)}</a>
        ${isEmail
          ? `<button class="mini-button" type="button" data-copy-email="${html(card.value)}">${html(card.action)}</button>`
          : `<a class="mini-button" href="${html(card.href)}"${linkAttrs(card)}>${html(card.action)}</a>`}
      </article>
    `;
  }).join('');
}

function renderFooter(content) {
  const legal = $('[data-footer-legal]');
  if (legal) legal.textContent = content.footer.legal;

  const privacy = $('[data-footer-privacy]');
  if (privacy) privacy.textContent = content.footer.privacy;

  const topButton = $(SELECTORS.backToTop);
  if (topButton) topButton.setAttribute('aria-label', content.ui.backToTop);
}

function updateMeta(content) {
  document.documentElement.lang = currentLanguage;
  document.title = content.meta.title;

  const description = $('meta[name="description"]');
  if (description) description.setAttribute('content', content.meta.description);

  const ogTitle = $('meta[property="og:title"]');
  const ogDescription = $('meta[property="og:description"]');
  const twitterTitle = $('meta[name="twitter:title"]');
  const twitterDescription = $('meta[name="twitter:description"]');

  if (ogTitle) ogTitle.setAttribute('content', content.meta.title);
  if (ogDescription) ogDescription.setAttribute('content', content.meta.description);
  if (twitterTitle) twitterTitle.setAttribute('content', content.meta.title);
  if (twitterDescription) twitterDescription.setAttribute('content', content.meta.description);
}

function renderPage() {
  const content = t();
  updateMeta(content);
  renderTextBindings(content);
  renderNavigation(content);
  renderLanguageSwitcher();
  renderHero(content);
  renderPrinciples(content);
  renderApps(content);
  renderManifesto(content);
  renderStory(content);
  renderRoadmap(content);
  renderContact(content);
  renderFooter(content);
  updateLanguageButtons();
  setupDynamicInteractions();
}

function setLanguage(language, options = {}) {
  if (!siteContent.languages.some((lang) => lang.code === language)) return;
  currentLanguage = language;

  if (options.save) {
    try {
      localStorage.setItem('nosubsapps-language', language);
    } catch (_) {
      // Ignore storage failures.
    }
  }

  if (options.updateUrl) {
    const url = new URL(window.location.href);
    if (language === siteContent.defaultLanguage) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', language);
    }
    window.history.replaceState({}, '', url);
  }

  renderPage();
}

function setupHeader() {
  const header = $(SELECTORS.header);
  const nav = $(SELECTORS.nav);
  const toggle = $(SELECTORS.navToggle);
  if (!header || !nav || !toggle) return;

  const updateHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
    document.body.classList.toggle('nav-open', !expanded);
  });

  $$(SELECTORS.navLink).forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    });
  });
}

function setupActiveNavigation() {
  const links = $$(SELECTORS.navLink);
  const sections = links
    .map((link) => $(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

function setupRevealAnimations() {
  if (revealObserver) revealObserver.disconnect();

  const elements = $$('.reveal');
  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  elements.forEach((element) => revealObserver.observe(element));
}

function setupTilt() {
  if (prefersReducedMotion || matchMedia('(pointer: coarse)').matches) return;

  $$('[data-tilt]').forEach((element) => {
    if (element.dataset.tiltReady === 'true') return;
    element.dataset.tiltReady = 'true';

    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty('--rx', `${(-y * 9).toFixed(2)}deg`);
      element.style.setProperty('--ry', `${(x * 11).toFixed(2)}deg`);
      element.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
      element.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
    });

    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--rx', '0deg');
      element.style.setProperty('--ry', '0deg');
      element.style.setProperty('--mx', '50%');
      element.style.setProperty('--my', '50%');
    });
  });
}

function setupCopyButtons() {
  $$('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copyEmail;
      const originalText = button.textContent;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = t().ui.copied;
      } catch (_) {
        button.textContent = t().ui.copyFailed;
      }
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    });
  });
}

function setupBackToTop() {
  const button = $(SELECTORS.backToTop);
  if (!button) return;

  const update = () => {
    button.classList.toggle('is-visible', window.scrollY > 760);
  };

  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function setupCursorAura() {
  if (prefersReducedMotion || matchMedia('(pointer: coarse)').matches) return;

  window.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
  }, { passive: true });
}

function setupDynamicInteractions() {
  setupRevealAnimations();
  setupTilt();
  setupCopyButtons();
}

async function setupOrbitalCanvas() {
  const canvas = $('#orbital-canvas');
  if (!canvas) return;

  try {
    const module = await import('./webgl-orb.js');
    module.initOrbitalCanvas(canvas, { reducedMotion: prefersReducedMotion });
  } catch (error) {
    canvas.remove();
    console.warn('WebGL hero disabled:', error);
  }
}

renderPage();
setupHeader();
setupActiveNavigation();
setupBackToTop();
setupCursorAura();
setupOrbitalCanvas();
