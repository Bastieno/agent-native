import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconPlus, IconTrash, IconDeviceFloppy } from "@tabler/icons-react";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { roomProblems, type Room, type RoomKind } from "@shared/school-week";
import { useSaveSchoolConfig } from "./useSaveSchoolConfig";

export function RoomsEditor() {
  const { config } = useSchoolConfig();
  const save = useSaveSchoolConfig();
  const saved: Room[] = (config as any).rooms ?? [];
  const [rooms, setRooms] = useState<Room[]>(saved);

  useEffect(() => {
    setRooms((current) =>
      JSON.stringify(current) === JSON.stringify(saved) ? current : saved,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(saved)]);

  const dirty = JSON.stringify(rooms) !== JSON.stringify(saved);
  const problems = useMemo(() => roomProblems(rooms), [rooms]);

  return (
    <div className="space-y-3">
      {rooms.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-card p-6 text-center">
          <p className="text-sm font-medium">No rooms yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add the rooms your school teaches in.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          {rooms.map((room, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                aria-label="Room name"
                placeholder="Room name"
                className="h-8 flex-1"
                value={room.name}
                onChange={(e) =>
                  setRooms(
                    rooms.map((r, j) =>
                      j === i ? { ...r, name: e.target.value } : r,
                    ),
                  )
                }
              />
              <Select
                value={room.kind}
                onValueChange={(v) =>
                  setRooms(
                    rooms.map((r, j) =>
                      j === i ? { ...r, kind: v as RoomKind } : r,
                    ),
                  )
                }
              >
                <SelectTrigger className="h-8 w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classroom">Classroom</SelectItem>
                  <SelectItem value="special">Special room</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label={`Remove ${room.name || "room"}`}
                onClick={() => setRooms(rooms.filter((_, j) => j !== i))}
              >
                <IconTrash size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {problems.map((p, n) => (
        <p key={n} className="text-sm text-destructive">
          {p}
        </p>
      ))}

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setRooms([...rooms, { name: "", kind: "classroom" }])}
        >
          <IconPlus size={14} />
          Add a room
        </Button>
        <Button
          size="sm"
          className="gap-1.5"
          disabled={!dirty || problems.length > 0}
          onClick={() => save({ rooms }, "Rooms saved")}
        >
          <IconDeviceFloppy size={14} />
          Save
        </Button>
      </div>
    </div>
  );
}
