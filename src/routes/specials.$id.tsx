import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { ClipCard, SpecialCard } from "@/components/cards";
import { clipsBy, getComedian, getSpecial, specials, specialsBy } from "@/lib/data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/specials/$id")({
  loader: ({ params }) => {
    const special = getSpecial(params.id);
    if (!special) throw notFound();
    return { special };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Special not found — Laughreel" }, { name: "robots", content: "noindex" }],
      };
    }
    const { special } = loaderData;
    const artist = getComedian(special.comedian)?.name ?? "";
    const title = `${special.title} — ${artist} | Laughreel`;
    return {
      meta: [
        { title },
        { name: "description", content: special.synopsis },
        { property: "og:title", content: title },
        { property: "og:description", content: special.synopsis },
        { property: "og:image", content: special.poster },
        { name: "twitter:image", content: special.poster },
      ],
    };
  },
  component: SpecialDetail,
});

function SpecialDetail() {
  const { special } = Route.useLoaderData();
  const artist = getComedian(special.comedian)!;
  const { watchlist, toggleWatchlist } = useAuth();
  const [playing, setPlaying] = useState(false);
  const saved = watchlist.includes(special.id);
  const related = specials.filter((s) => s.id !== special.id && s.genre === special.genre).slice(0, 4);

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={special.poster}
            alt=""
            aria-hidden
            className="size-full scale-110 object-cover object-top opacity-25 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div
            className="group relative aspect-video w-full overflow-hidden rounded-3xl border border-border bg-surface"
            onClick={() => setPlaying((p) => !p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setPlaying((p) => !p)}
          >
            <img
              src={special.poster}
              alt={`${special.title} by ${artist.name}`}
              className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-full bg-primary/90 text-2xl text-primary-foreground shadow-[var(--shadow-neon)] transition-transform duration-500 group-hover:scale-110">
                {playing ? "❚❚" : "▶"}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/15">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000"
                  style={{ width: playing ? "34%" : "6%" }}
                />
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {playing ? "Now playing — instant preview" : "Tap to preview"}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h1 className="font-display text-6xl leading-none md:text-7xl">{special.title}</h1>
              <Link
                to="/comedians/$slug"
                params={{ slug: artist.slug }}
                className="mt-3 inline-block font-display text-3xl text-primary hover:text-secondary"
              >
                {artist.name}
              </Link>
              <div className="mt-5 flex flex-wrap gap-2">
                {[special.language, special.genre, `${special.year}`, special.runtime].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {special.synopsis}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setPlaying(true)}
                  className="rounded-xl bg-foreground px-8 py-4 font-bold text-background transition-transform hover:scale-105"
                >
                  Watch Full Special
                </button>
                <button
                  onClick={() => toggleWatchlist(special.id)}
                  className={`rounded-xl border px-8 py-4 font-bold transition-all ${
                    saved
                      ? "border-accent/50 bg-accent/15 text-accent"
                      : "glass-panel hover:bg-foreground/5"
                  }`}
                >
                  {saved ? "In your watchlist ✓" : "+ Add to Watchlist"}
                </button>
              </div>
            </div>

            <aside className="glass-panel h-fit rounded-3xl p-6">
              <h3 className="mb-4 font-display text-2xl">At a glance</h3>
              <dl className="space-y-4 text-sm">
                <Row label="Laugh Score" value={`${special.score}%`} accent />
                <Row label="Views" value={special.views} />
                <Row label="Runtime" value={special.runtime} />
                <Row label="Language" value={special.language} />
                <Row label="Sub-genre" value={special.genre} />
                <Row label="Released" value={`${special.year}`} />
              </dl>
              <Link
                to="/tours"
                className="mt-6 block rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground shadow-[var(--shadow-neon)]"
              >
                See {artist.name} live
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {clipsBy(artist.slug).length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h3 className="mb-8 font-display text-4xl">Clips from this set</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {clipsBy(artist.slug).map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <ClipCard clip={c} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h3 className="mb-8 font-display text-4xl">
          More {special.genre} {specialsBy(artist.slug).length > 1 ? "" : ""}
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <SpecialCard special={s} />
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-bold ${accent ? "text-accent" : ""}`}>{value}</dd>
    </div>
  );
}
