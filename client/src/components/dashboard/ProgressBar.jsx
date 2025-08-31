import React from 'react';
import { cn } from '../../utils/cn';

const ProgressBar = ({ progress, color, height = 'h-2' }) => (
  <div className={cn('bg-gray-800 rounded-full overflow-hidden', height)}>
    <div
      className={cn('h-full transition-all duration-300', color)}
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressBar;
