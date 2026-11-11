import { defineEventHandler } from "h3";
import { requireOperator } from "../../../lib/operator/access.js";
import { listSchools } from "../../../lib/operator/schools.js";

export default defineEventHandler(async (event) => {
  await requireOperator(event);
  return { schools: await listSchools() };
});
