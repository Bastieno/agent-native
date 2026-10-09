import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";
import {
  armWord,
  armsInYearGroup,
  withdrawArmFromClass,
  enrolArmInClass,
  setOptionArms,
  untouchedNote,
  type RollUntouched,
} from "../server/lib/arm-enrolment.js";
import { getSchoolRole } from "../server/lib/student-access.js";
import { isUnassignedTeacher } from "../shared/class-teacher.js";

export default defineAction({
  description:
    "Update a class (name, status, room number, capacity, or primary teacher).",
  schema: z.object({
    id: z.string().describe("Class ID"),
    name: z.string().optional(),
    status: z.enum(["active", "archived"]).optional(),
    primaryTeacherUserId: z
      .string()
      .optional()
      .describe(
        "Assign the primary teacher of a class that has none, or swap it",
      ),
    roomNumber: z.string().optional(),
    capacity: z.number().optional(),
    armId: z
      .string()
      .nullable()
      .optional()
      .describe(
        "Make this a whole-arm class (enrolling that arm's learners), or null to make it unattached. Not together with optionArmIds.",
      ),
    optionArmIds: z
      .array(z.string())
      .optional()
      .describe(
        "The arms this option class draws on, replacing any it had. Pass [] to clear them.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    // Moving a class between arms changes who is enrolled, which is the
    // admin's call; a teacher may still change everything else.
    if (args.armId !== undefined || args.optionArmIds !== undefined) {
      const role = userEmail ? await getSchoolRole(userEmail) : null;
      if (role !== "school_admin") {
        throw new Error(
          `Only an admin can change which ${await armWord(orgId)} a class belongs to.`,
        );
      }
    }
    const db = getDb();
    const now = new Date().toISOString();

    const [cls] = await db
      .select()
      .from(schema.classes)
      .where(
        and(eq(schema.classes.id, args.id), eq(schema.classes.orgId, orgId)),
      )
      .limit(1);
    if (!cls) throw new Error("That class is not in this school.");

    // What the class would be after this change, so the either/or holds
    // against what it already is, not only against what is passed.
    const nextArmId = args.armId !== undefined ? args.armId : cls.armId;
    const nextOptions =
      args.optionArmIds ??
      (args.armId
        ? []
        : (
            await db
              .select({ armId: schema.classArms.armId })
              .from(schema.classArms)
              .where(eq(schema.classArms.classId, args.id))
          ).map((r: any) => r.armId));
    if (nextArmId && nextOptions.length > 0) {
      throw new Error(
        `A class is either for one whole ${await armWord(orgId)} or an option across several, not both.`,
      );
    }
    await armsInYearGroup(
      orgId,
      cls.gradeLevelId,
      [args.armId, ...(args.optionArmIds ?? [])].filter(
        (a): a is string => !!a,
      ),
    );

    const updates: Record<string, any> = { updatedAt: now };
    if (args.name !== undefined) updates.name = args.name;
    if (args.status !== undefined) updates.status = args.status;
    if (args.primaryTeacherUserId !== undefined)
      updates.primaryTeacherUserId = args.primaryTeacherUserId;
    if (args.roomNumber !== undefined) updates.roomNumber = args.roomNumber;
    if (args.capacity !== undefined) updates.capacity = args.capacity;
    if (args.armId !== undefined) updates.armId = args.armId;

    await db
      .update(schema.classes)
      .set(updates)
      .where(
        and(eq(schema.classes.id, args.id), eq(schema.classes.orgId, orgId)),
      );

    // A whole-arm class has no option rows; a stale set would make it both.
    if (args.optionArmIds !== undefined) {
      await setOptionArms(args.id, args.optionArmIds);
    } else if (args.armId) {
      await setOptionArms(args.id, []);
    }
    // The class left its old arm (for another, or for none): that arm's
    // learners come off it, except any who are in the new arm.
    let withdrawn = 0;
    if (
      args.armId !== undefined &&
      cls.armId &&
      cls.armId !== (args.armId ?? null)
    ) {
      withdrawn = await withdrawArmFromClass(
        orgId,
        args.id,
        cls.armId,
        args.armId ?? null,
      );
    }
    let enrolled = 0;
    let untouched: RollUntouched = null;
    if (args.armId) {
      ({ enrolled, untouched } = await enrolArmInClass(
        orgId,
        args.id,
        args.armId,
      ));
    }

    // Assigning a teacher to an unassigned class has to reach the join table
    // too, or the class stays invisible in their own portal.
    if (
      args.primaryTeacherUserId !== undefined &&
      !isUnassignedTeacher(args.primaryTeacherUserId)
    ) {
      const [existing] = await db
        .select({ id: schema.classTeachers.id })
        .from(schema.classTeachers)
        .where(
          and(
            eq(schema.classTeachers.classId, args.id),
            eq(schema.classTeachers.teacherUserId, args.primaryTeacherUserId),
          ),
        )
        .limit(1);
      if (!existing) {
        await db.insert(schema.classTeachers).values({
          id: nanoid(),
          classId: args.id,
          teacherUserId: args.primaryTeacherUserId,
          role: "primary",
        });
      }
    }

    const word = await armWord(orgId);
    const count = (n: number) => `${n} ${n === 1 ? "learner" : "learners"}`;
    const notes: string[] = [];
    if (args.armId && !untouched)
      notes.push(`${count(enrolled)} from its ${word} newly enrolled`);
    if (withdrawn > 0)
      notes.push(
        `${count(withdrawn)} of its old ${word} withdrawn (anyone already in the new ${word} stays)`,
      );
    return {
      id: args.id,
      updated: true,
      enrolled,
      withdrawn,
      message: `${
        notes.length
          ? `Updated the class; ${notes.join(", and ")}.`
          : "Updated the class."
      }${untouched ? ` ${untouchedNote(untouched, word)}` : ""}`,
    };
  },
});
