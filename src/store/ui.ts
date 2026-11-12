import { create } from "zustand";

export type DialogState =
  | { kind: "settings" }
  | { kind: "confirm"; title: string; explanation: string; label: string; danger?: boolean; onConfirm: () => void }
  | null;

export interface Toast {
  id: number;
  message: string;
  undo?: () => void;
}

interface UiStore {
  toast: Toast | null;
  showToast: (message: string, undo?: () => void) => void;
  dismissToast: () => void;
  /** Message for the polite live region. */
  announcement: string;
  announce: (text: string) => void;
  dialog: DialogState;
  openDialog: (dialog: NonNullable<DialogState>) => void;
  closeDialog: () => void;
  /** Which route groups the reader opened or closed by hand. */
  openGroups: Record<string, boolean>;
  setGroupOpen: (key: string, open: boolean) => void;
  setGroupsOpen: (keys: string[], open: boolean) => void;
}

let toastId = 0;

export const useUi = create<UiStore>((set) => ({
  toast: null,
  showToast: (message, undo) => set({ toast: { id: ++toastId, message, undo } }),
  dismissToast: () => set({ toast: null }),
  announcement: "",
  announce: (announcement) => set({ announcement }),
  dialog: null,
  openDialog: (dialog) => set({ dialog }),
  closeDialog: () => set({ dialog: null }),
  openGroups: {},
  setGroupOpen: (key, open) => set((s) => (s.openGroups[key] === open ? s : { openGroups: { ...s.openGroups, [key]: open } })),
  setGroupsOpen: (keys, open) =>
    set((s) => ({ openGroups: { ...s.openGroups, ...Object.fromEntries(keys.map((key) => [key, open])) } })),
}));
