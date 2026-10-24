import { Navigate } from "react-router";
import { useRole } from "@/hooks/use-role";

/**
 * The framework's extension header links its "Extensions" crumb here. The
 * school keeps each role's list inside its own portal, so go there.
 */
export default function ExtensionsIndex() {
  const { isAdmin, isLoading } = useRole();
  if (isLoading) return null;
  return (
    <Navigate
      to={isAdmin ? "/admin/extensions" : "/teacher/extensions"}
      replace
    />
  );
}
