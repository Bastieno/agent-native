import fs from "node:fs";

/**
 * The spoken lines of a script file: every paragraph after the first `---`,
 * minus headings and anything in [square brackets] (what is on screen) and in
 * {curly braces} (delivery tags for the voice tool, see voiceoverText).
 */
export function readScript(markdownPath: string): string[] {
  return paragraphs(markdownPath, false);
}

/**
 * The same lines as `readScript`, with each {tag} turned into the [tag] that
 * ElevenLabs reads as direction ("{excited} Here it is." becomes "[excited]
 * Here it is."). This is the text to paste into the voice tool.
 */
export function voiceoverText(markdownPath: string): string[] {
  return paragraphs(markdownPath, true);
}

function paragraphs(markdownPath: string, keepTags: boolean): string[] {
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
        .replace(/\{([^}]*)\}/g, keepTags ? "[$1]" : "")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
}
