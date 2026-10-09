import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { agentNativePath } from "@agent-native/core/client";
import { IconFileText, IconPrinter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { LeavePrintView } from "@/components/layout/LeavePrintView";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { parseActivityContent } from "@shared/activity-content";
import { paperFor } from "@shared/paper";
import { PrintBlocks } from "./PrintBlocks";

/**
 * A week's material — or one activity — printed from what is stored.
 *
 * The other print route takes markdown somebody composed. This one takes the
 * activity itself, so nothing is retyped: the questions, the options, the marks
 * and the mark scheme come out of the same blocks the class answers on screen.
 * That matters because transcription is where printing went wrong — options
 * typed onto one line printed as one run of prose, and a mark scheme written
 * out by hand drifts from the one marking actually uses.
 *
 * Two copies, and the difference is real rather than cosmetic: the class's copy
 * is stripped on the server, so an answer key is not sitting in the page a
 * child could save. Switching copies re-fetches rather than re-styling.
 *
 * Each activity starts on a fresh page. A worksheet and a practical sharing a
 * sheet of paper is not something a teacher can hand out.
 */
export function ActivityPrintSheet({
  lessonNoteId,
  assessmentId,
}: {
  lessonNoteId?: string;
  assessmentId?: string;
}) {
  const [params, setParams] = useSearchParams();
  // A teacher printing for themselves is the common case from a lesson page,
  // but the copy that goes to the class is the one printed in bulk — so it is
  // a deliberate choice either way, never a default that quietly hands out
  // answers.
  const forClass = params.get("for") !== "teacher";
  const { config } = useSchoolConfig();

  const { data, isLoading } = useQuery({
    queryKey: ["print-material", lessonNoteId ?? assessmentId, forClass],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (lessonNoteId) query.set("lessonNoteId", lessonNoteId);
      if (assessmentId) query.set("assessmentId", assessmentId);
      query.set("forClass", String(forClass));
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-print-material?${query.toString()}`,
        ),
      );
      if (!res.ok) throw new Error(`could not load (${res.status})`);
      return (await res.json()) as {
        lesson: {
          title: string | null;
          lessonDate: string | null;
          className: string | null;
          subjectName: string | null;
        } | null;
        items: Array<{
          id: string;
          title: string;
          format: string | null;
          renderAs: string | null;
          totalPoints: number | null;
          durationMinutes: number | null;
          gradingMode: string | null;
          responseMode: string | null;
          instructions: string | null;
          markdown: string | null;
          content: unknown;
          rubric: {
            title: string;
            criteria: { description: string; maxPoints: number }[];
          } | null;
        }>;
      };
    },
    enabled: !!(lessonNoteId || assessmentId),
  });

  const schoolName =
    (config as any)?.theme?.displayName ?? (config as any)?.name ?? null;
  const logoUrl = (config as any)?.theme?.logoUrl ?? null;
  // The school's own paper. A page laid out for A4 comes off a Letter
  // printer scaled down or with its last line on a second sheet.
  const paper = paperFor(config);
  // A school's own words, where it has given them: what a mark is called, and
  // what it calls a class on the line a child writes their name on.
  const labels = ((config as any)?.customLabels ?? {}) as Record<
    string,
    string
  >;
  const marks = {
    one: labels.mark ?? "mark",
    many: labels.marks ?? (labels.mark ? `${labels.mark}s` : "marks"),
  };
  const classWord = labels.class ?? "Class";

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!data?.items?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-6 text-center">
        <IconFileText size={28} className="text-muted-foreground" />
        <p className="text-sm font-medium">There is nothing to print here</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          No material has been made for this yet. Ask for a worksheet, a reading
          page or a card deck first, then print it.
        </p>
        <div className="mt-2">
          <LeavePrintView />
        </div>
      </div>
    );
  }

  const lesson = data.lesson;
  const subtitle = [lesson?.subjectName, lesson?.className]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <style>{`@page { size: ${paper.css} portrait; margin: ${paper.margin}; }`}</style>

      <div className="min-h-screen bg-muted/30 py-6 print:bg-white print:py-0">
        <div
          data-print-hide
          style={{ maxWidth: paper.width }}
          className="mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 px-4"
        >
          <div className="flex min-w-0 items-center gap-3">
            <LeavePrintView />
            <p className="truncate text-xs text-muted-foreground">
              {forClass
                ? "This is the copy for the class — no answers, no mark schemes."
                : "Your copy — answers and mark schemes included."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set("for", forClass ? "teacher" : "class");
                setParams(next, { replace: true });
              }}
            >
              {forClass ? "Show answers" : "Copy for the class"}
            </Button>
            <Button size="sm" onClick={() => window.print()}>
              <IconPrinter size={14} className="mr-1.5" />
              Print
            </Button>
          </div>
        </div>

        <article
          style={{ maxWidth: paper.width, padding: paper.margin }}
          className="mx-auto bg-white text-black shadow-sm print:p-0 print:shadow-none"
        >
          {data.items.map((item, i) => (
            <section
              key={item.id}
              // Each thing handed out is its own sheet of paper.
              className={i < data.items.length - 1 ? "break-after-page" : ""}
            >
              <header className="mb-5 border-b border-neutral-300 pb-4">
                <div className="flex items-start gap-3">
                  {logoUrl ? (
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
                      {item.title}
                    </h1>
                    {/* A reading page is usually titled after the week it is
                        for, so naming the week again underneath says the same
                        thing twice. */}
                    {subtitleFor(subtitle, lesson?.title, item.title) ? (
                      <p className="mt-0.5 text-sm text-neutral-600">
                        {subtitleFor(subtitle, lesson?.title, item.title)}
                      </p>
                    ) : null}
                  </div>
                  {/* What a learner needs to know before starting, where it
                      belongs on a paper: beside the title, not in a footnote. */}
                  <div className="shrink-0 text-right text-xs text-neutral-500">
                    {item.format ? (
                      <p className="first-letter:uppercase">{item.format}</p>
                    ) : null}
                    {typeof item.totalPoints === "number" &&
                    item.totalPoints > 0 ? (
                      <p>
                        {item.totalPoints}{" "}
                        {item.totalPoints === 1 ? marks.one : marks.many}
                      </p>
                    ) : null}
                    {item.durationMinutes ? (
                      <p>{item.durationMinutes} min</p>
                    ) : null}
                  </div>
                </div>
                {/* Only on work that is handed in. A page to read comes back
                    with nobody's name on it, because it never goes anywhere. */}
                {forClass && item.responseMode !== "none" ? (
                  <p className="mt-3 text-xs text-neutral-600">
                    Name: ______________________________ {classWord}:
                    ______________ Date: ______________
                  </p>
                ) : null}
              </header>

              {item.instructions ? (
                <p className="mb-3 text-[12px] italic text-neutral-700">
                  {item.instructions}
                </p>
              ) : null}

              <PrintBlocks
                content={parseActivityContent(item.content, item.renderAs)}
                markdown={item.markdown}
                marks={marks}
              />

              {/* Teacher's copy only — the server does not send it otherwise.
                  Marks in the corner mean nothing without the criteria they
                  are split across. */}
              {item.rubric?.criteria.length ? (
                <section className="mt-5 break-inside-avoid border-t border-neutral-300 pt-3">
                  <h2 className="mb-2 text-[12px] font-semibold">
                    How this is marked
                  </h2>
                  <table className="w-full border-collapse text-[12px]">
                    <tbody>
                      {item.rubric.criteria.map((c, j) => (
                        <tr key={j} className="align-top">
                          <td className="border border-neutral-400 px-2 py-1">
                            {c.description}
                          </td>
                          <td className="w-16 border border-neutral-400 px-2 py-1 tabular-nums">
                            {c.maxPoints}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ) : null}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}

/** The line under the title, with the week left out when it is the title. */
function subtitleFor(
  subject: string,
  lessonTitle?: string | null,
  itemTitle?: string,
): string {
  const parts = [subject];
  if (lessonTitle && !itemTitle?.includes(lessonTitle)) parts.push(lessonTitle);
  return parts.filter(Boolean).join(" — ");
}
