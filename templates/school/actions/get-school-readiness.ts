import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { readinessFor } from "../server/lib/school-readiness.js";
import {
  NEED_ORDER,
  NEEDS,
  checklistText,
  nextStep,
  progressSummary,
} from "../shared/readiness.js";

/**
 * Which first steps the school has done: year groups, terms, the school week
 * and a class. Screens that need one of them stay out of the menu until it is
 * done (shared/readiness.ts), so a school sees only what can work.
 */
export default defineAction({
  description:
    "The school's first-steps checklist: which are done, which is next and what each opens. Show its checklist to the person as it is, after every setup step. Which of the school's first steps are done — year groups, terms, the school week, a class — and which are still to do. Pages that depend on a missing step are hidden from the menu until it is done, so if someone asks about one of them, say what is missing and offer to do it.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const facts = await readinessFor(orgId);
    const todo = NEED_ORDER.filter((n) => !facts[n]);
    const next = nextStep(facts);
    return {
      ...facts,
      complete: todo.length === 0,
      summary: progressSummary(facts),
      // Show this as it is: the same steps the app's Overview page shows.
      checklist: checklistText(facts),
      next: next
        ? { step: next, label: NEEDS[next].label, ask: NEEDS[next].ask }
        : null,
      todo: todo.map((n) => ({ step: n, label: NEEDS[n].label })),
    };
  },
});
