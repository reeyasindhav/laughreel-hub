import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { comedianName, tourDates } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const TITLE = "My Tickets — Laughreel";
const DESC = "Your booked live comedy shows, with venue, seat and showtime details in one place.";

export const Route = createFileRoute("/_auth/tickets")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TicketsPage,
});

const seats = ["Sec A • Row 4 • Seat 12", "Balcony • Row B • Seat 7", "Sec C • Row 9 • Seat 3"];

function TicketsPage() {
  const { tickets } = useAuth();
  const booked = tourDates.filter((t) => tickets.includes(t.id));

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 pb-24">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-4xl">Ticket stubs</h2>
        <p className="text-sm text-muted-foreground">{booked.length} upcoming</p>
      </div>

      {booked.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center">
          <p className="font-display text-4xl">No shows booked.</p>
          <Link
            to="/tours"
            className="mt-6 inline-block rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-neon)]"
          >
            Find a live show
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {booked.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <div className="group flex overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[var(--shadow-neon)]">
                <div className="w-36 shrink-0 overflow-hidden">
                  <img
                    src={t.poster}
                    alt={t.show}
                    loading="lazy"
                    className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 border-l border-dashed border-border p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary">
                    {t.weekday} • {t.date} • {t.time}
                  </p>
                  <p className="mt-2 font-display text-3xl leading-none">{t.show}</p>
                  <p className="text-sm text-muted-foreground">{comedianName(t.comedian)}</p>
                  <p className="mt-4 text-sm">
                    {t.venue}, {t.city}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-accent">
                    {seats[i % seats.length]}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      LR-{t.id.toUpperCase()}-{2026 + i}
                    </span>
                    <span className="rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
