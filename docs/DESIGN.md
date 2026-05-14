# Amiolas — Design System

> 본 문서는 `amiolas.com` 마케팅 사이트가 **지금 코드에서 실제로 사용 중인** 디자인 시스템의 단일 진실 원천입니다. 새 페이지·섹션·컴포넌트를 추가할 때 이 문서가 권위를 가지며, `AGENTS.md` §6의 요약 표와 이 문서가 다를 경우 이 문서가 우선합니다 (§11 Known Gaps 참조).
>
> 모든 수치·토큰·클래스는 `src/app/globals.css`, `src/components/`, `src/app/(marketing)/` 의 실제 구현에서 직접 추출했습니다.

---

## 1. Overview

Amiolas는 *에디토리얼 청사진(editorial blueprint)* 의 결을 따르는 마케팅 사이트입니다. 따뜻한 크림 톤(`oklch(0.985 0.004 85)`) 위에 hue 295 보라색(`oklch(0.55 0.22 295)`) 한 가지만을 액센트로 사용하며, 본문은 자체 호스팅한 SCDream 9-weight 단일 스택으로 조판합니다. 페이지 전체가 정적 렌더링되는 단일 라이트 테마로, 다크 모드·테마 토글·테마 라이브러리 의존성이 없습니다.

홈(`/`)은 6개 섹션 — `Hero` → `Marquee` → `SpecifySection` → `MissionBar` → `Approach` → `ContactSection` — 의 수직 합성으로 구성되며, 각 섹션은 `max-w-[1440px]` 컨테이너 + `--pad` 가변 패딩의 동일 그리드 위에서 호흡합니다. About(`/about`)은 `max-w-3xl` 폭의 별도 에디토리얼 컬럼으로 구현되어 있어 홈 섹션과는 합성 패턴이 분리됩니다.

### Key Characteristics

- **라이트 단일 테마**. `next-themes` 미사용, `ThemeProvider` 미설치, `dark:` variant 사용처 0건.
- **단일 액센트 hue 295**. brand·brand-light·brand-dark·brand-glow·accent-soft·accent-dim 모두 hue 295 위에서 lightness/chroma만 변주. spark(name reveal) 토큰만 hue 60 deep bronze.
- **단일 폰트 스택 SCDream**. `next/font/local`로 9-weight self-host. Latin도 동일 스택을 사용하며, `Geist Mono`는 코드/캡션 모노 전용, `Instrument Serif`는 인용·italic 강조 전용.
- **에디토리얼 그리드**. 모든 마케팅 섹션이 `mx-auto max-w-[1440px] px-[var(--pad)]` 컨테이너 한 가지로 통일. `--pad`는 `clamp(20px, 4vw, 56px)`.
- **fluid 타이포·간격**. 헤드라인·섹션 패딩·gap 모두 `clamp()` 기반 — 미디어쿼리 break 없이 viewport에 따라 선형 변화.
- **청사진 모티프**. Hero의 `HelmBlueprint` SVG, `bg-grid` 96px 도면 격자, `bg-noise` SVG turbulence(0.035 opacity), `bg-fx` 코너 radial glow가 항상 배경 레이어에 깔립니다.
- **수공 마케팅 섹션**. shadcn primitive는 `Button` 하나뿐이며, 6개 홈 섹션은 모두 `_components/`에 손제작되어 있습니다.
- **React Compiler 활성**. `reactCompiler: true` (`next.config.ts`) — 수동 `useMemo`/`useCallback` 사용 자제.

---

## 2. Colors

모든 색은 `oklch()` 표기로 선언되어 있으며, `--color-*` 토큰은 Tailwind v4의 `@theme inline` 안에서 자동으로 `bg-*` / `text-*` / `border-*` 유틸리티로 풀려나갑니다.

### Brand & Accent

- `{colors.brand}` — `oklch(0.55 0.22 295)` — primary CTA 배경, ring, selection, `::selection` 색.
- `{colors.brand-light}` — `oklch(0.62 0.2 295)` — primary hover, CTA 배경, 헤더 도트, `bg-fx` glow의 mix 베이스.
- `{colors.brand-dark}` — `oklch(0.4 0.22 295)` — primary pressed.
- `{colors.brand-glow}` — `oklch(0.55 0.22 295 / 0.18)` — hero·CTA 한정 halo (현재 코드는 `color-mix` 직접 사용 패턴이 우세).
- `{colors.brand-glow-soft}` — `oklch(0.55 0.22 295 / 0.06)` — 미반영. 정의만 존재.
- `{colors.accent-soft}` — `oklch(0.62 0.2 295)` — Mission·Specify의 italic 강조, Open Beta 점, marquee 마름모.
- `{colors.accent-dim}` — `oklch(0.78 0.12 295)` — 미반영. 정의만 존재.
- `{colors.spark}` — `oklch(0.45 0.1 60)` — About 페이지 "A i" name reveal 전용.

> Brand gradient는 정의된 토큰이 없습니다. Hero의 `bpStroke` linearGradient는 brand → brand 0.18 alpha의 SVG 인라인 정의로, 전역 토큰화되어 있지 않습니다.

### Surface (모두 hue 85 warm cream)

- `{colors.background}` — `oklch(0.985 0.004 85)` — 페이지 베이스.
- `{colors.surface-card}` — `oklch(0.975 0.005 85)` — `card` 토큰의 원천.
- `{colors.surface-soft}` — `oklch(0.965 0.006 85)` — Mission Bar 배경 (홈에서 유일한 alternate surface).
- `{colors.muted}` / `{colors.secondary}` / `{colors.accent}` — `oklch(0.94 0.005 85)` — shadcn semantic, 세 토큰 동일 값.
- `{colors.popover}` — `var(--background)` — background 재사용.

### Text (Foreground tiers)

- `{colors.foreground}` — `oklch(0.18 0.012 290)` — 본문 기본.
- `{colors.fg-muted}` (`{colors.muted-foreground}`) — `oklch(0.42 0.014 285)` — paragraph 본문의 실측 default. `text-fg-muted` 형태로 가장 빈도 높게 사용.
- `{colors.fg-subtle}` — `oklch(0.5 0.008 290)` — Eyebrow 컴포넌트 색.
- `{colors.fg-dim}` — `oklch(0.58 0.014 285)` — 모노 라벨·dt·caption (`text-fg-dim`).
- `{colors.primary-foreground}` / `{colors.destructive-foreground}` — `#ffffff`.

### Hairlines & Borders

- `{colors.border}` — `oklch(0.86 0.008 85)` — 기본 border. 글로벌 `* { border-color: var(--color-border) }` 적용.
- `{colors.line-soft}` — `oklch(0.92 0.006 85)` — 섹션 구분선·메타 그리드 hairline. 홈에서 border로 거의 항상 이것을 사용 (`border-line-soft`).
- `{colors.border-strong}` — `oklch(0.82 0.008 290)` — Button ghost hover, hairline 강조.
- `{colors.input}` — `oklch(0.86 0.008 85)` — border와 동일. 입력 요소 미구현.
- `{colors.ring}` — `oklch(0.55 0.22 295)` — focus ring (= brand).

### Destructive

- `{colors.destructive}` — `oklch(0.55 0.22 25)` — 정의만 존재. 사용처 0건.

### Brand Gradient

전역 그라데이션 토큰은 정의되지 않습니다. 사용 중인 모든 그라데이션(`bg-fx` 코너 glow, Hero `HelmBlueprint`의 `bpStroke`, Specify의 `kgNodeA`/`kgNodeB`)은 컴포넌트-인라인 정의입니다.

---

## 3. Typography

### Font Family

- `{font.sans}` — `--font-sc-dream` — 본문·헤드라인·UI 전반 단일 스택. `next/font/local`로 `public/fonts/SCDream{1..9}.otf`를 9개 weight로 모두 자체 호스팅. Latin 텍스트도 SCDream 사용.
- `{font.mono}` — `--font-geist-mono` (`next/font/google`) — eyebrow 라벨, 캡션, dt·dd 메타, 시계, marquee.
- `{font.serif}` — `--font-instrument-serif` (`next/font/google`, weight 400, italic 포함) — Hero·CTA·MissionBar의 italic 강조 단어 전용. fallback 체인: `Instrument Serif → SCDream → serif`.

`<body>` font-family 체인: `var(--font-sans), "Apple SD Gothic Neo", "Pretendard", "Malgun Gothic", ui-sans-serif, system-ui, sans-serif`.

### Hierarchy


| Token                          | Size                       | Weight     | Line Height | Letter Spacing                | Use                                           |
| ------------------------------ | -------------------------- | ---------- | ----------- | ----------------------------- | --------------------------------------------- |
| `{typography.display-hero}`    | `clamp(36px, 5.6vw, 80px)` | 700        | 1.12        | -0.028em                      | Hero H1                                       |
| `{typography.display-product}` | `clamp(44px, 5.6vw, 76px)` | 600        | 1           | -0.02em                       | SpecifySection "Specify" wordmark (uppercase) |
| `{typography.display-mission}` | `clamp(26px, 3.8vw, 54px)` | 400 italic | 1.25        | -0.012em                      | MissionBar blockquote (serif)                 |
| `{typography.heading-cta}`     | `clamp(28px, 3.4vw, 48px)` | 700        | 1.2         | -0.025em                      | ContactSection H2                             |
| `{typography.heading-section}` | `clamp(20px, 2vw, 28px)`   | 600        | 1.3         | -0.018em                      | `SectionHead` H2                              |
| `{typography.heading-pane}`    | 22px                       | 600        | —           | -0.015em                      | Approach Pane H3                              |
| `{typography.lede}`            | `clamp(17px, 1.4vw, 20px)` | 400        | 1.5         | —                             | Specify product lede                          |
| `{typography.body-lg}`         | `clamp(15px, 1.3vw, 18px)` | 400        | 1.7         | —                             | Hero paragraph                                |
| `{typography.body}`            | 15px                       | 400        | 1.75        | —                             | 본문 paragraph 표준                               |
| `{typography.body-sm}`         | 14px (`text-sm`)           | 400        | 1.75        | —                             | Approach pane 본문, dl dd                       |
| `{typography.list-row}`        | 13–13.5px                  | 400        | —           | —                             | Approach 리스트 행                                |
| `{typography.stat-figure}`     | 19px                       | 600        | —           | -0.012em                      | Specify Stat dd                               |
| `{typography.eyebrow}`         | 11px                       | 400 mono   | —           | 0.16em (`--tracking-eyebrow`) | Eyebrow 컴포넌트, 메타 라벨                           |
| `{typography.caption-mono}`    | 10–10.5px                  | 400 mono   | —           | 0.14em–0.22em                 | Footer 슬로건, dl dt, 블루프린트 캡션                   |


### Principles

- **합쇼체 본문 조판**. 한글 헤드라인·문단은 모두 `break-keep`(어절 단위 줄바꿈 유지) + `text-balance`(헤드라인) / `text-pretty`(본문). About 페이지에서 `text-pretty` 패턴이 빈번.
- **italic 단어 강조**. 헤드라인 한 단어를 `<em className="font-serif font-normal italic text-accent-soft">` 로 빼서 보라색 Instrument Serif로 대비. Hero·MissionBar·ContactSection에서 동일 패턴 반복.
- **uppercase mono 라벨**. eyebrow·dt·캡션·marquee·헤더 상태바·footer 슬로건은 모두 `font-mono uppercase tracking-[0.14em–0.22em]` 패턴.
- **수치 한국어 본문**. 본문은 합쇼체 + 구체 수치(예: "정보 탐색 시간을 평균 40% 단축"). 느낌표·이모지 없음.
- `**max-w-[18..54ch]`로 측정값 통제**. 헤드라인 18–28ch, 본문 32–54ch.

### Note on Font Substitutes

- `--font-serif` 토큰은 `globals.css`에 정의되어 있으나 `AGENTS.md` §6의 토큰 표에는 누락되어 있습니다 (Known Gaps).
- SCDream weight 매핑은 1=Thin(100) → 9=Black(900). 본문은 weight 400, 강조는 500–600, 헤드라인은 600–700.

---

## 4. Layout

### Spacing System

- **Base unit**: Tailwind v4 기본 0.25rem (4px) scale. `gap-`, `p-`, `m-` 유틸리티 사용.
- `**{spacing.pad}`** — `clamp(20px, 4vw, 56px)` — `--pad` CSS 변수. 모든 마케팅 섹션의 좌우 패딩 `px-[var(--pad)]`. 모바일 20px → 데스크톱 56px로 viewport 비례.
- **Section padding (vertical)** — viewport-fluid `clamp()` 패턴:
  - Hero: `pt-[clamp(40px,5vw,64px)]` + `pb-[clamp(60px,9vw,120px)]`, 섹션 자체 `min-h-[min(720px,82vh)]`
  - Specify: `py-[clamp(56px,8vw,100px)]`
  - MissionBar: `py-[clamp(56px,13vw,120px)]` + `mt-[clamp(20px,6vw,90px)]`
  - Approach: `py-[clamp(60px,8vw,120px)]`
  - Contact: `py-[clamp(80px,12vw,160px)]`
  - About: 고정 `py-24 sm:py-32`
- **Section internal gap** — Hero column gap `clamp(40px, 5vw, 64px)`. Specify article grid gap `gap-14 lg:gap-20`. Contact grid `gap-10 md:gap-14`.
- **Card padding** — Approach Pane `px-8 py-9`. About 카드 `p-7`. ContactSection의 dl 행 `py-3.5`.
- **Button padding** — `{component.button-primary}` 참조 (§7).

### Grid & Container

- **Max width**: `max-w-[1440px]` — 헤더·푸터·홈 모든 섹션의 공통 outer container. **이 값을 벗어나는 변종을 만들지 마십시오**.
- **About 컬럼**: `max-w-3xl` (768px) — 에디토리얼 폭. 홈과 다른 합성 규칙을 따릅니다 (Known Gaps).
- **Header grid**: `grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr]` — 모바일 2칸, 데스크톱 3칸(로고 / 상태 / 액션).
- **SectionHead grid**: `grid-cols-1 md:grid-cols-[200px_1fr_auto]` — label(고정 200px) / title(flex) / aside(auto).
- **Hero meta dl**: `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` — 모바일 1열 → 태블릿 2 → 데스크톱 4.
- **Specify article**: `grid-cols-1 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20` — 본문 좌측이 약간 넓음.
- **Approach pane grid**: `grid-cols-1 md:grid-cols-2 gap-px` (분리선이 grid gap의 line-soft 배경으로 표현됨).
- **Contact grid**: `grid-cols-1 md:grid-cols-[1.2fr_1fr]` — 카피 좌측 강세.

### Whitespace Philosophy

- 섹션 사이는 별도 spacer를 두지 않고 각 섹션의 `py-[clamp()]`로 호흡을 만듭니다.
- 섹션 헤더(`SectionHead`)와 본문 사이는 `mb-10` 고정(`SectionHead` 내부 `mb-10 pb-9 border-b border-line-soft`).
- 카드·블록 내부는 `gap-5 / gap-7 / gap-10` 3단계로 호흡. 임의 값 자제.
- 데스크톱에서 본문 폭은 `max-w-[50–54ch]` 로 통제 — 컨테이너 전체를 채우지 않음.

---

## 5. Elevation & Depth


| Level                     | Treatment                                                                                 | Use                                          |
| ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------- |
| `{elevation.0-flat}`      | 그림자 없음, `bg-background`                                                                   | 페이지 기본                                       |
| `{elevation.1-hairline}`  | `--shadow-hairline` = `inset 0 0 0 1px oklch(0 0 0 / 0.04)`                               | About 카드 (`shadow-[var(--shadow-hairline)]`) |
| `{elevation.1-sheen}`     | `--shadow-inner-sheen` = `inset 0 1px 0 0 oklch(1 0 0 / 0.6)`                             | 정의만 존재 — 사용처 0건                              |
| `{elevation.2-chip}`      | `shadow-[0_1px_0_rgba(0,0,0,0.02)]`                                                       | Hero "Est. 2025" 배지                          |
| `{elevation.3-cta-rest}`  | `shadow-[0_0_0_1px_oklch(0.55_0.22_295/0.4),0_8px_24px_-6px_oklch(0.55_0.22_295/0.5)]`    | Button primary 기본 상태                         |
| `{elevation.4-cta-hover}` | `shadow-[0_18px_60px_-10px_color-mix(in_oklab,var(--color-brand-light)_60%,transparent)]` | ContactSection "Start an Inquiry" hover      |


### 철학

그림자는 입체감이 아니라 **표면 경계**를 표현합니다. 카드를 띄우는 일반 drop shadow는 사용하지 않으며, `--shadow-hairline`의 inset 1px로 카드 윤곽을 미세하게 굳히는 방식이 표준입니다. 브랜드 색이 들어간 큰 그림자는 primary CTA에만 허용됩니다.

### Decorative Depth

페이지 전반에는 세 개의 비-인터랙티브 배경 레이어 (`<BackgroundFx />`)가 깔립니다:

- `**{layer.bg-fx}`** — 우상단/좌하단 코너의 `radial-gradient` × 2, `color-mix(brand-light, transparent)` 5–6%. 페이지 분위기 톤.
- `**{layer.bg-grid}**` — 96px 정방형 도면 격자, foreground 7% mix, `radial-mask`로 중앙에서 가장자리로 페이드(opacity 0.42).
- `**{layer.bg-noise}**` — SVG `feTurbulence` 노이즈, opacity 0.035 — 종이 질감.
- `**{anim.aura-pulse}**` — `aura-pulse 8s ease-in-out infinite`, opacity 0.6 ↔ 0.9, scale 1 ↔ 1.06. Hero·CTA 한정 halo 용도 (정의만 등록되어 있고 현재 컴포넌트에서는 직접 사용 호출처가 없음 — `--color-brand-glow`와 함께 추후 재도입 의도).
- `**{anim.marquee}**` — `marquee-scroll 50s linear infinite`, `translateX(0 → -50%)`. `Marquee` 컴포넌트 전용.
- `**{anim.status-pulse}**` — 2.4s, opacity 1 ↔ 0.4. 헤더 status-dot 전용 (globals.css 직접 정의).
- `**{anim.reveal}**` — `.rv` / `.rv.in` 클래스로 IntersectionObserver 기반 enter 트랜지션 (`<Reveal>` 컴포넌트, 0.8s).

---

## 6. Shapes

### Border Radius Scale


| Token            | Value                      | Use                                            |
| ---------------- | -------------------------- | ---------------------------------------------- |
| `{rounded.sm}`   | `calc(0.5rem - 4px)` = 4px | shadcn `radius-sm` (사용처 0건)                    |
| `{rounded.md}`   | `calc(0.5rem - 2px)` = 6px | shadcn `radius-md` (사용처 0건)                    |
| `{rounded.lg}`   | `0.5rem` = 8px             | shadcn `radius-lg` (사용처 0건)                    |
| `{rounded.pane}` | `18px`                     | Approach 2-pane container (`rounded-[18px]`)   |
| `{rounded.card}` | `1rem` (`rounded-2xl`)     | About 카드                                       |
| `{rounded.pill}` | `9999px` (`rounded-full`)  | Button, Header Contact link, Hero 배지, CTA, dot |
| `{rounded.chip}` | `1px` (`rounded-[1px]`)    | Hero 배지 내부 마이크로 도트                             |


> Button·CTA·Pill은 모두 `rounded-full` 단일 규칙입니다. 사각형 버튼은 시스템에 없습니다.

### Photography & Logo Geometry

- 로고 자산은 `public/logos/` — `logo.png`, `logo-light.png`, `logo-simple.png`, `logo-simple-transparent.png`. 헤더는 `logo-simple-transparent.png`를 `width={44} height={44}` 고정으로 로드 (`priority`).
- 이미지 자산은 `public/images/specify.webp` 1개 (홈에서는 사용 미반영, About에도 미반영).
- `mix-blend-mode: screen` 패턴은 현재 코드에서 직접 사용처 0건 — `AGENTS.md` §6에 언급된 "검정 배경 PNG 로고 blending"은 향후 가이드입니다 (Known Gaps).
- `next/image` `width`/`height` 명시는 헤더 로고에서 준수. LCP 1순위 이미지는 헤더 로고 (`priority`).

---

## 7. Components

### Top Navigation

`{component.header}` — `src/components/layout/header.tsx`. Server Component, 내부에 client `Clock` 1개.

- **Container**: `sticky top-0 z-50 border-b border-line-soft bg-background/70 backdrop-blur-md backdrop-saturate-110`
- **Inner grid**: `max-w-[1440px] grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr] px-[var(--pad)] py-3.5`
- **Logo**: 44×44, `priority`, `transition hover:opacity-80`
- **Status cluster** (`md:` 이상에서만 노출): green status dot (`oklch(0.78 0.18 150)` + glow) + `Clock` (Asia/Seoul, mono, tabular-nums) + 구분점 + `Seoul / AI Studio` 모노 라벨
- **Contact pill**: `rounded-full border border-border px-3.5 py-2 text-xs hover:border-foreground hover:bg-foreground hover:text-background` (inversion hover)

### Buttons

`{component.button}` — `src/components/ui/button.tsx`. CVA로 정의된 유일한 shadcn primitive.

Base 클래스:

```
inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium
transition-all duration-200 ease-[cubic-bezier(0.2,0.6,0.2,1)]
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand
focus-visible:ring-offset-2 focus-visible:ring-offset-background
disabled:pointer-events-none disabled:opacity-40
```

Variants:

- `{component.button-primary}` — `bg-brand text-white shadow-[0_0_0_1px_oklch(0.55_0.22_295/0.4),0_8px_24px_-6px_oklch(0.55_0.22_295/0.5)]`
  - `hover`: `bg-brand-light`
  - `active`: `bg-brand-dark`
  - `focus`: `ring-brand` (base)
- `{component.button-ghost}` — `border border-border bg-transparent text-foreground`
  - `hover`: `border-border-strong bg-secondary`

Sizes:

- `sm` — `h-8 px-3.5 text-[13px]`
- `md` (default) — `h-10 px-[18px] text-sm`
- `lg` — `h-11 px-[22px] text-[15px]`

> 마케팅 섹션의 CTA (예: ContactSection "Start an Inquiry") 는 `Button` 컴포넌트를 사용하지 **않고** `<a>` 태그에 동일한 디자인 토큰을 인라인 합성합니다 — 외부 링크에 `<a>` 의미를 보존하기 위함. 동일 시각 토큰(`rounded-full bg-brand-light px-6 py-4 text-sm font-medium text-white`)을 사용합니다.

### Cards & Containers

세 가지 카드 패턴이 존재합니다.

- `{component.card-pane}` — Approach 2-pane.
  - Outer: `grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-line-soft bg-line-soft`
  - Pane: `bg-background px-8 py-9`
  - 분리선은 grid `gap-px` + `bg-line-soft`로 표현 (border 대신 배경 노출).
- `{component.card-about}` — About 페이지 카드.
  - `rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-hairline)]`
- `{component.card-chip}` — Hero 배지.
  - `inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-3 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.02)]`

### Marketing Section Primitives

- `{component.eyebrow}` — `src/components/marketing/eyebrow.tsx`. `font-mono text-[11px] uppercase tracking-eyebrow text-fg-subtle`. 라벨 위 캡션 표준.
- `{component.section-head}` — `src/components/marketing/section-head.tsx`. 200px label + title + aside의 3-슬롯 헤더. 하단에 `border-b border-line-soft pb-9`.
- `{component.reveal}` — `src/components/marketing/reveal.tsx`. `"use client"` IntersectionObserver, threshold 0.12, opacity+14px translateY 0.8s.

### Inputs & Forms

**미구현**. `src/components/ui/`에 `input.tsx`, `textarea.tsx`, `label.tsx`, `form.tsx`가 없습니다. `src/lib/actions/`는 빈 디렉토리입니다. 현재 사이트의 모든 폼 동작은 `mailto:contact@amiolas.com` 링크로 우회합니다 (Known Gaps).

### Footer

`{component.footer}` — `src/components/layout/footer.tsx`.

- `relative z-[1] border-t border-line-soft py-[30px] pb-[60px] text-xs text-fg-dim`
- Inner: `max-w-[1440px] grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 px-[var(--pad)]`
- 3 슬롯: copyright (`© 2026 Amiolas, Inc. · 아미올라스`) / 슬로건 (`Restore the continuity of meaning`, mono uppercase tracking-[0.14em]) / `BackToTop`
- `{component.back-to-top}` — `src/components/layout/back-to-top.tsx`, `"use client"`. 직접 구현한 `requestAnimationFrame` + `easeOutCubic` 스크롤. duration `Math.min(900, Math.max(450, startY * 0.45))`.

---

## 8. Do's and Don'ts

### Do

- **hue 295 한 가지만 액센트로 사용합니다.** brand·brand-light·brand-dark·accent-soft 사이를 변주하며, 추가 hue를 도입하기 전에 §11 Known Gaps와 BRAND.md를 먼저 확인합니다.
- **모든 마케팅 섹션을 `max-w-[1440px] px-[var(--pad)]` 컨테이너에 합성합니다.** 새 섹션도 동일 outer를 따릅니다.
- **수직 패딩은 `clamp(min, vw, max)` 패턴으로 작성합니다.** viewport에 따라 선형으로 자라게 두고, 미디어쿼리로 끊지 않습니다.
- **본문 폭은 `max-w-[Nch]`로 통제합니다.** 본문 32–54ch, 헤드라인 18–28ch가 표준 범위.
- **eyebrow·dt·캡션은 `font-mono uppercase tracking-[0.14em–0.22em]` 패턴을 따릅니다.**
- **헤드라인 한 단어만 `<em className="font-serif italic text-accent-soft">` 로 강조합니다.** 문장당 한 곳, 최대 한 단어.
- `**break-keep`를 한글 헤드라인과 본문에 동반합니다.** 줄바꿈이 어절 단위로 끊기게 합니다.
- **분리선은 `border-line-soft` 1px 가로선 또는 `gap-px + bg-line-soft` grid 패턴으로 표현합니다.**
- **이미지에는 항상 `width`/`height`를 명시하고 LCP 후보 1개에만 `priority`를 둡니다.** (현재 LCP는 헤더 로고.)
- **viewport-conditional UI는 `md:` 분기점을 1차 기준으로 합니다.** 데스크톱 메타 클러스터는 `hidden md:flex`.

### Don't

- **다크 모드 토큰·variant를 새로 만들지 않습니다.** `dark:` 클래스, `next-themes`, `prefers-color-scheme` 분기 모두 시스템 외 항목입니다.
- **aura-pulse·brand-glow는 hero·CTA 외 영역에 배치하지 않습니다.** Marquee·Approach·MissionBar에 보랏빛 후광을 두지 않습니다.
- **사각형 버튼을 만들지 않습니다.** 모든 인터랙티브 버튼/CTA는 `rounded-full`입니다.
- **이모지·느낌표를 카피에 넣지 않습니다.** 합쇼체 3인칭, 구체 수치로 작성합니다.
- `**#hex` 또는 임의 oklch 값을 인라인으로 적지 않습니다.** 등록된 `--color-`* 토큰을 통해 참조하거나, 토큰을 추가한 뒤 사용합니다 — 단, Hero/Specify의 SVG처럼 정밀한 stroke gradient 정의는 인라인 예외입니다.
- **drop shadow로 카드를 띄우지 않습니다.** 카드 경계는 `--shadow-hairline` 또는 `border border-line-soft`로 표현합니다.
- **새로운 폰트를 추가하지 않습니다.** SCDream + Geist Mono + Instrument Serif 외 폰트는 system fallback 외에 사용하지 않습니다.
- **마케팅 섹션을 `src/components/ui/`에 두지 않습니다.** ui는 shadcn primitive 전용입니다 (현재 Button 하나).
- `**max-w-[1440px]`를 벗어나는 풀블리드 변종을 만들지 않습니다.** Mission Bar의 `mx-[calc(-1*var(--pad))]`는 *내부 컨테이너는 1440px을 유지한 채* 좌우만 viewport까지 늘리는 방식으로, 그 패턴을 따릅니다.

---

## 9. Responsive Behavior

### Breakpoints

Tailwind v4 기본값을 그대로 사용합니다.


| Token      | Min width | 실제 사용                                                                                                                                 |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `{bp.sm}`  | 640px     | Mission Bar caption row → flex-row, Approach list grid cols                                                                           |
| `{bp.md}`  | 768px     | Header status cluster 노출, Header 3-col grid, Footer 3-col, SectionHead 3-col, Hero meta dl 4-col, Specify article grid, Contact 2-col |
| `{bp.lg}`  | 1024px    | Specify article 2-col, Hero blueprint opacity 0.2 → 0.3                                                                               |
| `{bp.xl}`  | 1280px    | 직접 사용 0건                                                                                                                              |
| `{bp.2xl}` | 1536px    | 직접 사용 0건                                                                                                                              |


> 디자인의 주된 변환은 `md:`에서 일어납니다. `sm:`은 caption/list의 미세 조정용입니다. `lg:`는 Specify 섹션의 2-컬럼 전환과 Hero 블루프린트 opacity 단계용입니다.

### Touch Targets

- 인터랙티브 컨트롤 최소 높이는 Button `sm = h-8`(32px) — WCAG AA 44px 권장보다 작은 변종이 존재합니다 (Known Gaps).
- Header Contact pill `px-3.5 py-2 text-xs` 는 모바일에서 약 30–32px 높이. 터치 영역 확장은 미적용.
- CTA primary `px-6 py-4` 는 약 50px — 터치 안전.

### Collapsing Strategy

- **Header status cluster** — `hidden md:flex`. 모바일에서는 로고와 Contact pill만 노출.
- **SectionHead aside** — `hidden md:block`.
- **Hero meta dl** — 1 → 2 → 4 컬럼 단계 축소.
- **Mission Bar attribution** — `flex-col` → `sm:flex-row`, 구분점 `hidden sm:inline`.
- **Approach pane 분리선** — 모바일에서 grid 1열로 떨어지면 `gap-px`가 가로선 역할.
- **Specify article** — 1열 → `lg:` 2열. 모바일에서 KnowledgeGraph가 본문 아래로 떨어짐.
- **모바일 메뉴 없음**. 햄버거·드로어 패턴이 구현되어 있지 않습니다 (Known Gaps).

### Image Behavior

- 로고는 고정 44×44 (`size-11`). responsive resize 없음.
- 헤더 로고만 `priority`. 나머지 이미지 자산은 현재 컴포넌트에서 직접 사용되지 않습니다.
- `next.config.ts`에는 `images.`* 커스터마이즈가 없으며, v16 기본값 (`minimumCacheTTL: 4h`, `qualities: [75]`)을 그대로 따릅니다.

---

## 10. Iteration Guide

새로운 섹션·컴포넌트·페이지를 추가할 때 따르는 9개 규칙입니다.

1. **한 번에 하나의 섹션만 추가합니다.** 6개 홈 섹션처럼 단일 책임의 수직 합성이 합성 단위입니다. 한 섹션 안에서 두 가지 일을 하지 않습니다.
2. **시작은 토큰 참조뿐입니다.** 새 색은 `globals.css`의 `@theme inline`에 `--color-`* 토큰으로 먼저 등록한 뒤, 컴포넌트에서는 `bg-*` / `text-*` 유틸리티로만 호출합니다. 인라인 oklch는 SVG 그라데이션 정의에 한해 예외입니다.
3. **컨테이너는 `max-w-[1440px] px-[var(--pad)]` 한 가지입니다.** outer를 새로 만들지 않습니다.
4. **패딩·gap은 `clamp(min, vw, max)`로 우선 작성합니다.** 미디어쿼리로 끊는 것은 그 다음 선택입니다.
5. **마케팅 섹션은 `_components/`에 코로케이트합니다.** 두 번째 사용처가 생기면 `src/components/marketing/`로 승격합니다 (`AGENTS.md` §1).
6. **Reveal은 외곽 wrapper로만 씁니다.** 한 섹션에 `<Reveal>` 여러 개를 두어 단락 단위로 enter를 분리합니다.
7. **hover 마이크로 디테일은 문서화하지 않습니다.** 코드의 hover 변형(`hover:-translate-y-0.5`, 화살표 transform, border inversion)은 즉흥적이며, 재사용을 강제하지 않습니다 — 다만 §8의 큰 규칙은 따릅니다.
8. **shadcn primitive는 필요할 때만 추가합니다.** 현재 Button 1개로 충분히 운영되고 있으므로, 새 primitive가 정말 두 곳 이상에서 필요한지 먼저 확인합니다 (`rule of three`).
9. **About 페이지 패턴은 홈으로 가져오지 않습니다.** About은 `max-w-3xl` 에디토리얼 컬럼과 `rounded-2xl` 카드라는 독립 합성을 가지며, 두 시스템을 섞지 않습니다. 둘 중 하나로 정리할 시점이 오면 별도 결정으로 다룹니다 (Known Gaps).

---

## 11. Known Gaps

코드와 문서 사이의 사실 불일치, 미구현 영역, 의도된 결손을 솔직하게 기록합니다.

- **섹션 수 불일치**. `AGENTS.md` 최근 커밋 메시지·문구에는 "7-섹션"으로 표기되어 있으나, 실제 `page.tsx`는 `Hero · Marquee · SpecifySection · MissionBar · Approach · ContactSection` 의 **6 섹션**입니다.
- `**--font-serif` 토큰이 `AGENTS.md`에 미기재**. `globals.css`에 `Instrument Serif` 기반 `--font-serif` 토큰이 정의되어 있고 Hero·MissionBar·ContactSection에서 적극 사용되지만, `AGENTS.md` §6 토큰 표에는 빠져 있습니다. 본 문서가 우선합니다.
- `**brand-glow-soft`, `accent-dim` 토큰 미사용**. 정의만 등록되어 있고 컴포넌트 사용처 0건.
- `**--shadow-inner-sheen` 미사용**. 정의만 존재.
- `**destructive` 토큰 미사용**. 폼·알림 UI 부재로 사용처 0건.
- **다크 모드 토큰 부재**. `:root`에 라이트 토큰만 정의되어 있고, `@media (prefers-color-scheme: dark)` 또는 `.dark` 블록이 없습니다. 의도된 결손입니다.
- **폼 컴포넌트·검증 UI 미구현**. `src/components/ui/input.tsx`, `textarea.tsx`, `label.tsx`, `form.tsx` 없음. `src/lib/actions/` 비어 있음. zod 의존성은 설치되어 있으나 사용처 0건. 현재 사이트의 모든 폼 동작은 `mailto:` 링크로 처리됩니다.
- **모바일 메뉴 없음**. 모바일에서 햄버거·드로어 내비게이션이 없으며, 헤더가 로고+CTA 2-슬롯으로 축소될 뿐입니다.
- `**/contact` 라우트의 page.tsx 부재**. `src/app/(marketing)/contact/_components/` 디렉토리는 존재하나 `page.tsx`가 없어 정적 빌드 시 라우트가 생성되지 않습니다. ContactSection 앵커(`#contact`)와의 관계 정리 필요.
- `**loading.tsx`만 존재, `error.tsx` / `not-found.tsx` 부재**. `(marketing)` 그룹에 `loading.tsx`는 있으나 `error.tsx`, `not-found.tsx`가 없습니다 (`AGENTS.md` §2 요구사항 미충족).
- **About 페이지가 홈과 다른 디자인 시스템 사용**. `max-w-3xl`, `rounded-2xl`, `shadow-[var(--shadow-hairline)]`, `tracking-eyebrow` 등은 본 시스템과 부분적으로만 공유됩니다. 두 페이지 사이의 합성 규칙 통합은 미결입니다.
- `**mix-blend-mode: screen` 로고 처리 미적용**. `AGENTS.md` §6에서 "검정 배경 PNG 로고는 `mix-blend-mode: screen`으로 블렌딩"이라 명시하지만, 현재 헤더는 투명 배경 로고(`logo-simple-transparent.png`)를 사용하며 blend mode를 적용하지 않습니다.
- **터치 타깃 사이즈 미달 변종 존재**. Button `sm = h-8` (32px), Header Contact pill `text-xs py-2` (≈30px) 는 WCAG AA 44px 권장 미만입니다. 의도된 마이크로 컨트롤이지만 모바일 a11y 점검 필요.
- `**aura-pulse` keyframe 직접 사용처 0건**. 토큰은 등록되어 있으나 현재 컴포넌트에서 직접 호출하는 곳이 없습니다 — Hero의 `<animate>` SMIL은 별도 인라인 정의를 사용합니다.
- `**Reveal` 컴포넌트의 `prefers-reduced-motion` 처리 부재**. opacity+translateY 트랜지션을 무조건 실행합니다. 사용자 모션 설정 존중 필요.
- `**metadataBase` 설정됨, `robots.ts` / `opengraph-image.tsx` / `icon.tsx` 미구현**. `sitemap.ts`만 존재 (`AGENTS.md` §2 권장 파일 일부 누락).

