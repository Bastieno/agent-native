import { newId, nowIso } from "./ids.js";
import { lagosDay } from "./lagos-time.js";
import { rows, run } from "./sql.js";
import type { MoniepointEvent } from "./moniepoint.js";

export type StoredEvent = MoniepointEvent & {
  webhookId: string;
  payload: string;
};

/** Insert unless this webhook id was seen before. */
export async function storeMoniepointEvent(
  orgId: string,
  e: StoredEvent,
): Promise<{ stored: boolean; day: string }> {
  const day = lagosDay(e.occurredAt);
  const seen = await rows(
    `SELECT id FROM moniepoint_events WHERE org_id = ? AND webhook_id = ?`,
    [orgId, e.webhookId],
  );
  if (seen.length) return { stored: false, day };
  try {
    await run(
      `INSERT INTO moniepoint_events (id, webhook_id, received_at, type, reference, alt_reference, amount, occurred_at, day, payload, created_at, org_id, visibility)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'org')`,
      [
        newId(),
        e.webhookId,
        nowIso(),
        e.type,
        e.reference,
        e.altReference,
        e.amount,
        e.occurredAt,
        day,
        e.payload,
        nowIso(),
        orgId,
      ],
    );
  } catch (err) {
    // The unique index caught a concurrent delivery of the same webhook.
    if (/unique|constraint/i.test(String((err as Error).message)))
      return { stored: false, day };
    throw err;
  }
  return { stored: true, day };
}
