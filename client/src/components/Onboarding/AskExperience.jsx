import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const questions = [
  {
    id: 'source',
    text: 'How did you hear about DCODE?',
    options: [
      { value: 'Friend' },
      { value: 'Social Media' },
      { value: 'Event' },
      { value: 'Other' }
    ]
  },
  {
    id: 'interests',
    text: 'What are your main interests in tech?',
    options: [
      { value: 'Web Dev' },
      { value: 'AI/ML' },
      { value: 'Blockchain' },
      { value: 'DevOps' }
    ]
  },
  {
    id: 'time',
    text: 'How much time can you commit weekly?',
    options: [
      { value: '<2 hrs' },
      { value: '2-4 hrs' },
      { value: '4-6 hrs' },
      { value: '6+ hrs' }
    ]
  },
  {
    id: 'knowledge',
    text: "What's your knowledge level of open source?",
    options: [
      { value: 'Beginner' },
      { value: 'Intermediate' },
      { value: 'Advanced' },
      { value: 'Expert' }
    ]
  }
];

export const AskExperience = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleSelect = value => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: value }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Final Answers:', answers);
    alert('Form submitted! Check console for answers.');
  };

  const currentQuestion = questions[step];
  const selectedAnswer = answers[currentQuestion.id];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative w-full max-w-2xl">
        {/* Question card */}
        <div
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl relative transition-all duration-300"
          style={{ minHeight: '460px' }}
        >
          {/* Progress bar */}
          <div className="w-full h-3 bg-white/20 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[#7A900F] transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question text */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setHoveredOption(index)}
                onMouseLeave={() => setHoveredOption(null)}
                className={`
                  relative group rounded-2xl p-6 transition-all duration-300 transform
                  bg-white/15 backdrop-blur-md
                  shadow-md hover:shadow-xl
                  ${
                    selectedAnswer === option.value
                      ? 'border-4 border-[#7A900F] bg-[#7A900F]/90 text-white'
                      : 'border border-white/10 text-gray-200 hover:scale-105'
                  }
                  ${hoveredOption === index ? 'z-10' : ''}
                `}
              >
                <span
                  className={`font-semibold text-lg transition-colors duration-300 ${
                    selectedAnswer === option.value
                      ? 'text-white'
                      : 'text-gray-200'
                  }`}
                >
                  {option.value}
                </span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {/* Back button - always present, disabled on first step */}
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`px-6 py-3 font-semibold rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-md
              ${
                step > 0
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>

            {/* Next / Submit - always positioned on the right */}
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`px-6 py-3 font-semibold rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-lg 
              ${
                selectedAnswer
                  ? 'bg-[#7A900F] text-white hover:bg-[#6c7f0d]'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
            >
              <span>{step === questions.length - 1 ? 'Submit' : 'Next'}</span>
              {step !== questions.length - 1 && <ArrowRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
