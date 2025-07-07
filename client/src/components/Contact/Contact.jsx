import { Code, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
export default function Contact() {
  return (
    <section className="h-screen flex justify-center pt-25 bg-black relative overflow-hidden">
      {/* Rectangle content */}
      <div className="w-400 h-130 bg-[#151515] border border-[rgba(25,221,113,0.3)] rounded-[20px] relative z-10 overflow-hidden flex">
        {/* Left 40% section */}
        <div className="w-[50%] h-full flex items-center justify-center relative">
          {/* Centered 70x70 rectangle with icon */}
          <div className="w-[70px] h-[70px] bg-[rgba(1,153,77,0.2)] border border-[rgba(25,221,113,0.3)] rounded-[15px] flex items-center justify-center z-10">
            <Code className="text-lime-400 w-6 h-6" />
          </div>

          {/* Floating tech badges - Updated positions to match second image */}
          <span className="absolute top-[20%] left-[10%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            React
          </span>
          <span className="absolute top-[20%] right-[18%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            AI/ML
          </span>
          <span className="absolute top-[50%] left-[5%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            Open Source
          </span>
          <span className="absolute top-[50%] right-[15%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            JavaScript
          </span>
          <span className="absolute bottom-[25%] left-[25%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            Node.js
          </span>
          <span className="absolute bottom-[25%] right-[25%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            Python
          </span>
          <span className="absolute bottom-[5%] left-[15%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            Vue.js
          </span>
          <span className="absolute bottom-[5%] right-[15%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">
            Angular
          </span>
        </div>

        {/* Right 60% section */}
        <div className="w-[50%] h-full flex items-center justify-center text-white text-sm">
          <div className="text-left">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Ready to boost your{' '}
              <span className="text-[#01FF80]">development?</span>
            </h1>

            <p className="text-gray-300 text-2xl mb-8 leading-relaxed">
              Interested in becoming a{' '}
              <span className="text-green-400 font-medium">
                Campus Ambassador
              </span>{' '}
              or featuring your repository on{' '}
              <span className="text-green-400 font-medium">DCODE</span>? Feel
              free to reach out!
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="bg-[#BCDD19] text-black font-medium px-4 py-2 rounded text-sm transition-colors duration-200 flex items-center gap-2">
                Contact us
              </button>

              <button className="text-white p-2 rounded border border-[#D5D5D533] transition-colors duration-200 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </button>

              <button className="text-white p-2 rounded border border-[#D5D5D533] transition-colors duration-200 flex items-center justify-center">
                <FaWhatsapp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
