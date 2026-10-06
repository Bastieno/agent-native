import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { loadSubjectCurriculum } from "../server/lib/subject-curriculum.js";

/**
 * A subject's committed curriculum, grouped the way it is taught.
 *
 * `list-units` returns one flat run with no objectives, and every year group
 * numbers its units from 1 — so "unit 1" means nothing until you know whose.
 * This is the shape the subject page shows, so an agent reading it describes
 * what the admin sees.
 */
export default defineAction({
  description:
    "Read one subject's committed curriculum: year groups → terms → units in teaching order, each unit with its weeks, standards codes and learning objectives, plus any term weeks with nothing planned. Use this — not list-units — to describe or review a subject's curriculum.",
  schema: z.object({
    subjectId: z.string().describe("Subject ID"),
    gradeLevelId: z
      .string()
      .optional()
      .describe("Only this year group. Omit for every year group."),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");

    const curriculum = await loadSubjectCurriculum(args.subjectId, orgId);
    if (!curriculum) throw new Error("Subject not found.");

    const yearGroups = args.gradeLevelId
      ? curriculum.yearGroups.filter(
          (y) => y.gradeLevelId === args.gradeLevelId,
        )
      : curriculum.yearGroups;

    const summary = yearGroups.length
      ? yearGroups
          .map((y) => `${y.name}: ${y.units} units, ${y.objectives} objectives`)
          .join("; ")
      : "no curriculum yet";

    return {
      ...curriculum,
      yearGroups,
      message: `${curriculum.subject.name} — ${summary}.${
        curriculum.unitsWithoutObjectives
          ? ` ${curriculum.unitsWithoutObjectives} unit(s) have no learning objectives.`
          : ""
      }`,
    };
  },
});
