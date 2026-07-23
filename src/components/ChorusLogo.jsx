const bladePaths = [
  'M50 4C65 4 78 10 87 20L61 35C57 29 51 26 44 27L31 5C37 4 44 4 50 4Z',
  'M87 20C96 31 99 45 96 58L66 58C68 51 66 44 61 35L87 20Z',
  'M96 58C92 73 83 84 71 91L56 65C62 63 65 61 66 58L96 58Z',
  'M71 91C57 98 43 98 30 92L45 66C49 68 53 67 56 65L71 91Z',
  'M30 92C17 86 8 75 4 61L34 61C36 64 39 66 45 66L30 92Z',
  'M4 61C1 46 5 31 14 20L40 36C35 42 32 51 34 61L4 61Z',
  'M14 20C19 14 24 9 31 5L44 27C43 29 41 32 40 36L14 20Z',
]

export default function ChorusLogo({ compact = false }) {
  return (
    <a className="brand" href="#top" aria-label="Chorus home">
      <svg
        className="brand-mark"
        viewBox="0 0 100 100"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <pattern id="chorus-dots" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="currentColor" />
          </pattern>
        </defs>
        <g fill="url(#chorus-dots)">
          {bladePaths.map((path) => (
            <path d={path} key={path} />
          ))}
        </g>
        <circle cx="50" cy="50" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {!compact && <span className="brand-word">Chorus</span>}
    </a>
  )
}
