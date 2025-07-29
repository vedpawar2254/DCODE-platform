const TimelineConnector = ({ inverted = false }) => {
  return (
    <div
      style={{
        filter: 'drop-shadow(0 0 6px #19DD71)',
        transform: inverted ? 'rotate(180deg)' : 'none',
        width: '100px',
      }}
    >
      <svg width="194" height="2" viewBox="0 0 194 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M193.043 1L1.00003 1"
          stroke="url(#paint0_linear_425_306)"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="paint0_linear_425_306" x1="193.043" y1="0.5" x2="1.00003" y2="0.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#65770D" stopOpacity="0" />
            <stop offset="1" stopColor="#19DD71" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TimelineConnector;
