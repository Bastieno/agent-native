import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhoTakesIt, type Taker } from "./WhoTakesIt";
import {
  callAction,
  useArms,
  useGradeLevels,
  type GradeLevel,
} from "./arms-shared";

/** A small form to create a class; the part that matters is who takes it. */
export function NewClassDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [gradeLevelId, setGradeLevelId] = useState("");
  const [taker, setTaker] = useState<Taker>({ kind: "none" });

  const { data: levels = [] } = useGradeLevels();
  const { data: arms = [] } = useArms();
  const { data: subjects = [] } = useQuery<any[]>({
    queryKey: ["subjects"],
    queryFn: async () => callAction("list-subjects", {}, "GET"),
    enabled: open,
  });
  const { data: term } = useQuery<any>({
    queryKey: ["current-term"],
    queryFn: async () => callAction("get-current-term", {}, "GET"),
    enabled: open,
  });
  const yearArms = arms.filter((a) => a.gradeLevelId === gradeLevelId);
  const ready = !!(name.trim() && subjectId && gradeLevelId && term?.session);

  function create() {
    const body: Record<string, unknown> = {
      name: name.trim(),
      subjectId,
      gradeLevelId,
      academicYearId: term.session.id,
      termId: term.term?.id,
    };
    if (taker.kind === "arm" && taker.armId) body.armId = taker.armId;
    if (taker.kind === "option") body.optionArmIds = taker.armIds;
    // Close first; a refusal reopens nothing but says why.
    onOpenChange(false);
    callAction("create-class", body)
      .then((res) => {
        toast.success(res.message ?? "Class created");
        qc.invalidateQueries({ queryKey: ["admin-classes"] });
      })
      .catch((e: Error) => toast.error(e.message));
    setName("");
    setTaker({ kind: "none" });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New class</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="new-class-name">Name</Label>
            <Input
              id="new-class-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Subject</Label>
              <Select value={subjectId} onValueChange={setSubjectId}>
                <SelectTrigger aria-label="Subject">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Year group</Label>
              <Select
                value={gradeLevelId}
                onValueChange={(v) => {
                  setGradeLevelId(v);
                  setTaker({ kind: "none" });
                }}
              >
                <SelectTrigger aria-label="Year group">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l: GradeLevel) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {gradeLevelId && (
            <WhoTakesIt arms={yearArms} value={taker} onChange={setTaker} />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!ready} onClick={create}>
            Create class
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
