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
import {
  useChartAnimation,
  chartAnimations,
} from "../../utils/chartAnimations";

export default function DailyPrActivityChart({ className, activityData }) {
  console.log(activityData);

  // Use the chart animation hook for consistent animations
  const {
    key: chartKey,
    animationProps,
    containerVariants,
  } = useChartAnimation(activityData, {
    type: "area",
    enableReanimation: true,
  });

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
              {`Last ${activityData?.length || 0} days`}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 px-0 w-full">
        <motion.div
          key={chartKey}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <ChartContainer
            config={{
              prs: { label: "PRs", color: "hsl(var(--chart-1))" },
            }}
            className="h-[250px] sm:h-[300px] lg:h-[400px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="#1a1f1b"
                  vertical={false}
                  {...chartAnimations.grid}
                />
                <XAxis
                  dataKey="day"
                  stroke="#1a1f1b"
                  tick={{ fill: "#7b827e", fontSize: 10 }}
                  className="sm:text-xs"
                  {...chartAnimations.xAxis}
                />
                <YAxis
                  stroke="#1a1f1b"
                  tick={{ fill: "#7b827e", fontSize: 10 }}
                  className="sm:text-xs"
                  {...chartAnimations.yAxis}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent className="bg-black !text-white" />
                  }
                  {...chartAnimations.tooltip}
                />
                <defs>
                  <linearGradient id="limeLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c7f03d" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#c7f03d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="prs"
                  stroke="#c7f03d"
                  strokeWidth={2}
                  fill="url(#limeLine)"
                  className="sm:stroke-[3]"
                  dot={{
                    r: 3,
                    fill: "#0b0f0e",
                    stroke: "#c7f03d",
                    strokeWidth: 2,
                    className: "sm:r-4",
                  }}
                  activeDot={{ r: 5, className: "sm:r-6" }}
                  {...animationProps}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
