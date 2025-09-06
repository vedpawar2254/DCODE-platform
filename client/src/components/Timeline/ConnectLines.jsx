const TimelineConnector = ({ inverted = false, isVisible = false }) => {
  return (
    <div
      style={{
        filter: "drop-shadow(0 0 6px #19DD71)",
        transform: inverted ? "rotate(180deg)" : "none",
        width: "120px",
      }}
      className="transition-all duration-500 ease-out"
    >
      <svg
        width="220"
        height="2"
        viewBox="0 0 220 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M219 1L1 1"
          stroke="url(#paint0_linear_425_306)"
          strokeLinecap="round"
          strokeWidth="2"
          strokeDasharray="220"
          strokeDashoffset={isVisible ? 0 : 220}
          style={{
            transition: "stroke-dashoffset 0.8s ease-out",
            transitionDelay: "0.2s",
          }}
        />
        <defs>
          <linearGradient
            id="paint0_linear_425_306"
            x1="219"
            y1="0.5"
            x2="1"
            y2="0.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#65770D" stopOpacity="0" />
            <stop offset="1" stopColor="#19DD71" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TimelineConnector;
