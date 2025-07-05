import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Star, Code, Users, Bell } from 'lucide-react';
import { MdOutlineRocket } from 'react-icons/md';
const API_URL = import.meta.env.VITE_API_URL;

export default function WaitList() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedCount, setJoinedCount] = useState(0);

  const [inputForm, setInput] = useState({
    email: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // const fetchCount = async () => {
    //   try {
    //     const res = await axios.get(`${API_URL}/api/waitlist/count`);
    //     setJoinedCount(res.data.count);
    //   } catch (err) {
    //     console.error('Failed to fetch count:', err);
    //   }
    // };

    // fetchCount();

    // const interval = setInterval(fetchCount, 30000);
    // return () => clearInterval(interval);
    setJoinedCount(17);
  }, []);

  const [displayedCount, setDisplayedCount] = useState(0);
  useEffect(() => {
    let frame;
    let firstRun = true;
    const animate = () => {
      setDisplayedCount(prev => {
        if (prev === joinedCount) return prev;
        const diff = joinedCount - prev;
        const increment = firstRun
          ? Math.ceil(Math.abs(diff) / 4)
          : Math.ceil(Math.abs(diff) / 12);
        if (diff > 0) return Math.min(prev + increment, joinedCount);
        if (diff < 0) return Math.max(prev - increment, joinedCount);
        return prev;
      });
      frame = requestAnimationFrame(animate);
      firstRun = false;
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [joinedCount]);

  const handleFormSubmit = async e => {
    if (e && e.preventDefault) e.preventDefault();

    const newErrors = {};

    if (!inputForm.email.trim()) {
      newErrors.email = 'Email is required.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(modalForm.email.trim())) {
        newErrors.email = 'Enter a valid email address.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await axios.post(`${API_URL}/api/waitlist/join`, {
        name: modalForm.Name,
        email: modalForm.email,
        github: modalForm.github,
        college: modalForm.college
      });

      setShowSuccess(true);
      setJoinedCount(prev => prev + 1);

      setInput({ email: '' });
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to join waitlist:', err);
      alert('There was an error. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen overflow-hidden text-white bg-black select-none">
      {/* Background and dots */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
      <div className="absolute inset-0">
        {[
          {
            top: '25%',
            left: '25%',
            size: 'w-2 h-2',
            opacity: 'opacity-70',
            delay: '0s'
          },
          {
            top: '33%',
            right: '33%',
            size: 'w-1.5 h-1.5',
            opacity: 'opacity-60',
            delay: '0s'
          },
          {
            bottom: '33%',
            left: '33%',
            size: 'w-1.5 h-1.5',
            opacity: 'opacity-50',
            delay: '1s'
          },
          {
            bottom: '25%',
            right: '25%',
            size: 'w-1.5 h-1.5',
            opacity: 'opacity-60',
            delay: '0.5s'
          },
          {
            top: '50%',
            left: '50%',
            size: 'w-1.5 h-1.5',
            opacity: 'opacity-40',
            delay: '0.7s'
          },
          {
            top: '40%',
            right: '40%',
            size: 'w-2 h-2',
            opacity: 'opacity-50',
            delay: '1.2s'
          },
          {
            bottom: '40%',
            left: '40%',
            size: 'w-1 h-1',
            opacity: 'opacity-60',
            delay: '0.9s'
          },
          {
            bottom: '50%',
            right: '50%',
            size: 'w-1.5 h-1.5',
            opacity: 'opacity-50',
            delay: '1.5s'
          },
          {
            top: '20%',
            left: '50%',
            size: 'w-2 h-2',
            opacity: 'opacity-60',
            delay: '0.8s'
          },
          {
            bottom: '20%',
            right: '50%',
            size: 'w-1.5 h-1.5',
            opacity: 'opacity-50',
            delay: '1s'
          },
          {
            top: '60%',
            left: '20%',
            size: 'w-1.5 h-1.5',
            opacity: 'opacity-50',
            delay: '1.3s'
          },
          {
            bottom: '60%',
            right: '20%',
            size: 'w-2 h-2',
            opacity: 'opacity-50',
            delay: '0.6s'
          }
        ].map((dot, index) => (
          <div
            key={index}
            className={`absolute bg-[#37CD5A] rounded-full animate-pulse blur-[2.5px] ${dot.size} ${dot.opacity}`}
            style={{
              top: dot.top,
              bottom: dot.bottom,
              left: dot.left,
              right: dot.right,
              animationName: 'pulse, float',
              animationDuration: '2s, 10s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${dot.delay}, ${dot.delay}`
            }}
          />
        ))}
      </div>

      {/* Center glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13] blur-[200px]"
          style={{
            background: 'radial-gradient(circle,#BCDD19B2 0%, transparent 65%)'
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.10) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <main className="relative z-10 container mx-auto px-8 pt-32 pb-20 max-w-screen-2xl flex flex-col justify-center min-h-[60vh] mt-40">
        <div className="flex justify-center">
          <div className="inline-flex items-center px-5 py-2 text-sm font-medium text-[#BCDD19B2]/70 bg-[#7A900F]/30 rounded-full hover:bg-[#7A900F]/20 transition-colors shadow-md shadow-[#7A900F]/10">
            Join Today
          </div>
        </div>

        <div className="mb-8 mt-15 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-center md:text-5xl">
            Join The <span className="text-[#7A900F]">DCODE</span> Waitlist NOW
            <span className="block mt-4 text-base font-medium text-gray-400 md:text-lg">
              Your gateway to real-world open source
            </span>
          </h2>
        </div>

        <p className="max-w-4xl mx-auto  text-xl leading-relaxed text-center text-gray-300 md:text-2xl mt-2.5">
          <span className="font-extrabold text-[#7A900F] text-3xl md:text-4xl mr-2">
            {joinedCount.toLocaleString()}
          </span>
          <span className="text-xl font-medium text-gray-200 md:text-2xl">
            devlopers have already joined
          </span>
        </p>

        <div className="mt-15 max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleFormSubmit}
            className="flex overflow-hidden rounded-full border border-[#7A900F] backdrop-blur-sm"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={inputForm.email}
              onChange={e => setInput({ email: e.target.value })}
              disabled={isSubmitting}
              className="flex-1 h-14 px-6 text-base text-white placeholder-gray-400 bg-transparent outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`h-14 px-6 font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? 'bg-[#7A900F]/50 cursor-not-allowed'
                  : 'bg-[#7A900F] hover:bg-[#7A900F]/70 '
              }`}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>

          {errors.email && (
            <p className="mt-2 text-sm text-red-400 text-center">
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center mt-4 text-sm md:text-base text-white">
          {/* Stars */}
          <div className="flex items-center space-x-1 mr-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                className={`w-4 h-4 md:w-5 md:h-5 ${
                  i <= 4
                    ? 'fill-[#7A900F] text-[#7A900F]'
                    : 'fill-gray-600 text-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Text */}
          <span className="text-gray-300">
            4.4 Rating based on 600+ students
          </span>
        </div>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg p-12 mx-4 text-center transition-opacity duration-700 border shadow-2xl bg-green-500/10 border-green-500/20 rounded-2xl backdrop-blur-sm">
              <CheckCircle className="w-16 h-16 text-[#7A900F] mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-[#7A900F] mb-4">
                You're In!
              </h3>
              <p className="text-xl text-gray-300">
                Thanks for joining! Check your mail. We'll notify you as soon as
                we launch.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-8 p-6 mt-20 rounded-xl ">
          {/* Box 1 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#37CD5A]/20 rounded-lg">
              <Code className="w-6 h-6 text-[#37CD5A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold">500+</span>
              <span className="text-gray-300 text-sm">Contributors</span>
            </div>
          </div>

          {/* Box 2 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#37CD5A]/20 rounded-lg">
              <Users className="w-6 h-6 text-[#37CD5A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold">10+</span>
              <span className="text-gray-300 text-sm">Colleges</span>
            </div>
          </div>

          {/* Box 3 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center bg-[#37CD5A]/20 rounded-lg">
              <MdOutlineRocket className="w-6 h-6 text-[#37CD5A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold">50+</span>
              <span className="text-gray-300 text-sm">Projects</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="pb-6 mt-auto text-sm text-center text-gray-500">
        <p>* These are expected numbers, they may vary.</p>© 2025 DCODE. Open
        source platform for modern development.
      </footer>
    </div>
  );
}
