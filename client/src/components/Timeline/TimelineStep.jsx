import ConnectLines from './ConnectLines';

export default function TimelineStep({ phase, index, total }) {
  // Adjusted spacing - more vertical spread than before
  const topPosition = (index * 100) / (total - 1) + 10;

  return (
    <div
      className="absolute flex items-center w-full"
      style={{
        top: `${topPosition}%`,
        transform: 'translateY(-50%)'
      }}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-green-400 rounded-full border-2 border-black z-30" />

      {/* Connecting line */}
      <div
        className={`absolute top-1/2 transform -translate-y-1/2 z-20 ${
          phase.position === 'left'
            ? 'left-1/2 -translate-x-full pr-6'
            : 'right-1/2 translate-x-full pl-6'
        }`}
      >
        <ConnectLines width={200} />
      </div>

      {/* Phase card */}
      <div
        className={`absolute w-full max-w-md z-10 ${
          phase.position === 'left' ? 'left-1 pr-24' : 'right-1 pl-24'
        }`}
      >
        <div className="bg-black bg-opacity-80 border border-green-500/30 rounded-xl p-5 backdrop-blur-sm">
          {/* Icon */}
          <div className="w-12 h-12 bg-[#01FF8033] rounded-lg flex items-center justify-center mb-3">
            <div className="text-lime-400">{phase.icon}</div>
          </div>
          {/* Content */}
          <h3 className="text-white font-bold text-lg mb-1.5">{phase.title}</h3>
          <div className="text-green-400 font-semibold text-sm mb-2.5">
            {phase.duration}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {phase.description}
          </p>
        </div>
      </div>
    </div>
  );
}
