import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { clips, comedianName, getSpecial, specials, tourDates } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const TITLE = "Your Dashboard — Laughreel";
const DESC =
  "Continue watching, your saved specials, upcoming tickets and recommendations tuned to your comedy taste.";

export const Route = createFileRoute("/_auth/dashboard")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

const continueWatching = [
  { id: "biswa-mast-aadmi", progress: 62 },
  { id: "landing", progress: 28 },
  { id: "yours-sincerely", progress: 81 },
];

function Dashboard() {
  const { watchlist, tickets } = useAuth();
  const nextTicket = tourDates.find((t) => tickets.includes(t.id));

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Specials watched", value: "27" },
            { label: "Hours laughed", value: "41.5" },
            { label: "On watchlist", value: `${watchlist.length}` },
            { label: "Tickets held", value: `${tickets.length}` },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="glass-panel rounded-3xl p-6">
                <p className="font-display text-5xl text-accent">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-display text-4xl">Continue watching</h2>
            <div className="space-y-4">
              {continueWatching.map((cw, i) => {
                const s = getSpecial(cw.id);
                if (!s) return null;
                return (
                  <Reveal key={cw.id} delay={i * 80}>
                    <Link
                      to="/specials/$id"
                      params={{ id: s.id }}
                      className="glass-panel group flex gap-5 rounded-2xl p-4 transition-all hover:border-primary/40"
                    >
                      <div className="h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                        <img
                          src={s.poster}
                          alt={s.title}
                          loading="lazy"
                          className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{s.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {comedianName(s.comedian)} • {s.runtime}
                        </p>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${cw.progress}%` }}
                          />
                        </div>
                        <p className="mt-1.5 text-[11px] text-muted-foreground">
                          {cw.progress}% complete
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <h2 className="font-display text-4xl">Next up live</h2>
            {nextTicket ? (
              <div className="overflow-hidden rounded-3xl border border-primary/40 bg-surface shadow-[var(--shadow-neon)]">
                <img
                  src={nextTicket.poster}
                  alt={nextTicket.show}
                  loading="lazy"
                  className="aspect-video w-full object-cover object-top"
                />
                <div className="p-6">
                  <p className="font-display text-3xl">{nextTicket.show}</p>
                  <p className="text-sm text-muted-foreground">
                    {comedianName(nextTicket.comedian)}
                  </p>
                  <div className="mt-4 border-t border-dashed border-border pt-4 text-sm">
                    <p className="font-bold text-accent">
                      {nextTicket.date} • {nextTicket.time}
                    </p>
                    <p className="text-muted-foreground">
                      {nextTicket.venue}, {nextTicket.city}
                    </p>
                  </div>
                  <Link
                    to="/tickets"
                    className="mt-5 block rounded-xl bg-primary py-3 text-center text-sm font-bold text-primary-foreground"
                  >
                    View ticket stub
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-3xl p-8 text-center">
                <p className="font-display text-2xl">No tickets yet.</p>
                <Link to="/tours" className="mt-3 inline-block text-sm font-bold text-accent">
                  Browse live shows
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-6 font-display text-4xl">Because you like observational sets</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {clips.slice(3, 8).map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <Link
                to="/comedians/$slug"
                params={{ slug: c.comedian }}
                className="group block overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={c.thumb}
                    alt={c.title}
                    loading="lazy"
                    className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <p className="truncate text-xs font-bold">{c.title}</p>
                  <p className="text-[10px] text-muted-foreground">{comedianName(c.comedian)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          {specials.length} specials in the catalogue and counting.
        </p>
      </section>
    </>
  );
}
