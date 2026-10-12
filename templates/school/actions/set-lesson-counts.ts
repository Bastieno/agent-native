import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import {
  armWord,
  armsInYearGroup,
  schoolWord,
} from "../server/lib/arm-enrolment.js";
import { resolveViewTerm } from "../server/lib/timetable-view.js";
import {
  activeClassesOfYear,
  currentYearId,
} from "../server/lib/timetable-coverage.js";
import { listInWords } from "../server/lib/timetable.js";
import { countsProblem } from "../shared/lesson-counts.js";

const said = (periods: number | null, doubles: number | null) =>
  periods == null
    ? "not set"
    : `${periods} a week${doubles ? `, ${doubles} as ${doubles === 1 ? "a double" : "doubles"}` : ""}`;

export default defineAction({
  description:
    "Set how many periods a week classes need, in bulk: every active class of one subject in one year group, narrowed to one arm or to the arms of one stream. Option and unattached classes are included only when neither arm nor stream is given. doublesPerWeek is how many of those periods come as doubles (a double is two periods). Without confirm it only previews which classes would change; pass confirm to apply. null clears the count.",
  schema: z.object({
    subjectId: z.string(),
    gradeLevelId: z.string(),
    armId: z.string().optional().describe("Only this arm's own class"),
    stream: z
      .string()
      .optional()
      .describe(
        "Only the classes of arms in this stream (as the school calls it)",
      ),
    periodsPerWeek: z
      .number()
      .int()
      .min(0)
      .max(100)
      .nullable()
      .describe("Periods a week; null clears the count"),
    doublesPerWeek: z
      .number()
      .int()
      .min(0)
      .max(50)
      .nullable()
      .optional()
      .describe(
        "How many of the periods come as doubles; omit to leave as it is, null to clear",
      ),
    termId: z
      .string()
      .optional()
      .describe(
        "A term of the academic year being planned; defaults to the current year",
      ),
    confirm: z.boolean().optional().describe("Apply the change"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const word = await armWord(orgId);
    const yearWord = await schoolWord(orgId, "yearGroup", "year group");
    const streamWord = await schoolWord(orgId, "stream", "stream");

    const [subject] = await db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.id, args.subjectId),
          eq(schema.subjects.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!subject) throw new Error("That subject is not in this school.");
    const [level] = await db
      .select()
      .from(schema.gradeLevels)
      .where(
        and(
          eq(schema.gradeLevels.id, args.gradeLevelId),
          eq(schema.gradeLevels.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!level) throw new Error(`That ${yearWord} is not in this school.`);
    if (args.armId) {
      await armsInYearGroup(orgId, args.gradeLevelId, [args.armId], word);
    }

    // The academic year being planned: the viewed term's, else the current.
    const current = await currentYearId(orgId);
    const viewed = args.termId
      ? await resolveViewTerm(orgId, args.termId)
      : null;
    const yearId = viewed?.academicYearId ?? current;
    if (!yearId) {
      throw new Error(
        "The school has no current academic year, so there are no classes to count. Choose a term of the year being planned.",
      );
    }
    const [yearRow] = await db
      .select()
      .from(schema.academicYears)
      .where(
        and(
          eq(schema.academicYears.id, yearId),
          eq(schema.academicYears.orgId, orgId),
          eq(schema.academicYears.schoolId, orgId),
        ),
      )
      .limit(1);
    const yearNote =
      yearId !== current && yearRow
        ? ` in the academic year ${yearRow.name}`
        : "";

    let classes = (await activeClassesOfYear(orgId, yearId)).filter(
      (c) =>
        c.subjectId === args.subjectId && c.gradeLevelId === args.gradeLevelId,
    );

    if (args.armId || args.stream) {
      const wantedStream = args.stream?.trim().toLowerCase();
      const arms = (await db
        .select()
        .from(schema.arms)
        .where(
          and(
            eq(schema.arms.schoolId, orgId),
            eq(schema.arms.gradeLevelId, args.gradeLevelId),
          ),
        )) as any[];
      const wanted = new Set(
        arms
          .filter(
            (a) =>
              (!args.armId || a.id === args.armId) &&
              (!wantedStream ||
                (a.stream ?? "").trim().toLowerCase() === wantedStream),
          )
          .map((a) => a.id as string),
      );
      if (wantedStream && wanted.size === 0) {
        throw new Error(
          `No ${word} in ${level.name} is in the ${streamWord} "${args.stream}".`,
        );
      }
      classes = classes.filter((c) => c.armId && wanted.has(c.armId));
    }

    if (classes.length === 0) {
      return {
        applied: false,
        classes: [],
        message: `No active ${subject.name} class in ${level.name}${yearNote} matches, so nothing was changed.`,
      };
    }

    // Each class's counts as they would stand, and whether they can.
    const changes = classes
      .map((c) => {
        const to = {
          periods: args.periodsPerWeek,
          doubles:
            args.periodsPerWeek == null
              ? null
              : args.doublesPerWeek === undefined
                ? (c.doublesPerWeek ?? null)
                : args.doublesPerWeek,
        };
        const problem = countsProblem(to.periods, to.doubles);
        if (problem) throw new Error(`${c.name}: ${problem}`);
        return {
          classId: c.id as string,
          className: c.name as string,
          from: {
            periods: (c.periodsPerWeek ?? null) as number | null,
            doubles: (c.doublesPerWeek ?? null) as number | null,
          },
          to,
        };
      })
      .sort((a, b) => a.className.localeCompare(b.className));

    const names = listInWords(
      changes.map((c) => c.className),
      12,
    );
    const target =
      args.periodsPerWeek == null
        ? "cleared"
        : args.doublesPerWeek === undefined
          ? `${args.periodsPerWeek} a week, each class keeping the doubles it has`
          : said(args.periodsPerWeek, args.doublesPerWeek);
    if (!args.confirm) {
      return {
        applied: false,
        classes: changes,
        message: `Nothing is changed yet. This would set ${subject.name} to ${target} for ${changes.length} ${changes.length === 1 ? "class" : "classes"}${yearNote}: ${names}.`,
      };
    }

    await db
      .update(schema.classes)
      .set({
        periodsPerWeek: args.periodsPerWeek,
        ...(args.periodsPerWeek == null
          ? { doublesPerWeek: null }
          : args.doublesPerWeek !== undefined
            ? { doublesPerWeek: args.doublesPerWeek }
            : {}),
        updatedAt: new Date().toISOString(),
      })
      .where(
        and(
          eq(schema.classes.orgId, orgId),
          inArray(
            schema.classes.id,
            changes.map((c) => c.classId),
          ),
        ),
      );
    return {
      applied: true,
      classes: changes,
      message: `Set ${subject.name} to ${target} for ${changes.length} ${changes.length === 1 ? "class" : "classes"}${yearNote}: ${names}.`,
    };
  },
});
