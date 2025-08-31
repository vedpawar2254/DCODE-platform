import React from 'react';

const DashboardFooter = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 sm:pt-6 border-t border-gray-800 text-xs sm:text-sm text-gray-500 gap-3 sm:gap-0">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center sm:text-left">
        <a href="#" className="hover:text-gray-300">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-gray-300">
          Terms & Conditions
        </a>
      </div>
      <div className="text-center sm:text-right">
        © 2025 DCODE. All rights reserved.
      </div>
    </div>
  );
};

export default DashboardFooter;
