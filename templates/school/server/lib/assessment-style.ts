import { getDb, schema } from "../db/index.js";
import { and, eq } from "drizzle-orm";
import {
  parseStyle,
  styleGuidance,
  paperGuidance,
  type PaperShape,
} from "../../shared/assessment-style.js";

/**
 * The style a class's questions should follow, if its subject has one.
 *
 * Looked up from the class because that is what a teacher names — "set my
 * JSS1 Basic Science a worksheet" — while the style belongs to the subject.
 * Null when nothing is set, which is a legitimate answer and not a failure:
 * a school that wants no house habits gets questions written without them.
 */
export async function styleForSubject(subjectId: string, orgId: string) {
  const db = getDb();
  const [subject] = await db
    .select({
      styleId: schema.subjects.assessmentStyleId,
      name: schema.subjects.name,
    })
    .from(schema.subjects)
    .where(
      and(
        eq(schema.subjects.id, subjectId),
        eq(schema.subjects.schoolId, orgId),
      ),
    )
    .limit(1);
  if (!subject) throw new Error("Subject not found in this school.");
  return describe(subject.styleId, subject.name);
}

export async function styleForClass(classId: string, orgId: string) {
  const db = getDb();
  const [row] = await db
    .select({
      styleId: schema.subjects.assessmentStyleId,
      subjectName: schema.subjects.name,
    })
    .from(schema.classes)
    .leftJoin(schema.subjects, eq(schema.subjects.id, schema.classes.subjectId))
    .where(and(eq(schema.classes.id, classId), eq(schema.classes.orgId, orgId)))
    .limit(1);
  return describe(row?.styleId ?? null, row?.subjectName ?? null);
}

/** The style as guidance, or a plain null when the subject has none. */
async function describe(styleId: string | null, subjectName: string | null) {
  const db = getDb();
  if (!styleId) return { style: null, subjectName };

  const [style] = await db
    .select()
    .from(schema.assessmentStyles)
    .where(eq(schema.assessmentStyles.id, styleId))
    .limit(1);
  if (!style) return { style: null, subjectName };

  const item = parseStyle(style.itemStyleJson);
  let shape: PaperShape | null = null;
  try {
    shape = style.paperShapeJson ? JSON.parse(style.paperShapeJson) : null;
  } catch {
    shape = null;
  }

  return {
    subjectName,
    style: {
      id: style.id,
      name: style.name,
      isSample: !!style.isSample,
      derivedFrom: style.derivedFrom,
      guidance: styleGuidance(style.name, item, { isSample: !!style.isSample }),
      paperShape: paperGuidance(style.name, shape),
    },
  };
}
