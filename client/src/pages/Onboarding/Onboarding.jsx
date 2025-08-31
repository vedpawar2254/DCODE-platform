import { Outlet } from 'react-router-dom';

export default function Onboarding() {
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
        {/* Step content */}
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#D5D5D5]">
        ©2025, DCODE ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
