import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq, inArray } from "drizzle-orm";
import { z } from "zod";

/**
 * How far the curriculum has actually been built, subject by subject.
 *
 * The curriculum page listed twenty-six subjects and said nothing about any of
 * them — no units, no objectives, no sense of which had been mapped. The one
 * question an admin has on that page is "what still needs doing?", and a flat
 * list of names cannot answer it.
 *
 * Year groups come from the units, because that is where the truth is: a
 * subject belongs to whichever years it has actually been written for, not to
 * a label somebody typed. A subject with no units has no year groups yet, and
 * saying so is the point.
 */
export default defineAction({
  description:
    "For each subject, how much curriculum exists: units, learning objectives, and which year groups are covered. Use it to see what still needs building before a term starts.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

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
      return { subjects: [], withCurriculum: 0, total: 0 };
    }

    const subjectIds = subjects.map((s: any) => s.id);
    const units = await db
      .select()
      .from(schema.units)
      .where(inArray(schema.units.subjectId, subjectIds));

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

    const rows = subjects.map((subject: any) => {
      const mine = units.filter((u: any) => u.subjectId === subject.id);
      const objectiveCount = mine.reduce(
        (sum: number, u: any) => sum + (objectivesByUnit.get(u.id) ?? 0),
        0,
      );
      const yearGroupIds = [
        ...new Set(mine.map((u: any) => u.gradeLevelId).filter(Boolean)),
      ].sort((a, b) => (levelOrder.get(a) ?? 0) - (levelOrder.get(b) ?? 0));

      return {
        id: subject.id,
        name: subject.name,
        code: subject.code ?? null,
        color: subject.color ?? null,
        units: mine.length,
        objectives: objectiveCount,
        yearGroups: yearGroupIds.map((id) => levelName.get(id) ?? id),
        // Units exist but nothing to teach in them is its own kind of
        // half-done, and worth separating from "not started".
        started: mine.length > 0,
        emptyUnits: mine.filter(
          (u: any) => (objectivesByUnit.get(u.id) ?? 0) === 0,
        ).length,
      };
    });

    const withCurriculum = rows.filter((r) => r.started).length;
    return {
      subjects: rows,
      total: rows.length,
      withCurriculum,
      notStarted: rows.length - withCurriculum,
      message:
        withCurriculum === rows.length
          ? `All ${rows.length} subjects have a curriculum.`
          : `${withCurriculum} of ${rows.length} subjects have a curriculum; ${
              rows.length - withCurriculum
            } have not been started.`,
    };
  },
});
