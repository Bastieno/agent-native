import { useParams } from "react-router";
import { ExtensionViewer } from "@agent-native/core/client/extensions";

export function meta() {
  return [{ title: "Extension" }];
}

/**
 * One extension on a page of its own: where "Open full view" goes.
 *
 * It sits outside the admin and teacher layouts, like the print pages, so the
 * extension gets the whole window. The viewer brings its own header with the
 * way back.
 */
export default function ExtensionFullView() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return (
    <div className="h-screen">
      <ExtensionViewer extensionId={id} />
    </div>
  );
}
