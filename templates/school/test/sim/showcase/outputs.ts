import { join } from "node:path";
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { TEST_PASSWORD } from "../client.js";
import { asList } from "../shapes.js";
import { inPool } from "../pool.js";
import { profileWord } from "./people.js";
import { DECISION_AREAS, learnersOf, type ShowcaseRun } from "./context.js";
import type { PieceResult } from "./teaching.js";

/**
 * What the owner gets: the checklist (read back from the app, not from what
 * the run believes it did), the roster, the decisions file and a guide to
 * where each feature can be seen.
 */

export type ChecklistRow = {
  area: string;
  mustShow: string;
  ok: boolean;
  evidence: string;
};

const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
const spread = (xs: number[]) => {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
};

/** Everything on the spec's checklist, asked of the app as the right person. */
export async function checklist(
  run: ShowcaseRun,
  pieces: PieceResult[],
): Promise<ChecklistRow[]> {
  const { client, admin } = run;
  const rows: ChecklistRow[] = [];
  const row = (area: string, mustShow: string, ok: boolean, evidence: string) =>
    rows.push({ area, mustShow, ok, evidence });

  // Setup and settings
  const setup = await client.as(admin, "check-school-setup", {});
  const gaps = asList(setup?.gaps ?? []).map((g: any) => String(g.setting));
  const allowed = gaps.filter((g) => /^Assessment style/.test(g));
  run.record.setupGaps = setup?.gaps ?? [];
  row(
    "Setup and settings",
    "All settings filled, with setup checks clear",
    gaps.length === allowed.length,
    gaps.length ? `only deliberately unset: ${gaps.join("; ")}` : "no gaps",
  );

  // Staff and learners
  const staff = asList(await client.as(admin, "list-staff", {}), "active");
  const pending = asList(
    (await client.as(admin, "list-staff", {}))?.pending ?? [],
  );
  const arms = asList(await client.as(admin, "list-arms", {}), "arms");
  const roll = asList(
    await client.as(admin, "list-students", { limit: 500 }),
    "students",
  );
  const fullArms = arms.filter(
    (a: any) => a.learnerCount === run.scenario.studentsPerArm,
  );
  row(
    "Staff and learners",
    "Invitations accepted, names correct, arms with learners",
    staff.length === run.staff.length + 1 &&
      pending.length === 0 &&
      roll.length === run.learners.length &&
      fullArms.length === run.arms.length,
    `${staff.length} staff active (${pending.length} pending), ${roll.length} learners on the roll, ${fullArms.length} of ${arms.length} arms holding ${run.scenario.studentsPerArm}`,
  );

  // Curriculum
  let schemes = 0;
  let expected = 0;
  for (const yearGroup of run.scenario.yearGroups) {
    const cov = await client.as(admin, "get-curriculum-coverage", {
      gradeLevelId: run.gradeLevelIds[yearGroup],
    });
    const subjects = asList(cov, "subjects");
    expected += new Set(
      run.classes
        .filter((c) => c.yearGroup === yearGroup)
        .map((c) => c.subject.name),
    ).size;
    schemes += subjects.filter((s: any) => (s.units ?? 0) > 0).length;
  }
  const library = await client.as(admin, "list-framework-objectives", {
    framework: "WAEC",
    subject: "Physics",
  });
  row(
    "Curriculum",
    "Schemes for every subject and year group; coverage; library",
    schemes >= expected && library?.found === true,
    `${schemes} of ${expected} subject-year schemes have units; the WAEC and NERDC libraries are read for every scheme`,
  );

  // Lesson notes
  const notes = await client.as(admin, "get-lesson-note-coverage", {
    termId: run.firstTermId,
  });
  const gapsOnly = asList(
    await client.as(admin, "get-lesson-note-coverage", {
      termId: run.firstTermId,
      onlyGaps: true,
    }),
    "classes",
  );
  const history = run.record.lessonNoteHistory as any;
  let reopened = false;
  if (history) {
    const cls = run.classes.find((c) => c.name === history.reopened.className)!;
    const note = await client.as(admin, "get-lesson-note", {
      id: run.notes.get(cls.id)!.get(history.reopened.week)!,
    });
    reopened = JSON.stringify(note).includes('"draft"');
  }
  row(
    "Lesson notes",
    "Weekly notes, readiness per class, an admin edit, a reopened note",
    (notes?.totals?.classes ?? 0) === run.classes.length &&
      gapsOnly.length > 0 &&
      !!history &&
      reopened,
    `${notes?.totals?.classes} classes counted, ${gapsOnly.length} behind; ${history ? `admin wrote in ${history.edited.className} week ${history.edited.week}; ${history.reopened.className} week ${history.reopened.week} reopened` : "no history"}`,
  );

  // Timetable
  const tt = run.record.timetable as any;
  const filled = run.record.weeksFilled as any;
  row(
    "Timetable",
    "Generated and accepted; no clashes; every learner's week and teacher's day filled",
    !!tt &&
      tt.periods > 0 &&
      tt.clashes === 0 &&
      tt.short === 0 &&
      filled?.learners === run.learners.length &&
      filled?.teachers === filled?.teaching,
    tt
      ? `${tt.periods} lessons, ${tt.clashes} clashes, ${tt.short} classes short; ${filled?.learners} learners' and ${filled?.teachers} teachers' weeks filled`
      : "no timetable",
  );

  // Activities: every format, read back from the classes' own lists.
  const formats = new Map<string, number>();
  let timed = 0;
  await inPool(run.classes, 8, async (cls) => {
    for (const a of asList(
      await client.as(cls.teacher, "list-assessments", { classId: cls.id }),
      "assessments",
    )) {
      formats.set(a.format, (formats.get(a.format) ?? 0) + 1);
      if (a.navigation === "linear" && a.durationMinutes) timed++;
    }
  });
  const wanted = [
    "worksheet",
    "quiz",
    "problem set",
    "practical",
    "reading",
    "card deck",
    "examination",
  ];
  const drawings = Number(run.record.drawings ?? 0);
  row(
    "Activities",
    "Every format, quizzes with time limits, practicals, drawings",
    wanted.every((f) => (formats.get(f) ?? 0) > 0) && timed > 0 && drawings > 0,
    `${wanted.map((f) => `${f} ${formats.get(f) ?? 0}`).join(", ")}; ${timed} timed one-at-a-time quizzes; ${drawings} answers with handwritten working`,
  );
  run.record.formats = Object.fromEntries(formats);

  // Marking
  const marked = pieces.reduce((n, p) => n + p.marked, 0);
  const flagged = pieces.reduce((n, p) => n + p.flagged, 0);
  const quiz = pieces.find((p) => p.kind === "quiz" && p.handedIn > 0);
  const quizAnalytics = quiz
    ? await client.as(
        quiz && run.classes.find((c) => c.id === quiz.classId)!.teacher,
        "get-assessment-analytics",
        { assessmentId: quiz.assessmentId },
      )
    : null;
  row(
    "Marking",
    "Auto-marked, AI-marked with evidence, flagged for review, published",
    !!quizAnalytics &&
      quizAnalytics.average != null &&
      marked > 0 &&
      flagged > 0,
    `quizzes mark themselves (${quiz?.className} week ${quiz?.week} averaged ${quizAnalytics?.average}%); ${marked} open answers marked with evidence, ${flagged} flagged for review; every piece published`,
  );

  // Differentiation
  const groups = (run.record.groups ?? {}) as Record<
    string,
    { week: number; groups: Record<string, string> }[]
  >;
  const served = (run.record.served ?? {}) as Record<
    string,
    Record<number, Record<string, number>>
  >;
  const order = { foundational: 0, developing: 1, advanced: 2 } as Record<
    string,
    number
  >;
  let up = 0;
  let down = 0;
  for (const series of Object.values(groups)) {
    if (series.length < 2) continue;
    const first = series[0].groups;
    const last = series[series.length - 1].groups;
    for (const [id, cat] of Object.entries(last)) {
      if (!(id in first)) continue;
      if (order[cat] > order[first[id]]) up++;
      if (order[cat] < order[first[id]]) down++;
    }
  }
  run.record.movement = { up, down };
  const multi = Object.values(served).filter((weeks) =>
    Object.values(weeks).some((s) => Object.keys(s).length > 1),
  ).length;
  row(
    "Differentiation",
    "Groups, variants, assignment, movement over time",
    Object.keys(groups).length > 0 && multi > 0 && up + down > 0,
    `${Object.keys(groups).length} classes grouped ${Object.values(groups)[0]?.length ?? 0} times; ${multi} served more than one standard of paper; ${up} learners moved up and ${down} down between the first and last grouping`,
  );

  // Struggling learners
  const struggling = (run.record.struggling ?? []) as {
    week: number;
    byClass: Record<string, string[]>;
    byYear: Record<string, string[]>;
  }[];
  const last = struggling[struggling.length - 1];
  const years = last
    ? Object.keys(last.byYear).filter((y) => last.byYear[y].length > 0)
    : [];
  row(
    "Struggling learners",
    "Lists per class and year group",
    !!last &&
      Object.values(last.byClass).some((l) => l.length > 0) &&
      years.length === run.scenario.yearGroups.length,
    last
      ? `after week ${last.week}: ${Object.values(last.byClass).filter((l) => l.length).length} classes with someone flagged; ${run.scenario.yearGroups.map((y) => `${y} ${last.byYear[y]?.length ?? 0}`).join(", ")} (a year group's list is everyone flagged in at least a third of their classes)`
      : "never listed",
  );

  // Analytics
  const school = await client.as(admin, "get-school-analytics", {});
  const classAverages: number[] = [];
  for (const cls of run.classes.filter((_, i) => i % 7 === 0)) {
    const perf = await client.as(cls.teacher, "get-class-performance", {
      classId: cls.id,
    });
    const marks = asList(perf?.assessmentStats ?? [])
      .filter((a: any) => a.averageScore != null)
      .map((a: any) => Number(a.averageScore))
      .filter((n: number) => Number.isFinite(n));
    if (marks.length) classAverages.push(mean(marks));
  }
  const sample = run.learners[0];
  const student = await client.as(admin, "get-student-performance", {
    studentId: sample.studentId,
  });
  const insights = quiz
    ? await client.as(
        run.classes.find((c) => c.id === quiz.classId)!.teacher,
        "get-answer-insights",
        { assessmentId: quiz.assessmentId },
      )
    : null;
  const pieceAverages = pieces
    .map((p) => p.average)
    .filter((a): a is number => a !== null);
  row(
    "Analytics",
    "School, class, learner and paper insights with real spread",
    !!school &&
      classAverages.length > 0 &&
      !!student &&
      !!insights &&
      spread(pieceAverages) > 5,
    `class averages sampled ${classAverages.map((a) => Math.round(a)).join(", ")}; paper averages range ${Math.round(Math.min(...pieceAverages))}–${Math.round(Math.max(...pieceAverages))}% (spread ${spread(pieceAverages).toFixed(1)})`,
  );

  // Gradebook
  const thin: string[] = [];
  await inPool(run.classes, 8, async (cls) => {
    const book = await client.as(cls.teacher, "get-gradebook", {
      classId: cls.id,
    });
    const marked = asList(book?.assessments ?? []).filter(
      (a: any) =>
        (a.totalPoints ?? 0) > 0 && !/Examination/.test(a.title ?? ""),
    ).length;
    if (marked < run.scenario.teachingWeeks.length)
      thin.push(`${cls.name} (${marked})`);
  });
  row(
    "Gradebook",
    "Ten weeks of marks per class",
    thin.length === 0,
    thin.length
      ? `short: ${thin.slice(0, 6).join(", ")}`
      : `every class has ${run.scenario.teachingWeeks.length} weeks of marked work (weeks 1–10, week 7 being mid-term)`,
  );

  // Announcements
  // Asked per scope, with room for a term of them: the default page is 20.
  const schoolWide = asList(
    await client.as(admin, "list-announcements", {
      scope: "school",
      limit: 200,
    }),
    "announcements",
  ).length;
  const perClass = asList(
    await client.as(admin, "list-announcements", {
      scope: "class",
      limit: 500,
    }),
    "announcements",
  ).length;
  row(
    "Announcements",
    "School-wide and per class",
    schoolWide > 0 && perClass > 0,
    `${schoolWide} school-wide, ${perClass} to a class`,
  );

  // Exams: set, sat, marked and published.
  const papers = (run.record.examPapers ?? []) as {
    className: string;
    assessmentId: string;
  }[];
  const learner = run.learners.find((l) => l.yearGroup === "SS2")!;
  const grades = asList(
    await client.as(learner, "get-my-grades", {}),
    "grades",
  ).filter((g: any) => /Examination/.test(g.assessmentTitle ?? ""));
  row(
    "Exams",
    "Sat, marked and published for week 12",
    papers.length === run.classes.length && grades.length > 0,
    `${papers.length} papers; ${learner.profile.name} has ${grades.length} examination marks`,
  );

  const cards = Number(run.record.reportCards ?? 0);
  row(
    "Report cards",
    "One issued for every learner",
    cards === run.learners.length,
    `${cards} of ${run.learners.length}`,
  );

  const open = run.record.leftOpen as
    | {
        className: string;
        handedIn: number;
        started: number;
        notStarted: number;
      }
    | undefined;
  row(
    "Work left open",
    "One class's last piece handed in by some, started by some, not opened by others, unmarked",
    !!open && open.handedIn > 0 && open.started > 0 && open.notStarted > 0,
    open
      ? `${open.className}: ${open.handedIn} handed in, ${open.started} started, ${open.notStarted} not started`
      : "none",
  );

  return rows;
}

// ── Files ────────────────────────────────────────────────────────────────

function roster(run: ShowcaseRun) {
  const md: string[] = [];
  const csv: string[] = [
    "role,name,email,year_group,arm,stream,option,profile,subjects,classes,form_arm",
  ];
  const q = (s: string) => `"${s.replace(/"/g, '""')}"`;
  md.push(`# ${run.scenario.schoolName}, ${run.scenario.city} — who is who`);
  md.push("");
  md.push(
    `Run \`${run.runId}\`. Everyone signs in at ${run.client.baseUrl} with their email and the shared password **${TEST_PASSWORD}**.`,
  );
  md.push("");
  md.push(
    "These are local test accounts on the local dev server. Do not reuse the password anywhere real, and do not publish this file.",
  );
  md.push("");
  md.push("## Admin and coordinators");
  md.push("");
  md.push("| Name | Role | Email |");
  md.push("| --- | --- | --- |");
  md.push(
    `| ${run.scenario.principal} | Principal (admin) | ${run.admin.email} |`,
  );
  csv.push(
    [
      "admin",
      q(run.scenario.principal),
      run.admin.email,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ].join(","),
  );
  for (const s of run.staff.filter(
    (s) => s.schoolRole === "subject_coordinator",
  )) {
    md.push(`| ${s.name} | Coordinator, ${s.heads} | ${s.email} |`);
  }
  md.push("");
  md.push("## Teachers");
  md.push("");
  md.push(
    "| Name | Email | Subjects | Classes (primary) | Supports | Form arm |",
  );
  md.push("| --- | --- | --- | --- | --- | --- |");
  for (const s of run.staff) {
    const lead = run.classes.filter((c) => c.teacher.key === s.key);
    const support = run.classes.filter((c) =>
      c.support.some((h) => h.key === s.key),
    );
    const subjects = [
      ...new Set([...lead, ...support].map((c) => c.subject.name)),
    ];
    const form = run.arms.find((a) => a.formTeacher?.key === s.key)?.name ?? "";
    md.push(
      `| ${s.name}${s.schoolRole === "subject_coordinator" ? " (coordinator)" : ""} | ${s.email} | ${subjects.join(", ")} | ${lead.map((c) => c.name).join(", ") || "—"} | ${support.map((c) => c.name).join(", ") || "—"} | ${form || "—"} |`,
    );
    csv.push(
      [
        s.schoolRole === "subject_coordinator" ? "coordinator" : "teacher",
        q(s.name),
        s.email,
        "",
        "",
        "",
        "",
        "",
        q(subjects.join("; ")),
        q(
          [
            ...lead.map((c) => c.name),
            ...support.map((c) => `${c.name} (support)`),
          ].join("; "),
        ),
        form,
      ].join(","),
    );
  }
  md.push("");
  md.push("## Learners");
  md.push("");
  md.push(
    "Profile is the ability the run gave each learner, which the app never sees. Use it to pick someone interesting to sign in as.",
  );
  for (const arm of run.arms) {
    md.push("");
    md.push(
      `### ${arm.name}${arm.stream ? ` (${arm.stream})` : ""} — form teacher ${arm.formTeacher?.name ?? "none"}`,
    );
    md.push("");
    md.push("| Name | Email | Option | Profile |");
    md.push("| --- | --- | --- | --- |");
    for (const l of run.learners.filter((l) => l.arm === arm.name)) {
      const word = profileWord(l.profile.ability);
      const note =
        l.profile.diligence < 0.6 ? `${word}, often misses work` : word;
      md.push(
        `| ${l.profile.name} | ${l.email} | ${l.option ?? "—"} | ${note} |`,
      );
      csv.push(
        [
          "learner",
          q(l.profile.name),
          l.email,
          l.yearGroup,
          l.arm,
          arm.stream ?? "",
          l.option ?? "",
          note,
          "",
          "",
          "",
        ].join(","),
      );
    }
  }
  return { md: md.join("\n"), csv: csv.join("\n") };
}

function decisionsFile(run: ShowcaseRun) {
  const lines = [
    `# ${run.scenario.schoolName} — every setting and choice the run made`,
    "",
    `Run \`${run.runId}\`. What the app decided for itself (the timetable draft, the groups, who is struggling) is reported as the app's; everything else here was chosen by the run, from docs/showcase-school-spec.md.`,
  ];
  for (const area of DECISION_AREAS) {
    const entries = run.decisions.entries.filter((e) => e.area === area);
    if (!entries.length) continue;
    lines.push("", `## ${area}`, "");
    for (const e of entries) lines.push(`- **${e.what}:** ${e.value}`);
  }
  return lines.join("\n");
}

/** Someone's sign-in address, from the people the run made. */
function emailOf(run: ShowcaseRun, name: string): string {
  if (name === run.scenario.principal) return run.admin.email;
  return (
    run.staff.find((s) => s.name === name)?.email ??
    run.learners.find((l) => l.profile.name === name)?.email ??
    ""
  );
}

function whereToLook(run: ShowcaseRun) {
  const struggling = (run.record.struggling as any[])?.at(-1);
  const strugglingClass = struggling
    ? Object.entries(struggling.byClass as Record<string, string[]>).sort(
        (a, b) => b[1].length - a[1].length,
      )[0]?.[0]
    : undefined;
  const sc =
    run.classes.find((c) => c.name === strugglingClass) ?? run.classes[0];
  const diff = run.classes.find(
    (c) =>
      c.arm?.name === run.scenario.differentiationClasses[0].arm &&
      c.subject.name === run.scenario.differentiationClasses[0].subject,
  )!;
  const strong = [...learnersOf(run, diff)].sort(
    (a, b) => b.profile.ability - a.profile.ability,
  )[0];
  const weak = [...learnersOf(run, diff)].sort(
    (a, b) => a.profile.ability - b.profile.ability,
  )[0];
  const physics = run.classes.find((c) => c.subject.lab)!;
  const behind = run.classes.find(
    (c) => c.arm?.name === run.scenario.behindOnNotes.arms[1],
  )!;
  const ss2 = run.learners.find(
    (l) => l.yearGroup === "SS2" && l.option === "Further Mathematics",
  )!;
  const history = run.record.lessonNoteHistory as any;
  const byAbility = (arm: string) =>
    run.learners
      .filter((l) => l.arm === arm)
      .sort((a, b) => b.profile.ability - a.profile.ability);
  const strongSs1 = byAbility("SS1A")[0];
  const jss2 = byAbility(run.scenario.leftOpen.arm);
  const middling = jss2[Math.floor(jss2.length / 2)];
  const ss2b = byAbility("SS2B");
  const struggler = ss2b[ss2b.length - 1];
  const openClass = run.classes.find(
    (c) =>
      c.arm?.name === run.scenario.leftOpen.arm &&
      c.subject.name === run.scenario.leftOpen.subject,
  )!;
  const t = (name: string) => `**${name}**`;
  const rows: [string, string, string][] = [
    [
      "Settings, the week, rooms, grading",
      t(`${run.scenario.principal} (principal)`),
      "Settings (/admin/settings)",
    ],
    [
      "Staff, roles and invitations",
      t(run.scenario.principal),
      "Staff (/admin/staff)",
    ],
    [
      "Learners and arms",
      t(run.scenario.principal),
      "Students (/admin/students), Classes → Arms (/admin/classes)",
    ],
    [
      "Curriculum, schemes and coverage",
      t(run.scenario.principal),
      "Curriculum (/admin/curriculum); the libraries at Curriculum → What we plan from",
    ],
    [
      "Lesson-note readiness, who is behind",
      t(run.scenario.principal),
      `Lesson notes (/admin/lessons): ${behind.name} and the other ${run.scenario.behindOnNotes.arms.join(" and ")} classes are behind from week ${run.scenario.behindOnNotes.fromWeek}`,
    ],
    [
      "A note the admin wrote and one reopened",
      `${t(run.scenario.principal)}, then ${t(history?.reopened?.teacher ?? "")}`,
      history
        ? `${history.edited.className} week ${history.edited.week}; ${history.reopened.className} week ${history.reopened.week}`
        : "",
    ],
    [
      "The timetable, generated and accepted",
      t(run.scenario.principal),
      "Timetable (/admin/timetable); filter by arm, teacher or room (try the Physics Lab)",
    ],
    [
      "A teacher's day and week",
      t(physics.teacher.name),
      "Dashboard (/teacher) and the week view",
    ],
    ["A learner's week", t(ss2.profile.name), "My week (/student/week)"],
    [
      "Every kind of activity",
      t(physics.teacher.name),
      `${physics.name} → its lessons and activities (/teacher/classes): worksheets, quizzes, problem sets, practicals, readings, card decks`,
    ],
    [
      "Marking with evidence and flagged marks",
      t(sc.teacher.name),
      `${sc.name} → an activity → marking`,
    ],
    [
      "Differentiation and movement between groups",
      t(diff.teacher.name),
      `${diff.name}: weeks ${run.scenario.differentiationWeeks.join(", ")} worksheets, and Students (/teacher/students) for groups`,
    ],
    [
      "The same paper from both sides",
      `${t(strong.profile.name)} and ${t(weak.profile.name)}`,
      `${diff.name}, a differentiated worksheet: each sees only their own paper`,
    ],
    [
      "Struggling learners",
      t(sc.teacher.name),
      `Analytics (/teacher/analytics); ${sc.name} has the most flagged`,
    ],
    [
      "School-wide analytics",
      t(run.scenario.principal),
      "Analytics (/admin/analytics)",
    ],
    [
      "Gradebook",
      t(sc.teacher.name),
      `Gradebook for ${sc.name} (/teacher/gradebook/…)`,
    ],
    [
      "Announcements",
      "anyone",
      "Announcements; the exam timetable is the latest school-wide one",
    ],
    [
      "An examination, sat and marked",
      `${t(physics.teacher.name)}, then ${t(ss2.profile.name)}`,
      "the class's \"First Term Examination\": marking on the teacher's side, the returned paper on the learner's",
    ],
    [
      "Report cards",
      t(run.scenario.principal),
      "a learner's record (/admin/students) → their First Term report card",
    ],
    [
      "Work still open",
      `${t(openClass.teacher.name)}, then ${t(middling.profile.name)}`,
      `${openClass.name}, week ${run.scenario.leftOpen.week}: handed in, started and not started, none of it marked`,
    ],
  ];
  const sciences = run.staff.find((s) => s.heads === "Sciences");
  const people: [string, string, string][] = [
    [
      "Principal (admin)",
      run.scenario.principal,
      "settings, staff, arms, timetable, lesson-note readiness, school analytics, report cards",
    ],
    [
      "Sciences coordinator",
      sciences?.name ?? "",
      "curriculum and coverage for the department, notes behind",
    ],
    [
      `${physics.name} teacher`,
      physics.teacher.name,
      "day and week, lessons, marking with flagged marks, gradebook, class analytics",
    ],
    [
      `${diff.name} teacher`,
      diff.teacher.name,
      "groups, three-level papers, movement between groups, struggling list",
    ],
    [
      `${behind.name} teacher`,
      behind.teacher.name,
      "notes left in draft, the principal's cover note",
    ],
    [
      `Strong learner, ${strongSs1.arm}`,
      strongSs1.profile.name,
      "full marks, model answers, a strong report card",
    ],
    [
      `Middling learner, ${middling.arm}`,
      middling.profile.name,
      "partial answers and feedback, work still open",
    ],
    [
      `Struggling learner, ${struggler.arm}`,
      struggler.profile.name,
      "low marks, work missed and counted as zero",
    ],
    [
      `Further Mathematics learner, ${ss2.arm}`,
      ss2.profile.name,
      "the option block in their week",
    ],
  ];
  return [
    `# Where to look — ${run.scenario.schoolName}`,
    "",
    `Sign in at ${run.client.baseUrl} with the email in school-roster.md and the shared password **${TEST_PASSWORD}**. Run \`${run.runId}\`.`,
    "",
    "## Who to sign in as",
    "",
    "The same people every run.",
    "",
    "| Who | Name | Email | Shows |",
    "| --- | --- | --- | --- |",
    ...people.map(
      ([who, name, shows]) =>
        `| ${who} | ${name} | ${emailOf(run, name)} | ${shows} |`,
    ),
    "",
    "## Where each feature is",
    "",
    "| To see | Sign in as | Open |",
    "| --- | --- | --- |",
    ...rows.map((r) => `| ${r.join(" | ")} |`),
    "",
    "## Review checklist",
    "",
    "- [ ] Principal: settings, staff, arms, timetable (by arm, teacher and room), lesson-note readiness, school analytics, announcements, report cards",
    "- [ ] Coordinator: curriculum coverage, notes behind",
    "- [ ] Teacher: today, the week, a lesson note, a reading, a quiz, a practical, marking with flagged marks, a gradebook, class analytics, groups and three-level papers",
    "- [ ] Learner, each ability: dashboard, My week, work still open, a returned paper with answers, marks, feedback and model answers, My Grades",
    "- [ ] An examination from both sides, and a report card",
  ].join("\n");
}

export async function writeOutputs(
  run: ShowcaseRun,
  rows: ChecklistRow[],
  timings: Record<string, number>,
) {
  const dir = join("test-runs", `showcase-${run.runId}`);
  await mkdir(dir, { recursive: true });
  const { md, csv } = roster(run);
  const files: Record<string, string> = {
    "school-roster.md": md,
    "school-roster.csv": csv,
    "school-decisions.md": decisionsFile(run),
    "where-to-look.md": whereToLook(run),
  };
  const report = [
    `# ${run.scenario.schoolName} — showcase run ${run.runId}`,
    "",
    "## Checklist",
    "",
    "| Area | Must show | | Evidence |",
    "| --- | --- | --- | --- |",
    ...rows.map(
      (r) =>
        `| ${r.area} | ${r.mustShow} | ${r.ok ? "yes" : "**EMPTY**"} | ${r.evidence} |`,
    ),
    "",
    "## Time",
    "",
    ...Object.entries(timings).map(([k, v]) => `- ${k}: ${v.toFixed(1)}s`),
    "",
    "## Findings",
    "",
    ...(run.findings.all.length
      ? run.findings.all.map(
          (f) =>
            `- [${f.severity}] **${f.what}** — _${f.phase}_${f.detail ? `: ${f.detail}` : ""}`,
        )
      : ["Nothing to report: every expectation held."]),
    "",
    `_School id ${run.schoolId}, left in place._`,
  ].join("\n");
  files["report.md"] = report;
  for (const [name, content] of Object.entries(files))
    await writeFile(join(dir, name), content);
  await writeFile(
    join(dir, "findings.json"),
    JSON.stringify(run.findings.all, null, 2),
  );
  await writeFile(
    join(dir, "calls.json"),
    JSON.stringify(run.client.calls, null, 2),
  );
  await writeFile(
    join(dir, "record.json"),
    JSON.stringify(run.record, null, 2),
  );

  // The owner's copy, beside the spec.
  const out = join("docs", "showcase");
  await mkdir(out, { recursive: true });
  for (const name of [
    "school-roster.md",
    "school-roster.csv",
    "school-decisions.md",
    "where-to-look.md",
    "report.md",
  ]) {
    await copyFile(join(dir, name), join(out, name));
  }
  return dir;
}
