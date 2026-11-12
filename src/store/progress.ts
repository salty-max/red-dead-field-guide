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
  /** Tick several entries at once (a whole county of map locations). */
  checkMany: (ids: string[]) => void;
  visitChapter: (chapter: number) => void;
  reveal: (chapter: number) => void;
  saveSettings: (settings: { spoilers: boolean; ceiling: number }) => void;
  replaceAll: (next: ProgressState) => void;
  reloadFromStorage: () => void;
}

const initial = load();

export const useProgress = create<ProgressStore>((set, get) => {
  /** Apply a change to the state and persist it. */
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
    checkMany: (ids) =>
      commit((s) => {
        const checks = { ...s.checks };
        for (const id of ids) checks[id] = true;
        return { ...s, checks };
      }),
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

/** Whether a chapter's content is revealed under the current spoiler settings. */
export const isOpen = (state: ProgressState, chapter: number) => !state.spoilers || chapter <= state.ceiling;
export const isChecked = (state: ProgressState, id: string) => state.checks[id] === true;
