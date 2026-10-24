import { getDb, schema } from "../db/index.js";
import { currentAccess } from "@agent-native/core/sharing";
import { actorForEmail } from "./class-access.js";
import { and, eq, or } from "drizzle-orm";

/**
 * Curriculum rows belong to a school through their subject.
 *
 * Units and objectives carry no school id of their own that every writer set
 * reliably, so an action that looked a unit up by id alone would read or edit
 * another school's curriculum for anyone who had the id. Every curriculum
 * action resolves through here instead: the subject must be this school's, and
 * a unit or objective is this school's only if its subject is.
 *
 * Each one throws "not found" rather than "forbidden" — to another school, a
 * unit that is not theirs does not exist.
 */

export async function assertSubjectInSchool(
  subjectId: string,
  schoolId: string,
) {
  const db = getDb();
  const [subject] = await db
    .select()
    .from(schema.subjects)
    .where(
      and(
        eq(schema.subjects.id, subjectId),
        eq(schema.subjects.schoolId, schoolId),
      ),
    )
    .limit(1);
  if (!subject) throw new Error("Subject not found.");
  return subject;
}

export async function assertUnitInSchool(unitId: string, schoolId: string) {
  const db = getDb();
  const [row] = await db
    .select({ unit: schema.units })
    .from(schema.units)
    .innerJoin(schema.subjects, eq(schema.subjects.id, schema.units.subjectId))
    .where(
      and(eq(schema.units.id, unitId), eq(schema.subjects.schoolId, schoolId)),
    )
    .limit(1);
  if (!row) throw new Error("Unit not found.");
  return row.unit;
}

export async function assertObjectiveInSchool(
  objectiveId: string,
  schoolId: string,
) {
  const db = getDb();
  const [row] = await db
    .select({ objective: schema.learningObjectives, unit: schema.units })
    .from(schema.learningObjectives)
    .innerJoin(
      schema.units,
      eq(schema.units.id, schema.learningObjectives.unitId),
    )
    .innerJoin(schema.subjects, eq(schema.subjects.id, schema.units.subjectId))
    .where(
      and(
        eq(schema.learningObjectives.id, objectiveId),
        eq(schema.subjects.schoolId, schoolId),
      ),
    )
    .limit(1);
  if (!row) throw new Error("Learning objective not found.");
  return row;
}

/** A year group or term id must be this school's before a unit points at it. */
export async function assertGradeLevelInSchool(
  gradeLevelId: string,
  schoolId: string,
) {
  const db = getDb();
  const [level] = await db
    .select({ id: schema.gradeLevels.id })
    .from(schema.gradeLevels)
    .where(
      and(
        eq(schema.gradeLevels.id, gradeLevelId),
        eq(schema.gradeLevels.schoolId, schoolId),
      ),
    )
    .limit(1);
  if (!level) throw new Error("Year group not found.");
}

export async function assertTermInSchool(termId: string, schoolId: string) {
  const db = getDb();
  const [term] = await db
    .select({ id: schema.terms.id })
    .from(schema.terms)
    .where(
      and(eq(schema.terms.id, termId), eq(schema.terms.schoolId, schoolId)),
    )
    .limit(1);
  if (!term) throw new Error("Term not found.");
}

/**
 * A library entry this school owns — never a sample shipped with the app.
 *
 * The samples belong to every school on the deployment, so editing one would
 * change another school's syllabus. A school may edit only what it imported.
 */
export async function assertOwnFramework(
  frameworkId: string,
  schoolId: string,
) {
  const db = getDb();
  const [framework] = await db
    .select()
    .from(schema.curriculumFrameworks)
    .where(eq(schema.curriculumFrameworks.id, frameworkId))
    .limit(1);
  if (!framework) throw new Error("That syllabus was not found.");
  if (framework.orgId !== schoolId) {
    throw new Error(
      framework.orgId
        ? "That syllabus belongs to another school."
        : `"${framework.name}" ships with the app and is shared by every school, so it cannot be edited. Import your own syllabus to change what this school plans from.`,
    );
  }
  return framework;
}

/** One objective of a library this school owns. */
export async function assertOwnFrameworkObjective(
  objectiveId: string,
  schoolId: string,
) {
  const db = getDb();
  const [objective] = await db
    .select()
    .from(schema.frameworkObjectives)
    .where(eq(schema.frameworkObjectives.id, objectiveId))
    .limit(1);
  if (!objective) throw new Error("That objective was not found.");
  const framework = await assertOwnFramework(objective.frameworkId, schoolId);
  return { objective, framework };
}

/**
 * Whether this person may open a curriculum draft.
 *
 * Drafting is subject work: the teacher who has taught Physics for ten years
 * knows more about how its year should run than whoever happens to be
 * administering the school. So a teacher is in — for the subjects they
 * teach. A draft naming a subject they have no class in is somebody else's
 * planning, and seeing it would be no more use to them than it is their
 * business.
 *
 * Admins and subject coordinators see all of them: the first runs the
 * school, the second owns a subject's curriculum across classes.
 */
export async function canOpenCurriculumDraft(
  actor: { userId: string; schoolRole: string },
  stateJson: string | null | undefined,
  /** Open sessions are treated more generously; see below. */
  status?: string | null,
): Promise<boolean> {
  if (
    actor.schoolRole === "school_admin" ||
    actor.schoolRole === "subject_coordinator"
  ) {
    return true;
  }
  if (actor.schoolRole !== "teacher") return false;

  const { ids, names } = subjectsInDraft(stateJson);

  // A session just begun has named nothing yet, and whoever is in it is
  // working. Only while it is open, though: a committed or discarded draft
  // that happens to carry no subject id is somebody's finished work, and
  // older drafts name their subjects in words alone — which is how two
  // Mathematics sessions came to be visible to a physics teacher.
  if (ids.length === 0 && names.length === 0) {
    return status === "in_progress" || !status;
  }

  const db = getDb();
  const theirs = await db
    .selectDistinct({
      subjectId: schema.classes.subjectId,
      subjectName: schema.subjects.name,
    })
    .from(schema.classes)
    .leftJoin(schema.subjects, eq(schema.subjects.id, schema.classes.subjectId))
    .leftJoin(
      schema.classTeachers,
      eq(schema.classTeachers.classId, schema.classes.id),
    )
    .where(
      or(
        eq(schema.classes.primaryTeacherUserId, actor.userId),
        eq(schema.classTeachers.teacherUserId, actor.userId),
      ),
    );
  const taughtIds = new Set(theirs.map((r: any) => r.subjectId));
  const taughtNames = new Set(
    theirs
      .map((r: any) =>
        String(r.subjectName ?? "")
          .toLowerCase()
          .trim(),
      )
      .filter(Boolean),
  );
  return (
    ids.some((id) => taughtIds.has(id)) ||
    names.some((n) => taughtNames.has(n.toLowerCase().trim()))
  );
}

/**
 * The subjects a draft names — by id where it has one, by name otherwise.
 *
 * Both, because a draft written before subjects were matched up carries
 * only the name the agent typed, and an id-only check would read those as
 * naming nothing at all — which let two Mathematics sessions show up for a
 * physics teacher.
 */
export function subjectsInDraft(stateJson: string | null | undefined): {
  ids: string[];
  names: string[];
} {
  if (!stateJson) return { ids: [], names: [] };
  try {
    const state = JSON.parse(stateJson);
    const subjects = Array.isArray(state?.subjects) ? state.subjects : [];
    return {
      ids: subjects
        .map((s: any) => s?.subjectId)
        .filter((id: unknown): id is string => typeof id === "string"),
      names: subjects
        .map((s: any) => s?.name)
        .filter(
          (n: unknown): n is string => typeof n === "string" && !!n.trim(),
        ),
    };
  } catch {
    return { ids: [], names: [] };
  }
}

/**
 * Refuse, in a sentence that says why, when a draft is not this person's to
 * open. Wraps `canOpenCurriculumDraft` so every caller phrases it alike.
 */
export async function assertMayOpenDraft(
  stateJson: string | null | undefined,
  status?: string | null,
): Promise<void> {
  const { userEmail } = currentAccess();
  const actor = userEmail ? await actorForEmail(userEmail) : null;
  if (!actor) return; // the role check has already refused anyone unknown
  if (await canOpenCurriculumDraft(actor, stateJson, status)) return;
  throw new Error(
    "That curriculum session is for a subject you do not teach. Ask the admin or the subject's coordinator to add you to the class, or to share what they are drafting.",
  );
}
