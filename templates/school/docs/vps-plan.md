# The school server (Hetzner VPS)

Status: live since 2026-11-11. This replaced the Vercel + Neon deployment after
both hit their free-plan limits. It describes what is actually running; the
older provider-neutral draft it replaces is in git history.

## What runs where

One server, everything on it:

| Part           | What                                                                                    | Where                                                                      |
| -------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Server         | Hetzner Cloud CPX22 (2 vCPU, 4 GB, 80 GB), Helsinki, Ubuntu 24.04, IPv4 `135.181.29.76` | Hetzner console, project `Default`, server `school`                        |
| App            | The school app built for plain Node (`NITRO_PRESET=node-server`)                        | `/srv/school/app/.output`, run by `school.service` as user `school`        |
| Settings       | Environment variables                                                                   | `/etc/school.env` (root only, mode 600)                                    |
| Database       | Postgres 18, database `school`, role `school`, listening on localhost only              | `/var/lib/postgresql/18/main`                                              |
| Web server     | Caddy: TLS certificates (Let's Encrypt) and reverse proxy to `127.0.0.1:3000`           | `/etc/caddy/Caddyfile`                                                     |
| Daily job      | Notifications, digests and credit settlement, 05:00 UTC                                 | `school-daily.timer` → `/usr/local/bin/school-daily`                       |
| Nightly backup | `pg_dump` at 02:30, 14 days kept                                                        | `/etc/cron.d/school-backup` → `/var/backups/school`                        |
| Firewall       | `ufw`: ports 22, 80, 443 only                                                           |                                                                            |
| DNS            | A records, DNS only (not proxied), in Cloudflare                                        | `ellai.dev`, `www`, `crestfield`, `yellowview`, `sebscollege` `.ellai.dev` |

A school is reached by its address: `school_domains` maps a host to a school,
and Caddy must list the host to get a certificate for it.

The apex, `ellai.dev` and `www.ellai.dev`, is the public landing page, served by
the same app. It belongs to no school and has no sign-in: `/login` there
redirects to `/` (`server/middleware/apex-login.ts`, which reads
`SCHOOL_BASE_DOMAIN`, `ellai.dev` by default). A school signs in at its own
address. Both names are listed in the Caddyfile alongside the schools'. There is
no wildcard DNS record, no Cloudflare token on the server, and Caddy has no DNS
plugin or on-demand TLS, so each new name needs its own A record and Caddyfile
entry.

## Getting in

```bash
ssh -i ~/.ssh/hetzner_school root@135.181.29.76
```

`~/.ssh/hetzner_school` is a key without a passphrase, made for this server and
added when the server was created. Keep a copy in a password manager: without
it the only way in is Hetzner's rescue mode. Add a second key to
`/root/.ssh/authorized_keys` so one lost laptop never locks anyone out.

## Settings (`/etc/school.env`)

Names and what they do. Never paste the file; it holds secrets.

| Variable                                                  | Purpose                                                                                                                                                                          |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`, `PORT`, `HOST`                                | `production`, `3000`, `127.0.0.1` (Caddy is the only thing that reaches it)                                                                                                      |
| `DATABASE_URL`                                            | The local Postgres                                                                                                                                                               |
| `BETTER_AUTH_SECRET`                                      | Signs sessions. Generated on this server. Also encrypts values stored in `app_secrets` (empty today); changing it would make any stored there unreadable, and signs everyone out |
| `BETTER_AUTH_URL`, `APP_URL`                              | `https://crestfield.ellai.dev`; other schools work from their own host                                                                                                           |
| `ALLOW_UNVERIFIED_SIGNUP`, `AUTH_SKIP_EMAIL_VERIFICATION` | Demo only: sign-up without an email check. Remove for a real school                                                                                                              |
| `CRON_SECRET`                                             | Protects `/api/school/cron/daily`; `school-daily` sends it                                                                                                                       |
| `ELLAI_MANAGED_ANTHROPIC_KEY`                             | Ellai's own Anthropic key. Every school on Ellai's credit uses it. Without it the chat asks for a key                                                                            |
| `ELLAI_OPERATOR_EMAILS`, `ELLAI_TOPUP_INSTRUCTIONS`       | Who is told about credit, and the bank details shown when topping up. A multi-line value goes inside double quotes on real lines                                                 |
| `RESEND_API_KEY`, `EMAIL_FROM`                            | Email. `EMAIL_FROM` is `Ellai <noreply@ellai.dev>`; the school name replaces `Ellai` per school                                                                                  |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`  | Phone push. Do not change the keys once people have subscribed                                                                                                                   |
| `CAL_LINK`, `CAL_WEBHOOK_SECRET`                          | The pilot booking link and its webhook                                                                                                                                           |

Add or change a secret without it passing through a chat or shell history:

```bash
read -s "K?Value: "; echo; printf '%s' "$K" | ssh -i ~/.ssh/hetzner_school root@135.181.29.76 'read -r K; echo "NAME=$K" >> /etc/school.env'; unset K
```

Then `systemctl restart school`. A name set twice takes the last line; remove
the old one with `sed -i '/^NAME=/d' /etc/school.env` first. Never set
`AUTO_CREATE_DEFAULT_ORG` (the app refuses to start).

## Deploying an update

There is no automatic deploy. Build on the laptop, copy, restart (about a
minute). From the repo root, on the commit to ship:

```bash
cd templates/school
COREPACK_ENABLE_STRICT=0 NITRO_PRESET=node-server pnpm build
```

```bash
rsync -a --delete -e "ssh -i $HOME/.ssh/hetzner_school" .output root@135.181.29.76:/srv/school/app/
```

```bash
ssh -i ~/.ssh/hetzner_school root@135.181.29.76 'chown -R school:school /srv/school && systemctl restart school'
```

Rebuild `packages/core` first if it changed (`pnpm --filter @agent-native/core build`).
Migrations are additive and run when the app starts, so rolling back the code is
safe. Check afterwards: sign in as an admin on each school and open a page.

## Adding a school

1. Provision it (`pnpm provision:school`), run from a laptop through a tunnel
   to the server's database (`ssh -L 5433:127.0.0.1:5432 ...`, with
   `DATABASE_URL` pointing at `127.0.0.1:5433`; the password is in
   `/etc/school.env`).
2. Add its host to `school_domains` if the script did not.
3. Cloudflare: an A record for the host to `135.181.29.76`, DNS only. Remove
   any CNAME or other A record on the same name first (an old Vercel record
   makes the certificate fail, because Let's Encrypt reaches the wrong server).
4. Add the host to the first line of `/etc/caddy/Caddyfile`, then
   `systemctl reload caddy`. The certificate arrives within seconds once DNS
   points here; if it was added before DNS was right, reload Caddy again after.

## Backups and restore

Three copies, none a substitute for the others:

- **On the server:** nightly dumps in `/var/backups/school`, 14 days.
- **Hetzner:** daily whole-server backups (7 kept), switched on at creation.
- **The laptop:** `~/bin/pull-school-backups` copies the dumps to
  `~/Backups/school-server` and keeps 30 days. Run it by hand, or schedule it.

Restore a dump into a fresh database (tested 2026-11-11: 426 users, migration
116, identical to live):

```bash
sudo -u postgres createdb restore_test
sudo -u postgres pg_restore --no-owner --no-acl -d restore_test /var/backups/school/school-YYYY-MM-DD.dump
```

To replace the live database: stop the app (`systemctl stop school`), restore
into a new database, check it, then swap the name in `DATABASE_URL`. Do not
restore over the live one. The one thing a dump does not hold is
`/etc/school.env`; keep its secrets in a password manager.

## Routine care

- Security updates install on their own (`unattended-upgrades`). A kernel update
  needs a reboot: `reboot`, about a minute, and every service starts by itself.
  Check all three schools afterwards.
- Do not upgrade the Ubuntu release; this was built and tested on 24.04.
- Disk and memory: `df -h /`, `free -m`. About 6% of the disk and 18% of the
  memory were in use at launch.

## Looking around

| Question                    | Command                                               |
| --------------------------- | ----------------------------------------------------- |
| Is the app up?              | `systemctl status school`                             |
| App logs, live              | `journalctl -u school -f`                             |
| Web server and certificates | `systemctl status caddy`, `journalctl -u caddy -f`    |
| Daily job                   | `systemctl list-timers`, `journalctl -u school-daily` |
| Database                    | `sudo -u postgres psql school`, then `\dt`            |
| Which names are set         | `cut -d= -f1 /etc/school.env`                         |
| Firewall                    | `ufw status`                                          |

`systemctl restart school` takes up to 10 seconds to stop (`TimeoutStopSec=10`);
the app does not exit on request.

## Still to do

- Retire the Vercel project and Neon database once the new server has run for a
  week or two, and then the old `vercel-dns` CNAME rows and the `_vercel` TXT
  record in Cloudflare. Neon holds a copy frozen at the move (2026-11-11);
  anything done since exists only here, so do not point a school back at it
  without copying the data across first.

Done since the move: the apex (`ellai.dev`, `www`) was moved from Vercel to this
server on 2026-11-11 (A records, Caddyfile, certificates); the laptop copy of the dumps is scheduled daily at 11:00
(`dev.ellai.school-backup` launch agent on the owner's Mac); the kernel
update was applied and the server rebooted; `/root/neon.dump` was deleted; the
Credit Test Academy school (and its owner's account) was removed from this
database on 2026-11-11 (it remains in the frozen Neon copy).
