/**
 * Lightweight abuse protection for the public write endpoints.
 *
 * NOTE ON SCOPE: this counter lives in the serverless instance's memory. It
 * reliably throttles a single visitor and bursts from one warm instance, but
 * Vercel can route consecutive requests to different instances, so it is not a
 * globally exact limit. For hard global limits, put a WAF or a shared store
 * (Upstash Redis / Vercel KV) in front — see the notes in the final report.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const BUCKETS = Symbol.for("yesbe.ratelimit.buckets");
interface GlobalWithBuckets {
  [BUCKETS]?: Map<string, Bucket>;
}

function store(): Map<string, Bucket> {
  const g = globalThis as unknown as GlobalWithBuckets;
  if (!g[BUCKETS]) g[BUCKETS] = new Map();
  return g[BUCKETS];
}

// Bound memory: drop expired buckets periodically.
const SWEEP_INTERVAL_MS = 60_000;
let lastSweep = 0;

function sweep(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  const map = store();
  for (const [key, bucket] of map) {
    if (bucket.resetAt <= now) map.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Fixed-window limiter. `limit` submissions per `windowMs` per key.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const map = store();
  const existing = map.get(key);

  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: limit - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/**
 * Limits default to production-safe values and can be raised for local
 * development and automated testing, e.g. ENQUIRY_RATE_LIMIT=1000.
 */
function limitFromEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.trunc(parsed) : fallback;
}

/** Public enquiry form: 5 submissions per 10 minutes per IP. */
export const ENQUIRY_LIMIT = {
  limit: limitFromEnv("ENQUIRY_RATE_LIMIT", 5),
  windowMs: 10 * 60_000,
} as const;
/** Newsletter: 3 per hour per IP. */
export const SUBSCRIBE_LIMIT = {
  limit: limitFromEnv("NEWSLETTER_RATE_LIMIT", 3),
  windowMs: 60 * 60_000,
} as const;
/** Admin login: 8 attempts per 15 minutes per IP, to slow credential stuffing. */
export const LOGIN_LIMIT = {
  limit: limitFromEnv("LOGIN_RATE_LIMIT", 8),
  windowMs: 15 * 60_000,
} as const;

/**
 * Wrapper used by the HTTP handlers. The limiter itself stays pure so it can be
 * unit tested directly; only the handler-facing entry point is relaxed under
 * NODE_ENV=test so unrelated tests are not throttled by a shared counter.
 */
export function guard(key: string, limit: number, windowMs: number): RateLimitResult {
  if (process.env.NODE_ENV === "test") {
    return { allowed: true, remaining: limit, retryAfterSeconds: 0 };
  }
  return rateLimit(key, limit, windowMs);
}
