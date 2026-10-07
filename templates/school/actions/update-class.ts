import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { nanoid } from "nanoid";
import {
  armsInYearGroup,
  enrolArmInClass,
  setOptionArms,
} from "../server/lib/arm-enrolment.js";
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
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
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
        "A class is either for one whole arm or an option across several arms, not both.",
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

    if (args.optionArmIds !== undefined) {
      await setOptionArms(args.id, args.optionArmIds);
    }
    let enrolled = 0;
    if (args.armId)
      enrolled = await enrolArmInClass(orgId, args.id, args.armId);

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

    return {
      id: args.id,
      updated: true,
      enrolled,
      message: args.armId
        ? `Updated the class; ${enrolled} ${enrolled === 1 ? "learner" : "learners"} from its arm newly enrolled.`
        : "Updated the class.",
    };
  },
});
