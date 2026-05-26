import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Create an assessment container (no variants yet). After creating, call create-variant to add difficulty variants, then assign-variants to distribute them to students.",
  schema: z.object({
    classId: z.string().describe("Class ID"),
    unitId: z.string().optional().describe("Unit this assessment is for"),
    title: z.string().describe("Assessment title"),
    description: z.string().optional(),
    assessmentType: z
      .enum(["homework", "quiz", "test", "project", "oral", "practical", "custom"])
      .optional()
      .default("homework"),
    dueDate: z.string().optional().describe("ISO date string for when it is due"),
    totalPoints: z.number().optional().default(100),
    customFields: z.record(z.string(), z.unknown()).optional(),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.assessments).values({
      id,
      classId: args.classId,
      unitId: args.unitId ?? null,
      title: args.title,
      description: args.description ?? null,
      assessmentType: args.assessmentType ?? "homework",
      dueDate: args.dueDate ?? null,
      totalPoints: args.totalPoints ?? 100,
      status: "draft",
      customFieldsJson: JSON.stringify(args.customFields ?? {}),
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    // Write assessment draft app-state for live workspace
    await writeAppState(`assessment-draft-${id}`, {
      assessmentId: id,
      variants: [],
      rubric: null,
    });
    return { id, title: args.title, classId: args.classId };
  },
});
