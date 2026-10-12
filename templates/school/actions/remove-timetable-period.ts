import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { schoolWeekdayName } from "../shared/school-week.js";
import { doubleWords } from "../server/lib/arm-enrolment.js";
import { loadSchoolConfig } from "../server/lib/timetable.js";
import { schoolLocale } from "../shared/dates.js";

export default defineAction({
  description:
    "Take one class out of the timetable slot it was placed in. Either half of a double takes out the whole double. The class itself is not touched.",
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

    const day = schoolWeekdayName(row.dayOfWeek, locale);
    const name = cls?.name ?? "the class";
    if (row.pairId) {
      // A double is one lesson: either half takes out both.
      const halves = await db
        .select()
        .from(S)
        .where(and(eq(S.schoolId, orgId), eq(S.pairId, row.pairId)));
      await db
        .delete(S)
        .where(and(eq(S.schoolId, orgId), eq(S.pairId, row.pairId)));
      // "The double" only when both halves really went; a lone half left by
      // an unfinished edit is just a period.
      const both = halves.length === 2;
      const numbers = (halves as any[])
        .map((h) => h.periodNumber)
        .filter((n) => n != null)
        .sort((a, b) => a - b);
      const where =
        both && numbers.length === 2
          ? `periods ${numbers[0]} and ${numbers[1]}`
          : row.periodNumber != null
            ? `period ${row.periodNumber}`
            : row.startTime;
      return {
        removed: true,
        removedCount: halves.length,
        message: both
          ? `Took the ${(await doubleWords(orgId)).double} of ${name} out of ${where} on ${day}.`
          : `Took ${name} out of ${where} on ${day}.`,
      };
    }

    await db
      .delete(S)
      .where(and(eq(S.id, args.scheduleId), eq(S.schoolId, orgId)));
    const where =
      row.periodNumber != null ? `period ${row.periodNumber}` : row.startTime;
    return {
      removed: true,
      removedCount: 1,
      message: `Took ${name} out of ${where} on ${day}.`,
    };
  },
});
