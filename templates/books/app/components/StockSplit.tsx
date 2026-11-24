import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useActionMutation } from "@agent-native/core/client";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { naira } from "@/lib/books";
import { STOCK_KEYS, stockKeyName, type StockKey } from "@shared/stock-groups";

export interface StockSplitValue {
  parts: { group: StockKey; amount: number }[];
  mismatch: boolean;
  byOwner: boolean;
}

const FROM_NOTE = "from-note";

/**
 * Which Lounge menu groups a stock purchase was for. Read from the note
 * unless the owner files it under a group here.
 */
export function StockSplitBox({
  code,
  amount,
  split,
  canEdit,
}: {
  code: string;
  amount: number;
  split: StockSplitValue;
  canEdit: boolean;
}) {
  const qc = useQueryClient();
  const setSplit = useActionMutation("set-stock-split");
  const [shown, setShown] = useState(split);
  useEffect(() => setShown(split), [split]);

  function fileUnder(v: string) {
    const before = shown;
    if (v !== FROM_NOTE)
      setShown({
        parts: [{ group: v as StockKey, amount }],
        mismatch: false,
        byOwner: true,
      });
    setSplit.mutate(
      v === FROM_NOTE ? { code, parts: [] } : { code, group: v as StockKey },
      {
        onError: (err) => {
          setShown(before);
          toast.error(err.message);
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ["action"] }),
      },
    );
  }

  const one = shown.parts.length === 1 ? shown.parts[0].group : undefined;
  return (
    <div className="space-y-1.5">
      <Label>Menu group</Label>
      {shown.parts.length > 1 && (
        <div className="space-y-1 rounded-md border border-border px-3 py-2 text-sm">
          {shown.parts.map((p) => (
            <div key={p.group} className="flex justify-between gap-3">
              <span>{stockKeyName(p.group)}</span>
              <span className="tabular-nums">{naira(p.amount)}</span>
            </div>
          ))}
        </div>
      )}
      <Select disabled={!canEdit} value={one ?? ""} onValueChange={fileUnder}>
        <SelectTrigger>
          <SelectValue
            placeholder={
              shown.parts.length > 1 ? "Split by the note" : "Choose"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {STOCK_KEYS.map((k) => (
            <SelectItem key={k} value={k}>
              {stockKeyName(k)}
            </SelectItem>
          ))}
          {shown.byOwner && (
            <>
              <SelectSeparator />
              <SelectItem value={FROM_NOTE}>Read from the note</SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
      {shown.mismatch ? (
        <p className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400">
          <IconAlertTriangle className="mt-px h-3.5 w-3.5 shrink-0" />
          The note's amounts don't add up to {naira(amount)}; the difference is
          Not sorted.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          {shown.byOwner ? "Filed by you." : "Read from the note."}
        </p>
      )}
    </div>
  );
}
