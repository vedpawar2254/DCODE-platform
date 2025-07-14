// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

export default function Dashboard() {
  const [bookmarkView, setBookmarkView] = useState('issues');

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Main dashboard content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold mb-1">Dashboard</h2>
          <p className="text-gray-400">Welcome back, Ved 👋</p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard label="Open PRs" value="12" />
          <StatCard label="Merged PRs" value="45" />
          <StatCard label="Open Issues" value="7" />
          <StatCard label="Lines of Code" value="8,000+" />
        </section>

        {/* Pull Requests */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold">Pull Requests</h4>
            <FilterDropdown options={['All', 'Open', 'Merged', 'Closed']} />
          </div>
          <PRCard
            title="Fix authentication bug"
            repo="DCODE/AuthService"
            date="July 5, 2025"
            status="Open"
            description="Fixes user login edge cases and adds tests."
          />
          <PRCard
            title="Add contribution stats API"
            repo="DCODE/Backend"
            date="July 2, 2025"
            status="Merged"
            description="New endpoint to calculate user stats."
          />
        </section>

        {/* Issues */}
        <section className="mb-12">
          <h4 className="text-xl font-bold mb-4">Issues</h4>
          <IssueCard
            title="Update README with contributing guide"
            repo="DCODE/Docs"
            org="DCODE"
            date="July 1, 2025"
            status="Open"
          />
          <IssueCard
            title="Bug: Dashboard stats incorrect"
            repo="DCODE/Frontend"
            org="DCODE"
            date="June 28, 2025"
            status="Closed"
          />
        </section>

        {/* Bookmarks */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold">Bookmarks</h4>
            <div className="flex space-x-2 border border-gray-700 rounded-full overflow-hidden">
              <button
                onClick={() => setBookmarkView('issues')}
                className={`px-4 py-1 ${
                  bookmarkView === 'issues'
                    ? 'bg-[#BCDD19] text-black'
                    : 'text-gray-400'
                }`}
              >
                Issues
              </button>
              <button
                onClick={() => setBookmarkView('repos')}
                className={`px-4 py-1 ${
                  bookmarkView === 'repos'
                    ? 'bg-[#BCDD19] text-black'
                    : 'text-gray-400'
                }`}
              >
                Repositories
              </button>
            </div>
          </div>
          {bookmarkView === 'issues' ? (
            <IssueCard
              title="Refactor form validation"
              repo="DCODE/UI"
              org="DCODE"
              date="June 30, 2025"
              status="Open"
            />
          ) : (
            <RepoCard
              name="DCODE/Frontend"
              description="The main frontend for DCODE."
              stars={123}
            />
          )}
        </section>
      </main>

      {/* Right-side Profile */}
      <aside className="w-full md:w-80 border-l border-gray-800 p-8 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://avatars.githubusercontent.com/u/000000?v=4"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#BCDD19] mb-4"
          />
          <h3 className="text-xl font-bold">Ved Pawar</h3>
          <p className="text-gray-400 text-sm text-center mb-4">
            Full Stack Developer & OSS Contributor
          </p>
          <div className="flex space-x-4 text-[#BCDD19] text-xl">
            <a href="https://linkedin.com" target="_blank">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank">
              <FaGithub />
            </a>
            <a href="https://vedpawar.com" target="_blank">
              <FaGlobe />
            </a>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-3">Badges</h4>
          <div className="grid grid-cols-4 gap-3">
            <BadgeCard imgUrl="/badges/bug-hunter.png" name="Bug Hunter" />
            <BadgeCard imgUrl="/badges/docs-master.png" name="Docs Master" />
            <BadgeCard
              imgUrl="/badges/top-committer.png"
              name="Top Committer"
            />
          </div>
          <button className="mt-4 w-full bg-[#BCDD19] text-black py-2 rounded-full text-sm font-semibold">
            Show All Badges
          </button>
        </div>
      </aside>
    </div>
  );
}

// === Reusable Components ===

function StatCard({ label, value }) {
  return (
    <div className="bg-[#131313] border border-gray-700 p-6 rounded-lg">
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-extrabold text-[#BCDD19]">{value}</p>
    </div>
  );
}

function PRCard({ title, repo, date, status, description }) {
  return (
    <div className="bg-[#131313] border border-gray-700 p-4 rounded-lg mb-4">
      <h5 className="text-lg font-bold">{title}</h5>
      <p className="text-gray-400">
        {repo} • {date} • {status}
      </p>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}

function IssueCard({ title, repo, org, date, status }) {
  return (
    <div className="bg-[#131313] border border-gray-700 p-4 rounded-lg mb-4">
      <h5 className="text-lg font-bold">{title}</h5>
      <p className="text-gray-400">
        {org} / {repo} • {date} • {status}
      </p>
    </div>
  );
}

function RepoCard({ name, description, stars }) {
  return (
    <div className="bg-[#131313] border border-gray-700 p-4 rounded-lg mb-4">
      <h5 className="text-lg font-bold">{name}</h5>
      <p className="text-gray-400 mb-2">{description}</p>
      <p className="text-gray-500">⭐ {stars} stars</p>
    </div>
  );
}

function BadgeCard({ imgUrl, name }) {
  return (
    <div className="flex flex-col items-center">
      <img src={imgUrl} alt={name} className="w-12 h-12" />
      <p className="text-xs mt-1">{name}</p>
    </div>
  );
}

function FilterDropdown({ options }) {
  return (
    <select className="bg-[#101010] border border-gray-700 text-gray-400 px-3 py-2 rounded-lg">
      {options.map(opt => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}
