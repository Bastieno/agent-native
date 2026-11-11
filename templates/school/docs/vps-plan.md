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
address. Both names are listed in the Caddyfile alongside the schools'.

New schools need no DNS or Caddy step: a wildcard A record (`*.ellai.dev`,
DNS only, to the server) and Caddy's on-demand certificates bring a school's
address up as soon as it is in `school_domains`. See "Wildcard addresses" below.
The apex also serves the operator console, `/operator`, for the emails in
`ELLAI_OPERATOR_EMAILS` (below).

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

## Wildcard addresses (one-time setup)

Caddy gets a certificate the first time a name is asked for, but only if the app
says the name is a school's. Without that check anyone could point a made-up name
at the server and make Caddy request certificates for it.

1. Cloudflare: an A record `*` to `135.181.29.76`, DNS only. Existing records
   (the apex, `www`, the three schools) keep their own and win over the wildcard.
2. `/etc/caddy/Caddyfile`: replace the one block that lists every host with the
   global option and two blocks, then `caddy validate` and `systemctl reload caddy`:

```caddyfile
{
	on_demand_tls {
		ask http://127.0.0.1:3000/api/caddy/allow
	}
}

ellai.dev, www.ellai.dev {
	encode zstd gzip
	reverse_proxy 127.0.0.1:3000
}

https:// {
	tls {
		on_demand
	}
	encode zstd gzip
	reverse_proxy 127.0.0.1:3000
}
```

The `ask` address is the app's `GET /api/caddy/allow?domain=<name>`
(`server/routes/api/caddy/allow.get.ts`). It answers 200 only for the apex,
`www` and a host in `school_domains`, and 404 for everything else, and it
refuses any request that carries `X-Forwarded-For`, so only Caddy on this
machine can use it. 3. Check: `curl -s -o /dev/null -w '%{http_code}' 'http://127.0.0.1:3000/api/caddy/allow?domain=nope.ellai.dev'`
is 404; the same with `crestfield.ellai.dev` is 200. Then
`curl -I https://crestfield.ellai.dev` still answers, and a name that is no
school's, `https://nope.ellai.dev`, fails the TLS handshake.

Let's Encrypt allows about 50 new certificates a week for the domain; one per
school is far below that.

## The operator console

`https://ellai.dev/operator`, for the emails in `ELLAI_OPERATOR_EMAILS` in
`/etc/school.env` (comma separated, e.g. `francis...,support@ellai.dev`). On
every school's own address, and for anyone off the list, it does not exist (404).

**Signing in needs no school account.** An operator enters their address; if it
is on the list, a six-digit code is emailed to it (valid 10 minutes, one use,
five tries; three requests per address per 15 minutes). The code gives a signed,
HttpOnly cookie that lasts 12 hours, signed with a key derived from
`BETTER_AUTH_SECRET`, and is checked against the list on every request, so
removing an address ends its session at once. **Sign out** is in the page header.
The mailbox for each address on the list is therefore the credential: keep
`support@ellai.dev` to people who should be operators. Local development has no
mailbox, so the code is printed in the server log instead.

It shows each school's address, credit balance, 30-day use and days left, opens a
school to grant credit and read its ledger, lists top-up requests, and has a New
school form that does what `pnpm provision:school` does (both call
`server/lib/operator/provision-school.ts`). Everything it changes is written to
`operator_audit` (who, what, which school; sign-ins too). Its routes are
`/api/operator/*`, hand-written and not actions, so the assistant and connected
AI apps can never call them; they refuse non-JSON posts and run only on the
shared address.

## Adding a school

From the console: New school, name, address, the head's email. The school gets
its address, the starter 5,000 credits and an invitation email (the link is shown
if email fails). Nothing to do in Cloudflare or Caddy once the wildcard is in.

From a terminal, the same thing: `pnpm provision:school --name "..." --headEmail
... --slug ...`, run from a laptop through a tunnel to the server's database
(`ssh -L 5433:127.0.0.1:5432 ...`, with `DATABASE_URL` pointing at
`127.0.0.1:5433`; the password is in `/etc/school.env`).

Before the wildcard is set up, a new school's address needs its own A record and
its host added to the Caddyfile (then `systemctl reload caddy`).

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
