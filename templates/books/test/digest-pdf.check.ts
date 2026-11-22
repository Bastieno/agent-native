import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { bootBooks, check, finish, fixture } from "./helpers.js";

const { asOwner } = await bootBooks("check-digest-pdf");
const importFile = (await import("../server/lib/import-file.js"))
  .importMoniebookFile;
const buildDigest = (await import("../actions/build-digest.js")).default;
const { renderDigestPdf, digestPdfName } =
  await import("../server/lib/digest-pdf.js");

await asOwner(async () => {
  await importFile("org1", fixture("sales-sample.csv"), {
    fileName: "sales-summary2026-11-10-2026-11-01.csv",
    receivedVia: "upload",
  });
  await importFile("org1", fixture("item-sample.csv"), {
    fileName: "item-sales-report-2026-11-01-2026-11-10.csv",
    receivedVia: "upload",
  });
});

await check("the weekly digest renders as a PDF", async () => {
  const { figures } = await asOwner(() =>
    buildDigest.run({
      period: "weekly",
      start: "2026-11-02",
      end: "2026-11-08",
    }),
  );
  const pdf = await renderDigestPdf(
    figures,
    "A steady week.\n\nThe Hub did well.",
    "https://books.example/reports/1",
  );
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.length > 5000);
  assert.equal(
    digestPdfName(figures),
    "books-weekly-2026-11-02-to-2026-11-08.pdf",
  );
  if (process.env.PDF_OUT) writeFileSync(process.env.PDF_OUT, pdf);
});

await finish();
