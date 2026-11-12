/** Shared check helpers. Run any check with: npx tsx test/<name>.check.ts */
import { rmSync } from "node:fs";

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
