import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowDownWideNarrow,
  ChevronLeft,
  ChevronRight,
  Eye,
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
  type EnquirySort,
  type EnquiryStatus,
  type SubscriberRecord,
} from "@/services/admin";
import {
  BUDGET_LABELS,
  SERVICE_LABELS,
  TIMELINE_LABELS,
  optionLabel,
} from "@/constants/enquiry";
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
        {tab === "enquiries" ? (
          <EnquiriesPanel onOpenNewsletter={() => setTab("newsletter")} />
        ) : (
          <NewsletterPanel />
        )}
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

/**
 * Summary cards.
 *
 * `status` is a canonical pipeline value; the API maps legacy stored values
 * (In Discussion / Proposal Sent / Won) into these buckets without rewriting
 * any client data. The Newsletter card switches to the subscriber tab.
 */
const SUMMARY_CARDS: {
  label: string;
  status?: EnquiryStatus;
  kind?: "total" | "subscribers";
}[] = [
  { label: "Total Enquiries", kind: "total" },
  { label: "New", status: "New" },
  { label: "Contacted", status: "Contacted" },
  { label: "In Progress", status: "In Progress" },
  { label: "Closed", status: "Closed" },
  { label: "Newsletter Subscribers", kind: "subscribers" },
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "createdAt:desc", label: "Newest first" },
  { value: "createdAt:asc", label: "Oldest first" },
  { value: "name:asc", label: "Name A–Z" },
  { value: "name:desc", label: "Name Z–A" },
  { value: "status:asc", label: "Status" },
  { value: "service:asc", label: "Service" },
];

/* ── Enquiries ─────────────────────────────────────────────── */

function EnquiriesPanel({ onOpenNewsletter }: { onOpenNewsletter: () => void }) {
  const [data, setData] = useState<EnquiryListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [service, setService] = useState("all");
  const [sort, setSort] = useState<EnquirySort>("createdAt");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await listEnquiries({ q, status, service, page, limit: 25, sort, dir }));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, [q, status, service, page, sort, dir]);

  useEffect(() => {
    void load();
  }, [load]);

  // Any filter change returns to the first page.
  const setFilter = (fn: () => void) => {
    fn();
    setPage(1);
  };

  const [pendingDelete, setPendingDelete] = useState<EnquiryRecord | null>(null);

  const requestDelete = (item: EnquiryRecord) => setPendingDelete(item);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const target = pendingDelete;
    setPendingDelete(null);
    try {
      await deleteEnquiry(target._id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to delete enquiry.");
    }
  };

  const counts = data?.counts;
  const summary = data?.summary;

  const summaryValue = (card: (typeof SUMMARY_CARDS)[number]) => {
    if (!data) return error ? "Error" : "…";
    if (card.kind === "total") return summary?.total ?? data.total ?? "—";
    if (card.kind === "subscribers") return summary?.subscribers ?? "—";
    return summary?.counts?.[card.status as EnquiryStatus] ?? "—";
  };

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SUMMARY_CARDS.map((card) => {
          const isNewsletter = card.kind === "subscribers";
          const isTotal = card.kind === "total";
          const active = isTotal
            ? status === "all"
            : card.status
              ? status === card.status
              : false;
          return (
            <button
              key={card.label}
              type="button"
              onClick={() => {
                if (isNewsletter) {
                  onOpenNewsletter();
                } else if (isTotal) {
                  setFilter(() => setStatus("all"));
                } else if (card.status) {
                  setFilter(() => setStatus(active ? "all" : card.status!));
                }
              }}
              aria-pressed={isNewsletter ? undefined : active}
              className={`rounded-xl border p-3 text-left transition-colors ${
                active ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted"
              }`}
            >
              <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
              <p className="mt-1 text-xl font-bold text-foreground">{summaryValue(card)}</p>
            </button>
          );
        })}
      </div>

      {/* Status filter chips */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Status
        </span>
        {(["all", ...ENQUIRY_STATUSES] as string[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(() => setStatus(s))}
            aria-pressed={status === s}
            className={`rounded-none border px-3 py-1 text-xs font-semibold transition-colors ${
              status === s
                ? "border-primary bg-primary text-white"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {s === "all" ? "All" : s}
            {s !== "all" && counts?.[s as EnquiryStatus] !== undefined && (
              <span className="ml-1.5 opacity-70">{counts[s as EnquiryStatus]}</span>
            )}
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
              {optionLabel(s, SERVICE_LABELS)}
            </option>
          ))}
        </select>
        <div className="relative">
          <ArrowDownWideNarrow
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <select
            value={`${sort}:${dir}`}
            onChange={(e) => {
              const [nextSort, nextDir] = e.target.value.split(":") as [EnquirySort, "asc" | "desc"];
              setFilter(() => {
                setSort(nextSort);
                setDir(nextDir);
              });
            }}
            aria-label="Sort enquiries"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-9 pr-8 text-sm outline-none focus:border-primary sm:w-auto"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="rounded-lg border border-destructive/30 px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-destructive/10 disabled:opacity-50"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading enquiries…
        </p>
      ) : error && !data ? null : data && data.items.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
          No enquiries match these filters.
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-5 hidden overflow-x-auto rounded-xl border border-border lg:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-3 font-semibold">Submitted</th>
                  <th className="px-3 py-3 font-semibold">Client Name</th>
                  <th className="px-3 py-3 font-semibold">Business / Company</th>
                  <th className="px-3 py-3 font-semibold">Email</th>
                  <th className="px-3 py-3 font-semibold">Phone</th>
                  <th className="px-3 py-3 font-semibold">Service</th>
                  <th className="px-3 py-3 font-semibold">Budget</th>
                  <th className="px-3 py-3 font-semibold">Message</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {data?.items.map((item) => (
                  <tr key={item._id} className="hover:bg-muted/50">
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-3 py-3">
                      <Link to={`/admin/enquiries/${item._id}`} className="font-medium text-primary hover:underline">
                        {item.name || "—"}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{item.company || "—"}</td>
                    <td className="px-3 py-3">
                      <a href={`mailto:${item.email}`} className="break-all hover:underline">
                        {item.email || "—"}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                      {item.phone || "—"}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      {optionLabel(item.service, SERVICE_LABELS)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">
                      {optionLabel(item.budget, BUDGET_LABELS)}
                    </td>
                    <td className="max-w-[20rem] px-3 py-3 text-xs text-muted-foreground">
                      <span className="line-clamp-2" title={item.projectDescription}>
                        {item.projectDescription || "—"}
                      </span>
                    </td>
                    <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/enquiries/${item._id}`}
                          aria-label={`View details for ${item.name}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                        >
                          <Eye className="h-4 w-4" aria-hidden="true" /> View
                        </Link>
                        <button
                          type="button"
                          onClick={() => requestDelete(item)}
                          aria-label={`Delete enquiry from ${item.name}`}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
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
                    {item.name || "—"}
                  </Link>
                  <StatusBadge status={item.status} />
                </div>
                {item.company && (
                  <p className="mt-1 text-sm font-medium text-foreground">{item.company}</p>
                )}
                <p className="mt-1 break-all text-sm text-muted-foreground">{item.email || "—"}</p>
                {item.phone && <p className="text-sm text-muted-foreground">{item.phone}</p>}
                <p className="mt-2 text-sm text-foreground">
                  {optionLabel(item.service, SERVICE_LABELS)}
                </p>
                {(item.budget || item.timeline) && (
                  <p className="text-sm text-muted-foreground">
                    {[
                      optionLabel(item.budget, BUDGET_LABELS),
                      optionLabel(item.timeline, TIMELINE_LABELS),
                    ]
                      .filter((v) => v !== "—")
                      .join(" · ")}
                  </p>
                )}
                {item.projectDescription && (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {item.projectDescription}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item.createdAt)} · {item.pageSource}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/enquiries/${item._id}`}
                      aria-label={`View details for ${item.name}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" /> Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => requestDelete(item)}
                      aria-label={`Delete enquiry from ${item.name}`}
                      className="rounded-lg p-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Pager page={data?.page ?? 1} pages={data?.pages ?? 1} total={data?.total ?? 0} onPage={setPage} />
        </>
      )}

      <ConfirmDeleteDialog
        enquiry={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
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
        {error && items.length === 0
          ? "Subscriber data is unavailable."
          : `${total} subscriber${total === 1 ? "" : "s"} stored in MongoDB.`}
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
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="rounded-lg border border-destructive/30 px-2.5 py-1 text-xs font-semibold transition-colors hover:bg-destructive/10 disabled:opacity-50"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading…
        </p>
      ) : error && items.length === 0 ? null : items.length === 0 ? (
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

/* ── Confirmation dialog ───────────────────────────────────── */

/**
 * Accessible delete confirmation. Replaces window.confirm so the action is
 * unambiguous and the destructive button is labelled "Delete" rather than the
 * browser's generic "OK".
 */
export function ConfirmDeleteDialog({
  enquiry,
  onCancel,
  onConfirm,
}: {
  enquiry: { name: string; email: string } | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!enquiry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    cancelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [enquiry, onCancel]);

  if (!enquiry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
        <h2 id="confirm-delete-title" className="text-base font-bold text-foreground">
          Delete this enquiry?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This permanently removes the enquiry from {enquiry.name} ({enquiry.email}).
          It cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Shared bits ───────────────────────────────────────────── */

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  // Tolerates a legacy value from before the current pipeline existed.
  const resolved = resolveStatus(status);
  const styles: Record<EnquiryStatus, string> = {
    New: "bg-blue-100 text-blue-800",
    Contacted: "bg-amber-100 text-amber-800",
    "In Progress": "bg-violet-100 text-violet-800",
    Closed: "bg-slate-200 text-slate-700",
  };
  return (
    <span className={`inline-block whitespace-nowrap rounded-none px-2.5 py-1 text-xs font-semibold ${styles[resolved]}`}>
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
