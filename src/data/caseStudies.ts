/* ─── Project Data ──────────────────────────────────────────────────────────
 *
 * These entries document systems YESBE has designed and built. They describe
 * scope, architecture and purpose — they do not publish client names, project
 * durations or measured business outcomes, because no verified record of those
 * is kept in this repository.
 *
 * `label` states plainly what each entry is. If a project is ever confirmed as a
 * client engagement with measured outcomes, that evidence should be added here
 * and the label updated — not inferred.
 * ────────────────────────────────────────────────────────────────────────── */

export interface CaseStudy {
  slug: string;
  title: string;
  label: string;
  shortOverview: string;
  category: string;
  builtFor: string;
  image: string;
  technologies: string[];
  techGroups: { label: string; items: string[] }[];
  problem: string;
  solution: string;
  features: string[];
  /** What the system is designed to do. Not a record of measured results. */
  capabilities: string[];
  challenge: string;
  futureEnhancements: string[];
  developmentProcess: string[];
  /** The business problems this kind of system is built to address. */
  businessValue: string[];
  relatedServices: string[];
  faqs: { question: string; answer: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "fashion-fusion",
    title: "Fashion Fusion E-Commerce Platform",
    label: "Portfolio build",
    shortOverview:
      "A full-stack e-commerce platform for a clothing brand — product catalogue, cart, checkout, inventory and order management in one system.",
    category: "E-Commerce",
    builtFor: "Retail / Fashion Brand",
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
      "Fashion brands often start with WhatsApp conversations, spreadsheets and informal order tracking. There is no searchable catalogue, no single view of stock, and no reliable record of what was sold or owed.",
    solution:
      "Designed and developed a responsive e-commerce website with category management, product showcase, inquiry system and SEO optimisation, built as a full-stack platform with a product catalogue, cart, Stripe checkout and an admin dashboard for inventory, orders and sales reporting.",
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
    capabilities: [
      "Presents a browsable, searchable product catalogue instead of scattered images and messages",
      "Takes orders through a structured checkout rather than manual confirmation",
      "Keeps stock levels in one place so availability is visible to buyers and staff",
      "Gives the owner a single view of orders, revenue and best-selling lines",
      "Removes re-keying of the same order data across spreadsheets and messages",
    ],
    challenge:
      "Keeping inventory accurate when multiple customers buy the same item at once. Addressed with MongoDB transactions and optimistic locking so a completed order cannot oversell stock.",
    futureEnhancements: [
      "AI-powered product recommendations based on browsing history",
      "WhatsApp order notification integration",
      "Multi-vendor marketplace support",
      "Advanced coupon and loyalty program system",
    ],
    developmentProcess: [
      "Discovery and requirements definition before any code was written",
      "UI/UX design focused on clean product presentation",
      "Frontend development with React and Tailwind CSS",
      "Backend API development with Node.js and Express",
      "Payment integration with Stripe",
      "Testing across devices and browsers",
      "Deployment to Vercel and Render",
    ],
    businessValue: [
      "A professional web presence that customers can browse without contacting anyone first",
      "Order handling that no longer depends on individual staff remembering conversations",
      "Inventory that staff and customers see from the same source of truth",
      "Sales and product data available for buying and marketing decisions",
    ],
    relatedServices: [
      "E-Commerce Development",
      "React Development",
      "Payment Integration",
      "SEO Optimization",
    ],
    faqs: [
      {
        question: "What does the platform include?",
        answer:
          "A product catalogue with search and filters, user accounts, a persistent cart, Stripe checkout, order tracking, real-time inventory and an admin dashboard covering orders and sales reporting.",
      },
      {
        question: "Can the platform handle high traffic?",
        answer:
          "It is built on scalable cloud infrastructure and can handle traffic spikes during sales events.",
      },
      {
        question: "Is the platform mobile-friendly?",
        answer:
          "Yes. The entire experience is designed mobile-first, so the catalogue, cart and checkout work on any device.",
      },
    ],
  },
  {
    slug: "restaurant-qr-ordering",
    title: "Restaurant QR Ordering System",
    label: "Portfolio build",
    shortOverview:
      "QR-based ordering — customers browse the menu and place their order from their own phone, and it appears in the kitchen queue.",
    category: "Restaurant Automation",
    builtFor: "Restaurant / F&B",
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
      "Manual ordering puts a waiter between the customer and the kitchen. During busy periods the queue of questions and hand-written tickets grows, and orders depend on handwriting being read correctly.",
    solution:
      "Developed a QR-based digital ordering system that lets customers browse menus and place orders directly from their own phones. Each table has a unique QR code; the customer scans, browses, customises and submits straight into the kitchen queue, with no app to install.",
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
    capabilities: [
      "Lets customers order without waiting for a waiter to reach the table",
      "Delivers orders to the kitchen as structured digital tickets instead of handwriting",
      "Carries special instructions and customisations with the order rather than verbally",
      "Shows kitchen and floor staff which tables have open or completed orders",
      "Reports daily sales and the items that actually sell, by time of day",
    ],
    challenge:
      "Getting an order to the kitchen reliably. Implemented WebSocket delivery with automatic reconnection and a polling fallback, so an order still reaches the kitchen if the connection drops.",
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
    businessValue: [
      "Removes the ordering bottleneck between table and kitchen during busy periods",
      "Fewer misread or forgotten orders, since the ticket is digital",
      "Less time spent taking and re-keying orders by hand",
      "Sales and popular-item visibility without closing the till and counting",
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
        answer:
          "Each table has a unique QR code. Customers scan it with their phone camera, which opens the menu directly in their browser — no app download needed.",
      },
      {
        question: "Can the restaurant customize the menu easily?",
        answer:
          "Yes. The admin dashboard allows staff to add, update, or remove menu items, change prices, and update availability in real time.",
      },
      {
        question: "Does it work offline?",
        answer:
          "The system includes offline fallback with auto-reconnection. Orders are queued and delivered as soon as connectivity is restored.",
      },
    ],
  },
  {
    slug: "library-management",
    title: "Library Management System",
    label: "Portfolio build",
    shortOverview:
      "A digital library system — catalogue search, member management, issue and return tracking, automated fines and reporting.",
    category: "Education ERP",
    builtFor: "Educational Institution",
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
      "Paper-based lending records make every issue and return a manual transaction, leave no remote way to check whether a book is available, and let missing stock go unnoticed until someone needs it.",
    solution:
      "Built a complete digital library management system for stock, issue tracking and member management. Included a searchable catalogue, barcode scanning, automated fines, member roles and a reporting dashboard.",
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
    capabilities: [
      "Makes the whole catalogue searchable, so availability is a lookup rather than a shelf check",
      "Records issue and return at the desk through a barcode scan instead of a written entry",
      "Calculates overdue fines from configurable rules rather than by hand",
      "Lets students and staff see availability and place holds remotely",
      "Produces borrowing, overdue and stock reports for library administration",
    ],
    challenge:
      "Moving an existing paper catalogue into the system without re-keying errors. Built a bulk CSV import with validation and duplicate detection so the catalogue can be migrated in one pass and checked before it goes live.",
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
    businessValue: [
      "Replaces manual record-keeping with a system that can be searched and reported on",
      "Makes stock accuracy something the system tracks instead of something staff verify",
      "Removes the trip to the library purely to find out whether a book is available",
      "Frees counter time previously spent writing and filing transaction slips",
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
        answer:
          "The system is designed to handle tens of thousands of books with fast search and efficient inventory management.",
      },
      {
        question: "Can students check book availability online?",
        answer:
          "Yes. The system provides a web portal where students can search the catalog, check availability, and reserve books.",
      },
      {
        question: "How are overdue fines calculated?",
        answer:
          "Fines are automatically calculated based on configurable rules — number of days overdue, book type, and institutional policies.",
      },
    ],
  },
  {
    slug: "business-portfolio",
    title: "Business Portfolio Website",
    label: "Portfolio build",
    shortOverview:
      "A responsive, SEO-optimised corporate website with service detail pages and lead capture forms.",
    category: "Corporate Website",
    builtFor: "Corporate / SME",
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
      "A business without a website depends entirely on referrals and word of mouth, cannot be found by people already searching for what it sells, and has nowhere to send an enquiry that reaches the owner directly.",
    solution:
      "Created a responsive, SEO-optimised corporate website with service pages and lead capture. Built with modern React architecture, fast loading and a mobile-first design.",
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
    capabilities: [
      "Gives the business a page it can send customers to at any time",
      "Explains each service on its own page rather than compressing everything onto one",
      "Captures enquiries into a structured form instead of relying on phone numbers alone",
      "Is built to be indexed, with per-page metadata, schema markup and a sitemap",
      "Loads quickly and stays usable on a phone, where most visits start",
    ],
    challenge:
      "Brand assets and written content usually have to be produced as part of the build, not handed over. This project included a content structure, image selection and a basic set of brand guidelines.",
    futureEnhancements: [
      "Blog section for content marketing",
      "Live chat integration",
      "Client portal for project updates",
      "Multi-language support",
    ],
    developmentProcess: [
      "Brand and content strategy workshop",
      "UI/UX design with review rounds on key screens",
      "Frontend development with React",
      "SEO implementation and meta tag optimization",
      "Performance optimization and testing",
      "Domain and hosting setup",
      "Launch and analytics configuration",
    ],
    businessValue: [
      "A professional online presence to send prospects to instead of a phone number",
      "A clear written explanation of what the business does, available outside working hours",
      "Enquiries that arrive with the details already filled in, ready to act on",
      "A foundation that later marketing and content work can build on",
    ],
    relatedServices: [
      "Website Development",
      "SEO Optimization",
      "Corporate Websites",
      "Lead Generation",
    ],
    faqs: [
      {
        question: "What is included in a corporate website build?",
        answer:
          "A set of pages covering the business and each service in detail, an enquiry form, technical SEO fundamentals, analytics and a deployment you own. Scope and quote follow a conversation about your pages and functionality.",
      },
      {
        question: "Will the website rank on Google?",
        answer:
          "No one can promise a position. What the build guarantees is the technical foundation — proper meta tags, schema markup, fast loading and mobile responsiveness — which is what has to be right before ranking is even possible.",
      },
      {
        question: "Can I update the content myself?",
        answer:
          "The website uses a component-based architecture that makes content updates straightforward. We also provide a handover guide.",
      },
    ],
  },
  {
    slug: "ai-business-assistant",
    title: "AI Business Assistant",
    label: "Portfolio build",
    shortOverview:
      "A retrieval-augmented assistant that answers questions from a business's own documents, with links back to the source.",
    category: "Artificial Intelligence",
    builtFor: "Internal Tool",
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
      "Answering routine internal questions means searching across PDFs, wiki pages and shared drives by hand. The person who knows a particular answer is often not available, and staff default to asking a colleague rather than looking.",
    solution:
      "Developed a retrieval-augmented assistant that answers questions from an organisation's own documents. Documents are ingested, chunked and indexed in a vector database; queries retrieve the most relevant passages, and an LLM generates an answer that cites its sources.",
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
    capabilities: [
      "Answers questions using the organisation's own documents rather than general model knowledge",
      "Cites the source passage for every answer, so a user can check it",
      "Declines to answer when the documents do not support one, instead of guessing",
      "Lets staff find policy, process and reference material without searching five systems",
      "Gives an admin view of which documents were added and which questions are asked",
    ],
    challenge:
      "Making sure the assistant answers only from verified documents. Implemented a similarity threshold — below it, the assistant states it does not know rather than inventing an answer, and every response links back to its sources so a user can verify it.",
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
    businessValue: [
      "Removes the need for one person to be the answer to every internal question",
      "Points new starters to the same documented source as long-standing staff",
      "Surfaces policy and process answers in seconds rather than by email",
      "Shows which questions recur, which is where the real documentation gaps are",
    ],
    relatedServices: [
      "AI Solutions",
      "AI Chatbots",
      "RAG Implementation",
      "LangChain Development",
    ],
    faqs: [
      {
        question: "How accurate are the responses?",
        answer:
          "Accuracy depends entirely on the quality and currency of the documents you provide, so we do not quote a fixed figure. The design controls for it instead: the assistant answers only from retrieved passages, cites each source, and says it does not know when the material is not there — so a wrong answer is traceable rather than authoritative.",
      },
      {
        question: "What documents can the AI learn from?",
        answer:
          "PDFs, Word documents, Confluence pages, web pages, and structured data files. The system supports most common document formats.",
      },
      {
        question: "How long does implementation take?",
        answer:
          "Timeline depends on the size of the document set and how complex the knowledge base needs to be. We estimate it properly once we have seen the documents.",
      },
    ],
  },
  {
    slug: "erp-management",
    title: "ERP Management System",
    label: "Portfolio build",
    shortOverview:
      "A custom ERP integrating inventory, employee management, billing and reporting into a single platform.",
    category: "ERP",
    builtFor: "SME / Manufacturing",
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
      "Operations spread across spreadsheets for stock, a separate package for payroll and manual invoicing. The same data gets re-entered in several places, and reconciling the versions takes time nobody has budgeted for.",
    solution:
      "Built an ERP platform integrating inventory, employee management, billing and reporting. A single system that connects departments through shared data and automated workflows rather than separate disconnected tools.",
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
    capabilities: [
      "Holds inventory, staff and billing records in one database rather than several",
      "Updates stock and billing from the same transaction, so the two cannot disagree",
      "Applies configurable rules to recurring processes instead of relying on memory",
      "Gives each department role-based access to the records it needs",
      "Keeps an audit trail, so a figure can be traced back to the entries behind it",
    ],
    challenge:
      "Combining data that already exists in different formats. Built a unified data layer with ETL steps that normalise legacy sources into the new schema rather than asking each department to re-key their history.",
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
    businessValue: [
      "One record per entity, instead of a version per spreadsheet and per department",
      "Reporting assembled from live data rather than compiled by hand",
      "Controls and approvals applied consistently because they live in the system",
      "A platform that can be extended module by module rather than replaced wholesale",
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
        answer:
          "ERP timelines depend on the number of modules and how much data has to be migrated. We map the processes first, then give you a phased plan with dates.",
      },
      {
        question: "Can the ERP be customized for our specific workflow?",
        answer:
          "Yes. The ERP is built from scratch and can be fully customized to match your exact business processes and requirements.",
      },
      {
        question: "What about data migration from our current systems?",
        answer:
          "We handle complete data migration including validation, deduplication, and mapping to ensure nothing is lost in the transition.",
      },
    ],
  },
  {
    slug: "powerbi-dashboard",
    title: "Power BI Sales Dashboard",
    label: "Portfolio build",
    shortOverview:
      "Interactive Power BI dashboards presenting KPIs, revenue trends and sales performance from several source systems.",
    category: "Business Analytics",
    builtFor: "Corporate / SME",
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
      "Performance reporting assembled by hand in Excel from several systems. Every report has to be rebuilt and re-checked, so by the time it reaches management the numbers describe a past period and nobody can drill into why.",
    solution:
      "Created interactive dashboards presenting KPIs, revenue trends and sales performance. Connected multiple data sources through Azure Data Factory with executive, sales, operations and finance views, plus drill-down, anomaly flags and scheduled email delivery.",
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
    capabilities: [
      "Pulls figures from several source systems into one reconciled model",
      "Refreshes on a schedule, so a report describes the current period rather than last week's",
      "Lets a manager drill from a headline number down to the rows behind it",
      "Flags unusual values automatically instead of waiting to be noticed",
      "Delivers scheduled reports by email to the people who need them",
    ],
    challenge:
      "Five source systems that used different names for the same thing. Built an ETL pipeline in Azure Data Factory with data cleansing and a unified semantic model, so one measure means one thing everywhere it appears.",
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
    businessValue: [
      "Reporting produced by the system rather than retyped by hand each cycle",
      "One agreed set of numbers, instead of a different version per department",
      "Performance visible while it is happening, not a reporting cycle later",
      "Self-service analysis for managers who do not write SQL",
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
        answer:
          "Power BI connects to 100+ data sources including Excel, SQL Server, MySQL, PostgreSQL, Google Analytics, Salesforce, and many more.",
      },
      {
        question: "How often do the dashboards update?",
        answer:
          "Dashboards can be configured to refresh hourly, daily, or on-demand depending on your business needs and data source capabilities.",
      },
      {
        question: "Can we share dashboards with our team?",
        answer:
          "Yes. Power BI Service allows secure sharing through workspaces, email subscriptions, and embedded reports accessible on web and mobile.",
      },
    ],
  },
  {
    slug: "seo-digital-growth",
    title: "Business SEO & Digital Growth",
    label: "Portfolio build",
    shortOverview:
      "Technical SEO, content optimisation, schema markup, and GEO and AEO structuring for search and AI-answer visibility.",
    category: "SEO / GEO / AEO",
    builtFor: "SME / Professional Services",
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
      "A site can hold good services and still be effectively invisible, because it is technically hard for crawlers to read, has no consistent page-level metadata, and does not answer the questions people actually type.",
    solution:
      "Implemented technical SEO, content optimisation, schema markup, GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) to improve how the site is indexed, understood and cited across search and AI answer surfaces.",
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
    capabilities: [
      "Removes crawl, speed and indexation problems that cap any content effort",
      "Gives each page its own title, description and canonical, so pages compete separately",
      "Adds structured data so search engines can read what the business actually offers",
      "Answers real questions directly, which is what both featured snippets and AI answers quote",
      "Reports what changed in search and traffic, so effort can be judged and re-prioritised",
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
    businessValue: [
      "Fixes the technical blockers that limit every other marketing activity",
      "Makes each service page a credible candidate for the searches it targets",
      "Puts the business in front of AI answers as well as classic search results",
      "Makes performance measurable, so spend can be judged on evidence rather than opinion",
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
        answer:
          "That depends on the starting point, competition and how often work is done. Technical fixes can show impact within weeks; content and authority building compound over months. Anyone quoting a specific ranking or traffic number up front is guessing, and we do not.",
      },
      {
        question: "What is GEO and why does it matter?",
        answer:
          "GEO (Generative Engine Optimization) optimizes your content so AI search engines like ChatGPT and Google AI Overviews recommend your business when users ask relevant questions.",
      },
      {
        question: "Do you provide ongoing SEO support?",
        answer:
          "Yes. We offer monthly SEO retainers that include monitoring, content updates, technical maintenance, and performance reporting.",
      },
    ],
  },
  {
    slug: "business-automation",
    title: "Custom Business Automation Platform",
    label: "Portfolio build",
    shortOverview:
      "An automation platform covering workflow configuration, approvals, notifications and reporting.",
    category: "Business Automation",
    builtFor: "SME / Operations",
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
      "Approvals, notifications, report generation and data entry are done by hand across departments. Each handoff depends on someone remembering to do it, and when a step is missed the error is usually found later by someone else.",
    solution:
      "Developed an automation platform covering workflow configuration, approvals, notifications and reporting. Routine steps run automatically, while exceptions are routed to a named human with the full context attached.",
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
    capabilities: [
      "Runs repeatable steps without someone having to remember to start them",
      "Holds an approval to a defined chain, with an escalation path",
      "Notifies the right person automatically when their step is next",
      "Routes anything ambiguous to a reviewer with the supporting context attached",
      "Records where work is sitting, so bottlenecks are visible rather than inferred",
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
    businessValue: [
      "Removes a class of routine coordination work and the mistakes that come with it",
      "Makes approval ownership explicit instead of implicit",
      "Keeps work moving without waiting for someone to check on it",
      "Shows where processes actually slow down, which is where the real cost sits",
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
        answer:
          "Almost any repetitive process — approvals, notifications, data entry, report generation, task assignments, and inter-department coordination.",
      },
      {
        question: "Can we modify workflows without developer help?",
        answer:
          "Yes. The platform includes a visual workflow builder that allows non-technical users to create and modify automation rules.",
      },
      {
        question: "How does the system handle exceptions?",
        answer:
          "When a workflow encounters an exception or requires human judgment, it automatically routes the task to the appropriate reviewer with all relevant context.",
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
