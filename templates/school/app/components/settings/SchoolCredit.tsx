import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { IconChevronDown, IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AssistantKeyForm } from "@/components/settings/AssistantKey";
import { CREDIT_PACKS } from "@shared/credits";

interface Credit {
  mode: "managed" | "byo" | "none";
  credits: number;
  staffRequests: number;
  low: boolean;
  out: boolean;
  payInstructions: string | null;
  history: Array<{
    kind: string;
    credits: number;
    at: string;
    note: string | null;
    reference: string | null;
  }>;
}

const KIND: Record<string, string> = {
  grant: "Added",
  debit: "Used",
  adjustment: "Adjusted",
  refund: "Refunded",
};

export function useSchoolCredit() {
  return useQuery<Credit>({
    queryKey: ["school-credit"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-credit"),
      );
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      return res.json();
    },
  });
}

async function post(action: string, body: Record<string, unknown>) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${action}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? "That did not work. Try again.");
  return data;
}

function TopUp({
  open,
  onOpenChange,
  instructions,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructions: string | null;
}) {
  const [pack, setPack] = useState(CREDIT_PACKS[0].credits);
  const [reference, setReference] = useState("");
  const [saving, setSaving] = useState(false);

  async function send() {
    setSaving(true);
    try {
      const result = await post("request-credit-top-up", {
        credits: pack,
        reference: reference || undefined,
      });
      toast.success(result.message);
      setReference("");
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Top up the assistant</DialogTitle>
          <DialogDescription>
            Pay for a pack, then tell us here. The credit is added once we see
            the payment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            {CREDIT_PACKS.map((p) => (
              <button
                key={p.credits}
                type="button"
                onClick={() => setPack(p.credits)}
                className={`flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm ${
                  pack === p.credits ? "border-primary bg-accent" : ""
                }`}
              >
                <span>{p.credits.toLocaleString("en")} credits</span>
                <span className="text-muted-foreground">
                  ₦{p.naira.toLocaleString("en")}
                </span>
              </button>
            ))}
          </div>
          {instructions ? (
            <p className="whitespace-pre-line rounded-md bg-muted p-3 text-xs">
              {instructions}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Ask the people running Ellai where to send the payment.
            </p>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="topup-ref" className="text-xs">
              Payment reference (optional)
            </Label>
            <Input
              id="topup-ref"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="h-9"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={send} disabled={saving}>
            {saving ? <IconLoader2 size={14} className="animate-spin" /> : null}
            I've paid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * How the assistant is paid for. A school on Ellai's credit sees what is left
 * and a way to top up; its own key sits behind a disclosure. A school with no
 * credit set up never sees any of this.
 */
export function SchoolCredit() {
  const queryClient = useQueryClient();
  const { data } = useSchoolCredit();
  const [topUp, setTopUp] = useState(false);
  const [confirmSwitch, setConfirmSwitch] = useState(false);
  if (!data || data.mode === "none") return null;

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["school-credit"] });
    queryClient.invalidateQueries({ queryKey: ["assistant-status"] });
    window.dispatchEvent(new CustomEvent("agent-engine:configured-changed"));
  };

  async function useCredit() {
    try {
      await post("switch-assistant-billing", { mode: "managed" });
      toast.success("The assistant now runs on the school's credit");
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (data.mode === "byo") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-lg border bg-card p-4">
        <p className="text-xs text-muted-foreground">
          The assistant runs on your own key.
          {data.credits > 0
            ? ` ${data.credits.toLocaleString("en")} credits are kept for if you switch back.`
            : ""}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmSwitch(true)}
        >
          Use Ellai's credit
        </Button>
        <AlertDialog open={confirmSwitch} onOpenChange={setConfirmSwitch}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Use Ellai's credit?</AlertDialogTitle>
              <AlertDialogDescription>
                Your saved Anthropic key will be removed, and the assistant will
                run on the school's credit instead.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep my key</AlertDialogCancel>
              <AlertDialogAction onClick={useCredit}>Switch</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {data.credits.toLocaleString("en")} credits
            </p>
            {data.out ? (
              <Badge variant="destructive">Used up</Badge>
            ) : data.low ? (
              <Badge variant="secondary">Running low</Badge>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.out
              ? "The assistant is off until the school tops up."
              : `About ${data.staffRequests.toLocaleString("en")} working requests from staff, and many more questions from learners.`}
          </p>
        </div>
        <Button
          variant={data.out || data.low ? "default" : "outline"}
          size="sm"
          onClick={() => setTopUp(true)}
        >
          Top up
        </Button>
      </div>
      <Collapsible>
        <CollapsibleTrigger className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <IconChevronDown size={12} /> Credit history
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-1">
          {data.history.length === 0 ? (
            <p className="text-xs text-muted-foreground">Nothing yet.</p>
          ) : (
            data.history.map((e, i) => (
              <div
                key={i}
                className="flex justify-between gap-3 text-xs text-muted-foreground"
              >
                <span>
                  {e.at.slice(0, 10)} · {KIND[e.kind] ?? e.kind}
                  {e.reference ? ` · ${e.reference}` : ""}
                  {e.note ? ` · ${e.note}` : ""}
                </span>
                <span className="tabular-nums">
                  {e.credits > 0 ? "+" : ""}
                  {e.credits.toLocaleString("en")}
                </span>
              </div>
            ))
          )}
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <IconChevronDown size={12} /> Use your own Anthropic key instead
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <AssistantKeyForm onSaved={refresh} />
        </CollapsibleContent>
      </Collapsible>
      <TopUp
        open={topUp}
        onOpenChange={setTopUp}
        instructions={data.payInstructions}
      />
    </div>
  );
}
