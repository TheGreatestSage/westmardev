// The site is light only now; drop the old dark-mode preference if a visitor still has one.
try { localStorage.removeItem('theme'); } catch (e) {}

// Mobile menu (under 760px) — full-screen panel below the nav bar. While it is open the
// rest of the page is inert and can't scroll, Tab stays inside, and Escape closes it.
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('nav-panel');
  if (!toggle || !panel) return;

  const wide = window.matchMedia('(min-width: 760px)');
  const background = () => [document.querySelector('.skip-link'), document.querySelector('.ribbon'),
    document.querySelector('main'), document.querySelector('.site-footer')].filter(Boolean);
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const setOpen = (open, returnFocus) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    document.documentElement.classList.toggle('menu-open', open);
    background().forEach((el) => { el.inert = open; });
    if (!open && returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false, true);
    } else if (e.key === 'Tab') {
      const stops = [toggle, ...panel.querySelectorAll('a[href]')];
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!stops.includes(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });

  wide.addEventListener('change', () => { if (wide.matches && isOpen()) setOpen(false); });
})();

// FAQ accordion — one item open at a time per list, the first open on load.
(() => {
  document.querySelectorAll('.faq-list').forEach((list) => {
    const items = Array.from(list.querySelectorAll('.faq-item'));

    const setOpen = (item, open) => {
      item.querySelector('.faq-q').setAttribute('aria-expanded', String(open));
      item.querySelector('.faq-sign').textContent = open ? '−' : '+';
      item.querySelector('.faq-a').hidden = !open;
    };

    items.forEach((item) => {
      item.querySelector('.faq-q').addEventListener('click', () => {
        const willOpen = item.querySelector('.faq-q').getAttribute('aria-expanded') !== 'true';
        items.forEach((other) => setOpen(other, false));
        if (willOpen) setOpen(item, true);
      });
    });
  });
})();

// Live numbers on Home — Voyager's odometer (370 km/s since page load) and YourBPM's
// wobble. Updates every 200ms, stop while the tab is hidden, and fall back to the
// design's static values (60 seconds in) when reduced motion is preferred. The digits
// are aria-hidden, so screen readers never hear them change.
(() => {
  const km = document.querySelector('[data-live="km"]');
  const bpm = document.querySelector('[data-live="bpm"]');
  if (!km && !bpm) return;

  const t0 = Date.now();
  const still = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer = null;

  const render = (s) => {
    if (km) km.textContent = Math.floor(s * 370).toLocaleString('en-US');
    if (bpm) bpm.textContent = String(148 + Math.round(2 * Math.sin(s / 1.6) + Math.sin(s / 0.7)));
  };
  const tick = () => render((Date.now() - t0) / 1000);

  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => {
    stop();
    if (still.matches) { render(60); return; }
    if (document.hidden) return;
    tick();
    timer = setInterval(tick, 200);
  };

  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  still.addEventListener('change', start);
  start();
})();
