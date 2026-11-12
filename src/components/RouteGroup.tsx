import { Link } from "react-router";
import { Icon, type IconName } from "./Icon";
import { Button } from "./ui";
import { cats, primaryTag } from "../lib/guide";
import { changeChecks } from "../lib/actions";
import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";
import type { Row } from "../types";

/** Unchecking more than this many at once asks first. */
export const BULK_CONFIRM_THRESHOLD = 10;

interface RowProps {
  row: Row;
  prefix: string;
  highlighted: boolean;
  origin?: boolean;
  /** Where to send focus if ticking this row filters it out of the list. */
  fallbackFocusId: string;
}

export function RouteRow({ row, prefix, highlighted, origin = false, fallbackFocusId }: RowProps) {
  const checked = useProgress((s) => s.data.checks[row.id] === true);
  const inputId = `${prefix}-${row.id}`;
  const tag = primaryTag(row);

  return (
    <div className={["route-row", checked && "completed", highlighted && "highlight"].filter(Boolean).join(" ")} id={`entry-${row.id}`}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          changeChecks([row.id], event.target.checked, `${event.target.checked ? "Checked" : "Unchecked"} “${row.title}”.`);
          requestAnimationFrame(() => {
            if (!document.getElementById(inputId)) document.getElementById(fallbackFocusId)?.focus({ preventScroll: true });
          });
        }}
      />
      <div>
        {/* The label stretches over the whole row (see .route-row label::after), so the row is the tap target. */}
        <label htmlFor={inputId}>{row.title}</label>
        {row.text && <p>{row.text}</p>}
      </div>
      <div className="row-meta">
        <span className={`tag ${tag}`}>{cats[tag][1]}</span>
        {row.missable && <span className="tag missable">Missable</span>}
        {origin ? (
          <Link className="origin" to={`/guide/${row.chapter}/${row.id}`} aria-label={`Open “${row.title}” in chapter ${row.chapter}`}>
            Chapter {row.chapter}
          </Link>
        ) : (
          row.reference && (
            <a className="origin" href={row.reference} target="_blank" rel="noopener noreferrer" aria-label={`Source for ${row.title} (opens in a new tab)`}>
              Source
            </a>
          )
        )}
      </div>
    </div>
  );
}

interface GroupProps {
  groupKey: string;
  title: string;
  location: string;
  icon?: string;
  note?: string;
  source?: string;
  rows: Row[];
  open: boolean;
  highlightedId: string;
  origin?: boolean;
  fallbackFocusId: string;
  /** Persist manual open/close only when the list is unfiltered. */
  rememberToggle: boolean;
}

export function RouteGroup({ groupKey, title, location, icon, note, source, rows, open, highlightedId, origin, fallbackFocusId, rememberToggle }: GroupProps) {
  const setGroupOpen = useUi((s) => s.setGroupOpen);
  const openDialog = useUi((s) => s.openDialog);
  const checks = useProgress((s) => s.data.checks);
  const graphic = (icon ?? cats[primaryTag(rows[0])][2]) as IconName;
  const done = rows.filter((row) => checks[row.id] === true).length;
  const allDone = done === rows.length;

  const toggleAll = () => {
    const ids = rows.map((row) => row.id);
    if (!allDone) {
      const count = rows.length - done;
      changeChecks(ids, true, `Checked ${count} in “${title}”.`);
      return;
    }
    const uncheck = () => changeChecks(ids, false, `Unchecked ${ids.length} in “${title}”.`);
    if (ids.length <= BULK_CONFIRM_THRESHOLD) uncheck();
    else
      openDialog({
        kind: "confirm",
        title: `Uncheck ${ids.length} entries?`,
        explanation: `This clears every shown entry in “${title}”. You can undo it right after.`,
        label: "Uncheck all",
        danger: true,
        onConfirm: uncheck,
      });
  };

  return (
    <details
      className="route-group"
      data-section={groupKey}
      open={open}
      onToggle={(event) => {
        if (rememberToggle && event.currentTarget.isConnected) setGroupOpen(groupKey, event.currentTarget.open);
      }}
    >
      <summary>
        <span className="group-icon">
          <Icon name={graphic} />
        </span>
        <span>
          <h3>{title}</h3>
          <small>{location}</small>
        </span>
        <span className="group-count">
          {done} / {rows.length}
        </span>
        <Icon name="down" className="svg-icon caret" />
      </summary>
      {(note || source || (!origin && rows.length > 1)) && (
        <div className="group-note">
          {note && <p>{note}</p>}
          <div className="group-tools">
            {!origin && rows.length > 1 && (
              <Button icon="check" onClick={toggleAll} aria-label={`${allDone ? "Uncheck" : "Check"} all ${rows.length} entries in ${title}`}>
                {allDone ? "Uncheck all" : "Check all"}
              </Button>
            )}
            {source && (
              <a className="text-link" href={source} target="_blank" rel="noopener noreferrer" aria-label={`Open reference for ${title} (opens in a new tab)`}>
                Open reference <Icon name="right" />
              </a>
            )}
          </div>
        </div>
      )}
      <div className="route-list">
        {rows.map((row) => (
          <RouteRow key={row.id} row={row} prefix={groupKey} highlighted={highlightedId === row.id} origin={origin} fallbackFocusId={fallbackFocusId} />
        ))}
      </div>
    </details>
  );
}
