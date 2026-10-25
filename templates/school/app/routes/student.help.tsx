import { useEffect } from "react";
import { HelpPage } from "@/components/help/HelpPage";
import { useNavigationState } from "@/hooks/use-navigation-state";

export default function StudentHelp() {
  const { sync } = useNavigationState();
  useEffect(() => {
    sync({ role: "student", view: "help" });
  }, [sync]);
  return <HelpPage role="student" />;
}
