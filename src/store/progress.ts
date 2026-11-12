import { create } from "zustand";
import type { ProgressState } from "../types";
import { STORAGE_KEY, defaultState, validateState } from "../lib/progress-state";
import { readChapter } from "../lib/guide";

interface Loaded {
  data: ProgressState;
  error: boolean;
}

function load(): Loaded {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return { data: raw ? validateState(JSON.parse(raw)) : defaultState(), error: false };
  } catch {
    return { data: defaultState(), error: true };
  }
}

interface ProgressStore {
  data: ProgressState;
  storageError: boolean;
  setCheck: (id: string, checked: boolean) => void;
  setMany: (ids: string[], checked: boolean) => void;
  /** Put entries back to an earlier state (undo): ids in `prev` become checked, the rest unchecked. */
  restore: (ids: string[], prev: Record<string, true>) => void;
  setReported: (value: number | null) => void;
  visitChapter: (chapter: number) => void;
  reveal: (chapter: number) => void;
  saveSettings: (settings: { spoilers: boolean; ceiling: number }) => void;
  replaceAll: (next: ProgressState) => void;
  reloadFromStorage: () => void;
}

const initial = load();

export const useProgress = create<ProgressStore>((set, get) => {
  const commit = (recipe: (draft: ProgressState) => ProgressState) => {
    const next = recipe(get().data);
    let storageError = false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      storageError = true;
    }
    set({ data: next, storageError });
  };

  return {
    data: initial.data,
    storageError: initial.error,
    setCheck: (id, checked) =>
      commit((s) => {
        const checks = { ...s.checks };
        if (checked) checks[id] = true;
        else delete checks[id];
        return { ...s, checks };
      }),
    setMany: (ids, checked) =>
      commit((s) => {
        const checks = { ...s.checks };
        for (const id of ids) {
          if (checked) checks[id] = true;
          else delete checks[id];
        }
        return { ...s, checks };
      }),
    restore: (ids, prev) =>
      commit((s) => {
        const checks = { ...s.checks };
        for (const id of ids) {
          if (prev[id] === true) checks[id] = true;
          else delete checks[id];
        }
        return { ...s, checks };
      }),
    setReported: (value) => commit((s) => ({ ...s, reported: value })),
    visitChapter: (chapter) => {
      if (get().data.chapter !== chapter) commit((s) => ({ ...s, chapter }));
    },
    reveal: (chapter) => commit((s) => ({ ...s, ceiling: Math.max(chapter, s.ceiling), chapter })),
    saveSettings: ({ spoilers, ceiling }) =>
      commit((s) => {
        const safe = readChapter(ceiling);
        const open = !spoilers || s.chapter <= safe;
        return { ...s, spoilers, ceiling: safe, chapter: open ? s.chapter : safe };
      }),
    replaceAll: (next) => commit(() => next),
    reloadFromStorage: () => {
      const { data, error } = load();
      set({ data, storageError: error });
    },
  };
});

export const isOpen = (state: ProgressState, chapter: number) => !state.spoilers || chapter <= state.ceiling;
