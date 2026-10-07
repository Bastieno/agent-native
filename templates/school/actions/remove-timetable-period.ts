import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { schoolWeekdayName } from "../shared/school-week.js";
import { loadSchoolConfig } from "../server/lib/timetable.js";
import { schoolLocale } from "../shared/dates.js";

export default defineAction({
  description:
    "Take one class out of the timetable slot it was placed in. The class itself is not touched.",
  schema: z.object({
    scheduleId: z.string().describe("The placement, from get-timetable"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const S = schema.classSchedules;
    const [row] = await db
      .select()
      .from(S)
      .where(and(eq(S.id, args.scheduleId), eq(S.schoolId, orgId)))
      .limit(1);
    if (!row) throw new Error("That placement is not in this school.");

    const [cls] = await db
      .select()
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.id, row.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    const locale = schoolLocale(await loadSchoolConfig(orgId));

    await db
      .delete(S)
      .where(and(eq(S.id, args.scheduleId), eq(S.schoolId, orgId)));
    const where =
      row.periodNumber != null ? `period ${row.periodNumber}` : row.startTime;
    return {
      removed: true,
      message: `Took ${cls?.name ?? "the class"} out of ${where} on ${schoolWeekdayName(row.dayOfWeek, locale)}.`,
    };
  },
});
