import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Star, Code, Users } from 'lucide-react';
import { MdOutlineRocket } from 'react-icons/md';
import Waitlist from '../../../public/images/Waitlist.png';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export default function WaitList() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedCount, setJoinedCount] = useState(100);
  const [inputForm, setInput] = useState({ email: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API_URL}/api/waitlist/join`, {
        email: inputForm.email
      });
      if (data?.count) {
        setJoinedCount(data.count);
      } else {
        const countResponse = await axios.get(`${API_URL}/api/waitlist/count`);
        setJoinedCount(countResponse.data.count);
      }

      setShowSuccess(true);
      setInput({ email: '' });
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to join waitlist:', err);
      if (err.response) {
        if (err.response.status === 409) {
          toast.error('This email is already on the waitlist!');
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        toast.error('Error joining waitlist. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Static dot positions
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
    <div className="relative flex flex-col justify-start h-screen overflow-hidden text-white select-none">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-black/90 to-black/20" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-18 blur-[120px]"
          style={{
            background: 'radial-gradient(circle,#BCDD19 0%, transparent 60%)'
          }}
        />
      </div>

      <div className="absolute inset-0">
        {staticDots.map((dot, index) => (
          <div
            key={index}
            className={`absolute bg-[#37CD5A] rounded-full ${dot.size} animate-pulse`}
            style={{
              top: dot.top,
              left: dot.left,
              filter: 'drop-shadow(0 0 8px #37CD5A)',
              animationDuration: '2s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-8 pt-20 pb-12 flex flex-col items-center">
        <div className="flex justify-center mb-10 w-full">
          <div className="inline-flex items-center px-6 py-2 text-sm font-medium text-[#BCDD19B2]/70 bg-[#7A900F]/30 rounded-full shadow-lg shadow-[#7A900F]/10">
            Join Today
          </div>
        </div>

        <div className="text-center mb-12 w-full">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">
            Join The{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BCDD19] to-[#7A900F] font-medium">
              {' '}
              DCODE{' '}
            </span>{' '}
            Waitlist NOW
          </h2>
          <p className="text-lg font-medium text-gray-400 md:text-xl">
            Your gateway to real-world open source
          </p>
        </div>

        <div className="mb-14 w-full text-center">
          <p className="text-2xl md:text-3xl">
            <span className="font-extrabold text-[#7A900F] text-4xl md:text-5xl mr-3">
              {joinedCount.toLocaleString()}
            </span>
            <span className=" font-medium text-gray-200">
              developers have already joined
            </span>
          </p>
        </div>

        <div className="w-full max-w-xl mb-16">
          <form
            onSubmit={handleFormSubmit}
            className="hidden md:flex flex-row overflow-hidden rounded-full border border-[#7A900F] backdrop-blur-sm"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={inputForm.email}
              onChange={e => setInput({ email: e.target.value })}
              disabled={isSubmitting}
              className="flex-1 h-14 px-6 text-lg text-white placeholder-gray-400 bg-transparent outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`h-14 px-8 font-semibold text-white transition-all ${
                isSubmitting
                  ? 'bg-[#7A900F]/50 cursor-not-allowed'
                  : 'bg-[#7A900F] hover:bg-[#7A900F]/70'
              }`}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          {/* Mobile */}
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4 md:hidden rounded-2xl p-4 backdrop-blur-md"
          >
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={inputForm.email}
              onChange={e => setInput({ email: e.target.value })}
              disabled={isSubmitting}
              className="w-full h-14 px-6 text-lg text-white placeholder-gray-400 bg-black/30 border border-[#7A900F] rounded-xl outline-none focus:border-[#7A900F] focus:ring-2 focus:ring-[#7A900F]/30 transition-all"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-14 font-bold text-lg rounded-xl transition-all ${
                isSubmitting
                  ? 'bg-[#7A900F]/50 cursor-not-allowed'
                  : 'bg-[#7A900F] hover:bg-[#7A900F]/80'
              }`}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          {errors.email && (
            <p className="mt-3 text-sm text-red-400 text-center">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center mb-16 -mt-6 text-base md:text-lg w-full">
          <div className="flex items-center space-x-2 mr-3">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                className={`w-5 h-5 md:w-6 md:h-6 ${
                  i <= 4
                    ? 'fill-[#7A900F] text-[#7A900F]'
                    : 'fill-gray-600 text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-300">
            4.1 Rating based on 500+ students
          </span>
        </div>

        <div className="flex justify-between w-full max-w-3xl p-6 mt-12">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 flex items-center justify-center bg-[#37CD5A]/20 rounded-lg">
              <Code className="w-7 h-7 text-[#37CD5A]" />
            </div>
            <div>
              <p className="text-white text-2xl">600+</p>
              <p className="text-gray-300">Contributors</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 flex items-center justify-center bg-[#37CD5A]/20 rounded-lg">
              <Users className="w-7 h-7 text-[#37CD5A]" />
            </div>
            <div>
              <p className="text-white text-2xl">20+</p>
              <p className="text-gray-300">Colleges</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 flex items-center justify-center bg-[#37CD5A]/20 rounded-lg">
              <MdOutlineRocket className="w-7 h-7 text-[#37CD5A]" />
            </div>
            <div>
              <p className="text-white text-2xl">50+</p>
              <p className="text-gray-300">Projects</p>
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md p-8 mx-4 text-center border shadow-2xl bg-green-500/10 border-green-500/20 rounded-2xl backdrop-blur-sm">
              <CheckCircle className="w-14 h-14 text-[#7A900F] mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-[#7A900F] mb-3">
                You're In!
              </h3>
              <p className="text-lg text-gray-300">
                Thanks for joining! We'll notify you as soon as we launch.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="pb-6 mt-auto text-sm text-center text-gray-500 w-full">
        <div className="absolute inset-x-0 bottom-0.5 opacity-50 flex justify-center z-0 pointer-events-none select-none">
          <img src={Waitlist} alt="Waitlistfooter" />
        </div>
        <p>* These are expected numbers, they may vary.</p>
        <p>© 2025 DCODE. Open source platform for modern development.</p>
      </footer>
    </div>
  );
}
