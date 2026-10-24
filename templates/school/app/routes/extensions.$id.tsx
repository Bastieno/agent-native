import { Navigate, useParams } from "react-router";
import { useRole } from "@/hooks/use-role";

/**
 * The framework links an extension to /extensions/:id (its "Open full view",
 * its breadcrumbs). The school shows each one inside the person's own portal,
 * where the sidebar and the assistant panel are, so go there.
 */
export default function ExtensionFullView() {
  const { id } = useParams<{ id: string }>();
  const { isAdmin, isLoading } = useRole();
  if (!id || isLoading) return null;
  return (
    <Navigate
      to={`/${isAdmin ? "admin" : "teacher"}/extension/${id}`}
      replace
    />
  );
}
