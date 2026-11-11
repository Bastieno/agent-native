import { defineEventHandler, getQuery } from "h3";
import { requireOperator } from "../../../lib/operator/access.js";
import {
  addressProblem,
  baseDomainName,
} from "../../../lib/operator/provision-school.js";

/** Whether an address can be given to a school, for the form as it is typed. */
export default defineEventHandler(async (event) => {
  await requireOperator(event);
  const slug = String(getQuery(event).slug ?? "")
    .trim()
    .toLowerCase();
  if (!slug) return { ok: false, problem: null, host: null };
  const problem = await addressProblem(slug);
  return {
    ok: problem === null,
    problem,
    host: `${slug}.${baseDomainName()}`,
  };
});
