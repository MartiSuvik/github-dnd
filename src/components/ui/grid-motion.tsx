import { useEffect, useRef, ReactNode, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '../../lib/utils';

interface GridMotionProps {
  /**
   * Array of items to display in the grid
   */
  items?: (string | ReactNode)[];
  /**
   * Color for the radial gradient background
   */
  gradientColor?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function GridMotion({ items = [], className }: GridMotionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef(window.innerWidth / 2);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const isScrollingRef = useRef(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Use 24 items (4 rows x 6 columns)
  const totalItems = 24;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );
  
  // Use provided items or default items, limited to the total amount needed
  const combinedItems =
    items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Clear any lag smoothing for better performance
    gsap.ticker.lagSmoothing(0);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    // Handle touch movement for mobile
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent animation during normal page scrolling
      if (Date.now() - touchStartTimeRef.current < 100) {
        return;
      }
      
      if (!isScrollingRef.current && e.touches[0]) {
        mouseXRef.current = e.touches[0].clientX;
      }
    };
    
    const handleTouchStart = () => {
      touchStartTimeRef.current = Date.now();
    };
    
    const handleScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    };
    
    let scrollTimeoutRef = { current: 0 };

    // Animation function with performance optimizations for mobile
    const updateMotion = () => {
      // Use smaller movement on mobile
      const maxMoveAmount = isMobile ? 150 : 300;
      // Use longer animation duration on mobile for less CPU usage
      const baseDuration = isMobile ? 1.2 : 0.8;
      // Different inertia factors for different rows
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      // Skip animation if not visible (performance optimization)
      if (!document.hidden && gridRef.current?.offsetParent) {
        rowRefs.current.forEach((row, index) => {
          if (row) {
            const direction = index % 2 === 0 ? 1 : -1;
            const moveAmount =
              ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
                maxMoveAmount / 2) *
              direction;

            gsap.to(row, {
              x: moveAmount,
              duration:
                baseDuration + inertiaFactors[index % inertiaFactors.length],
              ease: 'power3.out',
              overwrite: 'auto',
            });
          }
        });
      }

      // Use requestAnimationFrame with proper cleanup
      animationRef.current = requestAnimationFrame(updateMotion);
    };

    // Start animation and add event listeners
    animationRef.current = requestAnimationFrame(updateMotion);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup event listeners and animation frame
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('scroll', handleScroll);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [isMobile]);

  return (
    <div
      className={cn('h-full w-full overflow-hidden', className)}
      ref={gridRef}
    >
      <section
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle, white 0%, transparent 100%)`,
        }}
      >
        <div className="relative z-2 flex-none grid h-[150vh] w-[150vw] gap-3 sm:gap-4 grid-rows-[repeat(4,1fr)] grid-cols-[100%] -rotate-15 origin-center">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-3 sm:gap-4 grid-cols-[repeat(6,1fr)] will-change-transform"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(6)].map((_, itemIndex) => {
                const content = combinedItems[rowIndex * 6 + itemIndex];
                return (
                  <div key={itemIndex} className="relative">
                    <div className="relative h-full w-full overflow-hidden bg-muted flex items-center justify-center text-foreground text-base sm:text-xl group">
                      {typeof content === 'string' &&
                      content.startsWith('http') ? (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{
                              backgroundImage: `url(${content})`,
                            }}
                          />
                          {/* Overlay with opacity */}
                          <div className="absolute inset-0 bg-white opacity-0 pointer-events-none" />
                          {/* Shine overlay */}
                          <div className="absolute inset-0 pointer-events-none shine" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
                          <div className="p-2 sm:p-4 text-center relative z-10 text-sm sm:text-base">
                            {content}
                          </div>
                          {/* Shine overlay */}
                          <div className="absolute inset-0 pointer-events-none shine" />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative pointer-events-none h-full w-full inset-0">
          <div className="rounded-none" />
        </div>
      </section>
      <style>{`
        @keyframes shineAnimation {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shine {
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          opacity: 0.5;
          animation: shineAnimation 2s ease-in-out infinite;
        }
        
        /* Smaller gap and font size on mobile */
        @media (max-width: 640px) {
          .grid-motion-mobile {
            gap: 2px;
          }
          .grid-motion-text {
            font-size: 0.875rem;
          }
        }
        
        /* Reduce animation complexity for lower-end devices */
        @media (prefers-reduced-motion: reduce) {
          .shine {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}