const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const domain = "https://youkamap.kr";
const articlePath = path.join(root, "content", "articles.json");
const articles = JSON.parse(fs.readFileSync(articlePath, "utf8"));

const autoAds = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736" crossorigin="anonymous"></script>`;

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function plain(value) {
  return String(value ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function kstDate(iso) {
  return new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit" }).format(new Date(iso)).replace(/\s/g, "").replace(/\.$/, "");
}

function sortByDate(list) {
  return [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

const published = sortByDate(articles.filter((article) => article.status === "published"));
const publicSlugs = new Set(published.map((article) => article.slug));

function layout({ title, description, canonical, body, extraHead = "" }) {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/styles.css" />
  <link rel="stylesheet" href="/styles/blog.css" />
  <link rel="stylesheet" href="/styles/article.css" />
  ${autoAds}
  ${extraHead}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/">유가지도</a>
    <nav aria-label="주요 메뉴">
      <a href="/">홈</a>
      <a href="/blog/">블로그</a>
      <a href="/contact.html">문의</a>
    </nav>
  </header>
  ${body}
  <footer class="site-footer">
    <strong>유가지도</strong>
    <p>주유소 가격과 유가 흐름을 생활비 관점에서 정리합니다.</p>
    <nav aria-label="푸터 메뉴"><a href="/privacy.html">개인정보처리방침</a><a href="/contact.html">문의</a><a href="/feed.xml">RSS</a></nav>
  </footer>
</body>
</html>`;
}

function readMap(article) {
  const labels = {
    "answer-first": ["바로 판단", "계산 기준", "확인 순서"],
    checklist: ["놓치기 쉬운 것", "체크 항목", "실행 순서"],
    comparison: ["비교 기준", "비용 환산", "선택 기준"],
    "decision-tree": ["첫 분기", "손익 기준", "마지막 확인"],
    "case-based": ["상황 설정", "숫자 변환", "현장 적용"],
    "data-reading": ["데이터 출처", "평균 해석", "오해 방지"],
    "mistake-proof": ["흔한 실수", "검증 방법", "기록할 것"],
    "route-plan": ["출발 전", "이동 중", "도착 전"],
  }[article.structureType] || ["핵심 판단", "계산", "확인"];
  return labels.map((label, idx) => `<li><span>${idx + 1}</span>${esc(label)}</li>`).join("");
}

function sectionSet(article) {
  const kw = article.mainKeyword;
  const lens = article.lens;
  const variants = {
    "answer-first": [
      [`${kw}은 먼저 금액으로 바꿔야 합니다`, `${kw}을 볼 때 가장 위험한 방식은 리터당 숫자만 보고 판단하는 것입니다. 운전자가 실제로 지불하는 돈은 주유량, 이동거리, 대기시간을 통과한 뒤에야 결정됩니다. 예를 들어 40리터를 넣는다면 리터당 30원 차이는 1,200원이고, 한 달 두 번이면 2,400원입니다. 이 금액이 우회거리와 시간을 이기지 못하면 싼 가격은 실제 절약이 아닙니다.`],
      [`${lens} 관점에서 확인할 숫자`, `가격표의 첫 숫자는 출발점일 뿐입니다. 현재 위치에서 해당 주유소까지 가는 거리, 다시 원래 동선으로 돌아오는 거리, 결제 할인 조건, 그리고 재고 소진에 따른 가격 반영 시차를 함께 봐야 합니다. 유가지도에서는 이 과정을 “표시 가격 → 실제 주유량 → 이동 비용 → 확인 출처” 순서로 정리하는 방식을 권합니다.`],
      [`오늘 바로 쓸 수 있는 판단 순서`, `첫째, 오피넷이나 주유 앱에서 같은 연료와 같은 지역 기준으로 확인합니다. 둘째, 전국 평균이 아니라 생활권 평균과 비교합니다. 셋째, 30원 이하 차이라면 우회거리 1~2km만 추가돼도 절약액이 줄 수 있다는 점을 계산합니다. 넷째, 현장 가격이 다르면 영수증과 가격표를 기준으로 다시 확인합니다.`],
    ],
    checklist: [
      [`${kw}에서 가장 많이 놓치는 항목`, `${kw}은 단순한 절약 팁처럼 보이지만 실제로는 확인 항목이 여러 개입니다. 가격, 거리, 결제 조건, 주유량, 시간대가 동시에 움직입니다. 특히 할인카드나 포인트를 쓰는 경우에는 리터당 할인액보다 전월 실적과 월 할인 한도를 먼저 보는 편이 정확합니다.`],
      [`체크리스트를 짧게 유지하는 법`, `체크 항목은 많을수록 실천이 어려워집니다. 오늘 주유해야 한다면 가격 차이, 우회거리, 결제 혜택 세 가지만 먼저 봅니다. 장거리 이동 전이라면 여기에 휴게소 가격과 목적지 주변 가격을 더합니다. 사업자 차량이라면 영수증과 증빙 보관까지 포함해야 합니다.`],
      [`실수했을 때 되돌릴 수 있는 기록`, `가격이 예상과 다르거나 주유량이 이상해 보이면 현장 가격표, 영수증, 결제 내역을 같은 날 보관해야 합니다. 며칠이 지나면 가격 정보가 바뀌어 비교가 어려워집니다. 기록은 민원 목적만이 아니라 다음 주유 판단을 더 정확하게 만드는 데이터가 됩니다.`],
    ],
    comparison: [
      [`${kw} 비교는 같은 조건에서 해야 합니다`, `서로 다른 지역, 다른 시간, 다른 결제 조건을 한 줄로 비교하면 결론이 흔들립니다. 비교 기준은 “같은 연료, 같은 주유량, 같은 동선”이어야 합니다. 가격이 낮아도 이동거리가 늘거나 대기시간이 길어지면 실제 비용은 높아질 수 있습니다.`],
      [`비교표에 넣어야 할 네 가지`, `리터당 가격, 예상 주유량, 추가 이동거리, 할인 조건을 한 표에 넣으면 판단이 빨라집니다. 주유량이 적은 날에는 리터당 차이의 영향이 작고, 장거리 전 50리터 가까이 넣는 날에는 작은 차이도 커집니다. 같은 정보라도 주유량에 따라 결론이 달라지는 이유입니다.`],
      [`결론을 바꾸는 예외`, `급한 이동, 악천후, 어린이나 고령자가 동승한 상황에서는 가장 싼 주유소보다 접근성과 안전이 우선입니다. 반대로 반복 운행하는 영업차나 배송차는 작은 단가 차이가 누적되므로 더 엄격한 비교가 필요합니다. ${kw}은 결국 운전자의 상황을 포함해야 완성됩니다.`],
    ],
    "decision-tree": [
      [`${kw}의 첫 번째 분기`, `먼저 오늘 반드시 주유해야 하는지부터 나눕니다. 당장 필요한 주유라면 가까운 후보군 안에서 비교하고, 여유가 있다면 내일 또는 다음 이동 동선의 후보까지 봅니다. 이 분기를 건너뛰면 가격이 싸다는 이유로 불필요한 이동을 하게 됩니다.`],
      [`손익이 갈리는 기준`, `리터당 50원 차이는 40리터 기준 2,000원입니다. 하지만 왕복 4km를 더 가고 10분을 더 기다린다면 체감 이익은 작아질 수 있습니다. 유류비 절약은 숫자 하나가 아니라 시간과 거리까지 포함한 손익 계산입니다.`],
      [`마지막 확인`, `결정 직전에는 최신 가격과 연료 종류를 다시 봅니다. 휘발유와 경유, LPG는 가격 흐름과 세금 구조가 다를 수 있습니다. 같은 주유소라도 연료별 경쟁력이 달라서 한 연료가 싸다고 다른 연료도 유리하다고 단정하면 안 됩니다.`],
    ],
    "data-reading": [
      [`${kw}은 데이터 출처가 먼저입니다`, `기름값 글을 볼 때는 작성자의 결론보다 데이터 출처를 먼저 확인해야 합니다. 오피넷, 한국석유공사, 정부 보도자료처럼 원자료가 있는지 확인하면 과장된 전망을 걸러낼 수 있습니다. 특히 정책 발표일과 실제 주유소 반영일은 다를 수 있습니다.`],
      [`평균값을 생활권으로 번역하기`, `전국 평균은 흐름을 보는 데 유용하지만 내 동네 주유 판단에는 부족합니다. 지역 평균, 구 단위 평균, 실제 방문 가능한 주유소 가격을 차례로 좁혀야 합니다. 평균보다 싸다는 말도 접근 가능한 후보 안에서만 의미가 있습니다.`],
      [`숫자가 바뀌는 이유`, `국제유가, 환율, 정유사 공급가, 재고, 세금이 순서대로 영향을 줍니다. 모든 변수가 동시에 반영되지 않기 때문에 뉴스의 상승 또는 하락 표현과 현장 가격 사이에 시간차가 생깁니다. 이 시간차를 모르면 특정 주유소가 비싸다고 오해하기 쉽습니다.`],
    ],
  };
  return variants[article.structureType] || variants["answer-first"];
}

function articleHtml(article, index) {
  const canonical = `${domain}/blog/${article.slug}/`;
  const related = published.filter((item) => item.slug !== article.slug).slice(0, 3);
  const sections = sectionSet(article);
  const faq = [
    [`${article.mainKeyword}은 매일 확인해야 하나요?`, `매일 장거리 운행을 하지 않는다면 주유 직전과 주간 추세만 확인해도 충분합니다. 다만 정책 발표나 국제유가 급변 뉴스가 나온 주에는 확인 빈도를 높이는 편이 좋습니다.`],
    [`가장 싼 주유소를 고르면 항상 이득인가요?`, `아닙니다. 이동거리, 대기시간, 결제 조건을 포함하면 표시 가격이 가장 낮은 곳이 실제 최저 비용이 아닐 수 있습니다.`],
    [`공식 자료는 어디서 확인하나요?`, `주유소별 가격은 오피넷, 정책과 세금 변화는 정부 보도자료, 시장 흐름은 한국석유공사 자료를 함께 보는 방식이 안전합니다.`],
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        mainEntityOfPage: canonical,
        datePublished: article.publishedAt,
        dateModified: article.publishedAt,
        author: { "@type": "Organization", name: "유가지도 편집부" },
        publisher: { "@type": "Organization", name: "유가지도", url: domain },
        keywords: article.extendedKeywords,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: domain },
          { "@type": "ListItem", position: 2, name: "블로그", item: `${domain}/blog/` },
          { "@type": "ListItem", position: 3, name: article.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
      {
        "@type": "HowTo",
        name: `${article.mainKeyword} 확인 순서`,
        step: [
          { "@type": "HowToStep", name: "공식 가격 확인", text: "오피넷 또는 주유 앱에서 같은 연료 기준으로 후보를 확인합니다." },
          { "@type": "HowToStep", name: "비용 환산", text: "리터당 차이를 실제 주유량과 이동거리로 환산합니다." },
          { "@type": "HowToStep", name: "최종 결정", text: "현장 가격과 결제 조건을 확인한 뒤 주유합니다." },
        ],
      },
    ],
  };
  const body = `<main class="article-page">
  <article class="article-wrap">
    <nav class="breadcrumb" aria-label="breadcrumb"><a href="/">홈</a><span>/</span><a href="/blog/">블로그</a><span>/</span><span>${esc(article.category)}</span></nav>
    <header class="article-hero article-hero--${esc(article.cat)}">
      <div class="article-hero__media" aria-hidden="true"><span>${esc(article.icon)}</span></div>
      <div class="article-hero__content">
        <span class="article-pill">${esc(article.category)}</span>
        <h1>${esc(article.title)}</h1>
        <p>${esc(article.description)}</p>
        <div class="article-meta"><span>${kstDate(article.publishedAt)}</span><span>${esc(article.minutes)}</span><span>유가지도 편집부</span></div>
      </div>
    </header>
    <section class="tldr-box">
      <h2>3줄 요약</h2>
      <ul>
        <li>${esc(article.mainKeyword)}은 표시 가격보다 실제 주유량과 동선까지 함께 봐야 합니다.</li>
        <li>${esc(article.lens)} 기준을 적용하면 막연한 절약 팁을 금액과 시간으로 바꿀 수 있습니다.</li>
        <li>오피넷과 정부·공공 자료를 함께 확인하면 기사 제목만 보고 판단하는 실수를 줄입니다.</li>
      </ul>
    </section>
    <aside class="answer-box">
      <strong>바로 답</strong>
      <p>${esc(article.mainKeyword)} 판단은 리터당 가격을 실제 주유량으로 환산한 뒤, 우회거리와 결제 조건을 빼고 남는 금액이 있는지 보는 순서가 가장 현실적입니다.</p>
    </aside>
    <section class="read-map" aria-label="읽는 순서"><ol>${readMap(article)}</ol></section>
    <p class="article-lead">${esc(article.readerJob)}이라면 먼저 가격표의 숫자를 생활비 언어로 바꿔야 합니다. 이 글은 ${esc(article.angle)}으로 정리했습니다.</p>
    ${sections.map(([heading, text], i) => `<section class="section-block tone-${(i % 4) + 1}"><span class="section-kicker">관점 ${i + 1}</span><h2>${esc(heading)}</h2><p>${esc(text)}</p></section>`).join("\n")}
    <section class="mini-math">
      <h2>계산 예시</h2>
      <div class="formula-strip"><strong>40L 기준</strong><span>리터당 30원 차이 = 1,200원</span><span>리터당 80원 차이 = 3,200원</span></div>
      <p>이 금액보다 우회 비용과 시간이 크면 더 싼 표시 가격도 실제 절약이 아닙니다. 반대로 반복 운행 차량은 작은 단가 차이도 월 단위로 커집니다.</p>
    </section>
    <section class="decision-matrix">
      <h2>선택 기준표</h2>
      <table>
        <thead><tr><th>상황</th><th>먼저 볼 것</th><th>판단</th></tr></thead>
        <tbody>
          <tr><td>오늘 바로 주유</td><td>가까운 후보 3곳</td><td>가격보다 동선 손실을 먼저 제한</td></tr>
          <tr><td>장거리 이동 전</td><td>출발지·휴게소·목적지 가격</td><td>중간 주유 횟수를 줄이는 방향</td></tr>
          <tr><td>사업자 차량</td><td>월 주유량과 증빙</td><td>단가와 기록을 함께 관리</td></tr>
        </tbody>
      </table>
    </section>
    <section class="insight-panel">
      <h2>확인할 공식 출처</h2>
      <p><a href="https://www.opinet.co.kr/" rel="nofollow noopener">오피넷</a>에서 주유소별 가격을 확인하고, 정책 변화는 <a href="https://www.motie.go.kr/" rel="nofollow noopener">산업통상자원부</a> 또는 <a href="https://www.moef.go.kr/" rel="nofollow noopener">기획재정부</a> 발표를 함께 확인하는 편이 안전합니다.</p>
    </section>
    <section class="check-grid">
      <h2>실행 체크</h2>
      <ul>
        <li>같은 연료 기준으로 후보를 비교했는가</li>
        <li>실제 주유량을 기준으로 절약액을 계산했는가</li>
        <li>우회거리와 대기시간을 비용으로 봤는가</li>
        <li>현장 가격과 결제 조건을 마지막에 확인했는가</li>
      </ul>
    </section>
    <section class="section-block tone-2">
      <span class="section-kicker">상황별 적용</span>
      <h2>출퇴근, 장거리, 사업자 차량은 답이 다릅니다</h2>
      <p>출퇴근 차량은 같은 동선을 반복하므로 후보 주유소를 2~3곳으로 고정해두는 편이 효율적입니다. 매번 전국 최저가를 찾기보다 생활권 안에서 가격 변동을 보는 방식이 피로도가 낮습니다. 장거리 운전자는 출발지에서 충분히 넣을지, 중간 휴게소에서 나눠 넣을지를 먼저 정해야 합니다. 사업자 차량은 한 번의 절약보다 월 단위 증빙과 누적 단가가 중요합니다. 그래서 ${esc(article.mainKeyword)}도 운전자 유형에 따라 같은 결론으로 끝나지 않습니다.</p>
      <p>가정용 차량이라면 주말 이동 전날에 가격을 확인하고, 업무 차량이라면 주간 평균과 월 주유량을 함께 기록하는 것이 좋습니다. 택시, 배송, 영업처럼 이동 자체가 수입과 연결되는 경우에는 리터당 20~30원 차이도 누적되지만, 일반 운전자는 우회거리 때문에 손해가 될 수 있습니다. 같은 가격 정보라도 목적이 다르면 판단이 달라진다는 점이 핵심입니다.</p>
    </section>
    <section class="section-block tone-3">
      <span class="section-kicker">오해 방지</span>
      <h2>싸다는 말만으로는 충분하지 않습니다</h2>
      <p>유가 관련 글에서 가장 흔한 오해는 “오늘 싼 곳”을 “언제나 유리한 곳”으로 바꾸어 이해하는 것입니다. 주유소 가격은 재고, 주변 경쟁, 공급가, 할인 행사, 시간대에 따라 움직입니다. 특히 정책 변화가 있을 때는 발표일과 실제 반영일이 다를 수 있습니다. 따라서 ${esc(article.mainKeyword)}을 볼 때도 특정 날짜의 숫자 하나보다 어떤 기준으로 비교했는지를 확인해야 합니다.</p>
      <p>또 하나의 오해는 평균가가 곧 내 가격이라는 생각입니다. 전국 평균은 흐름을 읽는 지표이고, 실제 주유 판단은 방문 가능한 후보의 가격으로 해야 합니다. 서울 평균이 내려도 내 생활권 주유소가 바로 내려가지 않을 수 있고, 반대로 지역 평균보다 낮은 후보가 있어도 접근성이 떨어지면 실제 선택지는 아닐 수 있습니다. 평균은 방향, 후보 가격은 실행 기준으로 나눠야 합니다.</p>
    </section>
    <section class="section-block tone-4">
      <span class="section-kicker">업데이트 확인</span>
      <h2>가격이 바뀌는 날에는 확인 순서를 더 짧게 잡습니다</h2>
      <p>국제유가 급등락, 환율 변동, 정부의 유류세 발표가 있는 주에는 기사 제목이 빠르게 쏟아집니다. 하지만 기사만 보고 오늘 주유를 미루거나 서두르는 것은 위험합니다. 주유소 판매가격은 정유사 공급가와 기존 재고를 거쳐 반영됩니다. 그래서 큰 뉴스가 있어도 현장 가격이 바로 같은 방향으로 움직이지 않을 수 있습니다. 이때는 오피넷의 주유소별 가격, 지역 평균, 공식 보도자료를 함께 확인하는 짧은 순서가 필요합니다.</p>
      <p>확인 순서는 복잡할 필요가 없습니다. 먼저 오늘 방문 가능한 후보를 좁히고, 그다음 평균보다 얼마나 차이 나는지 봅니다. 마지막으로 정책이나 시장 뉴스가 실제 가격 반영과 연결될 만한 내용인지 확인합니다. ${esc(article.lens)} 관점에서는 “뉴스 → 평균 → 후보”가 아니라 “후보 → 평균 → 뉴스” 순서가 더 실용적입니다.</p>
    </section>
    <section class="section-block tone-1">
      <span class="section-kicker">기록 방법</span>
      <h2>다음 주유 판단을 위해 남길 숫자</h2>
      <p>좋은 주유 판단은 한 번의 검색으로 끝나지 않습니다. 리터당 가격, 실제 주유량, 총 결제액, 사용한 할인, 주행거리 정도만 기록해도 다음 판단이 훨씬 쉬워집니다. 예를 들어 지난달에 2번 주유했고 매번 40리터를 넣었다면 리터당 50원 차이는 월 4,000원입니다. 이 금액이 작게 느껴진다면 시간을 아끼는 선택이 낫고, 업무 차량처럼 월 300리터 이상 쓰는 경우라면 단가 관리를 더 엄격하게 해야 합니다.</p>
      <p>기록은 거창한 가계부가 아니어도 됩니다. 영수증 사진과 주유 앱 기록만 모아도 충분합니다. 다만 현장 가격과 앱 가격이 다르다고 느낀 날에는 날짜와 주유소명을 함께 남겨야 나중에 확인이 가능합니다. ${esc(article.mainKeyword)}을 꾸준히 기록하면 나에게 맞는 기준 가격이 생기고, 단순히 싸다는 말에 흔들리는 일이 줄어듭니다.</p>
    </section>
    <section class="section-block tone-2">
      <span class="section-kicker">판단 예시</span>
      <h2>결론은 가격이 아니라 남는 금액으로 냅니다</h2>
      <p>예를 들어 A 주유소는 리터당 1,690원이고 B 주유소는 1,650원이라고 가정해 보겠습니다. 40리터를 넣으면 B가 1,600원 저렴합니다. 그러나 B까지 왕복 3km를 더 가야 하고 대기시간이 10분이라면, 일반 운전자에게는 절약 체감이 작을 수 있습니다. 반대로 그 길이 이미 출근 동선 안에 있고 대기시간이 없다면 B가 합리적입니다. 같은 가격표라도 동선이 달라지면 결론이 바뀝니다.</p>
      <p>이 방식은 ${esc(article.mainKeyword)}뿐 아니라 유류세 뉴스, 지역별 가격 비교, 차량 유지비 판단에도 그대로 적용됩니다. 먼저 숫자를 생활비로 바꾸고, 그다음 내가 실제로 선택할 수 있는 후보인지 확인합니다. 마지막으로 공식 자료와 현장 정보를 맞춰 보면 됩니다. 이렇게 하면 과장된 절약법이나 단편적인 뉴스에 휘둘리지 않고, 오늘 내 상황에 맞는 결정을 내릴 수 있습니다.</p>
      <p>마지막으로 글을 읽은 시점과 실제 주유 시점이 다를 수 있다는 점을 기억해야 합니다. 가격 정보는 빠르게 바뀌므로 이 글은 특정 주유소를 추천하기보다 판단 순서를 제공하는 데 목적이 있습니다. 실제 결제 전에는 현장 표시 가격을 한 번 더 확인하는 것이 가장 확실합니다. 기록이 쌓이면 다음 판단도 더 빨라집니다.</p>
    </section>
    <section class="article-cta">
      <h2>다음에 같이 읽기</h2>
      <p>${esc(article.mainKeyword)}을 확인한 뒤에는 지역 평균과 정책 변수를 함께 보면 판단이 더 안정적입니다.</p>
      <div><a class="button" href="/blog/">유가 글 더 보기</a><a class="button button--ghost" href="/blog/fuel-tax-cut-extension/">유류세 흐름 보기</a></div>
    </section>
    <section class="faq-section">
      <h2>자주 묻는 질문</h2>
      ${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}
    </section>
    <section class="author-box"><strong>유가지도 편집부</strong><p>유가 데이터, 정책 발표, 운전자 생활비 관점을 연결해 주유 판단에 바로 쓰이는 글을 작성합니다.</p></section>
    <nav class="related-grid" aria-label="관련 글">${related.map((item) => `<a href="/blog/${esc(item.slug)}/"><span>${esc(item.category)}</span><strong>${esc(item.title)}</strong></a>`).join("")}</nav>
  </article>
</main>`;
  return layout({
    title: `${article.title} | 유가지도`,
    description: article.description,
    canonical,
    body,
    extraHead: `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
  });
}

function blogIndex() {
  const cards = published.map((article) => `<a class="post-card" href="/blog/${esc(article.slug)}/">
    <div class="post-card__visual post-card__visual--${esc(article.cat)}"><span>${esc(article.icon)}</span></div>
    <div class="post-card__body">
      <span class="tag tag--${esc(article.cat)}">${esc(article.category)}</span>
      <h2>${esc(article.title)}</h2>
      <p>${esc(article.excerpt || article.description)}</p>
      <div class="post-card__meta"><span>${esc(article.date || kstDate(article.publishedAt))}</span><span>${esc(article.minutes)}</span></div>
    </div>
  </a>`).join("\n");
  return layout({
    title: "유가 블로그 | 유가지도",
    description: "주유소 가격, 유류세, 지역별 유가, 차량 유지비를 운전자 관점에서 정리한 유가지도 블로그입니다.",
    canonical: `${domain}/blog/`,
    body: `<main class="blog-page"><section class="blog-hero"><h1>유가 블로그</h1><p>기름값을 숫자가 아니라 실제 주유 판단으로 바꿔 읽습니다.</p></section><section class="post-grid">${cards}</section></main>`,
  });
}

function sitemap() {
  const urls = [`${domain}/`, `${domain}/blog/`, ...published.map((article) => `${domain}/blog/${article.slug}/`), `${domain}/privacy.html`, `${domain}/contact.html`];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
}

function feed() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>유가지도 블로그</title><link>${domain}/blog/</link><description>주유소 가격과 유가 흐름을 정리합니다.</description>${published.map((article) => `<item><title>${esc(article.title)}</title><link>${domain}/blog/${esc(article.slug)}/</link><guid>${domain}/blog/${esc(article.slug)}/</guid><description>${esc(article.description)}</description><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate></item>`).join("")}</channel></rss>\n`;
}

function llms() {
  return `# 유가지도\n\n유가지도는 주유소 가격, 유류세, 지역별 유가, 차량 유지비를 운전자 관점에서 설명하는 한국어 사이트입니다.\n\n## 공개 글\n${published.map((article) => `- ${article.title}: ${domain}/blog/${article.slug}/`).join("\n")}\n`;
}

for (const article of articles) {
  const dir = path.join(root, "blog", article.slug);
  if (!publicSlugs.has(article.slug) && !article.legacy && fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

for (let i = 0; i < published.length; i += 1) {
  const article = published[i];
  if (article.legacy) continue;
  const dir = path.join(root, "blog", article.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), articleHtml(article, i), "utf8");
}

fs.mkdirSync(path.join(root, "blog"), { recursive: true });
fs.writeFileSync(path.join(root, "blog", "index.html"), blogIndex(), "utf8");
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap(), "utf8");
fs.writeFileSync(path.join(root, "feed.xml"), feed(), "utf8");
fs.writeFileSync(path.join(root, "llms.txt"), llms(), "utf8");

console.log(`Built ${published.length} published article entries. Scheduled hidden: ${articles.filter((a) => a.status === "scheduled").length}.`);
