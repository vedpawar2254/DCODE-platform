import ContactFormPanel from "./ContactFormPanel";
import ContactInfoPanel from "./ContactInfoPanel";
import NavBar from "../../components/layout/NavBar/NavBar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center text-gray-400 hover:text-[#7A900F] transition-colors absolute top-10 left-10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span className="text-sm font-medium">Go Back</span>
      </Link>
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
