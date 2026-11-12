import { useEffect } from "react";
import { Button } from "./ui";
import { useUi } from "../store/ui";

const LIFETIME_MS = 8000;

/** Short-lived confirmation with Undo for a check change. Announced as a status message. */
export function UndoToast() {
  const toast = useUi((s) => s.toast);
  const dismiss = useUi((s) => s.dismissToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(dismiss, LIFETIME_MS);
    return () => clearTimeout(timer);
  }, [toast, dismiss]);

  if (!toast) return null;
  return (
    <div className="toast undo-toast" role="status" key={toast.id}>
      <p>{toast.message}</p>
      <div className="controls">
        {toast.undo && (
          <Button
            look=""
            onClick={() => {
              toast.undo?.();
              dismiss();
            }}
          >
            Undo
          </Button>
        )}
        <Button onClick={dismiss}>Dismiss</Button>
      </div>
    </div>
  );
}
