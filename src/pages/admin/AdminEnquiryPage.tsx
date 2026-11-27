import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, Archive, ArchiveRestore, Loader2, Mail, MessageSquarePlus, Phone, Trash2 } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { ENQUIRY_STATUSES, addEnquiryNote, archiveEnquiry, deleteEnquiry, formatDateIst, getEnquiry, resolveStatus, updateEnquiryStatus, type EnquiryRecord, type EnquiryStatus } from "@/services/admin";
import { ApiError } from "@/services/enquiries";
import { StatusBadge } from "./AdminDashboardPage";

export function AdminEnquiryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<EnquiryRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [confirm, setConfirm] = useState<"archive" | "restore" | "delete" | null>(null);
  const [busy, setBusy] = useState(false);

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

  useEffect(() => { void load(); }, [load]);

  const changeStatus = async (status: EnquiryStatus) => {
    if (!id || !item || status === resolveStatus(String(item.status))) return;
    setSaving(true); setError(""); setSaved(false);
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

  const submitNote = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !noteText.trim()) return;
    setSavingNote(true); setError(""); setSaved(false);
    try {
      const res = await addEnquiryNote(id, noteText.trim());
      setItem(res.item); setNoteText(""); setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to save note.");
    } finally {
      setSavingNote(false);
    }
  };

  const runConfirm = async () => {
    if (!id || !confirm) return;
    setBusy(true); setError("");
    try {
      if (confirm === "delete") {
        await deleteEnquiry(id);
        navigate("/admin/enquiries");
        return;
      }
      const res = await archiveEnquiry(id, confirm === "archive");
      setItem(res.item);
      setConfirm(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Loading enquiry…</p>;
  if (!item) return <div><p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error || "Enquiry not found."}</p><Link to="/admin/enquiries" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4" /> Back to enquiries</Link></div>;

  const waPhone = (item.phone || SITE_CONFIG.phone || "").replace(/[^\d]/g, "");

  return (
    <div className="space-y-4">
      <Link to="/admin/enquiries" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Back to enquiries</Link>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{item.name || "Enquiry"}</h1>
          <p className="mt-1 text-sm text-slate-500">Received {formatDateIst(item.createdAt)} · updated {formatDateIst(item.updatedAt)}</p>
          <p className="mt-1 text-xs text-slate-500">ID: <span className="font-mono">{item._id}</span></p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {item.email && <a href={`mailto:${item.email}`} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary/90"><Mail className="h-4 w-4" /> Email</a>}
          {item.phone && <a href={`tel:${item.phone}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"><Phone className="h-4 w-4" /> Call</a>}
          {waPhone && <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">WhatsApp</a>}
          <StatusBadge status={item.status} />
        </div>
      </div>

      {error && <p className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"><AlertCircle className="h-4 w-4" />{error}</p>}

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Status</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {ENQUIRY_STATUSES.map((s) => (
            <button key={s} type="button" onClick={() => void changeStatus(s)} disabled={saving || s === resolveStatus(String(item.status))} aria-pressed={s === resolveStatus(String(item.status))} className={`rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-default ${s === resolveStatus(String(item.status)) ? "border-primary bg-primary text-white" : "border-slate-300 hover:bg-slate-50 disabled:opacity-50"}`}>{s}</button>
          ))}
          {saving && <Loader2 className="h-4 w-4 animate-spin self-center text-slate-400" />}
          {saved && <span className="self-center text-sm font-medium text-emerald-600">Saved</span>}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Detail label="Email" value={item.email || "—"} href={item.email ? `mailto:${item.email}` : undefined} />
        <Detail label="Phone" value={item.phone || "—"} href={item.phone ? `tel:${item.phone}` : undefined} />
        <Detail label="Company" value={item.company || "—"} />
        <Detail label="Designation" value={item.designation || "—"} />
        <Detail label="Service" value={item.service || "—"} />
        <Detail label="Budget" value={item.budget || "—"} />
        <Detail label="Timeline" value={item.timeline || "—"} />
        <Detail label="Industry" value={item.industry || "—"} />
        <Detail label="Form type" value={item.formType || "—"} />
        <Detail label="Source category" value={item.sourceCategory || "—"} />
        <Detail label="Page source" value={item.pageSource || "—"} />
        <Detail label="Archived" value={item.archived ? "Yes" : "No"} />
      </section>

      <section className="space-y-4">
        <Long label="Project description" value={item.projectDescription} />
        <Long label="Business challenges" value={item.businessChallenges} />
        <Long label="Goals & expected outcomes" value={item.goals} />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Private follow-up notes</h2>
        <p className="mt-1 text-xs text-slate-500">Visible to administrators only. Each note is timestamped.</p>
        {item.notes?.length ? (
          <ul className="mt-4 space-y-3">
            {[...item.notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((note) => (
              <li key={note.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="whitespace-pre-wrap break-words text-sm text-slate-800">{note.text}</p>
                <time dateTime={note.createdAt} className="mt-2 block text-xs text-slate-500">{formatDateIst(note.createdAt)}</time>
              </li>
            ))}
          </ul>
        ) : <p className="mt-4 text-sm text-slate-500">No follow-up notes yet.</p>}
        <form onSubmit={submitNote} className="mt-4">
          <label htmlFor="follow-up-note" className="block text-xs font-medium text-slate-700">Add a note</label>
          <textarea id="follow-up-note" value={noteText} onChange={(e) => setNoteText(e.target.value)} maxLength={2000} rows={3} placeholder="Call summary, next steps, internal context…" className="mt-1 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary" />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">{noteText.length}/2000</span>
            <button type="submit" disabled={savingNote || !noteText.trim()} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">
              {savingNote ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquarePlus className="h-4 w-4" />} Add note
            </button>
          </div>
        </form>
      </section>

      <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-5">
        <button type="button" onClick={() => setConfirm(item.archived ? "restore" : "archive")} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">
          {item.archived ? <ArchiveRestore className="h-4 w-4" /> : <Archive className="h-4 w-4" />} {item.archived ? "Restore enquiry" : "Archive enquiry"}
        </button>
        <button type="button" onClick={() => setConfirm("delete")} className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"><Trash2 className="h-4 w-4" /> Delete enquiry</button>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4" role="dialog" aria-modal="true" aria-labelledby="enquiry-confirm-title">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <h2 id="enquiry-confirm-title" className="text-lg font-semibold text-slate-900">
              {confirm === "delete" ? "Delete enquiry?" : confirm === "archive" ? "Archive enquiry?" : "Restore enquiry?"}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {confirm === "delete" ? "This will permanently delete this enquiry." : `This will ${confirm} this enquiry.`}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setConfirm(null)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">Cancel</button>
              <button type="button" disabled={busy} onClick={() => void runConfirm()} className={`rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-50 ${confirm === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-slate-900 hover:bg-slate-800"}`}>{busy ? "Working…" : "Confirm"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      {href ? <a href={href} className="mt-1 block truncate text-sm font-medium text-primary hover:underline">{value}</a> : <p className="mt-1 truncate text-sm font-medium text-slate-900">{value}</p>}
    </div>
  );
}

function Long({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</h3>
      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">{value || "Not specified"}</p>
    </div>
  );
}
