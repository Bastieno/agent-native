import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { IconChevronRight, IconPlus, IconUsers } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ListState } from "@/components/ListState";
import { useSchoolConfig } from "@/hooks/use-school-config";
import type { Room } from "@shared/school-week";
import {
  ARMS_KEY,
  callAction,
  useArms,
  useArmWord,
  useGradeLevels,
  type Arm,
} from "./arms-shared";

/** What the home-room picker uses for "none": a Radix item may not be "". */
const NO_ROOM = "__none__";

interface Learner {
  userId: string;
  name: string | null;
  email: string | null;
  gradeLevelId: string | null;
  armId: string | null;
}

const STUDENTS_KEY = ["arm-learners"];

function useLearners() {
  return useQuery<Learner[]>({
    queryKey: STUDENTS_KEY,
    queryFn: async () =>
      callAction(
        "list-students",
        { status: "active", limit: 5000 },
        "GET",
      ).then((rows) => rows),
  });
}

export function ArmsTab({ tabs }: { tabs: React.ReactNode }) {
  const { Arm, arm } = useArmWord();
  const { data: arms = [], isLoading } = useArms();
  const { data: levels = [] } = useGradeLevels();
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const groups = useMemo(() => {
    const out: { id: string; name: string; arms: Arm[] }[] = [];
    for (const a of arms) {
      let g = out.find((x) => x.id === a.gradeLevelId);
      if (!g) {
        g = { id: a.gradeLevelId, name: a.gradeLevelName ?? "Other", arms: [] };
        out.push(g);
      }
      g.arms.push(a);
    }
    return out;
  }, [arms]);

  const open = arms.find((a) => a.id === openId) ?? null;

  return (
    <div className="h-full overflow-auto flex flex-col">
      <div className="px-6 pt-6 pb-4 space-y-4 shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">{Arm}s</h1>
            <p className="text-sm text-muted-foreground mt-1">
              The groups each year group splits into.
            </p>
          </div>
          <Button size="sm" className="gap-1.5" onClick={() => setAdding(true)}>
            <IconPlus size={14} />
            Add {/^[aeiou]/.test(arm) ? "an" : "a"} {arm}
          </Button>
        </div>
        {tabs}
      </div>

      <div className="flex-1 overflow-auto px-6 pb-6 space-y-3">
        {isLoading || arms.length === 0 ? (
          <ListState
            loading={isLoading}
            icon={IconUsers}
            title={`No ${arm}s yet`}
            description={`Add the ${arm}s each year group splits into.`}
          />
        ) : (
          groups.map((g) => (
            <div key={g.id} className="rounded-lg border overflow-hidden">
              <div className="px-4 py-2.5 bg-muted/40 text-sm font-medium">
                {g.name}
              </div>
              {g.arms.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setOpenId(a.id)}
                  className="w-full flex items-center gap-4 px-4 py-2.5 border-t text-left text-sm hover:bg-muted/20"
                >
                  <span className="font-medium w-24">{a.name}</span>
                  <span className="text-muted-foreground flex-1">
                    {[a.stream, a.homeRoom].filter(Boolean).join(" · ") || "—"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <IconUsers size={13} />
                    {a.learnerCount}
                  </span>
                  <IconChevronRight
                    size={14}
                    className="text-muted-foreground"
                  />
                </button>
              ))}
            </div>
          ))
        )}
      </div>

      <AddArmDialog open={adding} onOpenChange={setAdding} levels={levels} />
      <ArmSheet arm={open} onClose={() => setOpenId(null)} />
    </div>
  );
}

function AddArmDialog({
  open,
  onOpenChange,
  levels,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  levels: { id: string; name: string }[];
}) {
  const { Arm, arm } = useArmWord();
  const qc = useQueryClient();
  const [gradeLevelId, setGradeLevelId] = useState("");
  const [name, setName] = useState("");
  const [stream, setStream] = useState("");

  function add() {
    const level = levels.find((l) => l.id === gradeLevelId);
    const row: Arm = {
      id: `tmp-${nanoid(6)}`,
      name: name.trim(),
      gradeLevelId,
      gradeLevelName: level?.name ?? null,
      stream: stream.trim() || null,
      homeRoom: null,
      formTeacherUserId: null,
      learnerCount: 0,
    };
    const previous = qc.getQueryData<Arm[]>(ARMS_KEY);
    qc.setQueryData<Arm[]>(ARMS_KEY, (old = []) => [...old, row]);
    onOpenChange(false);
    setName("");
    setStream("");
    callAction("create-arm", {
      gradeLevelId,
      name: row.name,
      stream: row.stream ?? undefined,
    })
      .then((res) => toast.success(res.message ?? `${Arm} created`))
      .catch((e: Error) => {
        qc.setQueryData(ARMS_KEY, previous);
        toast.error(e.message);
      })
      .finally(() => qc.invalidateQueries({ queryKey: ARMS_KEY }));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add {/^[aeiou]/.test(arm) ? "an" : "a"} {arm}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Year group</Label>
            <Select value={gradeLevelId} onValueChange={setGradeLevelId}>
              <SelectTrigger aria-label="Year group">
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="add-arm-name">Name</Label>
              <Input
                id="add-arm-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-arm-stream">Stream (optional)</Label>
              <Input
                id="add-arm-stream"
                value={stream}
                onChange={(e) => setStream(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={!gradeLevelId || !name.trim()} onClick={add}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ArmSheet({
  arm: row,
  onClose,
}: {
  arm: Arm | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!row} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="overflow-y-auto">
        {row && <ArmDetails key={row.id} arm={row} />}
      </SheetContent>
    </Sheet>
  );
}

function ArmDetails({ arm: row }: { arm: Arm }) {
  const { arm: word } = useArmWord();
  const qc = useQueryClient();
  const { config } = useSchoolConfig();
  const rooms: Room[] = (config as any).rooms ?? [];
  const { data: learners = [] } = useLearners();
  const [name, setName] = useState(row.name);
  const [stream, setStream] = useState(row.stream ?? "");
  const [homeRoom, setHomeRoom] = useState(row.homeRoom ?? NO_ROOM);
  const [moving, setMoving] = useState(false);

  const mine = learners.filter((l) => l.armId === row.id);
  const dirty =
    name.trim() !== row.name ||
    (stream.trim() || null) !== row.stream ||
    (homeRoom === NO_ROOM ? null : homeRoom) !== row.homeRoom;
  const roomNames = rooms.map((r) => r.name);
  if (row.homeRoom && !roomNames.includes(row.homeRoom))
    roomNames.push(row.homeRoom);

  function save() {
    const patch = {
      name: name.trim(),
      stream: stream.trim() || null,
      homeRoom: homeRoom === NO_ROOM ? null : homeRoom,
    };
    const previous = qc.getQueryData<Arm[]>(ARMS_KEY);
    qc.setQueryData<Arm[]>(ARMS_KEY, (old = []) =>
      old.map((a) => (a.id === row.id ? { ...a, ...patch } : a)),
    );
    callAction("update-arm", { id: row.id, ...patch })
      .then((res) => toast.success(res.message ?? "Saved"))
      .catch((e: Error) => {
        qc.setQueryData(ARMS_KEY, previous);
        setName(row.name);
        toast.error(e.message);
      })
      .finally(() => qc.invalidateQueries({ queryKey: ARMS_KEY }));
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>{row.name}</SheetTitle>
        <SheetDescription>{row.gradeLevelName}</SheetDescription>
      </SheetHeader>
      <div className="space-y-4 py-4 text-sm">
        <div className="space-y-1.5">
          <Label htmlFor="arm-name">Name</Label>
          <Input
            id="arm-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="arm-stream">Stream</Label>
          <Input
            id="arm-stream"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Home room</Label>
          <Select
            value={homeRoom}
            onValueChange={setHomeRoom}
            disabled={roomNames.length === 0}
          >
            <SelectTrigger aria-label="Home room">
              <SelectValue
                placeholder={
                  roomNames.length ? "None" : "Add rooms in Settings"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NO_ROOM}>None</SelectItem>
              {roomNames.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" disabled={!dirty || !name.trim()} onClick={save}>
          Save
        </Button>

        <div className="pt-2 border-t space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">Learners ({row.learnerCount})</span>
            <Button variant="outline" size="sm" onClick={() => setMoving(true)}>
              Move learners here
            </Button>
          </div>
          {mine.length === 0 ? (
            <p className="text-muted-foreground">
              No learners in this {word} yet.
            </p>
          ) : (
            <ul className="space-y-1">
              {mine.map((l) => (
                <li key={l.userId} className="text-muted-foreground">
                  {l.name ?? l.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <MoveLearnersDialog
        open={moving}
        onOpenChange={setMoving}
        arm={row}
        learners={learners}
      />
    </>
  );
}

function MoveLearnersDialog({
  open,
  onOpenChange,
  arm: target,
  learners,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  arm: Arm;
  learners: Learner[];
}) {
  const { arm: word } = useArmWord();
  const qc = useQueryClient();
  const { data: arms = [] } = useArms();
  const [picked, setPicked] = useState<string[]>([]);
  const armName = (id: string | null) => arms.find((a) => a.id === id)?.name;
  const candidates = learners.filter(
    (l) => l.gradeLevelId === target.gradeLevelId && l.armId !== target.id,
  );

  function move() {
    const ids = picked;
    const prevArms = qc.getQueryData<Arm[]>(ARMS_KEY);
    const prevLearners = qc.getQueryData<Learner[]>(STUDENTS_KEY);
    const from = new Map(
      (prevLearners ?? [])
        .filter((l) => ids.includes(l.userId))
        .map((l) => [l.userId, l.armId]),
    );
    qc.setQueryData<Learner[]>(STUDENTS_KEY, (old = []) =>
      old.map((l) => (ids.includes(l.userId) ? { ...l, armId: target.id } : l)),
    );
    qc.setQueryData<Arm[]>(ARMS_KEY, (old = []) =>
      old.map((a) =>
        a.id === target.id
          ? { ...a, learnerCount: a.learnerCount + ids.length }
          : {
              ...a,
              learnerCount:
                a.learnerCount -
                [...from.values()].filter((f) => f === a.id).length,
            },
      ),
    );
    onOpenChange(false);
    setPicked([]);
    callAction("set-learner-arm", { armId: target.id, studentUserIds: ids })
      .then((res) => toast.success(res.message))
      .catch((e: Error) => {
        qc.setQueryData(ARMS_KEY, prevArms);
        qc.setQueryData(STUDENTS_KEY, prevLearners);
        toast.error(e.message);
      })
      .finally(() => {
        qc.invalidateQueries({ queryKey: ARMS_KEY });
        qc.invalidateQueries({ queryKey: STUDENTS_KEY });
        qc.invalidateQueries({ queryKey: ["admin-classes"] });
      });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move learners to {target.name}</DialogTitle>
          <DialogDescription>
            Learners of {target.gradeLevelName}. Moving one changes the {word}{" "}
            classes they are in.
          </DialogDescription>
        </DialogHeader>
        <Command className="border rounded-md">
          <CommandInput placeholder="Search learners" />
          <CommandList>
            <CommandEmpty>No learners found.</CommandEmpty>
            <CommandGroup>
              {candidates.map((l) => (
                <CommandItem
                  key={l.userId}
                  value={`${l.name ?? ""} ${l.email ?? ""} ${l.userId}`}
                  onSelect={() =>
                    setPicked((p) =>
                      p.includes(l.userId)
                        ? p.filter((x) => x !== l.userId)
                        : [...p, l.userId],
                    )
                  }
                >
                  <Checkbox
                    checked={picked.includes(l.userId)}
                    className="mr-2 pointer-events-none"
                    tabIndex={-1}
                  />
                  <span className="flex-1">{l.name ?? l.email}</span>
                  <span className="text-xs text-muted-foreground">
                    {armName(l.armId) ?? `No ${word}`}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={picked.length === 0} onClick={move}>
            Move {picked.length || ""}{" "}
            {picked.length === 1 ? "learner" : "learners"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
