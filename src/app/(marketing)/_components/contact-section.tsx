import { Reveal } from "@/components/marketing/reveal";
import { ContactTrigger } from "@/components/layout/contact-trigger";

const list = [
  { dt: "General", dd: "contact@amiolas.com" },
  { dt: "Products", dd: "hello@specify.app" },
  { dt: "Studio", dd: "Seoul, KR · Remote-friendly" },
  { dt: "Office Hours", dd: "Mon–Fri · 10:00 – 19:00 KST", mono: true },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-line-soft py-[clamp(80px,12vw,160px)]"
    >
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div>
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                Contact
              </div>
              <h2 className="m-0 mb-6 max-w-[18ch] text-balance break-keep text-[clamp(28px,3.4vw,48px)] font-bold leading-[1.2] tracking-[-0.025em]">
                의미가 끊어진 자리,{" "}
                <em className="font-serif font-normal italic text-accent-soft">
                  함께
                </em>{" "}
                들여다봅시다.
              </h2>
              <p className="m-0 mb-8 max-w-[50ch] break-keep text-[15px] leading-[1.75] text-fg-muted">
                AI 제품 도입, 엔터프라이즈 시스템 의뢰, 협업 제안, 미디어 문의.
                한 통의 메일로 시작합니다.
              </p>
              <ContactTrigger className="inline-flex items-center gap-3.5 rounded-full bg-brand-light px-6 py-4 text-sm font-medium text-white shadow-[0_0_0_0_color-mix(in_oklab,var(--color-brand-light)_40%,transparent)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_60px_-10px_color-mix(in_oklab,var(--color-brand-light)_60%,transparent)]">
                <span>Start an Inquiry</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 11L11 3M11 3H5M11 3V9"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </ContactTrigger>
            </div>

            <dl className="text-sm text-fg-muted">
              {list.map((row, i) => (
                <div
                  key={row.dt}
                  className={`grid grid-cols-[110px_1fr] gap-3.5 border-b border-line-soft py-3.5 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-dim">
                    {row.dt}
                  </dt>
                  <dd
                    className={`m-0 text-foreground ${
                      "mono" in row && row.mono ? "font-mono" : ""
                    }`}
                  >
                    {row.dd}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
