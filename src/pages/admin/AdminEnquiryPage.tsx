import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, Loader2, Mail, Phone, Trash2 } from "lucide-react";
import {
  ENQUIRY_STATUSES,
  deleteEnquiry,
  getEnquiry,
  resolveStatus,
  updateEnquiryStatus,
  type EnquiryRecord,
  type EnquiryStatus,
} from "@/services/admin";
import { ApiError } from "@/services/enquiries";
import { useSEO } from "@/hooks/useSEO";
import { StatusBadge } from "./AdminDashboardPage";

export function AdminEnquiryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<EnquiryRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useSEO({
    title: "Enquiry detail",
    description: "Internal administration area.",
    noindex: true,
  });

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const res = await getEnquiry(id);
      setItem(res.item);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load enquiry.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  const currentStatus = item ? resolveStatus(item.status) : null;

  const changeStatus = async (status: EnquiryStatus) => {
    if (!id || !item || status === resolveStatus(item.status)) return;
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await updateEnquiryStatus(id, status);
      setItem(res.item);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to update status.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!id || !item) return;
    if (
      !window.confirm(
        `Delete the enquiry from ${item.name} (${item.email})?\n\nThis permanently removes it and cannot be undone.`,
      )
    ) {
      return;
    }
    try {
      await deleteEnquiry(id);
      navigate("/admin");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to delete enquiry.");
    }
  };

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading enquiry…
      </p>
    );
  }

  if (!item) {
    return (
      <div>
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive">
          {error || "Enquiry not found."}
        </p>
        <Link to="/admin" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to enquiries
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to enquiries
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{item.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Received {formatDate(item.createdAt)} from {item.pageSource}
          </p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {/* Status control */}
      <section className="mt-5 rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-semibold text-foreground">Status</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {ENQUIRY_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => changeStatus(s)}
              disabled={saving || s === currentStatus}
              aria-pressed={s === currentStatus}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-default ${
                s === currentStatus
                  ? "border-primary bg-primary text-white"
                  : "border-border hover:bg-muted disabled:opacity-50"
              }`}
            >
              {s}
            </button>
          ))}
          {saving && <Loader2 className="h-4 w-4 animate-spin self-center text-muted-foreground" aria-hidden="true" />}
          {saved && <span className="self-center text-sm font-medium text-emerald-600">Saved</span>}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Detail label="Email" value={item.email} href={`mailto:${item.email}`} icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />} />
        <Detail label="Phone" value={item.phone || "—"} href={item.phone ? `tel:${item.phone}` : undefined} icon={<Phone className="h-3.5 w-3.5" aria-hidden="true" />} />
        <Detail label="Company" value={item.company || "—"} />
        <Detail label="Designation" value={item.designation || "—"} />
        <Detail label="Service" value={item.service || "—"} />
        <Detail label="Budget" value={item.budget || "—"} />
        <Detail label="Timeline" value={item.timeline || "—"} />
        <Detail label="Form type" value={item.formType} />
      </section>

      {/* Long text */}
      <section className="mt-4 space-y-4">
        <Long label="Project description" value={item.projectDescription} />
        <Long label="Business challenges" value={item.businessChallenges} />
        <Long label="Goals & expected outcomes" value={item.goals} />
      </section>

      <div className="mt-6 flex justify-end border-t border-border pt-5">
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-2 rounded-lg border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete enquiry
        </button>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-card p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-center gap-1.5">
        {icon}
        {href ? (
          <a href={href} className="truncate text-sm font-medium text-primary hover:underline">
            {value}
          </a>
        ) : (
          <p className="truncate text-sm font-medium text-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

function Long({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</h3>
      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
        {value || "Not specified"}
      </p>
    </div>
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