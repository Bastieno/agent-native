import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { resolveStudentId } from "../server/lib/student-session.js";

/**
 * Read a report card exactly as it was issued.
 *
 * Nothing is recomputed here. The figures come from the snapshot and the
 * wording from the stored document, so a report opened a year later matches
 * the copy that went home — which is the entire point of storing it rather
 * than generating it on demand.
 */
export default defineAction({
  description:
    "Read an issued report card, or list a student's. Returns exactly what was stored when it was issued — never recomputed from current data.",
  schema: z.object({
    id: z.string().optional().describe("A specific report card"),
    studentId: z
      .string()
      .optional()
      .describe("List this student's reports, newest first"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    // A learner may read their own reports and nobody else's. Without this,
    // the id is the only thing standing between one child's report card and
    // another's.
    const ownStudentId = await resolveStudentId();

    if (args.id) {
      const [row] = await db
        .select()
        .from(schema.reportCards)
        .where(
          and(
            eq(schema.reportCards.id, args.id),
            eq(schema.reportCards.orgId, orgId),
          ),
        )
        .limit(1);
      if (!row) throw new Error("That report card was not found.");
      if (ownStudentId && row.studentId !== ownStudentId) {
        throw new Error("That report card was not found.");
      }
      let snapshot: any = {};
      try {
        snapshot = JSON.parse(row.snapshotJson ?? "{}");
      } catch {
        snapshot = {};
      }
      return {
        id: row.id,
        serial: row.serial,
        studentId: row.studentId,
        termId: row.termId,
        issuedAt: row.issuedAt,
        issuedBy: row.issuedBy,
        status: row.status,
        snapshot,
        documentMarkdown: row.documentMarkdown,
        path: `/print/report/${row.id}`,
      };
    }

    const studentId = ownStudentId ?? args.studentId;
    if (!studentId) {
      throw new Error(
        "Pass an id, or a studentId to list a student's reports.",
      );
    }
    if (ownStudentId && args.studentId && args.studentId !== ownStudentId) {
      throw new Error("You can only read your own report cards.");
    }

    const rows = await db
      .select({
        id: schema.reportCards.id,
        serial: schema.reportCards.serial,
        termId: schema.reportCards.termId,
        issuedAt: schema.reportCards.issuedAt,
        issuedBy: schema.reportCards.issuedBy,
        status: schema.reportCards.status,
      })
      .from(schema.reportCards)
      .where(
        and(
          eq(schema.reportCards.orgId, orgId),
          eq(schema.reportCards.studentId, studentId),
        ),
      )
      .orderBy(desc(schema.reportCards.issuedAt));

    return {
      studentId,
      reportCards: rows.map((r: any) => ({
        ...r,
        path: `/print/report/${r.id}`,
      })),
      count: rows.length,
    };
  },
});
