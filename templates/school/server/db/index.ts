import * as schema from "./schema.js";
import { createGetDb } from "@agent-native/core/db";
import { registerShareableResource } from "@agent-native/core/sharing";

export const getDb = createGetDb(schema);
export { schema };

registerShareableResource({
  type: "subject",
  resourceTable: schema.subjects,
  sharesTable: schema.subjectShares,
  displayName: "Subject",
  titleColumn: "name",
  getDb,
});

registerShareableResource({
  type: "lesson_note",
  resourceTable: schema.lessonNotes,
  sharesTable: schema.lessonNoteShares,
  displayName: "Lesson Note",
  titleColumn: "title",
  getDb,
});

registerShareableResource({
  type: "assessment",
  resourceTable: schema.assessments,
  sharesTable: schema.assessmentShares,
  displayName: "Assessment",
  titleColumn: "title",
  getDb,
});

registerShareableResource({
  type: "submission",
  resourceTable: schema.submissions,
  sharesTable: schema.submissionShares,
  displayName: "Submission",
  getDb,
});
