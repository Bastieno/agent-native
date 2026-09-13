import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { agentNativePath } from "@agent-native/core/client";
import { IconPrinter, IconFileText } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { LeavePrintView } from "@/components/layout/LeavePrintView";
import { Markdown } from "@/components/Markdown";
import { useSchoolConfig } from "@/hooks/use-school-config";

/**
 * A report card, printed from what was stored.
 *
 * The same letterhead and print stylesheet as any other document, but reading
 * from the report-card record rather than from a throwaway: the body is the
 * markdown frozen at issue, so this page cannot drift from the copy a parent
 * already has, whatever has happened to the marks since.
 *
 * The serial and issue date are on the page for a reason. When a parent rings
 * about a grade, the school needs to know which document they are holding.
 */
export default function PrintReportCard() {
  const { reportId } = useParams<{ reportId: string }>();
  const { config } = useSchoolConfig();

  const { data: report, isLoading } = useQuery({
    queryKey: ["report-card", reportId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-report-card?id=${reportId}`,
        ),
      );
      if (!res.ok) return null;
      const text = await res.text();
      if (!text.trim()) return null;
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    },
    enabled: !!reportId,
    retry: false,
  });

  const schoolName =
    (config as any)?.theme?.displayName ?? (config as any)?.name ?? null;
  const logoUrl = (config as any)?.theme?.logoUrl ?? null;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading report…</p>
      </div>
    );
  }

  if (!report?.documentMarkdown) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-6 text-center">
        <IconFileText size={28} className="text-muted-foreground" />
        <p className="text-sm font-medium">This report card was not found</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          It may have been issued by another school, or the link may be wrong.
        </p>
        <div className="mt-2">
          <LeavePrintView />
        </div>
      </div>
    );
  }

  const snapshot = report.snapshot ?? {};

  return (
    <>
      <style>{`@page { size: A4 portrait; margin: 14mm; }`}</style>

      <div className="min-h-screen bg-muted/30 py-6 print:bg-white print:py-0">
        <div
          data-print-hide
          className="mx-auto mb-4 flex max-w-[210mm] items-center justify-between gap-3 px-4"
        >
          <div className="flex min-w-0 items-center gap-3">
            <LeavePrintView />
            <p className="truncate text-xs text-muted-foreground">
              Issued {new Date(report.issuedAt).toLocaleDateString()} · this is
              the record as it was issued and will not change.
            </p>
          </div>
          <Button size="sm" onClick={() => window.print()}>
            <IconPrinter size={14} className="mr-1.5" />
            Print
          </Button>
        </div>

        <article className="mx-auto max-w-[210mm] bg-white p-[14mm] text-black shadow-sm print:p-0 print:shadow-none">
          <header className="mb-5 border-b border-neutral-300 pb-4">
            <div className="flex items-start gap-3">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt=""
                  className="h-14 w-14 shrink-0 object-contain"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                {schoolName ? (
                  <p className="text-sm font-semibold uppercase tracking-wide">
                    {schoolName}
                  </p>
                ) : null}
                <h1 className="mt-0.5 text-lg font-semibold">
                  Report card
                  {snapshot?.term?.name ? ` — ${snapshot.term.name}` : ""}
                </h1>
              </div>
              <div className="shrink-0 text-right text-[11px] text-neutral-500">
                {report.serial ? <p>{report.serial}</p> : null}
                <p>{new Date(report.issuedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </header>

          {/* The wording exactly as it was frozen. */}
          <Markdown className="print-body text-[13px] text-black">
            {report.documentMarkdown}
          </Markdown>

          <footer className="mt-8 border-t border-neutral-300 pt-3 text-[11px] text-neutral-500">
            Issued {new Date(report.issuedAt).toLocaleString()}
            {report.serial ? ` · reference ${report.serial}` : ""}. Quote this
            reference in any query about this report.
          </footer>
        </article>
      </div>
    </>
  );
}
