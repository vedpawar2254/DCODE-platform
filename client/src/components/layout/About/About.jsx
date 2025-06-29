import React from 'react';

const About = () => {
  return (
    <>
      <section className="w-full px-6 md:px-16 bg-black text-center py-24">
        {/* Section intro */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-green-500 text-sm tracking-widest mb-2">
            MADE ACCESSIBLE
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Open-source development
          </h2>
          <p className="text-gray-400 mt-4">
            Join DCODE and transform your coding journey. Contribute to real
            projects, learn from industry experts, and build a portfolio that
            stands out.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* CARD 1 */}
          <div className="bg-[#0B0F0B] border border-green-900 rounded-xl p-6 flex flex-col h-full">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">💻</span> Real-World Experience
            </h3>
            <p className="text-gray-400 mb-4 flex-grow">
              Work on production-level code in curated open-source repositories.
            </p>
            <div className="bg-[#121A12] p-4 rounded-lg text-left">
              <span className="text-green-400 text-sm block mb-1">MERGED</span>
              <p className="text-white text-sm">
                feat: Add user authentication
              </p>
              <div className="h-2 w-full bg-green-700 rounded-full mt-2">
                <div className="h-2 bg-green-400 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#0B0F0B] border border-green-900 rounded-xl p-6 flex flex-col h-full">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">👨‍🏫</span> Industry Mentorship
            </h3>
            <p className="text-gray-400 mb-4 flex-grow">
              Get guidance from experienced developers and industry
              professionals.
            </p>
            <div className="bg-[#121A12] p-4 rounded-lg text-left">
              <p className="text-white text-sm mb-1">Code Review Session</p>
              <p className="text-green-400 text-xs">
                "Great implementation! Consider using..."
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-[#0B0F0B] border border-green-900 rounded-xl p-6 flex flex-col h-full">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">📈</span> Build Your Portfolio
            </h3>
            <p className="text-gray-400 mb-4 flex-grow">
              Showcase your contributions and build an impressive GitHub
              profile.
            </p>
            <div className="bg-[#121A12] p-4 rounded-lg text-left">
              <p className="text-white text-sm mb-2">Contributions</p>
              <div className="flex flex-wrap gap-1">
                {Array(30)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-green-600 rounded-sm"
                    ></span>
                  ))}
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-[#0B0F0B] border border-green-900 rounded-xl p-6 flex flex-col h-full">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">🤝</span> Collaborative Learning
            </h3>
            <p className="text-gray-400 mb-4 flex-grow">
              Learn Git workflows, code reviews, and professional development
              practices.
            </p>
            <div className="bg-[#121A12] p-4 rounded-lg text-left">
              <p className="text-white text-sm mb-2">Pull Requests</p>
              <div className="h-2 w-full bg-green-700 rounded-full">
                <div className="h-2 bg-green-400 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>

          {/* CARD 5 */}
          <div className="bg-[#0B0F0B] border border-green-900 rounded-xl p-6 flex flex-col h-full">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">🎓</span> Career Opportunities
            </h3>
            <p className="text-gray-400 mb-4 flex-grow">
              Access internships, recommendations, and industry connections.
            </p>
            <div className="bg-[#121A12] p-4 rounded-lg text-left">
              <p className="text-white text-sm mb-1">Top Performer</p>
              <ul className="text-green-400 text-xs list-disc pl-5">
                <li>Internship interviews</li>
                <li>Industry mentorship</li>
                <li>Letters of recommendation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
