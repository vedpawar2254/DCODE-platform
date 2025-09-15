import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const steps = [
  {
    id: 1,
    title: "Fork the",
    highlight: "repository",
    blurb: "Create your own copy of the project.",
    body: "Forking creates a personal copy of the repository under your GitHub account. This allows you to make changes without affecting the original project. Click the 'Fork' button on the repository's GitHub page.",
    icon: "🍴",
    color: "#BCDD19",
    snippet: {
      label: "Fork Repository",
      subtitle: "Create your personal copy on GitHub",
      commands: [
        {
          command: "# 1. Go to the repository on GitHub",
          description: "Navigate to the project's GitHub page",
        },
        {
          command: "# 2. Click the 'Fork' button (top-right)",
          description: "This creates a copy under your account",
        },
        {
          command: "# 3. Choose your account as destination",
          description: "Select where to create the fork",
        },
        {
          command: "# 4. Wait for GitHub to create the fork",
          description: "GitHub will redirect you to your fork",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Clone your",
    highlight: "fork",
    blurb: "Bring your fork down to your machine.",
    body: "Cloning downloads your forked repository to your local computer so you can make changes. Use git to clone your fork and set up the connection to the original repository for future updates.",
    icon: "📥",
    color: "#BCDD19",
    snippet: {
      label: "Clone Repository",
      subtitle: "Download your forked repository to your local machine",
      commands: [
        {
          command:
            "git clone https://github.com/<your-username>/<repository-name>.git",
          description: "Clone your forked repository",
        },
        {
          command: "cd <repository-name>",
          description: "Navigate into the project directory",
        },
        {
          command:
            "git remote add upstream https://github.com/<original-owner>/<repository-name>.git",
          description: "Add the original repository as upstream remote",
        },
        {
          command: "git remote -v",
          description: "Verify your remote repositories are set up correctly",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Create a",
    highlight: "branch",
    blurb: "Keep your changes isolated and easy to review.",
    body: "Creating a new branch keeps your changes separate from the main code. This makes it easier to manage multiple contributions and allows maintainers to review your changes without conflicts.",
    icon: "🌿",
    color: "#BCDD19",
    snippet: {
      label: "Create Branch",
      subtitle: "Create a new branch for your feature or bug fix",
      commands: [
        {
          command: "git checkout -b feature/<descriptive-name>",
          description: "Create and switch to a new feature branch",
        },
        {
          command: "# Example: git checkout -b fix/button-alignment",
          description: "Use descriptive names for your branches",
        },
        {
          command: "git status",
          description: "Confirm you're on the new branch",
        },
        {
          command: "# Now make your changes to the code",
          description: "Edit files using your preferred code editor",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Make your",
    highlight: "changes",
    blurb: "Implement your feature or fix the issue.",
    body: "Now comes the actual coding! Make your changes carefully, following the project's coding standards and guidelines. Test your changes thoroughly to ensure they work as expected and don't break existing functionality.",
    icon: "✏️",
    color: "#BCDD19",
    snippet: {
      label: "Making Changes",
      subtitle: "Best practices for implementing your contribution",
      commands: [
        {
          command: "# 1. Read the CONTRIBUTING.md file",
          description: "Understand the project's contribution guidelines",
        },
        {
          command: "# 2. Install dependencies",
          description: "Run npm install, pip install, etc.",
        },
        {
          command: "# 3. Make your changes",
          description: "Edit the necessary files",
        },
        {
          command: "# 4. Test your changes locally",
          description: "Run tests and verify functionality",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Commit your",
    highlight: "changes",
    blurb: "Save your work with a clear message.",
    body: "Commits create snapshots of your changes. Write clear, descriptive commit messages that explain what you changed and why. Follow conventional commit format if the project uses it.",
    icon: "💾",
    color: "#BCDD19",
    snippet: {
      label: "Commit Changes",
      subtitle: "Save your work with descriptive commit messages",
      commands: [
        {
          command: "git add .",
          description: "Stage all your changes",
        },
        {
          command: "git commit -m 'feat: add user authentication feature'",
          description: "Commit with a clear, descriptive message",
        },
        {
          command: "# Alternative: git add <specific-files>",
          description: "Stage only specific files if preferred",
        },
        {
          command: "git log --oneline",
          description: "View your commit history",
        },
      ],
    },
  },
  {
    id: 6,
    title: "Push to",
    highlight: "GitHub",
    blurb: "Upload your changes to your fork.",
    body: "Pushing uploads your local commits to your GitHub fork. This makes your changes visible on GitHub and prepares them for creating a pull request to the original repository.",
    icon: "�",
    color: "#BCDD19",
    snippet: {
      label: "Push Changes",
      subtitle: "Upload your commits to your GitHub fork",
      commands: [
        {
          command: "git push origin <your-branch-name>",
          description: "Push your branch to your GitHub fork",
        },
        {
          command: "# Example: git push origin feature/user-auth",
          description: "Push your specific feature branch",
        },
        {
          command: "# For first push: git push -u origin <branch-name>",
          description: "Set upstream tracking for future pushes",
        },
        {
          command: "git status",
          description: "Confirm your branch is up to date",
        },
      ],
    },
  },
  {
    id: 7,
    title: "Create a",
    highlight: "Pull Request",
    blurb: "Propose your changes to the original project.",
    body: "A Pull Request (PR) is how you propose your changes to be merged into the original project. Write a clear description of what you changed, why you changed it, and any relevant information for reviewers.",
    icon: "�",
    color: "#BCDD19",
    snippet: {
      label: "Create Pull Request",
      subtitle: "Submit your contribution for review",
      commands: [
        {
          command: "# 1. Go to your fork on GitHub",
          description: "Navigate to your repository on GitHub",
        },
        {
          command: "# 2. Click 'Compare & pull request'",
          description: "GitHub will show this button after pushing",
        },
        {
          command: "# 3. Write a clear title and description",
          description: "Explain what your changes do and why",
        },
        {
          command: "# 4. Click 'Create pull request'",
          description: "Submit your PR for review",
        },
      ],
    },
  },
];

// lazy confetti import to avoid SSR issues
let confettiImpl = null;
async function getConfetti() {
  if (confettiImpl) return confettiImpl;
  try {
    const mod = await import("canvas-confetti");
    confettiImpl = mod.default;
  } catch {
    confettiImpl = () => {};
  }
  return confettiImpl;
}

export default function CreateFork() {
  const { authUser, checkAuth } = useAuthStore();
  const [index, setIndex] = useState(0);
  const total = steps.length;
  const isComplete = index === total;

  const onPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const onNext = useCallback(
    () => setIndex((i) => Math.min(total, i + 1)),
    [total]
  );

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  // confetti when completed
  const popped = useRef(false);
  useEffect(() => {
    if (isComplete && !popped.current) {
      popped.current = true;
      (async () => {
        const conf = await getConfetti();
        conf?.({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
        setTimeout(
          () => conf?.({ particleCount: 140, spread: 75, origin: { y: 0.6 } }),
          250
        );
        setTimeout(
          () => conf?.({ particleCount: 180, spread: 65, origin: { y: 0.6 } }),
          500
        );
      })();
    }
    if (!isComplete) popped.current = false;
  }, [isComplete]);

  useEffect(() => {
    (async () => {
      var loggedin = await checkAuth();
      if (!loggedin.status) {
        navigate("/auth");
      } else {
        console.log("authUser:", authUser);
      }
    })();
  }, []);

  return (
    <>
      <div className="mb-[1.5rem] bg-transparent">
        <h1 className="text-4xl font-bold text-center">
          Let's start with your first <span className="text-[#BCDD19]">PR</span>{" "} 
        </h1>
        <p className="text-lg text-[#A1A1AA] mt-2 text-center">
          Let's get you started on your contribution journey
        </p>
      </div>
      <section
        aria-label="Open Source Contribution Guide"
        className="rounded-2xl border border-[#343434] bg-black/20 p-6 pb-0 max-w-5xl mx-auto backdrop-blur-[6px] shadow-2xl"
      >
        <div className="mb-2">
          <SegmentedProgress current={index} total={total} />
        </div>

        <div className="relative /min-h-[600px]">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <Completion key="complete" onRestart={() => setIndex(0)} />
            ) : (
              <StepCard
                key={index}
                step={steps[index]}
                index={index}
                total={total}
                onPrev={onPrev}
                onNext={onNext}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function SegmentedProgress({ current, total }) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={i}
            className="h-2 flex-1 rounded-full bg-[#FFFFFF20] overflow-hidden relative"
            aria-hidden
          >
            <motion.div
              className="h-full w-full rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: done ? 1 : active && 0,
                backgroundColor: done
                  ? "#01FF80"
                  : active
                    ? "#C6FF3D"
                    : "#FFFFFF20",
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: done ? i * 0.1 : 0,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function StepCard({ step, index, total, onPrev, onNext }) {
  const [isSnippetCompleted, setIsSnippetCompleted] = useState(false);
  const [snippetNotCompletedAlert, setsnippetNotCompletedAlert] =
    useState(false);

  const handleSnippetComplete = () => {
    setIsSnippetCompleted(true);
  };

  // Reset snippet completion when step changes
  useEffect(() => {
    setIsSnippetCompleted(false);
  }, [index]);

  return (
    <motion.div
      className="rounded-2xl p-6 flex flex-col justify-between h-full"
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -32, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-live="polite"
    >
      <div>
        <div className="flex items-start gap-6 mb-5">
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <div
              className="h-16 w-16 rounded-2xl border-2 border-[#343434] flex items-center justify-center text-2xl font-bold bg-[#1a1a1a]/50  backdrop-blur-[5px] relative overflow-hidden"
              style={{
                boxShadow: `0 0 20px ${step.color || "#C6FF3D"}20`,
              }}
              aria-label={`Step ${index + 1}`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${step.color || "#C6FF3D"}40, transparent)`,
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10 text-white">{index + 1}.</span>
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.h2
              className="text-4xl font-bold text-left mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {step.title}{" "}
              {step.highlight ? (
                <span
                  className="relative"
                  style={{ color: step.color || "#C6FF3D" }}
                >
                  {step.highlight}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: step.color || "#C6FF3D" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              ) : null}
              .
            </motion.h2>
            <motion.p
              className="text-sm text-start text-thin text-[#A1A1AA]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {step.blurb}
            </motion.p>
          </div>
        </div>

        <motion.p
          className="text-[#A1A1AA] text-md text-start text-thin leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {step.body}
        </motion.p>

        {step.snippet && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <EnhancedSnippet
              label={step.snippet.label}
              subtitle={step.snippet.subtitle}
              commands={step.snippet.commands}
              accentColor={step.color || "#C6FF3D"}
              onComplete={handleSnippetComplete}
              snippetNotCompletedAlert={snippetNotCompletedAlert}
            />
          </motion.div>
        )}
      </div>

      <motion.div
        className="flex items-center justify-between pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          variant="secondary"
          className="rounded-xl border-[#FFFFFF30] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-all duration-300 px-6 py-3"
          onClick={onPrev}
          disabled={index === 0}
          aria-label="Previous step"
        >
          ← Previous
        </Button>
        <Button
          className={`rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-6 py-3 ${
            step.snippet && !isSnippetCompleted
              ? "bg-gray-600 border-none hover:bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#C6FF3D] to-[#01FF80] text-black"
          }`}
          onClick={() => {
            if (step.snippet && !isSnippetCompleted) {
              if (!snippetNotCompletedAlert) {
                setsnippetNotCompletedAlert(true);
                setTimeout(() => {
                  setsnippetNotCompletedAlert(false);
                }, 1000);
              }
            } else {
              onNext();
            }
          }}
          // disabled={step.snippet && !isSnippetCompleted}
          aria-label={index + 1 === total ? "Finish" : "Next step"}
        >
          {index + 1 === total ? "Finish" : "Next →"}
        </Button>
      </motion.div>
    </motion.div>
  );
}

function EnhancedSnippet({
  label,
  subtitle,
  commands,
  accentColor,
  onComplete,
  snippetNotCompletedAlert,
}) {
  const [copied, setCopied] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentCommand = commands[currentCommandIndex];
  const isLastCommand = currentCommandIndex === commands.length - 1;

  const onNextCommand = () => {
    if (isLastCommand) {
      setIsCompleted(true);
      onComplete?.();
    } else {
      setCurrentCommandIndex((prev) => prev + 1);
    }
  };
  const onPrevCommand = () => {
    if (currentCommandIndex === 0) {
      setIsCompleted(false);
      onComplete?.();
    } else {
      setCurrentCommandIndex((prev) => prev - 1);
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="rounded-2xl border border-[#343434] overflow-hidden bg-gradient-to-br from-[#0a0a0a]/50 to-[#1a1a1a]/50 shadow-2xl backdrop-blur-lg">
      <div className="flex items-center justify-between bg-[#111111] px-6 py-4 border-b border-[#343434]">
        <div>
          <h3 className="text-sm text-start font-semibold uppercase tracking-wider text-white">
            {label}
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-1">{subtitle}</p>
          <p className="text-xs text-[#666] mt-1 text-start">
            Step {currentCommandIndex + 1} of {commands.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={onCopy}
            className="text-xs border mr-2 border-[#FFFFFF30] rounded-lg px-3 py-2 hover:bg-[#2a2a2a] transition-all duration-100 cursor-pointer text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Copy current command"
          >
            {copied ? "Copied!" : "Copy"}
          </motion.button>
          {!isCompleted && currentCommandIndex > 0 && (
            <motion.button
              onClick={onPrevCommand}
              className={`text-xs ${isCompleted ? "opacity-0 hidden" : ""} rounded-lg  transition-all duration-100 cursor-pointer font-medium border-[#C6FF3D] hover:bg-[#C6FF3D]20 text-[#C6FF3D]`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous command"
            >
              {/* <div className="flex items-center gap-2 bg-green-600/40 border border-green-500 pl-1 pr-1 py-1 rounded-full"> */}
              <ArrowLeftCircle className="w-6 h-6 text-[#C6FF3D]" />
              {/* </div> */}
            </motion.button>
          )}
          <motion.button
            onClick={onNextCommand}
            disabled={isCompleted}
            className={`text-xs ${isLastCommand ? "border px-3 py-2 border-[#01FF80]" : ""} rounded-lg  transition-all duration-100 cursor-pointer font-medium ${
              isCompleted
                ? "border-[#01FF80] bg-[#01FF80]20 text-[#01FF80] cursor-not-allowed"
                : "border-[#C6FF3D] hover:bg-[#C6FF3D]20 text-[#C6FF3D]"
            }`}
            style={{
              borderColor: "#01FF80",
              color: isCompleted ? "#01FF80" : accentColor,
            }}
            whileHover={!isCompleted ? { scale: 1.05 } : {}}
            whileTap={!isCompleted ? { scale: 0.95 } : {}}
            aria-label={isLastCommand ? "Complete" : "Next command"}
          >
            {isCompleted ? (
              "✓ Done"
            ) : isLastCommand ? (
              <h3 className="/text-sm /font-semibold uppercase tracking-wider text-[#01FF80]">
                Complete
              </h3>
            ) : (
              <div className="relative">
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center pl-1 pr-1 py-1 rounded-full ${snippetNotCompletedAlert ? "opacity-0" : "opacity-100"}`}
                >
                  <ArrowRightCircle className="w-6 h-6 text-[#C6FF3D]" />
                </div>
                <div
                  className={`flex items-center gap-2 ${snippetNotCompletedAlert ? "w-[5rem] px-1 py-1 border-green-500 border bg-green-600/40" : "w-[2rem] h-[2rem]"}  rounded-full transition-width duration-400`}
                >
                  <ArrowRightCircle className="w-6 h-6 text-[#C6FF3D]" />
                  {/* {snippetNotCompletedAlert ? ( */}
                  <span
                    className={`text-xs ${snippetNotCompletedAlert ? "opacity-100 transition-all duration-300" : "opacity-0"}  delay-150 font-semibold uppercase tracking-wider text-[#C6FF3D]`}
                  >
                    Next
                  </span>
                  {/* ) : null} */}
                </div>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      <div>
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCommandIndex}
              className="group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[1rem]">
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1"
                      style={{
                        borderColor: accentColor,
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      {currentCommandIndex + 1}
                    </div>
                    <motion.div
                      className="rounded-lg w-full bg-[#0a0a0a] border border-[#2a2a2a] p-4 /mb-2 font-mono text-sm"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      style={{
                        boxShadow: `0 4px 20px ${accentColor}10`,
                      }}
                    >
                      <code className="text-[#C6FF3D] break-all">
                        {currentCommand.command}
                      </code>
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-xs text-[#A1A1AA] mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentCommand.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Snippet({ label, code, language = "bash", className }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <div
      className={cn(
        "rounded-lg border-[1px] border-[#343434] overflow-hidden bg-neutral-900",
        className
      )}
    >
      <div className="flex items-center justify-between bg-muted/40 px-3 py-2">
        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
        <button
          onClick={onCopy}
          className="text-xs border border-[#FFFFFF80] rounded-lg px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer "
          aria-label="Copy code"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-2 text-sm ">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Completion({ onRestart }) {
  const { authUser, checkAuth, githubAuth } = useAuthStore();

  useEffect(() => {
    (async () => {
      var loggedin = await checkAuth();
      console.log("authUser:", authUser);
      if (!loggedin.status) {
        navigate("/auth");
      }
    })();
  }, []);
  const navigate = useNavigate();

  const handleGithub = async () => {
    await githubAuth();
  };
  useEffect(() => {
    (async () => {
      window.onload = async () => {
        if (window?.location?.search) {
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get("code");
          if (code) {
            setIsProcessingGitHubCallback(true);
            try {
              var axres = await axios
                .get(
                  "http://localhost:8080/api/v1/auth/github/callback?code=" +
                    code,
                  { withCredentials: true }
                )
                .then((d) => d?.data);

              var check = await checkAuth();
              if (axres?.data?.is_signedup) {
                if (check.status) {
                  navigate("/onboarding");
                }
              } else {
                if (check.status) {
                  navigate("/dashboard");
                }
              }
            } catch (error) {
              console.error("GitHub auth error:", error);
              setIsProcessingGitHubCallback(false);
            }
          }
        } else {
          var check = await checkAuth();
          if (check.status) {
            navigate("/dashboard");
          }
        }
      };
    })();
    return () => {};
  }, [window]);
  return (
    <motion.div
      className="p-8 text-center h-full flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 32, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -32, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className="mx-auto mb-8 h-20 w-20 rounded-full border-2 border-[#01FF80] flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-[#01FF80]20 to-[#C6FF3D]20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        ✓
      </motion.div>

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-balance mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Congratulations! Your contribution is on its way.
      </motion.h2>

      <motion.p
        className="text-[#A1A1AA] text-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Crackers popped, confetti flew—thanks for helping the community grow.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {authUser?.data?.is_github_login ? (
          <Button
            className="rounded-xl bg-gradient-to-r from-[#C6FF3D] to-[#01FF80] text-black font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
            onClick={() => navigate("/dashboard")}
          >
            Move to Dashboard
          </Button>
        ) : (
          <Button
            className="rounded-xl bg-gradient-to-r from-[#C6FF3D] to-[#01FF80] text-black font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
            onClick={handleGithub}
          >
            Connect Your Github
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
