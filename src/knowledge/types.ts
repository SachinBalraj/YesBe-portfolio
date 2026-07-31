export interface KnowledgeFAQ {
  question: string;
  answer: string;
}

export interface Article {
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  contentType: 'Article' | 'Guide' | 'Case Study';
  author: string;
  authorRole: string;
  authorImage?: string;
  authorBio?: string;
  authorSocials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  publishedDate: string;
  updatedDate: string;
  readingTime: number;
  readingTimeText: string;
  wordCount?: number;
  featuredImage: string;
  excerpt: string;
  tags: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  popular: boolean;
  featured: boolean;
  keyTakeaways: string[];
  faq: KnowledgeFAQ[];
  body: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface KnowledgeCategory {
  name: string;
  slug: string;
  aliases?: string[];
  description: string;
  iconName?: string;
  solutionCtaText?: string;
  solutionCtaHref?: string;
  subTopicFilters?: string[];
  seoTitle?: string;
  metaDescription?: string;
  faq?: KnowledgeFAQ[];
}
