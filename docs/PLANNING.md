# Amiolas Website — Contact 위젯 + SEO 강화 플랜

작업 순서: **Phase 0 (Contact 위젯 + Slack 연동) → 검수 통과 → Phase 1–5 (SEO/메타).**
SEO 작업은 Phase 0가 프로덕션에서 안정 동작하는 것을 확인한 뒤에 착수합니다.

---

## Phase 0 — Contact 위젯 + Slack 연동

### 결정 사항

| 항목         | 결정                                                        |
| ---------- | --------------------------------------------------------- |
| 노출 범위      | **전 페이지** (마케팅 layout 레벨)                                 |
| 실시간 전달     | **폴링** (5초 간격, 탭 활성 시만, `visibilitychange`로 백그라운드 중단)     |
| 저장소        | Vercel KV (Upstash Redis 호환)                              |
| Slack 게시 방식 | conversation 1개당 1 thread, 이후 메시지는 같은 `thread_ts`에 reply  |
| 응답 SLA     | "1영업일 내 회신" 명시 + 자동 ACK 메시지 1건                            |
| 식별         | 첫 메시지에 이름·이메일 필수 입력 → Slack thread 헤더에 표기                |
| 이메일 폴백     | **비도입(이번 범위 밖)**. 위젯 안에서만 회신 확인. 향후 트래픽 보고 결정              |
| anti-spam  | 허니팟 + IP·conversation별 단순 윈도우 rate-limit (KV 카운터)         |

### 외부 자원 준비 (착수 전)

1. Slack workspace에 App 생성
   - Bot scopes: `chat:write`, `channels:history`, `channels:read`
   - Event Subscriptions: `message.channels`
   - 산출: `SLACK_BOT_TOKEN` (xoxb-…), `SLACK_SIGNING_SECRET`
2. 전용 채널 생성 (예: `#website-inbox`), App 초대 → `SLACK_INBOX_CHANNEL_ID`
3. Vercel KV 인스턴스 → `KV_REST_API_URL`, `KV_REST_API_TOKEN`
4. `.env.local` + Vercel 환경변수 등록

### 구현 범위

**위젯 UI (전 페이지 노출)**

1. **`src/components/widget/contact-widget.tsx`** — 루트 진입점 (Server). Client island 렌더링 + SSR 안전한 placeholder
2. **`src/components/widget/widget-fab.tsx`** — 우하단 floating action button. unread badge. 모바일에서는 위젯 열림 시 full-screen modal
3. **`src/components/widget/widget-panel.tsx`** — 패널 본체 (Client). 화면 3개 상태:
   - (a) Intro — greeting + `Start an inquiry` CTA
   - (b) Identity — 이름·이메일 입력 (첫 메시지 1회만)
   - (c) Thread — 메시지 리스트 + 입력창
4. **`src/components/widget/message-bubble.tsx`** — user/operator 두 종류, 타임스탬프
5. **`src/hooks/use-conversation.ts`** — `localStorage`에 `conversation_id`(UUID), 이름·이메일 보관. 재방문 시 복원
6. **`src/hooks/use-poll-messages.ts`** — 5초 간격 GET, `visibilitychange` 리스너, `since` cursor 관리
7. **마케팅 layout 통합** — `src/app/(marketing)/layout.tsx`에 `<ContactWidget />` 1회 삽입
8. **헤더 nav** — `Contact` 버튼이 페이지 이동 대신 위젯 토글 (URL hash `#contact` 또는 전역 이벤트)
9. **홈 `#contact` 섹션 CTA** — `mailto:` → 위젯 열기로 교체. 섹션 자체는 보조 정보 패널로 유지

**서버 (API + Server Actions)**

10. **`src/lib/actions/contact-send.ts`** — Server Action. zod 검증 → 허니팟·rate-limit 체크 → KV 메시지 append → Slack 게시 (첫 메시지면 새 thread, 이후엔 reply) → 자동 ACK 메시지 KV에 push → 결과 반환
11. **`src/app/api/contact/poll/route.ts`** — GET. query: `conversation_id`, `since`. KV에서 `since` 이후 메시지 반환
12. **`src/app/api/slack/events/route.ts`** — POST. HMAC SHA256 서명 검증 → bot 자체 발신/스레드 외 메시지 무시 → `thread_ts` → `conversation_id` 역매핑 → KV에 operator 메시지 append
13. **`src/lib/slack/client.ts`** — Slack Web API 래퍼
    - `postNewThread({ channel, header, body })` → thread_ts 반환
    - `replyToThread({ thread_ts, body })`
    - `verifySignature(rawBody, headers)` — HMAC 검증 (timestamp ± 5분)
14. **`src/lib/contact/store.ts`** — KV 어댑터
    - `getConversation(id)` / `createConversation(id, identity)` / `appendMessage(id, msg)`
    - `getThreadId(conversation_id)` / `mapThread(conversation_id, thread_ts)`
    - `incrRateLimit(key, windowSec)` 단순 카운터

**스키마·환경·타입**

15. **`src/lib/env.ts`** — zod 검증된 env 단일 진실 원천 (AGENTS.md에 명시되었던 항목, Phase 0에서 함께 도입)
    - 검증 대상: `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`, `SLACK_INBOX_CHANNEL_ID`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `NEXT_PUBLIC_SITE_URL`
16. **`src/types/contact.ts`** — `ContactMessage`, `Conversation`, `Identity`, `Sender` (`"user" | "operator" | "system"`)

**잔여 정리**

17. **`src/app/(marketing)/contact/` 디렉터리 제거** — 위젯이 대체하므로 별도 라우트 없음
18. **상수**: `POLL_INTERVAL_MS = 5000`, `RATE_LIMIT_PER_MIN = 6`, `MAX_MESSAGE_LEN = 2000` — `src/lib/contact/config.ts`

### 위젯 UX 합의 사항 (요약)

- 첫 진입: 인사 + "메시지를 보내주세요" CTA — Anthropic 위젯 톤 차용하되 도움말 검색·status 패널 미도입
- 첫 메시지 직전 이름·이메일 캡처 (1회), 이후 thread 화면만 유지
- 자동 ACK: 첫 메시지 게시 직후 system 메시지 1건 "문의가 접수되었습니다. 1영업일 내 회신드립니다."
- 모바일: 위젯 열림 시 full-screen, FAB는 우하단 inset-safe
- 닫힌 상태에서 operator 응답 도착 → FAB에 unread 카운트 배지

### Phase 0 검수 체크

- [ ] 위젯이 모든 마케팅 라우트에서 노출 (홈·about)
- [ ] 첫 메시지가 Slack 채널에 thread로 게시되고 thread 헤더에 이름·이메일·UA·conversation_id 노출
- [ ] thread 답글이 위젯에 5초 이내 도착
- [ ] 새로고침 후 동일 conversation 복원
- [ ] 허니팟 채워진 요청은 200 응답하되 Slack 게시 X
- [ ] rate-limit 초과 시 사용자에게 친절한 에러
- [ ] Slack 서명 실패 요청 401
- [ ] env 누락 시 빌드 실패 (zod throw)
- [ ] 모바일 사파리·크롬에서 동작

---

## Phase 1 — 파일 기반 메타 (Next 16 convention) · Phase 0 종료 후

1. **`src/app/robots.ts`** — `index/follow` 허용 · `sitemap: SITE_URL/sitemap.xml` 명시
2. **`src/app/opengraph-image.tsx`** — `next/og` `ImageResponse` 1200×630
   - cream 배경 (`oklch(0.985 0.004 85)`) + 브랜드 hue 295 글로우
   - 헤드라인 *"의미의 연속성을 회복합니다"* · 우측 모노 메타 (`AMIOLAS · AI STUDIO`)
   - SCDream / Instrument Serif 폰트를 `fs.readFileSync`로 주입
3. **`src/app/twitter-image.tsx`** — `opengraph-image`를 재export
4. **`src/app/(marketing)/about/opengraph-image.tsx`** — 헤드라인 *"Amiolas / About"* 변형
5. **`src/app/icon.tsx`** — 32×32 동적 마크 (`A` glyph + 브랜드 점)
6. **`src/app/apple-icon.tsx`** — 180×180 (iOS 홈스크린 대비)
7. **`src/app/manifest.ts`**
   - `name: "Amiolas"`, `short_name: "Amiolas"`
   - `theme_color`: hue 295 보라 hex 환산
   - `background_color`: cream hex 환산
   - icons · `lang: "ko"` · `display: "standalone"`

> Contact는 위젯으로 대체되어 별도 라우트가 없으므로 `/contact/opengraph-image.tsx`는 만들지 않습니다.

---

## Phase 2 — 메타데이터 헬퍼 + 페이지 정합성

8. **`src/lib/seo.ts`** — `buildMetadata({ title, description, path })`
   `alternates.canonical` · `openGraph.url` · `twitter.title/description` 동기화
9. **루트 `src/app/layout.tsx` 보강**
   - `authors`, `creator`, `publisher: "Amiolas, Inc."`
   - `keywords`: AI Studio · 온톨로지 · 엔터프라이즈 AI · 지식 그래프 · Specify 등 5–7개
   - `alternates: { canonical: "/", languages: { "ko-KR": "/" } }`
   - `formatDetection: { telephone: false, address: false, email: false }`
   - `robots: { index, follow, googleBot: { "max-image-preview": "large", "max-snippet": -1 } }`
   - **`viewport`는 별도 `export const viewport: Viewport`로 분리** — `themeColor` · `colorScheme: "light"` · `width: device-width`
10. **`/page.tsx`** — `buildMetadata`로 명시적 메타 export
11. **`/about/page.tsx`** — 기존 메타 `buildMetadata`로 치환

---

## Phase 3 — 구조화 데이터 (JSON-LD)

12. **`src/components/seo/json-ld.tsx`** — Server Component. `<script type="application/ld+json">` 안에 `JSON.stringify` 객체 삽입
13. **Organization 스키마**
    - `name`, `legalName`, `url`, `logo` (절대 URL)
    - `description`: 미션 한 줄
    - `foundingDate: "2025"`
    - `email: "contact@amiolas.com"`
    - `address: { addressLocality: "Seoul", addressCountry: "KR" }`
14. **WebSite 스키마**
    - `url`, `name`, `publisher: { @id: Organization }`, `inLanguage: "ko-KR"`
15. **루트 `layout.tsx`에서 `<JsonLd />` 1회 삽입**

---

## Phase 4 — 정합성 정리

16. **`src/app/sitemap.ts`**
    - 항목: `/` (priority 1.0) · `/about` (0.7)
    - `/contact`는 라우트 없음 → 미포함
    - `lastModified` 빌드 시각

---

## Phase 5 — 검증

17. `next build` → 빌드 산출물에서 `<head>` 메타 태그 확인
18. 로컬에서 직접 GET하여 200 확인
    - `/opengraph-image` · `/about/opengraph-image`
    - `/icon` · `/apple-icon`
    - `/robots.txt` · `/sitemap.xml` · `/manifest.webmanifest`
19. (배포 후 사용자 측) Lighthouse SEO 100 · OG 디버거 (Twitter Card Validator · opengraph.xyz) · Schema.org Validator

---

## 영향 받는 파일 요약

**Phase 0 신규**
`components/widget/contact-widget.tsx` · `widget-fab.tsx` · `widget-panel.tsx` · `message-bubble.tsx` ·
`hooks/use-conversation.ts` · `hooks/use-poll-messages.ts` ·
`lib/actions/contact-send.ts` · `lib/slack/client.ts` · `lib/contact/store.ts` · `lib/contact/config.ts` · `lib/env.ts` ·
`app/api/contact/poll/route.ts` · `app/api/slack/events/route.ts` ·
`types/contact.ts`

**Phase 0 수정**
`app/(marketing)/layout.tsx` · `components/layout/header.tsx` · `app/(marketing)/_components/contact-section.tsx`

**Phase 0 삭제**
`app/(marketing)/contact/` (디렉터리 전체)

**Phase 1–5 신규**
`app/robots.ts` · `app/opengraph-image.tsx` · `app/twitter-image.tsx` ·
`app/(marketing)/about/opengraph-image.tsx` ·
`app/icon.tsx` · `app/apple-icon.tsx` · `app/manifest.ts` ·
`lib/seo.ts` · `components/seo/json-ld.tsx`

**Phase 1–5 수정**
`app/layout.tsx` · `app/(marketing)/page.tsx` · `app/(marketing)/about/page.tsx` · `app/sitemap.ts`

---

## 비도입 항목 (의도적 배제)

- **이메일 폴백(Slack 답신 → 사용자 이메일 자동 발송)** — 트래픽 추이 보고 결정
- **SSE / 외부 pub-sub** — 폴링 MVP가 충분히 동작하면 보류
- **Specify SoftwareApplication JSON-LD** — 결정대로 제외
- **Google Search Console 등록 / `google-site-verification`** — 배포 후 사용자 측 작업
- **reCAPTCHA / Turnstile** — Phase 0는 허니팟 + rate-limit만. 실제 스팸 발생 시 도입
- **operator 측 별도 admin UI** — Slack 자체가 admin UI. 별도 대시보드 X
