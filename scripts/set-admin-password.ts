import { execFileSync } from "node:child_process";
import { chmodSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { stdin, stderr } from "node:process";
import { createPasswordHash } from "../api/_lib/auth.ts";

const ENV_PATH = fileURLToPath(new URL("../.env", import.meta.url));
const MIN_LENGTH = 12;

if (!stdin.isTTY) {
  stderr.write("Run this command directly in an interactive terminal.\n");
  process.exit(1);
}

function setEcho(enabled: boolean): void {
  try {
    execFileSync("stty", [enabled ? "echo" : "-echo"], { stdio: [stdin, "ignore", "ignore"] });
  } catch {
    // Non-POSIX terminal; the Windows fallback still keeps input out of argv.
  }
}

const rl = createInterface({ input: stdin, output: stderr, terminal: true });
let password = "";
let confirmation = "";

try {
  setEcho(false);
  password = await rl.question("New admin password: ");
  confirmation = await rl.question("Confirm new admin password: ");
} finally {
  setEcho(true);
  rl.close();
  stderr.write("\n");
}

try {
  if (password.length < MIN_LENGTH) {
    throw new Error(`Password must be at least ${MIN_LENGTH} characters.`);
  }
  if (password !== confirmation) {
    throw new Error("Passwords do not match.");
  }

  const hash = await createPasswordHash(password);
  const lines = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf8").split(/\r?\n/) : [];
  const updates = new Map([
    ["ADMIN_USERNAME", "yesbe.tech"],
    ["ADMIN_PASSWORD_HASH", hash],
  ]);
  const remove = new Set(["ADMIN_PASSWORD", "ADMIN_LOGIN_ID"]);
  const written = new Set<string>();
  const output: string[] = [];

  for (const line of lines) {
    const key = line.match(/^\s*([A-Z0-9_]+)\s*=/)?.[1];
    if (!key) {
      output.push(line);
      continue;
    }
    if (remove.has(key)) continue;
    if (updates.has(key)) {
      output.push(`${key}=${updates.get(key)}`);
      written.add(key);
      continue;
    }
    output.push(line);
  }

  for (const [key, value] of updates) {
    if (!written.has(key)) output.push(`${key}=${value}`);
  }

  const content = `${output.join("\n").replace(/\n*$/, "")}\n`;
  writeFileSync(ENV_PATH, content, { mode: 0o600 });
  chmodSync(ENV_PATH, 0o600);

  process.stdout.write(
    [
      "",
      "Local .env updated; ADMIN_USERNAME is yesbe.tech and the plaintext password was discarded.",
      "",
      "Set these in Vercel Production (keep MONGODB_URI, MONGODB_DB_NAME and SESSION_SECRET unchanged):",
      "  ADMIN_USERNAME=yesbe.tech",
      `  ADMIN_PASSWORD_HASH=${hash}`,
      "",
      "Do not commit the hash or paste it into frontend code.",
      "",
    ].join("\n"),
  );
} catch (error) {
  stderr.write(`\n${error instanceof Error ? error.message : "Could not set the password."}\n`);
  process.exitCode = 1;
} finally {
  password = "";
  confirmation = "";
}
