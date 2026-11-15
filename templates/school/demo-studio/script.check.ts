import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readScript } from "./script.js";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "demo-script-"));
const file = path.join(dir, "s.md");
fs.writeFileSync(
  file,
  `# Title

Notes for the reader. [CHECK: x]

---

## 1. Opening

[Black, then the home page.]

I'm Francis, and this is Ellai.

Then she marks   forty-five books. [Type: "hi"] Again.

[Only a bracket line.]

Last line.
`,
);
const lines = readScript(file);
assert.deepEqual(lines, [
  "I'm Francis, and this is Ellai.",
  "Then she marks forty-five books. Again.",
  "Last line.",
]);
fs.rmSync(dir, { recursive: true });
console.log("script: ok");
