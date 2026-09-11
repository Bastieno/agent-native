import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { z } from "zod";

export default defineAction({
  description:
    "Navigate the UI to a specific view. One-shot: the entry is deleted after the UI processes it.",
  schema: z.object({
    view: z
      .string()
      .describe(
        "The view to navigate to. Admin: overview, curriculum, curriculum-setup, staff, students, classes, analytics, settings, extensions. Teacher: dashboard, classes, class, unit, lesson, assessment, gradebook, students, analytics. Student: dashboard, classes, class, assessment, submission, grades, progress.",
      ),
    classId: z
      .string()
      .optional()
      .describe("Class ID for class/lesson/assessment/gradebook views"),
    subjectId: z.string().optional().describe("Subject ID for curriculum view"),
    unitId: z.string().optional().describe("Unit ID for unit/lesson views"),
    lessonId: z.string().optional().describe("Lesson note ID for lesson view"),
    assessmentId: z
      .string()
      .optional()
      .describe("Assessment ID for assessment view"),
    variantId: z
      .string()
      .optional()
      .describe("Variant ID to focus in assessment view"),
    studentId: z
      .string()
      .optional()
      .describe("Student ID for student profile view"),
    staffUserId: z
      .string()
      .optional()
      .describe("Staff user ID for staff profile view"),
    curriculumDraftId: z
      .string()
      .optional()
      .describe("Curriculum draft ID for curriculum-setup view"),
    submissionId: z
      .string()
      .optional()
      .describe("Submission ID for student submission view"),
  }),
  http: false,
  run: async (args) => {
    await writeAppState("navigate", args);
    return `Navigating to view: ${args.view}`;
  },
});
