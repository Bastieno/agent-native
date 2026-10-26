import { asList } from "../shapes.js";
import { inPool } from "../pool.js";
import { planFor } from "./build.js";
import type { ShowcaseClass, ShowcaseRun } from "./context.js";

/**
 * The First Term timetable, built the way an admin would with the app:
 * lesson counts for every class, a generated draft read and accepted, the
 * lessons the draft could not fit placed by hand, and each science's double
 * moved into its lab as a named practical.
 */

const DAYS = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Period = {
  scheduleId: string;
  classId: string;
  className: string;
  day: number;
  periodNumber: number | null;
  start: string;
  end: string;
  room: string | null;
  teachers: { userId: string }[];
  armId: string | null;
  optionArmIds: string[];
  learnerUserIds: string[];
  pairId: string | null;
  lessonLabel: string | null;
};

const read = async (run: ShowcaseRun) =>
  (await run.client.as(run.admin, "get-timetable", {
    termId: run.firstTermId,
  })) as {
    periods: Period[];
    clashes: { message: string }[];
  };

const coverage = async (run: ShowcaseRun) =>
  asList(
    await run.client.as(run.admin, "get-timetable-coverage", {
      termId: run.firstTermId,
    }),
    "classes",
  ) as {
    classId: string;
    className: string;
    required: { periods: number; doubles: number } | null;
    placed: { periods: number; doubles: number };
  }[];

export async function buildTimetable(run: ShowcaseRun): Promise<void> {
  const { client, admin, scenario, findings, decisions } = run;

  // ── Lesson counts, per subject and year group ──────────────────────────
  console.log("· lesson counts");
  const pairs = new Map<string, ShowcaseClass>();
  for (const cls of run.classes)
    pairs.set(`${cls.subjectId}|${cls.gradeLevelId}`, cls);
  for (const cls of pairs.values()) {
    const p = planFor(cls.subject, cls.yearGroup, scenario);
    await client.as(admin, "set-lesson-counts", {
      subjectId: cls.subjectId,
      gradeLevelId: cls.gradeLevelId,
      periodsPerWeek: p.periodsPerWeek,
      doublesPerWeek: p.doublesPerWeek,
      termId: run.firstTermId,
      confirm: true,
    });
  }
  const bySubject = new Map<string, Set<string>>();
  for (const cls of run.classes) {
    const p = planFor(cls.subject, cls.yearGroup, scenario);
    const phase = cls.yearGroup;
    const key = cls.subject.name;
    bySubject.set(
      key,
      (bySubject.get(key) ?? new Set()).add(
        `${phase} ${p.periodsPerWeek} a week${p.doublesPerWeek ? `, ${p.doublesPerWeek} as a double` : ""}`,
      ),
    );
  }
  for (const [subject, counts] of bySubject) {
    decisions.add("Lesson counts per subject", subject, [...counts].join("; "));
  }
  decisions.add(
    "Lesson counts per subject",
    "Totals",
    scenario.decisionText.lessonCountTotals,
  );

  // ── Generate, read, accept ─────────────────────────────────────────────
  console.log("· generating the timetable");
  let drafted: any = await client.as(admin, "generate-timetable", {
    termId: run.firstTermId,
  });
  if (drafted?.needsConfirm) {
    drafted = await client.as(admin, "generate-timetable", {
      termId: run.firstTermId,
      confirm: true,
    });
  }
  const proposal = (
    await client.as(admin, "get-timetable-proposal", {
      termId: run.firstTermId,
    })
  )?.proposal;
  findings.expect(
    "timetable",
    !!drafted?.proposalId && !!proposal,
    `a timetable is drafted for the ${scenario.termName}`,
    JSON.stringify(drafted).slice(0, 300),
  );
  console.log(`  ${drafted?.message}`);
  const reasons = asList(proposal?.reasons ?? []).map((r: any) => r.message);
  await client.as(admin, "accept-timetable-proposal", {
    proposalId: drafted.proposalId,
  });
  decisions.add(
    "Timetable generation",
    "Draft",
    `${drafted?.lessons} lessons proposed in ${drafted?.elapsedMs} ms, ${drafted?.notFitted} not fitted; accepted as drafted`,
  );
  for (const reason of reasons)
    decisions.add("Timetable generation", "Not fitted", reason);

  // ── Whatever did not fit, placed by hand in free periods ───────────────
  const placedByHand = await placeShortfall(run);
  decisions.add(
    "Timetable generation",
    "Placed by hand",
    placedByHand.length
      ? placedByHand.join("; ")
      : "nothing: the draft placed every lesson",
  );

  // ── Practicals: each science's double, in its lab ──────────────────────
  // The labs are shared, so a double is moved only to a pair of periods where
  // the lab is free as well as the teacher and the class's learners.
  const practicals: string[] = [];
  const config = await client.as(admin, "get-school-config", {});
  const week = config?.schoolWeek ?? config?.config?.schoolWeek;
  const pairs2: { day: number; first: number; second: number }[] = [];
  for (const d of week?.days ?? []) {
    const lessons = d.periods.filter((p: any) => p.kind === "lesson");
    for (const p of lessons) {
      const next = d.periods.find((q: any) => q.number === p.number + 1);
      if (next?.kind === "lesson")
        pairs2.push({ day: d.day, first: p.number, second: next.number });
    }
  }
  // The most tied-down classes choose first: an option block's double cannot
  // move without the whole block, and a class with a support teacher has two
  // people to keep free.
  const rank = (c: ShowcaseClass) => (c.arm ? (c.support.length ? 1 : 2) : 0);
  const labClasses = run.classes
    .filter((c) => c.subject.lab)
    .sort((a, b) => rank(a) - rank(b));
  for (const cls of labClasses) {
    const { periods } = await read(run);
    const double = periods
      .filter((p) => p.classId === cls.id && p.pairId)
      .sort((a, b) => (a.periodNumber ?? 0) - (b.periodNumber ?? 0));
    const first = double[0];
    if (!first) {
      findings.add(
        "missing",
        "timetable",
        `${cls.name} has no double to hold its practical`,
      );
      continue;
    }
    const lab = cls.subject.lab!;
    const others = periods.filter((p) => p.classId !== cls.id);
    const teachers = new Set([
      cls.teacher.userId,
      ...cls.support.map((x) => x.userId),
    ]);
    const attached = new Set(cls.arm ? [cls.arm.id] : cls.optionArmIds);
    const busyAt = (day: number, n: number) =>
      others.some(
        (p) =>
          p.day === day &&
          p.periodNumber === n &&
          (p.room === lab ||
            p.teachers.some((t) => teachers.has(t.userId)) ||
            (p.armId && attached.has(p.armId)) ||
            p.optionArmIds.some((a) => attached.has(a))),
      );
    const labBusy = (day: number, n: number) =>
      others.some(
        (p) => p.day === day && p.periodNumber === n && p.room === lab,
      );
    const ok = pairs2.filter(
      (q) => !busyAt(q.day, q.first) && !busyAt(q.day, q.second),
    );
    // Where the draft put the double is already free of teachers and learners;
    // only the lab need be free there.
    if (!ok.length && first.periodNumber != null) {
      const here = pairs2.find(
        (q) => q.day === first.day && q.first === first.periodNumber,
      );
      if (
        here &&
        !labBusy(here.day, here.first) &&
        !labBusy(here.day, here.second)
      )
        ok.push(here);
    }
    // Stay where the draft put the double when the lab is free there.
    const target =
      ok.find((q) => q.day === first.day && q.first === first.periodNumber) ??
      ok[0];
    if (!target) {
      findings.add(
        "missing",
        "timetable",
        `${cls.name} has no free pair of periods in the ${lab}`,
      );
      continue;
    }
    await client.as(admin, "set-timetable-period", {
      termId: run.firstTermId,
      classId: cls.id,
      scheduleId: first.scheduleId,
      day: target.day,
      periodNumber: target.first,
      room: lab,
      lessonLabel: "Practical",
    });
    practicals.push(
      `${cls.name}, ${DAYS[target.day]} periods ${target.first}–${target.second}, ${lab}`,
    );
  }
  decisions.add(
    "Timetable generation",
    "Practicals",
    `each science double moved into its lab and named "Practical": ${practicals.join("; ")}`,
  );

  await checkTimetable(run);
}

/** Lessons the draft did not fit, placed one by one where the class is free. */
async function placeShortfall(run: ShowcaseRun): Promise<string[]> {
  const { client, admin, findings } = run;
  const short = (await coverage(run)).filter(
    (c) => c.required && c.placed.periods < c.required.periods,
  );
  if (!short.length) return [];
  console.log(`  placing ${short.length} classes' missing lessons by hand`);
  const config = await client.as(admin, "get-school-config", {});
  const week = config?.schoolWeek ?? config?.config?.schoolWeek;
  const slots: { day: number; periodNumber: number }[] = [];
  for (const d of week?.days ?? []) {
    for (const p of d.periods)
      if (p.kind === "lesson")
        slots.push({ day: d.day, periodNumber: p.number });
  }
  const placed: string[] = [];
  for (const row of short) {
    const cls = run.classes.find((c) => c.id === row.classId)!;
    let missing = row.required!.periods - row.placed.periods;
    const { periods } = await read(run);
    const teachers = new Set([
      cls.teacher.userId,
      ...cls.support.map((s) => s.userId),
    ]);
    const arms = new Set(cls.arm ? [cls.arm.id] : cls.optionArmIds);
    const busy = (day: number, n: number) =>
      periods.some(
        (p) =>
          p.day === day &&
          p.periodNumber === n &&
          ((cls.room && p.room === cls.room) ||
            p.teachers.some((t) => teachers.has(t.userId)) ||
            (p.armId && arms.has(p.armId)) ||
            p.optionArmIds.some((a) => arms.has(a))),
      );
    const used = new Set(
      periods.filter((p) => p.classId === cls.id).map((p) => p.day),
    );
    // Prefer a day the class has none of this subject yet, as a timetabler would.
    const free = slots
      .filter((s) => !busy(s.day, s.periodNumber))
      .sort((a, b) => Number(used.has(a.day)) - Number(used.has(b.day)));
    for (const slot of free) {
      if (missing <= 0) break;
      await client.as(admin, "set-timetable-period", {
        termId: run.firstTermId,
        classId: cls.id,
        day: slot.day,
        periodNumber: slot.periodNumber,
      });
      placed.push(
        `${cls.name} on day ${slot.day}, period ${slot.periodNumber}`,
      );
      used.add(slot.day);
      missing--;
    }
    findings.expect(
      "timetable",
      missing <= 0,
      `${cls.name} gets all its lessons once placed by hand`,
      `${missing} still short`,
      "missing",
    );
  }
  return placed;
}

/** No clashes, nothing short, and everybody's week has something in it. */
async function checkTimetable(run: ShowcaseRun): Promise<void> {
  const { client, findings } = run;
  const timetable = await read(run);
  findings.expect(
    "timetable",
    timetable.clashes.length === 0,
    `the ${run.scenario.termName} timetable has no clashes`,
    timetable.clashes
      .slice(0, 5)
      .map((c) => c.message)
      .join(" "),
  );
  const rows = await coverage(run);
  const short = rows.filter(
    (c) =>
      c.required &&
      (c.placed.periods < c.required.periods ||
        c.placed.doubles < c.required.doubles),
  );
  findings.expect(
    "timetable",
    short.length === 0,
    "every class has every lesson it needs",
    short
      .slice(0, 5)
      .map((c) => `${c.className} ${c.placed.periods}/${c.required!.periods}`)
      .join(", "),
  );
  run.record.timetable = {
    periods: timetable.periods.length,
    clashes: timetable.clashes.length,
    short: short.length,
  };

  // Every learner's week and every teacher's week hold lessons.
  const emptyLearners: string[] = [];
  await inPool(run.learners, 10, async (learner) => {
    const week = await client.as(learner, "get-my-week", {
      date: run.scenario.sampleDate,
    });
    const lessons = asList(week?.days ?? []).flatMap((d: any) =>
      asList(d.periods ?? []).flatMap((p: any) => asList(p.lessons ?? [])),
    );
    if (!lessons.length) emptyLearners.push(learner.profile.name);
  });
  findings.expect(
    "timetable",
    emptyLearners.length === 0,
    "every learner's week has lessons in it",
    emptyLearners.slice(0, 5).join(", "),
  );
  const emptyTeachers: string[] = [];
  const teaching = run.staff.filter((s) =>
    run.classes.some(
      (c) => c.teacher.key === s.key || c.support.some((h) => h.key === s.key),
    ),
  );
  await inPool(teaching, 6, async (member) => {
    const week = await client.as(member, "get-my-week", {
      date: run.scenario.sampleDate,
    });
    const lessons = asList(week?.days ?? []).flatMap((d: any) =>
      asList(d.periods ?? []).flatMap((p: any) => asList(p.lessons ?? [])),
    );
    if (!lessons.length) emptyTeachers.push(member.name);
  });
  findings.expect(
    "timetable",
    emptyTeachers.length === 0,
    "every teacher's week has lessons in it",
    emptyTeachers.join(", "),
  );
  run.record.weeksFilled = {
    learners: run.learners.length - emptyLearners.length,
    teachers: teaching.length - emptyTeachers.length,
    teaching: teaching.length,
  };
}
