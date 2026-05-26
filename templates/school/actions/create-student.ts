import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Create a student academic record. Use invite-student for the full onboarding flow (invite email → account setup). Use create-student when importing existing records or creating students who already have accounts.",
  schema: z.object({
    userId: z.string().describe("The user ID from Better Auth (must exist)"),
    gradeLevelId: z.string().optional(),
    admissionNumber: z.string().optional(),
    customFields: z.record(z.string(), z.unknown()).optional().describe("Custom field values, keyed by field name"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.students).values({
      id,
      userId: args.userId,
      schoolId: orgId,
      gradeLevelId: args.gradeLevelId ?? null,
      admissionNumber: args.admissionNumber ?? null,
      customFieldsJson: JSON.stringify(args.customFields ?? {}),
      status: "active",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    // Also create school_profile for student
    await db.insert(schema.schoolProfiles).values({
      id: nanoid(),
      userId: args.userId,
      schoolId: orgId,
      schoolRole: "student",
      status: "active",
    });
    return { id, userId: args.userId };
  },
});
