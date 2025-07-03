import { useState, useEffect, useRef } from 'react';
import { CheckCircle, X, User, Mail, GraduationCap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function WaitList() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [joinedCount, setJoinedCount] = useState(1247);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    github: '',
    college: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setJoinedCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showModal) return;
    const handleKey = e => {
      if (e.key === 'Escape') setShowModal(false);
    };
    const handleClick = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showModal]);

  const handleModalSubmit = async e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const newErrors = {};
    if (!modalForm.firstName.trim())
      newErrors.firstName = 'First name is required.';
    if (!modalForm.lastName.trim())
      newErrors.lastName = 'Last name is required.';
    if (!modalForm.email.trim()) {
      newErrors.email = 'Email is required.';
    } else {
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(modalForm.email.trim())) {
        newErrors.email = 'Enter a valid email address.';
      }
    }

    // GitHub username validation
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

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setShowSuccess(true);
    setJoinedCount(prev => prev + 1);
    setShowModal(false);
    setIsSubmitting(false);
    setModalForm({
      firstName: '',
      lastName: '',
      email: '',
      github: '',
      college: ''
    });
    setTimeout(() => {
      setShowSuccess(false);
      setIsSubmitted(false);
    }, 2000);
  };

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
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col justify-between">
      {/* Background and dots */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
      <div className="absolute inset-0">
        {/* Dots moved away from corners, more toward center quadrants */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#BCDD19] rounded-full animate-pulse opacity-70" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#BCDD19] rounded-full animate-pulse opacity-60" />
        <div
          className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#BCDD19] rounded-full animate-pulse opacity-50"
          style={{ animationDelay: '1000ms' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#BCDD19] rounded-full animate-pulse opacity-60"
          style={{ animationDelay: '500ms' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#BCDD19] rounded-full animate-pulse opacity-40"
          style={{
            animationDelay: '700ms',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div
          className="absolute top-[40%] right-[40%] w-2.5 h-2.5 bg-[#BCDD19] rounded-full animate-pulse opacity-50"
          style={{ animationDelay: '1200ms' }}
        />
        <div
          className="absolute bottom-[40%] left-[40%] w-1.5 h-1.5 bg-[#BCDD19] rounded-full animate-pulse opacity-60"
          style={{ animationDelay: '900ms' }}
        />
        <div
          className="absolute bottom-1/2 right-1/2 w-2 h-2 bg-[#BCDD19] rounded-full animate-pulse opacity-50"
          style={{ animationDelay: '1500ms', transform: 'translate(50%, 50%)' }}
        />
      </div>
      {/* Center glow replacing corner glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[250px]"
          style={{
            background: 'radial-gradient(circle,#BCDD19 0%, transparent 65%)'
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.10) 1px, transparent 1px)`,
          backgroundSize: '90px 90px'
        }}
      />

      {/* Main content section, spaced from header and pushed lower */}
      <main className="relative z-10 container mx-auto px-8 pt-40 pb-24 max-w-screen-2xl flex flex-col justify-center min-h-[70vh]">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight px-3 tracking-tight">
            <span className="inline-block mr-3">Unlock Your Future with</span>
            <span className="text-[#BCDD19] inline-block mx-3 drop-shadow-lg">
              DCODE
            </span>
            <span className="inline-block ml-3">Join the Revolution</span>
          </h1>
        </div>

        <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed text-center mt-30 mb-5">
          <span className="font-extrabold text-[#BCDD19] text-4xl md:text-5xl mr-2">
            {displayedCount.toLocaleString()}
          </span>
          <span className="text-2xl md:text-3xl font-medium text-gray-200">
            innovators have already joined{' '}
            <span className="text-[#BCDD19] font-bold">DCODE</span>. Be part of
            the next generation of developers!
          </span>
        </p>

        <div className="max-w-2xl mt-20 mx-auto mb-16 flex justify-center">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full min-h-[5.5rem] py-8 px-12 bg-[#BCDD19] hover:bg-[#b0d000] text-white font-extrabold text-5xl rounded-3xl transition-all duration-200 transform hover:scale-105 shadow-2xl shadow-green-500/25 cursor-pointer tracking-tight border-4 border-[#BCDD19] hover:border-[#b0d000] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ letterSpacing: '-0.02em' }}
            disabled={isSubmitted}
          >
            JOIN NOW
          </button>
        </div>

        {/* You're In! Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="text-center p-16 bg-green-500/10 border border-green-500/20 rounded-3xl backdrop-blur-sm max-w-xl w-full mx-4 shadow-2xl transition-opacity duration-700">
              <CheckCircle className="w-24 h-24 text-[#BCDD19] mx-auto mb-8 animate-pulse" />
              <h3 className="text-4xl font-bold text-[#BCDD19] mb-6">
                You're In!
              </h3>
              <p className="text-gray-300 text-2xl">
                Thanks for joining! We'll notify you as soon as we launch.
              </p>
            </div>
          </div>
        )}

        {/* Modal for Waitlist Form */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
              ref={modalRef}
              className="relative bg-black border border-gray-700 rounded-3xl p-16 w-full max-w-3xl mx-4 shadow-2xl"
            >
              <button
                className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl cursor-pointer transition-colors duration-200"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <h2 className="text-3xl font-bold text-center mb-10 text-white">
                Join the Waitlist
              </h2>
              <div className="space-y-10">
                {/* First line: First Name & Last Name */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative flex-1">
                    <User className="absolute left-5 top-4 text-gray-400 w-7 h-7 pointer-events-none flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={modalForm.firstName}
                      disabled={isSubmitting}
                      onChange={e =>
                        setModalForm(f => ({ ...f, firstName: e.target.value }))
                      }
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                    />
                    {errors.firstName && (
                      <p className="text-red-400 mt-2 text-lg">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="relative flex-1">
                    <User className="absolute left-5 top-4 text-gray-400 w-7 h-7 pointer-events-none flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={modalForm.lastName}
                      disabled={isSubmitting}
                      onChange={e =>
                        setModalForm(f => ({ ...f, lastName: e.target.value }))
                      }
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                    />
                    {errors.lastName && (
                      <p className="text-red-400 mt-2 text-lg">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                {/* Second line: Email */}
                <div className="relative">
                  <Mail className="absolute left-5 top-4 text-gray-400 w-7 h-7 pointer-events-none flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={modalForm.email}
                    disabled={isSubmitting}
                    onChange={e =>
                      setModalForm(f => ({ ...f, email: e.target.value }))
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                  />
                  {errors.email && (
                    <p className="text-red-400 mt-2 text-lg">{errors.email}</p>
                  )}
                </div>
                {/* Third line: GitHub Username & College */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative flex-1">
                    <div className="absolute left-5 top-4 text-gray-400 pointer-events-none flex items-center justify-center w-7 h-7 flex-shrink-0">
                      <FaGithub size={28} />
                    </div>
                    <input
                      type="text"
                      placeholder="GitHub Username"
                      value={modalForm.github}
                      disabled={isSubmitting}
                      onChange={e =>
                        setModalForm(f => ({ ...f, github: e.target.value }))
                      }
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                    />
                    {errors.github && (
                      <p className="text-red-400 mt-2 text-lg">
                        {errors.github}
                      </p>
                    )}
                  </div>
                  <div className="relative flex-1">
                    <GraduationCap className="absolute left-5 top-4 text-gray-400 w-7 h-7 pointer-events-none flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="College Name"
                      value={modalForm.college}
                      disabled={isSubmitting}
                      onChange={e =>
                        setModalForm(f => ({ ...f, college: e.target.value }))
                      }
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                    />
                    {errors.college && (
                      <p className="text-red-400 mt-2 text-lg">
                        {errors.college}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleModalSubmit}
                  disabled={isSubmitting}
                  className={`w-full h-20 font-bold text-3xl rounded-2xl mt-6 transition-all duration-200 transform ${
                    isSubmitting
                      ? 'bg-[#a5b815] cursor-not-allowed'
                      : 'bg-[#BCDD19] hover:bg-[#b0d000] cursor-pointer hover:scale-[1.03]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="text-center mt-20 px-6 text-gray-400 text-base">
          <div className="flex flex-wrap justify-center gap-20 mb-8 text-[#BCDD19] text-4xl font-extrabold">
            <div className="flex flex-col items-center">
              <span className="text-7xl font-black">500+</span>
              <span className="text-gray-400 text-3xl mt-2 font-semibold">
                Contributors
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-7xl font-black">10k+</span>
              <span className="text-gray-400 text-3xl mt-2 font-semibold">
                Developers
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-7xl font-black">50+</span>
              <span className="text-gray-400 text-3xl mt-2 font-semibold">
                Projects
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer always at the bottom */}
      <footer className="text-center pb-10 text-gray-500 text-lg mt-auto">
        © 2025 <span className="text-white font-medium">DCODE</span>. Open
        source platform for modern development.
      </footer>
    </div>
  );
}
