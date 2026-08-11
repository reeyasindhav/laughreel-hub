import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { photos } from "@/lib/data";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={photos.bassiWide}
          alt="Anubhav Singh Bassi performing live on stage"
          className="size-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="font-display text-6xl leading-none text-gradient">LAUGHREEL</p>
          <p className="mt-4 max-w-md text-muted-foreground">
            Every Indian special, every viral cut, every tour date — behind one login.
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 py-16">
        <div className="stage-glow pointer-events-none absolute inset-x-0 top-0 h-72" />
        <div className="relative w-full max-w-md animate-[rise_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Link to="/" className="font-display text-4xl tracking-wider text-gradient lg:hidden">
            LAUGHREEL
          </Link>
          <h1 className="mt-6 font-display text-6xl leading-none lg:mt-0">{title}</h1>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-input bg-surface/60 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
