export const LeftSide = () => {
  return (
    <div className="relative flex-1 flex flex-col items-center px-12 py-10 overflow-hidden">
      {/* Logo */}
      <div className="w-full flex justify-center mb-2 mt-10">
        <img
          src="/images/d-removebg-preview.png"
          alt="DCODE Logo"
          className="h-8"
        />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center max-w-md flex-grow justify-center">
        {/* Illustration with floating symbols */}
        <div className="relative inline-block mb-8">
          <img
            src="/images/Illustration.png"
            alt="Developer Illustration"
            className="rounded-lg"
          />

          {/* Floating Symbols (relative to the illustration) */}
          <div className="absolute inset-0 pointer-events-none select-none">
            {/* Top-left {} */}
            <div className="absolute top-2 left-2 text-gray-500 text-2xl">{`{}`}</div>

            {/* Top-right ; */}
            <div className="absolute top-2 right-2 text-gray-500 text-2xl">
              ;
            </div>

            {/* Bottom-left <> */}
            <div className="absolute bottom-2 left-2 text-gray-500 text-2xl">{`<>`}</div>

            {/* Bottom-center 0x3234 */}
            <div className="absolute bottom-10 left-1/3 -translate-x-1/2 text-gray-500 text-xl">
              0x3234
            </div>

            {/* Bottom-right $ */}
            <div className="absolute bottom-2 right-2 text-gray-500 text-2xl">
              $
            </div>
          </div>
        </div>

        {/* Heading + text */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Online Community For <br />
          <span className="text-[#BCDD19]">OPEN SOURCE</span> Developers
        </h2>
        <p className="text-sm text-[#F5F5F5]">
          They raise motivational levels, thereby efficiently fighting procrastination and laziness.
        </p>
      </div>
    </div>
  );
};
