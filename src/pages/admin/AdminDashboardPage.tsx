import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Inbox, Loader2, Mail, Users } from "lucide-react";
import {
  formatDateIst,
  listEnquiries,
  resolveStatus,
  type EnquiryRecord,
  type EnquiryStatus,
  type EnquirySummary,
} from "@/services/admin";
import { ApiError } from "@/services/enquiries";

interface SummaryCard {
  label: string;
  value: (summary: EnquirySummary) => number;
}

const SUMMARY_CARDS: SummaryCard[] = [
  { label: "Total enquiries", value: (s) => s.total },
  { label: "New enquiries", value: (s) => s.new },
  { label: "Today's enquiries", value: (s) => s.today },
  { label: "Monthly enquiries", value: (s) => s.monthly },
  { label: "Contacted clients", value: (s) => s.contacted },
  { label: "In-progress enquiries", value: (s) => s.inProgress },
  { label: "Converted clients", value: (s) => s.converted },
  { label: "Closed enquiries", value: (s) => s.closed },
  { label: "Newsletter subscribers", value: (s) => s.subscribers },
];

export function AdminDashboardPage() {
  const [summary, setSummary] = useState<EnquirySummary | null>(null);
  const [recent, setRecent] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const [summaryRes, recentRes] = await Promise.all([
          listEnquiries({ limit: 1, page: 1, sort: "createdAt", dir: "desc" }),
          listEnquiries({ limit: 8, page: 1, sort: "createdAt", dir: "desc" }),
        ]);
        if (!active) return;
        setSummary(summaryRes.summary);
        setRecent(recentRes.items);
      } catch (err) {
        if (!active) return;
        setError(err instanceof ApiError ? err.message : "Unable to load dashboard.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Overview</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">Real-time enquiry and subscriber overview.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Inbox className="h-4 w-4" aria-hidden="true" /> Enquiries
          </Link>
          <button
            type="button"
            onClick={() => window.location.assign("/admin/newsletter")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Users className="h-4 w-4" aria-hidden="true" /> Newsletter
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SUMMARY_CARDS.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {loading ? "…" : summary ? card.value(summary) : "—"}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Recent enquiries</h2>
            <p className="text-sm text-slate-500">Latest enquiries by submission date.</p>
          </div>
          <Link to="/admin/enquiries" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <p className="flex items-center gap-2 px-4 py-8 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading dashboard…
          </p>
        ) : recent.length === 0 ? (
          <p className="px-4 py-8 text-sm text-slate-500">No enquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Submitted</th>
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recent.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDateIst(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Link to={`/admin/enquiries/${item._id}`} className="font-medium text-primary hover:underline">
                        {item.name || "—"}
                      </Link>
                      <div className="text-xs text-slate-500">{item.company || "—"}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.service || "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" aria-hidden="true" />{item.email || "—"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export function StatusBadge({ status }: { status: EnquiryStatus | string }) {
  const resolved = resolveStatus(String(status));
  const styles: Record<EnquiryStatus, string> = {
    New: "bg-blue-100 text-blue-800",
    Contacted: "bg-amber-100 text-amber-800",
    "In Discussion": "bg-cyan-100 text-cyan-800",
    "Proposal Sent": "bg-indigo-100 text-indigo-800",
    "In Progress": "bg-violet-100 text-violet-800",
    Converted: "bg-emerald-100 text-emerald-800",
    Rejected: "bg-rose-100 text-rose-800",
    Closed: "bg-slate-200 text-slate-700",
  };
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[resolved]}`}>
      {resolved}
    </span>
  );
}
