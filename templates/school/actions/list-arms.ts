import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import { armWord } from "../server/lib/arm-enrolment.js";

export default defineAction({
  description:
    "List the arms of the school's year groups (the parallel groups a year splits into, such as JSS1A and JSS1B), with how many learners each holds. Ordered by year group, then arm.",
  schema: z.object({
    gradeLevelId: z
      .string()
      .optional()
      .describe("Only the arms of this year group"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [arms, levels, learners] = await Promise.all([
      db
        .select()
        .from(schema.arms)
        .where(
          and(
            eq(schema.arms.orgId, orgId),
            args.gradeLevelId
              ? eq(schema.arms.gradeLevelId, args.gradeLevelId)
              : undefined,
          ),
        )
        .orderBy(asc(schema.arms.sequence)),
      db
        .select()
        .from(schema.gradeLevels)
        .where(eq(schema.gradeLevels.orgId, orgId)),
      db
        .select({ armId: schema.students.armId })
        .from(schema.students)
        .where(
          and(
            eq(schema.students.orgId, orgId),
            eq(schema.students.status, "active"),
          ),
        ),
    ]);

    const level = new Map<string, any>(levels.map((l: any) => [l.id, l]));
    const counts = new Map<string, number>();
    for (const l of learners) {
      if (l.armId) counts.set(l.armId, (counts.get(l.armId) ?? 0) + 1);
    }

    const rows = arms
      .map((a: any) => ({
        id: a.id,
        name: a.name,
        gradeLevelId: a.gradeLevelId,
        gradeLevelName: level.get(a.gradeLevelId)?.name ?? null,
        stream: a.stream,
        homeRoom: a.homeRoom,
        formTeacherUserId: a.formTeacherUserId,
        status: a.status,
        learnerCount: counts.get(a.id) ?? 0,
        _year: level.get(a.gradeLevelId)?.sequence ?? 0,
        _arm: a.sequence,
      }))
      .sort((x, y) => x._year - y._year || x._arm - y._arm)
      .map(({ _year, _arm, ...row }) => row);

    const word = await armWord(orgId);
    return {
      arms: rows,
      message:
        rows.length === 0
          ? `No ${word}s have been set up yet.`
          : `${rows.length} ${rows.length === 1 ? word : `${word}s`} found.`,
    };
  },
});
