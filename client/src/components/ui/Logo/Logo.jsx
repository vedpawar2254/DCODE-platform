import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2 text-2xl font-bold text-white"
    >
      <img src="/images/logoicon" alt="DCODE Logo" className="w-10 h-10" />D
      <span className="text-[#BCDD19] font-bold text-2xl">CODE</span>
    </Link>
  );
}