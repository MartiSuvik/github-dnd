import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollArrowProps {
  targetId: string;
  className?: string;
}

const ScrollArrow: React.FC<ScrollArrowProps> = ({ targetId, className = '' }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 text-white hover:text-[#C5A267] transition-colors duration-300 ${className}`}
      aria-label={`Scroll to ${targetId}`}
    >
      <ChevronDown className="w-12 h-12 animate-pulse-down" />
    </button>
  );
};

export default ScrollArrow;
