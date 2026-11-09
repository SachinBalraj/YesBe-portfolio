import type { KnowledgeFAQ } from "@/knowledge/types";

function cleanText(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/[\r\n]/g, " ")
    .trim();
}

function splitKeywords(keywords: string[]) {
  return Array.from(
    new Set(
      keywords
        .flatMap((keyword) => keyword.split(/[,\/|]/g))
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    ),
  );
}

function formatAnswer(text: string): string {
  return cleanText(text).replace(/\s+/g, " ");
}

export function generateFAQs(articleTitle: string, keywords: string[] = []): KnowledgeFAQ[] {
  const cleanedTitle = cleanText(articleTitle);
  const normalizedKeywords = splitKeywords(keywords).slice(0, 5);

  const questions: string[] = [
    `What is ${cleanedTitle}?`,
    `Why is ${cleanedTitle} important for businesses?`,
    `How does ${cleanedTitle} work?`,
    `What are the benefits of ${cleanedTitle}?`,
    `Who should use ${cleanedTitle}?`,
  ];

  normalizedKeywords.forEach((keyword) => {
    const question = keyword.toLowerCase().includes(cleanedTitle.toLowerCase())
      ? `What should I know about ${keyword}?`
      : `How does ${keyword} relate to ${cleanedTitle}?`;
    questions.push(question);
  });

  if (normalizedKeywords.length > 0) {
    questions.push(`What are the top use cases for ${normalizedKeywords[0]}?`);
  }

  questions.push(`How can companies get started with ${cleanedTitle}?`);

  const uniqueQuestions = Array.from(new Set(questions)).slice(0, 8);

  return uniqueQuestions.map((question) => ({
    question,
    answer: formatAnswer(
      `In short, ${question.replace(/^(What|Why|How|Who|Does|Can|Is)/i, "").trim()} helps businesses improve their results by using proven strategies, tools, and workflows that match their goals.`,
    ),
  }));
}
