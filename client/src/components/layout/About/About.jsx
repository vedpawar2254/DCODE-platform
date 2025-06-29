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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-[#101410] border border-green-900 rounded-xl p-6 text-left">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <span className="mr-2">👨‍💻</span> Real-World Experience
            </h3>
            <p className="text-gray-400 mb-4">
              Work on production-level code in curated open-source repositories
            </p>
            {/* Example content inside */}
            <div className="bg-[#0B0F0B] p-4 rounded-lg text-green-400 text-sm">
              feat: Add user authentication
              {/* Add your pull request style bar here */}
            </div>
          </div>

          {/* Repeat for other cards, changing content accordingly */}
          {/* Card 2: Industry Mentorship */}
          {/* Card 3: Build Your Portfolio */}
          {/* Card 4: Collaborative Learning */}
          {/* Card 5: Career Opportunities */}
        </div>
      </section>
    </>
  );
};

export default About;
