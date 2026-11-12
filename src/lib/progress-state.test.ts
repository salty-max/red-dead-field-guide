import { allRows } from "./guide";
import { defaultState, validateState } from "./progress-state";

describe("validateState", () => {
  const id = allRows[0].id;
  const base = { version: 1, guide: "red-dead-redemption" };

  it("round-trips a default state", () => {
    expect(validateState(JSON.parse(JSON.stringify(defaultState())))).toEqual(defaultState());
  });

  it("rejects things that are not backups", () => {
    for (const bad of [null, {}, { version: 2, checks: {} }, { ...base, checks: [] }, base, { version: 1, checks: {} }]) {
      expect(() => validateState(bad)).toThrow();
    }
  });

  it("drops unknown ids and non-true checks", () => {
    const state = validateState({ ...base, checks: { [id]: true, nope: true, [allRows[1].id]: false } });
    expect(state.checks).toEqual({ [id]: true });
  });

  it("sanitises chapter numbers and the spoiler flag", () => {
    const state = validateState({ ...base, checks: {}, ceiling: 99, chapter: 4, spoilers: "no" });
    expect(state.ceiling).toBe(1);
    expect(state.chapter).toBe(4);
    expect(state.spoilers).toBe(true);
    expect(validateState({ ...base, checks: {}, spoilers: false }).spoilers).toBe(false);
  });
});

describe("schema versions", () => {
  const base = { guide: "red-dead-redemption", checks: {} };

  it("loads a version 1 backup and leaves the reported percentage empty", () => {
    const state = validateState({ ...base, version: 1, ceiling: 2, chapter: 2, spoilers: false, reported: 50 });
    expect(state).toMatchObject({ version: 2, ceiling: 2, spoilers: false, reported: null });
  });

  it("keeps a valid reported percentage to a tenth", () => {
    expect(validateState({ ...base, version: 2, reported: 37.46 }).reported).toBe(37.5);
    expect(validateState({ ...base, version: 2, reported: "12" }).reported).toBe(12);
    expect(validateState({ ...base, version: 2, reported: 0 }).reported).toBe(0);
  });

  it("drops invalid reported values", () => {
    for (const bad of [140, -1, "x", NaN, null, undefined, true, {}]) {
      expect(validateState({ ...base, version: 2, reported: bad }).reported).toBeNull();
    }
  });

  it("rejects an unknown future version", () => {
    expect(() => validateState({ ...base, version: 3 })).toThrow();
  });
});
