/**
 * Move every school's guide out of the shared area, where all schools can see it.
 *
 *   pnpm move:school-guides                          (dry run: prints what it would do)
 *   pnpm move:school-guides --write                  (copy each guide to its school's own owner)
 *   pnpm move:school-guides --write --remove-shared  (then remove the copies that were verified)
 *
 * Guides used to be stored at `school-guides/<school id>/SCHOOL_GUIDE.md` in the
 * shared area (and, before that, as one shared `SCHOOL_GUIDE.md`). Everything in
 * that area is listed in every school's assistant prompt, and staff can open it
 * with the workspace-files tool. A school's guide now lives under its own owner
 * (`server/lib/school-guide.ts`), which nothing else can see.
 *
 * Copying only adds rows. `--remove-shared` deletes a shared row only when the
 * school's own copy exists and has exactly the same content. The old single
 * shared `SCHOOL_GUIDE.md` is removed only if it matches a school's guide; if it
 * matches none, it is left alone and the output says so, so it can be given to
 * the school it belonged to (`pnpm adopt:school-guide`) first.
 */
import { loadEnv } from "@agent-native/core/scripts";
import { closeDbExec, getDbExec } from "@agent-native/core/db";
import {
  resourceDeleteByPath,
  resourceGetByPath,
  SHARED_OWNER,
} from "@agent-native/core/resources";
import {
  GUIDE_FILE,
  guideOwner,
  sharedGuidePath,
  writeSchoolGuide,
} from "../server/lib/school-guide.js";

const write = process.argv.includes("--write");
const removeShared = process.argv.includes("--remove-shared");

async function sharedGuideRows(): Promise<string[]> {
  const { rows } = await getDbExec().execute({
    sql: `SELECT path FROM resources WHERE owner = ? AND path LIKE ? ORDER BY path`,
    args: [SHARED_OWNER, "school-guides/%"],
  });
  return rows
    .map((r: any) => String(r.path))
    .filter((p) => p.endsWith(`/${GUIDE_FILE}`));
}

function schoolIdOf(path: string): string {
  return path.split("/")[1];
}

async function main() {
  loadEnv();
  if (removeShared && !write) {
    console.error("--remove-shared needs --write.");
    process.exit(1);
  }

  const verified = new Map<string, string>(); // school id -> content of its own copy
  const paths = await sharedGuideRows();
  console.log(`${paths.length} guide(s) in the shared area.`);

  for (const path of paths) {
    const id = schoolIdOf(path);
    const shared = await resourceGetByPath(SHARED_OWNER, path);
    const content = shared?.content ?? "";
    const first = content.split("\n")[0].slice(0, 70);
    let own = await resourceGetByPath(guideOwner(id), GUIDE_FILE);
    if (own?.content === content) {
      console.log(`  ${id}: already copied ("${first}").`);
    } else if (own?.content?.trim()) {
      console.log(
        `  ${id}: the school already has its own, different guide; the shared one is left alone ("${first}").`,
      );
      continue;
    } else if (!write) {
      console.log(
        `  ${id}: would copy ${content.length} characters ("${first}").`,
      );
      continue;
    } else {
      await writeSchoolGuide(id, content);
      own = await resourceGetByPath(guideOwner(id), GUIDE_FILE);
      if (own?.content !== content) {
        console.error(
          `  ${id}: the copy did not verify; leaving it all alone.`,
        );
        continue;
      }
      console.log(`  ${id}: copied and verified ("${first}").`);
    }
    verified.set(id, content);
    if (removeShared) {
      await resourceDeleteByPath(SHARED_OWNER, path);
      console.log(`  ${id}: removed from the shared area.`);
    }
  }

  // Guides a school already holds privately (moved earlier, or adopted directly).
  const { rows: privateRows } = await getDbExec().execute({
    sql: `SELECT owner FROM resources WHERE owner LIKE ? AND path = ?`,
    args: ["school:%", GUIDE_FILE],
  });
  for (const r of privateRows as any[]) {
    const id = String(r.owner).slice("school:".length);
    const own = await resourceGetByPath(String(r.owner), GUIDE_FILE);
    if (own?.content && !verified.has(id)) verified.set(id, own.content);
  }

  // The single shared file from before guides were kept per school.
  const legacy = await resourceGetByPath(SHARED_OWNER, GUIDE_FILE);
  if (!legacy?.content?.trim()) {
    console.log("No old shared SCHOOL_GUIDE.md.");
  } else {
    const owners = [...verified.entries()].filter(
      ([, c]) => c === legacy.content,
    );
    const first = legacy.content.split("\n")[0].slice(0, 70);
    if (owners.length === 0) {
      console.log(
        `The old shared SCHOOL_GUIDE.md ("${first}") matches no school's guide, so it is left in place. Give it to its school with pnpm adopt:school-guide, then run this again.`,
      );
    } else if (removeShared) {
      await resourceDeleteByPath(SHARED_OWNER, GUIDE_FILE);
      console.log(
        `The old shared SCHOOL_GUIDE.md matched ${owners[0][0]}'s guide and was removed.`,
      );
    } else {
      console.log(
        `The old shared SCHOOL_GUIDE.md ("${first}") matches ${owners[0][0]}'s guide; --remove-shared would remove it.`,
      );
    }
  }
  if (!write) console.log("Dry run: nothing was written.");
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDbExec());
