import React from 'react';
import { cn } from '../../utils/cn';

const EnhancedProgressBar = ({
  progress,
  maxValue = 100,
  label,
  value,
  color = 'bg-[#BCDD19]',
  height = 'h-2',
  showValue = true,
  className = '',
  segments = 5, // Number of segments
  segmentGap = 2 // Gap between segments in pixels
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const filledSegments = Math.floor((percentage / 100) * segments);
  const partialSegment = ((percentage / 100) * segments) % 1;

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          {showValue && (
            <span className="text-sm text-white font-medium">
              {value}/{maxValue}
            </span>
          )}
        </div>
      )}

      <div className={cn('flex gap-0.5', height)}>
        {Array.from({ length: segments }, (_, index) => {
          let segmentFill = 0;

          if (index < filledSegments) {
            segmentFill = 100;
          } else if (index === filledSegments && partialSegment > 0) {
            segmentFill = partialSegment * 100;
          }

          return (
            <div
              key={index}
              className={cn(
                'flex-1 bg-gray-800/80 rounded-sm border border-gray-700/50 overflow-hidden',
                height
              )}
              style={{
                marginRight: index < segments - 1 ? `${segmentGap}px` : '0'
              }}
            >
              <div
                className={cn(
                  'h-full transition-all duration-300 ease-out rounded-sm',
                  segmentFill > 0 ? color : '',
                  'shadow-sm'
                )}
                style={{
                  width: `${segmentFill}%`,
                  background:
                    segmentFill > 0
                      ? `linear-gradient(90deg, ${color.includes('BCDD19') ? '#BCDD19' : '#22c55e'} 0%, ${color.includes('BCDD19') ? '#9BCF00' : '#16a34a'} 100%)`
                      : 'transparent'
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedProgressBar;
