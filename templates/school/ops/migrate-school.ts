/**
 * Bring a database's schema up to date.
 *
 *   pnpm migrate:school
 *
 * Operators only. Runs the school's startup migrations against the
 * deployment's own `DATABASE_URL`, exactly the ones the app runs when it
 * starts, and prints each as it is applied. Additive only, and safe to run
 * again: it applies whatever is missing and nothing else.
 *
 * Why it exists: a serverless host can freeze a function the moment it has
 * answered, so a first request that starts ninety migrations may leave a
 * fresh database half built. Running this once from a machine that stays
 * awake finishes the job, and shows any migration the database refuses.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec } from "@agent-native/core/db";
import migrate from "../server/plugins/db.js";

async function main() {
  loadEnv();
  const started = Date.now();
  await (migrate as unknown as (nitroApp?: unknown) => Promise<void>)({});
  const { rows } = await getDbExec().execute({
    sql: "SELECT MAX(version) AS v FROM school_migrations",
    args: [],
  });
  console.log(
    `Schema is at school migration v${String((rows[0] as Record<string, unknown>)?.v)} (${((Date.now() - started) / 1000).toFixed(1)}s).`,
  );
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
