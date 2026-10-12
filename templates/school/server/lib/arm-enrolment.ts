import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../db/index.js";
import { termContext } from "./timetable.js";
import { naivePlural } from "../../shared/terminology.js";

/**
 * Enrolment that follows a learner's arm.
 *
 * Only whole-arm classes (`classes.arm_id`) follow it. An option class draws
 * learners from several arms and has its roll chosen; an unattached class is
 * the school's own business. Neither is touched here.
 *
 * A learner leaving a class is marked withdrawn, never deleted, so coming
 * back reactivates that row instead of adding a second one.
 *
 * Only the active academic year's classes follow: last year's rolls are the
 * record of last year (gradebooks and report cards read them), so a move at
 * promotion never rewrites them. With no active year, nothing is touched.
 */

/** The active academic year's id, by the same rule the timetable uses. */
async function activeYearId(orgId: string): Promise<string | null> {
  return (await termContext(orgId))?.year.id ?? null;
}

/** Why a class's roll was left alone, in words; null when it was not. */
export type RollUntouched = "no-active-year" | "other-year" | null;

/** The sentence for a roll left alone, naming what this school calls an arm. */
export function untouchedNote(reason: RollUntouched, word: string): string {
  if (reason === "no-active-year") {
    return `No academic year is active, so no class rolls were changed for the ${word}.`;
  }
  if (reason === "other-year") {
    return `The class is not in the active academic year, so its roll was left as it is.`;
  }
  return "";
}

/** Put these learners on a class's roll; returns how many were newly put on. */
async function enrol(classId: string, userIds: string[]): Promise<number> {
  if (userIds.length === 0) return 0;
  const db = getDb();
  const existing = await db
    .select()
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, classId),
        inArray(schema.classEnrollments.studentUserId, userIds),
      ),
    );
  const byUser = new Map<string, any>(
    existing.map((e: any) => [e.studentUserId, e]),
  );

  const toInsert: string[] = [];
  const toReactivate: string[] = [];
  for (const userId of userIds) {
    const row = byUser.get(userId);
    if (!row) toInsert.push(userId);
    else if (row.status === "withdrawn") toReactivate.push(row.id);
    // active stays as it is; suspended is a decision someone made.
  }
  if (toInsert.length > 0) {
    await db.insert(schema.classEnrollments).values(
      toInsert.map((studentUserId) => ({
        id: nanoid(),
        classId,
        studentUserId,
        status: "active",
      })),
    );
  }
  if (toReactivate.length > 0) {
    await db
      .update(schema.classEnrollments)
      .set({ status: "active" })
      .where(inArray(schema.classEnrollments.id, toReactivate));
  }
  return toInsert.length + toReactivate.length;
}

/**
 * The class's academic year against the active one: why its roll must be left
 * alone, or null when it is this year's.
 */
async function rollUntouched(
  orgId: string,
  classId: string,
): Promise<RollUntouched> {
  const yearId = await activeYearId(orgId);
  if (!yearId) return "no-active-year";
  const [cls] = await getDb()
    .select({ academicYearId: schema.classes.academicYearId })
    .from(schema.classes)
    .where(and(eq(schema.classes.orgId, orgId), eq(schema.classes.id, classId)))
    .limit(1);
  return cls && cls.academicYearId === yearId ? null : "other-year";
}

/**
 * Enrol every active learner of an arm in a class made for that arm — when
 * the class is in the active academic year; otherwise says why not.
 */
export async function enrolArmInClass(
  orgId: string,
  classId: string,
  armId: string,
): Promise<{ enrolled: number; untouched: RollUntouched }> {
  const untouched = await rollUntouched(orgId, classId);
  if (untouched) return { enrolled: 0, untouched };
  const learners = await getDb()
    .select({ userId: schema.students.userId })
    .from(schema.students)
    .where(
      and(
        eq(schema.students.orgId, orgId),
        eq(schema.students.armId, armId),
        eq(schema.students.status, "active"),
      ),
    );
  const enrolled = await enrol(
    classId,
    learners.map((l: any) => l.userId),
  );
  return { enrolled, untouched: null };
}

/**
 * What this school calls an arm, lower-cased for running text ("arm" unless
 * the school's own words say otherwise).
 */
export async function armWord(orgId: string): Promise<string> {
  return schoolWord(orgId, "arm", "arm");
}

/**
 * The school's own word for something (`customLabels[key]`), lower-cased, or
 * the plain fallback when it has chosen none.
 */
export async function schoolWord(
  orgId: string,
  key: string,
  fallback: string,
): Promise<string> {
  const config = ((await getOrgSetting(orgId, "school-config")) ??
    {}) as Record<string, any>;
  const label = config.customLabels?.[key];
  return typeof label === "string" && label.trim()
    ? label.trim().toLowerCase()
    : fallback;
}

/** The school's word for a double, with its plural: "double" / "doubles". */
export async function doubleWords(
  orgId: string,
): Promise<{ double: string; doubles: string }> {
  const double = await schoolWord(orgId, "double", "double");
  return { double, doubles: naivePlural(double) };
}

/**
 * Refuse a form teacher who is not active staff of this school: an admin,
 * coordinator or teacher whose profile here is active.
 */
export async function assertActiveStaff(
  orgId: string,
  userId: string,
): Promise<void> {
  const [profile] = await getDb()
    .select({ id: schema.schoolProfiles.id })
    .from(schema.schoolProfiles)
    .where(
      and(
        eq(schema.schoolProfiles.schoolId, orgId),
        eq(schema.schoolProfiles.userId, userId),
        eq(schema.schoolProfiles.status, "active"),
        inArray(schema.schoolProfiles.schoolRole, [
          "school_admin",
          "subject_coordinator",
          "teacher",
        ]),
      ),
    )
    .limit(1);
  if (!profile) {
    throw new Error(
      "That person is not an active member of this school's staff.",
    );
  }
}

/**
 * Rows per `IN (...)` list. This keeps one list under SQLite's and
 * Postgres's bound-parameter caps (tens of thousands); it does not cover
 * Cloudflare D1, which caps a statement at 100 bound parameters, so a D1
 * deployment would need a smaller size here (and `classIds` chunked too,
 * since it shares a statement with the learner ids).
 */
const CHUNK = 500;

function chunks<T>(items: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += CHUNK) {
    out.push(items.slice(i, i + CHUNK));
  }
  return out;
}

export type ArmMove = {
  userId: string;
  fromArmId: string | null;
  enrolled: number;
  withdrawn: number;
};

export type ArmMoveResult = {
  moves: ArmMove[];
  enrolled: number;
  withdrawn: number;
  untouched: RollUntouched;
};

/**
 * Move learners to another arm (or to none), and make their whole-arm
 * classes agree: off other arms', on the new arm's.
 *
 * Reconciles whether or not an arm changed, so a move that stopped halfway
 * is healed by asking again, not stranded.
 *
 * Takes a fixed number of queries however many learners move: everything is
 * read up front, worked out in memory, then written with bulk statements.
 * There is no portable transaction across the databases this template runs
 * on (D1 has none), so the writes are ordered learner row first and every
 * step is idempotent: a call that dies halfway is finished by repeating it.
 */
export async function moveLearnersArm(
  orgId: string,
  studentUserIds: string[],
  toArmId: string | null,
): Promise<ArmMoveResult> {
  const db = getDb();
  const userIds = [...new Set(studentUserIds)];
  const empty: ArmMoveResult = {
    moves: [],
    enrolled: 0,
    withdrawn: 0,
    untouched: null,
  };
  if (userIds.length === 0) return empty;

  const students: any[] = [];
  for (const ids of chunks(userIds)) {
    students.push(
      ...(await db
        .select()
        .from(schema.students)
        .where(
          and(
            eq(schema.students.orgId, orgId),
            inArray(schema.students.userId, ids),
          ),
        )),
    );
  }
  const byUser = new Map<string, any>(students.map((s) => [s.userId, s]));
  if (userIds.some((id) => !byUser.has(id))) {
    throw new Error("That learner is not in this school.");
  }

  const moves = new Map<string, ArmMove>(
    userIds.map((userId) => [
      userId,
      {
        userId,
        fromArmId: (byUser.get(userId).armId ?? null) as string | null,
        enrolled: 0,
        withdrawn: 0,
      },
    ]),
  );

  const changing = students.filter((s) => (s.armId ?? null) !== toArmId);
  for (const group of chunks(changing)) {
    await db
      .update(schema.students)
      .set({ armId: toArmId, updatedAt: new Date().toISOString() })
      .where(
        and(
          eq(schema.students.orgId, orgId),
          inArray(
            schema.students.id,
            group.map((s) => s.id),
          ),
        ),
      );
  }

  // Every whole-arm class of this year, to tell the learners' own from the
  // rest. Other years' rolls stay as they were.
  const yearId = await activeYearId(orgId);
  if (!yearId) {
    return {
      moves: [...moves.values()],
      enrolled: 0,
      withdrawn: 0,
      untouched: "no-active-year",
    };
  }
  const wholeArm: any[] = await db
    .select({ id: schema.classes.id, armId: schema.classes.armId })
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        eq(schema.classes.academicYearId, yearId),
        eq(schema.classes.status, "active"),
        isNotNull(schema.classes.armId),
      ),
    );
  const ownClasses = wholeArm.filter((c) => c.armId === toArmId);
  const otherIds = new Set(
    wholeArm.filter((c) => c.armId !== toArmId).map((c) => c.id),
  );
  const ownIds = new Set(ownClasses.map((c) => c.id));

  let existing: any[] = [];
  if (wholeArm.length > 0) {
    const classIds = wholeArm.map((c) => c.id);
    for (const ids of chunks(userIds)) {
      existing = existing.concat(
        await db
          .select()
          .from(schema.classEnrollments)
          .where(
            and(
              inArray(schema.classEnrollments.classId, classIds),
              inArray(schema.classEnrollments.studentUserId, ids),
            ),
          ),
      );
    }
  }

  const toWithdraw: string[] = [];
  const toReactivate: string[] = [];
  const ownRows = new Map<string, any[]>();
  const have = new Set<string>(); // "classId|userId" with any row at all
  for (const row of existing) {
    const move = moves.get(row.studentUserId)!;
    if (otherIds.has(row.classId)) {
      if (row.status === "active") {
        toWithdraw.push(row.id);
        move.withdrawn++;
      }
    } else if (ownIds.has(row.classId)) {
      const key = `${row.classId}|${row.studentUserId}`;
      have.add(key);
      const rows = ownRows.get(key) ?? [];
      rows.push(row);
      ownRows.set(key, rows);
    }
  }
  // Per learner and class: an active or suspended row means leave it be
  // (suspended is a decision someone made). Otherwise reactivate only the
  // most recent withdrawn row, so odd data never ends with two active rows.
  for (const rows of ownRows.values()) {
    if (rows.some((r) => r.status !== "withdrawn")) continue;
    const latest = rows.reduce((a, b) =>
      String(b.enrolledAt ?? "") > String(a.enrolledAt ?? "") ? b : a,
    );
    toReactivate.push(latest.id);
    moves.get(latest.studentUserId)!.enrolled++;
  }
  const toInsert: any[] = [];
  for (const userId of userIds) {
    for (const c of ownClasses) {
      if (have.has(`${c.id}|${userId}`)) continue;
      toInsert.push({
        id: nanoid(),
        classId: c.id,
        studentUserId: userId,
        status: "active",
      });
      moves.get(userId)!.enrolled++;
    }
  }

  // Withdraw first, then enrol: a halfway stop never leaves a learner on two
  // arms' rolls, and repeating the call finishes the job.
  for (const ids of chunks(toWithdraw)) {
    await db
      .update(schema.classEnrollments)
      .set({ status: "withdrawn" })
      .where(inArray(schema.classEnrollments.id, ids));
  }
  for (const ids of chunks(toReactivate)) {
    await db
      .update(schema.classEnrollments)
      .set({ status: "active" })
      .where(inArray(schema.classEnrollments.id, ids));
  }
  for (const rows of chunks(toInsert)) {
    await db.insert(schema.classEnrollments).values(rows);
  }

  return {
    moves: [...moves.values()],
    enrolled: toInsert.length + toReactivate.length,
    withdrawn: toWithdraw.length,
    untouched: null,
  };
}

/** One learner: `moveLearnersArm` for a single id. */
export async function moveLearnerArm(
  orgId: string,
  studentUserId: string,
  toArmId: string | null,
): Promise<{
  fromArmId: string | null;
  enrolled: number;
  withdrawn: number;
  untouched: RollUntouched;
}> {
  const result = await moveLearnersArm(orgId, [studentUserId], toArmId);
  const move = result.moves[0];
  return {
    fromArmId: move.fromArmId,
    enrolled: move.enrolled,
    withdrawn: move.withdrawn,
    untouched: result.untouched,
  };
}

/**
 * A class stopped being for `oldArmId` (it moved to another arm, or is no
 * longer whole-arm): withdraw that arm's learners from it. Learners already
 * in the new arm stay; returns how many were withdrawn.
 */
export async function withdrawArmFromClass(
  orgId: string,
  classId: string,
  oldArmId: string,
  newArmId: string | null,
): Promise<number> {
  if (oldArmId === newArmId) return 0;
  if (await rollUntouched(orgId, classId)) return 0;
  const db = getDb();
  const learners = await db
    .select({ userId: schema.students.userId })
    .from(schema.students)
    .where(
      and(
        eq(schema.students.orgId, orgId),
        eq(schema.students.armId, oldArmId),
      ),
    );
  const ids = learners.map((l: any) => l.userId);
  if (ids.length === 0) return 0;
  const active = await db
    .select({ id: schema.classEnrollments.id })
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, classId),
        inArray(schema.classEnrollments.studentUserId, ids),
        eq(schema.classEnrollments.status, "active"),
      ),
    );
  if (active.length > 0) {
    await db
      .update(schema.classEnrollments)
      .set({ status: "withdrawn" })
      .where(
        inArray(
          schema.classEnrollments.id,
          active.map((a: any) => a.id),
        ),
      );
  }
  return active.length;
}

/** The arms named, each checked to be this school's and in this year group. */
export async function armsInYearGroup(
  orgId: string,
  gradeLevelId: string,
  armIds: string[],
  word?: string,
): Promise<void> {
  const ids = [...new Set(armIds)];
  if (ids.length === 0) return;
  word = word ?? (await armWord(orgId));
  const rows = await getDb()
    .select({
      id: schema.arms.id,
      name: schema.arms.name,
      gradeLevelId: schema.arms.gradeLevelId,
      status: schema.arms.status,
    })
    .from(schema.arms)
    .where(and(eq(schema.arms.orgId, orgId), inArray(schema.arms.id, ids)));
  if (rows.length !== ids.length) {
    throw new Error(`One of those ${word}s is not in this school.`);
  }
  const archived = rows.filter((r: any) => r.status === "archived");
  if (archived.length > 0) {
    throw new Error(
      `${archived.map((r: any) => r.name).join(", ")} ${archived.length === 1 ? "is" : "are"} archived.`,
    );
  }
  const wrong = rows.filter((r: any) => r.gradeLevelId !== gradeLevelId);
  if (wrong.length > 0) {
    throw new Error(
      `${wrong.map((r: any) => r.name).join(", ")} is not in this class's year group.`,
    );
  }
}

/** Make these the option class's arms, replacing whatever it had. */
export async function setOptionArms(
  classId: string,
  armIds: string[],
): Promise<void> {
  const db = getDb();
  await db
    .delete(schema.classArms)
    .where(eq(schema.classArms.classId, classId));
  const ids = [...new Set(armIds)];
  if (ids.length > 0) {
    await db.insert(schema.classArms).values(
      ids.map((armId) => ({
        id: nanoid(),
        classId,
        armId,
      })),
    );
  }
}
