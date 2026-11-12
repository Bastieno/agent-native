/** Shared check helpers. Run any check with: npx tsx test/<name>.check.ts */
import { readFileSync, rmSync } from "node:fs";

const pending: Promise<void>[] = [];

export function check(name: string, fn: () => void | Promise<void>) {
  const run = (async () => {
    try {
      await fn();
      console.log(`PASS ${name}`);
    } catch (err) {
      console.log(`FAIL ${name}\n  ${(err as Error).message}`);
      process.exitCode = 1;
    }
  })();
  pending.push(run);
  return run;
}

/** Point the app at a fresh SQLite file. Call before importing server code. */
export function freshDatabase(name: string): string {
  const file = `./data/${name}.db`;
  for (const suffix of ["", "-wal", "-shm"])
    rmSync(file + suffix, { force: true });
  process.env.DATABASE_URL = `file:${file}`;
  return file;
}

export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export const ORG = "org1";
export const OWNER = "owner@books.test";
export const PARTNER = "partner@books.test";

/**
 * A fresh database with Books' tables, an owner and a partner in one org.
 * Returns helpers to run code as either of them.
 */
export async function bootBooks(name: string) {
  freshDatabase(name);
  const { runWithRequestContext } = await import("@agent-native/core/server");
  const { getDbExec } = await import("@agent-native/core/db");
  const { migrateForChecks } = await import("../server/db/migrate.js");
  const { ensureBooksSetup } = await import("../server/lib/setup.js");
  await migrateForChecks();
  const exec = getDbExec();
  await exec.execute({
    sql: `CREATE TABLE IF NOT EXISTS org_members (id TEXT PRIMARY KEY, org_id TEXT NOT NULL, email TEXT NOT NULL, role TEXT NOT NULL, joined_at INTEGER)`,
    args: [],
  });
  await exec.execute({
    sql: `INSERT INTO org_members (id, org_id, email, role, joined_at) VALUES ('m1', ?, ?, 'owner', 0), ('m2', ?, ?, 'member', 0)`,
    args: [ORG, OWNER, ORG, PARTNER],
  });
  await ensureBooksSetup(ORG);
  const as =
    (email: string) =>
    <T>(fn: () => Promise<T>): Promise<T> =>
      runWithRequestContext({ userEmail: email, orgId: ORG }, fn) as Promise<T>;
  const query = async (sql: string, args: unknown[] = []) =>
    (await exec.execute({ sql, args: args as any[] })).rows as any[];
  return { exec, query, asOwner: as(OWNER), asPartner: as(PARTNER) };
}

/**
 * The real-data fixtures (sales summary, payment method and item reports) are
 * kept out of git because the repo is public. Put copies in test/fixtures/ to
 * run the checks that use them.
 */
export const fixture = (name: string) => {
  try {
    return readFileSync(`test/fixtures/${name}`, "utf8");
  } catch {
    console.error(
      `Missing test/fixtures/${name}. Real business data is kept out of git; copy it in to run this check.`,
    );
    process.exit(1);
  }
};

/** Exit once every check has settled; the database client keeps the process alive otherwise. */
export async function finish(): Promise<never> {
  await Promise.allSettled(pending);
  process.exit(process.exitCode ?? 0);
}
