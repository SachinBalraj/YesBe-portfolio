import type { Article } from "@/knowledge/types";
import { articleUrl } from "@/knowledge/seo";

export function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function buildShareLinks(article: Article) {
  const url = articleUrl(article.slug);
  const text = `${article.title} — YesBe Knowledge Center`;
  const encoded = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  return [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#f0f4f8] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encoded}&url=${encodedUrl}`,
      color: "bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#eef2f9] text-[#1877f2] hover:bg-[#1877f2] hover:text-white",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encoded}%20${encodedUrl}`,
      color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white",
    },
    {
      label: "Email",
      href: `mailto:?subject=${encoded}&body=${encodedUrl}`,
      color: "bg-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white",
    },
  ];
}
