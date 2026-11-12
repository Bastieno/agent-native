import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { bootBooks, check, finish } from "./helpers.js";

const { asOwner, asPartner } = await bootBooks("check-owner-routes");
const { memberMayCall, guardExtensionActions } =
  await import("../server/lib/action-policy.js");

await check("members can't write through framework extension routes", () => {
  assert.equal(
    memberMayCall("POST", "/_agent-native/extensions/sql/exec"),
    false,
  );
  assert.equal(memberMayCall("POST", "/_agent-native/extensions"), false);
  assert.equal(memberMayCall("PUT", "/_agent-native/extensions/abc"), false);
  assert.equal(memberMayCall("DELETE", "/_agent-native/extensions/abc"), false);
  assert.equal(
    memberMayCall("POST", "/_agent-native/extensions/data/abc/notes"),
    false,
  );
  assert.equal(memberMayCall("POST", "/_agent-native/extensions/proxy"), false);
});
await check("members can still read", () => {
  assert.equal(memberMayCall("GET", "/_agent-native/extensions"), true);
  assert.equal(
    memberMayCall("POST", "/_agent-native/extensions/sql/query"),
    true,
  );
  assert.equal(memberMayCall("GET", "/_agent-native/actions/list-sales"), true);
  assert.equal(memberMayCall("POST", "/_agent-native/agent-chat"), true);
});
const wrapped = guardExtensionActions({
  "create-extension": { run: async () => "made" },
  "list-extensions": { run: async () => "listed" },
} as any);
await check("partner's agent can't create extensions", async () => {
  await assert.rejects(
    () => asPartner(() => wrapped["create-extension"].run({})),
    /Only the owner can change Books\./,
  );
  assert.equal(
    await asOwner(() => wrapped["create-extension"].run({})),
    "made",
  );
  assert.equal(
    await asPartner(() => wrapped["list-extensions"].run({})),
    "listed",
  );
});
await check("wired into the plugin and a middleware", () => {
  assert.match(
    readFileSync("server/plugins/agent-chat.ts", "utf8"),
    /transformExtensionActions:\s*guardExtensionActions/,
  );
  assert.match(
    readFileSync("server/middleware/owner-only.ts", "utf8"),
    /memberMayCall/,
  );
});
await finish();
