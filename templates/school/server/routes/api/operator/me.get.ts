import { defineEventHandler } from "h3";
import { baseDomain, requireOperator } from "../../../lib/operator/access.js";

/** Who the console is open to, and the shared address schools hang off. */
export default defineEventHandler(async (event) => {
  const { email } = await requireOperator(event);
  return { email, baseDomain: baseDomain() };
});
