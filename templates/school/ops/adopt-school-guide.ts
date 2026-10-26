/**
 * Give an existing school the guide that used to be shared.
 *
 *   pnpm adopt:school-guide --school crestfield.ellai.dev [--write]
 *
 * Before a school's guide was kept per school, every school in a database read
 * one shared `SCHOOL_GUIDE.md`. Once a second school joins the database the
 * shared file is no longer read (`server/lib/school-guide.ts`), so the school
 * that wrote it has to adopt it first: this copies the shared guide to the
 * school's own path. It only adds a row, never changes or removes one, and does
 * nothing if the school already has a guide of its own.
 *
 * `--school` is the school's address (as in `school_domains`) or its
 * organisation id. Prints what it would do unless `--write` is given.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec } from "@agent-native/core/db";
import { resourceGetByPath, SHARED_OWNER } from "@agent-native/core/resources";
import { orgForHost } from "../server/lib/school-host.js";
import {
  GUIDE_FILE,
  guidePath,
  writeSchoolGuide,
} from "../server/lib/school-guide.js";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  const value = i >= 0 ? process.argv[i + 1] : undefined;
  return value && !value.startsWith("--") ? value.trim() : undefined;
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

async function main() {
  loadEnv();
  const school = arg("school");
  if (!school)
    fail(
      "Usage: pnpm adopt:school-guide --school <address or org id> [--write]",
    );
  const orgId = school.includes(".") ? await orgForHost(school) : school;
  if (!orgId) fail(`No school has the address ${school}.`);

  const own = await resourceGetByPath(SHARED_OWNER, guidePath(orgId));
  if (own?.content?.trim()) {
    console.log(`School ${orgId} already has its own guide; nothing to do.`);
    return;
  }
  const shared = await resourceGetByPath(SHARED_OWNER, GUIDE_FILE);
  if (!shared?.content?.trim()) {
    console.log("There is no shared guide to adopt; nothing to do.");
    return;
  }
  console.log(
    `Would copy the shared guide (${shared.content.length} characters, first line "${shared.content.split("\n")[0].slice(0, 60)}") to ${guidePath(orgId)}.`,
  );
  if (!process.argv.includes("--write")) {
    console.log("Dry run: nothing was written. Run again with --write.");
    return;
  }
  await writeSchoolGuide(orgId, shared.content);
  console.log("Done. The shared file itself was left as it was.");
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
