import { useCallback, useEffect, useRef, useState } from "react";
import Button  from "../../components/ui/Button/Button";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const steps = [
  {
    id: 1,
    title: "Fork this",
    highlight: "repository",
    blurb: "A fork is your personal copy of this project.",
    body: "Forking creates your own copy so you can experiment safely. Click the Repository button to open the upstream project and press Fork.",
  },
  {
    id: 2,
    title: "Clone your",
    highlight: "fork",
    blurb: "Bring your fork down to your machine.",
    body: "Use git to clone your fork. Replace <your-username> with your GitHub username.",
    snippet: {
      label: "Clone",
      code: "git clone https://github.com/<your-username>/next.js.git\ncd next.js\ngit remote add upstream https://github.com/vercel/next.js.git",
    },
  },
  {
    id: 3,
    title: "Create a",
    highlight: "branch",
    blurb: "Keep your changes isolated and easy to review.",
    body: "Create a descriptively named branch for your work. Avoid committing directly to main.",
    snippet: {
      label: "Branch",
      code: 'git checkout -b fix/typo-readme\n# do your changes, then\ngit add .\ngit commit -m "fix: correct typo in README"',
    },
  },
  {
    id: 4,
    title: "Sync with",
    highlight: "upstream",
    blurb: "Stay up to date with the source repository.",
    body: "Regularly pull from upstream’s main to reduce merge conflicts.",
    snippet: {
      label: "Sync",
      code: "git fetch upstream\ngit checkout main\ngit merge upstream/main\n# or rebase your branch\ngit checkout fix/typo-readme\ngit rebase main",
    },
  },
  {
    id: 5,
    title: "Open a",
    highlight: "pull request",
    blurb: "Propose your changes to be merged.",
    body: "Push your branch to your fork and open a PR against the upstream repository. Fill out the template clearly.",
    snippet: {
      label: "PR",
      code: "git push -u origin fix/typo-readme\n# then open the link GitHub prints, or:\n# https://github.com/<your-username>/next.js/compare",
    },
  },
  {
    id: 6,
    title: "Respond to",
    highlight: "reviews",
    blurb: "Collaborate to get your PR merged.",
    body: "Address feedback, make follow-up commits, and keep your branch synced. Be kind, concise, and iterative.",
    snippet: {
      label: "Follow-up",
      code: 'git add .\ngit commit -m "chore: address review comments"\ngit push',
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

  return (
    <>
    <div className="mb-10 bg-transparent">
         <h1 className="text-4xl font-bold text-center">
           Let's start with your first <span className="text-[#C6FF3D]">PR</span>
         </h1>
         <p className="text-lg text-[#A1A1AA] mt-2 text-center">
           Let's get you started on your contribution journey
         </p>
       </div>
    <section
      aria-label="Open Source Contribution Guide"
      className="rounded-xl border-[1px] border-[#343434] bg-transparent p-3 min-w-6xl backdrop-blur-xl"
    >
      <div className="">
        <SegmentedProgress current={index} total={total} />
      </div>

      <div className="relative">
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
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        return (
          <div
            key={i}
            className="h-1 flex-1 rounded-full bg-[#FFFFFF40] overflow-hidden"
            aria-hidden
          >
            <motion.div
              className="h-full w-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: done ? 1 : 0.2,
                backgroundColor: done
                  ? "#01FF808C"
                  : "",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        );
      })}
    </div>
  );
}

function StepCard({ step, index, total, onPrev, onNext }) {
  return (
    <motion.div
      className="rounded-xl p-4 flex flex-col justify-between min-h-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4 items-center">
          <div
            className="h-14 w-14 shrink-0 rounded-full border flex items-center justify-center text-xl font-semibold bg-neutral-800"
            aria-label={`Step ${index + 1}`}
          >
            {index + 1}
          </div>
          <div className="">
            <h2 className="text-3xl font-semibold text-left">
              {step.title}{" "}
              {step.highlight ? (
                <span className="decoration-foreground/50 underline-offset-4 text-[#C6FF3D]">
                  {step.highlight}
                </span>
              ) : null}
              .
            </h2>
            <p className="text-[#A1A1AA] mt-1">{step.blurb}</p>
          </div>
        </div>

      </div>

      <p className="mt-6 text-[#A1A1AA] max-w-4xl min-w-full">{step.body}</p>

      {step.snippet ? (
        <Snippet
          className="mt-6"
          label={step.snippet.label}
          code={step.snippet.code}
          language={step.snippet.language}
        />
      ) : null}

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="secondary"
          className="rounded-sm border-[#FFFFFF80]"
          onClick={onPrev}
          disabled={index === 0}
          aria-label="Previous step"
        >
          Previous
        </Button>
        <Button
          className="rounded-sm border-[#FFFFFF80] bg-transparent text-white hover:bg-transparent"
          onClick={onNext}
          aria-label={index + 1 === total ? "Finish" : "Next step"}
        >
          {index + 1 === total ? "Finish ↗" : "Next ↗"}
        </Button>
      </div>
    </motion.div>
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
    <div className={cn("rounded-lg border-[1px] border-[#343434] overflow-hidden bg-neutral-900", className)}>
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
  return (
    <motion.div
      className="p-6 md:p-10 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto mb-6 h-12 w-12 rounded-full border flex items-center justify-center text-xl font-semibold">
        ✓
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-balance">
        Congratulations! Your contribution is on its way.
      </h2>
      <p className="text-muted-foreground mt-2">
        Crackers popped, confetti flew—thanks for helping the community grow.
      </p>
      <div className="mt-8">
        <Button className="rounded-xl" onClick={() => navigate("/dashboard")}>
          Start Over
        </Button>
      </div>
    </motion.div>
  );
}
