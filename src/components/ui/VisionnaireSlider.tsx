import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VisionnaireSliderProps {
  children: React.ReactNode[];
  currentIndex: number;
  onScroll: (index: number) => void;
}

export const VisionnaireSlider: React.FC<VisionnaireSliderProps> = ({
  children,
  currentIndex,
  onScroll
}) => {
  
  // Navigate to specific slide
  const goToSlide = (index: number) => {
    if (index >= 0 && index < children.length) {
      onScroll(index);
    }
  };

  // Handle navigation
  const handlePrev = () => goToSlide(currentIndex - 1);
  const handleNext = () => goToSlide(currentIndex + 1);

  return (
    <div className="relative">
      {/* Slides Container */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div 
              key={index}
              className="w-full flex-shrink-0 px-4"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md z-10 transition-all ${
          currentIndex > 0 
            ? 'opacity-80 hover:opacity-100' 
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={handleNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md z-10 transition-all ${
          currentIndex < children.length - 1 
            ? 'opacity-80 hover:opacity-100' 
            : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}; 