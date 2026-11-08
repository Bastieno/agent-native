import { buildDeepLink, getRequestContext } from "@agent-native/core/server";
import { currentAccess } from "@agent-native/core/sharing";
import { actorForEmail } from "./class-access.js";
import { helpRoleOf } from "../../shared/capabilities.js";

/**
 * Links from an answer to the page that shows the same thing.
 *
 * When the assistant (the school's own, or someone's Claude or ChatGPT) says
 * something about a learner, a class, a paper or a lesson note, the person
 * should be able to open it. This is the one place that knows where each kind
 * of thing lives, for each role, so an action never builds an address by hand
 * and a new action gets links by adding one line to `VIEW_LINKS`.
 *
 * Every linked result carries `path` (and `url`, absolute when the request
 * came from outside the app, which is the only time an address is needed). The
 * assistant is told to give those and never to make one up.
 */

export type ViewKind =
  | "student"
  | "class"
  | "gradebook"
  | "assessment"
  | "lessonNote"
  | "classNotes"
  | "lessonNotesList"
  | "staff"
  | "subjectCurriculum"
  | "classesList"
  | "studentsList"
  | "curriculumList"
  | "analytics"
  | "timetable"
  | "week";

type Area = "admin" | "teacher" | "student";

/** The page for a kind of thing, or null when this role has no such page. */
export function viewPath(
  area: Area | null,
  kind: ViewKind,
  id?: string | null,
  query?: Record<string, string>,
): string | null {
  if (!area) return null;
  const withQuery = (path: string, extra?: Record<string, string>) => {
    const q = new URLSearchParams({ ...(query ?? {}), ...(extra ?? {}) });
    const text = q.toString();
    return text ? `${path}?${text}` : path;
  };
  // A learner can open only what is theirs: a lesson's page.
  if (area === "student") {
    return kind === "lessonNote" && id ? `/student/lessons/${id}` : null;
  }
  const base = `/${area}`;
  const needsId = [
    "student",
    "class",
    "gradebook",
    "assessment",
    "lessonNote",
    "classNotes",
    "staff",
    "subjectCurriculum",
  ] as ViewKind[];
  if (needsId.includes(kind) && !id) return null;
  switch (kind) {
    case "student":
      return `${base}/students/${id}`;
    case "class":
      return `${base}/classes/${id}`;
    case "gradebook":
      // A teacher has a gradebook page; an admin reads it from the class.
      return area === "teacher"
        ? `/teacher/gradebook/${id}`
        : `/admin/classes/${id}`;
    case "assessment":
      return `${base}/assessments/${id}`;
    case "lessonNote":
      return `${base}/lessons/${id}`;
    case "classNotes":
      return area === "admin"
        ? withQuery("/admin/lessons", { classId: id! })
        : `/teacher/classes/${id}`;
    case "lessonNotesList":
      return area === "admin" ? withQuery("/admin/lessons") : null;
    case "staff":
      return area === "admin" ? `/admin/staff/${id}` : null;
    case "subjectCurriculum":
      return area === "admin" ? `/admin/curriculum/${id}` : null;
    case "classesList":
      return `${base}/classes`;
    case "studentsList":
      return `${base}/students`;
    case "curriculumList":
      return `${base}/curriculum`;
    case "analytics":
      return `${base}/analytics`;
    case "timetable":
      return area === "admin" ? "/admin/timetable" : null;
    case "week":
      return area === "teacher" ? "/teacher/week" : null;
  }
}

type Linker = (
  kind: ViewKind,
  id?: string | null,
  query?: Record<string, string>,
  label?: string,
) => { path: string; url: string; openLink: string } | null;

/** What to call a thing in its link: its name, title or class name. */
function nameOf(value: any): string | undefined {
  const v = value?.learner ?? value?.subject ?? value;
  const text = v?.name ?? v?.title ?? v?.className ?? value?.className;
  return typeof text === "string" && text.trim() ? text.trim() : undefined;
}

type Ctx = { args: any; result: any; link: Linker };

/** How an action's result gets its links. Returns the result, with links added. */
type Spec = (ctx: Ctx) => any;

/** The whole result is one thing: a learner's profile, a class. */
const one =
  (kind: ViewKind, id: (args: any, result: any) => string | undefined): Spec =>
  ({ args, result, link }) => {
    const l = link(kind, id(args, result), undefined, nameOf(result));
    return l && result && typeof result === "object" && !Array.isArray(result)
      ? { ...result, ...l }
      : result;
  };

/** Each row of a list is a thing. `from` picks the list out of the result. */
const rows =
  (kind: ViewKind, id: (row: any) => string | undefined, from?: string): Spec =>
  ({ result, link }) => {
    const add = (list: any[]) =>
      list.map((row) => {
        const l =
          row && typeof row === "object"
            ? link(kind, id(row), undefined, nameOf(row))
            : null;
        return l ? { ...row, ...l } : row;
      });
    if (Array.isArray(result)) return add(result);
    if (from && result && Array.isArray(result[from])) {
      return { ...result, [from]: add(result[from]) };
    }
    return result;
  };

/** Several of the above over one result. */
const both =
  (...specs: Spec[]): Spec =>
  (ctx) =>
    specs.reduce((result, spec) => spec({ ...ctx, result }), ctx.result);

/**
 * Which actions give links, and for what. Reading an action's result is all
 * this does; it never changes what an action does or who may call it.
 */
export const VIEW_LINKS: Record<string, Spec> = {
  "get-student-profile": one("student", (a) => a.studentId),
  "get-student-performance": one("student", (a) => a.studentId),
  "list-students": rows("student", (r) => r.id),
  "get-class": one("class", (a) => a.classId),
  "get-class-profile": one("class", (a) => a.classId),
  "get-class-performance": one("class", (a) => a.classId),
  "list-classes": rows("class", (r) => r.id),
  "get-gradebook": both(
    one("gradebook", (a) => a.classId),
    rows("student", (r) => r.studentId, "students"),
  ),
  "identify-struggling-students": both(
    one("class", (a) => a.classId),
    rows("student", (r) => r.studentId, "students"),
  ),
  "get-assessment": one("assessment", (a) => a.id),
  "list-assessments": rows("assessment", (r) => r.id),
  "get-lesson-note": one("lessonNote", (a) => a.id),
  "list-lesson-notes": rows("lessonNote", (r) => r.id),
  "get-lesson-note-coverage": ({ result, link }) => {
    const list = link(
      "lessonNotesList",
      undefined,
      undefined,
      "Open lesson notes",
    );
    const withRows = rows(
      "classNotes",
      (r) => r.classId,
      "classes",
    )({
      result,
      link,
      args: {},
    });
    return list && withRows && typeof withRows === "object"
      ? { ...withRows, ...list }
      : withRows;
  },
  "get-student": one("student", (a) => a.id),
  "list-my-students": rows("student", (r) => r.studentId),
  "list-class-students": rows("student", (r) => r.studentId),
  "get-subject": one("subjectCurriculum", (a) => a.id),
  "list-subjects": rows("subjectCurriculum", (r) => r.id),
  // A paper's views and what is said about it all open the paper.
  "get-submission": one("assessment", (_a, r) => r?.assessmentId),
  "list-submissions": one("assessment", (a) => a.assessmentId),
  "get-marking-queue": one("assessment", (a) => a.assessmentId),
  "get-paper-profile": one("assessment", (a) => a.assessmentId),
  "get-assessment-analytics": one("assessment", (a) => a.assessmentId),
  "get-answer-insights": one("assessment", (a) => a.assessmentId),
  "get-card-difficulty": one("assessment", (a) => a.assessmentId),
  "get-print-material": one("assessment", (a) => a.assessmentId),
  "get-school-analytics": one("analytics", () => undefined),
  "get-my-analytics": one("analytics", () => undefined),
  "get-timetable": one("timetable", () => undefined),
  "get-timetable-coverage": one("timetable", () => undefined),
  "get-timetable-proposal": one("timetable", () => undefined),
  "get-curriculum-coverage": one("curriculumList", () => undefined),
  "get-curriculum-calendar": one("curriculumList", () => undefined),
  "get-my-week": one("week", () => undefined),
  "get-teacher-profile": one("staff", (a) => a.userId),
  "list-staff": rows("staff", (r) => r.userId, "active"),
  "get-subject-curriculum": one("subjectCurriculum", (a) => a.subjectId),
  // The overview's lines each point at the page that fixes them.
  "get-school-attention": ({ result, link }) => {
    if (!result || !Array.isArray(result.items)) return result;
    const where: Record<string, ViewKind> = {
      classes: "classesList",
      curriculum: "curriculumList",
      "lesson notes": "lessonNotesList",
      students: "studentsList",
    };
    return {
      ...result,
      items: result.items.map((item: any) => {
        const kind = where[item.page];
        const l = kind
          ? link(
              kind,
              undefined,
              item.show ? { show: item.show } : undefined,
              "Open the list",
            )
          : null;
        return l ? { ...item, ...l } : item;
      }),
    };
  },
};

/**
 * Read actions that give no link, and why. A read action is in `VIEW_LINKS` or
 * here: a new one is not left without a decision (test/view-links.check.ts).
 */
const SETUP = "a setting or setup read: no page shows it on its own";
const MINE = "a learner's own view: a learner has no page for it to open";
const LINKED = "carries its own links";
const ROWS = "rows of curriculum or setup with no page of their own";
export const NO_VIEW_LINK: Record<string, string> = {
  "check-school-setup": SETUP,
  "check-student-records": SETUP,
  "draft-school-guide": SETUP,
  "get-assessment-style": SETUP,
  "get-current-term": SETUP,
  "get-custom-fields-schema": SETUP,
  "get-extension-audience": SETUP,
  "get-help": "help text",
  "get-my-agent-access": SETUP,
  "get-school-config": SETUP,
  "get-school-credit": SETUP,
  "get-school-guidance": "guidance for the assistant",
  "get-school-library": SETUP,
  "get-school-resource": SETUP,
  "get-school-stats": "counts for the overview",
  "get-school-usage": SETUP,
  "get-school": SETUP,
  "get-syllabus-import": SETUP,
  "get-curriculum-draft": "a draft the assistant is building",
  "list-curriculum-drafts": "drafts the assistant is building",
  "list-style-imports": SETUP,
  "list-syllabus-imports": SETUP,
  "list-assessment-styles": SETUP,
  "list-connected-apps": SETUP,
  "list-password-resets": SETUP,
  "list-student-invites": SETUP,
  "list-academic-years": SETUP,
  "list-arms": SETUP,
  "list-departments": SETUP,
  "list-grade-levels": SETUP,
  "list-terms": SETUP,
  "list-framework-objectives": ROWS,
  "list-learning-objectives": ROWS,
  "list-units": ROWS,
  "list-lesson-resources": ROWS,
  "list-variants": "versions of a paper, returned as a bare list",
  "list-my-notifications": "notifications carry their own links",
  "list-my-drafts": LINKED,
  "get-my-attention": LINKED,
  "get-report-card": LINKED,
  "get-my-assessment": MINE,
  "get-my-assessments": MINE,
  "get-my-class": MINE,
  "get-my-classes": MINE,
  "get-my-grades": MINE,
  "get-my-profile": MINE,
  "get-my-progress": MINE,
  "get-my-submission": MINE,
  "get-my-term-grades": MINE,
};

/** The area of the app the signed-in person works in. */
async function areaOfCaller(): Promise<Area | null> {
  const { userEmail } = currentAccess();
  if (!userEmail) return null;
  const actor = await actorForEmail(userEmail);
  return helpRoleOf(actor?.schoolRole) as Area | null;
}

/** Wrap the actions that have a `VIEW_LINKS` entry so their results carry links. */
export function withViewLinks<T extends Record<string, any>>(actions: T): T {
  const out: Record<string, any> = {};
  for (const [name, entry] of Object.entries(actions)) {
    const spec = VIEW_LINKS[name];
    if (!spec || !entry || typeof entry.run !== "function") {
      out[name] = entry;
      continue;
    }
    out[name] = {
      ...entry,
      run: async (args: any, ctx: any) => {
        const result = await entry.run(args, ctx);
        try {
          const area = await areaOfCaller();
          // An address is needed only from outside the app, where a bare path
          // opens nothing.
          const origin = getRequestContext()?.requestOrigin?.replace(
            /\/+$/,
            "",
          );
          const link: Linker = (kind, id, query, label) => {
            const path = viewPath(area, kind, id, query);
            if (!path) return null;
            const url = `${origin ?? ""}${path}`;
            return {
              path,
              url,
              // Ready to paste: the assistant writes this as it is.
              openLink: `[${label ?? "Open in the app"}](${url})`,
            };
          };
          return spec({ args, result, link });
        } catch {
          // A link is a convenience; never lose the answer for want of one.
          return result;
        }
      },
      // Someone's own Claude shows this as "Open in the app".
      link: ({ result }: { result: any }) => {
        const url: string | undefined = result?.url ?? result?.path;
        if (!url) return null;
        return {
          url: buildDeepLink({
            app: "school",
            view: "open",
            params: {},
            to: result.path ?? url,
          }),
          label: "Open in the app",
          view: "open",
        };
      },
    };
  }
  return out as T;
}
