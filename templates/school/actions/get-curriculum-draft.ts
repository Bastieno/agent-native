import { defineAction } from "@agent-native/core";
import { readAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Read the current state of a curriculum draft. Call this at the start of each turn to recover context from previous sessions.",
  schema: z.object({
    id: z.string().describe("Curriculum draft ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const [draft] = await db
      .select()
      .from(schema.curriculumDrafts)
      .where(eq(schema.curriculumDrafts.id, args.id))
      .limit(1);
    if (!draft) throw new Error(`Curriculum draft not found: ${args.id}`);
    const liveState = await readAppState(`curriculum-draft-${args.id}`);
    return {
      id: draft.id,
      sessionTitle: draft.sessionTitle,
      status: draft.status,
      stateJson: JSON.parse(draft.stateJson),
      liveState,
      updatedAt: draft.updatedAt,
    };
  },
});
