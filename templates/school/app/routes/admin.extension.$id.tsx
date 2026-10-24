import { useParams } from "react-router";
import { ExtensionViewer } from "@agent-native/core/client/extensions";

/**
 * One extension on a page of its own, inside the admin portal so the
 * assistant panel is there for the Edit button to use.
 */
export default function AdminExtensionView() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return (
    <div className="h-full">
      <ExtensionViewer
        extensionId={id}
        // Who sees an extension is the "Teachers" switch on the Extensions
        // page; the school refuses per-resource sharing, so the Share dialog
        // would open empty. The admin fixes each role's model, so the edit box
        // has no picker either.
        controls={{ share: false, modelSelector: false }}
      />
    </div>
  );
}
