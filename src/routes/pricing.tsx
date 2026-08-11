import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";

const TITLE = "Laughreel Membership Plans & Pricing";
const DESC =
  "Pick a Laughreel plan: free clips, Front Row streaming with every special, or Backstage with priority tour ticket windows.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Balcony",
    price: "₹0",
    period: "forever",
    blurb: "Clips, profiles and the full tour calendar.",
    perks: ["All Laughter Shots clips", "Comedian profiles", "Tour calendar", "2 specials a month"],
    featured: false,
  },
  {
    name: "Front Row",
    price: "₹249",
    period: "per month",
    blurb: "Every full-length special, ad-free, in every language.",
    perks: [
      "Unlimited specials",
      "Ad-free 4K streaming",
      "Watchlist & continue watching",
      "Early clip drops",
    ],
    featured: true,
  },
  {
    name: "Backstage",
    price: "₹499",
    period: "per month",
    blurb: "For the fan who books the ticket the minute it drops.",
    perks: [
      "Everything in Front Row",
      "48-hour ticket pre-sale window",
      "₹200 monthly ticket credit",
      "Livestreamed work-in-progress sets",
    ],
    featured: false,
  },
];

function PricingPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Membership"
        title={
          <>
            PICK YOUR <span className="text-primary">SEAT</span>
          </>
        }
        subtitle="One subscription for streaming and ticketing. Cancel any time — we're comedians, not a telecom operator."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                  p.featured
                    ? "border-primary bg-surface shadow-[var(--shadow-neon)]"
                    : "glass-panel"
                }`}
              >
                {p.featured && (
                  <span className="mb-4 w-fit rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-4xl tracking-wide">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                <p className="mt-6 font-display text-6xl">
                  {p.price}
                  <span className="ml-2 font-body text-sm text-muted-foreground">{p.period}</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm text-muted-foreground">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <span className="text-accent">✦</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-8 rounded-xl py-3.5 text-center font-bold transition-all ${
                    p.featured
                      ? "bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-border hover:bg-foreground/5"
                  }`}
                >
                  Choose {p.name}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
