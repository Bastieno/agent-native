import { createError, defineEventHandler, getQuery, getRouterParam } from "h3";
import { eq } from "drizzle-orm";
import { getSession, runWithRequestContext } from "@agent-native/core/server";
import { getDb, schema } from "../../../../db/index.js";
import {
  actorForEmail,
  canAccessClass,
  studentRecordIdForUser,
} from "../../../../lib/class-access.js";
import { isForLearner } from "../../../../lib/audience.js";
import { SHARED_STATUSES } from "../../../../lib/shared-with-class.js";
import {
  documentBytes,
  documentOf,
} from "../../../../lib/document-resource.js";
import { heldBack } from "../../../../../shared/held-back.js";

/**
 * The PDF set as an activity's learning material, as the file itself.
 *
 * Reached by the activity's id, never by the file's, so every rule that
 * applies to the activity applies here: the caller must be in the class, and a
 * learner sees it only once it is published, open, and meant for them. A
 * draft is the teacher's alone. Anything else is "not found", so a refusal
 * does not confirm that a file exists.
 *
 * `?download=1` asks the browser to save it rather than show it.
 */
export default defineEventHandler(async (event) => {
  const session = await getSession(event);
  const email = session?.email;
  if (!email) throw createError({ statusCode: 401, statusMessage: "Sign in" });

  const actor = await actorForEmail(email);
  if (!actor?.schoolId) throw createError({ statusCode: 404 });
  const assessmentId = getRouterParam(event, "assessmentId") ?? "";

  return runWithRequestContext(
    { userEmail: email, orgId: actor.schoolId },
    async () => {
      const db = getDb();
      const [activity] = await db
        .select()
        .from(schema.assessments)
        .where(eq(schema.assessments.id, assessmentId))
        .limit(1);
      if (!activity || !(await canAccessClass(actor, activity.classId))) {
        throw createError({ statusCode: 404 });
      }

      if (actor.schoolRole === "student") {
        const studentId = await studentRecordIdForUser(actor.userId);
        if (
          !studentId ||
          !SHARED_STATUSES.includes(activity.status) ||
          heldBack(activity) ||
          !isForLearner(activity, studentId)
        ) {
          throw createError({ statusCode: 404 });
        }
      }

      const doc = await documentOf(assessmentId);
      const file = doc ? await documentBytes(assessmentId, doc.id) : null;
      if (!doc || !file) throw createError({ statusCode: 404 });

      const download = !!getQuery(event).download;
      const safeName = file.fileName.replace(/[^\w .()-]+/g, "");
      return new Response(new Uint8Array(file.bytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${safeName}"`,
          "Content-Length": String(file.bytes.byteLength),
          // Changes when a new version replaces it, so the viewer never shows
          // a stale copy, and nobody but the signed-in person keeps one.
          "Cache-Control": "private, no-cache",
          ETag: `"${doc.id}"`,
          "X-Content-Type-Options": "nosniff",
          // A PDF is only ever read here, never allowed to run anything.
          "Content-Security-Policy": "sandbox; default-src 'none'",
        },
      });
    },
  );
});
