import React from 'react';
import Speedometer from './Speedometer';
import EnhancedProgressBar from './EnhancedProgressBar';

const DailyStreakCard = ({ stats }) => {
  return (
    <div className="bg-white/[0.02] border border-gray-800 rounded-xl p-4 sm:p-6 h-full">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold">
          Daily <span className="text-[#BCDD19]">Streak</span>
        </h3>
        <span className="text-orange-500">🔥</span>
      </div>

      <div className="flex items-center justify-center mb-4 sm:mb-0">
        <Speedometer
          value={stats.dailyStreak}
          maxValue={100}
          size={window.innerWidth >= 768 ? 300 : 250}
        />
      </div>

      <div className="text-center mb-4 sm:mb-6">
        <div className="text-xs sm:text-sm text-gray-400">
          Your Current Streak
        </div>
      </div>

      {/* Today's Contribution */}
      <div className="space-y-3 sm:space-y-4">
        <h4 className="text-xs sm:text-sm font-medium text-[#BCDD19]">
          Today's Contribution
        </h4>
        <div className="space-y-3 sm:space-y-4">
          <EnhancedProgressBar
            label="Contributions"
            value={stats.todayContributions}
            maxValue={100}
            color="bg-[#BCDD19]"
            height="h-2"
          />

          <EnhancedProgressBar
            label="Lines of codes"
            value={stats.todayLinesOfCode}
            maxValue={500}
            color="bg-[#BCDD19]"
            height="h-2"
          />
        </div>
      </div>
    </div>
  );
};

export default DailyStreakCard;
