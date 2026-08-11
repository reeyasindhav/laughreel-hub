import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthShell, Field } from "@/components/auth-shell";
import { useAuth } from "@/lib/auth";

const TITLE = "Log In — Laughreel";
const DESC = "Sign in to your Laughreel account to resume specials, manage your watchlist and view your live show tickets.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("fan@laughreel.in");
  const [password, setPassword] = useState("frontrow");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and a password of at least 4 characters.");
      return;
    }
    setBusy(true);
    await login(email, password);
    setBusy(false);
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell
      title={
        <>
          WELCOME <span className="text-primary">BACK</span>
        </>
      }
      subtitle="Your watchlist, half-finished specials and ticket stubs are waiting."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="font-bold text-accent hover:text-secondary">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-[var(--shadow-neon)] transition-all hover:brightness-110 disabled:opacity-60"
        >
          {busy ? "Dimming the lights…" : "Log In"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Demo build — any email and password of 4+ characters works.
        </p>
      </form>
    </AuthShell>
  );
}
