import React from "react";

const RadarChart = ({ data }) => {
  const centerX = 100;
  const centerY = 100;
  const maxRadius = window.innerWidth > 764 ? 110 : 80;
  const levels = 5;

  // Generate pentagon points for the grid
  const generatePentagonPoints = (radius) => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push([x, y]);
    }
    return points;
  };

  // Generate data polygon points
  const generateDataPoints = () => {
    const points = [];
    for (let i = 0; i < data.length; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const radius = (data[i].percentage / 100) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push([x, y]);
    }
    return points;
  };

  const dataPoints = generateDataPoints();

  return (
    <div className="flex items-center justify-center overflow-visible md:mt-[2rem]">
      <svg
        width="200"
        height="200"
        className="drop-shadow-sm overflow-visible sm:w-[240px] sm:h-[240px]"
      >
        {/* Grid lines */}
        {Array.from({ length: levels }, (_, i) => {
          const radius = ((i + 1) / levels) * maxRadius;
          const points = generatePentagonPoints(radius);
          return (
            <polygon
              key={i}
              points={points.map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke="#333333"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Axis lines */}
        {Array.from({ length: 5 }, (_, i) => {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const endX = centerX + maxRadius * Math.cos(angle);
          const endY = centerY + maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="#333333"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}

        {/* Data area */}
        <polygon
          points={dataPoints.map((p) => p.join(",")).join(" ")}
          fill="#12b76a"
          fillOpacity="0.1"
          stroke="#12b76a"
          strokeWidth="2"
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point[0]}
            cy={point[1]}
            r="4"
            fill={data[index].color}
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))}

        {/* Labels */}
        {data.map((item, index) => {
          const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
          const labelRadius = maxRadius + 15;
          const x = centerX + labelRadius * Math.cos(angle);
          const y = centerY + labelRadius * Math.sin(angle);

          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill={item.name === "Javascript" ? "#12b76a" : "#8a8a8a"}
              fontWeight={item.name === "Javascript" ? "600" : "400"}
              className="sm:text-xs"
            >
              {item.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const skillsData = [
  { name: "Javascript", value: 80, percentage: 28, color: "#12b76a" },
  { name: "Rust", value: 65, percentage: 18, color: "#348fe3" },
  { name: "Go", value: 60, percentage: 18, color: "#fdc300" },
  { name: "Python", value: 70, percentage: 18, color: "#f43f5e" },
  { name: "Others", value: 55, percentage: 18, color: "#a855f7" },
];
const SkillsSummaryCard = ({ languages }) => {
  return (
    <div className="bg-white/[0.02] border border-gray-800 rounded-xl p-4 sm:p-6 h-full">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">
          Skills <span className="text-[#BCDD19]">Summary</span>
        </h3>
        <span className="text-xs sm:text-sm text-gray-400">
          {languages.length || 0} Total
        </span>
      </div>

      {/* Radar Chart Placeholder */}
      <div className="flex flex-col justify-between h-[86%]">
        <div className="relative mx-auto mb-4 sm:mb-6 flex-shrink-0">
          <RadarChart data={languages.slice(0, 5)} />
        </div>

        {/* Language percentages */}
        <div className="space-y-1 sm:space-y-2">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-xs sm:text-sm text-gray-300">
                  {lang.name}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400">
                {lang.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSummaryCard;
