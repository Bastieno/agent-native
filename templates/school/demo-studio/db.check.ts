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
// A live write-ahead log means a server still has it open: never overwrite that.
assert.throws(() => restoreSnapshot(dir), /still open/);
assert.equal(fs.readFileSync(db, "utf8"), "after a take");
fs.writeFileSync(`${db}-wal`, "");
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

// Each school has its own database and snapshot; one never touches another's.
{
  const d2 = fs.mkdtempSync(path.join(os.tmpdir(), "demo-db2-"));
  fs.writeFileSync(path.join(d2, "demo.db"), "crestfield");
  fs.writeFileSync(path.join(d2, "demo-yellowview.db"), "yellow view");
  takeSnapshot(d2, "yellowview");
  assert.equal(
    fs.readFileSync(path.join(d2, "demo-yellowview.snapshot.db"), "utf8"),
    "yellow view",
  );
  assert.ok(!fs.existsSync(path.join(d2, "demo-base.snapshot.db")));
  fs.writeFileSync(path.join(d2, "demo-yellowview.db"), "dirty");
  restoreSnapshot(d2, "yellowview");
  assert.equal(
    fs.readFileSync(path.join(d2, "demo-yellowview.db"), "utf8"),
    "yellow view",
  );
  assert.equal(fs.readFileSync(path.join(d2, "demo.db"), "utf8"), "crestfield");
  assert.throws(() => restoreSnapshot(d2, "empty"), /demo:snapshot empty/);
  fs.rmSync(d2, { recursive: true });
}
