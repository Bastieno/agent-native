/**
 * What a school must have in place before each part of the app is worth
 * opening.
 *
 * A school with no year groups has nothing for a curriculum, a class or a
 * timetable to hang on, so those screens would only show empty states and give
 * the assistant nothing to work with. Each screen names its own prerequisites,
 * so a school is never asked for more than the screen needs, and nothing here
 * is a stored flag: it is worked out from what exists, and a screen opens by
 * itself the moment its prerequisites are met.
 */

export type ReadinessFacts = {
  yearGroups: boolean;
  terms: boolean;
  schoolWeek: boolean;
  classes: boolean;
};

export type Need = keyof ReadinessFacts;

/** What each step is called, and what to say to the assistant to do it. */
export const NEEDS: Record<
  Need,
  { label: string; ask: string; opens: string }
> = {
  yearGroups: {
    label: "Year groups",
    ask: "Set up my school's year groups",
    opens: "Opens Classes and Curriculum",
  },
  terms: {
    label: "Terms for this academic year",
    ask: "Set up this academic year's terms",
    opens: "Opens the Calendar",
  },
  schoolWeek: {
    label: "The school week and its periods",
    ask: "Set up my school week and periods",
    opens: "Opens the Timetable",
  },
  classes: {
    label: "At least one class",
    ask: "Create my school's classes",
    opens: "Opens Lesson notes and Analytics",
  },
};

/** The order a school does them in. */
export const NEED_ORDER: Need[] = [
  "yearGroups",
  "terms",
  "schoolWeek",
  "classes",
];

/**
 * The screens that wait for something, by the start of their path. A screen
 * not listed is always open: the overview, people, announcements, settings and
 * the pages where setup itself is done.
 */
const AREAS: {
  prefix: string;
  label: string;
  needs: Need[];
  /** What the page is for, shown while it waits. */
  blurb: string;
}[] = [
  {
    prefix: "/admin/curriculum",
    label: "Curriculum",
    needs: ["yearGroups", "terms"],
    blurb: "What each subject teaches, term by term.",
  },
  {
    prefix: "/admin/calendar",
    label: "Calendar",
    needs: ["yearGroups", "terms"],
    blurb: "What each year group covers, week by week.",
  },
  {
    prefix: "/admin/classes",
    label: "Classes",
    needs: ["yearGroups"],
    blurb: "Every class, its teacher and its learners.",
  },
  {
    prefix: "/admin/timetable",
    label: "Timetable",
    needs: ["yearGroups", "terms", "schoolWeek", "classes"],
    blurb: "A weekly grid of every lesson, by class, teacher or room.",
  },
  {
    prefix: "/admin/lessons",
    label: "Lesson notes",
    needs: ["classes"],
    blurb: "Which classes have their lesson notes ready.",
  },
  {
    prefix: "/admin/analytics",
    label: "Analytics",
    needs: ["classes"],
    blurb: "How learners and classes are doing.",
  },
  {
    prefix: "/teacher/week",
    label: "My Week",
    needs: ["classes"],
    blurb: "Your lessons for the week.",
  },
  {
    prefix: "/teacher/classes",
    label: "My Classes",
    needs: ["classes"],
    blurb: "Your classes and their learners.",
  },
  {
    prefix: "/teacher/gradebook",
    label: "Gradebook",
    needs: ["classes"],
    blurb: "Marks for a class.",
  },
  {
    prefix: "/teacher/curriculum",
    label: "Curriculum",
    needs: ["yearGroups", "terms"],
    blurb: "What you are meant to be teaching.",
  },
  {
    prefix: "/teacher/analytics",
    label: "Analytics",
    needs: ["classes"],
    blurb: "How your learners are doing.",
  },
];

function areaFor(path: string) {
  const clean = path.split("?")[0].replace(/\/$/, "");
  return AREAS.find(
    (a) => clean === a.prefix || clean.startsWith(`${a.prefix}/`),
  );
}

/**
 * What is missing for a page, in the order to do it. Empty when the page is
 * open, or is not one that waits.
 */
export function missingFor(path: string, facts: ReadinessFacts): Need[] {
  const area = areaFor(path);
  if (!area) return [];
  return NEED_ORDER.filter((n) => area.needs.includes(n) && !facts[n]);
}

export function areaBlurb(path: string): string | null {
  return areaFor(path)?.blurb ?? null;
}

export function areaLabel(path: string): string | null {
  return areaFor(path)?.label ?? null;
}

/** Whether a page is one that can wait for setup at all. */
export function isGated(path: string): boolean {
  return !!areaFor(path);
}

/**
 * Actions that only work once their page's first steps are done, by the page
 * they belong to. The assistant and a connected AI app get the same answer the
 * menu gives a person: set up first. Setup itself (year groups, terms, the
 * school week, classes) is never in this list.
 */
export const ACTION_PAGE: Record<string, string> = {
  "get-timetable": "/admin/timetable",
  "generate-timetable": "/admin/timetable",
  "set-timetable-period": "/admin/timetable",
  "remove-timetable-period": "/admin/timetable",
  "accept-timetable-proposal": "/admin/timetable",
  "copy-timetable": "/admin/timetable",
  "start-curriculum-draft": "/admin/curriculum",
  "update-curriculum-draft": "/admin/curriculum",
  "commit-curriculum-draft": "/admin/curriculum",
  "generate-scheme-of-work": "/admin/curriculum",
  "copy-curriculum-forward": "/admin/curriculum",
  "get-curriculum-calendar": "/admin/calendar",
  "plan-lesson-notes": "/admin/lessons",
  "create-lesson-note": "/admin/lessons",
  "get-lesson-note-coverage": "/admin/lessons",
};

/** The first step still to do, or null when all are done. */
export function nextStep(facts: ReadinessFacts): Need | null {
  return NEED_ORDER.find((n) => !facts[n]) ?? null;
}

/** "2 of 4 first steps done", for a line under any setup result. */
export function progressSummary(facts: ReadinessFacts): string {
  const done = NEED_ORDER.filter((n) => facts[n]).length;
  return `${done} of ${NEED_ORDER.length} first steps done`;
}

/**
 * The checklist as plain text, the same steps the Overview page shows, so an
 * assistant in someone's own AI app can show it as given: ticks for what is
 * done, the next step marked, and what each step opens.
 */
export function checklistText(facts: ReadinessFacts): string {
  const next = nextStep(facts);
  return NEED_ORDER.map((n) => {
    const mark = facts[n] ? "✓" : "○";
    const tail = facts[n]
      ? ""
      : `${n === next ? " (next)" : ""} — ${NEEDS[n].opens.replace(/^Opens /, "opens ")}`;
    // A markdown list: single line breaks would run the steps together into one
    // paragraph wherever this is shown.
    return `- ${mark} ${NEEDS[n].label}${tail}`;
  }).join("\n");
}

/** Actions whose result carries where the school stands (`setupProgress`). */
export const SETUP_ACTIONS = new Set([
  "setup-school",
  "manage-grade-levels",
  "create-academic-year",
  "create-term",
  "update-school-config",
  "create-class",
]);
