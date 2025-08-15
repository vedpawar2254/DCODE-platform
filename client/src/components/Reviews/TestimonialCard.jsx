import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, text, compact = false }) => (
  <div
    className={`
    bg-gradient-to-br from-[#0F1F17] to-[#0C1411] 
    border border-[#2A5545] 
    rounded-2xl 
    ${compact ? 'p-4' : 'p-6'}
    text-white 
    ${compact ? 'w-[280px] sm:w-[320px]' : 'w-full max-w-[380px] md:w-[420px]'}
    shrink-0 
    snap-center 
    shadow-lg
    hover:shadow-xl
    transition-all duration-300
    ${compact ? 'mt-4' : 'mt-6 md:mt-8'}
  `}
  >
    {/* Profile section */}
    <div className={`flex items-center gap-3 ${compact ? 'mb-3' : 'mb-4'}`}>
      <div
        className={`flex justify-center items-center ${compact ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-[#01FF801F]`}
      >
        <img
          src={`https://api.dicebear.com/9.x/identicon/svg?seed=${name}`}
          className={`${compact ? 'w-6 h-6' : 'w-8 h-8'} rounded-full /border-2 /border-[#01FF804D]`}
        />
      </div>
      <div>
        <h3 className={`font-semibold ${compact ? 'text-sm' : 'text-base'}`}>
          {name}
        </h3>
        <p
          className={`${compact ? 'text-[10px]' : 'text-xs'} text-[#D5D5D5B3]`}
        >
          {role}
        </p>
      </div>
    </div>

    {/* Testimonial text */}
    <p
      className={`${compact ? 'text-xs' : 'text-sm'} text-[#D5D5D5] ${compact ? 'mb-3' : 'mb-4'} leading-relaxed`}
    >
      {text.split(' ').map((word, i) =>
        ['hands-on', 'mentorship', 'projects'].includes(
          word.toLowerCase().replace('.', '')
        ) ? (
          <span key={i} className="font-semibold text-white">
            {word}{' '}
          </span>
        ) : (
          word + ' '
        )
      )}
    </p>

    {/* Stars rating */}
    <div className="flex gap-1 text-[#16FF72]">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            size={compact ? 12 : 14}
            fill="#16FF72"
            stroke="none"
            className="flex-shrink-0"
          />
        ))}
    </div>
  </div>
);

export default TestimonialCard;
