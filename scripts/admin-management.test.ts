import assert from "node:assert/strict";
import test, { after, before, beforeEach } from "node:test";
import { ENQUIRY_STATUSES } from "../api/_lib/db.ts";
import { createPasswordHash } from "../api/_lib/auth.ts";

process.env.NODE_ENV = "test";
process.env.ADMIN_EMAIL = "yesbe.tech@gmail.com";
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
  process.env.MONGODB_DB_NAME = "yesbe_admin_management_test";

  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.MONGODB_DB_NAME);

  H = {
    submit: (await import("../api/enquiries.ts")).default,
    subscribe: (await import("../api/newsletter/subscribe.ts")).default,
    login: (await import("../api/admin/login.ts")).default,
    list: (await import("../api/admin/enquiries/index.ts")).default,
    detail: (await import("../api/admin/enquiries/[id].ts")).default,
    clients: (await import("../api/admin/clients.ts")).default,
    settings: (await import("../api/admin/settings.ts")).default,
    exportEnquiries: (await import("../api/admin/enquiries/export.ts")).default,
    newsletter: (await import("../api/newsletter/index.ts")).default,
    unsubscribe: (await import("../api/newsletter/unsubscribe.ts")).default,
    exportSubscribers: (await import("../api/newsletter/export.ts")).default,
  };
});

beforeEach(async () => {
  await Promise.all([
    db.collection("enquiries").deleteMany({}),
    db.collection("newsletter_subscribers").deleteMany({}),
  ]);
});

after(async () => {
  const { getMongoClient } = await import("../api/_lib/db.ts");
  await getMongoClient().close().catch(() => undefined);
  await client?.close();
  await server?.stop();
});

interface MockRes {
  statusCode: number;
  body: any;
  text: string;
  headers: Record<string, string | number>;
  setHeader(k: string, v: string | number): void;
  status(c: number): MockRes;
  json(b: unknown): MockRes;
  send(b: string): MockRes;
  end(b: string): MockRes;
}

function mockRes(): MockRes {
  const res: MockRes = {
    statusCode: 0,
    body: undefined,
    text: "",
    headers: {},
    setHeader(k, v) { res.headers[k] = v; },
    status(c) { res.statusCode = c; return res; },
    json(b) {
      const text = JSON.stringify(b);
      res.body = text === undefined ? undefined : JSON.parse(text);
      res.text = text ?? "";
      return res;
    },
    send(b) { res.text = b; return res; },
    end(b) { res.text = b; return res; },
  };
  return res;
}

async function call(
  name: keyof typeof H | string,
  req: Record<string, unknown> = {},
): Promise<{ status: number; body: any; text: string; res: MockRes }> {
  const res = mockRes();
  await H[name]!({ method: "GET", headers: {}, query: {}, ...req }, res);
  return { status: res.statusCode, body: res.body, text: res.text, res };
}

const ADMIN = { username: "yesbe.tech@gmail.com", password: "s3cret-admin-pw" };

async function authedCookie(): Promise<string> {
  const { res } = await call("login", { method: "POST", body: ADMIN });
  return String(res.headers["Set-Cookie"]).split(";")[0]!;
}

async function submitEnquiry(overrides: Record<string, unknown> = {}): Promise<void> {
  const res = await call("submit", {
    method: "POST",
    body: {
      name: "Management Test User",
      email: "management@example.com",
      phone: "+91 98123 45678",
      service: "Web Development",
      projectDescription: "Please build a new customer portal.",
      formType: "consultation",
      pageSource: "/contact",
      ...overrides,
    },
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.stored, true);
}

test("settings endpoint exposes only non-sensitive configuration", async () => {
  const cookie = await authedCookie();
  const res = await call("settings", { headers: { cookie } });

  assert.equal(res.status, 200);
  assert.equal(res.body.settings.adminEmail, "yesbe.tech@gmail.com");
  assert.equal(res.body.settings.timeZone, "Asia/Kolkata");
  assert.deepEqual(res.body.settings.statuses, ENQUIRY_STATUSES);
  assert.ok(res.body.settings.formTypes.includes("ai-automation"));
  assert.ok(res.body.settings.categories.includes("project"));
  assert.equal(res.text.includes("ADMIN_PASSWORD_HASH"), false);
  assert.equal(res.text.includes("s3cret-admin-pw"), false);
});

test("enquiries are stored with canonical form metadata and can be filtered by category", async () => {
  await submitEnquiry();
  await submitEnquiry({
    name: "Industry User",
    email: "industry@example.com",
    industry: "Healthcare",
    formType: "industry",
    pageSource: "/industries/healthcare",
    projectDescription: "We need patient workflow automation.",
  });
  await submitEnquiry({
    name: "Service User",
    email: "service@example.com",
    formType: "service",
    pageSource: "/services/web-development",
    projectDescription: "We need a redesign for our marketing site.",
  });
  await submitEnquiry({
    name: "Project User",
    email: "project@example.com",
    formType: "contact",
    pageSource: "/case-studies/acme",
    projectDescription: "We want a similar case study experience.",
  });

  const cookie = await authedCookie();
  const all = await call("list", { headers: { cookie } });
  assert.equal(all.body.total, 4);
  assert.equal(all.body.items.find((i: any) => i.email === "industry@example.com").sourceCategory, "industry");
  assert.equal(all.body.items.find((i: any) => i.email === "service@example.com").sourceCategory, "service");
  assert.equal(all.body.items.find((i: any) => i.email === "project@example.com").sourceCategory, "project");

  for (const [category, expectedEmail] of [
    ["consultation", "management@example.com"],
    ["industry", "industry@example.com"],
    ["service", "service@example.com"],
    ["project", "project@example.com"],
  ]) {
    const filtered = await call("list", { headers: { cookie }, query: { category } });
    assert.equal(filtered.body.total, 1, `${category} filter must match one record`);
    assert.equal(filtered.body.items[0].email, expectedEmail);
  }

  assert.equal((await call("list", { headers: { cookie }, query: { category: "invalid" } })).status, 400);
});

test("archive, restore and delete use the archived filter without rewriting global totals", async () => {
  await submitEnquiry();
  const cookie = await authedCookie();
  const list = await call("list", { headers: { cookie } });
  const id = list.body.items[0]._id;

  const archived = await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id },
    body: { archived: true },
  });
  assert.equal(archived.status, 200);
  assert.equal(archived.body.item.archived, true);

  assert.equal((await call("list", { headers: { cookie } })).body.total, 0);
  const archivedList = await call("list", { headers: { cookie }, query: { archived: "archived" } });
  assert.equal(archivedList.body.total, 1);
  const all = await call("list", { headers: { cookie }, query: { archived: "all" } });
  assert.equal(all.body.total, 1);
  assert.equal(all.body.summary.total, 1, "global summary must still include archived records");

  const restored = await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id },
    body: { archived: false },
  });
  assert.equal(restored.body.item.archived, false);
  assert.equal((await call("list", { headers: { cookie } })).body.total, 1);

  const deleted = await call("detail", { method: "DELETE", headers: { cookie }, query: { id } });
  assert.equal(deleted.status, 200);
  assert.equal((await call("list", { headers: { cookie }, query: { archived: "all" } })).body.total, 0);
});

test("clients endpoint groups active enquiries by email", async () => {
  await submitEnquiry({ email: "client@example.com", company: "Acme" });
  await submitEnquiry({
    email: "client@example.com",
    company: "Acme",
    projectDescription: "A second request for the same client.",
  });
  await submitEnquiry({
    email: "other@example.com",
    company: "Other Co",
    projectDescription: "A separate client request.",
  });

  const cookie = await authedCookie();
  const list = await call("list", {
    headers: { cookie },
    query: { q: "client@example.com", limit: "1" },
  });
  const id = list.body.items[0]._id;
  await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id },
    body: { archived: true },
  });

  const clients = await call("clients", { headers: { cookie } });
  assert.equal(clients.status, 200);
  assert.equal(clients.body.total, 2);
  const client = clients.body.items.find((item: any) => item.email === "client@example.com");
  assert.equal(client.enquiryCount, 1);
  assert.equal(client.company, "Acme");
  assert.deepEqual(client.categories, ["consultation"]);

  const searched = await call("clients", { headers: { cookie }, query: { q: "other@example.com" } });
  assert.equal(searched.body.total, 1);
  assert.equal(searched.body.items[0].email, "other@example.com");
});

test("enquiry CSV export can limit results to selected ids", async () => {
  await submitEnquiry({ email: "selected@example.com" });
  await submitEnquiry({
    email: "other-person@example.com",
    projectDescription: "A separate request that must not be exported.",
  });

  const cookie = await authedCookie();
  const list = await call("list", {
    headers: { cookie },
    query: { q: "selected@example.com" },
  });
  const selectedId = list.body.items[0]._id;

  const exported = await call("exportEnquiries", {
    headers: { cookie },
    query: { ids: [selectedId] },
  });
  assert.equal(exported.status, 200);
  assert.match(exported.text, /selected@example\.com/);
  assert.equal(exported.text.includes("other-person@example.com"), false);

  const invalid = await call("exportEnquiries", {
    headers: { cookie },
    query: { ids: ["not-an-object-id"] },
  });
  assert.equal(invalid.status, 400);
});

test("newsletter subscribers can be listed, unsubscribed and exported", async () => {
  const subscribe = await call("subscribe", {
    method: "POST",
    body: { email: "subscriber@example.com", source: "/insights" },
  });
  assert.equal(subscribe.status, 201);

  const cookie = await authedCookie();
  const active = await call("newsletter", { headers: { cookie }, query: { status: "active" } });
  assert.equal(active.body.counts.active, 1);
  assert.equal(active.body.counts.unsubscribed, 0);

  const unsubscribed = await call("unsubscribe", {
    method: "POST",
    headers: { cookie },
    body: { id: active.body.items[0]._id },
  });
  assert.equal(unsubscribed.status, 200);
  assert.equal(unsubscribed.body.item.status, "unsubscribed");

  const after = await call("newsletter", { headers: { cookie }, query: { status: "unsubscribed" } });
  assert.equal(after.body.total, 1);
  assert.equal(after.body.counts.unsubscribed, 1);

  const summary = await call("list", { headers: { cookie } });
  assert.equal(summary.body.summary.subscribers, 0);

  const exported = await call("exportSubscribers", {
    headers: { cookie },
    query: { status: "unsubscribed" },
  });
  assert.equal(exported.status, 200);
  assert.match(String(exported.res.headers["Content-Type"]), /text\/csv/);
  assert.match(exported.text, /subscriber@example\.com/);
  assert.match(exported.text, /unsubscribed/);
});

test("enquiry CSV export escapes formula injection and respects archive filters", async () => {
  await submitEnquiry({
    name: "=CMD()",
    email: "csv@example.com",
    projectDescription: "Export safety check for spreadsheet formulas.",
  });

  const cookie = await authedCookie();
  const list = await call("list", { headers: { cookie }, query: { q: "csv@example.com" } });
  const id = list.body.items[0]._id;

  const exported = await call("exportEnquiries", {
    headers: { cookie },
    query: { q: "csv@example.com" },
  });
  assert.equal(exported.status, 200);
  assert.match(String(exported.res.headers["Content-Disposition"]), /attachment; filename="yesbe-enquiries-/);
  assert.match(exported.text, /'=CMD\(\)/);

  await call("detail", {
    method: "PATCH",
    headers: { cookie },
    query: { id },
    body: { archived: true },
  });

  const activeExport = await call("exportEnquiries", {
    headers: { cookie },
    query: { q: "csv@example.com" },
  });
  assert.equal(activeExport.text.includes("csv@example.com"), false);

  const allExport = await call("exportEnquiries", {
    headers: { cookie },
    query: { q: "csv@example.com", archived: "all" },
  });
  assert.match(allExport.text, /csv@example\.com/);
  assert.match(allExport.text, /yes/);
});
