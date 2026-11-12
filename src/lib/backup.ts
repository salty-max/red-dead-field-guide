import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";

export function exportProgress() {
  const { data } = useProgress.getState();
  const href = URL.createObjectURL(new Blob([`${JSON.stringify(data, null, 2)}\n`], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = href;
  link.download = "red-dead-progress.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
  useUi.getState().announce("Progress backup exported.");
}
