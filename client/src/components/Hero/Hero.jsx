import Button from '../ui/Button/Button';

const Hero = () => {
  return (
    <section className="relative flex flex-col justify-between h-screen px-6 py-16 overflow-hidden bg-black select-none md:px-16">
      <div className="z-10 w-full mb-8 animate-fadeInUp">
        <h1 className="max-w-5xl text-3xl font-bold leading-tight text-white md:text-6xl">
          The <span className="text-[#BCDD19] animate-gradient">Open</span>{' '}
          Source{' '}
          <span className="text-[#BCDD19] animate-gradient">Platform</span>
          <br />
          For Modern{' '}
          <span className="text-[#BCDD19] animate-gradient">Development</span>
        </h1>

        <p className="max-w-3xl mt-4 text-gray-300 md:text-xl">
          Collaborate, build, and{' '}
          <span className="inline-block text-[#BCDD19]">innovate</span> with our
          powerful{' '}
          <span className="inline-block text-[#BCDD19]">open source</span> tools
          and community-driven{' '}
          <span className="inline-block text-[#BCDD19]">ecosystem</span>.
        </p>
      </div>

      <div className="z-10 py-16 mt-2 space-y-8 md:w-5/12 animate-fadeInUp">
        <p className="mb-2 text-white md:text-3xl">
          Learn deeper.
          <br />
          Collaborate smarter.
          <br />
          <span className="text-[#BCDD19]">That's the DCODE way.</span>
        </p>
        <div className="flex items-center pt-6 space-x-4">
          <Button className="!py-2 !px-4">Get Started</Button>
          {/* <button className="text-white relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-[#BCDD19] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ">
            Try for Free
          </button> */}
        </div>
      </div>

      <div className="absolute right-0 z-0 bottom-20 animate-float">
        <img
          src="/images/Hero.png"
          alt="Hero graphic"
          className="w-[800px] md:w-[1000px] max-w-none"
        />
      </div>
    </section>
  );
}

export default Hero