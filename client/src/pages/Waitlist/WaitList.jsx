import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Star, Code, Users } from 'lucide-react';
import { MdOutlineRocket } from 'react-icons/md';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export default function WaitList() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedCount, setJoinedCount] = useState(10);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    college: ''
  });
  const [userToken, setUserToken] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch waitlist count on mount
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/waitlist/count`);
        setJoinedCount(response.data.count);
      } catch (err) {
        console.error('Failed to fetch waitlist count:', err);
      }
    };
    fetchWaitlistCount();
  }, []);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (step === 0) {
        const { data } = await axios.post(`${API_URL}/api/waitlist/join`, {
          email: formData.email
        });

        if (data.token) {
          setUserToken(data.token);
          toast.success('Email saved! Let’s get your name.');
          setStep(1);
        } else {
          toast.error('No token received!');
        }

      } else if (step === 1) {
        await axios.patch(`${API_URL}/api/waitlist/update`, {
          token: userToken,
          college: formData.college
        });
        toast.success('College saved!');
        setShowSuccess(true);
        setFormData({ email: '', college: '' });
        setStep(0);
        setUserToken('');
      }

    } catch (err) {
      console.error(err);
      toast.error('Oops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const staticDots = [
    { top: '20%', left: '20%', size: 'w-1 h-1' },
    { top: '10%', left: '90%', size: 'w-1 h-1' },
    { top: '90%', left: '90%', size: 'w-1 h-1' },
    { top: '80%', left: '80%', size: 'w-1 h-1' },
    { top: '40%', left: '40%', size: 'w-1.5 h-1.5' },
    { top: '60%', left: '60%', size: 'w-1.5 h-1.5' },
    { top: '50%', left: '30%', size: 'w-1.5 h-1.5' },
    { top: '90%', left: '80%', size: 'w-1.7 h-1.7' }
  ];

  return (
    <div className="relative flex flex-col justify-start min-h-screen overflow-hidden text-white select-none font-inter" style={{ fontFamily: 'Inter, sans-serif' }}>

      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-black/90 to-black/20" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle,#BCDD19 0%, transparent 60%)'
          }}
        />
      </div>


      {staticDots.map((dot, i) => (
        <div
          key={i}
          className={`absolute bg-[#37CD5A] rounded-full ${dot.size}`}
          style={{
            top: dot.top,
            left: dot.left,
            filter: 'drop-shadow(0 0 8px #37CD5A)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
      ))}


      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            `linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />


      <main className="relative z-10 flex flex-col items-center w-full max-w-4xl px-8 pt-10 pb-12 mx-auto">

        <div className="inline-flex items-center px-6 py-2 mt-6 text-sm font-medium text-[#BCDD19B2]/70 bg-[#7A900F]/30 rounded-full shadow-lg shadow-[#7A900F]/10 mb-6">
          Join Today
        </div>


        <h2 className="mb-4 text-4xl font-medium tracking-tight text-center md:text-5xl">
          Join The{' '}
          <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-[#BCDD19] to-[#7A900F]">
            DCODE
          </span>{' '}
          Waitlist Now
        </h2>
        <p className="text-lg font-medium text-[#D5D5D5] md:text-lg text-center mb-12">
          Your Gateway to Real-World Open Source
        </p>


        <p className="text-2xl md:text-md mb-16 text-center text-[#D5D5D5]">
          <span className="font-medium text-[#7A900F] text-4xl md:text-5xl mr-3">
            {joinedCount.toLocaleString()}
          </span>
          developers have already joined
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-xl border py-8 border-[#BCDD19] rounded-full overflow-hidden backdrop-blur-xs"
          style={{ height: '56px' }}
        >
          <div className="relative w-full h-full">

            <div
              className={`absolute inset-0 flex items-center transition-all duration-500 ${step === 0
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-full pointer-events-none'
                }`}
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="flex-grow px-6 pl-12 text-lg text-white placeholder-gray-400 outline-none bg-gray/40"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-full px-8 py-8 font-semibold cursor-pointer flex items-center justify-center text-white transition-colors ${isSubmitting
                    ? 'bg-[#7A900F]/50 cursor-not-allowed'
                    : 'bg-[#7A900F] hover:bg-[#60720c]'
                  }`}
              >
                {isSubmitting ? 'Please wait...' : 'Join Waitlist'}
              </button>
            </div>

            {/* Name step */}

            {/* College step */}
            <div
              className={`absolute inset-0 flex items-center transition-all duration-500 ${step === 1
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-full pointer-events-none'
                }`}
            >
              <input
                type="text"
                placeholder="Enter Your College"
                value={formData.college}
                onChange={(e) =>
                  setFormData({ ...formData, college: e.target.value })
                }
                className="flex-grow px-6 pl-12 text-lg text-white placeholder-gray-400 outline-none bg-gray/40"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-full px-8 py-8 font-semibold cursor-pointer text-white flex items-center justify-center transition-colors ${isSubmitting
                    ? 'bg-[#7A900F]/50 cursor-not-allowed'
                    : 'bg-[#7A900F] hover:bg-[#60720c]'
                  }`}
              >
                {isSubmitting ? 'Please wait...' : 'Join Waitlist'}
              </button>
            </div>
          </div>
        </form>


        <div className="flex items-center justify-center w-full mt-4 text-base md:text-xs">
          <div className="flex items-center mr-3 space-x-1">
            {[1, 2, 3, 4, 5].map(i => {
              const fillPercent = i <= Math.floor(4.4)
                ? 100
                : i === Math.ceil(4.6)
                  ? (4.6 % 1) * 100
                  : 0;

              return (
                <div key={i} className="relative w-4 h-4">
                  <Star className="absolute w-4 h-4 text-gray-600 fill-gray-600" />
                  <div
                    className="absolute top-0 left-0 h-4 overflow-hidden"
                    style={{ width: `${fillPercent}%` }}
                  >
                    <Star className="w-4 h-4 text-[#7A900F] fill-[#7A900F]" />
                  </div>
                </div>
              );
            })}
          </div>
          <span className="text-gray-300">
            4.4 Rating based on 600+ students
          </span>
        </div>


        <div className="flex justify-between w-full max-w-xl p-4 mt-12">
          {[
            { Icon: Code, label: 'Contributors', value: '500+' },
            { Icon: Users, label: 'Colleges', value: '10+' },
            { Icon: MdOutlineRocket, label: 'Projects', value: '50+' },
          ].map(({ Icon, label, value }, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-14 h-14 flex items-center justify-center bg-[#37CD5A]/20 rounded-lg">
                <Icon className="w-7 h-7 text-[#37CD5A]" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-gray-300">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md p-8 mx-4 text-center border shadow-2xl bg-green-500/10 border-green-500/20 rounded-2xl backdrop-blur-sm">
              <CheckCircle className="w-14 h-14 text-[#7A900F] mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-[#7A900F] mb-3">
                You're In!
              </h3>
              <p className="text-lg text-gray-300">
                Welcome to DCODE! We’ll notify you as soon as we launch.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="relative w-full pb-6 mt-auto text-sm text-center text-gray-500">
        <div className="absolute inset-x-0 bottom-0.5 opacity-50 flex justify-center z-0 pointer-events-none select-none">
          <img src="/images/Waitlist.png" alt="Waitlistfooter" />
        </div>
        <p>* These are expected numbers, they may vary.</p>
        <p>© 2025 DCODE. Open source platform for modern development.</p>
      </footer>
    </div>
  );
}
