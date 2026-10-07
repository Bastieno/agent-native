import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useArmWord, type Arm } from "./arms-shared";

export type Taker =
  | { kind: "none" }
  | { kind: "arm"; armId: string }
  | { kind: "option"; armIds: string[] };

/** Who takes a class: a whole arm, learners from several, or no arm at all. */
export function WhoTakesIt({
  arms,
  value,
  onChange,
}: {
  /** The arms of the class's year group. */
  arms: Arm[];
  value: Taker;
  onChange: (next: Taker) => void;
}) {
  const { arm } = useArmWord();
  return (
    <div className="space-y-2">
      <Label>Who takes it</Label>
      <RadioGroup
        value={value.kind}
        onValueChange={(kind) =>
          onChange(
            kind === "arm"
              ? { kind: "arm", armId: arms[0]?.id ?? "" }
              : kind === "option"
                ? { kind: "option", armIds: [] }
                : { kind: "none" },
          )
        }
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="arm" id="taker-arm" disabled={!arms.length} />
          <Label htmlFor="taker-arm" className="font-normal">
            A whole {arm}
          </Label>
        </div>
        {value.kind === "arm" && (
          <Select
            value={value.armId}
            onValueChange={(armId) => onChange({ kind: "arm", armId })}
          >
            <SelectTrigger className="ml-6 w-48" aria-label={`Which ${arm}`}>
              <SelectValue placeholder={`Choose a ${arm}`} />
            </SelectTrigger>
            <SelectContent>
              {arms.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex items-center gap-2">
          <RadioGroupItem
            value="option"
            id="taker-option"
            disabled={!arms.length}
          />
          <Label htmlFor="taker-option" className="font-normal">
            Learners from several {arm}s
          </Label>
        </div>
        {value.kind === "option" && (
          <div className="ml-6 flex flex-wrap gap-x-4 gap-y-1.5">
            {arms.map((a) => (
              <label key={a.id} className="flex items-center gap-1.5 text-sm">
                <Checkbox
                  checked={value.armIds.includes(a.id)}
                  onCheckedChange={(on) =>
                    onChange({
                      kind: "option",
                      armIds: on
                        ? [...value.armIds, a.id]
                        : value.armIds.filter((id) => id !== a.id),
                    })
                  }
                />
                {a.name}
              </label>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2">
          <RadioGroupItem value="none" id="taker-none" />
          <Label htmlFor="taker-none" className="font-normal">
            Not tied to an {arm}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
