// Theme toggle — light is the default; a dark choice persists in localStorage.
// The inline script in each page's <head> applies a saved choice before first
// paint, so this only has to keep the button state and storage in step.
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const KEY = 'theme';

  const saved = () => {
    try { return localStorage.getItem(KEY) === 'dark'; } catch (e) { return false; }
  };

  const apply = (dark) => {
    if (dark) root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    if (toggle) toggle.setAttribute('aria-pressed', String(dark));
  };

  apply(root.dataset.theme === 'dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const dark = root.dataset.theme !== 'dark';
      apply(dark);
      try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch (e) {}
    });
  }

  // Stay in sync with other tabs, and with pages restored from the back/forward cache.
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) apply(e.newValue === 'dark');
  });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) apply(saved());
  });
})();

// FAQ accordion — single open item at a time, clicking the open item closes it.
// Mirrors the design's `state.open` index (start at 0, toggle to -1).
(() => {
  const items = Array.from(document.querySelectorAll('.faq-item'));
  if (!items.length) return;

  const setOpen = (item, open) => {
    item.classList.toggle('is-open', open);
    item.querySelector('.faq-q').setAttribute('aria-expanded', String(open));
    item.querySelector('.faq-a').hidden = !open;
  };

  items.forEach((item) => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      items.forEach((other) => setOpen(other, false));
      if (willOpen) setOpen(item, true);
    });
  });
})();
