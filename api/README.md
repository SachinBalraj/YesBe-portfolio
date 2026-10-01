# Enquiry & Newsletter Backend

Replaces the WhatsApp hand-off with a real backend: the enquiry form posts to a
Vercel serverless function, the enquiry is stored in MongoDB Atlas, and the
owner reads and manages them at `/admin`.

Ordinary "Chat on WhatsApp" buttons are unchanged — visitors can still start a
conversation directly. Only the *form submission* no longer opens WhatsApp.

## How it fits together

```
Visitor ──► ContactSection form ──POST──► /api/enquiries ──► MongoDB Atlas
Visitor ──► Newsletter forms    ──POST──► /api/newsletter/subscribe
Owner   ──► /admin (login)      ──GET/PATCH/DELETE──► /api/admin/*
```

| Endpoint | Method | Auth | Purpose |
| --- | --- | --- | --- |
| `/api/enquiries` | `POST` | public | Create an enquiry. **Create only.** |
| `/api/newsletter/subscribe` | `POST` | public | Create a subscriber. **Create only.** |
| `/api/admin/login` | `POST` | public | Exchange credentials for a session cookie. |
| `/api/admin/logout` | `POST` | session | Clear the session cookie. |
| `/api/admin/session` | `GET` | session | "Am I signed in?" |
| `/api/admin/enquiries` | `GET` | session | List, search, filter, paginate. |
| `/api/admin/enquiries/:id` | `GET` | session | Read one enquiry. |
| `/api/admin/enquiries/:id` | `PATCH` | session | Update **status only**. |
| `/api/admin/enquiries/:id` | `DELETE` | session | Delete permanently. |
| `/api/newsletter` | `GET` | session | List subscribers. |
| `/api/newsletter?id=` | `DELETE` | session | Remove a subscriber. |

## Database collections

`enquiries` — one document per submission:

```
name, email, phone, company, designation, service, budget, timeline,
projectDescription, businessChallenges, goals,
formType, pageSource, status, createdAt, updatedAt
```

`newsletter_subscribers` — `email` (unique), `source`, `createdAt`.

Indexes are created automatically and idempotently on first use:

- `enquiries`: `createdAt` desc, `status + createdAt`, `service`, `email`, `phone`
- `newsletter_subscribers`: `createdAt` desc, **unique** `email`

Status values: `New`, `Contacted`, `In Progress`, `Converted`, `Closed`.
New enquiries always start as `New`. Only `status` and `updatedAt` are
writable after creation.

## Setup

### 1. MongoDB Atlas

1. Create a free M0 cluster.
2. Add a database user with **read/write** on the target database only.
3. Allow access from anywhere (`0.0.0.0/0`) — Vercel functions use dynamic IPs.
   For stricter control, use the Vercel regional allowlist or a NAT gateway.
4. Copy the connection string.

### 2. Environment variables

Set these in the **Vercel project → Settings → Environment Variables**.
They are read server-side only; never prefix them with `VITE_`, which would
expose them to the browser.

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGODB_URI` | yes | Atlas connection string. |
| `MONGODB_DB_NAME` | no | Defaults to `yesbe`. |
| `ADMIN_EMAIL` | yes | The only email that can sign in. |
| `ADMIN_PASSWORD_HASH` | yes* | `scrypt$<saltHex>$<hashHex>`. |
| `ADMIN_PASSWORD` | fallback | Plaintext; only if the hash is unset. |
| `SESSION_SECRET` | yes | ≥ 32 random chars. `openssl rand -hex 32`. |

Generate a password hash:

```bash
node --input-type=module -e \
  "import { createPasswordHash } from './api/_lib/auth.ts';
   console.log(await createPasswordHash('your-password'))"
```

Optional tuning (defaults are production-safe):

| Variable | Default |
| --- | --- |
| `ENQUIRY_RATE_LIMIT` | 5 per 10 min per IP |
| `NEWSLETTER_RATE_LIMIT` | 3 per hour per IP |
| `LOGIN_RATE_LIMIT` | 8 per 15 min per IP |

### 3. Deploy

```bash
npm run build
npx vercel --prod
```

The SPA rewrite in `vercel.json` explicitly excludes `/api/*`, and `/admin`
sends `X-Robots-Tag: noindex, nofollow`.

## Security

- **Server-side authorisation.** Every admin read and mutation goes through
  `requireAdmin`, which verifies the cookie's HMAC. There is no client-side
  gate and no token in JavaScript, so access cannot be forged from the browser.
- **Session cookie** is `HttpOnly`, `Secure`, `SameSite=Strict`, `Path=/`, and
  expires after 8 hours.
- **Passwords** are compared with `scrypt` and `timingSafeEqual`. Email
  comparison is constant-time, and a wrong email and a wrong password return
  the same message so accounts cannot be enumerated.
- **Allowlist input.** Only the known fields are read off the request body by
  name, so `$where`, `constructor`, `__proto__` and other operator keys can
  never reach MongoDB.
- **Search** escapes user input, so `.*` is matched literally instead of
  acting as a wildcard or a ReDoS payload.
- **Validation** caps every field's length, strips control characters, and
  constrains the phone number to digits and dial punctuation.
- **Payload ceiling** of 16 KB, enforced against `Content-Length` and the
  buffered body.
- **Honeypot.** Both forms carry a hidden field; a bot that fills it gets a
  success response so it learns nothing, but nothing is stored.
- **No fake success.** The UI only reports success after the API confirms the
  write; database errors surface as real error messages.
- **`/admin` is noindex** via meta robots and the `X-Robots-Tag` header, and is
  `Disallow`ed in `robots.txt`.

### Known limitation: rate limiting

Rate limits are **per serverless instance, held in memory**. They reliably
throttle a single visitor and bursts from one warm instance, but Vercel may
route consecutive requests to different instances, so the limits are not a
globally exact guarantee.

For hard global limits, put a shared store in front of these endpoints — e.g.
Upstash Redis or Vercel KV — and check it in `guard()` in
`api/_lib/rateLimit.ts`. That is the only change needed; the call sites already
route through `guard()`.

## Local development

`npm run dev` (Vite only) will not serve `/api`. To run the full stack:

```bash
# terminal 1 — a local MongoDB (or Atlas)
docker run -p 27017:27017 mongo:7

# terminal 2
MONGODB_URI=mongodb://127.0.0.1:27017 \
MONGODB_DB_NAME=yesbe_dev \
ADMIN_EMAIL=you@example.com \
ADMIN_PASSWORD=devpassword \
SESSION_SECRET=dev-secret-at-least-32-characters-long \
ENQUIRY_RATE_LIMIT=1000 \
  npm run serve
```

Then open http://localhost:3111 and http://localhost:3111/admin.

## Tests

```bash
npm run test:api      # 37 tests: validation, auth, MongoDB writes, authorisation
npm run test:browser  # 9 tests: real Chromium against the built app
```

`test:api` boots a real MongoDB via `mongodb-memory-server` and drives the
actual handlers — no mocks of the database layer. It covers honeypot handling,
NoSQL injection, oversized bodies, forged and tampered session cookies, status
filtering, pagination, and that a public caller cannot read or delete.

`test:browser` runs against `npm run serve`, so it exercises the same bundle
and endpoints that ship. It verifies the form posts to the API, that **no
WhatsApp navigation occurs**, that the admin panel works end to end, and that
pages do not overflow horizontally at 375/768/1024/1440 px.

## Files

```
api/
  _lib/
    db.ts           Mongo client (cached per instance), collections, indexes
    auth.ts         scrypt verification, HMAC session cookies, requireAdmin
    http.ts         method guard, 16 KB body limit, JSON parsing, IP extraction
    validate.ts     allowlist validation and sanitising
    rateLimit.ts    fixed-window limiter + guard() wrapper
    objectId.ts     strict 24-hex ObjectId parsing
  enquiries.ts                     POST only, public
  newsletter/subscribe.ts          POST only, public
  newsletter/index.ts              GET/DELETE, admin
  admin/login.ts  admin/logout.ts  admin/session.ts
  admin/enquiries/index.ts         GET list, admin
  admin/enquiries/[id].ts          GET/PATCH/DELETE, admin
scripts/
  serve.ts        Local full-stack server (dist + api)
  api.test.ts     API/database test suite
  browser.test.ts Playwright UI suite
src/
  services/enquiries.ts   Public API client
  services/newsletter.ts  Newsletter adapter
  services/admin.ts       Admin API client
  components/admin/AdminLayout.tsx   Auth gate + sign-in
  pages/admin/AdminDashboardPage.tsx List, filters, stats, newsletter tab
  pages/admin/AdminEnquiryPage.tsx    Detail, status, delete
```

The `api/` directory is excluded from the Vite build and typechecked separately
via `tsconfig.api.json`.