import { create } from "zustand";

export type ThemePreference = "system" | "light" | "dark";
export const THEME_KEY = "red-dead-field-guide.theme";
export const themeOptions: [ThemePreference, string][] = [
  ["system", "Use device setting"],
  ["light", "Light"],
  ["dark", "Dark"],
];

export const normalizeTheme = (value: unknown): ThemePreference =>
  value === "light" || value === "dark" ? value : "system";

function read(): ThemePreference {
  try {
    return normalizeTheme(localStorage.getItem(THEME_KEY));
  } catch {
    return "system";
  }
}

interface ThemeStore {
  preference: ThemePreference;
  setPreference: (value: unknown) => void;
  /** Re-read after another tab changed it. */
  sync: (value: unknown) => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  preference: read(),
  setPreference: (value) => {
    const preference = normalizeTheme(value);
    try {
      localStorage.setItem(THEME_KEY, preference);
    } catch {
      /* storage unavailable: the choice still applies for this session */
    }
    set({ preference });
  },
  sync: (value) => set({ preference: normalizeTheme(value) }),
}));
