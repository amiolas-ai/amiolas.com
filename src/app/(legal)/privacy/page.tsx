import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "개인정보 처리방침",
  description:
    "Amiolas가 amiolas.com을 통해 수집·이용·보관하는 개인정보의 범위와 정보주체의 권리를 안내합니다.",
  path: "/privacy",
});

const EFFECTIVE_DATE = "2026년 5월 14일";

type Section = {
  num: string;
  title: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    num: "01",
    title: "수집하는 개인정보 항목",
    body: (
      <>
        <p className="m-0 text-pretty leading-[1.7] text-fg-muted">
          Amiolas(이하 "회사")는 사이트 우하단 Contact 위젯을 통한 문의 시점에
          정보주체가 직접 입력하는 다음 항목을 수집합니다.
        </p>
        <dl className="mt-6 divide-y divide-line-soft">
          <Row
            term="필수"
            desc="이름, 이메일 주소, 메시지 본문 (위젯 첫 메시지 작성 시 1회 입력)"
          />
          <Row
            term="자동 수집"
            desc="IP 주소 (rate-limit 카운터 용도, 60초 윈도우만 유지)"
          />
        </dl>
      </>
    ),
  },
  {
    num: "02",
    title: "수집·이용 목적",
    body: (
      <ul className="m-0 list-none space-y-2 p-0 leading-[1.7] text-fg-muted">
        <li>· 문의에 대한 응대 및 후속 커뮤니케이션</li>
        <li>· 동일 대화의 연속성 유지 (재방문 시 thread 복원)</li>
        <li>· 자동화된 abuse·spam 차단</li>
      </ul>
    ),
  },
  {
    num: "03",
    title: "보관 기간",
    body: (
      <dl className="m-0 divide-y divide-line-soft">
        <Row
          term="대화 데이터"
          desc="대화 저장소(Upstash Redis)에 마지막 활동 기준 30일 보관. 이후 자동 삭제(TTL)."
        />
        <Row
          term="Slack thread"
          desc="회사 Slack 워크스페이스의 #contact 채널에 보관. 별도 삭제 전까지 Slack 자체 보존 정책에 따름."
        />
        <Row
          term="IP rate-limit"
          desc="60초 단위 카운터로만 유지, 윈도우 만료 시 자동 삭제."
        />
      </dl>
    ),
  },
  {
    num: "04",
    title: "처리위탁(수탁자)",
    body: (
      <>
        <p className="m-0 text-pretty leading-[1.7] text-fg-muted">
          서비스 운영을 위해 다음 처리자에게 처리를 위탁합니다. 각사는 자체
          개인정보 보호정책을 따릅니다.
        </p>
        <dl className="mt-6 divide-y divide-line-soft">
          <Row term="Vercel, Inc." desc="웹 호스팅·CDN·로그" />
          <Row term="Upstash, Inc." desc="대화 저장소(Redis)" />
          <Row term="Slack Technologies" desc="운영자 커뮤니케이션" />
        </dl>
      </>
    ),
  },
  {
    num: "05",
    title: "정보주체의 권리",
    body: (
      <>
        <p className="m-0 text-pretty leading-[1.7] text-fg-muted">
          정보주체는 언제든지 본인의 개인정보에 대해 열람·정정·삭제·처리 정지를
          요청할 수 있습니다. 요청은 사이트 우하단 Contact 위젯으로 보내주시면
          영업일 기준 1일 이내에 회신드립니다.
        </p>
        <p className="mt-4 text-pretty leading-[1.7] text-fg-muted">
          브라우저 localStorage에 저장된 conversationId·이름·이메일은 사용자가
          직접 브라우저 데이터를 삭제함으로써 즉시 제거할 수 있습니다.
        </p>
      </>
    ),
  },
  {
    num: "06",
    title: "보안 조치",
    body: (
      <ul className="m-0 list-none space-y-2 p-0 leading-[1.7] text-fg-muted">
        <li>· 전 구간 HTTPS</li>
        <li>· Slack Events 웹훅의 HMAC SHA256 서명 검증 (timing-safe equal)</li>
        <li>· IP·대화 단위 rate-limit과 허니팟 필드를 통한 abuse 차단</li>
        <li>· 환경변수(시크릿)는 Vercel Settings에 sensitive 저장</li>
      </ul>
    ),
  },
  {
    num: "07",
    title: "쿠키 및 트래킹",
    body: (
      <ul className="m-0 list-none space-y-2 p-0 leading-[1.7] text-fg-muted">
        <li>
          · Vercel Analytics·Speed Insights — 익명화된 페이지뷰·성능 지표 수집
        </li>
        <li>
          · 위젯 동작용 localStorage — conversationId, 이름, 이메일, 마지막
          읽음 timestamp (서버로 전송되지 않으며 브라우저에만 보관)
        </li>
      </ul>
    ),
  },
  {
    num: "08",
    title: "정책 변경",
    body: (
      <p className="m-0 text-pretty leading-[1.7] text-fg-muted">
        본 처리방침이 개정되는 경우 시행 7일 전 본 페이지를 통해 사전 고지합니다.
        중대한 변경 시에는 진행 중인 대화의 이메일을 통해 별도 안내합니다.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <header className="mb-20">
        <span className="text-[11.5px] font-medium uppercase tracking-eyebrow text-brand-light">
          Legal · Privacy
        </span>
        <h1 className="mt-3 text-balance text-[clamp(2.25rem,4.4vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          개인정보 처리방침
        </h1>
        <p className="mt-6 text-pretty text-[15px] leading-[1.7] text-fg-muted">
          Amiolas는{" "}
          <a
            href="https://amiolas.com"
            className="border-b border-foreground/40 pb-px text-foreground"
          >
            amiolas.com
          </a>
          을 통해 수집·이용·보관하는 개인정보의 범위와 정보주체의 권리를
          아래와 같이 안내합니다.
        </p>
        <p className="mt-2 font-mono text-[11.5px] uppercase tracking-[0.16em] text-fg-dim">
          시행일 · {EFFECTIVE_DATE}
        </p>
      </header>

      {sections.map(({ num, title, body }) => (
        <section
          key={num}
          className="border-t border-border pt-12 [&+section]:mt-16"
        >
          <div className="mb-5 flex items-baseline gap-3 font-mono text-[11.5px] uppercase tracking-[0.16em] text-fg-dim">
            <span className="text-brand-light">{num}</span>
            <span>Section {num}</span>
          </div>
          <h2 className="m-0 mb-6 text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-[1.25] tracking-[-0.02em]">
            {title}
          </h2>
          {body}
        </section>
      ))}

      <section className="mt-20 border-t border-border pt-12">
        <span className="text-[11.5px] font-medium uppercase tracking-eyebrow text-brand-light">
          Contact
        </span>
        <p className="mt-3 text-pretty leading-[1.7] text-fg-muted">
          본 처리방침에 대한 문의는 사이트 우하단 Contact 위젯으로 보내주세요.
        </p>
        <dl className="mt-6 divide-y divide-line-soft">
          <Row term="회사명" desc="Amiolas (아미올라스)" />
          <Row term="소재지" desc="Seoul, KR" />
          <Row term="이메일" desc="준비 중" />
        </dl>
      </section>
    </article>
  );
}

function Row({ term, desc }: { term: string; desc: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-6 py-4 sm:grid-cols-[140px_1fr]">
      <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-fg-dim">
        {term}
      </dt>
      <dd className="m-0 text-pretty leading-[1.6] text-foreground">{desc}</dd>
    </div>
  );
}
