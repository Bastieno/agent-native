/**
 * Load a finished school database (SQLite) into an empty Postgres one.
 *
 *   pnpm load:school --from file:./data/demo-build.db [--exclude-email dev@local.test] [--dry-run]
 *
 * Operators only. Run it against the deployment's own `DATABASE_URL`. It is
 * how a school built locally (the showcase, which takes minutes on SQLite and
 * hours over the internet) reaches a hosted database: every row is copied
 * through, so people, classes, marks and settings arrive as they were.
 *
 * What it will and will not do:
 * - The target must already be migrated at least as far as the source
 *   (`pnpm migrate:school`) and must hold no people yet. It only inserts, and
 *   skips rows that are already there, so a run that stops halfway can be run
 *   again. It never updates or deletes anything.
 * - Passwords come across as they are: the hash is the same on either side.
 * - Sessions, verification codes, signing keys and each person's last screen
 *   are not copied. Sessions and keys are tied to the secret of the server
 *   that made them, so people simply sign in again on the new one.
 * - `--exclude-email a@x,b@y` leaves people behind: their account, any
 *   workspace only they belong to, and what is keyed to them. The local dev
 *   server makes `dev@local.test` for itself; it must never reach a hosted
 *   database.
 * - A column the target does not have, holding data, stops the run before
 *   anything is written: it would otherwise be lost silently.
 */
import { createClient } from "@libsql/client";
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec, isPostgres } from "@agent-native/core/db";

/**
 * Never copied: tied to the secret of the server that wrote them, ephemeral
 * (where each person was looking), or bookkeeping.
 */
const SKIP = new Set([
  "session",
  "sessions",
  "verification",
  "jwks",
  "application_state",
  "school_migrations",
  "_org_migrations",
]);

const q = (name: string) => `"${name.replace(/"/g, '""')}"`;

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  return value && !value.startsWith("--") ? value : undefined;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

type Column = { name: string; type: string; sequence: boolean };

/** One SQLite value as the Postgres column wants it. */
function convert(value: unknown, type: string): unknown {
  if (value === null || value === undefined) return null;
  if (value instanceof ArrayBuffer) value = Buffer.from(value);
  switch (type) {
    case "boolean":
      return (
        value === true ||
        value === 1 ||
        value === 1n ||
        value === "1" ||
        value === "true" ||
        value === "t"
      );
    case "smallint":
    case "integer":
    case "bigint":
    case "double precision":
    case "real":
    case "numeric":
      return typeof value === "bigint" ? Number(value) : Number(value);
    case "bytea":
      return Buffer.isBuffer(value) ? value : Buffer.from(String(value));
    case "timestamp without time zone":
    case "timestamp with time zone":
    case "date":
      if (typeof value === "number")
        return new Date(value < 1e11 ? value * 1000 : value);
      return value;
    default:
      return typeof value === "string" || Buffer.isBuffer(value)
        ? value
        : String(value);
  }
}

async function main() {
  loadEnv();
  const from = arg("from");
  const dryRun = process.argv.includes("--dry-run");
  if (!from)
    fail(
      "Usage: pnpm load:school --from file:./data/school.db [--exclude-email a@x,b@y] [--dry-run]",
    );
  const excludedEmails = (arg("exclude-email") ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!isPostgres()) {
    fail(
      "DATABASE_URL does not point at Postgres. This loads a SQLite file into a Postgres database.",
    );
  }

  const src = createClient({ url: from });
  const dst = getDbExec();

  // Same schema on both sides, and an empty target.
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
  // Migrations only add, so a target that is ahead of the source is fine (a
  // Postgres-only step leaves the SQLite source a version behind). One that is
  // behind is missing tables or columns the data needs.
  if (targetVersion < sourceVersion) {
    fail(
      `The source is at school migration v${sourceVersion} and the target at v${targetVersion}. Run \`pnpm migrate:school\` against the target first.`,
    );
  }
  const people = Number(
    (await dst.execute('SELECT COUNT(*) AS n FROM "user"')).rows[0]?.n ?? 0,
  );
  if (people > 0) {
    fail(
      `The target already holds ${people} account(s). This loads into an empty database; use a fresh Neon branch.`,
    );
  }

  // Who and what is left behind: the people named, and any organisation
  // whose every member is one of them.
  const lit = (v: string) => `'${v.replace(/'/g, "''")}'`;
  const rowsOf = async (sql: string) => ((await src.execute(sql)) as any).rows;
  let excludedUserIds: string[] = [];
  let excludedOrgIds: string[] = [];
  if (excludedEmails.length) {
    const emails = excludedEmails.map(lit).join(", ");
    excludedUserIds = (
      await rowsOf(`SELECT id FROM "user" WHERE LOWER(email) IN (${emails})`)
    ).map((r: any) => String(r.id));
    excludedOrgIds = (
      await rowsOf(
        `SELECT o.id FROM organizations o WHERE EXISTS (SELECT 1 FROM org_members m WHERE m.org_id = o.id)
         AND NOT EXISTS (SELECT 1 FROM org_members m WHERE m.org_id = o.id AND LOWER(m.email) NOT IN (${emails}))`,
      )
    ).map((r: any) => String(r.id));
    console.log(
      `Leaving behind ${excludedUserIds.length} account(s) and ${excludedOrgIds.length} organisation(s) for ${excludedEmails.join(", ")}.`,
    );
  }
  /** The rows of a table that stay, as a SQL condition on the source. */
  const keep = (table: string, columns: string[]): string => {
    if (!excludedEmails.length) return "1 = 1";
    const emails = excludedEmails.map(lit).join(", ");
    const users = excludedUserIds.map(lit).join(", ");
    const orgs = excludedOrgIds.map(lit).join(", ");
    const has = (c: string) => columns.includes(c);
    const conds: string[] = [];
    if (table === "user") conds.push(`LOWER(email) NOT IN (${emails})`);
    if (table === "organizations" && orgs) conds.push(`id NOT IN (${orgs})`);
    if (has("user_id") && users)
      conds.push(`(user_id IS NULL OR user_id NOT IN (${users}))`);
    for (const c of ["email", "owner_email", "owner"]) {
      if (has(c))
        conds.push(`(${c} IS NULL OR LOWER(${c}) NOT IN (${emails}))`);
    }
    for (const c of ["org_id", "school_id", "organization_id"]) {
      if (has(c) && orgs) conds.push(`(${c} IS NULL OR ${c} NOT IN (${orgs}))`);
    }
    if (table === "settings") {
      for (const e of excludedEmails)
        conds.push(`key NOT LIKE ${lit(`%${e}%`)}`);
      for (const o of excludedOrgIds)
        conds.push(`key NOT LIKE ${lit(`%${o}%`)}`);
    }
    return conds.length ? conds.join(" AND ") : "1 = 1";
  };

  const sourceTables = (
    (await src.execute(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
    )) as any
  ).rows.map((r: any) => String(r.name));

  // What the target has, per table.
  const columnsOf = async (table: string): Promise<Column[]> =>
    (
      await dst.execute({
        sql: `SELECT column_name, data_type, column_default FROM information_schema.columns
              WHERE table_schema = 'public' AND table_name = ? ORDER BY ordinal_position`,
        args: [table],
      })
    ).rows.map((r: any) => ({
      name: String(r.column_name),
      type: String(r.data_type),
      sequence: String(r.column_default ?? "").startsWith("nextval("),
    }));

  type Plan = { table: string; columns: Column[]; rows: number; where: string };
  const plans: Plan[] = [];
  const problems: string[] = [];
  for (const table of sourceTables) {
    if (SKIP.has(table)) continue;
    const target = await columnsOf(table);
    const sourceColumns: string[] = (
      (await src.execute(`PRAGMA table_info(${q(table)})`)) as any
    ).rows.map((r: any) => String(r.name));
    const where = keep(table, sourceColumns);
    const rows = Number(
      (
        (await src.execute(
          `SELECT COUNT(*) AS n FROM ${q(table)} WHERE ${where}`,
        )) as any
      ).rows[0].n,
    );
    if (target.length === 0) {
      if (rows > 0)
        problems.push(
          `${table}: ${rows} row(s), but the target has no such table`,
        );
      continue;
    }
    const shared = target.filter((c) => sourceColumns.includes(c.name));
    for (const lost of sourceColumns.filter(
      (c) => !target.some((t) => t.name === c),
    )) {
      const holding = Number(
        (
          (await src.execute(
            `SELECT COUNT(*) AS n FROM ${q(table)} WHERE ${q(lost)} IS NOT NULL`,
          )) as any
        ).rows[0].n,
      );
      if (holding > 0)
        problems.push(
          `${table}.${lost}: ${holding} value(s), but the target has no such column`,
        );
    }
    if (rows > 0) plans.push({ table, columns: shared, rows, where });
  }
  if (problems.length) {
    fail(
      `Nothing was written. The two schemas differ:\n  ${problems.join("\n  ")}`,
    );
  }

  const total = plans.reduce((n, p) => n + p.rows, 0);
  console.log(
    `${plans.length} table(s) with data, ${total.toLocaleString()} row(s) to load${dryRun ? " (dry run, nothing written)" : ""}.`,
  );
  if (dryRun) {
    for (const p of plans) console.log(`  ${p.table}: ${p.rows}`);
    return;
  }

  const started = Date.now();
  let done = 0;
  for (const plan of plans) {
    const names = plan.columns.map((c) => q(c.name)).join(", ");
    const perBatch = Math.max(
      1,
      Math.min(200, Math.floor(30_000 / plan.columns.length)),
    );
    let after = -1;
    const pending: Promise<unknown>[] = [];
    for (;;) {
      const page = (await src.execute({
        sql: `SELECT rowid AS _rowid, ${plan.columns.map((c) => q(c.name)).join(", ")}
              FROM ${q(plan.table)} WHERE rowid > ? AND (${plan.where}) ORDER BY rowid LIMIT ?`,
        args: [after, perBatch],
      })) as any;
      if (page.rows.length === 0) break;
      after = Number(page.rows[page.rows.length - 1]._rowid);
      const marks = page.rows
        .map(() => `(${plan.columns.map(() => "?").join(", ")})`)
        .join(", ");
      const args = page.rows.flatMap((row: any) =>
        plan.columns.map((c) => convert(row[c.name], c.type)),
      );
      pending.push(
        dst.execute({
          sql: `INSERT INTO ${q(plan.table)} (${names}) VALUES ${marks} ON CONFLICT DO NOTHING`,
          args,
        }),
      );
      done += page.rows.length;
      // A few batches in flight at once hides the round trip to the database.
      if (pending.length >= 4) await Promise.all(pending.splice(0));
    }
    await Promise.all(pending);
    // A serial column's counter must start after the rows just written.
    for (const c of plan.columns.filter((c) => c.sequence)) {
      await dst.execute(
        `SELECT setval(pg_get_serial_sequence('${plan.table}', '${c.name}'), COALESCE((SELECT MAX(${q(c.name)}) FROM ${q(plan.table)}), 1))`,
      );
    }
    console.log(
      `  ${plan.table}: ${plan.rows.toLocaleString()} (${done.toLocaleString()} of ${total.toLocaleString()}, ${((Date.now() - started) / 1000).toFixed(0)}s)`,
    );
  }

  // Count what arrived, table by table.
  const short: string[] = [];
  for (const plan of plans) {
    const n = Number(
      (await dst.execute(`SELECT COUNT(*) AS n FROM ${q(plan.table)}`)).rows[0]
        ?.n ?? 0,
    );
    if (n !== plan.rows) short.push(`${plan.table}: ${n} of ${plan.rows}`);
  }
  if (short.length) {
    fail(`Some rows did not arrive:\n  ${short.join("\n  ")}`);
  }
  console.log(
    `Loaded ${total.toLocaleString()} rows in ${((Date.now() - started) / 1000).toFixed(0)}s; every table's count matches the source.`,
  );
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
