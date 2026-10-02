/**
 * Browser test for the enquiry form, newsletter forms and admin panel.
 *
 * Runs against `npm run serve` (scripts/serve.ts), which serves the built SPA
 * and mounts the real api/ handlers — so this exercises the same bundle and
 * endpoints that ship to production.
 *
 * Run: npm run build && npm run serve   (in one shell)
 *      node --test scripts/browser.test.ts   (in another)
 */
import assert from "node:assert/strict";
import test, { before, after } from "node:test";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";

const BASE = process.env.TEST_BASE_URL ?? "http://localhost:3111";

/**
 * Admin credentials come from the environment — never a literal in this file.
 * Set TEST_ADMIN_EMAIL / TEST_ADMIN_PASSWORD to the same values as
 * ADMIN_EMAIL and the password whose scrypt hash is in ADMIN_PASSWORD_HASH.
 */
const ADMIN = {
  email: process.env.TEST_ADMIN_EMAIL ?? process.env.ADMIN_EMAIL ?? "",
  password: process.env.TEST_ADMIN_PASSWORD ?? "",
};
if (!ADMIN.email || !ADMIN.password) {
  throw new Error(
    "TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD must be set to run the admin browser tests.",
  );
}

let browser: Browser;
let context: BrowserContext;
let page: Page;

before(async () => {
  browser = await chromium.launch();
  context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  page = await context.newPage();
});

after(async () => {
  await browser?.close();
});

/** The enquiry wizard is the first <form>; scope everything to it. */
function wizard(p: Page) {
  return p.locator("form").first();
}

async function fillEnquiry(p: Page, suffix: string): Promise<void> {
  const f = wizard(p);

  // Step 1 — personal and company details
  await f.locator("#c-name").fill("Browser Test User");
  await f.locator("#c-email").fill(`browser${suffix}@test.com`);
  await f.locator("#c-phone").fill("+91 98765 43210");
  await f.locator("#c-company").fill("Browser Corp");
  await f.locator("#c-designation").fill("QA Lead");

  // Step 2 — service, budget, timeline
  await f.getByRole("button", { name: /continue/i }).click();
  await f.locator("#c-service").waitFor({ state: "visible" });
  await f.locator("#c-service").selectOption({ index: 1 });
  await f.locator("#c-budget").selectOption({ index: 1 });
  await f.locator("#c-timeline").selectOption({ index: 1 });

  // Step 3 — project details
  await f.getByRole("button", { name: /continue/i }).click();
  await f.locator("#c-desc").waitFor({ state: "visible" });
  await f.locator("#c-desc").fill(
    "This enquiry was submitted by a headless browser test to verify storage.",
  );
  await f.locator("#c-challenges").fill("Manual processes and no visibility.");
  await f.locator("#c-goals").fill("Ship faster with fewer errors.");

  // Step 4 — review and submit
  await f.getByRole("button", { name: /continue/i }).click();
  const submit = f.getByRole("button", { name: /submit request/i });
  await submit.waitFor({ state: "visible" });
  await submit.click();
}

test("enquiry form posts to the API and never opens WhatsApp", async () => {
  const popups: string[] = [];
  const apiCalls: string[] = [];
  const waCalls: string[] = [];

  page.on("popup", (p) => popups.push(p.url()));
  page.on("request", (r) => {
    if (r.url().includes("/api/enquiries")) apiCalls.push(r.url());
    if (r.url().includes("wa.me") || r.url().includes("whatsapp")) waCalls.push(r.url());
  });

  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  await fillEnquiry(page, "a");

  await wizard(page).getByRole("status").filter({ hasText: /submitted successfully/i }).waitFor({ timeout: 20000 });

  assert.ok(apiCalls.length > 0, "the form must POST to /api/enquiries");
  assert.deepEqual(waCalls, [], `must not contact WhatsApp (saw ${JSON.stringify(waCalls)})`);
  assert.deepEqual(popups, [], "no window.open / popup may occur");
});

test("stored enquiry is visible in the admin dashboard", async () => {
  await page.goto(`${BASE}/admin`, { waitUntil: "networkidle" });

  await page.getByLabel("Email").fill(ADMIN.email);
  await page.getByLabel("Password").fill(ADMIN.password);
  await page.getByRole("button", { name: /^sign in$/i }).click();

  await page.getByRole("link", { name: "Browser Test User" }).first().waitFor({ timeout: 20000 });
  assert.ok(
    await page.getByText("browsera@test.com").first().isVisible(),
    "the enquiry email should be listed",
  );
});

test("admin detail shows every submitted field and can change status", async () => {
  await page.getByRole("link", { name: "Browser Test User" }).first().click();
  await page.getByText("Project description").waitFor({ timeout: 20000 });

  assert.ok(
    await page.getByText(/headless browser test to verify storage/i).first().isVisible(),
    "project description must be shown",
  );
  assert.ok(
    await page.getByText(/Manual processes and no visibility/i).first().isVisible(),
    "business challenges must be shown",
  );
  assert.ok(
    await page.getByText(/Ship faster with fewer errors/i).first().isVisible(),
    "goals must be shown",
  );
  assert.ok(await page.getByText("Browser Corp").first().isVisible(), "company must be shown");
  assert.ok(await page.getByText("QA Lead").first().isVisible(), "designation must be shown");

  await page.getByRole("button", { name: "Proposal Sent", exact: true }).click();
  await page.getByText("Saved", { exact: true }).waitFor({ timeout: 20000 });

  await page.getByRole("link", { name: /back to enquiries/i }).click();
  await page.getByRole("link", { name: "Browser Test User" }).first().waitFor({ timeout: 20000 });
  assert.ok(
    (await page.locator("table").getByText("Proposal Sent").count()) > 0,
    "the new status must be reflected in the list",
  );
});

test("admin is noindex and its data is hidden from anonymous visitors", async () => {
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  assert.match(robots ?? "", /noindex/, "admin must be noindex");

  const fresh = await context.browser()!.newContext();
  const anon = await fresh.newPage();
  await anon.goto(`${BASE}/admin`, { waitUntil: "networkidle" });
  assert.equal(
    await anon.getByText("Browser Test User").count(),
    0,
    "an anonymous visitor must not see any enquiry",
  );
  await anon.getByRole("button", { name: /^sign in$/i }).waitFor({ timeout: 10000 });
  await fresh.close();
});

test("signing out clears access", async () => {
  await page.getByRole("button", { name: /sign out/i }).click();
  await page.getByText("Admin sign in").waitFor({ timeout: 20000 });
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.getByText("Browser Test User").count(), 0, "data must be gone after sign out");
});

test("footer newsletter form posts to the API", async () => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/api/newsletter/subscribe")) posts.push(r.url());
  });

  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const footer = page.locator("footer");
  await footer.getByLabel("Email address for newsletter").fill("footer-browser@test.com");
  await footer.getByRole("button", { name: /subscribe/i }).click();
  await footer.getByText(/Subscribed!/i).waitFor({ timeout: 20000 });
  assert.ok(posts.length > 0, "footer must call the subscribe endpoint");
});

test("honeypot submission is accepted but never stored", async () => {
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });

  // Type into the hidden honeypot the way a bot would.
  await page.locator("#company-website").evaluate((el) => {
    const input = el as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    setter.call(input, "http://spam.example");
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  await fillEnquiry(page, "honeypot");
  await wizard(page).getByRole("status").filter({ hasText: /submitted successfully/i }).waitFor({ timeout: 20000 });

  const res = await fetch(`${BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ADMIN),
  });
  const cookie = res.headers.get("set-cookie")!.split(";")[0]!;
  const list = (await (
    await fetch(`${BASE}/api/admin/enquiries?q=browserhoneypot`, { headers: { cookie } })
  ).json()) as { total: number };

  assert.equal(list.total, 0, "the honeypot submission must not be stored");
});

test("validation errors are surfaced to the user", async () => {
  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  const f = wizard(page);

  // Submit with an obviously invalid email; the API must reject it and the UI
  // must show the server's message rather than a fake success.
  await f.locator("#c-name").fill("Bad Email User");
  await f.locator("#c-email").fill("not-an-email");
  await f.getByRole("button", { name: /continue/i }).click();

  await f.getByText(/valid email/i).first().waitFor({ timeout: 10000 });
  assert.equal(
    await f.getByRole("status").count(),
    0,
    "must not report success when the API rejected the input",
  );
});

test("pages have no horizontal overflow at common widths", async () => {
  for (const path of ["/", "/contact", "/admin"]) {
    for (const width of [375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      assert.ok(overflow <= 1, `${path} overflows by ${overflow}px at ${width}px`);
    }
  }
});