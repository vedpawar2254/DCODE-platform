import { FeatureCards } from './FeatureCards';
import playbutton from '../../../assets/playbutton.svg';
import accelerate from '../../../assets/accelerate.svg';

const Bennefits = () => {
  return (
    <>
      <section className="relative w-full px-6 md:px-16 bg-black text-center overflow-hidden h-screen">
        <div className="mb-32 -mt-8 max-w-3xl mx-auto">
          <h3 className="text-green-500 text-sm tracking-widest mb-2">
            WHY CHOOSE
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experience <span className="text-[#BCDD19]">DCODE</span>
          </h2>
          <p className="text-gray-400 mt-4">
            DCODE is an open-source initiative by Dev Club that empowers
            students to contribute...
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row md:flex-wrap md:justify-between items-center gap-12 mx-16">
          <div className="flex flex-col space-y-12 md:space-y-20">
            <FeatureCards
              icon="📈"
              title="Accelerate Growth"
              description="Build meaningful projects that advance your career trajectory"
            />
            <FeatureCards
              icon="🎯"
              title="Unlock Potential"
              description="Maximize your impact with cutting-edge development tools"
            />
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-b from-[#5A6525] to-[#333D00] flex items-center justify-center">
              <div className="w-56 h-56 rounded-full flex items-center justify-center border-1 border-[#37CD5A]">
                <button
                  className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center  hover:cursor-pointer"
                  style={{
                    background:
                      'radial-gradient(circle, #37CD5A 0%, transparent 100%)'
                  }}
                >
                  <img src={playbutton} alt="play button" className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>

          <div
            className="absolute w-8 h-8 rounded-full"
            style={{
              top: '-40px',
              left: '60%',
              transform: 'translateX(-50%)',
              background:
                'radial-gradient(circle, #37CD5A 0%, transparent 100%)'
            }}
          ></div>

          <div
            className="absolute w-6 h-6 rounded-full"
            style={{
              bottom: '-40px',
              right: '60%',
              background:
                'radial-gradient(circle, #37CD5A 0%, transparent 100%)'
            }}
          ></div>

          {/* Right column */}
          <div className="flex flex-col space-y-12 md:space-y-20">
            <FeatureCards
              icon="⭐"
              title="Stand Apart"
              description="Distinguish yourself in the competitive development landscape"
            />
            <FeatureCards
              icon="🌐"
              title="Collaborate Globally"
              description="Work with diverse peers and mentors from across the tech ecosystem"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Bennefits;
