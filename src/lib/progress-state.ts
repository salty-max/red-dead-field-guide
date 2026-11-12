import type { ProgressState } from "../types";
import { byId, readChapter } from "./guide";

export const STORAGE_KEY = "red-dead-field-guide.v1";

export const defaultState = (): ProgressState => ({
  version: 2,
  guide: "red-dead-redemption",
  checks: {},
  ceiling: 1,
  spoilers: true,
  chapter: 1,
  reported: null,
});

/** An in-game percentage: a number from 0 to 100, kept to a tenth. Anything else is null. */
export function readPercent(value: unknown): number | null {
  if (value === null || value === undefined || value === "" || typeof value === "boolean") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 && n <= 100 ? Math.round(n * 10) / 10 : null;
}

/**
 * Parse untrusted JSON (storage or an imported file) into a safe current-version state.
 * Version 1 files (no `reported`) still load. Throws on a non-backup or an unknown future version.
 */
export function validateState(value: unknown): ProgressState {
  const v = value as Partial<Record<keyof ProgressState, unknown>> | null;
  const checks = v?.checks;
  if (!v || (v.version !== 1 && v.version !== 2) || v.guide !== "red-dead-redemption" || !checks || Array.isArray(checks) || typeof checks !== "object") {
    throw new Error("This file is not a Red Dead Field Guide progress backup.");
  }
  const result = defaultState();
  result.checks = Object.fromEntries(
    Object.entries(checks).filter(([id, checked]) => byId.has(id) && checked === true),
  ) as Record<string, true>;
  result.ceiling = readChapter(v.ceiling);
  result.chapter = readChapter(v.chapter);
  result.spoilers = v.spoilers !== false;
  result.reported = v.version === 2 ? readPercent(v.reported) : null;
  return result;
}
