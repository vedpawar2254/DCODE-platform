import { PiGithubLogoFill } from 'react-icons/pi';

import SignupForm from '../../components/Signup/SignupForm';
import LeftSignup from '../../components/Signup/LeftSignup';

export default function Signup() {
  return (
    <div className="flex flex-row h-screen bg-black">
      {/* Left Side */}
      <div className="flex-1 flex flex-col items-center">
        <LeftSignup />
      </div>

      {/* Right Side */}
      <div className="flex-1 text-white flex flex-col items-center pt-20">
        <div className="font-bold text-3xl text-center mb-12 leading-tight">
          Join & Connect the{' '}
          <span className="text-[#BCDD19]">
            Fastest <br /> Growing
          </span>{' '}
          Online Community
        </div>

        {/* GitHub Sign Up Button */}
        <button className="flex items-center gap-3 px-8 py-3 bg-transparent border-2 border-white rounded-full text-white font-medium text-base mb-8 hover:bg-white hover:text-black transition-colors">
          <div className="bg-white rounded-full p-1">
            <PiGithubLogoFill size={20} className="text-black" />
          </div>
          Sign up with Github
        </button>

        {/* Form Container */}
        <div className="w-full max-w-md px-8">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
