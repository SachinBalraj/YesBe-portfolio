import { ENQUIRY_FORM_TYPES, type EnquiryFormType } from "./db.js";

/**
 * Every field is read by name from an allowlist. Nothing from the request is
 * spread into the document, so `__proto__`, `constructor`, `$where` and any
 * other operator-style key can never reach MongoDB (NoSQL injection).
 */

export interface FieldError {
  field: string;
  message: string;
}

export class ValidationError extends Error {
  readonly status = 422;
  readonly fields: FieldError[];
  constructor(fields: FieldError[]) {
    super("Validation failed");
    this.name = "ValidationError";
    this.fields = fields;
  }
}

/* ── Sanitising ── */

/** Unicode category Cc: NUL, other C0 controls, DEL. */
const CONTROL_CHARS = /\p{Cc}/gu;

/**
 * Normalises free text: strips control characters (including NUL, which can
 * terminate C strings in some sinks), collapses runs of whitespace, and caps
 * length. Angle brackets are left intact — the value is stored and rendered as
 * text, never as HTML, and mangling them would corrupt legitimate input such as
 * "a < b" or code snippets in a project description.
 */
export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(CONTROL_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Same as cleanText but preserves newlines, for multi-paragraph fields. */
export function cleanMultiline(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(CONTROL_CHARS, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, maxLength);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Digits, spaces, +, -, (, ) and . only — rejects letters/script injection. */
const PHONE_RE = /^[0-9+()\-\s.]{6,24}$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  // 7–15 digits covers E.164 and Indian numbers without being absurd.
  return digits.length >= 7 && digits.length <= 15 && PHONE_RE.test(value);
}

/* ── Limits ── */

const LIMITS = {
  name: 120,
  email: 254,
  phone: 24,
  company: 160,
  designation: 120,
  service: 120,
  budget: 80,
  timeline: 80,
  projectDescription: 4000,
  businessChallenges: 2000,
  goals: 2000,
  pageSource: 300,
} as const;

/** Only same-site paths are accepted as a page source. */
function cleanPageSource(value: unknown): string {
  const raw = cleanText(value, LIMITS.pageSource);
  if (!raw) return "unknown";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "unknown";
  return raw;
}

function pickFormType(value: unknown): EnquiryFormType {
  return typeof value === "string" && (ENQUIRY_FORM_TYPES as readonly string[]).includes(value)
    ? (value as EnquiryFormType)
    : "contact";
}

export interface ValidatedEnquiry {
  data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    designation: string;
    service: string;
    budget: string;
    timeline: string;
    projectDescription: string;
    businessChallenges: string;
    goals: string;
    formType: EnquiryFormType;
    pageSource: string;
  };
  /** True when the honeypot was filled — treated as a bot, never stored. */
  honeypotTripped: boolean;
}

/**
 * The field allowlist mirrors exactly what the public forms collect
 * (ContactSection wizard + RequestProposalPage). No mandatory field was
 * invented, and nothing is spread from the request into the document.
 */
export function validateEnquiry(body: Record<string, unknown>): ValidatedEnquiry {
  const errors: FieldError[] = [];

  // Resolved first: the proposal form has a stricter required-field set than
  // the contact wizard (phone is mandatory there).
  const formType = pickFormType(body.formType);
  const phoneRequired = formType === "proposal";

  const name = cleanText(body.name, LIMITS.name);
  const email = cleanText(body.email, LIMITS.email).toLowerCase();
  const phone = cleanText(body.phone, LIMITS.phone);
  const service = cleanText(body.service, LIMITS.service);
  const projectDescription = cleanMultiline(body.projectDescription, LIMITS.projectDescription);

  if (name.length < 2) {
    errors.push({ field: "name", message: "Please enter your name" });
  }
  if (!isValidEmail(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }
  if (phoneRequired) {
    if (phone.length === 0) {
      errors.push({ field: "phone", message: "Please enter your phone number" });
    } else if (!isValidPhone(phone)) {
      errors.push({ field: "phone", message: "Please enter a valid phone number" });
    }
  } else if (phone.length > 0 && !isValidPhone(phone)) {
    // Optional on the contact wizard, but must be well-formed when supplied.
    errors.push({ field: "phone", message: "Please enter a valid phone number" });
  }
  if (service.length === 0) {
    errors.push({ field: "service", message: "Please select a service" });
  }
  if (projectDescription.length < 10) {
    errors.push({
      field: "projectDescription",
      message: "Please describe your project (at least 10 characters)",
    });
  }

  if (errors.length > 0) throw new ValidationError(errors);

  return {
    honeypotTripped: cleanText(body.company_website, 200).length > 0,
    data: {
      name,
      email,
      phone,
      company: cleanText(body.company, LIMITS.company),
      designation: cleanText(body.designation, LIMITS.designation),
      service,
      budget: cleanText(body.budget, LIMITS.budget),
      timeline: cleanText(body.timeline, LIMITS.timeline),
      projectDescription,
      businessChallenges: cleanMultiline(body.businessChallenges, LIMITS.businessChallenges),
      goals: cleanMultiline(body.goals, LIMITS.goals),
      formType,
      pageSource: cleanPageSource(body.pageSource),
    },
  };
}

export function validateSubscribe(body: Record<string, unknown>): {
  email: string;
  source: string;
  honeypotTripped: boolean;
} {
  const email = cleanText(body.email, LIMITS.email).toLowerCase();
  if (!isValidEmail(email)) {
    throw new ValidationError([{ field: "email", message: "Please enter a valid email address" }]);
  }
  return {
    email,
    source: cleanPageSource(body.source),
    honeypotTripped: cleanText(body.company_website, 200).length > 0,
  };
}
