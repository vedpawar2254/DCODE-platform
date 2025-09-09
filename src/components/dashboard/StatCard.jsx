import React from 'react';
import { cn } from '../../utils/cn';

const StatCard = ({ icon, title, value, subtitle, bgColor, textColor }) => (
  <div
    className={`${cn('rounded-xl p-4 sm:p-6 border border-gray-800', bgColor)} relative overflow-hidden min-h-[120px] sm:min-h-[140px]`}
  >
    <div
      className={`${bgColor} absolute bottom-[-1.5rem] sm:bottom-[-2.1rem] right-[-1.5rem] sm:right-[-2.1rem] w-[8rem] sm:w-[10rem] h-[8rem] sm:h-[10rem] rounded-full grid place-items-center`}
    >
      <div
        className={`${bgColor.slice(0, -3) + '/50'} w-[6rem] sm:w-[7.5rem] h-[6rem] sm:h-[7.5rem] rounded-full flex items-start justify-center`}
      >
        <div
          className={`${cn(
            'p-2 rounded-lg',
            textColor.replace('text-', 'bg-').replace('-400', '-400/20')
          )} p-[0.8rem] sm:p-[1rem] ${bgColor} shadow-[0_4px_20px_rgba(0,0,0,0.3)] translate-y-[1rem] sm:translate-y-[1.2rem]`}
        >
          {icon}
        </div>
      </div>
    </div>
    <div className="flex flex-col h-full justify-end translate-y-[0.5rem] md:space-y-1">
      <div className="text-gray-400 text-xs sm:text-sm font-medium">
        {title}
      </div>
      <div className="flex items-center justify-between">
        <div className={cn('text-xl sm:text-2xl font-bold', textColor)}>
          {value}
        </div>
      </div>
      <div className="text-gray-500 text-xs mt-1">{subtitle}</div>
    </div>
  </div>
);

export default StatCard;
// x={centerX - radius - 8}
//   y={centerY - radius + radius / 2 - 20}
