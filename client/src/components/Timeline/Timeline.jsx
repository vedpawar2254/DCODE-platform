import { FileText, Lightbulb, Rocket, Trophy } from 'lucide-react';
import TimelineLine from './TimelineLine';
import TimelineStep from './TimelineStep';
const DCodeTimeline = () => {
  const phases = [
    {
      id: 1,
      title: 'Fork Phase',
      duration: '2.5 Months',
      description: 'Clone the repository and start to explore',
      icon: <FileText className="w-5 h-5" />,
      position: 'left'
    },
    {
      id: 2,
      title: 'Spec Phase',
      duration: '0.5 Month',
      description: 'Understand the problem and plan your fix',
      icon: <Lightbulb className="w-5 h-5" />,
      position: 'right'
    },
    {
      id: 3,
      title: 'Merge Phase',
      duration: '3 Months',
      description: 'Contribute your changes and get merged',
      icon: <Rocket className="w-5 h-5" />,
      position: 'left'
    },
    {
      id: 4,
      title: 'Showcase & Recognition',
      duration: 'Completion ceremony',
      description:
        'Top performers receive industry mentorship, internship opportunities, and community recognition',
      icon: <Trophy className="w-5 h-5" />,
      position: 'right'
    }
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden mt-35 py-24">
      {/* Background gradient circle */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(1, 255, 128, 0.06) 0%, rgba(1, 153, 77, 0) 100%)',
          left: '50%',
          top: '20%',
          transform: 'translateX(-50%)'
        }}
      />

      {/* Header */}
      <div className="text-center pt-4 pb-6 px-4">
        <div className="text-green-400 text-xl font-normal mb-2 opacity-70">
          TIMELINE
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-[#BCDD19] to-[#65770D] bg-clip-text text-transparent">
            DCODE
          </span>
          <span className="text-white"> Program Phases</span>
        </h1>
        <p className="text-gray-300 text-sm max-w-2xl mx-auto opacity-70">
          A structured journey through open-source contribution, from
          exploration to production-level impact
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative mt-5 px-4 h-[80vh] flex items-center justify-center">
        {/* haze */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-80 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(1, 255, 128, 0.25) 0%, rgba(1, 153, 77, 0) 100%)',
            left: '50%',
            top: '10%',
            transform: 'translateX(-50%)'
          }}
        />

        {/* centeral line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-0 h-full flex items-center justify-center pointer-events-none">
          <TimelineLine />
        </div>

        {/* Timeline items positioned absolutely */}
        <div className="relative w-full max-w-6xl mx-auto h-full">
          {phases.map((phase, index) => {
            return (
              <TimelineStep
                key={phase.id}
                phase={phase}
                index={index}
                total={phases.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DCodeTimeline;
