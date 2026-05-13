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
    <div className="flex shrink-0 items-center gap-14 pr-14 font-mono text-xs uppercase tracking-[0.22em]">
      {items.map((item) => (
        <div key={item} className="flex shrink-0 items-center gap-14">
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
      className="relative overflow-hidden border-y border-line-soft py-5 text-fg-dim"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <Track />
        <Track />
      </div>
    </div>
  );
}
