const paths = {
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
    book:'<path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0 0 4h14M8 8h8m-8 4h6" transform="translate(0 -1)"/>',
    checkList:'<path d="m3 6 2 2 3-4m-5 9 2 2 3-4m-5 9 2 2 3-4M11 6h10m-10 7h10m-10 7h10"/>',
    chart:'<path d="M4 4v16h16M8 16v-4m5 4V8m5 8v-6"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/>',
    unlock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.6-1.8M12 14v3"/>',
    shield:'<path d="M12 22s7-3 7-10V5l-7-3-7 3v7c0 7 7 10 7 10Z"/><path d="m9 12 2 2 4-4"/>',
    pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    heart:'<path d="M20.8 8.6c0 4.7-8.8 10.2-8.8 10.2S3.2 13.3 3.2 8.6A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.2Z"/>',
    shell:'<path d="M11 19c-3.8-1-7.8-4.3-8.1-8.4-.2-2.1 1.3-3.5 2.8-3.5.5-1.8 2.1-2.7 3.8-2.2 1.4-1.7 3.6-1.7 5 0 1.7-.5 3.3.4 3.8 2.2 1.5 0 3 1.4 2.8 3.5C20.8 14.7 16.8 18 13 19l-1 1-1-1Zm1 0V8m-1 11L7 10m6 9 4-9"/>',
    chest:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 11h18m-11 0v4h4v-4M6 6v5m12-5v5"/>',
    swap:'<path d="M3 7h17m-4-4 4 4-4 4M21 17H4m4-4-4 4 4 4"/>',
    sword:'<path d="m14.5 17.5-8-8M3 21l5-5m-3-3 6 6m-.5-7L19 4l2-1-1 2-8.5 8.5"/>',
    star:'<path d="m12 3 2.6 5.5 6.1.8-4.4 4.3 1 6.1-5.3-2.9-5.4 2.9 1.1-6.1-4.4-4.3 6.1-.8L12 3Z"/>',
    flask:'<path d="M9 3h6m-5 0v7l-5 7c-1.4 2 .1 4 2 4h10c2 0 3.4-2 2-4l-5-7V3M8 15h8"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    down:'<path d="m6 9 6 6 6-6"/>',
    right:'<path d="m9 6 6 6-6 6"/>',
    left:'<path d="m15 6-6 6 6 6"/>',
    arrow:'<path d="M3 12h17m-6-6 6 6-6 6"/>',
    play:'<path d="m8 5 11 7-11 7V5Z"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    x:'<path d="m6 6 12 12M18 6 6 18"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    minus:'<path d="M5 12h14"/>',
    mountain:'<path d="m2 19 6-9 3 4 4-9 7 14H2Zm11-10 2 2 2-2"/>',
    gem:'<path d="M4 9 8 4h8l4 5-8 11L4 9Zm0 0h16M8 4l4 16 4-16"/>',
    fish:'<path d="M15 12c-2.3-4.7-7.8-6.2-12 0 4.2 6.2 9.7 4.7 12 0Zm0 0 5-4v8l-5-4Zm-7-1h.01"/>',
    music:'<path d="M9 17V5l10-2v12M9 8l10-2"/><ellipse cx="6" cy="17" rx="3" ry="2"/><ellipse cx="16" cy="15" rx="3" ry="2"/>',
    castle:'<path d="M3 21V8h4v3h3V4h4v7h3V8h4v13H3Zm7 0v-4a2 2 0 1 1 4 0v4"/>',
    moon:'<path d="M20.8 14.1A9 9 0 0 1 9.9 3.2a9 9 0 1 0 10.9 10.9Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/>',
    home:'<path d="m3 11 9-7 9 7m-16-1v10h14V10m-10 10v-6h6v6"/>',
    shirt:'<path d="m8 4-5 3 2 5 3-1v9h8v-9l3 1 2-5-5-3a4 4 0 0 1-8 0Z"/>',
    scroll:'<path d="M7 4h11a2 2 0 0 1 0 4h-2v10a2 2 0 0 1-2 2H6a2 2 0 0 1 0-4h2V6a2 2 0 0 1 2-2m0 6h4m-4 3h4"/>',
    dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h.01m8 0h.01m-4 4h.01m-4 4h.01m8 0h.01" stroke-width="2.4"/>',
    leaf:'<path d="M6 17c-5-7 4-14 14-13 1 10-6 19-13 14m-3 3L15 10"/>'
} as const;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  className?: string;
}

/** Static, trusted SVG path data; nothing user-controlled reaches innerHTML. */
export function Icon({ name, className = "svg-icon" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths[name] }}
    />
  );
}
