import {
  resourceGetByPath,
  resourcePut,
  SHARED_OWNER,
} from "@agent-native/core/resources";

/**
 * A school's guide, kept per school and private to it.
 *
 * Each guide is stored under its own owner, `school:<school id>`, at
 * `SCHOOL_GUIDE.md`. Nothing but these functions reads that owner: the
 * workspace-files tool and the assistant's prompt list only a person's own files
 * and the shared area, so one school's assistant never sees another's guide.
 *
 * It used to live in the shared area (`__shared__`), first as one
 * `SCHOOL_GUIDE.md` for everybody and then at `school-guides/<school id>/`.
 * Both were visible to every school: its name and first line went into every
 * school's prompt, and staff could open it. Reading still falls back to the
 * `school-guides/<id>/` path so a school not yet moved keeps its guide;
 * `pnpm move:school-guides` moves them, and `--remove-shared` takes the old
 * rows out of the shared area. The single shared `SCHOOL_GUIDE.md` is no longer
 * read at all: it belonged to no particular school.
 */

export const GUIDE_FILE = "SCHOOL_GUIDE.md";

/** The owner a school's guide is stored under. Never a person, never shared. */
export const guideOwner = (schoolId: string) => `school:${schoolId}`;

/** Where a guide used to be kept, in the area every school can see. */
export const sharedGuidePath = (schoolId: string) =>
  `school-guides/${schoolId}/${GUIDE_FILE}`;

export async function readSchoolGuide(schoolId: string): Promise<{
  content: string | null;
  updatedAt: string | number | null;
  from: "school" | "shared" | null;
}> {
  const own = await resourceGetByPath(guideOwner(schoolId), GUIDE_FILE);
  if (own?.content?.trim()) {
    return { content: own.content, updatedAt: own.updatedAt, from: "school" };
  }
  // Not moved yet: the copy in the shared area, until the move script has run.
  const old = await resourceGetByPath(SHARED_OWNER, sharedGuidePath(schoolId));
  if (old?.content?.trim()) {
    return { content: old.content, updatedAt: old.updatedAt, from: "shared" };
  }
  return { content: null, updatedAt: null, from: null };
}

export async function writeSchoolGuide(
  schoolId: string,
  content: string,
): Promise<void> {
  await resourcePut(guideOwner(schoolId), GUIDE_FILE, content, "text/markdown");
}
