import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { restoreSnapshot } from "./db.js";
import { record } from "./record.js";
import { SCHOOLS, type SchoolId } from "./schools.js";
import { startDemoServer } from "./server.js";

// Each school comes up on its own port, signs its person in, and shows a page.
const who: Record<SchoolId, [string, string]> = {
  crestfield: ["principal@crestfield.test", "/admin"],
  "crestfield-term": ["principal@crestfield.test", "/admin"],
  yellowview: ["principal@yellowview.test", "/admin"],
  empty: ["head@lagos.test", "/admin"],
};
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-schools-"));
for (const id of Object.keys(who) as SchoolId[]) {
  restoreSnapshot(undefined, id);
  const server = await startDemoServer(id);
  try {
    assert.equal(new URL(server.url).port, String(SCHOOLS[id].port));
    const { timeline } = await record(
      {
        slug: id,
        title: id,
        signInAs: who[id][0],
        steps: [
          {
            line: "a",
            actions: [
              { do: "goto", path: who[id][1] },
              { do: "hold", ms: 800 },
            ],
          },
        ],
      },
      server.url,
      path.join(dir, id),
    );
    assert.equal(timeline.steps.length, 1);
    const shot = path.join(dir, id, "screen.webm");
    assert.ok(fs.existsSync(shot), `${id}: no recording`);
    console.log(`  ${id}: ok`);
  } finally {
    await server.stop();
  }
}
fs.rmSync(dir, { recursive: true });
console.log("schools: ok");
