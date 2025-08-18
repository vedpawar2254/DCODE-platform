import { Code, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Button from '../ui/Button/Button'

export default function Contact() {
  const whatsappNumber = '918208689558';
  const whatsappMessage = 'Hello! I’m interested in connecting with DCODE.';

  return (
    <section className="w-full pt-4 pb-8 md:py-24 bg-black relative overflow-hidden px-4 sm:px-6">
      {/* Background glow - smaller on mobile */}
      <div className="absolute w-[300px] h-[210px] md:w-[600px] md:h-[420px] bg-[#01FF80] opacity-10 blur-[50px] md:blur-[100px] rounded-full z-0 -bottom-20 md:bottom-auto md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2" />

      {/* Main container */}
      <div className="w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto h-auto md:h-[300px] lg:h-[367px] bg-[#151515] border border-[rgba(25,221,113,0.3)] rounded-xl lg:rounded-[20px] relative z-10 overflow-hidden flex flex-col md:flex-row">
        {/* Tech tags section */}
        <div className="hidden md:flex md:w-[40%] h-full items-center justify-center relative">
          <div className="absolute w-[70px] h-[70px] bg-[rgba(1,153,77,0.2)] border border-[rgba(25,221,113,0.3)] rounded-[15px] flex items-center justify-center z-10">
            <Code className="text-lime-400 w-6 h-6" />
          </div>

          {/* Tech tags */}
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

        {/* Contact content section */}
        <div className="w-full md:w-[60%] h-full flex items-center justify-center text-white p-4 md:p-12">
          <div className="w-full max-w-md lg:max-w-lg">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-semibold text-white mb-3 md:mb-6 leading-tight">
              Ready to boost your{' '}
              <span className="text-[#01FF80]">development?</span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 md:mb-8 leading-relaxed">
              Interested in becoming a{' '}
              <span className="text-green-400 font-medium">
                Campus Ambassador
              </span>{' '}
              or featuring your repository on{' '}
              <span className="text-green-400 font-medium">DCODE</span>? Feel
              free to reach out!
            </p>

            <div className="flex items-center flex-wrap gap-2 md:gap-3">
              {/* Contact Us (WhatsApp) */}
              {/* <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#BCDD19] hover:bg-[#a8c516] text-black font-medium px-4 py-2 md:px-5 md:py-3 rounded text-xs md:text-sm transition-colors duration-200 flex items-center gap-2"
              >
                Contact us
              </a> */}
              <div className="flex flex-col sm:flex-row">
                <Button className="w-full sm:w-auto !py-2 !px-4">
                  <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}>Contact us</a>
                </Button>
              </div>

              {/* Email */}
              <a
                href="mailto:contact@dcode.codes@gmail.com"
                // className="text-white pt-3 md:p-4 rounded border border-[#D5D5D533] flex items-center justify-center hover:bg-[#ffffff08] transition-colors"
                className="text-white h-fit w-fit !py-2 !px-4 rounded border border-[#D5D5D533] flex items-center justify-center hover:bg-[#ffffff08] transition-colors"
              >
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>

              {/* WhatsApp icon */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white h-fit w-fit !py-2 !px-4 rounded border border-[#D5D5D533] flex items-center justify-center hover:bg-[#ffffff08] transition-colors"
              >
                <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
