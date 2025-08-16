import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2  font-bold text-white">
      <img
        src="../../../../images/d.png"
        alt="DCODE Logo"
        className="h-10 w-35 object-contain"
      />
    </Link>
  );
}
