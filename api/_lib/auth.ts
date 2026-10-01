import {
  createHmac,
  randomBytes,
  scrypt as scryptCb,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendError } from "./http.ts";

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

export const SESSION_COOKIE = "yesbe_admin_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours
const SCRYPT_KEYLEN = 64;

/* ────────────────────────────────────────────────────────────
   Password verification
   Supports two env formats:
     ADMIN_PASSWORD_HASH = scrypt$<saltHex>$<hashHex>   (preferred)
     ADMIN_PASSWORD      = plaintext                     (fallback)
   Both comparisons are constant-time.
──────────────────────────────────────────────────────────── */

export async function createPasswordHash(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = await scrypt(password, salt, SCRYPT_KEYLEN);
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (hash) {
    const parts = hash.split("$");
    if (parts.length !== 3 || parts[0] !== "scrypt") return false;
    try {
      const salt = Buffer.from(parts[1], "hex");
      const expected = Buffer.from(parts[2], "hex");
      const derived = await scrypt(password, salt, expected.length);
      return derived.length === expected.length && timingSafeEqual(derived, expected);
    } catch {
      return false;
    }
  }

  const plain = process.env.ADMIN_PASSWORD;
  if (!plain) return false;
  return timingSafeEqual(sha256(password), sha256(plain));
}

function sha256(value: string): Buffer {
  return createHmac("sha256", "yesbe-constant-time").update(value).digest();
}

/* ────────────────────────────────────────────────────────────
   Session cookie: base64url(payload).base64url(HMAC-SHA256)
   Stateless, so every admin request is authorised by verifying the
   signature server-side. No client-side trust, no fake auth.
──────────────────────────────────────────────────────────── */

interface SessionPayload {
  email: string;
  exp: number;
}

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error("SESSION_SECRET missing or shorter than 32 characters");
  }
  return s;
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

function encode(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${data}.${sign(data)}`;
}

function decode(token: string): SessionPayload | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const data = token.slice(0, dot);
  const mac = token.slice(dot + 1);

  const expected = sign(data);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const parsed: unknown = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    if (typeof parsed !== "object" || parsed === null) return null;
    const { email, exp } = parsed as Partial<SessionPayload>;
    if (typeof email !== "string" || typeof exp !== "number") return null;
    if (Date.now() / 1000 > exp) return null;
    return { email, exp };
  } catch {
    return null;
  }
}

function readCookie(req: VercelRequest, name: string): string | null {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

export function setSessionCookie(res: VercelResponse, email: string): void {
  const token = encode({ email, exp: Date.now() / 1000 + SESSION_TTL_SECONDS });
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`,
  );
}

export function clearSessionCookie(res: VercelResponse): void {
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
  );
}

export function getSession(req: VercelRequest): SessionPayload | null {
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) return null;
  try {
    return decode(token);
  } catch {
    return null;
  }
}

/** Server-side authorisation gate for every admin route. */
export function requireAdmin(req: VercelRequest, res: VercelResponse): boolean {
  if (!process.env.ADMIN_EMAIL || !(process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH)) {
    sendError(res, 503, "Admin access is not configured");
    return false;
  }
  const session = getSession(req);
  if (!session) {
    sendError(res, 401, "Authentication required");
    return false;
  }
  if (session.email.toLowerCase() !== process.env.ADMIN_EMAIL.toLowerCase()) {
    sendError(res, 403, "Not authorised");
    return false;
  }
  return true;
}

export async function checkCredentials(email: string, password: string): Promise<boolean> {
  const expected = process.env.ADMIN_EMAIL;
  if (!expected) return false;
  const a = Buffer.from(email.trim().toLowerCase());
  const b = Buffer.from(expected.trim().toLowerCase());
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  return verifyPassword(password);
}
