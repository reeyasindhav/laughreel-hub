import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell, Field } from "@/components/auth-shell";
import { useAuth } from "@/lib/auth";

const TITLE = "Create Your Laughreel Account";
const DESC =
  "Join Laughreel to stream Indian stand-up specials ad-free, build a watchlist and get early access to live tour tickets.";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Tell us what to call you.");
    if (!email.includes("@")) return setError("That email doesn't look right.");
    if (password.length < 6) return setError("Password needs at least 6 characters.");
    setBusy(true);
    await signup(name.trim(), email, password);
    setBusy(false);
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell
      title={
        <>
          GET <span className="text-secondary">ACCESS</span>
        </>
      }
      subtitle="Front Row membership. Every special, every clip, first crack at every ticket."
      footer={
        <>
          Already a member?{" "}
          <Link to="/login" className="font-bold text-accent hover:text-secondary">
            Log in instead
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5" aria-invalid={!!error}>
        <Field
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Kripalsinh"
          aria-invalid={!!error}
          aria-describedby={error ? "signup-error" : undefined}
        />
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={!!error}
          aria-describedby={error ? "signup-error" : undefined}
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          aria-invalid={!!error}
          aria-describedby={error ? "signup-error" : undefined}
        />
        <p id="signup-error" role="alert" aria-live="polite" className="text-sm text-destructive">
          {error}
        </p>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-secondary py-4 font-bold text-secondary-foreground shadow-[var(--shadow-neon-pink)] transition-all hover:brightness-110 disabled:opacity-60"
        >
          {busy ? "Reserving your seat…" : "Create account"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Demo build — no payment, no email verification.
        </p>
      </form>
    </AuthShell>
  );
}
