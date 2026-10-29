/**
 * What the two loaders share: reading rows out of a school's SQLite file and
 * inserting them into Postgres, safely and repeatably.
 *
 * Only ever `INSERT ... ON CONFLICT DO NOTHING`; nothing here updates or
 * deletes. `ops/load-school-db.ts` (into an empty database) and
 * `ops/add-school-db.ts` (a school added to a database in use) both go through
 * `copyPlan`, so what is tested on one is what runs on the other.
 */
import type { Client } from "@libsql/client";

/**
 * Never copied: tied to the secret of the server that wrote them, ephemeral
 * (where each person was looking), or bookkeeping.
 */
export const NEVER_COPIED = new Set([
  "session",
  "sessions",
  "verification",
  "jwks",
  "application_state",
  "school_migrations",
  "_org_migrations",
]);

export const q = (name: string) => `"${name.replace(/"/g, '""')}"`;

/**
 * One statement, retried. The first queries on a fresh connection to a hosted
 * database sometimes fail with no message while it wakes, and a long load now
 * and then loses its connection. Everything this tool runs is safe to repeat:
 * reads, `ON CONFLICT DO NOTHING` inserts and sequence resets. A statement that
 * never answers is given up on after a minute.
 */
export async function withRetry<T>(run: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      return await Promise.race([
        run(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("no answer in 60s")), 60_000),
        ),
      ]);
    } catch (err) {
      last = err;
      console.log(
        `  (connection hiccup, attempt ${attempt} of 6: ${err instanceof Error ? err.message || err.name : "error"})`,
      );
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
  throw last;
}

/** Enough rows for a statement, but never more than about this many bytes. */
export const MAX_STATEMENT_BYTES = 400_000;

export type Dst = { execute: (q: any) => Promise<{ rows: any[] }> };

export type Column = { name: string; type: string; sequence: boolean };

/** One SQLite value as the Postgres column wants it. */
export function convert(value: unknown, type: string): unknown {
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

export type Plan = {
  table: string;
  columns: Column[];
  rows: number;
  where: string;
};

/**
 * Copy one table's planned rows. A serial column's counter is moved forward to
 * the table's highest value, never back.
 */
export async function copyPlan(
  src: Client,
  dst: Dst,
  plan: Plan,
  onRows: (n: number) => void = () => {},
): Promise<void> {
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
    // Split the page so no statement carries more than MAX_STATEMENT_BYTES.
    const converted = page.rows.map((row: any) =>
      plan.columns.map((c) => convert(row[c.name], c.type)),
    );
    let from = 0;
    while (from < converted.length) {
      let to = from;
      let bytes = 0;
      while (
        to < converted.length &&
        (to === from || bytes < MAX_STATEMENT_BYTES)
      ) {
        bytes += converted[to].reduce(
          (n: number, v: unknown) =>
            n + (typeof v === "string" ? v.length : 16),
          0,
        );
        to++;
      }
      const chunk = converted.slice(from, to);
      const marks = chunk
        .map(() => `(${plan.columns.map(() => "?").join(", ")})`)
        .join(", ");
      pending.push(
        dst.execute({
          sql: `INSERT INTO ${q(plan.table)} (${names}) VALUES ${marks} ON CONFLICT DO NOTHING`,
          args: chunk.flat(),
        }),
      );
      if (pending.length >= 2) await Promise.all(pending.splice(0));
      from = to;
    }
    onRows(page.rows.length);
  }
  await Promise.all(pending);
  for (const c of plan.columns.filter((c) => c.sequence)) {
    const seq = (
      await dst.execute(
        `SELECT pg_get_serial_sequence('${plan.table}', '${c.name}') AS s`,
      )
    ).rows[0]?.s;
    if (!seq) continue;
    await dst.execute(
      `SELECT setval('${seq}', GREATEST(COALESCE((SELECT MAX(${q(c.name)}) FROM ${q(plan.table)}), 1), (SELECT last_value FROM ${seq})))`,
    );
  }
}
