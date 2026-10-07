import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useArmWord } from "./arms-shared";

/** The Classes page's two tabs, selected by `?tab=arms`. */
export function ClassesTabs({
  value,
  onChange,
}: {
  value: "classes" | "arms";
  onChange: (tab: "classes" | "arms") => void;
}) {
  const { Arm } = useArmWord();
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as "classes" | "arms")}
    >
      <TabsList>
        <TabsTrigger value="classes">Classes</TabsTrigger>
        <TabsTrigger value="arms">{Arm}s</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
