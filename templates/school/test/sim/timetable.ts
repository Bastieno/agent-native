import type { Client } from "./client.js";
import type { FullSchoolRun } from "./school-setup.js";
import type { Findings } from "./findings.js";
import { asList, idOf } from "./shapes.js";

const STREAMS = ["Science", "Commercial", "Art"];

/** The user ids on a class's roll, in a given enrolment state. */
async function roll(
  client: Client,
  run: FullSchoolRun,
  classId: string,
  status: "active" | "withdrawn" = "active",
): Promise<string[]> {
  const reply = await client.as(run.admin, "list-class-students", {
    classId,
    status,
  });
  return asList(reply, "students").map((r: any) => r.studentUserId);
}

const sameSet = (a: string[], b: string[]) =>
  a.length === b.length && new Set(a).size === a.length
    ? b.every((x) => a.includes(x))
    : false;

/**
 * Was this refused, and for the reason expected? A call that fails for any
 * other reason (a typo in the arguments, a server error) is not a refusal.
 */
async function refused(
  work: () => Promise<unknown>,
  reason: RegExp,
): Promise<boolean> {
  try {
    await work();
    return false;
  } catch (error) {
    return reason.test(error instanceof Error ? error.message : String(error));
  }
}

/**
 * A year group splits into arms; a class set for one arm follows its
 * learners, whichever arm they are moved to.
 *
 * Runs last: it adds classes and enrolments to the first year group, which
 * would change what the earlier term checks find if it ran before them.
 */
export type ArmsContext = {
  yearGroup: string;
  gradeLevelId: string;
  /** The three arms, in order. */
  armIds: string[];
  /** The learners placed in each arm. */
  groups: string[][];
  /** The whole-arm class of each arm, in order. */
  classIds: string[];
  subjectId: string;
};

export async function checkArms(
  client: Client,
  run: FullSchoolRun,
  findings: Findings,
): Promise<ArmsContext> {
  const phase = "timetable";
  const yearGroup = Object.keys(run.gradeLevelIds)[0];
  const gradeLevelId = run.gradeLevelIds[yearGroup];
  const cohort = run.students.filter((s) => s.yearGroup === yearGroup);
  const template = run.classes.find((c) => c.yearGroup === yearGroup)!;

  // Three arms, each with its own stream.
  const armIds: string[] = [];
  for (const [i, stream] of STREAMS.entries()) {
    const created = await client.as(run.admin, "create-arm", {
      gradeLevelId,
      name: `${yearGroup}${String.fromCharCode(65 + i)}`,
      stream,
      sequence: i + 1,
    });
    armIds.push(idOf(created, "arm")!);
  }
  findings.expect(
    phase,
    armIds.every(Boolean),
    "each arm of the year group is created",
  );

  const duplicate = await refused(
    () =>
      client.as(run.admin, "create-arm", {
        gradeLevelId,
        name: `${yearGroup}A`,
      }),
    /already has/i,
  );
  findings.expect(
    phase,
    duplicate,
    "a second arm with the same name in a year group is refused",
  );

  // Split the learners between them.
  const groups: string[][] = [[], [], []];
  cohort.forEach((s, i) => groups[i % 3].push(s.userId!));
  for (const [i, armId] of armIds.entries()) {
    const reply = await client.as(run.admin, "set-learner-arm", {
      armId,
      studentUserIds: groups[i],
    });
    findings.expect(
      phase,
      reply?.moved === groups[i].length && typeof reply?.message === "string",
      `${groups[i].length} learners are placed in arm ${i + 1}`,
      JSON.stringify(reply),
    );
  }

  const listed = asList(
    await client.as(run.admin, "list-arms", { gradeLevelId }),
    "arms",
  );
  findings.expect(
    phase,
    listed.length === 3 &&
      listed.every((a: any, i: number) => a.learnerCount === groups[i].length),
    "the arms list says how many learners each holds, in order",
    JSON.stringify(listed.map((a: any) => [a.name, a.learnerCount])),
  );

  // A class for each arm.
  const classIds: string[] = [];
  for (const [i, armId] of armIds.entries()) {
    const created = await client.as(run.admin, "create-class", {
      subjectId: template.subjectId,
      gradeLevelId,
      academicYearId: run.academicYearId,
      termId: run.termId,
      name: `${yearGroup}${String.fromCharCode(65 + i)} ${template.subject}`,
      armId,
    });
    classIds.push(idOf(created, "class")!);
  }
  for (const [i, classId] of classIds.entries()) {
    findings.expect(
      phase,
      sameSet(await roll(client, run, classId), groups[i]),
      `the class for arm ${i + 1} holds exactly that arm's learners`,
    );
  }

  // One learner moves A to B, then back.
  const mover = groups[0][0];
  const toB = await client.as(run.admin, "set-learner-arm", {
    armId: armIds[1],
    studentUserIds: [mover],
  });
  const afterMove = {
    a: await roll(client, run, classIds[0]),
    b: await roll(client, run, classIds[1]),
  };
  findings.expect(
    phase,
    !afterMove.a.includes(mover) && afterMove.b.includes(mover),
    "a learner moved to another arm leaves the old class and joins the new",
    JSON.stringify(toB),
  );
  findings.expect(
    phase,
    typeof toB?.message === "string" && !/[a-z0-9_-]{15,}/i.test(toB.message),
    "the reply to a move says what happened without quoting ids",
    toB?.message,
  );

  await client.as(run.admin, "set-learner-arm", {
    armId: armIds[0],
    studentUserIds: [mover],
  });
  const back = {
    aActive: await roll(client, run, classIds[0]),
    aWithdrawn: await roll(client, run, classIds[0], "withdrawn"),
    bActive: await roll(client, run, classIds[1]),
    bWithdrawn: await roll(client, run, classIds[1], "withdrawn"),
  };
  findings.expect(
    phase,
    back.aActive.filter((u) => u === mover).length === 1 &&
      !back.aWithdrawn.includes(mover),
    "a learner moved back is on the old class's roll once, not twice",
    `active ${back.aActive.filter((u) => u === mover).length}, withdrawn ${back.aWithdrawn.filter((u) => u === mover).length}`,
  );
  findings.expect(
    phase,
    !back.bActive.includes(mover) &&
      back.bWithdrawn.filter((u) => u === mover).length === 1,
    "the class they left keeps them as withdrawn, once",
  );

  // Refusals.
  findings.expect(
    phase,
    await refused(
      () =>
        client.as(run.admin, "create-class", {
          subjectId: template.subjectId,
          gradeLevelId,
          academicYearId: run.academicYearId,
          name: `${yearGroup} both kinds`,
          armId: armIds[0],
          optionArmIds: [armIds[1]],
        }),
      /either for one whole/i,
    ),
    "a class that is both for a whole arm and an option is refused",
  );

  const other = run.students.find((s) => s.yearGroup !== yearGroup);
  if (other) {
    findings.expect(
      phase,
      await refused(
        () =>
          client.as(run.admin, "set-learner-arm", {
            armId: armIds[0],
            studentUserIds: [other.userId!],
          }),
        /not in the same year group/i,
      ),
      "a learner of another year group cannot be put in the arm",
    );
  }

  // An option class draws on several arms, and its roll is nobody's by default.
  const option = await client.as(run.admin, "create-class", {
    subjectId: template.subjectId,
    gradeLevelId,
    academicYearId: run.academicYearId,
    name: `${yearGroup} option ${template.subject}`,
    optionArmIds: [armIds[0], armIds[1], armIds[1]],
  });
  const optionId = idOf(option, "class")!;
  findings.expect(
    phase,
    (await roll(client, run, optionId)).length === 0,
    "an option class starts with nobody on it; its learners are chosen",
  );

  // Healing: someone from another arm is on the roll by hand; asking for
  // their own arm again takes them off the class that is not theirs.
  const stray = groups[1][0];
  await client.as(run.admin, "enroll-student", {
    classId: classIds[0],
    studentUserId: stray,
  });
  const heal = await client.as(run.admin, "set-learner-arm", {
    armId: armIds[1],
    studentUserIds: [stray],
  });
  findings.expect(
    phase,
    !(await roll(client, run, classIds[0])).includes(stray) &&
      (await roll(client, run, classIds[1])).includes(stray),
    "placing a learner in the arm they are already in still puts their classes right",
    JSON.stringify(heal),
  );

  // A class changing arm: the old arm's learners come off it, the new
  // arm's go on, and anyone already in the new arm simply stays.
  await client.as(run.admin, "enroll-student", {
    classId: classIds[0],
    studentUserId: groups[1][1],
  });
  const swap = await client.as(run.admin, "update-class", {
    id: classIds[0],
    armId: armIds[1],
  });
  findings.expect(
    phase,
    sameSet(await roll(client, run, classIds[0]), groups[1]),
    "a class moved to another arm holds that arm's learners and none of the old arm's",
    JSON.stringify(swap),
  );
  findings.expect(
    phase,
    typeof swap?.message === "string" && /withdrawn/i.test(swap.message),
    "the reply to moving a class says learners were withdrawn",
    swap?.message,
  );
  await client.as(run.admin, "update-class", {
    id: classIds[0],
    armId: armIds[0],
  });
  findings.expect(
    phase,
    sameSet(await roll(client, run, classIds[0]), groups[0]),
    "moving the class back restores the first arm's roll",
  );

  // Becoming whole-arm drops the option rows, so a class is never both.
  await client.as(run.admin, "update-class", {
    id: optionId,
    armId: armIds[2],
  });
  const stale = await client.as(run.admin, "db-query", {
    sql: "SELECT COUNT(*) AS n FROM class_arms WHERE class_id = ?",
    args: [optionId],
  });
  findings.expect(
    phase,
    /\n-+\n0\s*$/.test(String(stale)),
    "an option class made whole-arm no longer has option rows",
    JSON.stringify(stale),
  );
  // Which arm a class is for decides who is enrolled: an admin's call.
  const teacherClass = run.classes.find((c) => c.id === template.id)!;
  findings.expect(
    phase,
    await refused(
      () =>
        client.as(teacherClass.teacher, "update-class", {
          id: template.id,
          armId: armIds[1],
        }),
      /only an admin/i,
    ),
    "a teacher cannot move a class to another arm",
  );
  let renamed = true;
  try {
    await client.as(teacherClass.teacher, "update-class", {
      id: template.id,
      name: template.name,
    });
  } catch {
    renamed = false;
  }
  findings.expect(
    phase,
    renamed,
    "a teacher can still update other details of their own class",
  );
  findings.expect(
    phase,
    sameSet(await roll(client, run, classIds[0]), groups[0]),
    "the refused change left the arm's class roll as it was",
  );
  return {
    yearGroup,
    gradeLevelId,
    armIds,
    groups,
    classIds,
    subjectId: template.subjectId,
  };
}

/** "08:00" plus a number of minutes. */
function clock(start: string, plus: number): string {
  const [h, m] = start.split(":").map(Number);
  const t = h * 60 + m + plus;
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

/** A day of back-to-back 40-minute lessons from 08:00, with breaks where asked. */
function bells(count: number, breaks: number[] = []) {
  let at = "08:00";
  return Array.from({ length: count }, (_, i) => {
    const number = i + 1;
    const isBreak = breaks.includes(number);
    const end = clock(at, isBreak ? 20 : 40);
    const period = {
      number,
      start: at,
      end,
      kind: isBreak ? ("break" as const) : ("lesson" as const),
      ...(isBreak ? { label: "Long break" } : {}),
    };
    at = end;
    return period;
  });
}

const noId = (text: unknown) =>
  typeof text === "string" &&
  text.length > 0 &&
  !/[A-Za-z0-9_-]{15,}/.test(text);

/**
 * A term's timetable, built and checked the way an admin or the agent would:
 * a week and rooms first, then classes placed, then each kind of clash.
 *
 * Works in two new terms of the run's year, never the run's own. The rows the
 * school was set up with have no term and keep serving the current term; they
 * stop doing so the moment that term has rows of its own, so touching it
 * would change what everything else finds.
 */
export async function checkTimetable(
  client: Client,
  run: FullSchoolRun,
  arms: ArmsContext,
  findings: Findings,
): Promise<void> {
  const phase = "timetable";
  const admin = run.admin;
  const { armIds, classIds, groups, yearGroup } = arms;
  const [armA, armB] = armIds;
  const [classA, classB, classC] = classIds;

  // ── Before the school has a week ────────────────────────────────────────
  const makeTerm = async (
    name: string,
    start: string,
    end: string,
    n: number,
  ) =>
    idOf(
      await client.as(admin, "create-term", {
        academicYearId: run.academicYearId,
        name,
        startDate: start,
        endDate: end,
        sequence: n,
      }),
      "term",
    )!;
  const T2 = await makeTerm("Second Term", "2027-01-11", "2027-04-02", 2);
  const T3 = await makeTerm("Third Term", "2027-04-26", "2027-07-23", 3);

  const noWeekRefusal = await refused(
    () =>
      client.as(admin, "set-timetable-period", {
        termId: T2,
        classId: classA,
        day: 1,
        periodNumber: 1,
      }),
    /Settings → School week/,
  );
  findings.expect(
    phase,
    noWeekRefusal,
    "placing a class before the school has set its week is refused, pointing at Settings → School week",
  );
  let before: any;
  try {
    before = await client.as(admin, "get-timetable", { termId: T2 });
  } catch (error) {
    findings.expect(
      phase,
      false,
      "reading a timetable before the week is set does not throw",
      String(error),
    );
  }
  findings.expect(
    phase,
    before?.week === null &&
      typeof before?.message === "string" &&
      before.message.length > 0,
    "a timetable read before the week is set says there is no week, in words",
    JSON.stringify(before?.week),
  );

  // ── The school's week and rooms ─────────────────────────────────────────
  const week = {
    cycleLength: 1,
    days: [
      ...[1, 2, 3, 4].map((day) => ({ day, periods: bells(8, [4]) })),
      { day: 5, periods: bells(6) },
      { day: 6, periods: bells(3) },
    ],
  };
  await client.as(admin, "update-school-config", {
    schoolWeek: week,
    rooms: [
      { name: `${yearGroup}A classroom`, kind: "classroom" },
      { name: `${yearGroup}B classroom`, kind: "classroom" },
      { name: `${yearGroup}C classroom`, kind: "classroom" },
      { name: "Physics Lab", kind: "special" },
    ],
  });

  // ── Option classes ──────────────────────────────────────────────────────
  const makeOption = async (name: string, learners: string[]) => {
    const created = await client.as(admin, "create-class", {
      subjectId: arms.subjectId,
      gradeLevelId: arms.gradeLevelId,
      academicYearId: run.academicYearId,
      name,
      optionArmIds: [armA, armB],
    });
    const id = idOf(created, "class")!;
    for (const studentUserId of learners) {
      await client.as(admin, "enroll-student", { classId: id, studentUserId });
    }
    return id;
  };
  const furtherMaths = await makeOption("Further Mathematics", [
    groups[0][1],
    groups[1][2],
  ]);
  const technicalDrawing = await makeOption("Technical Drawing", [
    groups[0][2],
    groups[1][3],
  ]);
  const extraA = idOf(
    await client.as(admin, "create-class", {
      subjectId: arms.subjectId,
      gradeLevelId: arms.gradeLevelId,
      academicYearId: run.academicYearId,
      name: `${yearGroup}A Study Skills`,
      armId: armA,
    }),
    "class",
  )!;

  // A term showing the school's earlier timetable cannot be edited in place:
  // the first row would hide the rest. Copy it in first.
  const T4 = await makeTerm("Fourth Term", "2027-08-02", "2027-10-29", 4);
  findings.expect(
    phase,
    await refused(
      () =>
        client.as(admin, "set-timetable-period", {
          termId: T4,
          classId: classA,
          day: 1,
          periodNumber: 1,
        }),
      /still showing the school's earlier timetable\. Copy it into Fourth Term first, then change it\./,
    ),
    "placing a class in a term that is only showing the earlier timetable is refused, offering the copy",
  );
  const intoT4 = await client.as(admin, "copy-timetable", {
    fromTermId: T2,
    toTermId: T4,
    confirm: true,
  });
  findings.expect(
    phase,
    intoT4?.copied === true && intoT4.periods > 0,
    "the earlier timetable can be copied into a term that was only showing it",
    JSON.stringify(intoT4),
  );
  // Seed T2 the same way; the copied rows are cleared once the first class is
  // down, so T2 holds only what this check places.
  await client.as(admin, "copy-timetable", {
    fromTermId: T4,
    toTermId: T2,
    confirm: true,
  });
  const seeded: string[] = (
    (await client.as(admin, "get-timetable", { termId: T2 })) as any
  ).periods.map((p: any) => p.scheduleId);

  const place = (
    classId: string,
    day: number,
    periodNumber: number,
    room?: string,
  ) =>
    client.as(admin, "set-timetable-period", {
      termId: T2,
      classId,
      day,
      periodNumber,
      ...(room ? { room } : {}),
    });
  const clashesOf = async (termId: string) =>
    (await client.as(admin, "get-timetable", { termId })) as any;

  // ── A clean timetable, then an option block ─────────────────────────────
  const first = await place(classA, 1, 1, ` ${yearGroup}a  CLASSROOM `);
  for (const scheduleId of seeded) {
    await client.as(admin, "remove-timetable-period", { scheduleId });
  }
  await place(classB, 1, 2);
  await place(classC, 1, 3);
  findings.expect(
    phase,
    Array.isArray(first?.clashes) && noId(first?.message),
    "placing a class says what was done, with no ids",
    first?.message,
  );
  let view = await clashesOf(T2);
  findings.expect(
    phase,
    view.periods.length === 3 && view.clashes.length === 0,
    "a clean timetable for the three arms has no clashes",
    JSON.stringify(view.clashes),
  );
  const placedA = view.periods.find((p: any) => p.classId === classA);
  findings.expect(
    phase,
    placedA?.room === `${yearGroup}A classroom` &&
      placedA?.start === "08:00" &&
      placedA?.end === "08:40" &&
      view.dayNames?.[1] &&
      view.term?.id === T2,
    "a placement takes its times from the week and its room as the room list spells it",
    JSON.stringify(placedA),
  );

  await place(furtherMaths, 2, 1);
  await place(technicalDrawing, 2, 1);
  view = await clashesOf(T2);
  findings.expect(
    phase,
    view.clashes.length === 0,
    "two option classes in the same slot, with different learners, are a block and not a clash",
    JSON.stringify(view.clashes),
  );

  // ── One of each deliberate clash ────────────────────────────────────────
  const teacherUserId = run.classes[0].teacher.userId!;
  for (const id of [classA, classB]) {
    await client.as(admin, "update-class", {
      id,
      primaryTeacherUserId: teacherUserId,
    });
  }
  await place(classA, 3, 1);
  const teacherPlace = await place(classB, 3, 1);
  await place(classB, 4, 1, "Physics Lab");
  const roomPlace = await place(classC, 4, 1, "physics lab");
  await place(classA, 5, 1);
  const armPlace = await place(extraA, 5, 1);
  // The learner who is in Further Mathematics joins Technical Drawing too.
  await client.as(admin, "enroll-student", {
    classId: technicalDrawing,
    studentUserId: groups[0][1],
  });

  findings.expect(
    phase,
    teacherPlace?.clashes?.length === 1 &&
      teacherPlace.clashes[0].kind === "teacher" &&
      /clash/i.test(teacherPlace.message) &&
      roomPlace?.clashes?.length === 1 &&
      roomPlace.clashes[0].kind === "room" &&
      armPlace?.clashes?.length === 1 &&
      armPlace.clashes[0].kind === "arm",
    "placing a class that clashes says so in the reply",
    JSON.stringify([
      teacherPlace?.clashes,
      roomPlace?.clashes,
      armPlace?.clashes,
    ]),
  );

  view = await clashesOf(T2);
  const kinds = view.clashes.map((c: any) => c.kind).sort();
  findings.expect(
    phase,
    kinds.join() === "arm,learner,room,teacher",
    "the timetable reports exactly four clashes: teacher, room, arm and learner",
    kinds.join(),
  );
  findings.expect(
    phase,
    view.clashes.every((c: any) => noId(c.message)),
    "each clash is a sentence with no id in it",
    view.clashes.map((c: any) => c.message).join(" | "),
  );
  const narrowed = await client.as(admin, "get-timetable", {
    termId: T2,
    armId: armB,
  });
  findings.expect(
    phase,
    narrowed.periods.every(
      (p: any) => p.armId === armB || p.optionArmIds.includes(armB),
    ) &&
      narrowed.periods.length > 0 &&
      narrowed.clashes.length < view.clashes.length,
    "narrowing to one arm keeps only that arm's periods and the clashes touching them",
    `${narrowed.periods.length} periods, ${narrowed.clashes.length} clashes`,
  );
  const inLab = await client.as(admin, "get-timetable", {
    termId: T2,
    room: " PHYSICS   lab",
  });
  findings.expect(
    phase,
    inLab.periods.length === 2 && inLab.clashes.length === 1,
    "narrowing to a room finds its periods however the name is spelled",
    `${inLab.periods.length} periods`,
  );

  // ── Refusals ────────────────────────────────────────────────────────────
  findings.expect(
    phase,
    await refused(() => place(classA, 1, 4), /period 4.*lesson periods/is),
    "placing a class in a break period is refused, naming the lesson periods",
  );
  findings.expect(
    phase,
    await refused(() => place(classA, 7, 1), /doesn't teach/i),
    "placing a class on a day the school does not teach is refused",
  );
  findings.expect(
    phase,
    await refused(() => place(classA, 1, 9), /lesson periods/i),
    "placing a class in a period that does not exist is refused",
  );
  findings.expect(
    phase,
    await refused(() => place(classA, 1, 5, "Staff room"), /room list/i),
    "a room that is not on the room list is refused",
  );

  // ── Moving and removing ─────────────────────────────────────────────────
  const moved = await client.as(admin, "set-timetable-period", {
    termId: T2,
    classId: classC,
    day: 6,
    periodNumber: 2,
    scheduleId: roomPlace.scheduleId,
  });
  view = await clashesOf(T2);
  const movedRow = view.periods.find(
    (p: any) => p.scheduleId === roomPlace.scheduleId,
  );
  findings.expect(
    phase,
    moved?.clashes?.length === 0 &&
      movedRow?.day === 6 &&
      movedRow?.periodNumber === 2 &&
      view.clashes.length === 3,
    "moving a placement clears the clash it was causing and keeps the row",
    JSON.stringify(movedRow),
  );
  const periodsBefore = view.periods.length;
  const removed = await client.as(admin, "remove-timetable-period", {
    scheduleId: roomPlace.scheduleId,
  });
  view = await clashesOf(T2);
  findings.expect(
    phase,
    removed?.removed === true &&
      noId(removed?.message) &&
      view.periods.length === periodsBefore - 1,
    "removing a placement takes just that one out",
    removed?.message,
  );
  // Put the clash back so the copy carries all four.
  await place(classC, 4, 1, "Physics Lab");
  view = await clashesOf(T2);
  findings.expect(
    phase,
    view.clashes.length === 4,
    "the four clashes are back before the copy",
    String(view.clashes.length),
  );

  // ── Copying a term ──────────────────────────────────────────────────────
  const preview = await client.as(admin, "copy-timetable", {
    fromTermId: T2,
    toTermId: T3,
  });
  findings.expect(
    phase,
    preview?.periods === view.periods.length &&
      preview?.clashes === 4 &&
      (await clashesOf(T3)).fromUntermedRows === true &&
      noId(preview?.message),
    "copying without confirming only says what would be copied",
    JSON.stringify(preview),
  );
  const copied = await client.as(admin, "copy-timetable", {
    fromTermId: T2,
    toTermId: T3,
    confirm: true,
  });
  const copy = await clashesOf(T3);
  findings.expect(
    phase,
    copied?.periods === view.periods.length &&
      copy.periods.length === view.periods.length &&
      copy.clashes.length === 4 &&
      copy.fromUntermedRows === false,
    "a confirmed copy has the same periods and the same four clashes in the new term",
    `${copy.periods.length} periods, ${copy.clashes.length} clashes`,
  );
  findings.expect(
    phase,
    await refused(
      () =>
        client.as(admin, "copy-timetable", {
          fromTermId: T2,
          toTermId: T3,
          confirm: true,
        }),
      /already has periods/i,
    ),
    "copying onto a term that already has periods is refused",
  );

  // ── Setup gaps: the current term only ───────────────────────────────────
  const setup = await client.as(admin, "check-school-setup", {});
  const clashGaps = asList(setup, "gaps").filter((g: any) =>
    /clash/i.test(g.setting),
  );
  findings.expect(
    phase,
    clashGaps.length === 0 && !/clash/i.test(String(setup?.message)),
    "the setup check lists clashes only for the current term, so not the second term's",
    clashGaps.map((g: any) => g.meanwhile).join(" | "),
  );
  console.log(
    "  clashes:",
    view.clashes
      .map((c: any) => `${c.kind}: ${c.message}`)
      .join("\n          "),
  );
}
