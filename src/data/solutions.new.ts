import type { SolutionDetail } from "./solutions";
import {
  Building2,
  Compass,
  Gauge,
  Layers,
  Map,
  RefreshCw,
  Route,
  Shield,
  Target,
  Users,
  Waypoints,
} from "lucide-react";

/**
 * IT Consulting and Digital Transformation.
 *
 * Both are advisory-led services: the engagement starts with diagnosis and
 * prioritisation rather than a build. They are modelled on the same shape as
 * the delivery services in solutions.ts so they render through the same
 * SolutionDetailPage, generate the same Service schema, and stay consistent
 * with the rest of the service architecture.
 */

export const itConsulting: SolutionDetail = {
  slug: "it-consulting",
  title: "IT Consulting",
  shortTitle: "IT Consulting",
  icon: Compass,
  category: "Consulting",
  description:
    "Independent IT consulting that audits what you already run, identifies where technology is actually costing you time or money, and produces a prioritised roadmap you can execute — with or without us.",
  heroImage:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
  overview:
    "Most businesses do not have an IT problem, they have a prioritisation problem. Systems were added one at a time, each reasonable in isolation, and together they now cost more in maintenance, duplicated data and manual reconciliation than the work they were meant to save. IT consulting is the discipline of looking at that whole picture before spending anything more on it. We assess your current infrastructure, applications, data and processes, then map where technology is generating return and where it is quietly absorbing it. The output is not a pitch. It is a written assessment with a costed, sequenced roadmap that stands up whether or not you implement it with YESBE Technologies.",
  whyNeeded:
    "Technology decisions made without an audit tend to compound rather than cancel. A second CRM is bought because nobody can find the fields in the first. A reporting dashboard is commissioned that recreates a spreadsheet that already existed. Each addition looks small, and the total becomes a maintenance burden that grows faster than the business. An independent assessment replaces that pattern with evidence: what you run, what it costs to keep running, what it should cost, and the shortest credible route between the two.",
  challenges: [
    "Legacy systems that are expensive to change but essential to run, with no clear path to replacement",
    "Business-critical knowledge held by a few individuals rather than documented anywhere",
    "Spreadsheets and messaging apps used as unacknowledged production systems",
    "Software spending that cannot be tied to a measurable business outcome",
    "Security, compliance and access control treated as an afterthought rather than a requirement",
    "No shared technical roadmap, so every department commissions its own tooling",
  ],
  features: [
    {
      title: "IT Infrastructure Audit",
      description:
        "A documented review of your servers, networks, devices, cloud accounts, licences and backup coverage, with the specific risks and single points of failure called out.",
      icon: Shield,
    },
    {
      title: "Application & Systems Review",
      description:
        "An inventory of every system in use, what each one actually does, what it costs, and how much overlap exists between them.",
      icon: Layers,
    },
    {
      title: "Technology Roadmap",
      description:
        "A phased plan that separates what must happen now from what can wait, sequenced by cost, risk and business value rather than by enthusiasm.",
      icon: Route,
    },
    {
      title: "Vendor & Licence Advisory",
      description:
        "Independent guidance on what to keep, renegotiate, consolidate or replace — including analysis of what switching genuinely costs.",
      icon: Target,
    },
    {
      title: "Process & Automation Assessment",
      description:
        "Where manual work, duplicate data entry and approval bottlenecks are creating measurable cost, and which of them are worth automating first.",
      icon: RefreshCw,
    },
    {
      title: "Security & Risk Assessment",
      description:
        "Practical review of access control, backup recoverability, patching and data handling, expressed in business terms rather than compliance jargon.",
      icon: Shield,
    },
  ],
  benefits: [
    "Spend technology budget on the two or three things that actually move your business, instead of the fifth tool added by default",
    "Replace anecdotal IT decisions with an evidence-based plan your team and your board can both follow",
    "Identify security and continuity risks while they are still inexpensive to fix",
    "Avoid paying twice for capability you already own but are not using",
    "Enter every subsequent build engagement with clear requirements and no wasted discovery",
  ],
  process: [
    {
      step: "Discovery",
      description:
        "Interviews with the people who actually run the systems day to day, plus a walkthrough of accounts, infrastructure, licences and data flows.",
    },
    {
      step: "Audit",
      description:
        "Each system is documented, costed and scored for risk, business value and the difficulty of replacing it.",
    },
    {
      step: "Analysis",
      description:
        "Overlaps, single points of failure and quick wins are separated from structural problems that need a longer plan.",
    },
    {
      step: "Roadmap",
      description:
        "A written, prioritised plan with indicative costs, dependencies and a realistic sequence you can act on immediately.",
    },
    {
      step: "Handover",
      description:
        "Findings are presented to your team, with the reasoning documented so decisions survive whoever happens to be in post next.",
    },
  ],
  technologies: [
    {
      name: "Infrastructure",
      description:
        "Servers, networks, endpoints, cloud and backup coverage assessed as one connected system rather than separate purchases.",
    },
    {
      name: "Business Applications",
      description:
        "ERP, CRM, accounting and productivity tooling reviewed for overlap, underuse and duplication.",
    },
    {
      name: "Data & Integration",
      description:
        "Where data lives, how it moves between systems, and where manual reconciliation is quietly consuming staff time.",
    },
    {
      name: "Security Controls",
      description:
        "Access, patching, backup recoverability and data handling evaluated against real operational risk.",
    },
  ],
  whyYESBE: [
    {
      title: "Diagnosis Before Build",
      description:
        "We are a delivery company, so it is in our interest to be accurate about what actually needs building. An honest assessment sometimes concludes that you need less than you expected.",
    },
    {
      title: "Evidence, Not Assumption",
      description:
        "Every recommendation traces to something observed in your systems or your own team's experience, not to a generic best practice.",
    },
    {
      title: "Delivery Capability",
      description:
        "Because we also build, the roadmap is written by people who know what the work actually costs and how long it realistically takes.",
    },
    {
      title: "No Dependency on Selling You More",
      description:
        "The assessment is a deliverable in its own right. It is useful to you whether or not any further project follows.",
    },
  ],
  exampleProject: {
    title:
      "Technology discovery and roadmap engagement",
    scope:
      "We start by reviewing your current systems, processes and constraints, then document what is worth building, what should be left alone, and in what order. The output is a scoped roadmap with effort estimates and an honest view of the risks involved.",
    focus:
      "A roadmap before any build",
  },
  faq: [
    {
      question: "What does an IT consulting engagement cost?",
      answer:
        "Cost depends on the size of the estate and how much needs reviewing. Smaller environments are typically a short fixed-scope assessment; a full infrastructure and application audit across multiple sites is scoped separately. We agree the scope and cost in writing before starting.",
    },
    {
      question: "Will you tell us to buy something from you?",
      answer:
        "Only when the audit genuinely concludes it is the right answer, and we will explain the reasoning either way. A significant part of an honest assessment is identifying things you do not need to change.",
    },
    {
      question: "Do you work with our existing IT team or vendor?",
      answer:
        "Yes. Most engagements are delivered alongside an internal team or an incumbent provider, and the output is written to be handed to whoever maintains it.",
    },
    {
      question: "How long does an audit take?",
      answer:
        "A focused assessment of a small environment can be completed in two to three weeks. Larger estates spanning multiple locations and systems usually need four to six weeks of discovery before analysis begins.",
    },
  ],
  relatedSolutions: [
    "digital-transformation",
    "business-automation",
    "cloud-devops",
    "custom-software",
  ],
};

export const digitalTransformation: SolutionDetail = {
  slug: "digital-transformation",
  title: "Digital Transformation",
  shortTitle: "Digital Transformation",
  icon: Waypoints,
  category: "Strategy",
  description:
    "Turning fragmented, manual, paper-driven operations into connected digital workflows — sequenced so each step pays for the next and nothing depends on a perfect future.",
  heroImage:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
  overview:
    "Digital transformation fails in a predictable way: organisations attempt to replace everything at once, take on a multi-year programme, and stall under the weight of its own scope. The alternative works far better. Transformation delivered as a sequence of contained, valuable steps — each one usable the day it ships — compounds into a genuinely different operation without ever freezing the business. We start by finding the workflow where manual effort, duplicate data or delayed decisions is costing you the most, fix that, and use the momentum to move to the next. The end state is an operation where information flows between systems without being retyped, decisions are made on current data rather than last quarter's spreadsheet, and most routine work is handled by software.",
  whyNeeded:
    "The businesses losing ground are rarely the ones with worse technology. They are the ones where a customer's request still passes through four people and two spreadsheets before anyone acts on it, where stock levels are known only when they run out, and where the owner decides from figures assembled last month. Each of those is a specific, fixable constraint. Addressing them in order of cost produces a business that responds faster and spends less, without the disruption and capital outlay of a wholesale replacement programme.",
  challenges: [
    "Transformation programmes scoped so broadly that nothing meaningful ships for a year",
    "Legacy systems that cannot be replaced quickly, so any new solution must integrate rather than overwrite",
    "Business processes that were never documented and now exist only in the habits of long-serving staff",
    "Employees who have absorbed manual workarounds and will not adopt a process that removes their judgement",
    "Data spread across disconnected systems with no single source of truth",
    "Previous transformation attempts that failed quietly and left internal resistance behind",
  ],
  features: [
    {
      title: "Digital Maturity Assessment",
      description:
        "A structured evaluation of where your operations actually stand across processes, systems, data and people, producing a baseline you can measure progress against.",
      icon: Gauge,
    },
    {
      title: "Process Digitisation",
      description:
        "Manual, paper-based and spreadsheet-driven workflows rebuilt as structured digital processes with proper records, validation and accountability.",
      icon: Building2,
    },
    {
      title: "System Integration",
      description:
        "Connecting the systems you already have so data moves between them without re-keying, removing the reconciliation work that sits between them.",
      icon: Layers,
    },
    {
      title: "Data & Reporting Modernisation",
      description:
        "Single source of truth for the numbers your decisions depend on, available in near real time instead of assembled manually each month.",
      icon: Target,
    },
    {
      title: "Change & Adoption Planning",
      description:
        "Sequencing the rollout so each phase is usable immediately, with training and communication planned for the people who have to live with the change.",
      icon: Users,
    },
    {
      title: "Transformation Roadmap",
      description:
        "A costed, phased plan showing what to do first, what each phase returns, and what can safely wait until the business is ready.",
      icon: Map,
    },
  ],
  benefits: [
    "Response times fall because work stops queueing in inboxes and spreadsheets between departments",
    "Operational cost drops as routine, repetitive work moves from people into software",
    "Decisions are made on current data rather than figures reconstructed from last month",
    "Each phase is independently valuable, so progress is visible long before the programme ends",
    "Existing systems keep working — transformation that integrates beats replacement programmes that disrupt",
  ],
  process: [
    {
      step: "Assess",
      description:
        "A maturity baseline across your processes, systems and data, identifying where the largest avoidable cost and delay actually sit.",
    },
    {
      step: "Prioritise",
      description:
        "Candidate initiatives are scored on impact, effort and dependency, producing an honest first phase rather than an ambitious list.",
    },
    {
      step: "Pilot",
      description:
        "One workflow is transformed end to end and put into real use, proving the approach with your own data before anything else changes.",
    },
    {
      step: "Scale",
      description:
        "The proven pattern is extended to adjacent processes, reusing components so each additional workflow costs less than the last.",
    },
    {
      step: "Measure",
      description:
        "Baselines established in phase one are compared against reality, and the roadmap is adjusted based on what the evidence shows.",
    },
  ],
  technologies: [
    {
      name: "Integration Layer",
      description:
        "APIs, workflows and messaging that let existing systems exchange data without a full replacement programme.",
    },
    {
      name: "Operational Systems",
      description:
        "ERP, CRM and workflow platforms extended to cover the processes they currently leave as manual workarounds.",
    },
    {
      name: "Analytics & Reporting",
      description:
        "Near real-time reporting so business decisions use current data rather than a monthly reconstruction.",
    },
    {
      name: "Automation & AI",
      description:
        "Applied to the specific repetitive steps identified during assessment rather than adopted as a general strategy.",
    },
  ],
  whyYESBE: [
    {
      title: "Phased, Not Wholesale",
      description:
        "We transform one workflow at a time so each phase is useful immediately. You are never dependent on a programme completing three years from now.",
    },
    {
      title: "Integrate Before Replace",
      description:
        "Most transformation does not require throwing away working systems. Connecting what you own is cheaper, faster and far less disruptive.",
    },
    {
      title: "Measured Against Reality",
      description:
        "The baseline from phase one is what later phases are judged against, so progress is evidenced rather than asserted.",
    },
    {
      title: "Adoption Designed In",
      description:
        "A process nobody adopts delivers nothing. Training, communication and feedback are planned alongside the technology from the start.",
    },
  ],
  exampleProject: {
    title:
      "Phased legacy system modernisation",
    scope:
      "Migration planned in phases rather than a single cutover: integrate what is already working, replace what is genuinely blocking progress, and keep the business running while each phase goes live.",
    focus:
      "Modernise in phases, not big-bang",
  },
  faq: [
    {
      question: "How long does digital transformation take?",
      answer:
        "A first phase that puts one meaningful workflow into production typically runs eight to twelve weeks. Whole-organisation programmes run over years, which is exactly why we scope them as a sequence of independent phases rather than one large project.",
    },
    {
      question: "Do we have to replace our existing systems?",
      answer:
        "Usually not, and we would not recommend it by default. Most transformation value comes from connecting and automating what you already own. Replacing working systems is justified only when they genuinely cannot support the process you need.",
    },
    {
      question: "How do you keep staff on board?",
      answer:
        "Each phase is introduced as a usable improvement rather than a change to be endured, with training and feedback built into the rollout. People are far more resistant to transformation programmes that ask for effort before returning any benefit.",
    },
    {
      question: "What if we do not know what needs transforming first?",
      answer:
        "That is precisely what the maturity assessment is for. It produces an evidence-based priority order instead of a list of ideas, which is usually the hardest part to get right on your own.",
    },
  ],
  relatedSolutions: [
    "it-consulting",
    "business-automation",
    "erp-systems",
    "custom-software",
  ],
};