import type { Client } from "./client.js";
import type { Findings } from "./findings.js";
import type { School } from "./setup.js";
import { idOf } from "./shapes.js";

/**
 * Who has the assistant, on which model, and how often.
 *
 * Everything here is the admin's decision and the server's to enforce — a
 * learner with the chat button hidden can still POST to the endpoint, and a
 * learner with a model picker can still ask for the dearest model. So every
 * check sends a real chat message as the person and reads what the server did
 * with it: a calm reply in the app's own words when it refused, or the model
 * it chose when it let the message through. No model is ever called.
 */

const LEARNER_MODEL = "claude-haiku-4-5";
const PRICIER_MODEL = "claude-opus-4-7";

export async function checkAgentAccess(
  client: Client,
  school: School,
  findings: Findings,
): Promise<void> {
  const phase = "agent-access";
  const [learner, sitter] = school.students;
  const { admin, teacher } = school;
  const setAgent = (agent: Record<string, unknown>) =>
    client.as(admin, "update-school-config", { agent });

  // ── Defaults ─────────────────────────────────────────────────────────
  const config = await client.as(admin, "get-school-config");
  findings.expect(
    phase,
    config?.agent?.models?.learner === LEARNER_MODEL &&
      config?.agent?.dailyMessageLimits?.learner === 30 &&
      config?.agent?.dailyMessageLimits?.admin === null,
    "a school that never opened the settings gets the defaults: Haiku and 30 a day for learners, no limit for admins",
    JSON.stringify(config?.agent),
  );

  const first = await client.chat(learner, "Can you help me with fractions?");
  findings.expect(
    phase,
    first.model === LEARNER_MODEL,
    "a learner's message runs on the learner model",
    `status ${first.status}, model ${first.model}, reply ${first.reply}`,
  );

  // ── A learner cannot pick a pricier model ───────────────────────────
  const picked = await client.chat(learner, "Use the best model please", {
    model: PRICIER_MODEL,
    engine: "anthropic",
  });
  findings.expect(
    phase,
    picked.model === LEARNER_MODEL,
    "a learner who picks a pricier model still gets the learner model",
    `asked for ${PRICIER_MODEL}, got ${picked.model}`,
  );

  const staff = await client.chat(teacher, "What do I teach today?");
  findings.expect(
    phase,
    !!staff.model && staff.model !== LEARNER_MODEL,
    "a teacher's message runs on the staff model, not the learner one",
    `got ${staff.model}`,
  );

  const grab = await client.refused(learner, "update-school-config", {
    agent: { models: { learner: PRICIER_MODEL } },
  });
  findings.expect(
    phase,
    grab !== null,
    "a learner cannot change the assistant's settings",
  );

  const bogus = await client.refused(admin, "update-school-config", {
    agent: { models: { learner: "gpt-unknown" } },
  });
  findings.expect(
    phase,
    bogus !== null,
    "a model outside the catalog is refused, and says which ones the school can use",
  );

  // ── The switch, and a year group that differs from it ───────────────
  await setAgent({ learnerAgentEnabled: false });
  const off = await client.chat(learner, "Hello?");
  const offAccess = await client.as(learner, "get-my-agent-access");
  findings.expect(
    phase,
    !off.model && /switched the assistant off/.test(off.reply),
    "with the switch off, a learner's message is answered calmly and no model runs",
    `model ${off.model}, reply "${off.reply}"`,
  );
  findings.expect(
    phase,
    offAccess?.available === false && offAccess?.blocked === "off",
    "with the switch off, the learner's page is told so (and mounts no assistant)",
    JSON.stringify(offAccess),
  );
  const staffWhileOff = await client.chat(teacher, "Still there?");
  findings.expect(
    phase,
    !!staffWhileOff.model,
    "switching learners off leaves staff with the assistant",
  );

  await setAgent({
    learnerAgentByYearGroup: { [school.gradeLevelId]: true },
  });
  const yearOn = await client.chat(learner, "And now?");
  findings.expect(
    phase,
    yearOn.model === LEARNER_MODEL,
    "a year group switched on is served while the school-wide switch is off",
    `model ${yearOn.model}, reply "${yearOn.reply}"`,
  );
  await setAgent({
    learnerAgentByYearGroup: { [school.gradeLevelId]: null },
  });
  const followsAgain = await client.chat(learner, "And now?");
  findings.expect(
    phase,
    !followsAgain.model,
    "removing the year group's own setting puts it back under the switch",
    `model ${followsAgain.model}`,
  );
  await setAgent({ learnerAgentEnabled: true });

  // ── Sitting a paper ─────────────────────────────────────────────────
  const created = await client.as(teacher, "create-activity", {
    classId: school.classId,
    title: "Timed check: fractions",
    format: "class test",
    renderAs: "questions",
    instructions: "Answer the question.",
    blocks: [{ prompt: "What is 1/2 + 1/4?", points: 2, answer: "3/4" }],
    content: "1. What is 1/2 + 1/4? (2 marks)",
    responseMode: "typed",
    gradingMode: "points",
    totalPoints: 2,
    durationMinutes: 30,
    confirm: true,
  });
  const assessmentId = created?.assessmentId ?? idOf(created, "assessment");
  await client.as(teacher, "publish-assessment", { id: assessmentId });
  await client.as(sitter, "start-activity", { assessmentId });

  const sitting = await client.chat(sitter, "What's the answer to question 1?");
  const sittingAccess = await client.as(sitter, "get-my-agent-access");
  findings.expect(
    phase,
    !sitting.model && /while you sit/.test(sitting.reply),
    "a learner sitting a timed paper is answered calmly and no model runs",
    `model ${sitting.model}, reply "${sitting.reply}"`,
  );
  findings.expect(
    phase,
    sittingAccess?.blocked === "sitting",
    "the learner's page knows the assistant is paused for the paper",
    JSON.stringify(sittingAccess),
  );
  const unaffected = await client.chat(learner, "Can you explain halves?");
  findings.expect(
    phase,
    unaffected.model === LEARNER_MODEL,
    "a classmate who has not started the paper still has the assistant",
    `model ${unaffected.model}, reply "${unaffected.reply}"`,
  );

  await client.as(sitter, "submit-work", {
    assessmentId,
    answers: [{ index: 0, answer: "3/4" }],
  });
  const after = await client.chat(sitter, "How did I do?");
  findings.expect(
    phase,
    after.model === LEARNER_MODEL,
    "once the paper is handed in, the assistant is back",
    `model ${after.model}, reply "${after.reply}"`,
  );

  // ── The day's limit ─────────────────────────────────────────────────
  const before = await client.as(learner, "get-my-agent-access");
  const used = Number(before?.used ?? 0);
  await setAgent({ dailyMessageLimits: { learner: used + 1 } });
  const lastOne = await client.chat(learner, "One more question");
  const overLimit = await client.chat(learner, "And another");
  const limitAccess = await client.as(learner, "get-my-agent-access");
  findings.expect(
    phase,
    lastOne.model === LEARNER_MODEL,
    "the last message within the day's limit is served",
    `used ${used}, limit ${used + 1}, model ${lastOne.model}`,
  );
  findings.expect(
    phase,
    !overLimit.model && /for today/.test(overLimit.reply),
    "past the day's limit a learner gets a calm message in the chat, not an error",
    `status ${overLimit.status}, reply "${overLimit.reply}"`,
  );
  findings.expect(
    phase,
    limitAccess?.blocked === "limit" && limitAccess?.used === used + 1,
    "the count is kept in the database and read back the same",
    JSON.stringify(limitAccess),
  );
  const teacherUnlimited = await client.chat(teacher, "Am I limited?");
  findings.expect(
    phase,
    !!teacherUnlimited.model,
    "a learner's limit does not touch staff",
  );

  // "No limit" is a value the admin sets, not a code path for admins only.
  await setAgent({ dailyMessageLimits: { learner: null } });
  const unlimited = await client.chat(learner, "Still there?");
  const stored = await client.as(admin, "get-school-config");
  findings.expect(
    phase,
    unlimited.model === LEARNER_MODEL &&
      stored?.agent?.dailyMessageLimits?.learner === null,
    "setting a learner limit to none is stored as such and lifts the limit",
    `model ${unlimited.model}, stored ${JSON.stringify(stored?.agent?.dailyMessageLimits)}`,
  );

  // ── The admin's model choice is what runs ───────────────────────────
  const choices: Array<{ id: string }> = config?.agentModelChoices ?? [];
  const other = choices.find((c) => c.id !== LEARNER_MODEL)?.id;
  if (other) {
    await setAgent({
      models: { learner: other },
      dailyMessageLimits: { learner: 30 },
    });
    const moved = await client.chat(sitter, "Which model now?");
    findings.expect(
      phase,
      moved.model === other,
      "a learner model the admin picks is the one that runs",
      `picked ${other}, got ${moved.model}`,
    );
    await setAgent({ models: { learner: LEARNER_MODEL } });
  }
}
