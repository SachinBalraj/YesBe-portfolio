/**
 * End-to-end API test.
 *
 * Boots a real MongoDB (mongodb-memory-server), points MONGODB_URI at it, and
 * drives the actual Vercel handlers with mocked req/res objects. This exercises
 * validation, auth, the MongoDB writes and the authorisation rules for real.
 *
 * Run: npm run test:api
 *
 * NOTE: NODE_ENV=test disables the in-memory rate limiter (see
 * api/_lib/rateLimit.ts) so the limit behaviour is tested explicitly in its own
 * dedicated test instead of interfering with the rest of the suite.
 */
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test, { before, after } from "node:test";
import { ObjectId } from "mongodb";
import { ENQUIRY_STATUSES } from "../api/_lib/db.ts";
import { createPasswordHash } from "../api/_lib/auth.ts";

process.env.NODE_ENV = "test";
process.env.ADMIN_EMAIL = "hello@yesbe.tech";
process.env.ADMIN_USERNAME = "yesbe.tech";
delete process.env.ADMIN_LOGIN_ID;
delete process.env.ADMIN_PASSWORD;
process.env.SESSION_SECRET = "test-secret-value-that-is-long-enough-123456";

let server: import("mongodb-memory-server").MongoMemoryServer;
let client: import("mongodb").MongoClient;
let db: import("mongodb").Db;

type Handler = (req: unknown, res: unknown) => unknown | Promise<unknown>;
let H: Record<string, Handler>;

before(async () => {
  process.env.ADMIN_PASSWORD_HASH = await createPasswordHash("s3cret-admin-pw");

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const { MongoClient } = await import("mongodb");
  server = await MongoMemoryServer.create();
  process.env.MONGODB_URI = server.getUri();
  process.env.MONGODB_DB_NAME = "yesbe_test";

  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db("yesbe_test");

  H = {
    submit: (await import("../api/enquiries.ts")).default,
    subscribe: (await import("../api/newsletter/subscribe.ts")).default,
    login: (await import("../api/admin/login.ts")).default,
    logout: (await import("../api/admin/logout.ts")).default,
    session: (await import("../api/admin/session.ts")).default,
    list: (await import("../api/admin/enquiries/index.ts")).default,
    detail: (await import("../api/admin/enquiries/[id].ts")).default,
    newsletter: (await import("../api/newsletter/index.ts")).default,
  };
});

after(async () => {
  // The handlers cache their own MongoClient on globalThis; it must be closed
  // too or its connection pool keeps the event loop alive and the test runner
  // never exits.
  const { getMongoClient } = await import("../api/_lib/db.ts");
  await getMongoClient().close().catch(() => undefined);
  await client?.close();
  await server?.stop();
});

interface MockRes {
  statusCode: number;
  body: any;
  headers: Record<string, string | number>;
  setHeader(k: string, v: string | number): void;
  status(c: number): MockRes;
  json(b: unknown): MockRes;
}

function mockRes(): MockRes {
  const res: MockRes = {
    statusCode: 0,
    body: undefined,
    headers: {},
    setHeader(k, v) { res.headers[k] = v; },
    status(c) { res.statusCode = c; return res; },
    json(b) {
      // Real Vercel serialises here, which is what turns ObjectId into a hex
      // string and Date into an ISO string on the wire.
      const text = JSON.stringify(b);
      res.body = text === undefined ? undefined : JSON.parse(text);
      return res;
    },
  };
  return res;
}

async function call(
  name: keyof typeof H | string,
  req: Record<string, unknown> = {},
): Promise<{ status: number; body: any; res: MockRes }> {
  const res = mockRes();
  await H[name]!({ method: "GET", headers: {}, query: {}, ...req }, res);
  return { status: res.statusCode, body: res.body, res };
}

const ADMIN = { username: "hello@yesbe.tech", password: "s3cret-admin-pw" };

/** Logs in and returns the session cookie header pair. */
async function authedCookie(): Promise<string> {
  const { res } = await call("login", { method: "POST", body: ADMIN });
  return String(res.headers["Set-Cookie"]).split(";")[0]!;
}

const validEnquiry = {
  name: "Priya Sharma",
  email: "Priya@Example.COM",
  phone: "+91 98765 43210",
  company: "Acme",
  designation: "CTO",
  service: "Web Development",
  budget: "₹1L - ₹5L",
  timeline: "1-3 months",
  projectDescription: "We need a new customer portal.",
  businessChallenges: "Manual approvals",
  goals: "Reduce turnaround",
  formType: "consultation",
  pageSource: "/contact",
};

/* ── Public enquiry endpoint ─────────────────────────────── */

test("stores a valid enquiry in MongoDB", async () => {
  const { status, body } = await call("submit", { method: "POST", body: validEnquiry });
  assert.equal(status, 201);
  assert.equal(body.ok, true);

  const doc = await db.collection("enquiries").findOne({ email: "priya@example.com" });
  assert.ok(doc, "document should be in MongoDB");
  assert.equal(doc.name, "Priya Sharma");
  assert.equal(doc.status, "New", "must default to New");
  assert.equal(doc.pageSource, "/contact");
  assert.equal(doc.formType, "consultation");
  assert.ok(doc.createdAt instanceof Date);
  assert.ok(doc.updatedAt instanceof Date);
});

test("rejects missing required fields with 422 and field errors", async () => {
  const { status, body } = await call("submit", { method: "POST", body: { name: "A" } });
  assert.equal(status, 422);
  assert.equal(body.ok, false);
  const fields = body.fields.map((f: any) => f.field);
  assert.ok(fields.includes("email"));
  assert.ok(fields.includes("service"));
  assert.ok(fields.includes("projectDescription"));
});

test("rejects an invalid email", async () => {
  const { status } = await call("submit", { method: "POST", body: { ...validEnquiry, email: "not-an-email" } });
  assert.equal(status, 422);
});

test("rejects a script-like phone number", async () => {
  const { status } = await call("submit", { method: "POST", body: { ...validEnquiry, phone: "<script>alert(1)</script>" } });
  assert.equal(status, 422, "non-telephone characters must be rejected");
});

test("stores a text field verbatim, including HTML-significant characters", async () => {
  const desc = "Compare a < b and use tags <script>alert(1)</script> in our copy";
  const { status } = await call("submit", {
    method: "POST",
    body: {
      ...validEnquiry,
      projectDescription: desc,
      name: "Globex Owner",
      email: "html@example.com",
      company: "Globex",
      service: "Cloud Migration",
      pageSource: "/services",
    },
  });
  assert.equal(status, 201);
  const doc = await db.collection("enquiries").findOne({ email: "html@example.com" });
  assert.equal(doc.projectDescription, desc, "no lossy escaping should be applied");
});

test("honeypot returns success but stores nothing", async () => {
  const before = await db.collection("enquiries").countDocuments();
  const { status, body } = await call("submit", {
    method: "POST",
    body: { ...validEnquiry, name: "Bot", company_website: "http://spam.example" },
  });
  assert.equal(status, 202);
  assert.equal(body.ok, true, "must look successful so the bot learns nothing");
  assert.equal(await db.collection("enquiries").countDocuments(), before, "nothing may be stored");
});

test("NoSQL operator injection keys are dropped", async () => {
  const payload = JSON.parse(
    '{"name":"Eve","email":"eve@example.com","service":"AI","projectDescription":"a valid long description","name":"Initech Owner","company":"Initech","$where":"1==1","constructor":"x"}',
  );
  const { status } = await call("submit", { method: "POST", body: payload });
  assert.equal(status, 201);
  const doc: any = await db.collection("enquiries").findOne({ email: "eve@example.com" });
  assert.equal(Object.hasOwn(doc, "$where"), false, "$where must not be stored");
  assert.equal(Object.hasOwn(doc, "constructor"), false, "constructor must not be stored");
  assert.equal(doc.$where, undefined, "$where must not be readable");
});

test("oversized body is rejected with 413", async () => {
  const { status } = await call("submit", {
    method: "POST",
    headers: { "content-length": String(1024 * 1024) },
    body: validEnquiry,
  });
  assert.equal(status, 413);
});

test("non-JSON body is rejected", async () => {
  const { status } = await call("submit", { method: "POST", body: "not json at all" });
  assert.equal(status, 400);
});

test("repeated identical submission is idempotent", async () => {
  const before = await db.collection("enquiries").countDocuments();
  const { status, body } = await call("submit", { method: "POST", body: validEnquiry });
  assert.equal(status, 201);
  assert.equal(body.ok, true);
  assert.equal(
    await db.collection("enquiries").countDocuments(),
    before,
    "an accidental double submit must not create a second lead",
  );
});

test("public endpoint allows POST only", async () => {
  const get = await call("submit", { method: "GET" });
  assert.equal(get.status, 405);
  assert.equal(get.res.headers.Allow, "POST");
  assert.equal((await call("submit", { method: "DELETE" })).status, 405);
  assert.equal((await call("submit", { method: "PUT" })).status, 405);
  assert.equal((await call("submit", { method: "PATCH" })).status, 405);
});

/* ── Newsletter ──────────────────────────────────────────── */

test("newsletter stores once and is idempotent", async () => {
  const first = await call("subscribe", { method: "POST", body: { email: "Reader@Example.com", source: "/blog" } });
  assert.equal(first.status, 201);

  const second = await call("subscribe", { method: "POST", body: { email: "reader@example.com", source: "/blog" } });
  assert.ok([200, 201].includes(second.status), "repeat subscribe must not error out");
  assert.equal(second.body.ok, true);

  assert.equal(
    await db.collection("newsletter_subscribers").countDocuments({ email: "reader@example.com" }),
    1,
    "must be stored exactly once",
  );
});

test("newsletter rejects an invalid email", async () => {
  const { status } = await call("subscribe", { method: "POST", body: { email: "nope" } });
  assert.equal(status, 422);
});

test("newsletter honeypot stores nothing", async () => {
  const before = await db.collection("newsletter_subscribers").countDocuments();
  const { status } = await call("subscribe", {
    method: "POST",
    body: { email: "bot@example.com", company_website: "http://spam.example" },
  });
  assert.equal(status, 202);
  assert.equal(await db.collection("newsletter_subscribers").countDocuments(), before);
});

/* ── Admin authentication ────────────────────────────────── */

test("admin routes reject an unauthenticated request", async () => {
  for (const name of ["list", "newsletter", "session"]) {
    assert.equal((await call(name, { method: "GET" })).status, 401, `${name} must require auth`);
  }
  const id = new ObjectId().toHexString();
  assert.equal((await call("detail", { method: "GET", query: { id } })).status, 401);
  assert.equal((await call("detail", { method: "PATCH", query: { id }, body: { status: "Closed" } })).status, 401);
  assert.equal((await call("detail", { method: "DELETE", query: { id } })).status, 401);
});

test("a forged session cookie is rejected", async () => {
  const forged = `${Buffer.from(JSON.stringify({ email: process.env.ADMIN_EMAIL, exp: 9e12 })).toString("base64url")}.deadbeef`;
  assert.equal(
    (await call("session", { method: "GET", headers: { cookie: `yesbe_admin_session=${encodeURIComponent(forged)}` } })).status,
    401,
    "HMAC signature must be verified",
  );
});

test("a tampered payload is rejected", async () => {
  // Valid signature shape but the email was swapped after signing.
  const login = await call("login", { method: "POST", body: ADMIN });
  const real = decodeURIComponent(String(login.res.headers["Set-Cookie"]).split(";")[0]!.split("=")[1]!);
  const [data] = real.split(".");
  const forged = `${Buffer.from(JSON.stringify({ email: "attacker@evil.com", exp: 9e12 })).toString("base64url")}.${data.split(".").pop()}`;
  assert.ok(forged.includes("."));
  assert.equal(
    (await call("session", { method: "GET", headers: { cookie: `yesbe_admin_session=${encodeURIComponent(forged)}` } })).status,
    401,
  );
});

test("an expired session cookie is rejected", async () => {
  const data = Buffer.from(
    JSON.stringify({ email: process.env.ADMIN_EMAIL, exp: Math.floor(Date.now() / 1000) - 60 }),
  ).toString("base64url");
  const mac = createHmac("sha256", process.env.SESSION_SECRET!)
    .update(data)
    .digest("base64url");
  const token = `${data}.${mac}`;
  const res = await call("session", {
    headers: { cookie: `yesbe_admin_session=${encodeURIComponent(token)}` },
  });
  assert.equal(res.status, 401, "an expired but correctly signed session must be rejected");
});

test("login rejects a wrong password", async () => {
  const { status, body } = await call("login", {
    method: "POST",
    body: { username: ADMIN.username, password: "wrong" },
  });
  assert.equal(status, 401);
  assert.equal(body.error, "Invalid admin ID or password", "must not reveal whether the admin ID exists");
});

test("login rejects an unknown admin ID with the same message", async () => {
  const { status, body } = await call("login", {
    method: "POST",
    body: { username: "nobody", password: ADMIN.password },
  });
  assert.equal(status, 401);
  assert.equal(body.error, "Invalid admin ID or password");
});

test("login accepts the ADMIN_EMAIL identifier", async () => {
  const { status, body } = await call("login", {
    method: "POST",
    body: { email: process.env.ADMIN_EMAIL, password: ADMIN.password },
  });
  assert.equal(status, 200);
  assert.equal(body.username, "hello@yesbe.tech");
});

test("email-only configuration accepts only ADMIN_EMAIL", async () => {
  const previousUsername = process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_USERNAME;
  delete process.env.ADMIN_LOGIN_ID;
  try {
    const login = await call("login", {
      method: "POST",
      body: { username: "hello@yesbe.tech", password: ADMIN.password },
    });
    assert.equal(login.status, 200);
    assert.equal(login.body.username, "hello@yesbe.tech");

    assert.equal(
      (await call("login", {
        method: "POST",
        body: { username: "yesbe.tech", password: ADMIN.password },
      })).status,
      401,
      "removed legacy IDs must stop working",
    );
  } finally {
    process.env.ADMIN_USERNAME = previousUsername;
  }
});

test("missing session secret fails closed with JSON instead of an unhandled 500", async () => {
  const previous = process.env.SESSION_SECRET;
  delete process.env.SESSION_SECRET;
  try {
    const { status, body } = await call("login", {
      method: "POST",
      body: { username: ADMIN.username, password: ADMIN.password },
    });
    assert.equal(status, 503);
    assert.equal(body.ok, false);
    assert.equal(body.error, "Admin access is not configured");
  } finally {
    process.env.SESSION_SECRET = previous;
  }
});

test("username-only configuration signs in and authorises admin APIs", async () => {
  const previousEmail = process.env.ADMIN_EMAIL;
  delete process.env.ADMIN_EMAIL;
  try {
    const login = await call("login", {
      method: "POST",
      body: { username: "yesbe.tech", password: ADMIN.password },
    });
    assert.equal(login.status, 200);
    assert.equal(login.body.username, "yesbe.tech");

    const cookie = String(login.res.headers["Set-Cookie"]).split(";")[0]!;
    const session = await call("session", { headers: { cookie } });
    assert.equal(session.status, 200);
    assert.equal(session.body.username, "yesbe.tech");
  } finally {
    process.env.ADMIN_EMAIL = previousEmail;
  }
});

test("login issues a signed httpOnly Secure SameSite=Strict cookie", async () => {
  const { status, res } = await call("login", { method: "POST", body: ADMIN });
  assert.equal(status, 200);
  const cookie = String(res.headers["Set-Cookie"]);
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /Secure/);
  assert.match(cookie, /SameSite=Strict/);
  assert.match(cookie, /Path=\//);
});

test("login sets no cache headers on API responses", async () => {
  const { res } = await call("session", { method: "GET", headers: { cookie: await authedCookie() } });
  assert.equal(res.headers["Cache-Control"], "no-store");
});

/* ── Admin listing, search, filter ────────────────────────── */

test("admin lists enquiries newest first with status counts", async () => {
  const { status, body } = await call("list", { method: "GET", headers: { cookie: await authedCookie() } });
  assert.equal(status, 200);
  assert.equal(body.total, 3, "three enquiries were created");
  assert.equal(body.page, 1);
  assert.equal(body.limit, 25);
  const times = body.items.map((i: any) => new Date(i.createdAt).getTime());
  for (let i = 1; i < times.length; i++) {
    assert.ok(times[i - 1]! >= times[i]!, "must be sorted newest first");
  }
  const summed = Object.values(body.counts).reduce((a: any, b: any) => a + b, 0);
  assert.equal(summed, body.total, "counts must cover every enquiry");
});

test("admin search matches name, email and company", async () => {
  const cookie = await authedCookie();
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { q: "Priya" } })).body.total, 1);
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { q: "priya@example.com" } })).body.total, 1);
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { q: "acme" } })).body.total, 1);
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { q: "zzzznotfound" } })).body.total, 0);
});

test("search input is literal, not a regex", async () => {
  const cookie = await authedCookie();
  const { status, body } = await call("list", { method: "GET", headers: { cookie }, query: { q: ".*" } });
  assert.equal(status, 200);
  assert.equal(body.total, 0, "'.*' must not act as a wildcard");
  const paren = await call("list", { method: "GET", headers: { cookie }, query: { q: "(" } });
  assert.equal(paren.status, 200, "a lone bracket must not throw");
});

test("admin can filter by status and service", async () => {
  const cookie = await authedCookie();
  const byService = await call("list", { method: "GET", headers: { cookie }, query: { service: "Web Development" } });
  assert.equal(byService.status, 200);
  assert.equal(byService.body.total, 1, "only Priya chose Web Development");
  assert.ok(byService.body.services.includes("Web Development"), "service list should be populated");
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { status: "New" } })).body.total > 0, true);
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { status: "Closed" } })).body.total, 0);
});

test("invalid filter values are rejected", async () => {
  const cookie = await authedCookie();
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { status: "Hacked" } })).status, 400);
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { from: "not-a-date" } })).status, 400);
});

test("pagination works", async () => {
  const cookie = await authedCookie();
  const p1 = await call("list", { method: "GET", headers: { cookie }, query: { limit: "2", page: "1" } });
  assert.equal(p1.body.items.length, 2);
  assert.equal(p1.body.limit, 2);
  assert.equal(p1.body.pages, 2, "3 enquiries over 2 per page = 2 pages");
  const p2 = await call("list", { method: "GET", headers: { cookie }, query: { limit: "2", page: "2" } });
  assert.equal(p2.body.items.length, 1, "last page has the remainder");
  const ids1 = p1.body.items.map((i: any) => i._id);
  const ids2 = p2.body.items.map((i: any) => i._id);
  assert.ok(!ids1.some((id: string) => ids2.includes(id)), "pages must not overlap");
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { limit: "99999" } })).body.limit, 100, "limit must be capped");
});

test("date range filter works", async () => {
  const cookie = await authedCookie();
  const today = new Date().toISOString().slice(0, 10);
  const { status, body } = await call("list", { method: "GET", headers: { cookie }, query: { from: today, to: today } });
  assert.equal(status, 200);
  assert.equal(body.total, (await db.collection("enquiries").countDocuments()), "today's range should include everything");
});

/* ── Admin mutations ─────────────────────────────────────── */

test("admin updates status, and status only", async () => {
  const cookie = await authedCookie();
  const list = await call("list", { method: "GET", headers: { cookie }, query: { q: "Priya" } });
  const id = list.body.items[0]._id;

  const patched = await call("detail", { method: "PATCH", headers: { cookie }, query: { id }, body: { status: "Contacted" } });
  assert.equal(patched.status, 200);
  assert.equal(patched.body.item.status, "Contacted");
  assert.equal(patched.body.item.email, "priya@example.com", "other fields untouched");

  await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id },
    body: { status: "Closed", email: "attacker@evil.com", name: "Hacker", _id: "0" },
  });
  const after = await call("detail", { method: "GET", headers: { cookie }, query: { id } });
  assert.equal(after.body.item.email, "priya@example.com", "email must not be writable");
  assert.equal(after.body.item.name, "Priya Sharma", "name must not be writable");
  assert.equal(after.body.item.status, "Closed");
  assert.ok(new Date(after.body.item.updatedAt) >= new Date(list.body.items[0].updatedAt), "updatedAt must advance");
});

test("retired status values are rejected by the closed enum", async () => {
  const cookie = await authedCookie();
  const list = await call("list", { method: "GET", headers: { cookie } });
  const id = list.body.items[0]._id;

  for (const retired of ["In Discussion", "Proposal Sent", "Won", "Converted"]) {
    const res = await call("detail", {
      method: "PATCH",
      headers: { cookie },
      query: { id },
      body: { status: retired },
    });
    assert.equal(res.status, 422, `${retired} must be rejected`);
  }

  // The canonical in-progress value is writable.
  const inProgress = await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id },
    body: { status: "In Progress" },
  });
  assert.equal(inProgress.status, 200);
  assert.equal(inProgress.body.item.status, "In Progress");

  const after = await call("detail", { method: "GET", headers: { cookie }, query: { id } });
  assert.ok(
    ENQUIRY_STATUSES.includes(after.body.item.status),
    "status must remain a current value",
  );
});

test("invalid status value is rejected", async () => {
  const cookie = await authedCookie();
  const list = await call("list", { method: "GET", headers: { cookie } });
  const { status } = await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id: list.body.items[0]._id },
    body: { status: "Definitely Not A Status" },
  });
  assert.equal(status, 422);
});

test("admin appends private follow-up notes without touching client fields", async () => {
  const cookie = await authedCookie();
  const list = await call("list", { method: "GET", headers: { cookie }, query: { q: "Priya" } });
  const item = list.body.items[0];
  const id = item._id;
  const before = item.notes?.length ?? 0;

  const res = await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id },
    body: { note: "Called client; awaiting budget confirmation." },
  });
  assert.equal(res.status, 200);
  assert.equal(res.body.item.notes.length, before + 1);
  assert.equal(
    res.body.item.notes[res.body.item.notes.length - 1].text,
    "Called client; awaiting budget confirmation.",
  );
  assert.equal(res.body.item.email, "priya@example.com", "client email must not change");
  assert.equal(res.body.item.name, "Priya Sharma", "client name must not change");
});

test("empty follow-up note is rejected", async () => {
  const cookie = await authedCookie();
  const list = await call("list", { method: "GET", headers: { cookie }, query: { q: "Priya" } });
  const res = await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id: list.body.items[0]._id },
    body: { note: "   " },
  });
  assert.equal(res.status, 422);
});

test("dashboard summary is global and reconciles", async () => {
  const cookie = await authedCookie();
  // A filtered request must not shrink the summary cards.
  const filtered = await call("list", {
    method: "GET",
    headers: { cookie },
    query: { q: "Priya" },
  });
  assert.equal(filtered.status, 200);
  assert.equal(filtered.body.summary.total, await db.collection("enquiries").countDocuments());
  const summed = Object.values(filtered.body.summary.counts).reduce((a: number, b: any) => a + b, 0);
  assert.equal(summed as number, filtered.body.summary.total, "summary counts must cover every enquiry");
  assert.equal(
    filtered.body.summary.subscribers,
    await db.collection("newsletter_subscribers").countDocuments(),
    "subscriber count must be included",
  );
});

test("admin can sort and invalid sort values are rejected", async () => {
  const cookie = await authedCookie();
  const asc = await call("list", {
    method: "GET",
    headers: { cookie },
    query: { sort: "createdAt", dir: "asc" },
  });
  const times = asc.body.items.map((i: any) => new Date(i.createdAt).getTime());
  for (let i = 1; i < times.length; i++) {
    assert.ok(times[i - 1]! <= times[i]!, "ascending sort must be oldest first");
  }
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { sort: "nope" } })).status, 400);
  assert.equal((await call("list", { method: "GET", headers: { cookie }, query: { dir: "sideways" } })).status, 400);
});

test("legacy ADMIN_USERNAME still signs in while configured", async () => {
  const { status, body } = await call("login", {
    method: "POST",
    body: { username: "yesbe.tech", password: ADMIN.password },
  });
  assert.equal(status, 200);
  assert.equal(body.username, process.env.ADMIN_EMAIL, "session subject remains stable");
});

test("cross-site state changes are blocked (CSRF)", async () => {
  const cookie = await authedCookie();
  const list = await call("list", { method: "GET", headers: { cookie } });
  const id = list.body.items[0]._id;
  const { status } = await call("detail", {
    method: "PATCH",
    headers: { cookie, origin: "https://evil.example", host: "localhost" },
    query: { id },
    body: { status: "Closed" },
  });
  assert.equal(status, 403, "a browser-originated cross-site PATCH must be rejected");
});

test("malformed ids are rejected", async () => {
  const cookie = await authedCookie();
  for (const id of ["../../etc/passwd", "not-an-id", "12345678901", "zzzzzzzzzzzzzzzzzzzzzzzz"]) {
    const { status } = await call("detail", { method: "GET", headers: { cookie }, query: { id } });
    assert.equal(status, 400, `id ${id} must be rejected (got ${status})`);
  }
});

test("unknown but well-formed id returns 404", async () => {
  const cookie = await authedCookie();
  assert.equal(
    (await call("detail", { method: "GET", headers: { cookie }, query: { id: "0123456789abcdef01234567" } })).status,
    404,
  );
});

test("admin deletes an enquiry, and a second delete 404s", async () => {
  const cookie = await authedCookie();
  const list = await call("list", { method: "GET", headers: { cookie }, query: { q: "Priya" } });
  const id = list.body.items[0]._id;

  assert.equal((await call("detail", { method: "DELETE", headers: { cookie }, query: { id } })).status, 200);
  assert.equal(await db.collection("enquiries").countDocuments({ _id: new ObjectId(id) }), 0);
  assert.equal((await call("detail", { method: "DELETE", headers: { cookie }, query: { id } })).status, 404);
});

test("logout clears the cookie", async () => {
  const cookie = await authedCookie();
  const { res } = await call("logout", { method: "POST", headers: { cookie } });
  assert.match(String(res.headers["Set-Cookie"]), /Max-Age=0/);
});

/* ── Rate limiting (NODE_ENV=test bypasses it) ────────────── */

test("rateLimit helper blocks a burst beyond its limit", async () => {
  const { rateLimit } = await import("../api/_lib/rateLimit.ts");
  const key = `test-burst-${Date.now()}`;
  const results = Array.from({ length: 8 }, () => rateLimit(key, 3, 60_000));
  assert.equal(results.filter((r) => r.allowed).length, 3, "only 3 of 8 allowed");
  assert.equal(results[7]!.allowed, false);
  assert.ok(results[7]!.retryAfterSeconds > 0);
});

test("rateLimit windows are per key", async () => {
  const { rateLimit } = await import("../api/_lib/rateLimit.ts");
  const stamp = Date.now();
  rateLimit(`a-${stamp}`, 1, 60_000);
  assert.equal(rateLimit(`b-${stamp}`, 1, 60_000).allowed, true, "different key must be independent");
  assert.equal(rateLimit(`a-${stamp}`, 1, 60_000).allowed, false);
});

/* ── Indexes ─────────────────────────────────────────────── */

test("unique index prevents duplicate subscribers", async () => {
  const indexes = await db.collection("newsletter_subscribers").indexes();
  const unique = indexes.find((i) => i.name === "email_unique");
  assert.ok(unique, "email_unique index should exist");
  assert.equal(unique!.unique, true);
});

test("admin indexes support the dashboard queries", async () => {
  const names = (await db.collection("enquiries").indexes()).map((i) => i.name);
  for (const expected of ["createdAt_desc", "status_createdAt", "service", "email", "phone"]) {
    assert.ok(names.includes(expected), `missing index ${expected}`);
  }
});