import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { moveLearnerArm } from "../server/lib/arm-enrolment.js";

export default defineAction({
  description:
    "Place learners in an arm (or take them out of any arm with armId null). Their whole-arm classes follow: they are enrolled in the new arm's classes and withdrawn from the old arm's. Option classes and unattached classes are left alone. A learner can only join an arm of their own year group.",
  schema: z.object({
    armId: z.string().nullable().describe("The arm, or null for none"),
    studentUserIds: z.array(z.string()).min(1),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const userIds = [...new Set(args.studentUserIds)];

    let armName: string | null = null;
    if (args.armId) {
      const [arm] = await db
        .select()
        .from(schema.arms)
        .where(
          and(eq(schema.arms.id, args.armId), eq(schema.arms.orgId, orgId)),
        )
        .limit(1);
      if (!arm) throw new Error("That arm is not in this school.");
      armName = arm.name;

      // Check everyone before moving anyone, so a refusal changes nothing.
      const learners = await db
        .select()
        .from(schema.students)
        .where(
          and(
            eq(schema.students.orgId, orgId),
            inArray(schema.students.userId, userIds),
          ),
        );
      if (learners.length !== userIds.length) {
        throw new Error("Some of those learners are not in this school.");
      }
      const wrongYear = learners.filter(
        (l: any) => l.gradeLevelId !== arm.gradeLevelId,
      );
      if (wrongYear.length > 0) {
        throw new Error(
          `${wrongYear.length === 1 ? "A learner is" : `${wrongYear.length} learners are`} not in the same year group as ${arm.name}, so cannot join it.`,
        );
      }
    }

    let moved = 0;
    let enrolled = 0;
    let withdrawn = 0;
    for (const userId of userIds) {
      const result = await moveLearnerArm(orgId, userId, args.armId);
      if (result.fromArmId !== args.armId) moved++;
      enrolled += result.enrolled;
      withdrawn += result.withdrawn;
    }

    const who = `${userIds.length} ${userIds.length === 1 ? "learner" : "learners"}`;
    return {
      moved,
      enrolled,
      withdrawn,
      message: `${armName ? `Placed ${who} in ${armName}` : `Took ${who} out of their arm`}; ${enrolled} new class ${enrolled === 1 ? "place" : "places"} and ${withdrawn} withdrawn.`,
    };
  },
});
