import {
  BriefcaseBusiness,
  Calendar,
  Github,
  GitPullRequest,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AnimatedDiv,
  AnimatedText,
  AnimatedCard,
} from "../ui/AnimatedComponents";
import {
  fadeUpVariants,
  scaleVariants,
  containerVariants,
  fadeLeftVariants,
  fadeRightVariants,
} from "../../lib/animations";

const ProfileCard = ({
  user,
  linesOfCode,
  contributions,
  isPublicView = false,
}) => {
  // console.log(contributions);
  const completionPercentage = user?.profileCompleteness || 69; // Default to 69% if not provided
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedContributions, setAnimatedContributions] = useState(0);
  const [animatedLinesOfCode, setAnimatedLinesOfCode] = useState(0);

  // Animate numbers on component mount
  useEffect(() => {
    const animateNumber = (start, end, setter, duration = 1500) => {
      if (start === end) return;

      const range = end - start;
      const minTimer = 50;
      const stepTime = Math.abs(Math.floor(duration / range));
      const timer = stepTime > minTimer ? stepTime : minTimer;
      const steps = Math.ceil(duration / timer);
      const increment = range / steps;

      let current = start;
      const counter = setInterval(() => {
        current += increment;
        if (
          (increment > 0 && current >= end) ||
          (increment < 0 && current <= end)
        ) {
          current = end;
          clearInterval(counter);
        }
        setter(Math.floor(current));
      }, timer);
    };

    // Animate completion percentage
    if (!isPublicView) {
      setTimeout(
        () =>
          animateNumber(0, completionPercentage, setAnimatedPercentage, 2000),
        500
      );
    }

    // Animate contributions
    setTimeout(
      () =>
        animateNumber(0, contributions || 0, setAnimatedContributions, 2500),
      800
    );

    // Animate lines of code
    setTimeout(
      () => animateNumber(0, linesOfCode || 0, setAnimatedLinesOfCode, 3000),
      1200
    );
  }, [completionPercentage, contributions, linesOfCode, isPublicView]);

  const socialLinks = [
    {
      icon: Globe,
      link: user.socialLinks?.portfolio || null,
      color: "#10B981",
      label: "Portfolio",
    },
    {
      icon: Twitter,
      link: user.socialLinks?.x || null,
      color: "#1DA1F2",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      link: user.socialLinks?.linkedin || null,
      color: "#0077B5",
      label: "LinkedIn",
    },
    {
      icon: Github,
      link: user.socialLinks?.github || null,
      color: "#F5F5F5",
      label: "GitHub",
    },
    {
      icon: BriefcaseBusiness,
      link: user.socialLinks?.upwork || null,
      color: "#6FDA44",
      label: "Upwork",
    },
    {
      icon: BriefcaseBusiness,
      link: user.socialLinks?.fiverr || null,
      color: "#1DBF73",
      label: "Fiverr",
    },
  ].filter(({ link }) => link);

  return (
    <>
      <motion.div
        className="bg-[#FFFFFF05] rounded-md px-2 flex flex-col items-center shadow border border-[#23252B] w-full backdrop-blur-sm"
        variants={scaleVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
      >
        <motion.div
          className="py-10 px-14 flex flex-col items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Only show completion percentage on own profile, not on public view */}
          {!isPublicView && (
            <motion.div
              className="absolute right-4 top-4 w-12 h-12 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
            >
              <svg
                className="w-12 h-12 transform -rotate-0"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-[#23252B]"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-[#C6FF3D]"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${animatedPercentage}, 100` }}
                  transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
              <motion.span
                className="absolute text-white font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {animatedPercentage}%
              </motion.span>
            </motion.div>
          )}

          <motion.div className="relative mb-4" variants={fadeUpVariants}>
            <motion.img
              src={user.avatar}
              alt={user.name}
              className="w-28 h-28 rounded-full object-cover border-2 border-[#C6FF3D]"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>

          <AnimatedText
            as={motion.h2}
            className="text-lg font-semibold text-white text-center"
          >
            {user.name}
          </AnimatedText>

          {user.github_username && (
            <motion.div
              className="text-[#A1A1AA] text-xs mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              @{user.github_username}
            </motion.div>
          )}

          {user.bio && (
            <motion.p
              className="text-[#A1A1AA] text-center text-xs mb-8 font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {user.bio}
            </motion.p>
          )}

          {user.location && (
            <motion.div
              className="flex items-center justify-center gap-1 mb-2 text-xs text-[#A1A1AA]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 3,
                }}
              >
                <MapPin color="#A1A1AA" className="w-4 h-4" />
              </motion.div>
              {user.location}
            </motion.div>
          )}

          <motion.div
            className="flex items-center gap-2 text-[#A1A1AA] text-xs mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Calendar color="#A1A1AA" className="w-4 h-4" />
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </motion.div>

          {/* Social Icons Section */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-3 mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {socialLinks.map(({ icon: Icon, link, color, label }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 hover:border-[#C6FF3D] border border-[rgba(255,255,255,0.1)] bg-[#23252B] transition-all group"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.8 + index * 0.1,
                    duration: 0.6,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  }}
                  whileHover={{
                    // scale: 1.1,
                    // rotate: 5,
                    // backgroundColor: color + "20",
                    // borderColor: "#C6FF3D",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={label}
                >
                  <Icon
                    size={16}
                    className="text-[#A1A1AA] group-hover:text-[#C6FF3D] transition-all duration-300"
                  />
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="flex justify-between w-full mt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="text-center"
              variants={fadeLeftVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-[#C6FF3D] text-xl font-semibold"
                animate={{
                  textShadow: [
                    "0 0 0px #C6FF3D",
                    "0 0 10px #C6FF3D40",
                    "0 0 0px #C6FF3D",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 4,
                }}
              >
                {animatedContributions.toLocaleString()}
              </motion.div>
              <motion.div
                className="text-white text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Contributions
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center"
              variants={fadeRightVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-[#FACC15] text-xl font-semibold"
                animate={{
                  textShadow: [
                    "0 0 0px #FACC15",
                    "0 0 10px #FACC1540",
                    "0 0 0px #FACC15",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 5,
                }}
              >
                {animatedLinesOfCode.toLocaleString()}
              </motion.div>
              <motion.div
                className="text-white text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                Lines of code
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {(user.collegeInfo?.name ||
          user.collegeInfo?.degree ||
          user.collegeInfo?.currentYear ||
          user.college_info?.name ||
          user.college_info?.degree ||
          user.college_info?.current_year) && (
          <motion.div
            className="w-full bg-[#FFFFFF05] border border-[#23252B] p-6 backdrop-blur-sm rounded-md"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="flex items-center mb-2 gap-2 justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 2,
                  }}
                >
                  <GraduationCap color="#C6FF3D" />
                </motion.div>
                <h3 className="text-white font-semibold text-lg">Education</h3>
              </motion.div>
              {(user.collegeInfo?.currentYear ||
                user.college_info?.current_year) && (
                <motion.div
                  className="inline-flex items-center bg-[#1C2A1E] text-[#7CFF79] text-xs px-2.5 py-0.5 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 1.6,
                    duration: 0.6,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span
                    className="w-2 h-2 mr-1.5 bg-[#7CFF79] rounded-full"
                    animate={{
                      scale: 1.2,
                      opacity: 0.7,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 3,
                    }}
                  />
                  {(() => {
                    const year =
                      user.collegeInfo?.currentYear ||
                      user.college_info?.current_year;
                    const yearNum = parseInt(year);
                    let suffix = "";

                    if (yearNum === 1) suffix = "st";
                    else if (yearNum === 2) suffix = "nd";
                    else if (yearNum === 3) suffix = "rd";
                    else if (yearNum === 4) suffix = "th";

                    return `${year}${suffix} Year`;
                  })()}
                </motion.div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {(user.collegeInfo?.name || user.college_info?.name) && (
                <motion.p
                  className="text-white text-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  {user.collegeInfo?.name || user.college_info?.name}
                </motion.p>
              )}
              {(user.collegeInfo?.degree || user.college_info?.degree) && (
                <motion.p
                  className="text-[#A1A1AA] text-sm mt-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 }}
                >
                  {user.collegeInfo?.degree || user.college_info?.degree}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {user.email && (
          <motion.div
            className="w-full bg-[#FFFFFF05] border border-[#23252B] p-6 backdrop-blur-sm rounded-md"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="flex items-center mb-2 gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.div
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 4,
                }}
              >
                <Mail color="#C6FF3D" className="w-6 h-6" />
              </motion.div>
              <h3 className="text-white font-semibold text-lg">Email</h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
            >
              <motion.div
                className="flex gap-2 items-center mt-[1rem] bg-white/3 rounded-lg border-white/10 border p-4"
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "#C6FF3D40",
                  transition: { duration: 0.2 },
                }}
              >
                <Mail color="#99a1af" className="w-4 h-4" />
                <p className="text-gray-400 text-sm">{user.email}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileCard;
