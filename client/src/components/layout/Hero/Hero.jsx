import Button from '../../ui/Button';
import Hero from '../../../assets/Hero.png';

export default function HeroSection() {
  return (
    <section className="flex flex-col justify-between min-h-screen px-6 md:px-16 py-16 bg-black overflow-hidden relative">
      {/* HEADER + INTRO */}
      <div className="w-full mb-8">
        <h1 className="text-3xl md:text-6xl font-bold text-white leading-tight max-w-5xl">
          The <span className="text-[#BCDD19]">Open</span> Source{' '}
          <span className="text-[#BCDD19]">Platform</span>
          <br />
          For Modern <span className="text-[#BCDD19]">Development</span>
        </h1>

        {/* Intro paragraph moved directly below the header */}
        <p className="text-gray-300 md:text-xl mt-4 max-w-3xl">
          Collaborate, build, and{' '}
          <span className="text-[#BCDD19]">innovate</span> with our powerful{' '}
          <span className="text-[#BCDD19]">open source</span> tools and
          community-driven <span className="text-[#BCDD19]">ecosystem</span>.
        </p>
      </div>

      {/* CTA BLOCK: sits near bottom, but not hugging it */}
      <div className="mt-2 md:w-5/12 space-y-8 py-16">
        <p className="text-white mb-2 md:text-3xl">
          Learn deeper.
          <br />
          Collaborate smarter.
          <br />
          <span className="text-[#BCDD19]">That's the DCODE way.</span>
        </p>
        <div className="flex items-center space-x-4">
          <Button>Get Started</Button>
          <button className="text-white relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#BCDD19] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100">
            Try for Free
          </button>
        </div>
      </div>

      {/* HERO IMAGE stays absolute, unaffected */}
      <div className="absolute bottom-20 right-0">
        <img
          src={Hero}
          alt="Hero graphic"
          className="w-[800px] md:w-[800px] max-w-none"
        />
      </div>
    </section>
  );
}
