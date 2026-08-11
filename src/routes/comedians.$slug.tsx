import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { ClipCard, SpecialCard } from "@/components/cards";
import { clipsBy, getComedian, specialsBy, toursBy } from "@/lib/data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/comedians/$slug")({
  loader: ({ params }) => {
    const comedian = getComedian(params.slug);
    if (!comedian) throw notFound();
    return { comedian };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Comedian not found — Laughreel" }, { name: "robots", content: "noindex" }],
      };
    }
    const c = loaderData.comedian;
    const title = `${c.name} — Specials, Clips & Tour Dates | Laughreel`;
    return {
      meta: [
        { title },
        { name: "description", content: c.bio.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: c.bio.slice(0, 155) },
        { property: "og:image", content: c.photo },
        { name: "twitter:image", content: c.photo },
      ],
    };
  },
  component: ComedianProfile,
});

function ComedianProfile() {
  const { comedian } = Route.useLoaderData();
  const { bookTicket, tickets } = useAuth();
  const sets = specialsBy(comedian.slug);
  const cuts = clipsBy(comedian.slug);
  const tours = toursBy(comedian.slug);

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={comedian.photo}
            alt=""
            aria-hidden
            className="size-full scale-110 object-cover object-top opacity-20 blur-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-6 py-20 md:grid-cols-[320px_1fr]">
          <div className="animate-float overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-neon)]">
            <img
              src={comedian.photo}
              alt={comedian.name}
              className="aspect-[4/5] w-full bg-surface object-cover object-top"
            />
          </div>
          <div>
            <span className="mb-4 inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary">
              {comedian.tagline}
            </span>
            <h1 className="font-display text-7xl leading-[0.9] md:text-8xl">
              {comedian.name.toUpperCase()}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {comedian.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-8">
              <Stat label="Followers" value={comedian.followers} />
              <Stat label="Specials" value={`${sets.length}`} />
              <Stat label="Clips" value={`${cuts.length}`} />
              <Stat label="Base" value={comedian.city} />
            </div>
            <p className="mt-6 text-[10px] uppercase tracking-widest text-muted-foreground/50">
              {comedian.credit}
            </p>
          </div>
        </div>
      </section>

      {sets.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="mb-8 font-display text-4xl">Specials</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sets.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <SpecialCard special={s} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {cuts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="mb-8 font-display text-4xl">Viral cuts</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {cuts.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <ClipCard clip={c} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-12 pb-24">
        <h2 className="mb-8 font-display text-4xl">Live dates</h2>
        {tours.length === 0 ? (
          <div className="glass-panel rounded-3xl p-10 text-center">
            <p className="font-display text-3xl">No dates announced right now.</p>
            <Link to="/tours" className="mt-4 inline-block text-sm font-bold text-accent">
              Browse the full tour calendar
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {tours.map((t) => (
              <div
                key={t.id}
                className="glass-panel flex flex-wrap items-center gap-6 rounded-2xl p-5 transition-colors hover:border-primary/40"
              >
                <div className="min-w-16 text-center">
                  <p className="font-display text-3xl text-primary">{t.date.split(" ")[1]}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.date.split(" ")[0]}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-bold">{t.show}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.venue}, {t.city} • {t.weekday} {t.time}
                  </p>
                </div>
                <button
                  disabled={t.soldOut || tickets.includes(t.id)}
                  onClick={() => bookTicket(t.id)}
                  className={`rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    t.soldOut
                      ? "cursor-not-allowed border border-border text-muted-foreground"
                      : tickets.includes(t.id)
                        ? "border border-accent/50 bg-accent/15 text-accent"
                        : "bg-primary text-primary-foreground shadow-[var(--shadow-neon)] hover:brightness-110"
                  }`}
                >
                  {t.soldOut ? "Sold Out" : tickets.includes(t.id) ? "Booked ✓" : `Tickets ${t.price}`}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-4xl text-accent">{value}</p>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
