import { Link } from "react-router";
import { Button, Empty } from "./ui";
import { changeChecks } from "../lib/actions";
import { missables } from "../data/missables";
import { cats, chapters, missablesLeft, nextUp, primaryTag } from "../lib/guide";
import { useHeldRows } from "../lib/useHeldRows";
import { isOpen, useProgress } from "../store/progress";
import type { Chapter } from "../types";

/** The next unchecked steps in route order across every revealed chapter. */
export function NextUp() {
  const data = useProgress((s) => s.data);
  const openIds = chapters.filter((chapter) => isOpen(data, chapter.id)).map((chapter) => chapter.id);
  const { rows, holding, hold, release } = useHeldRows(nextUp(data.checks, openIds, 3), data.checks);

  return (
    <section className="next-up" aria-labelledby="next-up-title">
      <h2 id="next-up-title">Next up</h2>
      {rows.length ? (
        <ul onChangeCapture={hold}>
          {rows.map((row) => (
            <li key={row.id} className={data.checks[row.id] === true ? "ticked" : undefined}>
              <input
                id={`next-${row.id}`}
                type="checkbox"
                checked={data.checks[row.id] === true}
                onChange={(event) =>
                  changeChecks([row.id], event.currentTarget.checked, `${event.currentTarget.checked ? "Checked" : "Unchecked"} “${row.title}”.`)
                }
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
      {holding && (
        <div className="next-up-advance">
          <Button onClick={release}>Show next steps</Button>
        </div>
      )}
    </section>
  );
}

/** Pinned per-chapter reminder of entries that can be lost by moving on. Hidden when none remain. */
export function MissablesStrip({ chapter }: { chapter: Chapter }) {
  // Re-mount per chapter so a held list never leaks into the next one.
  return <MissablesList key={chapter.id} chapter={chapter} />;
}

function MissablesList({ chapter }: { chapter: Chapter }) {
  const checks = useProgress((s) => s.data.checks);
  const { rows, hold } = useHeldRows(missablesLeft(chapter, checks), checks);
  if (!rows.length) return null;
  const left = rows.filter((row) => checks[row.id] !== true).length;
  return (
    <details className="missables" open>
      <summary>
        <strong>Don’t miss before moving on</strong>
        <span className="group-count">{left} left</span>
      </summary>
      <ul onChangeCapture={hold}>
        {rows.map((row) => (
          <li key={row.id} className={checks[row.id] === true ? "ticked" : undefined}>
            <input
              id={`missable-${row.id}`}
              type="checkbox"
              checked={checks[row.id] === true}
              onChange={(event) =>
                changeChecks([row.id], event.currentTarget.checked, `${event.currentTarget.checked ? "Checked" : "Unchecked"} “${row.title}”.`)
              }
            />
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
