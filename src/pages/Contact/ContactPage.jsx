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
              className="inline-flex items-center gap-2 mb-6 text-[#A1A1AA] hover:text-[#BCDD19] transition-colors group absolute top-10 left-10 z-100"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>
      <div className="flex flex-col items-center justify-center md:flex-row min-h-screen px-4 sm:px-6 md:px-8">
        <div className="flex-grow flex justify-center items-center">
          <ContactInfoPanel />
          <ContactFormPanel />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
