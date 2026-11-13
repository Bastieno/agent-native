import fs from "node:fs";
import path from "node:path";

/**
 * The demo school's database, and the snapshot every take starts from.
 * Paths are relative to the template root unless a directory is given (the
 * check uses a temp dir).
 */
const DATA_DIR = path.resolve(import.meta.dirname, "..", "data");
const DB = "demo.db";
const SNAPSHOT = "demo-base.snapshot.db";

/** A non-empty write-ahead log means a server still has the database open. */
export function assertDbClosed(dbPath: string): void {
  const wal = `${dbPath}-wal`;
  if (fs.existsSync(wal) && fs.statSync(wal).size > 0) {
    throw new Error(
      `${dbPath} is still open (its write-ahead log has unsaved pages). Stop the demo server first.`,
    );
  }
}

export function takeSnapshot(dir: string = DATA_DIR): void {
  const db = path.join(dir, DB);
  assertDbClosed(db);
  fs.copyFileSync(db, path.join(dir, SNAPSHOT));
}

export function restoreSnapshot(dir: string = DATA_DIR): void {
  const snap = path.join(dir, SNAPSHOT);
  if (!fs.existsSync(snap)) {
    throw new Error(
      "There is no demo snapshot yet. Make one with `pnpm demo:snapshot`.",
    );
  }
  const db = path.join(dir, DB);
  assertDbClosed(db);
  for (const leftover of [`${db}-wal`, `${db}-shm`])
    fs.rmSync(leftover, { force: true });
  fs.copyFileSync(snap, db);
}

/** Remove the demo database and its logs (not the snapshot). */
export function clearDemoDb(dir: string = DATA_DIR): void {
  const db = path.join(dir, DB);
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
