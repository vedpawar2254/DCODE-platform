export default function ConnectLines({ width = 180 }) {
  const w = Number(width);

  return (
    <svg
      width={w}
      height="2"
      viewBox={`0 0 ${w} 2`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="1"
        x2={w}
        y2="1"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="lineGradient"
          x1="0"
          y1="1"
          x2={w}
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#19DD71" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#19DD71" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
