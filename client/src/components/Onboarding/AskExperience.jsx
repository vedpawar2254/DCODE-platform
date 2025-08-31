export default function AskExperience() {
  return (
    <div className="bg-black border border-white/10 rounded-2xl p-8 max-w-2xl w-full ">
      <h2 className="text-2xl font-semibold mb-2">
        What's your experience with{' '}
        <span className="text-[#BCDD19]">Pull Requests?</span>
      </h2>
      <p className="text-[#D5D5D5B3]/70 mb-8">
        Have you contributed to Open Source before?
      </p>

      {/* Options */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {/* Experienced */}
        <div className="flex-1 border bg-[#121212] border-white/10 rounded-xl p-6 hover:border-[#BCDD194D] transition">
          <span className="px-3 py-1 text-xs rounded-full bg-[#BCDD194D]/30 text-[#BCDD19] font-medium">
            Experienced
          </span>
          <p className="mt-4 text-gray-200">
            Yes, I have done more than one PR
          </p>
        </div>

        {/* Beginner */}
        <div className="flex-1 border bg-[#121212] border-white/10 rounded-xl p-6 hover:border-[#2563EB4D] transition">
          <span className="px-3 py-1 text-xs rounded-full bg-[#2563EB4D]/30 text-blue-400 font-medium">
            Beginner
          </span>
          <p className="mt-4 text-gray-200">I have done fewer than two PRs</p>
        </div>
      </div>

      {/* Helper text */}
      <p className="mt-8 text-sm text-[#D5D5D5]">
        We'll guide you through the process step by step.
      </p>
    </div>
  );
}
