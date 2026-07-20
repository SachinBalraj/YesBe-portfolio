/* ─── Case Study Data ─── */

export interface CaseStudy {
  slug: string;
  title: string;
  shortOverview: string;
  category: string;
  clientType: string;
  duration: string;
  status: "Completed" | "In Progress";
  image: string;
  technologies: string[];
  techGroups: { label: string; items: string[] }[];
  problem: string;
  solution: string;
  features: string[];
  businessResult: string[];
  challenge: string;
  futureEnhancements: string[];
  github?: string;
  live?: string;
  developmentProcess: string[];
  clientBenefits: string[];
  relatedServices: string[];
  faqs: { question: string; answer: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "fashion-fusion",
    title: "Fashion Fusion E-Commerce Platform",
    shortOverview:
      "E-commerce platform for a clothing brand — online sales, inventory, and orders replacing manual WhatsApp selling.",
    category: "E-Commerce",
    clientType: "Retail / Fashion Brand",
    duration: "4 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=450&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "Stripe", "Tailwind CSS"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MongoDB", "Mongoose ODM"] },
      { label: "Cloud", items: ["Vercel", "Render"] },
    ],
    problem:
      "The client needed a modern e-commerce platform to showcase premium textile products and simplify online sales. Previously, everything ran through WhatsApp and spreadsheets — no online store, limited reach, and hours spent chasing orders.",
    solution:
      "Designed and developed a responsive e-commerce website with category management, product showcase, inquiry system, and SEO optimization. Built a full-stack platform with product catalog, cart, Stripe checkout, and an admin dashboard for real-time inventory, orders, and sales analytics.",
    features: [
      "Responsive product catalog with search & filters",
      "Secure user authentication & profiles",
      "Shopping cart with persistent state",
      "Stripe payment integration",
      "Admin dashboard with sales analytics",
      "Real-time inventory management",
      "Order tracking & status updates",
      "Mobile-first responsive design",
    ],
    businessResult: [
      "Improved online presence and expanded customer reach beyond local to nationwide",
      "Faster customer inquiries with automated order processing",
      "Better product presentation driving a 40% increase in monthly revenue within the first quarter",
      "Reduced order processing time from 15 minutes to under 2 minutes",
      "Eliminated inventory discrepancies caused by manual tracking",
    ],
    challenge:
      "Real-time inventory sync when multiple customers buy the same item. Solved with MongoDB transactions and optimistic locking.",
    futureEnhancements: [
      "AI-powered product recommendations based on browsing history",
      "WhatsApp order notification integration",
      "Multi-vendor marketplace support",
      "Advanced coupon and loyalty program system",
    ],
    developmentProcess: [
      "Discovery and requirements gathering with the client team",
      "UI/UX design focused on clean product presentation",
      "Frontend development with React and Tailwind CSS",
      "Backend API development with Node.js and Express",
      "Payment integration with Stripe",
      "Testing across devices and browsers",
      "Deployment to Vercel and Render",
    ],
    clientBenefits: [
      "24/7 online sales without manual intervention",
      "Professional brand presence on the web",
      "Streamlined order and inventory management",
      "Scalable platform ready for growth",
    ],
    relatedServices: [
      "E-Commerce Development",
      "React Development",
      "Payment Integration",
      "SEO Optimization",
    ],
    faqs: [
      {
        question: "How long did the project take?",
        answer: "The complete e-commerce platform was delivered in 4 weeks, including design, development, testing, and deployment.",
      },
      {
        question: "Can the platform handle high traffic?",
        answer: "Yes. The platform is built on scalable cloud infrastructure and can handle traffic spikes during sales events.",
      },
      {
        question: "Is the platform mobile-friendly?",
        answer: "Absolutely. The entire experience is designed mobile-first, ensuring a seamless shopping experience on any device.",
      },
    ],
    github: "#",
  },
  {
    slug: "restaurant-qr-ordering",
    title: "Restaurant QR Ordering System",
    shortOverview:
      "QR-based contactless ordering — customers browse, order, and the kitchen gets notified instantly.",
    category: "Restaurant Automation",
    clientType: "Restaurant / F&B",
    duration: "3 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=450&fit=crop",
    technologies: ["React", "Node.js", "QR Technology", "MongoDB", "Socket.io"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "Tailwind CSS", "Socket.io Client"] },
      { label: "Backend", items: ["Node.js", "Express.js", "WebSocket"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "Integrations", items: ["QR Code API", "Real-time Notifications"] },
    ],
    problem:
      "Manual ordering caused delays and order mistakes. During peak hours, waiters were overwhelmed. Customers waited 10–15 minutes just to order, and frequent errors occurred with handwritten orders.",
    solution:
      "Developed a QR-based digital ordering system allowing customers to browse menus and place orders directly from their phones. Each table gets a unique QR code. Customers scan, browse the menu, customize orders, and submit directly to the kitchen queue.",
    features: [
      "Unique QR code per table with instant menu access",
      "Full menu with images, descriptions & prices",
      "Customizable orders with special instructions",
      "Real-time kitchen order queue with notifications",
      "Table management & order tracking",
      "Admin dashboard with sales & analytics",
      "Automatic order confirmation receipts",
      "Mobile-optimized for customer phones",
    ],
    businessResult: [
      "Reduced waiting time — order placement dropped from 12 minutes to under 3 minutes",
      "Improved customer experience with contactless, self-service ordering",
      "Faster order processing with 95% fewer errors compared to manual taking",
      "Increased table turnover rate by 30% during peak hours",
      "Gained real-time visibility into daily sales and popular items",
    ],
    challenge:
      "Real-time delivery to the kitchen was critical. Used WebSocket with auto-reconnection and fallback polling — orders reach the kitchen within seconds even if the connection drops.",
    futureEnhancements: [
      "AI-based demand forecasting for inventory pre-ordering",
      "Customer loyalty program with visit tracking",
      "Integration with food delivery platforms",
      "Voice-based ordering for accessibility",
    ],
    developmentProcess: [
      "Requirement analysis with restaurant owners and staff",
      "Menu and table management system design",
      "QR code generation and scanning flow",
      "Real-time kitchen notification system",
      "Admin dashboard for sales tracking",
      "Testing with live restaurant operations",
      "Deployment and staff training",
    ],
    clientBenefits: [
      "Reduced staffing needs by 2 waiters per shift",
      "Faster table turnover during peak hours",
      "Zero order errors from manual taking",
      "Real-time business insights for better decisions",
    ],
    relatedServices: [
      "Restaurant Automation",
      "QR Ordering Systems",
      "Real-time Applications",
      "Business Automation",
    ],
    faqs: [
      {
        question: "How does the QR ordering work?",
        answer: "Each table has a unique QR code. Customers scan it with their phone camera, which opens the menu directly in their browser — no app download needed.",
      },
      {
        question: "Can the restaurant customize the menu easily?",
        answer: "Yes. The admin dashboard allows staff to add, update, or remove menu items, change prices, and update availability in real time.",
      },
      {
        question: "Does it work offline?",
        answer: "The system includes offline fallback with auto-reconnection. Orders are queued and delivered as soon as connectivity is restored.",
      },
    ],
    github: "#",
  },
  {
    slug: "library-management",
    title: "Library Management System",
    shortOverview:
      "Digital library system — book inventory, member management, issue/return tracking, and reporting.",
    category: "Education ERP",
    clientType: "Educational Institution",
    duration: "3 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=700&h=450&fit=crop",
    technologies: ["React", "Express", "MongoDB", "Barcode API"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "Integrations", items: ["Barcode Scanning API", "Automated Fine Calculation"] },
    ],
    problem:
      "The library relied on manual record keeping. With 10,000+ books tracked on paper, transactions took 30 minutes, there was no remote access, and lost books went undetected for months.",
    solution:
      "Built a complete digital library management system for book inventory, issue tracking, and user management. Included searchable catalog, barcode scanning, automated fines, member management, and a reporting dashboard.",
    features: [
      "Searchable book catalog with categories & availability",
      "Barcode scanning for quick issue/return",
      "Automated overdue fine calculation",
      "Member management with role-based access",
      "Book reservation & hold system",
      "Real-time availability tracking",
      "Monthly & annual report generation",
      "Overdue notification system",
    ],
    businessResult: [
      "Simplified operations — transaction time dropped from 5 minutes to 30 seconds",
      "Reduced paperwork by 90% with digital record-keeping",
      "Improved record accuracy to 99.5% with automated tracking",
      "Enabled students to check availability remotely, reducing empty trips",
      "Generated automated reports saving 8+ hours of monthly admin work",
    ],
    challenge:
      "Migrating 10,000+ paper records to digital was the hurdle. Built a bulk CSV import with validation and duplicate detection — entire catalog digitized in 2 days instead of 2 weeks.",
    futureEnhancements: [
      "AI-powered book recommendation engine based on borrowing patterns",
      "Integration with university student information system",
      "Mobile app for students with barcode scanning",
      "Digital library card with QR code access",
    ],
    developmentProcess: [
      "Audit of existing library workflows and paper records",
      "Database schema design for books, members, and transactions",
      "Bulk data migration tool development",
      "Frontend catalog and management interfaces",
      "Barcode integration and scanning flow",
      "Testing with library staff and students",
      "Deployment and training sessions",
    ],
    clientBenefits: [
      "Complete digital transformation of library operations",
      "Instant access to book availability for students",
      "Automated fine calculation and notifications",
      "Comprehensive reporting for administration",
    ],
    relatedServices: [
      "Education ERP",
      "Library Management Systems",
      "Database Management",
      "Custom Software Development",
    ],
    faqs: [
      {
        question: "How many books can the system handle?",
        answer: "The system is designed to handle tens of thousands of books with fast search and efficient inventory management.",
      },
      {
        question: "Can students check book availability online?",
        answer: "Yes. The system provides a web portal where students can search the catalog, check availability, and reserve books.",
      },
      {
        question: "How are overdue fines calculated?",
        answer: "Fines are automatically calculated based on configurable rules — number of days overdue, book type, and institutional policies.",
      },
    ],
    github: "#",
  },
  {
    slug: "business-portfolio",
    title: "Business Portfolio Website",
    shortOverview:
      "Responsive, SEO-optimized corporate website with service pages and lead generation forms.",
    category: "Corporate Website",
    clientType: "Corporate / SME",
    duration: "2 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=450&fit=crop",
    technologies: ["React", "Tailwind CSS"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
      { label: "SEO", items: ["Meta Tags", "Schema Markup", "Sitemap"] },
      { label: "Performance", items: ["Lazy Loading", "Code Splitting", "Image Optimization"] },
      { label: "Deployment", items: ["Vercel", "Custom Domain", "SSL"] },
    ],
    problem:
      "The client lacked a professional online presence. Without a website, they were invisible to potential customers searching online, losing business to competitors with better digital footprints.",
    solution:
      "Created a responsive, SEO-optimized corporate website with service pages and lead generation. Built with modern React architecture, fast loading, and mobile-first design.",
    features: [
      "Responsive design across all devices",
      "Service pages with detailed offerings",
      "Lead generation contact forms",
      "SEO-optimized structure and meta tags",
      "Fast loading with code splitting and lazy loading",
      "Testimonials and case studies section",
      "Google Analytics integration",
      "Social media integration",
    ],
    businessResult: [
      "Stronger online credibility with a professional web presence",
      "Increased business inquiries through optimized lead capture forms",
      "Better brand visibility with improved search engine rankings",
      "Mobile-responsive design reaching customers on all devices",
      "Foundation for digital marketing campaigns",
    ],
    challenge:
      "The client had no existing brand assets or content. Created a complete content strategy, sourced professional imagery, and established brand guidelines during the project.",
    futureEnhancements: [
      "Blog section for content marketing",
      "Live chat integration",
      "Client portal for project updates",
      "Multi-language support",
    ],
    developmentProcess: [
      "Brand and content strategy workshop",
      "UI/UX design with client feedback rounds",
      "Frontend development with React",
      "SEO implementation and meta tag optimization",
      "Performance optimization and testing",
      "Domain and hosting setup",
      "Launch and analytics configuration",
    ],
    clientBenefits: [
      "Professional online presence established in 2 weeks",
      "Organic traffic growth from SEO optimization",
      "Lead generation system capturing potential clients 24/7",
      "Easy-to-update content management through reusable components",
    ],
    relatedServices: [
      "Website Development",
      "SEO Optimization",
      "Corporate Websites",
      "Lead Generation",
    ],
    faqs: [
      {
        question: "How long does it take to build a corporate website?",
        answer: "A standard corporate website with 5-10 pages takes approximately 2 weeks from design to launch.",
      },
      {
        question: "Will the website rank on Google?",
        answer: "Yes. The website is built with SEO best practices including proper meta tags, schema markup, fast loading, and mobile responsiveness.",
      },
      {
        question: "Can I update the content myself?",
        answer: "The website uses a component-based architecture that makes content updates straightforward. We also provide a handover guide.",
      },
    ],
  },
  {
    slug: "ai-business-assistant",
    title: "AI Business Assistant",
    shortOverview:
      "AI-powered assistant using OpenAI and LangChain — answering common business questions instantly.",
    category: "Artificial Intelligence",
    clientType: "Enterprise / Internal Tool",
    duration: "5 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&h=450&fit=crop",
    technologies: ["Python", "OpenAI API", "LangChain", "FastAPI", "React"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "Tailwind CSS"] },
      { label: "Backend", items: ["Python", "FastAPI", "LangChain"] },
      { label: "AI / ML", items: ["OpenAI GPT-4", "Embeddings", "RAG Pipeline"] },
      { label: "Database", items: ["Pinecone (Vector DB)", "MongoDB"] },
    ],
    problem:
      "Customer support required significant manual effort. The team handled 200+ daily queries across departments, searching through 500+ PDFs, Confluence pages, and shared drives with a 45-minute average response time.",
    solution:
      "Developed an AI-powered assistant to answer common business questions and assist customers. Built a RAG chatbot that ingests company docs, indexes them in a vector database, and uses GPT-4 with LangChain to generate accurate, source-linked answers.",
    features: [
      "Natural language query interface",
      "RAG pipeline with source attribution",
      "Supports PDF, Word, Confluence, and web page ingestion",
      "Conversation history & context awareness",
      "Admin panel for document management",
      "Usage analytics & query tracking",
      "Role-based access control",
      "API endpoint for third-party integration",
    ],
    businessResult: [
      "Faster customer support — response time dropped from 45 minutes to under 10 seconds",
      "Reduced repetitive tasks — 80% of routine queries handled without human intervention",
      "Improved response times and answer accuracy to 94% with source-linked responses",
      "Onboarded new team members 60% faster with instant knowledge access",
      "Saved an estimated 120+ support hours per month",
    ],
    challenge:
      "Ensuring the AI only answers from verified documents was critical. Implemented a confidence threshold — below 0.75 similarity, it says 'I don't know' instead of guessing. Source URLs let users verify every answer.",
    futureEnhancements: [
      "Multi-language support for global teams",
      "Voice-based query interface",
      "Integration with Slack and Microsoft Teams",
      "Automated document freshness scoring and alerts",
    ],
    developmentProcess: [
      "Document inventory and knowledge base audit",
      "RAG pipeline architecture design",
      "Vector database setup and document ingestion",
      "LangChain integration with OpenAI",
      "Frontend chat interface development",
      "Confidence threshold tuning and testing",
      "Deployment and team training",
    ],
    clientBenefits: [
      "24/7 intelligent support without additional staff",
      "Consistent, accurate answers from verified sources",
      "Significant reduction in support team workload",
      "Scalable solution that improves as the knowledge base grows",
    ],
    relatedServices: [
      "AI Solutions",
      "AI Chatbots",
      "RAG Implementation",
      "LangChain Development",
    ],
    faqs: [
      {
        question: "How accurate are the AI responses?",
        answer: "The system achieves 94% accuracy with source-linked responses. It only answers from verified documents and clearly states when it doesn't have enough information.",
      },
      {
        question: "What documents can the AI learn from?",
        answer: "PDFs, Word documents, Confluence pages, web pages, and structured data files. The system supports most common document formats.",
      },
      {
        question: "How long does implementation take?",
        answer: "A typical RAG-based AI assistant takes 4-6 weeks, depending on the volume of documents and complexity of the knowledge base.",
      },
    ],
    github: "#",
  },
  {
    slug: "erp-management",
    title: "ERP Management System",
    shortOverview:
      "Custom ERP integrating inventory, employee management, billing, and reporting into one platform.",
    category: "ERP",
    clientType: "SME / Manufacturing",
    duration: "8 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=450&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Express.js"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MongoDB", "Mongoose ODM"] },
      { label: "Modules", items: ["Inventory", "HR", "Billing", "Reporting"] },
    ],
    problem:
      "Business operations were managed using multiple disconnected tools — spreadsheets for inventory, separate software for payroll, and manual billing processes. This created data silos, errors, and wasted hours on reconciliation.",
    solution:
      "Built an ERP platform integrating inventory, employee management, billing, and reporting. A single system that connects all departments with real-time data flow and automated workflows.",
    features: [
      "Inventory management with stock alerts",
      "Employee records and payroll processing",
      "Automated billing and invoice generation",
      "Role-based access for different departments",
      "Real-time reporting dashboard",
      "Purchase order management",
      "Vendor and supplier tracking",
      "Audit trail for all transactions",
    ],
    businessResult: [
      "Centralized operations — all departments connected through a single system",
      "Improved productivity with automated workflows reducing manual data entry",
      "Better business insights through real-time dashboards and reports",
      "Eliminated data silos and reduced reconciliation errors by 95%",
      "Saved 20+ hours per week previously spent on manual report compilation",
    ],
    challenge:
      "Integrating disparate data sources with different formats. Built a unified data layer with ETL processes that normalizes data from legacy systems into the new ERP.",
    futureEnhancements: [
      "AI-powered demand forecasting for inventory",
      "Mobile app for field employees",
      "Integration with banking APIs for automated reconciliation",
      "Advanced analytics with predictive insights",
    ],
    developmentProcess: [
      "Business process mapping and requirements analysis",
      "System architecture and database design",
      "Module-by-module development approach",
      "Data migration from legacy systems",
      "Integration testing across all modules",
      "User acceptance testing with department heads",
      "Phased rollout and staff training",
    ],
    clientBenefits: [
      "Single source of truth for all business operations",
      "Real-time visibility into inventory, sales, and finances",
      "Reduced operational costs through automation",
      "Scalable system that grows with the business",
    ],
    relatedServices: [
      "ERP Solutions",
      "Custom Software Development",
      "Business Automation",
      "Database Management",
    ],
    faqs: [
      {
        question: "How long does ERP implementation take?",
        answer: "A typical ERP implementation takes 6-12 weeks, depending on the complexity of business processes and data migration requirements.",
      },
      {
        question: "Can the ERP be customized for our specific workflow?",
        answer: "Yes. The ERP is built from scratch and can be fully customized to match your exact business processes and requirements.",
      },
      {
        question: "What about data migration from our current systems?",
        answer: "We handle complete data migration including validation, deduplication, and mapping to ensure nothing is lost in the transition.",
      },
    ],
  },
  {
    slug: "powerbi-dashboard",
    title: "Power BI Sales Dashboard",
    shortOverview:
      "Interactive Power BI dashboards displaying KPIs, revenue trends, and sales insights in real time.",
    category: "Business Analytics",
    clientType: "Corporate / SME",
    duration: "2 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop",
    technologies: ["Power BI", "SQL", "DAX", "Excel"],
    techGroups: [
      { label: "Analytics", items: ["Power BI", "DAX", "Power Query"] },
      { label: "Data Layer", items: ["SQL Server", "Azure Data Factory"] },
      { label: "Sources", items: ["Excel", "CRM Export", "ERP Database"] },
      { label: "Deployment", items: ["Power BI Service", "Scheduled Refresh"] },
    ],
    problem:
      "The client had difficulty tracking business performance. Management relied on weekly Excel reports compiled from 5 different systems. By the time reports arrived, data was 5–7 days old.",
    solution:
      "Created interactive dashboards displaying KPIs, revenue trends, and sales insights. Connected multiple data sources through Azure Data Factory with executive, sales, ops, and finance views featuring drill-down, anomaly detection, and scheduled email reports.",
    features: [
      "Executive KPI dashboard with drill-down capability",
      "Sales performance by region, product & team",
      "Automated anomaly detection & alerts",
      "Scheduled email report delivery",
      "Mobile-optimized dashboard views",
      "Real-time data refresh (hourly)",
      "Custom DAX measures for business-specific KPIs",
      "Role-based dashboard access",
    ],
    businessResult: [
      "Better decision-making with real-time data instead of 5-day-old reports",
      "Real-time reporting eliminating 40+ hours of monthly manual report compilation",
      "Increased operational visibility — identified a 15% underperforming product line within the first week",
      "Improved sales forecasting accuracy by 35%",
      "Enabled non-technical managers to explore data independently",
    ],
    challenge:
      "Five incompatible systems with inconsistent naming. Built an Azure Data Factory ETL pipeline with data cleansing and a unified data model — single source of truth.",
    futureEnhancements: [
      "Predictive analytics using Python integration in Power BI",
      "Natural language Q&A for non-technical users",
      "Embedded dashboards in the company intranet",
      "Automated Slack/Teams alerts for threshold breaches",
    ],
    developmentProcess: [
      "Data source audit and mapping",
      "ETL pipeline design with Azure Data Factory",
      "Data model creation and DAX measure development",
      "Dashboard design with stakeholder input",
      "Report development and visual formatting",
      "Testing with real business scenarios",
      "Deployment and training for end users",
    ],
    clientBenefits: [
      "Real-time business intelligence at a glance",
      "Data-driven decision making across all levels",
      "Elimination of manual report compilation",
      "Self-service analytics for non-technical users",
    ],
    relatedServices: [
      "Power BI Dashboards",
      "Data Analytics",
      "Business Intelligence",
      "Data Visualization",
    ],
    faqs: [
      {
        question: "How many data sources can Power BI connect to?",
        answer: "Power BI connects to 100+ data sources including Excel, SQL Server, MySQL, PostgreSQL, Google Analytics, Salesforce, and many more.",
      },
      {
        question: "How often do the dashboards update?",
        answer: "Dashboards can be configured to refresh hourly, daily, or on-demand depending on your business needs and data source capabilities.",
      },
      {
        question: "Can we share dashboards with our team?",
        answer: "Yes. Power BI Service allows secure sharing through workspaces, email subscriptions, and embedded reports accessible on web and mobile.",
      },
    ],
  },
  {
    slug: "seo-digital-growth",
    title: "Business SEO & Digital Growth",
    shortOverview:
      "Technical SEO, content optimization, schema markup, GEO, and AEO strategies for improved search visibility.",
    category: "SEO / GEO / AEO",
    clientType: "SME / Professional Services",
    duration: "3 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=700&h=450&fit=crop",
    technologies: ["Google Search Console", "Analytics", "SEO Tools"],
    techGroups: [
      { label: "SEO", items: ["Technical SEO", "On-Page SEO", "Schema Markup"] },
      { label: "Analytics", items: ["Google Analytics", "Search Console"] },
      { label: "Content", items: ["Content Strategy", "Keyword Research", "Blog Optimization"] },
      { label: "AI Search", items: ["GEO", "AEO", "FAQ Structuring"] },
    ],
    problem:
      "The client's website had low search visibility. Despite quality services, they were buried on page 2-3 of Google results, losing potential customers to competitors with better SEO.",
    solution:
      "Implemented technical SEO, content optimization, schema markup, GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization) strategies to improve search rankings and online visibility.",
    features: [
      "Comprehensive technical SEO audit",
      "On-page optimization for all key pages",
      "Schema markup implementation",
      "Content strategy with keyword targeting",
      "GEO optimization for AI search engines",
      "AEO for featured snippets and voice search",
      "Google Business Profile optimization",
      "Monthly performance reporting",
    ],
    businessResult: [
      "Improved search visibility — moved from page 3 to page 1 for key terms",
      "Better website traffic — 180% increase in organic visitors within 3 months",
      "Increased lead generation through improved search rankings",
      "Featured in Google's AI overviews for industry-relevant queries",
      "Established authority in the local market through content strategy",
    ],
    challenge:
      "The website had technical issues slowing it down and confusing search engines. Prioritized critical fixes first, then layered on content and authority-building strategies.",
    futureEnhancements: [
      "Video content optimization for YouTube SEO",
      "Local SEO expansion to additional service areas",
      "Link building campaign for domain authority",
      "AI search optimization monitoring and adaptation",
    ],
    developmentProcess: [
      "Comprehensive SEO and technical audit",
      "Keyword research and content strategy planning",
      "Technical fixes — site speed, mobile, crawlability",
      "On-page optimization and schema markup",
      "Content creation and optimization",
      "GEO and AEO strategy implementation",
      "Monitoring, reporting, and ongoing refinement",
    ],
    clientBenefits: [
      "Sustainable organic traffic growth without ongoing ad spend",
      "Better visibility in both traditional and AI search results",
      "More qualified leads from search engines",
      "Competitive advantage in local and national search rankings",
    ],
    relatedServices: [
      "SEO Optimization",
      "GEO Optimization",
      "AEO Optimization",
      "Digital Marketing",
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer: "Most clients see noticeable improvements within 3-6 months. Technical fixes can show immediate impact, while content and authority building compound over time.",
      },
      {
        question: "What is GEO and why does it matter?",
        answer: "GEO (Generative Engine Optimization) optimizes your content so AI search engines like ChatGPT and Google AI Overviews recommend your business when users ask relevant questions.",
      },
      {
        question: "Do you provide ongoing SEO support?",
        answer: "Yes. We offer monthly SEO retainers that include monitoring, content updates, technical maintenance, and performance reporting.",
      },
    ],
  },
  {
    slug: "business-automation",
    title: "Custom Business Automation Platform",
    shortOverview:
      "Custom automation platform integrating workflows, approvals, notifications, and reporting.",
    category: "Business Automation",
    clientType: "SME / Operations",
    duration: "6 Weeks",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=450&fit=crop",
    technologies: ["React", "Node.js", "MongoDB"],
    techGroups: [
      { label: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST API"] },
      { label: "Database", items: ["MongoDB", "Redis"] },
      { label: "Integrations", items: ["Email API", "WhatsApp API", "Webhooks"] },
    ],
    problem:
      "The client performed repetitive business tasks manually — approvals, notifications, report generation, and data entry. This consumed hours of productive time and introduced human errors.",
    solution:
      "Developed a custom automation platform integrating workflows, approvals, notifications, and reporting. Built automated pipelines that handle routine tasks while routing exceptions to human reviewers.",
    features: [
      "Visual workflow builder for custom processes",
      "Multi-level approval chains",
      "Automated email and WhatsApp notifications",
      "Document generation and storage",
      "Task assignment and tracking",
      "Custom reporting and analytics",
      "Role-based access control",
      "API integrations with existing tools",
    ],
    businessResult: [
      "Reduced manual work — automated 60% of repetitive business tasks",
      "Faster business processes with streamlined approval workflows",
      "Improved operational consistency and reduced human errors",
      "Saved 15+ hours per week previously spent on manual coordination",
      "Better visibility into process bottlenecks through analytics",
    ],
    challenge:
      "Each department had different workflows and approval processes. Built a flexible workflow engine that allows non-technical users to create and modify automation rules without code.",
    futureEnhancements: [
      "AI-powered workflow suggestions based on usage patterns",
      "Mobile app for approvals on the go",
      "Advanced analytics with process mining",
      "Integration with accounting software",
    ],
    developmentProcess: [
      "Process audit across all departments",
      "Workflow mapping and optimization",
      "Platform architecture and database design",
      "Core automation engine development",
      "Integration with existing communication tools",
      "User testing with department representatives",
      "Phased rollout and adoption support",
    ],
    clientBenefits: [
      "Significant time savings across all departments",
      "Consistent, error-free execution of routine processes",
      "Real-time visibility into workflow status",
      "Flexible system that adapts as business needs evolve",
    ],
    relatedServices: [
      "Business Automation",
      "Workflow Automation",
      "Custom Software Development",
      "API Integration",
    ],
    faqs: [
      {
        question: "What types of workflows can be automated?",
        answer: "Almost any repetitive process — approvals, notifications, data entry, report generation, task assignments, and inter-department coordination.",
      },
      {
        question: "Can we modify workflows without developer help?",
        answer: "Yes. The platform includes a visual workflow builder that allows non-technical users to create and modify automation rules.",
      },
      {
        question: "How does the system handle exceptions?",
        answer: "When a workflow encounters an exception or requires human judgment, it automatically routes the task to the appropriate reviewer with all relevant context.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
