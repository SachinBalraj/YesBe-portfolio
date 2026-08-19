import { CalendarDays, RefreshCw, User, Mail, Globe } from "lucide-react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa6";
import type { Article } from "@/knowledge/types";
import { formatDate } from "./share";

interface AuthorCardProps {
  article: Article;
  variant?: "card" | "inline";
}

export function AuthorCard({ article, variant = "card" }: AuthorCardProps) {
  const authorName = article.author || "Sachin Balraj";
  const authorRole = article.authorRole || "Founder & CEO - YesBe";
  const authorBio =
    article.authorBio ||
    "AI Solutions | ERP Systems | Enterprise Digital Transformation Architecture";
  const authorImage = article.authorImage;

  const initials = authorName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2.5">
        {authorImage ? (
          <img
            src={authorImage}
            alt={authorName}
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-xs font-bold text-white shadow-2xs">
            {initials}
          </div>
        )}
        <div>
          <span className="block text-xs font-bold text-foreground">{authorName}</span>
          <span className="block text-[10px] text-muted-foreground">{authorRole}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Profile Avatar Image */}
        <div className="relative shrink-0">
          {authorImage ? (
            <img
              src={authorImage}
              alt={authorName}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="h-16 w-16 rounded-2xl object-cover ring-4 ring-primary/10 shadow-sm"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-xl font-extrabold text-white shadow-md">
              {initials}
            </div>
          )}
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white shadow-xs">
            ✓
          </span>
        </div>

        {/* Author Bio & Links */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-base font-bold text-foreground flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                {authorName}
              </h4>
              <p className="text-xs font-semibold text-primary mt-0.5">{authorRole}</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-1.5">
              {article.authorSocials?.linkedin && (
                <a
                  href={article.authorSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <FaLinkedin className="h-4 w-4" />
                </a>
              )}
              {article.authorSocials?.twitter && (
                <a
                  href={article.authorSocials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <FaTwitter className="h-4 w-4" />
                </a>
              )}
              {article.authorSocials?.github && (
                <a
                  href={article.authorSocials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <FaGithub className="h-4 w-4" />
                </a>
              )}
              {article.authorSocials?.email && (
                <a
                  href={article.authorSocials.email}
                  aria-label="Email Author"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
              <a
                href="https://www.yesbe.tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Author Website"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{authorBio}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3 text-[11px] text-muted-foreground dark:border-slate-800">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              Published: <strong className="text-foreground">{formatDate(article.publishedDate)}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-primary" />
              Updated: <strong className="text-foreground">{formatDate(article.updatedDate)}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
