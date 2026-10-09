import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq, inArray, ne } from "drizzle-orm";
import { z } from "zod";
import { parseGradeLevelIds } from "../server/lib/subject-year-groups.js";

/**
 * How far the curriculum has actually been built, subject by subject — for
 * the whole school, or for one year group.
 *
 * The curriculum page listed twenty-six subjects and said nothing about any of
 * them. Then it said whether each had units, which was better but still hid the
 * real gaps: Mathematics counted as "started" because JSS1 and SS1 were done,
 * while four other year groups had nothing. A curriculum is built one year group
 * at a time, so that is how it has to be counted.
 *
 * Which year groups take a subject comes from the subject's own list, its
 * classes, and the units written for it — the same three signals the calendar
 * uses, so the two pages never disagree about what JSS1 takes.
 */
export default defineAction({
  description:
    "For each subject, how much curriculum exists: units, learning objectives, which year groups take it and which of those have a curriculum. Pass gradeLevelId to count one year group only — then only the subjects that year group takes are returned. Use it to see what still needs building.",
  schema: z.object({
    gradeLevelId: z
      .string()
      .optional()
      .describe("Count only this year group, and only its subjects"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const levels = await db
      .select()
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId))
      .orderBy(asc(schema.gradeLevels.sequence));
    const levelName = new Map<string, string>(
      levels.map((l: any) => [l.id, l.name]),
    );
    const levelOrder = new Map<string, number>(
      levels.map((l: any) => [l.id, l.sequence]),
    );
    const byLevelOrder = (a: string, b: string) =>
      (levelOrder.get(a) ?? 0) - (levelOrder.get(b) ?? 0);
    const yearGroups = levels.map((l: any) => ({ id: l.id, name: l.name }));

    const selected = args.gradeLevelId
      ? levels.find((l: any) => l.id === args.gradeLevelId)
      : null;
    if (args.gradeLevelId && !selected)
      throw new Error("Year group not found.");

    const subjects = await db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          eq(schema.subjects.status, "active"),
        ),
      )
      .orderBy(asc(schema.subjects.position));
    if (subjects.length === 0) {
      return {
        subjects: [],
        withCurriculum: 0,
        total: 0,
        notStarted: 0,
        yearGroups,
        yearGroup: selected ? { id: selected.id, name: selected.name } : null,
      };
    }

    const subjectIds = subjects.map((s: any) => s.id);
    const units = await db
      .select()
      .from(schema.units)
      .where(
        and(
          inArray(schema.units.subjectId, subjectIds),
          ne(schema.units.status, "archived"),
        ),
      );
    const objectives = units.length
      ? await db
          .select({ unitId: schema.learningObjectives.unitId })
          .from(schema.learningObjectives)
          .where(
            inArray(
              schema.learningObjectives.unitId,
              units.map((u: any) => u.id),
            ),
          )
      : [];
    const objectivesByUnit = new Map<string, number>();
    for (const o of objectives) {
      objectivesByUnit.set(o.unitId, (objectivesByUnit.get(o.unitId) ?? 0) + 1);
    }
    const classes = await db
      .select({
        subjectId: schema.classes.subjectId,
        gradeLevelId: schema.classes.gradeLevelId,
      })
      .from(schema.classes)
      .where(eq(schema.classes.orgId, orgId));

    const rows = subjects
      .map((subject: any) => {
        const mine = units.filter((u: any) => u.subjectId === subject.id);
        const covered = [
          ...new Set(mine.map((u: any) => u.gradeLevelId).filter(Boolean)),
        ] as string[];
        const taughtIn = [
          ...new Set([
            ...(parseGradeLevelIds(subject.gradeLevelsJson) ?? []),
            ...classes
              .filter((c: any) => c.subjectId === subject.id)
              .map((c: any) => c.gradeLevelId),
            ...covered,
          ]),
        ].filter((id) => levelName.has(id)) as string[];
        taughtIn.sort(byLevelOrder);
        covered.sort(byLevelOrder);

        // Counting one year group: only its units, and only if it takes the
        // subject at all.
        const counted = selected
          ? mine.filter((u: any) => u.gradeLevelId === selected.id)
          : mine;
        if (selected && !taughtIn.includes(selected.id)) return null;

        const objectiveCount = counted.reduce(
          (sum: number, u: any) => sum + (objectivesByUnit.get(u.id) ?? 0),
          0,
        );
        return {
          id: subject.id,
          name: subject.name,
          code: subject.code ?? null,
          color: subject.color ?? null,
          units: counted.length,
          objectives: objectiveCount,
          // Units exist but nothing to teach in them is its own kind of
          // half-done, and worth separating from "not started".
          started: counted.length > 0,
          emptyUnits: counted.filter(
            (u: any) => (objectivesByUnit.get(u.id) ?? 0) === 0,
          ).length,
          taughtIn: taughtIn.map((id) => levelName.get(id)!),
          yearGroups: covered.map((id) => levelName.get(id)!),
        };
      })
      .filter(Boolean) as Array<{
      id: string;
      name: string;
      code: string | null;
      color: string | null;
      units: number;
      objectives: number;
      started: boolean;
      emptyUnits: number;
      taughtIn: string[];
      yearGroups: string[];
    }>;

    const withCurriculum = rows.filter((r) => r.started).length;
    const scope = selected ? `${selected.name} ` : "";
    return {
      subjects: rows,
      total: rows.length,
      withCurriculum,
      notStarted: rows.length - withCurriculum,
      yearGroups,
      yearGroup: selected ? { id: selected.id, name: selected.name } : null,
      message:
        withCurriculum === rows.length
          ? `All ${rows.length} ${scope}subjects have a curriculum.`
          : `${withCurriculum} of ${rows.length} ${scope}subjects have a curriculum; ${
              rows.length - withCurriculum
            } have not been started.`,
    };
  },
});
