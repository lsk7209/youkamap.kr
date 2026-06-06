/* =========================================================
   유가지도 — interactions
   ========================================================= */
(function () {
  'use strict';
  const won = n => Math.round(n).toLocaleString('ko-KR');

  /* ---------- 1. Sparklines ---------- */
  const sparkData = {
    up:   [8,10,9,12,11,14,13,17,16,20],
    down: [22,20,21,18,19,16,17,14,13,11],
    flat: [15,15.5,14.8,15.2,15,15.3,14.9,15.1,15,15],
    down2:[18,17,17.5,16,16.5,15,15.4,14,13.8,13]
  };
  function drawSpark(svg) {
    const key = svg.dataset.trend;
    const d = sparkData[key] || sparkData.flat;
    const W = 120, H = 34, pad = 3;
    const min = Math.min(...d), max = Math.max(...d), span = (max - min) || 1;
    const pts = d.map((v, i) => {
      const x = pad + (i / (d.length - 1)) * (W - pad * 2);
      const y = H - pad - ((v - min) / span) * (H - pad * 2);
      return [x, y];
    });
    const color = key === 'up' ? 'var(--up)' : (key === 'flat' ? 'var(--flat)' : 'var(--down)');
    const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const area = line + ` L${(W-pad)} ${H-pad} L${pad} ${H-pad} Z`;
    const uid = 'sg' + Math.random().toString(36).slice(2, 7);
    svg.innerHTML =
      `<defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0" stop-color="${color}" stop-opacity=".18"/>
         <stop offset="1" stop-color="${color}" stop-opacity="0"/>
       </linearGradient></defs>
       <path d="${area}" fill="url(#${uid})"/>
       <path d="${line}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
       <circle cx="${pts[pts.length-1][0].toFixed(1)}" cy="${pts[pts.length-1][1].toFixed(1)}" r="2.4" fill="${color}"/>`;
  }
  document.querySelectorAll('.spark').forEach(drawSpark);

  /* ---------- 2. Tax breakdown widget ---------- */
  // Shares per fuel (단순 추정) — each sums to 1
  const TAX_BY_FUEL = {
    gasoline: { base: 0.392, traffic: 0.295, edu: 0.099, vat: 0.091, margin: 0.123 }, // 세금 ≈ 48.5%
    diesel:   { base: 0.451, traffic: 0.247, edu: 0.083, vat: 0.091, margin: 0.128 }  // 세금 ≈ 42.1%
  };
  const TAX_KEYS = ['base', 'traffic', 'edu', 'vat', 'margin'];
  let curFuel = 'gasoline';
  let TAX = TAX_BY_FUEL[curFuel];

  const amtInput = document.getElementById('taxAmt');
  const fuelToggle = document.getElementById('fuelToggle');
  const stackBar = document.getElementById('stackBar');
  const legend = document.getElementById('taxLegend');
  const chips = document.getElementById('amtChips');

  function renderTax(total) {
    if (!stackBar) return;
    TAX_KEYS.forEach(k => {
      const v = total * TAX[k];
      const seg = stackBar.querySelector(`[data-seg="${k}"]`);
      if (seg) seg.style.width = (TAX[k] * 100) + '%';
      const val = legend.querySelector(`[data-v="${k}"]`);
      if (val) val.textContent = won(v) + '원';
    });
    const taxOnly = total * (TAX.traffic + TAX.edu + TAX.vat);
    const pct = (taxOnly / total) * 100;
    const setR = (k, t) => { const el = document.querySelector(`[data-r="${k}"]`); if (el) el.textContent = t; };
    setR('total', won(total) + '원');
    setR('tax', won(taxOnly) + '원');
    setR('pct', pct.toFixed(1));
  }
  function parseAmt(str) { return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0; }

  if (amtInput) {
    const sync = () => {
      const n = parseAmt(amtInput.value);
      renderTax(n);
      // highlight matching chip
      chips.querySelectorAll('.amt-chip').forEach(c =>
        c.classList.toggle('on', parseInt(c.dataset.amt, 10) === n));
    };
    amtInput.addEventListener('input', () => {
      const n = parseAmt(amtInput.value);
      amtInput.value = n ? n.toLocaleString('ko-KR') : '';
      sync();
    });
    amtInput.addEventListener('focus', () => amtInput.select());
    chips.addEventListener('click', e => {
      const b = e.target.closest('.amt-chip'); if (!b) return;
      amtInput.value = parseInt(b.dataset.amt, 10).toLocaleString('ko-KR');
      sync();
    });
    if (fuelToggle) {
      fuelToggle.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        curFuel = b.dataset.fuel;
        TAX = TAX_BY_FUEL[curFuel];
        fuelToggle.querySelectorAll('button').forEach(x => {
          const on = x === b;
          x.classList.toggle('on', on);
          x.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        const note = document.getElementById('taxNote');
        if (note) note.textContent = curFuel === 'gasoline'
          ? '※ 휘발유 기준 단순 추정. 교통세 정액(리터당)·세율은 시점에 따라 달라질 수 있습니다.'
          : '※ 경유 기준 단순 추정. 경유 교통세는 휘발유보다 낮아 세금 비중도 낮습니다.';
        renderTax(parseAmt(amtInput.value));
      });
    }
    renderTax(parseAmt(amtInput.value));
  }

  /* ---------- 3. Trend chart ---------- */
  const trendSeries = {
    '1w': [1694, 1701, 1698, 1707, 1712, 1709, 1712],
    '1m': [1652,1660,1648,1655,1671,1668,1680,1692,1685,1690,1701,1698,1694,1701,1698,1707,1712,1709,1712,1718,1709,1712]
  };
  const trendSvg = document.getElementById('trendChart');
  const rangeLabel = document.getElementById('chartRangeLabel');

  function drawTrend(range) {
    if (!trendSvg) return;
    const d = trendSeries[range];
    const W = 600, H = 220, padL = 8, padR = 8, padT = 18, padB = 22;
    const min = Math.min(...d) - 6, max = Math.max(...d) + 6, span = (max - min) || 1;
    const X = i => padL + (i / (d.length - 1)) * (W - padL - padR);
    const Y = v => padT + (1 - (v - min) / span) * (H - padT - padB);
    const pts = d.map((v, i) => [X(i), Y(v)]);

    // baseline grid (3 lines)
    let grid = '';
    for (let g = 0; g <= 2; g++) {
      const yy = padT + (g / 2) * (H - padT - padB);
      grid += `<line x1="${padL}" y1="${yy.toFixed(1)}" x2="${W-padR}" y2="${yy.toFixed(1)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 4"/>`;
    }
    // colored segments by direction
    let segs = '';
    for (let i = 1; i < pts.length; i++) {
      const rising = d[i] >= d[i - 1];
      const col = rising ? 'var(--up)' : 'var(--down)';
      segs += `<line x1="${pts[i-1][0].toFixed(1)}" y1="${pts[i-1][1].toFixed(1)}" x2="${pts[i][0].toFixed(1)}" y2="${pts[i][1].toFixed(1)}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`;
    }
    // area under curve (neutral)
    const lineP = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const areaP = lineP + ` L${(W-padR)} ${H-padB} L${padL} ${H-padB} Z`;
    // end dot + label
    const last = pts[pts.length - 1];
    const lastV = d[d.length - 1];
    trendSvg.innerHTML =
      `<defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0" stop-color="var(--primary)" stop-opacity=".10"/>
         <stop offset="1" stop-color="var(--primary)" stop-opacity="0"/>
       </linearGradient></defs>
       ${grid}
       <path d="${areaP}" fill="url(#tg)"/>
       ${segs}
       <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="4" fill="var(--surface)" stroke="var(--primary)" stroke-width="2.5"/>
       <text x="${(last[0]-6).toFixed(1)}" y="${(last[1]-10).toFixed(1)}" text-anchor="end" font-size="13" font-weight="800" fill="var(--ink)" style="font-variant-numeric:tabular-nums">${lastV.toLocaleString('ko-KR')}</text>`;
    if (rangeLabel) rangeLabel.textContent = (range === '1w' ? '최근 7일' : '최근 30일') + ' · 단위 원/L';
  }
  const chartToggle = document.getElementById('chartToggle');
  if (chartToggle) {
    chartToggle.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      chartToggle.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      drawTrend(b.dataset.range);
    });
    drawTrend('1w');
  }

  /* ---------- 8. FAQ accordion (with aria) ---------- */
  function syncFaqAria(faq) {
    faq.querySelectorAll('.faq-item').forEach(i => {
      const q = i.querySelector('.faq-q');
      if (q) q.setAttribute('aria-expanded', i.classList.contains('open') ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.faq').forEach(faq => {
    faq.querySelectorAll('.faq-q').forEach(q => q.setAttribute('aria-expanded', 'false'));
    syncFaqAria(faq);
    faq.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        faq.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
        syncFaqAria(faq);
      });
    });
  });

  // expose redraw for tweaks (theme changes recolor SVG via currentColor vars)
  window.__yuga = { drawTrend, drawSpark, redrawSparks: () => document.querySelectorAll('.spark').forEach(drawSpark) };
})();
