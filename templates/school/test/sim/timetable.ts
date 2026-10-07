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

/** Did this call get refused? Anything that throws counts. */
async function refused(work: () => Promise<unknown>): Promise<boolean> {
  try {
    await work();
    return false;
  } catch {
    return true;
  }
}

/**
 * A year group splits into arms; a class set for one arm follows its
 * learners, whichever arm they are moved to.
 *
 * Runs last: it adds classes and enrolments to the first year group, which
 * would change what the earlier term checks find if it ran before them.
 */
export async function checkArms(
  client: Client,
  run: FullSchoolRun,
  findings: Findings,
): Promise<void> {
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

  const duplicate = await refused(() =>
    client.as(run.admin, "create-arm", {
      gradeLevelId,
      name: `${yearGroup}A`,
    }),
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
    await refused(() =>
      client.as(run.admin, "create-class", {
        subjectId: template.subjectId,
        gradeLevelId,
        academicYearId: run.academicYearId,
        name: `${yearGroup} both kinds`,
        armId: armIds[0],
        optionArmIds: [armIds[1]],
      }),
    ),
    "a class that is both for a whole arm and an option is refused",
  );

  const other = run.students.find((s) => s.yearGroup !== yearGroup);
  if (other) {
    findings.expect(
      phase,
      await refused(() =>
        client.as(run.admin, "set-learner-arm", {
          armId: armIds[0],
          studentUserIds: [other.userId!],
        }),
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
}
