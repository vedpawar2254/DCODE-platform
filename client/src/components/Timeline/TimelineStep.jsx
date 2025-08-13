import ConnectLines from './ConnectLines';

export default function TimelineStep({ phase, index, total }) {
  const topPosition = (index * 100) / (total - 1) + 10;

  return (
    <div
      className={`absolute flex flex-col md:flex-row items-center w-full ${
        index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
      }`}
      style={{
        top: `${topPosition}%`,
        transform: 'translateY(-50%)',
      }}
    >
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-green-400 rounded-full border-2 border-black z-30" />

      
      <div
        className={`relative w-full max-w-md z-10 mt-8 md:mt-0 ${
          phase.position === 'left' 
            ? 'md:left-1 md:pr-24 md:mr-auto' 
            : 'md:right-1 md:pl-24 md:ml-auto'
        }`}
      >
        <div className="bg-black bg-opacity-80 border border-green-500/30 rounded-xl p-5 backdrop-blur-sm">
          {/* Icon */}
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#01FF8033] rounded-lg flex items-center justify-center mb-3">
            <div className="text-lime-400">{phase.icon}</div>
          </div>
          {/* Content */}
          <h3 className="text-white font-bold text-base md:text-lg mb-1.5">{phase.title}</h3>
          <div className="text-green-400 font-semibold text-xs md:text-sm mb-2.5">
            {phase.duration}
          </div>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            {phase.description}
          </p>
        </div>
      </div>

      
      <div
        className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 z-20 ${
          phase.position === 'left'
            ? 'left-1/2 -translate-x-full'
            : 'right-1/2 translate-x-full'
        }`}
      >
        <ConnectLines
          inverted={phase.position === 'left'}
          className="w-[100px]"
        />
      </div>
    </div>
  );
}