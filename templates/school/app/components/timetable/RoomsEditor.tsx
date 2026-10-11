import { useMemo } from "react";
import { useSyncedDraft } from "./useSyncedDraft";
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
  const [rooms, setRooms, dirty] = useSyncedDraft<Room[]>(config.rooms ?? []);
  const problems = useMemo(() => roomProblems(rooms), [rooms]);

  return (
    <div className="space-y-3">
      {rooms.length === 0 ? (
        <p className="text-sm text-muted-foreground">No rooms yet.</p>
      ) : (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          {rooms.map((room, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                aria-label={`Room name, row ${i + 1}`}
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
                <SelectTrigger
                  className="h-8 w-36"
                  aria-label={`Kind, ${room.name || `room ${i + 1}`}`}
                >
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
          {p.message}
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
