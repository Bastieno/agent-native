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
import { countsProblem } from "@shared/lesson-counts";
import { useDoubleWord } from "./arms-shared";
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
  const [periods, setPeriods] = useState("");
  const { Doubles } = useDoubleWord();
  const [doubles, setDoubles] = useState("");
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
  // Between terms the class belongs to the one that is coming.
  const classTerm: { id: string; name: string } | null =
    term?.term ?? term?.nextTerm ?? null;
  const yearArms = arms.filter((a) => a.gradeLevelId === gradeLevelId);
  // "Several arms" with none ticked would quietly make an unattached class.
  const takerReady =
    taker.kind === "none" ||
    (taker.kind === "arm" && !!taker.armId) ||
    (taker.kind === "option" && taker.armIds.length > 0);
  const periodsN = periods.trim() === "" ? null : Number(periods);
  const doublesN = doubles.trim() === "" ? null : Number(doubles);
  const countsIssue = countsProblem(periodsN, doublesN);
  const ready = !!(
    !countsIssue &&
    name.trim() &&
    subjectId &&
    gradeLevelId &&
    term?.session &&
    takerReady
  );

  function create() {
    const body: Record<string, unknown> = {
      name: name.trim(),
      subjectId,
      gradeLevelId,
      academicYearId: term.session.id,
      termId: classTerm?.id,
    };
    if (periodsN != null) body.periodsPerWeek = periodsN;
    if (doublesN != null) body.doublesPerWeek = doublesN;
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
    reset();
  }

  function reset() {
    setName("");
    setSubjectId("");
    setGradeLevelId("");
    setTaker({ kind: "none" });
    setPeriods("");
    setDoubles("");
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New class</DialogTitle>
          {classTerm && (
            <p className="text-sm text-muted-foreground">
              {classTerm.name}
              {term?.session?.name ? `, ${term.session.name}` : ""}
            </p>
          )}
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="new-class-periods">Periods a week</Label>
              <Input
                id="new-class-periods"
                type="number"
                min={0}
                inputMode="numeric"
                value={periods}
                onChange={(e) => setPeriods(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-class-doubles">
                Of which {Doubles.toLowerCase()}
              </Label>
              <Input
                id="new-class-doubles"
                type="number"
                min={0}
                inputMode="numeric"
                value={doubles}
                onChange={(e) => setDoubles(e.target.value)}
              />
            </div>
          </div>
          {countsIssue && (
            <p className="text-xs text-destructive">{countsIssue}</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
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
