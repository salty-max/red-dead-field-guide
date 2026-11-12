import { create } from "zustand";

export type DialogState =
  | { kind: "settings" }
  | { kind: "confirm"; title: string; explanation: string; label: string; danger?: boolean; onConfirm: () => void }
  | null;

interface UiStore {
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

export const useUi = create<UiStore>((set) => ({
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
