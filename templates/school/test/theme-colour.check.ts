import assert from "node:assert/strict";
import { parsePrimary } from "../shared/theme-colour";

const ok = (input: string) => {
  const c = parsePrimary(input);
  assert.ok(c.ok, `${input} should be accepted: ${c.ok ? "" : c.message}`);
  return c as Extract<ReturnType<typeof parsePrimary>, { ok: true }>;
};
const WHITE = "0 0% 100%";

// Hex is converted to the three numbers the app paints with.
assert.equal(ok("#1d6b3a").primary, "142 57% 27%");
assert.equal(ok("#fff").primary, "0 0% 100%");
assert.equal(ok("#FF0000").primary, "0 100% 50%");
assert.equal(ok("142 71% 35%").primary, "142 71% 35%");
assert.equal(ok("142,71%,35%").primary, "142 71% 35%");

// Text on the colour stays readable: white on dark and mid colours, ink on light.
for (const dark of ["#0b1d51", "#1d6b3a", "#7a1020", "#6a1b9a", "#b00020"]) {
  assert.equal(ok(dark).primaryForeground, WHITE, `white text on ${dark}`);
}
for (const light of ["#ffd400", "#f5e663", "#9be3a0", "#a8e6ff", "#ffffff"]) {
  assert.notEqual(ok(light).primaryForeground, WHITE, `dark text on ${light}`);
}

// Very dark or very light colours are accepted with a warning, not refused.
assert.ok(ok("#000000").note);
assert.ok(ok("#ffffff").note);
assert.equal(ok("#1d6b3a").note, undefined);

// Anything the app cannot paint with is refused, in a sentence.
for (const bad of [
  "green",
  "#12",
  "#gggggg",
  "rgb(1,2,3)",
  "400 50% 50%",
  "100 120% 50%",
  "",
]) {
  const c = parsePrimary(bad);
  assert.ok(!c.ok, `${bad} should be refused`);
  assert.ok(c.ok === false && c.message.length > 10);
}
console.log("theme colour ok");
