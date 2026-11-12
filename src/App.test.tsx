import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { STORAGE_KEY, defaultState } from "./lib/progress-state";
import { chapters } from "./lib/guide";
import { useProgress } from "./store/progress";

beforeAll(() => {
  window.matchMedia ??= ((query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} })) as typeof window.matchMedia;
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) { this.removeAttribute("open"); this.dispatchEvent(new Event("close")); };
  Element.prototype.scrollIntoView ??= () => {};
});

beforeEach(() => {
  localStorage.clear();
  useProgress.setState({ data: defaultState(), storageError: false });
  history.replaceState(null, "", "/guide/1");
});

describe("App", () => {
  it("opens in New Austin and persists a ticked step", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: chapters[0].title })).toBeInTheDocument();
    const [first] = screen.getAllByRole("checkbox");
    await user.click(first);
    expect(first).toBeChecked();
    expect(Object.keys(JSON.parse(localStorage.getItem(STORAGE_KEY)!).checks)).toHaveLength(1);
  });

  it("hides later chapters until revealed", async () => {
    const user = userEvent.setup();
    history.replaceState(null, "", "/guide/3");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "Chapter 3 is hidden" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reveal chapter" }));
    await user.click(screen.getByRole("button", { name: "Reveal and open" }));
    expect(await screen.findByRole("heading", { level: 1, name: chapters[2].title })).toBeInTheDocument();
    expect(useProgress.getState().data.ceiling).toBe(3);
  });

  it("checks a whole group, then undoes it from the toast", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: chapters[0].title });
    await user.click(screen.getAllByRole("button", { name: /^Check all \d+ entries/ })[0]);
    expect(Object.keys(useProgress.getState().data.checks).length).toBeGreaterThan(1);
    await user.click(await screen.findByRole("button", { name: "Undo" }));
    expect(useProgress.getState().data.checks).toEqual({});
  });

  it("lists the next unchecked steps and gives every source link a name", async () => {
    render(<App />);
    await screen.findByRole("heading", { level: 2, name: "Next up" });
    expect(within(screen.getByRole("region", { name: "Next up" })).getAllByRole("link", { name: /^Jump to/ })).toHaveLength(3);
    for (const link of screen.getAllByRole("link", { name: /^Source for/ })) expect(link).toHaveAccessibleName();
    expect(screen.queryByRole("link", { name: "Source" })).toBeNull();
  });
});
