import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { nanoid } from "nanoid";
import { z } from "zod";

/**
 * Begin bringing a school's own syllabus into the app.
 *
 * The shipped libraries are samples; a school's real curriculum arrives as a
 * PDF, a scan, or photographs of paper. Reading it takes several turns and
 * cannot be trusted straight into the standards library, so it accumulates in
 * a durable import that someone at the school reads back before committing.
 */
export default defineAction({
  description:
    "Start importing a school's own syllabus from their documents. Creates a durable import to fill in over several turns with update-syllabus-import, review, then commit-syllabus-import. Use this when a school has their own curriculum — the shipped NERDC and WAEC libraries are samples.",
  schema: z.object({
    title: z
      .string()
      .describe('What to call this import, e.g. "JSS Basic Science syllabus"'),
    source: z
      .string()
      .optional()
      .describe(
        "What it is being read from — document name, edition, how it arrived",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const id = nanoid();
    const now = new Date().toISOString();

    await getDb()
      .insert(schema.syllabusImports)
      .values({
        id,
        schoolId: orgId,
        title: args.title,
        source: args.source ?? null,
        stateJson: "{}",
        status: "in_progress",
        createdAt: now,
        updatedAt: now,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });

    await writeAppState(`syllabus-import-${id}`, {
      importId: id,
      title: args.title,
      stateJson: {},
      step: "reading",
    });

    return {
      id,
      title: args.title,
      path: `/admin/curriculum/import?importId=${id}`,
      shape: {
        framework: {
          name: "What the school calls this syllabus",
          version: "",
          source: "",
        },
        subjects: [
          {
            subject: "Subject name as the school says it",
            gradeRange:
              'Which year groups, in the school\'s words — a name, or ["first", "last"] for a span',
            strands: [
              {
                strand: "Theme or strand, if the syllabus has them",
                subStrand: "optional",
                objectives: [
                  {
                    code: "The syllabus's own code, or omit it",
                    description: "What a learner will be able to do",
                    gradeLevel:
                      'optional — one of the school\'s year groups, or ["JSS1", "JSS3"] for a span',
                    source: "Document and page, e.g. 'Scheme 2025, p.14'",
                  },
                ],
              },
            ],
          },
        ],
        unread: ["Anything you could not read — pages, photographs, sections"],
      },
      message:
        "Import started. Send the whole state on each update-syllabus-import call, as it grows. Never invent an objective: list what you could not read under `unread` instead. Keep the syllabus's own codes where it has them; omit the code where it does not and one will be generated and marked as the app's own.",
    };
  },
});
