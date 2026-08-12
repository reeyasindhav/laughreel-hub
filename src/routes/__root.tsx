import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "../lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-8xl text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Here are some helpful links
          to get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-neon)] transition-all hover:brightness-110"
          >
            Go home
          </Link>
          <Link
            to="/specials"
            className="rounded-xl border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-surface"
          >
            Browse specials
          </Link>
          <Link
            to="/tours"
            className="rounded-xl border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-surface"
          >
            Tour dates
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-6xl text-primary">Oops!</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">This page didn't load</h2>
        <p className="mt-3 text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-neon)] transition-all hover:brightness-110"
          >
            Try again
          </button>
          <Link
            to="/"
            className="rounded-xl border border-border px-6 py-3 text-sm font-bold transition-colors hover:bg-surface"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Laughreel — Indian Stand-Up Comedy Streaming" },
      {
        name: "description",
        content:
          "Laughreel is India's comedy-first hub for full-length stand-up specials, viral clips, comedian profiles and live tour tickets.",
      },
      { name: "author", content: "Laughreel" },
      { property: "og:title", content: "Laughreel — Indian Stand-Up Comedy Streaming" },
      {
        property: "og:description",
        content:
          "Full-length specials, viral clips, comedian profiles and live tour ticketing in one high-energy platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Bebas+Neue&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground focus:shadow-[var(--shadow-neon)]"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <div id="main-content">
          <Outlet />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}
