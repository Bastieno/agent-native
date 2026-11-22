import { execFileSync, spawnSync } from "node:child_process";
import { randomBytes, scryptSync } from "node:crypto";
import { TEST_PASSWORD } from "../test/sim/client.js";
import fs from "node:fs";
import path from "node:path";
import {
  clearDemoDb,
  snapshotPath,
  takeSnapshot,
  waitForDbClosed,
} from "./db.js";
import { SCHOOLS, schoolIds, type SchoolId } from "./schools.js";
import { portTaken, startDemoServer } from "./server.js";
import { touchUp } from "./touch-up.js";

/**
 * Build the snapshot a school's takes start from. `pnpm demo:snapshot [school]`
 * (crestfield by default). See schools.ts for what each one is.
 *
 * Yellow View and Crestfield-after-a-term are copies of the owner's own
 * showcase databases, taken with SQLite's online backup (a read, so the
 * showcase is untouched even while its server is running).
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

/** Copy one of the owner's databases into this school's snapshot. */
function copyOf(source: string): void {
  const from = path.join(ROOT, source);
  if (!fs.existsSync(from)) {
    console.error(`${source} does not exist, so there is nothing to copy.`);
    process.exit(1);
  }
  if (fs.existsSync(`${from}-wal`)) {
    // A server has it open: ask SQLite for a consistent copy.
    execFileSync("sqlite3", [
      "-readonly",
      from,
      `.backup '${snapshotPath(undefined, id)}'`,
    ]);
  } else {
    fs.copyFileSync(from, snapshotPath(undefined, id));
  }
}

/**
 * Give every account in the copy the demo password. The owner's showcase was
 * built under whatever password was set then; the demo signs in with the sim's.
 * Same scrypt format Better Auth writes (`salt:hexkey`, salt used as text).
 */
function useDemoPassword(): void {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(TEST_PASSWORD.normalize("NFKC"), salt, 64, {
    N: 16384,
    r: 16,
    p: 1,
    maxmem: 128 * 16384 * 16 * 2,
  });
  execFileSync("sqlite3", [
    snapshotPath(undefined, id),
    `UPDATE account SET password = '${salt}:${key.toString("hex")}' WHERE provider_id = 'credential';`,
  ]);
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

if (id === "yellowview") {
  copyOf("data/yellowview.db");
  useDemoPassword();
  await touchUp(id);
} else if (id === "crestfield-term") copyOf("data/showcase.pre-promotion.db");
else {
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
}
console.log(
  `Snapshot saved for ${id}: ${path.relative(ROOT, snapshotPath(undefined, id))}`,
);
