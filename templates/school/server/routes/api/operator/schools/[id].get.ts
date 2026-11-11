import { createError, defineEventHandler, getRouterParam } from "h3";
import { requireOperator } from "../../../../lib/operator/access.js";
import { schoolDetail } from "../../../../lib/operator/schools.js";

export default defineEventHandler(async (event) => {
  await requireOperator(event);
  const detail = await schoolDetail(String(getRouterParam(event, "id") ?? ""));
  if (!detail) {
    throw createError({ statusCode: 404, statusMessage: "No such school" });
  }
  return detail;
});
