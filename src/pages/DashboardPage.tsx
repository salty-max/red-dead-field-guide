import { Link } from "react-router";
import { Stat } from "../components/Stats";
import { Breadcrumb, Button, PageHeading, ProgressBar } from "../components/ui";
import { CHAPTER_COUNT, cats, chapterRows, chapters, coreRows, estimate, two, type CategoryId } from "../lib/guide";
import { exportProgress } from "../lib/backup";
import { isOpen, useProgress } from "../store/progress";
import { useUi } from "../store/ui";

export function DashboardPage() {
  const data = useProgress((s) => s.data);
  const openDialog = useUi((s) => s.openDialog);
  const total = coreRows.length;
  const done = coreRows.filter((row) => data.checks[row.id] === true).length;
  const visible = chapters.filter((chapter) => isOpen(data, chapter.id));

  return (
    <>
      <Breadcrumb current="Progress" />
      <PageHeading title="Your progress">
        <p>Compare the estimate with Stats → General in your game.</p>
        <span className="inline-stat">
          {estimate(data.checks)}% estimated · {done} of {total} entries
        </span>
      </PageHeading>
      <div className="dashboard-grid">
        <section className="panel">
          <h2>Chapter progress</h2>
          <p>Open a revealed chapter to resume its route.</p>
          {visible.map((chapter) => {
            const rows = chapterRows(chapter);
            const count = rows.filter((row) => data.checks[row.id] === true).length;
            return (
              <Link key={chapter.id} className="chapter-progress" to={`/guide/${chapter.id}`}>
                <small>{two(chapter.id)}</small>
                <strong>{chapter.title}</strong>
                <ProgressBar done={count} total={rows.length} label={chapter.title} />
                <small>
                  {count} / {rows.length}
                </small>
              </Link>
            );
          })}
          {data.spoilers && data.ceiling < CHAPTER_COUNT && <p>{CHAPTER_COUNT - data.ceiling} chapters hidden by spoiler protection.</p>}
        </section>
        <section className="panel">
          <h2>Progress backup</h2>
          <p>Progress lives in this browser. Export a backup to move it to another device or keep a copy.</p>
          <div className="controls">
            <Button onClick={exportProgress}>Export progress</Button>
            <Button onClick={() => openDialog({ kind: "settings" })}>Import progress</Button>
          </div>
        </section>
      </div>
      <section className="panel">
        <div className="subhead">
          <div>
            <h2>By category</h2>
            <p>The estimate uses the game’s category weights. Ambient Challenges add credit at ranks 5 and 10. Outfit scraps and optional tasks are tracked separately.</p>
          </div>
        </div>
        <div className="category-board">
          {(Object.keys(cats) as CategoryId[]).map((id) => (
            <Stat key={id} tag={id} />
          ))}
        </div>
      </section>
    </>
  );
}
