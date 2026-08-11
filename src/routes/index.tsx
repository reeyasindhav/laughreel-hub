import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { ClipCard, SpecialCard, TourCard } from "@/components/cards";
import { clips, comedians, specials, subGenres, tourDates, getSpecial } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const TITLE = "Laughreel — Indian Stand-Up Specials, Clips & Live Tours";
const DESC =
  "Stream full-length Indian stand-up specials, binge viral sketch clips, follow your favourite comedians and book live tour tickets — all in one comedy-first hub.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Home,
});

function Home() {
  const { bookTicket, tickets } = useAuth();
  const hero = getSpecial("tathastu")!;

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-12">
        <div className="stage-glow animate-glow pointer-events-none absolute left-1/2 top-0 h-[620px] w-full" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="animate-[rise_0.8s_cubic-bezier(0.16,1,0.3,1)_both]">
            <span className="mb-6 inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary">
              Trending Special
            </span>
            <h1 className="mb-6 font-display text-7xl leading-[0.9] md:text-8xl">
              ZAKIR KHAN:
              <br />
              <span className="text-primary">TATHASTU</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {hero.synopsis}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/specials/$id"
                params={{ id: hero.id }}
                className="rounded-xl bg-foreground px-8 py-4 font-bold text-background transition-transform hover:scale-105"
              >
                Watch Now
              </Link>
              <Link
                to="/tours"
                className="glass-panel rounded-xl px-8 py-4 font-bold transition-colors hover:bg-foreground/5"
              >
                View Tour Dates
              </Link>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
              <img
                src={hero.poster}
                alt="Zakir Khan performing his stand-up special Tathastu"
                className="aspect-[4/5] w-full bg-surface object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-8">
                <div className="flex gap-4">
                  <div className="glass-panel flex-1 rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                      Laugh Score
                    </p>
                    <p className="text-xl font-bold text-accent">{hero.score}%</p>
                  </div>
                  <div className="glass-panel flex-1 rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                      Language
                    </p>
                    <p className="text-xl font-bold">{hero.language}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-surface/40 py-3">
        <div className="animate-marquee flex whitespace-nowrap font-display text-2xl tracking-widest">
          {[0, 1].map((k) => (
            <span key={k} className="flex">
              {comedians.map((c) => (
                <span key={c.slug} className="px-6 text-foreground/60">
                  {c.name.toUpperCase()} <span className="text-secondary">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Sub-genres */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {subGenres.map((g, i) => (
              <Link
                key={g}
                to="/specials"
                search={{ genre: g }}
                className="flex-shrink-0 rounded-2xl border border-border bg-surface px-8 py-4 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <p className={`font-display text-xl ${i % 3 === 1 ? "text-secondary" : ""}`}>{g}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Specials rail */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h3 className="mb-2 font-display text-4xl tracking-tight">Must-Watch Specials</h3>
              <p className="text-muted-foreground">
                Full-length sets from the scene's heavy hitters.
              </p>
            </div>
            <Link
              to="/specials"
              className="border-b border-accent/30 pb-1 text-sm font-bold text-accent transition-all hover:border-accent"
            >
              View All Specials
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {specials.slice(0, 4).map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <SpecialCard special={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tours */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h3 className="mb-2 font-display text-4xl tracking-tight">Live In Your City</h3>
              <p className="text-muted-foreground">Don't wait for the special. Catch them live.</p>
            </div>
            <Link
              to="/tours"
              className="border-b border-accent/30 pb-1 text-sm font-bold text-accent transition-all hover:border-accent"
            >
              View All Tours
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {tourDates.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <TourCard
                  tour={t}
                  booked={tickets.includes(t.id)}
                  onBook={() => bookTicket(t.id)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clips */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <h3 className="font-display text-4xl tracking-tight">Laughter Shots</h3>
            <Link
              to="/clips"
              className="border-b border-accent/30 pb-1 text-sm font-bold text-accent transition-all hover:border-accent"
            >
              All Clips
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {clips.slice(0, 5).map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <ClipCard clip={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comedians strip */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h3 className="mb-2 font-display text-4xl tracking-tight">The Roster</h3>
              <p className="text-muted-foreground">
                Curated profiles, sub-genre tags and language filters.
              </p>
            </div>
            <Link
              to="/comedians"
              className="border-b border-accent/30 pb-1 text-sm font-bold text-accent transition-all hover:border-accent"
            >
              Full Directory
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {comedians.slice(0, 4).map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link
                  to="/comedians/$slug"
                  params={{ slug: c.slug }}
                  className="group block text-center"
                >
                  <div className="mx-auto aspect-square w-full overflow-hidden rounded-full border border-border bg-surface transition-all duration-500 group-hover:border-primary group-hover:shadow-[var(--shadow-neon)]">
                    <img
                      src={c.photo}
                      alt={c.name}
                      loading="lazy"
                      className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 font-display text-2xl tracking-wide">{c.name}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.tagline}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
