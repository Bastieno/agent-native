import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { deriveItemStyle, type ReadQuestion } from "../shared/derive-style.js";

/** Readings in progress — a durable draft is no use if nothing lists it. */
export default defineAction({
  description:
    "Style imports for this school, with how many questions each has read so far.",
  schema: z.object({
    status: z
      .enum(["in_progress", "committed", "discarded"])
      .optional()
      .default("in_progress"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const rows = await db
      .select()
      .from(schema.styleImports)
      .where(
        and(
          eq(schema.styleImports.schoolId, orgId),
          eq(schema.styleImports.status, args.status),
        ),
      );
    return {
      imports: rows.map((r: any) => {
        let qs: ReadQuestion[] = [];
        try {
          qs = JSON.parse(r.questionsJson);
        } catch {
          qs = [];
        }
        const d = deriveItemStyle(qs);
        return {
          importId: r.id,
          styleName: r.styleName,
          subject: r.subject,
          source: r.source,
          questionsRead: d.questionsAnalysed,
          confidence: d.confidence,
          updatedAt: r.updatedAt,
        };
      }),
    };
  },
});
