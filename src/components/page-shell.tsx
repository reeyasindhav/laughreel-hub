import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-10">
      <div className="stage-glow pointer-events-none absolute inset-x-0 top-0 h-72" />
      <div className="relative mx-auto max-w-7xl">
        <span className="mb-5 inline-block rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary">
          {eyebrow}
        </span>
        <h1 className="font-display text-6xl leading-[0.95] md:text-8xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      </div>
    </section>
  );
}
