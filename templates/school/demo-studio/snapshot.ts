import { spawnSync } from "node:child_process";
import path from "node:path";
import { clearDemoDb, takeSnapshot, waitForDbClosed } from "./db.js";
import { DEMO_DB, DEMO_PORT } from "./guard.js";
import { portTaken, startDemoServer } from "./server.js";

/**
 * Build Crestfield on the demo database up to the moment before its timetable is generated (lesson counts set),
 * and save that as the snapshot every take starts from. `pnpm demo:snapshot`.
 */
const ROOT = path.resolve(import.meta.dirname, "..");
if (await portTaken(DEMO_PORT)) {
  console.error(
    `Port ${DEMO_PORT} is already in use (a demo server left running?). Stop it, then try again.`,
  );
  process.exit(1);
}
clearDemoDb();
const server = await startDemoServer();
let status = 1;
try {
  console.log(`Building Crestfield up to its curriculum on ${server.url}…`);
  status =
    spawnSync("pnpm", ["exec", "tsx", "test/sim/run-showcase.ts"], {
      cwd: ROOT,
      stdio: "inherit",
      env: {
        ...process.env,
        SCHOOL_URL: server.url,
        SHOWCASE_DATABASE_URL: `file:${DEMO_DB}`,
        SHOWCASE_STOP_AFTER: "lesson-counts",
      },
    }).status ?? 1;
} finally {
  await server.stop();
}
if (status !== 0) {
  console.error("Building the school failed; no snapshot taken.");
  process.exit(status);
}
await waitForDbClosed(path.join(ROOT, DEMO_DB));
takeSnapshot();
console.log("Snapshot saved: data/demo-base.snapshot.db");
