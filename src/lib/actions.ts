import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";

/**
 * Check or uncheck entries and offer an Undo toast that puts exactly the previous state back.
 * `message` describes the change ("Checked 12 locations").
 */
export function changeChecks(ids: string[], checked: boolean, message: string) {
  const progress = useProgress.getState();
  const prev = { ...progress.data.checks };
  const changed = ids.filter((id) => (prev[id] === true) !== checked);
  if (!changed.length) return;
  progress.setMany(changed, checked);
  useUi.getState().showToast(message, () => {
    useProgress.getState().restore(changed, prev);
    useUi.getState().announce("Change undone.");
  });
}
