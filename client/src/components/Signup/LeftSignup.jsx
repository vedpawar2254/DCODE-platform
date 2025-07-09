import Illustration from '/images/Illustration1.png';

export default function LeftSignup() {
  return (
    <>
      <div className="text-3xl text-white font-extrabold mt-25">
        D<span className="text-[#BCDD19]">CODE</span>
      </div>

      {/* Glow wrapper with fade effect */}
      <div className="relative flex justify-center items-center z-0">
        {/* Image with fade overlay */}
        <div className="relative z-10 w-[424px] h-[357px] mt-25">
          <img
            src={Illustration}
            alt="Illustration"
            className="w-full h-full object-cover"
          />
          {/* Fade overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, black 0%, transparent 15%, transparent 85%, black 100%), linear-gradient(to bottom, black 0%, transparent 15%, transparent 85%, black 100%)'
            }}
          />
        </div>

        {/* Code symbols positioned around the image */}
        <div
          className="absolute text-white opacity-30 font-bold text-[31.25px] leading-[38px] tracking-[-0.5px] pointer-events-none z-10"
          style={{ fontFamily: 'Zen Kaku Gothic Antique, monospace' }}
        >
          {/* {} - top left */}
          <div className="absolute" style={{ left: '-200px', top: '-150px' }}>
            {'{}'}
          </div>

          {/* ; - top right */}
          <div className="absolute" style={{ right: '-220px', top: '-140px' }}>
            ;
          </div>

          {/* <> - bottom left */}
          <div
            className="absolute"
            style={{ left: '-270px', bottom: '-250px' }}
          >
            &lt;&gt;
          </div>

          {/* $ - bottom right */}
          <div
            className="absolute"
            style={{ right: '-200px', bottom: '-250px' }}
          >
            $
          </div>

          {/* 0x3234 - bottom center */}
          <div
            className="absolute"
            style={{
              left: '-140px',
              bottom: '-220px'
            }}
          >
            0x3234
          </div>
        </div>
      </div>

      <div className="text-3xl text-white font-bold text-center mt-25">
        Online Community For <br />
        <span className="text-[#BCDD19]">OPEN SOURCE</span> Developers
      </div>
    </>
  );
}
