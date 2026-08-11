import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { comedians, languages, specialsBy } from "@/lib/data";

const TITLE = "Indian Comedians Directory — Laughreel";
const DESC =
  "Explore curated profiles of India's best stand-up comedians — Zakir Khan, Vir Das, Sumukhi Suresh and more — with their specials, clips and tour dates.";

export const Route = createFileRoute("/comedians/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ComediansPage,
});

function ComediansPage() {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("All");

  const list = useMemo(
    () =>
      comedians
        .filter((c) => c.name.toLowerCase().includes(q.toLowerCase().trim()))
        .filter((c) => (lang === "All" ? true : c.languages.includes(lang))),
    [q, lang],
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="The roster"
        title={
          <>
            THE <span className="text-secondary">COMEDIANS</span>
          </>
        }
        subtitle="Every artist with a profile, a catalogue and a tour calendar in one place — no scrolling through five apps."
      />

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="glass-panel flex flex-wrap items-center gap-3 rounded-2xl p-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search comedians…"
            className="min-w-56 flex-1 rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
          />
          {["All", ...languages].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                lang === l
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <Link
                to="/comedians/$slug"
                params={{ slug: c.slug }}
                className="group flex h-full gap-5 rounded-3xl border border-border bg-surface p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[var(--shadow-neon)]"
              >
                <div className="size-28 shrink-0 overflow-hidden rounded-2xl bg-surface-2">
                  <img
                    src={c.photo}
                    alt={c.name}
                    loading="lazy"
                    className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl tracking-wide">{c.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-secondary">{c.tagline}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {c.city} • {c.followers} followers
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[...c.languages, ...c.genres].slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-accent">
                    {specialsBy(c.slug).length} special{specialsBy(c.slug).length === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-20 text-center font-display text-3xl text-muted-foreground">
            Nobody by that name on the bill.
          </p>
        )}
      </section>
    </PageShell>
  );
}
