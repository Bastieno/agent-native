import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray, ne } from "drizzle-orm";
import { z } from "zod";

/**
 * Promotion day: the year planned ahead of time becomes the one the school
 * is in. Every other current year is archived, so there is only ever one —
 * terms, timetables and arm moves all read "the current year", and two of
 * them would leave each of those to guess.
 */
/**
 * Archive every still-running class that belongs to a year other than this
 * one, and close the learners' enrolments in them.
 *
 * Enrolments are marked "completed", not removed: what a learner did last
 * year stays on its class, but nothing that asks "which classes is this
 * learner in?" counts it any more.
 */
async function archiveOtherYearsClasses(
  orgId: string,
  currentYearId: string,
): Promise<number> {
  const db = getDb();
  const now = new Date().toISOString();
  const rows = await db
    .update(schema.classes)
    .set({ status: "archived", updatedAt: now })
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        eq(schema.classes.status, "active"),
        ne(schema.classes.academicYearId, currentYearId),
      ),
    )
    .returning({ id: schema.classes.id });

  // Every class of an earlier year, whether or not this call archived it, so
  // a school repaired after the fact has its enrolments closed too.
  const earlier = await db
    .select({ id: schema.classes.id })
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.orgId, orgId),
        ne(schema.classes.academicYearId, currentYearId),
      ),
    );
  if (earlier.length > 0) {
    await db
      .update(schema.classEnrollments)
      .set({ status: "completed" })
      .where(
        and(
          inArray(
            schema.classEnrollments.classId,
            earlier.map((c: any) => c.id),
          ),
          eq(schema.classEnrollments.status, "active"),
        ),
      );
  }
  return rows.length;
}

export default defineAction({
  description:
    "Make an academic year the school's current year, archiving whichever was current. Use at promotion, once next year's classes are ready; then move learners into their new arms.",
  schema: z.object({
    id: z.string().describe("The academic year to make current"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [year] = await db
      .select()
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.id, args.id),
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!year) throw new Error("That academic year is not in this school.");
    if (year.status === "active") {
      // Already current. Still make sure nothing from an earlier year is left
      // running: a school promoted before classes were archived with the year
      // has two years of "active" classes, and this is how it is put right.
      const closed = await archiveOtherYearsClasses(orgId, year.id);
      return {
        id: year.id,
        name: year.name,
        message: `${year.name} is already the current academic year.${
          closed
            ? ` ${closed} class${closed === 1 ? "" : "es"} from earlier years ${closed === 1 ? "was" : "were"} still running and ${closed === 1 ? "is" : "are"} now archived.`
            : ""
        }`,
      };
    }

    const others = await db
      .select({ name: schema.academicYears.name })
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
          eq(schema.academicYears.status, "active"),
          ne(schema.academicYears.id, year.id),
        ),
      );
    await db
      .update(schema.academicYears)
      .set({ status: "archived" })
      .where(
        and(
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
          eq(schema.academicYears.status, "active"),
        ),
      );
    await db
      .update(schema.academicYears)
      .set({ status: "active", updatedAt: new Date().toISOString() })
      .where(
        and(
          eq(schema.academicYears.id, year.id),
          eq(schema.academicYears.orgId, orgId),
        ),
      );

    // The year's classes follow it. Last year's classes stop appearing on
    // dashboards, class lists, analytics and learners' timetables — they are
    // not deleted, and their enrolments, marks and report cards stay as they
    // were. Moving back to a year (a promotion made by mistake) brings its
    // classes back.
    const closed = await archiveOtherYearsClasses(orgId, year.id);
    const reopened = await db
      .update(schema.classes)
      .set({ status: "active", updatedAt: new Date().toISOString() })
      .where(
        and(
          eq(schema.classes.orgId, orgId),
          eq(schema.classes.academicYearId, year.id),
          eq(schema.classes.status, "archived"),
        ),
      )
      .returning({ id: schema.classes.id });
    if (reopened.length > 0) {
      await db
        .update(schema.classEnrollments)
        .set({ status: "active" })
        .where(
          and(
            inArray(
              schema.classEnrollments.classId,
              reopened.map((c: any) => c.id),
            ),
            eq(schema.classEnrollments.status, "completed"),
          ),
        );
    }

    const was = others.map((o) => o.name).join(" and ");
    return {
      id: year.id,
      name: year.name,
      classesArchived: closed,
      classesReopened: reopened.length,
      message: `${
        was
          ? `${year.name} is now the current academic year; ${was} is archived and keeps its classes, marks and report cards.`
          : `${year.name} is now the current academic year.`
      }${closed ? ` ${closed} class${closed === 1 ? "" : "es"} from earlier years ${closed === 1 ? "is" : "are"} archived, so they no longer show as current.` : ""}${
        reopened.length
          ? ` ${reopened.length} archived class${reopened.length === 1 ? "" : "es"} of ${year.name} ${reopened.length === 1 ? "is" : "are"} running again; archive any that should stay closed.`
          : ""
      }`,
    };
  },
});
