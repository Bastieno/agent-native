import { businessIdBySlug } from "./catalog.js";
import { newId, nowIso } from "./ids.js";
import { payeeKey } from "./payee-rules.js";
import { rows, run } from "./sql.js";

/** Salaries are filed under the business the person works for. */
export const SALARIES = "Salaries";

export async function loadStaff(
  orgId: string,
): Promise<{ payee: string; business: string }[]> {
  return (
    await rows(
      `SELECT s.match_key, b.slug FROM staff_businesses s JOIN businesses b ON b.id = s.business_id
        WHERE s.org_id = ? ORDER BY s.match_key`,
      [orgId],
    )
  ).map((r) => ({ payee: r.match_key as string, business: r.slug as string }));
}

/** The business this payee works for, if Books has been told. */
export async function staffBusiness(
  orgId: string,
  vendor: string,
): Promise<"lounge" | "hub" | null> {
  const key = payeeKey(vendor);
  const found = (await loadStaff(orgId)).find((s) => s.payee === key);
  return (found?.business as "lounge" | "hub" | undefined) ?? null;
}

/** Replaces what Books knows about this person. */
export async function saveStaff(
  orgId: string,
  payee: string,
  business: "lounge" | "hub",
) {
  const key = payeeKey(payee);
  if (!key) throw new Error("Which person?");
  const businessId = await businessIdBySlug(orgId, business);
  await run(`DELETE FROM staff_businesses WHERE org_id = ? AND match_key = ?`, [
    orgId,
    key,
  ]);
  await run(
    `INSERT INTO staff_businesses (id, match_key, business_id, created_at, org_id, visibility) VALUES (?, ?, ?, ?, ?, 'org')`,
    [newId(), key, businessId, nowIso(), orgId],
  );
  return { payee: key, business };
}
