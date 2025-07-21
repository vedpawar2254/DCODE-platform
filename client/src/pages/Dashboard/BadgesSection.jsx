export default function BadgesSection({ badges }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map(badge => (
        <div key={badge.id} className="bg-gray-800 p-4 rounded-lg text-center">
          <img
            src={badge.imageUrl}
            alt={badge.name}
            className="mx-auto h-16 mb-2"
          />
          <h4 className="font-semibold">{badge.name}</h4>
          <p className="text-gray-400 text-sm">Obtained: {badge.date}</p>
          <button
            onClick={() => alert(`How to obtain: ${badge.howTo}`)}
            className="mt-2 text-sm text-[#BCDD19] underline"
          >
            i
          </button>
        </div>
      ))}
    </div>
  );
}
