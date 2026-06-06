/* =========================================================
   유가지도 — Article page interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- reading progress ---------- */
  const bar = document.getElementById('readBar');
  const prose = document.getElementById('prose');
  function updateBar() {
    if (!bar || !prose) return;
    const start = prose.offsetTop;
    const end = prose.offsetTop + prose.offsetHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, (end - start))));
    bar.style.width = (p * 100) + '%';
  }
  window.addEventListener('scroll', updateBar, { passive: true });
  window.addEventListener('resize', updateBar);
  updateBar();

  /* ---------- TOC scroll-spy ---------- */
  const toc = document.getElementById('toc');
  const links = toc ? Array.from(toc.querySelectorAll('a')) : [];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function setActive(id) {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  }
  // scroll-based spy: last heading whose top has passed the offset line is active
  function spy() {
    if (!sections.length) return;
    const line = 100;
    let current = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top - line <= 0) current = s; else break;
    }
    // near page bottom → activate last
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 4) current = sections[sections.length - 1];
    if (current) setActive(current.id);
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy);
  spy();

  // smooth scroll for TOC + in-prose anchor links (no scrollIntoView)
  function smoothTo(target) {
    const y = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  links.forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); smoothTo(t); setActive(t.id); history.replaceState(null, '', a.getAttribute('href')); }
  }));

  /* ---------- share ---------- */
  function onShare(e) {
    const b = e.target.closest('[data-share]'); if (!b) return;
    const kind = b.dataset.share;
    const url = location.href;
    const title = document.title;
    if (kind === 'copy') {
      const done = () => {
        document.querySelectorAll('#copyMsg').forEach(m => {
          m.hidden = false; clearTimeout(m._t); m._t = setTimeout(() => m.hidden = true, 1600);
        });
      };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done).catch(done);
      else done();
    } else if (kind === 'x') {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url), '_blank', 'noopener,width=560,height=480');
    } else if (kind === 'facebook') {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener,width=560,height=480');
    } else if (kind === 'kakao') {
      // Kakao SDK not loaded in mock — fall back to copy
      if (navigator.clipboard) navigator.clipboard.writeText(url);
      const m = document.getElementById('copyMsg'); if (m) { m.hidden = false; m.textContent = '링크 복사됨 (카카오 공유는 SDK 연동 필요)'; setTimeout(() => { m.hidden = true; m.textContent = '복사됨!'; }, 2200); }
    }
  }
  document.querySelectorAll('.share').forEach(s => s.addEventListener('click', onShare));

  /* ---------- FAQ accordion (with aria) ---------- */
  document.querySelectorAll('.faq').forEach(faq => {
    faq.querySelectorAll('.faq-item').forEach(i => {
      const q = i.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', i.classList.contains('open') ? 'true' : 'false');
    });
    faq.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        faq.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
        faq.querySelectorAll('.faq-item').forEach(i => {
          const qq = i.querySelector('.faq-q');
          if (qq) qq.setAttribute('aria-expanded', i.classList.contains('open') ? 'true' : 'false');
        });
      });
    });
  });

  /* ---------- embedded sparkline ---------- */
  document.querySelectorAll('.spark').forEach(svg => {
    const up = [8,10,9,12,11,14,13,17,16,20];
    const W = 120, H = 34, pad = 3, min = Math.min(...up), max = Math.max(...up), span = max - min || 1;
    const pts = up.map((v, i) => [pad + (i/(up.length-1))*(W-pad*2), H-pad-((v-min)/span)*(H-pad*2)]);
    const line = pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
    const area = line + ` L${W-pad} ${H-pad} L${pad} ${H-pad} Z`;
    const uid = 'sa'+Math.random().toString(36).slice(2,6);
    svg.innerHTML = `<defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--up)" stop-opacity=".18"/><stop offset="1" stop-color="var(--up)" stop-opacity="0"/></linearGradient></defs><path d="${area}" fill="url(#${uid})"/><path d="${line}" fill="none" stroke="var(--up)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${pts[pts.length-1][0].toFixed(1)}" cy="${pts[pts.length-1][1].toFixed(1)}" r="2.4" fill="var(--up)"/>`;
  });
})();
