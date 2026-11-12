import { Link } from "react-router";
import { Empty } from "./ui";
import { changeChecks } from "../lib/actions";
import { missables } from "../data/missables";
import { cats, chapters, missablesLeft, nextUp, primaryTag } from "../lib/guide";
import { isOpen, useProgress } from "../store/progress";
import type { Chapter } from "../types";

/** The next unchecked steps in route order across every revealed chapter. */
export function NextUp() {
  const data = useProgress((s) => s.data);
  const openIds = chapters.filter((chapter) => isOpen(data, chapter.id)).map((chapter) => chapter.id);
  const rows = nextUp(data.checks, openIds, 3);

  return (
    <section className="next-up" aria-labelledby="next-up-title">
      <h2 id="next-up-title">Next up</h2>
      {rows.length ? (
        <ul>
          {rows.map((row) => (
            <li key={row.id}>
              <input
                id={`next-${row.id}`}
                type="checkbox"
                checked={false}
                onChange={() => changeChecks([row.id], true, `Checked “${row.title}”.`)}
              />
              <label htmlFor={`next-${row.id}`}>
                <strong>{row.title}</strong>
                <small>
                  {cats[primaryTag(row)][1]} · {row.group}
                </small>
              </label>
              <Link className="origin" to={`/guide/${row.chapter}/${row.id}`} aria-label={`Jump to “${row.title}” in chapter ${row.chapter}`}>
                Jump to
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Everything revealed is checked. Reveal the next chapter or compare with Stats → General.</Empty>
      )}
    </section>
  );
}

/** Pinned per-chapter reminder of entries that can be lost by moving on. Hidden when none remain. */
export function MissablesStrip({ chapter }: { chapter: Chapter }) {
  const checks = useProgress((s) => s.data.checks);
  const rows = missablesLeft(chapter, checks);
  if (!rows.length) return null;
  return (
    <details className="missables" open>
      <summary>
        <strong>Don’t miss before moving on</strong>
        <span className="group-count">{rows.length} left</span>
      </summary>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            <input id={`missable-${row.id}`} type="checkbox" checked={false} onChange={() => changeChecks([row.id], true, `Checked “${row.title}”.`)} />
            <label htmlFor={`missable-${row.id}`}>
              <strong>{row.title}</strong>
              <small>{missables.find((item) => item.id === row.id)?.why ?? row.group}</small>
            </label>
            <Link className="origin" to={`/guide/${row.chapter}/${row.id}`} aria-label={`Jump to “${row.title}”`}>
              Jump to
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
