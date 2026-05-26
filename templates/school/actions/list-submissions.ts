import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description: "List submissions for an assessment. Teachers see all; use studentId to filter to a specific student.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    studentId: z.string().optional().describe("Filter to a specific student"),
    status: z
      .enum(["not_started", "draft", "submitted", "resubmission_requested", "graded"])
      .optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const conditions = [eq(schema.submissions.assessmentId, args.assessmentId)];
    if (args.studentId) conditions.push(eq(schema.submissions.studentId, args.studentId));
    if (args.status) conditions.push(eq(schema.submissions.status, args.status));
    return db
      .select()
      .from(schema.submissions)
      .where(and(...conditions));
  },
});
