/**
 * Generates public/sitemap.xml from the shared public route list.
 *
 * The sitemap used to be hand-maintained, which is how URLs fall out of sync
 * with the routes that actually exist. Deriving it from scripts/routes.ts —
 * the same list the prerenderer turns into static HTML — means a new service or
 * article appears automatically, and a URL can never be advertised without a
 * real HTML file behind it.
 *
 *   node --import tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { publicRoutes, SITE_URL } from "./routes.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TODAY = new Date().toISOString().slice(0, 10);

const urls = publicRoutes();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
console.log(`sitemap.xml written — ${urls.length} URLs`);