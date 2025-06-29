import logoicon from '../../assets/logoicon.svg';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2 text-white font-bold text-xl"
    >
      <img src={logoicon} alt="DCODE Logo" className="w-10 h-10" />D
      <span className="text-[#BCDD19] font-bold text-xl">CODE</span>
    </Link>
  );
}
