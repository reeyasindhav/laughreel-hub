import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { SpecialCard } from "@/components/cards";
import { languages, specials, subGenres } from "@/lib/data";

const TITLE = "Full-Length Comedy Specials — Laughreel";
const DESC =
  "Browse every Indian stand-up special on Laughreel. Filter by language — Hindi, Hinglish, English — and by sub-genre from observational to political satire.";

export const Route = createFileRoute("/specials/")({
  validateSearch: (search: Record<string, unknown>): { genre?: string } =>
    typeof search["genre"] === "string" ? { genre: search["genre"] } : {},
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: SpecialsPage,
});

function SpecialsPage() {
  const { genre } = Route.useSearch();
  const [lang, setLang] = useState<string>("All");
  const [activeGenre, setActiveGenre] = useState<string>(genre ?? "All");
  const [sort, setSort] = useState<"score" | "year">("score");

  const list = useMemo(() => {
    return specials
      .filter((s) => (lang === "All" ? true : s.language === lang))
      .filter((s) => (activeGenre === "All" ? true : s.genre === activeGenre))
      .sort((a, b) => (sort === "score" ? b.score - a.score : b.year - a.year));
  }, [lang, activeGenre, sort]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Streaming now"
        title={
          <>
            ALL <span className="text-primary">SPECIALS</span>
          </>
        }
        subtitle="Full hours, uncut. Filter by language and sub-genre — the two things every comedy catalogue forgets."
      />

      <section className="mx-auto max-w-7xl px-6 pb-6">
        <div className="glass-panel flex flex-wrap items-center gap-3 rounded-2xl p-4">
          <span className="pr-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Language
          </span>
          {["All", ...languages].map((l) => (
            <Chip key={l} active={lang === l} onClick={() => setLang(l)}>
              {l}
            </Chip>
          ))}
          <span className="ml-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Sort
            <button
              onClick={() => setSort(sort === "score" ? "year" : "score")}
              className="rounded-full border border-border px-3 py-1 text-foreground normal-case"
            >
              {sort === "score" ? "Laugh Score" : "Newest"}
            </button>
          </span>
        </div>
        <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-2">
          {["All", ...subGenres].map((g) => (
            <Chip key={g} active={activeGenre === g} onClick={() => setActiveGenre(g)}>
              {g}
            </Chip>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <p className="mb-6 text-sm text-muted-foreground">{list.length} specials</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <SpecialCard special={s} />
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-20 text-center font-display text-3xl text-muted-foreground">
            No specials match that combination — yet.
          </p>
        )}
      </section>
    </PageShell>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-neon)]"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
