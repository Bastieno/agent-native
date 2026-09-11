import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description: "Create a department (e.g. Science, Humanities, Languages).",
  schema: z.object({
    name: z.string().describe("Department name"),
    headTeacherUserId: z
      .string()
      .optional()
      .describe("User ID of the head teacher"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const id = nanoid();
    await db.insert(schema.departments).values({
      id,
      schoolId: orgId,
      name: args.name,
      headTeacherUserId: args.headTeacherUserId ?? null,
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    return { id, name: args.name };
  },
});
