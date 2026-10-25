import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { and, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { getDb, schema } from "../server/db/index.js";
import {
  accessibleClassIds,
  actorForEmail,
} from "../server/lib/class-access.js";
import { audienceOf } from "../server/lib/audience.js";

/**
 * Work that has been written but not yet shared, for the person who has to
 * read it. A draft made by the assistant or by a teacher's own AI app lands
 * here, so it is never lost for want of a link: a teacher sees every draft in
 * the classes they teach, and an admin or coordinator the ones they made.
 */
export default defineAction({
  description:
    "Drafts waiting to be read and shared: for a teacher, every unshared piece of work in their classes; for an admin or coordinator, the ones they made. Newest first. Use it for 'what is waiting for me?' and to find something an AI app or the assistant just saved.",
  schema: z.object({}),
  http: { method: "GET" },
  run: async () => {
    const { userEmail, orgId } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (!actor || !orgId) return { drafts: [] };
    const db = getDb();

    const mine = actor.schoolRole === "teacher";
    const classIds = await accessibleClassIds(actor);
    if (classIds.length === 0) return { drafts: [] };

    const rows = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        format: schema.assessments.format,
        classId: schema.assessments.classId,
        createdAt: schema.assessments.createdAt,
        audienceStudentIdsJson: schema.assessments.audienceStudentIdsJson,
        ownerEmail: schema.assessments.ownerEmail,
      })
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.orgId, orgId),
          eq(schema.assessments.status, "draft"),
          inArray(schema.assessments.classId, classIds),
        ),
      )
      .orderBy(desc(schema.assessments.createdAt))
      .limit(60);

    const visible = rows
      .filter((r) => mine || r.ownerEmail === userEmail)
      .slice(0, 6);
    if (visible.length === 0) return { drafts: [] };

    const classes = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(
        inArray(schema.classes.id, [...new Set(visible.map((r) => r.classId))]),
      );
    const classNameOf = new Map(classes.map((c) => [c.id, c.name]));
    const pdfs = await db
      .select({ id: schema.documentFiles.assessmentId })
      .from(schema.documentFiles)
      .where(
        inArray(
          schema.documentFiles.assessmentId,
          visible.map((r) => r.id),
        ),
      );
    const isPdf = new Set(pdfs.map((p) => p.id));

    return {
      drafts: visible.map((r) => ({
        id: r.id,
        title: r.title,
        className: classNameOf.get(r.classId) ?? null,
        kind: isPdf.has(r.id) ? "PDF" : (r.format ?? "Activity"),
        forLearners: audienceOf(r)?.length ?? 0,
        createdAt: r.createdAt,
      })),
    };
  },
});
