import { Link } from "@tanstack/react-router";
import type { Clip, Special, TourDate } from "@/lib/data";
import { comedianName } from "@/lib/data";

export function SpecialCard({ special }: { special: Special }) {
  return (
    <Link
      to="/specials/$id"
      params={{ id: special.id }}
      className="group block overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[var(--shadow-neon)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
        <img
          src={special.poster}
          alt={`${special.title} by ${comedianName(special.comedian)}`}
          loading="lazy"
          className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent backdrop-blur">
          {special.score}% Laugh Score
        </span>
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
            ▶ Preview clip
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl tracking-wide">{special.title}</h3>
        <p className="text-sm text-muted-foreground">{comedianName(special.comedian)}</p>
        <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground/70">
          {special.language} • {special.genre} • {special.runtime}
        </p>
      </div>
    </Link>
  );
}

export function ClipCard({ clip }: { clip: Clip }) {
  return (
    <Link
      to="/comedians/$slug"
      params={{ slug: clip.comedian }}
      className="group relative block aspect-[9/16] overflow-hidden rounded-2xl bg-surface"
    >
      <img
        src={clip.thumb}
        alt={`${clip.title} — ${comedianName(clip.comedian)}`}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
      <span className="absolute right-3 top-3 rounded-md bg-background/70 px-2 py-1 text-[10px] font-semibold backdrop-blur">
        {clip.duration}
      </span>
      <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="grid size-14 place-items-center rounded-full bg-primary/90 text-lg text-primary-foreground shadow-[var(--shadow-neon)]">
          ▶
        </span>
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-xs font-bold leading-tight">{clip.title}</p>
        <p className="text-[10px] text-muted-foreground">
          {comedianName(clip.comedian)} • {clip.views} views
        </p>
      </div>
    </Link>
  );
}

export function TourCard({
  tour,
  onBook,
  booked,
}: {
  tour: TourDate;
  onBook?: () => void;
  booked?: boolean;
}) {
  return (
    <div className="glass-panel group cursor-pointer rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40">
      <div className="mb-6 aspect-video overflow-hidden rounded-2xl bg-surface opacity-85 transition-opacity group-hover:opacity-100">
        <img
          src={tour.poster}
          alt={`${tour.show} — ${comedianName(tour.comedian)}`}
          loading="lazy"
          className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="mb-1 text-xl font-bold leading-tight">
            {comedianName(tour.comedian)}: {tour.show}
          </h4>
          <p className="text-sm text-muted-foreground">
            {tour.city} • {tour.venue}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">{tour.date}</p>
          <p className="text-xs text-muted-foreground">{tour.time}</p>
        </div>
      </div>
      <button
        disabled={tour.soldOut || booked}
        onClick={onBook}
        className={`mt-6 w-full rounded-xl border py-3 font-bold transition-all ${
          tour.soldOut
            ? "cursor-not-allowed border-border bg-surface text-muted-foreground"
            : booked
              ? "border-accent/40 bg-accent/15 text-accent"
              : "border-border bg-foreground/5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
        }`}
      >
        {tour.soldOut ? "Sold Out" : booked ? "Ticket booked ✓" : `Book Tickets — ${tour.price}`}
      </button>
    </div>
  );
}
