import { Mail, Phone, MapPin } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';
import { CiTwitter } from 'react-icons/ci';

const Footer = () => {
  return (
    <footer className="bg-black text-white mb-4 px-6 md:px-16 lg:px-32 pt-12 pb-6">
      {/* Top Line */}
      <div className="-mx-6 md:-mx-16 lg:-mx-32">
        <hr className="w-full border-t border-[#D5D5D54D]" />
      </div>

      {/* Footer Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 text-sm">
        {/* Column 1: Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#B4FF06]  w-10 h-10 flex items-center justify-center rounded-md  text-black font-bold text-sm">
              <FiGithub size={24} />
            </div>
            <h2 className="text-white font-bold text-2xl">
              D
              <span className="bg-gradient-to-r from-[#BCDD19] to-[#65770D] bg-clip-text text-transparent">
                CODE
              </span>{' '}
            </h2>
          </div>
          <p className="text-[#D5D5D5B3] leading-relaxed mb-6">
            Empowering the next generation of developers through structured
            open-source contributions and community-driven learning experiences.
          </p>
          <div className="flex gap-4 pt-2.5 text-white">
            <FiGithub size={18} />
            <CiTwitter size={18} />
            <SlSocialLinkedin size={18} />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start justify-self-center">
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[#D5D5D5B3]">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Timeline</a>
            </li>
            <li>
              <a href="#">Sponsor Us</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-[#D5D5D5]">
            <li className="flex items-start gap-2">
              <Mail className="text-[#65770D]" size={16} />
              <span className="text-[#D5D5D5B3]">dcode.codes@gmail.com</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="text-[#65770D]" size={16} />
              <span className="text-[#D5D5D5B3]">
                +91 92500 21256{' '}
                <span className="text-[#D5D5D5B3]">(Rohan Singh)</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="text-[#65770D]" size={16} />
              <span className="text-[#D5D5D5B3]">
                Rishihood University, NH44, Chowk, Bahalgarh, Sonipat,
                <br />
                Kishora, Haryana 131001
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Divider */}
      <hr className="border-t border-[#D5D5D54D] my-10" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between text-xs text-[#D5D5D5] gap-4">
        <div className="flex gap-6">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
        </div>
        <div>© 2025 DCODE. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
