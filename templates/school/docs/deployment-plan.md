# Deployment plan

Status: strategy confirmed 2026-10-22 (VPS + Neon + Resend; core changes stay on
the owner's fork, not upstreamed). Code steps done; provisioning is the
owner's, since it needs their accounts and payment. Nothing has been deployed.

Owner's goals (2026-10-12): lowest cost; demo first, then a separate
production environment for a pilot with real schools; repo is private.

## Hosting: demo on Netlify now, production decided before the pilot

Decided 2026-10-22: the demo runs on Netlify with a Neon database. Where the
pilot's production app runs is decided later, once the demo shows real polling
and agent-run numbers. Moving is a hosting change, not a code change: the
template is host-agnostic (Nitro, SQL only).

| Environment | Host                    | Database                             | When  |
| ----------- | ----------------------- | ------------------------------------ | ----- |
| `demo.`     | Netlify (own site)      | Neon branch `demo`                   | now   |
| `staging.`  | same host as production | Neon branch `staging` (copy of prod) | pilot |
| `app.`      | Netlify or a VPS, below | Neon branch `main`                   | pilot |

### Demo on Netlify

- One Netlify site for `demo.`, built from this repo. The sibling templates
  show the shape: a `netlify.toml` with `NITRO_PRESET=netlify`, a
  `pnpm --filter school build` command, and an ignore-build entry in
  `scripts/netlify-ignore-build.mjs` (it has none for `school` yet). The
  portability rule keeps platform config out of template source, but this repo
  already carries one per template; follow that convention and keep the school's
  file minimal.
- `DATABASE_URL` points at the Neon `demo` branch. Never `drizzle-kit push`;
  startup migrations create the tables.
- Env vars set in the Netlify dashboard, not in the repo: `BETTER_AUTH_SECRET`,
  `BETTER_AUTH_URL` and `APP_URL` (the demo URL), the LLM key with a low
  spend cap, and `NODE_ENV=production`. Email stays unset on the demo, so
  also set `ALLOW_UNVERIFIED_SIGNUP=1` (and `AUTH_SKIP_EMAIL_VERIFICATION=1`):
  production refuses to start otherwise, because without email anyone who
  knows an invited address could claim it. That is acceptable on a demo that
  holds only made-up people, never on `app.`.
- Functions time out at about 75 seconds. Normal pages and short actions are
  fine. A long agent run (timetable generation, bulk grading, curriculum
  drafting) may be cut off, so the demo script avoids them or runs them in
  smaller steps. Treat any timeout seen on the demo as evidence for the
  production decision below, not as a demo bug.
- The demo is built from a laptop: `SIM_PASSWORD=<private> SCHOOL_URL=https://demo.…
pnpm showcase:school`. Hundreds of short requests; expect it to be slower
  than locally.
- Netlify bills function calls and bandwidth. A handful of prospects clicking
  through is negligible, but leave no tabs open on the demo overnight.

### Production for the pilot: decide with numbers

Two options; the demo supplies the evidence to choose between them.

**Option A, Netlify again.** Least work. Choose it if the demo shows modest
polling cost and no agent run hits the time limit.

**Option B, one small VPS.** Run the app as a plain Node server (`pnpm build`
then `pnpm start`, Nitro's node preset) in Frankfurt behind Caddy, with
`staging.` and `app.` side by side:

- `useDbSync()` polls every 2 seconds per open tab. On per-invocation pricing
  that becomes the main cost once teachers keep the app open all day; on a VPS
  it is free.
- Agent runs (planning, grading, timetabling) are long LLM loops that
  serverless time limits cut off. A Node process has no such limit.
- A flat few euros a month for both environments.
- Cost: we own OS updates, restarts (systemd) and TLS (Caddy), and a single
  server is a single point of failure. The Caddyfile, systemd units and env
  files live outside `templates/school`, in a deploy directory or a separate
  private repo.

Choose B if the demo shows polling dominating the bill, or agent runs timing
out.

### VPS configuration (Option B)

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

### Estimated monthly cost

Demo now: Netlify free tier, Neon free tier, a domain (about €1 a month) and
the LLM spend cap: about €1 plus LLM usage. The table below is Option B for
the pilot (check prices before buying; Hetzner raised prices in April 2026).

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
nothing is mailed by mistake; the production start-up check then needs
`ALLOW_UNVERIFIED_SIGNUP=1` on those two, and must never be set on `app.`.

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
  then repeat the three steps below.

### Building the demo (done 2026-10-22)

The showcase is about 90,000 requests. Over the internet to a serverless
function and a Frankfurt database that is hours; locally on SQLite it is under
four minutes. So the demo is built locally and loaded into Neon:

1. `pnpm migrate:school` with `DATABASE_URL` set to the Neon branch. A first
   request on a fresh serverless database starts ninety migrations, and the
   host froze the function after six, leaving the schema half built. Run this
   from a machine that stays awake. (Recommended: also run it in the Netlify
   build command, so a deploy never depends on a cold start finishing it.)
2. Build Crestfield on a throwaway SQLite file with its own server (`DATABASE_URL=file:./data/demo-build.db`,
   `pnpm exec agent-native dev --port 8133`) and `SCHOOL_URL=http://localhost:8133
SHOWCASE_DATABASE_URL=file:./data/demo-build.db SIM_PASSWORD=<private> pnpm showcase:school`.
   Do not save files in `templates/school` while it runs: the dev server
   restarts and requests fail.
3. `pnpm load:school --from file:./data/demo-build.db --exclude-email dev@local.test`
   with `DATABASE_URL` on Neon. It checks both schemas, inserts only, leaves
   out the local dev account and sessions, and checks every table's count
   (120,757 rows in about 2.5 minutes). The people, school and invitations
   arrive with the data, so `provision:school` is not needed.

Keep `DATABASE_URL` and `SIM_PASSWORD` in a file outside the repo
(`~/.crestfield-demo.env`, mode 600) and source it; never paste them into chat
or a command line that is logged.

What it found, all fixed on the branch: the school had never run on Postgres.
Thirty-five `db.get`/`db.all`/`db.run` calls (SQLite-only) now go through
`server/lib/raw-sql.ts`, and nine boolean flag columns were created as
integers (migration 91 converts them, Postgres only). Pages 404'd in a
production build until `server/routes/[...page].get.ts` existed and the
`ssr-entry.ts` override was limited to dev.

Still true on the hosted demo: right after idle, a cold function instance
answers 404 for framework routes (sign-in, actions) for a few seconds while
its plugins start, and Neon's free compute wakes in a second or two. Retrying
works. This is the evidence to weigh for Option A or B.

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
2. Owner: create the Neon project in Frankfurt with `demo`, `main` and
   `staging` branches; create the Netlify site; register the domain.
3. Add the school's `netlify.toml` and ignore-build entry, then deploy `demo.`.
4. Build the showcase on the demo with `SIM_PASSWORD` set; check the pages and
   note any timeouts and the Netlify usage after a few days.
5. Decide Option A or B for production from those numbers.
6. Clear the pilot blockers, then deploy `staging.` and `app.`.
