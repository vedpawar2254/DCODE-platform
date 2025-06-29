export function FeatureCards({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4 max-w-xs">
      <div className="w-10 h-10 flex items-center justify-center bg-[#1c1c1c] rounded">
        <span className="text-[#BCDD19] text-lg">{icon}</span>
      </div>
      <div className="text-left">
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
}
