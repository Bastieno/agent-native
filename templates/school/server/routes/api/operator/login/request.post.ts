import { defineEventHandler, readBody } from "h3";
import { requireOperatorHost } from "../../../../lib/operator/access.js";
import { requestCode } from "../../../../lib/operator/login-code.js";

/** Ask for a sign-in code. The answer is the same whoever asks. */
export default defineEventHandler(async (event) => {
  await requireOperatorHost(event);
  const body = ((await readBody(event).catch(() => null)) ?? {}) as Record<
    string,
    unknown
  >;
  await requestCode(String(body.email ?? "")).catch((err) =>
    console.error(
      `[operator] code request failed: ${err instanceof Error ? err.message : err}`,
    ),
  );
  return { ok: true };
});
