import type { KnowledgeCategory } from "./types";

export const KNOWLEDGE_CATEGORIES: KnowledgeCategory[] = [
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    aliases: ["ai"],
    description:
      "Learn how artificial intelligence helps businesses automate processes, improve decisions, and create smarter customer experiences.",
    iconName: "Brain",
    solutionCtaText: "Explore AI Solutions",
    solutionCtaHref: "/solutions/ai-solutions",
    subTopicFilters: ["Machine Learning", "AI Automation", "AI Chatbots", "Generative AI", "Business AI"],
    seoTitle: "AI Solutions & Artificial Intelligence Articles | YesBe Knowledge Center",
    metaDescription:
      "Explore practical guides on AI tools, chatbots, LLMs, RAG systems, and machine learning applied to real business problems.",
    faq: [
      {
        question: "How can small businesses adopt AI without massive budgets?",
        answer:
          "Businesses can start with turnkey AI chatbots for support or low-code automation tools that connect existing workflows with pay-as-you-go language models.",
      },
      {
        question: "What is RAG (Retrieval-Augmented Generation)?",
        answer:
          "RAG connects AI language models directly to private company documentation and database records, ensuring answers are 100% accurate without hallucinations.",
      },
    ],
  },
  {
    name: "ERP Systems",
    slug: "erp-systems",
    aliases: ["erp"],
    description:
      "Discover how ERP systems help businesses manage operations, finance, inventory, and workflows efficiently.",
    iconName: "LayoutDashboard",
    solutionCtaText: "Explore ERP Systems",
    solutionCtaHref: "/solutions/erp-systems",
    subTopicFilters: ["ERP Software", "ERP Implementation", "Manufacturing ERP", "Retail ERP", "Cloud ERP"],
    seoTitle: "ERP Systems & Enterprise Planning Articles | YesBe Knowledge Center",
    metaDescription:
      "Learn how enterprise resource planning (ERP) unifies inventory, billing, finance, HR, and operations into a single source of truth.",
    faq: [
      {
        question: "How long does a cloud ERP rollout take?",
        answer:
          "A phased cloud ERP implementation for small-to-medium enterprises typically takes between 4 to 8 weeks for core financial and inventory modules.",
      },
    ],
  },
  {
    name: "CRM Solutions",
    slug: "crm-solutions",
    aliases: ["crm"],
    description:
      "Explore customer relationship management strategies and tools that improve customer engagement and sales performance.",
    iconName: "Users",
    solutionCtaText: "Explore CRM Solutions",
    solutionCtaHref: "/solutions/custom-software",
    subTopicFilters: ["Sales Pipeline", "Customer Management", "CRM Benefits", "Automated Outreach"],
    seoTitle: "CRM Strategies & Customer Management Articles | YesBe Knowledge Center",
    metaDescription:
      "Master CRM strategies: organize lead pipelines, automate follow-ups, and convert leads into long-term customer relationships.",
  },
  {
    name: "Power BI",
    slug: "power-bi",
    aliases: ["powerbi"],
    description:
      "Learn how business intelligence dashboards transform raw data into actionable executive insights.",
    iconName: "BarChart3",
    solutionCtaText: "Explore Power BI Dashboards",
    solutionCtaHref: "/solutions/power-bi-dashboards",
    subTopicFilters: ["Dashboards", "DAX", "Reporting", "Excel vs Power BI", "Data Modeling"],
    seoTitle: "Power BI Dashboards & Analytics Guides | YesBe Knowledge Center",
    metaDescription:
      "Dashboards, DAX calculations, and data modeling guides that turn scattered spreadsheets into real-time reporting.",
  },
  {
    name: "Business Intelligence",
    slug: "business-intelligence",
    aliases: ["bi"],
    description:
      "BI frameworks, KPI design, and reporting strategies that give leaders a single, trustworthy view of performance.",
    iconName: "LineChart",
    solutionCtaText: "Explore BI Solutions",
    solutionCtaHref: "/solutions/data-analytics",
    subTopicFilters: ["KPI Design", "Executive Reporting", "Data Strategy", "BI Architecture"],
    seoTitle: "Business Intelligence & Executive Analytics | YesBe Knowledge Center",
    metaDescription:
      "Build trusted reporting frameworks and executive KPI dashboards that accelerate business decision-making.",
  },
  {
    name: "Data Analytics",
    slug: "data-analytics",
    aliases: ["analytics"],
    description:
      "How to collect, clean, and analyze business data to make decisions that measurably improve results.",
    iconName: "Database",
    solutionCtaText: "Explore Data Analytics",
    solutionCtaHref: "/solutions/data-analytics",
    subTopicFilters: ["Data Pipelines", "Predictive Analytics", "Data Warehouse", "Data Cleaning"],
    seoTitle: "Data Analytics & Data Engineering Articles | YesBe Knowledge Center",
    metaDescription:
      "Learn data collection, cleaning, warehousing, and predictive modeling techniques for enterprise decision-making.",
  },
  {
    name: "Web Development",
    slug: "web-development",
    aliases: ["websites", "web-dev", "website"],
    description:
      "Frontend, backend, and full-stack guides — from choosing a tech stack to shipping fast, secure, scalable sites.",
    iconName: "Globe",
    solutionCtaText: "Explore Web Development",
    solutionCtaHref: "/solutions/website-development",
    subTopicFilters: ["Frontend", "Backend", "React & Vite", "Core Web Vitals", "UX Design"],
    seoTitle: "Web Development & Full-Stack Engineering | YesBe Knowledge Center",
    metaDescription:
      "Complete web development playbooks: framework selection, UI component design, mobile responsiveness, and speed optimization.",
  },
  {
    name: "SEO",
    slug: "seo",
    aliases: ["search-engine-optimization"],
    description:
      "Understand search optimization strategies that help businesses improve online visibility and organic traffic.",
    iconName: "Search",
    solutionCtaText: "Explore Digital Marketing & SEO",
    solutionCtaHref: "/services",
    subTopicFilters: ["Technical SEO", "Local SEO", "GEO", "AEO", "Link Building"],
    seoTitle: "SEO Optimization & Search Ranking Articles | YesBe Knowledge Center",
    metaDescription:
      "Actionable search engine optimization guides covering technical audits, keyword research, on-page optimization, and rank tracking.",
  },
  {
    name: "GEO",
    slug: "geo",
    aliases: ["generative-engine-optimization"],
    description:
      "Generative Engine Optimization — getting recommended by ChatGPT, Gemini, Perplexity, and AI search assistants.",
    iconName: "Sparkles",
    solutionCtaText: "Explore AI Search Solutions",
    solutionCtaHref: "/solutions/ai-solutions",
    subTopicFilters: ["AI Citations", "Perplexity Optimization", "Entity Authority", "Prompt Search"],
    seoTitle: "Generative Engine Optimization (GEO) Guides | YesBe Knowledge Center",
    metaDescription:
      "Learn how to optimize your business content to be indexed and cited by AI engines like ChatGPT, Gemini, and Perplexity.",
  },
  {
    name: "AEO",
    slug: "aeo",
    aliases: ["answer-engine-optimization"],
    description:
      "Answer Engine Optimization — winning featured snippets, voice assistant responses, and AI-generated summaries.",
    iconName: "MessageSquare",
    solutionCtaText: "Explore AI Solutions",
    solutionCtaHref: "/solutions/ai-solutions",
    subTopicFilters: ["Featured Snippets", "Voice Search", "Direct Answers", "Schema Markup"],
    seoTitle: "Answer Engine Optimization (AEO) | YesBe Knowledge Center",
    metaDescription:
      "Master Answer Engine Optimization: rank for conversational queries and featured snippet blocks on Google and AI platforms.",
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    aliases: ["marketing"],
    description:
      "Campaigns, content, paid media, and funnel strategy that turn digital presence into predictable lead flow.",
    iconName: "Megaphone",
    solutionCtaText: "Explore Growth Services",
    solutionCtaHref: "/services",
    subTopicFilters: ["Content Strategy", "Lead Generation", "Funnel Optimization", "Paid Ads"],
    seoTitle: "Digital Marketing & Growth Playbooks | YesBe Knowledge Center",
    metaDescription:
      "Master digital marketing funnels, email automation, content marketing, and customer acquisition channels.",
  },
  {
    name: "Automation",
    slug: "automation",
    aliases: ["business-automation"],
    description:
      "Discover how automation reduces manual work, eliminates errors, and improves operational efficiency.",
    iconName: "Workflow",
    solutionCtaText: "Explore Business Automation",
    solutionCtaHref: "/solutions/business-automation",
    subTopicFilters: ["Workflow Automation", "RPA", "Process Optimization", "Zapier & n8n"],
    seoTitle: "Business Automation & Workflow Guides | YesBe Knowledge Center",
    metaDescription:
      "Learn process auditing, workflow automation, document extraction, and API integrations to streamline daily business tasks.",
  },
  {
    name: "Cloud Computing",
    slug: "cloud-computing",
    aliases: ["cloud"],
    description:
      "Explore cloud computing, migration, security, and scalable business infrastructure.",
    iconName: "Cloud",
    solutionCtaText: "Explore Cloud & DevOps",
    solutionCtaHref: "/solutions/cloud-devops",
    subTopicFilters: ["AWS & Azure", "DevOps", "Cloud Migration", "Infrastructure as Code"],
    seoTitle: "Cloud Computing & DevOps Articles | YesBe Knowledge Center",
    metaDescription:
      "Cloud architecture, serverless infrastructure, containerization, and security playbooks for high-availability systems.",
  },
  {
    name: "Cybersecurity",
    slug: "cybersecurity",
    aliases: ["security"],
    description:
      "Learn how businesses can protect their systems, applications, and data from breaches and cyber threats.",
    iconName: "ShieldCheck",
    solutionCtaText: "Explore Security Solutions",
    solutionCtaHref: "/solutions/custom-software",
    subTopicFilters: ["Data Protection", "Security Audit", "Threat Prevention", "Compliance"],
    seoTitle: "Cybersecurity & Business Data Protection | YesBe Knowledge Center",
    metaDescription:
      "Protect your enterprise from data breaches, phishing attacks, and ransomware with practical security frameworks.",
  },
  {
    name: "Startup Guides",
    slug: "startup-guides",
    aliases: ["startups"],
    description:
      "MVP development, funding prep, go-to-market, and scaling playbooks for founders building their first product.",
    iconName: "Rocket",
    solutionCtaText: "Explore Startup Tech Solutions",
    solutionCtaHref: "/industries/startups",
    subTopicFilters: ["MVP Building", "Fundraising", "Go-To-Market", "Product Validation"],
    seoTitle: "Startup Guides & Founder Playbooks | YesBe Knowledge Center",
    metaDescription:
      "Actionable startup playbooks: validate your MVP, choose early architecture, and launch fast without technical debt.",
  },
  {
    name: "Business Tips",
    slug: "business-tips",
    aliases: ["business"],
    description:
      "Actionable operating advice for owners and operators — pricing, hiring, systems, cash flow, and growth.",
    iconName: "TrendingUp",
    solutionCtaText: "Explore Business Solutions",
    solutionCtaHref: "/services",
    subTopicFilters: ["Growth Strategy", "Scaling Operations", "Cash Flow", "SME Operations"],
    seoTitle: "Business Growth & Operating Tips | YesBe Knowledge Center",
    metaDescription:
      "Operating strategies for business leaders: scaling workflows, managing profit margins, and driving tech adoption.",
  },
  {
    name: "Case Studies",
    slug: "case-studies",
    aliases: ["projects"],
    description:
      "Real YesBe projects with problems, solutions, and measurable results across e-commerce, ERP, AI, and more.",
    iconName: "Briefcase",
    solutionCtaText: "View Case Studies",
    solutionCtaHref: "/case-studies",
    subTopicFilters: ["AI Projects", "ERP Implementations", "Web Applications", "Analytics"],
    seoTitle: "Case Studies & Client Results | YesBe Knowledge Center",
    metaDescription:
      "Real-world case studies detailing how YesBe delivered enterprise software, AI tools, and ERP systems for clients.",
  },
  {
    name: "Industry Insights",
    slug: "industry-insights",
    aliases: ["industries"],
    description:
      "Sector-specific technology trends and transformation guidance for healthcare, retail, education, and manufacturing.",
    iconName: "Building2",
    solutionCtaText: "Explore Industry Solutions",
    solutionCtaHref: "/industries",
    subTopicFilters: ["Healthcare", "Retail & POS", "Education ERP", "Manufacturing"],
    seoTitle: "Industry Insights & Tech Transformation | YesBe Knowledge Center",
    metaDescription:
      "Discover sector-specific technology trends and digital transformation playbooks across industries.",
  },
  {
    name: "Technology Trends",
    slug: "technology-trends",
    aliases: ["tech-trends"],
    description:
      "What's next in AI, software, cloud, and business technology — and what it means for your strategy.",
    iconName: "Cpu",
    solutionCtaText: "Explore Tech Trends",
    solutionCtaHref: "/services",
    subTopicFilters: ["Next-Gen Tech", "Software Architecture", "AI Trends", "Future of Work"],
    seoTitle: "Technology Trends & Innovations | YesBe Knowledge Center",
    metaDescription:
      "Stay ahead of emerging trends in generative AI, cloud computing, enterprise software, and business automation.",
  },
];

export const categoryBySlug = (slug: string): KnowledgeCategory | undefined => {
  const normalized = (slug || "").trim().toLowerCase();
  if (!normalized) return undefined;
  return KNOWLEDGE_CATEGORIES.find(
    (c) =>
      c.slug === normalized ||
      (c.aliases && c.aliases.includes(normalized))
  );
};

export const categoryByName = (name: string): KnowledgeCategory | undefined => {
  const normalized = (name || "").trim().toLowerCase();
  if (!normalized) return undefined;
  return KNOWLEDGE_CATEGORIES.find(
    (c) => c.name.toLowerCase() === normalized
  );
};
