const PATHS = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  resume: 'M6 2h9l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M14 2v6h6 M8 13h8 M8 17h6',
  project: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M3 9h18 M9 13l-2 2 2 2 M15 13l2 2-2 2',
  certificate: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M8.5 13.5L7 22l5-3 5 3-1.5-8.5',
  mail: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M2 7l10 7 10-7',
  phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z',
  pin: 'M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  user: 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M4 21a8 8 0 0 1 16 0z',
  graduation: 'M2 9l10-5 10 5-10 5z M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
  briefcase: 'M3 8h18v12H3z M8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3 M3 13h18',
  star: 'M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.5 5.8 21l1.4-7L2 9.3l7-.8z',
  code: 'M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4z',
  palette: 'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2-.6-1.2.2-2.5 1.6-2.5H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5z M7.5 11h.01 M10 7h.01 M14.5 7h.01 M17 10.5h.01',
  close: 'M6 6l12 12 M18 6L6 18',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  check: 'M5 12l5 5 9-10',
  linkedin: 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M8 11v6 M8 7.5h.01 M12 17v-6 M12 13a3 3 0 0 1 6 0v4',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M17.5 6.5h.01',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z',
  x: 'M4 4l16 16 M20 4L4 20',
};

/** Inline SVG icon. The look (line / duotone / badge / ring) is chosen live by data-icons on <html>.
 *  Pass `lead` for icons that may be drawn as a badge or ring (cards, headings); other icons stay plain. */
export function Icon({ name, lead = false, big = false }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <span className={`ico${lead ? ' lead' : ''}${big ? ' big' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}
