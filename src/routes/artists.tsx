import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";

const TITLE = "For Artists — Laughreel";
const DESC =
  "Join Laughreel as a comedian. Get a curated profile, full special hosting, tour ticketing, and access to India's comedy-first audience.";

export const Route = createFileRoute("/artists")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ArtistsPage,
});

const benefits = [
  {
    title: "Curated artist profiles",
    body: "Bios, photos, sub-genre tags, and language filters — so fans find you, not just a clip algorithm.",
  },
  {
    title: "Host your specials",
    body: "Upload full-length sets and control how they're presented. Every special links back to your page.",
  },
  {
    title: "Tour ticketing, built in",
    body: "Your tour calendar lives on the same page as your catalogue. Fans book tickets without leaving Laughreel.",
  },
  {
    title: "Audience insights",
    body: "See which cities, languages, and sub-genres drive the most engagement — without handing over your fan data.",
  },
  {
    title: "Revenue share",
    body: "Keep the majority of ticket and streaming revenue. Transparent payouts, no hidden platform cuts.",
  },
  {
    title: "Creator support",
    body: "Dedicated support for uploads, ticket setup, and profile edits. We handle the tech; you handle the stage.",
  },
];

function ArtistsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Built for the stage"
        title={
          <>
            FOR <span className="text-primary">ARTISTS</span>
          </>
        }
        subtitle="Laughreel gives comedians control over their catalogue, their audience, and their ticket sales."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50">
                <p className="font-display text-6xl text-primary/30">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-border bg-surface p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl">Ready to join?</h2>
            <p className="mt-4 text-muted-foreground">
              Create an artist account and our team will review your profile within 48 hours. No
              upfront fees, no exclusivity lock-in.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-block rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-neon)]"
            >
              Apply as an artist
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-accent hover:text-secondary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
