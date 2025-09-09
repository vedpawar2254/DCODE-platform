import {
  Calendar,
  CalendarDays,
  Github,
  GitPullRequest,
  GraduationCap,
  Linkedin,
  Locate,
  Mail,
  TrendingUp,
  Twitter,
} from "lucide-react";
import React from "react";

export default function SkillsOverview() {
  const languages = [
    { name: "JavaScript", color: "#FFD923", percent: 28 },
    { name: "Rust", color: "#FF6F61", percent: 22 },
    { name: "TypeScript", color: "#3B82F6", percent: 20 },
    { name: "Python", color: "#60A5FA", percent: 18 },
    { name: "Other", color: "#A78BFA", percent: 12 },
  ];
  const techStack = [
    "React",
    "Node.js",
    "Rust",
    "PostgreSQL",
    "Docker",
    "AWS",
    "GraphQL",
    "MongoDB",
  ];
  // Donut chart SVG
  const donutData = [28, 22, 20, 18, 12];
  const donutColors = ["#FFD923", "#FF6F61", "#3B82F6", "#60A5FA", "#A78BFA"];
  const total = donutData.reduce((a, b) => a + b, 0);
  let acc = 0;
  const arcs = donutData.map((val, i) => {
    const start = (acc / total) * 2 * Math.PI;
    acc += val;
    const end = (acc / total) * 2 * Math.PI;
    const largeArc = end - start > Math.PI ? 1 : 0;
    const x1 = 40 + 32 * Math.cos(start - Math.PI / 2);
    const y1 = 40 + 32 * Math.sin(start - Math.PI / 2);
    const x2 = 40 + 32 * Math.cos(end - Math.PI / 2);
    const y2 = 40 + 32 * Math.sin(end - Math.PI / 2);
    return `<path d="M${x1},${y1} A32,32 0 ${largeArc} 1 ${x2},${y2}" stroke="${donutColors[i]}" stroke-width="8" fill="none" />`;
  });
  return (
    <div className="bg-transparent rounded-md p-6 shadow border border-[#23252B] w-full max-w-md backdrop-blur-md flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-4">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M4 4h16v16H4V4z" stroke="#C6FF3D" strokeWidth="2" />
        </svg>
        <span className="text-white font-semibold text-lg">
          Skills Overview
        </span>
      </div>
      <div className="flex flex-col items-center mb-4">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <g dangerouslySetInnerHTML={{ __html: arcs.join("") }} />
          <circle cx="40" cy="40" r="24" fill="#181A20" />
          <text
            x="40"
            y="40"
            textAnchor="middle"
            dy=".3em"
            fontSize="1.5em"
            fill="#fff"
          >
            5
          </text>
          <text
            x="40"
            y="54"
            textAnchor="middle"
            fontSize="0.9em"
            fill="#A1A1AA"
          >
            Languages
          </text>
        </svg>
      </div>
      <div className="mb-4">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center justify-between text-sm mb-1"
          >
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: lang.color }}
              />
              {lang.name}
            </span>
            <span className="text-[#A1A1AA]">{lang.percent}%</span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="text-white font-semibold mb-2">Tech Stack</div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="bg-[#23252B] text-[#A1A1AA] px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}