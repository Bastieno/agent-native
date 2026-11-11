import { createError, defineEventHandler, readBody } from "h3";
import {
  recordAudit,
  requireOperatorHost,
} from "../../../../lib/operator/access.js";
import { checkCode } from "../../../../lib/operator/login-code.js";
import { issueSession } from "../../../../lib/operator/session.js";

/** Trade an emailed code for an operator session. */
export default defineEventHandler(async (event) => {
  await requireOperatorHost(event);
  const body = ((await readBody(event).catch(() => null)) ?? {}) as Record<
    string,
    unknown
  >;
  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();
  if (!(await checkCode(email, String(body.code ?? "")))) {
    throw createError({
      statusCode: 401,
      statusMessage: "That code is wrong or has expired.",
    });
  }
  if (!issueSession(event, email)) {
    throw createError({
      statusCode: 503,
      statusMessage: "The server has no secret to sign sessions with.",
    });
  }
  await recordAudit({ actor: email, action: "operator.signin" });
  return { ok: true, email };
});
