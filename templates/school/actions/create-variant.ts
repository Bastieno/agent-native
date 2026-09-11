import { defineAction } from "@agent-native/core";
import {
  readAppState,
  writeAppState,
} from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Add a difficulty variant to an assessment. Create one variant per difficulty level (foundational, developing, advanced). Each variant has its own question content and instructions.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    difficulty: z
      .enum(["foundational", "developing", "advanced", "custom"])
      .describe("Difficulty level for this variant"),
    label: z
      .string()
      .describe('Human label, e.g. "Foundation", "Core", "Extension"'),
    content: z
      .string()
      .describe("Markdown content — the actual questions/tasks"),
    instructions: z.string().optional().describe("How to attempt this variant"),
    totalPoints: z.number().optional().default(100),
    position: z.number().optional().default(0),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.assessmentVariants).values({
      id,
      assessmentId: args.assessmentId,
      difficulty: args.difficulty,
      label: args.label,
      content: args.content,
      instructions: args.instructions ?? null,
      totalPoints: args.totalPoints ?? 100,
      position: args.position ?? 0,
    });
    // Update assessment-draft app-state
    const existing = (await readAppState(
      `assessment-draft-${args.assessmentId}`,
    )) as any;
    if (existing) {
      const variants = [
        ...(existing.variants ?? []),
        { id, difficulty: args.difficulty, label: args.label },
      ];
      await writeAppState(`assessment-draft-${args.assessmentId}`, {
        ...existing,
        variants,
      });
    }
    return {
      id,
      difficulty: args.difficulty,
      label: args.label,
      assessmentId: args.assessmentId,
    };
  },
});
