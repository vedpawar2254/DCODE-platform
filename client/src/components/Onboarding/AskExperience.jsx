import { useNavigate } from 'react-router-dom';

export default function AskExperience() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-10 justify-center">
      <div className="text-center flex flex-col gap-4 ">
        <h1 className="text-white text-4xl font-bold">Welcome <span className="text-[#BCDD19]">Aditya</span></h1>
        <p className="text-lg text-white/80 font-light">Let's get you started on your contribution journey</p>
      </div>
      <div className="bg-transparent backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-w-6xl w-full mx-auto text-center ">
        <h2 className="text-3xl text-white font-semibold mb-2">
          What's your experience with{' '}
          <span className="text-[#BCDD19]">Pull Requests<span className='text-white'>?</span></span>
        </h2>
        <p className="text-[#D5D5D5B3]/70 mb-8 text-xl">
          Have you contributed to Open Source before?
        </p>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-20 justify-center max-w-2xl mx-auto">
          {/* Experienced */}
          <div className="flex-1 border bg-transparent border-white/10 rounded-xl px-0 py-6 hover:border-[#BCDD194D] transition h-fit">
            <span className="px-3 py-1 text-xs rounded-full bg-[#BCDD19]/30 text-[#BCDD19] font-medium">
              Experienced
            </span>
            <p className="mt-4 text-gray-200 text-sm">
              Yes, I have done more than one PR
            </p>
          </div>

          {/* Beginner */}
          <div
            className="flex-1 border bg-transparent border-white/10 rounded-xl px-0 py-6 hover:border-[#2563EB4D] transition h-fit cursor-pointer"
            onClick={() => navigate('/onboarding/fork')}
          >
            <span className="px-6 py-1 text-xs rounded-full bg-blue-400/30 text-blue-400 font-medium">
              Beginner
            </span>
            <p className="mt-4 text-gray-200 text-sm">I have done fewer than two PRs</p>
          </div>
        </div>

        {/* Helper text */}
        <p className="mt-8 text-sm text-[#D5D5D5]">
          We'll guide you through the process step by step.
        </p>
      </div>
    </div>
  );
}