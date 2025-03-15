import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SlideContent {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  details?: string[];
  icon?: React.ReactNode;
}

interface CardSliderProps {
  slides: SlideContent[];
  autoPlayInterval?: number;
  className?: string;
}

export const ThreeDCardSlider: React.FC<CardSliderProps> = ({
  slides,
  autoPlayInterval = 5000,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle auto-play functionality
  useEffect(() => {
    if (isHovering) return;
    
    autoPlayRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeIndex, autoPlayInterval, isHovering, slides.length]);

  // Handle next slide
  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Handle previous slide
  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Format description with bold text
  const formatDescription = (description: string) => {
    return description.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div 
      className={cn("relative w-full max-w-4xl mx-auto px-4 sm:px-16", className)}
      ref={sliderRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={handlePrevSlide}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-colors duration-300 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 text-gray-800" />
      </button>
      
      <button
        onClick={handleNextSlide}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center transition-colors duration-300 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 text-gray-800" />
      </button>

      {/* Main Card Container */}
      <div 
        className="relative w-full max-w-[700px] h-[400px] sm:h-[500px] mx-auto overflow-hidden rounded-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          {slides.map((slide, index) => (
            index === activeIndex && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                initial={{ 
                  opacity: 0,
                  x: 100
                }}
                animate={{ 
                  opacity: 1,
                  x: 0
                }}
                exit={{ 
                  opacity: 0,
                  x: -100
                }}
                transition={{
                  type: "tween",
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              >
                {/* Card Content */}
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${slide.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(0.7)',
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 text-white z-10">
                    {/* Icon */}
                    <motion.div 
                      className="mb-4 sm:mb-6 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {slide.icon}
                    </motion.div>
                    
                    {/* Title */}
                    <motion.h2 
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {slide.title}
                    </motion.h2>
                    
                    {/* Description */}
                    <motion.p 
                      className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 max-w-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {formatDescription(slide.description)}
                    </motion.p>
                    
                    {/* Details List */}
                    {slide.details && (
                      <motion.div 
                        className="grid grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        {slide.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-white/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/80 mr-2 sm:mr-3 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
{/* Pagination Dots */}
<div className="flex justify-center mt-4 sm:mt-8 space-x-2 sm:space-x-3">
  {slides.map((_, index) => (
    <button
      key={index}
      onClick={() => setActiveIndex(index)}
      className={`w-1 h-1 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
        index === activeIndex 
          ? 'bg-white scale-100' 
          : 'bg-white/30 hover:bg-white/50'
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>
    </div>
  );
};