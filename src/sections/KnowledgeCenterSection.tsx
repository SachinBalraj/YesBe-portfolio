import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Clock, ArrowRight, Share2, BookOpen, Tag,
  Cpu, Globe, BarChart3, Workflow, Brain, Building2, MessageCircle, ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/animations";
import { SITE_CONFIG } from "@/constants";

/* ─── Article Data ─── */

interface Article {
  id: string;
  title: string;
  category: string;
  filter: string;
  readTime: string;
  icon: LucideIcon;
  description: string;
  featured?: boolean;
  lastUpdated: string;
  publishedDate: string;
  author: string;
  keywords: string[];
  faq: { question: string; answer: string }[];
  content: {
    intro: string;
    problem: string;
    explanation: string;
    examples: string[];
    benefits: string[];
    bestPractices: string[];
    commonMistakes: string[];
    conclusion: string;
    cta: string;
  };
  toc: string[];
}

const articles: Article[] = [
  {
    id: "ai-for-business",
    title: "AI for Business",
    category: "Artificial Intelligence",
    filter: "AI",
    readTime: "6 min",
    icon: Brain,
    featured: true,
    description: "Discover how AI, automation, and intelligent assistants can reduce costs and improve business efficiency.",
    lastUpdated: "July 2026",
    publishedDate: "July 10, 2026",
    author: "Sachin Balraj",
    keywords: ["AI for business", "artificial intelligence", "business automation", "AI chatbots", "machine learning"],
    faq: [
      { question: "How much does it cost to implement AI in a small business?", answer: "Costs vary widely depending on the use case. Simple AI chatbots can cost as little as $50–200/month, while custom ML solutions may require $5,000–20,000 upfront. The key is starting with a high-impact, low-cost use case like a customer support chatbot." },
      { question: "Can AI replace employees in my business?", answer: "AI is best used to augment human work, not replace it. It handles repetitive, time-consuming tasks so your team can focus on strategy, creativity, and relationship-building. Most businesses find AI frees up employee time rather than eliminating roles." },
      { question: "How long does it take to see ROI from AI?", answer: "Many businesses see measurable ROI within 3–6 months for simple automations like chatbots and data processing. More complex AI implementations may take 6–12 months to show full returns, but quick wins are common from day one." },
      { question: "Do I need technical expertise to use AI?", answer: "Not necessarily. Many AI tools are no-code or low-code, meaning anyone can set them up. For more advanced use cases, working with an AI development partner can bridge the technical gap." },
    ],
    toc: ["Introduction", "The Business Problem", "What AI Can Do for Businesses", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "AI tools are no longer just for tech giants. Businesses of every size can use them to cut costs and work smarter.",
      problem: "Most businesses spend hours on repetitive tasks — manual data entry, slow reporting, support teams answering the same questions. The cost of not using AI shows up in lost time and missed opportunities.",
      explanation: "AI for business covers natural language processing, machine learning, and automation — applied to specific functions. An AI chatbot handles queries 24/7. Analytics tools spot trends before humans do. Invoice processing happens automatically. The key: apply AI where speed, accuracy, or scale matters more than manual judgment.",
      examples: [
        "A retail store uses AI to predict demand and automatically reorder stock before items run out, reducing lost sales by 30%.",
        "A healthcare clinic deploys an AI chatbot to triage patient symptoms before appointments, reducing no-shows and improving doctor efficiency.",
        "A restaurant chain uses AI-powered analytics to optimize menu pricing based on ingredient costs, seasonality, and customer preferences.",
        "A financial firm automates compliance checking with AI, reducing audit preparation time from two weeks to two days.",
      ],
      benefits: [
        "Reduce operational costs by 20–40% through task automation",
        "Improve customer response times from hours to seconds",
        "Make data-driven decisions with real-time AI analytics",
        "Scale operations without proportionally increasing headcount",
        "Minimize human error in repetitive processes",
        "Gain competitive advantage through faster innovation cycles",
      ],
      bestPractices: [
        "Start with a single high-impact use case rather than trying to transform everything at once.",
        "Ensure your data is clean and well-structured before deploying AI — garbage in, garbage out.",
        "Set clear measurable goals: what does success look like? (e.g., reduce support tickets by 50%)",
        "Involve end-users early in the process to ensure adoption and identify edge cases.",
        "Plan for ongoing maintenance — AI models need retraining as business data evolves.",
      ],
      commonMistakes: [
        "Adopting AI without a clear business problem to solve — AI is a tool, not a strategy.",
        "Expecting AI to replace human judgment entirely — the best results come from human-AI collaboration.",
        "Ignoring data privacy and compliance requirements when deploying AI on customer data.",
        "Skipping the pilot phase and going straight to full-scale deployment.",
      ],
      conclusion: "AI is the most practical business tool of this decade. Start with one repetitive, time-consuming process, and explore how AI can improve it.",
      cta: "Ready to explore AI for your business? Let's discuss your use case.",
    },
  },
  {
    id: "what-is-erp",
    title: "What is ERP?",
    category: "Business Software",
    filter: "ERP",
    readTime: "5 min",
    icon: Building2,
    description: "Learn how ERP systems streamline operations, automate workflows, and improve productivity for businesses of all sizes.",
    lastUpdated: "July 2026",
    publishedDate: "July 12, 2026",
    author: "YesBe Team",
    keywords: ["ERP", "enterprise resource planning", "business management software", "ERP system", "school ERP", "hospital ERP"],
    faq: [
      { question: "How long does an ERP implementation take?", answer: "A typical ERP implementation takes 3–6 months for small-to-medium businesses, and 6–18 months for larger enterprises. The timeline depends on the complexity of your processes, the amount of data to migrate, and how much customization is required." },
      { question: "Is ERP only for large companies?", answer: "No. Cloud-based ERP solutions are designed for businesses of all sizes. Many ERP vendors offer affordable plans for small businesses and startups, with modular pricing so you only pay for what you need." },
      { question: "What is the difference between ERP and CRM?", answer: "ERP (Enterprise Resource Planning) manages core business operations — inventory, accounting, HR, and procurement. CRM (Customer Relationship Management) focuses specifically on managing customer interactions, sales pipelines, and marketing. Many modern ERP systems include built-in CRM modules." },
      { question: "Can ERP be customized for my specific industry?", answer: "Yes. Most modern ERP systems offer industry-specific modules or can be customized through configuration and extensions. For example, school ERPs handle student records and fees, while hospital ERPs manage patient records and pharmacy inventory." },
    ],
    toc: ["Introduction", "The Business Problem", "What ERP Actually Does", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "ERP connects your core business processes — inventory, billing, HR, accounting — into one system. No more juggling spreadsheets and disconnected tools.",
      problem: "Without ERP, data lives in silos. Sales uses one tool, accounting another, inventory lives in a spreadsheet. Information falls through the cracks and reporting takes hours of manual work.",
      explanation: "An ERP centralizes all business data. Make a sale, inventory updates. Hit a threshold, purchase orders generate. Receive payment, accounting updates in real-time. Modules can be customized for schools, hospitals, retail, and more.",
      examples: [
        "A school with 2,000 students replaced five spreadsheets with one ERP — fee collection went from 3 days to 2 hours per month.",
        "A hospital cut medication errors by 40% with an ERP-connected pharmacy module.",
        "A retail chain with 12 stores unified inventory through ERP, eliminating stockouts that cost ₹5 lakhs annually.",
      ],
      benefits: [
        "Eliminate data silos and create a single source of truth",
        "Automate repetitive processes like invoicing and reordering",
        "Generate real-time reports without manual data compilation",
        "Reduce errors caused by duplicate data entry",
        "Improve cross-department collaboration and visibility",
        "Scale operations without adding administrative overhead",
      ],
      bestPractices: [
        "Map your existing workflows before implementing ERP to identify what needs to change.",
        "Start with core modules (inventory, billing, reporting) and expand gradually.",
        "Invest in training — an ERP is only as good as the people using it.",
        "Choose a customizable solution rather than forcing your business into generic software.",
      ],
      commonMistakes: [
        "Choosing a generic off-the-shelf ERP that doesn't fit your specific industry workflows.",
        "Attempting to migrate all data and processes simultaneously instead of phasing the rollout.",
        "Ignoring employee resistance and failing to provide adequate training.",
      ],
      conclusion: "ERP is more than software — it's how you eliminate inefficiency and make smarter decisions. Whether you run a school, hospital, or enterprise, it's the foundation for scaling.",
      cta: "Need an ERP built for your workflows? Let's design one.",
    },
  },
  {
    id: "seo-vs-geo-vs-aeo",
    title: "SEO vs GEO vs AEO",
    category: "Digital Marketing",
    filter: "SEO",
    readTime: "7 min",
    icon: Globe,
    description: "Understand the differences between Search Engine Optimization, Generative Engine Optimization, and Answer Engine Optimization.",
    lastUpdated: "July 2026",
    publishedDate: "July 8, 2026",
    author: "Sachin Balraj",
    keywords: ["SEO", "GEO", "AEO", "search engine optimization", "generative engine optimization", "answer engine optimization"],
    faq: [
      { question: "Is traditional SEO still important in 2026?", answer: "Absolutely. While AI search is growing, Google still handles billions of searches daily. Traditional SEO drives the majority of organic traffic and remains the foundation of any comprehensive digital visibility strategy." },
      { question: "How do I optimize for ChatGPT and Perplexity?", answer: "Focus on creating structured, factual content with clear entity signals. Use schema markup, FAQ sections, and authoritative statements. Ensure your business information is consistent across the web. AI models pull from sources they trust, so building domain authority matters." },
      { question: "What is the biggest difference between SEO and GEO?", answer: "SEO optimizes for ranking in search engine results pages (SERPs). GEO optimizes for being recommended by AI language models when users ask questions. SEO is about links and rankings; GEO is about being cited as an authoritative source by AI." },
      { question: "Can one strategy cover all three (SEO, GEO, AEO)?", answer: "While a unified content strategy helps, each discipline requires specific techniques. The best approach is creating high-quality, structured content that serves all three, then layering on discipline-specific optimizations like schema markup for AEO and entity signals for GEO." },
    ],
    toc: ["Introduction", "The Business Problem", "Understanding SEO, GEO, and AEO", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "The way people find businesses online is changing. SEO alone isn't enough anymore. GEO targets AI search engines, AEO targets voice and featured snippets. You need all three.",
      problem: "Most businesses only invest in traditional SEO. But users now ask ChatGPT for recommendations, Siri for nearby services, and Google AI Overviews for answers. Businesses optimizing only for Google are losing ground.",
      explanation: "SEO focuses on ranking higher in Google's organic results through technical optimization, content quality, backlinks, and keyword strategy. GEO optimizes your content so AI language models — ChatGPT, Gemini, Perplexity, Microsoft Copilot — recommend your business when users ask relevant questions. GEO requires structured, factual content with clear entity signals, FAQ schemas, and authoritative statements. AEO structures your content to provide direct, concise answers that appear in Google Featured Snippets, voice assistant responses, and AI summaries. AEO uses question-based headings, FAQ schemas, and concise factual paragraphs.",
      examples: [
        "A restaurant that optimized for GEO now appears when users ask ChatGPT 'best restaurants in Salem for dinner'.",
        "A law firm that implemented AEO strategies saw its FAQ content appear in Google's Featured Snippets, increasing organic traffic by 60%.",
        "An e-commerce store combining all three approaches — SEO, GEO, and AEO — achieved 3x more organic visibility within six months.",
      ],
      benefits: [
        "Capture traffic from traditional Google searches (SEO)",
        "Get recommended by AI chatbots when users ask relevant questions (GEO)",
        "Appear in voice assistant responses and featured snippets (AEO)",
        "Build authority and trust across all search platforms",
        "Future-proof your digital presence against evolving search behavior",
        "Reach customers at every stage of the buying journey",
      ],
      bestPractices: [
        "Create structured, factual content that directly answers common customer questions.",
        "Implement FAQ schema markup on your website for SEO and AEO benefits.",
        "Use clear entity signals — mention your business name, location, and services consistently.",
        "Write content that AI models can easily parse: clear headings, concise answers, authoritative tone.",
        "Monitor your visibility across Google, ChatGPT, and Perplexity to track GEO performance.",
      ],
      commonMistakes: [
        "Ignoring GEO entirely because 'SEO is enough' — AI search is growing rapidly.",
        "Writing content for robots instead of humans — both SEO and GEO reward quality content.",
        "Neglecting technical SEO fundamentals while focusing only on new trends.",
        "Creating thin content that doesn't provide real value — search engines and AI models both penalize this.",
      ],
      conclusion: "The future is all three working together. SEO drives organic traffic. GEO gets you recommended by AI. AEO captures voice and snippets. Master all three and you dominate.",
      cta: "Want to optimize for Google, AI, and voice search? Let's build a strategy.",
    },
  },
  {
    id: "power-bi-guide",
    title: "Power BI Guide",
    category: "Data Analytics",
    filter: "Power BI",
    readTime: "6 min",
    icon: BarChart3,
    description: "Learn how Power BI dashboards transform raw business data into actionable insights and executive reports.",
    lastUpdated: "July 2026",
    publishedDate: "July 14, 2026",
    author: "YesBe Team",
    keywords: ["Power BI", "business intelligence", "data analytics", "dashboards", "data visualization", "KPI tracking"],
    faq: [
      { question: "How much does Power BI cost?", answer: "Power BI Desktop is free for individual use. Power BI Pro costs $10/user/month and enables sharing and collaboration. Power BI Premium starts at $20/user/month for advanced features like larger model sizes, AI capabilities, and dedicated capacity." },
      { question: "Can Power BI connect to my existing data sources?", answer: "Yes. Power BI connects to 100+ data sources including Excel, SQL Server, MySQL, PostgreSQL, Google Analytics, Salesforce, SAP, and many cloud services. If you have data, Power BI can likely connect to it." },
      { question: "Do I need coding skills to use Power BI?", answer: "No coding skills are required for basic dashboard creation. Power BI uses a drag-and-drop interface for visualizations. For advanced calculations, you can use DAX (Data Analysis Expressions), which has a learnable formula syntax." },
      { question: "How is Power BI different from Excel?", answer: "Excel is great for ad-hoc analysis and small datasets. Power BI is designed for ongoing business intelligence — it connects live to data sources, creates interactive dashboards, enables drill-down exploration, and automatically refreshes data. Think of Power BI as Excel on steroids for reporting." },
    ],
    toc: ["Introduction", "The Business Problem", "What Power BI Does", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "Power BI turns raw data from multiple sources into interactive dashboards and real-time reports — one view of your business performance.",
      problem: "Data scattered across spreadsheets, CRMs, accounting tools, and analytics platforms. Generating a report means exporting from each, manually combining, and creating charts that are outdated before sharing.",
      explanation: "Power BI connects to all your data sources and creates live dashboards that update automatically. A CEO sees real-time revenue on one screen. An operations manager tracks inventory across warehouses. A marketing team monitors campaign performance by channel and time period. The DAX formula language allows custom calculations, and Power BI Service enables scheduled email delivery and mobile access.",
      examples: [
        "A manufacturing company consolidated 8 data sources into a single Power BI dashboard, reducing monthly reporting from 3 days to 15 minutes.",
        "A retail chain uses Power BI to track real-time sales across 20 stores, enabling same-day restocking decisions that reduced stockouts by 35%.",
        "A professional services firm built a project profitability dashboard that identified underperforming projects, improving margins by 18%.",
      ],
      benefits: [
        "Real-time visibility into business performance across all departments",
        "Automated report generation and email delivery — no manual work",
        "Interactive drill-down capabilities for root cause analysis",
        "Mobile access for decision-makers on the go",
        "Reduced dependency on IT teams for report generation",
        "Data-driven culture that improves decision-making speed and accuracy",
      ],
      bestPractices: [
        "Start with 3–5 key KPIs that directly impact business decisions before building comprehensive dashboards.",
        "Design for your audience — executives need high-level summaries, managers need drill-down capability.",
        "Use consistent color coding and naming conventions across all dashboards.",
        "Implement row-level security to ensure users only see data relevant to their role.",
        "Schedule regular data refreshes so dashboards always show current information.",
      ],
      commonMistakes: [
        "Building dashboards with too many visualizations — clutter reduces clarity and impact.",
        "Ignoring data quality — dashboards built on dirty data produce misleading insights.",
        "Focusing on fancy visuals instead of actionable insights that drive decisions.",
        "Not training users on how to interact with and interpret the dashboards.",
      ],
      conclusion: "Power BI is the fastest path from raw data to actionable insights. Whether you're tracking financial performance, supply chain efficiency, or campaign ROI, it gives you the real-time visibility to make better decisions.",
      cta: "Ready to turn your data into insights? Let's build your Power BI dashboards.",
    },
  },
  {
    id: "rag-implementation",
    title: "RAG Implementation",
    category: "Artificial Intelligence",
    filter: "RAG",
    readTime: "8 min",
    icon: Cpu,
    description: "Explore how Retrieval-Augmented Generation improves chatbot accuracy using your organization's own knowledge base.",
    lastUpdated: "July 2026",
    publishedDate: "July 16, 2026",
    author: "Sachin Balraj",
    keywords: ["RAG", "retrieval augmented generation", "AI chatbot", "knowledge base", "LangChain", "vector database"],
    faq: [
      { question: "What types of documents can RAG work with?", answer: "RAG systems can ingest PDFs, Word documents, Excel files, HTML pages, markdown files, database records, and more. The key requirement is that the content is text-based. Images and videos need to be transcribed or described before RAG can use them." },
      { question: "How accurate are RAG chatbots?", answer: "RAG chatbots are significantly more accurate than standard AI because they retrieve specific source documents before answering. With a well-maintained knowledge base and proper similarity thresholds, RAG systems can achieve 85–95% accuracy on domain-specific questions." },
      { question: "Is RAG better than fine-tuning an AI model?", answer: "RAG is generally better for knowledge-heavy use cases where information changes frequently. Fine-tuning is better for changing the AI's behavior or tone. Many organizations use both — fine-tuning for style and RAG for knowledge. RAG is also more cost-effective because it doesn't require retraining models." },
      { question: "How much does it cost to build a RAG system?", answer: "A basic RAG system using open-source tools can be built for $200–500/month in infrastructure costs. Enterprise-grade solutions with advanced features like multi-tenant access and compliance typically cost $1,000–5,000/month. The main variable is the volume of queries and documents." },
    ],
    toc: ["Introduction", "The Business Problem", "How RAG Works", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "RAG connects AI models to your own documents and knowledge base, giving accurate, context-aware answers instead of generic responses.",
      problem: "Standard AI chatbots give generic answers — they only know what they learned during training. When someone asks about your specific product or policy, they either guess or say 'I don't know.' Teams waste hours searching for answers that should be instantly available.",
      explanation: "RAG works in three steps: documents are processed into vector embeddings and stored; when a question comes in, the system finds the most relevant chunks using semantic similarity; those chunks are passed to a language model as context to generate an accurate answer. The result: an AI assistant that knows your business.",
      examples: [
        "An enterprise deployed a RAG chatbot that answers HR policy questions, reducing internal support tickets by 70% and saving 200 hours per month.",
        "A legal firm built a RAG system over 10,000 case documents, enabling lawyers to find relevant precedents in seconds instead of hours.",
        "A SaaS company created a RAG-powered support bot that handles 80% of customer queries without human intervention, with source-linked answers.",
        "A hospital implemented a RAG system for medical staff to instantly access treatment protocols and drug interaction guidelines.",
      ],
      benefits: [
        "Provide accurate, source-linked answers instead of AI hallucinations",
        "Reduce support workload by 60–80% with intelligent automation",
        "Enable 24/7 knowledge access for employees, customers, or partners",
        "Onboard new team members faster with instant institutional knowledge",
        "Maintain data privacy — RAG uses your data without sending it to external training sets",
        "Scale knowledge management without proportionally increasing support staff",
      ],
      bestPractices: [
        "Start with your most frequently asked questions and the documents that answer them.",
        "Implement a confidence threshold — if similarity is below 0.75, the system should say 'I don't know' rather than guess.",
        "Always include source attribution so users can verify answers against original documents.",
        "Regularly update your document index as policies, products, and information change.",
        "Test with real user queries to identify gaps in your knowledge base.",
      ],
      commonMistakes: [
        "Ingesting documents without cleaning or structuring them — messy input produces messy output.",
        "Not implementing source attribution — users won't trust answers they can't verify.",
        "Expecting RAG to work perfectly on day one — it needs iteration and fine-tuning.",
        "Ignoring document access controls — sensitive information should only be retrievable by authorized users.",
      ],
      conclusion: "RAG is the bridge between generic AI and a truly intelligent business assistant. Grounded in your actual data, it provides accurate, trustworthy answers that improve customer experience and productivity.",
      cta: "Want a RAG-powered assistant for your business? Let's design one.",
    },
  },
  {
    id: "business-automation",
    title: "Business Automation",
    category: "Business Solutions",
    filter: "Business Automation",
    readTime: "5 min",
    icon: Workflow,
    description: "See how automation reduces manual work, increases productivity, and improves customer experience.",
    lastUpdated: "July 2026",
    publishedDate: "July 11, 2026",
    author: "YesBe Team",
    keywords: ["business automation", "workflow automation", "process automation", "productivity", "efficiency"],
    faq: [
      { question: "What processes should I automate first?", answer: "Start with high-volume, repetitive tasks that consume significant time but require minimal judgment. Common first targets include data entry, email follow-ups, appointment scheduling, invoice processing, and report generation. These typically deliver the fastest ROI." },
      { question: "Will automation eliminate jobs?", answer: "Automation typically transforms jobs rather than eliminating them. Employees who previously spent hours on manual data entry are freed up for higher-value work like analysis, strategy, and customer relationships. Most businesses find they need the same or more people — just doing different, more valuable work." },
      { question: "How much does business automation cost?", answer: "Costs range from $0 for simple no-code automations using tools like Zapier or Make ($20–100/month) to $10,000+ for custom enterprise workflow systems. The key metric is ROI — most automation projects pay for themselves within 3–6 months through time savings and error reduction." },
      { question: "Can automation work with my existing software?", answer: "Most modern automation tools integrate with popular software through APIs and pre-built connectors. Platforms like Zapier, Make (formerly Integromat), and n8n connect to thousands of apps. Custom integrations can bridge gaps for specialized software." },
    ],
    toc: ["Introduction", "The Business Problem", "What Business Automation Includes", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "Business automation replaces repetitive manual tasks with systems that work 24/7 without errors — freeing your team for high-value work.",
      problem: "Every business has time-consuming tasks that need little judgment — data entry, email follow-ups, invoicing, scheduling, report generation. They eat into productive hours, introduce errors, and create bottlenecks when key people are away.",
      explanation: "Business automation covers three layers: task automation handles individual actions like sending emails or updating spreadsheets. Workflow automation chains tasks together — order received → inventory updates → confirmation sent → warehouse notified. Intelligent automation uses AI to make decisions within workflows — routing queries to the right department or flagging anomalies.",
      examples: [
        "An accounting firm automated invoice processing, reducing processing time from 45 minutes per invoice to 3 minutes with 99.5% accuracy.",
        "A clinic automated appointment scheduling and reminders, reducing no-shows by 45% and freeing up 10 hours of receptionist time weekly.",
        "An e-commerce business automated order fulfillment — from payment confirmation to shipping label generation — eliminating 3 full-time positions worth of manual work.",
        "A consulting firm automated weekly client reporting, saving 20 hours per month and delivering reports 2 days faster.",
      ],
      benefits: [
        "Reduce operational costs by eliminating manual labor for routine tasks",
        "Minimize human error in data entry, calculations, and processing",
        "Improve response times — automated systems respond in seconds, not hours",
        "Enable 24/7 operations without increasing staff",
        "Free up employees for strategic, creative, and high-value work",
        "Create consistent, auditable processes that scale with business growth",
      ],
      bestPractices: [
        "Map your current processes end-to-end before automating — you can't automate what you don't understand.",
        "Start with the highest-volume, most time-consuming processes for maximum ROI.",
        "Build in exception handling — automation should gracefully handle edge cases, not fail silently.",
        "Monitor automated processes regularly and optimize based on performance data.",
        "Involve the people who currently do the work — they know the edge cases and pain points best.",
      ],
      commonMistakes: [
        "Automating a broken process instead of fixing it first — automation amplifies inefficiency.",
        "Over-automating without human oversight — some decisions still need human judgment.",
        "Not testing edge cases — automation fails when it encounters unexpected scenarios.",
        "Ignoring change management — employees need training and context to trust automated systems.",
      ],
      conclusion: "Business automation amplifies human potential. By eliminating routine work, your team focuses on strategy, creativity, and relationships — operating faster and more accurately.",
      cta: "Ready to automate your processes? Let's find the highest-impact opportunities.",
    },
  },
  {
    id: "web-dev-tech-stack",
    title: "Website Development: Choosing the Right Tech Stack",
    category: "Web Development",
    filter: "Web Dev",
    readTime: "6 min",
    icon: Globe,
    featured: false,
    description: "A practical guide to choosing the best technology stack for your website — from React and Next.js to WordPress.",
    lastUpdated: "July 2026",
    publishedDate: "July 18, 2026",
    author: "Sachin Balraj",
    keywords: ["web development", "technology stack", "React", "Node.js", "frontend", "backend", "Next.js", "WordPress"],
    faq: [
      { question: "Should I use WordPress or a custom-built website?", answer: "WordPress is ideal for content-heavy sites like blogs, portfolios, and small business websites where you want easy content management. Custom-built solutions using React, Next.js, or similar frameworks are better for web applications, complex functionality, performance-critical sites, or when you need full control over the user experience." },
      { question: "What is the best tech stack for a startup MVP?", answer: "For most startups, React or Next.js on the frontend with Node.js or Python on the backend offers the fastest development speed, largest talent pool, and best scalability. If you need a simple CMS, WordPress with a headless setup or Webflow can get you to market in weeks rather than months." },
      { question: "How do I choose between React and Next.js?", answer: "React is a library for building UI components. Next.js is a full framework built on React that adds server-side rendering, static generation, API routes, and built-in optimizations. For new projects, Next.js is usually the better choice because it provides more features out of the box and better performance." },
      { question: "What tech stack should I use for an e-commerce store?", answer: "For small stores, Shopify or WooCommerce provide ready-made solutions. For custom e-commerce, Next.js with a headless CMS (like Contentful or Sanity) paired with Stripe for payments and a database like PostgreSQL gives you full control over the shopping experience while leveraging proven infrastructure." },
    ],
    toc: ["Introduction", "The Problem", "Understanding Tech Stacks", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "Your tech stack determines development speed, performance, scalability, and maintenance costs. Choosing the right one doesn't have to be overwhelming.",
      problem: "Many businesses choose tech based on trends rather than requirements. A restaurant spends $20K on React when WordPress would cost $3K and serve them better. A SaaS startup hits a wall on WordPress when they need real-time features. Wrong stacks create technical debt that compounds over time.",
      explanation: "A tech stack combines the technologies that build and run a web application. Frontend (what users see): React, Vue, Angular. Backend (server logic): Node.js, Python, PHP. Database: MySQL, PostgreSQL, MongoDB. Additional layers: hosting (Vercel, AWS), CMS (Contentful, Strapi), payments (Stripe, Razorpay). Each layer trades off speed, cost, flexibility, and maintainability.",
      examples: [
        "A local bakery needed an online ordering system. WordPress with WooCommerce launched in 2 weeks for under $5,000, handling 200+ orders monthly with zero technical issues.",
        "A SaaS startup built their MVP with Next.js and PostgreSQL, deploying to Vercel. They reached 10,000 users in 6 months and scaled seamlessly without architecture changes.",
        "An e-commerce brand with 50,000 products migrated from a custom PHP backend to Next.js with a headless CMS, reducing page load time from 4.2s to 0.8s and increasing conversions by 23%.",
        "A healthcare platform chose React + Node.js + MongoDB for their patient portal, enabling real-time appointment scheduling and secure document sharing across 15 clinics.",
      ],
      benefits: [
        "Faster development and time-to-market with the right framework",
        "Better performance and user experience for your customers",
        "Lower maintenance and hosting costs with proven technologies",
        "Easier to hire developers and find community support",
        "Scalable architecture that grows with your business",
        "Reduced technical debt and refactoring costs down the line",
      ],
      bestPractices: [
        "Define your requirements before choosing a stack — features, scale, budget, and team expertise should drive the decision.",
        "Choose technologies with large communities and active maintenance — you'll need support and updates over time.",
        "Don't over-engineer for your current needs — build for the next 12–18 months, not forever.",
        "Prioritize developer experience and ecosystem — frameworks with good tooling accelerate development.",
        "Consider your team's existing skills — choosing a stack your team knows reduces risk and accelerates delivery.",
      ],
      commonMistakes: [
        "Choosing a tech stack based on hype rather than project requirements — not every app needs microservices.",
        "Over-engineering an MVP with complex architecture that should only come at scale.",
        "Ignoring performance implications — some frameworks are great for development speed but poor for runtime performance.",
        "Not planning for content management — even dynamic sites need a way for non-technical people to update content.",
        "Selecting a stack with a small talent pool — you'll struggle to hire and maintain the application long-term.",
      ],
      conclusion: "There's no single best tech stack — only the best one for your project, team, and goals. Focus on what users need, what your team can build and maintain, and what fits your budget.",
      cta: "Not sure which tech stack fits? Let's discuss and recommend the right one.",
    },
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing for Growing Businesses",
    category: "Cloud Computing",
    filter: "Cloud",
    readTime: "5 min",
    icon: Cpu,
    description: "Understand how cloud computing — AWS, Azure, and GCP — helps businesses scale infrastructure on demand.",
    lastUpdated: "July 2026",
    publishedDate: "July 19, 2026",
    author: "YesBe Team",
    keywords: ["cloud computing", "AWS", "Azure", "cloud migration", "SaaS", "infrastructure", "GCP"],
    faq: [
      { question: "What is the difference between IaaS, PaaS, and SaaS?", answer: "IaaS (Infrastructure as a Service) gives you virtual servers and networking — you manage everything else (e.g., AWS EC2). PaaS (Platform as a Service) gives you a platform to deploy apps without managing infrastructure (e.g., Heroku, Vercel). SaaS (Software as a Service) is ready-to-use software like Google Workspace or Salesforce — no management required." },
      { question: "Is cloud computing cheaper than owning servers?", answer: "For most small-to-medium businesses, yes. Cloud computing eliminates upfront hardware costs, reduces IT staff needs, and you only pay for what you use. However, at very large scale (millions in monthly spend), some companies find that dedicated servers or hybrid solutions become more cost-effective." },
      { question: "How do I migrate my existing application to the cloud?", answer: "Cloud migration typically follows these steps: assess your current infrastructure, choose a cloud provider, plan the migration strategy (lift-and-shift, re-platform, or re-architect), migrate data and applications, test thoroughly, and optimize. Many cloud providers offer free migration tools and partner programs to help." },
      { question: "Which cloud provider is best for a startup?", answer: "AWS offers the broadest service range and is ideal if you need specific services. Google Cloud Platform (GCP) excels in data analytics and machine learning. Microsoft Azure is best if you're already using Microsoft tools like Office 365. For startups, AWS and GCP both offer free tiers and startup credits worth $100,000+." },
    ],
    toc: ["Introduction", "The Problem", "Understanding Cloud Computing", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "Cloud computing lets businesses access servers, storage, and software over the internet — paying only for what they use and scaling instantly.",
      problem: "On-premise infrastructure needs significant upfront investment, ongoing maintenance, and months of planning for capacity changes. During traffic spikes, servers crash. During quiet periods, expensive hardware sits idle.",
      explanation: "Cloud computing has three service models: IaaS gives virtual servers and networking — you manage everything else (AWS EC2). PaaS gives a platform to deploy apps without managing infrastructure (Vercel, Heroku). SaaS delivers ready-to-use software (Google Workspace, Slack). Most businesses use a combination of all three.",
      examples: [
        "A growing SaaS startup deployed on AWS and scaled from 100 to 100,000 users over 18 months without any infrastructure downtime or manual server management.",
        "A retail company migrated from on-premise servers to Azure, reducing infrastructure costs by 45% and gaining 99.99% uptime with auto-scaling capabilities.",
        "A healthcare startup used GCP's BigQuery for data analytics, processing 50 million patient records in seconds that previously took hours on local servers.",
        "An e-commerce business deployed on Vercel (PaaS) and went from zero to handling Black Friday traffic without any infrastructure planning.",
      ],
      benefits: [
        "Pay only for what you use — no wasted capacity or idle hardware",
        "Scale instantly from 10 to 10,000,000 users without infrastructure changes",
        "99.99%+ uptime with managed redundancy and failover",
        "Global deployment — serve customers worldwide from edge locations",
        "Automatic updates and security patches from the cloud provider",
        "Reduced need for in-house IT staff and infrastructure management",
      ],
      bestPractices: [
        "Start with a cloud provider's free tier to test services before committing.",
        "Use managed services (databases, queues, caching) to reduce operational overhead.",
        "Implement proper access controls and IAM policies from day one — cloud security is shared responsibility.",
        "Monitor costs with cloud provider tools — set up alerts to prevent bill surprises.",
        "Design for failure — use multiple availability zones and implement retry logic.",
      ],
      commonMistakes: [
        "Lift-and-shift without optimization — moving servers to the cloud without adapting to cloud-native patterns.",
        "Ignoring cloud security best practices — misconfigured S3 buckets and open databases are the most common breaches.",
        "Not monitoring costs — cloud bills can spiral quickly without proper tagging, budgets, and alerts.",
        "Choosing the wrong instance types — over-provisioning wastes money, under-provisioning causes performance issues.",
      ],
      conclusion: "Cloud computing eliminates hardware costs, provides enterprise-grade reliability, and scales in real-time. It's not just a cost-saver — it's a competitive advantage that enables agility and global reach.",
      cta: "Ready to move to the cloud or optimize what you have? Let's build a strategy.",
    },
  },
  {
    id: "langchain-intro",
    title: "Introduction to LangChain for AI Applications",
    category: "Artificial Intelligence",
    filter: "LangChain",
    readTime: "7 min",
    icon: Brain,
    description: "Learn how LangChain simplifies building AI applications with LLMs, chains, agents, and tool integrations.",
    lastUpdated: "July 2026",
    publishedDate: "July 20, 2026",
    author: "Sachin Balraj",
    keywords: ["LangChain", "AI framework", "LLM", "chains", "agents", "prompt engineering", "OpenAI", "GPT"],
    faq: [
      { question: "Do I need to use LangChain to build AI applications?", answer: "No. LangChain is a framework that simplifies complex AI workflows, but you can build simple AI applications with direct API calls to OpenAI or other providers. LangChain becomes valuable when you need to chain multiple steps together, use tools and agents, manage prompts systematically, or integrate with external data sources." },
      { question: "What programming language does LangChain support?", answer: "LangChain is available in Python and JavaScript/TypeScript. The Python version is the most mature and widely used, but the JavaScript version (langchain.js) is excellent for web-based AI applications and Node.js backends." },
      { question: "How is LangChain different from just using the OpenAI API?", answer: "The OpenAI API lets you send prompts and get responses. LangChain adds layers on top: prompt templates for consistency, chains for multi-step workflows, agents that decide which tools to use, memory for conversation history, document loaders for RAG systems, and integrations with vector databases and APIs. It's the difference between raw ingredients and a complete kitchen." },
      { question: "Is LangChain production-ready?", answer: "LangChain is widely used in production by many companies. The library has matured significantly with stable APIs, good documentation, and active community support. However, like any rapidly evolving framework, staying updated with best practices and version changes is important." },
    ],
    toc: ["Introduction", "The Problem", "What LangChain Does", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "LangChain is an open-source framework that simplifies building AI applications with large language models — chaining prompts, connecting to data, using tools, and maintaining memory.",
      problem: "Building AI apps with raw LLM APIs gets complex fast: managing prompt templates, handling conversation history, retrieving documents, calling external APIs, managing errors, and maintaining context across turns. Developers spend more time on plumbing than features.",
      explanation: "LangChain provides modular components: prompt templates for consistency, chains for multi-step workflows, agents that decide which tools to use, memory for conversation history, and document loaders plus vector store integrations for RAG systems.",
      examples: [
        "A customer support system uses LangChain agents to route queries — checking the knowledge base first, then falling back to CRM lookup, and finally escalating to a human if confidence is low.",
        "A content team built a LangChain pipeline that researches topics by querying multiple APIs, summarizes findings, and drafts blog posts — reducing content production time by 70%.",
        "An internal tool uses LangChain chains to analyze sales calls — transcribing audio, extracting key points, updating the CRM, and generating follow-up emails in a single automated workflow.",
        "A legal tech startup built a LangChain RAG system that reads contract PDFs, answers natural language questions about terms, and flags risky clauses — saving lawyers 5 hours per contract review.",
      ],
      benefits: [
        "Modular architecture — reuse prompt templates, chains, and tools across multiple applications",
        "Built-in RAG support — document loaders, vector stores, and retrieval chains out of the box",
        "Agent framework — let AI decide which tools and data sources to use for each query",
        "Memory management — maintain conversation context across sessions and interactions",
        "Extensive integrations — connect to OpenAI, Anthropic, Google, Pinecone, ChromaDB, and hundreds more",
        "Active open-source community — rapid development, frequent updates, and extensive documentation",
      ],
      bestPractices: [
        "Start simple with basic chains before building complex agent systems — master the fundamentals first.",
        "Use prompt templates consistently across your application for predictable, maintainable outputs.",
        "Implement error handling and fallback logic — LLM calls can fail or return unexpected results.",
        "Cache frequent LLM calls to reduce costs and improve response times.",
        "Use LangSmith (or similar tools) for observability — track prompt performance, latency, and costs in production.",
      ],
      commonMistakes: [
        "Over-engineering with agents when a simple chain would suffice — agents add complexity and latency.",
        "Not testing prompts thoroughly — small changes in wording can dramatically affect output quality.",
        "Ignoring token costs — LangChain makes it easy to chain multiple LLM calls, which multiplies costs.",
        "Hardcoding model parameters instead of making them configurable for different environments and use cases.",
      ],
      conclusion: "LangChain removes the infrastructure complexity of building AI applications so you can focus on features. Whether you're building a RAG system, an intelligent agent, or conversational AI with memory, LangChain gets you to production faster.",
      cta: "Ready to build AI applications with LangChain? Let's design a solution for your needs.",
    },
  },
  {
    id: "professional-website",
    title: "Why Every Business Needs a Professional Website",
    category: "Digital Marketing",
    filter: "Digital Marketing",
    readTime: "4 min",
    icon: Globe,
    description: "Discover how a professional website builds credibility, generates leads, and drives business growth.",
    lastUpdated: "July 2026",
    publishedDate: "July 17, 2026",
    author: "YesBe Team",
    keywords: ["professional website", "business website", "web presence", "online credibility", "lead generation", "web design"],
    faq: [
      { question: "How much does a professional business website cost?", answer: "A professional business website typically costs between $2,000 and $15,000 depending on complexity. A simple brochure site with 5–10 pages costs $2,000–5,000. An e-commerce site with custom features costs $5,000–15,000. Monthly maintenance and hosting add $50–200/month. The investment typically pays for itself through increased leads and credibility." },
      { question: "Can't I just use social media instead of a website?", answer: "Social media is important for marketing, but you don't own your social media pages — algorithms change, accounts get restricted, and platforms shut down. A website is your digital home base that you fully control. It's also where most customers expect to find detailed information, pricing, and contact details before making a purchase decision." },
      { question: "How long does it take to build a website?", answer: "A simple business website takes 2–4 weeks from design to launch. An e-commerce site with custom features takes 4–8 weeks. Complex web applications can take 8–16 weeks. The timeline depends on the number of pages, custom functionality, content readiness, and how quickly feedback is provided during the design process." },
      { question: "Do I really need a website if I'm a small local business?", answer: "Yes. 97% of consumers search online for local businesses. If you don't have a website, you're invisible to the majority of potential customers who search before visiting. A professional website with Google Business integration ensures you appear in local search results and gives customers the information they need to choose you over competitors." },
    ],
    toc: ["Introduction", "The Problem", "What a Professional Website Delivers", "Real-World Examples", "Key Benefits", "Best Practices", "Common Mistakes to Avoid", "FAQ", "Conclusion"],
    content: {
      intro: "A professional website is your digital storefront — and with 97% of consumers searching online before buying, it's not optional.",
      problem: "Many businesses rely on social media, Google listings, or word-of-mouth. But algorithms limit your reach, listings provide minimal info, and word-of-mouth doesn't scale. Without a website, you lose credibility and miss organic search traffic.",
      explanation: "A professional website serves multiple functions: it establishes credibility, generates leads through forms and CTAs 24/7, improves SEO visibility, provides a centralized platform for all your content, and gives you full control over your brand narrative.",
      examples: [
        "A local plumbing company invested $3,500 in a professional website with lead capture forms. Within 3 months, they were generating 15 new leads per week from organic search, increasing revenue by 40%.",
        "A freelance designer who added a portfolio website with case studies doubled their average project value because clients could see the quality of work before contacting them.",
        "A restaurant that launched a website with online ordering saw 25% of total orders come through the website within the first month, reducing dependence on third-party delivery apps and their commission fees.",
        "A B2B consulting firm's new website with service pages and case studies increased inbound inquiries by 200% within 6 months, becoming their primary lead generation channel.",
      ],
      benefits: [
        "Establish instant credibility and trust with potential customers",
        "Generate leads and inquiries automatically, 24/7",
        "Rank higher in Google searches and attract organic traffic",
        "Control your brand narrative and customer experience",
        "Showcase your work, testimonials, and social proof",
        "Reduce dependence on social media algorithms and third-party platforms",
      ],
      bestPractices: [
        "Ensure your website is mobile-responsive — over 60% of web traffic comes from mobile devices.",
        "Include clear calls-to-action on every page — phone number, contact form, or 'Get a Quote' button.",
        "Optimize for local SEO — include your business name, address, and phone number consistently.",
        "Keep loading speed under 3 seconds — each additional second loses 7% of conversions.",
        "Update content regularly — fresh blog posts and case studies improve SEO and demonstrate expertise.",
      ],
      commonMistakes: [
        "Building a website with no clear call-to-action — visitors need to know what to do next.",
        "Ignoring mobile experience — a site that looks good on desktop but breaks on mobile loses most visitors.",
        "Using stock photos instead of real images — authentic imagery builds more trust than generic placeholders.",
        "Launching and never updating — an outdated website can be worse than no website at all.",
        "Prioritizing aesthetics over usability — beautiful design means nothing if visitors can't find what they need.",
      ],
      conclusion: "A professional website is the minimum requirement for doing business in 2026. It's your 24/7 salesperson, credibility badge, and lead generation engine in one.",
      cta: "Ready to build a website that converts? Let's design one that grows your business.",
    },
  },
];

const allFilters = [
  "All", "AI", "ERP", "Web Dev", "Analytics", "Power BI",
  "Business Automation", "Cloud", "Digital Marketing", "SEO",
  "GEO", "AEO", "RAG", "LangChain", "Case Studies",
];
const popularTags = ["AI", "React", "Node.js", "ERP", "Power BI", "MongoDB", "Cloud", "Automation", "SEO", "GEO", "AEO", "RAG", "LangChain", "OpenAI", "Web Development", "Data Analytics", "Business Intelligence", "Digital Marketing"];

/* ─── Article Modal ─── */

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  const Icon = article.icon;

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, [article]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm px-4 py-8 sm:py-12"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative w-full max-w-3xl rounded-3xl border border-white/40 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close + Share */}
        <div className="absolute top-5 right-5 z-10 flex gap-2">
          <div className="flex gap-2">
            <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors hover:bg-green-100" aria-label="Share on WhatsApp">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-colors hover:bg-blue-100" aria-label="Share on Twitter">
              <ExternalLink className="h-4 w-4" />
            </a>
            <button onClick={handleShare} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-[#f1f5f9] hover:text-primary" aria-label="Copy link">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-[#f1f5f9] hover:text-foreground" aria-label="Close article">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Banner */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="absolute bottom-6 left-6 right-16 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-semibold text-white backdrop-blur">{article.category}</span>
              <h3 className="mt-1 text-2xl font-bold text-white">{article.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>By <strong className="text-foreground">{article.author}</strong></span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{article.readTime} read</span>
            <span>{article.publishedDate}</span>
            <span>Updated {article.lastUpdated}</span>
          </div>

          {/* TOC */}
          <div className="rounded-2xl border border-white/40 bg-muted p-5">
            <h4 className="mb-3 text-sm font-bold text-foreground">Table of Contents</h4>
            <ul className="space-y-1.5">
              {article.toc.map((item, i) => (
                <li key={item} className="text-[13px] text-primary cursor-pointer hover:underline">
                  {i + 1}. {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Content sections */}
          <ContentBlock heading="Introduction">{article.content.intro}</ContentBlock>
          <ContentBlock heading="The Business Problem">{article.content.problem}</ContentBlock>
          <ContentBlock heading="How It Works">{article.content.explanation}</ContentBlock>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">Real-World Examples</h4>
            <ul className="space-y-2">
              {article.content.examples.map((ex) => (
                <li key={ex} className="flex items-start gap-2 text-[14px] text-muted-foreground leading-relaxed">
                  <span className="mt-1 text-primary">▸</span>{ex}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/40 bg-muted p-5">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">Key Benefits</h4>
            <ul className="space-y-2">
              {article.content.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[14px] text-muted-foreground">
                  <span className="mt-0.5 text-emerald-500">✓</span>{b}
                </li>
              ))}
            </ul>
          </div>

          <ContentBlock heading="Best Practices">{article.content.bestPractices.map((p, i) => `${i + 1}. ${p}`).join("\n\n")}</ContentBlock>

          <div>
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">Common Mistakes to Avoid</h4>
            <ul className="space-y-2">
              {article.content.commonMistakes.map((m) => (
                <li key={m} className="flex items-start gap-2 text-[14px] text-muted-foreground leading-relaxed">
                  <span className="mt-1 text-red-400">✕</span>{m}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          {article.faq && article.faq.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">Frequently Asked Questions</h4>
              <div className="space-y-3">
                {article.faq.map((item, i) => (
                  <div key={i} className="rounded-xl border border-white/40 bg-muted p-4">
                    <p className="text-[14px] font-semibold text-foreground mb-1">{item.question}</p>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ContentBlock heading="Conclusion">{article.content.conclusion}</ContentBlock>

          {/* CTA */}
          <div className="rounded-2xl border border-[#2563eb]/20 bg-gradient-to-br from-[#eff6ff] to-white p-6 text-center">
            <p className="text-[15px] font-medium text-foreground mb-4">{article.content.cta}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#contact" onClick={onClose} className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2563eb]/90 hover:shadow-md">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Related */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-foreground">Related Articles</h4>
            <div className="flex flex-wrap gap-2">
              {articles.filter((a) => a.id !== article.id).slice(0, 3).map((a) => (
                <span key={a.id} className="rounded-full border border-white/40 bg-white px-3.5 py-1.5 text-[12px] font-medium text-primary">
                  {a.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          author: { "@type": "Person", name: article.author },
          publisher: { "@type": "Organization", name: "YesBe", url: "https://yesbe.com" },
          datePublished: article.publishedDate,
          dateModified: article.lastUpdated,
          mainEntityOfPage: { "@type": "WebPage", "@id": `https://yesbe.com/articles/${article.id}` },
          keywords: article.keywords.join(", "),
          faq: article.faq?.map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer }
          }))
        }) }} />
      </motion.div>
    </motion.div>
  );
}

function ContentBlock({ heading, children }: { heading: string; children: string }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">{heading}</h4>
      <p className="text-[15px] leading-relaxed text-muted-foreground whitespace-pre-line">{children}</p>
    </div>
  );
}

/* ─── Article Card ─── */

function ArticleCard({ article, onOpen }: { article: Article; onOpen: () => void }) {
  const Icon = article.icon;

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
      className="group flex flex-col overflow-hidden rounded-[22px] border border-white/40 bg-white/80 backdrop-blur-sm transition-all duration-350 hover:border-[#2563eb]/40"
      style={{ boxShadow: "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.12), 0 16px 48px rgba(37,99,235,0.06)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 3px rgba(37,99,235,0.04), 0 4px 16px rgba(37,99,235,0.03)"; }}
    >
      <div className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/[0.06] px-3 py-1 text-[11px] font-semibold text-primary">
            <Icon className="h-3 w-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />{article.readTime}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{article.title}</h3>
        <p className="text-[13px] leading-relaxed text-muted-foreground flex-1">{article.description}</p>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>By {article.author}</span>
          <span>{article.publishedDate}</span>
        </div>
      </div>
      <div className="px-6 pb-6">
        <button onClick={onOpen} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/40 bg-muted px-4 py-2.5 text-[13px] font-semibold text-primary transition-all duration-200 group-hover:border-[#2563eb]/30 group-hover:bg-[#2563eb] group-hover:text-white">
          Read Article
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}

/* ─── Main Section ─── */

export function KnowledgeCenterSection() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch = !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.category.toLowerCase().includes(search.toLowerCase()) ||
        a.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
      const matchesFilter = activeFilter === "All" || a.filter === activeFilter || a.category.toLowerCase().includes(activeFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const featured = articles.find((a) => a.featured);

  return (
    <>
      <section
        id="knowledge"
        className="relative overflow-hidden bg-white py-12 lg:py-16"
        aria-label="Knowledge Center — Technology articles, AI guides, ERP explanations, and business strategy insights"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#eaf6ff_0%,transparent_60%)]" />
          <div className="absolute top-[10%] left-[5%] h-[350px] w-[350px] rounded-full bg-[#dbeafe] opacity-[0.08] blur-[120px]" />
          <div className="absolute bottom-[15%] right-[8%] h-[300px] w-[300px] rounded-full bg-[#ede9fe] opacity-[0.06] blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-[#2563eb]/[0.03]" style={{ width: 5 + i * 2, height: 5 + i * 2, left: `${14 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }} animate={{ y: [0, -16, 0], opacity: [0.12, 0.3, 0.12] }} transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }} />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-80px" }} className="text-center max-w-2xl mx-auto mb-8">
            <motion.div variants={fadeInUp}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                <BookOpen className="h-3.5 w-3.5" /> Knowledge Center
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Knowledge <span className="bg-gradient-to-r from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">Center</span>
            </motion.h2>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mx-auto mt-4 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa]" />
            <motion.p variants={fadeInUp} className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Practical guides on AI, ERP, analytics, and business strategy.
            </motion.p>
          </motion.div>

          {/* Search + Filters */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="mb-6 max-w-2xl mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-white/40 bg-white py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-all duration-200 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10" aria-label="Search articles" />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {allFilters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all duration-200 ${activeFilter === f ? "bg-[#2563eb] text-white shadow-sm" : "border border-white/40 bg-white text-muted-foreground hover:border-[#2563eb]/30 hover:text-primary"}`}>
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Article */}
          {featured && activeFilter === "All" && !search && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
              <div onClick={() => setSelectedArticle(featured)} className="group cursor-pointer overflow-hidden rounded-[22px] border border-[#2563eb]/20 bg-gradient-to-br from-[#eff6ff] to-white p-8 transition-all duration-350 hover:border-[#2563eb]/40 hover:shadow-lg sm:flex sm:items-center sm:gap-8">
                <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa] sm:mb-0">
                  <featured.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-[#2563eb]/10 px-3 py-0.5 text-[11px] font-bold text-primary">Featured</span>
                    <span className="rounded-full bg-primary/[0.06] px-3 py-0.5 text-[11px] font-semibold text-muted-foreground">{featured.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{featured.title}</h3>
                  <p className="mt-1 text-[14px] text-muted-foreground">{featured.description}</p>
                </div>
                <ArrowRight className="hidden sm:block h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </motion.div>
          )}

          {/* Article Grid */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} onOpen={() => setSelectedArticle(article)} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-[15px]">No articles found matching your search.</p>
            </div>
          )}

          {/* Popular Tags */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center mb-6">
            <h3 className="mb-4 text-sm font-bold text-foreground flex items-center justify-center gap-2">
              <Tag className="h-4 w-4 text-primary" /> Popular Topics
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTags.map((t, i) => (
                <motion.span key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.025 }} whileHover={{ y: -3, scale: 1.06 }} className="rounded-full border border-white/40 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-foreground cursor-default transition-colors duration-200 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white">
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center rounded-[22px] border border-white/40 bg-muted p-10">
            <h3 className="text-xl font-bold text-foreground">Still have questions?</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">Let&apos;s discuss your project and build the right solution together.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2563eb]/90 hover:shadow-md">
                Book Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
      </AnimatePresence>
    </>
  );
}
