import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";

export default defineAction({
  description:
    "Throw away a drafted timetable without putting any of it on the term.",
  schema: z.object({ proposalId: z.string() }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const P = schema.timetableProposals;
    const [row] = await db
      .select()
      .from(P)
      .where(and(eq(P.id, args.proposalId), eq(P.schoolId, orgId)))
      .limit(1);
    if (!row) throw new Error("That draft is not in this school.");
    if (row.status !== "open") {
      throw new Error("That draft isn't waiting any more.");
    }
    await db.update(P).set({ status: "discarded" }).where(eq(P.id, row.id));
    return { discarded: true, message: "The draft is thrown away." };
  },
});
