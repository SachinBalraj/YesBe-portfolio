import { useCallback, useEffect, useState, type FormEvent } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Building2,
  ClipboardList,
  Factory,
  FolderKanban,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  MessageSquareText,
  Settings,
  ShieldAlert,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { ApiError } from "@/services/enquiries";
import { ADMIN_UNAUTHORIZED_EVENT, checkSession, login, logout } from "@/services/admin";
import { useSEO } from "@/hooks/useSEO";
import { cn } from "@/utils/cn";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/enquiries", label: "All Enquiries", icon: ClipboardList },
  { to: "/admin/consultations", label: "Consultation Requests", icon: MessageSquareText },
  { to: "/admin/service-enquiries", label: "Service Enquiries", icon: Wrench },
  { to: "/admin/industry-enquiries", label: "Industry Enquiries", icon: Factory },
  { to: "/admin/project-enquiries", label: "Project Enquiries", icon: FolderKanban },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/newsletter", label: "Newsletter Subscribers", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminLayout() {
  const [state, setState] = useState<"checking" | "anon" | "authed" | "unconfigured">("checking");
  const [adminId, setAdminId] = useState("yesbe.tech@gmail.com");
  const [notice, setNotice] = useState("");
  const [signOutError, setSignOutError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useSEO({
    title: "Admin",
    description: "Internal administration area.",
    noindex: true,
  });

  const verify = useCallback(async () => {
    try {
      const session = await checkSession();
      setAdminId(session.username || "yesbe.tech@gmail.com");
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

  useEffect(() => {
    const revalidate = () => {
      if (state === "authed") void verify();
    };
    window.addEventListener("focus", revalidate);
    document.addEventListener("visibilitychange", revalidate);
    return () => {
      window.removeEventListener("focus", revalidate);
      document.removeEventListener("visibilitychange", revalidate);
    };
  }, [state, verify]);

  useEffect(() => {
    const onUnauthorized = () => {
      setNotice("Your session expired. Please sign in again.");
      setState("anon");
    };
    window.addEventListener(ADMIN_UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(ADMIN_UNAUTHORIZED_EVENT, onUnauthorized);
  }, []);

  if (state === "checking") {
    return (
      <Centered>
        <Loader2 className="h-6 w-6 animate-spin text-white" aria-hidden="true" />
        <p className="mt-3 text-sm text-slate-300">Checking your session…</p>
      </Centered>
    );
  }

  if (state === "unconfigured") {
    return (
      <Centered>
        <ShieldAlert className="h-6 w-6 text-amber-400" aria-hidden="true" />
        <h1 className="mt-3 text-lg font-semibold text-white">Admin access is not configured</h1>
        <p className="mt-2 max-w-md text-center text-sm text-slate-300">
          Set <code className="rounded bg-slate-800 px-1">MONGODB_URI</code>,{" "}
          <code className="rounded bg-slate-800 px-1">ADMIN_EMAIL</code>,{" "}
          <code className="rounded bg-slate-800 px-1">ADMIN_PASSWORD_HASH</code> and{" "}
          <code className="rounded bg-slate-800 px-1">SESSION_SECRET</code> in the environment, then redeploy.
        </p>
      </Centered>
    );
  }

  if (state === "anon") {
    return (
      <LoginForm
        notice={notice}
        onSuccess={(username) => {
          setAdminId(username || "yesbe.tech@gmail.com");
          setNotice("");
          setState("authed");
        }}
        adminId={adminId}
        setAdminId={setAdminId}
      />
    );
  }

  const handleLogout = async () => {
    setSignOutError("");
    setNotice("");
    try {
      await logout();
      setState("anon");
      setMobileOpen(false);
    } catch {
      setSignOutError("Could not sign out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <button
        type="button"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open admin navigation"
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
        Menu
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-950 text-slate-100 shadow-xl transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Admin navigation"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-white">YESBE Admin</p>
                <p className="text-xs text-slate-400">Management Console</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-label="Close admin navigation"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={"end" in item ? item.end : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
                        )
                      }
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-slate-800 px-4 py-4">
            <p className="truncate px-2 text-xs text-slate-400">{adminId || "Signed in"}</p>
            {signOutError && <p className="mt-2 px-2 text-xs text-red-300">{signOutError}</p>}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 lg:pl-0">
        <main className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

function LoginForm({
  notice,
  onSuccess,
  adminId,
  setAdminId,
}: {
  notice: string;
  onSuccess: (username: string) => void;
  adminId: string;
  setAdminId: (value: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const result = await login(adminId.trim(), password);
      onSuccess(result.username);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to sign in.");
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <h1 className="text-lg font-bold text-white">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-400">Access is restricted to the site owner.</p>
        {notice && (
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            {notice}
          </p>
        )}
        <label htmlFor="admin-id" className="mt-5 block text-sm font-medium text-slate-200">Admin ID</label>
        <input
          id="admin-id"
          type="text"
          required
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          placeholder="yesbe.tech@gmail.com"
          className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <label htmlFor="admin-password" className="mt-4 block text-sm font-medium text-slate-200">Password</label>
        <input
          id="admin-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {error && <p className="mt-3 text-sm font-medium text-red-300">{error}</p>}
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
