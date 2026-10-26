import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { inPool } from "../pool.js";
import { idOf } from "../shapes.js";
import type { ShowcaseRun } from "./context.js";
import { weekContent } from "./content.js";

/**
 * PDF handouts, the other way a teacher brings material in: a finished PDF
 * made outside the app (in a teacher's own AI app, from a reference), saved
 * as a draft against the week, read, then shared. Here the PDF is drawn from
 * the week's written reading and key terms, so the class sees a printable
 * study guide beside the reading and the card deck.
 *
 * Only for schools whose scenario names `pdfHandoutWeeks`.
 */

const PAGE: Record<"a4" | "letter", [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

/** Markdown reduced to plain lines: headings, bullets and paragraphs. */
function lines(markdown: string): { text: string; kind: "h" | "li" | "p" }[] {
  return markdown
    .split(/\n+/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const clean = raw
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/`(.+?)`/g, "$1");
      if (/^#{1,6}\s/.test(clean))
        return { text: clean.replace(/^#{1,6}\s+/, ""), kind: "h" as const };
      if (/^[-*]\s/.test(clean))
        return { text: clean.replace(/^[-*]\s+/, ""), kind: "li" as const };
      return { text: clean, kind: "p" as const };
    });
}

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const out: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      out.push(line);
      line = word;
    } else line = next;
  }
  if (line) out.push(line);
  return out;
}

/**
 * A study guide as a PDF: the reading, then the week's key terms. The
 * Standard fonts cover Latin-1 only, so characters outside it are
 * transliterated rather than dropped.
 */
export async function studyGuidePdf(
  title: string,
  subtitle: string,
  reading: string,
  terms: { front: string; back: string }[],
  paper: "a4" | "letter",
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const body = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const [w, h] = PAGE[paper];
  const margin = 64;
  const width = w - margin * 2;
  const safe = (t: string) =>
    t
      .normalize("NFC")
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/…/g, "...")
      .replace(/[^\x20-\x7E -ÿ]/g, "?");
  let page = doc.addPage([w, h]);
  let y = h - margin - 12;
  const need = (space: number) => {
    if (y - space < margin + 30) {
      page = doc.addPage([w, h]);
      y = h - margin;
    }
  };
  const put = (
    text: string,
    font: PDFFont,
    size: number,
    gap: number,
    x = 0,
  ) => {
    for (const row of wrap(safe(text), font, size, width - x)) {
      need(size + gap);
      page.drawText(row, {
        x: margin + x,
        y,
        size,
        font,
        color: rgb(0.1, 0.1, 0.12),
      });
      y -= size + 3;
    }
    y -= gap;
  };
  put(title, bold, 20, 4);
  put(subtitle, body, 11, 14);
  for (const l of lines(reading)) {
    if (l.kind === "h") {
      y -= 6;
      put(l.text, bold, 13, 4);
    } else if (l.kind === "li") put(`- ${l.text}`, body, 11, 3, 10);
    else put(l.text, body, 11, 7);
  }
  y -= 8;
  put("Key terms", bold, 14, 6);
  for (const t of terms) {
    put(t.front, bold, 11, 0);
    put(t.back, body, 11, 6, 10);
  }
  return doc.save();
}

/** A study-guide PDF for each class in the given week, saved as a draft against the week, then shared. */
export async function pdfHandouts(run: ShowcaseRun, week: number) {
  const { scenario, client } = run;
  if (!scenario.pdfHandoutWeeks.includes(week)) return 0;
  let made = 0;
  await inPool(run.classes, 6, async (cls) => {
    const written = weekContent(cls.subject.name, cls.yearGroup, week);
    const noteId = run.notes.get(cls.id)?.get(week);
    if (!written || !noteId) return;
    const bytes = await studyGuidePdf(
      `${cls.subject.name}: ${written.topic}`,
      `${cls.name}, ${scenario.termName}, week ${week} | ${cls.teacher.name}`,
      written.reading.content,
      written.cards.slice(0, 8),
      scenario.paperSize,
    );
    const saved = await client.as(cls.teacher, "create-document-resource", {
      classId: cls.id,
      title: `Study guide: ${written.topic}`,
      pdfBase64: Buffer.from(bytes).toString("base64"),
      fileName: `${cls.subject.name}-week-${week}-study-guide.pdf`,
      lessonNoteId: noteId,
      confirm: true,
    });
    const id = saved?.assessmentId ?? idOf(saved, "assessment");
    if (!id) {
      run.findings.add(
        "missing",
        "handouts",
        `${cls.name} week ${week}: the PDF handout was not saved`,
        JSON.stringify(saved).slice(0, 200),
      );
      return;
    }
    // The teacher has read it; now it goes to the class.
    await client.as(cls.teacher, "publish-assessment", { id });
    made++;
  });
  (run.record.pdfHandouts ??= []) as number[];
  (run.record.pdfHandouts as number[]).push(made);
  return made;
}
