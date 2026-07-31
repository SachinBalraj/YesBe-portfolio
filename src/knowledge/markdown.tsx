import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import type { Heading } from "./types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const renderer = new marked.Renderer();

renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const id = slugify(text);
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

renderer.link = function ({ href, title, tokens }) {
  const text = this.parser.parseInline(tokens);
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return `<a href="${href}" title="${title ?? ""}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  }
  return `<a href="${href}" title="${title ?? ""}">${text}</a>`;
};

marked.use({ renderer, gfm: true, breaks: true });

export function renderMarkdown(markdown: string): string {
  const rawHtml = marked.parse(markdown, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ["id"],
    USE_PROFILES: { html: true },
  });
}

export function getHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const seen = new Set<string>();
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]);
    const id = match[2];
    const text = match[3]
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
    if (!text) continue;
    let uniqueId = id;
    let counter = 2;
    while (seen.has(uniqueId)) {
      uniqueId = `${id}-${counter++}`;
    }
    seen.add(uniqueId);
    headings.push({ id: uniqueId, text, level });
  }
  return headings;
}

export function Markdown({ markdown }: { markdown: string }) {
  const html = useMemo(() => renderMarkdown(markdown), [markdown]);
  return (
    <div
      className="prose-yesbe"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
