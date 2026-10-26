/**
 * Add a finished school, built locally in SQLite, to a Postgres database that
 * other schools already live in.
 *
 *   pnpm add:school --from file:./data/yellowview.db --email-domain yellowview.test \
 *     [--host yellowview.ellai.dev] [--write] [--resume]
 *
 * Operators only. Run it against the deployment's own `DATABASE_URL`. Unlike
 * `pnpm load:school`, which needs an empty database, this is for a database in
 * use, so it is built around never touching what is already there:
 *
 * - Without `--write` it only reports what it would do.
 * - It only inserts (`INSERT ... ON CONFLICT DO NOTHING`). There is no update,
 *   delete, truncate or drop anywhere in it (`test/add-school.check.ts` fails
 *   the build if one appears).
 * - A key that is already in the target (a primary key, or any unique key such
 *   as an account's email) stops the run before anything is written, naming
 *   it. `--resume` tolerates only rows that are already this school's own,
 *   so a run that stopped halfway can be run again.
 * - What belongs to the school is decided table by table, below. A table the
 *   rules do not know stops the run, so a new table cannot slip in unreviewed.
 * - Before and after, it counts every table and fingerprints every other
 *   school's rows. Any difference fails the run and says where.
 *
 * What stays out: the local dev account and its workspace, sessions and other
 * ephemeral state, the syllabus libraries and assessment styles the app ships
 * (the target has them), shared framework resources, and every settings key
 * that is not this school's.
 */
import { createClient } from "@libsql/client";
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec, isPostgres } from "@agent-native/core/db";
import {
  convert,
  copyPlan,
  NEVER_COPIED,
  q,
  withRetry,
  type Column,
  type Plan,
} from "./lib/load-common.js";

const ORG_COLUMNS = ["org_id", "school_id", "organization_id"];

/**
 * Tables with no school column that hold only rows hanging off a school's own
 * rows (an answer belongs to a submission, a grade to an assessment). The
 * source is a database for one school, so all of such a table is the school's.
 * Listed by name, so a new table is a decision and not an accident.
 */
const CHILD_TABLES = new Set([
  "assessment_variants",
  "class_arms",
  "class_enrollments",
  "class_teachers",
  "grades",
  "learning_objectives",
  "question_responses",
  "rubric_criteria",
  "student_assessments",
  "student_categories",
]);

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  return value && !value.startsWith("--") ? value : undefined;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const lit = (v: string) => `'${v.replace(/'/g, "''")}'`;

type Rule = {
  /** The school's rows, as a condition on the table. Same text on both sides. */
  yes: string;
};

async function main() {
  loadEnv();
  process.on("uncaughtException", (err) => {
    console.log(
      `  (connection event: ${(err as Error)?.message || (err as Error)?.name || "error"})`,
    );
  });
  const from = arg("from");
  const domain = arg("email-domain")?.toLowerCase().replace(/^@/, "");
  const host = arg("host")?.toLowerCase();
  const write = process.argv.includes("--write");
  const resume = process.argv.includes("--resume");
  if (!from || !domain)
    fail(
      "Usage: pnpm add:school --from file:./data/school.db --email-domain school.test [--host name.example.com] [--write] [--resume]",
    );
  if (!isPostgres())
    fail(
      "DATABASE_URL does not point at Postgres. This adds to a Postgres database.",
    );

  const src = createClient({ url: from });
  const raw = getDbExec();
  const dst = {
    execute: (query: Parameters<typeof raw.execute>[0]) =>
      withRetry(() => raw.execute(query)),
  };
  const rowsOf = async (sql: string) => ((await src.execute(sql)) as any).rows;
  const dstRows = async (sql: string, args: unknown[] = []) =>
    (await dst.execute({ sql, args })).rows;

  // ── Same schema ──────────────────────────────────────────────────────────
  const version = async (run: () => Promise<{ rows: any[] }>) => {
    try {
      return Number((await run()).rows[0]?.v ?? 0);
    } catch {
      return 0;
    }
  };
  const sourceVersion = await version(
    () => src.execute("SELECT MAX(version) AS v FROM school_migrations") as any,
  );
  const targetVersion = await version(() =>
    dst.execute("SELECT MAX(version) AS v FROM school_migrations"),
  );
  if (targetVersion < sourceVersion)
    fail(
      `The source is at school migration v${sourceVersion} and the target at v${targetVersion}. Run \`pnpm migrate:school\` against the target first.`,
    );

  // ── Which school is this? ────────────────────────────────────────────────
  const orgs = (
    await rowsOf(
      `SELECT DISTINCT org_id FROM org_members WHERE LOWER(email) LIKE ${lit(`%@${domain}`)}`,
    )
  ).map((r: any) => String(r.org_id));
  if (orgs.length !== 1)
    fail(
      `Expected exactly one school with members at @${domain} in the source, found ${orgs.length}.`,
    );
  const school = orgs[0];
  const strangers = Number(
    (
      await rowsOf(
        `SELECT COUNT(*) AS n FROM org_members WHERE org_id = ${lit(school)} AND LOWER(email) NOT LIKE ${lit(`%@${domain}`)}`,
      )
    )[0].n,
  );
  if (strangers > 0)
    fail(
      `The school ${school} has ${strangers} member(s) outside @${domain}; refusing, since that is not a school built on its own.`,
    );
  const userYes = `LOWER(email) LIKE ${lit(`%@${domain}`)}`;
  const userIds = `(SELECT id FROM "user" WHERE ${userYes})`;

  /** The school's rows in a table, or null if the table is not copied at all. */
  const ruleFor = (table: string, columns: string[]): Rule | null => {
    if (NEVER_COPIED.has(table)) return null;
    switch (table) {
      case "user":
        return { yes: userYes };
      case "account":
        return { yes: `user_id IN ${userIds}` };
      case "organizations":
        return { yes: `id = ${lit(school)}` };
      case "framework_objectives":
        return {
          yes: `framework_id IN (SELECT id FROM curriculum_frameworks WHERE org_id = ${lit(school)})`,
        };
      case "resources":
        return { yes: `path LIKE ${lit(`school-guides/${school}/%`)}` };
      case "settings":
        return {
          yes: `(key LIKE ${lit(`o:${school}:%`)} OR key LIKE ${lit(`u:%@${domain}:%`)})`,
        };
    }
    if (CHILD_TABLES.has(table)) return { yes: "1 = 1" };
    const org = ORG_COLUMNS.find((c) => columns.includes(c));
    if (org) return { yes: `${q(org)} = ${lit(school)}` };
    if (columns.includes("user_id")) return { yes: `user_id IN ${userIds}` };
    fail(
      `The table ${table} has no school column and is not one this tool knows. Decide whether it belongs to a school, then add it to ops/add-school-db.ts.`,
    );
  };

  // ── What the target has ──────────────────────────────────────────────────
  const targetTables: string[] = (
    await dstRows(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name",
    )
  ).map((r: any) => String(r.table_name));
  const columnsOf = async (table: string): Promise<Column[]> =>
    (
      await dstRows(
        `SELECT column_name, data_type, column_default FROM information_schema.columns
         WHERE table_schema = 'public' AND table_name = ? ORDER BY ordinal_position`,
        [table],
      )
    ).map((r: any) => ({
      name: String(r.column_name),
      type: String(r.data_type),
      sequence: String(r.column_default ?? "").startsWith("nextval("),
    }));
  /** Every unique key of a table (the primary key first), as column lists. */
  const uniqueKeys = async (table: string): Promise<string[][]> =>
    (
      await dstRows(
        `SELECT string_agg(a.attname, ',' ORDER BY k.ord) AS cols, i.indisprimary AS pk
         FROM pg_index i
         JOIN pg_class c ON c.oid = i.indrelid
         JOIN pg_namespace n ON n.oid = c.relnamespace AND n.nspname = 'public'
         JOIN LATERAL unnest(i.indkey) WITH ORDINALITY AS k(attnum, ord) ON true
         JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = k.attnum
         WHERE c.relname = ? AND i.indisunique AND i.indpred IS NULL AND i.indexprs IS NULL
         GROUP BY i.indexrelid, i.indisprimary
         ORDER BY i.indisprimary DESC`,
        [table],
      )
    ).map((r: any) => String(r.cols).split(","));

  // ── The plan ─────────────────────────────────────────────────────────────
  const sourceTables = (
    await rowsOf(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
    )
  ).map((r: any) => String(r.name));
  type Item = Plan & { yes: string };
  const plans: Item[] = [];
  const left: string[] = [];
  const problems: string[] = [];
  for (const table of sourceTables) {
    const sourceColumns: string[] = (
      await rowsOf(`PRAGMA table_info(${q(table)})`)
    ).map((r: any) => String(r.name));
    const total = Number(
      (await rowsOf(`SELECT COUNT(*) AS n FROM ${q(table)}`))[0].n,
    );
    if (total === 0) continue;
    const rule = ruleFor(table, sourceColumns);
    if (!rule) {
      left.push(`${table}: ${total} (never copied)`);
      continue;
    }
    const rows = Number(
      (
        await rowsOf(`SELECT COUNT(*) AS n FROM ${q(table)} WHERE ${rule.yes}`)
      )[0].n,
    );
    if (total - rows > 0)
      left.push(`${table}: ${total - rows} of ${total} (not this school's)`);
    if (rows === 0) continue;
    const target = await columnsOf(table);
    if (target.length === 0) {
      problems.push(
        `${table}: ${rows} row(s), but the target has no such table`,
      );
      continue;
    }
    for (const lost of sourceColumns.filter(
      (c) => !target.some((t) => t.name === c),
    )) {
      const holding = Number(
        (
          await rowsOf(
            `SELECT COUNT(*) AS n FROM ${q(table)} WHERE (${rule.yes}) AND ${q(lost)} IS NOT NULL`,
          )
        )[0].n,
      );
      if (holding > 0)
        problems.push(
          `${table}.${lost}: ${holding} value(s), but the target has no such column`,
        );
    }
    plans.push({
      table,
      columns: target.filter((c) => sourceColumns.includes(c.name)),
      rows,
      where: rule.yes,
      yes: rule.yes,
    });
  }

  // ── Guards, before anything is written ───────────────────────────────────
  const planOf = (t: string) => plans.find((p) => p.table === t);
  const guard = (ok: boolean, message: string) => {
    if (!ok) problems.push(message);
  };
  guard(
    planOf("organizations")?.rows === 1,
    "the plan must hold exactly one organisation",
  );
  guard(
    planOf("user")?.rows === planOf("org_members")?.rows,
    `the school has ${planOf("org_members")?.rows} member(s) but ${planOf("user")?.rows} account(s) at @${domain}`,
  );
  if (problems.length)
    fail(
      `Nothing was written. Stopped before the first write:\n  ${problems.join("\n  ")}`,
    );

  // ── Keys already in the target ───────────────────────────────────────────
  const tolerated = new Map<string, number>();
  for (const plan of plans) {
    const keys = await uniqueKeys(plan.table);
    let existing = 0;
    let ours = 0;
    let oursByPrimaryKey = 0;
    for (const [which, key] of keys.entries()) {
      const types = key.map(
        (c) => plan.columns.find((x) => x.name === c)?.type ?? "text",
      );
      if (!key.every((c) => plan.columns.some((x) => x.name === c))) continue;
      let after = -1;
      for (;;) {
        const page = await rowsOf(
          `SELECT rowid AS _r, ${key.map(q).join(", ")} FROM ${q(plan.table)} WHERE rowid > ${after} AND (${plan.where}) ORDER BY rowid LIMIT 400`,
        );
        if (!page.length) break;
        after = Number(page[page.length - 1]._r);
        const tuples = page
          .map((r: any) => key.map((c, i) => convert(r[c], types[i])))
          .filter((t: unknown[]) => t.every((v) => v !== null));
        if (!tuples.length) continue;
        const marks =
          key.length === 1
            ? `${q(key[0])} IN (${tuples.map(() => "?").join(", ")})`
            : `(${key.map(q).join(", ")}) IN (${tuples.map(() => `(${key.map(() => "?").join(", ")})`).join(", ")})`;
        const hit = Number(
          (
            await dstRows(
              `SELECT COUNT(*) AS n FROM ${q(plan.table)} WHERE ${marks}`,
              tuples.flat(),
            )
          )[0].n,
        );
        const mine = Number(
          (
            await dstRows(
              `SELECT COUNT(*) AS n FROM ${q(plan.table)} WHERE (${marks}) AND (${plan.yes})`,
              tuples.flat(),
            )
          )[0].n,
        );
        existing += hit;
        ours += mine;
        if (which === 0) oursByPrimaryKey += mine;
      }
    }
    if (existing !== ours)
      fail(
        `Nothing was written. ${plan.table}: ${existing - ours} key(s) already belong to something that is not this school. Not touching it.`,
      );
    if (ours > 0 && !resume)
      fail(
        `Nothing was written. ${plan.table}: ${ours} of this school's rows are already in the target. If an earlier run stopped halfway, run again with --resume.`,
      );
    tolerated.set(plan.table, oursByPrimaryKey);
  }

  // ── Fingerprint of everything that is not this school's ──────────────────
  const snapshot = async () => {
    const counts = new Map<string, number>();
    const prints = new Map<string, string>();
    for (const table of targetTables) {
      counts.set(
        table,
        Number(
          (await dstRows(`SELECT COUNT(*) AS n FROM ${q(table)}`))[0]?.n ?? 0,
        ),
      );
      const cols = (await columnsOf(table)).map((c) => c.name);
      if (
        !ORG_COLUMNS.some((c) => cols.includes(c)) &&
        !["user", "organizations", "settings", "resources"].includes(table)
      )
        continue;
      const rule = ruleFor(table, cols);
      if (!rule) continue;
      const pk = (await uniqueKeys(table))[0];
      const keyText = pk
        ? `concat_ws('|', ${pk.map((c) => `${q(c)}::text`).join(", ")})`
        : `${q(table)}::text`;
      const row = (
        await dstRows(
          `SELECT COUNT(*) AS n, md5(COALESCE(string_agg(${keyText}, ',' ORDER BY ${keyText}), '')) AS h
           FROM ${q(table)} WHERE NOT (${rule.yes})`,
        )
      )[0];
      prints.set(table, `${row.n}:${row.h}`);
    }
    return { counts, prints };
  };

  const total = plans.reduce((n, p) => n + p.rows, 0);
  console.log(
    `School ${school} (@${domain}): ${plans.length} table(s), ${total.toLocaleString()} row(s) to add.`,
  );
  for (const p of plans)
    console.log(`  + ${p.table}: ${p.rows.toLocaleString()}`);
  for (const l of left) console.log(`  - left out: ${l}`);
  if (host) console.log(`  + school_domains: ${host}`);
  const before = await snapshot();
  console.log(
    `Fingerprinted ${before.prints.size} table(s) of other schools' rows and counted ${before.counts.size} table(s).`,
  );
  if (!write) {
    console.log("Dry run: nothing was written. Run again with --write.");
    return;
  }

  // ── Write ────────────────────────────────────────────────────────────────
  if (host) {
    const taken = await dstRows(
      "SELECT org_id FROM school_domains WHERE host = ? LIMIT 1",
      [host],
    );
    if (taken.length && String(taken[0].org_id) !== school)
      fail(`Nothing was written. ${host} already belongs to another school.`);
  }
  const started = Date.now();
  let done = 0;
  for (const plan of plans) {
    await copyPlan(src, dst, plan, (n) => {
      done += n;
    });
    console.log(
      `  ${plan.table}: ${plan.rows.toLocaleString()} (${done.toLocaleString()} of ${total.toLocaleString()}, ${((Date.now() - started) / 1000).toFixed(0)}s)`,
    );
  }
  let hostAdded = 0;
  if (host) {
    const had = await dstRows(
      "SELECT 1 AS x FROM school_domains WHERE host = ?",
      [host],
    );
    if (!had.length) {
      await dst.execute({
        sql: "INSERT INTO school_domains (host, org_id) VALUES (?, ?) ON CONFLICT DO NOTHING",
        args: [host, school],
      });
      hostAdded = 1;
    }
  }

  // ── Check ────────────────────────────────────────────────────────────────
  const after = await snapshot();
  const wrong: string[] = [];
  for (const [table, n] of before.counts) {
    const plan = planOf(table);
    const added = plan ? plan.rows - (tolerated.get(table) ?? 0) : 0;
    const expected = n + added + (table === "school_domains" ? hostAdded : 0);
    if (after.counts.get(table) !== expected)
      wrong.push(
        `${table}: ${n} before, ${after.counts.get(table)} after, ${expected} expected`,
      );
  }
  for (const [table, print] of before.prints)
    if (after.prints.get(table) !== print)
      wrong.push(
        `${table}: other schools' rows changed (${print} became ${after.prints.get(table)})`,
      );
  for (const plan of plans) {
    // A child table has no way to tell the school's rows from anyone else's;
    // its count above is the check.
    if (CHILD_TABLES.has(plan.table)) continue;
    const mine = Number(
      (
        await dstRows(
          `SELECT COUNT(*) AS n FROM ${q(plan.table)} WHERE ${plan.yes}`,
        )
      )[0].n,
    );
    if (mine !== plan.rows)
      wrong.push(
        `${plan.table}: ${mine} of ${plan.rows} of the school's rows arrived`,
      );
  }
  if (wrong.length) fail(`The check failed:\n  ${wrong.join("\n  ")}`);
  const already = [...tolerated.values()].reduce((n, v) => n + v, 0);
  console.log(
    `Added ${(total - already).toLocaleString()} rows (${already.toLocaleString()} were already there) in ${((Date.now() - started) / 1000).toFixed(0)}s. Every table's count is as expected and the fingerprint of ${after.prints.size} table(s) of other schools' rows is unchanged.`,
  );
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
