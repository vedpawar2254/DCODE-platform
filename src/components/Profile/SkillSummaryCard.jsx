import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AnimatedDiv,
  AnimatedText,
  AnimatedContainer,
} from "../ui/AnimatedComponents";
import {
  fadeUpVariants,
  scaleVariants,
  containerVariants,
  fadeLeftVariants,
  fadeRightVariants,
} from "../../lib/animations";

const RadarChart = ({ data }) => {
  const centerX = 100;
  const centerY = 100;
  const maxRadius = window.innerWidth > 764 ? 110 : 80;
  const levels = 5;
  const [animationProgress, setAnimationProgress] = useState(0);

  // Animate the chart data on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const animation = setInterval(() => {
        setAnimationProgress((prev) => {
          if (prev >= 1) {
            clearInterval(animation);
            return 1;
          }
          return prev + 0.02;
        });
      }, 16);
      return () => clearInterval(animation);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  // Generate data polygon points with animation
  const generateDataPoints = () => {
    const points = [];
    for (let i = 0; i < data.length; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const targetRadius = (data[i].percentage / 100) * maxRadius;
      const radius = targetRadius * animationProgress;
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

const languages = [
  { name: "Javascript", value: 80, percentage: 28, color: "#12b76a" },
  { name: "Rust", value: 65, percentage: 18, color: "#348fe3" },
  { name: "Go", value: 60, percentage: 18, color: "#fdc300" },
  { name: "Python", value: 70, percentage: 18, color: "#f43f5e" },
  { name: "Others", value: 55, percentage: 18, color: "#a855f7" },
];
const SkillsSummaryCard = ({ skills }) => {
  const [animatedPercentages, setAnimatedPercentages] = useState({});

  // Animate skill percentages
  useEffect(() => {
    skills.forEach((skill, index) => {
      setTimeout(() => {
        const timer = setInterval(() => {
          setAnimatedPercentages((prev) => {
            const current = prev[skill.name] || 0;
            const target = skill.percentage;

            if (current >= target) {
              clearInterval(timer);
              return { ...prev, [skill.name]: target };
            }

            return {
              ...prev,
              [skill.name]: Math.min(current + 1, target),
            };
          });
        }, 20);
      }, index * 200);
    });
  }, [skills]);

  return (
    <motion.div
      className="bg-white/[0.02] border border-gray-800 rounded-xl p-4 sm:p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex justify-between items-center mb-4 sm:mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatedText
          as="h3"
          className="text-base text-white sm:text-lg font-semibold"
        >
          Skills <motion.span className="text-[#BCDD19]">Summary</motion.span>
        </AnimatedText>
        <motion.span
          className="text-xs sm:text-sm text-gray-400"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          {skills.length || 0} Total
        </motion.span>
      </motion.div>

      {/* Radar Chart and Skills Grid */}
      <motion.div
        className="flex  h-full justify-between ml-[1rem]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative flex-shrink-0"
          variants={fadeLeftVariants}
        >
          <RadarChart data={skills.slice(0, 5)} />
        </motion.div>

        {/* Language percentages */}
        <motion.div
          className="space-y-1 sm:space-y-2 h-fit grid grid-cols-2 gap-3 w-fit"
          variants={fadeRightVariants}
        >
          <AnimatePresence>
            {skills.map((lang, index) => (
              <motion.div
                key={lang.name}
                className="flex items-center justify-between rounded-sm px-3 py-2 h-fit gap-[1rem]"
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  duration: 0.6,
                  ease: [0.6, -0.05, 0.01, 0.99],
                }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  // whileHover={{ x: 2 }}
                >
                  <motion.img
                    src={`https://cdn.simpleicons.org/${lang.name}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.filter = `invert(1)`;
                      e.target.src = "/images/code-icon.png";
                    }}
                    className="w-6 h-6 object-contain"
                    alt=""
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                    // whileHover={{
                    //   scale: 1.2,
                    //   rotate: 5,
                    //   filter: "brightness(1.2)",
                    // }}
                  />
                  <motion.span
                    className="text-xs sm:text-sm text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {lang.name}
                  </motion.span>
                </motion.div>

                <motion.span
                  className="text-xs sm:text-sm text-gray-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <motion.span
                    animate={{
                      color:
                        animatedPercentages[lang.name] === lang.percentage
                          ? ["#9CA3AF", "#C6FF3D", "#9CA3AF"]
                          : "#9CA3AF",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {animatedPercentages[lang.name] || 0}%
                  </motion.span>
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsSummaryCard;
