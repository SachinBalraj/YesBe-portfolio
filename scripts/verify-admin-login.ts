import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { stdin } from "node:process";
import { readHidden } from "./terminalPrompt.ts";

const BASES = (
  process.env.ADMIN_VERIFY_URLS ??
  process.env.ADMIN_VERIFY_URL ??
  "https://www.yesbe.tech"
)
  .split(",")
  .map((value) => value.trim().replace(/\/+$/, ""))
  .filter(Boolean);
const ADMIN_ID = (process.env.ADMIN_EMAIL ?? process.env.ADMIN_USERNAME ?? "yesbe.tech@gmail.com").trim();
const REPORT = process.env.ADMIN_VERIFY_REPORT;

if (!stdin.isTTY) {
  console.error("Run this command directly in an interactive terminal.");
  process.exit(1);
}

interface Check {
  name: string;
  passed: boolean;
}

interface ReportEntry {
  base: string;
  checks: Check[];
  ok: boolean;
}

async function login(base: string, password: string): Promise<{ status: number; cookie: string | null }> {
  const res = await fetch(`${base}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: new URL(base).origin },
    body: JSON.stringify({ username: ADMIN_ID, password }),
    redirect: "manual",
  });
  return {
    status: res.status,
    cookie: res.headers.getSetCookie()[0]?.split(";")[0] ?? null,
  };
}

async function verifyBase(base: string, password: string): Promise<ReportEntry> {
  const checks: Check[] = [];
  const check = (name: string, passed: boolean): boolean => {
    const value = Boolean(passed);
    checks.push({ name, passed: value });
    console.log(`${value ? "PASS" : "FAIL"}  ${base} — ${name}`);
    return value;
  };

  const wrong = await login(base, `wrong-${randomBytes(12).toString("hex")}`);
  check("incorrect credentials are rejected", wrong.status === 401);

  const correct = await login(base, password);
  check("correct admin ID and password sign in", correct.status === 200);

  if (correct.status === 200 && correct.cookie) {
    const cookie = correct.cookie;
    const session = await fetch(`${base}/api/admin/session`, { headers: { cookie } });
    const sessionOk = check("session is accepted", session.status === 200);
    if (sessionOk) {
      const body = (await session.json()) as { username?: string };
      check("session belongs to the configured admin ID", body.username === ADMIN_ID);
    } else {
      check("session belongs to the configured admin ID", false);
    }

    const enquiries = await fetch(`${base}/api/admin/enquiries?limit=1`, { headers: { cookie } });
    check("dashboard enquiry data is accessible", enquiries.status === 200);

    for (const category of ["consultation", "service", "industry", "project", "other"]) {
      const filtered = await fetch(`${base}/api/admin/enquiries?category=${category}&limit=1`, {
        headers: { cookie },
      });
      check(`admin can access ${category} submissions`, filtered.status === 200);
    }

    for (const [label, path] of [
      ["client records", "/api/admin/clients"],
      ["newsletter subscribers", "/api/admin/newsletter?limit=1"],
      ["admin settings", "/api/admin/settings"],
    ] as const) {
      const response = await fetch(`${base}${path}`, { headers: { cookie } });
      check(`admin can access ${label}`, response.status === 200);
    }

    const logout = await fetch(`${base}/api/admin/logout`, {
      method: "POST",
      headers: { cookie, Origin: new URL(base).origin },
    });
    const setCookie = logout.headers.get("set-cookie") ?? "";
    check(
      "logout clears the session cookie",
      logout.status === 200 && /yesbe_admin_session=;/.test(setCookie) && /Max-Age=0/i.test(setCookie),
    );

    const after = await fetch(`${base}/api/admin/session`);
    check("session is rejected after logout", after.status === 401);
  } else {
    check("session is accepted", false);
    check("session belongs to the configured admin ID", false);
    check("dashboard enquiry data is accessible", false);
    for (const category of ["consultation", "service", "industry", "project", "other"]) {
      check(`admin can access ${category} submissions`, false);
    }
    for (const label of ["client records", "newsletter subscribers", "admin settings"]) {
      check(`admin can access ${label}`, false);
    }
    check("logout clears the session cookie", false);
    check("session is rejected after logout", false);
  }

  return { base, checks, ok: checks.every((entry) => entry.passed) };
}

let password = "";
const results: ReportEntry[] = [];

try {
  password = await readHidden(`Password for ${ADMIN_ID} at ${BASES.join(", ")}: `);
  for (const base of BASES) {
    results.push(await verifyBase(base, password));
  }
} catch (error) {
  console.error(`\n${error instanceof Error ? error.message : "Verification failed."}`);
  process.exitCode = 1;
} finally {
  password = "";
  if (REPORT) {
    writeFileSync(
      REPORT,
      JSON.stringify({ generatedAt: new Date().toISOString(), adminId: ADMIN_ID, results }, null, 2),
      { mode: 0o600 },
    );
  }
}

if (results.length > 0 && results.every((entry) => entry.ok)) {
  console.log("\nAdmin authentication verified for all targets.");
} else {
  console.log(
    "\nVerification failed without exposing your password. Check ADMIN_EMAIL and " +
      "ADMIN_PASSWORD_HASH in the target environment, then redeploy if needed.",
  );
  process.exitCode = 1;
}
