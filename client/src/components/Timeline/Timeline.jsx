import { FileText, Lightbulb, Rocket, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TimelineLine from "./TimelineLine";
import TimelineStep from "./TimelineStep";

const DCodeTimeline = () => {
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.dataset.stepIndex);
            setVisibleSteps((prev) => new Set(prev).add(stepIndex));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    const steps = document.querySelectorAll("[data-step-index]");
    steps.forEach((step) => observer.observe(step));

    // Subtle parallax effect
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
          )
        );
        setScrollY(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const phases = [
    {
      id: 1,
      title: "Fork Phase",
      duration: "70 days",
      description: "Choose a repository and start to explore with basic issues",
      icon: <FileText className="w-6 h-6" />,
      position: "left",
    },
    {
      id: 2,
      title: "Spec Phase",
      duration: "15 days",
      description: "Understand the problem and plan your fix then propose it",
      icon: <Lightbulb className="w-6 h-6" />,
      position: "right",
    },
    {
      id: 3,
      title: "Merge Phase",
      duration: "90 days",
      description: "Contribute your changes and get merged",
      icon: <Rocket className="w-6 h-6" />,
      position: "left",
    },
    {
      id: 4,
      title: "Showcase & Recognition",
      duration: "Completion ceremony",
      description:
        "Top performers receive internship opportunities, and community recognition",
      icon: <Trophy className="w-6 h-6" />,
      position: "right",
    },
  ];

  return (
    <div
      className="relative w-full min-h-[200vh] bg-[#121212] overflow-hidden"
      id="timeline"
      ref={timelineRef}
    >
      {/* Animated background gradient with subtle parallax */}
      <div
        className="absolute w-[1200px] h-[1200px] rounded-full opacity-20 pointer-events-none animate-pulse"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(1, 255, 128, 0.06) 0%, rgba(1, 153, 77, 0) 100%)",
          left: "50%",
          top: `${10 - scrollY * 5}%`,
          transform: `translateX(-50%) scale(${1 + scrollY * 0.1})`,
          animationDuration: "4s",
          transition: "all 0.1s ease-out",
        }}
      />

      {/* Header with fade-in animation */}
      <div className="text-center pt-8 pb-10 px-4 animate-fadeInUp">
        <div
          className="text-green-500 text-sm tracking-widest mb-4 opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          TIMELINE
        </div>
        <h1
          className="text-4xl md:text-3xl font-semibold text-white opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <span className="bg-gradient-to-r from-[#BCDD19] to-[#65770D] bg-clip-text text-transparent">
            DCODE
          </span>
          <span className="text-white"> Program Phases</span>
        </h1>
        <p
          className="text-gray-400 mt-4 text-base max-w-2xl mx-auto opacity-0 animate-fadeInUp"
          style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
        >
          A structured journey through open-source contribution, from
          exploration to production-level impact
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative  px-4 min-h-[140vh] flex items-center justify-center">
        {/* Parallax haze effect */}
        <div
          className="absolute w-[1200px] h-[1200px] rounded-full /blur-3xl opacity-50 pointer-events-none z-0"
          style={{
            /* Ellipse 10 */
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(1, 255, 128, 0.06) 0%, rgba(1, 153, 77, 0) 100%)",
            left: "50%",
            top: `${10 + scrollY * 3}%`,
            transform: `translateX(-50%) scale(${0.8 + scrollY * 0.2})`,
            transition: "all 0.1s ease-out",
          }}
        />

        {/* Central line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 translate-y-23 z-0 h-full flex items-center justify-center pointer-events-none"
          style={{ top: "20px" }}
        >
          <TimelineLine height={1100} />
        </div>

        <div className="relative w-full max-w-6xl mx-auto min-h-[130vh]">
          {phases.map((phase, index) => (
            <TimelineStep
              key={phase.id}
              phase={phase}
              index={index}
              total={phases.length}
              isVisible={visibleSteps.has(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DCodeTimeline;
