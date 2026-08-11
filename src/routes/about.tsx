import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { photos } from "@/lib/data";

const TITLE = "About Laughreel — India's Comedy-First Streaming Hub";
const DESC =
  "Indian stand-up is scattered across general video platforms and social feeds. Laughreel puts specials, clips, comedian profiles and live tour ticketing in one place.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    title: "Instant clip previews",
    body: "Hover any poster and the punchline plays. You decide in six seconds, not six minutes.",
  },
  {
    title: "Ticketing, built in",
    body: "The comic's tour calendar sits on the same page as their catalogue. One tap to a seat.",
  },
  {
    title: "Sub-genre & language filters",
    body: "Hindi crowd-work, Tamil sketch, English political satire — categorisation comedy fans actually use.",
  },
  {
    title: "Artist-first profiles",
    body: "Curated bios, full discographies of specials, viral cuts and dates. Not an algorithmic feed.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Why we exist"
        title={
          <>
            COMEDY, <span className="text-primary">UNSCATTERED</span>
          </>
        }
        subtitle="Indian stand-up exploded. The places to watch it didn't keep up."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-2">
        <Reveal>
          <div className="glass-panel rounded-3xl p-8">
            <h2 className="mb-4 font-display text-3xl">The problem</h2>
            <p className="leading-relaxed text-muted-foreground">
              Full-length specials live on one platform, viral cuts on three social feeds, tour
              dates on a ticketing site nobody bookmarks. Fans lose the thread between a clip they
              loved and the hour it came from — and comics lose the audience somewhere in between.
            </p>
            <h2 className="mb-4 mt-8 font-display text-3xl">Our answer</h2>
            <p className="leading-relaxed text-muted-foreground">
              Laughreel is comedy-first by construction. Every clip links to its special. Every
              special links to the artist. Every artist links to their next stage. One high-energy
              interface, built for the obsessed comedy fan.
            </p>
            <Link
              to="/specials"
              className="mt-8 inline-block rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-neon)]"
            >
              Start exploring
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={photos.zakir}
              alt="Zakir Khan performing"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-3xl border border-border object-cover object-top"
            />
            <img
              src={photos.virdas2}
              alt="Vir Das on stage"
              loading="lazy"
              className="mt-8 aspect-[3/4] w-full rounded-3xl border border-border object-cover object-top"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50">
                <p className="font-display text-6xl text-primary/30">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
