

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.



---

# Amiolas Website — Engineering Conventions

회사 마케팅 사이트 (`amiolas.com`) 개발 가이드라인. 모든 PR·커밋·코드는 이 문서를 우선 참조합니다.

**스택**: Next.js **16+** App Router · React 19.2 · TypeScript strict · **Tailwind v4** · shadcn/ui · next-themes (dark default) · Vercel

**브랜드 / 디자인 캐논**: violet `#693AD4` (`oklch(50% 0.22 290)`), brand-tinted slate bg 기본 (`oklch(0.18 0.012 290)` — 보라 hue 미세 틴팅, 순검정 아님). 미션·메타포·보이스·비즈니스 모델 등 모든 브랜드 진실 원천은 **`docs/BRAND.md`** — 카피 작성·랜딩 페이지·IR·계약서 모두 우선 참조 필수.

**한글 카피 보이스**: 합쇼체(`~합니다 / ~입니다`) 기본. 명사형 헤드라인은 그대로 두고, 문헌 인용은 원문 어조 보존(`~한다` 가능). no emoji · no exclamation · 3인칭 진술 · 구체 수치.

> ⚠ Next.js 16은 v15에서 다수 breaking change. AI 어시스턴트가 v15 패턴(특히 sync `params`, `middleware.ts`, single-arg `revalidateTag`)을 자동 생성할 수 있으니 본 문서의 §10을 먼저 확인.

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
- 미들웨어가 필요하면 `middleware.ts`가 아니라 `**proxy.ts**` (Next 16에서 이름 변경, runtime은 node only)

### 비동기 Request APIs (v16 강제)

`cookies()`, `headers()`, `draftMode()`, `params`, `searchParams`는 **반드시 await**. 동기 호환 모드는 v16에서 완전 제거됨.

```tsx
// 올바른 패턴
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const query = await props.searchParams;
  return <h1>{slug}</h1>;
}
```

`PageProps`, `LayoutProps`, `RouteContext` 타입 헬퍼는 `npx next typegen`으로 자동 생성.

---

## 3. Server vs Client Components

기본 = **Server Component**. `"use client"`는 다음 경우에만:

- State / effects / refs
- Browser APIs
- Event handlers
- Client-only libraries (Framer Motion 등)

`**"use client"`는 잎 컴포넌트에만**. 페이지는 Server Component이고 작은 `<ThemeToggle />`을 client island로 import. 반대 방향 금지.

서버 데이터는 **props로 내려보냄**. Client에서 server module을 import하지 말 것. `lib/data/`*는 `import "server-only"`로 가드.

---

## 4. 데이터 페칭과 캐싱 (v16)

Next 16의 `fetch`는 **기본 uncached**. 명시적 opt-in:

```ts
fetch(url, { next: { revalidate: 3600, tags: ['posts'] } });
```

또는 `"use cache"` 디렉티브 + **stable** `cacheLife()` / `cacheTag()`:

```ts
"use cache";
import { cacheLife, cacheTag } from "next/cache";

cacheLife("hours");
cacheTag("posts");
```

> v15의 `unstable_cacheLife`/`unstable_cacheTag` import는 더 이상 사용하지 말 것. v16에서 stable.

### Cache 무효화 (v16 필수 변경)


| 함수                            | 사용처                                                       | 시그니처                                   |
| ----------------------------- | --------------------------------------------------------- | -------------------------------------- |
| `revalidateTag(tag, profile)` | 일반 / 백그라운드 갱신. 사용자는 stale 보다가 fresh로 전환                   | **2번째 인자 필수** (`'max'`, `'days'` 등)    |
| `updateTag(tag)`              | **Server Action 전용**. read-your-writes — 같은 요청에서 즉시 fresh | Server Action 안에서만                     |
| `refresh()`                   | Server Action 후 클라이언트 라우터만 새로고침                           | `import { refresh } from 'next/cache'` |


```ts
// v15 → v16 마이그레이션
revalidateTag('posts')          // ❌ 1-arg deprecated
revalidateTag('posts', 'max')   // ✅
```

### PPR (Partial Prerendering)

`experimental.ppr`, `experimental_ppr` segment config는 v16에서 제거됨. 대신:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  cacheComponents: true,
};
```

독립 fetch는 `Promise.all`로 병렬화.

---

## 5. 폼 처리

- **Server Actions** 사용 (contact, newsletter 등)
- 액션 내부 zod validation
- 클라이언트는 `useActionState`로 progressive enhancement
- API routes는 **웹훅·외부 호출만**

```ts
// lib/actions/contact.ts
"use server";
import { z } from "zod";
import { updateTag } from "next/cache";

const Schema = z.object({ /* ... */ });

export async function submitContact(prev: unknown, formData: FormData) {
  const parsed = Schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten() };

  // side effects
  // 사용자가 즉시 결과를 봐야 한다면:
  updateTag(`contact-${id}`);
  return { success: true };
}
```

---

## 6. 스타일링 (Tailwind v4) & 디자인 시스템

`**tailwind.config.ts` 없음**. 모든 토큰은 `src/app/globals.css`의 `@theme inline` 블록이 단일 진실 원천. 새 토큰 추가 시 그곳에서.

### 등록된 토큰 (확장 포함)

```css
@theme inline {
  /* Brand */
  --color-brand:            #693AD4;                        /* primary */
  --color-brand-light:      oklch(0.65 0.22 295);           /* hover · accents */
  --color-brand-dark:       oklch(0.40 0.22 295);           /* pressed · depth */
  --color-brand-glow:       oklch(0.55 0.22 295 / 0.45);    /* hero aura center */
  --color-brand-glow-soft:  oklch(0.55 0.22 295 / 0.18);    /* subtle radial halos */

  /* Accent */
  --color-spark:            oklch(0.82 0.07 225);           /* name reveal — "Ai" in Amiolas */

  /* shadcn semantic */
  --color-background · --color-foreground · --color-card · --color-popover
  --color-primary · --color-secondary · --color-muted · --color-accent
  --color-destructive · --color-border · --color-input · --color-ring
  /* .dark surfaces: brand-tinted slate (hue 290, chroma 0.012) — bg 0.18 → card 0.22 → muted 0.26 → border 0.32 */

  /* Surface 확장 */
  --color-border-strong: oklch(0.42 0.012 290);
  --color-fg-muted: var(--muted-foreground);
  --color-fg-subtle: oklch(0.58 0.008 290);

  /* Type */
  --font-sans:  var(--font-sc-dream);    /* SCDream (KR + Latin 단일 스택) */
  --font-mono:  var(--font-geist-mono);
  --tracking-eyebrow: 0.16em;

  /* Shadow */
  --shadow-glow:        브랜드-틴티드 ring + drop (CTA · hero mark 전용)
  --shadow-hairline:    inset 0 0 0 1px oklch(1 0 0 / 0.04)   /* 카드 표면 sheen */
  --shadow-inner-sheen: inset 0 1px 0 0 oklch(1 0 0 / 0.06)   /* 상단 1px highlight */

  /* Motion */
  --animate-aura-pulse: aura-pulse 8s ease-in-out infinite (brand glow 전용)
}
```

### 사용 규약

- **Primitive**: `src/components/ui/` 안의 shadcn 패턴만 (`Button` CVA primary/ghost pill 이미 존재). 새 primitive 필요 시 `/add-shadcn` 또는 동일 패턴으로
- **마케팅 섹션**: hand-built (`src/components/marketing/`). primitive를 조합해 제작, 새 primitive 함부로 만들지 말 것
- **테마**: `next-themes` · `attribute="class"` · `defaultTheme="dark"` · `enableSystem`. light는 legal 페이지 한정
- **폰트**: `next/font/local`로 SCDream 9 weights self-host (`public/fonts/SCDream{1..9}.otf`). Latin도 SCDream 사용 (Geist Sans는 사용 안 함, Geist Mono는 코드 블록용)
- **로고/이미지**: `public/logos/` (logo.png · logo-light.png), `public/images/` (specify.webp). 검정 배경 PNG 로고는 `mix-blend-mode: screen`으로 블렌딩
- **Aura 사용**: hero · CTA 한정. `--color-brand-glow` + `blur(40px)` + `animate-aura-pulse`. 그 외 영역에서 남용 금지

### 디자인 토큰 변경 시
1. 위 §6 표 갱신
2. `docs/BRAND.md` 영향이면 거기도 동기화
3. 새 토큰은 `@theme inline` 안에서 `--color-*` / `--shadow-*` / `--animate-*` prefix로 — Tailwind 유틸리티 자동 생성

---

## 7. TypeScript

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true
  }
}
```

- 객체/유니언은 `type`, declaration merging이 필요할 때만 `interface`
- `satisfies` > `as`
- env는 zod로 검증
- ESLint: `@typescript-eslint/no-explicit-any: error`
- 라우트 타입 헬퍼는 `npx next typegen` (PageProps, LayoutProps, RouteContext)

---

## 8. 성능

- `next/image` 항상 사용, `width`/`height` 명시 (또는 `fill` + 사이즈 컨테이너), `priority`는 LCP 1개만
  - v16 기본값: `minimumCacheTTL` 4h (was 60s), `qualities` [75] only, `imageSizes`에서 16 제거. 필요 시 `next.config.ts`에서 override
  - `images.domains`는 deprecated → `images.remotePatterns` 사용
- `next/font/local`로 self-hosted (Geist 권장)
- `next/script`은 analytics에 `strategy="afterInteractive"`
- Lighthouse 목표: Performance ≥ 95, A11y ≥ 95, SEO = 100, LCP < 2.0s, CLS < 0.05, INP < 200ms
- **React Compiler** (v16 stable): `next.config.ts`에서 `reactCompiler: true` (선택, 빌드 시간 증가하나 자동 메모이제이션)
- `next dev` 출력 디렉토리 = `.next/dev` (v15는 `.next`). `next build`는 `.next/`. 동시 실행 가능

---

## 9. 네이밍


| 대상   | 컨벤션                | 예                  |
| ---- | ------------------ | ------------------ |
| 파일   | `kebab-case`       | `hero-section.tsx` |
| 컴포넌트 | `PascalCase`       | `HeroSection`      |
| 훅    | `use-*.ts`         | `use-scroll.ts`    |
| 함수   | `camelCase`        | `formatPrice()`    |
| 상수   | `UPPER_SNAKE_CASE` | `MAX_LENGTH`       |


---

## 10. v16 함정 (반드시 피할 것)

1. ❌ Sync `params` / `searchParams` 접근 (v15 호환 제거됨) — 무조건 `await`
2. ❌ `middleware.ts` (이름 변경됨) — `proxy.ts`로
3. ❌ `revalidateTag('tag')` 1-arg — 2번째 인자(`'max'` 등) 필수
4. ❌ `unstable_cacheLife` / `unstable_cacheTag` import — 이제 stable, prefix 제거
5. ❌ `experimental.ppr` / `experimental_ppr` segment — `cacheComponents: true`로 대체
6. ❌ `next lint` 명령 — 제거됨, ESLint 직접 실행
7. ❌ `<Image>` width/height 누락 — CLS 회귀 + v16에서 query string은 `localPatterns.search` 설정 필요
8. ❌ `images.domains` config — deprecated, `remotePatterns` 사용
9. ❌ `--turbopack` 플래그 — v16 기본값, 스크립트에서 제거 (커스텀 webpack은 `--webpack`으로 opt-out)
10. ❌ Parallel route 슬롯에 `default.js` 누락 — 빌드 실패
11. ❌ `serverRuntimeConfig` / `publicRuntimeConfig` / `next/amp` — 모두 제거됨
12. ❌ 트리 최상단 `"use client"` — RSC 죽음
13. ❌ `tailwind.config.ts` 찾기 — v4에서 없음, `@theme` in globals.css
14. ❌ 웹훅에 Server Actions — React caller 필요. API route 사용
15. ❌ `metadataBase` 누락 — OG 이미지 절대 URL 깨짐
16. ❌ Server-only를 client에 import — `import "server-only"` 가드 필수

---

## 11. 테스팅 (lean)

- **Vitest**: `lib/` 유틸리티 + zod 스키마
- **Playwright**: 3-5개 smoke flow (home 로드, theme toggle, contact form, sitemap, mobile nav)
- 컴포넌트 단위 RTL 테스트는 실제 로직이 있을 때만

---

## 12. 배포

- **Vercel** + GitHub 통합, PR마다 preview
- `package.json` 스크립트는 v16에서 단순:
  ```json
  { "dev": "next dev", "build": "next build", "start": "next start" }
  ```
  (Turbopack은 기본값. 커스텀 webpack 필요 시만 `--webpack`)
- `NEXT_PUBLIC_SITE_URL` + 브랜드 env는 Vercel 설정 + `.env.local`
- Vercel Analytics + Speed Insights 활성화
- `vercel.json`은 redirects/headers가 필요할 때만
- 환경 변수는 빌드 시 번들되는 게 기본 → 런타임 읽기가 필요하면 `import { connection } from 'next/server'` 후 `await connection()` 다음에 `process.env` 접근

