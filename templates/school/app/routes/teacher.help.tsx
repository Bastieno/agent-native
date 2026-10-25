import { useEffect } from "react";
import { HelpPage } from "@/components/help/HelpPage";
import { useNavigationState } from "@/hooks/use-navigation-state";

export default function TeacherHelp() {
  const { sync } = useNavigationState();
  useEffect(() => {
    sync({ role: "teacher", view: "help" });
  }, [sync]);
  return <HelpPage role="teacher" />;
}
