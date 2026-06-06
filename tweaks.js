/* =========================================================
   유가지도 — Tweaks panel (vanilla, host-protocol compatible)
   ========================================================= */
(function () {
  'use strict';

  const STORE = 'yuga-tweaks-v1';
  const DEFAULTS = { accent: 'balance', primary: 'teal', scale: 1, density: 'regular', theme: 'light' };
  let state = Object.assign({}, DEFAULTS);
  try { Object.assign(state, JSON.parse(localStorage.getItem(STORE) || '{}')); } catch (e) {}

  const FS_BASE = { display: 28, h1: 24, h2: 20, h3: 17, body: 16, sm: 14, caption: 13 };
  const FS_BASE_D = { display: 40, h1: 30, h2: 23, h3: 18 }; // desktop overrides
  const ACCENTS = { quiet: '#C77E12', balance: '#E08A00', energetic: '#F59E1B' };
  const PRIMARIES = {
    teal:   { p: '#0E5A63', t: '#E4EEEF', t2: '#D2E3E5', p7: '#0A464D', p5: '#14747F' },
    navy:   { p: '#1E4B8F', t: '#E6EDF7', t2: '#CFDDF1', p7: '#163A70', p5: '#2C63B0' },
    forest: { p: '#1F6B4A', t: '#E5F1EB', t2: '#CDE5D9', p7: '#175239', p5: '#2A8861' }
  };
  const DENSITY = { compact: 0.84, regular: 1, comfy: 1.22 };

  function apply() {
    const root = document.documentElement;
    root.setAttribute('data-theme', state.theme);
    // accent
    root.style.setProperty('--accent', ACCENTS[state.accent]);
    // primary family
    const pr = PRIMARIES[state.primary];
    if (state.theme !== 'dark') {
      root.style.setProperty('--primary', pr.p);
      root.style.setProperty('--primary-tint', pr.t);
      root.style.setProperty('--primary-tint-2', pr.t2);
      root.style.setProperty('--primary-700', pr.p7);
      root.style.setProperty('--primary-500', pr.p5);
    } else {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-tint');
      root.style.removeProperty('--primary-tint-2');
      root.style.removeProperty('--primary-700');
      root.style.removeProperty('--primary-500');
    }
    // font scale
    const s = state.scale;
    const isDesk = window.matchMedia('(min-width: 720px)').matches;
    Object.entries(FS_BASE).forEach(([k, v]) => {
      const base = (isDesk && FS_BASE_D[k]) ? FS_BASE_D[k] : v;
      root.style.setProperty('--fs-' + k, (base * s).toFixed(1) + 'px');
    });
    // density
    root.style.setProperty('--density', DENSITY[state.density]);
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {}
  }

  function set(k, v) { state[k] = v; apply(); syncUI(); }

  /* ---------- panel UI ---------- */
  const css = `
  #tw-panel{position:fixed;right:18px;bottom:18px;width:288px;max-height:82vh;overflow:auto;
    background:var(--surface);border:1px solid var(--border);border-radius:16px;
    box-shadow:0 14px 44px rgba(20,24,26,.22);z-index:9999;font-family:var(--font);
    display:none;color:var(--ink)}
  #tw-panel.on{display:block}
  .tw-head{display:flex;align-items:center;gap:8px;padding:13px 14px;border-bottom:1px solid var(--border);
    cursor:grab;position:sticky;top:0;background:var(--surface);border-radius:16px 16px 0 0}
  .tw-head .dot{width:9px;height:9px;border-radius:50%;background:var(--accent)}
  .tw-head .ttl{font-size:14px;font-weight:800;letter-spacing:-.01em}
  .tw-head .x{margin-left:auto;border:none;background:var(--surface-2);width:26px;height:26px;border-radius:8px;
    color:var(--ink-2);font-size:15px;line-height:1;display:grid;place-items:center}
  .tw-head .x:hover{background:var(--border)}
  .tw-body{padding:6px 14px 16px}
  .tw-sec{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);
    margin:16px 0 9px}
  .tw-row{margin-bottom:4px}
  .tw-lbl{font-size:12.5px;font-weight:700;color:var(--ink-2);margin-bottom:7px;display:flex;justify-content:space-between}
  .tw-lbl .val{color:var(--ink-3);font-weight:600;font-variant-numeric:tabular-nums}
  .tw-seg{display:flex;gap:5px;background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:4px}
  .tw-seg button{flex:1;border:none;background:transparent;color:var(--ink-2);font-family:var(--font);
    font-size:12px;font-weight:700;padding:7px 4px;border-radius:7px}
  .tw-seg button.on{background:var(--surface);color:var(--primary);box-shadow:0 1px 2px rgba(0,0,0,.08)}
  .tw-sw{display:flex;gap:8px}
  .tw-sw button{flex:1;height:34px;border-radius:9px;border:2px solid transparent;cursor:pointer;position:relative}
  .tw-sw button.on{border-color:var(--ink);box-shadow:0 0 0 2px var(--surface) inset}
  input[type=range].tw-range{width:100%;accent-color:var(--primary)}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.id = 'tw-panel';
  panel.innerHTML = `
    <div class="tw-head" id="twHead"><span class="dot"></span><span class="ttl">Tweaks</span><button class="x" id="twClose">✕</button></div>
    <div class="tw-body">
      <div class="tw-sec">테마</div>
      <div class="tw-row"><div class="tw-seg" data-k="theme">
        <button data-v="light">라이트</button><button data-v="dark">다크</button></div></div>

      <div class="tw-sec">강조색 균형</div>
      <div class="tw-row"><div class="tw-lbl">앰버(에너지) 비중</div><div class="tw-seg" data-k="accent">
        <button data-v="quiet">차분</button><button data-v="balance">균형</button><button data-v="energetic">활기</button></div></div>

      <div class="tw-sec">프라이머리</div>
      <div class="tw-row"><div class="tw-sw" data-k="primary">
        <button data-v="teal"   style="background:#0E5A63"></button>
        <button data-v="navy"   style="background:#1E4B8F"></button>
        <button data-v="forest" style="background:#1F6B4A"></button></div></div>

      <div class="tw-sec">타이포 스케일</div>
      <div class="tw-row"><div class="tw-lbl">크기 <span class="val" id="twScaleVal">100%</span></div>
        <input type="range" class="tw-range" id="twScale" min="0.9" max="1.2" step="0.05"></div>

      <div class="tw-sec">여백 밀도</div>
      <div class="tw-row"><div class="tw-seg" data-k="density">
        <button data-v="compact">촘촘</button><button data-v="regular">기본</button><button data-v="comfy">넉넉</button></div></div>
    </div>`;
  document.getElementById('tweaksRoot').appendChild(panel);

  /* ---------- bind ---------- */
  panel.querySelectorAll('.tw-seg, .tw-sw').forEach(group => {
    const k = group.dataset.k;
    group.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      set(k, b.dataset.v);
    });
  });
  const scale = panel.querySelector('#twScale');
  scale.addEventListener('input', () => set('scale', parseFloat(scale.value)));

  function syncUI() {
    panel.querySelectorAll('.tw-seg, .tw-sw').forEach(group => {
      const k = group.dataset.k;
      group.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === state[k]));
    });
    scale.value = state.scale;
    panel.querySelector('#twScaleVal').textContent = Math.round(state.scale * 100) + '%';
  }

  /* ---------- host protocol ---------- */
  const showPanel = () => panel.classList.add('on');
  const hidePanel = () => panel.classList.remove('on');
  window.addEventListener('message', e => {
    const t = e && e.data && e.data.type;
    if (t === '__activate_edit_mode') showPanel();
    else if (t === '__deactivate_edit_mode') hidePanel();
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}

  panel.querySelector('#twClose').addEventListener('click', () => {
    hidePanel();
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
  });

  /* ---------- drag ---------- */
  const head = panel.querySelector('#twHead');
  head.addEventListener('mousedown', e => {
    if (e.target.closest('button')) return;
    const r = panel.getBoundingClientRect();
    const ox = e.clientX - r.left, oy = e.clientY - r.top;
    panel.style.right = 'auto'; panel.style.bottom = 'auto';
    const move = ev => {
      panel.style.left = Math.max(8, Math.min(window.innerWidth - r.width - 8, ev.clientX - ox)) + 'px';
      panel.style.top  = Math.max(8, Math.min(window.innerHeight - 40, ev.clientY - oy)) + 'px';
    };
    const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
    window.addEventListener('mousemove', move); window.addEventListener('mouseup', up);
  });

  // re-apply font scale on breakpoint change
  window.matchMedia('(min-width: 720px)').addEventListener('change', apply);

  apply();
  syncUI();
})();
