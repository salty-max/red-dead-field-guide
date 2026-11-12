import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Icon } from "../components/Icon";
import { RouteGroup } from "../components/RouteGroup";
import { Stat } from "../components/Stats";
import { Breadcrumb, Button, Chip, Empty, LinkButton, SelectField } from "../components/ui";
import { SourceLinks } from "../components/SourceLinks";
import { byId, CHAPTER_COUNT, chapterRows, chapters, readChapter, statusOptions, two } from "../lib/guide";
import { useReveal } from "../lib/useReveal";
import { isOpen, useProgress } from "../store/progress";
import { useUi } from "../store/ui";
import type { Chapter } from "../types";

const routeLabels: [string, string][] = [
  ["all", "All steps"],
  ["mission", "Story"],
  ["stranger", "Strangers"],
  ["location", "Map"],
  ["challenge", "Challenges"],
  ["bounty", "Bounties"],
  ["outfit", "Outfits"],
];

export function GuidePage() {
  const { chapter: param, entry } = useParams();
  const data = useProgress((s) => s.data);
  const visitChapter = useProgress((s) => s.visitChapter);
  const reveal = useReveal();
  const chapterId = readChapter(param, data.chapter);
  const open = isOpen(data, chapterId);

  useEffect(() => {
    if (open) visitChapter(chapterId);
  }, [open, chapterId, visitChapter]);

  if (!open) {
    return (
      <>
        <Breadcrumb current={`Chapter ${chapterId}`} />
        <div className="page-heading">
          <h1>Chapter {chapterId} is hidden</h1>
          <p>Reveal through this chapter when you’re ready.</p>
        </div>
        <Button look="" icon="unlock" onClick={() => reveal(chapterId)}>
          Reveal chapter
        </Button>{" "}
        <LinkButton to={`/guide/${data.ceiling}`}>Back to your guide</LinkButton>
      </>
    );
  }
  const highlight = entry && byId.get(entry)?.chapter === chapterId ? entry : "";
  // Re-mount per chapter/entry so filters reset exactly when you move somewhere new.
  return <GuideView key={`${chapterId}:${highlight}`} chapter={chapters[chapterId - 1]} initialHighlight={highlight} />;
}

function GuideView({ chapter, initialHighlight }: { chapter: Chapter; initialHighlight: string }) {
  const checks = useProgress((s) => s.data.checks);
  const data = useProgress((s) => s.data);
  const openGroups = useUi((s) => s.openGroups);
  const setGroupOpen = useUi((s) => s.setGroupOpen);
  const setGroupsOpen = useUi((s) => s.setGroupsOpen);
  const reveal = useReveal();
  const [filter, setFilter] = useState("all");
  const [status, setStatus] = useState("all");
  const [highlighted, setHighlighted] = useState(initialHighlight);
  const [resumeTick, setResumeTick] = useState(0);

  const rows = chapterRows(chapter);
  const done = rows.filter((row) => checks[row.id] === true).length;
  const groups = chapter.groups
    .map((group) => ({
      ...group,
      shown: group.rows.filter(
        (row) => (filter === "all" || row.tags.includes(filter)) && (status === "all" || (status === "done") === (checks[row.id] === true)),
      ),
    }))
    .filter((group) => group.shown.length);
  const labels = routeLabels.filter(([key]) => key === "all" || rows.some((row) => row.tags.includes(key)));
  const filtered = filter !== "all" || status !== "all";
  const groupOpen = (key: string, index: number, shownIds: string[]) =>
    filtered || (openGroups[key] ?? index === 0) || shownIds.includes(highlighted);
  const allOpen = groups.every((group, index) => groupOpen(group.key, index, group.shown.map((row) => row.id)));

  // Arrive scrolled to a linked entry.
  useEffect(() => {
    if (initialHighlight) document.getElementById(`entry-${initialHighlight}`)?.scrollIntoView({ block: "start" });
  }, [initialHighlight]);

  // "Resume route": scroll to and focus the first unchecked step.
  useEffect(() => {
    if (!resumeTick) return;
    const element = document.getElementById(highlighted ? `entry-${highlighted}` : "route");
    element?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    (element?.querySelector("input") ?? element?.querySelector("button"))?.focus({ preventScroll: true });
    // Only re-run for a new resume request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeTick]);

  const resume = () => {
    const group = chapter.groups.find((item) => item.rows.some((row) => checks[row.id] !== true));
    setFilter("all");
    setStatus("all");
    setHighlighted(group?.rows.find((row) => checks[row.id] !== true)?.id ?? "");
    if (group) setGroupOpen(group.key, true);
    setResumeTick((tick) => tick + 1);
  };

  const next =
    chapter.id < CHAPTER_COUNT ? (
      isOpen(data, chapter.id + 1) ? (
        <LinkButton to={`/guide/${chapter.id + 1}`} look="" icon="arrow">
          Next chapter
        </LinkButton>
      ) : (
        <Button look="" icon="unlock" onClick={() => reveal(chapter.id + 1)}>
          Reveal next chapter
        </Button>
      )
    ) : (
      <LinkButton to="/dashboard" look="" icon="chart">
        View progress
      </LinkButton>
    );

  return (
    <>
      <Breadcrumb current={chapter.title} />
      <section className="hero" data-chapter={chapter.id}>
        <div className="hero-content">
          <div className="hero-meta">
            <span className="kicker">Chapter {two(chapter.id)} / {two(CHAPTER_COUNT)}</span>
            <span>{chapter.region}</span>
          </div>
          <h1>{chapter.title}</h1>
          <p>{chapter.intro}</p>
          <div className="hero-actions">
            <Button look="gold" icon="play" onClick={resume}>
              {done ? "Resume route" : "Start walkthrough"}
            </Button>
            <LinkButton to={`/checklist/all/${chapter.id}`} look="ghost" icon="checkList">
              Open checklist
            </LinkButton>
          </div>
        </div>
      </section>
      <section className="stats" aria-label="Progress summary">
        <Stat tag="overall" />
        <Stat tag="mission" />
        <Stat tag="location" />
      </section>
      <section id="route" aria-labelledby="route-title">
        <div className="subhead">
          <div>
            <h2 id="route-title">Chapter route</h2>
            <p>
              {done} of {rows.length} steps complete
            </p>
          </div>
          <button
            className="text-link"
            type="button"
            onClick={() => setGroupsOpen(groups.map((group) => group.key), !allOpen)}
          >
            <Icon name="down" />
            <span>{allOpen ? "Collapse all" : "Expand all"}</span>
          </button>
        </div>
        <div className="toolbar">
          <div className="chips" aria-label="Route categories">
            {labels.map(([id, label]) => (
              <Chip
                key={id}
                label={label}
                value={id}
                current={filter}
                onSelect={(value) => {
                  setFilter(value);
                  setHighlighted("");
                }}
              />
            ))}
          </div>
          <SelectField
            id="route-status"
            label="Route completion status"
            choices={statusOptions}
            value={status}
            bare
            onChange={(value) => {
              setStatus(value);
              setHighlighted("");
            }}
          />
        </div>
        {groups.length ? (
          groups.map((group, index) => (
            <RouteGroup
              key={group.key}
              groupKey={group.key}
              title={group.title}
              location={group.location}
              icon={group.icon}
              note={group.note}
              source={group.source}
              rows={group.shown}
              complete={group.shown.length === group.rows.length}
              open={groupOpen(group.key, index, group.shown.map((row) => row.id))}
              highlightedId={highlighted}
              fallbackFocusId="route-status"
              rememberToggle={!filtered}
            />
          ))
        ) : (
          <Empty>No steps match these filters.</Empty>
        )}
        <div className="end-nav">
          <span>
            {chapter.id > 1 && (
              <LinkButton to={`/guide/${chapter.id - 1}`} icon="left">
                Previous chapter
              </LinkButton>
            )}
          </span>
          {next}
        </div>
      </section>
      <SourceLinks items={[["Completion references and maps", "/sources"]]} />
    </>
  );
}
