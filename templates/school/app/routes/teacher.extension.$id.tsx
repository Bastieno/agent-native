import { useParams } from "react-router";
import { ExtensionViewer } from "@agent-native/core/client/extensions";

/**
 * An extension the admin has put in front of teachers, on a page of its own
 * inside the teacher portal. A teacher uses it; changing or sharing it is the
 * admin's, so those controls are not offered.
 */
export default function TeacherExtensionView() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return (
    <div className="h-full">
      <ExtensionViewer
        extensionId={id}
        controls={{ edit: false, rename: false, share: false, more: false }}
      />
    </div>
  );
}
