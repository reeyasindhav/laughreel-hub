import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/page-shell";
import { useState, type FormEvent } from "react";

const TITLE = "Contact Laughreel";
const DESC = "Have a question, suggestion, or partnership idea? Reach out to the Laughreel team.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: { name?: string; email?: string; message?: string } = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!email.includes("@")) next.email = "Please enter a valid email.";
    if (message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800));
    setBusy(false);
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            CONTACT <span className="text-primary">US</span>
          </>
        }
        subtitle="We read every message. For artist submissions, use the For Artists page instead."
      />
      <section className="mx-auto max-w-2xl px-6 pb-24">
        <div className="rounded-3xl border border-border bg-surface p-8">
          {sent ? (
            <div className="py-16 text-center">
              <p className="font-display text-5xl text-accent">Message sent!</p>
              <p className="mt-4 text-muted-foreground">
                We'll get back to you within 2 business days. In the meantime, why not browse some
                specials?
              </p>
              <Link
                to="/specials"
                className="mt-8 inline-block rounded-xl bg-primary px-8 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-neon)]"
              >
                Browse specials
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6" noValidate>
              <div>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="w-full rounded-xl border border-input bg-surface/60 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                </label>
                {errors.name && (
                  <p id="contact-name-error" className="mt-2 text-sm text-destructive" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="w-full rounded-xl border border-input bg-surface/60 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                </label>
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-2 text-sm text-destructive"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className="w-full rounded-xl border border-input bg-surface/60 px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                </label>
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-2 text-sm text-destructive"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-[var(--shadow-neon)] transition-all hover:brightness-110 disabled:opacity-60"
              >
                {busy ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
