import { useNavigate } from "react-router-dom";
import ContactFormPanel from "./ContactFormPanel";
import ContactInfoPanel from "./ContactInfoPanel";
import { ArrowLeft } from "lucide-react";

const ContactPage = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-4 lg:mb-6 text-[#A1A1AA] hover:text-[#BCDD19] transition-colors group absolute top-4 left-4 lg:top-10 lg:left-10 z-50"
      >
        <ArrowLeft size={18} className="lg:w-5 lg:h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm lg:text-base">Go Back</span>
      </button>

      {/* Main Container */}
      <div className="min-h-screen bg-[#121212] pt-16 lg:pt-0">
        {/* Desktop/Tablet Layout (side by side) */}
        <div className="hidden lg:flex min-h-screen">
          <div className="flex w-full">
            <ContactInfoPanel />
            <ContactFormPanel />
          </div>
        </div>

        {/* Mobile/Small Tablet Layout (stacked) */}
        <div className="lg:hidden flex flex-col min-h-screen">
          {/* Info Panel - Condensed for mobile */}
          <div className="flex-shrink-0">
            <ContactInfoPanel />
          </div>
          
          {/* Form Panel - Takes remaining space */}
          <div className="flex-1">
            <ContactFormPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
