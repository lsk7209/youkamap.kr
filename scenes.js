/* =========================================================
   유가지도 — composed showcase scenes (mobile 360 / desktop 1280)
   ========================================================= */
(function () {
  'use strict';

  /* ---------- shared snippets ---------- */
  const srcBadge = `<div class="src-badge">
      <svg class="v" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/></svg>
      출처: <b>오피넷</b><span class="dot"></span><span class="rel-time">⟳ 3시간 전</span><span class="dot"></span>실제가와 차이 가능</div>`;

  const priceCard = (cls, name, price, deltaCls, ico, delta, trend) => `
    <article class="price-card">
      <div class="fuel"><span class="fuel-dot ${cls}"></span><span class="nm">${name}</span></div>
      <div class="big"><span class="price"><span class="num">${price}</span><span class="unit">원/L</span></span></div>
      <div class="delta ${deltaCls}"><span class="ico">${ico}</span>${delta}</div>
      <svg class="spark" viewBox="0 0 120 34" preserveAspectRatio="none" data-trend="${trend}"></svg>
    </article>`;

  const faqBlock = `<div class="faq">
      <div class="faq-item open"><button class="faq-q"><span class="qmark">Q</span>휘발유 세금 비중은?<span class="caret">⌄</span></button><div class="faq-a"><div class="faq-a-inner">소비자가격의 약 45~50%가 세금으로 구성됩니다.</div></div></div>
      <div class="faq-item"><button class="faq-q"><span class="qmark">Q</span>유류세 인하 적용 시점은?<span class="caret">⌄</span></button><div class="faq-a"><div class="faq-a-inner">고시 시행일부터이며, 실제 반영까지 1~2주 시차가 있습니다.</div></div></div>
    </div>`;

  /* ---------- MOBILE 360 ---------- */
  const mobile = document.getElementById('mobileScene');
  if (mobile) {
    mobile.innerHTML = `
    <div class="site-header">
      <div class="brand"><span class="brand-mark">유</span>유가지도</div>
      <button class="btn btn-primary btn-sm header-cta">계산</button>
    </div>
    <div class="scene">
      <div class="ad-slot ad-anchor"><span class="ad-label">광고 · AD</span><span class="ad-size">320×50</span></div>
      <nav class="crumb"><a href="#">홈</a><span class="sep">›</span><a href="#">지역</a><span class="sep">›</span><span class="cur">서울</span></nav>
      <h1 style="font-size:24px;margin:0;letter-spacing:-.01em;line-height:1.25">서울 휘발유, 오늘 얼마?</h1>
      <div class="price-cards" style="grid-template-columns:1fr 1fr">
        ${priceCard('fuel-gasoline','휘발유','1,802','up','▲','+12','up')}
        ${priceCard('fuel-diesel','경유','1,689','down','▼','−5','down')}
      </div>
      ${srcBadge}
      <div class="fact-banner hi"><div class="fb-ico">▲</div><div><div class="fb-main" style="font-size:15px">전국 평균 대비 <b>+90원</b></div><div class="fb-sub">상위 6% · 06.05 기준</div></div></div>
      <div class="taxw">
        <div class="taxw-head" style="padding:14px 16px 2px"><div class="k">유류세 계산기</div><h3 style="font-size:18px">세금은 얼마였을까?</h3></div>
        <div class="taxw-body" style="padding:12px 16px 16px">
          <div class="stack-bar" style="margin:6px 0 10px">
            <div class="stack-seg seg-base" style="width:39%"></div><div class="stack-seg seg-traffic" style="width:30%"></div><div class="stack-seg seg-edu" style="width:10%"></div><div class="stack-seg seg-vat" style="width:9%"></div><div class="stack-seg seg-margin" style="width:12%"></div>
          </div>
          <div class="tax-result" style="padding:12px"><div class="line" style="font-size:15px">5만원 중 세금 <b class="hl">22,900원</b> <span class="pct">(45.8%)</span></div></div>
        </div>
      </div>
      <div class="ad-slot ad-inline" style="height:200px"><span class="ad-label">광고 · AD</span><span class="ad-size">본문 중간 · 300×250</span></div>
      ${faqBlock}
      <div class="site-footer" style="padding:16px">
        <p class="footer-disc" style="font-size:11px">출처: 한국석유공사 오피넷 · data.go.kr. 일부 콘텐츠는 AI 작성 보조를 사용했습니다.</p>
      </div>
    </div>`;
  }

  /* ---------- DESKTOP 1280 (scaled to fit) ---------- */
  const deskHost = document.getElementById('desktopScene');
  if (deskHost) {
    const inner = document.createElement('div');
    inner.style.width = '1280px';
    inner.style.transformOrigin = 'top left';
    inner.innerHTML = `
    <div class="site-header" style="padding:14px 28px">
      <div class="brand"><span class="brand-mark">유</span>유가지도</div>
      <nav class="site-nav"><a href="#">유가</a><a href="#">유류세</a><a href="#">지역</a><a href="#">가이드</a></nav>
      <button class="btn btn-primary btn-sm header-cta">유류세 계산</button>
    </div>
    <div class="scene-d">
      <div class="ad-slot ad-leaderboard"><span class="ad-label">광고 · AD</span><span class="ad-size">상단 리더보드 · 728×90</span></div>
      <nav class="crumb"><a href="#">홈</a><span class="sep">›</span><a href="#">지역</a><span class="sep">›</span><a href="#">서울</a><span class="sep">›</span><span class="cur">강남구</span></nav>
      <h1 style="font-size:34px;margin:0;letter-spacing:-.02em;line-height:1.15;font-weight:800">서울 강남구 유가 — 왜 비싸고, 세금은 얼마인가</h1>
      <div style="display:grid;grid-template-columns:1fr 320px;gap:24px;align-items:start">
        <div class="stack" style="gap:18px">
          <div class="price-cards" style="grid-template-columns:repeat(4,1fr)">
            ${priceCard('fuel-gasoline','휘발유','1,802','up','▲','+12','up')}
            ${priceCard('fuel-diesel','경유','1,689','down','▼','−5','down')}
            ${priceCard('fuel-premium','고급','2,011','flat','—','0','flat')}
            ${priceCard('fuel-lpg','LPG','1,058','down','▼','−3','down2')}
          </div>
          ${srcBadge}
          <div class="chart-card">
            <div class="chart-top"><h3>강남구 휘발유 추세</h3><div class="seg-toggle"><button class="on">1주</button><button>1개월</button></div></div>
            <div class="chart-wrap"><svg viewBox="0 0 600 200" preserveAspectRatio="none" class="scene-trend"></svg></div>
            <div class="chart-foot"><span><span class="delta up"><span class="ico">▲</span></span> 상승</span><span><span class="delta down"><span class="ico">▼</span></span> 하락</span><span style="margin-left:auto">최근 7일 · 원/L</span></div>
          </div>
          <div class="cmp-bars">
            <div class="cmp-bar-row"><span class="rg">강남구</span><div class="cmp-track"><div class="cmp-fill" style="width:94%"></div><div class="cmp-avg-line" style="left:78%"><span class="cmp-avg-flag">전국 평균</span></div></div><span class="cmp-val">1,802원</span></div>
            <div class="cmp-bar-row"><span class="rg">서초구</span><div class="cmp-track"><div class="cmp-fill" style="width:90%"></div><div class="cmp-avg-line" style="left:78%"></div></div><span class="cmp-val">1,778원</span></div>
            <div class="cmp-bar-row"><span class="rg">송파구</span><div class="cmp-track"><div class="cmp-fill" style="width:82%"></div><div class="cmp-avg-line" style="left:78%"></div></div><span class="cmp-val">1,731원</span></div>
          </div>
          <div class="ad-slot ad-inline"><span class="ad-label">광고 · AD</span><span class="ad-size">본문 중간 인피드 · 반응형</span></div>
          ${faqBlock}
        </div>
        <aside class="stack" style="gap:16px;position:sticky;top:16px">
          <div class="taxw">
            <div class="taxw-head" style="padding:16px 18px 2px"><div class="k">유류세 계산기</div><h3 style="font-size:19px">세금은 얼마?</h3></div>
            <div class="taxw-body" style="padding:14px 18px 18px">
              <div class="taxw-input" style="padding:10px 12px"><label>주유</label><input type="text" value="50,000" readonly style="font-size:19px"><span class="won">원</span></div>
              <div class="stack-bar" style="margin:14px 0 8px">
                <div class="stack-seg seg-base" style="width:39%"></div><div class="stack-seg seg-traffic" style="width:30%"></div><div class="stack-seg seg-edu" style="width:10%"></div><div class="stack-seg seg-vat" style="width:9%"></div><div class="stack-seg seg-margin" style="width:12%"></div>
              </div>
              <div class="tax-result" style="padding:13px"><div class="line" style="font-size:16px">세금 <b class="hl">22,900원</b> <span class="pct">(45.8%)</span></div></div>
            </div>
          </div>
          <div class="persona">
            <div class="persona-head"><div class="persona-av">🚗</div><div><div class="who">운전자 민수</div><div class="role">왕복 60km</div></div></div>
            <div class="persona-quote">셀프만 잘 골라도 월 2~3만원 아껴요.</div>
            <div class="persona-note">ⓘ AI 작성 보조</div>
          </div>
          <div class="ad-slot ad-inline" style="height:250px"><span class="ad-label">광고 · AD</span><span class="ad-size">사이드바 · 300×250</span></div>
        </aside>
      </div>
      <div class="site-footer" style="padding:20px 28px">
        <div class="footer-links"><a href="#">서비스 소개</a><a href="#">개인정보처리방침</a><a href="#">문의</a></div>
        <p class="footer-disc">출처: 한국석유공사 오피넷, data.go.kr · 표시 가격은 기준일 평균이며 실제가와 차이 가능. 일부 콘텐츠는 AI 작성 보조를 사용했고, 통계·차트는 원천 데이터 가공물입니다.</p>
      </div>
    </div>`;
    deskHost.appendChild(inner);

    const fit = () => {
      const w = deskHost.clientWidth;
      const scale = w / 1280;
      inner.style.transform = `scale(${scale})`;
      deskHost.style.height = (inner.offsetHeight * scale) + 'px';
    };
    requestAnimationFrame(fit);
    window.addEventListener('resize', fit);
    setTimeout(fit, 300); // after fonts settle
  }

  /* ---------- re-init dynamic bits inside scenes ---------- */
  if (window.__yuga) window.__yuga.redrawSparks();

  // mini trend for scene chart
  document.querySelectorAll('.scene-trend').forEach(svg => {
    const d = [1782,1790,1786,1795,1800,1797,1802];
    const W = 600, H = 200, pL = 8, pR = 8, pT = 16, pB = 18;
    const min = Math.min(...d) - 6, max = Math.max(...d) + 6, span = max - min;
    const X = i => pL + (i / (d.length - 1)) * (W - pL - pR);
    const Y = v => pT + (1 - (v - min) / span) * (H - pT - pB);
    const pts = d.map((v, i) => [X(i), Y(v)]);
    let segs = '';
    for (let i = 1; i < pts.length; i++) {
      const col = d[i] >= d[i-1] ? 'var(--up)' : 'var(--down)';
      segs += `<line x1="${pts[i-1][0].toFixed(1)}" y1="${pts[i-1][1].toFixed(1)}" x2="${pts[i][0].toFixed(1)}" y2="${pts[i][1].toFixed(1)}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`;
    }
    const line = pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
    const area = line + ` L${W-pR} ${H-pB} L${pL} ${H-pB} Z`;
    svg.innerHTML = `<defs><linearGradient id="stg${Math.random().toString(36).slice(2,6)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--primary)" stop-opacity=".10"/><stop offset="1" stop-color="var(--primary)" stop-opacity="0"/></linearGradient></defs>${segs}<circle cx="${pts[pts.length-1][0].toFixed(1)}" cy="${pts[pts.length-1][1].toFixed(1)}" r="4" fill="var(--surface)" stroke="var(--primary)" stroke-width="2.5"/>`;
  });

  // FAQ in scenes
  document.querySelectorAll('#mobileScene .faq-q, #desktopScene .faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item'), faq = item.closest('.faq');
      const was = item.classList.contains('open');
      faq.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!was) item.classList.add('open');
    });
  });
})();
