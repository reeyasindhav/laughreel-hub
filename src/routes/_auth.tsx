import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell } from "@/components/page-shell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_auth")({
  component: AuthGate,
});

const tabs = [
  { to: "/dashboard", label: "Overview" },
  { to: "/watchlist", label: "Watchlist" },
  { to: "/tickets", label: "My Tickets" },
] as const;

function AuthGate() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <PageShell>
        <div className="grid min-h-[60vh] place-items-center px-6">
          <p className="animate-pulse font-display text-4xl text-muted-foreground">
            Checking your ticket…
          </p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="relative overflow-hidden px-6 pt-12">
        <div className="stage-glow pointer-events-none absolute inset-x-0 top-0 h-72" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-widest text-secondary">
            {user.plan} member since {user.joined}
          </p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-7xl">
            HELLO, <span className="text-primary uppercase">{user.name}</span>
          </h1>
          <nav className="mt-8 flex gap-2 border-b border-border">
            {tabs.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className={`rounded-t-xl px-5 py-3 text-sm font-bold transition-colors ${
                  pathname === t.to
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Outlet />
    </PageShell>
  );
}
