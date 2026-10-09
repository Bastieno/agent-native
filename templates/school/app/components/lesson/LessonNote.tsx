import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useLessonEditor } from "@/hooks/use-lesson-editor";
import { useSchoolDates } from "@/hooks/use-school-dates";
import { weekNumberIn, withoutWeekPrefix } from "@shared/week-prefix";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Markdown } from "@/components/Markdown";
import { toast } from "sonner";
import {
  IconArrowBackUp,
  IconCheck,
  IconEye,
  IconPencil,
  IconPrinter,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { BackLink } from "@/components/layout/BackLink";
import {
  MarkdownToolbar,
  boldShortcut,
} from "@/components/lesson/MarkdownToolbar";
import { MaterialSuggestions } from "@/components/lesson/MaterialSuggestions";

/**
 * One lesson note, written or read.
 *
 * The same note is opened by the teacher who owns it and by an admin checking
 * that it exists — and there is no good reason for those to be two different
 * screens that drift apart. What differs is only where "back" goes and which
 * portal the agent is told about.
 *
 * Whoever opens it sees who finalised it and who last edited it. An admin may
 * do both on a teacher's behalf; the teacher finding out by reading their own
 * note is the point.
 */
export function LessonNote({
  lessonId,
  role,
  backTo,
  backFallback,
}: {
  lessonId: string;
  role: "admin" | "teacher";
  /** Where the back link goes when the note names a class. */
  backTo: (classId: string) => string;
  /** Where it goes when it does not. */
  backFallback: string;
}) {
  const { sync } = useNavigationState();
  const { formatDate } = useSchoolDates();
  const qc = useQueryClient();
  const { liveEdit, save, clearEdit } = useLessonEditor(lessonId);

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-lesson-note?id=${lessonId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!lessonId,
  });

  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  /**
   * While this is in the future, what the teacher is typing wins.
   *
   * The editor polls the shared edit state every two seconds and saves a
   * second after the last keystroke, so a poll that lands mid-sentence
   * returns the note as it was *before* those keystrokes. Writing that back
   * into a controlled textarea replaces its value, and the browser answers a
   * replaced value by putting the caret at the end — so a teacher typing into
   * the middle of a paragraph was thrown to the bottom of the note.
   */
  const typingUntil = useRef(0);
  /** The last text we sent, so our own echo is never mistaken for a change. */
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!lessonId) return;
    // Same screen, two portals: each is told about its own.
    sync(
      role === "admin"
        ? { role: "admin", view: "lesson", lessonId }
        : { role: "teacher", view: "lesson", lessonId },
    );
  }, [sync, role, lessonId]);

  useEffect(() => {
    // Prefer live edit (agent changes), fall back to DB content.
    const incoming = liveEdit?.content ?? lesson?.content;
    if (incoming === undefined || incoming === content) return;
    // Our own save coming back around is not news.
    if (incoming === lastSent.current) return;
    // Mid-sentence, the person at the keyboard is the authority.
    if (Date.now() < typingUntil.current) return;

    // A real change from elsewhere — the agent rewriting a section while the
    // teacher reads it. Take it, but hold their place rather than dropping
    // them at the end of the note.
    const el = editorRef.current;
    const focused = !!el && document.activeElement === el;
    const caret = focused
      ? { start: el.selectionStart, end: el.selectionEnd }
      : null;
    setContent(incoming);
    if (caret && el) {
      requestAnimationFrame(() => {
        const limit = el.value.length;
        el.setSelectionRange(
          Math.min(caret.start, limit),
          Math.min(caret.end, limit),
        );
      });
    }
  }, [liveEdit?.content, lesson?.content, content]);

  const handleContentChange = (value: string) => {
    setContent(value);
    // Long enough to cover the save's own delay and the poll that follows it.
    typingUntil.current = Date.now() + 4_000;
    lastSent.current = value;
    save({
      title: lesson?.title ?? "",
      content: value,
      summary: lesson?.summary,
      status: lesson?.status ?? "draft",
    });
  };

  const finalizeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/finalize-lesson-note"),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: lessonId }),
        },
      );
      if (!res.ok) throw new Error("Failed to finalize");
    },
    onSuccess: () => {
      toast.success("Lesson marked ready");
      clearEdit();
      qc.invalidateQueries({ queryKey: ["lesson", lessonId] });
      qc.invalidateQueries({ queryKey: ["lesson-note-coverage"] });
    },
    onError: () => toast.error("Could not mark this lesson ready"),
  });

  const reopenMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/reopen-lesson-note"),
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: lessonId }),
        },
      );
      if (!res.ok) throw new Error("Failed to reopen");
    },
    onSuccess: () => {
      toast.success("Back to draft");
      qc.invalidateQueries({ queryKey: ["lesson", lessonId] });
      qc.invalidateQueries({ queryKey: ["lesson-note-coverage"] });
      qc.invalidateQueries({ queryKey: ["lesson-notes"] });
    },
    onError: () => toast.error("Could not reopen this lesson"),
  });

  const publishMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/publish-assessment"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        },
      );
      if (!res.ok) throw new Error((await res.text()) || "Failed to publish");
    },
    onSuccess: () => {
      toast.success("Your class can see it now");
      qc.invalidateQueries({ queryKey: ["lesson", lessonId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  // Taking something back: straight through when nobody has touched it,
  // with a word of warning when they have.
  const [unshareTarget, setUnshareTarget] = useState<{
    id: string;
    title: string;
    message: string;
  } | null>(null);

  const unshareMutation = useMutation({
    mutationFn: async ({ id, confirm }: { id: string; confirm?: boolean }) => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/unshare-assessment"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, confirm: confirm ?? false }),
        },
      );
      if (!res.ok) throw new Error((await res.text()) || "Failed");
      return (await res.json()) as any;
    },
    onSuccess: (result, variables) => {
      if (result?.needsConfirmation) {
        const material = lesson?.material?.find(
          (m: any) => m.id === variables.id,
        );
        setUnshareTarget({
          id: variables.id,
          title: material?.title ?? "this",
          message: result.message,
        });
        return;
      }
      setUnshareTarget(null);
      toast.success("Your class can no longer see it");
      qc.invalidateQueries({ queryKey: ["lesson", lessonId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading)
    return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
  if (!lesson)
    return (
      <div className="p-6 text-sm text-muted-foreground">Lesson not found.</div>
    );

  const finalizedOn = lesson.finalizedAt
    ? formatDate(lesson.finalizedAt, { day: "numeric", month: "short" })
    : null;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* BackLink's own mb-1 is for the stacked layout it usually sits
              in — above a heading. On this single row it lifts the link 2px
              off the title's centre line, so it is cleared here. */}
          <BackLink
            to={lesson.classId ? backTo(lesson.classId) : backFallback}
            className="mb-0 shrink-0"
          >
            {lesson.className ?? "Back"}
          </BackLink>
          <h1 className="truncate text-base font-semibold">{lesson.title}</h1>
          <Badge
            variant={lesson.status === "finalized" ? "default" : "secondary"}
            className="shrink-0 text-xs"
          >
            {lesson.status === "finalized" ? "Ready" : "Draft"}
          </Badge>
        </div>
        {lesson.status === "draft" ? (
          <Button
            size="sm"
            onClick={() => finalizeMutation.mutate()}
            disabled={finalizeMutation.isPending}
          >
            <IconCheck size={14} className="mr-1.5" />
            Mark ready
          </Button>
        ) : (
          // Quieter than marking ready: undoing a marking is the rarer act,
          // but it must be reachable by the teacher whose note it is.
          <Button
            size="sm"
            variant="ghost"
            onClick={() => reopenMutation.mutate()}
            disabled={reopenMutation.isPending}
          >
            <IconArrowBackUp size={14} className="mr-1.5" />
            Back to draft
          </Button>
        )}
      </div>

      {/* Who did what. Quiet, and only when there is something to say — a
          teacher who wrote and finalised their own note needs no banner. */}
      {lesson.finalizedBy || lesson.lastEditedBy || lesson.reopenedBy ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b bg-muted/30 px-6 py-2 text-xs text-muted-foreground">
          {lesson.finalizedBy ? (
            <span className="flex items-center gap-1.5">
              <IconCheck size={12} />
              {lesson.reopenedBy ? "Had been marked" : "Marked"} ready by{" "}
              {lesson.finalizedBy}
              {finalizedOn ? ` on ${finalizedOn}` : ""}
            </span>
          ) : null}
          {lesson.reopenedBy ? (
            <span className="flex items-center gap-1.5">
              <IconArrowBackUp size={12} />
              Put back to draft by {lesson.reopenedBy}
            </span>
          ) : null}
          {lesson.lastEditedBy ? (
            <span className="flex items-center gap-1.5">
              <IconPencil size={12} />
              Last edited by {lesson.lastEditedBy}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* The same measure the student portal has. A lesson note is prose
          and a worksheet is questions; both become hard to read when a line
          runs the width of a monitor — and worse with the agent panel
          closed, which is when the window is widest. */}
      <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col overflow-auto p-6">
        {lesson.status === "draft" ? (
          // A lesson note is written, not filled in: the editor takes the
          // height it is given rather than a fixed 500px box with dead space
          // under it.
          <Tabs
            defaultValue="write"
            // Grows into the space there is, never shrinks below a usable
            // writing area. The page scrolls when the window is too short —
            // which is what keeps the editor and what the class sees as two
            // things on one page rather than one drawn over the other.
            className="flex min-h-100 flex-1 shrink-0 flex-col space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <MarkdownToolbar
                textareaRef={editorRef}
                onChange={handleContentChange}
              />
              <div className="flex items-center gap-3">
                <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <IconPencil size={12} />
                  Changes save as you type.
                </span>
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </div>
            </div>
            <TabsContent value="write" className="min-h-0 flex-1">
              <Textarea
                ref={editorRef}
                className="h-full min-h-0 resize-none font-mono text-sm"
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                onKeyDown={(e) => boldShortcut(e, handleContentChange)}
                placeholder="Write this week's lesson here — use the buttons above for headings and lists."
              />
            </TabsContent>
            <TabsContent
              value="preview"
              className="min-h-0 flex-1 overflow-auto"
            >
              <Markdown>{content}</Markdown>
            </TabsContent>
          </Tabs>
        ) : (
          <div>
            <Markdown>{content}</Markdown>
          </div>
        )}

        {/* The plan above is yours. This is what the class opens — separate
            on purpose, because the starter questions and the materials list
            are not for the children sitting in the lesson. Nothing here
            reaches them until it is published. */}
        <div className="mt-6 space-y-2 border-t pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <IconEye size={13} />
              What your class sees
            </div>
            {/* One link, not a button per row: printing is per week far more
                often than per worksheet, and each piece comes out on its own
                sheet of paper anyway. It prints from the stored questions, so
                nothing is retyped on the way to the printer. */}
            {lesson.material?.length ? (
              <Link
                to={`/print/material/${lesson.id}`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                <IconPrinter size={13} />
                Print this week
              </Link>
            ) : null}
          </div>
          {lesson.material?.length ? (
            <div className="divide-y rounded-lg border">
              {lesson.material.map((m: any) => (
                <div key={m.id} className="flex items-center gap-3 p-3">
                  <div className="min-w-0 flex-1">
                    {/* The week is the heading of this page; repeating it on
                        every row pushes the part that differs out of sight. */}
                    <p className="truncate text-sm">
                      {withoutWeekPrefix(m.title, weekNumberIn(lesson.title))}
                    </p>
                    {/* The school's own word for the format, as it wrote it
                        — "worksheet", "WAEC practical". Only the first letter
                        is lifted, because it starts the line; capitalising
                        each word would make "Practical Write-Up" of it. */}
                    <p className="text-xs text-muted-foreground first-letter:uppercase">
                      {[
                        m.format,
                        m.gradingMode === "none" ? "not marked" : "marked",
                        m.durationMinutes ? `${m.durationMinutes} min` : null,
                        // Who gave it to the class. Said here rather than left
                        // to be noticed: an admin may share work with any
                        // class, and the teacher whose class it is should read
                        // that they did, not discover it.
                        m.status === "published" && m.publishedBy
                          ? `shared by ${m.publishedBy}${
                              m.publishedAt
                                ? `, ${formatDate(m.publishedAt, {
                                    day: "numeric",
                                    month: "short",
                                  })}`
                                : ""
                            }`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  {/* Reading it must not depend on its state. Sharing used
                      to replace the only way in with a tick, so the moment a
                      teacher gave something to the class they could no
                      longer see what they had given. */}
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      to={`/${role === "admin" ? "admin" : "teacher"}/assessments/${m.id}`}
                      className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                    >
                      Read it
                    </Link>
                    {m.status === "published" ? (
                      <>
                        <span className="ml-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <IconCheck size={12} />
                          Shared
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs text-muted-foreground"
                          onClick={() => unshareMutation.mutate({ id: m.id })}
                          disabled={unshareMutation.isPending}
                        >
                          Stop sharing
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs"
                        onClick={() => publishMutation.mutate(m.id)}
                        disabled={publishMutation.isPending}
                      >
                        Share with class
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nothing for the class yet.
            </p>
          )}
          {/* What this week could have, in the teacher's words, with the
              week's own objectives already in the prompt. */}
          <MaterialSuggestions
            lessonTitle={lesson.title}
            className={lesson.className ?? null}
            objectives={lesson.material?.[0]?.objectives ?? []}
            hasReading={
              !!lesson.material?.some((m: any) => m.responseMode === "none")
            }
            blueprint={lesson.blueprint as any}
          />
        </div>
      </div>

      {/* Only when it matters: a learner is partway through. */}
      <AlertDialog
        open={!!unshareTarget}
        onOpenChange={(open) => !open && setUnshareTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Stop sharing “{unshareTarget?.title}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {unshareTarget?.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Leave it shared</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                unshareTarget &&
                unshareMutation.mutate({ id: unshareTarget.id, confirm: true })
              }
            >
              Stop sharing
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
