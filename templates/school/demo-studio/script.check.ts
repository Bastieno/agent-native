import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readScript, voiceoverText } from "./script.js";

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

{excited} It works {pause} every time.
`,
);
const lines = readScript(file);
assert.deepEqual(lines, [
  "I'm Francis, and this is Ellai.",
  "Then she marks forty-five books. Again.",
  "Last line.",
  "It works every time.",
]);
// For the voice tool the {tags} become [tags]; the lines to align stay clean.
assert.equal(
  voiceoverText(file).at(-1),
  "[excited] It works [pause] every time.",
);
fs.rmSync(dir, { recursive: true });
console.log("script: ok");
