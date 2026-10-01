import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loader2, LogOut, ShieldAlert } from "lucide-react";
import { ApiError } from "@/services/enquiries";
import { checkSession, login, logout } from "@/services/admin";
import { useSEO } from "@/hooks/useSEO";

/**
 * Auth gate for every /admin route.
 *
 * The session lives in an httpOnly cookie set by the server, so this component
 * cannot grant access on its own — it only asks the server who is logged in.
 * Unauthorised children are never rendered.
 */
export function AdminLayout() {
  const [state, setState] = useState<"checking" | "anon" | "authed" | "unconfigured">("checking");
  const [email, setEmail] = useState("");

  useSEO({
    title: "Admin",
    description: "Internal administration area.",
    noindex: true,
  });

  const verify = useCallback(async () => {
    try {
      await checkSession();
      setState("authed");
    } catch (err) {
      if (err instanceof ApiError && err.status === 503) {
        setState("unconfigured");
      } else {
        setState("anon");
      }
    }
  }, []);

  useEffect(() => {
    void verify();
  }, [verify]);

  if (state === "checking") {
    return (
      <Centered>
        <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
        <p className="mt-3 text-sm text-muted-foreground">Checking your session…</p>
      </Centered>
    );
  }

  if (state === "unconfigured") {
    return (
      <Centered>
        <ShieldAlert className="h-6 w-6 text-amber-600" aria-hidden="true" />
        <h1 className="mt-3 text-lg font-semibold text-foreground">Admin access is not configured</h1>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          Set <code className="rounded bg-muted px-1">MONGODB_URI</code>,{" "}
          <code className="rounded bg-muted px-1">ADMIN_EMAIL</code>,{" "}
          <code className="rounded bg-muted px-1">ADMIN_PASSWORD_HASH</code> and{" "}
          <code className="rounded bg-muted px-1">SESSION_SECRET</code> in the environment, then redeploy.
        </p>
      </Centered>
    );
  }

  if (state === "anon") {
    return <LoginForm onSuccess={() => setState("authed")} email={email} setEmail={setEmail} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-primary px-2 py-1 text-xs font-bold text-white">ADMIN</span>
            <span className="text-sm font-semibold text-foreground">{email || "Signed in"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Enquiries
            </Link>
            <button
              type="button"
              onClick={async () => {
                await logout().catch(() => undefined);
                setState("anon");
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

function LoginForm({
  onSuccess,
  email,
  setEmail,
}: {
  onSuccess: () => void;
  email: string;
  setEmail: (value: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const result = await login(email.trim(), password);
      setEmail(result.email);
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to sign in.");
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h1 className="text-lg font-bold text-foreground">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Access is restricted to the site owner.
        </p>

        <label htmlFor="admin-email" className="mt-5 block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />

        <label htmlFor="admin-password" className="mt-4 block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />

        {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Sign in
        </button>
      </form>
    </div>
  );
}