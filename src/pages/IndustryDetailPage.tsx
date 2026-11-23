import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  getIndustrySeoDescription,
  getIndustrySeoTitle,
  SEO_DESCRIPTIONS,
  SEO_TITLES,
} from "@/constants/seoTitles";
import { getIndustryBySlug } from "@/data/industries";
import { JsonLd } from "@/components/common/JsonLd";
import { DetailFAQ } from "@/components/common/DetailFAQ";
import { DetailEnquiryCard } from "@/components/common/DetailEnquiryCard";

interface DetailContent {
  name: string;
  image: string;
  imageAlt: string;
  introHeading: string;
  intro: string[];
  capabilitiesHeading?: string;
  capabilities: { title: string; description: string }[];
  valueHeading?: string;
  valueIntro: string;
  value: string[];
  faqs: { question: string; answer: string }[];
  enquiryHeading: string;
}

const CONTENT: Record<string, DetailContent> = {
  healthcare: {
    name: "Healthcare",
    image: "/images/industries/healthcare.webp",
    imageAlt: "Modern healthcare environment with digital clinical technology",
    introHeading: "Smarter Technology for Modern Healthcare",
    intro: [
      "Healthcare organizations manage sensitive information, complex schedules, and coordination across clinical and administrative teams. When systems are fragmented, staff spend valuable time on manual updates, duplicate records, and delayed handoffs.",
      "YESBE Technologies helps healthcare providers build practical digital systems that support day-to-day operations. From patient portals and workflow automation to reporting and secure access controls, we design technology around your processes and project requirements.",
    ],
    capabilities: [
      { title: "Healthcare Management Software", description: "Custom systems for managing appointments, administrative records, billing workflows, and operational coordination." },
      { title: "Electronic Health Records Integration", description: "Secure integration approaches that connect existing record systems and reduce duplicate data entry where appropriate." },
      { title: "Appointment & Patient Portals", description: "Digital portals for scheduling, intake, updates, and communication that make patient interactions easier to manage." },
      { title: "Clinical Workflow Automation", description: "Automated administrative workflows for approvals, reminders, handoffs, and routine operational tasks." },
      { title: "Healthcare Data Analytics", description: "Dashboards and reporting views that help teams monitor utilization, delays, and operational performance." },
      { title: "Data Privacy & Access Control", description: "Role-based access, audit visibility, and security-conscious system design aligned with project requirements." },
    ],
    valueIntro: "The right technology can support healthcare teams by improving visibility and reducing avoidable administrative work. These are potential benefits, not guaranteed client outcomes.",
    value: ["Reduced manual administration", "Better operational visibility", "More reliable data access", "Improved coordination", "Secure information handling"],
    faqs: [
      { question: "Can YESBE integrate with our existing hospital management software?", answer: "Yes, where technically feasible. We review your current systems, APIs, data structure, and workflow requirements before proposing an integration approach." },
      { question: "Can you develop custom healthcare applications?", answer: "Yes. We can design and develop custom healthcare applications based on your operational needs, user roles, and project scope." },
      { question: "How do you approach patient data privacy and security?", answer: "We apply security-conscious design practices such as role-based access, audit trails, encryption where appropriate, and controlled data handling. Compliance requirements are reviewed and addressed according to project scope, applicable regulations, architecture, and contractual obligations." },
      { question: "Can you automate appointment scheduling and administrative workflows?", answer: "Yes. We can automate scheduling, reminders, approvals, and routine administrative workflows to reduce manual effort and improve coordination." },
      { question: "Do you provide maintenance and technical support?", answer: "Yes. We can provide ongoing maintenance and technical support based on the agreed support scope after launch." },
    ],
    enquiryHeading: "Let's Build Your Healthcare Technology Solution.",
  },
  education: {
    name: "Education",
    image: "/images/industries/education.webp",
    imageAlt: "Modern education environment with students and digital learning technology",
    introHeading: "Practical Digital Systems for Education Institutions",
    intro: [
      "Schools, colleges, and training institutions manage admissions, student records, academic schedules, fees, communication, and reporting across many teams. When these processes rely on disconnected tools or manual updates, staff workload increases and important information becomes harder to track.",
      "YESBE Technologies helps education institutions build reliable software systems that support daily operations and improve visibility. From student information systems and learning platforms to fee management and academic reporting, we design solutions around your institution's workflows and project requirements.",
    ],
    capabilities: [
      { title: "School, College & Institutional Management Systems", description: "Centralized platforms for managing academic operations, departments, staff coordination, and administrative workflows." },
      { title: "Student Information Systems", description: "Structured systems for student records, enrollment details, attendance, academic history, and communication." },
      { title: "Learning Management Platforms", description: "Digital platforms that support course content, assignments, assessments, and learning progress tracking." },
      { title: "Admission & Fee Management", description: "Tools for managing applications, admissions workflows, fee collection, receipts, and payment status visibility." },
      { title: "Academic Workflow Automation", description: "Automated processes for approvals, notifications, scheduling, document handling, and routine administrative tasks." },
      { title: "Education Analytics & Reporting", description: "Dashboards and reports that help institutions monitor attendance, performance trends, operations, and planning data." },
    ],
    valueIntro: "Well-designed education technology can help institutions reduce administrative effort and improve access to accurate information. These are potential benefits, not guaranteed outcomes.",
    value: ["Reduced administrative workload", "Better student and academic visibility", "More organized admissions and fee processes", "Improved coordination across teams", "Clearer reporting for planning"],
    faqs: [
      { question: "Can you build custom software for our school or institution?", answer: "Yes. We can develop custom education software based on your institution's processes, user roles, and project scope, including administrative and academic workflows." },
      { question: "Can the system integrate with our existing tools or platforms?", answer: "Yes, where technically feasible. We assess your current systems, data formats, and integration requirements before recommending the right approach." },
      { question: "How do you handle student data protection?", answer: "We follow security-conscious design practices such as role-based access, controlled data handling, and audit visibility where appropriate. Data protection requirements are addressed based on project scope and applicable obligations." },
      { question: "Can the platform be customized for different departments or campuses?", answer: "Yes. We can design systems with role-based access and configurable workflows to support different departments, programs, or campus structures." },
      { question: "Do you provide ongoing support after launch?", answer: "Yes. We can provide maintenance and technical support based on the agreed support scope after deployment." },
    ],
    enquiryHeading: "Let's Build Your Education Technology Solution.",
  },
  retail: {
    name: "Retail",
    image: "/images/industries/retail.webp",
    imageAlt: "Modern retail store environment with digital commerce technology",
    introHeading: "Connected Technology for Modern Retail Operations",
    intro: [
      "Retail businesses need to manage products, inventory, orders, payments, and customer experiences across online and in-store channels. When systems do not work together, teams face stock mismatches, delayed orders, and limited visibility into sales performance.",
      "YESBE Technologies helps retailers build practical digital systems that support daily operations and growth. From e-commerce platforms and POS integrations to inventory management and retail analytics, we create solutions that fit your business workflows and project goals.",
    ],
    capabilities: [
      { title: "E-commerce Development", description: "Custom online stores and commerce experiences designed for product discovery, checkout, and customer management." },
      { title: "Inventory Management", description: "Systems for tracking stock levels, product movement, low-stock alerts, and inventory updates across channels." },
      { title: "Point-of-Sale Integrations", description: "Integration approaches that connect POS systems with online stores, inventory, and reporting tools where feasible." },
      { title: "Order Management", description: "Tools for managing orders, fulfillment status, returns, and customer communication in one organized workflow." },
      { title: "Customer Management Systems", description: "CRM and customer data tools that help teams manage profiles, purchase history, and service interactions." },
      { title: "Retail Analytics & Automation", description: "Dashboards and automated workflows for sales reporting, operational tracking, and routine retail processes." },
    ],
    valueIntro: "The right retail technology can improve operational visibility and reduce manual work across sales channels. These are potential benefits, not guaranteed outcomes.",
    value: ["Better inventory visibility", "Smoother order processing", "Reduced manual updates", "Improved customer experience", "Clearer sales and operations reporting"],
    faqs: [
      { question: "Can you build an online store for our retail business?", answer: "Yes. We can design and develop e-commerce websites tailored to your products, operations, and customer experience requirements." },
      { question: "Can you synchronize inventory across online and offline sales?", answer: "Yes, where technically feasible. We review your POS, e-commerce platform, and inventory workflows to design an appropriate synchronization approach." },
      { question: "Can you integrate payment gateways into our system?", answer: "Yes. We can integrate suitable payment gateways based on your business requirements, supported regions, and technical setup." },
      { question: "Can you work with our existing retail systems?", answer: "Yes, where feasible. We assess your current systems, data structure, and integration options before proposing a solution." },
      { question: "Can the system scale as our product range and orders grow?", answer: "Yes. We design retail systems with scalable architecture and practical growth considerations based on your expected usage and business plans." },
    ],
    enquiryHeading: "Let's Transform Your Retail Operations.",
  },
  manufacturing: {
    name: "Manufacturing",
    image: "/images/industries/manufacturing.webp",
    imageAlt: "Modern manufacturing facility with production technology and systems",
    introHeading: "Digital Systems for Efficient Manufacturing Operations",
    intro: [
      "Manufacturing businesses manage production schedules, materials, inventory, procurement, quality checks, and reporting across multiple teams. When information is spread across spreadsheets, legacy systems, or manual processes, it becomes difficult to maintain visibility and respond quickly to issues.",
      "YESBE Technologies helps manufacturers build practical digital systems that support production and operational workflows. From ERP integrations and inventory tracking to quality management and reporting dashboards, we design solutions around your plant processes and business requirements.",
    ],
    capabilities: [
      { title: "Production Management", description: "Systems for planning, tracking, and coordinating production activities, schedules, and work orders." },
      { title: "Inventory & Material Tracking", description: "Tools for monitoring raw materials, stock movement, consumption, and availability across locations." },
      { title: "ERP Integration", description: "Integration approaches that connect manufacturing workflows with ERP systems and business data where feasible." },
      { title: "Procurement Workflows", description: "Digital workflows for purchase requests, approvals, vendor coordination, and procurement tracking." },
      { title: "Quality Management", description: "Systems for recording quality checks, issues, corrective actions, and process documentation." },
      { title: "Manufacturing Dashboards & Automation", description: "Reporting dashboards and workflow automation to improve operational visibility and reduce manual tasks." },
    ],
    valueIntro: "Practical manufacturing technology can help teams improve visibility, coordination, and decision-making. These are potential benefits, not guaranteed outcomes.",
    value: ["Better production visibility", "Improved inventory control", "Reduced manual coordination", "Faster access to operational reports", "More organized procurement and quality workflows"],
    faqs: [
      { question: "Can you support our existing production workflows?", answer: "Yes. We start by understanding your current production process and design systems that fit your operational requirements and constraints." },
      { question: "Can you integrate with our legacy ERP system?", answer: "Yes, where technically feasible. We evaluate your existing ERP, data structure, and integration options before proposing a safe and practical approach." },
      { question: "Can you build dashboards for manufacturing reporting?", answer: "Yes. We can create dashboards for production, inventory, procurement, quality, and other operational metrics based on available data sources." },
      { question: "Can you help track inventory and materials across stages?", answer: "Yes. We can build or integrate systems to track material movement, stock levels, and usage across production and storage workflows." },
      { question: "Can implementation be done in phases?", answer: "Yes. We can plan phased implementation to prioritize critical workflows and reduce disruption to ongoing operations." },
    ],
    enquiryHeading: "Let's Modernize Your Manufacturing Systems.",
  },
  logistics: {
    name: "Logistics",
    image: "/images/industries/logistics.webp",
    imageAlt: "Logistics and warehouse operations with connected digital systems",
    introHeading: "Connected Systems for Smarter Logistics Operations",
    intro: [
      "Logistics businesses coordinate shipments, warehouses, fleet movement, billing, and customer updates across multiple teams and systems. When data is disconnected, delays, manual tracking, and communication gaps can affect service quality and operational efficiency.",
      "YESBE Technologies helps logistics companies build digital systems that improve visibility and coordination. From shipment tracking and warehouse workflows to dispatch operations and analytics, we create solutions that support your operational processes and project requirements.",
    ],
    capabilities: [
      { title: "Shipment & Delivery Tracking", description: "Systems for tracking shipment status, delivery milestones, exceptions, and customer-facing updates." },
      { title: "Warehouse Management", description: "Tools for managing inventory locations, stock movement, receiving, dispatch, and warehouse workflows." },
      { title: "Fleet & Dispatch Operations", description: "Digital systems for planning dispatches, assigning vehicles, monitoring routes, and coordinating deliveries." },
      { title: "Supply Chain Visibility", description: "Connected views of orders, shipments, inventory, and operational status across the supply chain." },
      { title: "Order & Billing Integrations", description: "Integration approaches that connect logistics operations with order, invoicing, and accounting systems where feasible." },
      { title: "Logistics Analytics", description: "Dashboards and reports for delivery performance, delays, utilization, and operational planning." },
    ],
    valueIntro: "Effective logistics technology can improve visibility and coordination across operations. These are potential benefits, not guaranteed outcomes.",
    value: ["Better shipment visibility", "Improved warehouse coordination", "Reduced manual status updates", "Faster response to delays and exceptions", "Clearer operational reporting"],
    faqs: [
      { question: "Can you build a shipment tracking system for our operations?", answer: "Yes. We can develop tracking systems tailored to your shipment workflow, status updates, and customer communication needs." },
      { question: "Can you integrate with our existing warehouse systems?", answer: "Yes, where technically feasible. We review your current warehouse tools, data flows, and integration requirements before recommending an approach." },
      { question: "Can dispatch and delivery workflows be automated?", answer: "Yes. We can automate parts of dispatch planning, status updates, notifications, and routine operational workflows based on your process." },
      { question: "Can we improve shipment visibility for customers and internal teams?", answer: "Yes. We can design systems that provide role-based visibility into shipment status, milestones, and exceptions for both teams and customers." },
      { question: "Can you synchronize data across orders, billing, and logistics systems?", answer: "Yes, where feasible. We assess your existing systems and data structure to implement reliable synchronization and reporting workflows." },
    ],
    enquiryHeading: "Let's Connect Your Logistics Operations.",
  },
  finance: {
    name: "Finance",
    image: "/images/industries/finance.webp",
    imageAlt: "Finance professionals working with secure digital reporting systems",
    introHeading: "Secure and Efficient Technology for Financial Operations",
    intro: [
      "Finance teams handle sensitive data, approvals, transactions, reconciliations, and reporting across multiple systems. When workflows are manual or disconnected, it can slow operations, increase errors, and make it harder to maintain clear visibility and control.",
      "YESBE Technologies helps financial and finance-led organizations build practical digital systems that support secure operations. From workflow automation and reporting dashboards to integrations and access controls, we design solutions around your business processes and project requirements.",
    ],
    capabilities: [
      { title: "Financial Workflow Automation", description: "Automated workflows for approvals, document handling, routine checks, and operational finance processes." },
      { title: "Transaction & Reconciliation Systems", description: "Tools for tracking transactions, matching records, identifying exceptions, and supporting reconciliation workflows." },
      { title: "Secure Data Management", description: "Structured systems for managing sensitive financial data with controlled access and secure handling practices." },
      { title: "Financial Dashboards", description: "Reporting dashboards that provide visibility into key metrics, operational status, and financial performance indicators." },
      { title: "Reporting & Audit Trails", description: "Systems that support reporting, activity logs, and traceable records for internal review and operational accountability." },
      { title: "Business Application Integrations", description: "Integration approaches that connect financial tools with CRM, ERP, banking, or operational systems where feasible." },
    ],
    valueIntro: "The right financial technology can improve operational control, visibility, and efficiency. These are potential benefits, not guaranteed outcomes.",
    value: ["Improved operational visibility", "Reduced manual reconciliation effort", "More consistent approval workflows", "Better access to reporting data", "Stronger control over sensitive information"],
    faqs: [
      { question: "How do you handle data security in financial systems?", answer: "We apply security-conscious design practices such as role-based access, audit logs, secure data handling, and controlled integrations where appropriate. Security measures are defined based on project scope and requirements." },
      { question: "Can you integrate with our existing financial software?", answer: "Yes, where technically feasible. We review your current systems, APIs, data structure, and business workflows before proposing an integration approach." },
      { question: "Can you implement access control for different user roles?", answer: "Yes. We can design role-based access controls so users only see and manage information relevant to their responsibilities." },
      { question: "Can you build reconciliation and reporting workflows?", answer: "Yes. We can develop systems that support transaction tracking, reconciliation processes, exception handling, and reporting dashboards." },
      { question: "Can you help with regulatory or compliance-related requirements?", answer: "We can design systems to support relevant operational controls, reporting, and data handling requirements based on project scope. Any regulatory or compliance obligations should be reviewed against your specific business and legal requirements." },
    ],
    enquiryHeading: "Let's Build Smarter Financial Systems.",
  },
  hospitality: {
    name: "Hospitality",
    image: "/images/industries/hospitality.webp",
    imageAlt: "Modern hospitality environment with digital guest service technology",
    introHeading: "Digital Solutions for Better Hospitality Experiences",
    intro: [
      "Hotels, resorts, and hospitality businesses manage reservations, guest communication, billing, staff coordination, and daily operations across multiple touchpoints. When systems are disconnected, teams spend more time on manual work and less time delivering a smooth guest experience.",
      "YESBE Technologies helps hospitality businesses build practical digital systems that support operations and service delivery. From booking workflows and guest management to billing integrations and operational reporting, we design solutions around your property and business requirements.",
    ],
    capabilities: [
      { title: "Hotel & Hospitality Management Systems", description: "Custom systems for managing property operations, staff workflows, service requests, and daily administrative tasks." },
      { title: "Reservation & Booking Workflows", description: "Digital tools for handling reservations, availability, confirmations, cancellations, and booking-related communication." },
      { title: "Guest Relationship Management", description: "Systems for managing guest profiles, preferences, communication history, and service interactions." },
      { title: "Billing & Payment Integration", description: "Integration approaches for invoices, payments, charges, and billing records across hospitality workflows where feasible." },
      { title: "Staff & Operational Management", description: "Tools for coordinating housekeeping, maintenance, front desk tasks, and internal operational updates." },
      { title: "Hospitality Analytics", description: "Dashboards and reports for occupancy, bookings, operations, and service performance visibility." },
    ],
    valueIntro: "The right hospitality technology can help teams improve coordination and service efficiency. These are potential benefits, not guaranteed outcomes.",
    value: ["Smoother booking and guest workflows", "Reduced manual operational tasks", "Better visibility across departments", "Improved billing coordination", "Clearer reporting for management decisions"],
    faqs: [
      { question: "Can you build a custom booking system for our property?", answer: "Yes. We can develop booking and reservation workflows tailored to your property type, operational process, and customer experience needs." },
      { question: "Can you integrate with our existing property management system?", answer: "Yes, where technically feasible. We assess your current PMS, data flows, and integration options before recommending the right approach." },
      { question: "Can you help manage guest information securely?", answer: "Yes. We use security-conscious design practices such as role-based access and controlled data handling where appropriate, based on project requirements." },
      { question: "Can billing and payment systems be integrated?", answer: "Yes. We can integrate billing and payment workflows with your hospitality systems where supported by the selected platforms and technical requirements." },
      { question: "Can you automate operational tasks for staff?", answer: "Yes. We can automate routine tasks such as notifications, task assignments, status updates, and reporting workflows to reduce manual effort." },
    ],
    enquiryHeading: "Let's Improve Your Hospitality Operations.",
  },
  "professional-services": {
    name: "Professional Services",
    image: "/images/visuals/transformation.webp",
    imageAlt: "Professional services team collaborating with digital business systems",
    introHeading: "Digital Systems for Efficient Professional Services",
    intro: [
      "Professional services firms manage clients, projects, documents, approvals, billing, and team coordination every day. When these workflows are spread across emails, spreadsheets, and disconnected tools, it becomes harder to track progress and deliver work consistently.",
      "YESBE Technologies helps consultancies, agencies, and service firms build practical digital systems that support client delivery and internal operations. From CRM and project management tools to billing workflows and reporting, we design solutions around how your team works.",
    ],
    capabilities: [
      { title: "Client & Project Management", description: "Centralized systems for managing clients, engagements, project milestones, tasks, and delivery responsibilities." },
      { title: "CRM Systems", description: "Tools for tracking leads, proposals, follow-ups, client communication, and relationship history." },
      { title: "Document & Approval Workflows", description: "Structured workflows for proposals, contracts, reviews, approvals, and document version tracking." },
      { title: "Billing & Invoicing", description: "Systems that support time tracking, invoicing, payment status, and financial visibility for service work." },
      { title: "Resource & Task Management", description: "Tools for assigning work, tracking team capacity, deadlines, and project workload." },
      { title: "Reporting & Business Automation", description: "Dashboards and automation for operational reporting, status updates, and routine administrative processes." },
    ],
    valueIntro: "Well-designed systems can help professional services teams improve visibility and reduce administrative effort. These are potential benefits, not guaranteed outcomes.",
    value: ["Clearer project and client visibility", "Reduced manual administrative work", "More consistent approval processes", "Improved billing and operational tracking", "Better coordination across teams"],
    faqs: [
      { question: "Can you integrate with our existing CRM or accounting tools?", answer: "Yes, where technically feasible. We review your current tools, data flows, and integration options before recommending an approach." },
      { question: "Can you build custom project workflows for our service team?", answer: "Yes. We can design project and task workflows based on your delivery process, team structure, and reporting needs." },
      { question: "Can you create a document management or approval system?", answer: "Yes. We can build systems for document storage, review, approval workflows, and access control based on your requirements." },
      { question: "Can you build a client portal for project updates and communication?", answer: "Yes. We can develop secure client portals for sharing updates, documents, approvals, and communication where appropriate." },
      { question: "Can the software be customized as our firm grows?", answer: "Yes. We design systems with practical scalability in mind so features, users, and workflows can be expanded as your business evolves." },
    ],
    enquiryHeading: "Let's Simplify Your Business Operations.",
  },
  startups: {
    name: "Startups",
    image: "/images/industries/startups.webp",
    imageAlt: "Startup team collaborating in a modern workspace",
    introHeading: "Technology Foundations for Fast-Moving Startups",
    intro: [
      "Startups need to move quickly while making smart technical decisions. Early choices around product architecture, workflows, and integrations can affect speed, cost, and the ability to adapt as the business grows.",
      "YESBE Technologies helps startups build practical digital products and systems, from MVPs and web applications to automation and analytics. We focus on clear scope, usable releases, and technology that can evolve with your product and team.",
    ],
    capabilities: [
      { title: "MVP & Product Development", description: "Focused product builds that help validate ideas, launch core features, and gather real user feedback." },
      { title: "Web & Mobile Applications", description: "Custom applications designed for usability, performance, and future product growth." },
      { title: "Scalable Architecture Planning", description: "Technical foundations that support early delivery while keeping future expansion in mind." },
      { title: "Business Workflow Automation", description: "Automation for onboarding, operations, notifications, and repetitive internal processes." },
      { title: "Data & Product Analytics", description: "Tracking and dashboards to help teams understand usage, operations, and key product metrics." },
      { title: "Integrations & APIs", description: "Connections with payment, CRM, communication, and third-party tools where technically feasible." },
    ],
    valueIntro: "The right technology approach can help startups move faster and make better product decisions. These are potential benefits, not guaranteed outcomes.",
    value: ["Faster path to a usable release", "Clearer product and technical scope", "Reduced manual operational work", "Better visibility into product usage", "A foundation that can evolve over time"],
    faqs: [
      { question: "Can you help us build an MVP?", answer: "Yes. We can help define a practical MVP scope, prioritize core features, and build a usable first release based on your goals." },
      { question: "Can you work with our existing product or codebase?", answer: "Yes, where technically feasible. We can review your current codebase, architecture, and documentation before recommending next steps." },
      { question: "Can the product scale as our startup grows?", answer: "Yes. We design systems with practical scalability considerations, though the right approach depends on your product, usage, and growth plans." },
      { question: "Can you integrate third-party tools and APIs?", answer: "Yes. We can integrate common third-party services such as payments, analytics, CRM, and communication tools where supported." },
      { question: "Do you provide support after launch?", answer: "Yes. We can provide ongoing maintenance, improvements, and technical support based on the agreed scope." },
    ],
    enquiryHeading: "Let's Build Your Startup Technology Solution.",
  },
  smes: {
    name: "SMEs",
    image: "/images/industries/smes.webp",
    imageAlt: "Small and medium business team working with digital systems",
    introHeading: "Practical Technology for Growing SMEs",
    intro: [
      "Small and medium-sized businesses often reach a point where spreadsheets, manual processes, and disconnected tools start slowing growth. Teams need systems that improve efficiency without adding unnecessary complexity.",
      "YESBE Technologies helps SMEs build practical digital solutions for operations, sales, reporting, and customer management. We focus on systems that fit your current workflows and can expand as your business needs evolve.",
    ],
    capabilities: [
      { title: "Business Management Systems", description: "Custom systems for managing daily operations, records, approvals, and internal workflows." },
      { title: "CRM & Customer Workflows", description: "Tools for managing leads, customers, communication, and follow-up processes." },
      { title: "ERP & Process Automation", description: "Solutions for connecting business processes and reducing repetitive manual work." },
      { title: "Websites & Web Applications", description: "Professional digital platforms for customer-facing services, enquiries, and internal operations." },
      { title: "Reporting & Dashboards", description: "Visibility into sales, operations, and performance through clear reporting dashboards." },
      { title: "System Integrations", description: "Connections between existing business tools, data sources, and new digital systems where feasible." },
    ],
    valueIntro: "The right digital systems can help SMEs improve efficiency and visibility. These are potential benefits, not guaranteed outcomes.",
    value: ["Reduced manual work", "Better operational visibility", "More organized customer processes", "Improved reporting and decision support", "Systems that can grow with the business"],
    faqs: [
      { question: "Can you work with the tools we already use?", answer: "Yes, where technically feasible. We review your existing tools and workflows before recommending integrations or improvements." },
      { question: "Do we need a large system to get started?", answer: "No. We can start with a focused scope that addresses your most important operational needs and expand later if needed." },
      { question: "Can you automate our manual business processes?", answer: "Yes. We can identify repetitive workflows and design automation based on your process, systems, and project scope." },
      { question: "Will the system be easy for our team to use?", answer: "We design systems with practical usability in mind and can provide training and documentation based on the project scope." },
      { question: "Do you provide ongoing support?", answer: "Yes. We can provide maintenance and technical support after launch based on the agreed support arrangement." },
    ],
    enquiryHeading: "Let's Build Your SME Technology Solution.",
  },
  "large-enterprises": {
    name: "Large Enterprises",
    image: "/images/industries/large-enterprises.webp",
    imageAlt: "Enterprise business environment with modern technology systems",
    introHeading: "Scalable Technology for Enterprise Operations",
    intro: [
      "Large enterprises manage complex processes, multiple teams, legacy systems, and high volumes of operational data. Technology initiatives need to improve efficiency and visibility while fitting into existing governance, security, and integration requirements.",
      "YESBE Technologies helps enterprises build and modernize digital systems that support operations, reporting, and workflow coordination. We focus on practical solutions, careful integration, and clear delivery scope based on your business needs.",
    ],
    capabilities: [
      { title: "Enterprise Application Development", description: "Custom applications for internal operations, workflows, and business process management." },
      { title: "System Integration", description: "Integration approaches that connect enterprise systems, data sources, and services where technically feasible." },
      { title: "Workflow Automation", description: "Automation for approvals, reporting, handoffs, and routine operational processes." },
      { title: "Data Analytics & Dashboards", description: "Reporting systems that provide visibility across departments, processes, and performance metrics." },
      { title: "Legacy Modernization", description: "Phased modernization of older systems to improve usability, maintainability, and integration capability." },
      { title: "Secure Access & Governance", description: "Role-based access, audit visibility, and structured controls aligned with project requirements." },
    ],
    valueIntro: "Enterprise technology can improve coordination, visibility, and operational efficiency when implemented carefully. These are potential benefits, not guaranteed outcomes.",
    value: ["Better cross-team visibility", "Reduced manual process overhead", "Improved reporting access", "More consistent workflows", "Practical integration with existing systems"],
    faqs: [
      { question: "Can you work with our existing enterprise systems?", answer: "Yes, where technically feasible. We assess current systems, integration points, and constraints before proposing a solution." },
      { question: "Can you support phased implementation?", answer: "Yes. Phased delivery can help manage risk, prioritize critical workflows, and reduce disruption to operations." },
      { question: "How do you handle security and access control?", answer: "We apply security-conscious design practices including role-based access, audit visibility, and controlled data handling where appropriate. Requirements are addressed based on project scope." },
      { question: "Can you modernize legacy systems?", answer: "Yes. We can evaluate legacy systems and recommend phased modernization or integration approaches based on business priorities." },
      { question: "Do you provide ongoing support and maintenance?", answer: "Yes. We can provide post-launch support and maintenance based on the agreed service scope." },
    ],
    enquiryHeading: "Let's Build Your Enterprise Technology Solution.",
  },
  "real-estate": {
    name: "Real Estate",
    image: "/images/industries/real-estate.webp",
    imageAlt: "Modern real estate property and digital management technology",
    introHeading: "Digital Systems for Modern Real Estate Operations",
    intro: [
      "Real estate businesses manage listings, enquiries, site visits, documents, client communication, and transactions across multiple channels. When information is fragmented, teams can lose track of leads, delays can increase, and customer experience can suffer.",
      "YESBE Technologies helps real estate businesses build practical digital systems for listings, CRM workflows, property management, and reporting. We design solutions around your operational process and the way your team manages properties and clients.",
    ],
    capabilities: [
      { title: "Property Listing Platforms", description: "Custom listing websites and portals for showcasing properties, availability, and enquiry capture." },
      { title: "Real Estate CRM", description: "Systems for managing leads, client communication, follow-ups, and deal progress." },
      { title: "Booking & Site Visit Workflows", description: "Tools for scheduling property visits, managing availability, and coordinating follow-up actions." },
      { title: "Document & Transaction Workflows", description: "Structured workflows for managing property documents, approvals, and transaction-related records." },
      { title: "Property Management Systems", description: "Systems for handling tenant records, maintenance requests, payments, and property operations." },
      { title: "Analytics & Reporting", description: "Dashboards for enquiries, listings, sales activity, occupancy, and operational performance." },
    ],
    valueIntro: "Practical real estate technology can improve visibility and response times across property operations. These are potential benefits, not guaranteed outcomes.",
    value: ["Better lead and enquiry tracking", "Improved listing and property visibility", "Reduced manual follow-up work", "More organized document workflows", "Clearer reporting for business decisions"],
    faqs: [
      { question: "Can you build a custom property listing website?", answer: "Yes. We can build listing platforms tailored to your property types, search needs, and enquiry workflows." },
      { question: "Can you integrate a CRM for lead management?", answer: "Yes. We can implement or integrate CRM workflows to track enquiries, follow-ups, and client communication." },
      { question: "Can you build property management features?", answer: "Yes. We can develop systems for tenant records, maintenance requests, payments, and operational tracking based on your requirements." },
      { question: "Can you integrate with existing tools or portals?", answer: "Yes, where technically feasible. We review your existing systems and integration options before proposing an approach." },
      { question: "Do you provide support after launch?", answer: "Yes. We can provide ongoing maintenance and technical support based on the agreed scope." },
    ],
    enquiryHeading: "Let's Build Your Real Estate Technology Solution.",
  },
};

function DetailPageLayout({ content, route }: { content: DetailContent; route: string }) {
  return (
    <>
      <section className="bg-white pt-[76px]">
        <div className="container-page py-10 sm:py-12 lg:py-14">
          <h1 className="max-w-5xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#11124D]">
            {content.name}
          </h1>
        </div>
      </section>

      <section className="bg-white pb-14 sm:pb-16 lg:pb-20">
        <div className="container-page">
          <div className="overflow-hidden rounded-[20px] bg-[#F7F9FC]">
            <img
              src={content.image}
              alt={content.imageAlt}
              width={1600}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[520px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-14 sm:py-16 lg:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#155DFC]">Industry overview</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#101828]">{content.introHeading}</h2>
              <div className="mt-6 space-y-5 text-[15px] leading-8 text-[#273244] sm:text-[16px]">
                {content.intro.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <h3 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#11124D] sm:text-[2rem]">{content.capabilitiesHeading ?? "Relevant technology solutions"}</h3>
                <div className="mt-6 divide-y divide-[#DCE5F2] border-y border-[#DCE5F2]">
                  {content.capabilities.map((item) => (
                    <div key={item.title} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-6 sm:py-6">
                      <h4 className="text-[15px] font-semibold leading-6 text-[#11124D] sm:text-[16px]">{item.title}</h4>
                      <p className="text-[14px] leading-7 text-[#273244] sm:text-[15px]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-[#DCE5F2] bg-white p-6 sm:p-8">
                <h3 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#11124D]">{content.valueHeading ?? "Business value"}</h3>
                <p className="mt-4 text-[14px] leading-7 text-[#273244] sm:text-[15px]">{content.valueIntro}</p>
                <ul className="mt-6 space-y-3">
                  {content.value.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] leading-6 text-[#273244] sm:text-[15px]">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#155DFC]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DetailFAQ items={content.faqs} />

      <DetailEnquiryCard
        kind="industry"
        name={content.name}
        slug={route.split("/").pop() || content.name.toLowerCase()}
        route={route}
        heading={content.enquiryHeading}
      />
    </>
  );
}

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;
  const content = slug ? CONTENT[slug] : undefined;

  useSEO({
    title: industry ? getIndustrySeoTitle(industry.slug, industry.title) : SEO_TITLES.industryNotFound,
    description: industry ? getIndustrySeoDescription(industry.slug, industry.title) : SEO_DESCRIPTIONS.industryNotFound,
    canonical: industry ? `https://www.yesbe.tech/industries/${industry.slug}` : "https://www.yesbe.tech/industries",
  });

  if (!industry) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6 pt-24">
        <div className="max-w-md text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-ink">Industry not found</h1>
          <p className="mt-3 text-sm leading-6 text-body">
            The industry page you are looking for does not exist or has moved.
          </p>
          <Link to="/industries" className="btn-primary mt-7 inline-flex">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to industries
          </Link>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6 pt-24">
        <div className="max-w-md text-center">
          <p className="eyebrow justify-center">Industry</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-ink">{industry.title}</h1>
          <p className="mt-3 text-sm leading-6 text-body">This page is being updated.</p>
          <Link to="/industries" className="btn-primary mt-7 inline-flex">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to industries
          </Link>
        </div>
      </div>
    );
  }

  const route = `/industries/${industry.slug}`;

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${content.name} — YESBE Technologies`,
          description: getIndustrySeoDescription(industry.slug, industry.title),
          url: `https://www.yesbe.tech${route}`,
          publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" },
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <DetailPageLayout content={content} route={route} />
    </>
  );
}
