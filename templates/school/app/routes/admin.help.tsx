import { useEffect } from "react";
import { HelpPage } from "@/components/help/HelpPage";
import { useNavigationState } from "@/hooks/use-navigation-state";

export default function AdminHelp() {
  const { sync } = useNavigationState();
  useEffect(() => {
    sync({ role: "admin", view: "help" });
  }, [sync]);
  return <HelpPage role="admin" />;
}
