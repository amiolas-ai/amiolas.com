import { Reveal } from "@/components/marketing/reveal";
import { ContactTrigger } from "@/components/layout/contact-trigger";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const list = [
  { dt: "General", dd: "support@amiolas.com" },
  { dt: "Studio", dd: "Seoul, KR" },
  { dt: "Office Hours", dd: "Mon–Fri · 10:00 – 19:00 KST", mono: true },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-dashed border-border py-section-lg"
      style={{
        background:
          "radial-gradient(ellipse 60% 80% at 20% 50%, oklch(0.55 0.22 295 / 0.12) 0%, transparent 60%)," +
          "radial-gradient(ellipse 50% 70% at 95% 30%, oklch(0.55 0.22 295 / 0.06) 0%, transparent 55%)",
      }}
    >
      {/* scanline rule at the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.55 0.22 295 / 0.45), transparent)",
        }}
      />
      <div className="mx-auto max-w-[1440px] px-[var(--pad)]">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div>
              <div className="mb-5 flex items-center gap-2.5 font-mono text-label uppercase text-fg-muted">
                <span className="status-dot" aria-hidden />
                Contact · Inquiry Open
              </div>
              <h2 className="m-0 mb-6 max-w-[18ch] text-balance break-keep text-title">
                의미가 끊어진 자리,{" "}
                <em className="font-bold italic text-accent-soft">
                  함께
                </em>{" "}
                들여다봅시다.
              </h2>
              <p className="m-0 mb-8 max-w-[50ch] break-keep text-body text-fg-muted">
                AI 에이전트 도입, 시스템 구축 의뢰, 협업과 미디어 문의 모두
                메시지 한 통으로 시작합니다.
              </p>
              <ContactTrigger
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "gap-3 px-7 hover:-translate-y-0.5 hover:shadow-glow-lg",
                )}
              >
                <span>문의 시작하기</span>
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
              <div className="mt-3.5 font-mono text-label-sm uppercase text-fg-dim">
                영업일 기준 1일 이내 회신 · KST
              </div>
            </div>

            <div className="border-t border-dashed border-border pt-8 md:border-l md:border-t-0 md:pl-9 md:pt-0">
              <dl className="text-body-sm text-fg-muted">
                {list.map((row, i) => (
                  <div
                    key={row.dt}
                    className={`grid grid-cols-[110px_1fr] gap-3.5 border-b border-dashed border-border py-3.5 ${
                      i === 0 ? "border-t" : ""
                    }`}
                  >
                    <dt className="font-mono text-label-sm uppercase text-fg-dim">
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
              <div className="mt-4.5 flex justify-between font-mono text-label-sm uppercase text-fg-dim">
                <span>Fig · 002</span>
                <span>Contact Block</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
