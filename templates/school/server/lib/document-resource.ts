import { getOrgSetting } from "@agent-native/core/settings";
import { and, desc, eq } from "drizzle-orm";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { getDb, schema } from "../db/index.js";
import { CREST_SETTING_KEY, type StoredCrest } from "./school-crest.js";

/** Raw bytes of the PDF an AI app sends, before it is branded. */
export const MAX_DOCUMENT_BYTES = 12 * 1024 * 1024;
export const MAX_DOCUMENT_PAGES = 150;

const PDF_MAGIC = "%PDF-";

export interface BrandingInput {
  /** Printed small in the footer, e.g. "JSS3 Mathematics · Second Term". */
  footerText: string;
  schoolName: string;
}

/** Latin-1 only: the standard fonts cannot draw anything else. */
function plain(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7e]/g, "")
    .trim();
}

/**
 * Take a PDF somebody else made and return the school's copy of it.
 *
 * The pages are copied into a fresh document rather than edited in place, which
 * leaves behind anything the sender could have hidden in the file: scripts,
 * launch actions, attachments and form fields. The school's crest, name and a
 * footer are then drawn on every page, inside the margin, so the file is
 * still the school's when it is downloaded or printed.
 */
export async function brandPdf(
  bytes: Uint8Array,
  branding: BrandingInput,
  crest: StoredCrest | null,
): Promise<{ bytes: Uint8Array; pageCount: number }> {
  if (bytes.byteLength > MAX_DOCUMENT_BYTES) {
    throw new Error(
      `That file is ${(bytes.byteLength / 1048576).toFixed(1)} MB; the limit is ${MAX_DOCUMENT_BYTES / 1048576} MB. Send fewer pages, or lower the image quality.`,
    );
  }
  if (Buffer.from(bytes.slice(0, 5)).toString("latin1") !== PDF_MAGIC) {
    throw new Error("That is not a PDF file.");
  }

  let source: PDFDocument;
  try {
    source = await PDFDocument.load(bytes, { ignoreEncryption: false });
  } catch (err) {
    throw new Error(
      `The PDF could not be read (${(err as Error).message}). If it is password-protected, remove the password and send it again.`,
    );
  }
  const total = source.getPageCount();
  if (total === 0) throw new Error("That PDF has no pages.");
  if (total > MAX_DOCUMENT_PAGES) {
    throw new Error(
      `That PDF has ${total} pages; the limit is ${MAX_DOCUMENT_PAGES}. Make one document per topic.`,
    );
  }

  const out = await PDFDocument.create();
  const pages = await out.copyPages(source, source.getPageIndices());
  pages.forEach((p) => out.addPage(p));

  const font = await out.embedFont(StandardFonts.Helvetica);
  const bold = await out.embedFont(StandardFonts.HelveticaBold);

  // The crest, when the school has a PNG or JPEG one. An SVG cannot be drawn
  // into a PDF here, so the name alone carries the branding in that case.
  let image: Awaited<ReturnType<PDFDocument["embedPng"]>> | null = null;
  const match = crest?.dataUrl?.match(/^data:([^;,]+);base64,(.+)$/);
  if (match) {
    const data = Buffer.from(match[2], "base64");
    try {
      if (match[1] === "image/png") image = await out.embedPng(data);
      else if (match[1] === "image/jpeg") image = await out.embedJpg(data);
    } catch {
      image = null;
    }
  }

  const name = plain(branding.schoolName) || "School";
  const footer = plain(branding.footerText);
  const count = out.getPageCount();
  const ink = rgb(0.32, 0.32, 0.36);

  out.getPages().forEach((page, i) => {
    const { width, height } = page.getSize();
    const side = Math.max(24, width * 0.06);
    const iconSize = 20;

    // Header: crest and school name, small, in the top margin.
    let x = side;
    const top = height - 14 - iconSize;
    if (image) {
      const scale = iconSize / Math.max(image.width, image.height);
      page.drawImage(image, {
        x,
        y: top,
        width: image.width * scale,
        height: image.height * scale,
      });
      x += image.width * scale + 6;
    }
    page.drawText(name, {
      x,
      y: top + 6,
      size: 9,
      font: bold,
      color: ink,
    });

    // Footer: what it is for, and where it is in the document.
    page.drawLine({
      start: { x: side, y: 26 },
      end: { x: width - side, y: 26 },
      thickness: 0.4,
      color: rgb(0.8, 0.8, 0.82),
    });
    if (footer) {
      page.drawText(footer, { x: side, y: 14, size: 8, font, color: ink });
    }
    const label = `Page ${i + 1} of ${count}`;
    page.drawText(label, {
      x: width - side - font.widthOfTextAtSize(label, 8),
      y: 14,
      size: 8,
      font,
      color: ink,
    });
  });

  out.setTitle(plain(branding.footerText) || name);
  out.setProducer(name);
  out.setCreator(name);
  return { bytes: await out.save(), pageCount: count };
}

/** The crest and school name to stamp with, for one school. */
export async function brandingFor(orgId: string) {
  const crest = (await getOrgSetting(
    orgId,
    CREST_SETTING_KEY,
  )) as unknown as StoredCrest | null;
  const config = ((await getOrgSetting(orgId, "school-config")) ?? {}) as any;
  // The same name the printed worksheets carry in their header.
  const schoolName: string =
    config?.theme?.displayName ?? config?.name ?? "School";
  return { crest, schoolName };
}

/** The newest stored version of an activity's document, without its bytes. */
export async function documentOf(assessmentId: string) {
  const db = getDb();
  const [row] = await db
    .select({
      id: schema.documentFiles.id,
      version: schema.documentFiles.version,
      fileName: schema.documentFiles.fileName,
      byteSize: schema.documentFiles.byteSize,
      pageCount: schema.documentFiles.pageCount,
      createdAt: schema.documentFiles.createdAt,
    })
    .from(schema.documentFiles)
    .where(eq(schema.documentFiles.assessmentId, assessmentId))
    .orderBy(desc(schema.documentFiles.version))
    .limit(1);
  return row ?? null;
}

export async function documentBytes(
  assessmentId: string,
  fileId: string,
): Promise<{ bytes: Buffer; fileName: string } | null> {
  const db = getDb();
  const [row] = await db
    .select({
      data: schema.documentFiles.dataBase64,
      fileName: schema.documentFiles.fileName,
    })
    .from(schema.documentFiles)
    .where(
      and(
        eq(schema.documentFiles.id, fileId),
        eq(schema.documentFiles.assessmentId, assessmentId),
      ),
    )
    .limit(1);
  return row
    ? { bytes: Buffer.from(row.data, "base64"), fileName: row.fileName }
    : null;
}
