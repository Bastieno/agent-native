# Deployment plan

Status: strategy confirmed 2026-10-22 (VPS + Neon + Resend; core changes stay on
the owner's fork, not upstreamed). Code steps done; provisioning is the
owner's, since it needs their accounts and payment. Nothing has been deployed.

Owner's goals (2026-10-12): lowest cost; demo first, then a separate
production environment for a pilot with real schools; repo is private.

## Hosting: one small VPS, three apps

Run the app as a plain Node server (`pnpm build` then `pnpm start`, Nitro's
node preset) on one small VPS in Frankfurt, behind Caddy for TLS:

| Subdomain  | Purpose                    | Database                             |
| ---------- | -------------------------- | ------------------------------------ |
| `demo.`    | Showcase school, fake data | Neon project/branch `demo`           |
| `staging.` | Test a branch before prod  | Neon branch `staging` (copy of prod) |
| `app.`     | Pilot schools, real data   | Neon branch `main`                   |

Why a VPS rather than Netlify, Vercel or Cloudflare:

- `useDbSync()` polls every 2 seconds per open tab. On per-invocation
  pricing that becomes the main cost once teachers keep the app open all day.
  On a VPS it is free.
- Agent runs (planning, grading, timetabling) are long LLM loops. Serverless
  function timeouts cut them off. A Node process has no such limit.
- A small VPS costs a few dollars a month for all three apps.

Cost of this choice: we own OS updates, restarts (systemd) and TLS (Caddy
handles TLS automatically). Template code stays host-agnostic. The VPS config
(Caddyfile, systemd units, env files) lives outside `templates/school`, in a
deploy directory or a separate private repo, per the portability rule.

Fallback if ops work becomes a burden: Netlify plus Neon, the same setup as
the sibling templates. The code needs no change; only the hosting config differs.

### VPS configuration

- Hetzner Cloud CX23 (2 vCPU, 4 GB RAM, 40 GB SSD), Nuremberg or Falkenstein.
  Upgrade path: CX33 (4 vCPU, 8 GB) by resizing in place.
- Ubuntu 24.04 LTS, Node 22 LTS, pnpm.
- Caddy as reverse proxy, with automatic TLS for the three subdomains.
- One systemd unit per app, each on its own port with its own env file, set to
  restart on failure.
- Firewall open only on ports 22, 80 and 443; SSH by key only; automatic
  security updates; fail2ban.
- 2 GB swap so `pnpm build` fits on the box. Move builds to GitHub Actions
  later if they get slow.
- Hetzner server backups switched on (whole-disk snapshots, daily).

### Estimated monthly cost (check prices before buying; Hetzner raised prices in April 2026)

| Item                     | Estimate                                |
| ------------------------ | --------------------------------------- |
| CX23 VPS                 | about €4–5 incl. IPv4                   |
| Hetzner backups (+20%)   | about €1                                |
| Neon                     | €0 (free) to about €10 (Launch)         |
| Resend                   | €0 (free: 3,000 emails/month)           |
| Domain                   | about €1 (€10–15 a year)                |
| **Fixed total**          | **about €6–17 a month**                 |
| LLM usage for agent chat | varies with use; capped at the provider |

Polling queries the database, so an open tab keeps Neon's compute awake.
During a pilot school day, production may outgrow the free tier's compute
allowance; Launch is billed by usage, roughly €5–10 a month at that size.
Cheapest alternative: Postgres on the VPS itself (€0 extra), but then backups
(nightly `pg_dump` off the box) and restores are ours to run.

LLM spend is the cost to watch. It depends on how much teachers use the agent,
not on hosting.

## Database: Neon Postgres

- Free tier to start. Managed backups and point-in-time restore, which we
  would otherwise have to build on a VPS.
- Branching gives staging a real copy of production data without a dump and
  restore.
- Region `eu-central-1` (Frankfurt), next to the VPS.
- The template is Postgres-ready: `runMigrations` rewrites SQLite-only SQL,
  and the schema uses `@agent-native/core/db/schema`. Run the full simulation
  (`pnpm journey:school`) once against a Neon branch before go-live to prove
  it.
- Not chosen: Turso/libSQL (fine, but it gives up Neon branching and the path
  the sibling templates already use). D1 (ties us to Cloudflare Workers).
- Data residency: no African region is available. Before the pilot, confirm
  with the schools that EU hosting of learner records is acceptable under
  Nigeria's Data Protection Act (NDPA), and record their consent.

## Schema changes

- Migrations only: append a new numbered step to
  `server/plugins/db.ts`. Changes are additive: add tables and columns, never
  rename, drop or truncate. They run at startup.
- Never run `drizzle-kit push` against Neon. The `db:push` script has been
  removed from `package.json` so nobody runs it by accident.
- Release order: deploy to `staging` (its branch was reset from prod) →
  check the startup log for migration errors → run a smoke journey → deploy to
  `app`.
- Because changes are additive, the previous build keeps working against the
  new schema, so rolling back code is safe.

## Secrets and auth

Each app has its own env file, readable by root only, loaded by systemd:

- `DATABASE_URL`: a different Neon branch per app
- `BETTER_AUTH_SECRET`: different per app, so sessions don't carry across
- `BETTER_AUTH_URL` / `APP_URL`: that app's own subdomain
- `NODE_ENV=production`
- the LLM provider key for agent chat, with a spend cap set at the provider
- `RESEND_API_KEY`, `EMAIL_FROM`
- never `AUTO_CREATE_DEFAULT_ORG`: `signup-policy.ts` already refuses to
  start with it in production. Schools are created deliberately with
  `setup-school`, and their admins are invited.

## Email

Resend: free tier, with a verified sending domain (SPF/DKIM) so invites don't
land in spam. Invites already report `emailSent` and fall back to a sign-in
link. Only `app.` gets real email. `staging.` and `demo.` leave it unset, so
nothing is mailed by mistake.

## Demo school

- Built by `pnpm showcase:school` with `SCHOOL_URL=https://demo.…`, into its
  own database. It never shares a database with `app.`.
- The shared local password (`test/sim/client.ts`) must not guard the demo.
  It is now read from `SIM_PASSWORD`, with the local throwaway as the default,
  so run the showcase against the demo with `SIM_PASSWORD` set to a private
  value. The demo password goes only to prospects you're talking to, never on
  a public page.
- The generated roster file stays local. It prints the password.
- Rebuild the demo from scratch when it gets messy: reset the Neon branch,
  then rerun the showcase.
- Agent chat on the demo spends real LLM money. Keep the provider spend cap low.

## New schools and MCP

A school is an organisation. `setup-school` makes the caller the admin of the
organisation they belong to, and refuses if it already has an admin.

How a new school is provisioned:

1. We create the organisation and invite the head's email (an operator-only
   step; open sign-up stays off).
2. The head accepts in the browser, sets a password, and signs in once.
3. Setup runs in the in-app agent chat, or from an MCP client connected to
   `https://app.…/_agent-native/mcp` (OAuth sign-in in the browser).

Built and tested locally (2026-10-12, `pnpm journey:mcp-setup`):

- Core: a verified OAuth caller whose organisation has no `allowed_domain`
  now acts in the organisation they belong to (`resolveCallerOrgId` in
  `packages/core/src/mcp/build-server.ts`), looked up on every call. Static
  tokens don't get this, because their email comes from a header the caller
  writes.
- School: `pnpm provision:school` (`ops/provision-school.ts`) creates the
  organisation with the head as owner and records their invitation as school
  admin. It is a script rather than an action, so neither the agent nor any
  MCP client can create schools. `setup-school` uses up the head's invitation
  and takes the name it carries, so a head who sets up over MCP before ever
  opening the web app isn't left listed as pending.
- Coding clients (Claude Code, Cursor) are offered every action and call
  `setup-school` directly. Chat apps (Claude Desktop, claude.ai, ChatGPT)
  are offered `ask_app`, and the school's own agent does the setup. Both
  paths pass the journey (the chat path with `JOURNEY_CHAT=1`).

Still open:

- Nothing stops a stranger from creating an account; they just get no
  school. Restricting sign-up to invited emails needs a core change.
- The web "pending activation" check still asks whether any school in the
  deployment is set up. Provisioned heads avoid it (their invitation activates
  them first), but the check itself should look at the person's own school.
- Later, if schools should start without us: a one-time setup code the head
  gives the agent, which creates the organisation for them.
- Every action is listed as an MCP tool for every role. Only the role checks
  inside each action stand in the way (see blockers below).

## Before real children's data (pilot blockers)

- Role checks on actions, and remove raw `db-query` from the student agent's
  tools (from the 2026-09-11 assessment; check current state).
- NDPA consent and data-residency sign-off from each school.
- Rehearse restoring from a Neon backup once.

## Steps, once approved

1. Done: the demo password comes from `SIM_PASSWORD`; `db:push` is removed.
   (Provisioning and MCP setup are also built; see above.)
2. Create the Neon project with `demo`, `main` and `staging` branches.
3. Provision the VPS, Caddy, and systemd units for the three apps.
4. Deploy `demo.`, run the showcase against it.
5. Clear the pilot blockers, then deploy `staging.` and `app.`.
