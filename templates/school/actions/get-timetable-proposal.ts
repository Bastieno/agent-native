import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { findTerm } from "../server/lib/timetable.js";
import { proposalView } from "../server/lib/timetable-generation.js";

export default defineAction({
  description:
    "The timetable drafted for a term and still waiting to be accepted or discarded: each lesson it would place (with its class name, subject, arm, option arms, teachers, day, period, time and room), why some lessons did not fit, the classes left out for want of a lesson count or a teacher, and a summary. proposal is null when nothing is waiting.",
  schema: z.object({ termId: z.string() }),
  http: { method: "GET" },
  readOnly: true,
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const term = await findTerm(orgId, args.termId);
    if (!term) throw new Error("That term is not in this school.");
    const proposal = await proposalView(orgId, term.id);
    if (!proposal) {
      return {
        proposal: null,
        message: `Nothing is drafted for ${term.name}.`,
      };
    }
    const n = proposal.lessons.length;
    return {
      proposal,
      message: `${n} ${n === 1 ? "lesson is" : "lessons are"} drafted for ${term.name}, waiting to be accepted.`,
    };
  },
});
