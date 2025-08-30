export default function AskExperience() {
  return (
    <div className="relative h-screen w-screen bg-[url('/images/Pattern.png')] bg-cover bg-center text-white font-sans flex flex-col">
      {/* Radial haze overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(18,18,18,0)_0%,#121212_100%)]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 text-center">
        {/* Logo */}
        <img
          src="/images/d-removebg-preview.png"
          alt="DCODE Logo"
          className="h-10 mb-8"
        />

        {/* Welcome text */}
        <h1 className="text-3xl font-semibold mb-2">
          Welcome <span className="text-[#BCDD19]">Aditya</span>
        </h1>
        <p className="text-gray-300 mb-4">
          Let's get you started on your contribution journey
        </p>

        {/* Card container */}
        <div className="bg-[#121212]/50 border border-white/10 rounded-2xl p-8 max-w-2xl w-full">
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
              <p className="mt-4 text-gray-200">
                I have done fewer than two PRs
              </p>
            </div>
          </div>

          {/* Helper text */}
          <p className="mt-8 text-sm text-[#D5D5D5]">
            We'll guide you through the process step by step.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#D5D5D5]">
        ©2025, DCODE ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
