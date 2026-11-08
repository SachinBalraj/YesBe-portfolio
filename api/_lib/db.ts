import { MongoClient, type Db, type Collection } from "mongodb";

/**
 * Serverless-safe MongoDB access.
 *
 * A `MongoClient` is expensive to create and holds a connection pool, so the
 * instance is cached on `globalThis`. In a long-lived Node process this means
 * one client for the process lifetime; in a serverless environment the module
 * scope is reused across warm invocations, and cold starts create a new one.
 * `serverSelectionTimeoutMS` is deliberately short so a bad URI fails fast
 * instead of hanging the request.
 */

const GLOBAL_KEY = Symbol.for("yesbe.mongo.client");

/**
 * Resolved per call, never at module load. Capturing it at import time made the
 * database depend on the order in which a module happened to be evaluated
 * relative to the environment being populated, which silently sent writes to
 * the wrong database.
 */
function resolveDbName(): string {
  return process.env.MONGODB_DB_NAME || "yesbe";
}

interface GlobalWithMongo {
  [GLOBAL_KEY]?: MongoClient;
}

export function getMongoClient(): MongoClient {
  const g = globalThis as unknown as GlobalWithMongo;
  if (g[GLOBAL_KEY]) return g[GLOBAL_KEY];

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new ConfigError("MONGODB_URI is not set");
  }

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 5,
    retryWrites: true,
  });

  g[GLOBAL_KEY] = client;
  return client;
}

export class ConfigError extends Error {
  readonly status = 503;
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export function getDb(): Db {
  return getMongoClient().db(resolveDbName());
}

/* ────────────────────────────────────────────────────────────
   Document shapes
──────────────────────────────────────────────────────────── */

/**
 * Canonical enquiry pipeline. Only these four values can be written by an
 * administrator; legacy values stored by earlier versions remain readable and
 * are mapped through LEGACY_STATUS_LABELS below.
 */
export const ENQUIRY_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Closed",
] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

/** Any status value that may physically exist in an old document. */
export type StoredEnquiryStatus =
  | EnquiryStatus
  | "In Discussion"
  | "Proposal Sent"
  | "Won"
  | "Converted";

/**
 * Values written by earlier versions of the dashboard. They are never removed
 * from existing documents — reads normalise them to the current pipeline so no
 * client data is rewritten or lost.
 */
export const LEGACY_STATUS_LABELS: Record<string, EnquiryStatus> = {
  "In Discussion": "In Progress",
  "Proposal Sent": "In Progress",
  Won: "Closed",
  Converted: "Closed",
};

/** Every stored value that should be treated as the given canonical status. */
export function statusFilterValues(status: EnquiryStatus): StoredEnquiryStatus[] {
  switch (status) {
    case "In Progress":
      return ["In Progress", "In Discussion", "Proposal Sent"];
    case "Closed":
      return ["Closed", "Won", "Converted"];
    default:
      return [status];
  }
}

/** Maps any stored status (current or legacy) to the canonical pipeline value. */
export function resolveStoredStatus(value: string): EnquiryStatus {
  if ((ENQUIRY_STATUSES as readonly string[]).includes(value)) {
    return value as EnquiryStatus;
  }
  return LEGACY_STATUS_LABELS[value] ?? "New";
}

export const ENQUIRY_FORM_TYPES = ["contact", "consultation", "proposal", "newsletter"] as const;
export type EnquiryFormType = (typeof ENQUIRY_FORM_TYPES)[number];

/** A private, admin-only follow-up note. Append-only for audit history. */
export interface FollowUpNote {
  id: string;
  text: string;
  createdAt: Date;
}

export interface EnquiryDoc {
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
  /** Page the enquiry was submitted from, e.g. "/services". */
  pageSource: string;
  /** Canonical on new records; legacy values may exist on older documents. */
  status: StoredEnquiryStatus;
  /** Private follow-up notes; absent on records created before notes existed. */
  notes?: FollowUpNote[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriberDoc {
  email: string;
  source: string;
  createdAt: Date;
}

export function enquiries(): Collection<EnquiryDoc> {
  return getDb().collection<EnquiryDoc>("enquiries");
}

export function subscribers(): Collection<SubscriberDoc> {
  return getDb().collection<SubscriberDoc>("newsletter_subscribers");
}

/* ────────────────────────────────────────────────────────────
   Indexes
   Created once per warm instance. Idempotent, so it is safe to
   call on every request.
──────────────────────────────────────────────────────────── */

const INDEXES_READY = Symbol.for("yesbe.mongo.indexes");
interface GlobalWithIndexes {
  [INDEXES_READY]?: Promise<void>;
}

export function ensureIndexes(): Promise<void> {
  const g = globalThis as unknown as GlobalWithIndexes;
  if (!g[INDEXES_READY]) {
    g[INDEXES_READY] = (async () => {
      await Promise.all([
        // Admin list is always newest-first and filterable by status/service.
        enquiries().createIndexes([
          { key: { createdAt: -1 }, name: "createdAt_desc" },
          { key: { status: 1, createdAt: -1 }, name: "status_createdAt" },
          { key: { service: 1 }, name: "service" },
          { key: { email: 1 }, name: "email" },
          { key: { phone: 1 }, name: "phone" },
        ]),
        subscribers().createIndexes([
          { key: { createdAt: -1 }, name: "createdAt_desc" },
          // Sparse so a single email is only ever stored once.
          {
            key: { email: 1 },
            name: "email_unique",
            unique: true,
          },
        ]),
      ]);
    })().catch((err) => {
      // Never cache a failed attempt — let the next request retry.
      g[INDEXES_READY] = undefined;
      throw err;
    });
  }
  return g[INDEXES_READY];
}
