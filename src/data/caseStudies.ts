/* ─── Project Data ──────────────────────────────────────────────────────────
 * Portfolio/project records describing systems YESBE has designed and built.
 * These entries document scope, design, and capabilities. They do not claim
 * verified client names, deployment outcomes, revenue, or performance metrics
 * unless evidence is added to the record.
 * ────────────────────────────────────────────────────────────────────────── */

export interface CaseStudy {
  slug: string;
  title: string;
  label: string;
  shortOverview: string;
  category: string;
  image: string;
  imageAlt: string;
  imageType: "screenshot" | "conceptual";
  technologies: string[];
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; description: string }[];
  outcome: string;
  faqs: { question: string; answer: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "fashion-fusion",
    title: "E-Commerce Platform",
    label: "Portfolio build",
    category: "E-Commerce Platform",
    shortOverview: "A full-stack e-commerce platform concept for fashion retail, covering product browsing, cart, checkout, inventory, and order management.",
    image: "/images/case-studies/fashion-fusion.webp",
    imageAlt: "E-commerce platform interface preview",
    imageType: "screenshot",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Stripe"],
    overview: "This e-commerce platform was designed for a clothing retail scenario. It brings product discovery, shopping cart management, checkout, and administrative operations into one web application. The project demonstrates how a retail business can manage online sales through a structured digital storefront instead of manual order handling.",
    problem: "Small fashion retailers often manage products and orders through messages, spreadsheets, and manual confirmations. This makes it difficult to maintain an accurate catalog, track inventory, confirm orders consistently, and provide customers with a smooth online buying experience.",
    solution: "The platform was designed with a responsive product catalog, search and filtering, customer accounts, persistent cart, Stripe checkout integration, and an admin dashboard. Inventory, order status, and sales information are managed in one system so the storefront and operations stay connected.",
    features: [
      { title: "Product Catalog & Search", description: "Browsable product listings with categories, filters, and product details to help customers find items quickly." },
      { title: "Cart & Checkout Flow", description: "Persistent cart and structured checkout flow designed to make order placement clear and reliable." },
      { title: "Payment Integration", description: "Stripe payment integration for handling online payments within the checkout process." },
      { title: "Inventory Management", description: "Admin tools for tracking product availability and updating stock as orders are placed." },
      { title: "Order Tracking", description: "Order status views that help customers and administrators follow orders through fulfillment stages." },
      { title: "Admin Dashboard", description: "A management interface for products, orders, and sales reporting in one place." }
    ],
    outcome: "The project delivered a working e-commerce application design and build that demonstrates end-to-end retail workflows, from product browsing to checkout and admin management. It provides a practical foundation for businesses that need a custom online store with operational controls.",
    faqs: [
      { question: "What features does this e-commerce platform include?", answer: "It includes a product catalog, search and filters, customer accounts, cart, Stripe checkout, order tracking, inventory management, and an admin dashboard." },
      { question: "Can this e-commerce platform be customized for a different brand?", answer: "Yes. The layout, product structure, payment options, shipping rules, and admin workflows can be adapted to a different retail business and brand requirements." },
      { question: "Can it integrate with payment gateways and other systems?", answer: "Yes, where technically feasible. The project includes Stripe integration, and other payment gateways, shipping, CRM, or ERP integrations can be evaluated based on requirements." },
      { question: "Is the platform suitable for mobile users?", answer: "Yes. The interface was designed with responsive layouts so customers can browse products and complete checkout on mobile, tablet, and desktop devices." }
    ]
  },
  {
    slug: "restaurant-qr-ordering",
    title: "Restaurant QR Ordering System",
    label: "Portfolio build",
    category: "Restaurant Technology",
    shortOverview: "A contactless QR ordering system for restaurants, connecting table-side ordering, kitchen operations, and admin menu control.",
    image: "/images/case-studies/restaurant-qr-ordering.webp",
    imageAlt: "Restaurant QR ordering system interface preview",
    imageType: "screenshot",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "QR Code API"],
    overview: "The Restaurant QR Ordering System is a web-based ordering workflow built for dine-in restaurant scenarios. Customers scan a table QR code, browse the menu, and place orders from their device. Orders flow to kitchen and admin interfaces so staff can manage preparation and menu availability from a single system.",
    problem: "Traditional restaurant ordering can create delays during busy periods, increase manual order-entry errors, and make it harder for staff to keep menu availability and table orders synchronized. Restaurants also need a simple way for guests to order without waiting for a staff member to take every request.",
    solution: "The system was designed around QR-based table access, a digital menu, real-time order transmission, and role-based interfaces for kitchen and admin staff. Socket.IO supports live order updates, while the admin panel allows menu and table management without changing the customer-facing flow.",
    features: [
      { title: "QR Table Ordering", description: "Each table can be associated with a QR code that opens the digital menu for that dining context." },
      { title: "Digital Menu Browsing", description: "Customers can browse menu categories, items, and details from their mobile device." },
      { title: "Real-Time Kitchen Display", description: "Incoming orders appear in the kitchen interface with live updates to support preparation workflows." },
      { title: "Order Status Updates", description: "Order progress can be tracked through status changes as staff prepare and complete items." },
      { title: "Admin Menu Management", description: "Staff can manage menu items, availability, and pricing from an admin interface." },
      { title: "Table & Session Management", description: "The system supports table-level ordering context so orders can be organized by dining session." }
    ],
    outcome: "The project delivered a practical restaurant ordering workflow that demonstrates how QR ordering, kitchen coordination, and admin control can work together. It provides a reusable foundation for restaurants exploring contactless ordering and digital table service.",
    faqs: [
      { question: "How does the QR ordering flow work for customers?", answer: "Customers scan a table QR code, view the digital menu on their device, select items, and place an order. The order is sent to the restaurant's operational interface for processing." },
      { question: "Can the menu and prices be updated easily?", answer: "Yes. The admin interface is designed to manage menu items, categories, availability, and pricing so updates can be made without changing the customer flow." },
      { question: "Does the system support kitchen order management?", answer: "Yes. Orders are sent to a kitchen-facing view with real-time updates, helping staff see incoming orders and manage preparation status." },
      { question: "Can this be adapted for different restaurant formats?", answer: "Yes. The workflow can be adapted for cafes, quick-service restaurants, or dine-in venues depending on menu structure, table management, and operational requirements." }
    ]
  },
  {
    slug: "library-management",
    title: "Library Management System",
    label: "Portfolio build",
    category: "Education Software",
    shortOverview: "A web-based library management system for cataloging books, managing member records, and tracking lending activity.",
    image: "/images/case-studies/library-management.webp",
    imageAlt: "Library management system dashboard preview",
    imageType: "screenshot",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    overview: "The Library Management System is a web application designed to help libraries manage book catalogs, member records, borrowing, and returns through a single interface. It replaces manual register-based tracking with structured digital records that are easier to search, update, and maintain.",
    problem: "Libraries that rely on paper registers or spreadsheets can struggle with catalog accuracy, overdue tracking, member history, and day-to-day lending operations. Manual processes also make it harder for staff to quickly find books or confirm borrowing status.",
    solution: "The system provides book catalog management, member profiles, issue and return workflows, due-date tracking, and search functionality. The admin dashboard gives staff a clear view of library activity, while structured records reduce the need for manual cross-checking.",
    features: [
      { title: "Book Catalog Management", description: "Add, edit, and organize books with metadata such as title, author, category, and availability." },
      { title: "Member Records", description: "Maintain member profiles and borrowing history in a structured digital format." },
      { title: "Issue & Return Workflow", description: "Track book borrowing and returns with clear status updates for staff." },
      { title: "Due Date Tracking", description: "Monitor due dates and overdue items to support timely returns and follow-up." },
      { title: "Search & Discovery", description: "Search the catalog by book details to help staff and users locate records quickly." },
      { title: "Admin Dashboard", description: "View library activity, inventory status, and lending records from a central interface." }
    ],
    outcome: "The project delivered a functional library operations system that demonstrates how cataloging, member management, and lending workflows can be digitized. It provides a clear base for educational institutions or community libraries needing a custom management tool.",
    faqs: [
      { question: "What library operations does this system cover?", answer: "It covers book catalog management, member records, issue and return workflows, due-date tracking, search, and administrative oversight." },
      { question: "Can it be used by schools or colleges?", answer: "Yes. The system can be adapted for school, college, or community library workflows depending on catalog size, member roles, and reporting needs." },
      { question: "Does it support overdue tracking?", answer: "Yes. The system includes due-date tracking and overdue visibility so staff can identify items that need follow-up." },
      { question: "Can additional features be added later?", answer: "Yes. Features such as notifications, barcode/RFID integration, fine management, or reporting extensions can be evaluated based on the library's requirements." }
    ]
  },
  {
    slug: "business-portfolio",
    title: "Business Portfolio Website",
    label: "Portfolio build",
    category: "Corporate Website",
    shortOverview: "A corporate portfolio website designed to present services, credibility, and business inquiries through a polished responsive experience.",
    image: "/images/case-studies/business-portfolio.webp",
    imageAlt: "Business portfolio website interface preview",
    imageType: "screenshot",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    overview: "This business portfolio website was designed as a modern corporate web presence for service-based businesses. It focuses on clear messaging, structured service presentation, visual credibility, and contact pathways that help visitors understand the business and take the next step.",
    problem: "Many businesses have outdated or unclear websites that do not communicate services well, build trust quickly, or guide visitors toward inquiries. A weak web presence can make it harder for potential customers to understand offerings and contact the business confidently.",
    solution: "The project was built as a responsive, component-based website with a strong hero section, service presentation, project/credibility areas, and contact flow. The layout emphasizes clarity, performance-conscious frontend implementation, and a maintainable structure for future content updates.",
    features: [
      { title: "Responsive Corporate Layout", description: "A mobile-friendly layout designed to present business information clearly across devices." },
      { title: "Service Presentation", description: "Structured sections for explaining services, value propositions, and business capabilities." },
      { title: "Project & Credibility Sections", description: "Areas for showcasing work, company strengths, or trust-building content in a clear format." },
      { title: "Contact & Inquiry Flow", description: "Clear calls to action and contact pathways to help visitors reach the business." },
      { title: "Animation & Interaction", description: "Subtle motion used to support visual polish while keeping the experience readable." },
      { title: "Maintainable Frontend Structure", description: "Component-based implementation that makes future content and section updates easier." }
    ],
    outcome: "The project delivered a modern corporate website foundation that demonstrates how a business can present its services and credibility online. It can be adapted for different companies needing a clear, professional web presence.",
    faqs: [
      { question: "What type of business is this website suitable for?", answer: "It is suitable for service-based businesses, agencies, consultants, and companies that need a professional website to present services and generate inquiries." },
      { question: "Can the content and branding be customized?", answer: "Yes. The structure, copy, visuals, branding, and sections can be tailored to match a specific business identity and messaging." },
      { question: "Is the website mobile responsive?", answer: "Yes. The layout was designed to work across mobile, tablet, and desktop screen sizes." },
      { question: "Can it include CMS or blog functionality?", answer: "Yes. A CMS, blog, or other dynamic content features can be added depending on the business's content management needs." }
    ]
  },
  {
    slug: "ai-business-assistant",
    title: "AI Business Assistant",
    label: "Portfolio build",
    category: "AI & Automation",
    shortOverview: "An AI assistant concept for business workflows, designed to support knowledge retrieval, task assistance, and conversational interactions.",
    image: "/images/case-studies/ai-business-assistant.webp",
    imageAlt: "AI business assistant interface preview",
    imageType: "screenshot",
    technologies: ["React", "Node.js", "Python", "OpenAI API", "PostgreSQL", "Redis"],
    overview: "The AI Business Assistant is a portfolio project exploring how conversational AI can support internal business workflows. It combines a chat interface, API integrations, and data retrieval patterns to help users ask questions, access information, and complete routine tasks through a guided assistant experience.",
    problem: "Teams often spend time searching across documents, tools, and repeated internal questions. Without a structured assistant layer, knowledge access can be slow and routine requests can create unnecessary manual effort for staff.",
    solution: "The assistant was designed with a conversational interface, backend orchestration, and integration points for business data sources. It uses AI capabilities for natural-language interaction while keeping workflows grounded in defined business contexts and data access patterns.",
    features: [
      { title: "Conversational Interface", description: "A chat-based interface for users to ask questions and request assistance in natural language." },
      { title: "Knowledge Retrieval", description: "Designed to retrieve relevant business information from connected sources or prepared knowledge bases." },
      { title: "Workflow Assistance", description: "Supports routine task flows such as answering common questions or guiding users through defined processes." },
      { title: "Backend Orchestration", description: "API and service layers coordinate prompts, data access, and response handling." },
      { title: "Context-Aware Responses", description: "Responses can be shaped around business context and available data rather than generic chat alone." },
      { title: "Extensible Integration Design", description: "The architecture can be extended to connect additional tools, databases, or internal systems." }
    ],
    outcome: "The project delivered a practical AI assistant prototype that demonstrates how conversational interfaces can be applied to business operations. It provides a foundation for organizations evaluating AI-assisted knowledge access and workflow support.",
    faqs: [
      { question: "What can the AI Business Assistant help with?", answer: "It is designed to assist with knowledge retrieval, common business questions, and guided workflow interactions depending on the connected data and configured use cases." },
      { question: "Can it connect to company data sources?", answer: "Yes, where technically feasible. It can be designed to connect to approved databases, documents, or APIs based on security and business requirements." },
      { question: "Is the assistant limited to a chatbot interface?", answer: "No. While this project uses a chat interface, the same assistant logic can be extended into internal tools, dashboards, or workflow systems." },
      { question: "How is accuracy handled in AI responses?", answer: "Accuracy depends on the data sources, prompt design, and validation rules used. Production implementations should include appropriate guardrails, source grounding, and human review where needed." }
    ]
  },
  {
    slug: "erp-management",
    title: "ERP Management System",
    label: "Portfolio build",
    category: "Enterprise Software",
    shortOverview: "A modular ERP management system concept for connecting core business operations, records, and reporting in one platform.",
    image: "/images/case-studies/erp-management.webp",
    imageAlt: "ERP management system dashboard preview",
    imageType: "screenshot",
    technologies: ["React", "Node.js", "Express.js", "PostgreSQL", "TypeScript", "Docker"],
    overview: "The ERP Management System is a portfolio project designed to demonstrate how core business functions can be managed in a unified application. It covers modular workflows such as inventory, sales, purchasing, HR-related records, and reporting, giving teams a single operational view instead of disconnected tools.",
    problem: "Businesses using separate spreadsheets and disconnected systems often face inconsistent data, duplicated effort, and limited visibility across departments. This makes it harder to track operations, manage approvals, and generate reliable reports.",
    solution: "The system was designed as a modular ERP platform with role-based access, shared data models, and dashboards for operational visibility. Each module supports a specific business function while feeding into a common reporting layer so teams can work from consistent information.",
    features: [
      { title: "Modular Business Workflows", description: "Separate modules for operational areas such as inventory, sales, purchasing, and internal records." },
      { title: "Role-Based Access", description: "User permissions can be structured by role so teams access relevant data and actions." },
      { title: "Centralized Data Model", description: "Shared records reduce duplication and improve consistency across business functions." },
      { title: "Operational Dashboards", description: "Dashboards provide visibility into key records, statuses, and activity across modules." },
      { title: "Reporting Views", description: "Structured reporting helps teams review operational data from a common system." },
      { title: "Extensible Architecture", description: "The modular design supports adding new workflows or integrations as business needs grow." }
    ],
    outcome: "The project delivered an ERP system foundation that demonstrates unified business operations and reporting. It can be adapted for organizations that need a custom ERP workflow aligned to their specific processes.",
    faqs: [
      { question: "What business areas can this ERP system cover?", answer: "The project demonstrates modules for areas such as inventory, sales, purchasing, records management, and reporting. The exact scope can be tailored to business requirements." },
      { question: "Can the ERP be customized to our processes?", answer: "Yes. Custom ERP implementations should be adapted to the organization's workflows, approval rules, roles, and reporting needs." },
      { question: "Is role-based access supported?", answer: "Yes. The design includes role-based access patterns so different users can have appropriate permissions and visibility." },
      { question: "Can it integrate with existing tools?", answer: "Yes, where technically feasible. Integrations with accounting, CRM, HR, or other business systems can be planned based on the existing stack and data flow requirements." }
    ]
  },
  {
    slug: "powerbi-dashboard",
    title: "Power BI Analytics Dashboard",
    label: "Portfolio build",
    category: "Data Analytics",
    shortOverview: "A Power BI dashboard concept for turning business data into clear reporting views, KPIs, and decision-support visuals.",
    image: "/images/case-studies/powerbi-dashboard.webp",
    imageAlt: "Power BI analytics dashboard preview",
    imageType: "screenshot",
    technologies: ["Power BI", "DAX", "SQL", "Python", "Azure"],
    overview: "This Power BI Analytics Dashboard project demonstrates how business data can be modeled and presented through interactive reporting. It focuses on making key metrics visible through structured dashboards, filters, and visual summaries that help teams review performance and trends.",
    problem: "When reporting is spread across spreadsheets and manual exports, teams can struggle to get a consistent view of performance. Decision-makers may spend too much time preparing reports instead of reviewing insights and acting on them.",
    solution: "The dashboard was designed with a clear KPI layer, interactive filters, and visual reports built from structured data models. DAX measures and SQL-based data preparation support consistent calculations, while the dashboard layout prioritizes readability and decision support.",
    features: [
      { title: "KPI Summary Views", description: "High-level metrics presented in a clear dashboard format for quick performance review." },
      { title: "Interactive Filters", description: "Users can filter reports by relevant dimensions such as time period, category, or business segment." },
      { title: "Data Modeling & DAX", description: "Structured data models and DAX measures support consistent calculations across visuals." },
      { title: "Trend & Comparison Charts", description: "Visual reports help compare performance over time and across business areas." },
      { title: "Report Drill-Down", description: "Users can move from summary metrics to more detailed views for deeper analysis." },
      { title: "Decision-Support Layout", description: "Dashboard design prioritizes clarity so stakeholders can interpret data without unnecessary complexity." }
    ],
    outcome: "The project delivered a reporting dashboard foundation that demonstrates how Power BI can be used for business visibility and analysis. It can be adapted to different datasets, KPI frameworks, and reporting needs.",
    faqs: [
      { question: "What kind of data can be visualized in this dashboard?", answer: "Power BI dashboards can visualize sales, operations, finance, marketing, or other business data, depending on the available sources and reporting goals." },
      { question: "Can the dashboard connect to our existing data sources?", answer: "Yes, where supported. Power BI can connect to many databases, spreadsheets, cloud services, and APIs, subject to access and data quality requirements." },
      { question: "Can KPIs and reports be customized?", answer: "Yes. KPI definitions, visuals, filters, and report layouts should be customized around the metrics that matter to your business." },
      { question: "Is this suitable for non-technical users?", answer: "Yes. Dashboards can be designed for business users with clear visuals, filters, and summaries, while technical teams manage the underlying data model." }
    ]
  },
  {
    slug: "seo-digital-growth",
    title: "SEO & Digital Growth",
    label: "Portfolio build",
    category: "Digital Marketing",
    shortOverview: "A digital growth project covering SEO foundations, content structure, and website improvements designed to support organic visibility.",
    image: "/images/case-studies/seo-digital-growth.webp",
    imageAlt: "SEO and digital growth analytics preview",
    imageType: "screenshot",
    technologies: ["Next.js", "Google Search Console", "Google Analytics", "SEMrush", "Schema Markup"],
    overview: "This SEO and Digital Growth project documents a website improvement and search visibility workflow. It focuses on technical SEO foundations, content structure, on-page optimization, and analytics setup to help a business build a stronger organic presence over time.",
    problem: "Businesses often have websites that are difficult for search engines to crawl, poorly structured for target queries, or missing clear content and measurement foundations. Without these basics, organic growth efforts can be inconsistent and hard to evaluate.",
    solution: "The project approach combined technical SEO checks, metadata and schema improvements, content structure planning, and analytics setup. The work focused on creating a clear search foundation and measurable reporting rather than making unverified traffic or ranking promises.",
    features: [
      { title: "Technical SEO Foundation", description: "Review and improve crawlability, indexability, metadata, and page structure fundamentals." },
      { title: "On-Page Optimization", description: "Align page titles, headings, content structure, and internal links with target topics." },
      { title: "Schema Markup", description: "Add structured data where appropriate to help search engines understand page content." },
      { title: "Content Structure Planning", description: "Organize pages and content around relevant search intent and business services." },
      { title: "Analytics & Search Console Setup", description: "Configure measurement tools to monitor indexing, search queries, and site behavior." },
      { title: "Growth Reporting Framework", description: "Establish a reporting structure for tracking SEO activity and website performance over time." }
    ],
    outcome: "The project delivered an SEO and measurement foundation that demonstrates how technical improvements, content structure, and analytics can support long-term digital growth. It is presented as a capability example, not a guarantee of specific ranking or traffic results.",
    faqs: [
      { question: "What does this SEO project include?", answer: "It includes technical SEO foundations, on-page optimization, schema markup, content structure planning, and analytics/search console setup." },
      { question: "Can you guarantee rankings or traffic increases?", answer: "No. Search performance depends on many factors, including competition, content quality, technical health, and time. The focus should be on sound strategy, implementation, and measurable improvements." },
      { question: "Is this suitable for a new website?", answer: "Yes. New websites benefit from strong technical and content foundations early, which can make future SEO efforts more effective." },
      { question: "Can SEO be combined with website redesign?", answer: "Yes. SEO considerations can be integrated into website redesigns so structure, content, metadata, and performance are addressed together." }
    ]
  },
  {
    slug: "business-automation",
    title: "Business Workflow Automation",
    label: "Portfolio build",
    category: "Business Automation",
    shortOverview: "A business automation project focused on replacing manual handoffs with connected workflows, notifications, and operational visibility.",
    image: "/images/case-studies/business-automation.webp",
    imageAlt: "Business workflow automation dashboard preview",
    imageType: "screenshot",
    technologies: ["Node.js", "Python", "React", "PostgreSQL", "REST APIs", "Zapier"],
    overview: "This Business Workflow Automation project demonstrates how repetitive operational tasks can be coordinated through connected systems. It focuses on mapping manual processes, automating handoffs, and creating visibility into task status so teams can spend less time on routine coordination.",
    problem: "Manual workflows often rely on emails, spreadsheets, and repeated data entry across tools. These handoffs can slow operations, create inconsistencies, and make it difficult to understand where work is stuck or completed.",
    solution: "The project was designed around workflow mapping, API integrations, automated notifications, and a simple operational interface. By connecting systems and defining process rules, routine steps can move forward with less manual intervention while keeping staff informed.",
    features: [
      { title: "Workflow Mapping", description: "Identify manual steps, handoffs, and decision points before automating the process." },
      { title: "System Integrations", description: "Connect tools and data sources through APIs or automation platforms where appropriate." },
      { title: "Automated Notifications", description: "Send status updates or alerts when tasks move forward, need attention, or are completed." },
      { title: "Task & Status Visibility", description: "Provide a clear view of workflow progress so teams can track operational activity." },
      { title: "Data Synchronization", description: "Reduce repeated data entry by syncing relevant information between connected systems." },
      { title: "Configurable Rules", description: "Use defined business rules to control when automation runs and when human review is needed." }
    ],
    outcome: "The project delivered an automation workflow foundation that demonstrates how connected systems and process rules can reduce manual coordination. It can be adapted to different business operations depending on tools, approvals, and process complexity.",
    faqs: [
      { question: "What processes can be automated?", answer: "Common candidates include lead routing, notifications, approvals, data sync, reporting workflows, and repetitive administrative handoffs, depending on the tools and rules involved." },
      { question: "Can automation work with our existing software?", answer: "Often yes, where APIs, webhooks, or integration platforms are available. Feasibility depends on the systems you use and the required data flow." },
      { question: "Will automation remove human oversight?", answer: "Not necessarily. Automation can handle repetitive steps while keeping human review for approvals, exceptions, or sensitive decisions." },
      { question: "How do you decide what to automate first?", answer: "A good starting point is a repetitive, rule-based process with clear inputs and outputs. Mapping the workflow helps identify high-impact automation opportunities with manageable risk." }
    ]
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
