import { useEffect, useMemo, useState, type ReactElement } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { roomKey, type Room } from "@shared/school-week";
import type { ClassOption, ResolvedPeriod } from "./use-timetable";

/** "The class's own room": a Radix item may not use "". */
const OWN_ROOM = "__own__";

export interface CellSave {
  classId: string;
  /** A room from the list, or "" for the class's own room. */
  room: string;
  scheduleId?: string;
}

/**
 * The editor for one lesson cell: which class (or which of the classes
 * already there), and in which room. Saving and removing close it at once;
 * the page updates the grid before the server answers.
 */
export function PeriodCellPopover({
  open,
  onOpenChange,
  title,
  entries,
  classes,
  rooms,
  defaultRoom,
  onSave,
  onRemove,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  entries: ResolvedPeriod[];
  /** The classes that may go here: in arm view, only that arm's. */
  classes: ClassOption[];
  rooms: Room[];
  /** The room in view, in room view: a new placement goes there. */
  defaultRoom?: string;
  onSave: (save: CellSave) => void;
  onRemove: (scheduleId: string) => void;
  children: ReactElement;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [classId, setClassId] = useState("");
  const [room, setRoom] = useState(OWN_ROOM);

  /** The listed room matching a name, compared the way the server does. */
  const listed = (name: string | null | undefined) =>
    name
      ? rooms.find((r) => roomKey(r.name) === roomKey(name))?.name
      : undefined;

  const pick = (entry: ResolvedPeriod | null) => {
    setEditing(entry?.scheduleId ?? null);
    setClassId(entry?.classId ?? "");
    setRoom(listed(entry ? entry.room : defaultRoom) ?? OWN_ROOM);
  };

  // Each time it opens: the one class there, ready to change; else a new one.
  useEffect(() => {
    if (open) pick(entries.length === 1 ? entries[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const options = useMemo(() => {
    const list = [...classes];
    // A class already here stays choosable even if the filter would drop it.
    for (const e of entries) {
      if (!list.some((c) => c.id === e.classId)) {
        list.push({
          id: e.classId,
          name: e.className,
        } as ClassOption);
      }
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [classes, entries]);

  const save = () => {
    if (!classId) return;
    onSave({
      classId,
      room: room === OWN_ROOM ? "" : room,
      scheduleId: editing ?? undefined,
    });
    onOpenChange(false);
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-72 space-y-3" align="start">
        <p className="text-sm font-medium">{title}</p>

        {entries.length > 0 ? (
          <div className="space-y-1">
            {entries.map((e) => (
              <button
                key={e.scheduleId}
                type="button"
                onClick={() => pick(e)}
                className={cn(
                  "w-full truncate rounded-md px-2 py-1 text-left text-sm hover:bg-muted",
                  editing === e.scheduleId && "bg-muted font-medium",
                )}
              >
                {e.className}
                {e.room ? (
                  <span className="text-muted-foreground"> · {e.room}</span>
                ) : null}
              </button>
            ))}
            <button
              type="button"
              onClick={() => pick(null)}
              className={cn(
                "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-sm text-muted-foreground hover:bg-muted",
                editing === null && "bg-muted text-foreground",
              )}
            >
              <IconPlus size={14} />
              Add a class
            </button>
          </div>
        ) : null}

        <div className="space-y-1.5">
          <Label className="text-xs">Class</Label>
          <Select value={classId || undefined} onValueChange={setClassId}>
            <SelectTrigger className="h-8 text-sm" aria-label="Class">
              <SelectValue placeholder="Choose a class" />
            </SelectTrigger>
            <SelectContent>
              {options.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {rooms.length > 0 ? (
          <div className="space-y-1.5">
            <Label className="text-xs">Room</Label>
            <Select value={room} onValueChange={setRoom}>
              <SelectTrigger className="h-8 text-sm" aria-label="Room">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OWN_ROOM}>The class's own room</SelectItem>
                {rooms.map((r) => (
                  <SelectItem key={r.name} value={r.name}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-2 pt-1">
          {editing && !editing.startsWith("tmp-") ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => {
                onRemove(editing);
                onOpenChange(false);
              }}
            >
              Remove
            </Button>
          ) : (
            <span />
          )}
          <Button
            size="sm"
            onClick={save}
            disabled={!classId || !!editing?.startsWith("tmp-")}
          >
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
