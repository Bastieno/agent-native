import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { check, fixture } from "./helpers.js";
import {
  verifyMoniepointSignature,
  parseMoniepointEvent,
} from "../server/lib/moniepoint.js";

const SECRET = "test-secret";
const events = JSON.parse(fixture("moniepoint-events.json"));
const body = JSON.stringify(events.purchase);
const sign = (id: string, ts: string, raw: string) =>
  createHmac("sha256", SECRET).update(`${id}__${ts}__${raw}`).digest("base64");

check("good signature", () => {
  const headers = {
    id: "wh-1",
    timestamp: "1762787515000",
    signature: sign("wh-1", "1762787515000", body),
  };
  assert.equal(verifyMoniepointSignature(body, headers, SECRET), true);
});
check("bad signature", () => {
  const headers = {
    id: "wh-1",
    timestamp: "1762787515000",
    signature: sign("wh-1", "1762787515000", body),
  };
  assert.equal(
    verifyMoniepointSignature(body.replace("90000", "90001"), headers, SECRET),
    false,
  );
  assert.equal(
    verifyMoniepointSignature(body, { ...headers, signature: "" }, SECRET),
    false,
  );
});
check("parse purchase", () => {
  assert.deepEqual(parseMoniepointEvent(events.purchase), {
    type: "V1_POS_PURCHASE_TRANSACTION",
    reference: "000000001225",
    altReference: "PUR|2026111002005594482742TMP9E7C00000000122590000",
    amount: 90000,
    occurredAt: "2026-11-10T15:11:53.000Z",
  });
});
check("parse transfer, Lagos local time", () => {
  const e = parseMoniepointEvent(events.transfer)!;
  assert.equal(e.reference, "2120251503250616320");
  assert.equal(e.amount, 450000);
  assert.equal(e.occurredAt, "2026-11-10T21:01:28.000Z");
});
check("pending ignored", () =>
  assert.equal(parseMoniepointEvent(events.pending), null),
);
check("garbage ignored", () =>
  assert.equal(parseMoniepointEvent({ hello: 1 }), null),
);
