import { Code, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Button from "../ui/Button/Button";
import { motion } from "framer-motion";

export default function Contact() {
  
  const whatsappCommunityLink = "https://chat.whatsapp.com/KJNLA2R4hDE3M6FK4PK801";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(20px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 20, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
    >
      <section className="w-full pt-4 pb-8 md:py-24 bg-[#121212] relative overflow-hidden px-4 sm:px-6">
  
        <div className="absolute w-[300px] h-[210px] md:w-[600px] md:h-[420px] bg-[#01FF80] opacity-10 blur-[50px] md:blur-[100px] rounded-full z-0 -bottom-20 md:bottom-auto md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2" />

  
        <div className="w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto h-auto md:h-[300px] lg:h-[367px] bg-[#151515] border border-[rgba(25,221,113,0.3)] rounded-xl lg:rounded-[20px] relative z-10 overflow-hidden flex flex-col md:flex-row">
  
          <div className="hidden md:flex md:w-[40%] h-full items-center justify-center relative">
            <div className="absolute w-[70px] h-[70px] bg-[rgba(1,153,77,0.2)] border border-[rgba(25,221,113,0.3)] rounded-[15px] flex items-center justify-center z-10">
              <Code className="text-lime-400 w-6 h-6" />
            </div>
  
            <span className="absolute top-[20%] left-[10%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">React</span>
            <span className="absolute top-[20%] right-[18%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">AI/ML</span>
            <span className="absolute top-[50%] left-[5%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">Open Source</span>
            <span className="absolute top-[50%] right-[15%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">JavaScript</span>
            <span className="absolute bottom-[25%] left-[25%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">Node.js</span>
            <span className="absolute bottom-[25%] right-[25%] px-2 py-0.5 text-[#01994D] text-[15px] bg-[rgba(25,221,113,0.05)] border border-[rgba(118,133,41,0.3)] rounded-full">Python</span>
          </div>

          
          <div className="w-full md:w-[60%] h-full flex items-center justify-center text-white p-4 md:p-12">
            <div className="w-full max-w-md lg:max-w-lg">
              <h1 className="text-3xl sm:text-4xl md:text-4xl font-semibold text-white mb-3 md:mb-6 leading-tight">
                Ready to boost your <span className="text-[#01FF80]">development?</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 md:mb-8 leading-relaxed">
                Interested in becoming a <span className="text-green-400 font-medium">Campus Ambassador</span> or featuring your repository on <span className="text-green-400 font-medium">DCODE</span>? Feel free to reach out!
              </p>
              <div className="flex items-center flex-wrap gap-2 md:gap-3">
                {/* --- UPDATED: Join Community Button --- */}
                <Button className="w-full sm:w-auto !py-2 !px-4">
                  <a
                    href={whatsappCommunityLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Community
                  </a>
                </Button>

                {/* Email Button */}
                <a
                  href="mailto:dcode.codes@gmail.com"
                  className="text-white h-fit w-fit !py-2 !px-4 rounded border border-[#D5D5D533] flex items-center justify-center hover:bg-[#ffffff08] transition-colors"
                >
                  <Mail className="w-4 h-4 md:w-5 md-h-5" />
                </a>

                {/* --- UPDATED: WhatsApp Icon Button --- */}
                <a
                  href={whatsappCommunityLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white h-fit w-fit !py-2 !px-4 rounded border border-[#D5D5D533] flex items-center justify-center hover:bg-[#ffffff08] transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4 md:w-5 md-h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}