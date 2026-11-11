import { createError, defineEventHandler, getRouterParam, readBody } from "h3";
import {
  recordAudit,
  requireOperator,
} from "../../../../../lib/operator/access.js";
import { grantCredit, schoolName } from "../../../../../lib/credits.js";
import { creditsToCc } from "../../../../../../shared/credits.js";
import { schoolDetail } from "../../../../../lib/operator/schools.js";

/**
 * Give a school credit (or, as an adjustment, take some off). Every grant goes
 * to the school's ledger with who gave it and the payment it answers.
 */
export default defineEventHandler(async (event) => {
  const { email } = await requireOperator(event);
  const id = String(getRouterParam(event, "id") ?? "");
  const body = ((await readBody(event).catch(() => null)) ?? {}) as Record<
    string,
    unknown
  >;
  const credits = Number(body.credits);
  const adjustment = body.kind === "adjustment";
  if (
    !Number.isFinite(credits) ||
    credits === 0 ||
    Math.abs(credits) > 10_000_000
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Give a number of credits, not zero.",
    });
  }
  if (!adjustment && credits < 0) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "A grant is positive. Use an adjustment to take credit off.",
    });
  }
  if (!(await schoolDetail(id))) {
    throw createError({ statusCode: 404, statusMessage: "No such school" });
  }
  const paymentRef = body.paymentRef
    ? String(body.paymentRef).slice(0, 120)
    : null;
  const note = body.note ? String(body.note).slice(0, 300) : null;
  await grantCredit({
    schoolId: id,
    amountCc: creditsToCc(credits),
    paymentRef,
    note,
    by: email,
    kind: adjustment ? "adjustment" : "grant",
  });
  await recordAudit({
    actor: email,
    action: adjustment ? "credit.adjust" : "credit.grant",
    schoolId: id,
    detail: { school: await schoolName(id), credits, paymentRef, note },
  });
  return await schoolDetail(id);
});
