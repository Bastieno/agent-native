/**
 * Raw SQL that runs on either database.
 *
 * `db.get`, `db.all` and `db.run` exist only on the SQLite drivers; on
 * Postgres they are not functions, and a call to one fails with "get is not a
 * function" the moment it is reached. Postgres runs raw SQL through
 * `db.execute`, which answers with `{ rows }` (or the rows themselves, from
 * some drivers). These three keep a query's shape the same on both.
 *
 * Which database is in use is asked of the configuration, never worked out by
 * looking for methods on the db object: until its driver has loaded (the first
 * calls of a cold start), `getDb()` returns a placeholder that answers "yes" to
 * every method name and then returns nothing for the ones Postgres lacks.
 *
 * Prefer the query builder; reach for these only where a query is written in
 * SQL, such as a read of the framework's own `user` table.
 */
import type { SQL } from "drizzle-orm";
import { isPostgres } from "@agent-native/core/db";
import { getDb } from "../db/index.js";

/** Every row a query returns. */
export async function rowsOf<T = Record<string, unknown>>(
  query: SQL,
): Promise<T[]> {
  const db: any = getDb();
  if (!isPostgres()) return (await db.all(query)) as T[];
  const result = await db.execute(query);
  return (Array.isArray(result) ? result : (result?.rows ?? [])) as T[];
}

/** The first row a query returns, if there is one. */
export async function rowOf<T = Record<string, unknown>>(
  query: SQL,
): Promise<T | undefined> {
  return (await rowsOf<T>(query))[0];
}

/** A statement that changes data and answers with nothing. */
export async function runSql(query: SQL): Promise<void> {
  const db: any = getDb();
  if (!isPostgres()) await db.run(query);
  else await db.execute(query);
}
