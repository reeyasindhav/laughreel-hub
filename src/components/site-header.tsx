import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SearchCommand } from "@/components/search-command";
import { useAuth } from "@/lib/auth";

const nav = [
  { to: "/specials", label: "Specials" },
  { to: "/tours", label: "Tours" },
  { to: "/comedians", label: "Comedians" },
  { to: "/clips", label: "Clips" },
] as const;

const footerLinks = [
  { to: "/pricing", label: "Membership" },
  { to: "/about", label: "About Laughreel" },
  { to: "/artists", label: "For Artists" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
] as const;

export function SiteHeader() {
  const { user, logout, ready } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled ? "glass-panel border-border" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-4xl tracking-wider text-gradient">
            LAUGHREEL
          </Link>
          <div className="hidden gap-6 text-sm font-medium text-foreground/70 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {ready && user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-secondary sm:block"
              >
                Dashboard
              </Link>
              <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogTrigger asChild>
                  <button className="rounded-full border border-border px-5 py-2.5 text-sm font-bold transition-colors hover:bg-surface">
                    Sign out
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign out of Laughreel?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You'll need to log in again to access your watchlist, tickets, and specials.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>Yes, sign out</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <span className="grid size-10 place-items-center rounded-full bg-primary/20 font-display text-lg text-primary ring-1 ring-primary/40">
                {user.name.slice(0, 2).toUpperCase()}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-secondary"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-neon)] transition-all hover:brightness-110"
              >
                Get Access
              </Link>
            </>
          )}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 rounded-lg border border-border p-2 md:hidden"
          >
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="mt-1 block h-0.5 w-5 bg-foreground" />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="glass-panel border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="py-1">
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              More
            </p>
            {footerLinks.map((item) => (
              <Link key={item.to} to={item.to} className="py-1 text-muted-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <SearchCommand />
    </nav>
  );
}
