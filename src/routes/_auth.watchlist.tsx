import { createFileRoute, Link } from "@tanstack/react-router";
import { SpecialCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { specials } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const TITLE = "Your Watchlist — Laughreel";
const DESC = "Specials you've saved for later, ready to stream whenever you are.";

export const Route = createFileRoute("/_auth/watchlist")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WatchlistPage,
});

function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useAuth();
  const saved = specials.filter((s) => watchlist.includes(s.id));

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 pb-24">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-4xl">Saved for later</h2>
        <p className="text-sm text-muted-foreground">{saved.length} titles</p>
      </div>

      {saved.length === 0 ? (
        <div className="glass-panel rounded-3xl p-16 text-center">
          <p className="font-display text-4xl">Nothing saved yet.</p>
          <p className="mt-2 text-muted-foreground">
            Hit “Add to Watchlist” on any special and it lands here.
          </p>
          <Link
            to="/specials"
            className="mt-6 inline-block rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-neon)]"
          >
            Browse specials
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <div>
                <SpecialCard special={s} />
                <button
                  onClick={() => toggleWatchlist(s.id)}
                  className="mt-3 w-full rounded-xl border border-border py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                >
                  Remove
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
