import { useState, useEffect, useRef } from 'react';
import { CheckCircle, X, User, Mail, GraduationCap } from 'lucide-react';

export default function WaitList() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [joinedCount, setJoinedCount] = useState(1247);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    college: ''
  });
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
    e.preventDefault();

    const newErrors = {};
    if (!modalForm.name.trim()) newErrors.name = 'Name is required.';
    if (!modalForm.email.trim()) newErrors.email = 'Email is required.';
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
    setJoinedCount(prev => prev + 1);
    setShowModal(false);
    setIsSubmitting(false);
    setModalForm({ name: '', email: '', college: '' });
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
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5" />
      <div className="absolute inset-0">
        {/* Dots moved away from corners, more toward center quadrants */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#BCDD19] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#BCDD19] rounded-full animate-ping-slow" />
        <div
          className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-[#BCDD19] rounded-full animate-pulse-slow"
          style={{ animationDelay: '1000ms' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#BCDD19] rounded-full animate-ping-slow"
          style={{ animationDelay: '500ms' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#BCDD19] rounded-full animate-pulse-slow"
          style={{
            animationDelay: '700ms',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div
          className="absolute top-[40%] right-[40%] w-2.5 h-2.5 bg-[#BCDD19] rounded-full animate-ping-slow"
          style={{ animationDelay: '1200ms' }}
        />
        <div
          className="absolute bottom-[40%] left-[40%] w-1.5 h-1.5 bg-[#BCDD19] rounded-full animate-pulse-slow"
          style={{ animationDelay: '900ms' }}
        />
        <div
          className="absolute bottom-1/2 right-1/2 w-2 h-2 bg-[#BCDD19] rounded-full animate-ping-slow"
          style={{ animationDelay: '1500ms', transform: 'translate(50%, 50%)' }}
        />
      </div>
      {/* Center glow replacing corner glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-[250px]"
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

      <div className="relative z-10 container mx-auto px-8 pt-32 pb-24 max-w-screen-2xl flex flex-col justify-center min-h-[80vh]">
        <div className="text-center mb-10">
          <h1 className="text-7xl md:text-8xl font-extrabold mb-8 leading-tight px-3 tracking-tight">
            <span className="inline-block mr-4">Join</span>
            <span className="text-[#BCDD19] inline-block mx-4">DECODE</span>
            <span className="inline-block ml-4">Today</span>
          </h1>
        </div>

        <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto leading-relaxed flex items-end justify-center gap-4 mt-2 mb-10">
          <span className="font-extrabold text-[#BCDD19] text-5xl md:text-6xl">
            {displayedCount.toLocaleString()}
          </span>
          <span className="text-xl md:text-2xl font-medium text-gray-300 pb-1">
            developers have already joined
          </span>
        </p>

        <div className="max-w-2xl mx-auto mb-16 flex justify-center">
          {!isSubmitted ? (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-full min-h-[5.5rem] py-8 px-12 bg-[#BCDD19] hover:bg-[#b0d000] text-black font-extrabold text-5xl rounded-3xl transition-all duration-200 transform hover:scale-105 shadow-2xl shadow-green-500/25 cursor-pointer tracking-tight border-4 border-[#BCDD19] hover:border-[#b0d000]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Join the Waitlist
            </button>
          ) : (
            <div className="text-center p-16 bg-green-500/10 border border-green-500/20 rounded-3xl backdrop-blur-sm animate-checkmark-fade-in">
              <CheckCircle className="w-24 h-24 text-[#BCDD19] mx-auto mb-8 animate-checkmark-pop" />
              <h3 className="text-4xl font-bold text-[#BCDD19] mb-6">
                You're In!
              </h3>
              <p className="text-gray-300 text-2xl">
                Thanks for joining! We'll notify you as soon as we launch.
              </p>
            </div>
          )}
        </div>

        {/* Modal for Waitlist Form */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
              ref={modalRef}
              className="relative bg-gray-900 border border-gray-700 rounded-3xl p-14 w-full max-w-2xl mx-4 shadow-2xl animate-fadeIn"
            >
              <button
                className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl cursor-pointer transition-colors duration-200"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              <h2 className="text-3xl font-bold text-center mb-10 color-white">
                Join the Waitlist
              </h2>
              <form onSubmit={handleModalSubmit} className="space-y-10">
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-7 h-7 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={modalForm.name}
                    disabled={isSubmitting}
                    onChange={e =>
                      setModalForm(f => ({ ...f, name: e.target.value }))
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-2xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                  />
                  {errors.name && (
                    <p className="text-red-400 mt-2 text-lg">{errors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-7 h-7 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={modalForm.email}
                    disabled={isSubmitting}
                    onChange={e =>
                      setModalForm(f => ({ ...f, email: e.target.value }))
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-2xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                  />
                  {errors.email && (
                    <p className="text-red-400 mt-2 text-lg">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-7 h-7 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="College Name"
                    value={modalForm.college}
                    disabled={isSubmitting}
                    onChange={e =>
                      setModalForm(f => ({ ...f, college: e.target.value }))
                    }
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 h-16 text-2xl rounded-xl px-14 focus:border-[#BCDD19] focus:ring-2 focus:ring-[#BCDD19]/20 focus:outline-none transition-colors duration-200"
                  />
                  {errors.college && (
                    <p className="text-red-400 mt-2 text-lg">
                      {errors.college}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-20 font-bold text-3xl rounded-2xl mt-6 transition-all duration-200 transform ${
                    isSubmitting
                      ? 'bg-[#a5b815] cursor-not-allowed'
                      : 'bg-[#BCDD19] hover:bg-[#b0d000] cursor-pointer hover:scale-[1.03]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="text-center mt-16 px-6 text-gray-400 text-base">
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
      </div>

      <div className="text-center pb-10 text-gray-500 text-lg">
        © 2024 <span className="text-white font-medium">DCODE</span>. Open
        source platform for modern development.
      </div>
    </div>
  );
}
