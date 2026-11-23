import PDFDocument from "pdfkit";
import type { DigestFigures } from "./digest-figures.js";
import { ownerKinds, periodLabel } from "./digest-render.js";
import { NOTO_SERIF_BOLD, NOTO_SERIF_REGULAR } from "./pdf-fonts.js";
import { formatNaira as n } from "./money.js";
import {
  BUSINESS_NAMES as NAMES,
  FLAG_WORDS,
  signalText,
} from "../../shared/labels.js";

/**
 * The digest as a one-or-two page PDF: cream paper, a serif face, small red
 * labels over each section and thin rules, like the project guide. Like every
 * digest it never names customers, senders or staff.
 */

const TITLES = {
  daily: "Daily digest",
  weekly: "Weekly digest",
  monthly: "Monthly digest",
  range: "Report",
} as const;

const PAPER = "#f5f1e8";
const INK = "#1f1b16";
const MUTED = "#6b645a";
const RED = "#b8321f";
const RULE = "#d8d2c4";
const MARGIN = 56;

export async function renderDigestPdf(
  f: DigestFigures,
  commentary: string | null,
  link: string,
): Promise<Buffer> {
  const regular = Buffer.from(NOTO_SERIF_REGULAR, "base64");
  const bold = Buffer.from(NOTO_SERIF_BOLD, "base64");
  const doc = new PDFDocument({
    size: "A4",
    margin: MARGIN,
    font: regular as unknown as string, // pdfkit takes a font buffer too; its types say path only
    bufferPages: true,
    info: { Title: `Books ${TITLES[f.period]} ${periodLabel(f)}` },
  });
  doc.registerFont("Regular", regular);
  doc.registerFont("Bold", bold);
  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((resolve) =>
    doc.on("end", () => resolve(Buffer.concat(chunks))),
  );

  const width = doc.page.width - MARGIN * 2;
  const paper = () => {
    doc
      .save()
      .rect(0, 0, doc.page.width, doc.page.height)
      .fill(PAPER)
      .restore();
  };
  paper();
  doc.on("pageAdded", () => {
    paper();
    doc.x = MARGIN;
    doc.y = MARGIN;
  });
  const room = (h: number) => {
    if (doc.y + h > doc.page.height - MARGIN - 20) doc.addPage();
  };

  const label = (text: string) => {
    room(60);
    doc.moveDown(0.9);
    doc.font("Bold").fontSize(8).fillColor(RED);
    doc.text(text.toUpperCase(), MARGIN, doc.y, { characterSpacing: 1 });
    doc.moveDown(0.5);
  };
  const para = (text: string, size = 10.5) => {
    room(40);
    doc.font("Regular").fontSize(size).fillColor(INK);
    doc.text(text, MARGIN, doc.y, { width, lineGap: 3 });
    doc.moveDown(0.5);
  };
  const rule = (strong = false) => {
    doc
      .moveTo(MARGIN, doc.y)
      .lineTo(MARGIN + width, doc.y)
      .lineWidth(strong ? 1 : 0.5)
      .strokeColor(strong ? MUTED : RULE)
      .stroke();
  };
  /** A table: first column left, the rest right-aligned. */
  const table = (head: string[], body: string[][], boldLast = false) => {
    const first = Math.max(110, width * 0.3);
    const col = (width - first) / Math.max(1, head.length - 1);
    const line = (
      cells: string[],
      opts: { head?: boolean; bold?: boolean },
    ) => {
      room(24);
      const y = doc.y + 6;
      cells.forEach((c, i) => {
        doc
          .font(opts.head || opts.bold ? "Bold" : "Regular")
          .fontSize(opts.head ? 7.5 : 9.5)
          .fillColor(opts.head ? RED : INK);
        doc.text(
          opts.head ? c.toUpperCase() : c,
          i === 0 ? MARGIN : MARGIN + first + col * (i - 1),
          y,
          {
            width: i === 0 ? first : col,
            align: i === 0 ? "left" : "right",
            characterSpacing: opts.head ? 0.8 : 0,
          },
        );
      });
      doc.y = y + 16;
      rule(!!opts.head);
    };
    line(head, { head: true });
    body.forEach((r, i) =>
      line(r, { bold: boldLast && i === body.length - 1 }),
    );
    doc.moveDown(0.3);
  };

  // Header strip
  doc.font("Bold").fontSize(8).fillColor(RED);
  doc.text("BOOKS", MARGIN, MARGIN, { characterSpacing: 1, continued: false });
  doc.font("Regular").fontSize(8.5).fillColor(MUTED);
  doc.text(periodLabel(f), MARGIN, MARGIN, { width, align: "right" });
  doc.moveDown(2.2);

  doc.font("Bold").fontSize(30).fillColor(INK);
  doc.text(TITLES[f.period], MARGIN, doc.y, { width });
  doc.moveDown(0.3);
  doc
    .font("Regular")
    .fontSize(12)
    .fillColor(MUTED)
    .text(
      `Income ${n(f.combined.income)} · gross profit ${n(f.combined.grossProfit)} · net ${n(f.combined.net)}${f.combined.margin != null ? ` · margin ${f.combined.margin}%` : ""}`,
      MARGIN,
      doc.y,
      { width },
    );
  doc.moveDown(0.8);
  rule(true);

  if (commentary) {
    doc.moveDown(0.8);
    for (const p of commentary.split(/\n{2,}/))
      if (p.trim()) para(p.replace(/\n/g, " ").trim(), 11.5);
  }

  label("By business");
  const names = ["lounge", "hub"].filter((b) => f.businesses[b]);
  const rows = names.map((b) => {
    const x = f.businesses[b];
    return [
      NAMES[b] ?? b,
      n(x.income),
      n(x.costOfGoods),
      n(x.grossProfit),
      n(x.expenses),
      n(x.net),
    ];
  });
  rows.push([
    "Both",
    n(f.combined.income),
    n(f.combined.costOfGoods),
    n(f.combined.grossProfit),
    n(f.combined.expenses),
    n(f.combined.net),
  ]);
  table(
    ["", "Income", "Goods cost", "Gross profit", "Expenses", "Net"],
    rows,
    true,
  );

  const methods = Object.entries(f.incomeByMethod).sort((a, b) => b[1] - a[1]);
  if (methods.length) {
    label("How it was paid");
    table(
      ["Method", "Income"],
      methods.map(([m, v]) => [m, n(v)]),
    );
  }

  const cats = Object.entries(f.expenseByCategory)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  if (cats.length) {
    label("Where the expenses went");
    table(
      ["Category", "Amount"],
      cats.map(([c, v]) => [c, n(v)]),
    );
  }

  const notes: string[] = [];
  if (f.ownersPay > 0 || f.unitemised > 0)
    notes.push(
      `Included in expenses: owner's pay ${n(f.ownersPay)}${ownerKinds(f)}; sent to a manager for stock with no breakdown ${n(f.unitemised)}. Net before owner's pay: ${n(f.combined.net + f.ownersPay)}.`,
    );
  if (f.stockBought > 0)
    notes.push(
      `Stock bought ${n(f.stockBought)}, against cost of goods sold ${n(f.combined.costOfGoods)}. Stock is not taken off again as an expense.`,
    );
  const moved = Object.entries(f.notCosts ?? {});
  if (moved.length)
    notes.push(
      `Money moved, not counted as costs: ${moved.map(([c, v]) => `${c.toLowerCase()} ${n(v)}`).join("; ")}.`,
    );
  const given = f.notIncome.atCost;
  notes.push(
    `Given away at cost: The House ${n(given.house)}, subscriber meals ${n(given.perk)}, leakages and missing stock ${n(given.leakages)}.`,
  );
  if (f.uncostedRevenue > 0)
    notes.push(
      `${n(f.uncostedRevenue)} of sales have no cost yet; send a Sales by item report.`,
    );
  label("Worth knowing");
  for (const t of notes) para(t);

  const good = f.trends.filter((s) => s.direction === "good").map(signalText);
  const watch = f.trends.filter((s) => s.direction === "watch").map(signalText);
  if (good.length || watch.length) {
    label("Going well and to watch");
    if (good.length) para(`Going well: ${good.join("; ")}.`);
    if (watch.length) para(`To watch: ${watch.join("; ")}.`);
  }
  const checks = Object.entries(f.flagCounts)
    .filter(([k]) => FLAG_WORDS[k])
    .map(([k, c]) => `${c} ${FLAG_WORDS[k]}`);
  if (checks.length) {
    label("Checks");
    para(`${checks.join(", ")}.`);
  }

  room(40);
  doc.moveDown(0.6);
  doc.font("Regular").fontSize(9).fillColor(MUTED);
  doc.text(`Full report: ${link}`, MARGIN, doc.y, { width, link });

  // Footers, once the page count is known.
  const range = doc.bufferedPageRange();
  const bottom = doc.page.margins.bottom;
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    doc.page.margins.bottom = 0; // let the footer sit in the margin without adding a page
    const y = doc.page.height - MARGIN + 14;
    doc.font("Regular").fontSize(8.5).fillColor(MUTED);
    doc.text(`Books · ${TITLES[f.period]}`, MARGIN, y, {
      width,
      align: "left",
      lineBreak: false,
    });
    doc.text(`${i + 1} / ${range.count}`, MARGIN, y, {
      width,
      align: "right",
      lineBreak: false,
    });
  }
  doc.end();
  return done;
}

/** The file name a digest PDF is sent under. */
export const digestPdfName = (f: DigestFigures) =>
  `books-${f.period}-${f.start}${f.end !== f.start ? `-to-${f.end}` : ""}.pdf`;
