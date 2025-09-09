import ConnectLines from "./ConnectLines";

export default function TimelineStep({
  phase,
  index,
  total,
  isVisible = false,
}) {
  const topPosition = (index * 100) / (total - 1) + 10;

  return (
    <div
      className={`absolute flex flex-col md:flex-row items-center w-full transition-all duration-700 ease-out ${
        index % 2 === 0 ? "md:justify-start" : "md:justify-end"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        top: `${topPosition}%`,
        transform: `translateY(-50%) ${!isVisible ? "translateY(32px)" : ""}`,
        transitionDelay: `${index * 0.2}s`,
      }}
      data-step-index={index}
    >
      {/* Animated central dot */}
      <div
        className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-green-400 rounded-full border-2 border-black z-30 transition-all duration-500 ease-out ${
          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 0.2 + 0.3}s` }}
      />

      <div
        className={`relative w-full max-w-md z-10 mt-8 md:mt-0 group ${
          phase.position === "left"
            ? "md:left-1 md:pr-24 md:mr-auto"
            : "md:right-1 md:pl-24 md:ml-auto"
        }`}
      >
        <div className="bg-black/15 backdrop-blur-lg bg-opacity-80 border border-green-500/30 rounded-xl p-5 transition-all duration-300 ease-out hover:border-green-500/60 hover:bg-black/25 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10">
          {/* Icon with hover animation */}
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#01FF8033] rounded-lg flex items-center justify-center mb-3 transition-all duration-300 ease-out group-hover:bg-[#01FF8055] group-hover:scale-110">
            <div className="text-lime-400 transition-all duration-300 ease-out group-hover:scale-110">
              {phase.icon}
            </div>
          </div>
          {/* Content */}
          <h3 className="text-white font-bold text-base md:text-lg mb-1.5 transition-colors duration-300 group-hover:text-green-300">
            {phase.title}
          </h3>
          <div className="text-green-400 font-semibold text-xs md:text-sm mb-2.5 transition-colors duration-300 group-hover:text-green-300">
            {phase.duration}
          </div>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
            {phase.description}
          </p>
        </div>
      </div>

      {/* Animated connecting lines */}
      <div
        className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 z-20 transition-all duration-500 ease-out ${
          phase.position === "left"
            ? "left-1/2 -translate-x-full"
            : "right-1/2 translate-x-full"
        } ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
        style={{
          transformOrigin:
            phase.position === "left" ? "right center" : "left center",
          transitionDelay: `${index * 0.2 + 0.5}s`,
        }}
      >
        <ConnectLines
          inverted={phase.position === "left"}
          className="w-[100px]"
          isVisible={isVisible}
        />
      </div>
    </div>
  );
}
