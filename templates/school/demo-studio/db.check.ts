import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  assertDbClosed,
  restoreSnapshot,
  takeSnapshot,
  waitForDbClosed,
} from "./db.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-db-"));
const db = path.join(dir, "demo.db");
const snap = path.join(dir, "demo-base.snapshot.db");

// A database with a live write-ahead log is still open: refuse it.
fs.writeFileSync(db, "base");
fs.writeFileSync(`${db}-wal`, "pending writes");
assert.throws(() => assertDbClosed(db), /still open/);
assert.throws(() => takeSnapshot(dir), /still open/);

// Closed (empty wal) is fine.
fs.writeFileSync(`${db}-wal`, "");
assertDbClosed(db);
takeSnapshot(dir);
assert.equal(fs.readFileSync(snap, "utf8"), "base");

// A take dirties the database; restore puts the snapshot back with no leftovers.
fs.writeFileSync(db, "after a take");
fs.writeFileSync(`${db}-wal`, "x");
fs.writeFileSync(`${db}-shm`, "x");
restoreSnapshot(dir);
assert.equal(fs.readFileSync(db, "utf8"), "base");
assert.ok(!fs.existsSync(`${db}-wal`));
assert.ok(!fs.existsSync(`${db}-shm`));

// No snapshot yet: say how to make one.
fs.rmSync(snap);
assert.throws(() => restoreSnapshot(dir), /demo:snapshot/);

// A server that is still shutting down: wait for it to let go, but not forever.
fs.writeFileSync(`${db}-wal`, "closing");
setTimeout(() => fs.rmSync(`${db}-wal`), 300);
await waitForDbClosed(db, 5000);
fs.writeFileSync(`${db}-wal`, "stuck");
await assert.rejects(() => waitForDbClosed(db, 500), /still open/);

fs.rmSync(dir, { recursive: true });
console.log("db: ok");
