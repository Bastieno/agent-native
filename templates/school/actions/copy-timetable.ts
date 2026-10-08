import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import {
  clashesForTerm,
  findTerm,
  listInWords,
  previousTerm,
  splitByAcademicYear,
} from "../server/lib/timetable.js";
import { findClashes } from "../server/lib/timetable-clashes.js";

export default defineAction({
  description:
    "Copy one term's timetable to another: the same classes in the same days, periods, times and rooms. Shows what would be copied (and how many clashes it carries), and from where, until confirm is true. Refuses when the target term already has periods of its own. The source is fromTermId; or, with fromEarlier, the school's earlier timetable set before terms were used; or, with neither, the term before toTermId. If the source term has none but the school's earlier, un-termed timetable exists, that is what is copied. Only classes of the target term's academic year are copied: periods of another year's classes (last year's, at the start of a new one) are left out and named.",
  schema: z.object({
    fromTermId: z
      .string()
      .optional()
      .describe("Copy from this term. Omit to copy from the term before"),
    fromEarlier: z
      .boolean()
      .optional()
      .describe(
        "Copy the school's earlier timetable, set before terms were used, instead of a term's",
      ),
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

    const to = await findTerm(orgId, args.toTermId);
    if (!to) throw new Error("That term is not in this school.");
    let from: { id: string; name: string } | null = null;
    if (!args.fromEarlier) {
      if (args.fromTermId) {
        from = await findTerm(orgId, args.fromTermId);
        if (!from) throw new Error("That term is not in this school.");
      } else {
        from = await previousTerm(orgId, to.id);
        if (!from) {
          throw new Error(
            `${to.name} has no term before it to copy a timetable from.`,
          );
        }
      }
      if (from.id === to.id) {
        throw new Error("A timetable can't be copied onto itself.");
      }
    }

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

    const source = await clashesForTerm(orgId, from?.id ?? null);
    if (source.periods.length === 0) {
      throw new Error(
        from
          ? `${from.name} has no timetable to copy, and neither does the school's earlier one.`
          : "The school has no earlier timetable to copy.",
      );
    }
    const earlier = !from || source.fromUntermedRows;
    const origin = earlier
      ? "the school's earlier timetable (set before terms were used)"
      : from!.name;

    // Another academic year's classes stay behind: a new year's first term
    // gets this year's classes, not last year's.
    const { kept, skipped, skippedClasses } = await splitByAcademicYear(
      orgId,
      source.periods,
      to.academicYearId,
    );
    const leftOut = skipped.length
      ? `${skipped.length} period(s) of ${skippedClasses.length} class(es) from another academic year are left out: ${listInWords(skippedClasses)}.`
      : "";
    if (kept.length === 0) {
      throw new Error(
        `Every period in ${origin} belongs to a class from another academic year (${listInWords(skippedClasses)}), so there is nothing to copy into ${to.name}. Start ${to.name} with an empty timetable instead.`,
      );
    }
    const clashes = findClashes(kept, {
      locale: source.locale,
      armNames: source.armNames,
    });

    const ids = kept.map((p) => p.scheduleId);
    const rows = await db
      .select()
      .from(S)
      .where(
        and(eq(S.orgId, orgId), eq(S.schoolId, orgId), inArray(S.id, ids)),
      );

    // What the source is called, for a button or a sentence.
    const fromLabel = earlier
      ? { termId: null, name: "the earlier timetable" }
      : { termId: from!.id, name: from!.name };
    const clashNote = clashes.length
      ? `, ${clashes.length} of them clashing`
      : ", with no clashes";
    const summary = `${rows.length} period(s) from ${origin}`;
    const skippedReply = {
      periods: skipped.length,
      classNames: skippedClasses,
    };

    if (!args.confirm) {
      return {
        periods: rows.length,
        clashes: clashes.length,
        skipped: skippedReply,
        from: fromLabel,
        message: `Copying would put ${summary} into ${to.name}${clashNote}.${
          leftOut ? ` ${leftOut}` : ""
        } Nothing has been copied yet; confirm to do it.`,
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
      clashes: clashes.length,
      skipped: skippedReply,
      copied: true,
      from: fromLabel,
      message: `Copied ${summary} into ${to.name}${clashNote}.${
        leftOut ? ` ${leftOut}` : ""
      }`,
    };
  },
});
