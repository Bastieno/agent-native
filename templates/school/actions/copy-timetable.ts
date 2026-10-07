import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { clashesForTerm, findTerm } from "../server/lib/timetable.js";

export default defineAction({
  description:
    "Copy one term's timetable to another: the same classes in the same days, periods, times and rooms. Shows what would be copied (and how many clashes it carries) until confirm is true. Refuses when the target term already has periods of its own. If the source term has none but the school's earlier, un-termed timetable exists, that is what is copied.",
  schema: z.object({
    fromTermId: z.string(),
    toTermId: z.string(),
    confirm: z
      .boolean()
      .optional()
      .describe("Write the copy. Without it this only previews."),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    if (args.fromTermId === args.toTermId) {
      throw new Error("A timetable can't be copied onto itself.");
    }
    const from = await findTerm(orgId, args.fromTermId);
    const to = await findTerm(orgId, args.toTermId);
    if (!from || !to) throw new Error("That term is not in this school.");

    const S = schema.classSchedules;
    const [existing] = await db
      .select()
      .from(S)
      .where(and(eq(S.schoolId, orgId), eq(S.termId, to.id)))
      .limit(1);
    if (existing) {
      throw new Error(
        `${to.name} already has periods placed. Remove them first, or edit that timetable directly.`,
      );
    }

    const source = await clashesForTerm(orgId, from.id);
    if (source.periods.length === 0) {
      throw new Error(
        `${from.name} has no timetable to copy, and neither does the school's earlier one.`,
      );
    }
    const ids = source.periods.map((p) => p.scheduleId);
    const rows = await db
      .select()
      .from(S)
      .where(and(eq(S.schoolId, orgId), inArray(S.id, ids)));

    const origin = source.fromUntermedRows
      ? "the school's earlier timetable (set before terms were used)"
      : from.name;
    const clashNote = source.clashes.length
      ? `, ${source.clashes.length} of them clashing`
      : ", with no clashes";
    const summary = `${rows.length} period(s) from ${origin}`;

    if (!args.confirm) {
      return {
        periods: rows.length,
        clashes: source.clashes.length,
        message: `Copying would put ${summary} into ${to.name}${clashNote}. Nothing has been copied yet; confirm to do it.`,
      };
    }

    // One insert, so a failure leaves the target with none of it rather than
    // some, which a retry would then refuse.
    if (rows.length > 0) {
      await db.insert(S).values(
        rows.map((row: any) => ({
          id: nanoid(),
          classId: row.classId,
          schoolId: orgId,
          termId: to.id,
          dayOfWeek: row.dayOfWeek,
          periodNumber: row.periodNumber,
          startTime: row.startTime,
          endTime: row.endTime,
          room: row.room,
          ownerEmail: userEmail ?? "",
          orgId,
          visibility: "org" as const,
        })),
      );
    }
    return {
      periods: rows.length,
      clashes: source.clashes.length,
      copied: true,
      message: `Copied ${summary} into ${to.name}${clashNote}.`,
    };
  },
});
