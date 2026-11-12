import { useEffect, useSyncExternalStore } from "react";
import { THEME_KEY, useTheme } from "../store/theme";
import { STORAGE_KEY } from "./progress-state";
import { useProgress } from "../store/progress";

const query = () => matchMedia("(prefers-color-scheme: dark)");
const subscribeSystem = (callback: () => void) => {
  const media = query();
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

/** "light" or "dark" after resolving the "system" preference. */
export function useResolvedTheme() {
  const preference = useTheme((s) => s.preference);
  const systemDark = useSyncExternalStore(subscribeSystem, () => query().matches, () => false);
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}

/** Mirror the theme to the document, and keep every tab in sync through storage events. */
export function useGlobalEffects() {
  const resolved = useResolvedTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", resolved === "dark" ? "#1e1410" : "#281b15");
  }, [resolved]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_KEY || event.key === null) useTheme.getState().sync(event.newValue);
      if (event.key === STORAGE_KEY) useProgress.getState().reloadFromStorage();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
}
