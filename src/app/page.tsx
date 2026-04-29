import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="flex max-w-3xl flex-col items-center gap-8 text-center">
        <Image
          src="/logo.png"
          alt="Amiolas"
          width={120}
          height={120}
          priority
          className="rounded-2xl"
        />

        <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
          Restore the continuity of meaning.
        </h1>

        <p className="max-w-xl text-balance text-lg text-muted-foreground">
          Ontology-driven AI agents that decode the fragmented language of your
          enterprise data.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
          <span className="size-2 rounded-full bg-primary" />
          Coming soon
        </div>
      </div>
    </main>
  );
}
