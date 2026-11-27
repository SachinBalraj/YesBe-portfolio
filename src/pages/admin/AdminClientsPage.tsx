import { useCallback, useEffect, useState } from "react";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { formatDateIst, listClients, type ClientRecord } from "@/services/admin";
import { ApiError } from "@/services/enquiries";
import { StatusBadge } from "./AdminDashboardPage";

export function AdminClientsPage() {
  const [items, setItems] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listClients({ q });
      setItems(res.items || []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load clients.");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => { void load(); }, [load]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Client Records</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Clients</h1>
        <p className="mt-1 text-sm text-slate-600">Grouped client records from enquiry data.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Search clients</span>
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, email, company" className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 outline-none focus:border-primary" />
          </div>
        </label>
      </div>

      {error && <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle className="h-4 w-4" />{error}</div>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="flex items-center gap-2 px-4 py-8 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading clients…</p>
        ) : items.length === 0 ? (
          <p className="px-4 py-8 text-sm text-slate-500">No clients found.</p>
        ) : (
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Client</th>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Enquiries</th>
                <th className="px-4 py-3 font-semibold">Latest Status</th>
                <th className="px-4 py-3 font-semibold">Latest Activity</th>
                <th className="px-4 py-3 font-semibold">Services</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item, idx) => (
                <tr key={`${item.email}-${idx}`} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.name || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{item.company || "—"}</td>
                  <td className="px-4 py-3 text-slate-600"><div>{item.email || "—"}</div><div className="text-xs text-slate-500">{item.phone || "—"}</div></td>
                  <td className="px-4 py-3 text-slate-600">{item.enquiryCount ?? 0}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.latestStatus || "New"} /></td>
                  <td className="px-4 py-3 text-slate-600">{formatDateIst(item.lastUpdatedAt || item.latestCreatedAt)}</td>
                  <td className="px-4 py-3 text-slate-600">{(item.services || []).join(", ") || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
