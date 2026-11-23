import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { startStaticServer, type TestServer } from "./static-server.ts";

const VIEWPORTS = [390, 768, 1024, 1440] as const;

interface Issue {
  page: string;
  viewport: number;
  issue: string;
}

const issues: Issue[] = [];
const notes: string[] = [];

function record(page: string, viewport: number, issue: string) {
  issues.push({ page, viewport, issue });
}

async function prepare(context: BrowserContext, path: string): Promise<{ page: Page; errors: string[] }> {
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on(
    "console",
    (message) => {
      if (message.type() === "error") errors.push(`console: ${message.text()}`);
    },
  );
  await page.goto(path, { waitUntil: "load", timeout: 45_000 });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  return { page, errors };
}

async function layoutAudit(browser: Browser, origin: string) {
  const pages = [
    ["/", "Technology That Moves Business Forward."],
    ["/services", "Technology Solutions"],
    ["/services/ai-solutions", "AI Solutions"],
    ["/services/erp-systems", "ERP Systems"],
    ["/services/it-consulting", "IT Consulting"],
    ["/about", "Technology Built Around Your Business."],
    ["/case-studies", "Selected technology projects"],
    ["/case-studies/fashion-fusion", "E-Commerce Platform"],
  ] as const;

  for (const width of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      isMobile: width === 390,
      hasTouch: width === 390,
    });
    await context.addInitScript(() => {
      localStorage.setItem("yesbe-cookie-consent", "essential");
      localStorage.setItem(
        "yesbe-cookie-preferences",
        JSON.stringify({ essential: true, analytics: false, marketing: false }),
      );
    });

    for (const [path, expectedH1] of pages) {
      const { page, errors } = await prepare(context, `${origin}${path}`);
      const result = await page.evaluate(() => {
        const h1s = [...document.querySelectorAll("h1")];
        const header = document.querySelector("header");
        const heading = h1s[0];
        const firstContent =
          document.querySelector('nav[aria-label="Breadcrumb"]') ?? heading;
        const heroImages = [...document.images]
          .filter((image) => {
            const rect = image.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0;
          })
          .map((image) => ({
            src: image.currentSrc || image.src,
            complete: image.complete,
            naturalWidth: image.naturalWidth,
          }));
        return {
          h1Count: h1s.length,
          h1Text: heading?.textContent?.replace(/\s+/g, " ").trim() ?? "",
          h1Top: heading?.getBoundingClientRect().top ?? null,
          firstContentTop: firstContent?.getBoundingClientRect().top ?? null,
          headerBottom: header?.getBoundingClientRect().bottom ?? null,
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          heroImages,
        };
      });

      if (result.h1Count !== 1) record(path, width, `expected one h1, found ${result.h1Count}`);
      if (result.h1Text !== expectedH1) {
        record(path, width, `h1 "${result.h1Text}" did not match "${expectedH1}"`);
      }
      if (result.scrollWidth > result.innerWidth + 1) {
        record(path, width, `horizontal overflow ${result.scrollWidth - result.innerWidth}px`);
      }
      if (
        result.headerBottom != null &&
        result.firstContentTop != null &&
        result.firstContentTop < result.headerBottom - 1
      ) {
        record(path, width, `hero content starts under the fixed header`);
      }
      for (const image of result.heroImages) {
        if (!image.complete || image.naturalWidth === 0) {
          record(path, width, `above-fold image failed: ${image.src}`);
        }
      }
      for (const error of errors) record(path, width, error);

      if (path === "/services") {
        const directory = await page.evaluate(() =>
          [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/services/"]')]
            .map((link) => link.getAttribute("href") ?? "")
            .filter((href) => !href.includes("#"))
            .map((href) => href.replace("/services/", "")),
        );
        const unique = [...new Set(directory)];
        if (unique.length !== 19) {
          record(path, width, `service directory has ${unique.length} unique links, expected 19`);
        }
        notes.push(`service directory: ${unique.length} unique links at ${width}px`);
      }

      if (path === "/about") {
        const tab = page.getByRole("tab", { name: /Architect/ });
        if (!(await tab.count())) {
          record(path, width, "About process tab was not rendered");
        } else {
          const before = await page.locator('[role="tabpanel"]').innerText();
          await tab.click();
          const after = await page.locator('[role="tabpanel"]').innerText();
          if (before === after) record(path, width, "About process panel did not change on tab click");
        }
        const duplicateImages = await page.evaluate(() => {
          const sources = [...document.images]
            .filter((image) => image.closest("main") && image.getAttribute("src"))
            .map((image) => image.getAttribute("src") ?? "");
          return [...new Set(sources.filter((src, index) => sources.indexOf(src) !== index))];
        });
        if (duplicateImages.length) {
          record(path, width, `About reused image sources: ${duplicateImages.join(", ")}`);
        }
      }

      if (path === "/case-studies/fashion-fusion") {
        const hero = await page.evaluate(() => {
          const image = document.querySelector<HTMLImageElement>('img[alt*="illustrative interface preview"]');
          return image ? { src: image.currentSrc || image.src, complete: image.complete } : null;
        });
        if (!hero) record(path, width, "case study preview image was not rendered");
        else if (!hero.src.includes("/images/projects/")) {
          record(path, width, `case study preview is not local: ${hero.src}`);
        }
      }

      if (path === "/services/ai-solutions") {
        const faq = await page.evaluate(() => {
          const buttons = [...document.querySelectorAll<HTMLButtonElement>('button[aria-controls^="solution-faq-panel-"]')];
          return {
            count: buttons.length,
            firstExpanded: buttons[0]?.getAttribute("aria-expanded"),
            secondExpanded: buttons[1]?.getAttribute("aria-expanded"),
          };
        });
        if (faq.count < 3) record(path, width, `FAQ rendered only ${faq.count} items`);
        if (faq.firstExpanded !== "true") record(path, width, "first FAQ was not open by default");
        const secondButton = page.locator('button[aria-controls="solution-faq-panel-1"]');
        if (await secondButton.count()) {
          await secondButton.click();
          const expanded = await secondButton.getAttribute("aria-expanded");
          if (expanded !== "true") record(path, width, "FAQ accordion did not expand on click");
        }
      }

      await page.close();
    }

    await context.close();
  }

  const servicesContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const { page: servicesPage } = await prepare(servicesContext, `${origin}/services`);
  const stageBefore = await servicesPage.locator("#delivery-panel").innerText();
  await servicesPage.getByRole("tab", { name: /Architect/ }).click();
  const stageAfter = await servicesPage.locator("#delivery-panel").innerText();
  if (stageBefore === stageAfter) record("/services", 1440, "delivery rail did not change panel content");
  await servicesContext.close();

  const homeContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const { page: homePage } = await prepare(homeContext, `${origin}/`);
  const homeText = await homePage.locator("body").innerText();
  const required = [
    "Technology That Moves Business Forward.",
    "The work is rarely the problem. The system around it is.",
    "Six disciplines. One joined-up delivery model.",
    "Work that shows the thinking.",
    "Technology shaped by the operating context.",
    "A Technology Partner, Not Just a Vendor.",
    "A delivery model built for decisions, not theatre.",
    "Useful reading before the next decision.",
    "Bring us the problem. We will map the path.",
  ];
  for (const text of required) {
    if (!homeText.includes(text)) record("/", 1440, `missing homepage copy: ${text}`);
  }
  for (const service of [
    "AI & Intelligent Automation",
    "ERP & CRM Systems",
    "Website & Web Application Development",
    "Cloud, Data & DevOps",
    "Digital Transformation & IT Consulting",
    "Custom Software & Product Engineering",
  ]) {
    if (!homeText.includes(service)) record("/", 1440, `missing core service: ${service}`);
  }
  await homeContext.close();
}

async function main() {
  const server: TestServer = await startStaticServer();
  const browser = await chromium.launch();
  try {
    await layoutAudit(browser, server.origin);
  } finally {
    await browser.close();
    await server.close();
  }

  for (const note of notes) console.log(`note: ${note}`);
  if (issues.length) {
    for (const issue of issues) {
      console.log(`FAIL [${issue.page} @ ${issue.viewport}px] ${issue.issue}`);
    }
    process.exitCode = 1;
  } else {
    console.log("Phase 2 layout audit passed: no overflow, header collisions, broken hero images, console errors, or missing required content.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
