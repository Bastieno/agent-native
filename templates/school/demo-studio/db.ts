import fs from "node:fs";
import path from "node:path";
import { SCHOOLS, type SchoolId } from "./schools.js";

/**
 * The demo school's database, and the snapshot every take starts from.
 * Paths are relative to the template root unless a directory is given (the
 * check uses a temp dir).
 */
const DATA_DIR = path.resolve(import.meta.dirname, "..", "data");

/** File names inside the data directory: `demo.db` and `demo-base.snapshot.db` for Crestfield, `<db>.snapshot.db` for the rest. */
function files(school: SchoolId): { db: string; snapshot: string } {
  const db = path.basename(SCHOOLS[school].db);
  return {
    db,
    snapshot:
      school === "crestfield"
        ? "demo-base.snapshot.db"
        : db.replace(/\.db$/, ".snapshot.db"),
  };
}

/** A non-empty write-ahead log means a server still has the database open. */
export function assertDbClosed(dbPath: string): void {
  const wal = `${dbPath}-wal`;
  if (fs.existsSync(wal) && fs.statSync(wal).size > 0) {
    throw new Error(
      `${dbPath} is still open (its write-ahead log has unsaved pages). Stop the demo server first.`,
    );
  }
}

/** Where a school's snapshot lives. */
export function snapshotPath(
  dir: string = DATA_DIR,
  school: SchoolId = "crestfield",
): string {
  return path.join(dir, files(school).snapshot);
}

export function takeSnapshot(
  dir: string = DATA_DIR,
  school: SchoolId = "crestfield",
): void {
  const f = files(school);
  const db = path.join(dir, f.db);
  assertDbClosed(db);
  fs.copyFileSync(db, path.join(dir, f.snapshot));
}

export function restoreSnapshot(
  dir: string = DATA_DIR,
  school: SchoolId = "crestfield",
): void {
  const f = files(school);
  const snap = path.join(dir, f.snapshot);
  if (!fs.existsSync(snap)) {
    throw new Error(
      `There is no ${school} snapshot yet. Make one with \`pnpm demo:snapshot${school === "crestfield" ? "" : ` ${school}`}\`.`,
    );
  }
  const db = path.join(dir, f.db);
  assertDbClosed(db);
  for (const leftover of [`${db}-wal`, `${db}-shm`])
    fs.rmSync(leftover, { force: true });
  fs.copyFileSync(snap, db);
}

/** Remove the demo database and its logs (not the snapshot). */
export function clearDemoDb(
  dir: string = DATA_DIR,
  school: SchoolId = "crestfield",
): void {
  const db = path.join(dir, files(school).db);
  assertDbClosed(db);
  for (const f of [db, `${db}-wal`, `${db}-shm`]) fs.rmSync(f, { force: true });
}

/** Wait for a stopping server to flush and close the database. */
export async function waitForDbClosed(
  dbPath: string,
  timeoutMs = 20_000,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    try {
      return assertDbClosed(dbPath);
    } catch (e) {
      if (Date.now() >= deadline) throw e;
    }
    await new Promise((r) => setTimeout(r, 100));
  }
}
