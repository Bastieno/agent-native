import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { agentNativePath } from "@agent-native/core/client";
import { IconPrinter, IconFileText } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/Markdown";
import { useSchoolConfig } from "@/hooks/use-school-config";

/**
 * A document, on its own page, ready to print.
 *
 * Deliberately outside the portal shell: no navigation, no agent panel, no
 * school-coloured chrome. What is on screen is what comes out of the printer,
 * which is the only way a teacher can trust the preview.
 *
 * The document itself is markdown written by the agent and held in that user's
 * own application state — so it is private to them, it costs no schema, and it
 * disappears when it is no longer wanted. The heading is drawn from the
 * school's own configuration, so each school's paper carries its own name and
 * crest with no code between them.
 */
export default function PrintDocument() {
  const { documentId } = useParams<{ documentId: string }>();
  const { config } = useSchoolConfig();

  const { data: doc, isLoading } = useQuery({
    queryKey: ["document", documentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/application-state/document-${documentId}`,
        ),
      );
      if (!res.ok) return null;
      // A key that does not exist comes back as 200 with an empty body, so
      // res.json() would throw and the query would retry forever behind a
      // "Loading…" that never resolves.
      const text = await res.text();
      if (!text.trim()) return null;
      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {
        return null;
      }
      // The endpoint wraps the stored value; older shapes returned it bare.
      return (json?.value ?? json) as {
        title?: string;
        subtitle?: string | null;
        body?: string;
        orientation?: string;
        footnote?: string | null;
        createdAt?: string;
      } | null;
    },
    enabled: !!documentId,
  });

  const schoolName =
    (config as any)?.theme?.displayName ?? (config as any)?.name ?? null;
  const logoUrl = (config as any)?.theme?.logoUrl ?? null;
  const landscape = doc?.orientation === "landscape";

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading document…</p>
      </div>
    );
  }

  if (!doc?.body) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-6 text-center">
        <IconFileText size={28} className="text-muted-foreground" />
        <p className="text-sm font-medium">This document is no longer here</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          Documents are temporary — they are meant to be printed and discarded.
          Ask for it again and a fresh one will be made.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Page size belongs to the document, not the stylesheet: a term's worth
          of columns needs landscape, a class list does not. */}
      <style>{`@page { size: A4 ${landscape ? "landscape" : "portrait"}; margin: 14mm; }`}</style>

      <div className="min-h-screen bg-muted/30 py-6 print:bg-white print:py-0">
        {/* Screen-only controls. */}
        <div
          data-print-hide
          className="mx-auto mb-4 flex max-w-[210mm] items-center justify-between gap-3 px-4"
        >
          <p className="text-xs text-muted-foreground">
            Printing this saves it as a PDF. Nothing here is stored for anyone
            else.
          </p>
          <Button size="sm" onClick={() => window.print()}>
            <IconPrinter size={14} className="mr-1.5" />
            Print
          </Button>
        </div>

        <article
          className={`mx-auto bg-white p-[14mm] text-black shadow-sm print:p-0 print:shadow-none ${
            landscape ? "max-w-[297mm]" : "max-w-[210mm]"
          }`}
        >
          <header className="mb-5 border-b border-neutral-300 pb-4">
            <div className="flex items-start gap-3">
              {logoUrl ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                  src={logoUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 object-contain"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                {schoolName ? (
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {schoolName}
                  </p>
                ) : null}
                <h1 className="mt-0.5 text-lg font-semibold break-words">
                  {doc.title}
                </h1>
                {doc.subtitle ? (
                  <p className="mt-0.5 text-sm text-neutral-600">
                    {doc.subtitle}
                  </p>
                ) : null}
              </div>
              {doc.createdAt ? (
                <p className="shrink-0 text-xs text-neutral-500">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          </header>

          {/* The same renderer the rest of the app uses, so a table written by
              the agent prints the way it reads on screen. */}
          <Markdown className="print-body text-[13px] text-black">
            {doc.body}
          </Markdown>

          {doc.footnote ? (
            <footer className="mt-6 border-t border-neutral-300 pt-3 text-[11px] text-neutral-500">
              {doc.footnote}
            </footer>
          ) : null}
        </article>
      </div>
    </>
  );
}
