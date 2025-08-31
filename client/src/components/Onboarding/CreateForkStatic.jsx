const CreateFork = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Title and subtitle */}
      <div className="mb-10 mt-2">
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Let's start with your first <span className="text-[#C6FF3D]">PR</span>
        </h1>
        <p className="text-lg text-[#A1A1AA] mt-2 text-center">
          Let's get you started on your contribution journey
        </p>
      </div>

      {/* Stepper and card */}
      <div className="w-full max-w-5xl flex flex-col items-center">
        <div className="w-full bg-transparent rounded-2xl p-0 md:p-0 shadow-lg border border-[#23252B] relative" style={{ minHeight: 260 }}>
          {/* Stepper bar */}
          <div className="h-2 w-full rounded-t-2xl bg-transparent flex">
            <div className="h-2 bg-[#C6FF3D] rounded-tl-2xl" style={{ width: '20%' }}></div>
            <div className="h-2 bg-[#23252B] flex-1 rounded-tr-2xl"></div>
          </div>
          {/* Step content */}
          <div className="flex flex-row items-start gap-6 md:gap-10 px-6 md:px-12 py-8">
            {/* Step number */}
            <div className="flex flex-col items-center justify-start">
              <div className="w-16 h-16 rounded-full border-2 border-[#23252B] flex items-center justify-center text-3xl font-bold bg-[#181A20] text-white">
                1
              </div>
            </div>
            {/* Main content */}
            <div className="flex-1">
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-1">
                  Fork this <span className="text-[#C6FF3D]">repository.</span>
                </h2>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto border border-[#A1A1AA] rounded-xl px-6 py-2 text-lg font-medium flex items-center gap-2 hover:border-[#C6FF3D] transition-colors"
                >
                  Repository
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75H6.75m10.5 0v10.5m0-10.5L6.75 17.25" />
                  </svg>
                </a>
              </div>
              <p className="text-[#A1A1AA] text-base md:text-lg mt-2">
                A fork is your personal copy of this project. A fork is your personal copy of this project. A fork is your personal copy of this project. A fork is your personal copy of this project.
              </p>
            </div>
          </div>
          {/* Next button */}
          <div className="flex justify-end px-8 pb-6">
            <button className="border border-[#A1A1AA] rounded-xl px-8 py-2 text-lg font-medium text-white hover:border-[#C6FF3D] transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFork;
