import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Bot,
  LayoutDashboard,
  Globe,
  Code2,
  ShoppingBag,
  Workflow,
  BarChart3,
  Cloud,
  Database,
  Link2,
  Search,
  MessageCircle,
  Megaphone,
  Smartphone,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Settings,
  Users,
  Lock,
  Cpu,
  Layers,
  GitBranch,
  Server,
  FileText,
  PieChart,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Award,
  Palette,
  MonitorSmartphone,
  Boxes,
  Waypoints,
  MessageSquare,
  Mic,
  Share2,
  PenTool,
  Activity,
  Gauge,
  Eye,
  Mail,
  DollarSign,
  Wrench,
  Terminal,
  Component,
  Paintbrush,
  Link,
  Bell,
  CreditCard,
  Package,
  Monitor,
  Building2,
  Wifi,
} from "lucide-react";

export interface SolutionDetail {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  category: string;
  description: string;
  heroImage: string;
  overview: string;
  whyNeeded: string;
  challenges: string[];
  features: { title: string; description: string; icon: LucideIcon }[];
  benefits: string[];
  process: { step: string; description: string }[];
  technologies: { name: string; description: string }[];
  whyYesBe: { title: string; description: string }[];
  caseStudy: { title: string; outcome: string; metric: string };
  faq: { question: string; answer: string }[];
  relatedSolutions: string[];
}

export const solutions: SolutionDetail[] = [
  // 1. AI Solutions
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    shortTitle: "AI",
    icon: Brain,
    category: "Artificial Intelligence",
    description:
      "Enterprise-grade AI solutions that transform how your business operates, from intelligent automation to predictive analytics and custom machine learning models.",
    heroImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    overview:
      "Our AI Solutions service delivers end-to-end artificial intelligence implementations tailored to your specific business needs. We design, develop, and deploy custom AI models, intelligent automation workflows, and predictive systems that drive measurable outcomes. From natural language processing to computer vision, our team leverages cutting-edge frameworks and deep domain expertise to solve complex challenges that traditional software cannot address.",
    whyNeeded:
      "Businesses that fail to adopt AI risk falling behind competitors who leverage intelligent automation, data-driven decision making, and predictive capabilities. AI solutions reduce operational costs by 20-40%, improve accuracy in complex tasks, and unlock insights hidden in vast datasets — turning your data into a strategic advantage.",
    challenges: [
      "Identifying the right AI use cases that deliver genuine ROI rather than hype-driven projects",
      "Ensuring data quality, availability, and governance for reliable model training and deployment",
      "Integrating AI models into existing business workflows without disrupting operations",
      "Managing model drift, bias, and performance degradation over time in production environments",
    ],
    features: [
      {
        title: "Custom ML Model Development",
        description:
          "Purpose-built machine learning models trained on your data for classification, regression, recommendation, and forecasting tasks.",
        icon: Cpu,
      },
      {
        title: "Natural Language Processing",
        description:
          "Advanced NLP solutions including text analysis, sentiment detection, document parsing, and conversational AI capabilities.",
        icon: MessageSquare,
      },
      {
        title: "Computer Vision Systems",
        description:
          "Image and video analysis solutions for object detection, quality inspection, facial recognition, and visual search applications.",
        icon: Eye,
      },
      {
        title: "Predictive Analytics",
        description:
          "Forecast demand, predict churn, identify opportunities, and anticipate market trends with data-driven predictive models.",
        icon: TrendingUp,
      },
      {
        title: "AI-Powered Automation",
        description:
          "Intelligent automation that learns from patterns, adapts to new data, and continuously improves process efficiency.",
        icon: Zap,
      },
      {
        title: "MLOps & Model Management",
        description:
          "End-to-end model lifecycle management including versioning, monitoring, retraining pipelines, and A/B testing infrastructure.",
        icon: Settings,
      },
    ],
    benefits: [
      "Reduce operational costs by 20-40% through intelligent process automation",
      "Make faster, more accurate decisions powered by real-time data insights",
      "Scale operations without proportionally increasing headcount",
      "Gain competitive advantage through proprietary AI capabilities",
      "Improve customer experience with personalized, intelligent interactions",
      "Unlock hidden patterns in data that manual analysis would miss",
    ],
    process: [
      {
        step: "Discovery & Assessment",
        description:
          "We analyze your business processes, data landscape, and strategic goals to identify high-impact AI opportunities.",
      },
      {
        step: "Data Strategy & Preparation",
        description:
          "Our team assesses data quality, designs collection pipelines, and prepares datasets optimized for model training.",
      },
      {
        step: "Model Design & Development",
        description:
          "We architect and build custom AI models using state-of-the-art frameworks, iterating based on performance benchmarks.",
      },
      {
        step: "Validation & Testing",
        description:
          "Rigorous testing against real-world scenarios, including bias auditing, edge case handling, and performance optimization.",
      },
      {
        step: "Deployment & Integration",
        description:
          "Seamless deployment into your production environment with full API integration and infrastructure provisioning.",
      },
      {
        step: "Monitoring & Optimization",
        description:
          "Continuous model monitoring, performance tracking, and automated retraining to maintain accuracy over time.",
      },
      {
        step: "Scale & Evolve",
        description:
          "Expanding successful AI solutions across the organization and developing new capabilities as your needs evolve.",
      },
    ],
    technologies: [
      {
        name: "TensorFlow & PyTorch",
        description:
          "Industry-leading deep learning frameworks for building and training custom neural network architectures",
      },
      {
        name: "OpenAI & Azure AI",
        description:
          "Enterprise-grade AI APIs and cloud services for NLP, vision, and generative AI capabilities",
      },
      {
        name: "Apache Spark MLlib",
        description:
          "Distributed machine learning library for processing large-scale datasets and training scalable models",
      },
      {
        name: "MLflow & Kubeflow",
        description:
          "MLOps platforms for experiment tracking, model management, and end-to-end ML pipeline orchestration",
      },
    ],
    whyYesBe: [
      {
        title: "End-to-End Expertise",
        description:
          "From data engineering to model deployment, we handle every aspect of your AI journey under one roof.",
      },
      {
        title: "Production-First Approach",
        description:
          "We build AI solutions designed for production from day one — not proof-of-concepts that never scale.",
      },
      {
        title: "Measurable ROI Focus",
        description:
          "Every AI project starts with clear success metrics and business KPIs to ensure tangible returns.",
      },
      {
        title: "Ethical AI Commitment",
        description:
          "We embed fairness, transparency, and accountability into every model we build, ensuring responsible AI deployment.",
      },
    ],
    caseStudy: {
      title:
        "Intelligent Document Processing for a Leading Insurance Provider",
      outcome:
        "Automated claims processing reduced manual review time by 75% and improved accuracy to 98.5%, enabling the company to handle 3x more claims with the same team.",
      metric: "75% faster processing",
    },
    faq: [
      {
        question: "How long does a typical AI project take?",
        answer:
          "Timelines vary based on complexity. A focused predictive analytics project might take 6-8 weeks, while a full custom AI platform can take 3-6 months. We always start with a discovery phase to provide accurate estimates.",
      },
      {
        question: "Do we need clean data before starting?",
        answer:
          "Not necessarily. Part of our process includes data assessment and preparation. We'll help you identify data gaps, design collection strategies, and clean existing datasets to make them AI-ready.",
      },
      {
        question: "Can AI work with our existing systems?",
        answer:
          "Absolutely. We design AI solutions to integrate seamlessly with your current tech stack through APIs, webhooks, and database connectors. We specialize in augmenting existing workflows rather than replacing them.",
      },
      {
        question: "How do you handle data privacy and security?",
        answer:
          "We follow enterprise-grade security practices including data encryption, access controls, and compliance with GDPR, HIPAA, and other relevant regulations. We can deploy models on-premise or in your private cloud.",
      },
    ],
    relatedSolutions: ["data-analytics", "business-automation", "ai-chatbots"],
  },

  // 2. AI Chatbots
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    shortTitle: "Chatbots",
    icon: Bot,
    category: "Artificial Intelligence",
    description:
      "Intelligent conversational AI chatbots that deliver 24/7 customer support, automate workflows, and provide natural, context-aware interactions across every channel.",
    heroImage:
      "https://images.unsplash.com/photo-1531746790095-e5cbfb1e2f0e?w=1200&h=600&fit=crop",
    overview:
      "Our AI Chatbots service builds sophisticated conversational agents that understand context, learn from interactions, and deliver human-like conversations at scale. Powered by advanced large language models and custom training data, our chatbots handle customer inquiries, qualify leads, process orders, and provide support across web, mobile, and messaging platforms. We go beyond simple rule-based bots to create truly intelligent conversational experiences.",
    whyNeeded:
      "Customer expectations have shifted — they demand instant, accurate responses around the clock. AI chatbots reduce support costs by up to 60%, handle unlimited concurrent conversations, and maintain consistent quality 24/7. Businesses that deploy intelligent chatbots see 35% higher customer satisfaction scores and 50% faster response times.",
    challenges: [
      "Creating chatbots that understand nuanced queries and maintain context across long conversations",
      "Seamlessly handing off complex issues to human agents without frustrating customers",
      "Training chatbots on domain-specific knowledge while keeping responses accurate and up-to-date",
      "Integrating chatbot experiences across multiple channels while maintaining conversation continuity",
    ],
    features: [
      {
        title: "Multi-Turn Conversations",
        description:
          "Context-aware对话 that maintain memory across interactions, understanding follow-ups and complex query chains.",
        icon: MessageCircle,
      },
      {
        title: "Omnichannel Deployment",
        description:
          "Deploy your chatbot across websites, mobile apps, WhatsApp, Slack, Microsoft Teams, and other platforms simultaneously.",
        icon: Globe,
      },
      {
        title: "Knowledge Base Integration",
        description:
          "Seamlessly connect to your existing documentation, FAQs, and databases to provide accurate, source-cited responses.",
        icon: Database,
      },
      {
        title: "Human Handoff",
        description:
          "Intelligent escalation to human agents when needed, with full conversation context transfer for smooth transitions.",
        icon: Users,
      },
      {
        title: "Analytics Dashboard",
        description:
          "Real-time visibility into conversation metrics, satisfaction scores, resolution rates, and common inquiry patterns.",
        icon: BarChart3,
      },
      {
        title: "Custom Branding & Voice",
        description:
          "Fully customizable chatbot appearance, tone, and personality to match your brand identity perfectly.",
        icon: Palette,
      },
    ],
    benefits: [
      "Provide instant 24/7 support without increasing support staff",
      "Handle unlimited concurrent conversations simultaneously",
      "Reduce average response time from hours to seconds",
      "Capture and qualify leads automatically around the clock",
      "Maintain consistent brand voice across all interactions",
      "Gain actionable insights from conversation analytics",
    ],
    process: [
      {
        step: "Use Case Definition",
        description:
          "We map out your customer journeys, identify high-volume inquiry types, and define chatbot capabilities aligned with business goals.",
      },
      {
        step: "Knowledge Curation",
        description:
          "Our team organizes your existing content, identifies knowledge gaps, and structures information for optimal AI retrieval.",
      },
      {
        step: "Conversation Design",
        description:
          "We craft dialogue flows, personality traits, and response templates that reflect your brand voice and meet user expectations.",
      },
      {
        step: "AI Model Training",
        description:
          "Fine-tuning language models on your specific domain, products, and services to ensure accurate, contextual responses.",
      },
      {
        step: "Channel Integration",
        description:
          "Deploying your chatbot across target platforms with native integrations and consistent experience delivery.",
      },
      {
        step: "Testing & Refinement",
        description:
          "Rigorous testing with real scenarios, including edge cases, sentiment handling, and escalation path validation.",
      },
      {
        step: "Launch & Continuous Learning",
        description:
          "Go live with ongoing monitoring, conversation analysis, and iterative improvements based on real interaction data.",
      },
    ],
    technologies: [
      {
        name: "OpenAI GPT & Claude",
        description:
          "State-of-the-art large language models providing natural conversation capabilities and deep reasoning",
      },
      {
        name: "RAG Architecture",
        description:
          "Retrieval-Augmented Generation for accurate, source-grounded responses from your knowledge base",
      },
      {
        name: "LangChain & LlamaIndex",
        description:
          "Orchestration frameworks for building complex AI agent workflows and knowledge retrieval pipelines",
      },
      {
        name: "WebSocket & Webhooks",
        description:
          "Real-time communication protocols for instant message delivery and seamless system integrations",
      },
    ],
    whyYesBe: [
      {
        title: "Beyond Templates",
        description:
          "We build truly intelligent chatbots that understand intent — not rigid decision trees that frustrate users.",
      },
      {
        title: "Domain Expertise",
        description:
          "Our team specializes in training chatbots for specific industries including healthcare, finance, and e-commerce.",
      },
      {
        title: "Scalable Architecture",
        description:
          "Our solutions handle 10 or 10,000 concurrent conversations with the same performance and quality.",
      },
      {
        title: "Continuous Optimization",
        description:
          "We don't just launch and leave — ongoing analytics and model refinement keep your chatbot improving.",
      },
    ],
    caseStudy: {
      title:
        "AI Customer Service Bot for a SaaS Platform Serving 50K+ Users",
      outcome:
        "Reduced support ticket volume by 62% while maintaining a 94% customer satisfaction rating. The bot resolved common issues in under 30 seconds on average.",
      metric: "62% ticket reduction",
    },
    faq: [
      {
        question: "How accurate are AI chatbots compared to human agents?",
        answer:
          "Modern AI chatbots trained on your specific knowledge base can achieve 90-95% accuracy for common inquiries. They excel at structured questions and tasks, with intelligent escalation for complex scenarios requiring human judgment.",
      },
      {
        question: "Can the chatbot learn from conversations over time?",
        answer:
          "Yes. Our chatbots include continuous learning pipelines that analyze successful interactions, identify knowledge gaps, and improve responses based on real user data and feedback.",
      },
      {
        question: "What platforms can the chatbot be deployed on?",
        answer:
          "We support deployment on websites, mobile apps, WhatsApp, Facebook Messenger, Slack, Microsoft Teams, and custom channels. The same AI core powers all platforms with consistent behavior.",
      },
      {
        question: "How long does it take to build a custom chatbot?",
        answer:
          "A focused chatbot for specific use cases can be launched in 4-6 weeks. More complex implementations with multiple integrations and extensive knowledge bases typically take 8-12 weeks.",
      },
    ],
    relatedSolutions: ["ai-solutions", "business-automation", "digital-marketing"],
  },

  // 3. ERP Systems
  {
    slug: "erp-systems",
    title: "ERP Systems",
    shortTitle: "ERP",
    icon: LayoutDashboard,
    category: "Business Software",
    description:
      "Custom and configured ERP systems that unify your business operations — finance, HR, inventory, procurement, and more — into a single, powerful platform.",
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    overview:
      "Our ERP Systems service delivers comprehensive enterprise resource planning solutions that connect every department in your organization. We design, customize, and implement ERP platforms that streamline operations, provide real-time visibility into business performance, and eliminate data silos. From finance and HR to supply chain and manufacturing, we build ERP systems that scale with your growth and adapt to your unique processes.",
    whyNeeded:
      "Disconnected systems create inefficiency, data inconsistencies, and blind spots that cost businesses 20-30% in operational waste. A unified ERP system provides a single source of truth, automates cross-departmental workflows, and delivers real-time insights that enable faster, smarter decisions across your entire organization.",
    challenges: [
      "Migrating data from legacy systems while maintaining data integrity and business continuity",
      "Balancing out-of-the-box ERP functionality with necessary customizations for unique business processes",
      "Managing change across the organization to ensure user adoption and minimize productivity disruption",
      "Scaling the ERP system to handle growing transaction volumes and expanding business operations",
    ],
    features: [
      {
        title: "Unified Business Platform",
        description:
          "Single system connecting finance, HR, inventory, CRM, procurement, and operations for complete business visibility.",
        icon: LayoutDashboard,
      },
      {
        title: "Financial Management",
        description:
          "General ledger, accounts payable/receivable, budgeting, multi-currency support, and automated reconciliation.",
        icon: DollarSign,
      },
      {
        title: "Supply Chain Management",
        description:
          "End-to-end visibility from procurement through manufacturing to delivery, with demand forecasting and optimization.",
        icon: Boxes,
      },
      {
        title: "Real-Time Reporting",
        description:
          "Dashboards and reports that provide instant visibility into KPIs, financial health, and operational performance.",
        icon: BarChart3,
      },
      {
        title: "Workflow Automation",
        description:
          "Automated approvals, notifications, and cross-departmental processes that reduce manual work and errors.",
        icon: Workflow,
      },
      {
        title: "Role-Based Access Control",
        description:
          "Granular permissions and access controls ensuring users see only what's relevant to their role and responsibilities.",
        icon: Shield,
      },
    ],
    benefits: [
      "Eliminate data silos with a single source of truth across all departments",
      "Reduce operational costs through automated workflows and reduced manual processes",
      "Gain real-time visibility into business performance for faster decision making",
      "Ensure regulatory compliance with built-in audit trails and controls",
      "Scale seamlessly as your business grows without system limitations",
      "Improve collaboration between departments with shared data and processes",
    ],
    process: [
      {
        step: "Business Process Analysis",
        description:
          "We map your current processes, identify inefficiencies, and design optimized workflows for the new ERP system.",
      },
      {
        step: "Solution Architecture",
        description:
          "Selecting the right ERP platform and modules, defining customization requirements, and creating technical architecture.",
      },
      {
        step: "Data Migration Strategy",
        description:
          "Planning data cleansing, mapping, and migration from legacy systems with validation and rollback procedures.",
      },
      {
        step: "System Configuration",
        description:
          "Configuring modules, workflows, user roles, and integrations according to your specific business requirements.",
      },
      {
        step: "Integration Development",
        description:
          "Building connections to existing systems, third-party services, and custom APIs for seamless data flow.",
      },
      {
        step: "Testing & User Acceptance",
        description:
          "Comprehensive system testing, user acceptance testing, and performance validation across all business scenarios.",
      },
      {
        step: "Deployment & Training",
        description:
          "Phased rollout with hands-on training, documentation, and dedicated support to ensure smooth user adoption.",
      },
    ],
    technologies: [
      {
        name: "Odoo & ERPNext",
        description:
          "Open-source ERP platforms offering modular, cost-effective solutions for businesses of all sizes",
      },
      {
        name: "SAP Business One",
        description:
          "Enterprise-grade ERP platform for mid-market businesses with comprehensive functionality and scalability",
      },
      {
        name: "Microsoft Dynamics 365",
        description:
          "Cloud-first ERP and CRM platform deeply integrated with the Microsoft ecosystem and Power Platform",
      },
      {
        name: "PostgreSQL & Redis",
        description:
          "Robust database layer for high-performance transaction processing and real-time data caching",
      },
    ],
    whyYesBe: [
      {
        title: "Process-First Philosophy",
        description:
          "We optimize your processes before configuring the system — technology should enable better workflows, not codify bad ones.",
      },
      {
        title: "Implementation Methodology",
        description:
          "Our phased implementation approach minimizes disruption while ensuring each module is thoroughly validated before going live.",
      },
      {
        title: "Post-Launch Partnership",
        description:
          "ERP success requires ongoing optimization. We provide continuous support, training, and system enhancements post-deployment.",
      },
      {
        title: "Industry-Specific Expertise",
        description:
          "Pre-built configurations and best practices for manufacturing, retail, services, and distribution industries.",
      },
    ],
    caseStudy: {
      title:
        "Custom ERP Implementation for a Multi-Location Manufacturing Company",
      outcome:
        "Unified 5 factory locations onto a single ERP platform, reducing inventory discrepancies by 90% and cutting month-end closing from 12 days to 3 days.",
      metric: "90% less inventory errors",
    },
    faq: [
      {
        question: "How long does an ERP implementation take?",
        answer:
          "Timeline depends on complexity. A single-module implementation for a small business takes 3-4 months. A full multi-module ERP for a mid-market company typically takes 6-12 months.",
      },
      {
        question: "Should we choose cloud or on-premise ERP?",
        answer:
          "We evaluate your specific needs including data sensitivity, internet reliability, IT resources, and compliance requirements. Most modern businesses benefit from cloud ERP for scalability and lower upfront costs, but on-premise may be preferred for certain regulated industries.",
      },
      {
        question: "How do you handle data migration from our current system?",
        answer:
          "We follow a structured migration process: data audit, cleansing, mapping, test migration, validation, and final migration. We use automated tools wherever possible and manual validation for critical data to ensure nothing is lost or corrupted.",
      },
      {
        question: "Can the ERP integrate with our existing software?",
        answer:
          "Yes. We build integrations with your existing CRM, e-commerce platform, accounting software, and other tools using APIs, middleware, and direct database connections as needed.",
      },
    ],
    relatedSolutions: [
      "business-automation",
      "database-management",
      "custom-software",
    ],
  },

  // 4. Website Development
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Websites",
    icon: Globe,
    category: "Web Development",
    description:
      "High-performance, visually stunning websites built with modern frameworks that drive conversions, load instantly, and scale with your traffic.",
    heroImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=600&fit=crop",
    overview:
      "Our Website Development service creates custom, high-performance websites that serve as powerful business assets. We build responsive, SEO-optimized sites using modern frameworks like Next.js and React that load in under 2 seconds, convert visitors into customers, and scale seamlessly. From corporate sites and landing pages to complex content platforms, we deliver websites that look exceptional and perform even better.",
    whyNeeded:
      "Your website is your digital storefront — first impressions happen in 0.05 seconds. 53% of visitors leave sites that take over 3 seconds to load. A professionally built website improves search rankings, builds trust, captures leads, and drives revenue. Poor website performance costs businesses thousands in lost opportunities every month.",
    challenges: [
      "Achieving sub-2-second load times while maintaining rich visual experiences and functionality",
      "Building truly responsive designs that provide optimal experiences across all device sizes",
      "Ensuring SEO best practices are implemented in the architecture, not just bolted on afterward",
      "Creating websites that balance stunning design with conversion-focused user experience",
    ],
    features: [
      {
        title: "Custom Design & Development",
        description:
          "Pixel-perfect, unique designs built from scratch — no templates — reflecting your brand identity and business goals.",
        icon: Palette,
      },
      {
        title: "Performance Optimization",
        description:
          "Sub-2-second load times achieved through code splitting, image optimization, CDN delivery, and server-side rendering.",
        icon: Zap,
      },
      {
        title: "Responsive & Mobile-First",
        description:
          "Every site is designed mobile-first and tested across all devices, browsers, and screen sizes for consistent experience.",
        icon: MonitorSmartphone,
      },
      {
        title: "SEO Architecture",
        description:
          "Technical SEO built into the foundation including semantic HTML, structured data, meta management, and sitemap generation.",
        icon: Search,
      },
      {
        title: "CMS Integration",
        description:
          "Headless CMS integration empowering your team to update content, add pages, and manage blog posts without developers.",
        icon: FileText,
      },
      {
        title: "Analytics & Conversion Tracking",
        description:
          "GA4, heatmap, and conversion tracking setup to measure performance and optimize visitor-to-customer journeys.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Establish a professional online presence that builds instant credibility",
      "Rank higher in search results with technically optimized website architecture",
      "Convert more visitors with strategic UX design and clear calls-to-action",
      "Manage content easily with intuitive CMS dashboards requiring no coding",
      "Scale effortlessly to handle traffic spikes and business growth",
      "Reduce bounce rates with lightning-fast page load speeds",
    ],
    process: [
      {
        step: "Strategy & Planning",
        description:
          "Defining site architecture, user journeys, content strategy, and technical requirements aligned with business objectives.",
      },
      {
        step: "UI/UX Design",
        description:
          "Creating wireframes, visual designs, and interactive prototypes that balance aesthetics with conversion optimization.",
      },
      {
        step: "Frontend Development",
        description:
          "Building responsive, performant interfaces using Next.js, React, and modern CSS with pixel-perfect accuracy.",
      },
      {
        step: "Backend & CMS Setup",
        description:
          "Implementing content management, API integrations, forms, authentication, and server-side functionality.",
      },
      {
        step: "Content & SEO",
        description:
          "Adding optimized content, configuring metadata, implementing structured data, and setting up analytics tracking.",
      },
      {
        step: "Quality Assurance",
        description:
          "Cross-browser testing, performance auditing, accessibility validation, and security review before launch.",
      },
      {
        step: "Launch & Optimization",
        description:
          "Deployment, DNS configuration, SSL setup, and post-launch monitoring with ongoing performance optimization.",
      },
    ],
    technologies: [
      {
        name: "Next.js & React",
        description:
          "Modern JavaScript frameworks for building fast, SEO-friendly websites with server-side rendering capabilities",
      },
      {
        name: "Tailwind CSS",
        description:
          "Utility-first CSS framework enabling rapid, consistent design system implementation across all pages",
      },
      {
        name: "Vercel & Netlify",
        description:
          "Edge-first deployment platforms for automatic scaling, instant global delivery, and zero-downtime deployments",
      },
      {
        name: "Headless CMS (Strapi/Sanity)",
        description:
          "Flexible content management systems decoupled from the frontend for maximum performance and flexibility",
      },
    ],
    whyYesBe: [
      {
        title: "Conversion-Focused Design",
        description:
          "We design for business outcomes, not just aesthetics. Every layout decision is guided by user behavior data and conversion principles.",
      },
      {
        title: "Performance Obsession",
        description:
          "We obsess over Core Web Vitals, achieving scores above 95 on Lighthouse. Speed isn't a feature — it's our standard.",
      },
      {
        title: "SEO-First Architecture",
        description:
          "Technical SEO is built into our development process from the start, not added as an afterthought.",
      },
      {
        title: "Future-Proof Technology",
        description:
          "We use modern, maintainable technologies that won't become obsolete, ensuring your website investment lasts for years.",
      },
    ],
    caseStudy: {
      title:
        "Corporate Website Redesign for a B2B Technology Company",
      outcome:
        "Redesigned website achieved 98 Lighthouse performance score, reduced load time from 7.2s to 1.4s, and increased organic traffic by 145% within 6 months.",
      metric: "145% more organic traffic",
    },
    faq: [
      {
        question: "How long does it take to build a website?",
        answer:
          "A typical business website takes 4-8 weeks from kickoff to launch. More complex sites with custom features, extensive content, or e-commerce functionality may take 8-12 weeks.",
      },
      {
        question: "Will my website rank on Google?",
        answer:
          "We build with technical SEO best practices, but ranking also depends on content strategy, domain authority, and competition. Our SEO-focused architecture gives you the strongest foundation possible for search visibility.",
      },
      {
        question: "Can I update the website myself?",
        answer:
          "Absolutely. We integrate user-friendly CMS platforms that allow you to update content, add pages, publish blog posts, and manage media without any technical knowledge.",
      },
      {
        question: "Do you provide hosting?",
        answer:
          "We recommend and set up optimal hosting solutions based on your needs. We handle deployment, SSL, CDN configuration, and can manage ongoing hosting or help you set up on your preferred platform.",
      },
    ],
    relatedSolutions: ["web-applications", "seo", "ecommerce"],
  },

  // 5. Web Applications
  {
    slug: "web-applications",
    title: "Web Applications",
    shortTitle: "Web Apps",
    icon: Code2,
    category: "Web Development",
    description:
      "Custom-built web applications with rich interactivity, real-time capabilities, and scalable architecture — from internal tools to full SaaS platforms.",
    heroImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    overview:
      "Our Web Applications service builds powerful, scalable browser-based software that solves complex business problems. We create everything from internal dashboards and admin panels to full-featured SaaS products and customer-facing portals. Using modern frameworks and cloud-native architecture, we deliver web applications that feel as responsive as desktop software while being accessible from anywhere.",
    whyNeeded:
      "Off-the-shelf software rarely fits unique business processes. Custom web applications streamline operations that generic tools can't handle, provide centralized access from any device, and scale with your user base. They eliminate data silos, reduce manual work, and give you complete control over features, security, and user experience.",
    challenges: [
      "Designing intuitive interfaces for complex workflows and data-dense operations",
      "Building real-time features that maintain consistency across multiple concurrent users",
      "Ensuring application security with proper authentication, authorization, and data protection",
      "Architecting for scalability to handle growing users, data, and feature complexity",
    ],
    features: [
      {
        title: "Rich Interactive Interfaces",
        description:
          "Responsive, reactive UIs with drag-and-drop, real-time updates, and desktop-class interactions in the browser.",
        icon: Component,
      },
      {
        title: "Real-Time Collaboration",
        description:
          "Live updates, multi-user editing, instant notifications, and WebSocket-powered real-time data synchronization.",
        icon: RefreshCw,
      },
      {
        title: "Role-Based Access Control",
        description:
          "Granular permissions system with roles, teams, and fine-grained resource-level access management.",
        icon: Lock,
      },
      {
        title: "API-Driven Architecture",
        description:
          "RESTful and GraphQL APIs enabling mobile apps, third-party integrations, and future extensibility.",
        icon: Link2,
      },
      {
        title: "Offline Capability",
        description:
          "Service workers and local caching ensuring core functionality works even without internet connectivity.",
        icon: Wifi,
      },
      {
        title: "Automated Testing Suite",
        description:
          "Comprehensive unit, integration, and end-to-end tests ensuring reliability and preventing regressions.",
        icon: CheckCircle,
      },
    ],
    benefits: [
      "Access your business tools from any device with an internet connection",
      "Automate complex workflows that generic software can't handle",
      "Scale seamlessly as your team and data grow without performance degradation",
      "Integrate with existing tools through APIs for a unified technology ecosystem",
      "Maintain full control over features, security, and data ownership",
      "Reduce software licensing costs with custom-built alternatives to SaaS tools",
    ],
    process: [
      {
        step: "Product Discovery",
        description:
          "Deep dive into user needs, business requirements, and technical constraints to define the product vision and roadmap.",
      },
      {
        step: "UX Research & Design",
        description:
          "User research, wireframing, and interactive prototyping to validate concepts before writing any code.",
      },
      {
        step: "Architecture & Tech Stack",
        description:
          "Selecting optimal technologies, designing system architecture, and planning for scale from the foundation.",
      },
      {
        step: "Iterative Development",
        description:
          "Building in agile sprints with regular demos, incorporating feedback continuously throughout the project.",
      },
      {
        step: "Quality Assurance",
        description:
          "Rigorous testing including automated test suites, manual QA, security auditing, and performance optimization.",
      },
      {
        step: "Deployment & DevOps",
        description:
          "CI/CD pipeline setup, cloud infrastructure provisioning, monitoring, and automated deployment processes.",
      },
      {
        step: "Support & Evolution",
        description:
          "Ongoing maintenance, feature additions, performance optimization, and technical support post-launch.",
      },
    ],
    technologies: [
      {
        name: "React & Next.js",
        description:
          "Modern frontend frameworks for building fast, interactive user interfaces with excellent developer experience",
      },
      {
        name: "Node.js & Python",
        description:
          "Versatile backend runtimes for building APIs, processing pipelines, and real-time services at scale",
      },
      {
        name: "PostgreSQL & MongoDB",
        description:
          "Relational and document databases chosen based on data model requirements for optimal performance",
      },
      {
        name: "AWS & Docker",
        description:
          "Cloud infrastructure and containerization for reliable, scalable, and cost-effective application deployment",
      },
    ],
    whyYesBe: [
      {
        title: "Product Thinking",
        description:
          "We think like product owners, not just developers. Every feature decision is evaluated against user value and business impact.",
      },
      {
        title: "Full-Stack Mastery",
        description:
          "From pixel-perfect UIs to scalable backends, our team handles every layer of the stack with deep expertise.",
      },
      {
        title: "Agile & Transparent",
        description:
          "Regular demos, shared project boards, and open communication keep you involved and informed at every stage.",
      },
      {
        title: "Long-Term Partnership",
        description:
          "We build web apps for the long haul — ongoing support, feature evolution, and scaling assistance beyond launch.",
      },
    ],
    caseStudy: {
      title:
        "Custom SaaS Platform for a Healthcare Scheduling Startup",
      outcome:
          "Built a complete appointment management platform handling 10,000+ daily bookings with real-time availability, automated reminders, and payment processing.",
      metric: "10K+ daily bookings",
    },
    faq: [
      {
        question: "What's the difference between a web app and a website?",
        answer:
          "Websites primarily display content, while web applications provide interactive functionality — think dashboards, tools, forms, and data management. Web apps require user accounts, process data, and often serve as core business tools.",
      },
      {
        question: "Should I build a web app or a mobile app?",
        answer:
          "Web apps are faster to develop, easier to update, and accessible on all devices without app store approval. We often recommend starting with a responsive web app and adding native mobile apps later if user demand justifies it.",
      },
      {
        question: "Can you work with our existing codebase?",
        answer:
          "Yes. We regularly take over, refactor, and extend existing web applications. We start with a code audit to understand the current state and create a plan for improvements.",
      },
      {
        question: "How do you handle application security?",
        answer:
          "We implement security at every layer: authentication (OAuth, MFA), authorization (RBAC), input validation, encryption at rest and in transit, rate limiting, and regular security audits.",
      },
    ],
    relatedSolutions: ["website-development", "api-development", "cloud-devops"],
  },

  // 6. E-Commerce
  {
    slug: "ecommerce",
    title: "E-Commerce",
    shortTitle: "E-Commerce",
    icon: ShoppingBag,
    category: "Web Development",
    description:
      "Custom e-commerce platforms and Shopify/WooCommerce solutions that maximize conversions, streamline operations, and scale with your business growth.",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop",
    overview:
      "Our E-Commerce service builds online stores that convert browsers into buyers. We create custom e-commerce solutions and optimize existing platforms like Shopify and WooCommerce to maximize revenue. From product catalogs and shopping carts to payment processing and inventory management, we deliver complete e-commerce experiences that are fast, secure, and designed to drive sales growth.",
    whyNeeded:
      "E-commerce is projected to reach $8.1 trillion by 2026. A poorly optimized store loses 69% of carts to abandonment. Custom e-commerce solutions with optimized checkout flows, personalized experiences, and robust backend operations can increase conversion rates by 35% and average order value by 20%, directly impacting your bottom line.",
    challenges: [
      "Reducing cart abandonment through optimized checkout flows and trust-building elements",
      "Managing complex product catalogs with variants, bundles, subscriptions, and digital products",
      "Building fast product search and filtering that handles thousands of SKUs efficiently",
      "Integrating with payment gateways, shipping providers, and inventory systems seamlessly",
    ],
    features: [
      {
        title: "Custom Storefront Design",
        description:
          "Branded, conversion-optimized store designs with fast product pages, intuitive navigation, and mobile-first layouts.",
        icon: Paintbrush,
      },
      {
        title: "Smart Product Management",
        description:
          "Advanced catalog management with variants, bundles, subscriptions, digital products, and bulk operations.",
        icon: Boxes,
      },
      {
        title: "Optimized Checkout",
        description:
          "Streamlined checkout with guest checkout, one-click purchasing, multiple payment options, and minimal form friction.",
        icon: CreditCard,
      },
      {
        title: "Inventory & Order Management",
        description:
          "Real-time stock tracking, automated reorder points, multi-location inventory, and order fulfillment workflows.",
        icon: Package,
      },
      {
        title: "Personalization Engine",
        description:
          "AI-powered product recommendations, personalized content, and dynamic pricing based on user behavior.",
        icon: Target,
      },
      {
        title: "Analytics & Optimization",
        description:
          "Sales analytics, conversion funnels, A/B testing, and customer lifetime value tracking for data-driven growth.",
        icon: TrendingUp,
      },
    ],
    benefits: [
      "Increase conversion rates with optimized checkout and user experience design",
      "Scale to unlimited products and orders without platform limitations",
      "Automate inventory management and order fulfillment workflows",
      "Deliver personalized shopping experiences that increase average order value",
      "Gain complete control over your store's design, features, and data",
      "Integrate with your existing ERP, CRM, and marketing tools seamlessly",
    ],
    process: [
      {
        step: "E-Commerce Strategy",
        description:
          "Analyzing your product catalog, customer base, competitors, and business model to define the optimal e-commerce approach.",
      },
      {
        step: "Platform Selection",
        description:
          "Choosing between custom builds, Shopify Plus, WooCommerce, or headless commerce based on your specific requirements.",
      },
      {
        step: "Design & UX",
        description:
          "Creating conversion-optimized store designs with intuitive navigation, fast product pages, and frictionless checkout.",
      },
      {
        step: "Development & Integration",
        description:
          "Building the storefront, backend systems, payment processing, shipping calculators, and third-party integrations.",
      },
      {
        step: "Product Population",
        description:
          "Importing products, optimizing descriptions and images, setting up categories, and configuring pricing and inventory.",
      },
      {
        step: "Testing & Optimization",
        description:
          "End-to-end purchase flow testing, performance optimization, security auditing, and conversion rate optimization.",
      },
      {
        step: "Launch & Growth",
        description:
          "Go-live with monitoring, followed by ongoing optimization, marketing integration, and feature enhancements.",
      },
    ],
    technologies: [
      {
        name: "Shopify & Shopify Plus",
        description:
          "Leading e-commerce platform with extensive app ecosystem, reliable infrastructure, and enterprise capabilities",
      },
      {
        name: "Next.js Commerce",
        description:
          "Headless commerce framework for building ultra-fast, customizable storefronts with modern JavaScript",
      },
      {
        name: "WooCommerce",
        description:
          "Flexible WordPress-based e-commerce plugin ideal for content-heavy stores and businesses already using WordPress",
      },
      {
        name: "Stripe & PayPal",
        description:
          "Secure payment processing with support for cards, digital wallets, buy-now-pay-later, and international payments",
      },
    ],
    whyYesBe: [
      {
        title: "Conversion Optimization Focus",
        description:
          "We design every element with conversions in mind — from product page layouts to checkout flow to post-purchase upsells.",
      },
      {
        title: "Platform Agnostic",
        description:
          "We recommend the right platform for your business, not the one that benefits us. Sometimes Shopify is right, sometimes custom is better.",
      },
      {
        title: "Growth-Ready Architecture",
        description:
          "Our solutions are built to scale — from handling Black Friday traffic spikes to expanding into international markets.",
      },
      {
        title: "Full-Service Capability",
        description:
          "Beyond development, we advise on UX strategy, conversion optimization, and technical SEO for e-commerce.",
      },
    ],
    caseStudy: {
      title:
        "Shopify Plus Migration for a D2C Fashion Brand Processing $2M+ Annually",
      outcome:
        "Migrated from WooCommerce to Shopify Plus, resulting in 47% faster page loads, 28% increase in conversion rate, and 35% reduction in cart abandonment.",
      metric: "28% conversion increase",
    },
    faq: [
      {
        question: "Shopify vs custom — which should I choose?",
        answer:
          "Shopify is ideal for most businesses due to its reliability, app ecosystem, and ease of management. Custom builds make sense for unique business models, complex product configurations, or when you need complete control. We'll help you choose based on your specific needs.",
      },
      {
        question: "Can you migrate my existing store to a new platform?",
        answer:
          "Yes. We handle complete migrations including products, customers, orders, and content. We plan migrations carefully to ensure zero data loss and minimal downtime.",
      },
      {
        question: "How do you improve checkout conversion?",
        answer:
          "We apply checkout optimization best practices: reducing form fields, adding trust signals, offering multiple payment methods, enabling guest checkout, and implementing one-click purchasing where possible.",
      },
      {
        question: "Do you handle product photography and content?",
        answer:
          "We focus on the technical build, but we partner with professional photographers and copywriters who specialize in e-commerce content. We can coordinate the entire process for you.",
      },
    ],
    relatedSolutions: ["website-development", "seo", "digital-marketing"],
  },

  // 7. Business Automation
  {
    slug: "business-automation",
    title: "Business Automation",
    shortTitle: "Automation",
    icon: Workflow,
    category: "Business Solutions",
    description:
      "End-to-end business process automation that eliminates repetitive tasks, reduces errors, and frees your team to focus on high-value strategic work.",
    heroImage:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=600&fit=crop",
    overview:
      "Our Business Automation service identifies, designs, and implements automated workflows that transform how your business operates. We analyze your manual processes, design optimized automated workflows, and deploy solutions using industry-leading tools and custom integrations. From simple task automation to complex multi-step business processes, we eliminate inefficiency and human error while dramatically increasing throughput.",
    whyNeeded:
      "Knowledge workers spend 60% of their time on tasks that could be automated — data entry, approvals, report generation, and notifications. Business automation reduces operational costs by 25-50%, eliminates human error, accelerates process completion by 10x, and allows your team to focus on strategic work that drives growth instead of repetitive manual tasks.",
    challenges: [
      "Identifying the highest-impact automation opportunities among dozens of potential candidates",
      "Integrating automation across multiple disconnected systems without creating new bottlenecks",
      "Handling exceptions and edge cases gracefully while maintaining automated process flow",
      "Ensuring automated processes comply with regulatory requirements and audit trails",
    ],
    features: [
      {
        title: "Workflow Orchestration",
        description:
          "Complex multi-step workflows with conditional logic, parallel processing, and error handling across systems.",
        icon: Workflow,
      },
      {
        title: "Document Processing",
        description:
          "Automated document generation, data extraction, classification, and routing for invoices, contracts, and reports.",
        icon: FileText,
      },
      {
        title: "Approval Automation",
        description:
          "Configurable approval chains with notifications, escalations, and deadline management for faster decision cycles.",
        icon: CheckCircle,
      },
      {
        title: "Data Synchronization",
        description:
          "Real-time and scheduled data sync between systems ensuring consistency without manual data entry.",
        icon: RefreshCw,
      },
      {
        title: "Notification & Alerting",
        description:
          "Smart notifications via email, Slack, Teams, and SMS triggered by events, deadlines, or threshold breaches.",
        icon: Bell,
      },
      {
        title: "Process Analytics",
        description:
          "End-to-end visibility into automated processes with bottleneck identification and optimization recommendations.",
        icon: Activity,
      },
    ],
    benefits: [
      "Eliminate repetitive manual tasks and reduce human error by up to 99%",
      "Process tasks 10x faster with automated workflows running 24/7",
      "Reduce operational costs by 25-50% through intelligent automation",
      "Improve compliance with automated audit trails and process documentation",
      "Free your team to focus on strategic, creative, and high-value activities",
      "Scale operations without proportional headcount increases",
    ],
    process: [
      {
        step: "Process Audit",
        description:
          "We map your current processes, identify bottlenecks, and quantify the time and cost of manual operations.",
      },
      {
        step: "Automation Strategy",
        description:
          "Prioritizing automation opportunities by impact, complexity, and ROI to create an implementation roadmap.",
      },
      {
        step: "Workflow Design",
        description:
          "Designing optimized automated workflows that eliminate unnecessary steps and streamline decision points.",
      },
      {
        step: "Integration Architecture",
        description:
          "Mapping system connections, API requirements, and data flow between your existing tools and platforms.",
      },
      {
        step: "Build & Configure",
        description:
          "Implementing automations using Zapier, Make, Power Automate, or custom solutions based on requirements.",
      },
      {
        step: "Test & Validate",
        description:
          "Thorough testing of all automation paths including happy paths, exceptions, and edge cases.",
      },
      {
        step: "Deploy & Monitor",
        description:
          "Rolling out automations with monitoring dashboards, alerting, and ongoing optimization based on performance data.",
      },
    ],
    technologies: [
      {
        name: "Zapier & Make (Integromat)",
        description:
          "No-code automation platforms connecting 5,000+ apps with visual workflow builders and advanced logic",
      },
      {
        name: "Microsoft Power Automate",
        description:
          "Enterprise workflow automation deeply integrated with Microsoft 365, Dynamics, and Azure services",
      },
      {
        name: "n8n & Activepieces",
        description:
          "Open-source workflow automation for self-hosted solutions with full data control and customization",
      },
      {
        name: "Custom API Integrations",
        description:
          "Bespoke integration solutions for systems without pre-built connectors or complex data transformation needs",
      },
    ],
    whyYesBe: [
      {
        title: "Process Expertise",
        description:
          "We don't just automate bad processes — we optimize workflows first, then automate the improved version for maximum impact.",
      },
      {
        title: "Tool Selection",
        description:
          "We recommend the right automation platform for your needs — not the most expensive one. Sometimes Zapier is perfect; sometimes you need custom code.",
      },
      {
        title: "Exception Handling",
        description:
          "Real business processes have exceptions. Our automations gracefully handle edge cases instead of silently failing.",
      },
      {
        title: "Measurable Results",
        description:
          "Every automation project includes time-tracking and cost-saving metrics so you can see the exact ROI of your investment.",
      },
    ],
    caseStudy: {
      title:
        "End-to-End Sales Process Automation for a B2B Services Company",
      outcome:
          "Automated lead capture, qualification, proposal generation, and contract signing reduced average deal cycle from 21 days to 8 days while improving follow-up consistency.",
      metric: "62% faster deal cycles",
    },
    faq: [
      {
        question: "What processes are best suited for automation?",
        answer:
          "Processes that are repetitive, rule-based, time-sensitive, or error-prone are ideal candidates. Common examples include data entry between systems, approval workflows, report generation, onboarding checklists, and invoice processing.",
      },
      {
        question: "Do we need to change our existing tools?",
        answer:
          "Not necessarily. Most automations connect your existing tools through their APIs. We design automations that work within your current technology stack, only recommending new tools when they provide significant value.",
      },
      {
        question: "How long does automation implementation take?",
        answer:
          "Simple automations like email notifications or data sync can be set up in days. Complex multi-system workflows typically take 2-4 weeks. We start with quick wins that deliver immediate value.",
      },
      {
        question: "What happens when an automation fails?",
        answer:
          "We build error handling into every automation: automatic retries, fallback paths, and immediate alerts to your team. You'll know instantly if something goes wrong, with enough context to fix it quickly.",
      },
    ],
    relatedSolutions: ["ai-solutions", "erp-systems", "data-analytics"],
  },

  // 8. Data Analytics
  {
    slug: "data-analytics",
    title: "Data Analytics",
    shortTitle: "Analytics",
    icon: BarChart3,
    category: "Data & Intelligence",
    description:
      "Transform raw data into actionable insights with custom dashboards, predictive analytics, and data strategies that drive smarter business decisions.",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    overview:
      "Our Data Analytics service turns your data into your most valuable strategic asset. We design and implement end-to-end analytics solutions — from data warehousing and ETL pipelines to interactive dashboards and predictive models. Whether you need executive dashboards, operational metrics, or customer behavior analysis, we deliver clear, actionable insights that help you make faster, data-driven decisions.",
    whyNeeded:
      "Organizations that leverage data-driven decision making are 23x more likely to acquire customers and 6x more likely to retain them. Yet 73% of enterprise data goes unused for analytics. Our service helps you harness this untapped potential to identify opportunities, optimize operations, and predict trends before competitors.",
    challenges: [
      "Consolidating data from disparate sources into a unified, trustworthy data foundation",
      "Building dashboards that provide actionable insights rather than overwhelming with vanity metrics",
      "Establishing data governance and quality standards that ensure reliable, consistent analytics",
      "Moving beyond descriptive analytics to predictive and prescriptive insights that drive action",
    ],
    features: [
      {
        title: "Custom Dashboard Development",
        description:
          "Interactive, role-specific dashboards that surface the metrics that matter most to each stakeholder.",
        icon: LayoutDashboard,
      },
      {
        title: "Data Warehousing",
        description:
          "Centralized data repositories that consolidate information from multiple sources into a single source of truth.",
        icon: Database,
      },
      {
        title: "ETL Pipeline Design",
        description:
          "Automated data extraction, transformation, and loading pipelines that keep your analytics data fresh and accurate.",
        icon: GitBranch,
      },
      {
        title: "Predictive Analytics",
        description:
          "Statistical models and machine learning algorithms that forecast trends, demand, and business outcomes.",
        icon: TrendingUp,
      },
      {
        title: "KPI & Metric Design",
        description:
          "Strategic metric frameworks aligned with business objectives that measure what actually matters.",
        icon: Target,
      },
      {
        title: "Data Visualization",
        description:
          "Compelling charts, graphs, and infographics that make complex data accessible and actionable for any audience.",
        icon: PieChart,
      },
    ],
    benefits: [
      "Make faster decisions backed by real-time data instead of gut feeling",
      "Identify revenue opportunities and cost savings hidden in your data",
      "Track business performance against strategic goals with clear KPI dashboards",
      "Predict trends and market shifts before they impact your business",
      "Improve operational efficiency through data-driven process optimization",
      "Build a data-driven culture that compounds insights over time",
    ],
    process: [
      {
        step: "Data Assessment",
        description:
          "Evaluating your current data landscape: sources, quality, accessibility, and readiness for analytics.",
      },
      {
        step: "Analytics Strategy",
        description:
          "Defining key questions your data should answer, selecting metrics, and designing the analytics roadmap.",
      },
      {
        step: "Data Infrastructure",
        description:
          "Setting up data warehouses, ETL pipelines, and processing frameworks for reliable, scalable analytics.",
      },
      {
        step: "Metric & Dashboard Design",
        description:
          "Creating interactive dashboards and reports tailored to different stakeholder roles and decisions.",
      },
      {
        step: "Advanced Analytics",
        description:
          "Building predictive models, segmentation analyses, and advanced statistical insights for deeper understanding.",
      },
      {
        step: "Training & Adoption",
        description:
          "Training your team to use dashboards effectively and fostering a data-driven decision-making culture.",
      },
      {
        step: "Ongoing Optimization",
        description:
          "Continuous monitoring, metric refinement, and insight development as your data and questions evolve.",
      },
    ],
    technologies: [
      {
        name: "Power BI & Tableau",
        description:
          "Industry-leading BI platforms for interactive dashboards, ad-hoc analysis, and enterprise reporting",
      },
      {
        name: "BigQuery & Snowflake",
        description:
          "Cloud data warehouses designed for massive-scale analytics with fast query performance and cost efficiency",
      },
      {
        name: "Apache Airflow",
        description:
          "Workflow orchestration platform for building, scheduling, and monitoring complex data pipelines",
      },
      {
        name: "dbt (Data Build Tool)",
        description:
          "SQL-based transformation layer for cleaning, modeling, and documenting data within your warehouse",
      },
    ],
    whyYesBe: [
      {
        title: "Business-First Analytics",
        description:
          "We start with business questions, not data. Every dashboard and report is designed to drive specific decisions.",
      },
      {
        title: "Data Quality Obsession",
        description:
          "Bad data leads to bad decisions. We build robust data quality checks and governance from the foundation up.",
      },
      {
        title: "Actionable Insights",
        description:
          "We don't just build dashboards — we deliver insights. Our analytics include recommendations and context, not just numbers.",
      },
      {
        title: "Scalable Foundations",
        description:
          "Our data infrastructure grows with your needs — from initial dashboards to advanced ML-powered analytics.",
      },
    ],
    caseStudy: {
      title:
        "Enterprise Analytics Platform for a Retail Chain with 200+ Locations",
      outcome:
        "Built a unified analytics platform consolidating POS, inventory, and customer data across 200 stores, enabling real-time performance monitoring and predictive demand forecasting with 92% accuracy.",
      metric: "92% forecast accuracy",
    },
    faq: [
      {
        question: "How quickly can we start seeing insights?",
        answer:
          "With our phased approach, you'll have initial dashboards and insights within 3-4 weeks. More advanced analytics like predictive models typically build on this foundation over the following weeks.",
      },
      {
        question: "What if our data is messy or scattered across systems?",
        answer:
          "That's exactly why businesses need us. We specialize in data consolidation and cleansing. A significant part of our work is building the data infrastructure that makes analytics possible.",
      },
      {
        question: "Can we build dashboards ourselves after you set things up?",
        answer:
          "Absolutely. We design dashboards for self-service and train your team to create and modify reports independently. We also provide templates and documentation for ongoing dashboard development.",
      },
      {
        question: "Which BI tool should we use?",
        answer:
          "It depends on your needs. We typically recommend Power BI for Microsoft-centric organizations, Tableau for complex visual analytics, and Looker for companies already using Google Cloud. We'll help you choose based on your specific requirements and budget.",
      },
    ],
    relatedSolutions: [
      "power-bi-dashboards",
      "database-management",
      "ai-solutions",
    ],
  },

  // 9. Power BI Dashboards
  {
    slug: "power-bi-dashboards",
    title: "Power BI Dashboards",
    shortTitle: "Power BI",
    icon: BarChart3,
    category: "Data & Intelligence",
    description:
      "Expert Power BI dashboard design, development, and consulting that transforms your data into stunning, interactive visualizations for data-driven decisions.",
    heroImage:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&h=600&fit=crop",
    overview:
      "Our Power BI Dashboards service delivers professional Microsoft Power BI implementations that unlock the full potential of your data. From initial data modeling and DAX optimization to pixel-perfect report design and enterprise deployment, we create Power BI solutions that provide real-time visibility into every aspect of your business. Our certified Power BI experts build dashboards that executives love and teams actually use.",
    whyNeeded:
      "Power BI is the most widely adopted BI platform, but 70% of implementations underperform due to poor data modeling, confusing layouts, and lack of governance. Expert Power BI development ensures your dashboards are fast, accurate, visually compelling, and adopted by the teams who need them — turning your Microsoft investment into genuine business intelligence.",
    challenges: [
      "Designing data models that perform well at scale with millions of rows and complex relationships",
      "Optimizing DAX measures and queries for fast report rendering without slowing down source systems",
      "Creating intuitive layouts that different user roles can navigate without training or documentation",
      "Establishing governance, security, and refresh schedules for enterprise-grade Power BI deployments",
    ],
    features: [
      {
        title: "Executive Dashboard Design",
        description:
          "C-suite ready dashboards with KPI tracking, trend analysis, and drill-down capabilities in clean, modern layouts.",
        icon: LayoutDashboard,
      },
      {
        title: "Data Modeling & DAX",
        description:
          "Optimized star schema data models with advanced DAX measures for complex calculations and time intelligence.",
        icon: Database,
      },
      {
        title: "Paginated Reports",
        description:
          "Print-ready, pixel-perfect paginated reports for regulatory filings, financial statements, and operational documents.",
        icon: FileText,
      },
      {
        title: "Row-Level Security",
        description:
          "Granular access controls ensuring users see only data relevant to their role, department, or region.",
        icon: Lock,
      },
      {
        title: "Gateway & Refresh Configuration",
        description:
          "Optimized data refresh schedules and gateway configurations for real-time and scheduled data updates.",
        icon: RefreshCw,
      },
      {
        title: "Power BI Training",
        description:
          "Hands-on training sessions empowering your team to create, modify, and maintain Power BI reports independently.",
        icon: Users,
      },
    ],
    benefits: [
      "Get a single source of truth with optimized data models and governance",
      "Reduce report generation time from hours to seconds with automated dashboards",
      "Enable self-service analytics so every team member can explore data independently",
      "Ensure data security with enterprise-grade row-level security and access controls",
      "Maximize ROI on your Microsoft 365 and Power Platform investment",
      "Access insights anywhere with mobile-optimized Power BI dashboards",
    ],
    process: [
      {
        step: "Requirements Gathering",
        description:
          "Identifying key metrics, user roles, data sources, and dashboard requirements through stakeholder interviews.",
      },
      {
        step: "Data Source Analysis",
        description:
          "Assessing available data sources, quality, and connectivity options to design the optimal data architecture.",
      },
      {
        step: "Data Model Design",
        description:
          "Building star schema data models with optimized relationships, calculated columns, and DAX measures.",
      },
      {
        step: "Dashboard Design",
        description:
          "Creating wireframes and visual designs for dashboards that balance aesthetics with information density.",
      },
      {
        step: "Development & DAX",
        description:
          "Implementing interactive reports with advanced DAX calculations, drill-throughs, and cross-filtering.",
      },
      {
        step: "Security & Governance",
        description:
          "Configuring row-level security, workspace permissions, refresh schedules, and deployment pipelines.",
      },
      {
        step: "Training & Handoff",
        description:
          "Comprehensive training for report creators and consumers, with documentation and ongoing support.",
      },
    ],
    technologies: [
      {
        name: "Power BI Desktop & Service",
        description:
          "Microsoft's full BI platform for creating, sharing, and collaborating on interactive business intelligence reports",
      },
      {
        name: "DAX (Data Analysis Expressions)",
        description:
          "Formula language for creating custom calculations, time intelligence, and complex business logic in Power BI",
      },
      {
        name: "Power Query (M Language)",
        description:
          "ETL tool for connecting to 100+ data sources, transforming data, and creating refreshable data connections",
      },
      {
        name: "Azure Data Factory",
        description:
          "Cloud ETL service for building complex data pipelines that feed Power BI with enterprise-scale data",
      },
    ],
    whyYesBe: [
      {
        title: "Certified Power BI Experts",
        description:
          "Our team holds Microsoft Power BI certifications and has built hundreds of dashboards across industries.",
      },
      {
        title: "Performance Optimization",
        description:
          "We specialize in DAX optimization and data modeling that keeps dashboards fast even with millions of rows.",
      },
      {
        title: "User Adoption Focus",
        description:
          "We design for usability, not just functionality. Our dashboards are intuitive enough that teams actually use them daily.",
      },
      {
        title: "Enterprise Governance",
        description:
          "We implement proper governance frameworks including workspaces, deployment pipelines, and security policies.",
      },
    ],
    caseStudy: {
      title:
        "Power BI Dashboard Suite for a Financial Services Firm",
      outcome:
        "Created 25 interconnected Power BI dashboards covering financial performance, risk metrics, and compliance reporting, reducing monthly reporting time from 5 days to 4 hours.",
      metric: "96% faster reporting",
    },
    faq: [
      {
        question: "How many dashboards can you build?",
        answer:
          "We typically start with a core set of 3-5 high-impact dashboards and expand from there. The number depends on your data maturity and reporting needs — some clients need 5 dashboards, others need 50+.",
      },
      {
        question: "Can you connect Power BI to our specific data sources?",
        answer:
          "Power BI connects to 100+ data sources natively. We've connected to SQL Server, Oracle, Salesforce, SAP, Excel, Google Analytics, and custom APIs. If it has data, we can connect it.",
      },
      {
        question: "How often should dashboards refresh?",
        answer:
          "It depends on the data and use case. Financial dashboards might need real-time or hourly refresh. Operational dashboards typically work well with daily refresh. We configure optimal refresh schedules based on your requirements and data source capabilities.",
      },
      {
        question: "Do you offer ongoing Power BI support?",
        answer:
          "Yes. We offer maintenance packages that include dashboard updates, new report development, DAX optimization, and user support. We can also train your internal team to become self-sufficient.",
      },
    ],
    relatedSolutions: ["data-analytics", "erp-systems", "ai-solutions"],
  },

  // 10. Cloud & DevOps
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    shortTitle: "Cloud",
    icon: Cloud,
    category: "Infrastructure",
    description:
      "Cloud infrastructure design, migration, and DevOps automation that delivers 99.99% uptime, infinite scalability, and deployment pipelines that ship in minutes.",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    overview:
      "Our Cloud & DevOps service architects, builds, and manages cloud infrastructure that powers your applications with enterprise-grade reliability and performance. We design infrastructure-as-code, implement CI/CD pipelines, and establish DevOps practices that enable your team to deploy confidently multiple times per day. From initial cloud migration to ongoing infrastructure management, we ensure your systems are secure, scalable, and always available.",
    whyNeeded:
      "Downtime costs businesses $5,600 per minute on average. Manual deployments introduce errors, slow release cycles, and create fear around shipping changes. Cloud-native architectures with proper DevOps practices enable 99.99% uptime, 200x more frequent deployments, and 24x faster recovery from failures — transforming your infrastructure from a bottleneck into a competitive advantage.",
    challenges: [
      "Migrating legacy applications to cloud without disrupting business operations or data integrity",
      "Designing cost-effective architectures that scale with demand without runaway cloud bills",
      "Implementing comprehensive monitoring and alerting before incidents impact users",
      "Establishing DevOps culture and practices that accelerate delivery without sacrificing reliability",
    ],
    features: [
      {
        title: "Cloud Architecture Design",
        description:
          "Well-architected infrastructure designs optimized for performance, security, reliability, and cost efficiency.",
        icon: Layers,
      },
      {
        title: "Infrastructure as Code",
        description:
          "Terraform, Pulumi, and CloudFormation templates for version-controlled, repeatable, auditable infrastructure.",
        icon: Terminal,
      },
      {
        title: "CI/CD Pipelines",
        description:
          "Automated build, test, and deployment pipelines that enable safe, frequent releases with zero-downtime deployments.",
        icon: GitBranch,
      },
      {
        title: "Containerization & Orchestration",
        description:
          "Docker containerization and Kubernetes orchestration for portable, scalable application deployment.",
        icon: Boxes,
      },
      {
        title: "Monitoring & Observability",
        description:
          "Comprehensive monitoring with metrics, logging, tracing, and intelligent alerting for proactive incident response.",
        icon: Activity,
      },
      {
        title: "Security & Compliance",
        description:
          "Cloud security best practices including IAM, network security, encryption, and compliance automation.",
        icon: Shield,
      },
    ],
    benefits: [
      "Achieve 99.99% uptime with redundant, self-healing cloud architectures",
      "Deploy multiple times per day with confidence using automated CI/CD pipelines",
      "Scale infrastructure automatically to handle traffic spikes without manual intervention",
      "Reduce cloud costs by 30-50% through right-sizing, reserved instances, and optimization",
      "Recover from incidents in minutes instead of hours with automated failover and rollback",
      "Maintain complete audit trail of infrastructure changes for compliance requirements",
    ],
    process: [
      {
        step: "Infrastructure Assessment",
        description:
          "Evaluating current infrastructure, identifying pain points, and assessing cloud readiness and migration complexity.",
      },
      {
        step: "Cloud Strategy & Architecture",
        description:
          "Designing target architecture aligned with Well-Architected Framework principles for your specific workload requirements.",
      },
      {
        step: "Infrastructure as Code Setup",
        description:
          "Building IaC templates, establishing version control, and creating reusable modules for consistent provisioning.",
      },
      {
        step: "Migration Execution",
        description:
          "Phased migration with testing at each stage, data validation, and rollback plans to ensure zero data loss.",
      },
      {
        step: "CI/CD Pipeline Implementation",
        description:
          "Building automated build, test, and deployment pipelines with staging environments and approval gates.",
      },
      {
        step: "Monitoring & Observability",
        description:
          "Deploying comprehensive monitoring, centralized logging, distributed tracing, and alerting systems.",
      },
      {
        step: "Optimization & Management",
        description:
          "Ongoing cost optimization, performance tuning, security patching, and infrastructure evolution.",
      },
    ],
    technologies: [
      {
        name: "AWS, Azure & GCP",
        description:
          "Multi-cloud expertise across all major providers, selecting the right platform for each workload and requirement",
      },
      {
        name: "Terraform & Pulumi",
        description:
          "Infrastructure as Code tools for provisioning and managing cloud resources across providers declaratively",
      },
      {
        name: "Docker & Kubernetes",
        description:
          "Container platform for building, deploying, and scaling applications consistently across environments",
      },
      {
        name: "GitHub Actions & ArgoCD",
        description:
          "CI/CD platforms for automated testing, building, and deploying applications with GitOps workflows",
      },
    ],
    whyYesBe: [
      {
        title: "Cloud-Native Expertise",
        description:
          "We design for the cloud from the ground up, leveraging managed services, serverless, and cloud-native patterns for maximum benefit.",
      },
      {
        title: "Cost Optimization",
        description:
          "Cloud bills are a common pain point. We architect for cost efficiency and continuously optimize spending post-deployment.",
      },
      {
        title: "Security by Design",
        description:
          "Security is built into our infrastructure patterns from day one, not bolted on after deployment.",
      },
      {
        title: "Operational Excellence",
        description:
          "We don't just build and leave. Our managed services ensure your infrastructure stays performant, secure, and cost-effective.",
      },
    ],
    caseStudy: {
      title:
        "Cloud Migration for a Financial Platform Processing 1M+ Daily Transactions",
      outcome:
        "Migrated from on-premise data center to AWS, achieving 99.995% uptime, 40% infrastructure cost reduction, and deployment frequency from monthly to multiple times daily.",
      metric: "40% cost reduction",
    },
    faq: [
      {
        question: "Which cloud provider should we choose?",
        answer:
          "It depends on your specific needs. AWS offers the broadest services, Azure integrates best with Microsoft ecosystems, and GCP excels in data analytics and AI. We evaluate your requirements and recommend the best fit, often using multi-cloud strategies.",
      },
      {
        question: "How disruptive is cloud migration?",
        answer:
          "Our phased migration approach ensures zero downtime. We migrate workloads incrementally, testing thoroughly at each stage, with rollback plans for every phase. Most migrations are invisible to end users.",
      },
      {
        question: "Can you reduce our current cloud costs?",
        answer:
          "We frequently save clients 30-50% on cloud costs through right-sizing, Reserved Instance planning, Spot instances, architectural optimization, and eliminating unused resources. We start with a cost audit to identify immediate savings.",
      },
      {
        question: "Do you offer managed infrastructure services?",
        answer:
          "Yes. We provide ongoing infrastructure management including monitoring, patching, scaling, cost optimization, and incident response. Our managed services let you focus on your applications while we keep the infrastructure running perfectly.",
      },
    ],
    relatedSolutions: ["web-applications", "database-management", "api-development"],
  },

  // 11. Database Management
  {
    slug: "database-management",
    title: "Database Management",
    shortTitle: "Databases",
    icon: Database,
    category: "Infrastructure",
    description:
      "Expert database design, optimization, migration, and management that ensures your data layer is fast, reliable, secure, and ready to scale with your business.",
    heroImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=600&fit=crop",
    overview:
      "Our Database Management service ensures your most critical asset — your data — is properly designed, optimized, and managed for peak performance. We handle database architecture, performance tuning, migration, backup strategies, and ongoing administration for SQL, NoSQL, and hybrid database environments. Whether you need a new database designed from scratch or your existing databases optimized for better performance, our experts deliver reliable, scalable data infrastructure.",
    whyNeeded:
      "Database performance directly impacts application speed and user experience. Poorly designed databases cause slow queries, data inconsistencies, and scalability bottlenecks. 40% of application downtime is database-related. Expert database management ensures your data layer performs optimally, remains secure, scales seamlessly, and is protected against data loss.",
    challenges: [
      "Optimizing query performance for complex joins and aggregations across large datasets",
      "Planning and executing zero-downtime database migrations with data integrity validation",
      "Designing backup and disaster recovery strategies that meet RPO and RTO requirements",
      "Managing database growth while maintaining consistent performance as data volumes increase",
    ],
    features: [
      {
        title: "Database Architecture Design",
        description:
          "Schema design, indexing strategies, and partition planning optimized for your application's access patterns.",
        icon: Layers,
      },
      {
        title: "Performance Tuning",
        description:
          "Query optimization, index tuning, connection pooling, and caching strategies for maximum throughput and minimal latency.",
        icon: Gauge,
      },
      {
        title: "Migration Services",
        description:
          "Zero-downtime database migrations between platforms with data validation, rollback plans, and minimal disruption.",
        icon: ArrowRight,
      },
      {
        title: "Backup & Recovery",
        description:
          "Automated backup strategies with point-in-time recovery, cross-region replication, and disaster recovery planning.",
        icon: RefreshCw,
      },
      {
        title: "Security & Compliance",
        description:
          "Encryption at rest and in transit, access controls, audit logging, and compliance with SOC2, HIPAA, and GDPR.",
        icon: Shield,
      },
      {
        title: "Monitoring & Alerting",
        description:
          "Real-time database health monitoring with performance metrics, slow query detection, and capacity planning alerts.",
        icon: Activity,
      },
    ],
    benefits: [
      "Achieve sub-millisecond query response times with optimized schemas and indexing",
      "Eliminate database-related downtime with proper architecture and failover strategies",
      "Scale to millions of rows without performance degradation through smart partitioning",
      "Ensure data is never lost with automated backups and tested recovery procedures",
      "Reduce database hosting costs through optimization and right-sizing",
      "Meet compliance requirements with built-in security controls and audit trails",
    ],
    process: [
      {
        step: "Database Assessment",
        description:
          "Comprehensive review of current database performance, schema design, indexing, and configuration.",
      },
      {
        step: "Architecture Planning",
        description:
          "Designing optimal database architecture including schema, indexes, partitioning, and replication strategies.",
      },
      {
        step: "Implementation & Optimization",
        description:
          "Building or refactoring database schemas, implementing indexing strategies, and optimizing queries.",
      },
      {
        step: "Migration Execution",
        description:
          "Planning and executing data migration with validation, testing, and rollback procedures for zero data loss.",
      },
      {
        step: "Backup & Security Setup",
        description:
          "Configuring automated backups, access controls, encryption, and disaster recovery procedures.",
      },
      {
        step: "Monitoring Deployment",
        description:
          "Setting up database monitoring, performance dashboards, slow query logging, and alerting systems.",
      },
      {
        step: "Ongoing Management",
        description:
          "Continuous monitoring, performance tuning, capacity planning, and security patching for database health.",
      },
    ],
    technologies: [
      {
        name: "PostgreSQL & MySQL",
        description:
          "Reliable relational databases for transactional applications with ACID compliance and advanced features",
      },
      {
        name: "MongoDB & Redis",
        description:
          "Document and key-value databases for flexible schemas, caching, and high-performance data access",
      },
      {
        name: "Amazon RDS & Aurora",
        description:
          "Managed database services providing automated scaling, backups, and high availability in the cloud",
      },
      {
        name: "Database Migration Tools",
        description:
          "AWS DMS, pg_dump, and custom ETL scripts for safe, validated data migration between database platforms",
      },
    ],
    whyYesBe: [
      {
        title: "Platform Expertise",
        description:
          "Deep expertise across SQL and NoSQL platforms ensures we recommend and implement the right database for your workload.",
      },
      {
        title: "Performance Obsession",
        description:
          "We profile every query, optimize every index, and tune every configuration parameter for maximum database performance.",
      },
      {
        title: "Zero-Downtime Migrations",
        description:
          "Our proven migration methodology ensures your data moves safely between platforms with zero downtime and data loss.",
      },
      {
        title: "Proactive Management",
        description:
          "We monitor and optimize databases proactively, addressing performance issues before they impact users.",
      },
    ],
    caseStudy: {
      title:
        "Database Migration and Optimization for a Healthcare Platform",
      outcome:
        "Migrated from MySQL to PostgreSQL with schema optimization, reducing average query time from 340ms to 12ms and supporting 5x growth in patient records without performance degradation.",
      metric: "96% faster queries",
    },
    faq: [
      {
        question: "SQL vs NoSQL — which should I use?",
        answer:
          "SQL databases (PostgreSQL, MySQL) are ideal for structured data with relationships and ACID compliance. NoSQL (MongoDB, Redis) excels with flexible schemas, horizontal scaling, and specific access patterns. We help you choose based on your data model and requirements.",
      },
      {
        question: "How do you optimize slow database queries?",
        answer:
          "We use a systematic approach: query analysis, execution plan review, index optimization, schema refinement, and caching strategies. We also implement ongoing slow query monitoring to catch performance issues early.",
      },
      {
        question: "Can you migrate our database without downtime?",
        answer:
          "In most cases, yes. We use techniques like dual-writing, CDC (Change Data Capture), and atomic cutover to migrate data while your application continues running. For critical systems, we design and test the migration extensively before executing.",
      },
      {
        question: "How often should we back up our database?",
        answer:
          "It depends on your data change rate and recovery requirements. We typically recommend continuous replication for high-availability systems and hourly or daily backups with point-in-time recovery for standard workloads.",
      },
    ],
    relatedSolutions: ["cloud-devops", "api-development", "erp-systems"],
  },

  // 12. API Development
  {
    slug: "api-development",
    title: "API Development",
    shortTitle: "APIs",
    icon: Link2,
    category: "Web Development",
    description:
      "Design and development of robust, well-documented REST and GraphQL APIs that power your applications, enable integrations, and scale with your ecosystem.",
    heroImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    overview:
      "Our API Development service designs, builds, and documents APIs that serve as the backbone of modern software systems. We create RESTful and GraphQL APIs that are secure, performant, well-documented, and built to scale. Whether you need APIs to power your mobile app, connect with third-party services, or expose your data to partners, we deliver interfaces that developers love to use and that stand up to production demands.",
    whyNeeded:
      "APIs are the connective tissue of modern software — 83% of web traffic is API-driven. Poorly designed APIs cause integration nightmares, security vulnerabilities, and scalability limitations. Well-architected APIs accelerate development, enable partner ecosystems, and provide the foundation for mobile, web, and IoT applications to deliver seamless experiences.",
    challenges: [
      "Designing intuitive API interfaces that developers find easy to understand and integrate with",
      "Ensuring API security through authentication, rate limiting, and protection against common attack vectors",
      "Managing API versioning and backward compatibility without breaking existing integrations",
      "Achieving consistent performance under high load with proper caching and optimization strategies",
    ],
    features: [
      {
        title: "RESTful API Design",
        description:
          "Clean, consistent REST APIs following OpenAPI specification with proper resource modeling and HTTP semantics.",
        icon: Link2,
      },
      {
        title: "GraphQL APIs",
        description:
          "Flexible GraphQL schemas with resolvers, subscriptions, and optimized query execution for complex data needs.",
        icon: Waypoints,
      },
      {
        title: "Authentication & Security",
        description:
          "OAuth 2.0, JWT, API keys, and rate limiting with comprehensive security headers and input validation.",
        icon: Shield,
      },
      {
        title: "API Documentation",
        description:
          "Interactive API documentation with Swagger/OpenAPI, code examples, and sandbox environments for testing.",
        icon: FileText,
      },
      {
        title: "Webhooks & Event Systems",
        description:
          "Real-time event-driven APIs with webhook delivery, retry logic, and event subscription management.",
        icon: Zap,
      },
      {
        title: "API Gateway & Management",
        description:
          "Centralized API management with routing, throttling, analytics, and developer portal capabilities.",
        icon: Server,
      },
    ],
    benefits: [
      "Accelerate development by enabling parallel work across frontend, backend, and mobile teams",
      "Create partner ecosystems and open new revenue channels through API monetization",
      "Ensure consistent data access across web, mobile, and third-party integrations",
      "Scale independently — API layers can scale separately from database and application tiers",
      "Improve security with centralized authentication, authorization, and rate limiting",
      "Enable rapid prototyping and innovation with well-documented, reusable API components",
    ],
    process: [
      {
        step: "API Strategy & Design",
        description:
          "Defining API scope, resource models, authentication approach, and documentation strategy aligned with consumer needs.",
      },
      {
        step: "Schema & Contract Definition",
        description:
          "Creating OpenAPI or GraphQL schemas that define the API contract before any code is written.",
      },
      {
        step: "Backend Implementation",
        description:
          "Building API endpoints with proper error handling, validation, business logic, and database interactions.",
      },
      {
        step: "Security Implementation",
        description:
          "Adding authentication, authorization, rate limiting, input sanitization, and security headers.",
      },
      {
        step: "Documentation & SDK",
        description:
          "Creating interactive documentation, code samples, and client SDKs for easy developer integration.",
      },
      {
        step: "Testing & Load Testing",
        description:
          "Comprehensive API testing including unit tests, integration tests, security tests, and load tests.",
      },
      {
        step: "Deployment & Monitoring",
        description:
          "Deploying with CI/CD, setting up API analytics, performance monitoring, and version management.",
      },
    ],
    technologies: [
      {
        name: "Node.js & Express/Fastify",
        description:
          "High-performance JavaScript runtimes and frameworks for building fast, scalable API servers",
      },
      {
        name: "Python FastAPI & Django",
        description:
          "Modern Python frameworks for building APIs with automatic documentation, type safety, and async support",
      },
      {
        name: "GraphQL & Apollo",
        description:
          "GraphQL implementation tools for building flexible, type-safe APIs with efficient data fetching",
      },
      {
        name: "Swagger & Postman",
        description:
          "Industry-standard tools for API design, documentation, testing, and collaboration across teams",
      },
    ],
    whyYesBe: [
      {
        title: "Developer Experience Focus",
        description:
          "We design APIs that developers love to use — consistent naming, clear errors, comprehensive docs, and intuitive patterns.",
      },
      {
        title: "Security-First Approach",
        description:
          "Every API we build implements industry-standard authentication, authorization, and security best practices from day one.",
      },
      {
        title: "Scalable Architecture",
        description:
          "Our APIs are designed for scale — from connection pooling and caching to rate limiting and load balancing.",
      },
      {
        title: "Documentation Excellence",
        description:
          "Interactive documentation with code examples in multiple languages ensures fast partner and developer adoption.",
      },
    ],
    caseStudy: {
      title:
        "Partner API Platform for a FinTech Company",
      outcome:
        "Built a comprehensive partner API platform enabling 50+ third-party integrations, processing 2M+ API calls daily with 99.99% uptime and average response time under 100ms.",
      metric: "2M+ daily API calls",
    },
    faq: [
      {
        question: "REST vs GraphQL — which should we choose?",
        answer:
          "REST is simpler, well-understood, and ideal for standard CRUD operations. GraphQL shines when you have complex data requirements, multiple consumers with different data needs, or want to avoid over-fetching. We help you choose based on your specific use case.",
      },
      {
        question: "How do you handle API versioning?",
        answer:
          "We typically use URL-based versioning (/api/v1/) for simplicity and backward compatibility. We also implement deprecation notices and migration support to help consumers transition between versions smoothly.",
      },
      {
        question: "How do you secure public APIs?",
        answer:
          "We implement multiple security layers: OAuth 2.0 or API key authentication, rate limiting per consumer, input validation, HTTPS enforcement, CORS policies, and regular security audits against OWASP API Security Top 10.",
      },
      {
        question: "Can you help build a developer portal for our API?",
        answer:
          "Yes. We build custom developer portals with interactive documentation, API key management, usage analytics, code examples, and sandbox environments that make it easy for partners to integrate with your API.",
      },
    ],
    relatedSolutions: ["web-applications", "cloud-devops", "database-management"],
  },

  // 13. SEO
  {
    slug: "seo",
    title: "SEO",
    shortTitle: "SEO",
    icon: Search,
    category: "Digital Marketing",
    description:
      "Data-driven SEO strategies that drive organic traffic growth, improve search rankings, and deliver measurable ROI through technical optimization and content excellence.",
    heroImage:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=600&fit=crop",
    overview:
      "Our SEO service delivers comprehensive search engine optimization that drives sustainable organic growth. We combine technical SEO, content strategy, and authority building to improve your search rankings and drive qualified traffic. Our approach goes beyond rankings — we focus on organic traffic that converts into revenue, with transparent reporting that shows the direct business impact of every optimization.",
    whyNeeded:
      "Organic search drives 53% of all website traffic and generates 1000%+ more traffic than social media. The first page of Google captures 71% of clicks, while the top 3 results get 54% of all traffic. Without strategic SEO, your business is invisible to the majority of potential customers actively searching for your products and services.",
    challenges: [
      "Navigating constant Google algorithm updates while maintaining and improving rankings",
      "Building topical authority in competitive niches with established competitors",
      "Creating content that ranks well while genuinely serving user intent and driving conversions",
      "Proving SEO ROI with clear attribution between organic traffic and business revenue",
    ],
    features: [
      {
        title: "Technical SEO Audit & Optimization",
        description:
          "Comprehensive technical audits covering site speed, crawlability, indexability, Core Web Vitals, and schema markup.",
        icon: Settings,
      },
      {
        title: "Keyword Research & Strategy",
        description:
          "Data-driven keyword research identifying high-intent opportunities aligned with your business goals and user intent.",
        icon: Search,
      },
      {
        title: "On-Page Optimization",
        description:
          "Optimizing title tags, meta descriptions, headings, content structure, and internal linking for target keywords.",
        icon: FileText,
      },
      {
        title: "Content Strategy",
        description:
          "Strategic content planning and creation that builds topical authority and captures search demand at every funnel stage.",
        icon: PenTool,
      },
      {
        title: "Link Building & Authority",
        description:
          "White-hat link acquisition through digital PR, content marketing, and strategic outreach for domain authority growth.",
        icon: Link,
      },
      {
        title: "SEO Analytics & Reporting",
        description:
          "Transparent reporting with rankings, traffic, conversions, and ROI metrics tied directly to business outcomes.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Increase organic traffic by 100-300% within 6-12 months of consistent optimization",
      "Rank on page 1 of Google for high-intent keywords that drive qualified leads",
      "Build sustainable organic visibility that compounds over time without ongoing ad spend",
      "Improve conversion rates with SEO-optimized landing pages and content",
      "Gain competitive advantage through higher search visibility than competitors",
      "Establish topical authority that makes your website the go-to resource in your industry",
    ],
    process: [
      {
        step: "SEO Audit & Analysis",
        description:
          "Comprehensive audit of technical health, content gaps, competitor landscape, and backlink profile.",
      },
      {
        step: "Keyword & Competitor Research",
        description:
          "Identifying high-value keyword opportunities and analyzing competitor strategies to find gaps and advantages.",
      },
      {
        step: "Technical SEO Foundation",
        description:
          "Fixing technical issues: site speed, crawlability, mobile usability, schema markup, and Core Web Vitals.",
      },
      {
        step: "On-Page Optimization",
        description:
          "Optimizing existing content and pages for target keywords with improved structure, meta data, and internal linking.",
      },
      {
        step: "Content Creation & Optimization",
        description:
          "Developing new content targeting strategic keywords while building topical authority across your core subjects.",
      },
      {
        step: "Link Building & Outreach",
        description:
          "Executing white-hat link building campaigns through digital PR, guest posting, and strategic partnerships.",
      },
      {
        step: "Monitor & Iterate",
        description:
          "Ongoing performance monitoring, algorithm update adaptation, and continuous optimization based on data.",
      },
    ],
    technologies: [
      {
        name: "Ahrefs & SEMrush",
        description:
          "Industry-leading SEO platforms for keyword research, competitor analysis, rank tracking, and backlink monitoring",
      },
      {
        name: "Google Search Console",
        description:
          "Official Google tool for monitoring search performance, indexing status, and technical SEO health",
      },
      {
        name: "Screaming Frog",
        description:
          "Technical SEO crawler for comprehensive site audits, broken link detection, and redirect analysis",
      },
      {
        name: "PageSpeed Insights & Lighthouse",
        description:
          "Google performance tools for measuring and optimizing Core Web Vitals and page load speed",
      },
    ],
    whyYesBe: [
      {
        title: "Revenue-Focused SEO",
        description:
          "We measure success by revenue and leads, not just rankings. Every recommendation ties back to business impact.",
      },
      {
        title: "Technical Excellence",
        description:
          "Our technical SEO foundations are built to last — clean code, fast performance, and architecture that search engines reward.",
      },
      {
        title: "Transparent Reporting",
        description:
          "Monthly reports that clearly show rankings, traffic, conversions, and ROI — no vanity metrics or confusing jargon.",
      },
      {
        title: "Algorithm Resilience",
        description:
          "We build sustainable SEO strategies that withstand algorithm updates because they focus on genuinely best practices.",
      },
    ],
    caseStudy: {
      title:
        "SEO Growth Strategy for a B2B SaaS Company",
      outcome:
        "Increased organic traffic by 340% in 12 months, ranked page 1 for 120+ target keywords, and grew organic-driven pipeline by 280% — making SEO their #1 lead channel.",
      metric: "340% organic traffic growth",
    },
    faq: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "SEO is a long-term strategy. Most clients see meaningful traffic improvements within 3-6 months, with significant results in 6-12 months. Technical fixes can show faster improvements, while content and authority building compound over time.",
      },
      {
        question: "Do you guarantee #1 rankings?",
        answer:
          "No reputable SEO agency can guarantee specific rankings because search algorithms are constantly changing. What we do guarantee is proven methodologies, transparent reporting, and measurable improvements in organic traffic and revenue.",
      },
      {
        question: "How do you measure SEO ROI?",
        answer:
          "We set up proper conversion tracking in Google Analytics 4 and tie organic traffic to business outcomes — leads, signups, and revenue. Our reports show exactly how much revenue organic search drives each month.",
      },
      {
        question: "Can SEO work alongside paid advertising?",
        answer:
          "Absolutely. In fact, SEO and PPC work synergistically. We coordinate keyword strategies to maximize overall search visibility while SEO builds long-term organic presence that reduces dependence on paid traffic over time.",
      },
    ],
    relatedSolutions: ["website-development", "digital-marketing", "geo"],
  },

  // 14. GEO
  {
    slug: "geo",
    title: "GEO",
    shortTitle: "GEO",
    icon: Globe,
    category: "Digital Marketing",
    description:
      "Generative Engine Optimization that ensures your brand appears in AI-generated answers, chatbot responses, and next-generation search experiences.",
    heroImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    overview:
      "Our GEO (Generative Engine Optimization) service prepares your brand for the future of search — where AI models like ChatGPT, Google Gemini, and Perplexity generate answers instead of listing links. We optimize your content, structured data, and online presence to ensure your brand is cited, recommended, and surfaced in AI-generated responses. GEO is the evolution of SEO for the AI era, and early adopters gain a massive competitive advantage.",
    whyNeeded:
      "AI-powered search is rapidly replacing traditional search. 40% of queries now trigger AI-generated answers, and this number is growing monthly. Brands not optimized for AI models will become invisible as users shift from clicking links to asking AI questions. GEO ensures your business remains discoverable, cited, and recommended in the AI-first search landscape.",
    challenges: [
      "Understanding how AI models select, cite, and prioritize content in their responses",
      "Optimizing content to be cited by LLMs without traditional ranking signals like backlinks",
      "Ensuring brand consistency and accuracy across multiple AI platforms and models",
      "Measuring GEO performance when traditional analytics don't capture AI-referred visibility",
    ],
    features: [
      {
        title: "AI Visibility Audit",
        description:
          "Comprehensive assessment of how your brand currently appears in AI-generated responses across major platforms.",
        icon: Eye,
      },
      {
        title: "Content Optimization for LLMs",
        description:
          "Restructuring content to be AI-friendly: clear facts, authoritative statements, and citation-worthy formatting.",
        icon: FileText,
      },
      {
        title: "Structured Data Enhancement",
        description:
          "Schema markup and structured data optimization that AI models use to understand and cite your content.",
        icon: Database,
      },
      {
        title: "Brand Knowledge Panel",
        description:
          "Ensuring consistent, accurate brand information across knowledge graphs that feed AI model training data.",
        icon: Target,
      },
      {
        title: "Citation Strategy",
        description:
          "Building presence on authoritative sources that AI models reference when generating industry-specific answers.",
        icon: Link,
      },
      {
        title: "GEO Monitoring & Analytics",
        description:
          "Tracking brand mentions in AI responses and measuring visibility improvements across AI search platforms.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Appear in AI-generated answers when potential customers ask about your industry",
      "Gain first-mover advantage in the rapidly growing AI search landscape",
      "Build brand authority that AI models recognize and cite as a trusted source",
      "Future-proof your digital presence as search behavior evolves toward AI",
      "Reach users who never click traditional search results but rely on AI answers",
      "Establish your brand as an authoritative source in AI training data",
    ],
    process: [
      {
        step: "AI Visibility Assessment",
        description:
          "Testing how AI models currently represent your brand, competitors, and industry across major AI platforms.",
      },
      {
        step: "Content Gap Analysis",
        description:
          "Identifying content that needs optimization for AI citation: clarity, authority, structure, and factual accuracy.",
      },
      {
        step: "Content Restructuring",
        description:
          "Rewriting and reformatting key content to be AI-friendly with clear claims, statistics, and authoritative structure.",
      },
      {
        step: "Structured Data Implementation",
        description:
          "Enhancing schema markup, knowledge graph presence, and structured data for AI model comprehension.",
      },
      {
        step: "Authority Building",
        description:
          "Strategic citation building on authoritative platforms that AI models reference for industry information.",
      },
      {
        step: "Cross-Platform Optimization",
        description:
          "Ensuring consistent brand presence across Google, Bing, ChatGPT, Perplexity, and other AI platforms.",
      },
      {
        step: "Monitor & Adapt",
        description:
          "Ongoing monitoring of AI visibility with strategy adjustments as AI platforms and algorithms evolve.",
      },
    ],
    technologies: [
      {
        name: "Schema.org Markup",
        description:
          "Structured data vocabulary that helps AI models understand and accurately represent your business information",
      },
      {
        name: "Perplexity & ChatGPT APIs",
        description:
          "AI search platforms for testing brand visibility and understanding how AI models cite and reference content",
      },
      {
        name: "Knowledge Graph Tools",
        description:
          "Tools for managing and optimizing knowledge graph presence across Google, Bing, and other data providers",
      },
      {
        name: "AI Monitoring Platforms",
        description:
          "Emerging GEO analytics tools for tracking brand mentions and citation rates across AI-generated responses",
      },
    ],
    whyYesBe: [
      {
        title: "Pioneering GEO Expertise",
        description:
          "We're among the first agencies offering dedicated GEO services, with proven methodologies developed through early research.",
      },
      {
        title: "SEO + GEO Integration",
        description:
          "Our GEO strategies build on strong SEO foundations, ensuring you dominate both traditional and AI-powered search.",
      },
      {
        title: "Multi-Platform Approach",
        description:
          "We optimize for all major AI platforms — ChatGPT, Gemini, Perplexity, Copilot — not just one model.",
      },
      {
        title: "Future-Forward Strategy",
        description:
          "We stay ahead of AI search trends so you're always prepared for the next shift in how people find information.",
      },
    ],
    caseStudy: {
      title:
        "GEO Optimization for a Healthcare Technology Company",
      outcome:
        "Achieved brand citations in 78% of relevant AI-generated healthcare queries, up from 12% before optimization, resulting in a 180% increase in AI-referred website traffic.",
      metric: "78% AI citation rate",
    },
    faq: [
      {
        question: "What exactly is GEO?",
        answer:
          "GEO (Generative Engine Optimization) is the practice of optimizing your online presence to appear in AI-generated responses. As search shifts from listing links to generating answers, GEO ensures your brand is cited, recommended, and surfaced by AI models.",
      },
      {
        question: "Is GEO different from SEO?",
        answer:
          "GEO complements rather than replaces SEO. Traditional SEO focuses on ranking in search results. GEO focuses on being cited in AI-generated answers. Many strategies overlap — quality content, authority, and structured data benefit both.",
      },
      {
        question: "Which AI platforms should I optimize for?",
        answer:
          "We optimize for all major AI search platforms: ChatGPT (Bing-powered), Google Gemini, Perplexity, Microsoft Copilot, and emerging platforms. Each has different content preferences, and our strategies cover all of them.",
      },
      {
        question: "How do you measure GEO success?",
        answer:
          "We track brand mention rates in AI responses, AI-referred traffic, citation accuracy, and competitive visibility. We use a combination of AI monitoring tools and manual testing to measure improvement over time.",
      },
    ],
    relatedSolutions: ["seo", "aeo", "digital-marketing"],
  },

  // 15. AEO
  {
    slug: "aeo",
    title: "AEO",
    shortTitle: "AEO",
    icon: MessageCircle,
    category: "Digital Marketing",
    description:
      "Answer Engine Optimization that positions your brand to be the direct answer in featured snippets, voice assistants, and AI-powered answer engines.",
    heroImage:
      "https://images.unsplash.com/photo-1531746790095-e5cbfb1e2f0e?w=1200&h=600&fit=crop",
    overview:
      "Our AEO (Answer Engine Optimization) service ensures your content becomes the direct answer users get from featured snippets, voice assistants like Siri and Alexa, and AI answer engines. We optimize your content structure, FAQ pages, and knowledge base to be selected as the authoritative answer to questions your audience asks. AEO captures position zero — the answer that appears above all search results.",
    whyNeeded:
      "30% of all searches now show featured snippets, and 50% of voice search results come from featured snippets. When Siri, Alexa, or Google Assistant answers a question, they pull from optimized answer content. AEO ensures your brand provides those answers, establishing authority and capturing attention at the exact moment of user intent.",
    challenges: [
      "Structuring content to be selected as the definitive answer for voice and AI assistants",
      "Optimizing for conversational, long-tail queries that differ from traditional search patterns",
      "Maintaining answer accuracy across multiple voice platforms with different selection criteria",
      "Measuring AEO performance when answers are delivered without clicks or traditional attribution",
    ],
    features: [
      {
        title: "Featured Snippet Optimization",
        description:
          "Content structured to win position zero with concise, authoritative answers to high-volume queries.",
        icon: Award,
      },
      {
        title: "FAQ & Q&A Content",
        description:
          "Strategic FAQ pages and question-answer content optimized for featured snippet and voice assistant selection.",
        icon: MessageCircle,
      },
      {
        title: "Voice Search Optimization",
        description:
          "Content optimized for conversational, natural language queries that power voice assistant responses.",
        icon: Mic,
      },
      {
        title: "Schema Markup for Answers",
        description:
          "FAQPage, HowTo, and QAPage schema implementation that signals answer content to search engines.",
        icon: Database,
      },
      {
        title: "Knowledge Panel Optimization",
        description:
          "Ensuring your brand knowledge panel is accurate, complete, and optimized for direct answer selection.",
        icon: Target,
      },
      {
        title: "Answer Tracking & Analytics",
        description:
          "Monitoring your answer presence across search engines, voice platforms, and AI-powered answer engines.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Capture position zero above all traditional search results for target queries",
      "Be the source Siri, Alexa, and Google Assistant use when answering voice questions",
      "Establish your brand as the authoritative answer source in your industry",
      "Drive brand awareness even without traditional click-through traffic",
      "Gain competitive advantage over competitors focused only on traditional SEO",
      "Future-proof content strategy for the voice-first and AI-first search era",
    ],
    process: [
      {
        step: "Answer Opportunity Research",
        description:
          "Identifying high-volume questions your audience asks across search engines, voice platforms, and AI assistants.",
      },
      {
        step: "Content Gap Analysis",
        description:
          "Comparing your current content against featured snippet opportunities and answer engine requirements.",
      },
      {
        step: "Answer Content Creation",
        description:
          "Developing concise, authoritative answer content formatted for snippet selection and voice reading.",
      },
      {
        step: "Schema Implementation",
        description:
          "Adding FAQPage, QAPage, HowTo, and Speakable schema markup to signal answer content to engines.",
      },
      {
        step: "Voice Optimization",
        description:
          "Optimizing content for natural language queries and voice-first consumption patterns.",
      },
      {
        step: "Testing & Validation",
        description:
          "Testing answer selection across multiple platforms and devices to validate optimization effectiveness.",
      },
      {
        step: "Monitor & Expand",
        description:
          "Tracking answer presence metrics and continuously expanding answer coverage for new queries and topics.",
      },
    ],
    technologies: [
      {
        name: "Schema.org Markup",
        description:
          "Structured data specifically for FAQ, Q&A, HowTo, and Speakable content optimized for answer selection",
      },
      {
        name: "Google Search Console",
        description:
          "Monitoring featured snippet performance, query data, and impression metrics for answer-optimized content",
      },
      {
        name: "Answer Engine Testing Tools",
        description:
          "Tools for testing voice assistant responses and featured snippet selection across platforms and devices",
      },
      {
        name: "Natural Language Processing",
        description:
          "NLP tools for analyzing query intent, question patterns, and content optimization for conversational search",
      },
    ],
    whyYesBe: [
      {
        title: "Multi-Platform Answer Strategy",
        description:
          "We optimize for featured snippets, voice assistants, and AI answer engines simultaneously for maximum answer coverage.",
      },
      {
        title: "Answer-First Content Design",
        description:
          "Our content is designed to be selected as the answer — concise, authoritative, and properly structured from the start.",
      },
      {
        title: "Schema Expertise",
        description:
          "Advanced implementation of structured data markup that signals answer content to search engines and AI platforms.",
      },
      {
        title: "Measurement Innovation",
        description:
          "We've developed proprietary tracking methods for measuring answer engine performance across platforms.",
      },
    ],
    caseStudy: {
      title:
        "AEO Campaign for a Financial Advisory Firm",
      outcome:
        "Won featured snippets for 85+ financial advice queries and became the primary voice assistant response for key retirement planning questions, driving 3x more qualified leads.",
      metric: "85+ featured snippets won",
    },
    faq: [
      {
        question: "What is the difference between AEO and SEO?",
        answer:
          "SEO focuses on ranking web pages in search results. AEO focuses on being selected as the direct answer that appears above results or is spoken by voice assistants. AEO is a specialized subset of SEO targeting answer-specific content formats.",
      },
      {
        question: "Do featured snippets really drive traffic?",
        answer:
          "Yes. While some featured snippets reduce traditional clicks (when the answer is fully displayed), they significantly increase brand awareness and authority. For many queries, users click through for more information, and the snippet position captures the most attention.",
      },
      {
        question: "How do you optimize for voice assistants?",
        answer:
          "Voice optimization involves creating content that directly answers conversational questions, using natural language, providing concise answers (29 words is the average voice result length), and implementing proper schema markup that voice platforms reference.",
      },
      {
        question: "Can you guarantee featured snippets?",
        answer:
          "We can't guarantee snippets as Google decides which content to feature, but our methodology significantly increases your chances. Our clients typically win 40-60% of targeted snippet positions within the first 6 months.",
      },
    ],
    relatedSolutions: ["seo", "geo", "digital-marketing"],
  },

  // 16. Digital Marketing
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Marketing",
    icon: Megaphone,
    category: "Digital Marketing",
    description:
      "Full-funnel digital marketing strategies combining paid media, content marketing, social media, and analytics to drive qualified leads and measurable revenue growth.",
    heroImage:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f17e?w=1200&h=600&fit=crop",
    overview:
      "Our Digital Marketing service delivers integrated marketing strategies that drive real business results — not just impressions and clicks. We combine paid advertising, content marketing, social media, email marketing, and conversion rate optimization into cohesive campaigns that move prospects through the full funnel. Every campaign is measured against revenue metrics, ensuring your marketing investment delivers measurable ROI.",
    whyNeeded:
      "Most businesses waste 40-60% of their marketing budget on ineffective channels and poorly optimized campaigns. Strategic digital marketing ensures every dollar works harder through precise targeting, compelling messaging, and continuous optimization. Companies with integrated digital marketing strategies see 3.3x more revenue growth than those with siloed approaches.",
    challenges: [
      "Attributing revenue to specific marketing channels in a multi-touch, multi-device customer journey",
      "Standing out in increasingly crowded digital channels with rising advertising costs",
      "Creating consistent messaging that resonates across different platforms and audience segments",
      "Balancing short-term paid acquisition with long-term organic growth strategies",
    ],
    features: [
      {
        title: "Paid Media Management",
        description:
          "Google Ads, LinkedIn Ads, Meta Ads, and programmatic advertising with ROI-focused campaign optimization.",
        icon: Megaphone,
      },
      {
        title: "Content Marketing",
        description:
          "Strategic content creation including blogs, whitepapers, videos, and infographics that attract and convert.",
        icon: PenTool,
      },
      {
        title: "Social Media Marketing",
        description:
          "Platform-specific social strategies with community management, content creation, and paid social campaigns.",
        icon: Share2,
      },
      {
        title: "Email Marketing Automation",
        description:
          "Automated email sequences, nurture campaigns, and newsletters that drive engagement and conversion.",
        icon: Mail,
      },
      {
        title: "Conversion Rate Optimization",
        description:
          "A/B testing, landing page optimization, and user experience improvements that increase conversion rates.",
        icon: TrendingUp,
      },
      {
        title: "Marketing Analytics",
        description:
          "Comprehensive attribution modeling, campaign tracking, and ROI reporting across all marketing channels.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Generate qualified leads with targeted campaigns that reach your ideal customer profile",
      "Maximize marketing ROI through continuous optimization and data-driven decision making",
      "Build brand awareness and thought leadership through strategic content marketing",
      "Nurture prospects automatically with personalized email sequences and retargeting",
      "Gain complete visibility into marketing performance with cross-channel attribution",
      "Scale marketing efforts predictably with proven, repeatable campaign frameworks",
    ],
    process: [
      {
        step: "Marketing Audit",
        description:
          "Comprehensive review of current marketing efforts, channel performance, competitive landscape, and growth opportunities.",
      },
      {
        step: "Strategy Development",
        description:
          "Creating an integrated marketing strategy with channel selection, budget allocation, and KPI frameworks.",
      },
      {
        step: "Campaign Planning",
        description:
          "Designing campaign architecture with audience targeting, messaging frameworks, and creative briefs.",
      },
      {
        step: "Content & Creative",
        description:
          "Producing campaign assets including ad copy, landing pages, content pieces, email sequences, and creative.",
      },
      {
        step: "Campaign Launch",
        description:
          "Deploying campaigns across channels with proper tracking, attribution setup, and initial optimization.",
      },
      {
        step: "Optimization & Testing",
        description:
          "Continuous A/B testing, bid optimization, audience refinement, and creative rotation for performance improvement.",
      },
      {
        step: "Reporting & Strategy Iteration",
        description:
          "Monthly performance reporting with strategic recommendations and quarterly strategy reviews.",
      },
    ],
    technologies: [
      {
        name: "Google Ads & Analytics 4",
        description:
          "Google's advertising and analytics platform for search, display, video, and performance marketing campaigns",
      },
      {
        name: "HubSpot & Mailchimp",
        description:
          "Marketing automation platforms for email campaigns, lead nurturing, CRM integration, and workflow automation",
      },
      {
        name: "Meta Business Suite",
        description:
          "Facebook and Instagram advertising platform for social media campaigns, audience targeting, and retargeting",
      },
      {
        name: "Hotjar & Crazy Egg",
        description:
          "Behavioral analytics tools for heatmaps, session recordings, and conversion funnel analysis",
      },
    ],
    whyYesBe: [
      {
        title: "Revenue-Focused Campaigns",
        description:
          "We optimize for revenue, not vanity metrics. Every campaign is measured against its contribution to your bottom line.",
      },
      {
        title: "Full-Funnel Expertise",
        description:
          "We manage the complete funnel — from awareness through consideration to conversion and retention — as one integrated system.",
      },
      {
        title: "Transparent Reporting",
        description:
          "Clear, honest reporting that shows what's working, what isn't, and what we're doing about it. No hiding behind jargon.",
      },
      {
        title: "Cross-Channel Integration",
        description:
          "Our strategies coordinate across all channels for consistent messaging and compounding results, not siloed efforts.",
      },
    ],
    caseStudy: {
      title:
        "Full-Funnel Marketing Strategy for a B2B SaaS Startup",
      outcome:
        "Built an integrated marketing engine generating 500+ MQLs per month, reducing CAC by 42%, and increasing marketing-sourced revenue from 15% to 45% of total pipeline.",
      metric: "42% lower CAC",
    },
    faq: [
      {
        question: "How much should we spend on digital marketing?",
        answer:
          "Budget depends on your industry, growth goals, and competitive landscape. We typically recommend 10-20% of revenue for growth-stage companies. We'll help you allocate budget across channels for maximum ROI based on your specific situation.",
      },
      {
        question: "How quickly will we see results?",
        answer:
          "Paid campaigns can drive traffic and leads within days. Content marketing and SEO compound over months. We set realistic expectations for each channel and focus on quick wins while building long-term growth engines.",
      },
      {
        question: "Do you handle creative production?",
        answer:
          "Yes. We create ad copy, landing pages, email templates, blog content, and social media posts. For larger creative needs like video production, we partner with specialized studios while managing the strategy and distribution.",
      },
      {
        question: "How do you measure marketing ROI?",
        answer:
          "We set up end-to-end tracking from first touch to revenue, using GA4, CRM data, and attribution modeling. Our reports show cost per lead, cost per acquisition, customer lifetime value, and ROI by channel.",
      },
    ],
    relatedSolutions: ["seo", "aeo", "website-development"],
  },

  // 17. Custom Software
  {
    slug: "custom-software",
    title: "Custom Software",
    shortTitle: "Software",
    icon: Smartphone,
    category: "Software Development",
    description:
      "End-to-end custom software development — from mobile apps and desktop tools to enterprise platforms — built precisely to your specifications and designed to scale.",
    heroImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop",
    overview:
      "Our Custom Software service builds bespoke software solutions that off-the-shelf products simply cannot deliver. We design, develop, and maintain custom applications — including mobile apps, desktop tools, enterprise platforms, and specialized industry solutions — precisely tailored to your unique business processes. With a product-focused approach and modern development practices, we deliver software that your users love and your business depends on.",
    whyNeeded:
      "Every business has processes that generic software handles poorly or not at all. Custom software eliminates workarounds, integrates perfectly with your workflows, and provides capabilities that give you a genuine competitive advantage. While the upfront investment is higher than SaaS subscriptions, custom software pays for itself through efficiency gains, eliminated licensing costs, and features that drive revenue.",
    challenges: [
      "Translating complex business requirements into intuitive, user-friendly software interfaces",
      "Building software that remains maintainable and extensible as requirements evolve over years",
      "Managing the full software development lifecycle from ideation through deployment and maintenance",
      "Balancing development speed with code quality, testing, and technical debt management",
    ],
    features: [
      {
        title: "Cross-Platform Mobile Apps",
        description:
          "Native-quality iOS and Android applications built with React Native or Flutter for maximum reach and consistency.",
        icon: Smartphone,
      },
      {
        title: "Desktop Applications",
        description:
          "High-performance desktop software for Windows, macOS, and Linux using Electron or native frameworks.",
        icon: Monitor,
      },
      {
        title: "Enterprise Platforms",
        description:
          "Large-scale enterprise applications with complex business logic, multi-tenancy, and role-based access control.",
        icon: Building2,
      },
      {
        title: "Legacy System Modernization",
        description:
          "Refactoring and modernizing legacy applications to modern frameworks while preserving business logic.",
        icon: RefreshCw,
      },
      {
        title: "UI/UX Design",
        description:
          "User research, wireframing, prototyping, and visual design that ensures software users actually enjoy using.",
        icon: Palette,
      },
      {
        title: "Ongoing Maintenance",
        description:
          "Post-launch support, bug fixes, feature additions, and performance optimization to keep software running perfectly.",
        icon: Wrench,
      },
    ],
    benefits: [
      "Get software that perfectly matches your business processes without compromise or workarounds",
      "Own your software completely — no vendor lock-in, no subscription fees, no feature limitations",
      "Scale and adapt the software as your business evolves without depending on vendor roadmaps",
      "Integrate seamlessly with your existing systems and data for a unified technology ecosystem",
      "Protect sensitive data with custom security controls tailored to your compliance requirements",
      "Build proprietary technology that becomes a competitive advantage impossible for competitors to replicate",
    ],
    process: [
      {
        step: "Product Discovery",
        description:
          "Deep dive into your business problem, user needs, and technical constraints to define the product vision and MVP scope.",
      },
      {
        step: "UX Research & Design",
        description:
          "User research, journey mapping, wireframing, and interactive prototyping validated with real users before development.",
      },
      {
        step: "Architecture & Planning",
        description:
          "Technical architecture design, technology selection, and development roadmap with milestones and deliverables.",
      },
      {
        step: "Agile Development",
        description:
          "Iterative development in 2-week sprints with regular demos, stakeholder feedback, and scope adjustment.",
      },
      {
        step: "Quality Assurance",
        description:
          "Comprehensive testing including automated unit and integration tests, manual QA, and security auditing.",
      },
      {
        step: "Deployment & Launch",
        description:
          "App store submission, CI/CD pipeline setup, monitoring configuration, and production deployment.",
      },
      {
        step: "Evolution & Support",
        description:
          "Ongoing maintenance, feature development, performance optimization, and user support for continued success.",
      },
    ],
    technologies: [
      {
        name: "React Native & Flutter",
        description:
          "Cross-platform mobile frameworks for building native-quality iOS and Android apps from a single codebase",
      },
      {
        name: "Electron & Tauri",
        description:
          "Desktop application frameworks for building cross-platform desktop software with web technologies",
      },
      {
        name: "TypeScript & Python",
        description:
          "Type-safe, productive programming languages for building reliable, maintainable software at any scale",
      },
      {
        name: "PostgreSQL & Redis",
        description:
          "Reliable data storage with ACID compliance and high-performance caching for enterprise applications",
      },
    ],
    whyYesBe: [
      {
        title: "Product Mindset",
        description:
          "We don't just code — we think like product owners, constantly evaluating features against user value and business impact.",
      },
      {
        title: "Full Lifecycle Partner",
        description:
          "From initial concept through years of maintenance, we're your technology partner for the entire software lifecycle.",
      },
      {
        title: "Quality Engineering",
        description:
          "Clean architecture, comprehensive testing, and technical debt management ensure your software stays maintainable as it grows.",
      },
      {
        title: "Transparent Development",
        description:
          "Regular demos, shared project boards, and open communication mean you always know exactly where your project stands.",
      },
    ],
    caseStudy: {
      title:
        "Custom Mobile App for a Logistics Company Managing 500+ Drivers",
      outcome:
        "Built a cross-platform mobile app for driver management, route optimization, and real-time delivery tracking, reducing delivery times by 28% and improving customer satisfaction scores by 40%.",
      metric: "28% faster deliveries",
    },
    faq: [
      {
        question: "How long does custom software development take?",
        answer:
          "Timelines vary significantly based on complexity. A focused MVP can be built in 8-12 weeks. A full-featured enterprise platform typically takes 4-8 months. We provide detailed timelines after the discovery phase.",
      },
      {
        question: "What's the difference between custom software and SaaS?",
        answer:
          "SaaS is shared, subscription-based software that may not fit your exact needs. Custom software is built exclusively for your business, tailored to your processes, and owned by you. Custom is better when unique workflows, data sensitivity, or competitive advantage are important.",
      },
      {
        question: "Do you build mobile apps or web apps?",
        answer:
          "We build both, and help you choose the right approach. Native mobile apps are best for device features, offline use, and performance. Web apps are better for broad accessibility and faster development. We also build cross-platform apps with React Native and Flutter.",
      },
      {
        question: "What about ongoing maintenance and updates?",
        answer:
          "We offer flexible maintenance packages that include bug fixes, security updates, feature additions, and performance optimization. Most clients transition to a maintenance plan after launch to keep their software evolving with their needs.",
      },
    ],
    relatedSolutions: ["web-applications", "mobile-apps", "api-development"],
  },
];

export function getSolutionBySlug(slug: string): SolutionDetail | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
