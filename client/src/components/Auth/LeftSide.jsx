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
        {/* Main illustration */}
        <img
          src="/images/Illustration.png"
          alt="Developer Illustration"
          className="mb-8"
        />

        {/* Heading + text */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          Online Community For <br />
          <span className="text-[#BCDD19]">OPEN SOURCE</span> Developers
        </h2>
        <p className="text-sm text-[#F5F5F5]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
      </div>

      {/* Floating Symbols */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        {/* Top-left {} */}
        <div className="absolute top-6 left-8 text-white text-2xl">{`{}`}</div>

        {/* Top-right ; */}
        <div className="absolute top-10 right-8 text-white text-2xl">;</div>

        {/* Bottom-left <> */}
        <div className="absolute bottom-10 left-8 text-white text-2xl">{`<>`}</div>

        {/* Bottom-center 0x3234 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-xl">
          0x3234
        </div>

        {/* Bottom-right $ */}
        <div className="absolute bottom-8 right-8 text-white text-2xl">$</div>
      </div>
    </div>
  );
};
