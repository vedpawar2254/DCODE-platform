export default function TimelineLine({ height = 1200 }) {
  return (
    <svg
      width="8"
      height={height}
      viewBox={`0 0 8 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main line */}
      <line
        x1="4"
        y1="0"
        x2="4"
        y2={height}
        stroke="url(#lineGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Soft blur glow behind */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="10" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <defs>
        <linearGradient
          id="lineGradient"
          x1="4"
          y1="0"
          x2="4"
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1C1F0A" />
          <stop offset="50%" stopColor="#37CD5A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1C1F0A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
