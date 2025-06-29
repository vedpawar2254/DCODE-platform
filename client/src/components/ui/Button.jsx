import { twMerge } from 'tailwind-merge';

export default function Button({
  children,
  variant = 'primary',
  onClick,
  className
}) {
  const base =
    'px-4 py-0.5 rounded-[10px] border transition-colors duration-200 hover:cursor-pointer';
  const variants = {
    primary: 'bg-lime-400 text-black border-lime-400 hover:bg-lime-500',
    outline:
      'bg-transparent text-white border-white hover:bg-white hover:text-black'
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(`${base} ${variants[variant]} ${className || ''}`)}
    >
      {children}
    </button>
  );
}
