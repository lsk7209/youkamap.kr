# Design

## Source of truth
- Status: Active
- Last refreshed: 2026-06-06
- Primary product surfaces: design-system sheet, blog hub, article detail, fuel-tax calculator, price/data cards
- Evidence reviewed: `docs/유가지도_pSEO_사이트기획_v0.3.md`, Claude Design handoff README, chat transcript, `유가지도 디자인 시스템.html`, `유가지도 블로그.html`, `유가지도 글 상세.html`, `styles/tokens.css`, `styles/components.css`

## Brand
- Personality: trustworthy, readable, practical, consumer-friendly
- Trust signals: source badges beside data, 기준일/relative freshness, factual comparison copy, tabular numbers
- Avoid: public-office coldness, decorative gradients, vague claims, "비싸다/바가지" evaluative language

## Product goals
- Goals: explain why fuel prices move, how much tax is included, and what policy changes mean
- Non-goals: lowest-station app replacement, unsupported legal/tax certainty, heavy visual decoration
- Success signals: calculator use, evergreen article engagement, internal movement from articles to tools

## Personas and jobs
- Primary personas: Korean drivers searching fuel tax, price changes, regional comparisons, and saving tips
- User jobs: understand fuel-price structure, compare factual averages, estimate tax paid, read policy explanations
- Key contexts of use: mobile search visits, quick answer extraction, AdSense-supported blog/article browsing

## Information architecture
- Primary navigation: 유가, 유류세, 지역, 블로그
- Core routes/screens: design system, blog list, article detail, calculator/data widgets
- Content hierarchy: authority evergreen and timely policy content first, data comparison as support

## Design principles
- Principle 1: data must be adjacent to source, 기준일, and uncertainty copy
- Principle 2: price movement uses color, icon, and sign together
- Tradeoffs: warm minimal UI over dense dashboard; reusable static prototype over framework abstraction

## Visual language
- Color: warm off-white `#FAFAF8`, surface `#FFFFFF`, deep petrol teal `#0E5A63`, oil amber `#E08A00`
- Typography: Pretendard, tabular figures for all prices and data values
- Spacing/layout rhythm: mobile-first, generous reading line-height, compact but separated cards
- Shape/radius/elevation: 8-16px radii, subtle borders and shadows
- Motion: small hover/active transitions; no decorative motion
- Imagery/iconography: minimal emoji/icon markers, no stock imagery dependency

## Components
- Existing components to reuse: price card, tax breakdown widget, trend chart, comparison bar/table, fact banner, persona box, source badge, FAQ, internal link card, ad slot, header/footer
- New/changed components: blog post cards, featured post, article TOC/share/progress, category filter chips
- Variants and states: light/dark theme, fuel toggle, amount chips, FAQ open/closed, blog filter empty state, hover/active/focus
- Token/component ownership: `styles/tokens.css` owns tokens; page-specific styles live in `styles/blog.css` and `styles/article.css`

## Accessibility
- Target standard: WCAG AA
- Keyboard/focus behavior: visible `:focus-visible`, FAQ `aria-expanded`, tablist semantics for fuel selection
- Contrast/readability: high contrast text, warm neutral surfaces, body line-height 1.7
- Screen-reader semantics: Korean `lang`, buttons for toggles/accordion, source/disclaimer text visible
- Reduced motion and sensory considerations: motion is minimal and nonessential

## Responsive behavior
- Supported breakpoints/devices: mobile 360px and desktop 1280px reference widths
- Layout adaptations: single-column mobile, wider cards/grids on desktop, article sidebar from desktop breakpoint
- Touch/hover differences: touch `:active` feedback supplements hover states

## Interaction states
- Loading: static prototype has no async loading state
- Empty: blog category filter includes an empty-state pattern
- Error: calculator sanitizes numeric input; no remote errors in static prototype
- Success: share copy feedback and selected toggles/chips
- Disabled: not modeled except inactive pagination placeholders
- Offline/slow network, if applicable: external Pretendard font can fall back to system Korean fonts

## Content voice
- Tone: direct, plain Korean for general consumers
- Terminology: factual price comparisons, "전국 평균 대비 +X원", "상위 N%", "실제가와 차이 가능"
- Microcopy rules: never call regions/stations "비싸다" or "바가지"; always cite 오피넷/data.go.kr near data

## Implementation constraints
- Framework/styling system: static HTML/CSS/vanilla JS prototype
- Design-token constraints: use CSS custom properties from `styles/tokens.css`
- Performance constraints: minimal assets, no decorative images, system fallback fonts, lightweight JS
- Compatibility constraints: works by opening local HTML files; external font requires network
- Test/screenshot expectations: verify links, imports, JS syntax, and core interactions before claiming completion

## Open questions
- [ ] Replace placeholder article links with real route targets / owner: content / impact: navigation fidelity
- [ ] Decide whether to ship local Pretendard font files / owner: engineering / impact: offline font reliability
