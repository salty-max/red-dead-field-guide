import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "./Icon";
import { IconButton } from "./ui";
import { DialogHost } from "./DialogHost";
import { UpdatePrompt } from "./UpdatePrompt";
import { UndoToast } from "./UndoToast";
import { byId, chapterRows, chapters, pct, readChapter, two } from "../lib/guide";
import { isOpen, useProgress } from "../store/progress";
import { useReveal } from "../lib/useReveal";
import { useTheme } from "../store/theme";
import { useUi } from "../store/ui";
import { useResolvedTheme } from "../lib/useThemeEffects";

function viewOf(pathname: string) {
  const [view = "guide", param] = pathname.split("/").filter(Boolean);
  return { view, param };
}

function ThemeToggle() {
  const dark = useResolvedTheme() === "dark";
  const setPreference = useTheme((s) => s.setPreference);
  const announce = useUi((s) => s.announce);
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <IconButton
      className="icon-button theme-toggle"
      icon={dark ? "sun" : "moon"}
      label={label}
      title={label}
      onClick={() => {
        const next = dark ? "light" : "dark";
        setPreference(next);
        announce(next === "dark" ? "Dark mode enabled." : "Light mode enabled.");
      }}
    />
  );
}

function SaveStatus() {
  const error = useProgress((s) => s.storageError);
  const openDialog = useUi((s) => s.openDialog);
  return (
    <button
      className="save-status"
      type="button"
      data-error={error ? "" : undefined}
      aria-label={error ? "Storage unavailable. Open progress settings" : "Progress saved. Open progress settings"}
      onClick={() => openDialog({ kind: "settings" })}
    >
      <span />
      {error ? "Storage unavailable" : "Progress saved"}
    </button>
  );
}

function Rail({ id, className, activeChapter, view, railRef }: { id: string; className: string; activeChapter: number; view: string; railRef: RefObject<HTMLElement | null> }) {
  const data = useProgress((s) => s.data);
  const reveal = useReveal();
  const openDialog = useUi((s) => s.openDialog);
  return (
    <aside ref={railRef} className={className} id={id} aria-label="Chapters">
      <div>
        <div className="rail-heading">Walkthrough</div>
        <nav className="rail-nav" aria-label="Walkthrough chapters">
          {chapters.map((chapter) => {
            const n = two(chapter.id);
            if (!isOpen(data, chapter.id)) {
              return (
                <button key={chapter.id} className="chapter-link locked" type="button" onClick={() => reveal(chapter.id)}>
                  <span className="number">{n}</span>
                  <span>{chapter.teaser}</span>
                  <Icon name="lock" />
                  <span className="sr-only"> · hidden by spoiler protection. Reveal chapter {chapter.id}</span>
                </button>
              );
            }
            const current = view === "guide" && activeChapter === chapter.id;
            const rows = chapterRows(chapter);
            const done = rows.filter((row) => data.checks[row.id] === true).length;
            const complete = done === rows.length;
            return (
              <Link key={chapter.id} className="chapter-link" to={`/guide/${chapter.id}`} aria-current={current ? "page" : undefined}>
                <span className="number">{n}</span>
                <span className="chapter-name">
                  {chapter.title}
                  <small>{complete ? "Complete" : `${pct(done, rows.length)}% done`}</small>
                </span>
                <Icon name={complete ? "check" : "right"} />
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="rail-bottom">
        <div className="spoiler-card">
          <Icon name={data.spoilers ? "lock" : "unlock"} />
          <div>
            <strong>Spoiler protection {data.spoilers ? "on" : "off"}</strong>
            <p>{data.spoilers ? `Chapters past ${data.ceiling} are hidden.` : "All chapters are visible."}</p>
            <button className="text-button" type="button" onClick={() => openDialog({ kind: "settings" })}>
              Change settings
            </button>
          </div>
        </div>
        <div className="rail-credit">Original campaign · 2010</div>
      </div>
    </aside>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const chapter = useProgress((s) => s.data.chapter);
  const announcement = useUi((s) => s.announcement);
  const dialogOpen = useUi((s) => s.dialog !== null);
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const setMenuOpen = (open: boolean) => setMenuPath(open ? pathname : null);
  const mainRef = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const { view, param } = viewOf(pathname);
  const activeChapter = readChapter(param, chapter);

  // Moving to a new page: close the menu, reset scroll and focus <main>, unless the URL
  // points at something to scroll to (a guide entry).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const [, , entry] = pathname.split("/").filter(Boolean);
    const targeted = (view === "guide" && entry && byId.get(entry)?.chapter === activeChapter);
    if (targeted) return;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, view, param, activeChapter]);

  useEffect(() => {
    if (!menuOpen) return;
    const rail = railRef.current;
    (rail?.querySelector<HTMLElement>('[aria-current="page"]') ?? rail?.querySelector<HTMLElement>(".chapter-link"))?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !dialogOpen) {
        setMenuPath(null);
        menuToggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, dialogOpen]);

  const navs = [
    ["guide", "Guide", "book", `/guide/${chapter}`],
    ["checklist", "Checklist", "checkList", "/checklist"],
    ["dashboard", "Progress", "chart", "/dashboard"],
  ] as const;

  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="topbar">
        <button
          ref={menuToggle}
          className="mobile-menu icon-button"
          type="button"
          aria-label={menuOpen ? "Close chapters" : "Open chapters"}
          aria-controls="chapter-rail"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name="menu" />
        </button>
        <Link className="brand" to={`/guide/${chapter}`} aria-label="Red Dead Field Guide home">
          <span className="brand-icon">
            <Icon name="compass" />
          </span>
          <span className="brand-type">
            <strong>Red Dead</strong>
            <small>FIELD GUIDE</small>
          </span>
        </Link>
        <nav id="top-nav" className="top-nav" aria-label="Main navigation">
          {navs.map(([id, label, icon, to]) => (
            <Link key={id} to={to} aria-current={view === id ? "page" : undefined}>
              <Icon name={icon} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="topbar-actions">
          <ThemeToggle />
          <SaveStatus />
        </div>
      </header>
      <div className="layout">
        <Rail id="chapter-rail" className={menuOpen ? "rail open" : "rail"} activeChapter={activeChapter} view={view} railRef={railRef} />
        <button className="scrim" type="button" aria-label="Close chapters" hidden={!menuOpen} onClick={() => setMenuOpen(false)} />
        <main id="main" className="main" tabIndex={-1} ref={mainRef}>
          {children}
        </main>
      </div>
      <DialogHost />
      <div className="toast-stack">
        <UndoToast />
        <UpdatePrompt />
      </div>
      <div id="status" className="sr-only" role="status">
        {announcement}
      </div>
    </>
  );
}
