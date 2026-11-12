import { rawChapters } from "../data/catalog";
import early from "../data/early";
import late from "../data/late";
import side from "../data/side";
import world from "../data/world";
import challenges from "../data/challenges";
import type { Chapter, Group, RawGroup, Row } from "../types";
import type { IconName } from "../components/Icon";

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
const weights: Record<string, number> = {
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
            tags: [category],
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
