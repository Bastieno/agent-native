import fs from "node:fs";

/**
 * The spoken lines of a script file: every paragraph after the first `---`,
 * minus headings and anything in [square brackets] (what is on screen).
 */
export function readScript(markdownPath: string): string[] {
  const text = fs.readFileSync(markdownPath, "utf8");
  const start = text.search(/^---\s*$/m);
  const body = start >= 0 ? text.slice(start).replace(/^---\s*$/m, "") : text;
  return body
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .split("\n")
        .filter((l) => !/^\s*(#|---\s*$)/.test(l))
        .join(" ")
        .replace(/\[[^\]]*\]/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}
