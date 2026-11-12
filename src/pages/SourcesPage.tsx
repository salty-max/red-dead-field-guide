import { ExternalLink } from "../components/SourceLinks";
import { Breadcrumb, PageHeading } from "../components/ui";
import { sources } from "../data/catalog";

export function SourcesPage() {
  return (
    <>
      <Breadcrumb current="Sources" />
      <PageHeading title="Sources and maps">
        <p>These references cover the original Red Dead Redemption campaign and its modern releases. External guides may reveal later chapters.</p>
      </PageHeading>
      <section className="panel">
        <h2>Walkthrough references</h2>
        <ul className="source-list">
          {sources.map(([label, url]) => (
            <li key={url}>
              <ExternalLink label={label} url={url} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
