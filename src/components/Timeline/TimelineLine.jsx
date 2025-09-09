import { useEffect, useRef, useState } from "react";

export default function TimelineLine({ height = 1200 }) {
  const [isVisible, setIsVisible] = useState(false);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={lineRef}
      width="8"
      height={height}
      viewBox={`0 0 8 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-opacity duration-1000"
    >
      {/* Main line with drawing animation */}
      <line
        x1="4"
        y1="0"
        x2="4"
        y2={height}
        stroke="url(#lineGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={height}
        strokeDashoffset={0}
        // style={{
        //   transition: "stroke-dashoffset 2s ease-out",
        //   transitionDelay: "0.5s",
        // }}
      />

      {/* Glowing background line */}
      <line
        x1="4"
        y1="0"
        x2="4"
        y2={height}
        stroke="url(#glowGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.3"
        filter="url(#glow)"
        strokeDasharray={height}
        strokeDashoffset={isVisible ? 0 : height}
        style={{
          transition: "stroke-dashoffset 2s ease-out",
          transitionDelay: "0.3s",
        }}
      />

      {/* Soft blur glow behind */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="lineGradient"
          x1="4"
          y1="0"
          x2="4"
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1C1F0A" />
          <stop offset="30%" stopColor="#37CD5A" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#37CD5A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1C1F0A" />
        </linearGradient>

        <linearGradient
          id="glowGradient"
          x1="4"
          y1="0"
          x2="4"
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00FF80" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00FF80" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00FF80" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
