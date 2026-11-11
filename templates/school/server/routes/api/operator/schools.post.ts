import { createError, defineEventHandler, readBody } from "h3";
import { recordAudit, requireOperator } from "../../../lib/operator/access.js";
import {
  ProvisionError,
  provisionSchool,
} from "../../../lib/operator/provision-school.js";

/** Create a school: what `pnpm provision:school` does, from the console. */
export default defineEventHandler(async (event) => {
  const { email } = await requireOperator(event);
  const body = ((await readBody(event).catch(() => null)) ?? {}) as Record<
    string,
    unknown
  >;
  try {
    const result = await provisionSchool({
      name: String(body.name ?? ""),
      headEmail: String(body.headEmail ?? ""),
      headName: body.headName ? String(body.headName) : undefined,
      slug: body.slug ? String(body.slug) : undefined,
      ownKey: body.ownKey === true,
      by: email,
    });
    await recordAudit({
      actor: email,
      action: "school.create",
      schoolId: result.orgId,
      detail: {
        name: result.name,
        host: result.host,
        head: String(body.headEmail).toLowerCase(),
        ownKey: body.ownKey === true,
        emailed: result.emailed,
      },
    });
    return result;
  } catch (err) {
    if (err instanceof ProvisionError) {
      throw createError({ statusCode: 400, statusMessage: err.message });
    }
    throw err;
  }
});
