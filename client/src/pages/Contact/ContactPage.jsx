import ContactFormPanel from './ContactFormPanel';
import ContactInfoPanel from './ContactInfoPanel';
import NavBar from '../../components/layout/NavBar/NavBar';

const ContactPage = () => {
  return (<>
    <div className="flex flex-col items-center justify-center md:flex-row min-h-screen px-4 sm:px-6 md:px-8">
     
      <ContactInfoPanel />
      <ContactFormPanel />
    </div>

    </>
  );
};

export default ContactPage;
