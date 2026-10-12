import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import { findTerm } from "../server/lib/timetable.js";
import { openProposal } from "../server/lib/timetable-generation.js";
import type { ProposedLesson } from "../server/lib/timetable-generator.js";

export default defineAction({
  description:
    "The timetable drafted for a term and still waiting to be accepted or discarded: each lesson it would place (with its class name, day, period, time and room), why some lessons did not fit, the classes left out for want of a lesson count or a teacher, and a summary. proposal is null when nothing is waiting.",
  schema: z.object({ termId: z.string() }),
  http: { method: "GET" },
  readOnly: true,
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const term = await findTerm(orgId, args.termId);
    if (!term) throw new Error("That term is not in this school.");
    const row = await openProposal(orgId, term.id);
    if (!row) {
      return {
        proposal: null,
        message: `Nothing is drafted for ${term.name}.`,
      };
    }

    const lessons: ProposedLesson[] = JSON.parse(row.lessonsJson);
    const ids = [...new Set(lessons.map((l) => l.classId))];
    const names = new Map<string, string>();
    if (ids.length) {
      const rows = await getDb()
        .select({ id: schema.classes.id, name: schema.classes.name })
        .from(schema.classes)
        .where(
          and(eq(schema.classes.orgId, orgId), inArray(schema.classes.id, ids)),
        );
      for (const r of rows) names.set(r.id, r.name);
    }
    const summary = JSON.parse(row.summaryJson) as Record<string, any>;
    return {
      proposal: {
        id: row.id,
        createdAt: row.createdAt,
        lessons: lessons.map((l) => ({
          ...l,
          className: names.get(l.classId) ?? "",
        })),
        reasons: JSON.parse(row.unplacedJson),
        notSet: summary.notSet ?? [],
        noTeacher: summary.noTeacher ?? [],
        summary: {
          lessons: summary.lessons ?? lessons.length,
          notFitted: summary.notFitted ?? 0,
          elapsedMs: summary.elapsedMs ?? 0,
        },
      },
      message: `${lessons.length} lesson(s) drafted for ${term.name}, waiting to be accepted.`,
    };
  },
});
