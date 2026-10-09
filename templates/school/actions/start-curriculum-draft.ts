import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Start a durable multi-turn curriculum co-authoring session. Creates a curriculum_drafts SQL row for persistence and a curriculum-draft-{id} app-state key for the live workspace UI. Call update-curriculum-draft after each turn to persist progress.",
  schema: z.object({
    sessionTitle: z
      .string()
      .describe(
        "Brief title for this co-authoring session, e.g. 'Grade 9 Science Curriculum'",
      ),
    initialState: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("Optional starting state JSON"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    const stateJson = JSON.stringify(args.initialState ?? {});
    await db.insert(schema.curriculumDrafts).values({
      id,
      schoolId: orgId,
      sessionTitle: args.sessionTitle,
      stateJson,
      status: "in_progress",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    await writeAppState(`curriculum-draft-${id}`, {
      draftId: id,
      stateJson: args.initialState ?? {},
      step: "started",
      lastAction: "start-curriculum-draft",
    });
    return {
      draftId: id,
      sessionTitle: args.sessionTitle,
      message: `Curriculum draft started. Use update-curriculum-draft --id=${id} after each turn to persist progress.`,
    };
  },
});
