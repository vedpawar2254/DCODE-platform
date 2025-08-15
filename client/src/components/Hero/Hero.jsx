import Button from '../ui/Button/Button';

const Hero = () => {
  return (
    <section className="relative flex flex-col justify-between h-screen px-6 py-16 overflow-hidden bg-black select-none md:px-16">
      <div className="z-10 w-full mb-8 animate-fadeInUp">
        <h1 className="max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          The <span className="text-[#BCDD19] animate-gradient">Open Source</span>{' '}
          {' '}
          Place
          <br />
          Where Developers{' '}
          <span className="text-[#BCDD19] animate-gradient">Grow</span> 
        </h1>

        <p className="max-w-3xl mt-4 text-lg text-gray-300 sm:text-xl">
          Work on <span className="text-[#BCDD19]">large projects</span>, ship
          code that matters, and <span className="text-[#BCDD19]"> build a public track record of your skills. </span>
          DCODE is where you start small, level up fast, and make your mark in
          the <span className="text-[#BCDD19]">open source world</span>.
        </p>
      </div>

      <div className="z-10 py-8 mt-2 space-y-6 md:py-16 md:space-y-8 md:w-5/12 animate-fadeInUp">
        <p className="mb-2 text-xl text-white sm:text-2xl md:text-3xl">
          Start with your first PR.
          <br />
          End as a contributor — or even a maintainer.
          <br />
          <span className="text-[#BCDD19]">That's DCODE.</span>
        </p>
        <div className="flex flex-col pt-4 space-y-4 sm:pt-6 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button className="w-full sm:w-auto !py-2 !px-4"><a href='/waitlist'>Get Started</a></Button>
        </div>
      </div>

      <div className="absolute right-0 z-0 bottom-20 animate-float hidden sm:block">
        <img
          src="/images/Hero.png"
          alt="Hero graphic"
          className="w-[600px] sm:w-[800px] md:w-[1000px] max-w-none"
        />
      </div>
    </section>
  );
}

export default Hero;
