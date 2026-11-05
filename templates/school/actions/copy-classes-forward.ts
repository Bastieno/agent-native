import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { boolish } from "../shared/zod-json.js";
import { yearsToCarryBetween } from "../server/lib/academic-year.js";
import createClass from "./create-class.js";

/**
 * Open a new academic year with the same classes as the last one.
 *
 * A school teaches much the same classes every year — Mathematics for each
 * arm, the same option subjects, the same teachers — and re-creating a
 * hundred of them one at a time is where a year's start stalls. This copies
 * each class into the new year: whole-arm classes stay with their arm, option
 * classes keep the arms they draw from, and every class keeps its teacher,
 * room, capacity and lesson counts.
 *
 * Rolls are not copied. A whole-arm class fills from its arm when learners are
 * promoted; an option class starts empty, because who takes it is chosen, not
 * automatic — and the learners who took it last year are in the next year
 * group now.
 *
 * Nothing in it is named after a school: classes are matched by what they are
 * (subject, year group, arm), not by their names.
 */
export default defineAction({
  description:
    "Copy an academic year's classes into another year: whole-arm and unattached classes, and option classes with the arms they draw from, each with its teacher, room, capacity and lesson counts. Rolls are not copied: arm classes fill when learners are promoted (promote-learners) and option classes start empty. Skips any class the new year already has, so it is safe to run again. Previews by default; pass confirm=true to copy. With no years named it copies the latest earlier year into the upcoming year (or the current year once the school has switched).",
  schema: z.object({
    fromAcademicYearId: z
      .string()
      .optional()
      .describe(
        "Year to copy from. Defaults to the latest year before the target.",
      ),
    toAcademicYearId: z
      .string()
      .optional()
      .describe(
        "Year to copy into. Defaults to the upcoming year if there is one, else the current year.",
      ),
    gradeLevelId: z
      .string()
      .optional()
      .describe("Only this year group's classes"),
    confirm: boolish()
      .optional()
      .default(false)
      .describe("false returns a preview; true copies"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const { from, to } = await yearsToCarryBetween(
      orgId,
      args.fromAcademicYearId,
      args.toAcademicYearId,
    );

    const conditions = [
      eq(schema.classes.orgId, orgId),
      eq(schema.classes.academicYearId, from.id),
    ];
    if (args.gradeLevelId)
      conditions.push(eq(schema.classes.gradeLevelId, args.gradeLevelId));
    const source = await db
      .select()
      .from(schema.classes)
      .where(and(...conditions))
      .orderBy(asc(schema.classes.name));

    const optionRows = source.length
      ? await db
          .select()
          .from(schema.classArms)
          .where(
            inArray(
              schema.classArms.classId,
              source.map((c: any) => c.id),
            ),
          )
      : [];
    const optionArmsOf = new Map<string, string[]>();
    for (const r of optionRows as any[]) {
      optionArmsOf.set(r.classId, [
        ...(optionArmsOf.get(r.classId) ?? []),
        r.armId,
      ]);
    }

    // Terms by position, for a class that is tied to one.
    const termsOf = (yearId: string) =>
      db
        .select()
        .from(schema.terms)
        .where(
          and(
            eq(schema.terms.orgId, orgId),
            eq(schema.terms.academicYearId, yearId),
          ),
        )
        .orderBy(asc(schema.terms.sequence));
    const [fromTerms, toTerms] = await Promise.all([
      termsOf(from.id),
      termsOf(to.id),
    ]);
    const termFor = (termId: string | null) => {
      if (!termId) return undefined;
      const at = fromTerms.findIndex((t: any) => t.id === termId);
      return at >= 0 ? toTerms[at]?.id : undefined;
    };

    // What the new year already has, so a second run adds nothing twice.
    const existing = await db
      .select({
        subjectId: schema.classes.subjectId,
        gradeLevelId: schema.classes.gradeLevelId,
        armId: schema.classes.armId,
        name: schema.classes.name,
      })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.orgId, orgId),
          eq(schema.classes.academicYearId, to.id),
        ),
      );
    const have = new Set(
      existing.map(
        (c: any) =>
          `${c.subjectId}|${c.gradeLevelId}|${c.armId ?? ""}|${c.name}`,
      ),
    );
    const key = (c: any) =>
      `${c.subjectId}|${c.gradeLevelId}|${c.armId ?? ""}|${c.name}`;

    const toCopy = (source as any[]).filter((c) => !have.has(key(c)));
    const alreadyThere = source.length - toCopy.length;
    const optionCount = toCopy.filter((c) => optionArmsOf.has(c.id)).length;
    const summary = {
      from: from.name,
      to: to.name,
      classes: toCopy.length,
      optionClasses: optionCount,
      alreadyThere,
    };
    const outline = `${toCopy.length} class${toCopy.length === 1 ? "" : "es"} (${optionCount} option) from ${from.name} into ${to.name}${
      alreadyThere ? `; ${alreadyThere} already there and left alone` : ""
    }.`;

    if (!args.confirm) {
      return {
        preview: true,
        ...summary,
        message: `This would copy ${outline} Rolls are not copied: arm classes fill when learners are promoted and option classes start empty. Re-run with confirm=true to copy them.`,
      };
    }

    let made = 0;
    const failed: { name: string; reason: string }[] = [];
    for (const c of toCopy) {
      try {
        const options = optionArmsOf.get(c.id);
        await (createClass as any).run({
          subjectId: c.subjectId,
          gradeLevelId: c.gradeLevelId,
          academicYearId: to.id,
          termId: termFor(c.termId),
          name: c.name,
          primaryTeacherUserId: c.primaryTeacherUserId,
          roomNumber: c.roomNumber ?? undefined,
          capacity: c.capacity ?? undefined,
          periodsPerWeek: c.periodsPerWeek ?? undefined,
          doublesPerWeek: c.doublesPerWeek ?? undefined,
          armId: options ? undefined : (c.armId ?? undefined),
          optionArmIds: options,
        });
        made++;
      } catch (e: any) {
        failed.push({ name: c.name, reason: e?.message ?? String(e) });
      }
    }
    return {
      preview: false,
      ...summary,
      created: made,
      failed,
      message: `Copied ${made} of ${toCopy.length} class${toCopy.length === 1 ? "" : "es"} from ${from.name} into ${to.name}${
        alreadyThere ? ` (${alreadyThere} already there)` : ""
      }.${failed.length ? ` ${failed.length} could not be copied: ${failed.map((f) => `${f.name} (${f.reason})`).join("; ")}.` : ""} Option classes start with no learners: enrol the ones who take them.`,
    };
  },
});
