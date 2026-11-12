import { Link } from "react-router";
import { Icon, type IconName } from "./Icon";
import { ProgressBar } from "./ui";
import { cats, coreRows, estimate, rowsByTag, type CategoryId } from "../lib/guide";
import { useProgress } from "../store/progress";

export function Stat({ tag }: { tag: CategoryId | "overall" }) {
  const checks = useProgress((s) => s.data.checks);
  const rows = tag === "overall" ? coreRows : rowsByTag(tag);
  const done = rows.filter((row) => checks[row.id] === true).length;
  const [name, , graphic]: readonly [string, string, IconName] = tag === "overall" ? ["Estimated Completion", "", "compass"] : cats[tag];
  const value = estimate(checks);
  const label = tag === "overall" ? `${value}%` : done;
  const detail = tag === "overall" ? "in-game" : `/ ${rows.length}`;
  return (
    <Link className="stat" to={tag === "overall" ? "/dashboard" : `/checklist/${tag}`}>
      <span className="stat-head">
        <span className={`stat-icon ${tag}`}>
          <Icon name={graphic} />
        </span>
        {name}
      </span>
      <span className="stat-values">
        {label} <small>{detail}</small>
      </span>
      <ProgressBar done={tag === "overall" ? value : done} total={tag === "overall" ? 100 : rows.length} label={name} />
    </Link>
  );
}
