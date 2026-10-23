# VPS runbook

Status: draft, provider-neutral. Written before the owner named a provider, OS
or domain; the steps assume a Debian/Ubuntu-family Linux with root or sudo, and
a domain whose DNS the owner controls. Replace the placeholders when those are
known. Target: running by Sunday 2026-10-25.

Placeholders: `school.example.com` (domain), `/srv/school` (app directory),
`school` (the unix user that runs the app).

## 1. Server basics

- Open only ports 22, 80, 443. SSH by key only. Automatic security updates.
- Add 2 GB swap if RAM is 2 GB or less (the build needs it), or build elsewhere
  and copy `.output` over (step 3, option B).
- Create the user: `adduser --system --group --home /srv/school school`.
- DNS: an `A` record for `school.example.com` to the server's IPv4 (and `AAAA`
  if it has IPv6).

## 2. Node and pnpm

Node 24 (see `.nvmrc`) and the pnpm the repo pins (10.x):

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs git caddy
sudo corepack enable
```

## 3. Build

Option A, on the server (repo is private: use a deploy key or a token):

```bash
sudo -u school git clone --branch claude/k12-app-assessment-b562c4 <repo-url> /srv/school/repo
cd /srv/school/repo && sudo -u school pnpm install
cd templates/school && sudo -u school pnpm build        # default node preset -> .output/
```

Option B, on the laptop, then copy: `pnpm build` in `templates/school`, then
`rsync -a .output/ server:/srv/school/repo/templates/school/.output/`. Cheaper
for a small server. The scripts in step 6 still need the repo and `pnpm install`
on whichever machine runs them.

Run the app with `node .output/server/index.mjs` (that is what `pnpm start`
does).

## 4. Environment

`/etc/school.env`, mode 600, owned by root (systemd reads it):

```
NODE_ENV=production
PORT=3000
HOST=127.0.0.1
DATABASE_URL=...                 # section 5
BETTER_AUTH_SECRET=...           # openssl rand -hex 32, new for this server
BETTER_AUTH_URL=https://school.example.com
APP_URL=https://school.example.com
# Demo only (no email configured); never on a real school's server:
ALLOW_UNVERIFIED_SIGNUP=1
AUTH_SKIP_EMAIL_VERIFICATION=1
```

Never set `AUTO_CREATE_DEFAULT_ORG` (the app refuses to start). The Anthropic
key is not an env var: each school adds its own in the app (Settings,
Assistant). Real email later: `RESEND_API_KEY`, `EMAIL_FROM`, and drop the two
`*_UNVERIFIED*` lines.

## 5. Postgres: keep Neon or run it locally

- **Keep Neon (current Ohio project).** Nothing to move, managed backups and
  point-in-time restore. Cost: every query crosses the internet, so pick a VPS
  in or near US East; a European VPS would be slow, and Neon's free plan sleeps
  after 5 idle minutes.
- **Postgres on the VPS.** Fastest and free, no sleep. Cost: backups, upgrades
  and restores are yours; the server is then a single point of failure for the
  data too.

If local: `apt install postgresql`, create a role and database, set
`DATABASE_URL=postgres://school:<pw>@127.0.0.1:5432/school`, listen on
localhost only. Then run `pnpm migrate:school` once (section 6) before the
first start: a fresh database should not be migrated by a first web request.

## 6. Demo data

The demo is not rebuilt on the server. Load the existing copy from Neon (or
from a rebuilt local SQLite file; recipe in `deployment-plan.md`, "Building the
demo"). From a checkout with `pnpm install` and the target `DATABASE_URL`
exported:

```bash
pnpm --filter school migrate:school
pnpm --filter school load:school --from <source-url> --exclude-email dev@local.test
```

`load:school` only inserts, checks both schemas and every table's row count
(about 3 minutes). To copy Neon to a local Postgres instead, a plain
`pg_dump --no-owner -Fc` / `pg_restore` works for the same result. The shared
demo password stays in `SIM_PASSWORD`, outside the repo.

## 7. systemd

`/etc/systemd/system/school.service`:

```ini
[Unit]
Description=Crestfield school app
After=network-online.target postgresql.service

[Service]
User=school
WorkingDirectory=/srv/school/repo/templates/school
EnvironmentFile=/etc/school.env
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload && sudo systemctl enable --now school
journalctl -u school -f
```

## 8. Caddy (TLS)

`/etc/caddy/Caddyfile`:

```
school.example.com {
    reverse_proxy 127.0.0.1:3000
}
```

`sudo systemctl reload caddy`. Caddy gets and renews the certificate itself once
DNS points at the server and ports 80/443 are open.

## 9. Backups

- Neon: nothing to do; rehearse a restore once.
- Local Postgres: nightly `pg_dump -Fc school > school-$(date +%F).dump` from
  cron, copied off the box (object storage or another machine), keep 14 days,
  and test one restore. Plus the provider's disk snapshots if offered.
- The app keeps no other state on disk; `/etc/school.env` is the only file to
  back up besides the database.

## 10. Deploying an update

```bash
cd /srv/school/repo && sudo -u school git pull
sudo -u school pnpm install && cd templates/school && sudo -u school pnpm build
sudo systemctl restart school
```

Migrations are additive and run on start, so rolling back the code is safe.

## 11. Check it works

Sign in as the principal, open pages as admin, teacher and student, restart the
service and confirm the first request after the restart succeeds (the readiness
gate holds it for a few seconds), and `curl -I https://school.example.com/login`
returns 200.

## Open questions for the owner

Provider and plan, region, OS image, domain (and where its DNS is), whether
Postgres stays on Neon, and whether the repo may be cloned on the server.
