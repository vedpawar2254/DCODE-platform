import React from 'react';
import { Link } from 'react-router-dom';

const DashboardFooter = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 sm:pt-6 border-t border-gray-800 text-xs sm:text-sm text-gray-500 gap-3 sm:gap-0">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center sm:text-left">
        <Link to="/privacy" className="hover:text-gray-300">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-gray-300">
          Terms & Conditions
        </Link>
      </div>
      <div className="text-center sm:text-right">
        © 2025 DCODE. All rights reserved.
      </div>
    </div>
  );
};

export default DashboardFooter;
