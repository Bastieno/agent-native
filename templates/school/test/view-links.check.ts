/**
 * Links from answers to pages: every address the helper can make is a real
 * page, every linked action exists, and results get the right links.
 * Run: pnpm exec tsx test/view-links.check.ts
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  NO_VIEW_LINK,
  VIEW_LINKS,
  viewPath,
  type ViewKind,
} from "../server/lib/view-links.js";

let failures = 0;
function ok(cond: boolean, label: string) {
  if (!cond) failures++;
  console.log(`  ${cond ? "ok  " : "FAIL"}  ${label}`);
}

// Route files -> regexes, the way React Router reads them.
const routes = readdirSync(join(import.meta.dirname, "../app/routes"))
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""));
const routeRegexes = routes.map((name) => {
  const parts = name
    .split(".")
    .map((p) => p.replace(/_$/, ""))
    .filter((p) => p !== "_index" && !p.startsWith("_"))
    .map((p) => (p.startsWith("$") ? "[^/]+" : p));
  return new RegExp(`^/${parts.join("/")}$`);
});
const isPage = (path: string) =>
  routeRegexes.some((r) => r.test(path.split("?")[0]));

const kinds: ViewKind[] = [
  "student",
  "class",
  "gradebook",
  "assessment",
  "lessonNote",
  "classNotes",
  "lessonNotesList",
  "staff",
  "subjectCurriculum",
  "classesList",
  "studentsList",
  "curriculumList",
  "analytics",
  "timetable",
  "week",
];
for (const area of ["admin", "teacher", "student"] as const) {
  for (const kind of kinds) {
    const path = viewPath(area, kind, "abc123", { show: "notready" });
    if (path) ok(isPage(path), `${area} ${kind} -> ${path} is a page`);
  }
}
ok(
  viewPath("student", "student", "abc") === null,
  "a learner gets no student page",
);
ok(
  viewPath("teacher", "staff", "abc") === null,
  "a teacher gets no staff page",
);
ok(viewPath(null, "class", "abc") === null, "no role, no link");
ok(viewPath("admin", "student", undefined) === null, "no id, no link");

// Every linked action exists.
for (const name of Object.keys(VIEW_LINKS)) {
  ok(
    existsSync(join(import.meta.dirname, `../actions/${name}.ts`)),
    `action ${name} exists`,
  );
}

// Every read action is linked or says why not, so a new one is not forgotten.
import { readFileSync } from "node:fs";
const actionsDir = join(import.meta.dirname, "../actions");
const reads = readdirSync(actionsDir)
  .filter((f) => f.endsWith(".ts"))
  .filter((f) =>
    readFileSync(join(actionsDir, f), "utf8").includes('method: "GET"'),
  )
  .map((f) => f.replace(/\.ts$/, ""));
const undecided = reads.filter(
  (n) => !(n in VIEW_LINKS) && !(n in NO_VIEW_LINK),
);
ok(
  undecided.length === 0,
  `every read action is linked or exempt (undecided: ${undecided.join(", ") || "none"})`,
);
const stale = Object.keys(NO_VIEW_LINK).filter((n) => !reads.includes(n));
ok(
  stale.length === 0,
  `exemptions name real read actions (stale: ${stale.join(", ") || "none"})`,
);
ok(
  Object.keys(NO_VIEW_LINK).every((n) => !(n in VIEW_LINKS)),
  "no action is both linked and exempt",
);

// Results get links.
const link = (
  kind: ViewKind,
  id?: string | null,
  query?: Record<string, string>,
) => {
  const path = viewPath("admin", kind, id, query);
  return path
    ? {
        path,
        url: `https://x.test${path}`,
        openLink: `[x](https://x.test${path})`,
      }
    : null;
};
const run = (name: string, args: any, result: any) =>
  VIEW_LINKS[name]({ args, result, link });

const student = run(
  "get-student-performance",
  { studentId: "s1" },
  { name: "A" },
);
ok(
  student.path === "/admin/students/s1",
  "a student's result links to the student",
);

const list = run("list-students", {}, [{ id: "s1" }, { id: "s2" }]);
ok(
  list[0].url === "https://x.test/admin/students/s1" &&
    list[1].path === "/admin/students/s2",
  "each learner in a list gets a link",
);

const gradebook = run(
  "get-gradebook",
  { classId: "c1" },
  {
    students: [{ studentId: "s9" }],
  },
);
ok(
  gradebook.path === "/admin/classes/c1" &&
    gradebook.students[0].path === "/admin/students/s9",
  "a gradebook links to the class and to each learner",
);

const attention = run(
  "get-school-attention",
  {},
  {
    items: [
      { page: "lesson notes", show: "notready" },
      { page: "students" },
      { page: "unknown" },
    ],
  },
);
ok(
  attention.items[0].path === "/admin/lessons?show=notready" &&
    attention.items[1].path === "/admin/students" &&
    attention.items[2].path === undefined,
  "attention lines link to the page that fixes them, and unknown ones are left alone",
);

const coverage = run(
  "get-lesson-note-coverage",
  {},
  {
    classes: [{ classId: "c7" }],
  },
);
ok(
  coverage.path === "/admin/lessons" &&
    coverage.classes[0].path === "/admin/lessons?classId=c7",
  "coverage links to the list and to each class's notes",
);

ok(
  run("get-class", { classId: "c1" }, null) === null,
  "a null result stays null",
);

console.log(failures ? `\n${failures} failed` : "\nall passed");
process.exit(failures ? 1 : 0);
