import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { bootBooks, check, finish } from "./helpers.js";

const { asOwner, asPartner } = await bootBooks("check-action-policy");
const { ACTION_POLICY, assertPolicyCoversAllActions, guardActions } =
  await import("../server/lib/action-policy.js");

const actionFiles = readdirSync("actions")
  .filter((f) => f.endsWith(".ts"))
  .map((f) => f.replace(/\.ts$/, ""))
  .filter((f) => f !== "run");

await check("every action classified", () => {
  assertPolicyCoversAllActions(actionFiles);
  assert.throws(
    () => assertPolicyCoversAllActions([...actionFiles, "brand-new"]),
    /brand-new/,
  );
});
await check("reads are for everyone, the rest owner-only", () => {
  for (const name of actionFiles) {
    const read =
      /^(list-|get-)/.test(name) ||
      ["reconcile-day", "view-screen", "navigate"].includes(name);
    assert.equal(ACTION_POLICY[name], read ? "everyone" : "owner", name);
  }
});
const guarded = guardActions({
  "record-expense": { run: async () => "wrote" },
  "list-sales": { run: async () => "read" },
  "not-in-policy": { run: async () => "?" },
} as any);
await check("partner refused a write", async () => {
  await assert.rejects(
    () => asPartner(() => guarded["record-expense"].run({})),
    /Only the owner can change Books\./,
  );
});
await check("partner may read", async () => {
  assert.equal(await asPartner(() => guarded["list-sales"].run({})), "read");
});
await check("owner may write", async () => {
  assert.equal(await asOwner(() => guarded["record-expense"].run({})), "wrote");
});
await check("unknown action denied", async () => {
  await assert.rejects(
    () => asOwner(() => guarded["not-in-policy"].run({})),
    /not available in Books/,
  );
});
await check("no raw SQL tools for the assistant", () => {
  const plugin = readFileSync("server/plugins/agent-chat.ts", "utf8");
  assert.match(plugin, /disableDbDataTools:\s*true/);
  assert.match(plugin, /guardActions\(/);
});
await finish();
