/** [id, category, title, text, reference link] */
export type RawRow = [id: string, category: string, title: string, text: string, reference?: string];

export interface RawGroup {
  chapter: number;
  title: string;
  location: string;
  source?: string;
  note?: string;
  icon?: string;
  rows: RawRow[];
}

export interface RawChapter {
  id: number;
  title: string;
  region: string;
  intro: string;
  /** What the rail shows while the chapter is hidden: a place name, never story. */
  teaser: string;
}

export interface Row {
  id: string;
  title: string;
  text: string;
  chapter: number;
  location: string;
  group: string;
  tags: string[];
  reference?: string;
  /** Share of the game's completion percentage this row is worth. */
  weight: number;
  /** Can be lost for good if you move on (see src/data/missables.ts). */
  missable?: true;
}

export interface Group {
  key: string;
  title: string;
  location: string;
  icon?: string;
  note?: string;
  source?: string;
  rows: Row[];
}

export interface Chapter extends RawChapter {
  groups: Group[];
}

export interface ProgressState {
  /** 2 adds `reported`. Version 1 backups are still accepted on import. */
  version: 2;
  guide: "red-dead-redemption";
  checks: Record<string, true>;
  ceiling: number;
  spoilers: boolean;
  chapter: number;
  /** The percentage the player read in the game (Stats → General), or null. */
  reported: number | null;
}
