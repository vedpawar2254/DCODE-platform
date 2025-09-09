import React, { useState, useEffect } from 'react';

const Speedometer = ({ value, maxValue = 100, size = 300 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setAnimatedValue(0);
      return;
    }

    let startTime;
    const duration = value > 100 ? (value / maxValue) * 100 * 500 : value * 500;

    const animate = currentTime => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(easeOutQuart * value);

      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  const radius = (size - 40) / 2;
  const centerX = size / 2;
  const centerY = size / 2;

  // Speedometer arc goes from -200° to +135° (335° total)
  const startAngle = -200;
  const endAngle = 20;
  const totalAngle = endAngle - startAngle;

  // Calculate current angle based on animated value
  const currentAngle = startAngle + (animatedValue / maxValue) * totalAngle;

  // Convert angle to radians for calculations
  const currentAngleRad = (currentAngle * Math.PI) / 180;

  // Calculate cursor position
  const cursorRadius = radius - 10;
  const cursorX = centerX + cursorRadius * Math.cos(currentAngleRad);
  const cursorY = centerY + cursorRadius * Math.sin(currentAngleRad);

  // Create arc path for the speedometer
  const createArcPath = (startAngle, endAngle, radius) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const startX = centerX + radius * Math.cos(startAngleRad);
    const startY = centerY + radius * Math.sin(startAngleRad);
    const endX = centerX + radius * Math.cos(endAngleRad);
    const endY = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Create tick marks
  const ticks = [];
  for (let i = 0; i <= 4; i++) {
    const angle = startAngle + (i / 4) * totalAngle;
    const angleRad = (angle * Math.PI) / 180;

    const tickStartRadius = radius + 25;
    const tickEndRadius = radius + 10;

    const startX = centerX + tickStartRadius * Math.cos(angleRad);
    const startY = centerY + tickStartRadius * Math.sin(angleRad);
    const endX = centerX + tickEndRadius * Math.cos(angleRad);
    const endY = centerY + tickEndRadius * Math.sin(angleRad);

    ticks.push(
      <line
        key={i}
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#374151"
        strokeWidth="2"
      />
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size - 50 }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background arc */}
        <path
          d={createArcPath(startAngle, endAngle, radius)}
          stroke="#1F1F1F"
          strokeWidth={window.innerWidth >= 768 ? '50' : '30'}
          fill="none"
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d={createArcPath(startAngle, currentAngle, radius)}
          stroke="#BCDD19"
          strokeWidth={window.innerWidth >= 768 ? '20' : '10'}
          //   strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        {/* Tick marks */}
        {ticks}

        {/* Numbers */}
        {[0, 25, 50, 75, 100].map((tickValue, i) => {
          const angle = startAngle + (i / 4) * totalAngle;
          const angleRad = (angle * Math.PI) / 180;

          // Position text slightly outside the speedometer arc
          const textRadius = radius + 45;
          const textX = centerX + textRadius * Math.cos(angleRad);
          const textY = centerY + textRadius * Math.sin(angleRad);

          return (
            <text
              key={i}
              x={textX}
              y={textY + 5} // Slight vertical adjustment for better alignment
              fill="#9CA3AF"
              className="text-xs md:text-lg"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {tickValue}
            </text>
          );
        })}
        <g
          transform={`translate(${cursorX - 18}, ${cursorY - 23.5}) rotate(${currentAngle + 90}, 18, 23.5)`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="47"
            viewBox="0 0 36 47"
            fill="none"
            className="transition-all duration-500"
          >
            <mask
              id="path-1-outside-1_814_280"
              maskUnits="userSpaceOnUse"
              x="0.464844"
              y="0.00805682"
              width="36"
              height="47"
              fill="black"
            >
              <rect
                fill="white"
                x="0.464844"
                y="0.00805682"
                width="36"
                height="47"
              />
              <path d="M14.4336 5.37627C15.8445 2.21865 20.3274 2.21865 21.7383 5.37627L32.3252 29.0716C32.755 30.0338 32.7708 31.0403 32.4791 31.9322C32.3522 32.32 32.2888 32.5139 32.287 32.5196C32.2852 32.5252 32.2696 32.5749 32.2384 32.6742C31.9962 33.446 31.5318 34.2921 30.9365 35.3714C30.299 36.5273 29.5144 37.6029 28.5957 38.5677C25.8352 41.4664 22.0813 43.13 18.1436 43.2005C14.206 43.2709 10.3992 41.7428 7.54299 38.9446C6.58909 38.0101 5.76627 36.9586 5.08889 35.8216C4.15119 34.2477 3.51666 33.1819 3.47834 32.0852C3.4694 31.8292 3.46492 31.7011 3.46484 31.6686C3.46477 31.6361 3.47532 31.2857 3.49644 30.5851C3.51155 30.0834 3.62338 29.5715 3.8467 29.0716L14.4336 5.37627Z" />
            </mask>
            <path
              d="M14.4336 5.37627C15.8445 2.21865 20.3274 2.21865 21.7383 5.37627L32.3252 29.0716C32.755 30.0338 32.7708 31.0403 32.4791 31.9322C32.3522 32.32 32.2888 32.5139 32.287 32.5196C32.2852 32.5252 32.2696 32.5749 32.2384 32.6742C31.9962 33.446 31.5318 34.2921 30.9365 35.3714C30.299 36.5273 29.5144 37.6029 28.5957 38.5677C25.8352 41.4664 22.0813 43.13 18.1436 43.2005C14.206 43.2709 10.3992 41.7428 7.54299 38.9446C6.58909 38.0101 5.76627 36.9586 5.08889 35.8216C4.15119 34.2477 3.51666 33.1819 3.47834 32.0852C3.4694 31.8292 3.46492 31.7011 3.46484 31.6686C3.46477 31.6361 3.47532 31.2857 3.49644 30.5851C3.51155 30.0834 3.62338 29.5715 3.8467 29.0716L14.4336 5.37627Z"
              fill="#FACC15"
            />
            <path
              d="M14.4336 5.37627L11.6946 4.15243L11.6946 4.15248L14.4336 5.37627ZM21.7383 5.37627L24.4773 4.15248L24.4773 4.15243L21.7383 5.37627ZM32.3252 29.0716L35.0644 27.848L35.0643 27.8478L32.3252 29.0716ZM30.9365 35.3714L33.5635 36.8203L33.5635 36.8202L30.9365 35.3714ZM28.5957 38.5677L30.7682 40.6366L30.7683 40.6365L28.5957 38.5677ZM18.1436 43.2005L18.1972 46.2H18.1972L18.1436 43.2005ZM7.54299 38.9446L5.44354 41.0876L5.44355 41.0876L7.54299 38.9446ZM5.08889 35.8216L2.51162 37.3571L5.08889 35.8216ZM3.8467 29.0716L1.10766 27.8478L1.10758 27.848L3.8467 29.0716ZM3.46484 31.6686L0.464853 31.6758L3.46484 31.6686ZM32.4791 31.9322L35.3305 32.8647L32.4791 31.9322ZM32.2384 32.6742L35.1008 33.5726L32.2384 32.6742ZM32.287 32.5196L29.4301 31.6041L32.287 32.5196ZM14.4336 5.37627L17.1726 6.60011C17.5253 5.81071 18.6466 5.81071 18.9993 6.60011L21.7383 5.37627L24.4773 4.15243C22.0083 -1.3734 14.1636 -1.3734 11.6946 4.15243L14.4336 5.37627ZM21.7383 5.37627L18.9993 6.60005L29.5862 30.2954L32.3252 29.0716L35.0643 27.8478L24.4773 4.15248L21.7383 5.37627ZM32.3252 29.0716L29.5861 30.2951C29.698 30.5458 29.699 30.7817 29.6277 30.9997L32.4791 31.9322L35.3305 32.8647C35.8426 31.2988 35.812 29.5219 35.0644 27.848L32.3252 29.0716ZM32.2384 32.6742L29.3761 31.7759C29.2436 32.1982 28.9545 32.7532 28.3096 33.9225L30.9365 35.3714L33.5635 36.8202C34.1091 35.8309 34.7489 34.6939 35.1008 33.5726L32.2384 32.6742ZM30.9365 35.3714L28.3096 33.9225C27.7946 34.8562 27.1621 35.7229 26.4232 36.4988L28.5957 38.5677L30.7683 40.6365C31.8668 39.483 32.8034 38.1984 33.5635 36.8203L30.9365 35.3714ZM28.5957 38.5677L26.4233 36.4988C24.206 38.827 21.2108 40.1451 18.0899 40.201L18.1436 43.2005L18.1972 46.2C22.9517 46.1149 27.4643 44.1058 30.7682 40.6366L28.5957 38.5677ZM18.1436 43.2005L18.09 40.201C14.9693 40.2567 11.9343 39.047 9.64243 36.8016L7.54299 38.9446L5.44355 41.0876C8.86401 44.4386 13.4426 46.285 18.1972 46.2L18.1436 43.2005ZM7.54299 38.9446L9.64243 36.8017C8.87613 36.0509 8.21315 35.2042 7.66616 34.2861L5.08889 35.8216L2.51162 37.3571C3.3194 38.7129 4.30204 39.9693 5.44354 41.0876L7.54299 38.9446ZM5.08889 35.8216L7.66616 34.2861C7.17286 33.4581 6.86759 32.9393 6.66401 32.5039C6.5708 32.3045 6.52344 32.1723 6.49916 32.0873C6.4875 32.0464 6.48196 32.0191 6.47932 32.0032C6.47674 31.9877 6.47653 31.9809 6.47651 31.9805L3.47834 32.0852L0.480174 32.19C0.518781 33.2949 0.85673 34.2494 1.22869 35.045C1.58637 35.8101 2.06722 36.6111 2.51162 37.3571L5.08889 35.8216ZM3.49644 30.5851L6.49507 30.6755C6.49851 30.5615 6.52343 30.4349 6.58582 30.2952L3.8467 29.0716L1.10758 27.848C0.723332 28.7081 0.524596 29.6053 0.497796 30.4947L3.49644 30.5851ZM3.8467 29.0716L6.58574 30.2954L17.1727 6.60005L14.4336 5.37627L11.6946 4.15248L1.10766 27.8478L3.8467 29.0716ZM3.47834 32.0852L6.47651 31.9805C6.47199 31.851 6.46876 31.7586 6.46664 31.6941C6.46557 31.6618 6.46493 31.6409 6.46458 31.6283C6.4644 31.622 6.46439 31.6209 6.46444 31.6232C6.46446 31.6245 6.46454 31.6282 6.46461 31.6336C6.46468 31.6385 6.4648 31.6484 6.46484 31.6614L3.46484 31.6686L0.464853 31.6758C0.465086 31.7729 0.472972 31.9839 0.480174 32.19L3.47834 32.0852ZM3.49644 30.5851L0.497796 30.4947C0.478467 31.1362 0.464619 31.5783 0.464853 31.6758L3.46484 31.6686L6.46484 31.6614C6.46494 31.7029 6.46396 31.7348 6.46452 31.7102C6.46471 31.7022 6.46507 31.6879 6.46568 31.6652C6.46689 31.6206 6.46878 31.5547 6.4714 31.4655C6.47663 31.2877 6.4845 31.0263 6.49507 30.6755L3.49644 30.5851ZM32.4791 31.9322L29.6277 30.9997C29.5045 31.3765 29.4356 31.587 29.4301 31.6041L32.287 32.5196L35.1439 33.435C35.1421 33.4407 35.2 33.2635 35.3305 32.8647L32.4791 31.9322ZM32.2384 32.6742L35.1008 33.5726C35.1164 33.5228 35.128 33.4858 35.1359 33.4606C35.1399 33.4479 35.1428 33.4387 35.1448 33.4324C35.1458 33.4293 35.1463 33.4274 35.1466 33.4265C35.1476 33.4234 35.1461 33.4283 35.1439 33.435L32.287 32.5196L29.4301 31.6041C29.4246 31.6212 29.4041 31.6867 29.3761 31.7759L32.2384 32.6742Z"
              fill="#121212"
              mask="url(#path-1-outside-1_814_280)"
            />
          </svg>
        </g>
      </svg>

      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
        <div className="flex items-baseline gap-[0.5rem]">
          <span className="text-3xl font-bold text-[#BCDD19]">
            {animatedValue}
          </span>
          <span className="text-md text-white">Days</span>
        </div>
        <span className="text-xs text-gray-500 mt-1">Longest Streak</span>
        <span className="text-sm font-medium text-[#BCDD19]">
          {animatedValue} days of continuity
        </span>
      </div>
    </div>
  );
};

export default Speedometer;
