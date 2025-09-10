import React from 'react';

const DashboardHeader = ({ stats, user }) => {
  console.log("user------", user);
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Welcome back, <span className="text-[#BCDD19]">{user?.name || "Champ"}!</span> Here's
          your
          <span className="text-[#BCDD19]"> contribution</span> overview.
        </p>
      </div>
      <div className="text-center sm:text-right">
        <div className="text-2xl sm:text-3xl font-bold text-[#BCDD19]">
          {stats.linesOfCode.toLocaleString()}
        </div>
        <div className="text-gray-400 text-xs sm:text-sm">Lines of code</div>
      </div>
    </div>
  );
};

export default DashboardHeader;
