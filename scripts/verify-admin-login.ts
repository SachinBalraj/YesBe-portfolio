import { randomBytes } from "node:crypto";
import { stdin } from "node:process";
import { readHidden } from "./terminalPrompt.ts";

const BASE = (process.env.ADMIN_VERIFY_URL ?? "https://www.yesbe.tech").replace(/\/+$/, "");
const ADMIN_ID = (process.env.ADMIN_EMAIL ?? process.env.ADMIN_USERNAME ?? "hello@yesbe.tech").trim();
const ORIGIN = new URL(BASE).origin;

if (!stdin.isTTY) {
  console.error("Run this command directly in an interactive terminal.");
  process.exit(1);
}

type LoginResult = { status: number; cookie: string | null };

async function login(password: string): Promise<LoginResult> {
  const res = await fetch(`${BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: ORIGIN },
    body: JSON.stringify({ username: ADMIN_ID, password }),
    redirect: "manual",
  });
  return {
    status: res.status,
    cookie: res.headers.getSetCookie()[0]?.split(";")[0] ?? null,
  };
}

function check(name: string, passed: boolean): boolean {
  console.log(`${passed ? "PASS" : "FAIL"}  ${name}`);
  return passed;
}

let password = "";
const results: boolean[] = [];

try {
  password = await readHidden(`Password for ${ADMIN_ID} at ${BASE}: `);

  const wrong = await login(`wrong-${randomBytes(12).toString("hex")}`);
  results.push(check("incorrect credentials are rejected", wrong.status === 401));

  const correct = await login(password);
  results.push(check("correct admin ID and password sign in", correct.status === 200));

  if (correct.status === 200 && correct.cookie) {
    const cookie = correct.cookie;
    const session = await fetch(`${BASE}/api/admin/session`, { headers: { cookie } });
    const sessionOk = check("session is accepted", session.status === 200);
    results.push(sessionOk);
    if (sessionOk) {
      const body = (await session.json()) as { username?: string };
      results.push(check("session belongs to the configured admin ID", body.username === ADMIN_ID));
    }

    const enquiries = await fetch(`${BASE}/api/admin/enquiries?limit=1`, { headers: { cookie } });
    results.push(check("protected admin API is accessible", enquiries.status === 200));

    const logout = await fetch(`${BASE}/api/admin/logout`, {
      method: "POST",
      headers: { cookie, Origin: ORIGIN },
    });
    const cleared = /yesbe_admin_session=;/.test(logout.headers.get("set-cookie") ?? "") &&
      /Max-Age=0/i.test(logout.headers.get("set-cookie") ?? "");
    results.push(check("logout clears the session cookie", logout.status === 200 && cleared));

    const after = await fetch(`${BASE}/api/admin/session`);
    results.push(check("session is rejected after logout", after.status === 401));
  } else {
    results.push(check("session is accepted", false));
    results.push(check("protected admin API is accessible", false));
    results.push(check("logout clears the session cookie", false));
    results.push(check("session is rejected after logout", false));
  }
} catch (error) {
  console.error(`\n${error instanceof Error ? error.message : "Verification failed."}`);
  process.exitCode = 1;
} finally {
  password = "";
}

if (results.length > 0 && results.every(Boolean)) {
  console.log("\nProduction admin authentication verified.");
} else {
  console.log(
    "\nVerification failed without exposing your password. If sign-in failed, confirm " +
      "ADMIN_EMAIL and ADMIN_PASSWORD_HASH in Vercel Production, then redeploy.",
  );
  process.exitCode = 1;
}
