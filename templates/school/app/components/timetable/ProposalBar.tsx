import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IconCalendarPlus } from "@tabler/icons-react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { callAction } from "./arms-shared";
import type { Proposal } from "./use-timetable";

/**
 * Draft a timetable for the term. Generating is the one deliberate wait: the
 * button says so while the server works. Classes without a teacher are asked
 * about first, in a dialog, before anything is drafted.
 */
export function GenerateButton({ termId }: { termId: string }) {
  const qc = useQueryClient();
  const [generating, setGenerating] = useState(false);
  const [ask, setAsk] = useState<string | null>(null);

  const run = async (confirm: boolean) => {
    setGenerating(true);
    try {
      const r = await callAction("generate-timetable", {
        termId,
        ...(confirm ? { confirm: true } : {}),
      });
      if (r.needsConfirm) {
        setAsk(r.message);
        return;
      }
      setAsk(null);
      toast.success(r.message);
      if (!r.proposalId) return; // nothing was drafted, so no bar to show
      qc.invalidateQueries({ queryKey: ["timetable", termId] });
    } catch (e: any) {
      setAsk(null);
      toast.error(e?.message ?? "A timetable couldn't be drafted.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-1.5 text-xs"
        disabled={generating}
        onClick={() => run(false)}
      >
        <IconCalendarPlus size={14} />
        {generating ? "Generating…" : "Generate"}
      </Button>
      <AlertDialog open={ask !== null} onOpenChange={(o) => !o && setAsk(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate anyway?</AlertDialogTitle>
            <AlertDialogDescription>{ask}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={generating}
              onClick={(e) => {
                e.preventDefault();
                run(true);
              }}
            >
              {generating ? "Generating…" : "Generate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/** One line over the grid for the draft waiting: what it holds, accept, discard. */
export function ProposalBar({
  termId,
  proposal,
}: {
  termId: string;
  proposal: Proposal;
}) {
  const qc = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const { lessons } = proposal.summary;
  const sentences = [
    ...proposal.reasons.map((r) => r.message),
    ...proposal.notSet,
    ...proposal.noTeacher,
  ];
  // What the popover lists, counted as the sentences it shows.
  const review = sentences.length;

  const finish = async (name: string, onDone?: () => void) => {
    try {
      const r = await callAction(name, { proposalId: proposal.id });
      toast.success(r.message);
      onDone?.();
    } catch (e: any) {
      toast.error(e?.message ?? "That draft couldn't be updated.");
    } finally {
      qc.invalidateQueries({ queryKey: ["timetable", termId] });
    }
  };

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed px-4 py-2"
      data-testid="proposal-bar"
    >
      <p className="text-sm">
        <span className="font-medium">Proposal</span>
        <span className="text-muted-foreground">
          {" · "}
          {lessons} {lessons === 1 ? "lesson" : "lessons"}
        </span>
        {review > 0 ? (
          <>
            <span className="text-muted-foreground">{" · "}</span>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-foreground"
                  data-testid="proposal-not-fitted"
                >
                  {review} to review
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="max-h-80 w-96 space-y-1.5 overflow-y-auto text-sm"
                data-testid="proposal-reasons"
              >
                {sentences.map((m, i) => (
                  <p key={i}>{m}</p>
                ))}
              </PopoverContent>
            </Popover>
          </>
        ) : null}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          disabled={discarding || accepting}
          onClick={async () => {
            setDiscarding(true);
            try {
              await finish("discard-timetable-proposal");
            } finally {
              setDiscarding(false);
            }
          }}
        >
          Discard
        </Button>
        <Button
          size="sm"
          className="h-8 text-xs"
          disabled={discarding || accepting}
          onClick={() => setConfirming(true)}
        >
          Accept
        </Button>
      </div>
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept this proposal?</AlertDialogTitle>
            <AlertDialogDescription>
              {lessons} {lessons === 1 ? "lesson is" : "lessons are"} added to
              the timetable. The lessons already there stay where they are.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={accepting}
              onClick={async (e) => {
                e.preventDefault();
                setAccepting(true);
                await finish("accept-timetable-proposal");
                setAccepting(false);
                setConfirming(false);
              }}
            >
              {accepting ? "Accepting…" : "Accept"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
