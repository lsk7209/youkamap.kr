/* =========================================================
   유가지도 — Blog list interactions (category filter)
   ========================================================= */
(function () {
  'use strict';

  const catBar = document.getElementById('catBar');
  const empty = document.getElementById('emptyState');
  const feed = document.querySelector('.blog-body');
  if (!catBar || !feed) return;

  // every filterable article in the feed column (featured + grid)
  const cards = Array.from(feed.querySelectorAll('[data-cat]'));

  function filter(cat) {
    let visible = 0;
    cards.forEach(c => {
      const match = cat === 'all' || c.dataset.cat === cat;
      c.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });
    if (empty) empty.classList.toggle('show', visible === 0);
  }

  catBar.addEventListener('click', e => {
    const b = e.target.closest('.cat-pill');
    if (!b) return;
    catBar.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('on', p === b));
    filter(b.dataset.cat);
  });
})();
