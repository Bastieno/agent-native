import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  RENDER_SHAPES,
  type ActivityContent,
} from "../shared/activity-content.js";
import { jsonish } from "../shared/zod-json.js";
import { withCardIds } from "../shared/card-key.js";
import { styleForClass } from "../server/lib/assessment-style.js";

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
/**
 * Where this draft departs from how the subject is usually done here.
 *
 * Said, not enforced: a teacher may well want a 10-minute quiz in a subject
 * whose usual activity runs 40, and a blueprint is a description of habits
 * rather than a rule. But it should be a decision, not an oversight.
 */
function blueprintNotes(
  blueprint: any,
  args: { format?: string; durationMinutes?: number; gradingMode?: string },
  subjectName?: string | null,
): string[] {
  if (!blueprint) return [];
  const notes: string[] = [];
  const formats: string[] = Array.isArray(blueprint.formats)
    ? blueprint.formats
    : [];
  if (args.format && formats.length && !formats.includes(args.format)) {
    notes.push(
      `${subjectName ?? "This subject"} usually sets ${formats.join(", ")} here; "${args.format}" is not one of them.`,
    );
  }
  if (
    typeof blueprint.typicalDurationMinutes === "number" &&
    typeof args.durationMinutes === "number" &&
    args.durationMinutes !== blueprint.typicalDurationMinutes
  ) {
    notes.push(
      `${subjectName ?? "This subject"}'s work usually runs ${blueprint.typicalDurationMinutes} minutes; this one is ${args.durationMinutes}.`,
    );
  }
  if (
    blueprint.gradingMode &&
    args.gradingMode &&
    args.gradingMode !== blueprint.gradingMode
  ) {
    notes.push(
      `It is usually marked by ${blueprint.gradingMode} here; this one is set to ${args.gradingMode}.`,
    );
  }
  return notes;
}

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
    lessonNoteId: z
      .string()
      .optional()
      .describe(
        "The week's lesson this belongs to. Set it whenever the work is for a particular week — it is what makes the material appear under that lesson, for the teacher now and the class once published. A unit id cannot say which of its weeks this is for.",
      ),
    objectives: jsonish(z.array(z.string()))
      .optional()
      .describe(
        "The learning objectives this work is meant to move. Defaults to the unit's objectives. These carry through to the rubric, the marking and the report comment.",
      ),
    instructions: z
      .string()
      .optional()
      .describe("What the learner should do, in markdown"),
    renderAs: z
      .enum(RENDER_SHAPES)
      .optional()
      .describe(
        "How the work displays: 'questions' (worksheet, problem set, discussion prompts), 'cards' (flashcards, vocabulary), 'table' (compare/contrast, formula reference, timeline), 'steps' (practical, procedure), 'criteria' (marking grid), or 'prose' (reading, notes). Take it from the school's blueprint for this format. Omit for prose.",
      ),
    blocks: jsonish(z.array(z.record(z.string(), z.any())))
      .optional()
      .describe(
        "The structured body, matching renderAs. questions: {prompt, points?, hint?, options?, answerSpace?, durationSeconds?, answer?, acceptableAnswers?, markScheme?} — `answer` makes a question mark itself (the option index/letter for a choice, or the value); `markScheme` says what earns each mark on an open question and is never shown to a learner. cards: {front, back, hint?}. steps: {text, note?}. table: {cells:[...]} with `columns` set. criteria: {description, maxPoints?}. Also write `content` as markdown — it is the fallback and the print view.",
      ),
    columns: jsonish(z.array(z.string()))
      .optional()
      .describe("Column headings — renderAs 'table' only"),
    content: z
      .string()
      .optional()
      .describe(
        "The work itself in markdown — always write this, even when `blocks` is given: it is the fallback renderer and the print view. Use `variants` instead when differentiating.",
      ),
    variants: jsonish(
      z.array(
        z.object({
          label: z.string(),
          // "custom" belongs here too: it is what the column documents,
          // what create-variant accepts, and what the app itself writes for
          // a one-variant activity like a reading page. Leaving it out meant
          // the action refused material the app creates daily.
          difficulty: z.enum([
            "advanced",
            "developing",
            "foundational",
            "custom",
          ]),
          content: z.string(),
          blocks: z.array(z.record(z.string(), z.any())).optional(),
          columns: z.array(z.string()).optional(),
          instructions: z.string().optional(),
          totalPoints: z.coerce.number().optional(),
        }),
      ),
    )
      .optional()
      .describe(
        "Differentiated versions. Learners never see which they were given.",
      ),
    rubric: jsonish(
      z.array(
        z.object({
          description: z.string().describe("What is being judged"),
          maxPoints: z.coerce.number(),
        }),
      ),
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
    navigation: z
      .enum(["linear", "free"])
      .optional()
      .describe(
        "'linear' serves one question at a time with no going back, which is what makes per-question time limits mean anything. 'free' shows the whole paper. Default free.",
      ),
    instantFeedback: z.coerce
      .boolean()
      .optional()
      .describe(
        "Tell the learner right or wrong as they go. Leave off for anything that carries marks — it turns an assessment into a practice drill.",
      ),
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
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        subjectName: schema.subjects.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.subjects.id, schema.classes.subjectId),
      )
      .where(
        and(
          eq(schema.classes.id, args.classId),
          eq(schema.classes.orgId, orgId),
        ),
      )
      .limit(1);
    if (!cls) throw new Error("Class not found.");

    // What work looks like in this subject here — the kinds of it, how long
    // it usually runs, how it is marked.
    //
    // The drafter was told to go and read this first, which only works if it
    // remembers to. Returning it with the preview means the house style
    // arrives at the moment it is useful: before anything is confirmed, and
    // beside the thing it describes. A 40-minute rubric-marked worksheet is
    // then what the school gets on the first attempt rather than the third.
    const blueprints = (await getOrgSetting(
      orgId,
      "activity-blueprints",
    )) as Record<string, any> | null;
    const blueprint = cls.subjectName
      ? (blueprints?.[cls.subjectName] ?? null)
      : null;

    // How this subject's questions are worded here. Returned with the preview
    // so the drafter sees the house habits before writing anything — the
    // agent previews first by design, which is the moment the style is
    // actually useful. Null when the subject has none.
    const { style: houseStyle } = await styleForClass(args.classId, orgId);

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

    // Marks carried by the questions themselves count. Without this, a paper
    // of questions worth 2, 3 and 5 marks was recorded as unmarked practice:
    // the learner was told there was nothing to hand in, and the gradebook —
    // which rightly hides work that carries no marks — left it out entirely.
    const blockList: any[] = args.blocks?.length
      ? (args.blocks as any[])
      : ((args.variants?.[0] as any)?.blocks ?? []);
    const blockPoints = blockList.reduce(
      (sum, b) => sum + (typeof b?.points === "number" ? b.points : 0),
      0,
    );

    const gradingMode =
      args.gradingMode ??
      (args.rubric?.length
        ? "rubric"
        : args.totalPoints || blockPoints
          ? "points"
          : "none");
    const responseMode =
      args.responseMode ?? (gradingMode === "none" ? "none" : "typed");
    const totalPoints =
      args.totalPoints ??
      args.rubric?.reduce((sum, c) => sum + c.maxPoints, 0) ??
      (blockPoints || (gradingMode === "none" ? 0 : 100));

    const shape = args.renderAs ?? "prose";

    const preview = {
      class: cls.name,
      title: args.title,
      format: args.format,
      renderAs: shape,
      blockCount: args.blocks?.length ?? 0,
      navigation: args.navigation ?? "free",
      instantFeedback: !!args.instantFeedback,
      autoMarkable: (args.blocks ?? []).filter(
        (b: any) => b?.answer !== undefined && b?.answer !== null,
      ).length,
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
      // Named for what it is: this school's answer, not the app's.
      subjectBlueprint: blueprint
        ? {
            subject: cls.subjectName,
            formats: blueprint.formats ?? null,
            defaultFormat: blueprint.defaultFormat ?? null,
            shapeForThisFormat:
              blueprint.formatShapes?.[args.format] ??
              blueprint.renderAs ??
              null,
            typicalDurationMinutes: blueprint.typicalDurationMinutes ?? null,
            gradingMode: blueprint.gradingMode ?? null,
            rubricCriteria: blueprint.rubricCriteria ?? null,
            notes: blueprint.notes ?? null,
          }
        : null,
      houseStyle: houseStyle
        ? {
            name: houseStyle.name,
            isSample: houseStyle.isSample,
            // Wording only. The paper shape is deliberately left out: it
            // describes a mock, and most activities are not one.
            followWhenWritingQuestions: houseStyle.guidance,
          }
        : null,
    };

    if (!args.confirm) {
      return {
        preview: true,
        ...preview,
        message: `${blueprintNotes(blueprint, args, cls.subjectName).join(" ")}${
          blueprintNotes(blueprint, args, cls.subjectName).length ? " " : ""
        }Ready to create "${args.title}" (${args.format}) for ${cls.name}${
          objectives.length
            ? `, covering ${objectives.length} objective(s)`
            : ""
        }.${
          houseStyle
            ? ` ${cls.name} questions are worded like ${houseStyle.name} here — check the content against houseStyle.followWhenWritingQuestions before confirming.`
            : ""
        } Re-run with confirm=true to create it.`,
      };
    }

    const assessmentId = nanoid();
    await db.insert(schema.assessments).values({
      id: assessmentId,
      classId: args.classId,
      unitId: args.unitId ?? null,
      lessonNoteId: args.lessonNoteId ?? null,
      assessmentStyleId: houseStyle?.id ?? null,
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
      renderAs: args.renderAs ?? null,
      navigation: args.navigation ?? null,
      instantFeedback: !!args.instantFeedback,
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
      : args.content || args.blocks?.length
        ? [
            {
              label: "All learners",
              difficulty: "developing" as const,
              content: args.content ?? "",
              blocks: args.blocks,
              columns: args.columns,
              instructions: args.instructions,
              totalPoints,
            },
          ]
        : [];
    let position = 0;
    for (const v of variants) {
      // Structured body when there is one; the markdown is always kept beside
      // it as the fallback renderer and the print view.
      const blocks = (v as { blocks?: unknown[] }).blocks ?? undefined;
      const contentJson: ActivityContent | null = blocks?.length
        ? {
            shape,
            columns: (v as { columns?: string[] }).columns ?? args.columns,
            // A card gets an id at birth, so a learner's record of
            // practising it survives the deck being reordered or added to.
            blocks: withCardIds(
              shape,
              blocks as any[],
            ) as ActivityContent["blocks"],
          }
        : null;

      await db.insert(schema.assessmentVariants).values({
        id: nanoid(),
        assessmentId,
        difficulty: v.difficulty,
        label: v.label,
        content: v.content,
        contentJson: contentJson ? JSON.stringify(contentJson) : null,
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
