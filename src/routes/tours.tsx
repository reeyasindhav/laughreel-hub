import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { TourCard } from "@/components/cards";
import { ConfirmBookingDialog } from "@/components/confirm-booking-dialog";
import { tourDates } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const TITLE = "Live Stand-Up Tour Dates & Tickets — Laughreel";
const DESC =
  "Every upcoming Indian stand-up show in one calendar. Filter by city, see venues and showtimes, and book tickets without leaving Laughreel.";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ToursPage,
});

function ToursPage() {
  const { tickets, bookTicket } = useAuth();
  const [city, setCity] = useState("All cities");
  const [confirmTour, setConfirmTour] = useState<(typeof tourDates)[number] | null>(null);
  const cities = useMemo(() => ["All cities", ...new Set(tourDates.map((t) => t.city))], []);
  const list = tourDates.filter((t) => (city === "All cities" ? true : t.city === city));

  return (
    <PageShell>
      <PageHeader
        eyebrow="On tour"
        title={
          <>
            LIVE ON <span className="text-accent">STAGE</span>
          </>
        }
        subtitle="Ticketing built into the same place you discover the comic. No third tab, no scalper roulette."
      />

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`flex-shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                city === c
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <TourCard tour={t} booked={tickets.includes(t.id)} onBook={() => setConfirmTour(t)} />
            </Reveal>
          ))}
        </div>
      </section>
      <ConfirmBookingDialog
        tour={confirmTour}
        open={!!confirmTour}
        onOpenChange={(open) => setConfirmTour(open ? confirmTour : null)}
        onConfirm={(tour) => bookTicket(tour.id)}
      />
    </PageShell>
  );
}
