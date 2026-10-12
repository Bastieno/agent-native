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

type Period = {
  scheduleId: string;
  classId: string;
  className: string;
  day: number;
  periodNumber: number | null;
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
    const phase = cls.yearGroup.startsWith("JSS") ? "JSS" : "SS";
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
    "JSS arms 37 periods of 38; SS1 and SS2 arms 34 (30 whole-arm plus the 4-period option block); SS3 arms 30",
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
    "a timetable is drafted for the First Term",
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
  const timetable = await read(run);
  const practicals: string[] = [];
  for (const cls of run.classes.filter((c) => c.subject.lab)) {
    const double = timetable.periods.filter(
      (p) => p.classId === cls.id && p.pairId,
    );
    const first = double.sort(
      (a, b) => (a.periodNumber ?? 0) - (b.periodNumber ?? 0),
    )[0];
    if (!first) {
      findings.add(
        "missing",
        "timetable",
        `${cls.name} has no double to hold its practical`,
      );
      continue;
    }
    await client.as(admin, "set-timetable-period", {
      termId: run.firstTermId,
      classId: cls.id,
      scheduleId: first.scheduleId,
      day: first.day,
      periodNumber: first.periodNumber,
      room: cls.subject.lab,
      lessonLabel: "Practical",
    });
    practicals.push(
      `${cls.name}, day ${first.day} periods ${first.periodNumber}–${(first.periodNumber ?? 0) + 1}, ${cls.subject.lab}`,
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
          (p.teachers.some((t) => teachers.has(t.userId)) ||
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
    "the First Term timetable has no clashes",
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
      date: "2026-10-12",
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
    const week = await client.as(member, "get-my-week", { date: "2026-10-12" });
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
