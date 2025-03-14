import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  itemWidth?: string | number;
  gap?: number;
  showArrows?: boolean;
  currentIndex: number;
  onScroll: (index: number) => void;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = '',
  itemClassName = '',
  itemWidth = '100%',
  gap = 16,
  showArrows = true,
  currentIndex,
  onScroll
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Check if scroll is possible in either direction
  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer for browser rounding
  };

  // Handle scroll to position
  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const newPosition = direction === 'left' 
      ? scrollLeft - clientWidth / 2
      : scrollLeft + clientWidth / 2;
    
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  // Handle touch events for swiping
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;
    
    if (isSignificantSwipe) {
      if (distance > 0 && canScrollRight) {
        scrollTo('right');
      } else if (distance < 0 && canScrollLeft) {
        scrollTo('left');
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // First load animation for the first item
  useEffect(() => {
    if (isFirstLoad && scrollContainerRef.current) {
      const firstItem = scrollContainerRef.current.children[0] as HTMLElement;
      if (firstItem) {
        // Small bounce animation to indicate scrollability
        setTimeout(() => {
          firstItem.style.transition = 'transform 0.5s ease-in-out';
          firstItem.style.transform = 'translateX(10px)';
          
          setTimeout(() => {
            firstItem.style.transform = 'translateX(0)';
            
            setTimeout(() => {
              // Remove inline styles after animation
              firstItem.style.transition = '';
              firstItem.style.transform = '';
              setIsFirstLoad(false);
            }, 500);
          }, 300);
        }, 1000);
      }
    }
  }, [isFirstLoad]);

  // Listen for scroll events and resize
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    checkScrollability();
    
    const handleScroll = () => checkScrollability();
    const handleResize = () => checkScrollability();
    
    scrollContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Convert children to array and add gap styling
  const childrenArray = React.Children.toArray(children);
  const childrenWithGap = childrenArray.map((child, index) => (
    <div 
      key={index} 
      className={`flex-shrink-0 ${itemClassName}`}
      style={{ 
        width: typeof itemWidth === 'number' ? `${itemWidth}px` : itemWidth,
        marginRight: index < childrenArray.length - 1 ? gap : 0
      }}
    >
      {child}
    </div>
  ));

  return (
    <div className={`relative ${className}`}>
      {/* Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {childrenWithGap}
      </div>
      
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={() => scrollTo('left')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md z-10 transition-all ${
              canScrollLeft 
                ? 'opacity-80 hover:opacity-100' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scrollTo('right')}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md z-10 transition-all ${
              canScrollRight 
                ? 'opacity-80 hover:opacity-100' 
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Scroll Indicators */}
      <div className="flex justify-center mt-4 gap-1">
        {childrenArray.map((_, index) => {
          const isActive = index === 0 && !canScrollLeft || 
                          index === childrenArray.length - 1 && !canScrollRight;
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                isActive ? 'bg-primary w-4' : 'bg-gray-300'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};