import type { Client } from "../client.js";
import type { Findings } from "../findings.js";
import { asList, idOf } from "../shapes.js";
import { inPool } from "../pool.js";
import type {
  Showcase,
  SubjectPlan,
} from "../../scenarios/showcase-crestfield.js";
import { makeLearners, staffEmail } from "./people.js";
import {
  Decisions,
  type Learner,
  type ShowcaseArm,
  type ShowcaseClass,
  type ShowcaseRun,
  type StaffMember,
} from "./context.js";

/**
 * Standing the school up, as its principal would: the settings first, then
 * the staff, the arms, the classes and finally the learners, every step
 * through the app's own actions as the person who would take it.
 */

const COLOURS = [
  "#2563EB",
  "#16A34A",
  "#DC2626",
  "#9333EA",
  "#EA580C",
  "#0891B2",
  "#CA8A04",
  "#DB2777",
  "#4F46E5",
  "#059669",
  "#B45309",
  "#7C3AED",
];

/** The school's week, numbered the way its bell sheet is: breaks included. */
function schoolWeek(scenario: Showcase) {
  const numbered = (bells: Showcase["bells"]["full"]) =>
    bells.map((b, i) => ({ number: i + 1, ...b }));
  return {
    cycleLength: 1 as const,
    days: [1, 2, 3, 4, 5].map((day) => ({
      day,
      periods: numbered(
        day === 5 ? scenario.bells.friday : scenario.bells.full,
      ),
    })),
  };
}

/** The subject plan as a year group takes it (SS draws on WAEC). */
export function planFor(
  subject: SubjectPlan,
  yearGroup: string,
  scenario: Showcase,
) {
  const override = yearGroup.startsWith("SS")
    ? scenario.ssOverrides[subject.name]
    : undefined;
  return {
    library: override?.library ?? subject.library,
    periodsPerWeek: override?.periodsPerWeek ?? subject.periodsPerWeek,
    doublesPerWeek: override?.doublesPerWeek ?? subject.doublesPerWeek,
  };
}

export async function buildSchool(
  client: Client,
  scenario: Showcase,
  findings: Findings,
  runId: string,
): Promise<ShowcaseRun> {
  const decisions = new Decisions();
  const domain = `${runId}.crestfield.test`;

  // ── The school and its settings ────────────────────────────────────────
  console.log("· the school and its settings");
  const admin = await client.signUp(
    `principal@${domain}`,
    scenario.principal,
    "admin",
  );
  const created = await client.as(admin, "setup-school", {
    name: scenario.schoolName,
    type: scenario.schoolType,
    country: scenario.country,
  });
  await client.as(admin, "update-person-name", { name: scenario.principal });
  decisions.add("Identity", "Name", `${scenario.schoolName}, ${scenario.city}`);
  decisions.add("Identity", "Type", scenario.schoolType);
  decisions.add(
    "Identity",
    "Country, locale, timezone",
    `${scenario.country}, ${scenario.locale}, ${scenario.timezone}`,
  );
  decisions.add("Identity", "Principal (the admin)", scenario.principal);
  decisions.add(
    "Identity",
    "Paper size for printing",
    scenario.paperSize.toUpperCase(),
  );

  await client.as(admin, "manage-grade-levels", {
    levels: scenario.yearGroups.map((name, i) => ({ name, sequence: i + 1 })),
  });

  const week = schoolWeek(scenario);
  const rooms = [
    ...scenario.arms.map((a) => ({
      name: `${a.name} classroom`,
      kind: "classroom" as const,
    })),
    ...scenario.specialRooms.map((name) => ({
      name,
      kind: "special" as const,
    })),
  ];
  await client.as(admin, "update-school-config", {
    gradePrefix: scenario.gradePrefix,
    termStructure: scenario.termStructure,
    passMark: scenario.passMark,
    gradingScale: scenario.gradingScale,
    locale: scenario.locale,
    schoolTimezone: scenario.timezone,
    paperSize: scenario.paperSize,
    rankLearners: scenario.rankLearners,
    missedWorkPolicy: scenario.missedWorkPolicy,
    customLabels: scenario.customLabels,
    assessmentTerminology: scenario.assessmentTerminology,
    assessmentTerminologyPlural: scenario.assessmentTerminologyPlural,
    reservedWeeks: scenario.reservedWeeks,
    examWeeksPerTerm: scenario.examWeeksPerTerm,
    schoolWeek: week,
    rooms,
    theme: { displayName: scenario.schoolName },
  });

  decisions.add(
    "Grading",
    "Scale",
    `WAEC-style A1–F9 for the whole school: ${scenario.gradingScale.levels.map((l) => `${l.grade} ${l.min}–${l.max}`).join(", ")}`,
  );
  decisions.add("Grading", "Pass mark", `${scenario.passMark}%`);
  decisions.add("Grading", "Missed work", "counts as zero");
  decisions.add("Grading", "Positions on report cards", "shown");
  decisions.add(
    "Terminology",
    "What the school calls things",
    scenario.customLabels,
  );
  decisions.add(
    "Terminology",
    "A piece of work",
    `"${scenario.assessmentTerminology}", plural "${scenario.assessmentTerminologyPlural}"`,
  );
  decisions.add(
    "Terminology",
    "Year groups",
    `${scenario.yearGroups.join(", ")} (prefix "${scenario.gradePrefix}")`,
  );
  decisions.add(
    "Rooms",
    "Classrooms",
    'one per arm, named "<arm> classroom" (12)',
  );
  decisions.add("Rooms", "Special rooms", scenario.specialRooms.join(", "));
  for (const [label, bells] of [
    ["Monday to Thursday", scenario.bells.full],
    ["Friday", scenario.bells.friday],
  ] as const) {
    decisions.add(
      "The week's bells",
      label,
      bells
        .map(
          (b, i) =>
            `${i + 1}. ${b.start}–${b.end} ${b.kind === "break" ? b.label : "lesson"}`,
        )
        .join("; "),
    );
  }
  decisions.add(
    "The week's bells",
    "Lesson periods a week",
    "38 (eight a day Monday to Thursday, six on Friday)",
  );

  const levels = asList(
    await client.as(admin, "manage-grade-levels", { action: "list" }),
    "levels",
    "gradeLevels",
  );
  const gradeLevelIds: Record<string, string> = {};
  for (const level of levels) gradeLevelIds[level.name] = level.id;

  const year = await client.as(admin, "create-academic-year", {
    name: scenario.academicYear.name,
    startDate: scenario.academicYear.start,
    endDate: scenario.academicYear.end,
    setActive: true,
  });
  const academicYearId = idOf(year, "academicYear")!;
  const termIds: Record<string, string> = {};
  for (const [i, term] of scenario.terms.entries()) {
    termIds[term.name] = idOf(
      await client.as(admin, "create-term", {
        academicYearId,
        name: term.name,
        startDate: term.start,
        endDate: term.end,
        sequence: i + 1,
      }),
      "term",
    )!;
    decisions.add(
      "Terms and weeks",
      term.name,
      `${term.start} to ${term.end}${i === 0 ? " (13 weeks; the only term taught)" : " (dates only; nothing taught)"}`,
    );
  }
  decisions.add(
    "Terms and weeks",
    "Session",
    `${scenario.academicYear.name}, ${scenario.academicYear.start} to ${scenario.academicYear.end}, current`,
  );
  decisions.add(
    "Terms and weeks",
    "Reserved weeks",
    scenario.reservedWeeks.map((w) => `week ${w.week} ${w.label}`).join(", "),
  );
  decisions.add(
    "Terms and weeks",
    "Exam weeks",
    `the last ${scenario.examWeeksPerTerm} weeks of each term: week 12 examinations, week 13 results and closing`,
  );
  decisions.add(
    "Terms and weeks",
    "Teaching weeks",
    scenario.teachingWeeks.join(", "),
  );

  // ── Staff ──────────────────────────────────────────────────────────────
  console.log(`· inviting ${scenario.staff.length} staff`);
  const staff: StaffMember[] = await inPool(scenario.staff, 6, async (plan) => {
    const email = staffEmail(plan.name, domain);
    await client.as(admin, "invite-staff", {
      email,
      name: plan.name,
      schoolRole: plan.role,
    });
    const persona = await client.signUp(email, plan.name, "teacher");
    return {
      ...persona,
      key: plan.key,
      name: plan.name,
      schoolRole: plan.role,
      heads: plan.heads,
    };
  });
  const active = asList(await client.as(admin, "list-staff", {}), "active");
  for (const member of staff) {
    const row = active.find((s: any) => s.email === member.email);
    member.userId = row?.userId ?? member.userId;
    findings.expect(
      "staff",
      !!row,
      `${member.name} is active after signing in`,
    );
    findings.expect(
      "staff",
      !row || row.name === member.name,
      `${member.name} is shown by the name they were invited with`,
      `shown as ${row?.name}`,
    );
    findings.expect(
      "staff",
      !row || row.schoolRole === member.schoolRole,
      `${member.name} has the role they were invited to`,
      `${row?.schoolRole}`,
    );
  }
  const byKey = (key: string) => staff.find((s) => s.key === key)!;

  // ── Departments and subjects ───────────────────────────────────────────
  console.log("· departments and subjects");
  const departmentIds: Record<string, string> = {};
  for (const department of [
    ...new Set(scenario.subjects.map((s) => s.department)),
  ]) {
    const head = staff.find((s) => s.heads === department);
    departmentIds[department] = idOf(
      await client.as(admin, "create-department", {
        name: department,
        ...(head?.userId ? { headTeacherUserId: head.userId } : {}),
      }),
      "department",
    )!;
    decisions.add(
      "Staffing and loads",
      `${department} department`,
      head ? `coordinator ${head.name}` : "no coordinator",
    );
  }

  const subjectIds: Record<string, string> = {};
  for (const [i, subject] of scenario.subjects.entries()) {
    subjectIds[subject.name] = idOf(
      await client.as(admin, "create-subject", {
        name: subject.name,
        code: subject.code,
        color: COLOURS[i % COLOURS.length],
        departmentId: departmentIds[subject.department],
        yearGroups: subject.yearGroups,
      }),
      "subject",
    )!;
    const streams = subject.option
      ? "option block"
      : subject.yearGroups.some((y) => y.startsWith("SS"))
        ? subject.streams?.length
          ? `${subject.streams.join(", ")} stream${subject.streams.length > 1 ? "s" : ""} in SS`
          : "every stream in SS"
        : "every learner";
    const libraries = [
      ...new Set(
        subject.yearGroups.map((y) => {
          const lib = planFor(subject, y, scenario).library;
          return `${lib.framework} "${lib.subject}"`;
        }),
      ),
    ].join(" and ");
    decisions.add(
      "Subjects by year group and stream",
      subject.name,
      `${subject.yearGroups.join(", ")}; ${streams}; ${subject.department}; planned from ${libraries}`,
    );
  }

  // ── Arms ───────────────────────────────────────────────────────────────
  console.log(`· ${scenario.arms.length} arms`);
  const arms: ShowcaseArm[] = [];
  for (const [i, plan] of scenario.arms.entries()) {
    const formPlan = scenario.staff.find((s) => s.formOf === plan.name);
    const formTeacher = formPlan ? byKey(formPlan.key) : undefined;
    const homeRoom = `${plan.name} classroom`;
    const reply = await client.as(admin, "create-arm", {
      gradeLevelId: gradeLevelIds[plan.yearGroup],
      name: plan.name,
      ...(plan.stream ? { stream: plan.stream } : {}),
      homeRoom,
      ...(formTeacher?.userId ? { formTeacherUserId: formTeacher.userId } : {}),
      sequence: (i % 3) + 1,
    });
    arms.push({
      id: idOf(reply, "arm")!,
      name: plan.name,
      yearGroup: plan.yearGroup,
      stream: plan.stream,
      homeRoom,
      formTeacher,
    });
  }
  const armByName = (name: string) => arms.find((a) => a.name === name)!;

  // ── Classes ────────────────────────────────────────────────────────────
  console.log("· classes, whole-arm and option");
  const firstTermId = termIds[scenario.terms[0].name];
  const leadOf = (subject: string, armOrOption: string) => {
    const plan = scenario.staff.find((s) =>
      s.teaches.some(
        (t) => t.subject === subject && t.arms.includes(armOrOption),
      ),
    );
    if (!plan) throw new Error(`nobody teaches ${subject} in ${armOrOption}`);
    return byKey(plan.key);
  };
  const supportOf = (subject: string, armOrOption: string) =>
    scenario.staff
      .filter((s) =>
        s.supports?.some(
          (t) => t.subject === subject && t.arms.includes(armOrOption),
        ),
      )
      .map((s) => byKey(s.key));

  type Plan = Omit<ShowcaseClass, "id">;
  const plans: Plan[] = [];
  for (const arm of arms) {
    for (const subject of scenario.subjects) {
      if (subject.option || !subject.yearGroups.includes(arm.yearGroup))
        continue;
      if (
        arm.stream &&
        subject.streams &&
        !subject.streams.includes(arm.stream as any)
      )
        continue;
      const p = planFor(subject, arm.yearGroup, scenario);
      plans.push({
        name: `${arm.name} ${subject.name}`,
        subject,
        subjectId: subjectIds[subject.name],
        yearGroup: arm.yearGroup,
        gradeLevelId: gradeLevelIds[arm.yearGroup],
        arm,
        optionArmIds: [],
        teacher: leadOf(subject.name, arm.name),
        support: supportOf(subject.name, arm.name),
        room:
          subject.name === "Digital Technologies" ? "ICT Room" : arm.homeRoom,
        ...p,
      });
    }
  }
  for (const yearGroup of scenario.yearGroups) {
    for (const subject of scenario.subjects) {
      if (!subject.option || !subject.yearGroups.includes(yearGroup)) continue;
      const yearArms = arms.filter((a) => a.yearGroup === yearGroup);
      const p = planFor(subject, yearGroup, scenario);
      plans.push({
        name: `${yearGroup} ${subject.name}`,
        subject,
        subjectId: subjectIds[subject.name],
        yearGroup,
        gradeLevelId: gradeLevelIds[yearGroup],
        arm: null,
        // Both halves of the block draw on all three arms, so the timetable
        // places them together as one option block.
        optionArmIds: yearArms.map((a) => a.id),
        teacher: leadOf(subject.name, `option:${yearGroup}`),
        support: supportOf(subject.name, `option:${yearGroup}`),
        room:
          subject.name === "Geography" ? "Library" : `${yearGroup}A classroom`,
        ...p,
      });
    }
  }

  const classes: ShowcaseClass[] = [];
  for (const plan of plans) {
    const reply = await client.as(admin, "create-class", {
      subjectId: plan.subjectId,
      gradeLevelId: plan.gradeLevelId,
      academicYearId,
      termId: firstTermId,
      name: plan.name,
      primaryTeacherUserId: plan.teacher.userId,
      roomNumber: plan.room,
      ...(plan.arm
        ? { armId: plan.arm.id }
        : { optionArmIds: plan.optionArmIds }),
    });
    const id = idOf(reply, "class")!;
    for (const helper of plan.support) {
      await client.as(admin, "add-teacher-to-class", {
        classId: id,
        teacherUserId: helper.userId,
        role: "support",
      });
    }
    classes.push({ id, ...plan });
  }
  findings.expect(
    "classes",
    classes.every((c) => !!c.id),
    "every planned class is created",
    `${classes.length} classes`,
  );

  for (const member of staff) {
    const mine = classes.filter((c) => c.teacher.key === member.key);
    const supported = classes.filter((c) =>
      c.support.some((s) => s.key === member.key),
    );
    const periods = mine.reduce((n, c) => n + c.periodsPerWeek, 0);
    const form = arms.find((a) => a.formTeacher?.key === member.key);
    decisions.add(
      "Staffing and loads",
      member.name,
      `${member.schoolRole === "subject_coordinator" ? `coordinator (${member.heads}); ` : ""}${mine.length} classes, ${periods} periods a week${supported.length ? `; supports ${supported.map((c) => c.name).join(", ")}` : ""}${form ? `; form teacher of ${form.name}` : ""}`,
    );
  }

  // ── Learners ───────────────────────────────────────────────────────────
  const profiles = makeLearners(scenario.arms, scenario.studentsPerArm, domain);
  console.log(`· inviting ${profiles.length} learners`);
  const learners: Learner[] = await inPool(profiles, 8, async (profile) => {
    await client.as(admin, "invite-student", {
      email: profile.email,
      name: profile.name,
      gradeLevel: profile.yearGroup,
    });
    const persona = await client.signUp(profile.email, profile.name, "student");
    return {
      ...persona,
      profile,
      yearGroup: profile.yearGroup,
      arm: profile.arm,
    };
  });
  const roll = asList(
    await client.as(admin, "list-students", { limit: 500 }),
    "students",
  );
  for (const learner of learners) {
    const row = roll.find((r: any) => r.email === learner.email);
    learner.studentId = row?.id;
    learner.userId = learner.userId ?? row?.userId;
  }
  findings.expect(
    "learners",
    roll.length === learners.length && learners.every((l) => !!l.studentId),
    "every invited learner is on the roll after signing in",
    `${roll.length} on the roll, ${learners.length} invited`,
  );
  const misnamed = learners.filter(
    (l) => roll.find((r: any) => r.email === l.email)?.name !== l.profile.name,
  );
  findings.expect(
    "learners",
    misnamed.length === 0,
    "every learner is shown by their own name",
    misnamed
      .map((l) => l.email)
      .slice(0, 5)
      .join(", "),
  );

  // Placing a learner in their arm enrols them in its whole-arm classes.
  for (const arm of arms) {
    const ids = learners
      .filter((l) => l.arm === arm.name)
      .map((l) => l.userId!);
    const reply = await client.as(admin, "set-learner-arm", {
      armId: arm.id,
      studentUserIds: ids,
    });
    findings.expect(
      "learners",
      reply?.moved === ids.length,
      `${ids.length} learners are placed in ${arm.name}`,
      JSON.stringify(reply).slice(0, 200),
    );
  }

  // The option block: a share of Science and Commercial learners take
  // Further Mathematics, everyone else Geography.
  for (const yearGroup of [
    ...new Set(classes.filter((c) => !c.arm).map((c) => c.yearGroup)),
  ]) {
    const cohort = learners.filter((l) => l.yearGroup === yearGroup);
    // The stronger mathematicians of the Science and Commercial arms choose
    // Further Mathematics, as they would.
    const eligible = cohort
      .filter((l) => armByName(l.arm).stream !== "Art")
      .sort((a, b) => b.profile.ability - a.profile.ability);
    const takers = new Set(
      eligible.slice(
        0,
        Math.round(eligible.length * scenario.furtherMathsShare),
      ),
    );
    for (const learner of cohort) {
      learner.option = takers.has(learner)
        ? "Further Mathematics"
        : "Geography";
    }
    for (const cls of classes.filter(
      (c) => !c.arm && c.yearGroup === yearGroup,
    )) {
      const ids = cohort
        .filter((l) => l.option === cls.subject.name)
        .map((l) => l.userId!);
      await client.as(admin, "bulk-enroll-students", {
        classId: cls.id,
        studentUserIds: ids,
      });
      decisions.add(
        "Option blocks",
        cls.name,
        `${ids.length} learners, taught by ${cls.teacher.name}, in ${cls.room}`,
      );
    }
  }
  decisions.add(
    "Option blocks",
    "The block",
    `Further Mathematics beside Geography in ${[...new Set(classes.filter((c) => !c.arm).map((c) => c.yearGroup))].join(" and ")}; Science and Commercial learners choose one (the stronger mathematicians Further Mathematics), every Art learner takes Geography; both classes draw on all three arms so they are timetabled together`,
  );

  const run: ShowcaseRun = {
    runId,
    domain,
    scenario,
    client,
    findings,
    decisions,
    admin,
    schoolId: created.schoolId,
    academicYearId,
    termIds,
    firstTermId,
    gradeLevelIds,
    departmentIds,
    subjectIds,
    staff,
    arms,
    classes,
    learners,
    notes: new Map(),
    weekPlan: new Map(),
    record: {},
  };

  await blueprintsStylesAndGuide(run);
  return run;
}

/** Activity blueprints for every subject, exam styles, and the school guide. */
async function blueprintsStylesAndGuide(run: ShowcaseRun) {
  const { client, admin, scenario, decisions, findings } = run;
  console.log("· blueprints, exam styles and the school guide");
  for (const subject of scenario.subjects) {
    const formats = [
      "worksheet",
      "quiz",
      "problem set",
      ...(subject.lab ? ["practical"] : []),
      "reading",
      "card deck",
      "examination",
    ];
    await client.as(admin, "manage-activity-blueprints", {
      action: "set",
      subject: subject.name,
      blueprint: {
        formats,
        defaultFormat: "worksheet",
        formatShapes: {
          worksheet: "questions",
          quiz: "questions",
          "problem set": "questions",
          ...(subject.lab ? { practical: "steps" } : {}),
          reading: "prose",
          "card deck": "cards",
          examination: "questions",
        },
        typicalDurationMinutes: 40,
        gradingMode: "points",
        rubricCriteria: [
          "Knowledge of the content",
          "Application",
          "Clear working and expression",
        ],
        responseMode: "typed",
        notes: subject.handwritten
          ? "Working is written by hand on problem sets; marks go to method as well as answers."
          : "Open answers are marked against the mark scheme, not a model answer.",
      },
    });
    decisions.add(
      "Activity mix per subject",
      subject.name,
      `${formats.join(", ")}${subject.handwritten ? "; handwritten working on problem sets" : ""}${subject.lab ? `; practicals in the ${subject.lab}` : ""}`,
    );
  }
  const blueprints = await client.as(admin, "manage-activity-blueprints", {
    action: "list",
  });
  findings.expect(
    "setup",
    asList(blueprints?.subjectsWithoutBlueprint ?? []).length === 0,
    "every subject has an activity blueprint",
    JSON.stringify(blueprints?.subjectsWithoutBlueprint),
  );

  for (const subject of scenario.subjects.filter((s) => s.examStyle)) {
    try {
      await client.as(admin, "set-subject-assessment-style", {
        subjectId: run.subjectIds[subject.name],
        styleName: subject.examStyle,
      });
      decisions.add("Exams", `${subject.name} exam style`, subject.examStyle);
    } catch (error) {
      findings.add(
        "note",
        "setup",
        `${subject.name} could not take the ${subject.examStyle} exam style`,
        String((error as Error).message).slice(0, 200),
      );
    }
  }
  decisions.add(
    "Exams",
    "Subjects without an exam style",
    "every subject the app ships no style for is worded plainly; styles exist only for English Language, Mathematics, Physics, Chemistry and Biology",
  );

  const draft = await client.as(admin, "draft-school-guide", {});
  const answers = [
    "",
    "## What the school has told us",
    "",
    `- ${scenario.schoolName} is a day secondary school in ${scenario.city}, Oyo State, running JSS1–SS3.`,
    "- JSS has one arm per year group; SS has three streamed arms: A Science, B Commercial, C Art.",
    "- The First Term runs 14 September to 11 December 2026. Week 7 is the mid-term break, week 11 is revision, week 12 is examinations and week 13 is results and closing.",
    "- Mid-term and end-of-term examinations in SS follow the WAEC style where a style exists for the subject.",
    "- Work not handed in counts as zero. Report cards show positions.",
    "- Practicals in Physics, Chemistry and Biology are taught as doubles in the labs.",
    "- Teachers mark open answers against the mark scheme and quote the learner's words as evidence.",
    "",
  ].join("\n");
  await client.as(admin, "update-school-resource", {
    content: `${draft?.draft ?? ""}${answers}`,
  });
  findings.expect(
    "setup",
    typeof draft?.draft === "string" && draft.draft.length > 200,
    "the school guide is drafted from the school's own settings",
  );
}
