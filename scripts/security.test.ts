/**
 * Security regression tests for controls that are easy to break by accident.
 *
 * Run: npm run test:security
 *
 * These exercise the shipping source (vercel.json headers, CSRF origin check,
 * password hashing, JSON-LD serialisation) without touching a database or the
 * network, so they are safe to run anywhere.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");

/* ── Security headers ─────────────────────────────────────── */

interface HeaderRule {
  source: string;
  headers: Array<{ key: string; value: string }>;
}

function globalHeaders(): Record<string, string> {
  const config = JSON.parse(readFileSync(join(ROOT, "vercel.json"), "utf8")) as {
    headers?: HeaderRule[];
  };
  const rule = (config.headers ?? []).find((r) => r.source === "/(.*)");
  const map: Record<string, string> = {};
  for (const h of rule?.headers ?? []) map[h.key.toLowerCase()] = h.value;
  return map;
}

test("global security headers are configured", () => {
  const headers = globalHeaders();
  for (const name of [
    "content-security-policy",
    "strict-transport-security",
    "x-content-type-options",
    "referrer-policy",
    "x-frame-options",
    "permissions-policy",
    "cross-origin-opener-policy",
    "cross-origin-resource-policy",
    "x-permitted-cross-domain-policies",
  ]) {
    assert.ok(headers[name], `${name} must be present in vercel.json`);
  }
  assert.equal(headers["x-content-type-options"], "nosniff");
  assert.match(headers["strict-transport-security"] ?? "", /max-age=\d+/);
});

test("CSP locks down high-risk directives", () => {
  const csp = globalHeaders()["content-security-policy"] ?? "";
  for (const directive of [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
  ]) {
    assert.ok(csp.includes(directive), `CSP must contain: ${directive}`);
  }
  assert.ok(!/script-src[^;]*'unsafe-eval'/.test(csp), "CSP must not allow unsafe-eval");
  assert.ok(!/script-src[^;]*\*/.test(csp), "CSP script-src must not use a wildcard host");
});

/* ── JSON-LD serialisation ────────────────────────────────── */

test("JSON-LD serialisation cannot break out of the script element", async () => {
  const { serializeJsonLd } = await import("../src/utils/jsonLd.ts");
  const payload = {
    name: "Evil </script><script>alert(1)</script>",
    line: "a\u2028b\u2029c",
  };
  const serialized = serializeJsonLd(payload);
  assert.ok(!serialized.includes("</script>"), "must not contain a literal closing tag");
  assert.ok(!serialized.includes("<"), "angle brackets must be escaped");
  assert.deepEqual(JSON.parse(serialized), payload, "escaping must preserve the JSON value");
});

test("markdown rendering sanitises HTML", () => {
  const source = readFileSync(join(ROOT, "src/knowledge/markdown.tsx"), "utf8");
  assert.match(source, /DOMPurify\.sanitize/, "markdown output must be passed through DOMPurify");
  assert.match(source, /USE_PROFILES/, "sanitizer must use an explicit profile");
});

/* ── CSRF origin check ────────────────────────────────────── */

interface MockRes {
  statusCode: number;
  body: unknown;
  headers: Record<string, string | number>;
  setHeader(k: string, v: string | number): void;
  status(c: number): MockRes;
  json(b: unknown): MockRes;
}

function mockRes(): MockRes {
  const res: MockRes = {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(k, v) {
      res.headers[k] = v;
    },
    status(c) {
      res.statusCode = c;
      return res;
    },
    json(b) {
      res.body = b;
      return res;
    },
  };
  return res;
}

type Req = Record<string, unknown>;

async function sameOrigin(req: Req): Promise<{ allowed: boolean; status: number }> {
  const { assertSameOrigin } = await import("../api/_lib/http.ts");
  const res = mockRes();
  const allowed = assertSameOrigin(req as never, res as never);
  return { allowed, status: res.statusCode };
}

test("CSRF check allows same-origin browser requests", async () => {
  const result = await sameOrigin({
    method: "POST",
    headers: { origin: "https://www.yesbe.tech", host: "www.yesbe.tech" },
  });
  assert.equal(result.allowed, true);
});

test("CSRF check allows non-browser clients without an Origin", async () => {
  assert.equal((await sameOrigin({ method: "POST", headers: {} })).allowed, true);
});

test("CSRF check blocks cross-site and sandboxed origins", async () => {
  const crossSite = await sameOrigin({
    method: "POST",
    headers: { origin: "https://evil.example", host: "www.yesbe.tech" },
  });
  assert.equal(crossSite.allowed, false);
  assert.equal(crossSite.status, 403);

  const nullOrigin = await sameOrigin({
    method: "POST",
    headers: { origin: "null", host: "www.yesbe.tech" },
  });
  assert.equal(nullOrigin.allowed, false);
});

test("CSRF check does not trust a client-supplied X-Forwarded-Host", async () => {
  const result = await sameOrigin({
    method: "POST",
    headers: {
      origin: "https://evil.example",
      host: "www.yesbe.tech",
      "x-forwarded-host": "evil.example",
    },
  });
  assert.equal(result.allowed, false, "X-Forwarded-Host must not widen the allowlist");
});

test("CSRF check only guards state-changing methods", async () => {
  const result = await sameOrigin({
    method: "GET",
    headers: { origin: "https://evil.example", host: "www.yesbe.tech" },
  });
  assert.equal(result.allowed, true);
});

/* ── Client IP extraction ─────────────────────────────────── */

test("rate-limit key prefers the platform-provided x-real-ip", async () => {
  const { clientIp } = await import("../api/_lib/http.ts");
  assert.equal(
    clientIp({ headers: { "x-real-ip": "203.0.113.7", "x-forwarded-for": "1.2.3.4" } } as never),
    "203.0.113.7",
  );
  assert.equal(
    clientIp({ headers: { "x-forwarded-for": "1.2.3.4, 10.0.0.1" } } as never),
    "1.2.3.4",
  );
  assert.equal(clientIp({ headers: {} } as never), "unknown");
});

/* ── Password hashing ─────────────────────────────────────── */

test("password hashes use scrypt with a random salt", async () => {
  const { createPasswordHash, verifyPassword } = await import("../api/_lib/auth.ts");
  const password = "Correct-Horse-Battery-Staple-9!";
  const first = await createPasswordHash(password);
  const second = await createPasswordHash(password);

  assert.match(first, /^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/);
  assert.notEqual(first, second, "each hash must use a fresh random salt");
  assert.ok(!first.includes(password), "the hash must not contain the plaintext");

  process.env.ADMIN_PASSWORD_HASH = first;
  delete process.env.ADMIN_PASSWORD;
  assert.equal(await verifyPassword(password), true);
  assert.equal(await verifyPassword("wrong-password"), false);
  assert.equal(await verifyPassword(""), false);
});

test("plaintext ADMIN_PASSWORD is never accepted", async () => {
  const { verifyPassword } = await import("../api/_lib/auth.ts");
  const previousHash = process.env.ADMIN_PASSWORD_HASH;
  delete process.env.ADMIN_PASSWORD_HASH;
  process.env.ADMIN_PASSWORD = "plaintext-must-not-work";
  try {
    assert.equal(await verifyPassword("plaintext-must-not-work"), false);
  } finally {
    if (previousHash === undefined) delete process.env.ADMIN_PASSWORD_HASH;
    else process.env.ADMIN_PASSWORD_HASH = previousHash;
    delete process.env.ADMIN_PASSWORD;
  }
});
