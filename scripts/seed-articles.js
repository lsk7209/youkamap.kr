const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const contentDir = path.join(root, "content");

const legacy = [
  ["fuel-tax-cut-extension", "유류세 인하 연장되면 기름값은 얼마나 달라질까", "정부 유류세 조정이 휘발유·경유 가격에 반영되는 흐름을 운전자 관점에서 정리했습니다.", "06.04", "6분", "유류세 인하", "정책", "news", "📰"],
  ["self-service-gas-station-cheaper", "셀프주유소가 30~80원 싼 진짜 이유", "인건비 구조와 회전율이 가격에 어떻게 반영되는지 뜯어봤습니다.", "06.04", "3분", "셀프주유소 가격 차이", "절약팁", "tip", "💡"],
  ["seoul-district-gasoline-map", "서울 25개 구 휘발유 가격 지도", "가장 비싼 구와 가장 싼 구, 그 차이는 리터당 134원.", "06.04", "5분", "서울 휘발유 가격", "지역가이드", "region", "📍"],
  ["diesel-cheaper-than-gasoline", "경유가 휘발유보다 싸진 날, 무슨 일이 있었나", "국제 제품가 역전이 국내 가격에 남긴 흔적을 추적합니다.", "06.03", "4분", "경유 휘발유 가격", "유가뉴스", "news", "📰"],
  ["oil-price-trend-july", "유가 추세로 보는 7월 기름값 전망", "국제유가·환율·재고 세 변수로 읽는 방향성.", "06.02", "6분", "7월 기름값 전망", "에버그린", "ever", "📈"],
  ["highway-gas-station-expensive", "고속도로 주유소는 왜 더 비쌀까", "임대 구조와 입지 프리미엄, 그리고 우회 전략.", "06.01", "3분", "고속도로 주유소 가격", "절약팁", "tip", "🛣️"],
  ["lpg-car-total-cost", "LPG 차량, 지금 갈아탈 만할까", "연료비·차량가·세제 혜택을 5년 총비용으로 비교.", "05.30", "7분", "LPG 차량 유지비", "에버그린", "ever", "⛽"],
  ["international-oil-to-local-price", "국제유가가 오르면 주유소 가격은 언제 오를까", "정유사 공급가와 재고, 환율이 만드는 시간차.", "05.29", "5분", "국제유가 국내 주유소 가격", "유가뉴스", "news", "🌍"],
  ["regional-fuel-price-gap", "지역별 기름값 차이는 왜 계속 벌어질까", "물류비·경쟁 밀도·상권 구조로 보는 가격 격차.", "05.28", "6분", "지역별 유가 비교", "지역가이드", "region", "🗺️"],
  ["budget-gas-station-vs-normal", "알뜰주유소와 일반 주유소, 어디가 더 유리할까", "가격만 보지 말고 접근성·품질·대기시간까지 비교합니다.", "05.27", "5분", "알뜰주유소 일반 주유소 차이", "절약팁", "tip", "💡"],
];

const seeds = [
  ["gas-station-price-board-reading", "주유소 가격표 보는 법, 리터당 차이를 실제 주유비로 바꾸기", "주유소 가격표 보는 법", "tip", "계산"],
  ["gasoline-ten-won-gap", "휘발유 10원 차이, 그냥 지나쳐도 되는 금액일까", "휘발유 10원 차이", "tip", "계산"],
  ["forty-liter-fuel-cost", "40리터 주유비 계산, 작은 가격 차이가 커지는 순간", "40리터 주유비 계산", "tip", "계산"],
  ["app-price-vs-station-price", "앱 가격과 현장 가격이 다를 때 먼저 확인할 것", "주유소 앱 가격 차이", "tip", "확인"],
  ["national-average-fuel-price", "전국 평균 기름값을 내 주유 판단에 쓰는 법", "전국 평균 기름값", "ever", "데이터"],
  ["opinet-commute-route", "오피넷 최저가 주유소, 출근길 기준으로 좁혀 찾기", "오피넷 최저가 주유소", "tip", "동선"],
  ["opinet-radius-search", "오피넷 반경 검색, 가까운 곳이 항상 싼 것은 아니다", "오피넷 반경 검색", "tip", "동선"],
  ["opinet-price-update-time", "오피넷 가격 업데이트 시간, 언제 확인해야 덜 헷갈릴까", "오피넷 가격 업데이트 시간", "ever", "확인"],
  ["opinet-cheapest-not-best", "최저가 주유소가 최선이 아닐 때, 대기시간까지 비교하기", "최저가 주유소 비교", "tip", "의사결정"],
  ["fuel-app-reading-routine", "주유 앱 확인 루틴, 3분 안에 비싼 선택 피하기", "주유 앱 확인 루틴", "tip", "루틴"],
  ["seoul-gangnam-fuel-price", "강남 주유소 가격, 비싸 보이는 이유를 분리해서 보기", "강남 주유소 가격", "region", "지역"],
  ["seoul-mapo-fuel-price", "마포 휘발유 가격, 도심 이동 전 확인해야 할 기준", "마포 휘발유 가격", "region", "지역"],
  ["seoul-jongno-fuel-price", "종로 주유소 가격, 업무 이동 차량은 어디서 비교할까", "종로 주유소 가격", "region", "지역"],
  ["seoul-songpa-fuel-price", "송파 기름값, 대형 상권과 외곽 동선을 나눠 보기", "송파 기름값", "region", "지역"],
  ["seoul-nowon-fuel-price", "노원 주유소 가격, 생활권 안에서 절약폭 찾는 법", "노원 주유소 가격", "region", "지역"],
  ["busan-fuel-price-check", "부산 기름값 확인, 해운대와 서부산을 같은 기준으로 보지 말기", "부산 기름값", "region", "지역"],
  ["incheon-fuel-route", "인천 주유소 가격, 공항·항만 동선에서 비교하는 법", "인천 주유소 가격", "region", "지역"],
  ["daegu-gasoline-price", "대구 휘발유 가격, 도심과 외곽 차이를 읽는 기준", "대구 휘발유 가격", "region", "지역"],
  ["daejeon-fuel-price", "대전 기름값, 고속도로 진입 전 확인하면 좋은 지점", "대전 기름값", "region", "지역"],
  ["gwangju-fuel-price", "광주 주유소 가격, 생활권별 평균만 봐도 절약이 보인다", "광주 주유소 가격", "region", "지역"],
  ["diesel-truck-route-cost", "경유 화물차 주유비, 노선별로 계산해야 하는 이유", "경유 화물차 주유비", "ever", "사업자"],
  ["diesel-passenger-car-maintenance", "경유 승용차 유지비, 연비만 보면 빠지는 비용", "경유 승용차 유지비", "ever", "차량"],
  ["diesel-price-volatility", "경유 가격 변동, 휘발유보다 크게 느껴지는 구간", "경유 가격 변동", "news", "시장"],
  ["diesel-vs-lpg-delivery", "배달 차량 연료 선택, 경유와 LPG를 비용으로 비교하기", "배달 차량 연료비", "ever", "사업자"],
  ["diesel-refuel-timing", "경유 주유 타이밍, 장거리 전날과 당일의 판단법", "경유 주유 타이밍", "tip", "루틴"],
  ["lpg-taxi-fuel-cost", "LPG 택시 연료비, 하루 운행거리로 손익을 따져보기", "LPG 택시 연료비", "ever", "사업자"],
  ["lpg-used-car-check", "LPG 중고차 구매 전 연료비보다 먼저 볼 것", "LPG 중고차", "ever", "차량"],
  ["lpg-station-access", "LPG 충전소 접근성, 가격보다 중요한 변수일 수 있다", "LPG 충전소 접근성", "ever", "동선"],
  ["lpg-family-car-cost", "패밀리카 LPG 유지비, 주말 장거리 기준으로 계산하기", "패밀리카 LPG 유지비", "ever", "차량"],
  ["lpg-hybrid-comparison", "LPG와 하이브리드 유지비, 1년 주행거리별 선택 기준", "LPG 하이브리드 유지비", "ever", "차량"],
  ["highway-refuel-before-entry", "고속도로 진입 전 주유, 언제 실제로 이득일까", "고속도로 진입 전 주유", "tip", "동선"],
  ["rest-area-gas-price", "휴게소 주유소 가격, 편의 비용을 숫자로 바꾸기", "휴게소 주유소 가격", "tip", "계산"],
  ["long-distance-refuel-plan", "장거리 운전 주유 계획, 중간 주유를 줄이는 법", "장거리 운전 주유 계획", "tip", "동선"],
  ["holiday-fuel-checklist", "연휴 주유 체크리스트, 출발 전날 확인할 5가지", "연휴 주유 체크리스트", "tip", "체크"],
  ["rental-car-refuel-rule", "렌터카 주유 규정, 반납 전 손해 보지 않는 확인법", "렌터카 주유 규정", "tip", "체크"],
  ["fuel-tax-cut-end-impact", "유류세 인하 종료 가능성, 운전자가 먼저 볼 신호", "유류세 인하 종료", "news", "정책"],
  ["transport-energy-tax", "교통에너지환경세, 휘발유 가격에 남는 구조", "교통에너지환경세", "news", "정책"],
  ["fuel-tax-policy-calendar", "유류세 정책 일정, 기사보다 고시를 먼저 봐야 하는 이유", "유류세 정책 일정", "news", "정책"],
  ["gasoline-tax-break-calculation", "휘발유 세금 인하 계산, 리터당 체감액은 왜 다를까", "휘발유 세금 인하 계산", "news", "계산"],
  ["diesel-tax-change-impact", "경유 세금 변화, 물류비와 소비자 가격을 함께 보기", "경유 세금 변화", "news", "정책"],
  ["exchange-rate-fuel-price", "환율이 기름값에 미치는 영향, 뉴스 숫자보다 봐야 할 것", "환율 기름값 영향", "news", "시장"],
  ["dubai-oil-korea-price", "두바이유와 국내 휘발유, 왜 바로 연결되지 않을까", "두바이유 국내 휘발유", "news", "시장"],
  ["oil-inventory-fuel-price", "정유사 재고와 주유소 가격, 시간차를 이해하는 법", "정유사 재고 주유소 가격", "news", "시장"],
  ["gasoline-supply-price", "정유사 공급가격, 소비자 가격보다 먼저 보는 지표", "정유사 공급가격", "news", "데이터"],
  ["international-product-price", "국제 제품가격, 휘발유와 경유 흐름을 나눠 읽기", "국제 제품가격", "news", "시장"],
  ["card-fuel-discount", "주유 할인카드, 리터당 할인보다 전월실적을 먼저 보기", "주유 할인카드", "tip", "결제"],
  ["fuel-point-benefit", "주유 포인트 적립, 실제 할인율로 환산하는 법", "주유 포인트 적립", "tip", "결제"],
  ["company-car-fuel-card", "법인차 주유카드, 비용 통제와 절약을 동시에 잡는 법", "법인차 주유카드", "ever", "사업자"],
  ["fuel-receipt-check", "주유 영수증 확인, 가격 오류를 빨리 발견하는 항목", "주유 영수증 확인", "tip", "체크"],
  ["monthly-fuel-budget", "월 주유비 예산, 리터당 가격보다 주행 패턴이 먼저다", "월 주유비 예산", "ever", "계산"],
  ["one-car-family-fuel-plan", "1대 차량 가정의 주유 루틴, 주말 이동을 기준으로 짜기", "가정 주유 루틴", "tip", "루틴"],
  ["two-car-family-fuel-cost", "2대 차량 주유비, 차종별로 다른 절약 기준", "2대 차량 주유비", "ever", "계산"],
  ["commuter-fuel-cost", "출퇴근 주유비 절약, 왕복거리별로 달라지는 판단", "출퇴근 주유비 절약", "tip", "동선"],
  ["new-driver-refuel-guide", "초보 운전자 주유 방법, 가격 비교 전에 익힐 기본", "초보 운전자 주유 방법", "tip", "체크"],
  ["senior-driver-fuel-check", "부모님 차량 주유비, 대신 확인할 때 놓치기 쉬운 것", "부모님 차량 주유비", "tip", "체크"],
  ["hybrid-fuel-cost", "하이브리드 주유비, 연비가 좋아도 비교가 필요한 순간", "하이브리드 주유비", "ever", "차량"],
  ["electric-vs-gasoline-cost", "전기차와 휘발유차 유지비, 충전요금까지 함께 보기", "전기차 휘발유차 유지비", "ever", "차량"],
  ["small-car-fuel-cost", "경차 주유비, 세제 혜택과 실제 주행비를 나눠 보기", "경차 주유비", "ever", "차량"],
  ["suv-fuel-cost", "SUV 주유비, 연비보다 주행 조건이 크게 작동한다", "SUV 주유비", "ever", "차량"],
  ["company-delivery-fuel-cost", "소상공인 배송 주유비, 매출보다 먼저 새는 비용 찾기", "소상공인 배송 주유비", "ever", "사업자"],
  ["fuel-price-alert", "기름값 알림 설정, 매일 확인하지 않아도 되는 기준", "기름값 알림 설정", "tip", "루틴"],
  ["weekly-fuel-check", "주간 기름값 확인법, 월요일과 금요일 숫자가 다른 이유", "주간 기름값 확인법", "ever", "데이터"],
  ["fuel-price-trend-chart", "기름값 추세 그래프, 상승과 하락을 과장 없이 읽기", "기름값 추세 그래프", "ever", "데이터"],
  ["fuel-data-source", "기름값 데이터 출처, 블로그 글보다 원자료를 확인하는 법", "기름값 데이터 출처", "ever", "데이터"],
  ["fuel-news-fact-check", "유가 뉴스 팩트체크, 제목만 보고 주유 시점을 정하지 않기", "유가 뉴스 팩트체크", "news", "확인"],
  ["cheapest-area-not-cheapest-trip", "싼 지역 주유소가 실제로는 손해인 경우", "싼 지역 주유소", "tip", "동선"],
  ["detour-for-cheap-gas", "싼 주유소 우회거리, 몇 km부터 손해일까", "싼 주유소 우회거리", "tip", "계산"],
  ["fuel-time-cost", "주유 대기시간 비용, 할인액과 함께 계산하기", "주유 대기시간 비용", "tip", "계산"],
  ["night-refuel-price", "야간 주유 가격, 시간대보다 중요한 확인 포인트", "야간 주유 가격", "tip", "체크"],
  ["rainy-day-refuel", "비 오는 날 주유, 가격보다 안전 동선을 먼저 보기", "비 오는 날 주유", "tip", "안전"],
  ["self-refuel-mistakes", "셀프주유 실수, 비용보다 큰 손해를 막는 순서", "셀프주유 실수", "tip", "체크"],
  ["premium-gasoline-need", "고급휘발유 필요 여부, 차종 설명서에서 확인할 기준", "고급휘발유 필요 여부", "ever", "차량"],
  ["octane-rating-guide", "옥탄가 뜻, 비싼 휘발유가 늘 좋은 것은 아니다", "옥탄가 뜻", "ever", "차량"],
  ["engine-oil-and-fuel-cost", "엔진오일과 연비, 주유비 절약에서 과장하지 말아야 할 것", "엔진오일 연비", "ever", "차량"],
  ["tire-pressure-fuel-cost", "타이어 공기압과 주유비, 체감 절약을 현실적으로 보기", "타이어 공기압 주유비", "tip", "차량"],
  ["eco-driving-fuel-saving", "연비운전 절약액, 습관 하나를 돈으로 환산하기", "연비운전 절약액", "tip", "계산"],
  ["company-fleet-fuel-policy", "회사 차량 주유 정책, 직원 불편 없이 비용 줄이는 법", "회사 차량 주유 정책", "ever", "사업자"],
  ["sales-route-fuel-plan", "영업직 주유 계획, 방문 순서가 주유비를 바꾼다", "영업직 주유 계획", "ever", "사업자"],
  ["taxi-driver-refuel-routine", "택시기사 주유 루틴, 교대시간과 가격을 같이 보기", "택시기사 주유 루틴", "ever", "사업자"],
  ["delivery-rider-fuel-cost", "배달 라이더 유류비, 건당 수익에서 빠지는 금액 계산", "배달 라이더 유류비", "ever", "사업자"],
  ["construction-equipment-fuel", "건설 장비 유류비, 현장 거리와 단가를 함께 관리하기", "건설 장비 유류비", "ever", "사업자"],
  ["jeju-rental-car-fuel", "제주 렌터카 주유, 반납 전 가장 많이 헷갈리는 기준", "제주 렌터카 주유", "region", "여행"],
  ["jeju-gasoline-price", "제주 휘발유 가격, 섬 지역 물류비를 감안해 보기", "제주 휘발유 가격", "region", "지역"],
  ["gangwon-trip-fuel", "강원도 여행 주유 계획, 산악도로와 휴게소를 함께 보기", "강원도 여행 주유", "region", "여행"],
  ["gyeonggi-fuel-price", "경기도 기름값, 서울 진입 전 비교하면 좋은 이유", "경기도 기름값", "region", "지역"],
  ["ulsan-fuel-price", "울산 주유소 가격, 산업도시 동선에서 보는 차이", "울산 주유소 가격", "region", "지역"],
  ["winter-fuel-cost", "겨울철 주유비, 난방 뉴스와 차량 비용을 구분하기", "겨울철 주유비", "ever", "계절"],
  ["summer-vacation-fuel", "여름휴가 주유비, 출발지 가격 확인이 먼저인 이유", "여름휴가 주유비", "tip", "계절"],
  ["moving-day-fuel-cost", "이사날 차량 유류비, 트럭과 승용차를 따로 계산하기", "이사날 유류비", "ever", "생활"],
  ["school-run-fuel-cost", "등하원 차량 주유비, 짧은 거리 반복 운행의 비용", "등하원 차량 주유비", "ever", "생활"],
  ["weekend-drive-fuel", "주말 드라이브 주유비, 목적지보다 돌아오는 길을 먼저 보기", "주말 드라이브 주유비", "tip", "생활"],
  ["fuel-price-myths", "기름값 절약 속설, 따라 하기 전에 숫자로 검증하기", "기름값 절약 속설", "ever", "검증"],
  ["cheap-gas-quality", "싼 주유소 품질 걱정, 확인할 수 있는 것과 없는 것", "싼 주유소 품질", "ever", "검증"],
  ["gas-station-review-reading", "주유소 리뷰 읽는 법, 가격과 무관한 신호 구분하기", "주유소 리뷰 읽는 법", "tip", "확인"],
  ["fuel-price-complaint", "주유소 가격 민원, 의심될 때 확인하고 남길 기록", "주유소 가격 민원", "tip", "확인"],
  ["fuel-budget-spreadsheet", "주유비 가계부, 리터와 원화를 함께 기록해야 하는 이유", "주유비 가계부", "ever", "계산"],
  ["business-fuel-expense-proof", "사업자 유류비 증빙, 세금계산보다 먼저 챙길 서류", "사업자 유류비 증빙", "ever", "사업자"],
  ["fuel-cost-for-beginner-business", "초기 창업자 유류비, 매장 임대료만큼 관리해야 할 항목", "창업자 유류비", "ever", "사업자"],
  ["used-car-fuel-economy", "중고차 연비 확인, 공인연비와 주유비 차이를 줄이는 법", "중고차 연비 확인", "ever", "차량"],
  ["fuel-price-before-car-buying", "차 사기 전 주유비 계산, 월 납입금만 보면 놓치는 것", "차 구매 전 주유비", "ever", "차량"],
  ["gasoline-diesel-choice", "휘발유와 경유 선택, 주행거리별로 달라지는 답", "휘발유 경유 선택", "ever", "차량"],
  ["annual-fuel-cost", "연간 주유비 계산, 1년 뒤 차량 선택을 바꾸는 숫자", "연간 주유비 계산", "ever", "계산"],
  ["fuel-price-dashboard", "기름값 대시보드 보는 법, 오늘 숫자와 추세를 나누기", "기름값 대시보드", "ever", "데이터"],
];

const categoryMeta = {
  tip: ["절약팁", "💡"],
  region: ["지역가이드", "📍"],
  news: ["유가뉴스", "📰"],
  ever: ["에버그린", "📈"],
};

const structures = ["answer-first", "checklist", "comparison", "decision-tree", "case-based", "data-reading", "mistake-proof", "route-plan"];

function slugDate(index) {
  const base = Date.UTC(2026, 5, 7, -9, 0, 0);
  return new Date(base + index * 5 * 60 * 60 * 1000).toISOString();
}

function makeArticle(seed, index) {
  const [slug, title, mainKeyword, cat, lens] = seed;
  const [category, icon] = categoryMeta[cat];
  const publishedAt = slugDate(index);
  const structureType = structures[index % structures.length];
  const status = index === 0 ? "published" : "scheduled";
  return {
    slug,
    status,
    publishedAt,
    date: new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "2-digit", day: "2-digit" }).format(new Date(publishedAt)).replace(/\s/g, "").replace(/\.$/, ""),
    minutes: `${4 + (index % 4)}분`,
    title,
    mainKeyword,
    category,
    cat,
    icon,
    lens,
    structureType,
    description: `${mainKeyword}을 운전자 관점에서 계산, 동선, 확인 순서로 나눠 정리했습니다. 현재 가격을 단정하지 않고 공식 자료 확인법까지 함께 제시합니다.`,
    excerpt: `${lens} 관점으로 ${mainKeyword}을 실제 주유 판단에 적용하는 방법을 정리했습니다.`,
    readerJob: `${mainKeyword}을 검색한 운전자가 오늘 바로 주유 여부와 확인 순서를 정하려는 상황`,
    angle: `${lens} 기준으로 가격 숫자를 생활비와 이동 동선으로 바꿔 보는 접근`,
    extendedKeywords: [mainKeyword, `${mainKeyword} 계산`, `${mainKeyword} 확인`, "오피넷", "주유비 절약"],
    sourceHints: ["오피넷", "한국석유공사", "산업통상자원부", "기획재정부"],
  };
}

const articles = legacy.map((row) => ({
  slug: row[0],
  status: "published",
  legacy: true,
  publishedAt: `2026-${row[3].startsWith("05") ? "05" : "06"}-${row[3].split(".")[1].padStart(2, "0")}T09:00:00+09:00`,
  title: row[1],
  description: row[2],
  excerpt: row[2],
  date: row[3],
  minutes: row[4],
  mainKeyword: row[5],
  category: row[6],
  cat: row[7],
  icon: row[8],
  extendedKeywords: [row[5], "유가지도", "주유소 가격"],
}));

for (let i = 0; i < 100; i += 1) {
  articles.push(makeArticle(seeds[i], i));
}

const titles = new Set();
const keywords = new Set();
for (const article of articles) {
  if (titles.has(article.title)) throw new Error(`Duplicate title: ${article.title}`);
  if (keywords.has(article.mainKeyword)) throw new Error(`Duplicate keyword: ${article.mainKeyword}`);
  titles.add(article.title);
  keywords.add(article.mainKeyword);
}

fs.mkdirSync(contentDir, { recursive: true });
fs.writeFileSync(path.join(contentDir, "articles.json"), `${JSON.stringify(articles, null, 2)}\n`, "utf8");
fs.writeFileSync(
  path.join(contentDir, "publish-state.json"),
  `${JSON.stringify({ intervalHours: 5, lastPublishedAt: "2026-06-07T00:00:00+09:00", maxPerRun: 1 }, null, 2)}\n`,
  "utf8",
);

console.log(`Seeded ${articles.length} articles (${articles.filter((a) => a.status === "published").length} published, ${articles.filter((a) => a.status === "scheduled").length} scheduled).`);
