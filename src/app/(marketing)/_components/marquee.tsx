const items = [
  "Ontology AI Agent",
  "Multi-Source RAG",
  "Knowledge Graph",
  "Semantic Linking",
  "Enterprise Engineering",
  "Continuity of Meaning",
] as const;

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12 font-mono text-xs uppercase tracking-[0.22em]">
      {items.map((item) => (
        <div key={item} className="flex shrink-0 items-center gap-12">
          <span>{item}</span>
          <span className="text-accent-soft">◆</span>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-dashed border-border py-5 text-fg-dim [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee">
        <Track />
        <Track />
      </div>
    </div>
  );
}
