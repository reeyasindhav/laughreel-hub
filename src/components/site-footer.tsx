import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="mb-6 font-display text-5xl text-gradient">LAUGHREEL</h2>
            <p className="max-w-sm text-muted-foreground">
              The ultimate hub for Indian comedy. Specials, tours, sketches, and your favourite
              comedians all in one place.
            </p>
          </div>
          <div>
            <h5 className="mb-6 font-bold">Discover</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link to="/specials" className="hover:text-primary">
                  Latest Specials
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-primary">
                  Tour Map
                </Link>
              </li>
              <li>
                <Link to="/comedians" className="hover:text-primary">
                  Comedian Directory
                </Link>
              </li>
              <li>
                <Link to="/clips" className="hover:text-primary">
                  Laughter Shots
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 font-bold">Community</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link to="/pricing" className="hover:text-primary">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Laughreel
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary">
                  Your Dashboard
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-primary">
                  For Artists
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 text-xs uppercase tracking-widest text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Laughreel Platforms Pvt Ltd. Artist photos via Wikimedia Commons.</p>
          <div className="flex gap-6">
            <span>Instagram</span>
            <span>Twitter</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
