import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { termContext } from "../server/lib/timetable.js";
import { z } from "zod";

/**
 * Which session and term the school is in today.
 *
 * Everyone in a school knows this without being told, and the app did not show
 * it anywhere — so a teacher looking at a scheme of work or a set of marks had
 * no way to tell which term they were looking at. It is the kind of context
 * that is invisible until it is missing and then quietly wrong.
 *
 * Today's date decides it, against the term dates the school set. Between
 * terms it says so rather than guessing at the nearest one, because "the
 * holidays" is a real answer and pretending it is still last term is not.
 */
export default defineAction({
  description:
    "The academic session and term the school is in today, from the school's own term dates. Returns the next term when today falls in a break.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const ctx = await termContext(orgId);
    if (!ctx) {
      return {
        session: null,
        term: null,
        message: "No active academic session yet.",
      };
    }
    const { year, terms, current, next } = ctx;

    return {
      session: { id: year.id, name: year.name },
      term: current
        ? {
            id: current.id,
            name: current.name,
            startDate: current.startDate,
            endDate: current.endDate,
            sequence: current.sequence,
          }
        : null,
      // Between terms is a real state, not a missing one.
      inBreak: !current,
      nextTerm:
        !current && next
          ? { id: next.id, name: next.name, startDate: next.startDate }
          : null,
      termCount: terms.length,
      label: current
        ? `${year.name} · ${current.name}`
        : next
          ? `${year.name} · ${next.name} begins ${next.startDate}`
          : year.name,
    };
  },
});
