import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { CheckCircle, X, User, Mail, GraduationCap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

export default function WaitList() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedCount, setJoinedCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    Name: '',
    email: '',
    github: '',
    college: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/waitlist/count`);
        setJoinedCount(res.data.count);
      } catch (err) {
        console.error('Failed to fetch count:', err);
      }
    };

    fetchCount();

    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
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

  useEffect(() => {
    if (!showModal) return;
    const handleKey = e => e.key === 'Escape' && setShowModal(false);
    const handleClick = e =>
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      setShowModal(false);
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showModal]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleModalSubmit = async e => {
    if (e && e.preventDefault) e.preventDefault();

    const newErrors = {};
    if (!modalForm.Name.trim()) newErrors.Name = 'First name is required.';
    if (!modalForm.email.trim()) {
      newErrors.email = 'Email is required.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(modalForm.email.trim())) {
        newErrors.email = 'Enter a valid email address.';
      }
    }
    const githubPattern = /^[a-zA-Z0-9-]{1,39}$/;
    if (!modalForm.github.trim()) {
      newErrors.github = 'GitHub username is required.';
    } else if (!githubPattern.test(modalForm.github.trim())) {
      newErrors.github = 'Enter a valid GitHub username.';
    }
    if (!modalForm.college.trim()) newErrors.college = 'College is required.';

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
      setShowModal(false);
      setModalForm({ Name: '', email: '', github: '', college: '' });
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
            className={`absolute bg-[#BCDD19] rounded-full animate-pulse ${dot.size} ${dot.opacity}`}
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
            background: 'radial-gradient(circle,#BCDD19 0%, transparent 65%)'
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

      <main className="relative z-10 container mx-auto px-8 pt-32 pb-20 max-w-screen-2xl flex flex-col justify-center min-h-[60vh] my-auto">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-center md:text-5xl">
            Join The <span className="text-[#BCDD19]">DCODE</span> Waitlist NOW
            <span className="block mt-4 text-base font-medium text-gray-400 md:text-lg">
              Your gateway to real-world open source — from first PRs to actual
              impact.
            </span>
          </h2>
        </div>

        <p className="max-w-4xl mx-auto mb-2 text-xl leading-relaxed text-center text-gray-300 md:text-2xl">
          <span className="font-extrabold text-[#BCDD19] text-3xl md:text-4xl mr-2">
            {joinedCount.toLocaleString()}
          </span>
          <span className="text-xl font-medium text-gray-200 md:text-2xl">
            innovators have already joined{' '}
            <span className="text-[#BCDD19] font-bold">DCODE</span>. Be part of
            the next generation of developers!
          </span>
        </p>

        <div className="flex justify-center max-w-xl mx-auto mt-4 mb-6">
          <button
            type="button"
            onClick={handleOpenModal}
            disabled={isSubmitting}
            className={`
                    relative 
                    inline-flex items-center justify-center
                    w-full 
                    min-h-[4rem] px-8 py-4 
                    text-2xl font-extrabold uppercase tracking-wide 
                    text-black
                    rounded-full
                    bg-gradient-to-br from-[#BCDD19] via-[#A4D510] to-[#98D400]
                    shadow-[0_0_40px_rgba(188,221,25,0.6)]
                    transition-all duration-300 ease-in-out
                    hover:shadow-[0_0_60px_rgba(188,221,25,0.9)]
                    hover:scale-105 hover:-translate-y-0.5
                    focus:outline-none focus:ring-4 focus:ring-[#BCDD19]/50
                    disabled:opacity-60 disabled:cursor-not-allowed
                    overflow-hidden
                    cursor-pointer
                  `}
          >
            <span className="relative z-10">JOIN NOW</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out blur-[2px]" />
          </button>
        </div>

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg p-12 mx-4 text-center transition-opacity duration-700 border shadow-2xl bg-green-500/10 border-green-500/20 rounded-2xl backdrop-blur-sm">
              <CheckCircle className="w-16 h-16 text-[#BCDD19] mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-[#BCDD19] mb-4">
                You're In!
              </h3>
              <p className="text-xl text-gray-300">
                Thanks for joining! Check your mail. We'll notify you as soon as
                we launch.
              </p>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
              ref={modalRef}
              className="relative w-full max-w-2xl p-12 mx-4 bg-black border shadow-2xl border-white/20 rounded-2xl"
            >
              <button
                className="absolute text-xl text-gray-400 transition-colors duration-200 cursor-pointer top-4 right-4 hover:text-white"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="mb-8 text-2xl font-bold text-center text-white">
                Join the Waitlist
              </h2>
              <div className="space-y-8">
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <User className="absolute flex-shrink-0 w-5 h-5 text-gray-400 pointer-events-none left-4 top-3" />
                    <input
                      type="text"
                      placeholder="Name"
                      value={modalForm.Name}
                      disabled={isSubmitting}
                      onChange={e =>
                        setModalForm(f => ({ ...f, Name: e.target.value }))
                      }
                      className="w-full h-12 px-12 text-base text-white placeholder-gray-400 transition-colors duration-200 border rounded-lg border-white/10 bg-white/5 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 focus:outline-none"
                    />
                    {errors.Name && (
                      <p className="mt-1 text-sm text-red-400">{errors.Name}</p>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Mail className="absolute flex-shrink-0 w-5 h-5 text-gray-400 pointer-events-none left-4 top-3" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={modalForm.email}
                    disabled={isSubmitting}
                    onChange={e =>
                      setModalForm(f => ({ ...f, email: e.target.value }))
                    }
                    className="w-full h-12 px-12 text-base text-white placeholder-gray-400 transition-colors duration-200 border rounded-lg border-white/10 bg-white/5 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative flex-1">
                    <div className="absolute flex items-center justify-center flex-shrink-0 w-5 h-5 text-gray-400 pointer-events-none left-4 top-3">
                      <FaGithub size={20} />
                    </div>
                    <input
                      type="text"
                      placeholder="GitHub Username"
                      value={modalForm.github}
                      disabled={isSubmitting}
                      onChange={e =>
                        setModalForm(f => ({ ...f, github: e.target.value }))
                      }
                      className="w-full h-12 px-12 text-base text-white placeholder-gray-400 transition-colors duration-200 border rounded-lg border-white/10 bg-white/5 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 focus:outline-none"
                    />
                    {errors.github && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.github}
                      </p>
                    )}
                  </div>
                  <div className="relative flex-1">
                    <GraduationCap className="absolute flex-shrink-0 w-5 h-5 text-gray-400 pointer-events-none left-4 top-3" />
                    <input
                      type="text"
                      placeholder="College Name"
                      value={modalForm.college}
                      disabled={isSubmitting}
                      onChange={e =>
                        setModalForm(f => ({ ...f, college: e.target.value }))
                      }
                      className="w-full h-12 px-12 text-base text-white placeholder-gray-400 transition-colors duration-200 border rounded-lg border-white/10 bg-white/5 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 focus:outline-none"
                    />
                    {errors.college && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.college}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleModalSubmit}
                  disabled={isSubmitting}
                  className={`w-full h-14 font-bold text-lg rounded-xl mt-4 transition-all duration-200 transform ${
                    isSubmitting
                      ? 'bg-lime-400/50 text-gray-200 cursor-not-allowed'
                      : 'bg-[#BCDD19] text-black hover:bg-lime-400 hover:text-black cursor-pointer hover:scale-[1.03]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="px-6 mt-4 text-base text-center text-gray-400">
          <div className="flex flex-wrap justify-center gap-8 mb-4 text-[#BCDD19] text-3xl font-extrabold">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black">
                <label className="relative after:content-['*'] before:text-[#BCDD19] after:ml-1 after:text-[20px] after:align-top">
                  150+
                </label>
              </span>
              <span className="mt-1 text-xl font-semibold text-gray-400">
                Contributors
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black">
                <label className="relative after:content-['*'] after:text-[#BCDD19] after:ml-1 after:text-[20px] after:align-top">
                  20+
                </label>
              </span>
              <span className="mt-1 text-xl font-semibold text-gray-400">
                Colleges
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black">
                <label className="relative after:content-['*'] after:text-[#BCDD19] after:ml-1 after:text-[20px] after:align-top">
                  30+
                </label>
              </span>
              <span className="mt-1 text-xl font-semibold text-gray-400">
                Projects
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="pb-6 mt-auto text-sm text-center text-gray-500">
        <p>* These are expected numbers, they may vary.</p>© 2025{' '}
        <span className="font-medium text-white">DCODE</span>. Open source
        platform for modern development.
      </footer>
    </div>
  );
}