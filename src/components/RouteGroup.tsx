import { Link } from "react-router";
import { Icon, type IconName } from "./Icon";
import { Button } from "./ui";
import { cats, primaryTag } from "../lib/guide";
import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";
import type { Row } from "../types";

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
  const setCheck = useProgress((s) => s.setCheck);
  const announce = useUi((s) => s.announce);
  const inputId = `${prefix}-${row.id}`;
  const tag = primaryTag(row);

  return (
    <div className={["route-row", checked && "completed", highlighted && "highlight"].filter(Boolean).join(" ")} id={`entry-${row.id}`}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(event) => {
          setCheck(row.id, event.target.checked);
          announce(event.target.checked ? "Checked and saved." : "Unchecked and saved.");
          requestAnimationFrame(() => {
            if (!document.getElementById(inputId)) document.getElementById(fallbackFocusId)?.focus({ preventScroll: true });
          });
        }}
      />
      <div>
        <label htmlFor={inputId}>{row.title}</label>
        {row.text && <p>{row.text}</p>}
      </div>
      <div className="row-meta">
        <span className={`tag ${tag}`}>{cats[tag][1]}</span>
        {origin ? (
          <Link className="origin" to={`/guide/${row.chapter}/${row.id}`}>
            Chapter {row.chapter}
          </Link>
        ) : (
          row.reference && (
            <a className="origin" href={row.reference} target="_blank" rel="noopener noreferrer" aria-label={`Source for ${row.title}`}>
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
  /** Every row of the group is shown, so a bulk action covers exactly what is listed. */
  complete: boolean;
  open: boolean;
  highlightedId: string;
  origin?: boolean;
  fallbackFocusId: string;
  /** Persist manual open/close only when the list is unfiltered. */
  rememberToggle: boolean;
}

export function RouteGroup({ groupKey, title, location, icon, note, source, rows, complete, open, highlightedId, origin, fallbackFocusId, rememberToggle }: GroupProps) {
  const setGroupOpen = useUi((s) => s.setGroupOpen);
  const openDialog = useUi((s) => s.openDialog);
  const announce = useUi((s) => s.announce);
  const checks = useProgress((s) => s.data.checks);
  const checkMany = useProgress((s) => s.checkMany);
  const graphic = (icon ?? cats[primaryTag(rows[0])][2]) as IconName;
  const done = rows.filter((row) => checks[row.id] === true).length;
  const isCounty = !origin && complete && rows.every((row) => primaryTag(row) === "location");

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
      {(note || source) && (
        <div className="group-note">
          {note && <p>{note}</p>}
          <div className="group-tools">
            {isCounty && done < rows.length && (
              <Button
                icon="check"
                onClick={() =>
                  openDialog({
                    kind: "confirm",
                    title: `Mark ${location} discovered?`,
                    explanation: "Check that your game map shows the county and every location in this list.",
                    label: "Mark discovered",
                    onConfirm: () => {
                      checkMany(rows.map((row) => row.id));
                      announce(`${location} marked discovered.`);
                    },
                  })
                }
              >
                Mark county discovered
              </Button>
            )}
            {source && (
              <a className="text-link" href={source} target="_blank" rel="noopener noreferrer">
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
