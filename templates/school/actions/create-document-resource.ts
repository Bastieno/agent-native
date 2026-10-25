import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { buildDeepLink } from "@agent-native/core/server";
import { getDb, schema } from "../server/db/index.js";
import {
  MAX_DOCUMENT_BYTES,
  brandPdf,
  brandingFor,
} from "../server/lib/document-resource.js";
import { jsonish } from "../shared/zod-json.js";
import { actorForEmail } from "../server/lib/class-access.js";
import { getUserLabels, labelFor } from "../server/lib/user-names.js";

/**
 * A finished PDF, set as learning material for a class or for named learners.
 *
 * The PDF is made elsewhere — by the teacher's own AI app, from a reference
 * document and the week's objectives — and this takes it in. The school's
 * crest, name and a footer are drawn on every page, the file is stored, and
 * it waits as a draft until the teacher has read it and publishes it. Nothing
 * is marked and nothing is handed in, so no figure anywhere counts it.
 */
export default defineAction({
  description:
    "Add a finished PDF as learning material for a class (or for named learners only). Send the whole PDF as base64 in `pdfBase64`. The school's crest, name and a footer are stamped on every page, and it is saved as a DRAFT for the teacher to open, read and publish: never publish it yourself unless the teacher said to. Make the PDF yourself first: read the reference pages as images (text extraction scrambles maths), write it fresh in your own words, redraw diagrams cleanly, and never copy another school's pages or watermark. Keep it to one topic and under 12 MB. When the handout is for a particular week, pass lessonNoteId (list-lesson-notes gives the ids) so it appears under that week's 'What your class sees', where the teacher and the class look; without one it is listed under 'Handouts and other material'. Preview by default; pass confirm=true to save.",
  schema: z.object({
    classId: z.string().describe("Class this is for"),
    title: z.string().describe("What the learner sees, e.g. 'Matrices'"),
    pdfBase64: z
      .string()
      .describe("The whole PDF file, base64-encoded (no data: prefix)"),
    fileName: z
      .string()
      .optional()
      .describe("File name to download as, e.g. 'matrices.pdf'"),
    unitId: z.string().optional().describe("Curriculum unit it belongs to"),
    lessonNoteId: z
      .string()
      .optional()
      .describe("The week's lesson, so it appears under that week"),
    objectives: jsonish(z.array(z.string()))
      .optional()
      .describe("The learning objectives it covers"),
    studentIds: jsonish(z.array(z.string()))
      .optional()
      .describe(
        "Make it for these learners only (student record ids). Omit for the whole class.",
      ),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("false returns a preview; true saves the draft"),
  }),
  http: { method: "POST" },
  /**
   * The person reading this in their own AI app needs somewhere to go: a link
   * that opens the draft in the school app, where they are already signed in.
   */
  link: ({ result }) => {
    const r = result as
      | { assessmentId?: string; openPath?: string }
      | undefined;
    if (!r?.assessmentId || !r.openPath) return null;
    return {
      url: buildDeepLink({
        app: "school",
        view: "assessment",
        params: { assessmentId: r.assessmentId },
        to: r.openPath,
      }),
      label: "Open the draft to read and share it",
      view: "assessment",
    };
  },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [cls] = await db
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        subjectName: schema.subjects.name,
        gradeName: schema.gradeLevels.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.subjects.id, schema.classes.subjectId),
      )
      .leftJoin(
        schema.gradeLevels,
        eq(schema.gradeLevels.id, schema.classes.gradeLevelId),
      )
      .where(
        and(
          eq(schema.classes.id, args.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!cls) throw new Error("Class not found.");

    // Who it is for, checked the same way as work made for named learners.
    const audienceIds = [...new Set(args.studentIds ?? [])];
    let audienceNames: string[] = [];
    if (args.studentIds) {
      if (audienceIds.length === 0) {
        throw new Error("Name at least one learner, or leave studentIds out.");
      }
      const rows = await db
        .select({ id: schema.students.id, userId: schema.students.userId })
        .from(schema.students)
        .where(
          and(
            inArray(schema.students.id, audienceIds),
            eq(schema.students.schoolId, orgId),
          ),
        );
      const enrolled = await db
        .select({ userId: schema.classEnrollments.studentUserId })
        .from(schema.classEnrollments)
        .where(
          and(
            eq(schema.classEnrollments.classId, args.classId),
            eq(schema.classEnrollments.status, "active"),
          ),
        );
      const inClass = new Set(enrolled.map((e: any) => e.userId));
      const missing = audienceIds.filter(
        (id) => !rows.some((r: any) => r.id === id && inClass.has(r.userId)),
      );
      if (missing.length) {
        throw new Error(
          `${missing.length} of those learners are not in ${cls.name}, so it cannot be made for them.`,
        );
      }
      const labels = await getUserLabels(rows.map((r: any) => r.userId));
      audienceNames = rows.map(
        (r: any) => labelFor(labels, r.userId) ?? "A learner",
      );
    }

    // base64 is a third bigger than the file; refuse before decoding.
    if (args.pdfBase64.length > Math.ceil((MAX_DOCUMENT_BYTES * 4) / 3) + 16) {
      throw new Error(
        `That file is over ${MAX_DOCUMENT_BYTES / 1048576} MB. Send fewer pages, or lower the image quality.`,
      );
    }
    const raw = Buffer.from(
      args.pdfBase64.replace(/^data:application\/pdf;base64,/, ""),
      "base64",
    );
    const { crest, schoolName } = await brandingFor(orgId);
    const footerText = [cls.gradeName, cls.subjectName ?? cls.name, args.title]
      .filter(Boolean)
      .join(" | ");
    const branded = await brandPdf(
      new Uint8Array(raw),
      { schoolName, footerText },
      crest,
    );

    const fileName =
      (args.fileName ?? `${args.title}.pdf`)
        .replace(/[^\w .()-]+/g, "")
        .replace(/\.pdf$/i, "")
        .trim()
        .slice(0, 80) + ".pdf";

    const preview = {
      class: cls.name,
      title: args.title,
      forLearners: args.studentIds ? audienceNames : null,
      pages: branded.pageCount,
      sizeMB: Number((branded.bytes.byteLength / 1048576).toFixed(2)),
      branding: {
        school: schoolName,
        crest: crest ? "stamped on every page" : "none set (name only)",
        footer: footerText,
      },
    };
    if (!args.confirm) {
      return {
        preview: true,
        ...preview,
        message: `Ready to save "${args.title}" (${branded.pageCount} pages) for ${args.studentIds ? audienceNames.join(", ") : cls.name} as a draft. Re-run with confirm=true to save it; the teacher publishes it after reading it.`,
      };
    }

    const assessmentId = nanoid();
    await db.insert(schema.assessments).values({
      id: assessmentId,
      classId: args.classId,
      unitId: args.unitId ?? null,
      lessonNoteId: args.lessonNoteId ?? null,
      title: args.title,
      description: null,
      assessmentType: "document",
      format: "document",
      responseMode: "none",
      gradingMode: "none",
      objectivesJson: JSON.stringify(args.objectives ?? []),
      renderAs: "prose",
      totalPoints: 0,
      status: "draft",
      audienceStudentIdsJson: args.studentIds
        ? JSON.stringify(audienceIds)
        : null,
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });
    await db.insert(schema.documentFiles).values({
      id: nanoid(),
      assessmentId,
      orgId,
      version: 1,
      fileName,
      byteSize: branded.bytes.byteLength,
      pageCount: branded.pageCount,
      dataBase64: Buffer.from(branded.bytes).toString("base64"),
      createdBy: userEmail ?? null,
    });
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      preview: false,
      ...preview,
      assessmentId,
      // Where the draft opens, for this person's own portal.
      openPath: `/${
        (await actorForEmail(userEmail ?? ""))?.schoolRole === "school_admin"
          ? "admin"
          : "teacher"
      }/assessments/${assessmentId}`,
      status: "draft",
      message: `Saved "${args.title}" for ${args.studentIds ? audienceNames.join(", ") : cls.name} as a draft. The teacher finds it on the class page under Lessons, in 'Handouts and other material' (or under the week, if it was attached to one), and publishes it once they have read it.`,
    };
  },
});
