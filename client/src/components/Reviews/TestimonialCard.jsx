import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, text }) => (
  <div className="bg-gradient-to-br from-[#0F1F17] to-[#0C1411] border border-[#2A5545] rounded-xl p-6 text-white w-[300px] shrink-0 snap-center">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-[#01FF801F] w-10 h-10 rounded-full flex justify-center items-center">
        <div className="bg-[#01FF804D] w-7 h-7 rounded-full"></div>
      </div>
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-[#D5D5D5B3]">{role}</p>
      </div>
    </div>
    <p className="text-sm text-[#D5D5D5] mb-4 leading-relaxed">
      {text.split(' ').map((word, i) =>
        ['hands-on', 'mentorship', 'projects'].includes(word.toLowerCase()) ? (
          <span key={i} className="font-semibold text-white">
            {word}{' '}
          </span>
        ) : (
          word + ' '
        )
      )}
    </p>
    <div className="flex gap-1 text-[#16FF72]">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star key={i} size={14} fill="#16FF72" stroke="none" />
        ))}
    </div>
  </div>
);

export default TestimonialCard;
