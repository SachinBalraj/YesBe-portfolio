import type { KnowledgeFAQ } from "@/knowledge/types";

const fallbackAnswers: Record<string, string> = {
  ai: "AI helps businesses automate routine work, improve decision-making, and generate insights from data so teams can focus on strategic growth.",
  erp: "ERP is a unified software platform that streamlines finance, operations, inventory, sales, and customer management into a single system.",
  crm: "CRM helps businesses manage customer relationships, sales pipelines, and support workflows to improve retention and grow revenue.",
  seo: "SEO makes your website more visible in search engines by optimizing content, structure, and authority for relevant keywords.",
  powerbi: "Power BI turns business data into interactive reports and dashboards so teams can monitor performance and make smarter decisions.",
  automation: "Automation uses software to handle repetitive tasks, reduce errors, and accelerate workflows across marketing, sales, and operations.",
};

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
        .flatMap((keyword) => keyword.split(/[,\/\|]/gi))
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    ),
  );
}

function formatAnswer(text: string): string {
  return cleanText(text).replace(/\s+/g, " ");
}

function shortAnswer(question: string, topic: string): string {
  const lowerTopic = topic.toLowerCase();

  switch (lowerTopic) {
    case "ai":
    case "artificial intelligence":
      return "AI helps businesses automate workflows, generate insights, and personalize customer experiences with smarter software.";
    case "erp":
      return "ERP integrates business functions like finance, operations, and inventory into one platform to improve efficiency and visibility.";
    case "crm":
      return "CRM organizes customer data, sales activities, and communication to help teams close deals and improve relationships.";
    case "power bi":
    case "powerbi":
      return "Power BI creates interactive dashboards and reports so businesses can monitor data and make faster decisions.";
    case "seo":
      return "SEO improves how your website appears in search results by optimizing content, keywords, and technical structure.";
    default:
      return fallbackAnswers[lowerTopic] ?? `This helps businesses use ${topic} more effectively to improve productivity and decision-making.`;
  }
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
