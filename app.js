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
