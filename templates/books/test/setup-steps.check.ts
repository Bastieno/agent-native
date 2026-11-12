import assert from "node:assert/strict";
import { bootBooks, check, finish, ORG } from "./helpers.js";

const { exec } = await bootBooks("check-setup-steps");
const { BOOKS_SETUP_STEPS } = await import("../server/lib/setup-steps.js");
const step = (id: string) => BOOKS_SETUP_STEPS.find((s) => s.id === id)!;

await check("five steps in order", () => {
  assert.deepEqual(
    BOOKS_SETUP_STEPS.map((s) => s.id),
    [
      "books-whatsapp",
      "books-moniepoint",
      "books-people",
      "books-first-import",
      "books-digests",
    ],
  );
});
await check("whatsapp complete only with all four keys", async () => {
  for (const k of [
    "WHATSAPP_ACCESS_TOKEN",
    "WHATSAPP_PHONE_NUMBER_ID",
    "WHATSAPP_VERIFY_TOKEN",
  ])
    process.env[k] = "x";
  assert.equal(await step("books-whatsapp").isComplete(), false);
  process.env.WHATSAPP_APP_SECRET = "x";
  assert.equal(await step("books-whatsapp").isComplete(), true);
});
await check("people complete once recipients are saved", async () => {
  const ctx = { sessionId: "s", orgId: ORG };
  assert.equal(await step("books-people").isComplete(ctx), false);
  await exec.execute({
    sql: `UPDATE books_settings SET recipients = '[{"name":"Owner"}]' WHERE org_id = ?`,
    args: [ORG],
  });
  assert.equal(await step("books-people").isComplete(ctx), true);
});
await check("first import needs both files", async () => {
  assert.equal(
    await step("books-first-import").isComplete({ sessionId: "s", orgId: ORG }),
    false,
  );
});
await finish();
