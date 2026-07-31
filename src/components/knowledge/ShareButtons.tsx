import { useCallback, useState } from "react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { Mail, Link2, Check } from "lucide-react";
import type { Article } from "@/knowledge/types";
import { articleUrl } from "@/knowledge/seo";
import { buildShareLinks } from "./share";

const iconMap = {
  Linkedin: FaLinkedinIn,
  X: FaXTwitter,
  Facebook: FaFacebookF,
  WhatsApp: FaWhatsapp,
  Email: Mail,
};

interface ShareButtonsProps {
  article: Article;
  className?: string;
}

export function ShareButtons({ article, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(articleUrl(article.slug));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [article.slug]);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      {buildShareLinks(article).map((link) => {
        const Icon = iconMap[link.label as keyof typeof iconMap] ?? Link2;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${link.color}`}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
          copied
            ? "bg-emerald-500 text-white"
            : "bg-[#eff6ff] text-primary hover:bg-primary hover:text-white"
        }`}
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
