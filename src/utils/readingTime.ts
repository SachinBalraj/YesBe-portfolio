/**
 * Automatic Reading Time & Word Count Utility for YesBe Knowledge Center
 * Calculates reading duration based on standard 200 words per minute.
 */

export interface ReadingTimeResult {
  minutes: number;
  words: number;
  text: string;
}

export function calculateReadingTime(content: string, wpm = 200): ReadingTimeResult {
  if (!content || !content.trim()) {
    return {
      minutes: 1,
      words: 0,
      text: "1 min read",
    };
  }

  // Strip code blocks, inline code, images, links, HTML tags, markdown headings & bullets
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/#+\s/g, "")
    .replace(/[-*+]\s/g, "")
    .trim();

  const words = cleanContent.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  const text = `${minutes} min read`;

  return {
    minutes,
    words,
    text,
  };
}
