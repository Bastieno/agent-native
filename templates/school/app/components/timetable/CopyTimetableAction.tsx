import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IconCopy } from "@tabler/icons-react";
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
import { callAction } from "./arms-shared";

/**
 * The one action a term without its own timetable offers: copy one in.
 * The dialog opens on the click and fills with what would be copied; nothing
 * is written until it is confirmed.
 */
export function CopyTimetableAction({
  label,
  args,
}: {
  label: string;
  /** `copy-timetable`'s source and target, without `confirm`. */
  args: { toTermId: string; fromTermId?: string; fromEarlier?: boolean };
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);

  const start = () => {
    setPreview(null);
    setOpen(true);
    callAction("copy-timetable", args)
      .then((r) => setPreview(r.message))
      .catch((e) => {
        setOpen(false);
        toast.error(e?.message ?? "That timetable can't be copied.");
      });
  };

  const confirm = async () => {
    setCopying(true);
    try {
      const r = await callAction("copy-timetable", { ...args, confirm: true });
      toast.success(r.message);
      setOpen(false);
      await qc.invalidateQueries({ queryKey: ["timetable"] });
      qc.removeQueries({ queryKey: ["timetable-copy-preview"] });
    } catch (e: any) {
      toast.error(e?.message ?? "That timetable couldn't be copied.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <>
      <Button className="gap-1.5" onClick={start}>
        <IconCopy size={16} />
        {label}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{label}?</AlertDialogTitle>
            <AlertDialogDescription>
              {preview ?? "Checking what would be copied…"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={!preview || copying}
              onClick={(e) => {
                e.preventDefault();
                confirm();
              }}
            >
              {copying ? "Copying…" : "Copy"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
