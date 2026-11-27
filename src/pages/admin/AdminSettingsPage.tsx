import { useEffect, useState } from "react";
import { AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { getAdminSettings } from "@/services/admin";
import { ApiError } from "@/services/enquiries";

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getAdminSettings();
        if (!active) return;
        setSettings((res.settings as Record<string, unknown>) ?? res);
      } catch (err) {
        if (!active) return;
        setError(err instanceof ApiError ? err.message : "Unable to load settings.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const entries = Object.entries(settings ?? {}).filter(([k]) => k !== "ok");

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Configuration</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-600">Non-sensitive admin and system settings.</p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Admin password setup</p>
            <p className="mt-1">Do not enter secrets in this UI. Configure admin credentials through environment variables in <code className="rounded bg-amber-100 px-1">.env</code> and run <code className="rounded bg-amber-100 px-1">npm run admin:password</code> to generate/update the password hash as required by your deployment workflow.</p>
          </div>
        </div>
      </div>

      {error && <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4" />{error}</div>}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-4">
          <h2 className="text-base font-semibold text-slate-900">Current settings</h2>
          <p className="text-sm text-slate-500">Values returned by the admin settings API.</p>
        </div>
        {loading ? (
          <p className="flex items-center gap-2 px-4 py-8 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading settings…</p>
        ) : entries.length === 0 ? (
          <p className="px-4 py-8 text-sm text-slate-500">No settings available.</p>
        ) : (
          <dl className="divide-y divide-slate-200">
            {entries.map(([key, value]) => (
              <div key={key} className="grid gap-2 px-4 py-4 sm:grid-cols-3">
                <dt className="text-sm font-medium text-slate-700">{key}</dt>
                <dd className="text-sm text-slate-600 sm:col-span-2">
                  <pre className="whitespace-pre-wrap break-words font-sans">{typeof value === "string" ? value : JSON.stringify(value, null, 2)}</pre>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
