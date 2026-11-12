import { useState } from "react";
import { byId } from "./guide";
import type { Row } from "../types";

/**
 * Keeps a short list steady while the reader ticks things in it. Without this, a ticked step drops out
 * of "Next up" / "Don't miss" and every row below it jumps up under the pointer. The list is held from
 * the first tick until `release` is called or every held tick is undone.
 */
export function useHeldRows(fresh: Row[], checks: Record<string, true>) {
  const [held, setHeld] = useState<string[] | null>(null);
  const holding = held !== null && held.some((id) => checks[id] === true);
  const rows = holding ? held.flatMap((id) => byId.get(id) ?? []) : fresh;
  return {
    rows,
    holding,
    /** Call when a checkbox in the list changes (before the new state lands). */
    hold: () => setHeld((current) => current ?? fresh.map((row) => row.id)),
    release: () => setHeld(null),
  };
}
