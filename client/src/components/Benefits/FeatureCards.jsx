export function FeatureCards({ icon, title, description }) {
  return (
    <div className="flex flex-shrink-0 items-start space-x-4 w-[280px] md:w-[320px] mt-26">
      <div className="w-20 h-12 flex items-center justify-center  rounded-lg overflow-hidden">
        <img
          src={icon}
          alt={title}
          className="max-w-full max-h-full object-contain"
          loading="lazy"
        />
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
