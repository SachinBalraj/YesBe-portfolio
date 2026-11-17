/**
 * Runs the browser suite against a local server backed by an ephemeral MongoDB.
 * Generates a one-time admin password; no environment secrets are required.
 */
import { spawn } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { MongoMemoryServer } from "mongodb-memory-server";

const repo = process.cwd();
const base = process.env.TEST_BASE_URL ?? "http://localhost:3111";
const mongo = await MongoMemoryServer.create();
const { createPasswordHash } = await import(
  pathToFileURL(join(repo, "api/_lib/auth.ts")).href
);
const password = `phase5-browser-${Date.now()}`;
const hash = await createPasswordHash(password);

const server = spawn(process.execPath, ["--import", "tsx", "scripts/serve.ts"], {
  cwd: repo,
  env: {
    ...process.env,
    PORT: new URL(base).port || "3111",
    MONGODB_URI: mongo.getUri(),
    MONGODB_DB_NAME: "yesbe_phase5_browser",
    ADMIN_EMAIL: "hello@yesbe.tech",
    ADMIN_PASSWORD_HASH: hash,
    SESSION_SECRET: "phase5-local-session-secret-at-least-32",
    APP_ORIGIN: base,
  },
  detached: true,
  stdio: ["ignore", "pipe", "pipe"],
});
server.stdout.on("data", (chunk) => process.stdout.write(`[serve] ${chunk}`));
server.stderr.on("data", (chunk) => process.stderr.write(`[serve:err] ${chunk}`));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

let code = 1;
try {
  await waitForServer();
  const tests = spawn(
    process.execPath,
    ["--import", "tsx", "--test", "scripts/browser.test.ts"],
    {
      cwd: repo,
      env: { ...process.env, TEST_ADMIN_PASSWORD: password, TEST_BASE_URL: base },
      stdio: "inherit",
    },
  );
  code = await new Promise((resolve) => tests.on("exit", (value) => resolve(value ?? 1)));
} finally {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {}
  await mongo.stop();
}

process.exit(code);
