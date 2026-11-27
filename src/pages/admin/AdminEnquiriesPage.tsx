import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Archive,
  ArchiveRestore,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_STATUSES,
  archiveEnquiry,
  deleteEnquiry,
  exportEnquiries,
  formatDateIst,
  listEnquiries,
  type EnquiryCategory,
  type EnquiryListResponse,
  type EnquiryQuery,
  type EnquirySort,
} from "@/services/admin";
import { ApiError } from "@/services/enquiries";
import { StatusBadge } from "./AdminDashboardPage";

type ArchivedFilter = "active" | "archived" | "all";

interface Props {
  category?: EnquiryCategory;
}

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "createdAt:desc", label: "Newest first" },
  { value: "createdAt:asc", label: "Oldest first" },
  { value: "updatedAt:desc", label: "Recently updated" },
  { value: "name:asc", label: "Name A–Z" },
  { value: "name:desc", label: "Name Z–A" },
  { value: "status:asc", label: "Status" },
  { value: "service:asc", label: "Service" },
];

export function AdminEnquiriesPage({ category }: Props) {
  const [data, setData] = useState<EnquiryListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [service, setService] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<string>(category ?? "all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [archived, setArchived] = useState<ArchivedFilter>("active");
  const [sort, setSort] = useState<EnquirySort>("createdAt");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [confirm, setConfirm] = useState<{ type: "archive" | "restore" | "delete"; ids: string[] } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setCategoryFilter(category ?? "all");
    setPage(1);
    setSelected({});
  }, [category]);

  const query = useMemo<EnquiryQuery>(() => ({
    q, status, service, category: category ?? categoryFilter, from, to, archived, sort, dir, page, limit: 25,
  }), [q, status, service, category, categoryFilter, from, to, archived, sort, dir, page]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await listEnquiries(query));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => { void load(); }, [load]);

  const setFilter = (fn: () => void) => { fn(); setPage(1); };
  const items = data?.items ?? [];
  const selectedIds = items.filter((i) => selected[i._id]).map((i) => i._id);
  const allSelected = items.length > 0 && selectedIds.length === items.length;

  const toggleAll = (checked: boolean) => {
    const next: Record<string, boolean> = {};
    if (checked) for (const item of items) next[item._id] = true;
    setSelected(next);
  };

  const runConfirmed = async () => {
    if (!confirm) return;
    setBusy(true);
    setError("");
    try {
      if (confirm.type === "delete") {
        await Promise.all(confirm.ids.map((id) => deleteEnquiry(id)));
      } else {
        await Promise.all(confirm.ids.map((id) => archiveEnquiry(id, confirm.type === "archive")));
      }
      setConfirm(null);
      setSelected({});
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  };

  const onExport = async (selectedOnly: boolean) => {
    setError("");
    try {
      if (selectedOnly) {
        if (selectedIds.length === 0) return;
        await exportEnquiries({ ids: selectedIds });
        return;
      }
      await exportEnquiries(query);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to export CSV.");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Enquiry Management</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Enquiries` : "All Enquiries"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">Search, filter, export, archive, and manage enquiries.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void onExport(false)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
            <Download className="h-4 w-4" /> Export All CSV
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Search</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setFilter(() => setQ(e.target.value))} placeholder="Name, email, phone, company" className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 outline-none focus:border-primary" />
          </div>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Status</span>
          <select value={status} onChange={(e) => setFilter(() => setStatus(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary">
            <option value="all">All statuses</option>
            {ENQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Service</span>
          <select value={service} onChange={(e) => setFilter(() => setService(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary">
            <option value="all">All services</option>
            {(data?.services ?? []).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        {!category && (
          <label className="text-sm">
            <span className="mb-1 block font-medium text-slate-700">Category</span>
            <select value={categoryFilter} onChange={(e) => setFilter(() => setCategoryFilter(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary">
              <option value="all">All categories</option>
              {ENQUIRY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        )}
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">From</span>
          <input type="date" value={from} onChange={(e) => setFilter(() => setFrom(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">To</span>
          <input type="date" value={to} onChange={(e) => setFilter(() => setTo(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Archived</span>
          <select value={archived} onChange={(e) => setFilter(() => setArchived(e.target.value as ArchivedFilter))} className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary">
            <option value="active">Active</option>
            <option value="archived">Archived</option>
            <option value="all">All</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">Sort</span>
          <select
            value={`${sort}:${dir}`}
            onChange={(e) => {
              const [s, d] = e.target.value.split(":") as [EnquirySort, "asc" | "desc"];
              setFilter(() => { setSort(s); setDir(d); });
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-primary"
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" /> <span>{error}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={selectedIds.length === 0} onClick={() => setConfirm({ type: "archive", ids: selectedIds })} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"><Archive className="h-4 w-4" /> Archive</button>
        <button type="button" disabled={selectedIds.length === 0} onClick={() => setConfirm({ type: "restore", ids: selectedIds })} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"><ArchiveRestore className="h-4 w-4" /> Restore</button>
        <button type="button" disabled={selectedIds.length === 0} onClick={() => setConfirm({ type: "delete", ids: selectedIds })} className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"><Trash2 className="h-4 w-4" /> Delete</button>
        <button type="button" disabled={selectedIds.length === 0} onClick={() => void onExport(true)} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"><Download className="h-4 w-4" /> Export Selected CSV</button>
        {selectedIds.length > 0 && <span className="self-center text-sm text-slate-500">{selectedIds.length} selected</span>}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="flex items-center gap-2 px-4 py-8 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading enquiries…</p>
        ) : items.length === 0 ? (
          <p className="px-4 py-8 text-sm text-slate-500">No enquiries found.</p>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1200px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-3 py-3"><input type="checkbox" checked={allSelected} onChange={(e) => toggleAll(e.target.checked)} aria-label="Select all enquiries" /></th>
                    <th className="px-3 py-3 font-semibold">Submitted (IST)</th>
                    <th className="px-3 py-3 font-semibold">Name</th>
                    <th className="px-3 py-3 font-semibold">Company</th>
                    <th className="px-3 py-3 font-semibold">Email</th>
                    <th className="px-3 py-3 font-semibold">Phone</th>
                    <th className="px-3 py-3 font-semibold">Service</th>
                    <th className="px-3 py-3 font-semibold">Budget</th>
                    <th className="px-3 py-3 font-semibold">Message</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                    <th className="px-3 py-3 font-semibold">Category</th>
                    <th className="px-3 py-3 font-semibold">Source</th>
                    <th className="px-3 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((item) => (
                    <tr key={item._id} className="align-top hover:bg-slate-50">
                      <td className="px-3 py-3"><input type="checkbox" checked={!!selected[item._id]} onChange={(e) => setSelected((s) => ({ ...s, [item._id]: e.target.checked }))} aria-label={`Select ${item.name}`} /></td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-500">{formatDateIst(item.createdAt)}</td>
                      <td className="px-3 py-3"><Link to={`/admin/enquiries/${item._id}`} className="font-medium text-primary hover:underline">{item.name || "—"}</Link></td>
                      <td className="px-3 py-3 text-slate-600">{item.company || "—"}</td>
                      <td className="px-3 py-3 text-slate-600">{item.email || "—"}</td>
                      <td className="px-3 py-3 text-slate-600">{item.phone || "—"}</td>
                      <td className="px-3 py-3 text-slate-600">{item.service || "—"}</td>
                      <td className="px-3 py-3 text-slate-600">{item.budget || "—"}</td>
                      <td className="max-w-xs px-3 py-3 text-slate-600"><div className="line-clamp-3">{item.projectDescription || item.businessChallenges || item.goals || "—"}</div></td>
                      <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-3 py-3 text-slate-600">{item.sourceCategory || "—"}</td>
                      <td className="px-3 py-3 text-slate-600">{item.pageSource || "—"}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => setConfirm({ type: item.archived ? "restore" : "archive", ids: [item._id] })} className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50">{item.archived ? "Restore" : "Archive"}</button>
                          <button type="button" onClick={() => setConfirm({ type: "delete", ids: [item._id] })} className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 p-4 lg:hidden">
              {items.map((item) => (
                <div key={item._id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" checked={!!selected[item._id]} onChange={(e) => setSelected((s) => ({ ...s, [item._id]: e.target.checked }))} aria-label={`Select ${item.name}`} className="mt-1" />
                      <div>
                        <Link to={`/admin/enquiries/${item._id}`} className="font-medium text-primary hover:underline">{item.name || "—"}</Link>
                        <p className="text-xs text-slate-500">{formatDateIst(item.createdAt)}</p>
                      </div>
                    </label>
                    <StatusBadge status={item.status} />
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div><dt className="text-slate-500">Company</dt><dd className="text-slate-700">{item.company || "—"}</dd></div>
                    <div><dt className="text-slate-500">Phone</dt><dd className="text-slate-700">{item.phone || "—"}</dd></div>
                    <div><dt className="text-slate-500">Service</dt><dd className="text-slate-700">{item.service || "—"}</dd></div>
                    <div><dt className="text-slate-500">Budget</dt><dd className="text-slate-700">{item.budget || "—"}</dd></div>
                    <div><dt className="text-slate-500">Category</dt><dd className="text-slate-700">{item.sourceCategory || "—"}</dd></div>
                    <div><dt className="text-slate-500">Source</dt><dd className="text-slate-700">{item.pageSource || "—"}</dd></div>
                  </dl>
                  <p className="mt-2 text-xs text-slate-600"><span className="font-medium text-slate-500">Email:</span> {item.email || "—"}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.projectDescription || item.businessChallenges || item.goals || "—"}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => setConfirm({ type: item.archived ? "restore" : "archive", ids: [item._id] })} className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50">{item.archived ? "Restore" : "Archive"}</button>
                    <button type="button" onClick={() => setConfirm({ type: "delete", ids: [item._id] })} className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Page {data?.page ?? 1} of {data?.pages ?? 1} · {data?.total ?? 0} total</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={(data?.page ?? 1) <= 1} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40"><ChevronLeft className="h-4 w-4" /> Previous</button>
          <button type="button" onClick={() => setPage((p) => p + 1)} disabled={(data?.page ?? 1) >= (data?.pages ?? 1)} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-40">Next <ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <h2 id="confirm-title" className="text-lg font-semibold text-slate-900">
              {confirm.type === "delete" ? "Delete enquiries?" : confirm.type === "archive" ? "Archive enquiries?" : "Restore enquiries?"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {confirm.type === "delete"
                ? `This will permanently delete ${confirm.ids.length} enquiry record(s).`
                : `This will ${confirm.type} ${confirm.ids.length} enquiry record(s).`}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setConfirm(null)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Cancel</button>
              <button type="button" disabled={busy} onClick={() => void runConfirmed()} className={`rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-50 ${confirm.type === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-slate-900 hover:bg-slate-800"}`}>
                {busy ? "Working…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
