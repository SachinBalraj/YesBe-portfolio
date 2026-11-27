import { useCallback, useEffect, useState } from "react";
import { AlertCircle, Download, Loader2, MailX, Search, Trash2 } from "lucide-react";
import { deleteSubscriber, exportSubscribers, formatDateIst, listSubscribers, unsubscribeSubscriber, type SubscriberRecord } from "@/services/admin";
import { ApiError } from "@/services/enquiries";

type StatusFilter = "active" | "unsubscribed" | "all";

export function AdminNewsletterPage() {
  const [items, setItems] = useState<SubscriberRecord[]>([]);
  const [counts, setCounts] = useState({ active: 0, unsubscribed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [confirm, setConfirm] = useState<{ type: "unsubscribe" | "delete"; item: SubscriberRecord } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listSubscribers(q, status, 1, 100);
      setItems(res.items || []);
      if (res.counts) setCounts(res.counts);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load subscribers.");
    } finally {
      setLoading(false);
    }
  }, [q, status]);

  useEffect(() => { void load(); }, [load]);

  const runConfirm = async () => {
    if (!confirm) return;
    setBusy(true); setError("");
    try {
      if (confirm.type === "unsubscribe") await unsubscribeSubscriber(confirm.item._id);
      else await deleteSubscriber(confirm.item._id);
      setConfirm(null);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  };

  const onExport = async () => {
    setError("");
    try {
      await exportSubscribers(q, status);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to export subscribers.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Newsletter</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
          <p className="mt-1 text-sm text-slate-600">Manage subscriber status and exports.</p>
        </div>
        <button type="button" onClick={() => void onExport()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Active subscribers</p><p className="mt-2 text-3xl font-bold text-slate-900">{counts.active}</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Unsubscribed</p><p className="mt-2 text-3xl font-bold text-slate-900">{counts.unsubscribed}</p></div>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Search</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Email or source" className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 outline-none focus:border-primary" />
          </div>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </label>
      </div>

      {error && <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4" />{error}</div>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="flex items-center gap-2 px-4 py-8 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading subscribers…</p>
        ) : items.length === 0 ? (
          <p className="px-4 py-8 text-sm text-slate-500">No subscribers found.</p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item) => {
                const itemStatus = item.status === "unsubscribed" ? "unsubscribed" : "active";
                return (
                  <tr key={item._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.email}</td>
                    <td className="px-4 py-3 text-slate-600">{item.source || "—"}</td>
                    <td className="px-4 py-3"><span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${itemStatus === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}`}>{itemStatus}</span></td>
                    <td className="px-4 py-3 text-slate-600">{formatDateIst(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {itemStatus === "active" && <button type="button" onClick={() => setConfirm({ type: "unsubscribe", item })} className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"><MailX className="h-3.5 w-3.5" /> Unsubscribe</button>}
                        <button type="button" onClick={() => setConfirm({ type: "delete", item })} className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4" role="dialog" aria-modal="true" aria-labelledby="newsletter-confirm-title">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <h2 id="newsletter-confirm-title" className="text-lg font-semibold text-slate-900">{confirm.type === "delete" ? "Delete subscriber?" : "Unsubscribe subscriber?"}</h2>
            <p className="mt-2 text-sm text-slate-600">{confirm.type === "delete" ? `This will permanently delete ${confirm.item.email}.` : `This will unsubscribe ${confirm.item.email}.`}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setConfirm(null)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Cancel</button>
              <button type="button" disabled={busy} onClick={() => void runConfirm()} className={`rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-50 ${confirm.type === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-slate-900 hover:bg-slate-800"}`}>{busy ? "Working…" : "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
