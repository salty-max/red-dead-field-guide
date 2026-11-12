import { allRows, byId, chapters, coreRows, CHAPTER_COUNT, estimate, readChapter } from "./guide";
import { sources } from "../data/catalog";

describe("guide data", () => {
  it("has its chapters in order, each with rows", () => {
    expect(chapters.map((chapter) => chapter.id)).toEqual(Array.from({ length: CHAPTER_COUNT }, (_, i) => i + 1));
    for (const chapter of chapters) expect(chapter.groups.some((group) => group.rows.length)).toBe(true);
  });

  it("has unique row ids", () => {
    expect(byId.size).toBe(allRows.length);
  });

  it("keeps scraps and optional tasks out of the estimate", () => {
    expect(coreRows.length).toBeLessThan(allRows.length);
    expect(coreRows.every((row) => !["scrap", "optional"].includes(row.tags[0]))).toBe(true);
  });

  it("totals roughly 100% when everything is checked", () => {
    const all = Object.fromEntries(allRows.map((row) => [row.id, true as const]));
    expect(estimate({})).toBe(0);
    expect(estimate(all)).toBeGreaterThanOrEqual(99);
    expect(estimate(all)).toBeLessThanOrEqual(100);
  });

  it("only links to https sources", () => {
    for (const [, url] of sources) expect(url).toMatch(/^https:\/\//);
    for (const row of allRows) if (row.reference) expect(row.reference).toMatch(/^https:\/\//);
  });

  it("clamps chapter numbers", () => {
    expect(readChapter("3")).toBe(3);
    expect(readChapter("0", 2)).toBe(2);
    expect(readChapter(String(CHAPTER_COUNT + 1))).toBe(1);
    expect(readChapter("x", 5)).toBe(5);
  });
});
