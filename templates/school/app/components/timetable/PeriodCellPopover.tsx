import { useEffect, useMemo, useState, type ReactElement } from "react";
import { SearchableSelect } from "@/components/SearchableSelect";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { roomKey, type Room } from "@shared/school-week";
import { useDoubleWord } from "./arms-shared";
import type { ClassOption, ResolvedPeriod } from "./use-timetable";

/** "The class's own room": a Radix item may not use "". */
const OWN_ROOM = "__own__";

export interface CellSave {
  classId: string;
  /**
   * A room from the list, or "" for the class's own room. Absent when Room
   * was not touched: a placement keeps the room it has, a new one takes its
   * class's (or arm's) room.
   */
  room?: string;
  scheduleId?: string;
  /** One period, or this one and the next lesson period as a double. */
  double: boolean;
  /** The lesson's own name, sent only when changed; "" clears it. */
  lessonLabel?: string;
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
  // Room shows what a placement resolves to; only a change is sent, so
  // opening and saving never rewrites a custom or inherited room.
  const [roomTouched, setRoomTouched] = useState(false);
  const { Double } = useDoubleWord();
  const [double, setDouble] = useState(false);
  const [lessonLabel, setLessonLabel] = useState("");
  const [labelBefore, setLabelBefore] = useState("");

  /** The listed room matching a name, compared the way the server does. */
  const listed = (name: string | null | undefined) =>
    name
      ? rooms.find((r) => roomKey(r.name) === roomKey(name))?.name
      : undefined;

  const pick = (entry: ResolvedPeriod | null) => {
    setEditing(entry?.scheduleId ?? null);
    setClassId(entry?.classId ?? "");
    setRoom(listed(entry ? entry.room : defaultRoom) ?? OWN_ROOM);
    // In room view a new placement goes to the room in view.
    setRoomTouched(!entry && !!listed(defaultRoom));
    setDouble(!!entry?.pairId);
    setLessonLabel(entry?.lessonLabel ?? "");
    setLabelBefore(entry?.lessonLabel ?? "");
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
      ...(roomTouched ? { room: room === OWN_ROOM ? "" : room } : {}),
      scheduleId: editing ?? undefined,
      double,
      ...(lessonLabel.trim() !== labelBefore.trim()
        ? { lessonLabel: lessonLabel.trim() }
        : {}),
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
                {e.lessonLabel ? (
                  <span className="text-muted-foreground">
                    {" "}
                    · {e.lessonLabel}
                  </span>
                ) : null}
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
          <SearchableSelect
            value={classId}
            onValueChange={setClassId}
            aria-label="Class"
            placeholder="Choose a class"
            searchPlaceholder="Search classes…"
            className="h-8 text-sm"
            options={options.map((c) => ({ value: c.id, label: c.name }))}
          />
        </div>

        {rooms.length > 0 ? (
          <div className="space-y-1.5">
            <Label className="text-xs">Room</Label>
            <SearchableSelect
              value={room}
              onValueChange={(v) => {
                setRoom(v);
                setRoomTouched(true);
              }}
              aria-label="Room"
              searchPlaceholder="Search rooms…"
              className="h-8 text-sm"
              options={[
                { value: OWN_ROOM, label: "The class's own room" },
                ...rooms.map((r) => ({ value: r.name, label: r.name })),
              ]}
            />
          </div>
        ) : null}

        <div className="space-y-1.5">
          <Label htmlFor="cell-lesson-name" className="text-xs">
            Lesson name
          </Label>
          <Input
            id="cell-lesson-name"
            className="h-8 text-sm"
            value={lessonLabel}
            onChange={(e) => setLessonLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="cell-double" className="text-xs">
            {Double}
          </Label>
          <Switch
            id="cell-double"
            checked={double}
            onCheckedChange={setDouble}
          />
        </div>

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
