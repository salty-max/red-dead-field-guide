import { allRows, byId, calibrationDelta, chapters, coreRows, CHAPTER_COUNT, estimate, missablesLeft, nextUp, pointsLeft, readChapter, rowsByTag } from "./guide";
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

describe("route helpers", () => {
  const first = chapters[0].groups[0].rows[0];

  it("picks the next unchecked steps in route order", () => {
    const next = nextUp({}, [1, 2], 3);
    expect(next).toHaveLength(3);
    expect(next[0].id).toBe(first.id);
    const after = nextUp({ [first.id]: true }, [1, 2], 3);
    expect(after.map((row) => row.id)).not.toContain(first.id);
    expect(after[0].id).toBe(next[1].id);
  });

  it("only looks at revealed chapters", () => {
    for (const row of nextUp({}, [2], 5)) expect(row.chapter).toBe(2);
    expect(nextUp({}, [], 3)).toEqual([]);
  });

  it("keeps sweep entries out of next up until nothing else is left", () => {
    const steps = allRows.filter((row) => !["location", "scrap", "optional"].includes(row.tags[0]));
    const checks = Object.fromEntries(steps.map((row) => [row.id, true as const]));
    const next = nextUp(checks, [1, 2, 3, 4, 5], 3);
    expect(next.length).toBeGreaterThan(0);
    expect(next.every((row) => ["location", "scrap", "optional"].includes(row.tags[0]))).toBe(true);
  });

  it("totals the points left per category to the whole estimate", () => {
    const left = pointsLeft({});
    expect(left.reduce((sum, item) => sum + item.left, 0)).toBeGreaterThanOrEqual(99);
    expect([...left].sort((a, b) => b.left - a.left)).toEqual(left);
    const all = Object.fromEntries(allRows.map((row) => [row.id, true as const]));
    expect(pointsLeft(all).every((item) => item.left === 0)).toBe(true);
  });

  it("flags missables and measures calibration", () => {
    expect(missablesLeft(chapters[0], {}).map((row) => row.id)).toContain("optional-i-know-you-start");
    expect(missablesLeft(chapters[0], { "optional-i-know-you-start": true })).toEqual([]);
    expect(rowsByTag("missable").every((row) => row.missable)).toBe(true);
    expect(calibrationDelta(40.3, 41)).toBe(0.7);
    expect(calibrationDelta(41, 40.2)).toBe(-0.8);
  });
});
