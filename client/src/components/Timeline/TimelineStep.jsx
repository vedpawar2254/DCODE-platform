import ConnectLines from './ConnectLines';

export default function TimelineStep({ phase, index, total }) {
  const topPosition = (index * 85) / (total - 1) + 7.5;

  return (
    <div
      className="absolute flex items-center w-full"
      style={{
        top: `${topPosition}%`,
        transform: 'translateY(-50%)'
      }}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-400 rounded-full border-2 border-black z-30" />

      {/* Connecting line */}
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 z-20 ${
          phase.position === 'left'
            ? 'left-1/2 -translate-x-full'
            : 'right-1/2 translate-x-full'
        }`}
      >
        <ConnectLines />
      </div>

      {/* Phase card */}
      <div
        className={`absolute w-full max-w-xs z-10 ${
          phase.position === 'left' ? 'right-1/2 pr-16' : 'left-1/2 pl-16'
        }`}
      >
        <div className="bg-black bg-opacity-80 border border-[#01FF804D]/50 border-opacity-30 rounded-xl p-4 backdrop-blur-sm">
          {/* Icon */}
          <div className="w-10 h-10 bg-[#01FF8033] rounded-lg flex items-center justify-center mb-2">
            <div className="text-lime-400">{phase.icon}</div>
          </div>
          {/* Content */}
          <h3 className="text-white font-semibold text-base mb-1">
            {phase.title}
          </h3>
          <div className="text-green-400 font-semibold text-xs mb-2">
            {phase.duration}
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">
            {phase.description}
          </p>
        </div>
      </div>
    </div>
  );
}
