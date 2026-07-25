import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  Briefcase,
  Building2,
  Heart,
  GraduationCap,
  ShoppingBag,
  Factory,
  Truck,
  Utensils,
  DollarSign,
  Home,
  Brain,
  Bot,
  LayoutDashboard,
  Globe,
  Code2,
  Workflow,
  BarChart3,
  Cloud,
  Database,
  Link2,
  Search,
  Megaphone,
  MessageCircle,
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
  Wrench,
  Terminal,
  Component,
  Paintbrush,
  Link,
  Bell,
  CreditCard,
  Package,
  Monitor,
  MapPin,
  Calendar,
} from "lucide-react";

export interface IndustryDetail {
  slug: string;
  title: string;
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

export const industries: IndustryDetail[] = [
  // 1. Startups
  {
    slug: "startups",
    title: "Startups",
    icon: Rocket,
    category: "Emerging Companies",
    description:
      "MVPs, scalable architecture, and fast prototyping to launch quickly, iterate confidently, and grow without rewriting your foundation.",
    heroImage:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop",
    overview:
      "Startups operate under extreme constraints — tight budgets, aggressive timelines, and the constant pressure to validate ideas before runway runs out. Our startup-focused technology solutions are designed to get you from concept to production in weeks, not months, with an architecture that scales as you grow. We act as your fractional CTO and engineering team, building the technical foundation that investors and customers expect.",
    whyNeeded:
      "The difference between a startup that scales and one that collapses under its own weight often comes down to technical decisions made in the first 12 months. Poor architecture choices, premature optimization, or skipping testing infrastructure creates technical debt that drains resources later. Purpose-built startup solutions let you move fast without accumulating debt that will slow you down when traction arrives.",
    challenges: [
      "Building an MVP that is lean enough to validate quickly yet robust enough to handle real users and data",
      "Choosing the right technology stack without over-engineering or locking into outdated frameworks",
      "Scaling infrastructure gracefully as user count grows from hundreds to thousands to millions",
      "Balancing speed-to-market with security, performance, and code quality from day one",
    ],
    features: [
      {
        title: "Rapid MVP Development",
        description:
          "Fully functional minimum viable products designed for speed-to-market with the core features needed to validate your idea and attract early adopters.",
        icon: Rocket,
      },
      {
        title: "Scalable Architecture Design",
        description:
          "Microservices-ready, cloud-native architectures that start small and expand seamlessly as your user base and feature set grow.",
        icon: Layers,
      },
      {
        title: "Cloud Infrastructure Setup",
        description:
          "AWS, GCP, or Azure environments configured with auto-scaling, CI/CD pipelines, and cost optimization so you only pay for what you use.",
        icon: Cloud,
      },
      {
        title: "API Development & Integration",
        description:
          "RESTful and GraphQL APIs built for flexibility, allowing rapid iteration and seamless integration with third-party services and platforms.",
        icon: Link2,
      },
      {
        title: "Mobile App Development",
        description:
          "Cross-platform mobile applications using React Native or Flutter that deliver a native experience across iOS and Android with a single codebase.",
        icon: Smartphone,
      },
      {
        title: "Analytics & Growth Infrastructure",
        description:
          "Event tracking, funnel analysis, and A/B testing frameworks that give founders the data they need to make fast, informed product decisions.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Launch your MVP in 4-8 weeks instead of 6-12 months",
      "Reduce initial development costs by up to 60% with lean, focused builds",
      "Scale infrastructure on-demand without upfront capital expenditure",
      "Attract investors with a polished, performant product backed by solid architecture",
      "Iterate rapidly based on real user feedback with modular, decoupled code",
      "Avoid costly rewrites by establishing scalable patterns from the start",
    ],
    process: [
      {
        step: "Ideation & Discovery",
        description:
          "We map your vision to technical requirements, define the MVP scope, and create a prioritized roadmap aligned with your funding timeline.",
      },
      {
        step: "Architecture & Tech Stack Selection",
        description:
          "Our team evaluates frameworks, databases, and cloud providers to select the optimal stack for your product's specific needs and growth trajectory.",
      },
      {
        step: "UI/UX Design & Prototyping",
        description:
          "Rapid design sprints that produce interactive prototypes, validated through user feedback before a single line of production code is written.",
      },
      {
        step: "Core MVP Build",
        description:
          "Agile development sprints delivering working features every two weeks, with continuous stakeholder demos and feedback integration.",
      },
      {
        step: "Testing & Quality Assurance",
        description:
          "Automated testing suites, performance benchmarking, and security reviews to ensure your MVP is production-ready and bug-free.",
      },
      {
        step: "Deployment & Launch",
        description:
          "Seamless deployment to your cloud environment with monitoring, alerting, and rollback capabilities fully configured.",
      },
      {
        step: "Post-Launch Iteration",
        description:
          "Ongoing development sprints to add features, optimize performance, and scale based on real user behavior and feedback.",
      },
    ],
    technologies: [
      {
        name: "React & Next.js",
        description:
          "Modern web frameworks for building fast, SEO-friendly applications with server-side rendering and static generation capabilities",
      },
      {
        name: "Node.js & Go",
        description:
          "High-performance backend runtimes for building scalable APIs that handle thousands of concurrent connections efficiently",
      },
      {
        name: "PostgreSQL & Redis",
        description:
          "Robust relational database paired with in-memory caching for applications that need both data integrity and sub-millisecond response times",
      },
      {
        name: "AWS & Vercel",
        description:
          "Cloud platforms with pay-as-you-go pricing, auto-scaling, and global CDN distribution for maximum performance and cost efficiency",
      },
    ],
    whyYesBe: [
      {
        title: "Startup-Native Expertise",
        description:
          "We have built and scaled products from zero to thousands of users, understanding the unique technical and business challenges founders face.",
      },
      {
        title: "Cost-Conscious Development",
        description:
          "Our lean development methodology eliminates waste, prioritizes impact, and ensures every dollar of your budget drives measurable progress.",
      },
      {
        title: "Speed Without Sacrifice",
        description:
          "Rapid delivery timelines achieved through battle-tested patterns, reusable components, and streamlined workflows — not cutting corners.",
      },
      {
        title: "Growth-Ready Foundation",
        description:
          "We build with the future in mind, ensuring your initial investment creates a platform that scales with you rather than a ceiling you'll hit later.",
      },
    ],
    caseStudy: {
      title:
        "HealthTech MVP — From Concept to 5,000 Users in 10 Weeks",
      outcome:
        "Built a telehealth platform MVP that secured seed funding and onboarded 5,000 active users within the first quarter of launch.",
      metric: "10 weeks to launch",
    },
    faq: [
      {
        question: "How quickly can you deliver an MVP?",
        answer:
          "Most MVPs are delivered in 4-8 weeks depending on complexity. We use modular architectures and reusable components to accelerate development without sacrificing quality.",
      },
      {
        question: "Can you work with our existing codebase?",
        answer:
          "Absolutely. We regularly audit, refactor, and extend existing codebases. Whether you need to modernize legacy code or add new features to an active project, our team integrates smoothly.",
      },
      {
        question: "What happens after the MVP launches?",
        answer:
          "We offer ongoing development partnerships with flexible sprint-based engagement models. Most startups continue with 2-4 week迭代 cycles to add features, optimize performance, and scale infrastructure.",
      },
      {
        question: "How do you handle budget constraints?",
        answer:
          "We prioritize ruthlessly based on business impact. Our discovery phase identifies the highest-value features for your MVP, ensuring every dollar drives traction and validation.",
      },
    ],
    relatedSolutions: ["web-applications", "mobile-apps", "cloud-devops"],
  },

  // 2. SMEs
  {
    slug: "smes",
    title: "SMEs",
    icon: Briefcase,
    category: "Small & Medium Enterprises",
    description:
      "ERP, automation, and competitive tools that give small and medium businesses the technology power of enterprise software at a fraction of the cost.",
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop",
    overview:
      "Small and medium enterprises are the backbone of the global economy, yet most lack the technology infrastructure to compete with larger rivals. Our SME-focused solutions deliver enterprise-grade functionality — ERP systems, business automation, customer management, and data analytics — tailored to the budget, team size, and operational realities of growing businesses. We help SMEs punch above their weight with technology that drives efficiency, reduces waste, and unlocks new revenue channels.",
    whyNeeded:
      "SMEs that rely on spreadsheets, manual processes, and disconnected tools lose up to 30% of productive time to inefficiency. As competition intensifies and customer expectations rise, the gap between technology-enabled businesses and manual operators widens every year. Purpose-built SME solutions deliver the automation, visibility, and control that larger competitors take for granted — without the enterprise price tag.",
    challenges: [
      "Limited budgets require maximum ROI from every technology investment with no room for failed projects",
      "Staff wear multiple hats, making it critical that tools are intuitive and require minimal training",
      "Data is often scattered across spreadsheets, emails, and legacy systems with no single source of truth",
      "Scaling operations without adding proportionally more admin staff to manage growing complexity",
    ],
    features: [
      {
        title: "ERP Implementation",
        description:
          "Integrated enterprise resource planning systems that unify finance, inventory, HR, and operations into a single, authoritative platform.",
        icon: LayoutDashboard,
      },
      {
        title: "Business Process Automation",
        description:
          "Workflow automation that eliminates repetitive manual tasks, from invoice processing to employee onboarding to customer follow-ups.",
        icon: Workflow,
      },
      {
        title: "Customer Relationship Management",
        description:
          "Custom CRM solutions that centralize customer data, automate sales pipelines, and improve retention through targeted engagement.",
        icon: Users,
      },
      {
        title: "Financial Dashboards & Reporting",
        description:
          "Real-time financial visibility with automated reporting, cash flow tracking, and profit analysis that replaces monthly spreadsheet exercises.",
        icon: PieChart,
      },
      {
        title: "Inventory & Supply Chain Management",
        description:
          "Automated stock tracking, reorder alerts, and supplier management that prevent stockouts and reduce carrying costs.",
        icon: Boxes,
      },
      {
        title: "Digital Marketing Integration",
        description:
          "Marketing automation tools, email campaigns, and analytics dashboards that help SMEs compete for attention without a large marketing team.",
        icon: Megaphone,
      },
    ],
    benefits: [
      "Reduce operational costs by 25-40% through process automation and elimination of manual work",
      "Gain real-time visibility into every aspect of your business from a single dashboard",
      "Improve customer satisfaction and retention through faster response times and personalized service",
      "Scale operations smoothly without hiring additional administrative and management staff",
      "Make data-driven decisions with accurate, up-to-date financial and operational insights",
      "Compete effectively against larger rivals with enterprise-grade tools at SME-friendly pricing",
    ],
    process: [
      {
        step: "Business Assessment",
        description:
          "We audit your current processes, tools, and pain points to identify the highest-impact areas for technology intervention.",
      },
      {
        step: "Solution Architecture",
        description:
          "Our team designs a tailored technology roadmap that prioritizes quick wins and builds toward comprehensive digital transformation.",
      },
      {
        step: "Tool Selection & Configuration",
        description:
          "We evaluate, customize, and configure the best-fit platforms for your specific industry, size, and operational requirements.",
      },
      {
        step: "Data Migration & Integration",
        description:
          "Secure migration of existing data from spreadsheets, legacy systems, and scattered tools into unified, clean, accessible databases.",
      },
      {
        step: "Team Training & Onboarding",
        description:
          "Comprehensive training programs, documentation, and hands-on workshops to ensure smooth adoption across your entire organization.",
      },
      {
        step: "Go-Live & Stabilization",
        description:
          "Carefully managed deployment with parallel running, issue resolution, and close monitoring during the critical transition period.",
      },
      {
        step: "Optimization & Support",
        description:
          "Ongoing refinement, feature additions, and dedicated support to ensure your systems continue delivering value as your business evolves.",
      },
    ],
    technologies: [
      {
        name: "Odoo & ERPNext",
        description:
          "Open-source ERP platforms that deliver enterprise functionality with transparent pricing and full customization capabilities",
      },
      {
        name: "Airtable & Notion",
        description:
          "Flexible database and collaboration tools that bridge the gap between spreadsheets and full enterprise software",
      },
      {
        name: "HubSpot & Zoho",
        description:
          "All-in-one business platforms offering CRM, marketing automation, and customer support tools designed for growing teams",
      },
      {
        name: "Google Workspace & Microsoft 365",
        description:
          "Cloud-based productivity suites with integrated document management, collaboration, and communication tools",
      },
    ],
    whyYesBe: [
      {
        title: "SME-First Approach",
        description:
          "We design solutions for the reality of SME operations — limited budgets, small teams, and the need for immediate, tangible results.",
      },
      {
        title: "Rapid ROI Delivery",
        description:
          "Every recommendation is tied to measurable business outcomes. We prioritize implementations that pay for themselves within the first quarter.",
      },
      {
        title: "Training & Adoption Focus",
        description:
          "Technology is only valuable when people use it. Our comprehensive training ensures your team embraces new tools rather than reverting to old habits.",
      },
      {
        title: "Growth-Scalable Solutions",
        description:
          "We implement systems that grow with you — starting affordable and expanding functionality as your business matures and your needs become more complex.",
      },
    ],
    caseStudy: {
      title:
        "Manufacturing SME — ERP Transformation Across 3 Factories",
      outcome:
        "Unified three separate factory operations into a single ERP system, reducing inventory waste by 35% and improving order fulfillment speed by 50%.",
      metric: "35% waste reduction",
    },
    faq: [
      {
        question: "What is the minimum investment needed to get started?",
        answer:
          "We offer phased implementation plans starting from basic process automation that deliver immediate value. Many SMEs begin with a focused solution and expand as ROI materializes.",
      },
      {
        question: "Will the system integrate with tools we already use?",
        answer:
          "Yes. We build custom integrations and connectors to ensure your existing tools — accounting software, email platforms, industry-specific applications — work seamlessly with new systems.",
      },
      {
        question: "How long does a typical ERP implementation take?",
        answer:
          "A full ERP implementation typically takes 8-16 weeks depending on scope. We use agile methodology with regular checkpoints to ensure progress stays on track.",
      },
      {
        question: "Do you provide ongoing support after implementation?",
        answer:
          "We offer flexible support packages including bug fixes, feature enhancements, training refreshers, and performance optimization. Most clients transition to a monthly retainer after the initial project.",
      },
    ],
    relatedSolutions: ["erp-systems", "business-automation", "data-analytics"],
  },

  // 3. Large Enterprises
  {
    slug: "large-enterprises",
    title: "Large Enterprises",
    icon: Building2,
    category: "Enterprise Organizations",
    description:
      "System integration, legacy modernization, and custom AI tools that transform complex enterprise environments into agile, data-driven organizations.",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
    overview:
      "Large enterprises face a unique paradox: they have the resources to invest in transformative technology but are often constrained by legacy systems, complex organizational structures, and regulatory requirements. Our enterprise solutions are designed for this reality — we modernize legacy infrastructure, integrate disparate systems, deploy AI at scale, and build custom platforms that align with enterprise governance, security, and compliance standards.",
    whyNeeded:
      "Enterprises running on decades-old systems face escalating maintenance costs, security vulnerabilities, and an inability to compete with digitally native competitors. Modernization is not optional — it is existential. Purpose-built enterprise solutions bridge the gap between legacy infrastructure and modern capabilities, enabling organizations to unlock trapped data, automate complex workflows, and deliver the experiences that customers and employees now expect.",
    challenges: [
      "Legacy systems with critical business logic that cannot be simply replaced but must be carefully modernized",
      "Complex regulatory and compliance requirements that constrain technology choices and deployment approaches",
      "Organizational resistance to change across large teams with established workflows and institutional inertia",
      "Integration of dozens of disconnected systems, databases, and platforms into a cohesive technology ecosystem",
    ],
    features: [
      {
        title: "Legacy System Modernization",
        description:
          "Strategic modernization of monolithic legacy applications into cloud-native microservices architectures without disrupting ongoing business operations.",
        icon: RefreshCw,
      },
      {
        title: "Enterprise System Integration",
        description:
          "Middleware, API gateways, and integration platforms that connect ERP, CRM, HRIS, and custom systems into a unified data flow.",
        icon: Link2,
      },
      {
        title: "Custom Enterprise Software",
        description:
          "Purpose-built platforms for processes that off-the-shelf software cannot handle, designed with enterprise security, scalability, and governance from day one.",
        icon: Terminal,
      },
      {
        title: "AI & Machine Learning at Scale",
        description:
          "Enterprise AI deployments across departments — from fraud detection in finance to predictive maintenance in operations to personalized experiences in customer service.",
        icon: Brain,
      },
      {
        title: "Cloud Migration & Optimization",
        description:
          "Phased migration strategies that move critical workloads to cloud environments while managing risk, cost, and performance requirements.",
        icon: Cloud,
      },
      {
        title: "Enterprise Data Platforms",
        description:
          "Centralized data lakes, warehouses, and analytics platforms that break down silos and provide a single source of truth across the organization.",
        icon: Database,
      },
    ],
    benefits: [
      "Reduce legacy maintenance costs by 40-60% while improving system reliability and performance",
      "Break down data silos to enable cross-functional analytics and unified business intelligence",
      "Accelerate time-to-market for new products and services through modern development practices",
      "Improve security posture with cloud-native architectures and zero-trust security models",
      "Enable organizational agility with modular, loosely-coupled systems that adapt to changing requirements",
      "Unlock trapped data assets to power AI-driven insights and competitive advantages",
    ],
    process: [
      {
        step: "Enterprise Assessment & Audit",
        description:
          "Comprehensive evaluation of your technology landscape, including legacy systems, data flows, integration points, security posture, and organizational readiness.",
      },
      {
        step: "Strategic Roadmap Development",
        description:
          "A multi-phase modernization roadmap that balances quick wins with long-term transformation, aligned with business priorities and risk tolerance.",
      },
      {
        step: "Architecture Design & Governance",
        description:
          "Enterprise architecture blueprints that define standards, patterns, and governance frameworks for consistent, secure technology delivery.",
      },
      {
        step: "Phased Implementation",
        description:
          "Incremental delivery using agile-at-scale methodologies, with each phase delivering measurable value while building toward the target architecture.",
      },
      {
        step: "Integration & Data Migration",
        description:
          "Carefully orchestrated integration of new systems with existing infrastructure, including data migration with validation and rollback capabilities.",
      },
      {
        step: "Testing & Compliance Validation",
        description:
          "Rigorous testing including performance, security, compliance, and disaster recovery validation to meet enterprise standards and regulatory requirements.",
      },
      {
        step: "Deployment & Continuous Evolution",
        description:
          "Phased rollouts with comprehensive monitoring, followed by ongoing optimization, feature delivery, and architectural refinement.",
      },
    ],
    technologies: [
      {
        name: "Kubernetes & Docker",
        description:
          "Container orchestration platforms for deploying, scaling, and managing microservices across enterprise cloud environments",
      },
      {
        name: "Apache Kafka & RabbitMQ",
        description:
          "Enterprise message brokers and event streaming platforms for real-time data integration across distributed systems",
      },
      {
        name: "Snowflake & Databricks",
        description:
          "Cloud-native data platforms for enterprise data warehousing, analytics, and machine learning at petabyte scale",
      },
      {
        name: "Spring Boot & .NET Core",
        description:
          "Enterprise-grade application frameworks for building robust, scalable, and secure backend services and APIs",
      },
    ],
    whyYesBe: [
      {
        title: "Enterprise Delivery Experience",
        description:
          "We have delivered complex, multi-phase projects for organizations with thousands of employees, navigating the governance, compliance, and coordination challenges that enterprise scale demands.",
      },
      {
        title: "Legacy Modernization Expertise",
        description:
          "Our team specializes in the delicate art of modernizing legacy systems — preserving critical business logic while enabling modern capabilities and reducing technical debt.",
      },
      {
        title: "Security-First Architecture",
        description:
          "Every solution is built with enterprise security standards — role-based access control, encryption, audit logging, and compliance frameworks — from the ground up.",
      },
      {
        title: "Vendor-Agnostic Guidance",
        description:
          "We provide objective, vendor-neutral recommendations that prioritize your business needs over any single technology vendor's interests.",
      },
    ],
    caseStudy: {
      title:
        "Global Logistics Firm — Legacy-to-Cloud Migration",
      outcome:
        "Migrated a 15-year-old monolithic system to a microservices architecture on AWS, reducing infrastructure costs by 45% and deployment frequency from monthly to daily.",
      metric: "45% cost reduction",
    },
    faq: [
      {
        question: "How do you handle enterprise security requirements?",
        answer:
          "We implement defense-in-depth security including encryption at rest and in transit, RBAC, SOC 2 compliance patterns, penetration testing, and comprehensive audit logging. Every solution is reviewed against your specific security standards.",
      },
      {
        question: "Can you work alongside our internal IT team?",
        answer:
          "Absolutely. We frequently embed within enterprise IT organizations, augmenting existing teams with specialized skills while respecting established processes and governance structures.",
      },
      {
        question: "What about downtime during migration?",
        answer:
          "We use blue-green deployments, phased rollouts, and parallel running to ensure zero or minimal downtime during migrations. Every migration plan includes detailed rollback procedures and risk mitigation strategies.",
      },
      {
        question: "How long does enterprise modernization typically take?",
        answer:
          "Enterprise modernization is typically delivered in phases over 6-18 months. Each phase delivers independent value, allowing the business to realize ROI incrementally while building toward the complete transformation.",
      },
    ],
    relatedSolutions: ["custom-software", "cloud-devops", "database-management"],
  },

  // 4. Healthcare
  {
    slug: "healthcare",
    title: "Healthcare",
    icon: Heart,
    category: "Healthcare & Life Sciences",
    description:
      "Hospital systems, patient records, telemedicine, and compliance platforms that improve care delivery while meeting strict regulatory requirements.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    overview:
      "Healthcare technology solutions must balance innovation with uncompromising standards for patient safety, data privacy, and regulatory compliance. Our healthcare practice delivers HIPAA-compliant systems including electronic health records, telemedicine platforms, clinical workflow automation, and patient engagement tools. We work with hospitals, clinics, diagnostics labs, and health-tech startups to build technology that improves patient outcomes while reducing administrative burden on healthcare professionals.",
    whyNeeded:
      "Healthcare providers lose an estimated 15-20% of revenue to administrative inefficiency, while clinician burnout from poor technology systems contributes to staffing shortages. Meanwhile, patients increasingly expect digital-first experiences — from online appointment booking to virtual consultations to real-time access to their health data. Healthcare organizations that invest in purpose-built technology improve both operational efficiency and patient satisfaction.",
    challenges: [
      "Strict HIPAA, HITECH, and regional healthcare regulations that constrain technology choices and data handling practices",
      "Integration with complex hospital information systems, lab equipment, and pharmacy networks with varying standards",
      "Clinical workflows that demand reliability, speed, and accuracy — system failures can directly impact patient safety",
      "Resistance from healthcare professionals who are overwhelmed and have zero tolerance for cumbersome technology",
    ],
    features: [
      {
        title: "Electronic Health Records (EHR)",
        description:
          "HIPAA-compliant EHR systems that streamline clinical documentation, improve data accuracy, and provide instant access to complete patient histories.",
        icon: FileText,
      },
      {
        title: "Telemedicine Platforms",
        description:
          "Secure video consultation platforms with integrated scheduling, payment processing, prescription management, and multi-party support.",
        icon: Monitor,
      },
      {
        title: "Clinical Workflow Automation",
        description:
          "Automated patient intake, referral processing, appointment scheduling, and billing workflows that reduce administrative burden on clinical staff.",
        icon: Workflow,
      },
      {
        title: "Patient Engagement Portals",
        description:
          "Patient-facing portals for appointment booking, lab result viewing, medication reminders, secure messaging, and health record access.",
        icon: Smartphone,
      },
      {
        title: "Healthcare Data Analytics",
        description:
          "Population health dashboards, clinical outcomes tracking, and operational analytics that support evidence-based decision making.",
        icon: BarChart3,
      },
      {
        title: "Compliance & Security Systems",
        description:
          "Automated compliance monitoring, audit trail management, access controls, and breach detection systems that maintain regulatory adherence.",
        icon: Shield,
      },
    ],
    benefits: [
      "Reduce clinician documentation time by 30-50% through intelligent automation and voice-enabled workflows",
      "Improve patient satisfaction scores with seamless digital experiences and instant access to health information",
      "Achieve and maintain HIPAA compliance with built-in security controls and automated audit capabilities",
      "Decrease no-show rates by 25-40% with automated reminders, easy rescheduling, and telehealth alternatives",
      "Unlock clinical insights from patient data to improve outcomes and support population health management",
      "Reduce administrative costs by automating billing, coding, insurance verification, and claims processing",
    ],
    process: [
      {
        step: "Clinical Workflow Analysis",
        description:
          "We observe and map your current clinical and administrative workflows to identify bottlenecks, pain points, and high-impact improvement opportunities.",
      },
      {
        step: "Regulatory & Compliance Planning",
        description:
          "Our team maps all applicable regulations to technical requirements, ensuring every feature and data flow meets compliance standards from design through deployment.",
      },
      {
        step: "Solution Architecture",
        description:
          "We design a technical architecture that integrates with your existing hospital systems, lab equipment, and third-party platforms while maintaining data integrity.",
      },
      {
        step: "Development & Clinical Testing",
        description:
          "Iterative development with healthcare professional involvement at every stage, including clinical workflow validation and usability testing.",
      },
      {
        step: "Security & Compliance Audit",
        description:
          "Comprehensive security assessment, penetration testing, and compliance validation before any system touches patient data.",
      },
      {
        step: "Phased Deployment & Training",
        description:
          "Carefully managed rollout with department-by-department deployment, role-specific training, and 24/7 support during the transition period.",
      },
      {
        step: "Ongoing Optimization & Compliance",
        description:
          "Continuous system optimization, regulatory updates, and performance monitoring to ensure the platform evolves with changing healthcare standards.",
      },
    ],
    technologies: [
      {
        name: "FHIR & HL7 Standards",
        description:
          "Healthcare interoperability standards for seamless data exchange between clinical systems, labs, pharmacies, and patient applications",
      },
      {
        name: "AWS GovCloud & Azure Healthcare",
        description:
          "HIPAA-eligible cloud environments with BAA support, encryption, and compliance certifications for hosting sensitive health data",
      },
      {
        name: "Twilio & Agora",
        description:
          "HIPAA-compliant communication APIs for secure video consultations, patient messaging, and automated appointment reminders",
      },
      {
        name: "PostgreSQL & MongoDB",
        description:
          "HIPAA-compliant databases with encryption at rest, access controls, and audit logging for electronic health records and clinical data",
      },
    ],
    whyYesBe: [
      {
        title: "Healthcare Domain Expertise",
        description:
          "We understand the unique intersection of clinical needs, regulatory requirements, and technology constraints that define healthcare IT projects.",
      },
      {
        title: "Compliance-First Development",
        description:
          "Every solution is built with HIPAA, HITECH, and relevant regulations as foundational requirements, not afterthoughts — reducing compliance risk and audit burden.",
      },
      {
        title: "Clinician-Centric Design",
        description:
          "We design for the reality of clinical workflows — fast, intuitive interfaces that save time rather than creating friction for busy healthcare professionals.",
      },
      {
        title: "Proven Healthcare Delivery",
        description:
          "Our portfolio includes EHR implementations, telemedicine platforms, and clinical analytics systems delivered on time and within budget for healthcare organizations.",
      },
    ],
    caseStudy: {
      title:
        "Multi-Specialty Hospital — Telemedicine & EHR Integration",
      outcome:
        "Deployed an integrated telemedicine and EHR system across 12 departments, reducing average patient wait times by 40% and enabling 500+ virtual consultations per week.",
      metric: "500+ weekly teleconsultations",
    },
    faq: [
      {
        question: "Are your solutions HIPAA compliant?",
        answer:
          "Yes. HIPAA compliance is built into every layer of our healthcare solutions — from data encryption and access controls to audit logging and BAA agreements with all cloud providers.",
      },
      {
        question: "Can you integrate with our existing EHR system?",
        answer:
          "We have extensive experience integrating with major EHR platforms including Epic, Cerner, and Allscripts using HL7 FHIR standards. We also build custom interfaces for proprietary systems.",
      },
      {
        question: "How do you handle patient data during development?",
        answer:
          "We use de-identified synthetic data for development and testing environments. All team members undergo HIPAA training, and we maintain strict data handling protocols throughout every project.",
      },
      {
        question: "What ongoing support do you provide?",
        answer:
          "We offer dedicated healthcare support packages including 24/7 monitoring, security patch management, regulatory update implementation, feature enhancements, and clinical workflow optimization.",
      },
    ],
    relatedSolutions: ["custom-software", "ai-solutions", "cloud-devops"],
  },

  // 5. Education
  {
    slug: "education",
    title: "Education",
    icon: GraduationCap,
    category: "Education & EdTech",
    description:
      "School ERP, student management, e-learning platforms, and exam systems that modernize education delivery and streamline institutional operations.",
    heroImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
    overview:
      "Education institutions — from K-12 schools to universities to training centers — need technology that serves two distinct audiences: students who expect modern digital learning experiences, and administrators who need efficient tools to manage enrollments, finances, academics, and compliance. Our education solutions bridge this gap with integrated platforms that handle everything from student information systems and learning management to virtual classrooms and assessment engines.",
    whyNeeded:
      "The education sector faces a digital transformation imperative accelerated by recent global events. Students expect anywhere, anytime learning experiences, while administrators struggle with manual processes for enrollment, grading, scheduling, and reporting. Institutions that invest in modern education technology see improved student outcomes, reduced administrative overhead, and stronger competitive positioning in an increasingly crowded market.",
    challenges: [
      "Diverse stakeholder needs — students, teachers, administrators, and parents all require different interfaces and capabilities",
      "Strict data privacy regulations including FERPA, COPPA, and regional student data protection laws",
      "Integration with legacy academic systems, government reporting platforms, and third-party content providers",
      "Ensuring equitable access and accessibility compliance for students with disabilities and limited connectivity",
    ],
    features: [
      {
        title: "Student Information Systems",
        description:
          "Comprehensive SIS platforms managing enrollments, attendance, grading, transcripts, scheduling, and academic records in a centralized system.",
        icon: Users,
      },
      {
        title: "Learning Management Systems",
        description:
          "Custom LMS platforms with course authoring, content delivery, progress tracking, discussion forums, and assessment capabilities.",
        icon: GraduationCap,
      },
      {
        title: "Virtual Classroom Solutions",
        description:
          "Live video classrooms with screen sharing, interactive whiteboards, breakout rooms, attendance tracking, and session recording.",
        icon: Monitor,
      },
      {
        title: "Examination & Assessment Engines",
        description:
          "Online exam platforms with anti-cheating measures, auto-grading, item analysis, and adaptive testing capabilities.",
        icon: FileText,
      },
      {
        title: "School Administration ERP",
        description:
          "End-to-end institutional management covering finance, HR, procurement, facility management, and regulatory reporting.",
        icon: LayoutDashboard,
      },
      {
        title: "Parent & Student Portals",
        description:
          "Engaging portals for grades, attendance, fee payments, communication, and academic progress tracking accessible from any device.",
        icon: Smartphone,
      },
    ],
    benefits: [
      "Reduce administrative workload by 40-60% through automated enrollment, grading, and reporting processes",
      "Improve student engagement and outcomes with interactive digital learning experiences and personalized pathways",
      "Enable remote and hybrid learning models that extend institutional reach beyond physical campus boundaries",
      "Achieve regulatory compliance with FERPA, COPPA, and regional data protection requirements built into the platform",
      "Provide real-time visibility to parents, teachers, and administrators through role-based dashboards and notifications",
      "Streamline financial operations with automated fee collection, payroll, budgeting, and audit trail management",
    ],
    process: [
      {
        step: "Institutional Needs Assessment",
        description:
          "We map stakeholder requirements across students, faculty, administrators, and parents to understand the complete technology landscape.",
      },
      {
        step: "Academic Process Mapping",
        description:
          "Detailed analysis of academic workflows — from enrollment through graduation — to identify automation opportunities and integration points.",
      },
      {
        step: "Platform Architecture Design",
        description:
          "We design a modular platform architecture that can be deployed in phases, starting with the highest-priority modules and expanding over time.",
      },
      {
        step: "Development & Content Migration",
        description:
          "Agile development of custom modules alongside migration of existing academic data, content, and historical records.",
      },
      {
        step: "Accessibility & Compliance Review",
        description:
          "Thorough accessibility testing against WCAG standards and compliance verification against FERPA, COPPA, and regional regulations.",
      },
      {
        step: "Pilot Deployment & Training",
        description:
          "Limited pilot deployment with selected departments or grade levels, comprehensive training programs, and feedback collection.",
      },
      {
        step: "Full Rollout & Continuous Improvement",
        description:
          "Institution-wide deployment with ongoing support, feature development based on user feedback, and seasonal updates aligned with academic calendars.",
      },
    ],
    technologies: [
      {
        name: "Moodle & Canvas",
        description:
          "Open-source and enterprise learning management systems for course delivery, assessment, and academic content management",
      },
      {
        name: "WebRTC & Jitsi",
        description:
          "Real-time communication technologies for live video classrooms, office hours, and virtual events with low-latency global distribution",
      },
      {
        name: "React & Flutter",
        description:
          "Modern frontend frameworks for building responsive web and mobile applications that work across devices and accessibility needs",
      },
      {
        name: "PostgreSQL & Elasticsearch",
        description:
          "Robust data storage with full-text search capabilities for academic records, course catalogs, and content libraries",
      },
    ],
    whyYesBe: [
      {
        title: "Education Domain Knowledge",
        description:
          "We understand the unique rhythms of educational institutions — academic calendars, enrollment cycles, examination periods, and the diverse needs of all stakeholders.",
      },
      {
        title: "Student-Centric Design Philosophy",
        description:
          "Every interface is designed with the end learner in mind, prioritizing accessibility, engagement, and intuitive navigation for users of all ages and technical abilities.",
      },
      {
        title: "Scalable Deployment Models",
        description:
          "Whether you need a single-campus system or a multi-institution platform, our solutions scale to serve hundreds or hundreds of thousands of users.",
      },
      {
        title: "Compliance & Privacy Expertise",
        description:
          "We build FERPA-compliant systems with data handling practices that protect student privacy while enabling the analytics and reporting institutions need.",
      },
    ],
    caseStudy: {
      title:
        "University Network — Unified Student Management Platform",
      outcome:
        "Consolidated 8 separate campus systems into a unified student management platform serving 25,000 students, reducing administrative processing time by 60%.",
      metric: "60% faster administration",
    },
    faq: [
      {
        question: "Can you integrate with our existing LMS or SIS?",
        answer:
          "Yes. We build integrations with all major platforms including Moodle, Canvas, PowerSchool, Banner, and PeopleSoft using standard APIs and data exchange formats.",
      },
      {
        question: "How do you handle student data privacy?",
        answer:
          "All our education solutions are built FERPA and COPPA compliant from the ground up. We implement role-based access controls, encryption, consent management, and audit logging.",
      },
      {
        question: "Can the platform support multiple campuses or institutions?",
        answer:
          "Absolutely. Our multi-tenant architecture supports multi-campus deployments with shared infrastructure and configurable features per institution, campus, or department.",
      },
      {
        question: "Do you provide training for non-technical staff?",
        answer:
          "Yes. We offer comprehensive training programs tailored to different user roles — administrators, teachers, students, and parents — with video tutorials, documentation, and hands-on workshops.",
      },
    ],
    relatedSolutions: ["web-applications", "custom-software", "data-analytics"],
  },

  // 6. Retail
  {
    slug: "retail",
    title: "Retail",
    icon: ShoppingBag,
    category: "Retail & E-Commerce",
    description:
      "POS systems, inventory management, e-commerce platforms, and customer loyalty programs that unify the shopping experience across every channel.",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    overview:
      "Modern retail operates across an expanding array of channels — physical stores, online shops, mobile apps, social commerce, and marketplaces — and customers expect a seamless experience across all of them. Our retail technology solutions connect point-of-sale systems, inventory management, e-commerce platforms, and customer engagement tools into a unified ecosystem. We help retailers of all sizes deliver omnichannel experiences, optimize operations, and build lasting customer relationships through data-driven personalization.",
    whyNeeded:
      "Retail margins are shrinking while customer expectations are rising. Retailers who cannot unify their channels, personalize experiences, and optimize inventory in real-time lose sales to competitors who can. Purpose-built retail technology transforms disconnected touchpoints into a cohesive commerce engine that maximizes revenue per customer while minimizing operational waste.",
    challenges: [
      "Omnichannel synchronization — keeping inventory, pricing, and promotions consistent across physical and digital touchpoints",
      "Real-time inventory visibility across warehouses, stores, and fulfillment centers to prevent stockouts and overstock",
      "Customer data fragmentation with purchase history, preferences, and engagement scattered across multiple systems",
      "Scaling infrastructure to handle peak traffic events like flash sales, holiday seasons, and viral product moments",
    ],
    features: [
      {
        title: "Point of Sale Systems",
        description:
          "Modern POS platforms with touch interfaces, barcode scanning, payment processing, receipt management, and real-time inventory updates.",
        icon: CreditCard,
      },
      {
        title: "E-Commerce Platforms",
        description:
          "Custom online stores with product catalogs, shopping carts, secure checkout, payment gateway integration, and mobile-optimized designs.",
        icon: Globe,
      },
      {
        title: "Inventory Management",
        description:
          "Real-time inventory tracking across all locations with automated reorder points, stock transfer management, and demand forecasting.",
        icon: Package,
      },
      {
        title: "Customer Loyalty Programs",
        description:
          "Loyalty and rewards platforms with points tracking, tiered benefits, personalized offers, and multi-channel redemption capabilities.",
        icon: Award,
      },
      {
        title: "Omnichannel Integration",
        description:
          "Unified commerce layer connecting in-store, online, and mobile channels with shared inventory, pricing, and customer profiles.",
        icon: Waypoints,
      },
      {
        title: "Retail Analytics & Insights",
        description:
          "Sales dashboards, customer behavior analytics, product performance tracking, and demand forecasting powered by real-time data.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Increase revenue per customer by 15-25% through personalized recommendations and targeted loyalty incentives",
      "Reduce stockouts by 30-50% with real-time inventory visibility and automated replenishment triggers",
      "Deliver a seamless omnichannel experience that meets modern customer expectations for consistency and convenience",
      "Optimize pricing and promotions with data-driven insights into customer behavior and competitive dynamics",
      "Minimize shrinkage and waste through accurate inventory tracking and loss prevention analytics",
      "Scale effortlessly during peak seasons with cloud infrastructure designed for traffic spikes and flash sales",
    ],
    process: [
      {
        step: "Retail Operations Audit",
        description:
          "We analyze your current technology stack, customer journey, inventory flows, and pain points to identify the highest-impact improvement opportunities.",
      },
      {
        step: "Omnichannel Strategy Design",
        description:
          "Our team designs a unified commerce architecture that connects all sales channels, back-office systems, and customer touchpoints.",
      },
      {
        step: "Platform Selection & Customization",
        description:
          "We evaluate and customize the best-fit POS, e-commerce, and inventory platforms for your specific retail segment and operational model.",
      },
      {
        step: "Integration & Data Migration",
        description:
          "Seamless integration of new platforms with existing payment processors, accounting systems, and supplier networks, including historical data migration.",
      },
      {
        step: "Testing & Quality Assurance",
        description:
          "End-to-end testing across all channels including payment processing, inventory synchronization, and customer data consistency.",
      },
      {
        step: "Deployment & Staff Training",
        description:
          "Phased rollout with in-store and online deployment, comprehensive staff training, and real-time support during the critical launch period.",
      },
      {
        step: "Optimization & Growth",
        description:
          "Ongoing performance optimization, feature development, and strategic guidance to continuously improve your retail technology ecosystem.",
      },
    ],
    technologies: [
      {
        name: "Shopify & WooCommerce",
        description:
          "Leading e-commerce platforms for building scalable online stores with extensive plugin ecosystems and payment gateway support",
      },
      {
        name: "Square & Lightspeed POS",
        description:
          "Modern point-of-sale systems with inventory management, analytics, and multi-location support for physical retail operations",
      },
      {
        name: "Stripe & PayPal",
        description:
          "Secure payment processing platforms supporting credit cards, digital wallets, buy-now-pay-later, and international payment methods",
      },
      {
        name: "Redis & Elasticsearch",
        description:
          "High-performance caching and search engines for fast product discovery, real-time inventory checks, and personalized recommendations",
      },
    ],
    whyYesBe: [
      {
        title: "Retail Domain Expertise",
        description:
          "We understand the unique dynamics of retail — from seasonal demand patterns to omnichannel complexity to the critical importance of customer experience.",
      },
      {
        title: "End-to-End Commerce Solutions",
        description:
          "We deliver complete retail technology ecosystems — not just isolated components — ensuring every system works together seamlessly from POS to analytics.",
      },
      {
        title: "Performance at Scale",
        description:
          "Our retail platforms are built to handle traffic spikes, flash sales, and holiday rushes without degraded performance or lost revenue.",
      },
      {
        title: "Data-Driven Approach",
        description:
          "Every recommendation is backed by data. We instrument analytics from day one, enabling continuous optimization based on real customer behavior.",
      },
    ],
    caseStudy: {
      title:
        "Fashion Retailer — Omnichannel Transformation",
      outcome:
        "Unified 15 physical stores with e-commerce, enabling buy-online-pickup-in-store and real-time inventory across all channels, increasing revenue by 28%.",
      metric: "28% revenue increase",
    },
    faq: [
      {
        question: "Can you integrate with our existing POS system?",
        answer:
          "Yes. We build integrations with virtually all major POS systems including Square, Lightspeed, Clover, and custom POS platforms through available APIs.",
      },
      {
        question: "How do you handle inventory across multiple locations?",
        answer:
          "Our inventory management solutions provide real-time visibility across all locations with automated stock transfers, inter-store fulfillment, and centralized demand forecasting.",
      },
      {
        question: "Do you support international e-commerce?",
        answer:
          "Yes. We build multi-currency, multi-language e-commerce platforms with international payment gateways, tax calculation, and shipping integration.",
      },
      {
        question: "What about PCI compliance for payments?",
        answer:
          "All payment integrations are PCI DSS compliant. We use tokenization, never store raw card data, and work with certified payment processors to ensure full compliance.",
      },
    ],
    relatedSolutions: ["ecommerce", "data-analytics", "mobile-apps"],
  },

  // 7. Manufacturing
  {
    slug: "manufacturing",
    title: "Manufacturing",
    icon: Factory,
    category: "Manufacturing & Industrial",
    description:
      "Production planning, supply chain optimization, quality control, and IoT automation that transform factories into smart, data-driven operations.",
    heroImage:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&h=600&fit=crop",
    overview:
      "Manufacturing is undergoing its fourth industrial revolution, where IoT sensors, real-time data analytics, and automation are transforming traditional factories into smart, connected operations. Our manufacturing technology solutions connect production lines, supply chains, quality systems, and enterprise resource planning into an integrated digital ecosystem. We help manufacturers reduce downtime, improve quality, optimize inventory, and gain real-time visibility across their entire operation.",
    whyNeeded:
      "Manufacturers face intense pressure to reduce costs, improve quality, and shorten lead times while managing increasingly complex supply chains. Unplanned downtime alone costs the average manufacturer $260,000 per hour. Purpose-built manufacturing technology — from IoT-enabled production monitoring to AI-powered quality inspection to predictive maintenance — delivers the visibility and automation needed to compete in modern industrial markets.",
    challenges: [
      "Connecting legacy production equipment and OT systems with modern IT infrastructure and analytics platforms",
      "Real-time quality control at production speeds that manual inspection cannot match",
      "Complex supply chain management with multiple tiers of suppliers, variable lead times, and demand volatility",
      "Predictive maintenance that prevents costly unplanned downtime without over-maintaining equipment",
    ],
    features: [
      {
        title: "Production Monitoring & MES",
        description:
          "Manufacturing execution systems that provide real-time visibility into production line performance, cycle times, and throughput metrics.",
        icon: Activity,
      },
      {
        title: "Supply Chain Management",
        description:
          "End-to-end supply chain platforms with supplier management, procurement automation, demand planning, and logistics coordination.",
        icon: Boxes,
      },
      {
        title: "Quality Control Systems",
        description:
          "Automated quality inspection using computer vision, statistical process control dashboards, and non-conformance tracking and resolution.",
        icon: CheckCircle,
      },
      {
        title: "Predictive Maintenance",
        description:
          "IoT sensor-driven maintenance systems that predict equipment failures before they occur, optimizing maintenance schedules and reducing unplanned downtime.",
        icon: Wrench,
      },
      {
        title: "IoT & Sensor Integration",
        description:
          "Industrial IoT platforms connecting production equipment, environmental sensors, and energy meters to central monitoring and analytics systems.",
        icon: Cpu,
      },
      {
        title: "Manufacturing Analytics",
        description:
          "OEE dashboards, production trend analysis, energy consumption tracking, and cost-per-unit analytics for data-driven operational decisions.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Reduce unplanned downtime by 30-50% through predictive maintenance and real-time equipment monitoring",
      "Improve product quality and reduce scrap rates with automated inspection and statistical process control",
      "Optimize inventory levels across raw materials, work-in-progress, and finished goods to reduce carrying costs",
      "Gain end-to-end supply chain visibility to anticipate disruptions and respond proactively",
      "Increase overall equipment effectiveness (OEE) by 10-20% through data-driven process optimization",
      "Enable just-in-time manufacturing with real-time demand signals and production scheduling",
    ],
    process: [
      {
        step: "Factory Floor Assessment",
        description:
          "We walk the production floor, map processes, identify bottlenecks, and evaluate the current state of OT/IT integration and data availability.",
      },
      {
        step: "IoT Infrastructure Design",
        description:
          "Our team designs sensor placement, connectivity architecture, and edge computing infrastructure for reliable, low-latency data collection.",
      },
      {
        step: "Platform Architecture & Selection",
        description:
          "We select and configure the right MES, SCADA, and analytics platforms for your production environment and operational requirements.",
      },
      {
        step: "Integration & Data Pipeline",
        description:
          "Building connections between production equipment, sensor networks, ERP systems, and analytics platforms for seamless data flow.",
      },
      {
        step: "Pilot Line Implementation",
        description:
          "Limited deployment on a single production line to validate technology choices, calibrate sensors, and demonstrate ROI before full rollout.",
      },
      {
        step: "Full Production Deployment",
        description:
          "Phased deployment across all production lines with operator training, change management, and 24/7 support during the transition.",
      },
      {
        step: "Optimization & Advanced Analytics",
        description:
          "Continuous refinement of predictive models, process optimization algorithms, and dashboard capabilities as data accumulates.",
      },
    ],
    technologies: [
      {
        name: "MQTT & OPC UA",
        description:
          "Industrial communication protocols for reliable sensor data collection and equipment integration in factory environments",
      },
      {
        name: "AWS IoT & Azure IoT Hub",
        description:
          "Cloud IoT platforms for device management, data ingestion, edge computing, and industrial analytics at scale",
      },
      {
        name: "Grafana & InfluxDB",
        description:
          "Real-time monitoring and time-series database solutions for production dashboards, sensor visualization, and historical trend analysis",
      },
      {
        name: "TensorFlow & OpenCV",
        description:
          "Machine learning and computer vision frameworks for automated quality inspection, defect detection, and visual process monitoring",
      },
    ],
    whyYesBe: [
      {
        title: "Manufacturing Domain Knowledge",
        description:
          "We understand production environments — from discrete manufacturing to process industries — including the unique constraints and opportunities of each.",
      },
      {
        title: "OT/IT Integration Expertise",
        description:
          "We bridge the gap between operational technology on the factory floor and information technology in the enterprise, a critical skill many IT providers lack.",
      },
      {
        title: "ROI-Driven Implementation",
        description:
          "Every manufacturing solution we deliver is tied to measurable outcomes — reduced downtime, improved OEE, lower scrap rates, or faster throughput.",
      },
      {
        title: "Scalable IoT Architecture",
        description:
          "Our IoT platforms start with a single production line and scale to multi-facility deployments, protecting your initial investment as capabilities grow.",
      },
    ],
    caseStudy: {
      title:
        "Automotive Parts Manufacturer — Predictive Maintenance System",
      outcome:
        "Deployed IoT sensors across 200+ machines with predictive maintenance AI that reduced unplanned downtime by 45% and saved $2.3M annually in maintenance costs.",
      metric: "$2.3M annual savings",
    },
    faq: [
      {
        question: "Can you connect to our existing production equipment?",
        answer:
          "Yes. We work with equipment from all major manufacturers and eras, using protocol converters, OPC UA gateways, and custom interfaces to connect even legacy machinery to modern monitoring systems.",
      },
      {
        question: "How long does a typical IoT deployment take?",
        answer:
          "A pilot deployment on a single production line typically takes 8-12 weeks. Full factory deployment follows over 3-6 months, with each phase delivering independent value.",
      },
      {
        question: "What about network reliability on the factory floor?",
        answer:
          "We design for industrial environments with edge computing capabilities that continue operating even if cloud connectivity is temporarily lost, with automatic data synchronization when connectivity resumes.",
      },
      {
        question: "Do you support Industry 4.0 and Smart Factory initiatives?",
        answer:
          "Absolutely. Our solutions align with Industry 4.0 principles including cyber-physical systems, IoT integration, cloud-edge architectures, and real-time analytics for smart factory transformation.",
      },
    ],
    relatedSolutions: ["data-analytics", "cloud-devops", "ai-solutions"],
  },

  // 8. Logistics
  {
    slug: "logistics",
    title: "Logistics",
    icon: Truck,
    category: "Logistics & Supply Chain",
    description:
      "Fleet management, warehouse optimization, real-time tracking, and route planning systems that maximize delivery efficiency and customer satisfaction.",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop",
    overview:
      "Logistics is a game of precision where minutes of delay, miles of detour, or units of waste translate directly into lost revenue and dissatisfied customers. Our logistics technology solutions provide end-to-end visibility across fleet operations, warehouse management, last-mile delivery, and supply chain coordination. We build real-time tracking platforms, intelligent route optimization systems, and warehouse automation tools that help logistics companies deliver more, faster, and at lower cost.",
    whyNeeded:
      "The logistics industry operates on razor-thin margins where efficiency gains translate directly to profitability. Manual dispatch, paper-based processes, and disconnected systems create blind spots that cost thousands daily in fuel waste, delayed deliveries, and unhappy customers. Purpose-built logistics technology delivers the real-time visibility, automation, and intelligence needed to compete in an era of same-day delivery expectations and global supply chain complexity.",
    challenges: [
      "Real-time visibility across fleet vehicles, warehouses, and in-transit shipments across geographically dispersed operations",
      "Route optimization that accounts for traffic, weather, delivery windows, vehicle capacity, and driver regulations simultaneously",
      "Warehouse efficiency — picking, packing, and shipping accuracy at scale with minimal labor costs",
      "Customer expectations for real-time tracking, precise delivery windows, and proactive communication",
    ],
    features: [
      {
        title: "Fleet Management Systems",
        description:
          "GPS tracking, vehicle diagnostics, driver behavior monitoring, fuel management, and maintenance scheduling for entire vehicle fleets.",
        icon: Truck,
      },
      {
        title: "Route Optimization",
        description:
          "AI-powered route planning that considers traffic patterns, delivery windows, vehicle capacity, driver hours, and multi-stop optimization.",
        icon: Waypoints,
      },
      {
        title: "Warehouse Management Systems",
        description:
          "WMS platforms with inventory tracking, pick-path optimization, wave planning, barcode scanning, and dock management capabilities.",
        icon: Boxes,
      },
      {
        title: "Last-Mile Delivery Platforms",
        description:
          "Customer-facing delivery tracking, proof of delivery, driver assignment, and real-time ETA communication systems.",
        icon: MapPin,
      },
      {
        title: "Supply Chain Visibility",
        description:
          "End-to-end supply chain dashboards tracking shipments from origin to destination with predictive ETAs and exception alerts.",
        icon: Eye,
      },
      {
        title: "Logistics Analytics",
        description:
          "Cost-per-delivery analysis, KPI dashboards, carrier performance tracking, and demand forecasting for logistics operations.",
        icon: BarChart3,
      },
    ],
    benefits: [
      "Reduce fuel costs by 15-25% through intelligent route optimization and driver behavior monitoring",
      "Improve on-time delivery rates to 95%+ with real-time tracking and proactive exception management",
      "Increase warehouse throughput by 20-30% with optimized pick paths and automated inventory management",
      "Enhance customer satisfaction with real-time tracking, accurate ETAs, and proactive delivery notifications",
      "Minimize vehicle downtime with predictive maintenance scheduling based on real usage data",
      "Gain complete operational visibility to identify bottlenecks, reduce waste, and optimize resource allocation",
    ],
    process: [
      {
        step: "Operations Assessment",
        description:
          "We analyze your current logistics workflows, technology stack, fleet composition, and warehouse operations to identify improvement opportunities.",
      },
      {
        step: "Solution Architecture",
        description:
          "Our team designs an integrated logistics platform connecting fleet, warehouse, and delivery operations into a unified system.",
      },
      {
        step: "Fleet & IoT Deployment",
        description:
          "Installation of GPS trackers, telematics devices, and driver mobile apps with configuration of monitoring rules and alert thresholds.",
      },
      {
        step: "Platform Development & Integration",
        description:
          "Building the core management platforms with integrations to existing ERP, accounting, and customer communication systems.",
      },
      {
        step: "Route Optimization Configuration",
        description:
          "Calibrating route optimization algorithms with your specific constraints — delivery windows, vehicle types, driver regulations, and customer priorities.",
      },
      {
        step: "Testing & Pilot Operations",
        description:
          "Controlled pilot deployment with a subset of vehicles and routes to validate performance, accuracy, and user adoption.",
      },
      {
        step: "Full Deployment & Optimization",
        description:
          "Organization-wide rollout with ongoing performance tuning, algorithm refinement, and feature expansion based on operational data.",
      },
    ],
    technologies: [
      {
        name: "GPS & Telematics APIs",
        description:
          "Real-time vehicle tracking, geofencing, and telematics data collection for fleet management and driver behavior monitoring",
      },
      {
        name: "Google Maps & Mapbox",
        description:
          "Mapping platforms with traffic data, routing APIs, and geocoding services for logistics planning and real-time navigation",
      },
      {
        name: "Apache Kafka & MQTT",
        description:
          "Real-time event streaming for processing high-volume telemetry data from vehicles, warehouse sensors, and delivery systems",
      },
      {
        name: "PostgreSQL & TimescaleDB",
        description:
          "Relational and time-series databases optimized for storing and querying logistics data, GPS tracks, and operational metrics",
      },
    ],
    whyYesBe: [
      {
        title: "Logistics Industry Expertise",
        description:
          "We understand the complex dynamics of logistics operations — from multi-modal transportation to last-mile challenges to warehouse optimization.",
      },
      {
        title: "Real-Time Systems Capability",
        description:
          "Logistics demands real-time responsiveness. Our systems process GPS data, inventory updates, and delivery events in seconds, not minutes.",
      },
      {
        title: "End-to-End Integration",
        description:
          "We connect fleet management, warehouse systems, and delivery platforms into a cohesive ecosystem, eliminating the blind spots that plague fragmented operations.",
      },
      {
        title: "Measurable Cost Impact",
        description:
          "Every logistics solution we deliver is measured in concrete savings — fuel reduction, delivery improvement, labor efficiency, and customer retention.",
      },
    ],
    caseStudy: {
      title:
        "Regional Delivery Network — Fleet Optimization Platform",
      outcome:
        "Deployed route optimization and fleet tracking across 300+ vehicles, reducing fuel costs by 22%, improving on-time delivery to 97%, and cutting customer complaints by 60%.",
      metric: "22% fuel cost reduction",
    },
    faq: [
      {
        question: "Can you work with our existing fleet tracking hardware?",
        answer:
          "Yes. We integrate with most major GPS and telematics hardware providers. If your existing devices support data export, we can build your management platform around them.",
      },
      {
        question: "How accurate are your route optimization algorithms?",
        answer:
          "Our route optimization considers 15+ variables including real-time traffic, delivery windows, vehicle capacity, and driver hours. Clients typically see 15-25% fuel reduction in the first quarter.",
      },
      {
        question: "Do you support cold chain and specialized logistics?",
        answer:
          "Yes. We build temperature monitoring, compliance tracking, and specialized handling workflows for cold chain, hazmat, and other regulated logistics operations.",
      },
      {
        question: "Can customers track their deliveries in real-time?",
        answer:
          "Absolutely. We build customer-facing tracking portals and mobile apps with real-time GPS updates, accurate ETAs, delivery notifications, and proof-of-delivery capture.",
      },
    ],
    relatedSolutions: ["custom-software", "data-analytics", "mobile-apps"],
  },

  // 9. Hospitality
  {
    slug: "hospitality",
    title: "Hospitality",
    icon: Utensils,
    category: "Hospitality & Food Service",
    description:
      "Restaurant management, hotel operations, reservation systems, and guest experience platforms that elevate service quality and operational efficiency.",
    heroImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop",
    overview:
      "Hospitality thrives on exceptional guest experiences, yet most operators struggle with outdated technology that creates friction instead of delight. Our hospitality technology solutions cover restaurant management systems, hotel operations platforms, reservation and booking engines, kitchen display systems, and guest engagement tools. We help restaurants, hotels, cafes, and catering companies deliver memorable experiences through technology that streamlines operations and deepens customer relationships.",
    whyNeeded:
      "The hospitality industry operates on razor-thin margins where a 1% improvement in table utilization or a 5-point increase in guest satisfaction scores can mean the difference between profit and loss. Manual processes, disconnected systems, and poor data visibility prevent operators from optimizing their most valuable resources — tables, rooms, staff, and ingredients. Purpose-built hospitality technology turns these challenges into competitive advantages.",
    challenges: [
      "Managing peak demand periods with dynamic seating, reservation balancing, and staff allocation in real time",
      "Inventory waste in food service — perishable ingredients require precise demand forecasting and portion control",
      "Guest experience consistency across locations, shifts, and seasonal staff variations",
      "Integration between front-of-house systems, kitchen operations, and back-office management",
    ],
    features: [
      {
        title: "Restaurant Management Systems",
        description:
          "Comprehensive POS and management platforms with table management, order routing, menu engineering, and real-time sales analytics.",
        icon: Utensils,
      },
      {
        title: "Reservation & Booking Engines",
        description:
          "Online reservation platforms with waitlist management, table optimization, party size balancing, and automated confirmations.",
        icon: Calendar,
      },
      {
        title: "Hotel Property Management",
        description:
          "PMS platforms handling check-in/check-out, room assignments, housekeeping schedules, guest requests, and night audit automation.",
        icon: Building2,
      },
      {
        title: "Kitchen Display Systems",
        description:
          "Digital kitchen management with order queuing, preparation timing, course firing, and real-time communication between front and back of house.",
        icon: Monitor,
      },
      {
        title: "Guest Experience Platforms",
        description:
          "CRM-driven guest engagement with personalized recommendations, feedback collection, loyalty programs, and multi-channel communication.",
        icon: MessageCircle,
      },
      {
        title: "Inventory & Cost Control",
        description:
          "Food cost management with ingredient tracking, recipe costing, waste monitoring, purchase ordering, and supplier management.",
        icon: Package,
      },
    ],
    benefits: [
      "Increase table turnover by 15-20% through intelligent reservation management and table optimization",
      "Reduce food waste by 25-35% with demand forecasting, portion control analytics, and automated ordering",
      "Improve guest satisfaction scores through personalized service and faster, more accurate order fulfillment",
      "Lower labor costs by 10-15% with data-driven scheduling that matches staffing to actual demand patterns",
      "Gain real-time visibility into sales, costs, and performance across all locations from a single dashboard",
      "Build lasting customer loyalty through rewards programs and personalized engagement based on visit history",
    ],
    process: [
      {
        step: "Hospitality Operations Review",
        description:
          "We observe peak and off-peak operations, interview staff across roles, and map all workflows from guest arrival to departure and everything between.",
      },
      {
        step: "Technology Needs Analysis",
        description:
          "Our team evaluates your current systems, identifies integration points, and prioritizes technology investments based on impact and feasibility.",
      },
      {
        step: "Solution Design & Vendor Selection",
        description:
          "We design your ideal technology ecosystem, evaluating the best-fit platforms for your hospitality segment — restaurant, hotel, cafe, or catering.",
      },
      {
        step: "Customization & Configuration",
        description:
          "Platform customization tailored to your specific menus, room types, service styles, and operational workflows.",
      },
      {
        step: "Integration & Data Setup",
        description:
          "Connecting POS, PMS, kitchen systems, reservation platforms, and accounting software into a unified data flow.",
      },
      {
        step: "Staff Training & Go-Live",
        description:
          "Role-specific training for servers, kitchen staff, front desk, and managers with hands-on practice before going live.",
      },
      {
        step: "Ongoing Support & Optimization",
        description:
          "Continuous system monitoring, menu updates, seasonal configuration changes, and performance optimization based on operational data.",
      },
    ],
    technologies: [
      {
        name: "Toast & Square for Restaurants",
        description:
          "Restaurant-specific POS and management platforms with integrated payment processing, online ordering, and analytics",
      },
      {
        name: "Cloudbeds & Opera PMS",
        description:
          "Hotel property management systems with channel management, guest messaging, and housekeeping coordination capabilities",
      },
      {
        name: "OpenTable & Resy APIs",
        description:
          "Reservation platform integrations for table management, waitlist optimization, and guest preference tracking",
      },
      {
        name: "Node.js & React Native",
        description:
          "Technology stack for building custom hospitality applications including kitchen display systems and guest-facing mobile apps",
      },
    ],
    whyYesBe: [
      {
        title: "Hospitality Industry Insight",
        description:
          "We understand the unique rhythms of hospitality — the rush of Friday dinner service, the complexity of hotel operations, and the critical importance of guest experience.",
      },
      {
        title: "Speed of Implementation",
        description:
          "Hospitality can't afford long technology deployments. We deliver core systems in weeks, not months, with phased rollouts that minimize operational disruption.",
      },
      {
        title: "Operational Integration Focus",
        description:
          "Technology must work with the flow of service, not against it. We design systems that hospitality professionals actually want to use because they make their jobs easier.",
      },
      {
        title: "Revenue-Driving Solutions",
        description:
          "Every hospitality solution we deliver is measured in revenue impact — higher table utilization, lower food costs, improved guest retention, and increased average check sizes.",
      },
    ],
    caseStudy: {
      title:
        "Restaurant Chain — Integrated Operations Platform",
      outcome:
        "Unified POS, kitchen displays, inventory management, and loyalty across 8 locations, reducing food waste by 30%, improving table turnover by 20%, and increasing repeat visits by 35%.",
      metric: "35% more repeat visits",
    },
    faq: [
      {
        question: "Can you integrate with our existing POS?",
        answer:
          "Yes. We work with all major hospitality POS systems including Toast, Square, Lightspeed, and Revel. We build custom integrations for proprietary systems when needed.",
      },
      {
        question: "How quickly can you deploy during a busy season?",
        answer:
          "We understand hospitality seasonality. We schedule deployments during slower periods and can execute core implementations in 2-4 weeks when timing is critical.",
      },
      {
        question: "Do you support multi-location restaurant or hotel chains?",
        answer:
          "Absolutely. Our platforms support multi-location operations with centralized management, location-specific configurations, and consolidated reporting across all venues.",
      },
      {
        question: "Can you help with online ordering and delivery?",
        answer:
          "Yes. We build online ordering systems, integrate with delivery platforms like DoorDash and UberEats, and implement commission-free direct ordering channels.",
      },
    ],
    relatedSolutions: ["custom-software", "web-applications", "ecommerce"],
  },

  // 10. Finance
  {
    slug: "finance",
    title: "Finance",
    icon: DollarSign,
    category: "Financial Services",
    description:
      "Financial dashboards, compliance automation, transaction processing, and regulatory reporting systems built for the demands of modern financial services.",
    heroImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
    overview:
      "Financial services operate in a world of strict regulation, high stakes, and zero tolerance for errors. Our financial technology solutions deliver robust, secure, and compliant platforms for banks, fintech companies, insurance firms, wealth management companies, and accounting organizations. From real-time transaction processing and regulatory reporting to risk analytics and customer-facing financial dashboards, we build systems that handle the precision and security that finance demands.",
    whyNeeded:
      "Financial institutions face a dual challenge: legacy infrastructure that is expensive to maintain and slow to evolve, paired with relentless regulatory pressure that demands constant compliance updates. Meanwhile, fintech competitors are disrupting traditional models with superior digital experiences. Purpose-built financial technology enables institutions to modernize operations, maintain compliance, and deliver the digital experiences that customers and regulators now expect.",
    challenges: [
      "Strict regulatory compliance across multiple jurisdictions — SEC, GDPR, PCI DSS, SOX, Basel III, and industry-specific requirements",
      "Zero-tolerance for errors in financial calculations, transaction processing, and regulatory reporting",
      "High-security requirements including encryption, audit trails, fraud detection, and access controls for sensitive financial data",
      "Integration with core banking systems, payment networks, market data feeds, and regulatory reporting platforms",
    ],
    features: [
      {
        title: "Financial Dashboards & Reporting",
        description:
          "Real-time financial dashboards with P&L tracking, cash flow analysis, balance sheet reporting, and automated regulatory filings.",
        icon: PieChart,
      },
      {
        title: "Transaction Processing Systems",
        description:
          "High-throughput payment processing, settlement systems, and real-time transaction monitoring with fraud detection capabilities.",
        icon: CreditCard,
      },
      {
        title: "Compliance Automation",
        description:
          "Automated regulatory reporting, KYC/AML workflows, audit trail management, and compliance monitoring dashboards.",
        icon: Shield,
      },
      {
        title: "Risk Analytics Platforms",
        description:
          "Credit risk modeling, market risk analysis, portfolio risk assessment, and stress testing with real-time data feeds.",
        icon: Activity,
      },
      {
        title: "Wealth Management Tools",
        description:
          "Portfolio management, client reporting, financial planning, and advisory platforms with real-time market data integration.",
        icon: TrendingUp,
      },
      {
        title: "Fintech Application Development",
        description:
          "Customer-facing financial applications — mobile banking, payment apps, investment platforms — with regulatory compliance built in.",
        icon: Smartphone,
      },
    ],
    benefits: [
      "Automate 60-80% of compliance reporting processes, reducing manual effort and human error",
      "Achieve real-time financial visibility with dashboards that update as transactions occur",
      "Reduce fraud losses through AI-powered detection systems that identify suspicious patterns in real time",
      "Accelerate regulatory filings and audit preparation with automated data collection and report generation",
      "Improve client satisfaction with self-service portals for account views, statements, and financial planning",
      "Scale transaction processing capacity to handle peak volumes without performance degradation",
    ],
    process: [
      {
        step: "Regulatory & Requirements Analysis",
        description:
          "We map all applicable regulations to technical requirements, ensuring every feature meets compliance standards from the initial design phase.",
      },
      {
        step: "Security Architecture Design",
        description:
          "Our team designs a defense-in-depth security architecture including encryption, access controls, audit logging, and fraud detection systems.",
      },
      {
        step: "Platform Development",
        description:
          "Agile development with rigorous code reviews, financial calculation validation, and comprehensive unit and integration testing.",
      },
      {
        step: "Compliance Validation",
        description:
          "Thorough compliance testing against regulatory requirements including data handling, access controls, reporting accuracy, and audit trail completeness.",
      },
      {
        step: "Security Audit & Penetration Testing",
        description:
          "Independent security assessment, penetration testing, and vulnerability analysis before any system handles real financial data.",
      },
      {
        step: "Controlled Deployment",
        description:
          "Phased deployment with parallel running, reconciliation checks, and comprehensive monitoring during the critical transition period.",
      },
      {
        step: "Ongoing Compliance & Optimization",
        description:
          "Continuous regulatory updates, security patches, performance optimization, and feature development to keep the platform current and effective.",
      },
    ],
    technologies: [
      {
        name: "Java & Spring Boot",
        description:
          "Enterprise-grade frameworks for building secure, high-throughput financial applications with strong typing and transaction management",
      },
      {
        name: "Apache Kafka & RabbitMQ",
        description:
          "Event-driven messaging platforms for real-time transaction processing, audit event streaming, and system integration",
      },
      {
        name: "PostgreSQL & Oracle",
        description:
          "ACID-compliant databases for financial data storage with full transaction support, audit logging, and data integrity guarantees",
      },
      {
        name: "TensorFlow & Scikit-learn",
        description:
          "Machine learning frameworks for fraud detection, credit scoring, risk modeling, and financial forecasting applications",
      },
    ],
    whyYesBe: [
      {
        title: "Financial Services Expertise",
        description:
          "We understand the unique requirements of financial services — from regulatory complexity to calculation precision to the zero-tolerance for data errors.",
      },
      {
        title: "Security-First Engineering",
        description:
          "Every financial solution we build implements enterprise-grade security — encryption, access controls, audit logging, and fraud detection — as foundational architecture.",
      },
      {
        title: "Compliance Built In",
        description:
          "Regulatory compliance is not an afterthought — it is embedded in every feature, data flow, and user interaction from the initial design.",
      },
      {
        title: "Precision & Reliability",
        description:
          "Financial calculations demand absolute accuracy. Our testing methodologies ensure that every number, every transaction, and every report is correct.",
      },
    ],
    caseStudy: {
      title:
        "Mid-Size Bank — Compliance Automation Platform",
      outcome:
        "Automated regulatory reporting across 5 jurisdictions, reducing compliance team workload by 70% and cutting report preparation time from 2 weeks to 2 hours.",
      metric: "70% compliance workload reduction",
    },
    faq: [
      {
        question: "Are your solutions compliant with financial regulations?",
        answer:
          "Yes. We build with compliance as a foundational requirement, implementing SOX, PCI DSS, GDPR, and Basel III controls from the initial architecture. We also conduct regular compliance audits.",
      },
      {
        question: "How do you handle sensitive financial data?",
        answer:
          "All sensitive data is encrypted at rest and in transit. We implement role-based access controls, comprehensive audit logging, and data masking for non-production environments.",
      },
      {
        question: "Can you integrate with core banking systems?",
        answer:
          "We have experience integrating with major core banking platforms including FIS, Fiserv, and Jack Henry, as well as market data feeds from Bloomberg, Reuters, and other providers.",
      },
      {
        question: "What about disaster recovery and business continuity?",
        answer:
          "Every financial solution includes multi-region disaster recovery, automated backups, failover capabilities, and documented business continuity procedures to meet regulatory requirements.",
      },
    ],
    relatedSolutions: ["ai-solutions", "custom-software", "database-management"],
  },

  // 11. Real Estate
  {
    slug: "real-estate",
    title: "Real Estate",
    icon: Home,
    category: "Real Estate & PropTech",
    description:
      "Property management systems, CRM platforms, virtual tour solutions, and transaction management tools that modernize real estate operations.",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    overview:
      "Real estate is an industry where relationships, information, and timing are everything — yet many operators still rely on spreadsheets, fragmented CRMs, and manual processes. Our real estate technology solutions cover property management, agent CRM, virtual tour platforms, listing management, and transaction coordination. We help brokerages, property managers, and real estate developers build digital foundations that attract leads, close deals faster, and manage properties efficiently.",
    whyNeeded:
      "The real estate industry generates massive amounts of data — property listings, market comparables, client interactions, transaction documents — but most of it is siloed in disconnected systems. Agents spend more time on administrative tasks than on client relationships, and property managers struggle with manual maintenance coordination and tenant communication. Purpose-built real estate technology unifies these processes, automates the routine, and provides the market intelligence that drives better decisions.",
    challenges: [
      "Lead management complexity with prospects arriving from dozens of channels and requiring personalized, timely follow-up",
      "Property data fragmentation — listings, documents, photos, and transaction records scattered across multiple platforms",
      "Transaction coordination involving multiple parties — buyers, sellers, agents, lenders, inspectors, and attorneys",
      "Market intelligence gaps that prevent agents and brokerages from pricing accurately and advising clients effectively",
    ],
    features: [
      {
        title: "Property Management Systems",
        description:
          "Tenant portals, lease management, rent collection, maintenance requests, and financial reporting for residential and commercial properties.",
        icon: Building2,
      },
      {
        title: "Real Estate CRM",
        description:
          "Agent-focused CRM with lead scoring, automated follow-up sequences, pipeline management, and client communication tracking.",
        icon: Users,
      },
      {
        title: "Virtual Tour & 3D Platforms",
        description:
          "Immersive virtual tour creation, 3D property walkthroughs, and interactive floor plans for remote property showcasing.",
        icon: Eye,
      },
      {
        title: "Listing Management Systems",
        description:
          "MLS integration, listing syndication, property marketing automation, and photo/video management platforms.",
        icon: Home,
      },
      {
        title: "Transaction Management",
        description:
          "Digital transaction coordination with document management, e-signatures, timeline tracking, and party communication workflows.",
        icon: FileText,
      },
      {
        title: "Market Analytics & Valuation",
        description:
          "Comparative market analysis tools, automated property valuation models, neighborhood analytics, and investment scoring.",
        icon: TrendingUp,
      },
    ],
    benefits: [
      "Increase lead conversion rates by 25-40% through automated follow-up and intelligent lead scoring",
      "Reduce property management administrative time by 30-50% with tenant self-service portals and automated workflows",
      "Accelerate transaction closing times by 20-30% with digital document management and automated coordination",
      "Gain market intelligence advantage with real-time comparable analysis and automated property valuations",
      "Improve client satisfaction through faster communication, personalized service, and transparent transaction tracking",
      "Scale property portfolios without proportionally increasing management staff through automation and self-service tools",
    ],
    process: [
      {
        step: "Real Estate Operations Analysis",
        description:
          "We analyze your current workflows — from lead capture to transaction closing, from tenant onboarding to maintenance resolution — identifying automation opportunities.",
      },
      {
        step: "Technology Stack Planning",
        description:
          "Our team designs an integrated platform connecting your CRM, listing management, transaction coordination, and property management systems.",
      },
      {
        step: "CRM & Lead System Setup",
        description:
          "Configuration of lead capture, scoring, routing, and automated follow-up sequences tailored to your market and agent workflows.",
      },
      {
        step: "Property Platform Development",
        description:
          "Building or customizing property management, listing, and virtual tour platforms to match your specific operational requirements.",
      },
      {
        step: "Integration & Data Migration",
        description:
          "Connecting new systems with MLS feeds, listing platforms, accounting software, and migrating existing client and property data.",
      },
      {
        step: "Agent & Staff Training",
        description:
          "Role-specific training for agents, property managers, and administrative staff with real-world scenarios and hands-on practice.",
      },
      {
        step: "Launch & Continuous Improvement",
        description:
          "Full deployment with ongoing support, feature development based on user feedback, and market-driven updates to stay competitive.",
      },
    ],
    technologies: [
      {
        name: "React & Next.js",
        description:
          "Modern web frameworks for building fast, SEO-optimized property listing sites, client portals, and agent dashboards",
      },
      {
        name: "Retsly & Bridge Interactive",
        description:
          "MLS integration APIs for real-time property listing data, market comparables, and listing syndication to major portals",
      },
      {
        name: "Matterport & CloudPano",
        description:
          "3D virtual tour and digital twin platforms for creating immersive property experiences and remote viewing capabilities",
      },
      {
        name: "Salesforce & HubSpot",
        description:
          "CRM platforms with real estate customizations for lead management, pipeline tracking, and automated marketing campaigns",
      },
    ],
    whyYesBe: [
      {
        title: "PropTech Domain Knowledge",
        description:
          "We understand the unique dynamics of real estate — from market cycles to agent workflows to the critical importance of lead response time.",
      },
      {
        title: "Lead-Generation Focus",
        description:
          "Every real estate solution we build is designed to generate, capture, and convert leads more effectively, directly impacting revenue.",
      },
      {
        title: "Agent-Centric Design",
        description:
          "We design for busy real estate professionals who need mobile-first tools that work in the field — not just in the office.",
      },
      {
        title: "Market Intelligence Integration",
        description:
          "We connect real-time market data, property analytics, and valuation tools directly into agent and brokerage workflows for smarter decision-making.",
      },
    ],
    caseStudy: {
      title:
        "Regional Brokerage — Digital Transformation Platform",
      outcome:
        "Built a unified CRM, listing management, and transaction coordination platform for 150 agents, increasing lead conversion by 35% and reducing transaction time by 25%.",
      metric: "35% higher lead conversion",
    },
    faq: [
      {
        question: "Can you integrate with MLS systems?",
        answer:
          "Yes. We integrate with RESO-compliant MLS systems across North America, providing real-time listing data, property details, and market comparables directly in your platform.",
      },
      {
        question: "Do you build property management platforms?",
        answer:
          "Absolutely. We build custom property management systems with tenant portals, online rent payments, maintenance request tracking, lease management, and financial reporting.",
      },
      {
        question: "Can you create virtual tour experiences?",
        answer:
          "Yes. We build virtual tour platforms using Matterport, CloudPano, and custom 3D solutions that integrate directly with your listing pages and CRM.",
      },
      {
        question: "How do you handle agent adoption?",
        answer:
          "We design mobile-first interfaces that agents actually want to use, provide hands-on training, and offer ongoing support to ensure high adoption rates across your brokerage.",
      },
    ],
    relatedSolutions: ["web-applications", "mobile-apps", "data-analytics"],
  },
];

export function getIndustryBySlug(slug: string): IndustryDetail | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((i) => i.slug);
}
