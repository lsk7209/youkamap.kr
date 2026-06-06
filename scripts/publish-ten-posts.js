const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const site = 'https://youkamap.kr';
const today = '2026-06-06';
const adsense = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736" crossorigin="anonymous"></script>';
const ogImage = `${site}/assets/og/youkamap-og.svg`;

const posts = [
  {
    slug: 'fuel-tax-cut-extension',
    category: '유류세',
    cat: 'tax',
    icon: '🧾',
    title: '유류세 인하 연장, 7월부터 무엇이 어떻게 바뀌나',
    description: '유류세 인하 연장으로 7월부터 무엇이 바뀌는지, 적용 시점과 주유소 가격 반영 시차를 정리합니다.',
    date: '2026-06-05',
    minutes: 4,
    excerpt: '인하율 단계 조정과 적용 시점, 주유소 가격에 실제로 반영되기까지의 시차를 정리했습니다.',
    summary: ['인하율이 바뀌어도 주유소 가격표는 재고와 매입 시점 때문에 늦게 움직입니다.', '휘발유, 경유, LPG는 세금 구조와 가격 반영 속도가 서로 다릅니다.', '정책 문구보다 실제 체감액은 주유량, 지역, 주유소 유형을 함께 봐야 합니다.'],
    sections: [
      ['무엇이 바뀌나', '정부의 한시 유류세 인하 조치는 소비자 부담을 낮추기 위해 세금 일부를 줄이는 방식입니다. 운전자가 보는 주유소 가격에는 원유 자체 가격뿐 아니라 정유, 유통, 세금, 부가가치세가 함께 들어 있습니다. 그래서 인하율이 조정되면 단순히 한 줄짜리 숫자가 바뀌는 것이 아니라, 리터당 세금 항목과 소비자가격의 기대치가 같이 바뀝니다. 다만 실제 적용 수치는 반드시 고시와 시행일을 확인해야 하며, 기사 제목만 보고 주유 시점을 결정하는 것은 위험합니다.'],
      ['왜 바로 내려가지 않나', '주유소는 세금 조정 전 가격으로 들여온 재고를 보유하고 있을 수 있습니다. 직영점은 본사 정책에 따라 비교적 빠르게 조정될 수 있지만, 자영 주유소는 매입 단가와 재고 소진 속도가 다릅니다. 그래서 정책 시행일과 소비자가 체감하는 날짜 사이에는 며칠에서 1~2주 정도의 차이가 생길 수 있습니다. 이 시차를 모르고 하루 단위 가격만 보면 특정 주유소가 과하게 비싸다고 오해하기 쉽습니다.'],
      ['내 주유비에 미치는 영향', '체감액은 리터당 인하액에 실제 주유량을 곱해 보는 방식이 가장 직관적입니다. 예를 들어 한 번에 40리터를 넣는 운전자는 리터당 50원 차이만 나도 2천 원 차이를 경험합니다. 월 2~3회 주유하는 운전자라면 작은 단가 차이가 누적되어 체감됩니다. 다만 유류세가 내려가도 국제 제품가격, 환율, 유통 마진이 동시에 오르면 최종 가격 하락 폭은 줄어들 수 있습니다.'],
      ['확인 순서', '먼저 정부 고시나 보도자료에서 시행일과 유종별 적용 방식을 확인합니다. 다음으로 오피넷에서 지역 평균과 주변 주유소 가격을 확인합니다. 마지막으로 직영, 알뜰, 셀프 여부를 함께 보면 왜 어떤 곳은 빨리 내리고 어떤 곳은 늦게 내리는지 이해할 수 있습니다. 유가지도에서는 정책 설명을 실제 주유 행동으로 연결하는 것을 목표로 합니다.']
    ],
    table: [['확인 항목', '보는 이유'], ['고시 시행일', '세금 적용 시작 기준'], ['지역 평균가', '내 동네 가격의 비교 기준'], ['주유소 유형', '가격 반영 속도와 운영비 차이']],
    faq: [['인하가 발표되면 바로 주유를 미뤄야 하나요?', '항상 그렇지는 않습니다. 재고 시차와 지역 가격을 함께 봐야 하며, 급하게 주유해야 한다면 주변 최저가 확인이 더 현실적입니다.'], ['휘발유와 경유 체감액이 같나요?', '아닙니다. 유종별 세금 구조가 달라 리터당 체감액은 달라질 수 있습니다.']]
  },
  {
    slug: 'self-service-gas-station-price-gap',
    category: '절약팁',
    cat: 'tip',
    icon: '💡',
    title: '셀프주유소가 30~80원 싼 진짜 이유',
    description: '셀프주유소 가격 차이가 생기는 이유를 인건비, 회전율, 입지, 결제 조건으로 나누어 설명합니다.',
    date: '2026-06-04',
    minutes: 5,
    excerpt: '인건비 구조와 회전율이 가격에 어떻게 반영되는지 운전자 관점에서 풀었습니다.',
    summary: ['셀프주유소의 가격 차이는 단순히 직원 수만의 문제가 아닙니다.', '입지, 회전율, 브랜드 정책, 카드 할인 조건이 함께 작동합니다.', '리터당 차이보다 실제 이동 거리와 대기 시간을 같이 계산해야 합니다.'],
    sections: [
      ['가격 차이는 어디서 나오나', '셀프주유소는 주유 과정 일부를 운전자가 직접 수행합니다. 운영자는 인력 배치와 응대 시간을 줄일 수 있고, 그 일부가 가격 경쟁력으로 나타날 수 있습니다. 하지만 모든 셀프주유소가 항상 싼 것은 아닙니다. 임대료가 높은 도심 입지, 진입 동선이 좋은 대로변, 특정 브랜드 정책이 있는 매장은 셀프라도 주변보다 높을 수 있습니다.'],
      ['30~80원 차이를 해석하는 법', '리터당 30원 차이는 40리터 주유 기준 1,200원입니다. 80원 차이라면 3,200원입니다. 이 금액은 분명 의미가 있지만, 왕복 이동 거리와 대기 시간이 길면 절감액이 줄어듭니다. 따라서 셀프주유소를 고를 때는 가격표 하나만 보지 말고 현재 위치에서의 우회 거리, 신호 대기, 카드 할인 중복 여부를 함께 계산해야 합니다.'],
      ['셀프가 불리한 경우', '초보 운전자, 야간 주유, 영수증이나 세차권 확인이 필요한 경우에는 셀프 방식이 오히려 번거로울 수 있습니다. 또한 일부 셀프주유소는 낮은 가격 대신 부가 서비스가 적거나 세차 대기 동선이 복잡할 수 있습니다. 절약은 가격만의 문제가 아니라 실패 없이 빠르게 주유를 끝내는 운영 경험까지 포함합니다.'],
      ['실전 선택 기준', '반경 2~3km 안에서 셀프와 일반 주유소 가격 차이를 먼저 봅니다. 차이가 리터당 20원 이하라면 이동 시간을 우선하고, 50원 이상이면 셀프주유소 방문을 검토할 만합니다. 월 주유량이 많은 운전자라면 자주 가는 동선에 있는 셀프주유소를 2곳 정도 정해두는 방식이 효과적입니다.']
    ],
    table: [['상황', '판단 기준'], ['차이 20원 이하', '가까운 곳 우선'], ['차이 50원 이상', '셀프주유소 우회 검토'], ['야간/초행', '동선과 안전성 우선']],
    faq: [['셀프주유소는 품질이 낮나요?', '가격이 낮다고 연료 품질이 낮다는 뜻은 아닙니다. 품질은 정유사 공급, 관리 상태, 법정 검사 체계와 관련됩니다.'], ['항상 셀프가 절약인가요?', '아닙니다. 이동 거리와 할인 조건을 포함한 총비용으로 봐야 합니다.']]
  },
  {
    slug: 'seoul-district-gasoline-price-map',
    category: '지역가이드',
    cat: 'region',
    icon: '📍',
    title: '서울 25개 구 휘발유 가격 지도 읽는 법',
    description: '서울 구별 휘발유 가격 차이를 평균 대비 비교 방식으로 해석하고 이동 가치 판단 기준을 정리합니다.',
    date: '2026-06-04',
    minutes: 6,
    excerpt: '서울 25개 구 가격 차이를 평균 대비로 읽고, 우회 주유가 유리한지 판단하는 기준입니다.',
    summary: ['서울 안에서도 구별 평균가는 입지와 통행량에 따라 달라집니다.', '비싸다/싸다보다 전국·서울 평균 대비 차이로 표현해야 정확합니다.', '우회 주유는 리터당 차이와 이동비를 함께 비교해야 합니다.'],
    sections: [
      ['구별 가격 차이가 생기는 이유', '서울은 같은 도시 안에서도 업무지구, 주거지, 외곽 간 운영비가 크게 다릅니다. 임대료와 교통량이 높은 곳은 가격이 높게 형성되기 쉽고, 외곽이나 경쟁 주유소가 많은 지역은 가격 경쟁이 생깁니다. 또 고속도로 진입 전후, 대형 상권 주변, 택시 수요가 많은 곳은 가격 움직임이 다르게 나타납니다.'],
      ['평균 대비로 봐야 하는 이유', '특정 구를 비싸다고 단정하면 독자에게 자극적이지만 정확하지 않습니다. 유가지도는 전국 평균 대비, 서울 평균 대비, 인접 구 대비 차이처럼 기준이 있는 표현을 우선합니다. 예를 들어 리터당 80원 높다는 말은 40리터 기준 3,200원 차이라는 식으로 바꾸어야 실제 판단에 도움이 됩니다.'],
      ['옆 구로 이동할 가치', '우회 주유는 가격 차이가 충분히 크고 이동 동선이 자연스러울 때만 유리합니다. 왕복 5km를 추가로 이동하면서 2천 원을 아끼는 구조라면 시간과 연료 소모를 다시 봐야 합니다. 출퇴근길이나 장보기 동선에 자연스럽게 포함되는 경우에는 같은 가격 차이라도 가치가 커집니다.'],
      ['지역 글을 읽을 때 주의점', '지역 가격은 하루에도 바뀔 수 있습니다. 지도형 콘텐츠는 기준일과 데이터 출처를 확인하고, 마지막 결정은 오피넷의 현재 공개 가격으로 확인하는 것이 좋습니다. 유가지도의 지역 글은 특정 주유소 평가가 아니라 평균 차이와 운전자 판단 기준을 설명하는 참고 자료입니다.']
    ],
    table: [['비교 기준', '의미'], ['서울 평균 대비', '도시 내부 상대 위치'], ['전국 평균 대비', '전체 시장 대비 체감'], ['인접 구 대비', '우회 주유 가치']],
    faq: [['가장 싼 구만 찾아가면 되나요?', '아닙니다. 현재 위치와 이동 목적지 사이에 있는지, 대기 시간이 긴지 함께 봐야 합니다.'], ['구별 평균이 특정 주유소 가격인가요?', '아닙니다. 평균은 여러 공개 가격을 묶어 본 참고값이며 실제 결제 가격은 주유소별로 다릅니다.']]
  },
  {
    slug: 'diesel-cheaper-than-gasoline',
    category: '유가뉴스',
    cat: 'news',
    icon: '📰',
    title: '경유가 휘발유보다 싸진 날, 무슨 일이 있었나',
    description: '경유와 휘발유 가격 역전과 재역전이 생기는 이유를 국제 제품가, 세금, 수요 변화로 설명합니다.',
    date: '2026-06-03',
    minutes: 5,
    excerpt: '국제 제품가와 수요 변화가 국내 경유·휘발유 가격 차이에 남긴 흔적을 정리했습니다.',
    summary: ['경유와 휘발유 가격 차이는 원유 가격 하나로 설명되지 않습니다.', '국제 제품가, 산업 수요, 세금 구조, 재고가 함께 작동합니다.', '차종 선택은 오늘 가격보다 장기 운행거리와 정비비까지 봐야 합니다.'],
    sections: [
      ['왜 가격 역전이 생기나', '휘발유와 경유는 같은 원유에서 나오지만 수요처가 다릅니다. 휘발유는 승용차 수요 비중이 크고, 경유는 물류, 산업, 상용차 수요와 연결됩니다. 국제 시장에서 경유 수요가 강하면 국내에서도 경유 가격이 상대적으로 높아질 수 있고, 반대로 제품가가 안정되면 휘발유보다 낮아질 수 있습니다.'],
      ['세금과 제품가를 분리해서 보기', '운전자가 보는 가격에는 세금과 제품가가 섞여 있습니다. 경유가 휘발유보다 싸졌다는 문장만 보면 세금이 바뀐 것처럼 느껴질 수 있지만, 실제로는 국제 제품가와 유통 단계 변화가 더 큰 요인일 때가 많습니다. 그래서 유종 비교 글에서는 세금 구조와 원가 흐름을 분리해서 읽어야 합니다.'],
      ['내 차 유지비 판단', '디젤 차량 운전자는 리터당 가격만 보고 유리하다고 판단하기 쉽습니다. 하지만 연비, 정비비, 환경 규제, 운행 거리, 중고차 가치까지 함께 봐야 합니다. 장거리 고속 주행이 많으면 경유차의 장점이 살아날 수 있지만, 도심 단거리 위주라면 단가 차이만으로 결론을 내기 어렵습니다.'],
      ['뉴스를 소비하는 기준', '경유 가격 뉴스는 자극적인 제목이 많습니다. 가격 역전이 하루인지, 몇 주간 이어지는 추세인지, 전국 평균인지 특정 지역인지 확인해야 합니다. 유가지도는 이런 뉴스를 운전자 의사결정으로 번역해 설명하는 것을 우선합니다.']
    ],
    table: [['요인', '가격에 미치는 방향'], ['국제 경유 수요', '경유 상대 가격 상승 가능'], ['물류 경기', '상용 수요 변화'], ['세금 구조', '유종별 기본 가격 차이']],
    faq: [['경유가 싸지면 디젤차가 무조건 유리한가요?', '아닙니다. 연비와 정비비, 운행 패턴을 함께 계산해야 합니다.'], ['가격 역전은 오래 가나요?', '시장 상황에 따라 달라집니다. 단기 뉴스보다 몇 주 추세를 확인하는 것이 낫습니다.']]
  },
  {
    slug: 'july-fuel-price-outlook',
    category: '에버그린',
    cat: 'ever',
    icon: '📈',
    title: '유가 추세로 보는 7월 기름값 전망',
    description: '7월 기름값을 볼 때 확인해야 할 국제유가, 환율, 세금, 재고 시차를 운전자 관점으로 정리합니다.',
    date: '2026-06-02',
    minutes: 6,
    excerpt: '국제유가, 환율, 재고 시차를 나눠 7월 주유비 방향을 점검합니다.',
    summary: ['7월 기름값은 국제유가 하나만으로 결정되지 않습니다.', '환율과 세금, 정유사 반영 시차가 함께 작동합니다.', '예측보다 중요한 것은 주유 시점 선택 기준을 갖는 것입니다.'],
    sections: [
      ['전망 글을 읽는 순서', '기름값 전망은 방향성을 보는 글이지 확정 가격표가 아닙니다. 먼저 국제유가가 오르는지 내리는지 보고, 다음으로 원달러 환율과 국내 세금 변수를 확인합니다. 마지막으로 그 변화가 국내 주유소 가격에 반영되는 데 걸리는 시간을 감안해야 합니다. 이 순서를 지키면 단기 뉴스에 흔들리지 않고 주유 계획을 세울 수 있습니다.'],
      ['환율이 중요한 이유', '국내 유가는 원화로 결제되는 소비자가격입니다. 국제유가가 안정되어도 환율이 오르면 수입 비용 부담이 커질 수 있습니다. 반대로 국제유가가 소폭 올라도 환율이 안정되면 국내 가격 상승 폭은 제한될 수 있습니다. 그래서 전망 글에서는 유가와 환율을 같은 방향으로만 보지 말아야 합니다.'],
      ['재고 시차와 체감 가격', '정유와 유통 단계에는 시차가 있습니다. 국제 가격 변화가 바로 오늘 동네 주유소 가격에 반영되는 것은 아닙니다. 보통 며칠에서 2주 정도의 지연이 생길 수 있고, 주유소별 재고와 경쟁 상황에 따라 차이가 납니다. 이 때문에 급등 뉴스 직후와 실제 가격표 변화 사이에는 간격이 있습니다.'],
      ['운전자의 행동 기준', '주유량이 적고 주행이 불규칙한 운전자는 너무 세밀한 예측보다 주변 최저가 확인이 더 중요합니다. 반면 장거리 운전이나 영업용 운전자는 월 단위 주유량이 커서 리터당 작은 차이도 누적됩니다. 7월 전망은 언제 넣을지, 어디서 넣을지, 얼마나 넣을지를 나누어 판단할 때 의미가 있습니다.']
    ],
    table: [['변수', '확인 포인트'], ['국제유가', '원가 방향'], ['환율', '수입 비용'], ['세금', '정책 변수'], ['재고', '반영 시차']],
    faq: [['전망이 맞지 않을 수도 있나요?', '그렇습니다. 전망은 변수별 방향을 보는 자료이며 확정 가격이 아닙니다.'], ['언제 가득 넣는 게 좋나요?', '급등이 확실하지 않다면 주변 가격과 운행 계획을 기준으로 나누어 주유하는 편이 현실적입니다.']]
  },
  {
    slug: 'highway-gas-station-price',
    category: '절약팁',
    cat: 'tip',
    icon: '🛣️',
    title: '고속도로 주유소는 왜 더 비쌀까',
    description: '고속도로 주유소 가격이 높게 느껴지는 이유를 입지, 임대 구조, 편의성 프리미엄으로 설명합니다.',
    date: '2026-06-01',
    minutes: 4,
    excerpt: '임대 구조와 입지 프리미엄, 우회 주유 전략을 운전자 관점에서 정리했습니다.',
    summary: ['고속도로 주유소 가격은 접근성과 편의성 비용을 포함해 봐야 합니다.', '무조건 비싸다고 단정하기보다 대안 동선과 시간 비용을 비교해야 합니다.', '장거리 이동 전에는 출발지 근처 가격 확인이 가장 현실적인 절약입니다.'],
    sections: [
      ['고속도로 가격의 구조', '고속도로 주유소는 일반 도심 주유소와 입지 조건이 다릅니다. 운전자는 주행 중 바로 접근할 수 있고, 휴게소 편의시설을 함께 이용합니다. 이 편의성은 가격에 반영될 수 있습니다. 또한 운영 방식과 임대 조건, 물류 동선이 일반 주유소와 다르기 때문에 단순히 같은 기준으로 비교하기 어렵습니다.'],
      ['우회 주유가 항상 답은 아니다', '고속도로를 빠져나가 일반 주유소를 찾으면 리터당 가격은 낮을 수 있습니다. 하지만 톨게이트 이동, 시간 손실, 도심 진입, 신호 대기를 고려해야 합니다. 40리터 주유에서 50원 차이면 2천 원입니다. 이 절감액이 우회 비용보다 작다면 고속도로 주유가 더 합리적일 수 있습니다.'],
      ['출발 전 주유 전략', '가장 쉬운 절약은 고속도로에 오르기 전 목적지 방향의 일반 주유소를 확인하는 것입니다. 출발 직전 반경 2~3km 안에서 가격이 낮은 곳을 고르면 우회 비용이 거의 없습니다. 장거리 이동일수록 출발 전 주유와 휴게소 보충 주유를 나누어 계획하는 것이 좋습니다.'],
      ['안전과 편의의 가치', '야간 운전, 가족 동승, 낯선 지역 이동에서는 몇 천 원보다 안전한 동선이 더 중요할 수 있습니다. 주유 경고등이 켜진 뒤 무리하게 싼 곳을 찾는 것은 위험합니다. 유가지도는 절약을 권하지만, 가격보다 안전과 운행 지속성을 먼저 봐야 한다고 안내합니다.']
    ],
    table: [['선택지', '유리한 상황'], ['출발 전 주유', '가격 확인과 동선이 쉬울 때'], ['고속도로 주유', '시간과 안전이 더 중요할 때'], ['중간 우회', '큰 가격 차이와 자연스러운 출구가 있을 때']],
    faq: [['휴게소 주유소는 항상 비싼가요?', '항상 그렇지는 않습니다. 지역과 시점, 운영 정책에 따라 다릅니다.'], ['주유 경고등이 켜졌다면 어떻게 하나요?', '가격 비교보다 가까운 안전한 주유소를 우선해야 합니다.']]
  },
  {
    slug: 'lpg-car-total-cost',
    category: '에버그린',
    cat: 'ever',
    icon: '⛽',
    title: 'LPG 차량, 지금 갈아탈 만할까',
    description: 'LPG 차량 전환을 고민하는 운전자를 위해 연료비, 차량가, 정비, 충전 인프라를 함께 비교합니다.',
    date: '2026-05-30',
    minutes: 7,
    excerpt: '연료비, 차량가, 충전 인프라를 5년 총비용 관점으로 비교합니다.',
    summary: ['LPG 차량 판단은 리터당 가격만 보면 부족합니다.', '연비, 차량 가격, 충전소 접근성, 주행거리까지 합쳐야 합니다.', '장거리·정기 운행자는 더 꼼꼼히 계산할 가치가 있습니다.'],
    sections: [
      ['LPG가 싸게 느껴지는 이유', 'LPG는 휘발유와 가격 체계가 다르고 리터당 가격이 낮게 보이는 경우가 많습니다. 하지만 연비가 유종마다 다르기 때문에 같은 리터 기준으로만 비교하면 실제 비용을 잘못 볼 수 있습니다. 운전자는 1km를 가는 데 드는 비용, 즉 km당 연료비로 바꿔 계산해야 합니다.'],
      ['5년 총비용으로 보기', '차량을 바꾸는 결정은 이번 달 연료비만의 문제가 아닙니다. 차량 구매가, 중고차 가치, 보험, 정비, 세금, 충전소 접근성을 함께 봐야 합니다. 연간 주행거리가 짧다면 연료비 절감액이 차량 가격 차이를 회수하지 못할 수 있습니다. 반대로 택시처럼 주행거리가 긴 운전자는 작은 단가 차이도 크게 누적됩니다.'],
      ['충전소 접근성', 'LPG 차량은 충전소 위치가 중요합니다. 집, 직장, 자주 가는 동선에 충전소가 없다면 가격이 낮아도 불편이 커집니다. 특히 낯선 지역 장거리 이동이 잦다면 충전 계획을 미리 세워야 합니다. 절약은 매번 쉽게 충전할 수 있을 때 지속됩니다.'],
      ['누구에게 맞나', '일정한 출퇴근 동선이 있고 주행거리가 긴 운전자, 충전소 접근성이 좋은 운전자, 차량을 오래 보유할 계획이 있는 운전자에게 LPG 전환 검토 가치가 큽니다. 반대로 주행거리가 짧고 충전소가 멀다면 휘발유나 하이브리드와 비교하는 편이 낫습니다.']
    ],
    table: [['항목', '확인 질문'], ['연간 주행거리', '절감액이 충분히 누적되는가'], ['충전소 접근성', '생활 동선 안에 있는가'], ['차량 가격', '초기 비용 차이를 회수하는가']],
    faq: [['LPG는 무조건 유지비가 낮나요?', '아닙니다. 주행거리와 연비, 충전소 접근성에 따라 달라집니다.'], ['LPG 차량은 누구에게 유리한가요?', '주행거리가 길고 충전 동선이 안정적인 운전자에게 유리할 가능성이 큽니다.']]
  },
  {
    slug: 'international-oil-to-domestic-price',
    category: '유류세',
    cat: 'tax',
    icon: '🌏',
    title: '국제유가에서 국내 주유소 가격까지, 2주의 메커니즘',
    description: '국제유가 변화가 국내 주유소 가격에 반영되는 경로와 시차를 단계별로 설명합니다.',
    date: '2026-05-29',
    minutes: 6,
    excerpt: '도입가에서 소비자가까지 가격이 흐르는 경로와 반영 시차를 설명합니다.',
    summary: ['국제유가 변화는 국내 가격에 즉시 반영되지 않습니다.', '정유, 유통, 재고, 세금 단계가 가격표를 늦게 움직입니다.', '뉴스와 주유소 가격 사이의 시차를 이해하면 불필요한 오해가 줄어듭니다.'],
    sections: [
      ['가격이 이동하는 경로', '국제유가가 변하면 원유 도입 비용과 석유제품 가격에 영향을 줍니다. 이후 정유사 공급 가격, 대리점과 주유소 유통 단계, 세금, 부가가치세를 거쳐 소비자가 보는 주유소 가격이 됩니다. 이 경로에는 계약, 재고, 물류 시간이 들어가기 때문에 하루 만에 모두 반영되기 어렵습니다.'],
      ['왜 2주라는 말이 나오나', '국내 주유소 가격은 국제 가격보다 늦게 움직이는 경향이 있습니다. 흔히 1~2주 시차가 언급되는 이유는 정유사 공급가와 주유소 재고가 단계적으로 바뀌기 때문입니다. 다만 모든 시점에 정확히 14일이 걸린다는 뜻은 아닙니다. 시장 상황과 지역 경쟁 정도에 따라 더 빠르거나 늦을 수 있습니다.'],
      ['세금의 역할', '유류세는 가격 구조에서 큰 비중을 차지합니다. 원가가 내려가도 세금이 고정되어 있으면 소비자가격 하락 폭은 제한될 수 있습니다. 반대로 세금 인하가 있어도 국제 제품가가 오르면 최종 가격은 덜 내려갈 수 있습니다. 그래서 국내 가격은 원가와 세금을 분리해서 봐야 합니다.'],
      ['운전자에게 필요한 해석', '국제유가 급락 뉴스가 나왔는데 동네 주유소 가격이 그대로라면 바로 이상하다고 볼 필요는 없습니다. 반영 시차가 있는지, 같은 지역 다른 주유소는 어떤지, 최근 환율은 어땠는지 확인해야 합니다. 유가지도는 가격 흐름을 단계별로 나누어 독자가 스스로 판단할 수 있게 돕습니다.']
    ],
    table: [['단계', '확인할 것'], ['국제 제품가', '원가 방향'], ['정유사 공급가', '국내 반영 시작'], ['주유소 재고', '소비자가격 시차'], ['세금', '고정/정책 변수']],
    faq: [['국제유가가 내렸는데 왜 주유소는 그대로인가요?', '재고와 공급가 반영 시차 때문일 수 있습니다. 지역별 경쟁도도 영향을 줍니다.'], ['항상 2주 뒤에 반영되나요?', '아닙니다. 1~2주는 이해를 돕는 범위이며 실제 시차는 달라질 수 있습니다.']]
  },
  {
    slug: 'regional-fuel-price-comparison-june',
    category: '지역가이드',
    cat: 'region',
    icon: '🗺️',
    title: '부산·대구·광주, 6월 유가 비교',
    description: '부산, 대구, 광주 유가를 비교할 때 봐야 할 도시 구조, 이동 동선, 평균 대비 차이를 정리합니다.',
    date: '2026-05-28',
    minutes: 5,
    excerpt: '주요 광역시 평균가를 비교할 때 놓치기 쉬운 기준과 운전자 판단법입니다.',
    summary: ['도시별 유가 비교는 단순 순위보다 생활 동선이 중요합니다.', '항만, 산업, 도심 구조에 따라 가격 형성이 달라질 수 있습니다.', '평균 대비 차이를 1회 주유액으로 바꿔야 체감됩니다.'],
    sections: [
      ['도시별 가격을 비교하는 이유', '부산, 대구, 광주는 생활권과 교통 구조가 다릅니다. 항만 물류가 있는 도시, 내륙 교통 중심 도시, 주변 지역과 통행이 잦은 도시는 주유 수요와 입지가 다르게 형성됩니다. 그래서 같은 리터당 가격이라도 운전자가 느끼는 부담은 동선과 주행 목적에 따라 다릅니다.'],
      ['순위보다 차이 금액', '도시별 순위는 보기 쉽지만 의사결정에는 부족합니다. 1위와 2위 차이가 리터당 10원이라면 실제 주유비 차이는 크지 않을 수 있습니다. 반대로 70원 이상 벌어지면 40리터 기준 2,800원 차이가 생깁니다. 비교 글은 순위보다 금액 차이를 먼저 보여주는 것이 좋습니다.'],
      ['도시 안에서도 다르다', '광역시 평균이 낮아도 특정 도심 주유소는 높을 수 있고, 평균이 높아도 외곽 셀프주유소는 낮을 수 있습니다. 평균은 방향을 잡는 기준이고, 실제 주유는 주변 주유소 가격을 확인해야 합니다. 특히 출퇴근 경로에 있는 주유소와 목적지 근처 주유소를 함께 비교하면 절약 가능성이 커집니다.'],
      ['6월 비교를 읽는 법', '6월은 여름 휴가철 전 이동 수요와 정책 변수, 국제 가격 변화가 함께 거론되는 시기입니다. 특정 날짜의 수치만 기억하기보다 기준일, 평균 대비 차이, 내 주행 동선을 함께 기록하는 것이 유용합니다. 유가지도는 도시별 평균을 과장하지 않고 운전자가 실제로 쓸 수 있는 비교 기준으로 풀어냅니다.']
    ],
    table: [['도시 비교 항목', '해석'], ['평균가', '도시 전체 기준'], ['외곽 가격', '우회 주유 가능성'], ['생활 동선', '실제 절약 가능성']],
    faq: [['도시 평균이 낮으면 어디서나 싼가요?', '아닙니다. 같은 도시 안에서도 주유소별 가격 차이가 큽니다.'], ['다른 도시에서 주유하는 게 유리한가요?', '장거리 이동 동선에 자연스럽게 포함될 때만 검토할 가치가 있습니다.']]
  },
  {
    slug: 'cheap-gas-station-vs-regular-annual-savings',
    category: '절약팁',
    cat: 'tip',
    icon: '📲',
    title: '알뜰주유소 vs 일반 주유소, 1년이면 얼마 차이?',
    description: '알뜰주유소와 일반 주유소 가격 차이를 월 주유량 기준으로 계산하고 선택 기준을 정리합니다.',
    date: '2026-05-27',
    minutes: 5,
    excerpt: '월 2회 주유 가정으로 알뜰주유소 절감액을 계산하는 방법을 정리했습니다.',
    summary: ['알뜰주유소 절감액은 리터당 차이와 월 주유량으로 계산합니다.', '가격 차이가 작으면 이동 거리와 대기 시간이 더 중요할 수 있습니다.', '자주 가는 동선 안에 있을 때 절약 효과가 안정적으로 누적됩니다.'],
    sections: [
      ['연간 절감액 계산법', '알뜰주유소가 리터당 40원 낮고 한 번에 40리터를 넣는다면 1회 절감액은 1,600원입니다. 월 2회 주유하면 3,200원, 1년이면 38,400원입니다. 차이가 80원이라면 연간 절감액은 두 배가 됩니다. 이렇게 리터당 차이를 실제 주유량으로 바꾸면 절약의 크기가 명확해집니다.'],
      ['가격 차이가 작을 때', '리터당 10~20원 차이는 숫자로는 좋아 보여도 실제 금액은 크지 않을 수 있습니다. 멀리 돌아가거나 대기 시간이 길다면 절약 효과가 사라집니다. 가까운 알뜰주유소가 있고 동선이 자연스럽다면 작은 차이도 누적되지만, 일부러 찾아갈 때는 기준을 높게 잡아야 합니다.'],
      ['일반 주유소가 나을 때', '카드 할인, 세차, 포인트, 위치 편의성이 큰 일반 주유소라면 표시 가격이 조금 높아도 실질 비용이 낮을 수 있습니다. 특히 특정 카드가 리터당 할인이나 청구 할인을 제공한다면 알뜰주유소와 비교 방식이 달라집니다. 결론은 표시 가격이 아니라 결제 후 체감액입니다.'],
      ['나에게 맞는 선택', '월 주유량이 많은 운전자, 출퇴근 경로에 알뜰주유소가 있는 운전자, 카드 할인 조건이 단순한 운전자는 알뜰주유소의 장점이 큽니다. 반면 주행량이 적고 가까운 일반 주유소 할인 혜택이 큰 운전자는 굳이 바꿀 필요가 없을 수 있습니다.']
    ],
    table: [['리터당 차이', '40리터 1회 절감'], ['20원', '800원'], ['40원', '1,600원'], ['80원', '3,200원']],
    faq: [['알뜰주유소는 항상 가장 싼가요?', '아닙니다. 지역과 시점에 따라 일반 셀프주유소가 더 낮을 수 있습니다.'], ['연간 절감액은 어떻게 계산하나요?', '리터당 차이 × 1회 주유량 × 연간 주유 횟수로 계산하면 됩니다.']]
  }
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function prettyDate(d) {
  return d.replaceAll('-', '.');
}

function toneFor(post) {
  return {
    tax: { label: '정책 변수', note: '발표일과 실제 주유소 가격 반영일은 다를 수 있습니다.', className: 'tone-amber' },
    tip: { label: '절약 판단', note: '리터당 가격보다 이동 거리와 대기 시간을 함께 계산해야 합니다.', className: 'tone-green' },
    region: { label: '지역 비교', note: '평균가는 방향을 잡는 기준이며 실제 결제가는 주유소별로 달라집니다.', className: 'tone-blue' },
    news: { label: '뉴스 해석', note: '하루 가격보다 몇 주간의 흐름과 기준 지역을 함께 확인하세요.', className: 'tone-teal' },
    ever: { label: '장기 판단', note: '연료비만 보지 말고 차량가, 정비, 동선까지 총비용으로 봐야 합니다.', className: 'tone-slate' }
  }[post.cat] || { label: '확인 기준', note: '기준일과 출처를 함께 확인한 뒤 실제 결제 조건을 보세요.', className: 'tone-teal' };
}

function scenarioFor(post) {
  const map = {
    'fuel-tax-cut-extension': {
      label: '정책 체감액',
      title: '인하율보다 반영 시차를 먼저 본다',
      quick: [['시행일', '고시 기준일과 재고 소진일 분리'], ['40L 기준', '리터당 50원 차이 = 2,000원']],
      metrics: [['50원', '40L 1회 = 2,000원'], ['3회', '월 3회 주유 = 6,000원'], ['1~2주', '재고 반영 시차 확인']],
      body: ['유류세 글은 정책 발표 자체보다 내 동네 주유소 가격표가 언제 움직이는지를 보는 글입니다. 같은 인하율이라도 주유소 재고, 매입 시점, 지역 경쟁도에 따라 체감일이 달라집니다.', '운전자는 시행일, 오피넷 평균가, 자주 가는 주유소의 최근 변동을 나란히 봐야 합니다. 발표 당일에 바로 가득 넣거나 무작정 미루는 것보다 며칠간 가격 흐름을 확인하는 편이 더 안정적입니다.']
    },
    'self-service-gas-station-price-gap': {
      label: '셀프 절약액',
      title: '싼 가격이 이동 시간을 이겨야 한다',
      quick: [['30원 차이', '40L 기준 1,200원'], ['왕복 거리', '우회 시간이 길면 절감액 축소']],
      metrics: [['30원', '40L 1회 = 1,200원'], ['80원', '40L 1회 = 3,200원'], ['2~3km', '생활 동선 안이면 유리']],
      body: ['셀프주유소는 가격표만 보면 매력적이지만, 실제 절약은 이동 거리와 대기 시간을 뺀 뒤 남는 금액입니다. 리터당 30원 차이는 40리터 기준 1,200원이므로 멀리 돌아갈 이유가 약할 수 있습니다.', '반대로 출퇴근 동선 안에서 리터당 50원 이상 낮다면 월 단위로 의미가 생깁니다. 자주 가는 셀프주유소를 1~2곳 정해두면 검색 피로도 줄일 수 있습니다.']
    },
    'seoul-district-gasoline-price-map': {
      label: '구별 비교',
      title: '서울 평균보다 인접 구 차이가 더 중요하다',
      quick: [['80원 차이', '40L 기준 3,200원'], ['우회 판단', '출퇴근 동선에 있을 때만 유리']],
      metrics: [['서울 평균', '도시 내부 기준선'], ['인접 구', '실제 우회 가능성'], ['40L', '리터당 차이를 결제액으로 환산']],
      body: ['서울 구별 가격은 순위보다 이동 가능성이 중요합니다. 내가 이미 지나가는 구에서 낮은 가격을 찾으면 절약이 되지만, 일부러 먼 구까지 이동하면 시간과 연료가 함께 듭니다.', '따라서 서울 가격 글은 가장 싼 구를 찾는 글이 아니라 내 동선의 후보 구를 좁히는 글로 읽는 편이 정확합니다. 평균, 인접 구, 현재 위치를 함께 놓고 판단하세요.']
    },
    'diesel-cheaper-than-gasoline': {
      label: '유종 비교',
      title: '오늘 단가보다 내 차의 km당 비용을 본다',
      quick: [['유종 차이', '세금·제품가·수요가 따로 움직임'], ['차량 판단', '연비와 정비비까지 포함']],
      metrics: [['리터당 가격', '표시 가격 비교'], ['연비', 'km당 비용 환산'], ['정비비', '장기 유지비 변수']],
      body: ['경유가 휘발유보다 싸졌다는 문장은 단기 뉴스로는 흥미롭지만, 차량 유지비 결론을 바로 내리기에는 부족합니다. 유종별 연비와 정비비, 운행 거리까지 합쳐야 합니다.', '특히 도심 단거리 운전자는 단가 차이보다 정비와 규제 부담이 더 크게 느껴질 수 있습니다. 장거리 운전자는 km당 비용을 계산해보는 방식이 더 실용적입니다.']
    },
    'july-fuel-price-outlook': {
      label: '전망 사용법',
      title: '예측보다 주유 타이밍 기준을 세운다',
      quick: [['국제유가', '방향성 확인'], ['환율·세금', '국내 가격 변수 분리']],
      metrics: [['1단계', '국제유가 방향'], ['2단계', '환율과 세금'], ['3단계', '주유소 반영 시차']],
      body: ['전망 글은 특정 날짜의 가격을 맞히는 글이 아니라, 변수를 나눠 보는 기준표입니다. 국제유가가 내려도 환율이 오르면 국내 체감은 제한될 수 있습니다.', '주유량이 적은 운전자는 주변 최저가 확인이 더 중요하고, 월 주유량이 큰 운전자는 며칠 단위 흐름을 보며 분할 주유를 검토할 수 있습니다.']
    },
    'highway-gas-station-price': {
      label: '우회 손익',
      title: '톨게이트와 시간을 빼고도 남는지 계산한다',
      quick: [['50원 차이', '40L 기준 2,000원'], ['우회 비용', '시간·거리·안전성 포함']],
      metrics: [['출발 전', '일반 주유소 확인'], ['휴게소', '시간과 안전 우선'], ['우회', '큰 차이일 때만 검토']],
      body: ['고속도로 주유소는 비싸게 느껴져도 접근성과 안전이라는 비용을 포함합니다. 리터당 50원 차이로 2,000원을 아끼려다 긴 우회와 대기를 감수하면 실익이 작아집니다.', '가장 쉬운 전략은 고속도로에 오르기 전 출발지 주변에서 넣는 것입니다. 이미 경고등이 켜졌다면 가격보다 가까운 안전한 주유소가 우선입니다.']
    },
    'lpg-car-total-cost': {
      label: '총비용 판단',
      title: '리터당 가격보다 5년 유지비를 본다',
      quick: [['km당 비용', '연비 차이 반영'], ['충전 동선', '집·직장 주변 접근성 확인']],
      metrics: [['연료비', '월 주행거리로 환산'], ['차량가', '초기 비용 회수 여부'], ['충전소', '생활 동선 안 접근성']],
      body: ['LPG 차량은 리터당 가격만 보면 유리해 보일 수 있지만, 실제 판단은 km당 연료비와 차량 가격, 충전소 접근성을 합친 총비용입니다.', '연간 주행거리가 길고 충전소가 생활권 안에 있으면 검토 가치가 커집니다. 반대로 주행거리가 짧거나 충전 동선이 불편하면 낮은 단가가 체감되지 않을 수 있습니다.']
    },
    'international-oil-to-domestic-price': {
      label: '가격 전달 경로',
      title: '국제 뉴스와 동네 가격 사이에는 단계가 있다',
      quick: [['1~2주', '공급가·재고 반영 시차'], ['세금', '하락 폭을 제한하는 고정 변수']],
      metrics: [['국제 제품가', '원가 방향'], ['정유사 공급가', '국내 반영 시작'], ['주유소 재고', '소비자가 시차']],
      body: ['국제유가 뉴스가 나왔는데 동네 주유소 가격이 그대로라면 이상하다고 단정하기 어렵습니다. 원유, 제품가, 공급가, 재고, 세금 단계를 거치며 시간이 걸립니다.', '이 글은 가격이 왜 늦게 움직이는지 설명하는 기준표입니다. 단기 뉴스보다 같은 지역 주유소들의 며칠간 움직임을 함께 보면 오해가 줄어듭니다.']
    },
    'regional-fuel-price-comparison-june': {
      label: '도시 비교',
      title: '도시 순위보다 내 이동권 가격을 본다',
      quick: [['70원 차이', '40L 기준 2,800원'], ['생활 동선', '외곽·도심 차이 확인']],
      metrics: [['평균가', '도시 전체 방향'], ['외곽', '우회 가능성'], ['동선', '실제 절약 가능성']],
      body: ['부산, 대구, 광주 같은 광역시 비교는 순위만으로 결론 내리기 어렵습니다. 같은 도시 안에서도 외곽, 도심, 산업지, 항만 주변의 가격이 다르게 형성됩니다.', '도시 평균은 큰 방향을 잡는 도구로 쓰고, 실제 주유는 출퇴근 경로와 목적지 주변 가격을 함께 확인해야 합니다. 그래야 평균보다 나에게 의미 있는 가격을 찾을 수 있습니다.']
    },
    'cheap-gas-station-vs-regular-annual-savings': {
      label: '연간 절감',
      title: '리터당 차이를 1년 주유 횟수로 확장한다',
      quick: [['40원 차이', '월 2회면 연 38,400원'], ['할인 조건', '카드·포인트 포함 비교']],
      metrics: [['20원', '40L 1회 = 800원'], ['40원', '월 2회 = 3,200원'], ['1년', '40원 차이 = 38,400원']],
      body: ['알뜰주유소 절약액은 리터당 차이를 주유량과 횟수로 확장하면 바로 보입니다. 리터당 40원 차이는 작아 보여도 월 2회 40리터 기준으로 1년 38,400원입니다.', '다만 일반 주유소의 카드 할인, 세차, 포인트가 크면 표시 가격만으로 판단하면 안 됩니다. 결제 후 체감액과 생활 동선을 함께 비교해야 합니다.']
    }
  };
  return map[post.slug] || {
    label: '실전 판단',
    title: '가격 차이를 내 주유량으로 환산한다',
    quick: [['40L 기준', '리터당 50원 차이 = 2,000원'], ['월 2회', '작은 차이도 누적']],
    metrics: [['30원', '40L 1회 = 1,200원'], ['50원', '40L 1회 = 2,000원'], ['80원', '월 2회 = 6,400원']],
    body: ['가격 글은 리터당 숫자를 실제 결제액으로 바꿀 때 의미가 커집니다.', '우회 거리와 결제 조건까지 함께 보면 내 상황에서 유리한 선택을 고를 수 있습니다.']
  };
}

function qualityFor(post) {
  const map = {
    'fuel-tax-cut-extension': {
      keyword: '유류세 인하 연장',
      answer: '유류세 인하 연장은 발표일보다 시행일, 재고 소진, 주유소 유형을 나눠 봐야 실제 체감 시점을 판단할 수 있습니다.',
      lens: [['검색 의도', '7월부터 바로 싸지는지 확인하려는 운전자'], ['핵심 변수', '시행일·재고·직영/자영 가격 반영 속도'], ['유가지도 판단', '발표 문구보다 주변 가격의 며칠 추세가 더 실용적']]
    },
    'self-service-gas-station-price-gap': {
      keyword: '셀프주유소 싼 이유',
      answer: '셀프주유소가 싼 이유는 인건비만이 아니라 회전율, 입지, 브랜드 정책, 결제 조건이 함께 작동하기 때문입니다.',
      lens: [['검색 의도', '셀프주유소가 왜 싼지와 실제 절약 여부 확인'], ['핵심 변수', '리터당 차이·왕복 거리·대기 시간'], ['유가지도 판단', '50원 이상 차이거나 생활 동선 안이면 검토 가치가 큼']]
    },
    'seoul-district-gasoline-price-map': {
      keyword: '서울 휘발유 가격 지도',
      answer: '서울 휘발유 가격은 가장 싼 구보다 내 이동 동선 안에서 평균 대비 얼마나 낮은지를 보는 편이 실전 절약에 가깝습니다.',
      lens: [['검색 의도', '서울 구별 가격 차이와 우회 주유 가치 확인'], ['핵심 변수', '서울 평균·인접 구·출퇴근 동선'], ['유가지도 판단', '순위보다 40L 기준 절감액과 이동 비용을 함께 비교']]
    },
    'diesel-cheaper-than-gasoline': {
      keyword: '경유 휘발유 가격 역전',
      answer: '경유가 휘발유보다 싸졌다는 뉴스는 유종별 제품가, 수요, 세금, 재고가 엇갈린 결과로 봐야 합니다.',
      lens: [['검색 의도', '경유 가격 하락 이유와 디젤차 유지비 판단'], ['핵심 변수', '국제 제품가·산업 수요·연비·정비비'], ['유가지도 판단', '오늘 단가보다 km당 비용과 장기 유지비가 더 중요']]
    },
    'july-fuel-price-outlook': {
      keyword: '7월 기름값 전망',
      answer: '7월 기름값 전망은 국제유가 하나로 결정되지 않고 환율, 세금, 정유사 공급가, 주유소 재고 시차가 함께 만듭니다.',
      lens: [['검색 의도', '7월에 기름값이 오를지 내릴지 판단'], ['핵심 변수', '국제유가·환율·세금·반영 시차'], ['유가지도 판단', '예측보다 분할 주유와 주변 가격 확인 기준을 세우는 것이 실용적']]
    },
    'highway-gas-station-price': {
      keyword: '고속도로 주유소 비싼 이유',
      answer: '고속도로 주유소가 비싸게 느껴지는 이유는 접근성, 임대 구조, 휴게소 편의성, 우회 비용이 가격에 함께 반영되기 때문입니다.',
      lens: [['검색 의도', '휴게소 주유소가 왜 비싼지와 우회 주유 여부 확인'], ['핵심 변수', '리터당 차이·톨게이트·시간·안전'], ['유가지도 판단', '출발 전 주유가 가장 단순하고 안전한 절약 방법']]
    },
    'lpg-car-total-cost': {
      keyword: 'LPG 차량 유지비',
      answer: 'LPG 차량은 리터당 가격만 보면 안 되고 연비, 차량가, 정비, 충전소 접근성을 합친 총비용으로 판단해야 합니다.',
      lens: [['검색 의도', 'LPG 차량으로 갈아탈 가치와 유지비 확인'], ['핵심 변수', 'km당 비용·연간 주행거리·충전 동선'], ['유가지도 판단', '주행거리가 길고 충전소가 가까울수록 검토 가치가 커짐']]
    },
    'international-oil-to-domestic-price': {
      keyword: '국제유가 국내 주유소 가격 반영',
      answer: '국제유가가 국내 주유소 가격에 바로 반영되지 않는 이유는 정유사 공급가, 유통, 재고, 세금 단계를 거치기 때문입니다.',
      lens: [['검색 의도', '국제유가 뉴스와 동네 가격 차이의 이유 확인'], ['핵심 변수', '제품가·공급가·재고·세금'], ['유가지도 판단', '하루 뉴스보다 1~2주 가격 흐름을 함께 보는 것이 정확']]
    },
    'regional-fuel-price-comparison-june': {
      keyword: '지역별 유가 비교',
      answer: '지역별 유가 비교는 도시 순위보다 내 생활권 안에서 평균 대비 얼마나 차이가 나는지를 봐야 실제 절약으로 이어집니다.',
      lens: [['검색 의도', '부산·대구·광주 등 도시별 가격 차이 확인'], ['핵심 변수', '도시 평균·외곽 가격·생활 동선'], ['유가지도 판단', '평균은 방향, 실제 주유는 주변 개별 가격으로 결정']]
    },
    'cheap-gas-station-vs-regular-annual-savings': {
      keyword: '알뜰주유소 일반 주유소 차이',
      answer: '알뜰주유소와 일반 주유소 차이는 리터당 가격을 연간 주유 횟수로 확장하고 카드 할인까지 포함해 비교해야 합니다.',
      lens: [['검색 의도', '알뜰주유소를 쓰면 1년에 얼마나 아끼는지 확인'], ['핵심 변수', '리터당 차이·월 주유 횟수·카드 할인'], ['유가지도 판단', '동선 안에 있으면 누적 절감, 멀면 일반 주유소가 나을 수 있음']]
    }
  };
  return map[post.slug] || {
    keyword: post.title,
    answer: post.description,
    lens: [['검색 의도', '주유비 판단 기준 확인'], ['핵심 변수', '가격·동선·기준일'], ['유가지도 판단', '실제 주유 전 원천 가격 확인']]
  };
}

function articleHtml(post, allPosts) {
  const related = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);
  const prev = allPosts[allPosts.findIndex(p => p.slug === post.slug) + 1];
  const next = allPosts[allPosts.findIndex(p => p.slug === post.slug) - 1];
  const tone = toneFor(post);
  const scenario = scenarioFor(post);
  const quality = qualityFor(post);
  const toc = post.sections.map(([h], i) => `<li><a href="#s${i + 1}">${esc(h)}</a></li>`).join('\n            ');
  const sections = post.sections.map(([h, body], i) => `
        <section class="section-block ${['tone-teal', 'tone-blue', 'tone-amber', 'tone-green'][i % 4]}">
          <h2 id="s${i + 1}">${esc(h)}</h2>
          <p>${esc(body)}</p>
        </section>
        ${i === 0 ? `<div class="callout ${tone.className}"><div class="ci">!</div><div class="ct"><b>${esc(tone.label)}</b><span>${esc(tone.note)}</span></div></div>` : ''}
        ${i === 1 ? `<div class="mini-math">${scenario.quick.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</div>` : ''}`).join('\n');
  const rows = post.table.map((r, i) => `<tr>${r.map(c => i === 0 ? `<th>${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n              ');
  const faq = post.faq.map(([q, a], i) => `
          <div class="faq-item${i === 0 ? ' open' : ''}">
            <button class="faq-q"><span class="qmark">Q</span>${esc(q)}<span class="caret">⌄</span></button>
            <div class="faq-a"><div class="faq-a-inner">${esc(a)}</div></div>
          </div>`).join('\n');
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        url: `${site}/blog/${post.slug}/`,
        datePublished: post.date,
        dateModified: today,
        inLanguage: 'ko-KR',
        keywords: [quality.keyword, post.category, '유가지도', '주유비', '오피넷'],
        about: { '@type': 'Thing', name: quality.keyword },
        author: { '@type': 'Organization', name: '유가지도 편집팀' },
        publisher: { '@type': 'Organization', name: '유가지도', url: `${site}/` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${site}/blog/${post.slug}/` }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: '블로그', item: `${site}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${site}/blog/${post.slug}/` }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: post.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
      }
    ]
  };
  return `<!DOCTYPE html>
<html lang="ko" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(post.title)} — 유가지도</title>
<meta name="description" content="${esc(post.description)}">
<meta name="keywords" content="${esc([quality.keyword, post.category, '유가지도', '주유비', '오피넷'].join(', '))}">
<link rel="canonical" href="${site}/blog/${post.slug}/">
<meta property="og:site_name" content="유가지도">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(post.title)} — 유가지도">
<meta property="og:description" content="${esc(post.description)}">
<meta property="og:url" content="${site}/blog/${post.slug}/">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(post.title)} — 유가지도">
<meta name="twitter:description" content="${esc(post.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="alternate" type="application/rss+xml" title="유가지도 블로그" href="/feed.xml">
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/components.css">
<link rel="stylesheet" href="/styles/blog.css">
<link rel="stylesheet" href="/styles/article.css">
<script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2PB8D7610M"></script>
${adsense}
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2PB8D7610M');
</script>
</head>
<body>
<div class="read-bar" id="readBar"></div>
<div class="blog-shell">
  <header class="site-header" data-screen-label="글 상세 헤더">
    <a class="brand" href="/" aria-label="유가지도 홈"><span class="brand-mark">유</span>유가지도</a>
    <nav class="site-nav" aria-label="주요 메뉴">
      <a href="/">홈</a>
      <a href="/blog/" style="color:var(--primary);font-weight:700">블로그</a>
      <a href="/blog/fuel-tax-cut-extension/">유류세</a>
      <a href="/privacy/">개인정보</a>
      <a href="/contact/">문의</a>
    </nav>
    <a class="btn btn-primary btn-sm header-cta" href="/유가지도 디자인 시스템.html#components">유류세 계산</a>
  </header>
</div>

<main class="article-wrap" data-screen-label="글 상세">
  <article>
    <header class="art-hero">
      <nav class="crumb" style="margin-bottom:16px">
        <a href="/">홈</a><span class="sep">›</span>
        <a href="/blog/">블로그</a><span class="sep">›</span>
        <span class="cur">${esc(post.category)}</span>
      </nav>
      <span class="chip-cat ${post.cat}">${esc(post.category)}</span>
      <h1>${esc(post.title)}</h1>
      <p class="dek">${esc(post.description)}</p>
      <div class="art-byline">
        <div class="av">📝</div>
        <div>
          <div class="who">유가지도 편집팀</div>
          <div class="meta"><b>${prettyDate(post.date)}</b> 작성 · <b>${prettyDate(today)}</b> 업데이트 · 읽는 시간 ${post.minutes}분</div>
        </div>
      </div>
    </header>

    <div class="share share-inline" id="shareInline">
      <span class="lbl">공유</span>
      <button data-share="copy" title="링크 복사" aria-label="링크 복사">🔗</button>
      <button data-share="x" title="X(트위터)" aria-label="X 공유">X</button>
      <button data-share="facebook" title="페이스북" aria-label="페이스북 공유">f</button>
      <span class="copied" id="copyMsg" hidden>복사됨!</span>
    </div>

    <div class="art-grid">
      <div class="prose" id="prose">
        <div class="tldr">
          <div class="k">3줄 요약</div>
          <ul>${post.summary.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        </div>

        <div class="answer-box ${tone.className}" id="answer">
          <div class="answer-k">검색 질문에 대한 답</div>
          <p><b>${esc(quality.keyword)}</b>: ${esc(quality.answer)}</p>
        </div>

        <div class="read-map" aria-label="이 글을 읽는 순서">
          <a href="#answer"><b>답변</b><span>핵심 결론 확인</span></a>
          <a href="#calc"><b>계산</b><span>내 주유량으로 환산</span></a>
          <a href="#checklist"><b>확인</b><span>주유 전 체크</span></a>
        </div>
${sections}
        <figure class="figure">
          <table class="art-table">
            <tbody>
              ${rows}
            </tbody>
          </table>
          <figcaption>유가지도 편집 기준표 · 기준일 ${prettyDate(today)}</figcaption>
        </figure>

        <div class="insight-panel">
          <div class="insight-head">유가지도 분석 포인트</div>
          <div class="insight-grid">
            ${quality.lens.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('\n            ')}
          </div>
        </div>

        <h2 id="calc">내 주유비로 바꿔 계산하기</h2>
        <div class="calc-card">
          <div class="calc-head">
            <span>${esc(scenario.label)}</span>
            <strong>${esc(scenario.title)}</strong>
          </div>
          <div class="calc-grid">
            ${scenario.metrics.map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('\n            ')}
          </div>
          ${scenario.body.map(p => `<p>${esc(p)}</p>`).join('\n          ')}
        </div>

        <h2 id="checklist">주유 전 체크리스트</h2>
        <div class="check-grid">
          <div><b>기준일</b><span>어제 평균가와 오늘 개별 주유소 가격은 다를 수 있습니다.</span></div>
          <div><b>결제 조건</b><span>오피넷 공개 가격, 현장 가격표, 카드 청구 할인을 분리해서 봅니다.</span></div>
          <div><b>주유소 유형</b><span>셀프, 알뜰, 직영, 일반 주유소는 운영 방식과 동선이 다릅니다.</span></div>
          <div><b>이동 경로</b><span>출발지와 목적지 주변 가격을 함께 확인해 불필요한 우회를 줄입니다.</span></div>
        </div>

        <h2 id="mistakes">자주 생기는 오해</h2>
        <p>첫 번째 오해는 가격이 높은 지역이나 주유소를 곧바로 나쁘다고 판단하는 것입니다. 유가는 입지, 임대료, 물류, 브랜드 정책, 재고 시점, 경쟁 밀도에 따라 달라집니다. 유가지도는 특정 지역이나 사업자를 평가하지 않고 평균 대비 차이, 리터당 차이, 1회 주유액 차이처럼 검증 가능한 표현을 사용합니다. 독자도 가격 정보를 볼 때 감정적인 표현보다 숫자와 기준을 우선하는 것이 좋습니다.</p>
        <p>두 번째 오해는 뉴스가 나온 날 바로 가격이 바뀐다고 기대하는 것입니다. 국제유가, 세금, 환율, 정유사 공급가, 주유소 재고가 단계적으로 움직이기 때문에 가격표는 늦게 반응할 수 있습니다. 반대로 이미 시장이 먼저 움직인 뒤 뉴스가 나오는 경우도 있습니다. 그래서 한 번의 기사보다 며칠간의 추세와 주변 주유소의 상대 가격을 같이 보는 습관이 필요합니다.</p>
        <p>세 번째 오해는 리터당 최저가만 찾으면 항상 절약된다는 생각입니다. 운전자는 시간을 쓰고, 차는 이동하면서 연료를 씁니다. 가격 차이가 작다면 가까운 주유소가 더 합리적일 수 있고, 가격 차이가 크더라도 진입 동선이 복잡하거나 대기가 길면 실익이 줄어듭니다. 절약은 낮은 가격표가 아니라 낮은 총비용을 고르는 일입니다.</p>

        <h2 id="update">업데이트 기준과 한계</h2>
        <p>이 글은 ${prettyDate(today)} 기준으로 공개된 정보와 유가지도 편집 기준에 맞춰 작성했습니다. 공개 데이터는 수집과 표시 사이에 지연이 있을 수 있고, 개별 주유소의 실제 결제 가격은 현장 사정에 따라 달라질 수 있습니다. 따라서 이 글은 주유 행동을 돕는 해설로 사용하고, 실제 주유 직전에는 원천 데이터와 현장 가격을 함께 확인하는 것이 좋습니다.</p>
        <p>유가지도는 정보의 신뢰도를 높이기 위해 출처를 본문 가까이에 배치하고, 가격이나 정책처럼 변동성이 큰 내용에는 기준일을 표시합니다. 앞으로 새 데이터가 확인되면 글의 날짜와 설명을 갱신할 수 있습니다. 독자가 오류를 발견하면 문의 페이지를 통해 페이지 주소, 문제 문장, 확인한 출처를 함께 보내면 검토에 도움이 됩니다.</p>

        <h2 id="source">출처와 확인 방법</h2>
        <p>가격과 정책은 시점에 따라 달라질 수 있습니다. 이 글은 운전자가 판단 순서를 잡도록 돕는 해설이며, 실제 주유 전에는 <a class="inline" href="https://www.opinet.co.kr/" rel="noopener" target="_blank">한국석유공사 오피넷</a>, <a class="inline" href="https://www.data.go.kr/" rel="noopener" target="_blank">공공데이터포털</a>, 관련 정부 고시를 함께 확인하는 것이 좋습니다.</p>
        <p>관련 글로는 <a class="inline" href="/blog/fuel-tax-cut-extension/">유류세 인하 연장 해설</a>, <a class="inline" href="/blog/international-oil-to-domestic-price/">국제유가에서 국내 가격까지의 반영 시차</a>, <a class="inline" href="/blog/cheap-gas-station-vs-regular-annual-savings/">알뜰주유소 연간 절감액 계산</a>을 함께 볼 수 있습니다.</p>

        <div class="article-cta">
          <div>
            <b>다음 판단이 필요하다면</b>
            <span>정책 변화, 지역 평균, 절약 계산 글을 이어서 보면 주유비 판단이 더 쉬워집니다.</span>
          </div>
          <div class="cta-links">
            <a href="/blog/fuel-tax-cut-extension/">유류세 보기</a>
            <a href="/blog/seoul-district-gasoline-price-map/">지역 가격 보기</a>
            <a href="/blog/cheap-gas-station-vs-regular-annual-savings/">절약 계산 보기</a>
          </div>
        </div>

        <h2 id="faq">자주 묻는 질문</h2>
        <div class="faq" id="faq">${faq}
        </div>

        <div class="author-box">
          <div class="ab-av">📝</div>
          <div>
            <div class="ab-name">유가지도 편집팀</div>
            <div class="ab-bio">오피넷 공공데이터와 정부 공개 자료를 기준으로 유가 구조, 유류세, 주유비 절약 판단법을 설명합니다.</div>
            <div class="ab-ai">ⓘ 이 글의 일부 문장은 AI 작성 보조를 사용했으며, 수치·출처·표현은 공개 자료 기준으로 검수합니다.</div>
          </div>
        </div>

        <nav class="prevnext" aria-label="이전·다음 글">
          ${prev ? `<a class="pn-card prev" href="/blog/${prev.slug}/"><div class="dir">이전 글</div><div class="pn-t">${esc(prev.title)}</div></a>` : '<span class="pn-card prev"><div class="dir">이전 글</div><div class="pn-t">첫 글입니다</div></span>'}
          ${next ? `<a class="pn-card next" href="/blog/${next.slug}/"><div class="dir">다음 글</div><div class="pn-t">${esc(next.title)}</div></a>` : '<span class="pn-card next"><div class="dir">다음 글</div><div class="pn-t">최신 글입니다</div></span>'}
        </nav>
      </div>

      <aside class="art-side">
        <nav class="toc" id="toc" aria-label="목차">
          <div class="k">목차</div>
          <ol>
            ${toc}
            <li><a href="#calc">내 주유비로 바꿔 계산하기</a></li>
            <li><a href="#checklist">주유 전 체크리스트</a></li>
            <li><a href="#mistakes">자주 생기는 오해</a></li>
            <li><a href="#update">업데이트 기준과 한계</a></li>
            <li><a href="#source">출처와 확인 방법</a></li>
            <li><a href="#faq">자주 묻는 질문</a></li>
          </ol>
        </nav>
        <div class="side-note ${tone.className}">
          <div class="k">${esc(tone.label)}</div>
          <p>${esc(tone.note)}</p>
          <a href="#calc">계산 예시로 이동</a>
        </div>
      </aside>
    </div>
  </article>

  <section class="related">
    <h2>관련 글</h2>
    <div class="post-grid">
      ${related.map(r => card(r)).join('\n      ')}
    </div>
  </section>

  <footer class="site-footer" style="margin-top:48px;border-radius:var(--r-md);border:1px solid var(--border)">
    <div class="footer-links">
      <a href="/blog/">블로그</a>
      <a href="/privacy/">개인정보처리방침</a>
      <a href="/contact/">문의</a>
    </div>
    <p class="footer-disc"><b>데이터 출처:</b> 한국석유공사 오피넷, 공공데이터포털(data.go.kr), 정부 고시. 표시 내용은 기준일 공개 자료를 바탕으로 한 정보 제공이며 실제 주유소 가격과 차이가 있을 수 있습니다.</p>
    <p style="margin-top:12px"><a href="/blog/" class="ds-link">← 블로그 목록으로</a></p>
  </footer>
</main>
<script src="/article.js"></script>
</body>
</html>
`;
}

function card(post) {
  return `<article class="post-card" data-cat="${post.cat}">
        <a class="thumb t-${post.cat}" href="/blog/${post.slug}/" aria-label="${esc(post.title)} 읽기"><div class="ph"><span class="ico">${post.icon}</span></div></a>
        <div class="pc-body">
          <span class="chip-cat ${post.cat}" style="align-self:flex-start">${esc(post.category)}</span>
          <h3><a href="/blog/${post.slug}/">${esc(post.title)}</a></h3>
          <p class="excerpt">${esc(post.excerpt)}</p>
          <div class="post-meta"><span>${prettyDate(post.date).slice(5)}</span><span class="dot"></span><span>${post.minutes}분</span></div>
        </div>
      </article>`;
}

function blogIndex() {
  const featured = posts[0];
  const rest = posts.slice(1);
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: '유가지도 블로그',
    url: `${site}/blog/`,
    description: '유류세 구조, 유가 뉴스, 지역별 가격차, 절약 팁을 오피넷 데이터 기반으로 정리하는 유가지도 블로그입니다.',
    publisher: { '@type': 'Organization', name: '유가지도', url: `${site}/` },
    blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: `${site}/blog/${p.slug}/`, datePublished: p.date, dateModified: today }))
  };
  return `<!DOCTYPE html>
<html lang="ko" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>유가지도 — 블로그</title>
<meta name="description" content="유가지도 블로그: 유류세 구조, 유가뉴스, 지역별 가격차, 절약 팁을 오피넷 데이터 기반으로 읽습니다.">
<link rel="canonical" href="${site}/blog/">
<meta property="og:site_name" content="유가지도">
<meta property="og:type" content="website">
<meta property="og:title" content="유가지도 — 블로그">
<meta property="og:description" content="유류세 구조, 유가뉴스, 지역별 가격차, 절약 팁을 오피넷 데이터 기반으로 읽습니다.">
<meta property="og:url" content="${site}/blog/">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="유가지도 — 블로그">
<meta name="twitter:description" content="유류세 구조, 유가뉴스, 지역별 가격차, 절약 팁을 오피넷 데이터 기반으로 읽습니다.">
<meta name="twitter:image" content="${ogImage}">
<link rel="alternate" type="application/rss+xml" title="유가지도 블로그" href="/feed.xml">
<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/components.css">
<link rel="stylesheet" href="/styles/blog.css">
<script type="application/ld+json">
${JSON.stringify(blogSchema, null, 2)}
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2PB8D7610M"></script>
${adsense}
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2PB8D7610M');
</script>
</head>
<body>
<div class="blog-shell">
  <header class="site-header" data-screen-label="블로그 헤더">
    <a class="brand" href="/" aria-label="유가지도 홈"><span class="brand-mark">유</span>유가지도</a>
    <nav class="site-nav" aria-label="주요 메뉴">
      <a href="/">홈</a>
      <a href="/blog/" style="color:var(--primary);font-weight:700">블로그</a>
      <a href="/blog/fuel-tax-cut-extension/">유류세</a>
      <a href="/privacy/">개인정보</a>
      <a href="/contact/">문의</a>
    </nav>
    <a class="btn btn-primary btn-sm header-cta" href="/유가지도 디자인 시스템.html#components">유류세 계산</a>
  </header>
</div>

<main class="blog" data-screen-label="블로그 목록">
  <section class="blog-hero">
    <nav class="crumb"><a href="/">홈</a><span class="sep">›</span><span class="cur">블로그</span></nav>
    <h1>유가 블로그 — 왜 비싼지, 어떻게 아끼는지</h1>
    <p>오피넷 데이터로 읽는 기름값 이야기. 유류세 구조부터 지역별 가격차, 절약 노하우까지 한 문장으로 답합니다.</p>
  </section>

  <nav class="cat-bar" id="catBar" aria-label="카테고리 필터">
    <button class="cat-pill on" data-cat="all">전체</button>
    <button class="cat-pill" data-cat="news">유가뉴스</button>
    <button class="cat-pill" data-cat="tax">유류세</button>
    <button class="cat-pill" data-cat="region">지역가이드</button>
    <button class="cat-pill" data-cat="tip">절약팁</button>
    <button class="cat-pill" data-cat="ever">에버그린</button>
  </nav>

  <div class="blog-body">
    <div>
      <article class="featured post-card" data-cat="${featured.cat}" style="box-shadow:var(--shadow-sm)">
        <a class="thumb t-${featured.cat}" href="/blog/${featured.slug}/" aria-label="${esc(featured.title)} 읽기"><div class="ph"><span class="ico">${featured.icon}</span>대표 글</div></a>
        <div class="body">
          <span class="ftag">Editor's pick</span>
          <span class="chip-cat ${featured.cat}" style="align-self:flex-start">${featured.category}</span>
          <h2><a href="/blog/${featured.slug}/" style="color:inherit">${esc(featured.title)}</a></h2>
          <p>${esc(featured.excerpt)}</p>
          <div class="post-meta"><span>${prettyDate(featured.date)}</span><span class="dot"></span><span>읽는 시간 ${featured.minutes}분</span><span class="dot"></span><span>편집팀</span></div>
        </div>
      </article>

      <div class="post-grid" id="postGrid">
        ${rest.map(card).join('\n        ')}
      </div>

      <div class="empty-state" id="emptyState">해당 카테고리의 글이 아직 없습니다.</div>
    </div>

    <aside class="blog-aside">
      <div class="aside-box">
        <h4>인기 글</h4>
        <div class="pop-list">
          ${posts.slice(0, 5).map((p, i) => `<div class="pop-item"><span class="pop-rank">${i + 1}</span><div><a href="/blog/${p.slug}/">${esc(p.title)}</a><div class="pm">${p.category} · ${p.minutes}분</div></div></div>`).join('\n          ')}
        </div>
      </div>

      <div class="aside-box" style="padding:14px 16px">
        <div class="src-badge" style="border:none;background:transparent;padding:0">
          <svg class="v" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/></svg>
          모든 가격 데이터의 출처는 <b>한국석유공사 오피넷</b>입니다.
        </div>
      </div>
    </aside>
  </div>

  <footer class="site-footer" style="margin-top:48px;border-radius:var(--r-md);border:1px solid var(--border)">
    <div class="footer-links">
      <a href="/">홈</a>
      <a href="/privacy/">개인정보처리방침</a>
      <a href="/contact/">문의</a>
    </div>
    <p class="footer-disc"><b>데이터 출처:</b> 한국석유공사 오피넷, 공공데이터포털(data.go.kr), 정부 고시. 표시 가격과 정책 설명은 기준일 공개 자료를 바탕으로 하며 실제가와 차이가 있을 수 있습니다. <b>일부 콘텐츠는 AI 작성 보조</b>를 사용했습니다.</p>
  </footer>
</main>
<script src="/blog.js"></script>
</body>
</html>
`;
}

function sitemap() {
  const urls = [
    ['/', '1.0', 'weekly'],
    ['/blog/', '0.9', 'weekly'],
    ...posts.map(p => [`/blog/${p.slug}/`, '0.7', 'monthly']),
    ['/privacy/', '0.3', 'yearly'],
    ['/contact/', '0.3', 'yearly']
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([loc, priority, changefreq]) => `  <url>
    <loc>${site}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

function feed() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>유가지도 블로그</title>
    <link>${site}/blog/</link>
    <description>유류세 구조, 유가뉴스, 지역별 가격차, 절약 팁을 오피넷 데이터 기반으로 정리합니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date(today + 'T00:00:00+09:00').toUTCString()}</lastBuildDate>
${posts.map(p => `    <item>
      <title>${esc(p.title)}</title>
      <link>${site}/blog/${p.slug}/</link>
      <guid>${site}/blog/${p.slug}/</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(p.date + 'T00:00:00+09:00').toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>
`;
}

function llms() {
  return `# 유가지도

유가지도는 한국 운전자를 위해 유류세, 주유비, 지역별 유가 차이, 주유 절약 판단법을 설명하는 정보 사이트입니다.

## Canonical URLs

- ${site}/
- ${site}/blog/
${posts.map(p => `- ${site}/blog/${p.slug}/`).join('\n')}
- ${site}/privacy/
- ${site}/contact/

## Source Policy

가격과 정책 설명은 한국석유공사 오피넷, 공공데이터포털, 정부 고시 등 공개 자료를 우선합니다. 실제 주유소 가격과 차이가 있을 수 있으므로 기준일과 출처를 함께 확인해야 합니다.
`;
}

function ensureAutoAds(file) {
  const p = path.join(root, file);
  if (!fs.existsSync(p)) return;
  let html = fs.readFileSync(p, 'utf8');
  if (!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) {
    html = html.replace('<script async src="https://www.googletagmanager.com/gtag/js?id=G-2PB8D7610M"></script>', `<script async src="https://www.googletagmanager.com/gtag/js?id=G-2PB8D7610M"></script>\n${adsense}`);
    fs.writeFileSync(p, html, 'utf8');
  }
}

for (const post of posts) {
  const dir = path.join(root, 'blog', post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), articleHtml(post, posts), 'utf8');
}

fs.writeFileSync(path.join(root, 'blog', 'index.html'), blogIndex(), 'utf8');
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap(), 'utf8');
fs.writeFileSync(path.join(root, 'feed.xml'), feed(), 'utf8');
fs.writeFileSync(path.join(root, 'llms.txt'), llms(), 'utf8');

['index.html', 'privacy/index.html', 'contact/index.html', '유가지도 디자인 시스템.html', '유가지도 블로그.html', '유가지도 글 상세.html'].forEach(ensureAutoAds);

console.log(`published ${posts.length} posts`);
