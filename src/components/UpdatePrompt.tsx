import { useRegisterSW } from "virtual:pwa-register/react";
import { Button } from "./ui";

/** Offline-ready and new-version toast. Updating is the reader's choice. */
export function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!offlineReady && !needRefresh) return null;
  const dismiss = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="toast" role="status">
      <p>{needRefresh ? "A new version of the guide is ready. Your progress is already saved." : "The guide now works offline."}</p>
      <div className="controls">
        {needRefresh && (
          <Button look="" onClick={() => void updateServiceWorker(true)}>
            Reload
          </Button>
        )}
        <Button onClick={dismiss}>{needRefresh ? "Later" : "Got it"}</Button>
      </div>
    </div>
  );
}
