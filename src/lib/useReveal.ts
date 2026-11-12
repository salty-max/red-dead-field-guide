import { useNavigate } from "react-router";
import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";

/** Ask before revealing spoilers through a chapter, then open it. */
export function useReveal() {
  const navigate = useNavigate();
  const openDialog = useUi((s) => s.openDialog);
  return (chapter: number) =>
    openDialog({
      kind: "confirm",
      title: `Reveal through Chapter ${chapter}?`,
      explanation: "This also reveals earlier chapters in navigation, checklist and search.",
      label: "Reveal and open",
      onConfirm: () => {
        useProgress.getState().reveal(chapter);
        navigate(`/guide/${chapter}`);
      },
    });
}
