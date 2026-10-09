import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

/**
 * Put an abandoned curriculum session aside.
 *
 * Marked rather than deleted, for two reasons. A draft can hold hours of
 * co-authoring, and someone who discards the wrong one should be able to get
 * it back — the row is still there, and its status can be set back. And a
 * school's database is not the place for irreversible buttons.
 *
 * A committed draft is refused: its units and objectives are already in the
 * curriculum, so discarding the draft would suggest an undo it cannot perform.
 */
export default defineAction({
  description:
    "Set aside a curriculum co-authoring session that is not going to be finished, so it stops appearing as work in progress. The draft is kept, not deleted. Refuses a session that has already been committed.",
  schema: z.object({
    id: z.string().describe("Draft ID, from list-curriculum-drafts"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [draft] = await db
      .select()
      .from(schema.curriculumDrafts)
      .where(
        and(
          eq(schema.curriculumDrafts.id, args.id),
          eq(schema.curriculumDrafts.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!draft) throw new Error("That curriculum session was not found.");

    if (draft.status === "committed") {
      throw new Error(
        "That session has already been committed — its units are part of the curriculum now, so discarding the draft would change nothing. Edit the subject's units instead.",
      );
    }
    if (draft.status === "discarded") {
      return {
        id: args.id,
        status: "discarded",
        message: "That session was already set aside.",
      };
    }

    await db
      .update(schema.curriculumDrafts)
      .set({ status: "discarded", updatedAt: new Date().toISOString() })
      .where(eq(schema.curriculumDrafts.id, args.id));

    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      id: args.id,
      sessionTitle: draft.sessionTitle,
      status: "discarded",
      message: `"${draft.sessionTitle}" has been set aside. Nothing was added to the curriculum, and the draft itself is kept in case it is wanted back.`,
    };
  },
});
