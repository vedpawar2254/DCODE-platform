"use client";

import {
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, memo } from "react";

const DailyPrActivityChart = memo(function DailyPrActivityChart({
  className,
  activityData,
}) {
  // Use ref to prevent excessive logging and re-renders
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Only log once when data changes, not on every render
  const prevDataRef = useRef();
  if (prevDataRef.current !== activityData) {
    console.log(
      "DailyPRActivityCard render #",
      renderCount.current,
      "- PR DATA:",
      activityData
    );
    prevDataRef.current = activityData;
  }

  // Track if data is ready and should animate
  const [isDataReady, setIsDataReady] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const mountTimestamp = useRef(Date.now());

  // Effect to handle data changes and initial load
  useEffect(() => {
    if (activityData && activityData.length > 0) {
      setIsDataReady(true);
      // Generate new animation key based on mount time and current time to ensure uniqueness
      setAnimationKey(Date.now() + mountTimestamp.current);
    } else {
      setIsDataReady(false);
    }
  }, [activityData]); // Don't render chart until data is ready
  if (!isDataReady || !activityData || activityData.length === 0) {
    return (
      <Card
        className={`bg-white/[0.02] border border-gray-800 rounded-xl p-4 sm:p-6 h-full ${className} w-full`}
      >
        <CardHeader className="pb-0 px-0">
          <CardTitle className="text-white">
            <div className="text-[color:var(--muted)] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <span className="text-base sm:text-lg">
                Daily <span className="text-[#BCDD19]">PR</span> Activity
              </span>
              <span className="text-[#D5D5D5]/70 font-light text-sm">
                Loading...
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 px-0 w-full">
          <div className="h-[250px] sm:h-[300px] lg:h-[400px] w-full flex items-center justify-center">
            <div className="text-gray-500">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      key={`chart-container-${animationKey}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        className={`bg-white/[0.02] border border-gray-800 rounded-xl p-4 sm:p-6 h-full ${className} w-full`}
      >
        <CardHeader className="pb-0 px-0">
          <CardTitle className="text-white">
            <div className="text-[color:var(--muted)] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <span className="text-base sm:text-lg">
                Daily <span className="text-[#BCDD19]">PR</span> Activity
              </span>
              <span className="text-[#D5D5D5]/70 font-light text-sm">
                {`Last ${activityData?.length || 0} days`}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 px-0 w-full">
          <ChartContainer
            config={{
              prs: { label: "PRs", color: "hsl(var(--chart-1))" },
            }}
            className="h-[250px] sm:h-[300px] lg:h-[400px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                key={`area-chart-${animationKey}`}
                data={activityData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#1a1f1b" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="#1a1f1b"
                  tick={{ fill: "#7b827e", fontSize: 10 }}
                  className="sm:text-xs"
                />
                <YAxis
                  stroke="#1a1f1b"
                  tick={{ fill: "#7b827e", fontSize: 10 }}
                  className="sm:text-xs"
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-black !text-white" />
                  }
                />
                <defs>
                  <linearGradient
                    id={`dailyPR-gradient-${animationKey}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#c7f03d" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#c7f03d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  key={`area-${animationKey}`}
                  type="monotone"
                  dataKey="prs"
                  stroke="#c7f03d"
                  strokeWidth={2}
                  fill={`url(#dailyPR-gradient-${animationKey})`}
                  className="sm:stroke-[3]"
                  dot={{
                    r: 3,
                    fill: "#0b0f0e",
                    stroke: "#c7f03d",
                    strokeWidth: 2,
                    className: "sm:r-4",
                  }}
                  activeDot={{ r: 5, className: "sm:r-6" }}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default DailyPrActivityChart;
