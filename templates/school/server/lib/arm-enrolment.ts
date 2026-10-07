import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb, schema } from "../db/index.js";

/**
 * Enrolment that follows a learner's arm.
 *
 * Only whole-arm classes (`classes.arm_id`) follow it. An option class draws
 * learners from several arms and has its roll chosen; an unattached class is
 * the school's own business. Neither is touched here.
 *
 * A learner leaving a class is marked withdrawn, never deleted, so coming
 * back reactivates that row instead of adding a second one.
 */

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

/** The school's active classes that are for exactly this arm. */
async function wholeArmClassIds(
  orgId: string,
  armId: string,
): Promise<string[]> {
  const rows = await getDb()
    .select({ id: schema.classes.id })
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        eq(schema.classes.armId, armId),
        eq(schema.classes.status, "active"),
      ),
    );
  return rows.map((r: any) => r.id);
}

/** Enrol every active learner of an arm in a class made for that arm. */
export async function enrolArmInClass(
  orgId: string,
  classId: string,
  armId: string,
): Promise<number> {
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
  return enrol(
    classId,
    learners.map((l: any) => l.userId),
  );
}

/**
 * Move a learner to another arm (or to none), and make their whole-arm
 * classes agree: off the old arm's, on the new arm's.
 */
export async function moveLearnerArm(
  orgId: string,
  studentUserId: string,
  toArmId: string | null,
): Promise<{ fromArmId: string | null; enrolled: number; withdrawn: number }> {
  const db = getDb();
  const [student] = await db
    .select()
    .from(schema.students)
    .where(
      and(
        eq(schema.students.orgId, orgId),
        eq(schema.students.userId, studentUserId),
      ),
    )
    .limit(1);
  if (!student) throw new Error("That learner is not in this school.");

  const fromArmId: string | null = student.armId ?? null;
  if (fromArmId === toArmId) return { fromArmId, enrolled: 0, withdrawn: 0 };

  await db
    .update(schema.students)
    .set({ armId: toArmId, updatedAt: new Date().toISOString() })
    .where(
      and(eq(schema.students.orgId, orgId), eq(schema.students.id, student.id)),
    );

  let withdrawn = 0;
  if (fromArmId) {
    const leaving = await wholeArmClassIds(orgId, fromArmId);
    if (leaving.length > 0) {
      const active = await db
        .select({ id: schema.classEnrollments.id })
        .from(schema.classEnrollments)
        .where(
          and(
            inArray(schema.classEnrollments.classId, leaving),
            eq(schema.classEnrollments.studentUserId, studentUserId),
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
      withdrawn = active.length;
    }
  }

  let enrolled = 0;
  if (toArmId) {
    for (const classId of await wholeArmClassIds(orgId, toArmId)) {
      enrolled += await enrol(classId, [studentUserId]);
    }
  }
  return { fromArmId, enrolled, withdrawn };
}

/** The arms named, each checked to be this school's and in this year group. */
export async function armsInYearGroup(
  orgId: string,
  gradeLevelId: string,
  armIds: string[],
): Promise<void> {
  const ids = [...new Set(armIds)];
  if (ids.length === 0) return;
  const rows = await getDb()
    .select({
      id: schema.arms.id,
      name: schema.arms.name,
      gradeLevelId: schema.arms.gradeLevelId,
    })
    .from(schema.arms)
    .where(and(eq(schema.arms.orgId, orgId), inArray(schema.arms.id, ids)));
  if (rows.length !== ids.length) {
    throw new Error("One of those arms is not in this school.");
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
