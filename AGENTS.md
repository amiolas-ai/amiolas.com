# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

## Codex 기본 행동 규칙

- 사용자에게 보내는 모든 텍스트 응답은 한국어로 작성합니다. 코드, 파일명, 명령어, 식별자는 원문을 유지합니다.
- 구현 전 가정과 성공 기준을 짧게 밝힙니다. 모호한 선택이 결과를 바꾸면 질문합니다.
- 최소 코드로 요청을 해결합니다. 요청되지 않은 기능, 추상화, 설정 가능성은 추가하지 않습니다.
- 변경은 외과적으로 적용합니다. 요청과 무관한 리팩터링, 포맷팅, 죽은 코드 삭제는 하지 않습니다.
- 한국어 문장은 `:`로 끝내지 않습니다. 문장 끝은 `.`, `?`, `!`를 사용합니다.
- 새 소스 파일 첫 줄은 역할을 설명하는 한 줄짜리 한국어 주석으로 시작합니다. `'use client'`, `'use server'`, shebang은 그 위에 둡니다. 설정 파일과 `package.json`은 제외합니다.
- 코드를 만지면 완료 전 `npm run lint`와 필요한 빌드·테스트를 실행합니다. 실패하면 실제 오류와 스택을 읽고 원인을 확인한 뒤 수정합니다.
- 한 논리 변경이 끝나고 검증되면 의미 있는 커밋을 만듭니다. 사용자나 다른 도구가 만든 무관한 변경은 스테이징하지 않습니다.

## Codex 엔지니어링 규칙

### Clean Code

- 이름은 의도를 드러냅니다. `data`, `temp`, `handle`, `process` 같은 포괄 이름보다 도메인 언어를 사용합니다.
- 함수와 컴포넌트는 한 수준의 추상화에서 한 가지 일을 합니다.
- 작은 함수, 작은 파일, 작은 컴포넌트를 선호합니다. 책임 기준으로 나눕니다.
- 중복은 세 번째 반복에서 추상화합니다. 한 번 쓰는 추상화는 만들지 않습니다.
- 주석은 이유를 설명할 때만 씁니다. 동작 설명이 필요하면 이름이나 구조를 고칩니다.

### Type Safety & Correctness

- TypeScript `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` 설정을 전제로 작성합니다.
- 객체·유니언은 `type`을 기본으로 사용하고, 선언 병합이 필요할 때만 `interface`를 사용합니다.
- `as`보다 `satisfies`를 우선합니다. `any`는 금지하고, 외부 입력은 `unknown`에서 좁힙니다.
- 폼 데이터, 환경 변수, API 응답 같은 외부 입력은 zod로 검증합니다.
- 불가능한 상태는 타입으로 표현되지 않게 만듭니다.

### Next.js 16 / React 19 Discipline

- 기본은 Server Component입니다. `"use client"`는 state, effect, ref, 브라우저 API, client-only 라이브러리가 필요한 leaf 컴포넌트에만 둡니다.
- 서버 데이터는 props로 내려보냅니다. Client Component가 `lib/data/`를 import하지 않게 하고, 서버 전용 모듈에는 `import "server-only"`를 둡니다.
- request API는 모두 `await`합니다. `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`의 v15식 sync compat는 사용하지 않습니다.

  ```tsx
  export default async function Page(props: PageProps<'/blog/[slug]'>) {
    const { slug } = await props.params;
    const query = await props.searchParams;
    return <h1>{slug}</h1>;
  }
  ```

- 라우트 타입 헬퍼는 `npx next typegen`으로 생성합니다. `PageProps`, `LayoutProps`, `RouteContext`를 사용합니다.
- Next.js 16의 `fetch`는 기본적으로 uncached입니다. 캐시가 필요하면 `next.revalidate`, `next.tags`, 또는 `"use cache"`와 `cacheLife`, `cacheTag`로 명시합니다.

  ```ts
  fetch(url, { next: { revalidate: 3600, tags: ["posts"] } });
  ```

  ```ts
  "use cache";
  import { cacheLife, cacheTag } from "next/cache";

  cacheLife("hours");
  cacheTag("posts");
  ```

- `unstable_cacheLife`, `unstable_cacheTag`는 사용하지 않습니다. v16에서는 안정 API를 사용합니다.
- `revalidateTag(tag, profile)`는 두 번째 인자가 필요합니다. `updateTag(tag)`는 Server Action 안에서 read-your-writes가 필요할 때만 사용합니다. `refresh()`는 Server Action 이후 client router 갱신에 사용합니다.
- 독립 fetch는 `Promise.all`로 병렬화합니다.
- PPR 설정은 `next.config.ts`의 `cacheComponents: true`입니다. `experimental.ppr`와 `experimental_ppr` segment config는 사용하지 않습니다.
- 미들웨어 파일은 `middleware.ts`가 아니라 `proxy.ts`입니다. Node 런타임 전용입니다.
- Parallel route slot에는 `default.tsx` 또는 `default.js`를 둡니다.
- 폼은 Server Actions, zod, `useActionState`로 구현합니다. API route는 웹훅이나 외부 호출 endpoint 전용입니다.
- `next lint`, `--turbopack`, `serverRuntimeConfig`, `publicRuntimeConfig`, `next/amp`는 사용하지 않습니다.
- 런타임 환경 변수가 필요하면 `next/server`의 `connection()`을 `await`한 뒤 `process.env`에 접근합니다.

### Performance

- `next/image`는 명시적 `width`와 `height`, 또는 크기가 고정된 컨테이너와 `fill`을 사용합니다.
- LCP 이미지는 정확히 하나만 `priority`를 지정합니다.
- 원격 이미지는 `images.remotePatterns`를 사용합니다. `images.domains`는 사용하지 않습니다.
- analytics는 `next/script`의 `strategy="afterInteractive"`를 사용합니다.
- `next/font/local`은 실사용 weight만 선언·preload합니다.
- React Compiler가 켜져 있다는 전제로 idiomatic React를 작성하고, 프로파일링 근거 없는 수동 memoization은 피합니다.

### Accessibility & Security

- semantic HTML을 먼저 사용합니다. `<button>`, `<nav>`, `<main>`, `<article>`를 우선합니다.
- 모든 interactive element는 키보드로 조작 가능하고, focus-visible 상태와 접근 가능한 이름을 가져야 합니다.
- 색 대비는 WCAG AA를 지킵니다. 본문 4.5:1, large text와 UI 3:1 이상을 기준으로 합니다.
- `aria-*`는 semantic HTML만으로 부족할 때만 사용합니다.
- 클라이언트 입력은 신뢰하지 않습니다. 서버에서 zod로 검증합니다.
- secret은 client bundle에 넣지 않습니다. `NEXT_PUBLIC_*`는 공개 값으로 취급합니다.

### Workflow

1. 목표와 사용자에게 보이는 결과를 한 문장으로 정리합니다.
2. 영향을 받는 파일, `AGENTS.md` 관련 절, 기존 패턴을 먼저 읽습니다.
3. 가장 작은 올바른 변경을 설계합니다. RSC 경계, 데이터 흐름, 캐시, 타입, 로딩·오류 상태를 확인합니다.
4. 기존 스타일에 맞춰 구현합니다. 라우트 전용 컴포넌트는 `_components/`에 두고, 두 번째 사용처가 생기면 공용으로 승격합니다.
5. 자체 리뷰를 수행합니다. Next.js 16 함정, server/client 경계, 타입 안전성, 접근성, 성능, 한글 카피 보이스를 확인합니다.
6. 검증 명령을 실행하고 결과를 보고합니다.

---

# Amiolas Website — Engineering Conventions

회사 마케팅 사이트 (`amiolas.com`) 개발 가이드라인. 모든 PR·커밋·코드는 이 문서를 우선 참조합니다.

**스택**: Next.js **16+** App Router · React 19.2 · TypeScript strict · **Tailwind v4** · shadcn/ui · Vercel

**브랜드 / 디자인 캐논**: violet `oklch(0.55 0.22 295)` (디자인 시안 primary, hue 295), deep dark bg `oklch(0.165 0.012 290)` (hue 290), **다크 단일 테마** (절제된 사이버펑크: 네온 violet + 미세 그리드/스캔라인 + dashed 블루프린트 보더 + 절제된 글리치). 미션·메타포·보이스·비즈니스 모델 등 모든 브랜드 진실 원천은 `**docs/BRAND.md`** — 카피 작성·랜딩 페이지·IR·계약서 모두 우선 참조 필수.

**한글 카피 보이스**: 합쇼체(`~합니다 / ~입니다`) 기본. 명사형 헤드라인은 그대로 두고, 문헌 인용은 원문 어조 보존(`~한다` 가능). no emoji · no exclamation · 3인칭 진술 · 구체 수치. 쉬운 한국어 5원칙(전문 용어 첫 등장 시 풀어쓰기 · 한 문장 한 정보 · 영문은 장식 라벨·고유명사만)은 `docs/BRAND.md` §4 참조.

**비공개 가드레일**: **Agent II는 세무 AI 에이전트로 공개**(개발 진행중). 단 제품 브랜드명(**택스바이옴 / TaxBiome**)은 공식 발표 전까지 외부 비공개. 그 외 후속 에이전트(**Agent III** 이후)의 도메인명은 외부 비공개로, 라인업 카드에 `Agent III · 도메인 검토 단계` 형태로 익명 유지합니다. 미공개 브랜드명·도메인은 공식 발표 전까지 어떤 외부 노출물(마케팅 카피·메타데이터·라인업 카드)에도 등장하지 않습니다.

> ⚠ Next.js 16은 v15에서 다수 breaking change. v16 함정·캐시·서버/클라이언트 규칙은 이 문서의 *Next.js 16 / React 19 Discipline* 절과 `node_modules/next/dist/docs/`의 관련 가이드를 우선 참조합니다.

---

## 0. 이 문서의 역할

| 문서 | 범위 |
| --- | --- |
| **`AGENTS.md`** (여기) | Codex의 단일 프로젝트 지침 — 디렉터리 구조·라우팅 골격·디자인 토큰·코딩 원칙·Next.js 16 규칙·네이밍·성능 목표·테스팅/배포 정책. *what·where·which·how.* |
| **`CLAUDE.md`** | Claude Code 호환용 얇은 포인터. 새 규칙은 여기에 쓰지 않습니다. |
| **`docs/BRAND.md`** | 미션·메타포·보이스·비즈니스 모델 등 브랜드 진실 원천. |

Codex는 별도 서브 에이전트를 사용하지 않습니다. 비-trivial 구현·리뷰도 이 파일을 기준으로 직접 수행합니다. 브랜드·카피 판단은 `docs/BRAND.md`를 우선하고, 코드·API·캐시 판단은 이 문서의 Codex 엔지니어링 규칙을 우선합니다.

---

## 1. 프로젝트 구조

```
src/
  app/
    (marketing)/        # 공개 마케팅 페이지
      layout.tsx        # 마케팅 공통 chrome (header, footer)
      page.tsx          # /
      pricing/page.tsx
      about/page.tsx
    (legal)/
      privacy/page.tsx
      terms/page.tsx
    api/                # 웹훅 · 외부 호출 endpoint 전용
    layout.tsx          # 루트 layout (fonts, ThemeProvider, metadataBase)
    sitemap.ts robots.ts opengraph-image.tsx icon.tsx
    not-found.tsx error.tsx loading.tsx globals.css
  components/
    ui/                 # shadcn primitives 전용
    marketing/          # 재사용 마케팅 섹션 (hero, cta 등)
    layout/             # header, footer, theme-toggle
  lib/
    utils.ts            # cn(), formatters
    actions/            # Server actions
    data/               # 캐시드 fetcher (`import "server-only"`)
    seo.ts              # buildMetadata() helper
    env.ts              # zod 검증 env
  hooks/                # use-*.ts (client-only hooks)
  types/                # 공유 TS 타입
public/
  images/ fonts/ og/
proxy.ts               # (선택) 라우트 가로채기. ※ middleware.ts 아님
```

**코로케이션 규칙**: 라우트 전용 컴포넌트는 `_components/` 폴더 안에 (언더스코어 prefix는 라우팅 제외). 두 번째 사용처가 생기면 `src/components/`로 승격.

---

## 2. 라우팅

- **Route groups** `(marketing)`, `(legal)` — URL에 영향 없이 layout 공유
- **반드시** `loading.tsx`, `error.tsx`, `not-found.tsx`를 그룹마다 배치
- **Static-first** — 모든 마케팅 라우트는 정적 렌더링
- **Metadata** — `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` 파일 기반 우선 (라이브러리 X)
- 루트 layout에서 `metadataBase: new URL('https://amiolas.com')` 1회 설정
- **Parallel routes** 사용 시 각 슬롯에 `default.js`(또는 `default.tsx`) **필수** — 빌드 실패 방지
  ```tsx
  // app/@modal/default.tsx
  export default function Default() { return null; }
  ```
- 미들웨어 파일은 `middleware.ts`가 아니라 `proxy.ts` (Next 16에서 이름 변경, Node 런타임 전용)
- 마케팅 라우트는 **static-first** — 동적 데이터가 꼭 필요한 경우에만 보강

라우팅·서버/클라이언트 경계·데이터 페칭/캐싱·폼 처리 등 코드 작성 규칙은 이 문서의 *Next.js 16 / React 19 Discipline* 절을 단일 진실 원천으로 합니다.

---

## 3. 스타일링 (Tailwind v4) & 디자인 시스템

`**tailwind.config.ts` 없음**. 모든 토큰은 `src/app/globals.css`의 `@theme inline` 블록이 단일 진실 원천. 새 토큰 추가 시 그곳에서.

### 등록된 토큰 (확장 포함)

```css
@theme inline {
  /* Brand · hue 295 (design canon) */
  --color-brand:            oklch(0.55 0.22 295);           /* primary */
  --color-brand-light:      oklch(0.62 0.20 295);           /* hover · accents */
  --color-brand-dark:       oklch(0.40 0.22 295);           /* pressed · depth */
  --color-brand-glow:       oklch(0.55 0.22 295 / 0.18);    /* radial halo */
  --color-brand-glow-soft:  oklch(0.55 0.22 295 / 0.06);    /* faint atmospheric */

  /* Accent (release card · serif italic) */
  --color-accent-soft:      oklch(0.62 0.20 295);           /* hover · pill */
  --color-accent-dim:       oklch(0.78 0.12 295);           /* faded inline */

  /* Accent */
  --color-spark:            oklch(0.45 0.10 60);            /* name reveal — "Ai" in Amiolas (deep bronze) */

  /* shadcn semantic (다크 단일) */
  --color-background · --color-foreground · --color-card · --color-popover
  --color-primary · --color-secondary · --color-muted · --color-accent
  --color-destructive · --color-border · --color-input · --color-ring
  /* :root surfaces (deep dark, hue 290) — bg 0.165 → surface-soft 0.195 → surface-card 0.215 → muted/secondary 0.255 → accent 0.275 → raised 0.265/0.315 → line-soft 0.36 → border 0.42. fg 0.92 / muted-fg 0.70 / fg-dim 0.69. primary-foreground near-white 0.985 (violet 버튼 위 텍스트 — 5.4:1 AA) */

  /* Surface 확장 */
  --color-border-strong: oklch(0.52 0.016 290);
  --color-fg-muted: var(--muted-foreground);

  /* Type scale (text-* 유틸리티 — size·leading·tracking·weight 내장) */
  --text-display:    clamp(40→76px) /1.08 /-0.02em /700   — hero H1
  --text-wordmark:   clamp(40→64px) /1    /-0.028em /600  — 제품 워드마크 (Latin 전용)
  --text-title:      clamp(28→44px) /1.2  /-0.022em /700  — contact H2
  --text-heading:    clamp(22→30px) /1.3  /-0.016em /600  — SectionHead H2
  --text-subheading: 20px           /1.4  /-0.012em /600  — pane H3·카드 타이틀
  --text-lede:       clamp(17→20px) /1.55                 — 제품 리드
  --text-body-lg:    clamp(15→18px) /1.7                  — hero 문단
  --text-body:       15px           /1.75                 — 표준 본문
  --text-body-sm:    13.5px         /1.6                  — 리스트 행·위젯
  --text-label:      11px mono      /1.4  /0.16em         — eyebrow·dt·메타
  --text-label-sm:   10px mono      /1.4  /0.18em         — fig 번호·badge
  /* 한글 원칙: 본문 tracking 0(음수 금지), 한글 헤드라인 자간 -0.02em 상한, break-keep */

  /* Section vertical rhythm (py-section* 유틸리티) */
  --spacing-section-sm: clamp(56→96px)   — mission-bar
  --spacing-section:    clamp(72→120px)  — specify·approach
  --spacing-section-lg: clamp(88→160px)  — contact

  /* Type */
  --font-sans:  var(--font-space-grotesk), var(--font-sc-dream);  /* Latin: Space Grotesk · KR: SCDream 폴백 */
  --font-mono:  var(--font-geist-mono);
  --tracking-eyebrow: 0.16em  /* mono 라벨 기본. 디스플레이 모노(marquee·Featured 태그)만 0.22em */

  /* Shadow */
  --shadow-hairline:    inset 0 0 0 1px oklch(0 0 0 / 0.04)   /* 카드 미세 윤곽 */
  --shadow-inner-sheen: inset 0 1px 0 0 oklch(1 0 0 / 0.6)    /* 상단 highlight */
  --shadow-glow-sm:     violet ring + 24px drop (버튼·FAB 글로우)
  --shadow-glow-lg:     violet 80px halo + hairline ring (카드·비주얼 프레임)

  /* Motion */
  --animate-aura-pulse: aura-pulse 8s ease-in-out infinite (brand glow 전용)
  --animate-marquee:    marquee-scroll 50s linear infinite (키워드 스트립)
  /* reduced-motion: aura 일시정지, status-dot·reveal(.rv) 비활성. glitch·marquee는 제외(항상 동작 — 디자인 의도) */

  /* Glitch (절제된 사이버펑크 · globals.css 전역 클래스) */
  .glitch / .glitch-base / .glitch-soft + @keyframes glitch-x/-y/-flicker/-soft
  /* 3.6s 사이클(H1)·7s(soft) 중 4~6%만 트리거. hero H1·라벨 한정. 항상 동작(reduced-motion 미가드 — 디자인 의도) */

  /* Focus — base 레이어 전역 :focus-visible (outline 2px ring) · 컴포넌트 ring 유틸리티가 우선 */

  /* Background atmospheres (globals.css 전역) */
  .bg-fx (violet radial glow) · .bg-grid (40px) · .bg-scanline (3px) · .bg-noise
}
```

### 사용 규약

- **Primitive**: `src/components/ui/` 안의 shadcn 패턴만 (`Button` CVA primary/ghost pill 이미 존재). 새 primitive 필요 시 `/add-shadcn` 또는 동일 패턴으로
- **마케팅 섹션**: hand-built (`src/components/marketing/`). primitive를 조합해 제작, 새 primitive 함부로 만들지 말 것
- **테마**: 다크 단일 — `:root` 토큰만 사용 (딥 다크 + 네온 violet). `next-themes` · 라이트 모드 미운영. 라이트 서피스 예외 두 곳: **Contact 위젯**과 **`/careers` 라우트(헤더·푸터 포함 전체)** — `.contact-light` / `.surface-light` 클래스가 토큰을 override해 라이트로 반전. careers는 `RouteThemeShell`(SiteShell 내부)이 pathname을 감지해 적용하고, 다크 전용 배경 아틀라스(`.bg-fx` 등)는 `.surface-light`에서 끈다. 의도된 예외이니 되돌리지 말 것
- **폰트**: 한글은 `next/font/local` SCDream self-host — 파일은 9 weights(`public/fonts/SCDream{1..9}.otf`)를 보관하되 **선언·preload는 실사용 4종(400/500/600/700)만** (전부 선언 시 ~3MB preload로 LCP 회귀. OG 이미지는 fs로 4·8을 직접 읽음). **Latin은 Space Grotesk**(`next/font/google`) — `--font-sans` 스택 1순위에 두고 한글은 SCDream으로 폴백. Geist Mono는 mono(코드·라벨), Instrument Serif는 일부 이탤릭 인용(mission-bar)에 사용. ※ 디자인 와이어프레임의 손글씨 폰트(Caveat·Patrick Hand)는 lo-fi placeholder — 프로덕션엔 사용 안 함
- **로고/이미지**: `public/logos/logo.png` (투명 배경 단일 로고), `public/images/` (specify.webp), `public/videos/hero.mp4` (히어로 풀블리드 배경 영상)
- **Aura/Glow 사용**: hero · CTA · mission bar 한정. `--color-brand-glow` + `blur(40px)` + `animate-aura-pulse`, 또는 violet radial-gradient. 그 외 영역에서 남용 금지
- **대비 규칙**: 소형 텍스트(24px 미만)에 `text-brand` 금지(bg 대비 3.7:1) — 소형 액센트는 `text-brand-light`(5.1:1)만. 텍스트 위에 `opacity-*` 수정자를 겹치지 말 것(토큰 색으로 직접 표현 — fg-muted·fg-dim 사용)
- **보더**: 블루프린트 무드의 dashed 보더(`border-dashed border-border`)를 섹션 구분에 사용. 글리치는 hero H1·라벨에만 절제 적용

### 디자인 토큰 변경 시

1. 위 §3 표 갱신
2. `docs/BRAND.md` 영향이면 거기도 동기화
3. 새 토큰은 `@theme inline` 안에서 `--color-`* / `--shadow-*` / `--animate-*` prefix로 — Tailwind 유틸리티 자동 생성

---

## 4. TypeScript & 빌드 설정

프로젝트가 확정한 설정만 유지합니다. 보편 TS 원칙(`satisfies > as`, `any` 금지, `type` vs `interface`, 외부 입력 zod 검증 등)은 이 문서의 *Type Safety & Correctness* 절이 단일 진실 원천입니다.

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true
  }
}
```

- env는 zod로 검증 — `lib/env.ts`가 단일 진실 원천
- ESLint: `@typescript-eslint/no-explicit-any: error`
- 라우트 타입 헬퍼는 `npx next typegen` (PageProps, LayoutProps, RouteContext)

---

## 5. 성능 목표

코드 레벨 성능 가이드(`next/image` 사용법·캐시·React Compiler 등)는 이 문서의 *Performance* 절을 따릅니다. 아래 표는 프로젝트가 합의한 *목표 수치*입니다.

| 지표 | 목표 |
| --- | --- |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | = 100 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |

이 수치는 *지향*이 아니라 *허용 한계*입니다. PR이 이를 회귀시키면 머지 보류.

---

## 6. 네이밍

| 대상   | 컨벤션                | 예                  |
| ---- | ------------------ | ------------------ |
| 파일   | `kebab-case`       | `hero-section.tsx` |
| 컴포넌트 | `PascalCase`       | `HeroSection`      |
| 훅    | `use-*.ts`         | `use-scroll.ts`    |
| 함수   | `camelCase`        | `formatPrice()`    |
| 상수   | `UPPER_SNAKE_CASE` | `MAX_LENGTH`       |

---

## 7. 테스팅 (lean)

- **Vitest**: `lib/` 유틸리티 + zod 스키마
- **Playwright**: 3-5개 smoke flow (home 로드, theme toggle, contact form, sitemap, mobile nav)
- 컴포넌트 단위 RTL 테스트는 실제 로직이 있을 때만

---

## 8. 배포

- **Vercel** + GitHub 통합, PR마다 preview
- `package.json` 스크립트는 v16에서 단순합니다.
  ```json
  { "dev": "next dev", "build": "next build", "start": "next start" }
  ```
  (Turbopack은 기본값. 커스텀 webpack 필요 시만 `--webpack`)
- `NEXT_PUBLIC_SITE_URL` + 브랜드 env는 Vercel 설정 + `.env.local`
- Vercel Analytics + Speed Insights 활성화
- `vercel.json`은 redirects/headers가 필요할 때만
- 환경 변수는 빌드 시 번들되는 게 기본 → 런타임 읽기가 필요하면 `import { connection } from 'next/server'` 후 `await connection()` 다음에 `process.env` 접근
