import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Loader2,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import {
  ENQUIRY_STATUSES,
  deleteEnquiry,
  deleteSubscriber,
  listEnquiries,
  listSubscribers,
  resolveStatus,
  type EnquiryListResponse,
  type EnquiryRecord,
  type EnquiryStatus,
  type SubscriberRecord,
} from "@/services/admin";
import { ApiError } from "@/services/enquiries";

type Tab = "enquiries" | "newsletter";

export function AdminDashboardPage() {
  const [tab, setTab] = useState<Tab>("enquiries");
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        <TabButton active={tab === "enquiries"} onClick={() => setTab("enquiries")}>
          <Inbox className="h-4 w-4" aria-hidden="true" /> Enquiries
        </TabButton>
        <TabButton active={tab === "newsletter"} onClick={() => setTab("newsletter")}>
          <Users className="h-4 w-4" aria-hidden="true" /> Newsletter
        </TabButton>
      </div>
      <div className="mt-5">
        {tab === "enquiries" ? <EnquiriesPanel /> : <NewsletterPanel />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

/* ── Enquiries ─────────────────────────────────────────────── */

function EnquiriesPanel() {
  const [data, setData] = useState<EnquiryListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [service, setService] = useState("all");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await listEnquiries({ q, status, service, page, limit: 25 }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, [q, status, service, page]);

  useEffect(() => {
    void load();
  }, [load]);

  // Any filter change returns to the first page.
  const setFilter = (fn: () => void) => {
    fn();
    setPage(1);
  };

  const onDelete = async (item: EnquiryRecord) => {
    const confirmed = window.confirm(
      `Delete the enquiry from ${item.name} (${item.email})?\n\nThis permanently removes it and cannot be undone.`,
    );
    if (!confirmed) return;
    try {
      await deleteEnquiry(item._id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to delete enquiry.");
    }
  };

  const counts = data?.counts;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ENQUIRY_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(() => setStatus(status === s ? "all" : s))}
            className={`rounded-xl border p-3 text-left transition-colors ${
              status === s ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted"
            }`}
          >
            <p className="text-xs font-medium text-muted-foreground">{s}</p>
            <p className="mt-1 text-xl font-bold text-foreground">{counts?.[s] ?? "—"}</p>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setFilter(() => setQ(e.target.value))}
            placeholder="Search name, email, phone or company"
            aria-label="Search enquiries"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <select
          value={service}
          onChange={(e) => setFilter(() => setService(e.target.value))}
          aria-label="Filter by service"
          className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="all">All services</option>
          {data?.services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading enquiries…
        </p>
      ) : data && data.items.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
          No enquiries match these filters.
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-5 hidden overflow-hidden rounded-xl border border-border lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Received</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {data?.items.map((item) => (
                  <tr key={item._id} className="hover:bg-muted/50">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/enquiries/${item._id}`} className="font-medium text-primary hover:underline">
                        {item.name}
                      </Link>
                      {item.company && <p className="text-xs text-muted-foreground">{item.company}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="break-all">{item.email}</p>
                      {item.phone && <p className="text-xs text-muted-foreground">{item.phone}</p>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{item.service || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{item.pageSource}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        aria-label={`Delete enquiry from ${item.name}`}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="mt-5 grid gap-3 lg:hidden">
            {data?.items.map((item) => (
              <li key={item._id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <Link to={`/admin/enquiries/${item._id}`} className="font-semibold text-foreground">
                    {item.name}
                  </Link>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-1 break-all text-sm text-muted-foreground">{item.email}</p>
                {item.phone && <p className="text-sm text-muted-foreground">{item.phone}</p>}
                <p className="mt-2 text-sm text-foreground">{item.service || "—"}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item.createdAt)} · {item.pageSource}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    aria-label={`Delete enquiry from ${item.name}`}
                    className="rounded-lg p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <Pager page={data?.page ?? 1} pages={data?.pages ?? 1} total={data?.total ?? 0} onPage={setPage} />
        </>
      )}
    </div>
  );
}

/* ── Newsletter ────────────────────────────────────────────── */

function NewsletterPanel() {
  const [items, setItems] = useState<SubscriberRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listSubscribers(q);
      setItems(res.items);
      setTotal(res.total);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load subscribers.");
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    void load();
  }, [load]);

  const onDelete = async (item: SubscriberRecord) => {
    if (!window.confirm(`Remove ${item.email} from the newsletter list?`)) return;
    try {
      await deleteSubscriber(item._id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to remove subscriber.");
    }
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {total} subscriber{total === 1 ? "" : "s"} stored in MongoDB.
      </p>

      <div className="relative mt-4">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search email"
          aria-label="Search subscribers"
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
        </p>
      ) : items.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
          No subscribers yet.
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((item) => (
            <li key={item._id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{item.email}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(item.createdAt)} · {item.source}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(item)}
                aria-label={`Remove ${item.email}`}
                className="shrink-0 rounded-lg p-2 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Shared bits ───────────────────────────────────────────── */

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  // Tolerates a legacy value from before the consultation pipeline existed.
  const resolved = resolveStatus(status);
  const styles: Record<EnquiryStatus, string> = {
    New: "bg-blue-100 text-blue-800",
    Contacted: "bg-amber-100 text-amber-800",
    "In Discussion": "bg-violet-100 text-violet-800",
    "Proposal Sent": "bg-cyan-100 text-cyan-800",
    Won: "bg-emerald-100 text-emerald-800",
    Closed: "bg-slate-200 text-slate-700",
  };
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[resolved]}`}>
      {resolved}
    </span>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Pager({
  page,
  pages,
  total,
  onPage,
}: {
  page: number;
  pages: number;
  total: number;
  onPage: (page: number) => void;
}) {
  if (total === 0) return null;
  return (
    <div className="mt-5 flex items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        Page {page} of {pages} · {total} total
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onPage(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
        </button>
        <button
          type="button"
          onClick={() => onPage(page + 1)}
          disabled={page >= pages}
          className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium disabled:opacity-40"
        >
          Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}