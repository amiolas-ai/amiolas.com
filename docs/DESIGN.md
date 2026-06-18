# Amiolas — Design System

> 본 문서는 `amiolas.com` 마케팅 사이트가 **지금 코드에서 실제로 사용 중인** 디자인 시스템을 코드에서 재추출한 기록입니다. 토큰의 정확한 값과 변경 절차는 `AGENTS.md` §3이 단일 진실 원천이며, 이 문서는 시스템의 *의도와 사용 맥락*을 설명합니다. 2026-06 다크 사이버펑크 리뉴얼 + 디자인·카피 정제 작업 기준으로 전면 재작성되었습니다.

---

## 1. Overview

Amiolas는 **다크 단일 테마**의 절제된 사이버펑크 마케팅 사이트입니다. 딥 다크 배경(`oklch(0.165 0.012 290)`, hue 290) 위에 네온 violet(hue 295) 한 가지만을 액센트로 사용하고, 미세 그리드·스캔라인·노이즈·dashed 블루프린트 보더·절제된 글리치가 무드를 만듭니다. `next-themes` 미사용, 라이트 모드 미운영 — 예외는 두 곳입니다. Contact 위젯의 라이트 패널(`.contact-light`)과 `/careers` 라우트 전체(`.surface-light`)이며, 두 클래스는 같은 토큰 오버라이드 블록을 공유합니다(§7).

홈(`/`)은 6개 섹션의 수직 합성입니다.

```
Hero(풀블리드 비디오) → Marquee(키워드 스트립) → SpecifySection(제품)
→ Approach(2-Track 운영) → MissionBar(메타포 인용 + 어원 해설) → ContactSection(CTA)
```

내러티브는 **구체(제품·운영 방식) → 추상(브랜드 철학) → 행동(CTA)** 순서로 설계되어 있습니다. Mission Bar가 Approach 뒤에 오는 것은 의도된 배치입니다 — 소설 인용을 CTA 직전의 감정적 정점으로 사용합니다.

모든 마케팅 섹션은 `mx-auto max-w-[1440px] px-[var(--pad)]` 컨테이너 하나로 통일됩니다 (`--pad: clamp(20px, 4vw, 56px)`).

## 2. Type Scale

`globals.css` `@theme inline`의 `--text-*` 토큰이 size·line-height·letter-spacing·font-weight를 내장한 `text-*` 유틸리티를 생성합니다. **컴포넌트에서 임의 `text-[Npx]`·`leading-[N]`·`tracking-[N]` 값을 새로 만들지 마세요** — 스케일에 없는 단계가 필요하면 토큰을 먼저 추가합니다.

| 토큰 | 용도 |
| --- | --- |
| `text-display` | hero H1 (페이지 유일의 클라이맥스) |
| `text-wordmark` | 제품 워드마크 (Latin 전용 · display보다 한 단계 아래로 캡) |
| `text-title` | contact H2 |
| `text-heading` | SectionHead H2 |
| `text-subheading` | pane H3 · 카드 타이틀 · stat 값 |
| `text-lede` / `text-body-lg` / `text-body` / `text-body-sm` | 본문 4단계 |
| `text-label` / `text-label-sm` | mono 라벨 2단계 (eyebrow·dt·메타 / fig 번호·badge) |

한글(SCDream) 원칙: 본문 tracking 0(음수 금지), 한글 헤드라인 자간 -0.02em 상한, `break-keep` 필수. mono tracking은 0.16em(기본 `--tracking-eyebrow`)과 0.22em(marquee·Featured 태그 등 디스플레이 모노 한정) 2단계뿐입니다.

## 3. Spacing & Layout

- 섹션 수직 리듬: `py-section-sm`(mission-bar) / `py-section`(specify·approach) / `py-section-lg`(contact). hero는 viewport 기반(`min-h-[clamp(640px,86vh,880px)]` + bottom-left 합성) 자체 체계.
- gap 사다리: 인라인 `1.5·2·3·4` / 컴포넌트 내부 `5·6·8` / 그리드·컬럼 `10·12·14`. `2.5`·`3.5` 같은 중간값은 새로 만들지 않습니다.
- radius: `rounded-xl`(카드·프레임)과 `rounded-lg`(내부 요소·고스트 카드) 2단.
- 반응형 분기는 `md`(1→2열)가 중심입니다.

## 4. Color & Contrast

색 체계 값은 `AGENTS.md` §3 표 참조. 사용 규칙만 요약합니다.

- **위계는 opacity가 아니라 토큰으로.** 텍스트 위에 `opacity-*` 수정자를 겹치지 않습니다(합성 대비가 AA 미달로 떨어지는 주범). `text-foreground → text-fg-muted → text-fg-dim` 3단으로 표현합니다.
- **소형 텍스트(24px 미만)에 `text-brand` 금지** (배경 대비 3.7:1) — 소형 액센트는 `text-brand-light`(5.1:1)만.
- violet 버튼 위 텍스트는 near-white(`--primary-foreground: oklch(0.985 0 0)` / `text-white`).
- ghost(예고) 카드의 죽은 느낌은 `border-line-soft` dashed + `text-fg-muted` 타이틀 + 작은 스케일로 만듭니다 — 래퍼 opacity 금지.

## 5. Effects (글로우 · 글리치 · 블루프린트)

- **글로우 버짓**: hero 0.18 → specify 0.08 → mission 0.08 → contact 0.12의 수렴 곡선. 새 섹션에서 이 범위를 넘는 radial을 깔지 않습니다. 버튼·FAB 글로우는 `shadow-glow-sm`, 카드·비주얼 프레임은 `shadow-glow-lg` 토큰을 사용합니다.
- **글리치**: hero H1·소형 라벨 한정. 풀 효과(`.glitch` + `data-text`)는 **한 줄에만** — 현재 hero 2행("다시 잇는 AI Studio."). 1행은 `.glitch-base` 플리커만. `data-text`는 화면 텍스트와 반드시 동기화(카피 수정 시 체크리스트 항목).
- **블루프린트**: 섹션 구분은 `border-dashed border-border`, 배경은 `.bg-fx`/`.bg-grid`/`.bg-scanline`/`.bg-noise` 고정 레이어, marquee는 좌우 mask 페이드로 클리핑을 마감합니다.

## 6. Motion & Accessibility

- `prefers-reduced-motion: reduce`에서 aura는 일시정지, status-dot·reveal(`.rv`)은 비활성(콘텐츠 즉시 표시). **글리치·marquee·hero 비디오는 예외** — "항상 동작"이 디자인 캐논입니다. JS 측은 back-to-top(즉시 점프)만 가드합니다.
- 키보드 포커스: base 레이어 전역 `:focus-visible`(outline 2px ring) — 링크·트리거가 자동 커버되고, Button·FAB의 ring 유틸리티가 이를 덮습니다.
- Contact 위젯: 닫힌 패널은 `inert`(Tab 진입 차단), Escape로 닫힘.
- 히어로 비디오는 `preload="metadata"` — LCP 경합 방지.

## 7. 라이트 서피스 예외 (Contact 위젯 · /careers)

`.contact-light`와 `.surface-light`는 `globals.css`에서 동일한 토큰 오버라이드 블록을 공유합니다. Contact 위젯은 다크 페이지 위에 밝은 플로팅 패널로 읽히게 하고, `/careers`는 라우트 전체(헤더·푸터 포함)를 라이트 페이지로 반전시킵니다. `/careers`는 `RouteThemeShell`(SiteShell 내부)이 pathname을 감지해 `.surface-light`를 적용하며, 이때 다크 전용 배경 아틀라스(`.bg-fx`·`.bg-grid`·`.bg-scanline`·`.bg-noise`)는 `display: none`으로 끕니다. **색온도는 두 경우 모두 페이지와 같은 hue 290 쿨 뉴트럴** — 웜 톤(hue 85 등)으로 되돌리면 페이지와 충돌합니다. `:root`에 시맨틱 변수를 새로 추가하면 이 블록에 대응 라이트 값을 반드시 함께 추가합니다. input 경계는 `ring-input`(패널 대비 ~3:1, WCAG 1.4.11)을 유지합니다.

## 8. Copy 연계 규칙 (디자인에 영향을 주는 것만)

- 헤드라인 `max-w-[18ch]`(hero·contact), SectionHead `max-w-[36ch]`, 리드 `max-w-[32ch]`, 본문 `max-w-[54ch]` — 카피 교체 시 이 폭 안에서 줄수를 확인합니다.
- 이해가 필요한 텍스트(헤드라인·본문·CTA)는 한글, mono 장식 라벨·고유명사는 영문 (노션 브랜드 문서 §4 — 카피 보이스).
- 사이트 공통 소개 문장은 `src/lib/seo.ts`의 `SITE_DESCRIPTION` 상수 한 곳에서만 수정합니다 (layout·manifest·json-ld·OG 이미지가 모두 참조).

## 9. Primitives

shadcn primitive는 `Button`(CVA primary/ghost) 하나뿐이며, 마케팅 섹션 CTA도 `buttonVariants()`를 재사용합니다. 카드·링크 primitive는 의도적으로 만들지 않았습니다 — 사용처가 1곳뿐인 패턴은 추상화하지 않는다는 원칙(`CLAUDE.md` §2). 두 번째 사용처가 생길 때 `src/components/ui/`로 승격합니다.
