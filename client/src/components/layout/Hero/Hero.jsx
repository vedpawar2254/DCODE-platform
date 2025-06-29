import Button from '../../ui/Button';
import Hero from '../../../assets/Hero.png';

export default function HeroSection() {
  return (
    <section className="flex flex-col justify-between min-h-screen px-6 md:px-16 py-16 bg-black overflow-hidden relative">
      <div className="w-full mb-8 z-10 animate-fadeInUp">
        <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight max-w-5xl">
          The <span className="text-[#BCDD19] animate-gradient">Open</span>{' '}
          Source{' '}
          <span className="text-[#BCDD19] animate-gradient">Platform</span>
          <br />
          For Modern{' '}
          <span className="text-[#BCDD19] animate-gradient">Development</span>
        </h1>

        <p className="text-gray-300 md:text-xl mt-4 max-w-3xl">
          Collaborate, build, and{' '}
          <span className="inline-block text-[#BCDD19] transition-transform duration-300 hover:scale-110 hover:-rotate-3">
            innovate
          </span>{' '}
          with our powerful{' '}
          <span className="inline-block text-[#BCDD19] transition-transform duration-300 hover:scale-110 hover:-rotate-3">
            open source
          </span>{' '}
          tools and community-driven{' '}
          <span className="inline-block text-[#BCDD19] transition-transform duration-300 hover:scale-105 hover:rotate-3">
            ecosystem
          </span>
          .
        </p>
      </div>

      <div className="mt-2 md:w-5/12 space-y-8 py-16 z-10 animate-fadeInUp">
        <p className="text-white mb-2 md:text-3xl">
          Learn deeper.
          <br />
          Collaborate smarter.
          <br />
          <span className="text-[#BCDD19]">That's the DCODE way.</span>
        </p>
        <div className="flex items-center space-x-4 pt-6">
          <Button className="hover:shadow-[0_0_15px_#BCDD19] transition duration-300">
            Get Started
          </Button>
          <button className="text-white relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#BCDD19] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ">
            Try for Free
          </button>
        </div>
      </div>

      <div className="absolute bottom-20 right-0 z-0 animate-float">
        <img
          src={Hero}
          alt="Hero graphic"
          className="w-[800px] md:w-[1000px] max-w-none"
        />
      </div>
    </section>
  );
}
