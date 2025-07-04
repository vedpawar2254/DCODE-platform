export function FeatureCards({ icon, title, description }) {
  return (
    <div className="flex flex-shrink-0 items-start space-x-4 w-[280px] md:w-[320px] m-32">
      <div className="w-20 h-12 flex items-center justify-center bg-[#1c1c1c] rounded-lg">
        <img src={icon} alt="icons" className="text-[#BCDD19] text-2xl" />
      </div>
      <div className="text-left">
        <h3 className="text-white text-base md:text-lg font-semibold">
          {title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base mt-1">{description}</p>
      </div>
    </div>
  );
}
