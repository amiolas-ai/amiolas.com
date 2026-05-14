# Contact 위젯 — Slack 브리지 구조

전 페이지 우하단의 채팅 위젯에서 사용자가 메시지를 보내면 Slack `#contact` 채널에 thread로 게시되고, 운영자가 thread에 단 답글이 사용자 위젯에 ~100ms 안에 도착합니다. 이 문서는 그 구조의 *원리*와 *결정 배경*을 정리합니다.

---

## 1. 한 줄 요약

> 위젯은 **서버가 메시지의 단일 진실 원천(Upstash KV)**이고, **Slack은 운영자의 UI**일 뿐. 클라이언트는 `conversationId`만 영속화하고, **Server-Sent Events (SSE) + Redis pub/sub**로 실시간 동기화합니다.

---

## 2. 전체 데이터 흐름

```
┌──────────────────────────────────────────────────────────────────┐
│  브라우저 (Client)                                                  │
│  ┌──────────────┐   ┌────────────────────────────────────────────┐ │
│  │ localStorage │   │ React 19 + useActionState + EventSource    │ │
│  │  conv id +   │   │ ┌─ FAB ─┐  ┌─ Panel (form + messages) ──┐ │ │
│  │  identity +  │   │ └───────┘  └────────────────────────────┘ │ │
│  │  lastReadTs  │   └────────────────────────────────────────────┘ │
│  └──────────────┘                                                  │
└─────────┬───────────────────────────┬────────────────────────────┘
          │ Server Action              │ SSE (EventSource)
          │ (POST FormData)            │ /api/contact/stream
          │                            │
┌─────────▼────────────────────────────▼────────────────────────────┐
│  Vercel (Next.js 16)                                                │
│  ┌─────────────────────┐  ┌─────────────────┐  ┌────────────────┐ │
│  │ sendContactMessage  │  │ /contact/stream │  │ /slack/events  │ │
│  │ (Server Action)     │  │ (Node, 25s)     │  │ (Edge)         │ │
│  └─────┬───────────────┘  └────┬────────────┘  └───────┬────────┘ │
│        │                       │                       │          │
│        ▼                       ▼                       ▼          │
└────────┼───────────────────────┼───────────────────────┼──────────┘
         │                       │                       │
         ▼                       ▼                       ▲
   ┌─────────────┐        ┌──────────────┐        ┌─────────────┐
   │  Slack API  │        │ Upstash KV   │        │ Slack Events│
   │ chat.post   │◄───────│ (Redis)      │        │ message.    │
   │ Message     │        │ + pub/sub    │        │ channels    │
   └─────────────┘        └──────────────┘        └─────────────┘
                                ▲                       │
                                └───────────────────────┘
                          operator thread reply
                  (HMAC 검증 → KV append → PUBLISH)
```

### 단계별

**A. 사용자 → Slack (Outbound)**
1. 위젯 폼 submit → React 19 `useActionState`가 Server Action `sendContactMessage` 호출
2. 액션이 zod로 입력 검증, 허니팟·rate-limit 체크
3. 신규 대화면 `createConversation`으로 KV에 메타 저장 → Slack `chat.postMessage`로 새 thread 생성 → 반환된 `thread_ts`를 `setThreadTs`로 KV에 매핑 (`thread:<ts>` → `conversationId`)
4. 기존 대화면 thread에 reply
5. 사용자 메시지를 KV sorted set(`conv:<id>:msg`)에 ZADD (score = createdAt)
6. **PUBLISH** `conv:<id>` 채널에 메시지 JSON 발행 → 같은 대화를 보고 있는 다른 탭/세션도 즉시 받음
7. 액션 결과로 사용자 메시지 + (신규면) 자동 ACK 메시지 반환

**B. 위젯 ← Slack (Inbound)**
1. 운영자가 thread에 답글 작성
2. Slack이 등록된 `/api/slack/events` 웹훅에 POST
3. Edge runtime에서 HMAC SHA256 서명 검증 (timestamp ±5분 drift, timing-safe compare)
4. `event_id` 기반 idempotency 체크 (`dedup:event:<id>` SET NX EX 300)
5. `thread_ts` → `conversationId` 역매핑 조회
6. operator 메시지를 KV에 append + 같은 채널로 PUBLISH
7. SSE 구독자가 PUBLISH를 받아 onmessage → 위젯 messages 상태 머지

**C. 실시간 전달 (SSE)**
1. 위젯이 마운트 + `conversationId` 존재 시 `EventSource('/api/contact/stream?conversationId=…&since=0')` 생성
2. SSE 라우트(Node runtime)가 KV에서 since 이후 메시지 일괄 replay → 클라가 history 복원
3. 라우트가 node-redis로 `conv:<id>` 채널 SUBSCRIBE
4. PUBLISH 도착마다 SSE `data: { type: "message", payload }`로 푸시
5. 25초 후 라우트 self-close (Vercel function 30s 한도 회피)
6. 브라우저 EventSource가 자동 재연결 — `Last-Event-ID` 헤더에 마지막으로 받은 메시지 timestamp 자동 포함
7. 서버는 헤더의 `Last-Event-ID`를 since cursor로 우선 사용 → 끊긴 사이 누락된 메시지 보정

---

## 3. 컴포넌트 책임

### 클라이언트

| 파일 | 책임 |
| --- | --- |
| `components/widget/contact-widget.tsx` | 모든 상태(messages, open, formKey) 보유. SSE 구독·메시지 머지·unread 계산·localStorage 동기화 |
| `components/widget/widget-fab.tsx` | 우하단 floating action button. unread badge 표시 |
| `components/widget/widget-panel.tsx` | 패널 UI (헤더·메시지 리스트·composer 폼). useFormStatus로 pending 처리 |
| `components/widget/message-bubble.tsx` | 메시지 1건 렌더. sender별 스타일 분기 |
| `components/layout/contact-trigger.tsx` | 헤더·CTA 버튼이 위젯을 열기 위한 트리거. window CustomEvent `amiolas:contact:toggle` 발행 |
| `hooks/use-contact-storage.ts` | localStorage 영속화 훅. `{ conversationId, identity, lastReadTs }` 읽기/쓰기 |

### 서버

| 파일 | 책임 |
| --- | --- |
| `lib/actions/contact-send.ts` | Server Action. zod 검증 → rate-limit → Slack 게시 → KV append → publish |
| `lib/contact/store.ts` | Upstash REST 어댑터. 대화 CRUD, 메시지 sorted set, thread 매핑, rate-limit 카운터, event dedupe, publish |
| `lib/contact/realtime.ts` | node-redis subscriber 팩토리 (TCP 연결, SSE 라우트가 사용) |
| `lib/slack/client.ts` | Slack Web API 래퍼. 새 thread 게시 + thread reply |
| `lib/slack/verify.ts` | HMAC SHA256 서명 검증 (Web Crypto API) |
| `app/api/contact/stream/route.ts` | SSE 엔드포인트. Node runtime, 25s 수명, Last-Event-ID 재연결 |
| `app/api/slack/events/route.ts` | Slack Events 웹훅. Edge runtime, 서명 검증·dedupe·publish |
| `lib/env.ts` | zod로 검증된 env 단일 진실 원천 |
| `lib/contact/config.ts` | 상수 (rate-limit, 메시지 길이 한도, TTL, ACK 텍스트) |

---

## 4. 데이터 저장

세 곳에 분산. 역할이 다릅니다.

| 위치 | 무엇을 저장 | TTL | 역할 |
| --- | --- | --- | --- |
| **Upstash Redis (KV)** | 메시지 본문·sender·timestamp 전체 | 30일 | **단일 진실 원천**. SSE가 여기서 읽어 푸시 |
| **Slack 채널 thread** | 메시지 본문 (운영자 가시화) | 무제한 | 운영자가 답변하는 UI. 봇이 게시·운영자가 reply |
| **브라우저 localStorage** | `conversationId` + `identity` + `lastReadTs` | 영구 (사용자 삭제 전) | 세션 식별자 + 마지막 읽음 cursor. **메시지 본문은 저장 안 함** |

### KV 키 구조

```
conv:V1StGXR8Z         → {
  id, identity:{name,email}, threadTs, createdAt, updatedAt
}
conv:V1StGXR8Z:msg     → sorted set
                            score=1731672345123 member={"id":"...","sender":"user","text":"..."}
                            score=1731672346001 member={"id":"...","sender":"system","text":"ACK..."}
                            score=1731672400500 member={"id":"...","sender":"operator","text":"..."}
thread:1731672345.001234 → "V1StGXR8Z"              ← 역매핑
rate:ip:1.2.3.4         → 3                          ← 60s TTL
dedup:event:Ev012345    → 1                          ← 5분 TTL
```

### 왜 메시지를 localStorage에 두지 않나
- **운영자 답글 동기화**: 다른 디바이스/브라우저에서도 같은 `conversationId`만 있으면 동일 대화 복원
- **저장 한도·민감 데이터**: localStorage는 5MB 한도, XSS 표적 — PII 보관 부적합

### Sorted set 선택 이유
- `ZRANGEBYSCORE (since +inf` 한 번에 시간 범위 조회 가능 → SSE history replay·재연결 cursor 모두 O(log N + M)
- score = createdAt(ms)이라 자연 정렬

---

## 5. 실시간 전달 — 왜 SSE + pub/sub

### 비교

| 방식 | 클라 fetch / 분 | KV 명령 / 분 (idle) | 지연 | 인프라 |
| --- | --- | --- | --- | --- |
| 5초 폴링 (이전) | 12 | 12 | 0~5s | 단순 |
| Long polling | 2~3 | 동일 | 0~25s | 같음 |
| **SSE + pub/sub** | **0~1** (재연결) | **0** | **<100ms** | node-redis + Node runtime |
| WebSocket | 0 | 0 | <100ms | 서버리스 부적합 |
| Pusher/Ably | 0 | 0 | <100ms | 외부 PaaS, 월 비용 |

SSE를 택한 이유: Vercel + Upstash 위에서 추가 SaaS 없이 가장 적은 idle 비용을 달성. 답글 없으면 연결 유지 외 비용 0.

### Vercel + Upstash 조합의 제약

| 항목 | 제약 |
| --- | --- |
| `@upstash/redis` REST 클라이언트 | `PUBLISH`는 가능, `SUBSCRIBE`는 불가 (HTTP stateless) |
| Vercel Edge runtime | fetch/WebSocket만 가능, TCP 불가 — pub/sub subscribe 안 됨 |
| Vercel Node serverless | TCP 가능, 함수 수명 동안 연결 유지 |
| Vercel Hobby 함수 한도 | 스트리밍 최대 30s |

결론: **SSE 라우트는 Node runtime에서 운영, node-redis로 Upstash TCP 연결해 구독**, **PUBLISH는 @upstash/redis REST 사용**.

### 25s self-close + Last-Event-ID 재연결 패턴

Vercel Hobby plan에서 streaming response가 30s를 넘기면 강제 종료됩니다. 우리는 25s에 미리 self-close:

```ts
const lifetime = setTimeout(async () => {
  await cleanup();   // unsubscribe + disconnect
  controller.close();
}, 25_000);
```

브라우저 EventSource는 연결이 끊기면 자동으로 재시도합니다. 우리는 SSE 응답에 `id:` 필드를 emit:

```
id: 1731672345123
data: {"type":"message","payload":{...}}
```

이 `id:` 값이 브라우저에 `Last-Event-ID`로 저장되고, 재연결 시 자동으로 `Last-Event-ID` 헤더가 포함됩니다. 서버는 이 헤더를 since cursor로 우선 사용해 끊긴 사이의 메시지를 replay → **갭 없는 연속 스트림**.

```ts
const since =
  parseTs(req.headers.get("last-event-id"))
  ?? parseTs(url.searchParams.get("since"))
  ?? 0;
```

### 왜 인터벌 폴링도 fallback으로 두지 않았나
이전 단계에서 5s 폴링 fallback을 유지할지 검토했지만, 폴링과 SSE 두 경로의 메시지 중복·중복 카운팅 처리가 복잡해져서 **SSE only**로 단순화. EventSource를 지원 안 하는 환경(IE 등)은 현재 마케팅 사이트 타깃에 무시 가능.

---

## 6. 보안·신뢰성

### HMAC 서명 검증 (Slack Events)
`/api/slack/events`는 외부에서 누구나 POST할 수 있는 공개 endpoint. Slack은 모든 요청에 `X-Slack-Signature` (HMAC SHA256) + `X-Slack-Request-Timestamp` 헤더를 포함.

검증 절차 (`lib/slack/verify.ts`):
1. timestamp 파싱, 현재 시각과 ±5분 이내인지 (replay 방지)
2. `v0:${timestamp}:${rawBody}`를 signing secret으로 HMAC SHA256 계산 (Web Crypto)
3. 결과를 `v0=` 접두사를 제거한 헤더 값과 **timing-safe equal**로 비교

```ts
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
```

문자열 비교가 빠른 거절 시 조기 종료하면 timing attack 단서가 됨 → 길이가 같은 한 *모든* 문자를 항상 비교.

### Idempotency (이벤트 중복 차단)
Slack은 endpoint가 3초 내 응답 못 하면 retry합니다. 같은 이벤트가 2번 도달 → 메시지 2번 저장될 위험. 이를 막기 위해 `event_id` 기반 atomic dedup:

```ts
const acquired = await redis.set(`dedup:event:${eventId}`, 1, {
  nx: true,    // 키가 없을 때만 set
  ex: 300,     // 5분 TTL
});
return acquired === "OK";
```

NX + EX 옵션이 *atomic*이라 동시 요청도 정확히 하나만 처리.

### 허니팟 (Anti-spam)
폼에 시각적으로 숨긴 `<input name="_website">` 추가. 사람은 안 보고 지나치고, 폼 채우기 봇은 모든 필드를 채우는 경향. 서버에서 값이 있으면 200 OK 응답하되 Slack에 게시하지 않음 (silent rejection):

```ts
if (honeypot.length > 0) {
  return { ok: true, conversationId: "honey", messages: [] };
}
```

### Rate-limit
Redis `INCR` + `EXPIRE`로 단순 슬라이딩 윈도우:

```ts
const count = await redis.incr(`rate:${key}`);
if (count === 1) await redis.expire(`rate:${key}`, 60);
return { count, allowed: count <= 6 };
```

키는 `conversationId` 우선, 없으면 IP. 60초 윈도우에 6건 한도.

### CSRF
Server Action은 Next.js가 origin 헤더를 자동 검증 → CSRF 자동 보호.

### Slack 서명 시크릿 노출 시
`SLACK_BOT_TOKEN`이나 `SLACK_SIGNING_SECRET`이 노출되면 **즉시 revoke + 재발급**.
- Bot Token: Slack App → OAuth & Permissions → Revoke Token → Reinstall
- Signing Secret: Basic Information → App Credentials → Regenerate

`.env.local` + Vercel Environment Variables 양쪽 동시 교체.

---

## 7. 위젯 unread 카운팅

읽지 않은 메시지 배지는 **derived state**입니다.

```ts
const lastReadTs = stored?.lastReadTs ?? 0;
const unread = useMemo(
  () =>
    messages.filter(
      (m) => m.sender === "operator" && m.createdAt > lastReadTs,
    ).length,
  [messages, lastReadTs],
);
```

`lastReadTs`는 localStorage에 영속. 위젯이 열릴 때마다 `max(messages.createdAt)`로 갱신:

```ts
useEffect(() => {
  if (!open || !stored) return;
  const maxTs = maxCreatedAt(messages);
  if (maxTs > lastReadTs) {
    save({ ...stored, lastReadTs: maxTs });
  }
}, [open, messages, lastReadTs, stored, save]);
```

이전엔 `setUnread(u => u + 1)`을 SSE 이벤트마다 호출했는데, 25s마다 재연결되며 같은 운영자 메시지가 재emit → unread가 누적되는 버그가 있었습니다. derived state로 바꾸면서 *messages 변화가 정합성의 단일 입력*이 되어 누적 문제가 자연 해결.

---

## 8. 환경 변수

`lib/env.ts`에서 zod로 검증. 누락·형식 오류면 빌드/런타임 즉시 실패.

| 변수 | 출처 | 용도 |
| --- | --- | --- |
| `SLACK_BOT_TOKEN` | Slack App OAuth | `chat.postMessage` 봇 인증 (xoxb-…) |
| `SLACK_SIGNING_SECRET` | Slack App Basic Information | Events 웹훅 HMAC 검증 |
| `SLACK_INBOX_CHANNEL_ID` | Slack 채널 ID (C로 시작) | 게시 대상 채널 |
| `KV_REST_API_URL` | Vercel Storage / Upstash | `@upstash/redis` HTTPS endpoint |
| `KV_REST_API_TOKEN` | Vercel Storage / Upstash | REST 인증 토큰 |
| `KV_URL` | Vercel Storage / Upstash (rediss://) | node-redis TCP 연결 (pub/sub subscribe) |
| `NEXT_PUBLIC_SITE_URL` | 직접 설정 | OG·sitemap 등 절대 URL |

---

## 9. 한계 / 향후 개선

### 현재 한계
- **세션 유실**: 사용자가 브라우저 데이터를 지우면 `conversationId` 분실 → 기존 thread 못 봄. 새 대화로 시작됨
- **운영자 알림 지연**: 운영자가 Slack 알림 못 보면 회신이 늦음. UX 메시지로 "1영업일 내 회신" 명시
- **이메일 폴백 없음**: Slack 답글이 사용자 이메일로 자동 전달되지 않음. 위젯 안에서만 회신 확인 가능
- **Vercel Hobby plan 30s 함수 한도**: 동시 active 위젯 ~수십 개까지 여유. 대규모 트래픽 시 Pro 전환 또는 외부 pub/sub PaaS로 갈아타야 함
- **첨부파일 미지원**: 텍스트만 처리
- **다른 디바이스 동기화**: `conversationId`가 localStorage에 있어 디바이스 간 자동 동기화 안 됨. 이메일 magic link 같은 식별자 통합이 필요

### 향후 개선 방향
- 트래픽 보고 외부 pub/sub(Pusher / Ably) 전환 검토
- 답글 도착 시 사용자 이메일로 자동 알림 (Resend 류)
- 첨부파일·이미지 지원
- 운영자 측 위젯 admin UI (현재는 Slack 자체가 admin)
- reCAPTCHA / Cloudflare Turnstile (스팸 실 발생 시)
- 응답 SLA 자동 추적 (Slack 첫 답글까지 걸린 시간)

---

## 10. 디렉터리 맵

```
src/
  app/
    (marketing)/
      _components/
        contact-section.tsx         # 홈 §6 contact 섹션 — CTA가 위젯 토글
      layout.tsx                    # <ContactWidget /> 1회 삽입
    api/
      contact/
        stream/route.ts             # SSE (Node, 25s)
      slack/
        events/route.ts             # Slack Events 웹훅 (Edge)
  components/
    layout/
      contact-trigger.tsx           # 위젯 토글 버튼 (헤더·CTA 공용)
      header.tsx                    # 헤더에서 트리거 사용
    widget/
      contact-widget.tsx            # 메인 client, 모든 상태 보유
      widget-fab.tsx                # 우하단 FAB
      widget-panel.tsx              # 패널 UI + 폼
      message-bubble.tsx            # 메시지 1건 렌더
  hooks/
    use-contact-storage.ts          # localStorage 영속 훅
  lib/
    actions/
      contact-send.ts               # Server Action
    contact/
      config.ts                     # 상수
      realtime.ts                   # node-redis subscriber 팩토리
      store.ts                      # Upstash REST 어댑터
    slack/
      client.ts                     # Slack Web API 래퍼
      verify.ts                     # HMAC 검증
    env.ts                          # zod env 검증
  types/
    contact.ts                      # ContactMessage, Conversation, Identity 등
```

---

## 11. 운영 cheatsheet

### 새 운영자 합류
1. Slack workspace 초대
2. `#contact` 채널 초대
3. 봇 `@Amiolas Inbox`가 채널에 있는지 확인 (`/invite @Amiolas Inbox`)

### 채널 이름 변경
- Slack 채널명 변경은 안전. 우리 코드는 `SLACK_INBOX_CHANNEL_ID` (ID 기반)를 참조하고 ID는 rename 시 유지됨

### Slack 토큰 재발급
1. https://api.slack.com/apps → Amiolas Inbox
2. OAuth & Permissions → Revoke Token
3. Install App → Reinstall to Workspace → 새 `xoxb-…` 발급
4. `.env.local` + Vercel Settings → Environment Variables 양쪽에서 `SLACK_BOT_TOKEN` 교체
5. Vercel 재배포

### KV 용량 / 명령 모니터링
- Vercel Storage → `amiolas-contact` → Upstash 대시보드
- Free tier: 500K commands/월, 256MB. SSE + pub/sub은 idle 비용이 거의 없어 트래픽 크게 늘기 전엔 여유

### 이슈 디버깅
- `/api/slack/events` 401: 서명 검증 실패 → `SLACK_SIGNING_SECRET` 확인
- `/api/contact/stream` 502/timeout: node-redis 연결 실패 → `KV_URL` (`rediss://`) 확인
- Slack `not_in_channel` 에러: 봇이 채널에 미초대 상태 → `/invite @Amiolas Inbox`
- 위젯이 안 보임: 마케팅 layout에 `<ContactWidget />` 삽입 확인
