import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createPasswordHash } from "../api/_lib/auth.ts";

const repo = process.cwd();
const base = process.env.CAPTURE_BASE_URL ?? "http://localhost:3112";
const out = join(repo, "docs/admin");
const password = `admin-capture-${Date.now()}`;
const adminId = "yesbe.tech@gmail.com";

mkdirSync(out, { recursive: true });
const mongo = await MongoMemoryServer.create();
const hash = await createPasswordHash(password);
const server = spawn(process.execPath, ["--import", "tsx", "scripts/serve.ts"], {
  cwd: repo,
  env: {
    ...process.env,
    PORT: new URL(base).port || "3112",
    MONGODB_URI: mongo.getUri(),
    MONGODB_DB_NAME: "yesbe_admin_capture",
    ADMIN_EMAIL: adminId,
    ADMIN_PASSWORD_HASH: hash,
    SESSION_SECRET: "admin-capture-local-session-secret-32",
    APP_ORIGIN: base,
  },
  detached: true,
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", (chunk) => process.stdout.write(`[serve] ${chunk}`));
server.stderr.on("data", (chunk) => process.stderr.write(`[serve:err] ${chunk}`));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitForServer() {
  for (let attempt = 0; attempt < 150; attempt += 1) {
    try {
      const response = await fetch(base);
      if (response.ok) return;
    } catch {}
    await sleep(100);
  }
  throw new Error("local server did not start");
}

async function post(path: string, body: unknown, cookie?: string) {
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  });
  assert.ok(response.ok, `${path} returned ${response.status}`);
  return response;
}

async function seed() {
  const rows = [
    {
      name: "Aarthi Raman",
      email: "aarthi@example.com",
      company: "Northstar Labs",
      designation: "CTO",
      phone: "+91 98400 12345",
      service: "AI Automation",
      industry: "Healthcare",
      budget: "₹5L - ₹10L",
      timeline: "2-3 months",
      projectDescription: "Automate patient intake and follow-up workflows.",
      businessChallenges: "Manual handoffs and delayed responses.",
      goals: "Faster response times with full audit visibility.",
      formType: "industry",
      pageSource: "/industries/healthcare",
    },
    {
      name: "Rohan Mehta",
      email: "rohan@example.com",
      company: "Bright Retail",
      designation: "Founder",
      phone: "+91 98400 23456",
      service: "Web Development",
      budget: "₹1L - ₹5L",
      timeline: "1-2 months",
      projectDescription: "Rebuild the storefront with a faster checkout flow.",
      businessChallenges: "Slow pages and cart abandonment.",
      goals: "Improve conversion and page speed.",
      formType: "service",
      pageSource: "/services/web-development",
    },
    {
      name: "Meera Iyer",
      email: "meera@example.com",
      company: "CivicWorks",
      designation: "Program Lead",
      phone: "+91 98400 34567",
      service: "Custom Software",
      projectDescription: "Create a grant tracking portal for field teams.",
      businessChallenges: "Spreadsheets across multiple departments.",
      goals: "A single source of truth for every grant.",
      formType: "project",
      pageSource: "/case-studies/civicworks",
    },
    {
      name: "Karthik Rao",
      email: "karthik@example.com",
      company: "Vertex Finance",
      designation: "Operations Head",
      phone: "+91 98400 45678",
      service: "ERP Systems",
      projectDescription: "Integrate inventory and finance reporting.",
      businessChallenges: "Fragmented systems and duplicate entries.",
      goals: "Real-time operational reporting.",
      formType: "consultation",
      pageSource: "/contact",
    },
    {
      name: "Sana Begum",
      email: "sana@example.com",
      company: "Lumen Studio",
      designation: "Marketing Lead",
      phone: "+91 98400 56789",
      service: "Blockchain Development",
      projectDescription: "Prototype a transparent certificate ledger.",
      businessChallenges: "Credential verification takes too long.",
      goals: "Instant verification for issued certificates.",
      formType: "blockchain",
      pageSource: "/services/blockchain-development",
    },
  ];
  for (const row of rows) {
    await post("/api/enquiries", row);
  }
  await post("/api/newsletter/subscribe", { email: "reader.one@example.com", source: "/insights" });
  await post("/api/newsletter/subscribe", { email: "reader.two@example.com", source: "/contact" });

  const login = await post("/api/admin/login", { username: adminId, password });
  const cookie = String(login.headers.get("set-cookie") ?? "").split(";")[0]!;
  const listResponse = await fetch(`${base}/api/admin/enquiries?limit=100`, { headers: { cookie } });
  const list = (await listResponse.json()) as { items: { _id: string; email: string }[] };
  const statuses: Record<string, string> = {
    "aarthi@example.com": "In Discussion",
    "rohan@example.com": "Proposal Sent",
    "meera@example.com": "Converted",
    "karthik@example.com": "Contacted",
    "sana@example.com": "New",
  };
  for (const item of list.items) {
    const status = statuses[item.email];
    if (!status) continue;
    const response = await fetch(`${base}/api/admin/enquiries/${item._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", cookie },
      body: JSON.stringify({ status }),
    });
    assert.ok(response.ok, `status update for ${item.email} returned ${response.status}`);
  }
}

async function addConsent(context: import("playwright").BrowserContext) {
  await context.addInitScript(() => {
    localStorage.setItem("yesbe-cookie-consent", "essential");
    localStorage.setItem(
      "yesbe-cookie-preferences",
      JSON.stringify({ essential: true, analytics: false, marketing: false }),
    );
  });
}

async function capture(browser: import("playwright").Browser, mode: "desktop" | "mobile") {
  const context = await browser.newContext(
    mode === "desktop"
      ? { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }
      : {
          viewport: { width: 390, height: 844 },
          isMobile: true,
          hasTouch: true,
          deviceScaleFactor: 1,
          reducedMotion: "reduce",
        },
  );
  await addConsent(context);
  const page = await context.newPage();
  await page.goto(`${base}/admin`, { waitUntil: "networkidle", timeout: 45_000 });
  await page.getByLabel("Admin ID").fill(adminId);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: /^sign in$/i }).click();
  await page.getByRole("heading", { name: "Dashboard" }).waitFor({ timeout: 20_000 });
  await page.waitForTimeout(750);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  assert.ok(overflow <= 1, `${mode} admin dashboard overflows by ${overflow}px`);

  const dashboard = join(out, `dashboard-${mode}.png`);
  await page.screenshot({
    path: dashboard,
    fullPage: true,
    animations: "disabled",
    caret: "hide",
    scale: "css",
  });

  await page.goto(`${base}/admin/enquiries`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "All Enquiries" }).waitFor({ timeout: 20_000 });
  const enquiries = join(out, `enquiries-${mode}.png`);
  await page.screenshot({
    path: enquiries,
    fullPage: true,
    animations: "disabled",
    caret: "hide",
    scale: "css",
  });

  await context.close();
  return [`docs/admin/dashboard-${mode}.png`, `docs/admin/enquiries-${mode}.png`];
}

let code = 1;
try {
  await waitForServer();
  await seed();
  const browser = await chromium.launch();
  try {
    const screenshots = [
      ...(await capture(browser, "desktop")),
      ...(await capture(browser, "mobile")),
    ];
    writeFileSync(
      join(out, "qa-report.json"),
      `${JSON.stringify({ status: "PASS", base, screenshots }, null, 2)}\n`,
    );
    code = 0;
  } finally {
    await browser.close();
  }
} catch (error) {
  writeFileSync(
    join(out, "qa-report.json"),
    `${JSON.stringify({ status: "FAIL", error: error instanceof Error ? error.message : String(error) }, null, 2)}\n`,
  );
  process.stderr.write(`${error instanceof Error ? error.stack : error}\n`);
} finally {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {}
  await mongo.stop();
}

process.exit(code);
