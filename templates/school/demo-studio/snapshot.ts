import { spawnSync } from "node:child_process";
import path from "node:path";

import {
  clearDemoDb,
  snapshotPath,
  takeSnapshot,
  waitForDbClosed,
} from "./db.js";
import { SCHOOLS, schoolIds, type SchoolId } from "./schools.js";
import { portTaken, startDemoServer } from "./server.js";

/**
 * Build the snapshot a school's takes start from. `pnpm demo:snapshot [school]`
 * (crestfield by default). See schools.ts for what each one is.
 *
 * Every school is built fresh on its own demo server, never copied from the
 * owner's showcases: those were built by an older seed and have since moved
 * on (Crestfield's was promoted to the next year).
 */
const ROOT = path.resolve(import.meta.dirname, "..");
const id = (process.argv[2] ?? "crestfield") as SchoolId;
if (!schoolIds.includes(id)) {
  console.error(`Which school? One of: ${schoolIds.join(", ")}`);
  process.exit(1);
}
const school = SCHOOLS[id];
if (await portTaken(school.port)) {
  console.error(
    `Port ${school.port} is already in use (a demo server left running?). Stop it, then try again.`,
  );
  process.exit(1);
}

function run(cmd: string[], env: Record<string, string>): number {
  return (
    spawnSync("pnpm", ["exec", ...cmd], {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, ...env },
    }).status ?? 1
  );
}

clearDemoDb(undefined, id);
const server = await startDemoServer(id);
let status = 1;
try {
  if (id === "crestfield") {
    console.log(`Building Crestfield up to its curriculum on ${server.url}…`);
    status = run(["tsx", "test/sim/run-showcase.ts"], {
      SCHOOL_URL: server.url,
      SHOWCASE_DATABASE_URL: `file:${school.db}`,
      SHOWCASE_STOP_AFTER: "lesson-counts",
    });
  } else if (id === "crestfield-term" || id === "yellowview") {
    console.log(`Building ${id} through its whole term on ${server.url}…`);
    status = run(["tsx", "test/sim/run-showcase.ts"], {
      SCHOOL_URL: server.url,
      SHOWCASE_DATABASE_URL: `file:${school.db}`,
      ...(id === "yellowview" ? { SHOWCASE: "yellowview" } : {}),
    });
  } else {
    // A school created the operator's way, with its head signed up and nothing else.
    console.log(`Creating an empty school on ${server.url}…`);
    status = run(["tsx", "demo-studio/make-empty-school.ts", server.url], {
      DATABASE_URL: `file:${school.db}`,
      // The demo must never send a real invitation email.
      RESEND_API_KEY: "",
    });
  }
} finally {
  await server.stop();
}
if (status !== 0) {
  console.error("Building the school failed; no snapshot taken.");
  process.exit(status);
}
await waitForDbClosed(path.join(ROOT, school.db));
takeSnapshot(undefined, id);
console.log(
  `Snapshot saved for ${id}: ${path.relative(ROOT, snapshotPath(undefined, id))}`,
);
