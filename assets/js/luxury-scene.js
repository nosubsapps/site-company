(() => {
  'use strict';

  const canvas = document.querySelector('#luxuryCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallScreen = window.matchMedia('(max-width: 720px)').matches;
  const animated = !reduceMotion && !smallScreen;
  const particles = Array.from({ length: animated ? 42 : 18 }, (_, index) => ({
    seed: index * 37.71,
    radius: 1.5 + (index % 5) * 0.55,
    layer: 0.5 + (index % 7) / 7
  }));

  let width = 0;
  let height = 0;
  let raf = 0;
  let start = performance.now();

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(performance.now());
  }

  function orb(x, y, radius, colorA, colorB) {
    const gradient = ctx.createRadialGradient(x - radius * 0.28, y - radius * 0.36, radius * 0.08, x, y, radius);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(0.58, colorB);
    gradient.addColorStop(1, 'rgba(7, 7, 12, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function draw(now) {
    const t = (now - start) / 1000;
    ctx.clearRect(0, 0, width, height);

    const cx = width * 0.54;
    const cy = height * 0.46;
    const drift = animated ? Math.sin(t * 0.55) * 10 : 0;

    ctx.globalCompositeOperation = 'screen';
    orb(cx + drift, cy - 8, Math.min(width, height) * 0.48, 'rgba(222, 214, 255, 0.46)', 'rgba(110, 65, 255, 0.24)');
    orb(width * 0.26, height * 0.72, Math.min(width, height) * 0.38, 'rgba(255, 255, 255, 0.28)', 'rgba(125, 76, 255, 0.18)');
    orb(width * 0.8, height * 0.22, Math.min(width, height) * 0.26, 'rgba(255, 230, 168, 0.22)', 'rgba(255, 255, 255, 0.04)');

    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i += 1) {
      const y = height * 0.18 + i * height * 0.09;
      ctx.beginPath();
      ctx.moveTo(width * 0.15, y + Math.sin(t + i) * 2);
      ctx.bezierCurveTo(width * 0.38, y - 24, width * 0.68, y + 28, width * 0.92, y - 10);
      ctx.stroke();
    }

    particles.forEach((p) => {
      const angle = p.seed + t * (0.1 + p.layer * 0.12);
      const x = cx + Math.cos(angle) * width * (0.12 + p.layer * 0.32);
      const y = cy + Math.sin(angle * 0.82) * height * (0.08 + p.layer * 0.25);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + p.layer * 0.32})`;
      ctx.beginPath();
      ctx.arc(x, y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function loop(now) {
    draw(now);
    raf = window.requestAnimationFrame(loop);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  if (animated) raf = window.requestAnimationFrame(loop);
  else resize();

  window.addEventListener('pagehide', () => {
    if (raf) window.cancelAnimationFrame(raf);
    observer.disconnect();
  });
})();
