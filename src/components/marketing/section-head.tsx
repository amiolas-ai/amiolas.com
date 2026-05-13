import type { ReactNode } from "react";

type Props = {
  label: string;
  title: ReactNode;
  aside?: string;
};

export function SectionHead({ label, title, aside }: Props) {
  return (
    <div className="mb-10 grid grid-cols-1 items-end gap-4 border-b border-line-soft pb-9 md:grid-cols-[200px_1fr_auto] md:gap-8">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
        {label}
      </div>
      <h2 className="m-0 max-w-[28ch] text-balance break-keep text-[clamp(20px,2vw,28px)] font-semibold leading-[1.3] tracking-[-0.018em]">
        {title}
      </h2>
      {aside ? (
        <div className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim md:block">
          {aside}
        </div>
      ) : null}
    </div>
  );
}
