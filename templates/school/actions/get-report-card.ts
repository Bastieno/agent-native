import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { buildDeepLink } from "@agent-native/core/server";
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
  /**
   * A head working through Claude or another outside AI app gets a full
   * address, not a relative path: `/print/report/abc` means nothing in a chat
   * window. The MCP layer turns this into an absolute link on the school's
   * own site, where they are already signed in.
   */
  link: ({ result }) => {
    const reportId = (() => {
      const r = result as
        | { id?: string; reportCards?: Array<{ id?: string }> }
        | undefined;
      // One card: link to it. A list is newest first: link to the newest.
      return r?.id ?? r?.reportCards?.[0]?.id;
    })();
    if (!reportId) return null;
    return {
      url: buildDeepLink({
        app: "school",
        view: "print-report",
        params: { reportId },
        // The printable is a real route; without `to` the open route
        // redirects to /<view> and the id is lost.
        to: `/print/report/${reportId}`,
      }),
      label: "Open the report card to print",
      view: "print-report",
    };
  },
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
