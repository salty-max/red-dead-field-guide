import { rawChapters } from "../data/catalog";
import early from "../data/early";
import late from "../data/late";
import side from "../data/side";
import world from "../data/world";
import challenges from "../data/challenges";
import type { Chapter, Group, RawGroup, Row } from "../types";
import type { IconName } from "../components/Icon";
import { missables } from "../data/missables";

export const CHAPTER_COUNT = rawChapters.length;

/** id → [plural name, singular tag label, icon] */
export const cats = {
  mission: ["Story Missions", "Mission", "book"],
  stranger: ["Stranger Tasks", "Stranger", "compass"],
  location: ["Map Locations", "Location", "pin"],
  bounty: ["Bounty Locations", "Bounty", "star"],
  challenge: ["Ambient Challenges", "Challenge", "grid"],
  outfit: ["Outfits", "Outfit", "shirt"],
  scrap: ["Outfit Scraps", "Scrap", "scroll"],
  safehouse: ["Safehouses", "Safehouse", "home"],
  hideout: ["Gang Hideouts", "Hideout", "mountain"],
  weapon: ["Rare Weapons", "Rare Weapon", "gem"],
  job: ["Jobs", "Job", "checkList"],
  minigame: ["Minigames", "Minigame", "dice"],
  optional: ["Optional Tasks", "Optional", "star"],
} as const satisfies Record<string, readonly [string, string, IconName]>;

export type CategoryId = keyof typeof cats;
export const isCategory = (value: string | undefined): value is CategoryId =>
  value !== undefined && Object.hasOwn(cats, value);

/** How much each entry adds to the game's in-game completion percentage. */
export const weights: Record<string, number> = {
  mission: 1,
  stranger: 0.5,
  location: 6 / 94,
  bounty: 0.1,
  outfit: 0.5,
  safehouse: 2 / 13,
  hideout: 0.5,
  weapon: 0.5,
  job: 0.5,
  minigame: 0.5,
};

const missableIds = new Set(missables.map((item) => item.id));
const rawGroups: RawGroup[] = [...early, ...late, ...side, ...world, ...challenges];

export const chapters: Chapter[] = rawChapters.map((chapter) => ({
  ...chapter,
  groups: rawGroups
    .filter((group) => group.chapter === chapter.id)
    .map(
      (group, index): Group => ({
        key: `section-${chapter.id}-${index + 1}`,
        title: group.title,
        location: group.location,
        icon: group.icon,
        note: group.note || undefined,
        source: group.source,
        rows: group.rows.map(
          ([id, category, title, text, reference]): Row => ({
            id,
            title,
            text,
            chapter: chapter.id,
            location: group.location,
            group: group.title,
            tags: missableIds.has(id) ? [category, "missable"] : [category],
            missable: missableIds.has(id) ? true : undefined,
            reference,
            // Ambient challenge ranks 5 and 10 are the only ones that add credit.
            weight: category === "challenge" && /-(5|10)$/.test(id) ? 1 : (weights[category] ?? 0),
          }),
        ),
      }),
    ),
}));

export const allRows: Row[] = chapters.flatMap((chapter) => chapter.groups.flatMap((group) => group.rows));
export const byId = new Map(allRows.map((row) => [row.id, row]));
/** Rows that count toward the estimate (scraps feed the outfits; optional tasks sit outside it). */
export const coreRows = allRows.filter((row) => !["optional", "scrap"].includes(row.tags[0]));
export const rowsByTag = (tag: string) => allRows.filter((row) => row.tags.includes(tag));
export const chapterRows = (chapter: Chapter) => chapter.groups.flatMap((group) => group.rows);
export const primaryTag = (row: Row): CategoryId => row.tags[0] as CategoryId;

export const two = (value: number) => String(value).padStart(2, "0");
export const pct = (done: number, total: number) => (total ? Math.floor((done / total) * 100) : 0);
export const readChapter = (value: unknown, fallback = 1) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= CHAPTER_COUNT ? n : fallback;
};

/** The in-game completion estimate, rounded down to a tenth like the game's stat. */
export const estimate = (checks: Record<string, true>) =>
  Math.min(100, Math.floor((coreRows.reduce((sum, row) => sum + (checks[row.id] === true ? row.weight : 0), 0) + 1e-8) * 10) / 10);

export const statusOptions: [string, string][] = [
  ["all", "All statuses"],
  ["todo", "Unfinished"],
  ["done", "Completed"],
];

/** Display name for a row tag (a category, or the cross-cutting "missable"). */
export const tagName = (tag: string) => (isCategory(tag) ? cats[tag][0] : tag === "missable" ? "Missable" : tag);

/** Categories that are bulk or sweep work: left out of "Next up" unless nothing else remains. */
const sweepTags = new Set<string>(["location", "scrap", "optional"]);

/**
 * The next unchecked steps in route order (chapters, then groups, then rows) across the given
 * chapters. Sweep entries only appear when nothing else is left.
 */
export function nextUp(checks: Record<string, true>, chapterIds: number[], count = 3): Row[] {
  const rows = chapters.filter((chapter) => chapterIds.includes(chapter.id)).flatMap(chapterRows).filter((row) => checks[row.id] !== true);
  const steps = rows.filter((row) => !sweepTags.has(primaryTag(row)));
  return (steps.length ? steps : rows).slice(0, count);
}

/** In-game percentage points still to earn, per category, biggest first. */
export function pointsLeft(checks: Record<string, true>): { tag: CategoryId; left: number; total: number }[] {
  const byTag = new Map<CategoryId, { left: number; total: number }>();
  for (const row of coreRows) {
    const entry = byTag.get(primaryTag(row)) ?? { left: 0, total: 0 };
    entry.total += row.weight;
    if (checks[row.id] !== true) entry.left += row.weight;
    byTag.set(primaryTag(row), entry);
  }
  return [...byTag].map(([tag, v]) => ({ tag, ...v })).filter((item) => item.total > 0).sort((a, b) => b.left - a.left);
}

/** Missable rows of a chapter that are still unchecked. */
export const missablesLeft = (chapter: Chapter, checks: Record<string, true>) =>
  chapterRows(chapter).filter((row) => row.missable && checks[row.id] !== true);

/** How far the game's own number is from the estimate, in points (positive: game is ahead). */
export const calibrationDelta = (estimated: number, reported: number) => Math.round((reported - estimated) * 10) / 10;
