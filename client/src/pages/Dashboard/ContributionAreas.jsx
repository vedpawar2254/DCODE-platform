export default function TimelineStep({ phase }) {
  return (
    <div className="flex items-center justify-between w-full relative">
      {/* Left card or empty spacer */}
      {phase.position === 'left' ? (
        <div className="w-1/2 flex justify-end pr-8">
          <TimelineCard phase={phase} />
        </div>
      ) : (
        <div className="w-1/2" />
      )}

      {/* Dot & connector */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-black" />
        {/* Optional vertical line below dot for overlap */}
      </div>

      {/* Right card or empty spacer */}
      {phase.position === 'right' ? (
        <div className="w-1/2 flex justify-start pl-8">
          <TimelineCard phase={phase} />
        </div>
      ) : (
        <div className="w-1/2" />
      )}
    </div>
  );
}

function TimelineCard({ phase }) {
  return (
    <div className="bg-black/70 border border-[#01FF804D] rounded-xl p-5 max-w-xs backdrop-blur-md">
      <div className="w-10 h-10 bg-[#01FF8033] rounded-lg flex items-center justify-center mb-2">
        <div className="text-lime-400">{phase.icon}</div>
      </div>
      <h3 className="text-white font-semibold mb-1">{phase.title}</h3>
      <div className="text-green-400 text-xs font-semibold mb-2">
        {phase.duration}
      </div>
      <p className="text-gray-300 text-xs">{phase.description}</p>
    </div>
  );
}
