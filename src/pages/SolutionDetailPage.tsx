import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import {
  getSolutionSeoDescription,
  getSolutionSeoTitle,
  SEO_DESCRIPTIONS,
  SEO_TITLES,
} from "@/constants/seoTitles";
import { getSolutionBySlug } from "@/data/solutions";
import { JsonLd } from "@/components/common/JsonLd";
import { DetailFAQ } from "@/components/common/DetailFAQ";
import { DetailEnquiryCard } from "@/components/common/DetailEnquiryCard";

interface ServiceContent {
  name: string;
  image: string;
  imageAlt: string;
  introHeading: string;
  intro: string[];
  capabilities: { title: string; description: string }[];
  valueIntro: string;
  value: string[];
  faqs: { question: string; answer: string }[];
  enquiryHeading: string;
}

const CONTENT: Record<string, ServiceContent> = {
  "blockchain": {
    "name": "Blockchain & Privacy",
    "image": "/images/visuals/integration.webp",
    "imageAlt": "Abstract digital network representing blockchain and privacy technology",
    "introHeading": "Practical Blockchain and Privacy Solutions for Business",
    "intro": [
      "Blockchain and privacy-focused systems can help organizations manage shared records, verification workflows, and sensitive data with greater transparency and control. The right approach depends on the use case, data requirements, and how the system fits with existing business processes.",
      "YESBE Technologies helps businesses evaluate and build blockchain and privacy solutions where they are genuinely useful. From tamper-evident records and secure information sharing to digital identity and smart contract applications, we focus on practical implementation aligned with your project requirements."
    ],
    "capabilities": [
      {
        "title": "Blockchain Application Development",
        "description": "Custom blockchain applications designed around specific business workflows, users, and integration needs."
      },
      {
        "title": "Tamper-Evident Digital Records",
        "description": "Systems that create verifiable records for transactions, documents, or process events where traceability matters."
      },
      {
        "title": "Data Privacy Architecture",
        "description": "Design approaches that support controlled access, secure data handling, and privacy-conscious system architecture."
      },
      {
        "title": "Secure Information Sharing",
        "description": "Solutions for sharing information across parties with defined permissions, audit visibility, and controlled workflows."
      },
      {
        "title": "Digital Identity & Verification",
        "description": "Systems for identity verification, credential validation, and trusted access workflows based on project needs."
      },
      {
        "title": "Supply Chain Traceability",
        "description": "Blockchain-based tracking for supply chain events, asset movement, and record verification where appropriate."
      }
    ],
    "valueIntro": "Blockchain and privacy technology can provide value in the right context, but outcomes depend on the use case and implementation. These are potential benefits, not guaranteed results.",
    "value": [
      "Improved record traceability",
      "Clearer verification workflows",
      "Controlled information sharing",
      "Better audit visibility",
      "Privacy-conscious system design"
    ],
    "faqs": [
      {
        "question": "Does blockchain automatically make our data private?",
        "answer": "No. Blockchain does not automatically guarantee privacy. Privacy depends on system architecture, what data is stored on-chain or off-chain, access controls, and how the solution is implemented."
      },
      {
        "question": "What business problems can blockchain help solve?",
        "answer": "Blockchain can be useful for use cases that need shared records, verification, traceability, or controlled multi-party workflows. We evaluate whether blockchain is appropriate for your specific requirement."
      },
      {
        "question": "Can you integrate blockchain with our existing systems?",
        "answer": "Yes, where technically feasible. We assess your current systems, data flows, and security requirements before recommending an integration approach."
      },
      {
        "question": "Do you build smart contracts?",
        "answer": "Yes. We can develop smart contracts where they are relevant to the project, with careful attention to business logic, testing, and deployment requirements."
      },
      {
        "question": "Can blockchain help with regulatory compliance?",
        "answer": "Blockchain can support certain record-keeping or verification requirements, but it does not automatically guarantee regulatory compliance. Compliance depends on the full system design, processes, and applicable legal requirements."
      }
    ],
    "enquiryHeading": "Let's Discuss Your Blockchain & Privacy Requirements."
  },
  "it-consulting": {
    "name": "IT Consulting",
    "image": "/images/visuals/company.webp",
    "imageAlt": "Business consulting team reviewing technology strategy in a modern office",
    "introHeading": "Clear Technology Guidance for Confident Business Decisions",
    "intro": [
      "Technology decisions can affect cost, operations, security, and growth for years. Many businesses struggle with outdated systems, unclear vendor options, or digital initiatives that lack a practical roadmap.",
      "YESBE Technologies provides IT consulting that helps you evaluate your current systems, identify gaps, and plan the right next steps. We focus on practical recommendations, clear priorities, and solutions that fit your business goals, budget, and operational reality."
    ],
    "capabilities": [
      {
        "title": "Technology Assessment",
        "description": "Review of your current systems, workflows, and challenges to identify risks, gaps, and improvement opportunities."
      },
      {
        "title": "Digital Strategy & Roadmapping",
        "description": "Practical roadmaps that prioritize initiatives, timelines, and investments based on business impact."
      },
      {
        "title": "Architecture & Solution Planning",
        "description": "Guidance on system architecture, integrations, and technology choices for scalable and maintainable solutions."
      },
      {
        "title": "Vendor & Tool Evaluation",
        "description": "Objective support for comparing software, platforms, and vendors against your requirements."
      },
      {
        "title": "Process Improvement",
        "description": "Recommendations to streamline workflows, reduce manual effort, and improve operational efficiency."
      },
      {
        "title": "Implementation Advisory",
        "description": "Ongoing technical guidance during planning and delivery to help keep projects aligned with scope and goals."
      }
    ],
    "valueIntro": "Effective IT consulting can help businesses make informed decisions and avoid costly missteps. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Clearer technology priorities",
      "Better alignment between IT and business goals",
      "Reduced implementation risk",
      "More informed vendor decisions",
      "Practical roadmap for improvement"
    ],
    "faqs": [
      {
        "question": "What does an IT consulting engagement typically include?",
        "answer": "It can include discovery, current-state assessment, recommendations, roadmap planning, and implementation advisory. The scope depends on your business needs and project goals."
      },
      {
        "question": "Can you help us choose the right software or technology stack?",
        "answer": "Yes. We evaluate options based on your requirements, budget, existing systems, team capabilities, and long-term plans."
      },
      {
        "question": "Do you work with our existing IT team or vendors?",
        "answer": "Yes. We can collaborate with internal teams and external vendors to provide guidance, clarify requirements, and support decision-making."
      },
      {
        "question": "Is IT consulting only for large companies?",
        "answer": "No. Startups, SMEs, and enterprises can all benefit from practical technology guidance, especially when planning new systems or major changes."
      },
      {
        "question": "Can you also implement the recommended solutions?",
        "answer": "Yes. If needed, YESBE can support implementation through our development, integration, and digital transformation services based on the agreed scope."
      }
    ],
    "enquiryHeading": "Let's Discuss Your IT Consulting Requirements."
  },
  "digital-transformation": {
    "name": "Digital Transformation",
    "image": "/images/visuals/transformation.webp",
    "imageAlt": "Team planning digital transformation strategy with modern technology",
    "introHeading": "Transform Business Operations with Practical Digital Change",
    "intro": [
      "Digital transformation is not just about adopting new tools. It involves improving processes, connecting systems, and helping teams work more effectively with the right technology.",
      "YESBE Technologies helps businesses plan and implement digital transformation initiatives that are practical and measurable. We focus on modernizing workflows, improving data visibility, and introducing systems that support long-term operational improvement."
    ],
    "capabilities": [
      {
        "title": "Transformation Strategy",
        "description": "Assess current operations and define a realistic digital roadmap aligned with business priorities."
      },
      {
        "title": "Process Digitization",
        "description": "Replace manual or fragmented workflows with digital systems that improve consistency and visibility."
      },
      {
        "title": "Legacy System Modernization",
        "description": "Upgrade or integrate older systems to improve usability, performance, and maintainability where feasible."
      },
      {
        "title": "Cloud & Platform Adoption",
        "description": "Plan and implement cloud or platform changes that support scalability, access, and collaboration."
      },
      {
        "title": "Data & Reporting Enablement",
        "description": "Improve how data is captured, connected, and reported for better operational decision-making."
      },
      {
        "title": "Change & Implementation Support",
        "description": "Guidance through phased implementation to reduce disruption and support user adoption."
      }
    ],
    "valueIntro": "Digital transformation can improve efficiency and visibility when planned around real business needs. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Improved operational efficiency",
      "Better data visibility",
      "Reduced manual processes",
      "More connected systems",
      "A practical foundation for future growth"
    ],
    "faqs": [
      {
        "question": "What does digital transformation mean for my business?",
        "answer": "It means using technology to improve how your business operates, serves customers, and makes decisions. The right approach depends on your current processes, systems, and goals."
      },
      {
        "question": "Do we need to replace all our existing systems?",
        "answer": "Not necessarily. Many transformation projects involve integrating, modernizing, or phasing changes to existing systems rather than replacing everything at once."
      },
      {
        "question": "How long does a digital transformation project take?",
        "answer": "Timelines vary based on scope and complexity. We often recommend phased implementation so you can prioritize high-impact areas and manage change effectively."
      },
      {
        "question": "How do you manage disruption during transformation?",
        "answer": "We plan work in phases, define clear priorities, and coordinate implementation around your operations to reduce unnecessary disruption."
      },
      {
        "question": "Can you help after the initial implementation?",
        "answer": "Yes. We can provide ongoing support, optimization, and further improvements based on the agreed post-launch scope."
      }
    ],
    "enquiryHeading": "Let's Plan Your Digital Transformation."
  },
  "ai-solutions": {
    "name": "AI Solutions",
    "image": "/images/visuals/intelligence.webp",
    "imageAlt": "Abstract AI technology visual representing intelligent business solutions",
    "introHeading": "Intelligent AI Solutions for Real Business Challenges",
    "intro": [
      "Businesses are exploring AI to automate tasks, analyze data, and improve decision-making. The challenge is identifying where AI can provide practical value without adding unnecessary complexity.",
      "YESBE Technologies designs and builds AI solutions tailored to your workflows and data. From predictive insights and intelligent automation to custom AI-powered applications, we focus on responsible, business-relevant implementation."
    ],
    "capabilities": [
      {
        "title": "AI Strategy & Use-Case Assessment",
        "description": "Identify practical AI opportunities based on your goals, data, and operational processes."
      },
      {
        "title": "Machine Learning Solutions",
        "description": "Custom models for classification, prediction, and pattern detection where suitable data and use cases exist."
      },
      {
        "title": "Intelligent Process Automation",
        "description": "AI-assisted workflows that reduce repetitive manual work and improve process efficiency."
      },
      {
        "title": "Natural Language Solutions",
        "description": "Text and language-based systems for search, summarization, extraction, or support workflows."
      },
      {
        "title": "AI Integration",
        "description": "Integrate AI capabilities into existing applications, dashboards, or business systems where feasible."
      },
      {
        "title": "Monitoring & Optimization",
        "description": "Post-launch monitoring and improvement based on performance, feedback, and business needs."
      }
    ],
    "valueIntro": "AI solutions can create value when applied to the right problem with the right data. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Faster access to insights",
      "Reduced repetitive manual work",
      "Improved decision support",
      "Smarter customer or internal workflows",
      "Scalable intelligent capabilities"
    ],
    "faqs": [
      {
        "question": "What business problems can AI solve?",
        "answer": "AI can help with tasks like prediction, classification, document processing, search, and workflow automation. We assess your use case to confirm whether AI is the right approach."
      },
      {
        "question": "Do we need large amounts of data to start?",
        "answer": "It depends on the use case. Some solutions require historical data, while others can start with existing documents, APIs, or third-party models."
      },
      {
        "question": "Can AI be integrated into our existing software?",
        "answer": "Yes, where technically feasible. We can integrate AI features into web apps, internal tools, CRMs, ERPs, or other systems."
      },
      {
        "question": "How do you address AI accuracy and reliability?",
        "answer": "We use appropriate validation, testing, human review where needed, and monitoring after launch. AI outputs should be evaluated in context and not treated as guaranteed."
      },
      {
        "question": "Do you provide support after deployment?",
        "answer": "Yes. We can provide ongoing monitoring, maintenance, and improvements based on the agreed support scope."
      }
    ],
    "enquiryHeading": "Let's Build Your AI Solution."
  },
  "ai-chatbots": {
    "name": "AI Chatbots",
    "image": "/images/visuals/intelligence.webp",
    "imageAlt": "AI chatbot interface concept representing conversational automation",
    "introHeading": "Conversational AI Chatbots for Support and Engagement",
    "intro": [
      "Customers and teams expect quick answers, but support staff cannot be available everywhere at once. Repetitive questions can slow response times and increase operational workload.",
      "YESBE Technologies builds AI chatbots that help businesses handle common enquiries, guide users, and support internal workflows. We design chatbots around your content, processes, and escalation paths so they provide useful responses and hand off to humans when needed."
    ],
    "capabilities": [
      {
        "title": "Customer Support Chatbots",
        "description": "Automated assistants for common customer questions, service requests, and guided support flows."
      },
      {
        "title": "Lead & Sales Assistants",
        "description": "Chatbots that capture enquiries, qualify leads, and route prospects to the right team."
      },
      {
        "title": "Internal Knowledge Assistants",
        "description": "Assistants that help teams find information from approved internal documents and knowledge sources."
      },
      {
        "title": "Multi-Channel Deployment",
        "description": "Deploy chatbots on websites, apps, or messaging channels based on your customer touchpoints."
      },
      {
        "title": "Human Handoff & Escalation",
        "description": "Clear escalation paths so complex or sensitive conversations reach the right person."
      },
      {
        "title": "Analytics & Improvement",
        "description": "Conversation insights to understand user needs and improve chatbot responses over time."
      }
    ],
    "valueIntro": "AI chatbots can improve responsiveness and reduce repetitive workload when designed with clear scope and escalation. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Faster responses to common enquiries",
      "Reduced repetitive support workload",
      "Better lead capture and routing",
      "24/7 availability for basic assistance",
      "Insights from conversation trends"
    ],
    "faqs": [
      {
        "question": "Can the chatbot answer questions based on our business content?",
        "answer": "Yes. We can design chatbots using your approved content, FAQs, documents, or knowledge base, with appropriate scope and review."
      },
      {
        "question": "What happens when the chatbot cannot answer a question?",
        "answer": "We design escalation flows so users can reach a human agent, submit an enquiry, or access alternative support channels."
      },
      {
        "question": "Can the chatbot integrate with our CRM or support tools?",
        "answer": "Yes, where technically feasible. We can integrate with CRM, helpdesk, or business systems based on your workflow needs."
      },
      {
        "question": "Will the chatbot support multiple languages?",
        "answer": "Multi-language support may be possible depending on the project requirements, content, and selected technology approach."
      },
      {
        "question": "How do you ensure the chatbot gives appropriate responses?",
        "answer": "We define scope, test responses, set guardrails, and include human escalation where needed. Ongoing review helps improve quality after launch."
      }
    ],
    "enquiryHeading": "Let's Build Your AI Chatbot."
  },
  "erp-systems": {
    "name": "ERP Systems",
    "image": "/images/visuals/enterprise.webp",
    "imageAlt": "Enterprise business systems dashboard in a modern office environment",
    "introHeading": "Integrated ERP Systems for Connected Business Operations",
    "intro": [
      "As businesses grow, managing finance, inventory, sales, procurement, and operations across disconnected tools becomes inefficient. Teams lose time reconciling data and lack a clear view of operations.",
      "YESBE Technologies designs and implements ERP systems that connect core business processes in one structured platform. We focus on practical modules, role-based access, and workflows that match how your organization actually operates."
    ],
    "capabilities": [
      {
        "title": "Custom ERP Development",
        "description": "ERP platforms tailored to your business processes, departments, and reporting requirements."
      },
      {
        "title": "Inventory & Procurement",
        "description": "Manage stock, suppliers, purchase orders, and material movement with better visibility."
      },
      {
        "title": "Finance & Billing Workflows",
        "description": "Support invoicing, expenses, approvals, and financial tracking within connected workflows."
      },
      {
        "title": "HR & Operations Modules",
        "description": "Manage employee records, roles, attendance, and operational processes where needed."
      },
      {
        "title": "Reporting & Dashboards",
        "description": "Real-time or scheduled reports for management visibility across key business functions."
      },
      {
        "title": "Integration & Migration",
        "description": "Connect ERP with existing tools and plan data migration where technically feasible."
      }
    ],
    "valueIntro": "A well-implemented ERP system can improve coordination and operational visibility. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Better visibility across departments",
      "Reduced duplicate data entry",
      "More consistent business processes",
      "Improved reporting and control",
      "Scalable operational foundation"
    ],
    "faqs": [
      {
        "question": "Can you build a custom ERP for our business?",
        "answer": "Yes. We can develop custom ERP modules based on your workflows, user roles, and reporting needs."
      },
      {
        "question": "Can you integrate ERP with our existing systems?",
        "answer": "Yes, where technically feasible. We assess your current systems, data structure, and integration requirements before proposing an approach."
      },
      {
        "question": "How long does ERP implementation take?",
        "answer": "Timelines depend on scope, modules, integrations, and data migration. We usually recommend phased implementation for complex requirements."
      },
      {
        "question": "Can we start with a few modules first?",
        "answer": "Yes. A phased approach can prioritize critical modules and expand over time as your needs evolve."
      },
      {
        "question": "Do you provide training and support?",
        "answer": "Yes. We can provide training, documentation, and ongoing support based on the agreed project and support scope."
      }
    ],
    "enquiryHeading": "Let's Build Your ERP System."
  },
  "website-development": {
    "name": "Website Development",
    "image": "/images/visuals/web.webp",
    "imageAlt": "Modern responsive website design displayed across devices",
    "introHeading": "Professional Website Development for Business Growth",
    "intro": [
      "Your website is often the first place customers learn about your business. A slow, outdated, or unclear website can reduce trust and make it harder for visitors to take action.",
      "YESBE Technologies designs and develops professional websites that are fast, responsive, and aligned with your business goals. We focus on clear messaging, strong user experience, SEO-ready structure, and maintainable code."
    ],
    "capabilities": [
      {
        "title": "Custom Website Design",
        "description": "Modern, brand-aligned designs that communicate your services clearly and professionally."
      },
      {
        "title": "Responsive Development",
        "description": "Websites that work smoothly across desktop, tablet, and mobile devices."
      },
      {
        "title": "CMS Integration",
        "description": "Content management systems that allow your team to update content where appropriate."
      },
      {
        "title": "SEO-Ready Structure",
        "description": "Technical foundations that support search visibility, performance, and content structure."
      },
      {
        "title": "Performance Optimization",
        "description": "Fast-loading pages with optimized assets, clean code, and practical performance improvements."
      },
      {
        "title": "Maintenance & Support",
        "description": "Ongoing updates, fixes, and improvements based on the agreed support scope."
      }
    ],
    "valueIntro": "A well-built website can improve credibility, usability, and lead generation. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Stronger online credibility",
      "Better mobile and desktop experience",
      "Clearer service communication",
      "SEO-ready technical foundation",
      "Easier content management"
    ],
    "faqs": [
      {
        "question": "Can you redesign our existing website?",
        "answer": "Yes. We can redesign existing websites to improve design, structure, performance, and user experience while preserving important content and URLs where needed."
      },
      {
        "question": "Will the website be mobile-friendly?",
        "answer": "Yes. We build responsive websites that adapt to different screen sizes and devices."
      },
      {
        "question": "Can we update content ourselves after launch?",
        "answer": "Yes. If needed, we can build the website with a CMS so your team can manage approved content areas."
      },
      {
        "question": "Do you provide SEO with website development?",
        "answer": "We implement SEO-ready technical foundations such as clean structure, metadata support, and performance best practices. Ongoing SEO services can also be scoped separately."
      },
      {
        "question": "Do you provide hosting and maintenance?",
        "answer": "We can advise on hosting and provide ongoing maintenance and support based on your project requirements."
      }
    ],
    "enquiryHeading": "Let's Build Your Website."
  },
  "web-applications": {
    "name": "Web Applications",
    "image": "/images/visuals/product.webp",
    "imageAlt": "Web application interface on a laptop in a professional workspace",
    "introHeading": "Custom Web Applications for Complex Business Workflows",
    "intro": [
      "Many businesses outgrow basic websites and spreadsheets when they need portals, dashboards, internal tools, or customer-facing platforms. Off-the-shelf tools may not fit the exact workflow.",
      "YESBE Technologies builds custom web applications designed around your processes, users, and data. We focus on secure, scalable, and maintainable applications that help teams work efficiently and deliver better digital experiences."
    ],
    "capabilities": [
      {
        "title": "Custom Application Development",
        "description": "Web applications built around your specific workflows, roles, and business requirements."
      },
      {
        "title": "Portals & Dashboards",
        "description": "Customer, partner, or internal portals with clear data views and role-based access."
      },
      {
        "title": "API & System Integrations",
        "description": "Connect your web app with third-party services, internal systems, and data sources where feasible."
      },
      {
        "title": "User Management & Access Control",
        "description": "Secure authentication, roles, and permissions based on your operational needs."
      },
      {
        "title": "Scalable Architecture",
        "description": "Application structures designed to support growth, maintainability, and future enhancements."
      },
      {
        "title": "Testing & Support",
        "description": "Quality assurance before launch and ongoing support based on the agreed scope."
      }
    ],
    "valueIntro": "Custom web applications can streamline operations and improve user experience when built around real needs. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Workflows tailored to your business",
      "Better data visibility and control",
      "Improved user experience",
      "Integration with existing systems",
      "Scalable foundation for growth"
    ],
    "faqs": [
      {
        "question": "What is the difference between a website and a web application?",
        "answer": "A website primarily presents information, while a web application enables users to interact with data, workflows, or accounts through features like dashboards, portals, or tools."
      },
      {
        "question": "Can you build a web app for our internal team?",
        "answer": "Yes. We build internal tools, admin panels, dashboards, and workflow systems based on your operational requirements."
      },
      {
        "question": "Can the web application integrate with our existing systems?",
        "answer": "Yes, where technically feasible. We review APIs, data sources, and security requirements before planning integrations."
      },
      {
        "question": "How do you handle security?",
        "answer": "We apply security-conscious practices such as role-based access, input validation, secure authentication patterns, and controlled data handling based on project scope."
      },
      {
        "question": "Can you support the application after launch?",
        "answer": "Yes. We offer ongoing maintenance, improvements, and technical support based on the agreed support scope."
      }
    ],
    "enquiryHeading": "Let's Build Your Web Application."
  },
  "ecommerce": {
    "name": "E-Commerce",
    "image": "/images/visuals/web.webp",
    "imageAlt": "E-commerce shopping experience displayed on modern digital devices",
    "introHeading": "E-Commerce Solutions That Support Online Sales and Operations",
    "intro": [
      "Selling online requires more than a product catalog. Businesses need smooth customer journeys, reliable order management, payment integration, and systems that can handle growth.",
      "YESBE Technologies builds e-commerce solutions that help businesses manage products, orders, customers, and payments efficiently. We focus on user-friendly storefronts, practical backend workflows, and integrations that support your sales operations."
    ],
    "capabilities": [
      {
        "title": "Custom E-Commerce Stores",
        "description": "Online stores designed around your brand, products, and customer buying journey."
      },
      {
        "title": "Product & Inventory Management",
        "description": "Tools for managing catalogs, stock levels, variants, and product information."
      },
      {
        "title": "Payment & Checkout Integration",
        "description": "Secure payment gateway and checkout integrations based on supported providers and requirements."
      },
      {
        "title": "Order & Fulfillment Workflows",
        "description": "Systems for order tracking, status updates, returns, and operational coordination."
      },
      {
        "title": "Customer Accounts & CRM",
        "description": "Features for customer profiles, order history, communication, and service workflows."
      },
      {
        "title": "Analytics & Optimization",
        "description": "Reporting and insights to understand sales performance and improve the shopping experience."
      }
    ],
    "valueIntro": "A well-planned e-commerce platform can improve online operations and customer experience. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Smoother online buying experience",
      "Better product and order visibility",
      "Reduced manual sales operations",
      "Integrated payment and checkout flows",
      "Scalable foundation for growth"
    ],
    "faqs": [
      {
        "question": "Can you build a custom e-commerce website?",
        "answer": "Yes. We can build custom e-commerce solutions tailored to your products, workflows, and business requirements."
      },
      {
        "question": "Can you integrate payment gateways?",
        "answer": "Yes. We can integrate supported payment gateways based on your region, business model, and technical requirements."
      },
      {
        "question": "Can you migrate our existing store?",
        "answer": "Yes, where feasible. We assess your current platform, data, and URL structure to plan a careful migration approach."
      },
      {
        "question": "Will the store be mobile-friendly?",
        "answer": "Yes. We design e-commerce experiences to work well across desktop, tablet, and mobile devices."
      },
      {
        "question": "Can you integrate inventory or ERP systems?",
        "answer": "Yes, where technically feasible. We can integrate inventory, ERP, CRM, or other business systems based on your requirements."
      }
    ],
    "enquiryHeading": "Let's Build Your E-Commerce Solution."
  },
  "business-automation": {
    "name": "Business Automation",
    "image": "/images/visuals/automation.webp",
    "imageAlt": "Automated business workflow concept with connected digital systems",
    "introHeading": "Business Automation to Reduce Manual Work and Improve Efficiency",
    "intro": [
      "Manual processes slow teams down, create inconsistencies, and make it difficult to scale operations. Repetitive tasks across approvals, data entry, reporting, and communication often consume valuable time.",
      "YESBE Technologies helps businesses automate workflows using practical digital tools and integrations. We identify repetitive processes, design efficient workflows, and implement automation that fits your existing systems and team operations."
    ],
    "capabilities": [
      {
        "title": "Workflow Automation",
        "description": "Automate approvals, notifications, task assignments, and routine operational processes."
      },
      {
        "title": "System Integrations",
        "description": "Connect apps and data sources so information flows automatically where technically feasible."
      },
      {
        "title": "Document & Data Processing",
        "description": "Reduce manual document handling, data entry, and repetitive formatting tasks."
      },
      {
        "title": "CRM & Sales Automation",
        "description": "Automate lead capture, follow-ups, status updates, and customer communication workflows."
      },
      {
        "title": "Reporting Automation",
        "description": "Generate scheduled reports and dashboards from connected business data."
      },
      {
        "title": "Custom Automation Tools",
        "description": "Build tailored automation solutions when off-the-shelf tools do not fit your process."
      }
    ],
    "valueIntro": "Business automation can save time and improve consistency when applied to the right workflows. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Reduced manual repetitive work",
      "More consistent processes",
      "Faster response times",
      "Better operational visibility",
      "More time for higher-value tasks"
    ],
    "faqs": [
      {
        "question": "Which business processes can be automated?",
        "answer": "Common candidates include approvals, reporting, notifications, lead handling, data entry, and system-to-system updates. We assess your workflows to identify practical opportunities."
      },
      {
        "question": "Do we need to replace our existing tools?",
        "answer": "Not always. Many automation projects connect or extend existing tools rather than replacing them."
      },
      {
        "question": "Can automation integrate with our current software?",
        "answer": "Yes, where technically feasible. We review your current systems, APIs, and data flows before recommending an approach."
      },
      {
        "question": "Is automation secure?",
        "answer": "We apply security-conscious practices such as access controls, audit logs where appropriate, and careful handling of data and integrations based on project requirements."
      },
      {
        "question": "Can we start with a small automation project?",
        "answer": "Yes. Starting with a focused workflow is often a practical way to validate value and expand gradually."
      }
    ],
    "enquiryHeading": "Let's Automate Your Business Processes."
  },
  "data-analytics": {
    "name": "Data Analytics",
    "image": "/images/visuals/analytics.webp",
    "imageAlt": "Data analytics dashboard with charts and business insights",
    "introHeading": "Data Analytics for Clearer Business Insights",
    "intro": [
      "Businesses collect data from sales, operations, marketing, and customer systems, but raw data is not useful if it is difficult to access or understand. Teams need clear insights to make informed decisions.",
      "YESBE Technologies helps businesses organize, analyze, and visualize data through practical analytics solutions. We build dashboards, reports, and data workflows that turn information into accessible insights for day-to-day and strategic decision-making."
    ],
    "capabilities": [
      {
        "title": "Analytics Strategy & Data Assessment",
        "description": "Review data sources, quality, and reporting needs to define a practical analytics approach."
      },
      {
        "title": "Dashboard Development",
        "description": "Interactive dashboards that present key metrics clearly for different teams and roles."
      },
      {
        "title": "Data Integration",
        "description": "Connect data from multiple systems into a consistent reporting structure where feasible."
      },
      {
        "title": "KPI & Reporting Design",
        "description": "Define meaningful metrics and reporting views aligned with business objectives."
      },
      {
        "title": "Data Cleaning & Transformation",
        "description": "Prepare and structure data for more reliable reporting and analysis."
      },
      {
        "title": "Automated Reporting",
        "description": "Scheduled reports and alerts that reduce manual reporting effort."
      }
    ],
    "valueIntro": "Data analytics can improve visibility and decision support when based on reliable data and clear metrics. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Better visibility into performance",
      "Faster access to reports",
      "More consistent metrics",
      "Reduced manual reporting work",
      "Improved decision support"
    ],
    "faqs": [
      {
        "question": "What data sources can you work with?",
        "answer": "We can work with common sources such as spreadsheets, databases, CRMs, ERPs, APIs, and business applications, depending on access and data quality."
      },
      {
        "question": "Can you build dashboards for different teams?",
        "answer": "Yes. We can design role-based dashboards so teams see the metrics most relevant to their responsibilities."
      },
      {
        "question": "Do you help define KPIs?",
        "answer": "Yes. We can work with your team to identify useful metrics and reporting structures based on your goals and available data."
      },
      {
        "question": "Can you improve our existing reports?",
        "answer": "Yes. We can review existing reports, identify gaps or inconsistencies, and redesign them for clarity and usability."
      },
      {
        "question": "Is our data secure in analytics projects?",
        "answer": "We follow security-conscious practices, including controlled access and appropriate data handling based on project scope and requirements."
      }
    ],
    "enquiryHeading": "Let's Build Your Data Analytics Solution."
  },
  "power-bi-dashboards": {
    "name": "Power BI Dashboards",
    "image": "/images/visuals/analytics.webp",
    "imageAlt": "Power BI business dashboard showing performance metrics and charts",
    "introHeading": "Power BI Dashboards for Actionable Business Reporting",
    "intro": [
      "Many organizations have valuable data in spreadsheets, databases, and business systems, but reporting is often manual, slow, or inconsistent. Decision-makers need clear dashboards they can trust.",
      "YESBE Technologies designs and develops Power BI dashboards that turn business data into clear, interactive reports. We focus on useful metrics, clean data models, and dashboards that help teams monitor performance and act with confidence."
    ],
    "capabilities": [
      {
        "title": "Power BI Dashboard Design",
        "description": "Custom dashboard layouts designed for clarity, usability, and business relevance."
      },
      {
        "title": "Data Modeling & DAX",
        "description": "Structured data models and calculations to support accurate and consistent reporting."
      },
      {
        "title": "Data Source Integration",
        "description": "Connect Power BI to spreadsheets, databases, cloud services, or business apps where feasible."
      },
      {
        "title": "KPI Tracking & Reports",
        "description": "Role-based reports for leadership, operations, sales, finance, or other teams."
      },
      {
        "title": "Report Automation & Refresh",
        "description": "Scheduled data refresh and reporting workflows to reduce manual effort."
      },
      {
        "title": "Optimization & Support",
        "description": "Improve existing Power BI reports for performance, usability, and maintainability."
      }
    ],
    "valueIntro": "Power BI dashboards can make reporting more accessible and consistent. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Clearer visibility into KPIs",
      "Reduced manual reporting",
      "Interactive self-service insights",
      "Consistent reporting across teams",
      "Faster access to business data"
    ],
    "faqs": [
      {
        "question": "Can you connect Power BI to our existing data sources?",
        "answer": "Yes, where supported and technically feasible. We work with sources such as Excel, SQL databases, cloud platforms, and business applications."
      },
      {
        "question": "Can you improve our existing Power BI reports?",
        "answer": "Yes. We can review existing dashboards, improve data models, optimize performance, and redesign visuals for clarity."
      },
      {
        "question": "Do you help define which KPIs to track?",
        "answer": "Yes. We can help identify relevant KPIs based on your business goals, available data, and reporting needs."
      },
      {
        "question": "Can different teams see different dashboards?",
        "answer": "Yes. We can implement role-based access and tailored views so users see relevant information."
      },
      {
        "question": "Do you provide training for our team?",
        "answer": "Yes. We can provide training and documentation based on the agreed scope so your team can use and maintain reports effectively."
      }
    ],
    "enquiryHeading": "Let's Build Your Power BI Dashboard."
  },
  "cloud-devops": {
    "name": "Cloud & DevOps",
    "image": "/images/visuals/cloud.webp",
    "imageAlt": "Cloud infrastructure and DevOps operations in a modern technology environment",
    "introHeading": "Cloud & DevOps Services for Reliable, Scalable Systems",
    "intro": [
      "Modern applications need reliable infrastructure, efficient deployments, and scalable environments. Without the right cloud and DevOps practices, teams can face downtime, slow releases, and operational risk.",
      "YESBE Technologies helps businesses plan, build, and manage cloud and DevOps workflows that support performance and reliability. From cloud setup and CI/CD pipelines to monitoring and deployment automation, we focus on practical solutions aligned with your technical needs."
    ],
    "capabilities": [
      {
        "title": "Cloud Architecture & Setup",
        "description": "Design and configure cloud environments based on your application, security, and scalability needs."
      },
      {
        "title": "CI/CD Pipelines",
        "description": "Automate build, test, and deployment workflows to improve release consistency."
      },
      {
        "title": "Infrastructure as Code",
        "description": "Manage infrastructure with repeatable, version-controlled configurations where appropriate."
      },
      {
        "title": "Monitoring & Logging",
        "description": "Set up observability tools for uptime, performance, errors, and operational visibility."
      },
      {
        "title": "Security & Access Controls",
        "description": "Implement practical cloud security practices, permissions, and environment controls."
      },
      {
        "title": "Migration & Optimization",
        "description": "Support cloud migration and optimize existing environments for cost, performance, or reliability."
      }
    ],
    "valueIntro": "Cloud and DevOps practices can improve reliability and delivery efficiency. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "More consistent deployments",
      "Improved system visibility",
      "Scalable infrastructure foundation",
      "Reduced manual release effort",
      "Better operational control"
    ],
    "faqs": [
      {
        "question": "Which cloud platforms do you work with?",
        "answer": "We can work with major cloud platforms depending on project requirements, including AWS, Azure, and Google Cloud."
      },
      {
        "question": "Can you help migrate our existing application to the cloud?",
        "answer": "Yes, where feasible. We assess your current architecture, dependencies, and risks before planning a migration approach."
      },
      {
        "question": "Do you set up CI/CD pipelines?",
        "answer": "Yes. We can implement CI/CD workflows to automate testing and deployment based on your development process."
      },
      {
        "question": "How do you handle cloud security?",
        "answer": "We apply security-conscious practices such as access control, environment separation, monitoring, and secure configuration based on project scope."
      },
      {
        "question": "Can you support our team after setup?",
        "answer": "Yes. We can provide ongoing support, monitoring, and optimization based on the agreed service scope."
      }
    ],
    "enquiryHeading": "Let's Improve Your Cloud & DevOps Setup."
  },
  "database-management": {
    "name": "Database Management",
    "image": "/images/visuals/enterprise.webp",
    "imageAlt": "Secure database infrastructure and data management systems",
    "introHeading": "Reliable Database Management for Secure and Efficient Data",
    "intro": [
      "Databases are at the core of business applications. Poor design, slow queries, weak backups, or unmanaged growth can affect performance, reliability, and data access.",
      "YESBE Technologies provides database management services to help businesses design, maintain, and optimize their data systems. We focus on performance, reliability, security-conscious practices, and data structures that support your applications and reporting needs."
    ],
    "capabilities": [
      {
        "title": "Database Design & Modeling",
        "description": "Design structured schemas that support application performance, integrity, and future growth."
      },
      {
        "title": "Performance Optimization",
        "description": "Improve query performance, indexing, and database configuration based on observed workloads."
      },
      {
        "title": "Backup & Recovery Planning",
        "description": "Implement backup and recovery strategies appropriate to your business and technical requirements."
      },
      {
        "title": "Migration & Upgrades",
        "description": "Plan and execute database migrations or version upgrades where technically feasible."
      },
      {
        "title": "Security & Access Management",
        "description": "Apply role-based access, controlled permissions, and secure data handling practices."
      },
      {
        "title": "Monitoring & Maintenance",
        "description": "Ongoing monitoring, health checks, and maintenance to support reliability and performance."
      }
    ],
    "valueIntro": "Good database management can improve reliability, performance, and data control. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Improved application performance",
      "Better data reliability",
      "Reduced risk from poor backups",
      "Clearer data structure",
      "Stronger operational control"
    ],
    "faqs": [
      {
        "question": "Which databases do you work with?",
        "answer": "We work with common relational and NoSQL databases depending on project needs, such as PostgreSQL, MySQL, MongoDB, and others."
      },
      {
        "question": "Can you optimize our existing slow database?",
        "answer": "Yes. We can review schema design, queries, indexes, and configuration to identify practical performance improvements."
      },
      {
        "question": "Do you help with database migrations?",
        "answer": "Yes, where feasible. We plan migrations carefully to reduce risk and preserve data integrity."
      },
      {
        "question": "How do you handle database security?",
        "answer": "We apply security-conscious practices including access control, secure configuration, and backup planning based on project requirements."
      },
      {
        "question": "Can you provide ongoing database support?",
        "answer": "Yes. We can provide ongoing monitoring, maintenance, and optimization under an agreed support scope."
      }
    ],
    "enquiryHeading": "Let's Discuss Your Database Needs."
  },
  "api-development": {
    "name": "API Development",
    "image": "/images/visuals/integration.webp",
    "imageAlt": "Connected systems and API integration concept",
    "introHeading": "API Development & Integration for Connected Systems",
    "intro": [
      "Modern businesses rely on multiple applications, services, and data sources. Without reliable APIs and integrations, teams face manual data transfer, inconsistent information, and disconnected workflows.",
      "YESBE Technologies designs and develops APIs that connect systems securely and efficiently. Whether you need a new API, third-party integrations, or improvements to existing interfaces, we focus on reliable, well-documented, and maintainable solutions."
    ],
    "capabilities": [
      {
        "title": "Custom API Development",
        "description": "Design and build APIs tailored to your application, data, and business workflow requirements."
      },
      {
        "title": "Third-Party Integrations",
        "description": "Connect your systems with payment, CRM, ERP, marketing, or other external services where feasible."
      },
      {
        "title": "API Modernization",
        "description": "Improve or refactor existing APIs for better performance, security, and maintainability."
      },
      {
        "title": "Authentication & Access Control",
        "description": "Implement secure access patterns, tokens, roles, and permissions based on project needs."
      },
      {
        "title": "Documentation & Testing",
        "description": "Clear API documentation and testing to support reliable integration and future development."
      },
      {
        "title": "Monitoring & Support",
        "description": "Ongoing monitoring and maintenance to keep integrations reliable as systems evolve."
      }
    ],
    "valueIntro": "Well-designed APIs can improve connectivity and reduce manual work across systems. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Better system connectivity",
      "Reduced manual data handling",
      "More consistent data flows",
      "Scalable integration foundation",
      "Improved developer and partner experience"
    ],
    "faqs": [
      {
        "question": "Can you integrate our software with third-party tools?",
        "answer": "Yes, where technically feasible. We review available APIs, authentication methods, and data requirements before implementation."
      },
      {
        "question": "Do you build REST and GraphQL APIs?",
        "answer": "Yes. We can build REST, GraphQL, or other API styles depending on the use case and technical requirements."
      },
      {
        "question": "How do you secure APIs?",
        "answer": "We apply security-conscious practices such as authentication, authorization, input validation, rate limiting, and logging where appropriate."
      },
      {
        "question": "Can you improve an existing API?",
        "answer": "Yes. We can audit, refactor, document, and optimize existing APIs to improve reliability and maintainability."
      },
      {
        "question": "Do you provide API documentation?",
        "answer": "Yes. Clear documentation is part of a reliable API delivery process and helps teams integrate and maintain systems effectively."
      }
    ],
    "enquiryHeading": "Let's Build Your API Integration."
  },
  "seo": {
    "name": "SEO",
    "image": "/images/visuals/web.webp",
    "imageAlt": "SEO analytics and search performance on a digital dashboard",
    "introHeading": "SEO Services for Sustainable Search Visibility",
    "intro": [
      "A strong website is less effective if potential customers cannot find it. Search visibility depends on technical performance, content quality, structure, and ongoing optimization.",
      "YESBE Technologies provides SEO services that help businesses improve their search presence through practical technical and content improvements. We focus on sustainable SEO foundations, clear reporting, and strategies aligned with your business goals."
    ],
    "capabilities": [
      {
        "title": "Technical SEO Audit",
        "description": "Review site structure, indexing, speed, metadata, and technical issues affecting search performance."
      },
      {
        "title": "On-Page SEO",
        "description": "Optimize page structure, headings, metadata, content signals, and internal linking where appropriate."
      },
      {
        "title": "Content Strategy Support",
        "description": "Plan content around relevant search intent, service topics, and business priorities."
      },
      {
        "title": "Local & Business SEO",
        "description": "Improve visibility for location-based or service-based searches where relevant."
      },
      {
        "title": "Performance & UX Improvements",
        "description": "Address technical factors that affect user experience and search performance."
      },
      {
        "title": "Reporting & Ongoing Optimization",
        "description": "Track key SEO indicators and refine strategy based on data and changes over time."
      }
    ],
    "valueIntro": "SEO can improve visibility and traffic quality over time, but results depend on many factors. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Improved search visibility",
      "Better technical site foundation",
      "Clearer content structure",
      "More relevant organic traffic opportunities",
      "Ongoing performance insights"
    ],
    "faqs": [
      {
        "question": "How long does SEO take to show results?",
        "answer": "SEO timelines vary depending on competition, site condition, content, and search engine changes. It is typically an ongoing process rather than an instant result."
      },
      {
        "question": "Do you guarantee first-page rankings?",
        "answer": "No. No responsible SEO provider can guarantee specific rankings. We focus on best practices, technical improvements, and measurable progress."
      },
      {
        "question": "Can you help with technical SEO on our existing site?",
        "answer": "Yes. We can audit and improve technical SEO issues such as metadata, structure, performance, indexing, and internal linking."
      },
      {
        "question": "Do you provide content for SEO?",
        "answer": "We can support content strategy and SEO-aligned content planning. Content creation can be included based on the agreed scope."
      },
      {
        "question": "Will SEO work with our new website?",
        "answer": "Yes. We can build SEO-ready foundations into new websites and provide ongoing optimization after launch if needed."
      }
    ],
    "enquiryHeading": "Let's Improve Your Search Visibility."
  },
  "geo": {
    "name": "GEO",
    "image": "/images/visuals/intelligence.webp",
    "imageAlt": "AI search and generative engine optimization concept",
    "introHeading": "GEO for Visibility in AI-Powered Search Experiences",
    "intro": [
      "Search behavior is changing as users increasingly rely on AI-powered answers and generative search experiences. Businesses need content that is clear, credible, and structured for these new discovery channels.",
      "YESBE Technologies helps businesses adapt content and technical structure for Generative Engine Optimization (GEO). We focus on making your expertise easier to understand, cite, and surface in AI-assisted search experiences where relevant."
    ],
    "capabilities": [
      {
        "title": "GEO Content Structuring",
        "description": "Organize content so key services, answers, and expertise are clear and easy to interpret."
      },
      {
        "title": "Entity & Topic Clarity",
        "description": "Strengthen how your business, services, and topics are described across key pages."
      },
      {
        "title": "Technical Content Signals",
        "description": "Improve metadata, schema, and page structure to support machine understanding where appropriate."
      },
      {
        "title": "Content Gap Analysis",
        "description": "Identify missing topics or questions your audience may ask in AI search experiences."
      },
      {
        "title": "Authority & Trust Signals",
        "description": "Improve clarity around expertise, service details, and supporting content."
      },
      {
        "title": "Performance Monitoring",
        "description": "Track visibility signals and refine content based on evolving search behavior."
      }
    ],
    "valueIntro": "GEO can help improve how your content is interpreted in AI-assisted discovery. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Clearer service and topic signals",
      "Better structured content",
      "Improved readiness for AI search",
      "Stronger topical coverage",
      "Ongoing content optimization"
    ],
    "faqs": [
      {
        "question": "What is GEO?",
        "answer": "GEO, or Generative Engine Optimization, focuses on improving how content is understood and surfaced in AI-powered search and answer experiences."
      },
      {
        "question": "Is GEO different from SEO?",
        "answer": "Yes. GEO overlaps with SEO but focuses more on content clarity, structure, and signals that may help in generative or AI-assisted search experiences."
      },
      {
        "question": "Can you guarantee visibility in AI answers?",
        "answer": "No. AI search systems change frequently and no provider can guarantee specific placements. We focus on best practices and strong content foundations."
      },
      {
        "question": "Do we need to rewrite all our website content?",
        "answer": "Not always. We can start with key service pages, FAQs, and high-value content areas."
      },
      {
        "question": "Can GEO be combined with SEO?",
        "answer": "Yes. GEO and SEO work well together because both benefit from clear structure, quality content, and strong technical foundations."
      }
    ],
    "enquiryHeading": "Let's Improve Your AI Search Visibility."
  },
  "aeo": {
    "name": "AEO",
    "image": "/images/visuals/intelligence.webp",
    "imageAlt": "Answer engine optimization concept with digital search interface",
    "introHeading": "AEO for Direct Answers and High-Intent Visibility",
    "intro": [
      "Users increasingly expect direct answers from search engines, voice assistants, and AI tools. Content that is unclear or poorly structured may miss opportunities to appear in answer-driven results.",
      "YESBE Technologies helps businesses optimize content for Answer Engine Optimization (AEO). We structure pages, FAQs, and service content so important answers are clear, accessible, and aligned with user intent."
    ],
    "capabilities": [
      {
        "title": "AEO Content Audit",
        "description": "Review existing content for answer clarity, structure, and question coverage."
      },
      {
        "title": "FAQ & Question Strategy",
        "description": "Identify high-intent questions and create clear, useful answers for key pages."
      },
      {
        "title": "Schema & Structured Data",
        "description": "Implement relevant structured data where appropriate to support machine understanding."
      },
      {
        "title": "Content Formatting",
        "description": "Improve headings, concise answers, and page structure for answer-focused experiences."
      },
      {
        "title": "Service Page Optimization",
        "description": "Make service offerings, processes, and value clear for users and search systems."
      },
      {
        "title": "Monitoring & Refinement",
        "description": "Review performance signals and refine content based on search behavior and business priorities."
      }
    ],
    "valueIntro": "AEO can improve content clarity and readiness for answer-driven search. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Clearer answers for users",
      "Better structured service content",
      "Improved FAQ usefulness",
      "Stronger content intent alignment",
      "Support for AI and answer search visibility"
    ],
    "faqs": [
      {
        "question": "What is AEO?",
        "answer": "AEO, or Answer Engine Optimization, focuses on structuring content so search engines and AI tools can better identify and present direct answers."
      },
      {
        "question": "How is AEO different from SEO?",
        "answer": "SEO is broader, while AEO focuses specifically on clear answers, question-based content, and structured information for answer-driven experiences."
      },
      {
        "question": "Can you guarantee featured snippets or AI answers?",
        "answer": "No. No one can guarantee specific placements. We focus on clear, well-structured content and best practices."
      },
      {
        "question": "What pages benefit most from AEO?",
        "answer": "Service pages, FAQs, knowledge content, and pages answering common customer questions often benefit most."
      },
      {
        "question": "Can AEO help local or B2B businesses?",
        "answer": "Yes. Any business that answers customer questions online can benefit from clearer, better-structured content."
      }
    ],
    "enquiryHeading": "Let's Optimize for Answer Engines."
  },
  "digital-marketing": {
    "name": "Digital Marketing",
    "image": "/images/visuals/web.webp",
    "imageAlt": "Digital marketing strategy dashboard with campaign performance metrics",
    "introHeading": "Digital Marketing Services for Measurable Online Growth",
    "intro": [
      "Digital marketing works best when strategy, content, design, and data are aligned. Without a clear plan, businesses can spend on campaigns that do not reach the right audience or support business goals.",
      "YESBE Technologies provides digital marketing services focused on practical growth strategies. We help businesses improve online visibility, generate leads, and communicate their value through coordinated digital channels."
    ],
    "capabilities": [
      {
        "title": "Digital Strategy & Planning",
        "description": "Define goals, audiences, channels, and messaging based on your business objectives."
      },
      {
        "title": "SEO & Content Marketing",
        "description": "Improve organic visibility with search-focused content and technical foundations."
      },
      {
        "title": "Social Media Marketing",
        "description": "Plan and manage social content that supports brand visibility and engagement."
      },
      {
        "title": "Paid Campaign Support",
        "description": "Support paid advertising strategies where appropriate, with clear goals and tracking."
      },
      {
        "title": "Landing Pages & Conversion Optimization",
        "description": "Improve pages and user journeys to support enquiries and campaign performance."
      },
      {
        "title": "Analytics & Reporting",
        "description": "Track campaign performance and provide insights for ongoing optimization."
      }
    ],
    "valueIntro": "Digital marketing can improve reach and lead opportunities when executed with clear strategy and tracking. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Improved online visibility",
      "More consistent brand messaging",
      "Better campaign tracking",
      "Lead generation opportunities",
      "Data-informed marketing decisions"
    ],
    "faqs": [
      {
        "question": "Which digital marketing channels do you support?",
        "answer": "We can support channels such as SEO, content, social media, landing pages, and paid campaign strategy depending on your goals."
      },
      {
        "question": "Do you guarantee leads or sales?",
        "answer": "No. Marketing results depend on many factors including offer, market, budget, competition, and execution. We focus on practical strategy and measurable improvements."
      },
      {
        "question": "Can you work with our existing website?",
        "answer": "Yes. We can improve existing pages, landing pages, tracking, and content to support marketing goals."
      },
      {
        "question": "Do you provide marketing reports?",
        "answer": "Yes. We can provide reporting on agreed metrics so you can understand performance and next steps."
      },
      {
        "question": "Can digital marketing be combined with SEO and GEO?",
        "answer": "Yes. These services complement each other and can be planned together for stronger digital visibility."
      }
    ],
    "enquiryHeading": "Let's Grow Your Digital Presence."
  },
  "custom-software": {
    "name": "Custom Software",
    "image": "/images/visuals/product.webp",
    "imageAlt": "Custom software development workspace with application interface",
    "introHeading": "Custom Software Built Around Your Business",
    "intro": [
      "Off-the-shelf software can be useful, but it often forces businesses to adapt their processes around tool limitations. When workflows are unique, custom software may provide a better fit.",
      "YESBE Technologies designs and develops custom software tailored to your specific requirements. We build secure, maintainable applications that support your operations, users, and business goals, from internal tools to customer-facing platforms."
    ],
    "capabilities": [
      {
        "title": "Custom Application Development",
        "description": "Software designed around your exact workflows, users, and business rules."
      },
      {
        "title": "Internal Tools & Portals",
        "description": "Build tools for operations, admin, reporting, customer service, or partner workflows."
      },
      {
        "title": "System Integration",
        "description": "Connect custom software with existing business systems, APIs, and data sources where feasible."
      },
      {
        "title": "Modernization & Rebuilds",
        "description": "Improve or rebuild legacy software to support better usability and maintainability."
      },
      {
        "title": "Security & Role Management",
        "description": "Implement appropriate access controls, permissions, and secure data handling practices."
      },
      {
        "title": "Ongoing Support & Evolution",
        "description": "Post-launch support, enhancements, and maintenance based on agreed scope."
      }
    ],
    "valueIntro": "Custom software can provide a better fit for unique processes and long-term growth. These are potential benefits, not guaranteed outcomes.",
    "value": [
      "Software aligned to your workflows",
      "Better control over features and data",
      "Integration with existing systems",
      "Scalable long-term foundation",
      "Improved operational efficiency"
    ],
    "faqs": [
      {
        "question": "When should we choose custom software over off-the-shelf tools?",
        "answer": "Custom software is useful when your workflows are unique, integrations are complex, or existing tools do not fit your business needs well."
      },
      {
        "question": "Can you build software for internal use only?",
        "answer": "Yes. We build internal systems, dashboards, admin tools, and workflow applications based on your requirements."
      },
      {
        "question": "Can custom software integrate with our existing tools?",
        "answer": "Yes, where technically feasible. We assess your current systems and APIs before planning integrations."
      },
      {
        "question": "How do you manage project scope and changes?",
        "answer": "We define scope, priorities, and milestones early, then manage changes through clear communication and agreed project processes."
      },
      {
        "question": "Do you provide maintenance after launch?",
        "answer": "Yes. We can provide ongoing support, bug fixes, improvements, and enhancements based on the agreed support arrangement."
      }
    ],
    "enquiryHeading": "Let's Build Your Custom Software."
  }
};

function ServiceDetailLayout({ content, route, slug }: { content: ServiceContent; route: string; slug: string }) {
  return (
    <>
      <section className="bg-white pt-[76px]">
        <div className="container-page py-10 sm:py-12 lg:py-14">
          <h1 className="max-w-5xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#11114F]">
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#155DFC]">Service overview</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#101828]">{content.introHeading}</h2>
              <div className="mt-6 space-y-5 text-[15px] leading-8 text-[#273244] sm:text-[16px]">
                {content.intro.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <h3 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#11124D] sm:text-[2rem]">Key capabilities</h3>
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
                <h3 className="text-[1.5rem] font-bold tracking-[-0.02em] text-[#11124D]">Business value</h3>
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
      <DetailEnquiryCard kind="service" name={content.name} slug={slug} route={route} heading={content.enquiryHeading} />
    </>
  );
}

export function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? getSolutionBySlug(slug) : undefined;
  const content = slug ? CONTENT[slug] : undefined;

  useSEO({
    title: solution ? getSolutionSeoTitle(solution.slug, solution.title) : SEO_TITLES.solutionNotFound,
    description: solution ? getSolutionSeoDescription(solution.slug, solution.title) : SEO_DESCRIPTIONS.solutionNotFound,
    canonical: solution ? `https://www.yesbe.tech/services/${solution.slug}` : "https://www.yesbe.tech/services",
  });

  if (!solution) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-6 pt-24">
        <div className="max-w-md text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-ink">Solution not found</h1>
          <p className="mt-3 text-sm leading-6 text-body">The service you are looking for does not exist or has moved.</p>
          <Link to="/services" className="btn-primary mt-7 inline-flex"><ArrowLeft className="size-4" aria-hidden="true" />Back to services</Link>
        </div>
      </div>
    );
  }

  if (!content) {
    // Fallback: use solution data to render same layout if content missing
    const fallback: ServiceContent = {
      name: solution.title,
      image: solution.heroImage.startsWith("/") ? solution.heroImage : "/images/visuals/transformation.webp",
      imageAlt: `${solution.title} service illustration`,
      introHeading: solution.description,
      intro: [solution.overview, solution.whyNeeded],
      capabilities: solution.features.slice(0, 6).map((f) => ({ title: f.title, description: f.description })),
      valueIntro: "Practical technology can improve efficiency and visibility when implemented around real business needs. These are potential benefits, not guaranteed outcomes.",
      value: solution.benefits.slice(0, 5),
      faqs: solution.faq.slice(0, 6).map((f) => ({ question: f.question, answer: f.answer })),
      enquiryHeading: `Let's Discuss Your ${solution.shortTitle} Requirements.`,
    };
    const route = `/services/${solution.slug}`;
    return (
      <>
        <JsonLd schema={{ "@context": "https://schema.org", "@type": "WebPage", name: `${fallback.name} — YESBE Technologies`, description: getSolutionSeoDescription(solution.slug, solution.title), url: `https://www.yesbe.tech${route}`, publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" } }} />
        <JsonLd schema={{ "@context": "https://schema.org", "@type": "Service", name: fallback.name, description: getSolutionSeoDescription(solution.slug, solution.title), provider: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" }, url: `https://www.yesbe.tech${route}` }} />
        <JsonLd schema={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: fallback.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
        <ServiceDetailLayout content={fallback} route={route} slug={solution.slug} />
      </>
    );
  }

  const route = `/services/${solution.slug}`;
  return (
    <>
      <JsonLd schema={{ "@context": "https://schema.org", "@type": "WebPage", name: `${content.name} — YESBE Technologies`, description: getSolutionSeoDescription(solution.slug, solution.title), url: `https://www.yesbe.tech${route}`, publisher: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" } }} />
      <JsonLd schema={{ "@context": "https://schema.org", "@type": "Service", name: content.name, description: getSolutionSeoDescription(solution.slug, solution.title), provider: { "@type": "Organization", "@id": "https://www.yesbe.tech/#organization" }, url: `https://www.yesbe.tech${route}` }} />
      <JsonLd schema={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: content.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
      <ServiceDetailLayout content={content} route={route} slug={solution.slug} />
    </>
  );
}
