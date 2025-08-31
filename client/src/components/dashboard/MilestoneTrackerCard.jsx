import { Card } from '@/components/ui/card';
import {
  GitMerge,
  Code,
  FolderGit2,
  Calendar,
  Trophy,
  Users
} from 'lucide-react';

const MilestoneTracker = ({ className }) => {
  const milestones = [
    {
      icon: <GitMerge className="w-5 h-5 text-[#BCDD19]" />,
      title: '100 PRs Merged',
      progress: '80 / 100',
      percentage: 80,
      status: '80%',
      color: '[#BCDD19]',
      remaining: '20 remaining to achieve'
    },
    {
      icon: <Code className="w-5 h-5 text-orange-400" />,
      title: '5,000 Lines of Code',
      progress: '4,500 / 5,000',
      percentage: 90,
      status: '90%',
      color: 'orange-400',
      remaining: '500 remaining to achieve'
    },
    {
      icon: <FolderGit2 className="w-5 h-5 text-blue-400" />,
      title: '30 Unique Repositories',
      progress: '12 / 30',
      percentage: 40,
      status: '40%',
      color: 'blue-400',
      remaining: '18 remaining to achieve'
    },
    {
      icon: <Calendar className="w-5 h-5 text-purple-400" />,
      title: 'JS Mastery',
      progress: '3,000 / 10,000',
      percentage: 30,
      status: '30%',
      color: 'purple-400',
      remaining: '7,000 remaining to achieve'
    },
    {
      icon: <Trophy className="w-5 h-5 text-teal-400" />,
      title: '100-Days Contribution',
      progress: '60 / 100',
      percentage: 60,
      status: '60%',
      color: 'teal-400',
      remaining: '40 remaining to achieve'
    },
    {
      icon: <Users className="w-5 h-5 text-[#BCDD19]" />,
      title: 'First PR Reviewed',
      progress: '1 / 1',
      percentage: 100,
      status: '100%',
      color: '[#BCDD19]',
      remaining: 'Achieved'
    }
  ];

  return (
    <Card
      className={`bg-white/[0.02] border border-gray-800 rounded-xl p-4 sm:p-6 h-full ${className}`}
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
          Milestone <span className="text-[#BCDD19]">Tracker</span>
        </h3>
        <p className="text-xs sm:text-sm text-gray-400">
          Track your developer journey progress
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#01994D]/20 to-[#00331A]/5 rounded-lg p-3 sm:p-4 border border-gray-700"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex-shrink-0">{milestone.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium text-white truncate">
                  {milestone.title}
                </h4>
                <p className="text-xs text-gray-400 truncate">
                  {milestone.progress}
                </p>
              </div>
              <span className="text-xs font-medium text-gray-300 flex-shrink-0">
                {milestone.status}
              </span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <div className="text-xs text-gray-400">Progress</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                <div
                  className={`h-1.5 sm:h-2 bg-[#BCDD19] rounded-full transition-all duration-500`}
                  style={{
                    width: `${milestone.percentage}%`,
                    opacity: milestone.percentage / 100
                  }}
                />
              </div>
              <div className="text-xs text-gray-500">{milestone.remaining}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-6 pt-4 border-t border-gray-700 gap-4 sm:gap-0">
        <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">1</div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#BCDD19]">
              4
            </div>
            <div className="text-xs text-gray-400">In progress</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-white">5</div>
            <div className="text-xs text-gray-400">Total goals</div>
          </div>
        </div>
        <button className="text-xs sm:text-sm text-[#BCDD19] hover:underline hover:text-[#BCDD19]/80 transition-colors text-center sm:text-right">
          View Detailed Progress →
        </button>
      </div>
    </Card>
  );
};

export default MilestoneTracker;
