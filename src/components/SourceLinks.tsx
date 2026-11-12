import { Link } from "react-router";

type Item = [label: string, url: string];

export function ExternalLink({ label, url }: { label: string; url: string }) {
  return url.startsWith("/") ? (
    <Link to={url}>{label}</Link>
  ) : (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}

export function SourceLinks({ items }: { items: Item[] }) {
  return (
    <details className="sources">
      <summary>Sources and maps</summary>
      <ul>
        {items.map(([label, url]) => (
          <li key={url}>
            <ExternalLink label={label} url={url} />
          </li>
        ))}
      </ul>
    </details>
  );
}
