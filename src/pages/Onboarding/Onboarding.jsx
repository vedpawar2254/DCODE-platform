import { Outlet } from "react-router-dom";

export default function Onboarding() {
  return (
    <div className="relative h-screen w-full max-w-full bg-[url('/images/Pattern.png')] bg-cover bg-center text-white font-sans flex flex-col overflow-x-hidden">
      {/* Radial haze overlay */}
      <div className="inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(18,18,18,0)_0%,#121212_100%)] fixed"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 text-center w-full max-w-full mt-[2rem]">
        {/* Logo */}
        <div className="absolute left-[2rem] top-0 /w-full flex justify-center mt-[1rem]">
          {/* <img
            src="/images/d.png"
            alt="DCODE Logo"
            className="h-[3rem] w-[14rem]  object-cover mb-[1rem]"
          /> */}
        </div>
        {/* Step content */}
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xs text-[#D5D5D5]">
        ©2025, DCODE ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
