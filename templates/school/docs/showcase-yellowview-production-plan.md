# Putting Yellow View beside Crestfield in production: the plan

**Status:** built and proven on a local copy of production (2026-10-26). Nothing has been run against the hosted database except read-only queries and a read-only copy.

## The problem

Crestfield lives in the shared Neon database (migration v107). Yellow View was built locally in its own SQLite file
(`data/yellowview.db`, about 100,000 rows). Building it over the internet would take about 90,000 requests, so it has to be
copied in. `pnpm load:school` cannot do it: it refuses any database that already holds an account. A second school needs a
loader that **adds** to a database that is in use.

## What goes in, and what must stay out

The source database holds exactly one school, so the rule is "everything in it, minus what the target already has or
must never receive", enforced by checks rather than trusted.

| Goes in (Yellow View's own)                                                                  | Stays out                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| its organisation, members and invitations; its 210 accounts and their passwords (hash as is) | the local dev account `dev@local.test` and its workspace                                                                                                                      |
| school profiles, students, staff, arms, subjects, classes, enrolments, timetable             | sessions, verification codes, signing keys, each person's last screen (`application_state`)                                                                                   |
| terms, lesson notes, assessments, submissions, grades, report cards, announcements           | the 83 shipped sample libraries (NERDC, WAEC) and the 5 shipped WAEC assessment styles: production already has them, a second copy would double every library Crestfield sees |
| its 46 imported library entries and their objectives                                         | the 15 shared framework resources (`AGENTS.md`, `LEARNINGS.md`, remote-agents files)                                                                                          |
| its settings (`o:<its org>:*`, `u:<its people>:*`)                                           | every other settings key                                                                                                                                                      |
| the 192 PDF study guides (`document_files`)                                                  | migration bookkeeping tables                                                                                                                                                  |

## The loader: `ops/add-school-db.ts` (new; `pnpm add:school`)

It shares its row copying with `load-school-db.ts` (moved to `ops/lib/`), so the tested path is the same one that loaded
Crestfield. What is different is the safety around it:

1. **Insert only.** Only `INSERT ... ON CONFLICT DO NOTHING` is ever issued. The script contains no `UPDATE`, `DELETE`,
   `TRUNCATE` or `DROP`, and a test fails if one appears.
2. **No silent skips.** Before writing anything it looks for every source primary key and every unique key (account email,
   organisation, domain host) in the target. Any hit aborts the run and names it. `DO NOTHING` is then only a seat belt.
3. **Scope guards, checked before the first write.** Every kept row that has an organisation or school column must
   carry Yellow View's id; every kept account must have an email at `yellowview.test`; the plan must contain exactly one
   organisation. Anything else aborts.
4. **Crestfield fingerprint.** Before the load, for every table that has an organisation or school column, it records the
   row count and a hash of the ids of every row that is **not** Yellow View's. After the load it records them again and
   fails loudly if one byte differs. The two fingerprints are printed, so the run is its own proof.
5. **Dry run by default.** Without `--write` it prints the plan (rows per table, what is excluded and why) and stops.
6. **Schema first.** It stops unless the target is migrated to the source's version (`pnpm migrate:school`).
7. **Serial counters** are only moved forward, never set below the target's own highest value.
8. **Resumable.** A run that stops halfway can run again; rows already there are left alone and the conflict check
   accepts only rows that are identical to the ones being inserted.

## Two things that have to be settled first

**A. The school guide is shared by every school (a platform gap).** `SCHOOL_GUIDE.md` is stored once per database, owned by
`__shared__`, and `get-school-resource`, `update-school-resource`, `draft-school-guide` and `check-school-setup` all read and
write that one file. In the shared production database, Yellow View would read Crestfield's guide (WAEC, naira, JSS), and
Crestfield's would be shown to Yellow View's agent. It is not a data problem the loader can fix: the guide has to become
per school.

Proposed fix, additive and small: store each school's guide at `school-guides/<organisation id>/SCHOOL_GUIDE.md`, read and
write it through the four actions, fall back to the old shared file only for a school that has none, and change one
sentence in `AGENTS.md` so the agent asks `get-school-resource` instead of reading the shared path. The loader then brings
Yellow View's guide in at its own path. Crestfield keeps working unchanged through the fallback until someone saves its guide.

**B. The database changes ship in the right order.** Migrations 108 and 109 add two nullable columns to `subjects`. They
are additive and the current deployed code ignores them, so the order is safe:
`migrate` (columns appear) then `deploy` (new code uses them) then `load`.

## Proving it on a copy first

The test run never touches production's data:

1. A copy of the production database is made (choose one):
   - **A Neon branch** of production, created in the Neon console (instant, exact). You give me its connection string.
   - **A local copy:** `pg_dump` production (read only) into a Postgres in Docker. I can do this if Docker is running here;
     it needs the sandbox lifted for the read.
2. Run `migrate:school`, then `add:school` dry run, then `add:school --write`, on the copy.
3. Check on the copy: the fingerprint passes; Yellow View signs in; Crestfield's roster, marks and report cards are
   unchanged (the app's own checks, plus a before and after count of Crestfield's classes, submissions and grades); the
   guide each school reads is its own.
4. Run the loader's own tests: re-running is harmless, a planted conflict aborts, a planted foreign organisation aborts.

## Going live (each step confirmed with you before it runs)

0. Rebuild Yellow View locally with `SIM_PASSWORD` from `~/.crestfield-demo.env` set.
1. A restore point: a Neon branch (or point-in-time marker) made just before.
2. `pnpm migrate:school` on production (adds the two columns).
3. `pnpm adopt:school-guide --school crestfield.ellai.dev --write` (gives Crestfield's guide its own path; the shared file stays).
4. Deploy the branch to `crestfield-demo` (`NITRO_PRESET=vercel pnpm build`, `vercel deploy --prebuilt --prod`).
5. `pnpm add:school --from file:./data/yellowview.db --email-domain yellowview.test --host yellowview.ellai.dev` (dry run), review, then `--write`.
6. (The `school_domains` row is added by the loader's `--host`.)
7. Cloudflare `CNAME yellowview` to `cname.vercel-dns.com`, DNS only (you add it), then
   `npx vercel domains add yellowview.ellai.dev crestfield-demo`.
8. Open both addresses side by side; run the demo note's checks.

## What was proven on the copy

A copy of production (121,000 rows, read only) was loaded into a local Postgres, then the real sequence was run on it:
`migrate:school`, `adopt:school-guide` for Crestfield, `add:school` (dry run, then `--write`).

- 83,266 rows added in 2 seconds; the loader's own check passed (every table's count as expected, the fingerprint of 44
  tables of other schools' rows unchanged).
- Independently, with SQL written separately from the loader: Crestfield's classes (112), submissions (14,534), grades
  (14,524), students (180), accounts (214 not at `yellowview.test`), settings, resources and library rows have identical
  counts and ids hashes before and after. The only change in the database outside Yellow View is the one adopted guide row.
- Run again without `--resume`: refused, naming the first table. With `--resume`: nothing duplicated.
- A host-routed check against the app on the copy: `yellowview` reads the Yellow View guide and 96 classes, `crestfield`
  reads the Crestfield guide and 112; a Crestfield principal on Yellow View's address has no role there, and the reverse.
- The loader's own test (`test/add-school.check.ts`) fails if an UPDATE, DELETE, TRUNCATE, DROP or ALTER ever appears.

Passwords: accounts carry the password they were built with. The production load must come from a build made with
`SIM_PASSWORD` set to the private demo password, never the public test one in the repository.

## What I need from you

1. Approve the per-school guide fix (A), or tell me to accept the shared guide for now.
2. Choose the test copy: a Neon branch you create, or a local copy I make from a read-only dump.
3. Confirm a restore point will exist before step 1 of going live.
