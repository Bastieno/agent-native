import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

/**
 * Create a piece of work for a class — a worksheet, a reading task, a problem
 * set, a practical write-up, whatever the subject calls for.
 *
 * The teaching content is written by the agent, not by this action. Nothing
 * here decides that Physics gets a practical and History gets a source
 * analysis: that judgement belongs to the agent reading the week's objectives,
 * the school's own activity blueprints, and the teacher's request. This action
 * persists what it is given and enforces the rules — one activity, its
 * variants, its rubric, its timing — so the same shape appears in the UI and
 * over MCP.
 *
 * `format` is deliberately free text. A school that runs "recitation" or
 * "WAEC practical write-up" should never need a code change to name it.
 */
export default defineAction({
  description:
    "Create an activity for a class: any piece of work a learner does — worksheet, reading, problem set, essay, practical, oral. You supply the content (instructions, questions, optional difficulty variants, optional rubric); this records it with its objectives, timing and marking mode. Read the week's objectives and the school's activity blueprints first, then draft. Preview by default; pass confirm=true to create.",
  schema: z.object({
    classId: z.string().describe("Class this is for"),
    title: z
      .string()
      .describe(
        "What the learner sees, e.g. 'Week 5: Solving linear equations'",
      ),
    format: z
      .string()
      .describe(
        "What kind of work this is, in the school's own words — 'worksheet', 'reading', 'problem set', 'practical write-up', 'recitation'. Take it from the school's activity blueprints where one fits.",
      ),
    unitId: z
      .string()
      .optional()
      .describe(
        "Curriculum unit this belongs to — sets the objectives when they are not given explicitly",
      ),
    objectives: z
      .array(z.string())
      .optional()
      .describe(
        "The learning objectives this work is meant to move. Defaults to the unit's objectives. These carry through to the rubric, the marking and the report comment.",
      ),
    instructions: z
      .string()
      .optional()
      .describe("What the learner should do, in markdown"),
    content: z
      .string()
      .optional()
      .describe(
        "The work itself — questions, the passage to read, the task — in markdown. Use `variants` instead when differentiating.",
      ),
    variants: z
      .array(
        z.object({
          label: z.string(),
          difficulty: z.enum(["advanced", "developing", "foundational"]),
          content: z.string(),
          instructions: z.string().optional(),
          totalPoints: z.coerce.number().optional(),
        }),
      )
      .optional()
      .describe(
        "Differentiated versions. Learners never see which they were given.",
      ),
    rubric: z
      .array(
        z.object({
          description: z.string().describe("What is being judged"),
          maxPoints: z.coerce.number(),
        }),
      )
      .optional()
      .describe(
        "How the work is marked. Write criteria against the objectives, so marking and feedback speak the same language as the curriculum.",
      ),
    responseMode: z
      .string()
      .optional()
      .describe(
        "How the learner responds: 'typed', 'upload', or 'none' for reading with nothing to hand in. Defaults to typed, or none when there is no rubric and no points.",
      ),
    gradingMode: z
      .string()
      .optional()
      .describe(
        "'rubric', 'points', or 'none' for practice that carries no marks",
      ),
    // Coerced, not plain numbers: these arrive as strings from the CLI
    // (`--durationMinutes 30`) as well as numbers from the agent and the UI.
    totalPoints: z.coerce.number().optional(),
    durationMinutes: z.coerce
      .number()
      .optional()
      .describe("Time allowed once a learner starts, e.g. 30"),
    opensAt: z
      .string()
      .optional()
      .describe("ISO date/time it becomes available"),
    closesAt: z
      .string()
      .optional()
      .describe("ISO date/time after which work can no longer be handed in"),
    dueDate: z.string().optional().describe("YYYY-MM-DD shown to learners"),
    publish: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Publish immediately, or leave as a draft for the teacher to review",
      ),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("false returns a preview; true creates it"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [cls] = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.id, args.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!cls) throw new Error("Class not found.");

    // Objectives come from the unit unless the caller names them.
    let objectives = args.objectives ?? [];
    if (objectives.length === 0 && args.unitId) {
      const rows = await db
        .select({ description: schema.learningObjectives.description })
        .from(schema.learningObjectives)
        .where(eq(schema.learningObjectives.unitId, args.unitId))
        .orderBy(asc(schema.learningObjectives.sequence));
      objectives = rows.map((r: any) => r.description);
    }

    const gradingMode =
      args.gradingMode ??
      (args.rubric?.length ? "rubric" : args.totalPoints ? "points" : "none");
    const responseMode =
      args.responseMode ?? (gradingMode === "none" ? "none" : "typed");
    const totalPoints =
      args.totalPoints ??
      args.rubric?.reduce((sum, c) => sum + c.maxPoints, 0) ??
      (gradingMode === "none" ? 0 : 100);

    const preview = {
      class: cls.name,
      title: args.title,
      format: args.format,
      objectives,
      objectiveCount: objectives.length,
      variants: args.variants?.length ?? (args.content ? 1 : 0),
      rubricCriteria: args.rubric?.length ?? 0,
      totalPoints,
      gradingMode,
      responseMode,
      durationMinutes: args.durationMinutes ?? null,
      opensAt: args.opensAt ?? null,
      closesAt: args.closesAt ?? null,
      dueDate: args.dueDate ?? null,
      willPublish: !!args.publish,
    };

    if (!args.confirm) {
      return {
        preview: true,
        ...preview,
        message: `Ready to create "${args.title}" (${args.format}) for ${cls.name}${
          objectives.length
            ? `, covering ${objectives.length} objective(s)`
            : ""
        }. Re-run with confirm=true to create it.`,
      };
    }

    const assessmentId = nanoid();
    await db.insert(schema.assessments).values({
      id: assessmentId,
      classId: args.classId,
      unitId: args.unitId ?? null,
      title: args.title,
      description: args.instructions ?? null,
      assessmentType: args.format,
      format: args.format,
      responseMode,
      gradingMode,
      opensAt: args.opensAt ?? null,
      closesAt: args.closesAt ?? null,
      durationMinutes: args.durationMinutes ?? null,
      objectivesJson: JSON.stringify(objectives),
      dueDate: args.dueDate ?? null,
      totalPoints,
      status: args.publish ? "published" : "draft",
      ownerEmail: userEmail ?? "",
      orgId,
      visibility: "org" as const,
    });

    // Either differentiated versions, or a single one holding the work.
    const variants = args.variants?.length
      ? args.variants
      : args.content
        ? [
            {
              label: "All learners",
              difficulty: "developing" as const,
              content: args.content,
              instructions: args.instructions,
              totalPoints,
            },
          ]
        : [];
    let position = 0;
    for (const v of variants) {
      await db.insert(schema.assessmentVariants).values({
        id: nanoid(),
        assessmentId,
        difficulty: v.difficulty,
        label: v.label,
        content: v.content,
        instructions: v.instructions ?? args.instructions ?? null,
        totalPoints: v.totalPoints ?? totalPoints,
        position: position++,
      });
    }

    if (args.rubric?.length) {
      const rubricId = nanoid();
      await db.insert(schema.rubrics).values({
        id: rubricId,
        assessmentId,
        title: `${args.title} — marking criteria`,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
      let seq = 1;
      for (const c of args.rubric) {
        await db.insert(schema.rubricCriteria).values({
          id: nanoid(),
          rubricId,
          description: c.description,
          maxPoints: c.maxPoints,
          sequence: seq++,
        });
      }
    }

    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      preview: false,
      ...preview,
      assessmentId,
      status: args.publish ? "published" : "draft",
      message: `Created "${args.title}" for ${cls.name}${
        args.publish ? " and published it" : " as a draft"
      }.`,
    };
  },
});
