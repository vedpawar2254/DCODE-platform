import {
  Calendar,
  CalendarDays,
  Github,
  GitPullRequest,
  GraduationCap,
  Linkedin,
  Locate,
  Mail,
  Star,
  TrendingUp,
  Twitter,
} from "lucide-react";

const ContributionHighlights = ({ highlights }) => (
  <div className="bg-[#FFFFFF05] rounded-lg p-6 shadow-lg border border-[#23252B] w-full backdrop-blur-md">
    <div className="flex justify-between items-center mb-2">
      <div className="flex gap-2 items-center">
        <TrendingUp color="#C6FF3D" />
        <div>
          <h3 className="text-white text-lg flex items-center gap-2">
            Contribution Highlights
          </h3>
          <p className="text-[#A1A1AA] text-xs">Your impact across DCODE</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-[#C6FF3D] text-xl font-semibold">
          {highlights.total}
        </div>
        <div className="text-[#A1A1AA] text-xs">Total Contributions</div>
      </div>
    </div>
    {/* Main content cards */}
    <div className="flex flex-row gap-6 mt-6">
      {/* Pull Requests */}
      <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1 flex flex-col justify-between bg-[#FFFFFF05]">
        <div className="text-white  mb-2 flex items-center gap-2">
          <GitPullRequest color="#01FF80" />
          Pull Requests
        </div>
        <div className="flex flex-col gap-1 mt-4 text-white font-light">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#23FF7A] inline-block" />
              Merged
            </span>
            <span className="font-bold text-[#23FF7A]">23</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] inline-block" />
              Open
            </span>
            <span className="font-bold text-[#3B82F6]">5</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A1A1AA] inline-block" />
              Closed
            </span>
            <span className="font-bold text-[#A1A1AA]">2</span>
          </div>
        </div>
        <div className="mt-4 text-white font-light text-xs">Success Rate</div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#23FF7A] font-bold">92%</span>
          <div className="flex-1 h-2 bg-[#23252B] rounded-full overflow-hidden">
            <div
              className="h-2 bg-[#23FF7A] rounded-full"
              style={{ width: "92%" }}
            ></div>
          </div>
        </div>
      </div>
      {/* Contribution Types */}
      {/* <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1 flex flex-col">
        <div className="text-white  mb-2 flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#C6FF3D" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="#C6FF3D" />
          </svg>
          Contribution Types
        </div>
        <div className="flex flex-col gap-2 mt-4 text-white font-light">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#23C6FF] inline-block" />
              Code
            </span>
            <span className="font-bold text-[#23C6FF]">34 (40%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#23FF7A] inline-block" />
              Documentation
            </span>
            <span className="font-bold text-[#23FF7A]">26 (30%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2323] inline-block" />
              Bug Fixes
            </span>
            <span className="font-bold text-[#FF2323]">17 (20%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD923] inline-block" />
              Reviews
            </span>
            <span className="font-bold text-[#FFD923]">9 (10%)</span>
          </div>
        </div>
      </div> */}
      {/* Activity Metrics */}
      <div className="border border-[#23252B] rounded-lg p-6 min-w-[220px] flex-1 flex flex-col justify-between bg-[#FFFFFF05]">
        <div className="text-white mb-2 flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <rect
              x="4"
              y="8"
              width="16"
              height="12"
              rx="2"
              stroke="#C6FF3D"
              strokeWidth="2"
            />
            <path d="M8 12h8" stroke="#C6FF3D" strokeWidth="2" />
          </svg>
          Activity Metrics
        </div>
        <div className="mt-4 mb-2">
          <div className="bg-[#23252B] rounded-lg p-4 text-center">
            <div className="text-[#23FF7A] text-2xl font-bold">2,847</div>
            <div className="text-[#A1A1AA] text-xs">Lines of Code</div>
          </div>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="bg-[#23252B] rounded-lg p-2 flex-1 text-center">
            <div className="text-[#7A6FF4] text-lg font-bold">15</div>
            <div className="text-[#A1A1AA] text-xs">Reviews</div>
          </div>
          <div className="bg-[#23252B] rounded-lg p-2 flex-1 text-center">
            <div className="text-[#FF7A6F] text-lg font-bold">8</div>
            <div className="text-[#A1A1AA] text-xs">Issues</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-white font-light">
          <span>This Month</span>
          <span className="text-[#23FF7A] font-bold">+12%</span>
        </div>
      </div>
    </div>
    {/* Top Contributing Repositories */}
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Star color="#C6FF3D" size={20} />
          Top Contributing Repositories
        </div>
        {/* <a href="#" className="text-[#C6FF3D] text-xs underline">
          View All
        </a> */}
      </div>
      <div className="flex flex-row gap-6">
        {/* Repo 1 */}
        <div className="border border-[#23252B] rounded-lg p-4 flex-1 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold">dcode-core</span>
            <span className="text-[#FFD923] text-xs">JavaScript</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#C6FF3D] font-bold text-lg">34</span>
            <span className="text-[#A1A1AA] text-xs">commits</span>
          </div>
          <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden mb-2">
            <div
              className="h-2 bg-[#23C6FF] rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
          <div className="text-[#A1A1AA] text-xs">Last commit: 2 days ago</div>
          <div className="text-[#C6FF3D] text-xs">#1</div>
        </div>
        {/* Repo 2 */}
        <div className="border border-[#23252B] rounded-lg p-4 flex-1 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold">dcode-ui</span>
            <span className="text-[#23C6FF] text-xs">TypeScript</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#C6FF3D] font-bold text-lg">18</span>
            <span className="text-[#A1A1AA] text-xs">commits</span>
          </div>
          <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden mb-2">
            <div
              className="h-2 bg-[#23C6FF] rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
          <div className="text-[#A1A1AA] text-xs">Last commit: 2 days ago</div>
          <div className="text-[#C6FF3D] text-xs">#2</div>
        </div>
        {/* Repo 3 */}
        {/* <div className="border border-[#23252B] rounded-lg p-4 flex-1 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold">dcode-docs</span>
            <span className="text-[#FFD923] text-xs">Markdown</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#C6FF3D] font-bold text-lg">15</span>
            <span className="text-[#A1A1AA] text-xs">commits</span>
          </div>
          <div className="w-full h-2 bg-[#23252B] rounded-full overflow-hidden mb-2">
            <div
              className="h-2 bg-[#FFD923] rounded-full"
              style={{ width: "40%" }}
            ></div>
          </div>
          <div className="text-[#A1A1AA] text-xs">Last commit: 2 days ago</div>
          <div className="text-[#C6FF3D] text-xs">#3</div>
        </div> */}
      </div>
    </div>
  </div>
);

export default ContributionHighlights;
