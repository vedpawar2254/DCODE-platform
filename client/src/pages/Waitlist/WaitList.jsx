import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, Star, Code, Users } from 'lucide-react';
import Waitlist from '/images/Waitlist.png';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export default function WaitList() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedCount, setJoinedCount] = useState(10);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
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
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
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
  
        console.log('Join response:', data);
  
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
          name: formData.name
        });
  
        toast.success('Name saved! Almost there...');
        setStep(2); 
  
      } else if (step === 2) {
        await axios.patch(`${API_URL}/api/waitlist/update`, {
          token: userToken,
          college: formData.college
        });
  
        toast.success('College saved!');
        setShowSuccess(true);
  
        setFormData({ email: '', name: '', college: '' });
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
    <div className="relative flex flex-col justify-start h-screen overflow-hidden text-white select-none">
     
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black via-black/90 to-black/20" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[100vw] h-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle,#BCDD19 0%, transparent 60%)'
          }}
        />
      </div>

      
      {staticDots.map((dot, index) => (
        <div
          key={index}
          className={`absolute bg-[#37CD5A] rounded-full ${dot.size} animate-pulse`}
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
          backgroundImage: `linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)`,
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
              DCODE
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
            <span className="font-medium text-gray-200">
              developers have already joined
            </span>
          </p>
        </div>

       
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-xl flex items-center border border-[#7A900F] rounded-full backdrop-blur-sm overflow-hidden"
          style={{ height: '56px' }}
        >
        
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`absolute left-0 w-full h-full pl-6 pr-44 text-lg text-white placeholder-gray-400 bg-transparent outline-none transition-all duration-500 ${
              step === 0
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-full pointer-events-none'
            }`}
          />
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`absolute left-0 w-full h-full pl-6 pr-44 text-lg text-white placeholder-gray-400 bg-transparent outline-none transition-all duration-500 ${
              step === 1
                ? 'opacity-100 translate-x-0'
                : step < 1
                ? 'opacity-0 translate-x-full pointer-events-none'
                : 'opacity-0 -translate-x-full pointer-events-none'
            }`}
          />
          <input
            type="text"
            placeholder="Enter your college name"
            value={formData.college}
            onChange={(e) =>
              setFormData({ ...formData, college: e.target.value })
            }
            className={`absolute left-0 w-full h-full pl-6 pr-44 text-lg text-white placeholder-gray-400 bg-transparent outline-none transition-all duration-500 ${
              step === 2
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full pointer-events-none'
            }`}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`absolute right-0 h-full px-8 font-semibold text-white rounded-full transition-all ${
              isSubmitting
                ? 'bg-[#7A900F]/50 cursor-not-allowed'
                : 'bg-[#7A900F] hover:bg-[#7A900F]/80'
            }`}
          >
            {isSubmitting ? 'Please wait...' : 'Submit'}
          </button>
        </form>

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

      <footer className="pb-6 mt-auto text-sm text-center text-gray-500 w-full">
        <div className="absolute inset-x-0 bottom-0.5 opacity-50 flex justify-center z-0 pointer-events-none select-none">
          <img src={Waitlist} alt="Waitlist footer" />
        </div>
        <p>* These are expected numbers, they may vary.</p>
        <p>© 2025 DCODE. Open source platform for modern development.</p>
      </footer>
    </div>
  );
}
