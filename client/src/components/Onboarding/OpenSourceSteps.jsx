import React, { useState } from "react";

const steps = [
  {
    title: "Step 1: Fork the Repo",
    description: "Go to the repository on GitHub and click the 'Fork' button in the top right to create your own copy.",
    code: null,
  },
  {
    title: "Step 2: Clone your fork",
    description: "Clone your forked repository to your local machine.",
    code: 'git clone https://github.com/<your-username>/<repo-name>.git',
  },
  {
    title: "Step 3: Add upstream remote",
    description: "Add the original repository as an upstream remote to keep your fork up to date.",
    code: 'git remote add upstream https://github.com/<original-owner>/<repo-name>.git',
  },
  {
    title: "Step 4: Create a new branch",
    description: "Create a new branch for your changes.",
    code: 'git checkout -b my-new-branch',
  },
  {
    title: "Step 5: Make changes",
    description: "Edit files, fix bugs, or update documentation as needed.",
    code: null,
  },
  {
    title: "Step 6: Stage & commit your changes",
    description: "Stage your changes and commit them with a descriptive message.",
    code: 'git add .\ngit commit -m "Describe your change"',
  },
  {
    title: "Step 7: Push your branch",
    description: "Push your branch to your fork on GitHub.",
    code: 'git push origin my-new-branch',
  },
  {
    title: "Step 8: Open a Pull Request",
    description: "On GitHub, click 'Compare & pull request' to open a PR.",
    code: null,
  },
  {
    title: "Step 9: Review & Merge",
    description: "Wait for the maintainer to review your PR. Once approved, your PR will be merged. ✅",
    code: null,
  },
];

function StepProgressBar({ current, total }) {
  return (
    <div className="w-full flex items-center mb-8">
      <div className="flex-1 h-2 bg-gray-200 rounded-full relative overflow-hidden">
        <div
          className="h-2 bg-[#C6FF3D] rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        ></div>
      </div>
      <span className="ml-4 text-sm text-gray-500">
        Step {current + 1} / {total}
      </span>
    </div>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="relative mt-6">
      <pre className="bg-[#23252B] text-[#C6FF3D] rounded-lg p-4 font-mono text-sm md:text-base whitespace-pre-wrap break-words">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-[#23252B] border border-[#C6FF3D] text-[#C6FF3D] px-2 py-1 rounded hover:bg-[#C6FF3D] hover:text-[#23252B] transition text-xs"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function OpenSourceSteps() {
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;
  const isFirst = step === 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#181A20] rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center min-h-[420px]">
      <StepProgressBar current={step} total={steps.length} />
      {!isLast ? (
        <>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white text-center">
            {steps[step].title}
          </h2>
          <p className="text-[#A1A1AA] text-base md:text-lg mb-4 text-center">
            {steps[step].description}
          </p>
          {steps[step].code && <CodeBlock code={steps[step].code} />}
          <div className="flex w-full justify-between mt-10">
            {!isFirst ? (
              <button
                className="px-6 py-2 rounded-lg bg-[#23252B] text-white border border-[#23252B] hover:border-[#C6FF3D] transition font-medium shadow"
                onClick={() => setStep((s) => s - 1)}
              >
                Previous
              </button>
            ) : <div />}
            <button
              className="px-6 py-2 rounded-lg bg-[#C6FF3D] text-[#181A20] font-bold shadow hover:bg-[#b6e62e] transition"
              onClick={() => setStep((s) => s + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white text-center">
            You’ve contributed to Open Source!
          </h2>
          <p className="text-[#A1A1AA] text-base md:text-lg mb-4 text-center">
            Congratulations on completing all the steps. Your journey has just begun!
          </p>
        </div>
      )}
    </div>
  );
}
