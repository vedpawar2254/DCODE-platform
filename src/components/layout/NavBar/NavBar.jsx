import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { motion } from "framer-motion";
import Logo from "../../ui/Logo/Logo";
import WaitList from "../../../pages/Waitlist/WaitList";
import { useAuthStore } from "../../../store/useAuthStore";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { checkIfLoggedIn, isCheckingAuth, isLoggedIn } = useAuthStore();
  // const [isLoggedIn, setisLoggedIn] = useState(null);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();

    if (link.path === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    } else if (link.path.startsWith("/#")) {
      const sectionId = link.path.replace("/#", "#");
      if (location.pathname === "/") {
        scrollToSection(sectionId);
      } else {
        navigate("/");
        setTimeout(() => scrollToSection(sectionId), 200);
      }
    } else {
      navigate(link.path);
    }

    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "About", path: "/#About" },
    { name: "Timeline", path: "/#timeline" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSectionNavigation = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== "/home") {
      navigate("/home", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="w-full py-4 pt-[2rem] px-4 sm:px-8 lg:px-16">
      <div className="flex items-center justify-between">
        <Logo />
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link)}
              className="relative text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-lime-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.name}
            </a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isCheckingAuth ? 0 : 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline">
              <a
                href={isLoggedIn ? `/dashboard` : `/auth`}
              >
                {isLoggedIn ? "Dashboard" : "Login"}
              </a>
            </Button>
          </motion.div>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 px-4 border-t border-gray-800">
          <div className="flex flex-col space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className="text-white text-lg py-1 px-2 hover:text-lime-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <Button variant="outline" className={"w-full"}>
              <a
                href={isLoggedIn ? `/dashboard` : `/auth`}
                className="px-[0.5rem] py-[3rem]"
              >
                {isLoggedIn ? "Dashboard" : "Login"}
              </a>
            </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
